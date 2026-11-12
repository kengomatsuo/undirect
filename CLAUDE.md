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

## Working rules

- **Push in the same turn as every commit (owner, 2026-09-22), with the repo's check run and the pushed range reported; commit paths come from this session's own edits, diffed against `git status`.** Full account: [docs/working-record.md](docs/working-record.md).
- **Per-language films are pending: say so in the first reply of each session.** Full account: [docs/app-store-submission.md](docs/app-store-submission.md).

## What the guard does

Detects in JavaScript, blocks at the network layer: a caught attempt names a
host, and the background page turns it into a `declarativeNetRequest` rule so the
retry never loads. Per-site shortcuts live in `Extension/Resources/sites/recipes.js`.
Full account: [docs/redirect-mechanism.md](docs/redirect-mechanism.md).

## Rules and the record

Every cross-site destination a page reaches for gets a row in the popup, keyed by
base domain, marked blocked or allowed. A rule set for one site beats a rule set
everywhere, which beats the default, and the default ships as block.
`UndirectSite.decide()` is the only place that order lives. Deception detectors
do not consult the rules. Full account:
[docs/rules-and-record.md](docs/rules-and-record.md).

## Shipping

Store copy, review notes and the App Privacy answers live in
`Support/AppStore/metadata.md`, each counted against Apple's limit. What still
needs the Account Holder is in [docs/app-store-submission.md](docs/app-store-submission.md).

## Tests

`python3 tests/build.py && python3 tests/serve.py`, then open
`http://127.0.0.1:8766/run.html` **with the extension switched off in that
browser**, or the guard vetoes the harness's own clicks. Then
`bun tests/background.test.mjs` for the background half. The browser harness
forces `mode: "everywhere"` in its stub, since the shipping default guards no
site until a toolbar press turns it on. [tests/README.md](tests/README.md).

Folder-specific rules (guard detection, packaging, app screens, app-extension
messages, store release) sit in `.claude/rules/`.
