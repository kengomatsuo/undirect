---
paths:
  - "project.yml"
  - "Extension/Resources/manifest.json"
  - "Extension/Resources/background.js"
---

- **Safari reads `manifest.json` from the appex root, so `project.yml` lists the
  resource folders one by one.** Copying `Extension/Resources` as one folder
  reference buries everything a level deep and breaks the iOS build at
  `ValidateEmbeddedBinary`. A new top-level folder under `Extension/Resources`
  needs a line in both extension targets. Full account:
  [docs/safari-constraints.md](../../docs/safari-constraints.md).
- **iOS requires `"persistent": false` on the background page**, so anything
  kept only in a variable is lost when Safari unloads it. Session state lives in
  `storage.session`. Full account: [docs/safari-constraints.md](../../docs/safari-constraints.md).
- **Judging every site automatically cost a whole domain.** A misjudged Bing
  result and a `teams.live.com` popup each wrote a permanent global network
  block, and `microsoft.com` went unreachable everywhere (2026-09-16). The
  guard now runs only on a site switched on from the toolbar button;
  `settings.mode: "everywhere"` restores the old always-on behavior. An off
  site gets an outlined icon, no badge and no popup, so one press turns it on
  (2026-09-17). Full account: [docs/rules-and-record.md](../../docs/rules-and-record.md).
