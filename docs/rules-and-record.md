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
