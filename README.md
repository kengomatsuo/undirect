# Undirect

A Safari extension for macOS and iOS. It stops a page from taking your click to
open a window or send you somewhere you did not ask for.

## What it stops

Pop networks do not wait for you to click their ad. They lay a transparent screen
over the page and let you click it by accident, or they build a link and click it
themselves, or they open a blank tab and rewrite the address of the one you were
reading. Undirect watches for those shapes, clears them, and blocks the host so
the next attempt never loads.

Where a site has its own way to turn ads off, Undirect uses it instead of
fighting the page. lunarx.to is the first of those.

## Build

Needs Xcode 26 and [XcodeGen](https://github.com/yonaskolb/XcodeGen).

```bash
brew install xcodegen
xcodegen generate
open Undirect.xcodeproj
```

Build and run the `Undirect-macOS` scheme once. Then in Safari:

1. Settings, Developer, turn on "Allow unsigned extensions" if you signed to run
   locally.
2. Settings, Extensions, turn on Undirect.
3. Give it access to every site. It has nothing to look at otherwise.

The iOS targets build and are wired up. They have not been run on a device yet.

## Tests

```bash
python3 tests/build.py
python3 tests/serve.py &
open http://127.0.0.1:8766/run.html
```

## Layout

| Path | What it is |
| --- | --- |
| `Extension/Resources/content/guard.js` | watches the page, clears traps, reports hosts |
| `Extension/Resources/content/bridge.js` | the same job in the page's own world, where `window.open` lives |
| `Extension/Resources/background.js` | turns a reported host into a block rule |
| `Extension/Resources/sites/recipes.js` | per-site shortcuts |
| `App/` | the container app: status, and the rules list |
| `App/SharedStore.swift` | the app group file both sides read |
| `docs/` | what the pop code does, and what Safari allows |
