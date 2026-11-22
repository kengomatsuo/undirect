---
paths:
  - "project.yml"
  - "deploy.sh"
  - "fastlane/**"
  - "Extension/**"
---

- **Only one `Undirect.app` stays registered on the Mac after a build, and swapping copies wipes the extension's storage, so save `snapshot.json` first.** Full account: [docs/safari-constraints.md](../../docs/safari-constraints.md).
- **A navigation button is pressed and its landing page watched before the screen counts as done; App Review rejects a label that lands elsewhere under 2.1.** Full account: [docs/app-store-submission.md](../../docs/app-store-submission.md).
- **Calling a Safari behaviour impossible needs a test on the exact platform meant and two shipping extensions cited; until then it is "not yet found".** Full account: [docs/safari-constraints.md](../../docs/safari-constraints.md).
