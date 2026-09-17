# Undirect

Safari web extension, macOS and iOS, that stops pages taking a click to open or
redirect somewhere the user did not ask for. Container app in SwiftUI, guard in
JavaScript.

## Layout

- `project.yml` is the source of truth. `Undirect.xcodeproj` is generated and
  gitignored: run `xcodegen generate` after editing it.
- `Extension/Resources/` is the web extension. `App/` is the container app,
  shared by both platforms.
- Four targets: an app and an extension per platform. Schemes `Undirect-macOS`
  and `Undirect-iOS`.
- **Every icon regenerates from `python3 Support/icon/build.py`, and the package
  must stay named `AppIcon.icon` to match `ASSETCATALOG_COMPILER_APPICON_NAME`.**
  Full account: [docs/app-icon.md](docs/app-icon.md).

## Rules paid for with a bug

- **Safari reads `manifest.json` from the appex root, so `project.yml` lists the
  resource folders one by one.** Copying `Extension/Resources` as one folder
  reference buries everything a level deep and breaks the iOS build at
  `ValidateEmbeddedBinary`. A new top-level folder under `Extension/Resources`
  needs a line in both extension targets. Full account:
  [docs/safari-constraints.md](docs/safari-constraints.md).
- **No shipping Safari supports `world: "MAIN"` as of 2026-09-08**, so the
  page-world half is appended as a script element by the content script. Same
  doc.
- **A sweep on `pointerdown` removes the trap but the click dies with it**, so
  the guard clears traps on hover and forwards the click when a press had to do
  the removing. Verified in `tests/`.
- **iOS requires `"persistent": false` on the background page**, so anything
  kept only in a variable is lost when Safari unloads it. Session state lives in
  `storage.session`. Full account: [docs/safari-constraints.md](docs/safari-constraints.md).
- **`coverage()` divides by the viewport area**, which is zero in a hidden tab.
  It returns 0 there rather than NaN. Any new geometry check needs the same care.
- **`window.location` cannot be hooked, so a same-tab redirect is judged in the
  background page**: a cross-site navigation within a moment of a press aimed
  elsewhere is the press being taken, and it is recorded, blocked and undone. A
  press is written down without awaiting anything, because one that waited for
  the restore landed after the navigation and the theft went through. Full
  account: [docs/redirect-mechanism.md](docs/redirect-mechanism.md).
- **Being the page's own code authorises no window either**, because the site
  taking the money is where the pop is served from: only a window asked for at a
  size, which is a sign-in or a share sheet, counts as the page vouching. A stop
  at the network layer is invisible to the guard, so the record asks
  `getMatchedRules()` what it refused; Safari leaves out the rule id, so the
  host comes from the request URL. Same doc and
  [docs/safari-constraints.md](docs/safari-constraints.md).
- **A user's click authorises nothing by itself.** Pop networks pick a real click
  and ride it, so a cross-origin `window.open` needs the page's own site in the
  nearest stack frame, never just a recent gesture. Site means base domain, so
  `cdn.site.com` may vouch for `www.site.com`. `lib/site.js` works that out and
  approximates the Public Suffix List rather than shipping it. Full account:
  [docs/redirect-mechanism.md](docs/redirect-mechanism.md).
- **Judging every site automatically cost a whole domain.** A misjudged Bing
  result and a `teams.live.com` popup each wrote a permanent global network
  block, and `microsoft.com` went unreachable everywhere (2026-09-16). The
  guard now runs only on a site switched on from the toolbar button;
  `settings.mode: "everywhere"` restores the old always-on behavior. An off
  site gets an outlined icon, no badge and no popup, so one press turns it on
  (2026-09-17). Full account: [docs/rules-and-record.md](docs/rules-and-record.md).

## App screens

One `NavigationSplitView` for all three: sidebar on iPad and Mac, collapsing to
a stack on iPhone that opens on the sidebar. Rows follow
System Settings, the app this one sits beside. Setup is one sentence and a
button, never a tutorial: the HIG says onboarding must not teach the system.
Debug builds take `-UndirectForceState`, `-UndirectSeedSample` and `-UndirectPane`. Full account:
[docs/rules-and-record.md](docs/rules-and-record.md).

- **macOS needs a grouped `Form`, not an inset `List`.** `.listStyle(.inset)`
  draws bare hairlines; `.formStyle(.grouped)` draws the rounded card System
  Settings uses. iOS keeps `.insetGrouped`, which already draws cards. Same doc.
- **A tip that points at one control is a popover or an annotation, never a hint
  card in the list.** The control here is macOS-only, and macOS describes a
  control with `help(_:)`, so there is no tip framework in this project.
- **First run is two screens, not one.** A welcome sheet says what the app does
  and its button switches the extension on; the not-on-yet screen is
  `ContentUnavailableView` with its `actions:` slot. `presentationSizing(.form)`
  clips on macOS, so that one uses `.fitted`. Same doc.

- **A detail shown at launch in a collapsed split view has no title on iOS 26**,
  so iPhone starts with nothing selected and opens on the sidebar. Every screen
  sets `.navigationTitle`. Same doc.
- **Settings live in `SettingsView`, never in the rules list**: the App menu's
  Settings window on macOS, a sidebar section on iOS. Same doc.
- **`RuleRow` is a plain `HStack`**, because `LabeledContent` wraps its value
  under a wide label and a `Label` in its value position triples row height.

- **The sandbox will not read a group-container file the app did not write.**
  `com.apple.provenance` survives `xattr -c`, so a shell-written sample fails
  with POSIX 1. The debug sample lives in memory. Same doc.

## Rules and the record

Every cross-site destination a page reaches for gets a row in the popup, keyed by
base domain, marked blocked or allowed. A rule set for one site beats a rule set
everywhere, which beats the default, and the default ships as block.
`UndirectSite.decide()` is the only place that order lives. Deception detectors
do not consult the rules. Full account:
[docs/rules-and-record.md](docs/rules-and-record.md).

## The app window

The Mac app lists and edits the rules; the iOS app shows the same list read-only,
because Apple gives no way for a containing iOS app to message its extension.
They travel through an app group: the extension pushes a snapshot file, the app
reads it, and edits come back through `SFSafariApplication.dispatchMessage`.
macOS uses the team-prefixed group id and needs no registration; iOS needs the
registered `group.` form and a profile. Full account:
[docs/rules-and-record.md](docs/rules-and-record.md).

## What the guard does

Detects in JavaScript, blocks at the network layer: a caught attempt names a
host, and the background page turns it into a `declarativeNetRequest` rule so the
retry never loads. Per-site shortcuts live in
`Extension/Resources/sites/recipes.js`. Full account:
[docs/redirect-mechanism.md](docs/redirect-mechanism.md).

## Shipping

Store copy, review notes and the App Privacy answers live in
`Support/AppStore/metadata.md`, each counted against Apple's limit. Screenshots
sit beside them at accepted sizes. What still needs the Apple account, and the
one judgement call about the site named in `sites/recipes.js`, are in
[docs/app-store-submission.md](docs/app-store-submission.md).

## Tests

`python3 tests/build.py && python3 tests/serve.py`, then open
`http://127.0.0.1:8766/run.html` **with the extension switched off in that
browser**, or the guard vetoes the harness's own clicks. Then
`bun tests/background.test.mjs` for the background half. The browser harness
forces `mode: "everywhere"` in its stub, since the shipping default guards no
site until a toolbar press turns it on. [tests/README.md](tests/README.md).
