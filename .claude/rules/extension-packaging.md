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
- **The guard runs only on a site switched on from the toolbar button, because
  one misjudged page under an always-on guard writes a permanent global network
  block and takes a whole domain offline everywhere.**
  `settings.mode: "everywhere"` restores the always-on behavior. An off
  site gets an outlined icon, no badge and no popup, so one press turns it on.
  Full account: [docs/rules-and-record.md](../../docs/rules-and-record.md).
