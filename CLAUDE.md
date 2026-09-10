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
- **`coverage()` divides by the viewport area**, which is zero in a hidden tab.
  It returns 0 there rather than NaN. Any new geometry check needs the same care.
- **A user's click authorises nothing by itself.** Pop networks pick a real click
  and ride it, so a cross-origin `window.open` needs the page's own site in the
  nearest stack frame, never just a recent gesture. Site means base domain, so
  `cdn.site.com` may vouch for `www.site.com`. `lib/site.js` works that out and
  approximates the Public Suffix List rather than shipping it. Full account:
  [docs/redirect-mechanism.md](docs/redirect-mechanism.md).

## App screens

Shaped after System Settings > Login Items & Extensions, the pane that lists
Safari extensions. Setup is one sentence and a button, never a tutorial: the HIG
says onboarding must not teach the system. TipKit carries the one non-obvious
control, inline rather than as a popover. `RuleRow` is a plain `HStack` because
`LabeledContent` wraps its value under a wide label. Debug builds take
`-UndirectForceState`, `-UndirectSeedSample` and `-UndirectShowTips`. Full
account: [docs/rules-and-record.md](docs/rules-and-record.md).

- **The sandbox will not read a group-container file the app did not write.**
  `com.apple.provenance` survives `xattr -c`, so a shell-written sample fails
  with POSIX 1. The app seeds its own. Same doc.

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

## Tests

`python3 tests/build.py && python3 tests/serve.py`, then open
`http://127.0.0.1:8766/run.html`. Nine checks, all must pass.
[tests/README.md](tests/README.md).
