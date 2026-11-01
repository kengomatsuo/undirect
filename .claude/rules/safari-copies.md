---
paths:
  - "project.yml"
  - "deploy.sh"
  - "fastlane/**"
  - "Extension/**"
---

- **Only one `Undirect.app` stays registered on the Mac after a build, and swapping copies wipes the extension's storage, so save `snapshot.json` first (2026-09-17 and 2026-10-01).** Full account: [docs/safari-constraints.md](../../docs/safari-constraints.md).
- **A navigation button is pressed and its landing page watched before the screen counts as done; a label that lands elsewhere got iOS 1.0 (3) rejected under 2.1 (2026-09-21).** Full account: [docs/app-store-submission.md](../../docs/app-store-submission.md).
- **Calling a Safari behaviour impossible needs a test on the exact platform meant and two shipping extensions cited; until then it is "not yet found" (2026-10-03).** Full account: [docs/safari-constraints.md](../../docs/safari-constraints.md).
