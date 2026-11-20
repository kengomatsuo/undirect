# Website

`undirect.matsuokengo.com`, served by GitHub Pages from the `gh-pages` branch.
`web/` is the source; the build goes to `$(./build-dir.sh)/site`, a temp folder outside
the repo that macOS empties of anything untouched for three days.

## Build and publish

- `web/deploy.sh check` generates the site and runs `web/_generator/validate.py`:
  internal links and assets resolve, hreflang is reciprocal, every page is in the
  sitemap, one h1 per page, canonical equals the page's own URL, JSON-LD parses.
- `web/deploy.sh serve` serves the built site at `http://127.0.0.1:8790`. Add `?stay`
  to a root URL to stop the language redirect.
- `web/deploy.sh web` runs the check, then commits the built site as the whole tree of a
  new commit on `origin/gh-pages` through a throwaway index and pushes it; nothing is
  checked out. `CNAME` is copied from `web/` on every build because anything not in
  the built site disappears from gh-pages.

## Where the words come from

| Part | Source |
| --- | --- |
| Name, subtitle, hero text, problem text, "every destination", private and requirements sections | `Support/i18n/store/<code>.json` (store description, seven paragraphs) |
| The three feature titles and sentences, "Every destination" heading | `App/Localizable.xcstrings` |
| Navigation, privacy page, support page, demo band, 404, footer | `web/_generator/strings/<code>.json` (48 keys) |

A strings file may say `"_inherit": "<code>"` and override single keys. `en-US`,
`en-AU`, `en-CA` inherit `en-GB`; `es-MX` inherits `es-ES`; `fr-CA` inherits `fr-FR`.
The site strings were written for each language from its meaning and checked
against that language's store copy and extension strings for terms, never
translated from the English clause by clause. No native speaker has read them.
The generator refuses a language with a missing or extra key, and any dash or
middot in a string.

## URLs

English (`en-GB`) is the root: `/`, `/support/`, `/privacy/`. Every other store
language lives under its lowercased code (`/ja/`, `/zh-hant/`, `/pt-br/`, `/no/`).
`/demo/` is English only and is not generated. `/stop-safari-redirects/` and `/compare/` are English only, generated from `web/_generator/en_pages.py`, carry hreflang `en` and `x-default` only, and are linked from the root footer. `site.js` sends a root visitor to
their language once, from a saved choice (`localStorage` `undirect_lang`) or the
browser's language list; picking a language in the menu saves the choice, and
picking English stops further redirects. Crawlers never run it, so the root
page is real content.

## What each page carries

Title, description, canonical, `hreflang` for all 50 languages plus `x-default`,
Open Graph and Twitter card, the Smart App Banner meta (`app-id=6810513194`),
light and dark theme colours, JSON-LD (`SoftwareApplication` on the home page,
`FAQPage` and `BreadcrumbList` on support, `WebPage` on privacy), a skip link.
`sitemap.xml` repeats the alternates; `robots.txt` points at it; `404.html`
picks the visitor's language by script.

## Assets

- `media/film.mp4` is `Film-v3.mp4` from `undirect-promo/out`, scaled to 1280 wide,
  H.264 CRF 30 with 64 kbit/s audio, about 1.7 MB. Its captions are English.
- `media/film-poster.webp` is the frame at 14 s.
- `img/*.webp` come from `.shots/captures`. The captures are English UI.
- The favicon and `icon*.png` derive from the extension's icon and
  `Support/icon/build.py`.
- `og.png` (1200x630, the link preview) is the Mac frame 01 cover:
  `python3 Support/AppStore/render_screenshots.py --kinds mac --locales en` writes
  `Support/AppStore/listing-cover.png` and scales it into `web/og.png`.

## App Store badge

`web/_generator/fetch_badges.py` downloads Apple's own black badge for each site
language from `toolbox.marketingtools.apple.com` and writes `badges/*.svg` and
`badges.json`. Apple's rules (checked 2026-10-01): artwork unmodified, black
badge preferred (white only when black looks heavy, so the dark theme keeps black),
at least 40 px tall (we use 48), clear space of a quarter of the height, one badge
per layout (the home page has one, in the hero; the closing band is a text link),
"App Store" never translated. Apple has no Hindi badge, so `hi` shows the English
one; `bn-BD` uses `bn-in`, `ur-PK` uses `ur-in`, `ar-SA` uses `ar-ar`, and the
English variants share `en-us`. The `cta_get` string is the image's alt text.

## Not done

- No Terms page. The footer links Apple's standard licence agreement.
- No press kit, changelog or FAQ page. The support page carries the FAQ.

## IndexNow

The key is `INDEXNOW_KEY` in `generate.py` (public by design); the build writes `<key>.txt` at the site root. After the gh-pages push, `deploy.sh web` runs `generate.py --indexnow`, which POSTs every sitemap URL to `api.indexnow.org` and prints the HTTP status. Anything but 200 or 202 prints a warning and never fails the deploy.

## Files for AI assistants and agents

`web/_generator/ai_files.py` writes them after the pages, from what `ai_facts.py` says about Undirect (store listing, live price, `project.yml` minimums, the English pages): `/llms.txt` and `/llms-full.txt` (llmstxt.org v2), an `index.md` beside each English page (linked by `rel="alternate" type="text/markdown"`, plus `rel="describedby"` and `rel="ard"`), `robots.txt` naming every AI crawler on the ai.robots.txt list (read at build time, `ai_agents.json` when offline) as allowed with `Content-Signal: search=yes, ai-input=yes, ai-train=yes` and an `Agentmap:` line, `/.well-known/ard.json` (Agentic Resource Discovery, audited by Chrome Lighthouse's Agentic Browsing category), `/.well-known/agent-skills/` (an Agent Skill named `undirect`), `/.well-known/security.txt` and `.nojekyll`, without which GitHub Pages' Jekyll would turn `index.md` into HTML and drop `/.well-known/`. App Store links in these files carry `ct=llms`, so App Store Connect counts what AI answers send. `ai_files.py` is the same file in Cutling: change both. `python3 web/_generator/ai_files.py` refreshes `ai_agents.json`.
