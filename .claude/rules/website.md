---
paths:
  - "web/**"
  - "docs/website.md"
---

- **The website is generated, never hand-edited in its build folder (`$(./build-dir.sh)/site`, temp).** `web/_generator/generate.py` builds 50 languages from the store copy, the app catalog and `web/_generator/strings/<code>.json`; `web/deploy.sh check` builds and validates, `web/deploy.sh web` publishes to gh-pages. English stays at the root so the App Store's `/support/` and `/privacy/` URLs keep working (2026-10-01). Full account: [docs/website.md](../../docs/website.md).

**`web/_generator/ai_files.py` is one file kept identical in undirect and Cutling (2026-11-20); each site says what it is in its own `ai_facts.py`.** A change to one copy is made to the other in the same turn, so both sites keep serving the same llms.txt, robots.txt and `.well-known` shapes.
