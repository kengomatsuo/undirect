---
paths:
  - "Extension/Resources/background.js"
  - "Extension/SafariWebExtensionHandler.swift"
  - "App/RulesModel.swift"
  - "App/SharedStore.swift"
  - "App/WatchedView.swift"
---

- **The app's `dispatchMessage` never wakes the background page**, so every app
  change is also queued in `from-app.json` and handed over in the native
  handler's reply; `readState()` waits for that on waking (2026-10-01). Full
  account: [docs/safari-constraints.md](../../docs/safari-constraints.md).
- **Anything set from a private tab stays in `storage.session` and out of the
  snapshot**, because Safari runs one extension copy across private and
  ordinary windows. Check `tab.incognito` before writing a site name anywhere
  the app reads (2026-10-01). Same doc.
- **The Mac app lists and edits the rules; the iOS app shows the same list
  read-only**, because Apple gives no way for a containing iOS app to message
  its extension. They travel through an app group: the extension pushes a
  snapshot file, the app reads it, and edits come back through
  `SFSafariApplication.dispatchMessage`. macOS uses the team-prefixed group id
  and needs no registration; iOS needs the registered `group.` form and a
  profile. Full account: [docs/rules-and-record.md](../../docs/rules-and-record.md).
