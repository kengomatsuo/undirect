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
