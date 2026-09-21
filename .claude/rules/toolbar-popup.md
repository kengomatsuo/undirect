---
paths:
  - "Extension/Resources/background.js"
  - "Extension/Resources/manifest.json"
  - "Extension/Resources/popup/**"
---

- **Every press of the toolbar button must open something**: a tab with no site
  (the Start Page) keeps the popup, and only a real site that is off clears it for
  the one-press turn-on. A press that did nothing got the Mac app rejected under
  2.1(a) (2026-09-21, build 3). Full account:
  [docs/app-store-submission.md](../../docs/app-store-submission.md).
