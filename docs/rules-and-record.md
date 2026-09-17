# What the popup shows, and what the rules mean

## The record

Every time a page reaches for another site in a new tab or window, the guard
files a row: the destination, how it was tried, how many times, and whether it
was stopped. Rows are kept per tab and cleared when the tab loads a new page.

Rows are keyed by base domain, which is what `lib/site.js` computes. That gives
the main domain for an ordinary site and keeps the subdomain for shared hosting,
so `one.github.io` and `two.github.io` are separate rows while `cdn.site.com`
and `www.site.com` are one.

Same-site destinations are not recorded. A page opening its own pages is not
the thing being watched.

## What the guard runs on

Off by default, on a site the user turns it on for. A misjudged Bing search
result and a `teams.live.com` popup each got read as a stolen press and wrote a
permanent, global network block for the whole destination -
`microsoft.com` became unreachable everywhere, from a single wrong guess on one
site (2026-09-16). Judging every page automatically was what made a wrong guess
this expensive, so the guard no longer judges a page until asked to.

`watched` in storage is `{ siteBase: true }`, keyed by `UndirectSite.baseDomain()`
exactly like `perSite`. Absence is off; turning a site off deletes its key
rather than storing `false`. `settings.mode` is `"watched"` (this) or
`"everywhere"` (today's always-on, still offered in Settings). `settings.enabled`
stays the master switch above both. The whole of it, in `background.js`:

```js
function guarding(state, site) {
  if (!state || state.settings.enabled === false) return false;
  if (state.settings.mode === "everywhere") return true;
  return !!site && state.watched?.[site] === true;
}
```

Two things run regardless of watch state:

- A `network-rule` row (see "Telling the user what the network layer stopped"
  in [docs/redirect-mechanism.md](redirect-mechanism.md)) - a learned block
  stopping a request reads exactly like nothing having happened otherwise.
- `undirect:hello` - it names the tab and writes nothing, and it is what the
  gate itself keys on.

No block list ships with the extension (removed 2026-09-17, owner's call): every
network block is one the guard learned or the user set.

Learned blocks still promote straight to `everywhere` plus a network rule, same
as always. That is only defensible because learning now only ever happens on a
site the user pointed the guard at themselves.

Already-learned blocks from before this shipped are not migrated - there was
no install base to migrate (the app has never reached the App Store, see
[docs/app-store-submission.md](app-store-submission.md)). Clear one by hand:
popup → "All rules" → the entry → "Use default".

## The rules

Three sources, in this order:

| Source | Set from | Beats |
| --- | --- | --- |
| This site | "Allow here" or "Block here" | everything below |
| Everywhere | "Allow everywhere" or "Block everywhere" | the default |
| Default | the popup's own control, block out of the box | nothing |

`UndirectSite.decide()` in `lib/site.js` is the whole of it, and both halves of
the guard call it so they cannot disagree.

Deception is not a destination and does not consult the rules. An invisible
click catcher, a transparent layer, and a link rewritten between the press and
the release are undone whatever the rules say, because none of them is the page
telling you where it wants to take you.

## The toolbar button

The button says whether the guard runs on the site in front of you (2026-09-17).
`paintBadge()` in `background.js` sets three things per tab after every
navigation, tab switch and settings change:

| Site | Icon | Popup | Badge | A press |
|---|---|---|---|---|
| Off | `toolbar-icon-off.svg`, outlined | none (`setPopup` to `""`) | hidden | `action.onClicked` watches the site and reloads the tab |
| On | `toolbar-icon.svg`, filled | `popup/popup.html` | stopped count | opens the popup, whose top switch turns the site off |

The manifest ships no `default_popup`, so a tab the background has not painted
yet still turns on with one press. If a press lands on a site that is already on
(a missed paint), it repaints and calls `action.openPopup()` instead of reloading.
Safari has had per-tab `setPopup`, `setIcon` and `onClicked` since 15.4 (MDN
browser-compat-data). Checked in the iOS 26 simulator: the Safari page menu shows
the outline icon with no badge on an off site, and the filled icon with a red
count on lunarx.to.

## The popup

Grouped rows on a grouped background, the shape of System Settings and iOS
Settings. `pointer: coarse` is the only branch: a 340px, 13px popover on Mac, a
full-width 17px sheet on iOS with no `max-width`, since a capped body left bare
strips either side of the sheet. Screenshots of other Safari extensions and HIG
pages sit in `.inspo/` (untracked).

A trap removed from the page with no other site behind it (a transparent layer,
a catcher pointing back at the page) is listed too, as a row named after the
page's own site with "Removed" in place of the menu, and counted in the badge.
It is never learned: `note()` skips the learn path for a `local` report, since
that would block the site itself.

Three views, one at a time: this page, Rules and Settings, each with a back
button. A destination's verdict is a short chip ("Blocked") laid over a
transparent native `<select>`, so the choice opens as the system menu with all
five options (default, block or allow here, block or allow everywhere), and the
row's name never truncates to make room for a long label. Picking a wider rule
clears the narrower one, because a rule for one site beats a rule everywhere.

## The rules screen

The rules view lists every rule the user has set, split into the ones that apply
everywhere and the ones that apply to a single site. Each rule can be flipped or
dropped back to the default.

Both views are rendered by `popup/popup.js` from one state object the background
page returns. `tests/build.py` writes a copy of the popup with the extension APIs
stubbed, so the layout and every string can be checked without Safari.

## Where a rule is enforced

Blocking everywhere becomes a `declarativeNetRequest` rule, so the request never
leaves the machine. That is the only verdict the network layer can carry: its
conditions cannot say "except on this one site" in a way this project has
verified against Safari.

So allowing a host on one site, when it was blocked everywhere, drops the
network rule and leaves the block to JavaScript on the other sites. That is
weaker, and it is the honest cost of a per-site allow.

A page reads the rules once, at document_start, and hands them to the page-world
half on the injected script element. Changing a rule applies the next time that
page loads.

Whether the guard runs at all is read the same way, once, at document_start -
so switching a site's watch state on or off cannot take effect on the page
that is already loaded. `applyWatch()` in `background.js` reloads the tab
after writing the change, in both directions: turning watch off without a
reload would leave that page's already-installed hooks active until its next
load anyway. The cost is real - scroll position, an unsubmitted form, a
resubmit prompt on a page reached by POST - so the popup's watch switch says
so next to it.

## The badge

The number of attempts stopped in this tab since it arrived on its current site,
and nothing else. It is hidden on a site the guard is off for, even when a
learned rule stopped something there. `startOver()` zeroes the tab's record
when a navigation or a page's `hello` names a different site, so a tab that
moves from lunarx.to to gogoanime.by does not carry lunarx's number; the page
a theft lands on cannot trigger that reset, and neither can the undo that
goes back. Session and lifetime counts live in the popup.

## The app window

The app and the extension are separate sandboxes and cannot read each other's
storage, so the rules travel through an app group.

Extension to app: the background page sends a snapshot with
`runtime.sendNativeMessage`, and `SafariWebExtensionHandler` writes it as
`snapshot.json` in the group container. A file, not `UserDefaults`, which keeps
this off the required-reason API list and the privacy manifest empty.

App to extension: `SFSafariApplication.dispatchMessage` into a
`runtime.connectNative` port. Apple offers this on macOS only, and states that a
containing iOS app cannot send to its extension's scripts. So the Mac app edits
rules and the iOS app shows the same list without controls, saying where changes
are made.

The shape Safari delivers at `port.onMessage` is not documented, so the handler
in `background.js` reads the payload from either the message or a `userInfo`
wrapper around it.

Three actions travel this way: `rule`, `settings`, and `watch` (stop guarding a
site - the app has no tabId, so unlike the popup's switch this never reloads a
page, it just takes effect the next time that site loads). The app can only
remove a watched site, never add one: it has no way to know what page is open
in Safari.

Group identifiers differ by platform, and so does what they cost. macOS accepts
`<team identifier>.<name>`, which needs no registration on the developer site
and works under a local signature: `PM3K35YS39.undirect` resolves to a container
on this machine. iOS accepts only the registered `group.<name>` form, so
`group.com.matsuokengo.undirect` compiles but will not resolve on a device until
it is registered and a provisioning profile carries it.

## The app's screens

Shaped after System Settings > Login Items & Extensions, which is the pane that
lists Safari extensions and so is the nearest thing Apple ships to this app. Its
arrangement, copied: a sentence-case title in bold, one line of explanation
under it, a segmented control for the grouping, then one card of rows. Rows lead
with a symbol, carry a second secondary line where there is one, and put the
state in a trailing control.

Section headers use `.textCase(nil)` on macOS so they read as titles rather than
grey small caps. iOS keeps its own grey sentence-case headers, which is that
platform's convention.

The setup screen is one sentence and the button that opens Safari's Extensions
pane. It used to be three numbered steps teaching Safari's settings, which the
HIG rules out directly: onboarding stays "focused on the experience you
provide", and people "don't need to learn how to use the system or the device."

TipKit carries the one non-obvious thing, that a row's state is a control. The
HIG points at it in place of an onboarding flow. It is an inline `TipView` in
the list, following Apple's own example; a `popoverTip` anchored to the row menu
never displayed. Debug builds accept `-UndirectShowTips YES` to force it.

## The old account of the screens

One screen per state, the way Hush does it: nothing while Safari is being asked,
the setup screen when the extension is off, the rules when it is on. Showing the
setup steps next to the rules meant the window still said "turn it on" after the
user already had.

The rules are a `List` with sections, which is the container Apple names for a
collection of data, and the setup screen is a stack because it is prose and
buttons rather than data. Row actions live in a `Menu` at the end of the row.

Two layout rules came out of building it:

- `LabeledContent` drops its value onto a second line once the label is wide,
  and these rows show hostnames. `RuleRow` is an `HStack` instead, which keeps
  every row one line with the host truncating in the middle.
- A `Label` in `LabeledContent`'s value position nests two labels and the row
  grows to roughly three times its height. The verdict is a plain image and text.

List style is per platform: `.inset` on macOS, `.insetGrouped` on iOS. The macOS
style on iOS stretches rows and collides the section footer with the row above it.

Debug builds accept `-UndirectForceState off|on|checking`, so every screen can be
captured without switching the extension off in Safari.

## Seeding the shared file

The app sandbox refuses to read a file in the group container that an
unsandboxed process wrote: `com.apple.provenance` records who created it, the
attribute cannot be stripped with `xattr -c`, and the read fails with POSIX 1.
Screenshot runs therefore ask the app to write its own sample, through
`-UndirectSeedSample YES`, rather than having a shell write the JSON.

## Three platforms, one split view

The first pass at these screens looked at one Mac pane and applied its answer to
iPhone and iPad too. iPad Settings is a two-column split view: a sidebar of
destinations, and a detail carrying its own title, explanation and grouped
cards. The iPad build was the iPhone column stretched across thirteen inches.

`NavigationSplitView` covers all three from one implementation. It shows columns
on iPad and Mac and collapses to a stack at narrow widths, which includes iPhone
and iPad in Slide Over. Compact width opens on the sidebar, for the reason below.

The grouping moved from a segmented control into the sidebar, which is where
iPad puts that choice.

A detail column shown at launch in a collapsed split view has no navigation
title on iOS 26, and the same detail pushed from the sidebar has one. Checked on
2026-09-10 in the iPhone 17 Pro Max simulator: with `.navigationTitle` set,
launching straight onto the detail left the bar empty, and tapping Back then the
row showed "Everywhere". A selected row pushes the detail at launch whatever
`preferredCompactColumn` says, so compact width starts with nothing selected and
opens on the sidebar, as Settings and Mail do. Regular width selects Everywhere
in `.task`.

An earlier pass read the empty bar as the split view dropping titles, moved each
screen's name into its first section header, and kept `.navigationTitle` on
macOS alone. That left iPhone with no title at all, which the HIG rules out:
"Provide a useful title for each window." Every screen now sets its own.

The HIG adds a constraint worth keeping in mind: iPad windows resize fluidly, so
the layout has to hold at narrow, compact and intermediate widths, not only at
full screen.

## The Mac card, and where a tip belongs

`List` with `.listStyle(.inset)` draws bare hairline rows on macOS, which looks
nothing like a Mac pane. System Settings draws one rounded card holding the rows
with hairlines between them, and `Form` with `.formStyle(.grouped)` is what
produces that: "leading aligned labels and trailing aligned controls within
visually grouped sections". So the container is a grouped `Form` on macOS and an
inset-grouped `List` on iOS, which already draws cards.

TipKit came back out. The HIG names three tip types and when each applies: a
popover to preserve content flow, an annotation-style inline tip when pointing at
a specific element, and a hint-style inline tip when it points at nothing. The
tip here pointed at the row's state control, and it shipped as the type meant for
pointing at nothing, wedged into the content it should have preserved.

The control it explained exists only on macOS, since iOS is read-only, and the
macOS guidance for describing a control is a tooltip through `help(_:)`. That is
what the state menu carries now, and no tip framework is needed for it.

The screen's name lives in `navigationTitle` on every platform. On macOS it
also names the window.

## Settings

The page note and the default for a destination with no rule are app-wide, so
they live in `SettingsView`, never under a list of rules. They used to sit in a
Settings section appended to the rules list, which drew them a second time under
By site. macOS opens them from the App menu's Settings item (Command-Comma),
because the HIG says to "include a settings item in the App menu" and to avoid
settings buttons in a window. iOS reaches them from their own sidebar section.

The master Guard switch and the mode picker ("Sites you turn on" / "Every site")
live here too, above the page note - the two things that decide whether the
guard runs at all, ahead of the two that decide what it does once it is
running. The list of watched sites itself is not a setting and does not live
here: it is data, same as the rules, so it gets its own sidebar row.

## Guarded sites

A third sidebar row, `WatchedView`, next to the two rule groupings. It follows
`RulesView`'s own container choice (grouped `Form` on macOS, inset-grouped
`List` on iOS) and its row shape (a plain `HStack`, not `RuleRow` - a site is
not a destination, it carries no verdict to show). The app can only remove a
site from here, never add one: adding one means knowing what page is open in
Safari right now, which the app has no way to ask. The empty state and the
footer say so, rather than a text field that would be guessing.

## First run

Two screens, where there used to be one status message doing neither job.

**Welcome** is a sheet on first launch, shaped like the one Reminders shows: a
bold title, four rows of symbol, bold line and grey sentence, and a full-width
button pinned at the bottom. No API ships for this, so it is hand-built.
`presentationSizing` gives it the right box: `.fitted` on macOS, because `.form`
is a fixed size that clips the fourth row, and `.form` on iOS and iPadOS where it
lands as the centred card. The button opens Safari's Extensions pane directly, so
first launch ends with the extension on rather than with a description of it.

The sheet shows once, remembered in `@AppStorage`. That is `UserDefaults`, which
is a required-reason API, so `PrivacyInfo.xcprivacy` now declares it under
`CA92.1`. Debug builds take `-UndirectShowWelcome YES` to force it and
`-welcomeShown YES` to suppress it.

**Not on yet** is `ContentUnavailableView` with its `actions:` slot carrying the
buttons. It is the system's own screen for nothing-here-yet, and it replaced a
hand-rolled stack of centred text.

The copy went through `ui-copy` first: one sentence per row, nothing addressing
the reader, and the button naming what it does rather than saying Continue.
