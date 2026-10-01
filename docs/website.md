# Website

`undirect.matsuokengo.com`, served by GitHub Pages from the `gh-pages` branch.
`web/` is the source; `dist/` (gitignored) is the build.

## Build and publish

- `web/deploy.sh check` generates `dist/` and runs `web/_generator/validate.py`:
  internal links and assets resolve, hreflang is reciprocal, every page is in the
  sitemap, one h1 per page, canonical equals the page's own URL, JSON-LD parses.
- `web/deploy.sh serve` serves `dist/` at `http://127.0.0.1:8790`. Add `?stay`
  to a root URL to stop the language redirect.
- `web/deploy.sh web` runs the check, then rsyncs `dist/` onto `origin/gh-pages`
  through a throwaway worktree and pushes. `CNAME` is copied from `web/` on every
  build because the rsync deletes anything not in `dist/`.

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
`/demo/` is English only and is not generated. `site.js` sends a root visitor to
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

- `media/film.mp4` is `Film-v2.mp4` from `undirect-promo/out`, scaled to 1280 wide,
  H.264 CRF 30 with 64 kbit/s audio, about 1 MB. Its captions are English.
- `media/film-poster.webp` is the frame at 14 s.
- `img/*.webp` come from `.shots/captures`. The captures are English UI.
- The favicon, `icon*.png` and `og.png` derive from the extension's icon and
  `Support/icon/build.py`; `og.png` carries only the icon and the name.

## Not done

- Apple's official "Download on the App Store" badge artwork is not used. The
  button is text. Apple supplies the badge through its marketing tools.
- No Terms page. The footer links Apple's standard licence agreement.
- No press kit, changelog or FAQ page. The support page carries the FAQ.
