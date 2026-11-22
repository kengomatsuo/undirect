---
paths:
  - "web/**"
  - "docs/website.md"
---

- **The website is generated, never hand-edited in its build folder (`$(./build-dir.sh)/site`, temp).** `web/_generator/generate.py` builds 50 languages from the store copy, the app catalog and `web/_generator/strings/<code>.json`; `web/deploy.sh check` builds and validates, `web/deploy.sh web` publishes to gh-pages. English stays at the root so the App Store's `/support/` and `/privacy/` URLs keep working. Full account: [docs/website.md](../../docs/website.md).

**`web/_generator/ai_files.py` is one file kept identical in undirect and Cutling; each site says what it is in its own `ai_facts.py`.** A change to one copy is made to the other in the same turn, so both sites keep serving the same llms.txt, robots.txt and `.well-known` shapes.

**`web/_generator/store-source.js` is one file kept identical in undirect and Cutling.** It gives every App Store button the visit's source as its campaign token (`?ref=`, `?utm_source=`, `?ct=` or the referring site), so App Store Connect > Campaigns names a source the same way for both apps; a change to one copy is made to the other in the same turn. A new App Store link anywhere else is a campaign link with `pt` and its own `ct`, listed in `docs/plans/app-store-growth/campaigns.md` in the undirect repo.
