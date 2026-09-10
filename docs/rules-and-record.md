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

## The rules screen

The popup has two views and one link between them. The page view lists what this
page reached for. The rules view lists every rule the user has set, split into
the ones that apply everywhere and the ones that apply to a single site. Each
rule can be flipped or dropped back to the default.

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

## The badge

The number of attempts stopped on the page in front of you, and nothing else.
Session and lifetime counts live in the popup, where there is room to say which
is which.

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

Group identifiers differ by platform, and so does what they cost. macOS accepts
`<team identifier>.<name>`, which needs no registration on the developer site
and works under a local signature: `5MPWBL8F42.undirect` resolves to a container
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
and iPad in Slide Over. `preferredCompactColumn` set to `.detail` opens the
collapsed form on the rules rather than on a two-item menu in front of them.

The grouping moved from a segmented control into the sidebar, which is where
iPad puts that choice.

A collapsed split view discards the detail column's navigation title. Setting
`.navigationBarTitleDisplayMode(.large)`, wrapping the detail in its own
`NavigationStack`, and passing a verbatim `Text` all leave the bar empty, so the
column is dropping the title rather than failing to resolve it. The screen names
itself in its first section header instead, which reads the same on all three.
`.navigationTitle` stays on macOS alone, where it names the window.

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

The screen's name lives in `navigationTitle` on macOS, where it also names the
window, and in the first section header on iOS, where a collapsed split view
leaves the bar empty. Showing both says it twice.

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
