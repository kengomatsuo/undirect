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

## The app's message does not wake the background page (2026-10-01)

The owner reported that Stop beside a guarded site in the Mac app did nothing.
`SFSafariApplication.dispatchMessage` starts the native handler and reports
success, but an unloaded background page never receives the message: its
`connectNative` port went with it. Apple's own sample never says otherwise,
and developers report the same on the forums
([thread 790310](https://developer.apple.com/forums/thread/790310)). The
manifest sets `"persistent": false` on both platforms, so the page is usually
asleep when the app window is open.

So every change from the app is also written to `from-app.json` in the group
container (`SharedStore.enqueue`). The native handler moves that file aside and
returns its changes in the reply to whatever the background page sends next.
On waking, the page asks first (`collectFromApp`), and `readState()` waits for
that, so a site stopped from the app is off before its next page is judged.
Applying a change twice does no harm, which covers one arriving both live and
from the queue. The app shows each change at once and keeps showing it until
the extension writes a snapshot newer than it (`RulesModel.pending`).

Tested on the Mac with Safari 26 on 2026-10-01. With the background page
asleep, Stop left the change in `from-app.json` and the snapshot did not move
for six seconds; the next page load collected it and the site was gone. With
the page awake the live message did not arrive either, and the queue waited
until the page next talked to the handler. So a page load asks for the queue
too (`collectOnLoad`, at most every three seconds, never on iOS), and a Stop
pressed while the page was awake landed on the next load. A debug build takes
`-UndirectGuardSite <site>`, which queues a site switched on, so Stop can be
tested without pressing Safari's button: computer use can only look at Safari.
To test a debug build beside the App Store copy, unregister the App Store
appex with `pluginkit -r` and register it again afterwards; pluginkit elects
one copy per bundle id. The swap wipes that bundle id's extension storage:
the App Store copy came back with no guarded sites and no rules, so save
`snapshot.json` first and expect to switch sites on again afterwards.

## Private windows share the extension (2026-10-01)

Safari runs one copy of the extension across private and ordinary windows
(MDN compatibility data: "When allowed, operates in spanning mode"), so a site
switched on in a private window landed in `watched` and the app listed it.
`tab.incognito` tells the two apart. A site switched on, or a one-site rule
set, from a private tab goes to `privateWatched` or `privatePerSite` in
`storage.session`. The snapshot never carries either, they apply only in
private tabs, and they are cleared when the last private tab closes. Off clears
both lists, wherever it was pressed.

Content scripts cannot read `storage.session`, so a page's own guard that read
only `storage.local` stayed off on a site switched on in a private window: the
popup said On and the invisible layer still took the press. When storage says
no, the top frame now asks the background (`undirect:active`), which answers
with the site's rules for that tab too. Checked in the iOS 26 Simulator on
2026-10-01 with the Bytebarn demo: the layer is swept in a private tab, and the
snapshot never names the site. Safari also has to be allowed to run Undirect
in Private Browsing (Manage Extensions in the page menu) before any of this
applies.

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
