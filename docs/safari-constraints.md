# What Safari allows, checked 2026-09-08

Apple's docs, read this session. Each line changed something in the code.

## Content scripts

`scripting.ExecutionWorld` arrived in Safari Technology Preview 251, dated
26 August 2026, so no shipping Safari honours `world: "MAIN"` in the manifest.
The page-world half of the guard is a separate file that the content script
appends as a `script` element, declared in `web_accessible_resources`. See
`content/guard.js` and `content/bridge.js`.

`scripting.executeScript` ignores `injectImmediately` in Safari. The manifest's
`content_scripts` with `run_at: "document_start"` is the only dependable early
hook, so that is what the manifest uses.

If a page's CSP blocks the appended script, the page-world half never runs. The
guard notices, and the popup says so.

## Blocking

`block` needs the `declarativeNetRequest` permission. `redirect` and
`modifyHeaders` need `declarativeNetRequestWithHostAccess`, which asks the user
per site. Undirect only blocks, so it stays on the plain permission.

`updateDynamicRules` and `updateSessionRules` both work, which is what lets the
blocklist grow while you browse.

`getMatchedRules()` answers in a different shape from Chrome's. On iOS 26 each
entry is `{ request: { url }, tabId, timeStamp }` with no `rule` object, so a
lookup by `rule.ruleId` finds nothing and every stop at the request went
unrecorded. `noteNetworkBlocks()` falls back to the request URL's base domain,
kept only when a learned rule names that host (2026-09-17).

`webRequest` cannot block anywhere, and does not exist on iOS. There is no
fallback if declarative rules stop being enough.

Source: [Blocking content with your Safari web
extension](https://developer.apple.com/documentation/safariservices/blocking-content-with-your-safari-web-extension).

## The bundle layout trap

Safari reads `manifest.json` from the appex bundle root. Copying the extension's
`Resources` folder as one folder reference puts everything a level too deep, and
on iOS it also breaks the bundle: `CFBundle` finds a `Resources` directory,
looks for `Resources/Info.plist`, finds none, and the build fails at
`ValidateEmbeddedBinary` with "Couldn't load Info dictionary".

So `project.yml` lists the pieces one by one instead of the folder. Adding a new
top-level folder under `Extension/Resources` means adding it there too.

## Container app

`SFSafariApplication` is macOS only, so only macOS gets a button that opens the
extension settings.

`SFSafariExtensionManager` reads the on/off state. The method differs by
platform: macOS has `getStateOfSafariExtension`, iOS has `getStateOfExtension`,
and iOS only got the class in 26.2. `App/ExtensionStatus.swift` splits on that.

## The background page is not persistent on iOS

App Store Connect rejected the first iOS upload on 2026-09-10: when the manifest
lists background `scripts` and no `service_worker`, iOS and iPadOS require
`"persistent": false`. Safari may then unload the page between events, and
anything held only in a variable goes with it.

The rules and the lifetime count were already in `storage.local`. The session
badge (`sessionBlocked`) and each tab's rows (`perTab`) were not, so
`background.js` now mirrors both into `storage.session`, which Safari has
supported since 16.4 and which clears when the browser quits, the same span the
badge describes. A restore adds to counts noted before it finishes, never
replacing them, and the popup waits for it.

The same upload also needed every orientation on iPad, which multitasking
requires; iPhone stays portrait. `project.yml` sets the two per device.

## The popup cannot borrow Safari's own vibrancy

Verified 2026-09-16 on the iOS simulator, screenshot in hand: a translucent
background plus `backdrop-filter: blur()` on the popup's `body` computes and
applies (checked via `getComputedStyle`), and still renders as flat, opaque
white. Safari hosts the popup's `WKWebView` on a native layer that is not
itself transparent, so there is nothing behind the page for `backdrop-filter`
to blur. The frosted look of Safari's own native popovers (Page Zoom, Auto-Play,
and the rest) comes from a real `NSVisualEffectView`/`UIVisualEffectView` at
the window level, which a web extension's popup page has no way to reach.
`Extension/Resources/popup/popup.css` uses a flat fill for this reason, not by
oversight.
