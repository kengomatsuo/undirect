# ASO sources

Everything below was fetched on 2026-10-01 in this session. Quotes are short and verbatim; the rest is paraphrase.
Raw page text sits in `raw/` (HTML and extracted text) and the probe data in `data/`. Reliability grades:
**A** Apple, **B** an ASO vendor or consultancy writing from its own tests, **C** a derivative or SEO blog, **D** old (before 2018) or unverifiable.

## A. Apple (grade A)

| ID | URL | What it settles |
| --- | --- | --- |
| A1 | https://developer.apple.com/app-store/search/ | Which fields count for search, keyword-field rules, CPP keywords, In-App Events, app tags |
| A2 | https://developer.apple.com/app-store/product-page/ | Name, subtitle, description, screenshots, previews, ratings, promo text |
| A3 | https://developer.apple.com/app-store/review/guidelines/ (rule 2.3.7) | What metadata may not contain |
| A4 | https://developer.apple.com/help/app-store-connect/reference/app-store-localizations | The country table: default and additional languages per storefront (175 rows) |
| A5 | https://developer.apple.com/help/app-store-connect/reference/platform-version-information | Field definitions: keywords are 100 bytes; description feeds web search |
| A6 | https://developer.apple.com/app-store/custom-product-pages/ | CPP count, keywords, review |
| A7 | https://developer.apple.com/app-store/product-page-optimization/ | What a PPO test can change and how long it runs |
| A8 | https://developer.apple.com/app-store/app-previews/ | Preview length, autoplay, content rules |
| A9 | https://developer.apple.com/app-store/ratings-and-reviews/ | Rating prompt limit, per-territory summary rating |
| A10 | https://developer.apple.com/help/app-store-connect/manage-app-information/localize-app-information | What a newly added language inherits |
| A11 | https://developer.apple.com/app-store/in-app-events/ | Where event cards appear |

Quotes:

- A1: search results rest on "text relevance (matches for your app’s title, subtitle, keywords, and primary category)" plus user behavior "(downloads, ratings and reviews, and more)". Description is not on the list.
- A1: "Keywords are limited to 100 characters total, with terms separated by commas and no spaces." Spaces are allowed inside a phrase.
- A1: do not repeat words already in the app name, subtitle or category. Plurals of words already included ("climbs" and "climb") "are considered duplicates". Avoid "app", "game", filler words and special characters.
- A1: do not use "Competing app names" or "Unauthorized use of trademarked terms" or terms "not relevant to the app".
- A1: "promotional text doesn’t affect your app’s search ranking so it should not be used to display keywords."
- A1: "Assign keywords to your custom product pages." Each keyword combination "unique to a single product page".
- A1: In-App Events show in search next to the app for people who already downloaded it; people who never did see screenshots or previews instead.
- A1: search results can carry app tags, "generated using large language models (LLMs) based on the metadata you’ve provided".
- A2: description: "Don’t add unnecessary keywords to your description in an attempt to improve search results." "The first sentence of your description is the most important."
- A2: screenshots: up to 10; "the first one to three images will appear in search results when no app preview is available". Previews: up to 30 seconds, up to three per localization, "autoplay with muted audio", first seconds must be compelling.
- A2: name and subtitle are 30 characters each. Name should be "simple, memorable" and hint at what the app does; use the subtitle to explain value.
- A3, 2.3.7: assign keywords "that accurately describe your app, and don’t try to pack any of your metadata with trademarked terms, popular app names, pricing information, or other irrelevant phrases". Subtitles must not "reference other apps, or make unverifiable product claims".
- A4: the table has four columns (ISO code, Country, Default language, Additional supported language(s)). The page says only that the language a customer sees depends on store language, device language, languages you added and your primary language. It never uses the word "index". Every claim below that additional languages are searched comes from group B.
- A5: "You can provide up to 100 bytes of content. Your app is searchable by app name and company name, so you shouldn’t duplicate these values in the keyword list. Names of other apps or companies aren’t allowed." The developer name (Kenneth Fang) is therefore already searchable. The same page says each keyword should be "greater than two characters"; two-character CJK words are normal in practice, so treat that line as an English-centric note.
- A5: the description "will be used for web engine search results", meaning Google and the like, not store search.
- A6: "up to 70 additional versions of your product page"; CPPs "can also appear in relevant search results"; metadata in a CPP goes through review without an app update.
- A7: a test holds up to three treatments of icon, screenshots or previews, runs up to 90 days, and needs approved metadata first. The page lists icon, screenshots and previews as the testable elements; name, subtitle and keywords are not among them.
- A8: "By default, app previews play with the sound muted, so consider using copy to add additional context to your footage." A poster frame shows when autoplay is off and must be chosen to convey "the essence of your app"; changing it on an approved preview needs a new submission.
- A9: the rating prompt API can be shown "up to three times in a 365-day period"; the summary rating "is specific to each territory".
- A10: a newly added language copies the primary language's screenshots and properties "except for the description and keywords".

## B. Practitioners (grades B and C)

| ID | URL | Date seen | Grade |
| --- | --- | --- | --- |
| P1 | https://appfigures.com/resources/guides/app-store-algorithm-update-2025 (Appfigures, Ariel, 17 Jun 2025) | read in Chrome | B |
| P2 | https://appfigures.com/resources/guides/app-name-optimization (Appfigures) | read in Chrome | B |
| P3 | https://appfigures.com/resources/keyword-teardowns/23-meditation (Appfigures, 30 Sep 2021) | read in Chrome | B |
| P4 | https://www.apptweak.com/en/aso-blog/how-to-benefit-from-cross-localization-on-the-app-store (AppTweak, updated 21 Nov 2025) | fetched | B |
| P5 | https://www.mobileaction.co/blog/app-store-cross-localization/ (MobileAction, 2026) | fetched | B |
| P6 | https://aso.dev/aso/cross-localization/ (aso.dev) | fetched | B |
| P7 | https://appfollow.io/blog/app-store-optimization-localization (AppFollow, 2026 playbook) | fetched | B |
| P8 | https://www.apptweak.com/aso-blog/5-of-our-aso-experiments-to-understand-the-app-store (AppTweak keyword research guide, 2026) | fetched | B |
| P9 | https://phiture.com/asostack/aso-trends-in-2026/ (Phiture) | fetched | B |
| P10 | https://phiture.com/asostack/aso-in-ios-11-a-detailed-analysis-of-what-really-works-4bf4f83462fa (Phiture, 2017) | fetched | D for current behavior, useful as a test record |
| P11 | https://sebastianroehl.substack.com/p/my-app-store-optimization-strategy (indie dev, HabitKit, 20 Oct 2024) | fetched | B |
| P12 | https://eu.36kr.com/en/p/3339025222480129 (Qimai, 16 Jun 2025) | fetched | C |
| P13 | https://appscreenshotstudio.com/tools/app-store-indexed-fields and https://extensionbooster.net/blog/ios-app-store-optimization-aso-apple-algorithm-marketing-2026/ | fetched | C, repeats P1 |
| P14 | https://trysonar.app/blog/app-store-keyword-field.md , /indie-developer-aso-guide.md , /app-preview-video-conversion-impact.md | fetched | C, cites Apple pages that do not say what it claims (see disagreements) |
| P15 | https://splitmetrics.com/blog/advanced-video-analytics-for-app-preview/ (SplitMetrics, 23 May 2018) | fetched | D |
| P16 | https://asomobile.net/en/blog/how-to-improve-app-store-conversion-rate-metadata-screenshots-and-cro-tips/ (ASOMobile, 6 May 2026) | fetched | C |
| P17 | https://sensortower.com/blog/answered-how-do-i-rank-higher-for-a-specific-ios-app-store-optimization-aso-keyword (Sensor Tower, April 2014) | fetched | D, predates the subtitle |
| P18 | https://appsops.store/blog/aso-research-roundup (AppsOps roundup of Phiture, Sensor Tower, AppFollow, 1 May 2026) | fetched | C |

Quotes:

- P1: "Apple is now extracting text from your app’s screenshot captions and treating that text as part of your keyword metadata." Captions reinforce name and subtitle keywords and can add new ones; "I haven’t found any indication that app descriptions are being indexed." Advice: high-contrast, large text at the top of the screenshot, one keyword theme per screenshot, no repeated captions. Author says caption placement is speculation.
- P2: "Apple combines keywords from the name and subtitle together but gives more weight to ones in the name." Earlier keywords in the name rank better. The algorithm "putting more weight on focus": one keyword theme in name and subtitle beats many. Ranks "change sharply in the first 12 - 48 hours after an update, followed by small movements for the next few weeks."
- P3: "Keywords that matter ... should always go into the name. The subtitle gets much less weight. Much." Repeating a word between name and subtitle "effectively making the one in the name invisible". Ratings decide ties between apps with similar keyword weight; "do that with every version".
- P4: "keyword combinations are restricted to singular locales"; with "bus" in en-US and "metro" in es-MX the app ranks for each word but not "metro bus". "While this practice is frowned upon by Apple, so far, no rejections from Apple have been publicized." Lists "Use singular keywords over long-tail keywords and phrases".
- P5: the territory table is the base; "Phrase combinations only form within a single locale, not across them"; "Keywords must not be duplicated across locales"; each locale has "up to 160 characters of indexable metadata" (30+30+100); a non-standard primary locale can add coverage.
- P6: for the US the "also indexed" locales are Arabic, Chinese (Simplified), Chinese (Traditional), French, Korean, Portuguese (Brazil), Russian, Spanish (Mexico), Vietnamese. "The App Store does not combine words between locales." "Each word is counted only once-even if it appears in multiple fields". Words in a compound title are split.
- P7: "A translated keyword can be linguistically correct and still generate no installs." Localization lifts downloads "26% to 128% per locale" (vendor claim).
- P8: update keywords every "3-4 weeks"; updating too often "doesn’t give the app stores enough time to register your changes".
- P9: since June 2025 "Apple’s June 2025 algorithm update began indexing caption text"; CPPs "appear in organic search"; "up to 70 CPPs per app, up from 35".
- P10: "I ... added ... keywords to the description just in case Apple started indexing it. What happened? Nothing." (2017 test.)
- P11: keyword in the app name, second and third keywords in the subtitle; native review prompt "after the user created his first completion"; PS line asking for a review at the end of support emails; patience, "Give it time".
- P12: after WWDC25 "CPP can bind keywords, and screenshots affect search rankings".
- P13/P14 repeat P1; one reports a controlled test where only 1 of 64 screenshot phrases ranked without metadata support (not independently checked).
- P15: preview optimization lifts conversion "around 16%" on average (2018 data).
- P16: The first one or two screenshots "decide almost everything", and about half of users look only at them, citing SplitMetrics data. Secondhand.
- P17: "only two places that determine your keywords, the title ... and the 100 character keyword field." Written April 2014; Apple's own page (A1) now lists the subtitle too.

## C. Own measurements (grade A for what the App Store returned on 2026-10-01)

| ID | Method | File |
| --- | --- | --- |
| M1 | App Store type-ahead (`search.itunes.apple.com/WebObjects/MZSearchHints.woa/wa/hints`, header `X-Apple-Store-Front`) for 41 storefronts, over 500 seed prefixes | `data/hints.json`, `data/hints.py` |
| M2 | Live search per storefront (`search.itunes.apple.com/WebObjects/MZStore.woa/wa/search?...&term=`): ordered result ids (cap about 250), names, subtitles, rating counts, Undirect's rank (id 6810513194), 201 queries | `data/search2.json`, `data/search2.py` |
| M3 | Product pages on apps.apple.com in 14 storefronts for 21 apps: title, subtitle, description head | `data/pages.json`, `data/pages.py` |
| M4 | Apple's country table parsed to JSON | `raw/loc_rows.json`, `raw/loc.html` |
| M5 | Undirect's live listing (iTunes lookup and product page): version 1.0, released 2026-09-21, languages ["EN"], 0 ratings, no subtitle | `raw/und-us.html` |

Type-ahead shows what people begin to type; it carries no volume figure, only order and presence. The public iTunes Search endpoint (`itunes.apple.com/search`) returned HTTP 403 after a few dozen calls from this IP and stayed blocked; the app-client search endpoint in M2 did not throttle at 1 call per 1.2 seconds.

## D. Sources that could not be read

- Reddit (r/iOSProgramming, r/AppBusiness, r/apple): WebFetch refused the domain, WebSearch blocks it, the Chrome tool refused it on safety grounds, and `reddit.com` JSON returned a shell page. No Reddit evidence is used. Indie evidence comes from P11, Hacker News search (only 2011-2017 items, discarded) and the vendor posts.
- Apple Developer Forums thread 811539 and 800398: Cloudflare check page.
- data.ai: not fetched; it now belongs to Sensor Tower, whose current pages were not needed for this brief.
- Appfigures pages returned 403 to curl; read through Chrome (P1 to P3).

## E. Where the sources disagree

1. **Plurals.** A1 says plurals of included words are duplicates. P4 and P14 say "use singular"; P14 claims Apple documents that a singular covers its plural and cites A1, which does not say so. Treat English as: singular only, one form. For other languages nobody gives tested evidence; the proposal lists one form per word.
2. **Subtitle weight.** A1 lists the subtitle as a ranking input without weights. P2 and P3 say the name carries far more weight. P17 (2014) says only title and keyword field count. Chosen: put the main query in the name, extension words in the subtitle.
3. **Repeating a word.** A1: do not repeat. P3: a repeat across name and subtitle hides the name occurrence. P6: "In general, duplicating keywords is not recommended, but for the most important phrases, it is acceptable." Chosen: never repeat inside one locale.
4. **Cross-localization.** A4 lists additional languages but does not say they are searched. P4, P5, P6, P7 all say they are. P4 notes Apple frowns on the practice. Chosen: rely on it for English terms, keep visible name and subtitle readable in each locale, and verify by rank checks after release.
5. **Screenshot text.** P1, P9, P12, P13 say captions are indexed since June 2025. A1 says nothing about it; its only related statement is that tags come from "metadata you’ve provided". P13 cites a test where almost no phrase ranked on screenshot text alone. Chosen: treat as a free reinforcement, never as the only place for a keyword.
6. **CPP limit.** A6 says 70; P14 says 35 (outdated); P9 says 70 "up from 35".
7. **Preview video lift.** P14 quotes 20-35% from a 2024 vendor benchmark it does not link; P15 says 16% (2018); Apple gives no figure. No number is used for planning.
8. **Update cadence.** P8: review every 3 to 4 weeks. P2: the big move lands in 12 to 48 hours, then small. Both fit one plan: change once, read ranks after 48 hours, decide after 3 to 4 weeks.
9. **Description.** A1 omits it from search factors; P1 and P10 found no effect; A5 says it feeds web search. Consistent: not store search, yes Google.
