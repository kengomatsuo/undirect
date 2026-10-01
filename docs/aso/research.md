# ASO research for Undirect

Fetched 2026-10-01. IDs (A1, P2, M2 ...) point to `sources.md`; measurements are in `data/` and can be rerun (`python3 data/search2.py`, `data/hints.py`, `data/pages.py`). Target keywords and the per-locale lists are in `keywords.md`; copy proposals are in `proposal.json`.

## The ten findings that matter most

1. **Undirect is invisible in search today.** The live listing (version 1.0, released 2026-09-21) has languages `["EN"]`, no subtitle, the bare name "Undirect" and 0 ratings (M5; the product page shows the category "Utilities" where a subtitle would sit). Across 201 live queries in 41 storefronts Undirect appears only for words that exist solely in its keyword field: US 'popunder' (rank 6 of 6 apps), 'hijack' (38 of 39), 'redirect' (230 of 234), FR 'redirection' (151 of 161), ID 'pop up blocker' (100 of 249). It is absent from the top 250 for 'pop up blocker', 'popup blocker', 'ad blocker' and 'safari extension' in every storefront (M2).
2. **Most of the words the current copy targets are not typed.** App Store type-ahead returns nothing for 'popunder', 'pop under', 'redirect safari', 'stop redirect', 'unwanted tab', 'tab hijack'. The bare 'redirect' completes to app names and, in second place in the US and GB, to 'redirect blocker'. What it returns for the product family: 'pop up blocker', 'popup blocker', 'safari pop up blocker', 'block pop up ads', 'pop up ad blocker', 'safari ad blocker', 'tab blocker', 'stop ads' (US, M1). Completions show presence and order, not volume, so this is weak evidence about size and strong evidence that the words exist as queries.
3. **Apple's own list of search inputs is short.** "text relevance (matches for your app’s title, subtitle, keywords, and primary category)" plus behavior such as downloads and ratings (A1). The description is not on it, promotional text "doesn’t affect your app’s search ranking" (A1), and the 100-byte limit is bytes, not characters (A5). The developer name is searchable already (A5).
4. **The name outweighs everything else and Undirect's name holds no search word.** Appfigures, which tests rank effects daily, says "keywords that matter ... should always go into the name. The subtitle gets much less weight" (P3), and that a keyword repeated between name and subtitle hides the name copy (P3). Apple agrees the name should "hint at what your app does" (A2). A 15-rating app, Poper Blocker, ranks 4th in the US for 'pop up blocker' ahead of apps with 19,000 ratings, with "Block Ads & Popups Instantly" as its subtitle (M2). Ratings matter, and words still decide whether a small app gets in.
5. **en-GB is Undirect's most valuable field set.** In Apple's table en-GB is the default language of 135 of 175 storefronts and an additional language in 37 more: 172 of 175 (all but US, Japan, Canada) (A4, M4). Practitioners say additional languages are searched too (P4 to P6); Apple's page does not confirm it. en-US, en-GB, en-AU and en-CA currently hold the same keywords (current copy), and AU and NZ index en-AU and en-GB together, so that repeat is wasted in two storefronts.
6. **Cross-localization is real but small for this product.** The US also indexes nine more languages (ar, zh-Hans, zh-Hant, fr, ko, pt-BR, ru, es-MX, vi), worth 900 extra bytes (P6, A4). Undirect's English term set needs about 65 bytes, so en-US holds it all. The gain from cross-localization here comes from en-GB's reach and from native fields, not from stuffing English into foreign fields. Phrases form only inside one locale (P4, P5, P6), so 'safari popup blocker' needs its words in one locale.
7. **The big queries are closed; the niche ones are open.** 'adblock' completes in 38 of 41 storefronts and returns 229 to 250 apps wherever searched; AdBlock Pro (73,405 US ratings), AdGuard, Adblock Plus and Brave hold the top. The specific queries return far fewer apps: US 'popunder' 6, 'hijack' 39; DE 'werbung blockieren' 65; FR 'bloqueur de pop-up' 39; ES 'bloqueo de ventanas emergentes' 1; RU 'блокировщик всплывающих окон' 2; KR '팝업차단' 56; JP 'リダイレクト' 21; HR and SI 'blokiranje reklam/oglasov' 0 (M2, listed in `keywords.md` section 5). Appfigures calls keywords where the leaders lack the word in their name "keyword opportunities", easier to rank for with less performance (P2).
8. **Direct competitors are tiny.** Tab Blocker ("Stop Unwanted Browser Tabs", 6 US ratings), Death To _blank ("Prevent unwanted tabs", 1), Strict Browser ("A Browser with No Redirects", 2), Direct - Remove Redirection (1), Poper Blocker (15), Popup Blocker (0), Adfreeze (4) (M2, M3). The popular Safari extensions sit nearby but do other jobs: Wipr 2 (ads, trackers), 1Blocker, AdGuard, Magic Lasso (ad blocking), Hush (cookie nags), StopTheMadness Pro (page behavior), Vinegar (YouTube), Noir (dark mode), Stay (userscripts). Tab Blocker's description opens "Tired of websites hijacking your browser with unwanted tabs?" and offers per-site switching: the same promise as Undirect, from a 6-rating app (M3).
9. **Screenshot text probably counts, and Undirect has three screenshots per device.** Appfigures saw Apple start reading caption text in June 2025 and advises large, high-contrast captions at the top, one keyword theme per screenshot (P1); Phiture repeats it (P9). Apple's pages do not say so (A1), and one secondhand test reports almost no ranking from screenshot text alone (P13). Apple does confirm the first one to three screenshots appear in search results when there is no preview (A2). The repo ships 3 iPhone, 3 iPad and 2 Mac screenshots of the 10 allowed (docs/app-store-submission.md).
10. **Ratings are an input and Undirect never asks.** Apple lists ratings and reviews among the behavior signals (A1) and allows the system prompt three times in 365 days (A9). The code has no `requestReview` call (searched `App/` and `Extension/`). The indie HabitKit case prompts after the first completed action and appends a review request to support replies (P11); Appfigures says to "do that with every version" (P3).

## Apple's rules, condensed

| Topic | Rule | Source |
| --- | --- | --- |
| Name, subtitle | 30 characters each; both searchable | A2, A1 |
| Keyword field | 100 bytes UTF-8, comma-separated, no spaces after commas, spaces allowed inside a phrase | A1, A5 |
| Do not put in keywords | words already in name, subtitle or category; plurals of included words (duplicates); "app", "game", filler; special characters; competing app names; trademarks; irrelevant terms | A1, 2.3.7 |
| Developer name | searchable; do not repeat it in keywords | A5 |
| Promotional text | 170 characters, editable without a release, not searchable | A2, A1 |
| Description | 4,000 characters, not a store-search input; feeds web engines; first sentence matters; no keyword padding | A2, A5 |
| Localization | each locale has its own name, subtitle, keywords, description; a new locale copies the primary's screenshots and properties except description and keywords | A10 |
| Additional languages per storefront | listed in the country table; indexing of them is asserted by vendors only | A4, P4 to P6 |
| In-App Events | event cards show in search next to the app for people who already have it; others see screenshots | A1, A11 |
| Custom product pages | up to 70; keywords can be assigned, so a page can appear in search for chosen keywords; each keyword combination unique to one page; metadata reviewed without an app update | A6, A1 |
| Product page optimization | up to 3 treatments of icon, screenshots, previews; test runs up to 90 days; one test at a time | A7 |
| Previews | up to 30 seconds, up to 3 per localization, autoplay muted, choose a poster frame | A2, A8 |
| Rating prompt | 3 per 365 days; summary rating is per territory and can be reset (use sparingly) | A9 |
| Rule 2.3.7 | keywords must describe the app; no trademarked terms, popular app names or prices; subtitles may not name other apps or make unverifiable claims | A3 |

## Practitioner tactics that hold up

Agreement among at least two vendors, unless marked:

- Put the main query in the name, extension words in the subtitle, and everything else in the keyword field; never repeat a word within a locale (A1, P2, P3, P6).
- Keep name and subtitle on one keyword theme; a crowded name and subtitle ranked worse in Appfigures' tests (P2). Undirect's theme is pop-up blocking in Safari.
- Use one form of each word in English (A1, P4). For other languages no vendor shows tested evidence; the proposal lists one form per word and leaves a plural to the native reviewer.
- Add words to the keyword field that combine with the name: 'safari', 'ads', 'block', 'iphone', 'extension'. Combination happens inside a locale, so the helper words go in the same locale as the name (P4, P5, P6).
- Split a keyword phrase into single words separated by commas; Apple joins them (P6).
- Localize the visible name and subtitle; use hidden fields more freely (P5).
- Change metadata, wait 48 hours for the first move, review every 3 to 4 weeks, and avoid changing more often (P2, P8).
- Ask for ratings after a success moment and with every version (P3, P11).
- Reinforce the name's words in screenshot captions without making captions the only home for a keyword (P1; hypothesis, A1 silent).
- Use custom product pages for specific keywords or audiences (A1, A6, P9).
- Treat a keyword's reachability as ratings of the apps already ranking, not popularity alone (P2). Here the leaders' ratings run from 0 to 73,000, so words with small result sets come first.

Disagreements are catalogued in `sources.md` section E.

## Competitors: what their store text says

US storefront, 2026-10-01 (M2, M3). Rating counts are US counts.

| App | Name | Subtitle | US ratings | Localizes subtitle? |
| --- | --- | --- | --- | --- |
| AdBlock Pro | AdBlock Pro for Safari | Ad Blocker for Web and YouTube | 73,405 | yes, 14 of 14 storefronts probed, 11 distinct versions |
| AdGuard | AdGuard Ad Blocker for Safari | No Ads DNS, Adblock, Privacy | 19,591 | partly (4 distinct) |
| Adblock Plus | Adblock Plus for Safari & Apps | Ad Blocker for Web & Privacy | 19,708 | yes (9 distinct): DE "Werbung, Pop-up, Tracker block", JP "広告、ポップアップ、トラッカーをブロック", RU "Блок: реклама, попапы, трекеры" |
| 1Blocker | 1Blocker: Ad Blocker | Better browsing in Safari | 12,866 | yes (10 distinct) |
| Wipr 2 | Wipr 2 | Block ads, trackers, and more | not in results | no, English only |
| Magic Lasso | Ad blocker by Magic Lasso | Adblock / Adblocker for Safari | 901 | no |
| uBlock Origin Lite | uBlock Origin Lite | An efficient content blocker | 928 | same line everywhere |
| Hush | Hush Nag Blocker | Block Cookie and Tracking Nags | 1,084 | no |
| StopTheMadness Pro | StopTheMadness Pro | Take back your web browser | 197 | no |
| Poper Blocker | Poper Blocker: Ad Blocker | Block Ads & Popups Instantly | 15 | no |
| Popup Blocker | Popup Blocker | Block Popups Everywhere | 0 | partly; ES "Bloqueo de ventanas emergentes" |
| Tab Blocker | Tab Blocker | Stop Unwanted Browser Tabs | 6 | no |
| Death To _blank | Death To _blank | Prevent unwanted tabs | 1 | no |
| Direct - Remove Redirection | Direct - Remove Redirection | Speed up browsing for Safari | 1 | no |

What the visible text teaches:

- The head of the market writes "Ad Blocker" in the name and localizes the subtitle into the local word for it; AdBlock Pro appears with a different localized name in DE ("AdBlock Pro für Safari-Browser"), JP ("Safari用AdBlock Pro"), BR and CN.
- Pop-up words sit in subtitles, not names, for the large apps (Adblock Plus: "Pop-up" in DE, "ポップアップ" in JP, "попапы" in RU). The small apps put "Popup" or "Pop Up" in the name and win result positions with 0 to 15 ratings (M2 'popup blocker': the 0-rating Popup Blocker is 3rd in DE, IT, VN, DK and MY and 4th in FR; in NL Poper Blocker, 0 ratings, is 3rd).
- Indie Safari extensions mostly leave their listing English-only and show the category where the subtitle would be (Wipr 2 shows "Utilities" in DE, JA, FR, BR, KR, ES, IT, NL, RU). Undirect ships 50 languages of copy. Once it is live, it holds a local-language edge in storefronts where only 1Blocker, AdBlock Pro, Adblock Plus and AdGuard bother.
- None of the 21 apps probed sells "stops pages taking your click". The closest wording is Tab Blocker's "websites hijacking your browser with unwanted tabs" and Strict Browser's "no redirects".

## Where Undirect's current copy is weakest

Ordered by effect on search and conversion.

1. **Nothing searchable in the visible fields.** Name "Undirect"; the English subtitle "Stop pages taking your click" holds none of the typed words (stop, pages, taking, click) and the other 49 subtitles are slogans of the same kind. Not yet live in any case (M5).
2. **The keyword lists target quiet words.** All 50 lists translate one English concept list: popup, redirect, blocker, extension, hijack, click, tab, ads, tracker, privacy, browser, popunder (en). 'redirect', 'hijack', 'popunder' have no type-ahead; 'tracker', 'privacy', 'browser' pull in tracker-blocking, VPN and browser apps (US 'tracker blocker' top results: Do Not Track, AirTag finders). 'safari', the word in 'safari pop up blocker', 'block ads safari' and 'safari extension', is absent from every locale except through the slogans.
3. **Under-filled fields.** ms 68 bytes, no 72, sv 72, id 75, da 75 of 100.
4. **English locales are four copies.** en-GB is the most widely indexed locale and carries nothing en-US does not; AU and NZ double-index the same words.
5. **Single-locale live listing.** The 49 other locales exist in the repo and are not yet on the store (M5). Until they ship, none of the per-locale work counts.
6. **No ratings and no way to get them.** 0 ratings at launch plus no prompt (finding 10).
7. **Three screenshots with slogan captions.** The captions in `Support/AppStore/headlines.json` are slogans (the Arabic h1 reads, in meaning, "your clicks reach what you aimed at") with no search word, and the Mac set has two images.
8. **No custom product pages, no events, no product page test.** Unused: up to 70 pages with keywords, event cards, three-treatment tests (A6, A1, A7).
9. **The description opens with the slogan.** "Undirect stops a page taking your click." is a fine first sentence for people, and it is the line a web engine and the App Store LLM tags will see (A1, A5); it contains no pop-up or Safari word.

## What the proposal changes and why

- **Name** "Undirect: Popup Blocker" (23 characters) in English and every locale where locals type the Latin phrase; native phrase in JA, KO, ZH, RU, UK, FR, IT, ES, PT, NL, SV (descriptor to be composed natively). The brand stays first, which is what Appfigures' branded examples do (P2) while a descriptor carries the query. Evidence: type-ahead top term, 'popup blocker' and 'pop up blocker' return the same leaders, and a 15-rating app holds 4th place with the word (M1, M2).
- **Subtitle** (English) "Stop Safari redirects & tabs" (28). It adds 'Safari' (in 'safari pop up blocker', 'safari ad blocker', 'safari extension'), 'redirects' (the product's second job; open in every storefront probed), 'tabs'. It combines with the name into 'safari popup blocker' and 'stop redirects'. The slogan moves to the first screenshot and the promo text, where it persuades without costing search words.
- **Alternative** if the owner keeps "Undirect" alone as the name: subtitle "Safari popup & redirect blocker" (31, one too long) becomes "Safari popup, redirect block" (28). Name weight is higher (P3), so the name variant is the recommendation.
- **Keywords** drop quiet and loose words and add the combining words ('pop up', 'ads', 'block', 'iphone', 'ipad', 'mac', 'extension'). No competing app names or trademarks ('adblock' stays out).
- **Promo text** (170 limit, 165 used by the proposal): "Switch Undirect on for a site from the toolbar button. It stops invisible click layers, pop-unders and rewritten links, and lists every address a page tried to open." Not searchable; it states how to start and what the app does, which is the question a Safari-extension visitor has.

Risks to weigh:

- **Honesty of "Popup Blocker".** Undirect stops pop-unders and unrequested windows. It does not remove ads from pages. The description already says what it is not; keep a line near the top that it works beside an ad blocker. Rule 2.3.7 asks for keywords that "accurately describe your app" (A3).
- **Mismatched intent.** People who type 'ad blocker' want ads removed; ranking for it would raise installs and bounce. The proposal keeps 'ads' as a combining word (so 'pop up ads' matches) and leaves 'adblock' out.
- **Apple's table says nothing about indexing additional languages** (A4). The proposal does not rely on it for anything the primary locale cannot carry itself.
- **Brand searches.** A descriptor leaves the brand word in front; 'undirect' still returns Undirect first (M2).

## Conversion recommendations

For the coordinator. Apple gives mechanics (A2, A6, A7, A8, A9); lift figures from vendors are old or secondhand (sources.md E7), so none is used as a target.

1. **Screenshots.** Keep the current three as the first three but rewrite caption 1 to hold the search words in large high-contrast text at the top of the image: "Popup blocker for Safari" followed by the promise in a second line. Captions 2 and 3: "Turn it on per site" and "Every blocked address, listed". One keyword theme per image, no repeats (P1). The first one to three images show in search results when there is no preview (A2), so frame 1 must show the problem solved: an unrequested tab stopped and its address in the list. Add frames up to five or six: a dark-mode shot (Apple suggests one when the app supports it, A2) and a frame that says it works beside an ad blocker, which answers the main mismatch. Mac currently has two; match iPhone.
2. **Preview video.** It autoplays muted (A2, A8), so the first seconds need on-screen words, not narration, and a poster frame chosen for the case where autoplay is off (A8). Open on the pop-up being stopped, not on the setup screen. 30 seconds maximum; localize at least the on-screen words for the top storefronts. The 1.0 demo for review is a device recording with the setup flow; the store preview should skip setup.
3. **Ratings prompt.** Add `requestReview` after the first "blocked" event the person sees (the moment the product has proved itself), at most once per version, inside Apple's 3 per 365 days (A9, P11). Add a line asking for a review to support replies (P11). Rating counts are per territory (A9, A1), so the first ratings in each large storefront count separately.
4. **Custom product pages.** Up to 70 (A6). Three to start, each with its own keywords, since a page can appear in search for the keywords assigned to it and each keyword combination must belong to one page only (A1): (a) "popup blocker" (screenshots: pop-up stopped), (b) "redirect" / "unwanted tabs" (screenshots: tab hijack stopped), (c) a Mac page for Safari on Mac. Reuse the same app; only screenshots, promo text and previews differ. Metadata is reviewed without an app update (A6). The CPP route also lets 'redirect' and 'unwanted tab' queries land on a matching page even where the default page's copy is about pop-ups.
5. **Product page test.** One test at a time, up to 90 days (A7). First test: caption 1 variant (search-word caption against slogan caption) with traffic split to two treatments. Icon tests last. Do it only after ratings and traffic exist; with near-zero impressions a test cannot conclude.
6. **In-App Events.** Event cards reach people who already installed the app in search (A1, A11). For a utility with a one-off setup, use one event per release ("Pop-under catalog update") only if the app gains a visible new capability; low priority.
7. **Update cadence.** Ship the proposal as one change, check the M2 script at 48 hours and again at 3 to 4 weeks (P2, P8). Do not rewrite keywords again before the second check.
8. **Measure.** `python3 data/search2.py` (delete `data/search2.json` first) re-runs 201 queries with Undirect's rank; `data/hints.py` refreshes type-ahead. Compare by query: US 'pop up blocker' rank, DE 'popup blocker', JP 'ポップアップ ブロック', KR '팝업차단', RU 'блокировщик всплывающих окон', ES 'bloqueo de ventanas emergentes'.

## Limits of this research

- No search-popularity score (Apple Ads or a paid tool) was available. Volume is inferred from type-ahead presence and order and from result-set sizes.
- Reddit could not be read (sources.md D). The practitioner evidence is vendor and indie blog posts.
- The claim that Apple searches additional-language fields comes from vendors and not from Apple's text. The claim that screenshot captions are indexed is the same. Both are cheap to rely on and neither is required for the plan to work.
- Result sets are capped near 250 apps, so a rank beyond that reads as "not listed".
- Competitor ratings are the US counts at the time of the probe.
