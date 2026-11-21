# Posting times, countries, languages and native A/B tests for @monholtco (2026-11-21)

Why: the calendar (`docs/plans/app-store-growth/social/pains-calendar.md`, `calendar-final/`) posts at three flat WIB slots (02:20, 05:50, 21:20) chosen for a US audience from Buffer's and Sprout's global studies. The owner asked for times per audience country, per platform, a language plan and A/B testing. Every line below names its source; "GUESS" marks what no source backs. WIB = UTC+7. Times are local to the audience unless marked WIB.

## 1. Where the buyers are, from our own data

### App Store Connect

- **Sales and Trends API: not readable today.** No vendor number is stored anywhere (repo grep, `~/.asc/config.json` has `"vendor_number": ""`). `/v1/salesReports` with a placeholder vendor returns 500; the board records the key lacking the Sales role (BOARD.md ASG38, "sales-report API 403 (key lacks Sales role)"). The asc web session in `~/.asc/web/` is expired (401 on `olympus/v1/session`, run 2026-11-21). Owner-only fix: give API key 8R8JCJZUNJ the Sales role (or make a Sales key) and supply the vendor number (Payments and Financial Reports, top left).
- **App Analytics API: forbidden.** `GET /v1/apps/{id}/analyticsReportRequests` returns 403 "The API key in use does not allow this request" for both apps (run 2026-11-21). Same role fix.
- **What earlier sessions read in ASC Analytics in Chrome (BOARD.md ASG18, 2026-11-18, window Aug 20 to Nov 17):**
  - Undirect first-time downloads 434. Top territories: **United States 134, Saudi Arabia 132** (31% and 30%). Sources: App Referrer 262 (X 177, Snapchat 29, ChatGPT 23, Telegram 6), Search 112, Browse 27, Web 27. The Saudi block traces to one Arabic Apple-deals X account (نبض أبل, @APPS_RH) posting "Free for a limited time ... Supports Arabic" on 2026-10-10, 7,816 views; it was a one-off during the free weeks, not steady demand.
  - Cutling first-time downloads 9 (Search 3, App Referrer 3, Browse 2): too few for a country split.
  - Undirect paid period Nov 1-17: 9 downloads on 543 page views (ASG16).
- **Apple Ads Basic installs (ASG17, invoice S514637852, Nov 9-13):** 4 installs from **Indonesia, Jordan, Philippines, India**, $0.60 to $1.07 each. Cheap installs, not proof of organic demand.

### YouTube (@matsuokengo), public views read 2026-11-21 with `claude-house-rules/scripts/youtube.ts stats`

Same Cutling "bank number" Short in three languages, uploaded the same days:

| Language | Uploads (views) | Total |
|---|---|---|
| Indonesian | n8777ommVvw 945, POalUZojCxI 506, Uq82K0WHFnU 456 | 1,907 |
| Japanese | cSiXwHFGSxM 230, pQpEPfupD0E 122, pSjuhAeqMBg 1 | 353 |
| English | FkNwbsz7R28 43, YCESwtjVemM 28, 2fqy53bWT9M 22 | 93 |

Undirect: Indonesian Short -IhSIxkOJHw 1,184 (Nov 8), ublF8QHiOZg 252; English qLfTI47kP2Q 74. Indonesian Shorts out-view English ones 10 to 20 times on the same film; Japanese 3 to 4 times. The API key has no YouTube Analytics scope, so viewer country is not read; Studio > Analytics > Audience > Geography would confirm it. Language of title strongly predicts the audience here (YouTube serves Shorts by language and region; GUESS on the exact mechanism).

### What this says

1. Paying-intent signals point at **US (English)** for App Store downloads and **Indonesia (Bahasa)** and **Japan** for organic video reach. The account owner is in Indonesia and the channel's history is Indonesian, which also biases YouTube toward Indonesian viewers (GUESS).
2. **Saudi Arabia / Arabic** produced the single biggest burst (132 downloads) from one Arabic X post. That is a signal for X in Arabic, at least for Undirect when on sale.
3. Without the Sales role, revenue by territory is unknown. Treat the plan below as a hypothesis to recheck once the report is readable.

## 2. When people are online, per platform

### 2a. Global studies (all report the viewer's local time; none splits by country)

| Study | Method | Instagram | TikTok | X | Threads | Facebook | YouTube |
|---|---|---|---|---|---|---|---|
| Buffer, published 2026-03-25, https://buffer.com/resources/best-time-to-post-on-social-media/ (read 2026-11-21) | 52M+ posts (IG ~10M, TikTok 7.1M, X 8.7M, Threads 2.5M), median engagement, "consider all the recommendations local time" | Thu 9:00 best; Wed best weekday; Fri worst | Sun 9:00, Mon 13:00, Sun 13:00; Sat best day, Wed worst; views peak 18:00-23:00 | Tue 9:00, Wed 10:00, Wed 9:00; Sat quietest | Thu 9:00; weekday 7:00-12:00; Wed, Thu, Tue best; Sat-Mon lowest | Thu 9:00; Wed then Thu; Sat quietest | Shorts Fri 16:00 (Fri, Sat, Thu best; Tue lowest); long-form Sun 10:00 |
| Sprout Social, published 2026-03-31, https://sproutsocial.com/insights/best-times-to-post-on-social-media/ (read 2026-11-21) | ~2B engagements, ~307k profiles, Nov 27 2025-Feb 27 2026, user's local time | Mon 14-16, Tue 13-19, Wed 12-21, Thu 12-14; weekends worst | Mon 15-17, Tue 14-18, Wed 13-20, Thu 13-17, Fri 15-17 | Mon 14-15 and 17; Tue-Thu 12-18 | no data | Tue-Wed 12-20 | no data |
| Metricool, 2026-07-30, https://metricool.com/best-time-to-post-social-networks/ (read 2026-11-21) | IG 24M posts / 375k accounts (search snippet), TikTok 2M+ posts / 92k accounts, X 2M+ posts; professional accounts; zone not stated; page contradicts itself | 20:00 top; 6-9 "sweet spot"; Wed, Tue, Fri | 18:00-20:00; Sun evening, Mon | 21:00; Tue, Wed; avoid Sun | no data | 12-14; Reels Sat 00:00 | publishing volume only |
| Hootsuite, 2025-11-19, https://blog.hootsuite.com/best-time-to-post-on-social-media/ (read 2026-11-21) | 1M+ posts with Critical Truth, normalised across 118 countries | Mon 15-21; Tue 5-8 and 15-19 | Thu 7-11 | Wed-Fri 9-11; Sat 8-10; Sun 9-12 | Tue 8:00; Mon 9, Wed 12, Fri 14, Sat 12, Sun 13 | Tue 9:00 | not covered |
| Later, 2026-04-21 (data period unclear, possibly Jan-Oct 2024), https://later.com/blog/best-time-to-post-on-instagram/ (search snippet, not fetched) | ~6M posts; Reels 975k | 5:00 local; Reels 00:00 | | | | | |

No 2026 Socialinsider posting-time study was found (two searches 2026-11-21). No study above splits a technology industry.

**Reading.** The studies agree on only three things: weekdays Tue-Thu beat weekends for X, Threads, Facebook and Instagram; X and Threads are morning platforms (8-11 local); TikTok and Reels views run late (18-23 local, Buffer and Metricool). They disagree on Instagram (Buffer morning, Sprout afternoon, Metricool 20:00). Every one says its own figures are an average and the account's own Insights beat them. Our account has almost no followers, so those Insights are empty for now: the averages are only the starting grid for the tests in section 4.

### 2b. Japan (primary survey data)

Source: Ministry of Internal Affairs and Communications (総務省 情報通信政策研究所), 「令和6年度 情報通信メディアの利用時間と情報行動に関する調査報告書」, published 2025-06-27, https://www.soumu.go.jp/main_content/001017160.pdf (downloaded and text-extracted 2026-11-21). Method: 1,800 people aged 13-79, diary in 15-minute slots; "行為者率" = share of people using the internet in that hour.

Internet use by hour, weekday, JST (table 1-1-2-5), all ages / 20s / 30s / 40s:
- 07時台 23.3 / 22.7 / 27.9 / 25.8%; 08時台 25.3 / 25.9 / 29.8 / 31.4% (commute)
- **12時台 33.5 / 44.0 / 48.3 / 44.6%** (lunch spike; 13時 drops back to 21.7%)
- 19時台 28.4 / 39.7 / 32.7 / 29.7%; 20時台 35.0 / 46.1 / 38.6 / 39.4%
- **21時台 39.1 / 53.7 / 48.7 / 47.2%** (daily peak); **22時台 36.4 / 55.3 / 52.1 / 40.4%**
- 23時台 25.3 / 46.3 / 32.1 / 27.3%

Holiday: flatter daytime (10-14時 24-26% all ages), same 21-22時 peak (38.1%, 34.3%).

Platform use rates, Japan 2024 (表 5-1-1, N=1,800): LINE 91.1%, YouTube 80.8%, Instagram 52.6%, **X 43.3% (20s 78.0%, 30s 61.6%)**, TikTok 33.2%, Facebook 26.8%. DataReportal Digital 2026 Japan (2025-11-05, ad reach, https://datareportal.com/reports/digital-2026-japan, read 2026-11-21): X 71.2M (57.9% of population), Instagram 63.2M, TikTok 39.2M adults (+49.9% y/y), Threads 13.0M (10.5%), Facebook 16.5M.

**Japan windows (JST = WIB + 2):** weekday 07:30-08:30, **12:00-12:59**, **20:00-23:00**; weekend 10:00-14:00 and 20:00-23:00. In WIB: 05:30-06:30, **10:00-11:00**, **18:00-21:00**. Platforms for Japan: X first (Japan is one of X's largest markets by share of population), then Instagram and YouTube; Threads reaches 10% of the population, far more than in Indonesia (3%).

### 2c. Indonesia

- Platforms (DataReportal Digital 2026 Indonesia, 2025-11-05, ad reach as % of internet users, https://datareportal.com/reports/digital-2026-indonesia, read 2026-11-21): **TikTok 78.2%** (180M adults), **YouTube 65.5%**, Facebook 52.5%, Instagram 46.7%, LinkedIn 16.1%, **X 9.9%**, **Threads 3.5%**. APJII 2026 (via Databoks, https://databoks.katadata.co.id/en/technology-telecommunications/statistics/6a27a97db5036/tiktok-the-most-widely-accessed-social-media-platform-among-indonesians-in-early-2026, search snippet): TikTok is the most-accessed platform (31.8%).
- Time of day: no primary hourly dataset found in two searches. IDN Research Institute cites Jakpat (2024): "traffic peaks twice a day: first between 7:00 and 9:00 a.m., and again between 6:00 and 9:00 p.m." (https://www.idnresearchinstitute.com/english/indonesia-social-media-demographics-platform-00-vnqjp-6nty80, search snippet; the Jakpat original not read). Our own Indonesian Shorts: the three Cutling uploads posted 16:12-19:04 WIB reached 456-945 views; the Undirect Short posted 06:17 WIB (Nov 9) reached 1,184.
- **iPhone share, Oct 2026: iOS 21.2% of mobile** (StatCounter CSV, read 2026-11-21, https://gs.statcounter.com/os-market-share/mobile/indonesia). One Indonesian viewer is about 0.4 of an American one as a possible buyer, before price sensitivity (GUESS on the price effect).
- **Indonesia windows (WIB):** 07:00-09:00 and 18:00-21:00; lunch 12:00-13:00 is a GUESS borrowed from Japan's measured lunch spike. Platforms: TikTok, YouTube Shorts, Instagram Reels (cross-posted to Facebook Reels from Business Suite). Not X, not Threads.

### 2d. United States

- Platforms (Pew Research Center, "Americans' Social Media Use 2025", 2025-11-20, 5,022 adults, Feb-Jun 2025, https://www.pewresearch.org/internet/2025/11/20/americans-social-media-use-2025/, search snippet): YouTube highest, Facebook 71%, Instagram ~50%, TikTok ~37%, X ~21%, Threads ~8% (the TikTok, X and Threads numbers are the search tool's read of Pew's chart; verify).
- iOS 52.0% of mobile, Oct 2026 (StatCounter CSV).
- Times: the global studies in 2a are dominated by US accounts (GUESS: none states its country mix). Tech-specific, Sprout 2026 (https://sproutsocial.com/best-times-to-post/twitter-tech/ and /instagram-tech/, read 2026-11-21): **X, software and technology: Tue-Thu 11:00-16:00, Fri 11:00-13:00, weekends worst. Instagram, technology: Mon 11-13 and 15, Tue 11-16, Wed-Thu 11-15, Fri 11-14.**
- Conversion: US Eastern Standard Time runs all through Nov 22-Dec 20, so **WIB = ET + 12 h** (Pacific: WIB = PT + 15 h).

### 2e. Saudi Arabia (Arabic)

- Platforms (DataReportal Digital 2026 Saudi Arabia, 2025-11-08, https://datareportal.com/reports/digital-2026-saudi-arabia, read 2026-11-21): YouTube 79.2% of population, Snapchat 72.9%, Instagram 52.4%, Facebook 50.8%, **X 43.1%**, Threads 4.5%; TikTok 38.6M adult ad reach.
- iOS 42.0% of mobile, Oct 2026 (StatCounter CSV).
- Time: no study found (not searched beyond the platform data). The one data point is our own: @APPS_RH's Arabic post went out 13:16 UTC = **16:16 Riyadh** and drew 7,816 views and 132 downloads. Riyadh = WIB - 4 h. Saudi weekend is Friday-Saturday (GUESS: not fetched this run).

### 2f. Other countries asked about

UK, Germany, India: nothing in our data points at them (one Apple Ads install from India). StatCounter Oct 2026 iOS share: UK 50.1%, Germany 27.7%, India 5.1%. India's 5% iPhone share makes it a poor target for paid iPhone apps; the UK is covered by English posts at US-morning times (14:00-17:00 UK, GUESS that this is acceptable). No per-country posting-time study was fetched for them.

### 2g. Platform guidance on timing

- TikTok: no official TikTok page on posting times was found; third-party guides point to TikTok Studio analytics, Viewers/Followers > most active times and top locations, available after the first public post (not verified: support.tiktok.com returned an empty page to the fetcher; Chrome was off-limits this run).
- Meta and YouTube: no timing guidance found in their own help; YouTube's own A/B help (below) is the platform's only measured tool.

## 3. Languages

### What the apps ship (read 2026-11-21)

- App Store listings, read live through the ASC API (`appInfos/{id}/appInfoLocalizations`): **both apps carry all 50 App Store languages**, including en-US, en-GB, id, ja, ar-SA, ko, zh-Hans, zh-Hant, de-DE, fr-FR, es-MX, pt-BR, hi. Undirect's primary locale is en-GB, Cutling's en-US.
- In-app: Undirect's extension has 50 `_locales`; Cutling's `locales.json` lists 60 app languages.
- So a buyer reached in Indonesian, Japanese or Arabic lands on a listing in their own language. The social calendar today is English-only.

### Which languages get their own posts

| Language | Evidence | Platforms, in order | Volume |
|---|---|---|---|
| English (US first, UK and rest of world along) | US = 134 of 434 Undirect downloads; iOS 52% (US), 50% (UK) | X, Threads, Instagram + Facebook, TikTok, YouTube | the main track, ~60% of posts |
| Indonesian | YouTube: Indonesian Shorts 10-20x the English ones on the same film (1,907 vs 93 views); TikTok 78% / YouTube 65% / IG 47% of internet users; X 9.9%, Threads 3.5%; but iOS only 21% | TikTok, YouTube Shorts, Instagram Reels (+ Facebook Reels) | ~20%; films only (they already exist in Indonesian for some cuts) |
| Japanese | YouTube: Japanese Shorts 4x English (353 vs 93); iOS 54%, the highest of any market checked; X used by 43% of all Japanese and 78% of people in their 20s (MIC 2024); Threads 10.5% of population | X, YouTube Shorts, Instagram, Threads; TikTok once a week | ~15% |
| Arabic (Saudi) | 132 of 434 Undirect downloads came from one Arabic X post; X 43% of Saudis; iOS 42% | X only, Undirect only | 2 posts a week, plus the Black Friday sale days |

Not now: Hindi and Indian languages (iOS 5%), German (iOS 28%, no signal in our data), Korean, Chinese (no signal; GUESS that they would need their own research before spending). Revisit when the Sales report shows units by territory.

Rule for every non-English post: written in the language from the screen, not translated from the English caption (house `blind-translation` skill), with the store link carrying a per-language `ct` (e.g. `ct=x-ja`, `ct=tt-id`) so App Store Connect's Campaigns can count each language separately once installs pass its threshold of 5 (ASG56).

## 4. A/B testing each platform offers for organic posts (as of 2026-11-21)

| Platform | Native organic test? | What it does | Source |
|---|---|---|---|
| Instagram | **Trial reels** | A reel shown to non-followers first; not on the grid or Reels tab; views, likes, comments, shares about 24 h after posting; optional auto-share to followers if it "performs well based on the views it receives within the first 72 hours". Eligibility: public account with **at least 1,000 followers** (Mosseri, July 2025). Reels only, no carousels or images. | https://creators.instagram.com/blog/instagram-trial-reels (read 2026-11-21); https://socialmediatoday.com/news/instagram-expands-access-trial-reels/752895/ (2025-07-13, read 2026-11-21). Whether @monholtco is past 1,000 followers is unknown here: check in Business Suite. |
| YouTube | **A/B test titles and thumbnails** (was "Test & compare") | Title only, thumbnail only, or both; up to 3 versions; winner = highest watch time; finishes within two weeks; desktop Studio only; needs advanced features; **"A/B testing is not available for Shorts."** | https://support.google.com/youtube/answer/16391400 (read 2026-11-21) |
| Facebook Page | **A/B tests in Meta Business Suite** (Content > A/B tests) and the Organic A/B Testing API | 2 to 4 versions of a new reel or video, shown to a slice of the audience before the winner posts; winner by a chosen goal (API: AVG_TIME_WATCHED, REELS_PLAYS, SHARES, COMMENTS, LINK_CLICKS, IMPRESSIONS and others); 30 min to 1 week | API: https://developers.facebook.com/docs/video-api/ab-testing (read 2026-11-21). Business Suite path: third-party (https://leadenforce.com/blog/how-to-set-up-ab-content-tests-in-meta-business-suite-step-by-step, undated, read 2026-11-21). Whether Business Suite offers it for Instagram as well: unknown, check on screen. |
| TikTok | **No** for organic | Split testing exists only in TikTok Ads Manager (paid) | https://ads.tiktok.com/help/article/split-testing (search snippet, updated Jan 2026) |
| X | **No** for organic | A/B tests exist only in the Ads API | https://docs.x.com/x-ads-api/measurement/ab-testing (search snippet) |
| Threads | **No** | No test feature found among 2025-2026 Threads launches | searches 2026-11-21 (TechCrunch coverage of Threads features) |

### Test plan for the calendar

What a new account can measure: our posts get tens to a few hundred views (YouTube table above; English Shorts 22-74). At that size a single pair of posts proves nothing, because view counts swing several-fold from post to post on the same film (Cutling Indonesian Short: 456, 506, 945). So every test below is **matched pairs read with a sign test**: each pair is the same content in the same week, differing in exactly one thing; a variant wins only if it beats its partner in **7 of 8 pairs** (one-sided p = 0.035) or **6 of 6** (p = 0.016). Anything less is "no difference yet" and the cheaper option stays. Compare medians, never totals.

Metric per platform, in order of what predicts a sale: App Store link taps via `ct` (ASC Campaigns, once installs pass 5) > profile visits and link clicks > shares and saves > average watch time / completion > views.

| # | What varies | Where | How | Runs | Read |
|---|---|---|---|---|---|
| T1 | **Time slot** | every platform-language track in section 5 | Each track has 2-3 named slot arms (A, B, C below). Same film or post type rotates across arms by weekday so every arm gets every weekday over two weeks | weeks 1-2 (Nov 22-Dec 5) | per arm median views and taps at 48 h; 8 pairs per platform; keep the winning arm, retire the loser, open a new challenger in weeks 3-4 |
| T2 | **Hook** (first line on screen, first 2 s) | Facebook: Business Suite A/B test, 2-4 hooks per reel, goal AVG_TIME_WATCHED, 24 h. Instagram: trial reels if eligible, else the same film reposted with a new hook a week later in the same slot. YouTube: hooks cannot be tested on Shorts; test the explainer's **title and thumbnail** with YouTube's A/B tool (3 versions, watch time) | one hook family per week: pain question vs. outcome claim vs. number ("7 tabs closed") | weeks 1-4 | Facebook and YouTube report a winner themselves; carry the winning hook to the next TikTok and X post |
| T3 | **Language** | same film, EN vs ID vs JA, uploaded the same day on YouTube Shorts and TikTok | already running on YouTube by accident; make it deliberate with one film per week | weeks 1-4 | views per language **and** `ct` taps per language; the second matters more because iPhone share differs 21% (ID) vs 52-54% (US, JP) |
| T4 | **Format** | X and Threads: film vs. still image vs. text-only poll with the same pain line | matched-pair across two weeks, same slot | weeks 3-4 | replies and link taps |
| T5 | **Arabic on X** | Undirect only | 2 posts a week at two arms (16:15 and 22:00 Riyadh) | Nov 27-Dec 20 | `ct=x-ar` taps; stop if under 1 tap a week after 3 weeks (GUESS threshold) |

Realistic size: about 20 platform-language tracks x 2-4 posts a week = enough for 6-8 pairs per time test in two weeks on the busy tracks (X EN, TikTok EN, TikTok ID), and only 4-6 pairs on the small ones (JA Threads, AR X), which should run four weeks before any call.

## 5. New slots

Valid Nov 22-Dec 20 2026 (US on Eastern Standard Time: WIB = ET + 12 h; JST = WIB + 2 h; Riyadh = WIB - 4 h). Days are the **WIB** day; the audience's local day and time are beside each. Letters are the T1 slot arms; a track's arms rotate the same content types across weeks 1-2, then the loser is replaced. Source keys: **Bu** Buffer 2026, **Sp** Sprout 2026 (Sp-tech = Sprout software and technology pages), **Me** Metricool 2026, **Ho** Hootsuite 2025, **MIC** Japan ministry 2024 survey, **Jk** Jakpat 2024 via IDN Research, **Own** our YouTube numbers, **AR** the @APPS_RH post.

### English (US audience; UK sees it mid-afternoon)

| Platform | WIB day and time | Audience local | Arm | Why |
|---|---|---|---|---|
| X | Mon, Tue, Wed, Thu 21:10 | Mon-Thu 09:10 ET | A | Bu Tue 9:00 / Wed 9-10; Ho Wed-Fri 9-11 |
| X | Tue, Wed, Thu, Fri 01:30 | Mon-Thu 13:30 ET | B | Sp-tech X Tue-Thu 11-16; Sp X Tue-Thu 12-18 |
| X | Fri 23:30 | Fri 11:30 ET | A | Sp-tech Fri 11-13 |
| X | Sun 22:30 | Sun 10:30 ET | test | Ho Sun 9-12 vs Me "avoid Sun": let T1 decide |
| Threads | Tue, Wed, Thu 20:30 | Tue-Thu 08:30 ET | A | Bu Thu 9:00, weekdays 7-12, Wed/Thu/Tue best; Ho Tue 8:00 |
| Threads | Sat 02:00 | Fri 14:00 ET | B | Ho Fri 14:00; Bu says Sat-Mon weakest, so no weekend-day post |
| Instagram + Facebook (one Business Suite post) | Tue 00:30, Wed 00:30 | Mon, Tue 12:30 ET | B | Sp-tech IG Mon 11-13, Tue 11-16; Sp FB Tue-Wed 12-20 |
| Instagram + Facebook | Thu 06:00 | Wed 18:00 ET | C | Bu IG Wed 18:00; Me IG 20:00 |
| Instagram + Facebook | Thu 21:00 | Thu 09:00 ET | A | Bu IG and FB both Thu 9:00 |
| TikTok | Sun 21:00 | Sun 09:00 ET | A | Bu TikTok #1 Sun 9:00 |
| TikTok | Tue 01:00 | Mon 13:00 ET | A | Bu #2 Mon 13:00; Sp Mon 15-17 |
| TikTok | Thu 07:00, Sun 07:00 | Wed 19:00, Sat 19:00 ET | B | Me 18-20; Bu views peak 18-23; Bu Sat best day |
| YouTube Shorts | Fri 04:00, Sat 04:00 | Thu 16:00, Fri 16:00 ET | A | Bu Shorts Fri 16:00, Thu/Fri/Sat best |
| YouTube long-form (explainers; title/thumbnail A/B here) | Sun 22:00 | Sun 10:00 ET | A | Bu long-form Sun 10:00 |

### Indonesian (WIB is local)

| Platform | WIB day and time | Arm | Why |
|---|---|---|---|
| TikTok | Sat 19:00, Sun 19:00, Mon 19:30 | A | Jk evening 18-21; Bu Sat and Mon best TikTok days; Me 18-20 |
| TikTok | Wed 07:30 | B | Jk morning 07-09 |
| Instagram Reels + Facebook Reels | Tue 19:30, Sun 19:30 | A | Jk 18-21; Me IG 20:00 |
| Instagram Reels + Facebook Reels | Thu 12:15 | B | Sp-tech IG 11-14 local; lunch spike is MIC's Japan finding (GUESS for Indonesia) |
| YouTube Shorts | Fri 16:30 | A | Bu Shorts Fri 16:00; Own: uploads at 16:12-19:04 WIB reached 456-945 |
| YouTube Shorts | Mon 06:30 | B | Own: 06:17 WIB upload reached 1,184; Jk 07-09 |

### Japanese

| Platform | WIB day and time | JST | Arm | Why |
|---|---|---|---|---|
| X | Mon, Wed, Fri 10:05 | 12:05 | A | MIC weekday 12時台 33.5% (30s 48.3%), the daytime peak |
| X | Tue, Thu, Sat 19:30 | 21:30 | B | MIC 21時台 39.1% all ages, 53.7% 20s (daily peak) |
| X | Sun 09:00 | Sun 11:00 | A | MIC holiday 10-14時 24-26% |
| X (weeks 3-4 only) | Tue, Thu 05:45 | 07:45 | C | MIC 07-08時 23-25% (commute) |
| Threads | Tue, Thu 10:10 | 12:10 | A | MIC lunch; Bu Threads weekday mornings to 12:00 |
| Instagram | Fri 10:15 | 12:15 | A | Sp-tech IG Fri 11-14; MIC lunch |
| Instagram | Wed 19:00, Sat 09:00 | Wed 21:00, Sat 11:00 | B | MIC 21時 peak; holiday daytime |
| YouTube Shorts | Wed, Fri, Sun 19:30 | 21:30 | A | MIC 21-22時; Own: the best Japanese Short (230) went up at 21:37 JST |
| TikTok | Sat 19:00 | Sat 21:00 | A | MIC; TikTok used by 33% of Japanese (65.7% of teens), so one a week |

### Arabic (Undirect only, X only)

| WIB day and time | Riyadh | Arm | Why |
|---|---|---|---|
| Sun 20:15 | Sun 16:15 | A | AR: the 132-download post went out 16:16 Riyadh |
| Thu 02:00 | Wed 22:00 | B | GUESS: evening, no study found |
| Fri 27 Nov to Mon 30 Nov, 20:15 daily | 16:15 | sale | the $0.99 sale; same hour as the post that worked |

### Weekly load and what changes from today

About 52 posts a week (EN 25, ID 9, JA 16, AR 2), against today's 21 posts each copied to six platforms at the same three WIB minutes (126 deliveries). The English posts already written (P1-P87) move onto the English slots above; the Indonesian and Japanese tracks reuse the films that already exist in those languages and need captions written per `blind-translation`. One account per platform carries every language (YouTube already does); whether to split Japanese into its own X account later is the owner's call and blocks nothing now.

Recheck after two weeks: T1 results per track; ASC Sales by territory once the API key has the Sales role and the vendor number is known; YouTube Studio Geography; TikTok Studio most-active times; Instagram follower count for trial reels.

## App Store units by country, read in App Store Connect Sales and Trends (2026-11-21)

Both apps, iOS and macOS app purchases, units (downloads and sales), Aug 20 to Nov 19 2026, 450 units. Most fall on the Oct 10 spike while Undirect was free. Vendor number 93285092; the API key 8R8JCJZUNJ still lacks the Sales role (salesReports answers 403), so these are read from the web dashboard.

| Region | Units | Top countries |
|---|---|---|
| Africa, Middle East and India | 170 | Saudi Arabia 132, Egypt 12, UAE 8, India 5, Jordan 3, Morocco 3 |
| USA and Canada | 140 | (not split) |
| Europe | 71 | France 13, Italy 11, UK 8, Türkiye 7, Russia 6, Germany 5, Spain 4 |
| Asia Pacific | 52 | China mainland 12, Taiwan 10, Indonesia 7, Japan 6, Australia 4, Thailand 4 |
| Latin America | 17 | |

Last 30 days (Oct 20 to Nov 19, 76 units): Europe 29, Asia Pacific 22, USA and Canada 14, Africa/ME/India 6, Latin America 5. After the free spike, Europe and Asia Pacific lead.

### Paid units by country (Sales API, key V48TZG72KY, Sep 1 to Nov 19 2026)

Free downloads came from the Oct 10 free day (US 130, Saudi Arabia 132). Paid units are what the calendar should chase:
Undirect: US 4, Taiwan 2, Canada 2, UK 1, Indonesia 1, Japan 1, Thailand 1, India 1, Netherlands 1. Cutling: US 3.
Paid buyers so far are English-speaking North America first, then Taiwan and single buyers across Asia and Europe.
