---
paths:
  - "web/**"
  - "docs/website.md"
---

- **The website is generated, never hand-edited under `dist/`.** `web/_generator/generate.py` builds 50 languages from the store copy, the app catalog and `web/_generator/strings/<code>.json`; `web/deploy.sh check` builds and validates, `web/deploy.sh web` publishes to gh-pages. English stays at the root so the App Store's `/support/` and `/privacy/` URLs keep working (2026-10-01). Full account: [docs/website.md](../../docs/website.md).
