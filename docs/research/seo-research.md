# SEO for matsuokengo.com, undirect.matsuokengo.com and cutling.matsuokengo.com (research for ASG50, 2026-11-20)

Each finding is written here as it lands. The AI-file research that came before is in `ai-files-research.md`; it is not repeated.

## Google Search Console, domain property `sc-domain:matsuokengo.com` (read in the owner's Chrome, 2026-11-20)

The domain property covers all three sites. Data starts 2026-11-06.

| Report | What it shows |
|---|---|
| Performance, 16 months | 0 clicks, 2 impressions, average position 5. No query has data. |
| Page indexing (last update 2026-11-16) | 14 indexed, 573 not indexed: 561 "Discovered - currently not indexed" (last crawled N/A: Google knows the URL and has never fetched it), 12 "Page with redirect". |
| Indexed pages | `matsuokengo.com/`, `cutling.matsuokengo.com/en-us/` and 12 Cutling `/<lang>/support/` pages. **No Undirect page is indexed**, and Cutling's root and its English home are the only Cutling non-support pages in. |
| Page with redirect | `http://matsuokengo.com/` and 11 Cutling URLs without the trailing slash (`/en-us`, `/<lang>/support`): something links to them without the slash. |
| Sitemaps | `undirect.matsuokengo.com/sitemap.xml` submitted 2026-11-07, read 2026-11-16, Success, 153 pages. `cutling.matsuokengo.com/sitemap.xml` submitted 2026-11-07, read 2026-11-20, Success, 421 pages. **No sitemap for matsuokengo.com** (it has none to submit). |
| Core Web Vitals | No data on mobile or desktop (too little Chrome traffic for CrUX). |
| Enhancements | None: Google has found no structured data it reports on (no Product snippets, breadcrumbs, FAQ, etc.). |
| Videos | 1 page with a video, not indexed. |

## Live checks (curl, 2026-11-20)

| Site | Finding |
|---|---|
| matsuokengo.com | Every path returns the home page with HTTP 200: `/sitemap.xml`, `/llms.txt`, `/favicon.ico`, `/en-us/`, `/nonexistent-xyz` all serve the same 58,945-byte HTML. Headers are Cloudflare's (`server: cloudflare`, `access-control-allow-origin: *`, `cache-control: public, max-age=0, must-revalidate`), with none of GitHub Pages' (`x-github-request-id`, `via: 1.1 varnish`), although GitHub's Pages API says the repo serves `gh-pages` at `matsuokengo.com` with `custom_404: false`. `/index.html` answers 308 to `/`. Confirmed in the Cloudflare dashboard: matsuokengo.com is the Pages project `kengomatsuo` (also `kengomatsuo.pages.dev`), production built from `gh-pages` with automatic deployments, previews from `main`; live is the 2026-11-08 deploy `15982f4`. With no top-level `404.html` in the build, Pages treats the site as a single-page app and answers every unknown path with `index.html` and 200. Cloudflare also rewrites the two `mailto:` links into `/cdn-cgi/l/email-protection` and adds its email-decode script (Email Obfuscation). |
| matsuokengo.com | `robots.txt` is `User-agent: * / Allow: /`, no `Sitemap:` line. |
| undirect.matsuokengo.com | `/nonexistent` → 404 (10.7 KB page). `sitemap.xml` 754 KB for 153 URLs. |
| cutling.matsuokengo.com | `/llms.txt` → 404: ASG44's Cutling deploy had not gone live at 07:07 UTC. `sitemap.xml` 2.6 MB for 421 URLs. |
| matsuokengo.com | `kengomatsuo.pages.dev` answers 200 with the same home page and no `X-Robots-Tag` (a crawlable duplicate host); preview deployments (`<hash>.kengomatsuo.pages.dev`) carry `x-robots-tag: noindex`. |
| matsuokengo.com | Home: title `Portfolio \| Kenneth` (19 chars), description `Kenneth Fang, developer and researcher.` (39 chars), no canonical, no JSON-LD. `/undirect/` (73 words) and `/cutling/` (50 words): 116-char descriptions, no canonical, no JSON-LD. `/privacy/` has description and canonical. No page links `kenneth@` profiles in machine-readable form (no `sameAs`). |

## Page audit of the app sites (fetch of head tags, 2026-11-20)

| Page | Finding |
|---|---|
| undirect `/` and `/en-us/` | Same English page twice (464-468 words), each canonical to itself; `/` is declared `en-GB` in hreflang, `/en-us/` `en-US`, and x-default is present. 51 hreflang links. Title 55 chars, description 165 chars. JSON-LD: WebSite, SoftwareApplication. |
| undirect `/stop-safari-redirects/`, `/compare/` | English only (hreflang `en` + `x-default`), WebPage + BreadcrumbList. |
| undirect `/support/` | FAQPage + BreadcrumbList, 271 words. |
| undirect sitemap | 153 URLs: 55 home pages, 49 support, 49 privacy; each `<url>` repeats all ~51 hreflang alternates. |
| cutling `/` | Same page as `/en-us/`, canonical to `/en-us/` (correct). No `meta robots`. JSON-LD: SoftwareApplication only (no WebSite/Organization). |
| cutling `/en-us/faq/` | Title `FAQ \| Cutling` (13 chars), **no meta description, no JSON-LD** (no FAQPage). |
| cutling `/en-us/mac/` | Title `Cutling for Mac` (15 chars), no JSON-LD. |
| cutling `/en-us/compare/` | English only, WebPage + BreadcrumbList. |

## Bing Webmaster Tools (read in the owner's Chrome, 2026-11-20)

| Site | What it shows |
|---|---|
| cutling.matsuokengo.com | Added before this session. 0 clicks, 12 impressions (Nov 11-18). Sitemap read. Recommendations: 31 errors on 30 pages: 2 pages without a description (`/`, `/en-ca/support/`), 1 without H1, 4 with identical descriptions, 20 titles too short (Bing's advice: 50-60 characters), 3 descriptions too short, and too few inbound links from high-quality domains. |
| undirect.matsuokengo.com | Added before this session. 0 clicks, 0 impressions. Sitemap submitted 2026-11-07, Success, 151 URLs. IndexNow page listed one URL (the Yandex-shared ping of 07:29 UTC). |
| matsuokengo.com | Not there. Added 2026-11-20 by this session (manual, meta-tag verification `msvalidate.01` in the home page head). Bing's "Import from Google Search Console" needs a Google account choice on accounts.google.com, which the Chrome extension may not act on. |
| All | Bing offers AI Performance (beta: citations in Copilot and Bing AI answers), Site Scan, Keyword Research, URL Submission and Backlinks reports. |

## IndexNow 403 (2026-11-20)

- Undirect: `api.indexnow.org` and `www.bing.com/indexnow` answered `403 {"errorCode":"UserForbiddedToAccessSite"}` although `/<key>.txt` served the right 32-character key and `keyLocation` was sent; `yandex.com/indexnow` answered 202 to the same body. Cutling's key, set up the same day the same way, got 200 from Bing.
- Cause, by elimination: the deploy pings IndexNow straight after `git push`, before GitHub Pages serves the new build, so the first ping on 2026-11-07 came before the key file existed, and Bing kept refusing that key. A write-up of the same 403 (dev.to/samtj, 2026-07-31) shows Yandex answers 202 to submissions Bing rejects, so a 2xx from Yandex proves nothing.
- Fix (undirect 79bd8c0): a new key, and `submit_indexnow` waits until the key file serves the key before it pings. Read back: Bing and api.indexnow.org answer 200 with the new key; the deploy logged `IndexNow: HTTP 202 for 153 URLs`.

## What was fixed and read back live (2026-11-20)

| Site | Change | Commit | Read back |
|---|---|---|---|
| cutling | Description on every sub page in every language, built from that page's own translated sentences (width-aware for CJK); sub-page titles carry the store subtitle; FAQPage on the FAQ; BreadcrumbList on every sub page | Cutling 19760439 | Audit of all 421 sitemap URLs: pages without description 240 → 0; titles under 40 characters 357 → 2; IndexNow 200 for 421 URLs |
| undirect | Support and privacy titles carry the store subtitle in every language; IndexNow key and timing | undirect 79bd8c0 | `/support/` title "Support - Stop Safari redirects & tabs \| Undirect"; IndexNow 200 |
| matsuokengo.com | 404.html (stops Pages' SPA fallback), sitemap.xml and canonical URLs from `seo.py`, robots.txt Sitemap line, llms.txt, `_headers` noindex on `kengomatsuo.pages.dev`, title/description/canonical, Person + WebSite + SoftwareApplication JSON-LD with sameAs, Bing verification tag | kengomatsuo b32f7cc | deploy pending at the time of writing |
| Search Console | Request indexing for `undirect.matsuokengo.com/` (was "URL is unknown to Google") | — | "Indexing requested" |

Left as is: Cutling's App Store support URLs have no trailing slash, so Google lists 11 `/<lang>/support` URLs as "Page with redirect"; each is a 301 to the indexed slash URL. Identical descriptions across `en-us`, `en-gb`, `en-au`, `en-ca`, `en-in` are the same English page per region, tied by hreflang.

## Later on 2026-11-20

- Search Console sitemaps: matsuokengo.com Success 15 pages (read 2026-11-20); undirect Success 153; cutling Success 421. Request indexing done for undirect `/`, `/stop-safari-redirects/`, `/compare/`, cutling `/en-us/compare/`, `/en-us/mac/`; further requests failed (Search Console error, likely the daily quota).
- Bing: matsuokengo.com verified (meta tag `msvalidate.01` and `BingSiteAuth.xml` both served; Bing's verify button showed "Unexpected error" yet the site became authorised), sitemap submitted and processing.
- Lighthouse (local, mobile): matsuokengo.com SEO 100, accessibility 100, best practices 100; undirect robots.txt failure was the `Agentmap:` line, now a comment in both sites (undirect 9a3df17, Cutling 3ed6a5d0). Performance: undirect /en-us/ 61 → 99, cutling /en-us/ 88 → 100 (undirect d02de3d, Cutling 9694852d, f9bbfc41). Cache lifetime stays at GitHub Pages' 10 minutes.
- Icon identity after ChatGPT showed another app's shield and a screenshot as the apps' images: named icon files (`undirect-app-icon.png`, `cutling-app-icon.png`, and copies under matsuokengo.com/images/), MobileApplication JSON-LD with ImageObject, sameAs App Store, alt text, icon line in llms.txt (undirect 231e324, Cutling 798c382e, kengomatsuo c42393c). ChatGPT's Indonesian storefront came from the reader's region: no site file names a country.
- Buyer-voice rewrite of both llms.txt files, Agent Skills and ARD queries from `undirect-voice-of-customer.md` and `cutling-voice-of-customer.md` (undirect 7c982fc, Cutling 8c055d28), each naming what the app does not do.
- AI baseline before indexing: `ai-answers-baseline.md` (Undirect named in 2 of 22 answers, Cutling 0 of 20).
