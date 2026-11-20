# Undirect

<p>
<a href="https://macbrowse.com"><img src="https://macbrowse.com/badge/listed-light.svg" alt="Listed on Mac Browse" height="48"></a>
<a href="https://macappindex.com/apps/undirect?ref=badge"><img src="https://macappindex.com/apps/undirect/badge.svg?theme=light&height=56" alt="Listed on Mac App Index" height="48"></a>
<a href="https://macpip.com/apps/undirect?ref=badge"><img src="https://macpip.com/badge/undirect.svg" alt="Listed on MacPip" height="48"></a>
<a href="https://nativeshelf.com/undirect?ref=badge"><img src="https://nativeshelf.com/badge/dark.png?v=6" alt="Featured on NativeShelf" height="48"></a>
<a href="https://ipip.fyi/apps/undirect?ref=badge"><img src="https://ipip.fyi/badge/undirect.svg" alt="Undirect on iPip" height="48"></a>
<a href="https://postyourstartup.com/startup/undirect?ref=badge"><img src="https://postyourstartup.com/api/badge/undirect?theme=light" alt="Featured on PostYourStartup" height="48"></a>
<a href="https://launchigniter.com/product/undirect?ref=badge-undirect"><img src="https://launchigniter.com/api/badge/undirect?theme=light" alt="Featured on LaunchIgniter" height="48"></a>
<a href="https://ailaun.ch/projects/undirect?utm_source=badge"><img src="https://ailaun.ch/ailaunch/images/badges/featured-on-light.svg" alt="Featured on AI Launch" height="48"></a>
<a href="https://www.nxgntools.com/tools/undirect?utm_source=undirect"><img src="https://www.nxgntools.com/api/embed/undirect?type=FIND_US_ON" alt="Find us on NxGn Tools" height="48"></a>
<a href="https://alternativeto.net/software/undirect/about/?utm_source=badge&utm_medium=referral"><img src="https://alternativeto.net/static/badges/badge-compact-color.svg" alt="Undirect | AlternativeTo" height="48"></a>
<a href="https://indieappcatalog.com/app/5526"><img src="https://indieappcatalog.com/badge/listed-on-indie-app-catalog-black.svg" alt="Listed on Indie App Catalog" height="48"></a>
<a href="https://macbase.app/apps/undirect?ref=badge"><img src="https://macbase.app/badge/featured-on-macbase.svg" alt="Featured on MacBase" height="48"></a>
<a href="https://www.producthunt.com/products/undirect?utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-undirect"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1310867&theme=light" alt="Undirect on Product Hunt" height="48"></a>
</p>

A Safari extension for macOS and iOS. It stops a page from taking your click to
open a window or send you somewhere you did not ask for.

Get it on the [App Store](https://apps.apple.com/app/apple-store/id6810513194?pt=127609326&ct=github-readme&mt=8), one purchase for Mac, iPhone and iPad.

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
