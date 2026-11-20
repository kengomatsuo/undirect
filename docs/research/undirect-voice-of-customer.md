# What people say about Safari redirects, pop-unders and the blockers they tried (ASG46, 2026-11-20)

Voice-of-customer research for Undirect's site, `llms.txt` and AI-facing files. Each finding was written here as it landed. Quotes are the person's own words, trimmed, under 15 words. Every URL was read this run through the source named; a source that could not be read is marked UNREAD.

Sources and how they were read:

- Reddit: pullpush.io search API (submissions and comments), 48 queries, 1,900+ items, filtered to Safari/iPhone/iPad/Mac and redirect/pop-up/new-tab words, then read by hand. Reddit itself was not fetched.
- App Store reviews of rivals: Apple's customer-review RSS returned empty feeds for most apps this run (only AdGuard and Adblock Plus answered), so reviews were read from each listing's `?see-all=reviews` web page in the US, GB, CA and AU storefronts (about 10 reviews each, Apple's "most helpful" pick, not a random sample). 539 reviews across 17 apps.
- Hacker News: hn.algolia.com API, 10 queries, 428 stories and comments.
- Apple Community and MacRumors: see their section.

"Solves it" judges Undirect as it ships, from `docs/redirect-mechanism.md` and `ai_facts.py`: it judges a cross-site trip by the press that preceded it, so a redirect that fires with no tap (while scrolling, on a timer) is treated as the user's own trip and let through; the back-button redirect is only reported; it is off on a site until the toolbar button is pressed there; Safari extensions do not run in a home-screen web app or in another app's in-app browser.

## Findings

| # | Their words | Source, date | Site / situation | Device | Already tried | Undirect solves it? |
|---|---|---|---|---|---|---|
| 1 | "the page suddenly and violently redirected me to a completely different URL" | https://www.reddit.com/r/iphone/comments/1x0aitu/ 2026-10-07 | local news site, fake "iPhone at Risk" settings page | iPhone, Safari | nothing; asks if safe | Partly: only if a tap triggered it; a redirect while scrolling with no tap is let through by design |
| 2 | "redirected me to a page, looking similar to the iPhone settings main page" | https://www.reddit.com/r/iphone/comments/1x0cpl2/ 2026-10-08 | local news, fake "device may have been infected" | iPhone, iOS 26.6.2 | nothing | Partly: same as 1 |
| 3 | "redirected me to safari, and then opened 50 million tabs" | https://www.reddit.com/r/malwares/comments/1wlemqf/ 2026-09-20 | manga site (via VPN) | iPhone | nothing | Yes for tabs a tap opened; no for tabs opened with no press |
| 4 | "I only get redirects and ads? I use Iphone" | https://www.reddit.com/r/OnePiece/comments/1w6s99m/one_piece_chapter_1192/p7ptnfn/ 2026-09-04 | manga (TCB scans) | iPhone | no ad blocker | Yes: tap-taken redirects and new tabs |
| 5 | "getting redirected to a mcafee scam site while reading" | https://www.reddit.com/r/royalroad/comments/1w62mfp/ 2026-09-03 | web fiction (Royal Road), fake McAfee scan | iPhone | cleared cache (suggested) | Partly: tap-driven yes, no-tap no |
| 6 | "got redirected(by an ad I assume) to a 'McAfee' page" | https://www.reddit.com/r/royalroad/comments/1w580h6/ 2026-09-02 | web fiction, fake virus scan | Safari | closed the tab | Partly |
| 7 | "have turned off the flag that allows redirects on Safari" | https://www.reddit.com/r/Piracy/comments/1wjdxd4/ 2026-09-18 | streaming (Batcave) | iPhone | ad blockers, Safari feature flag, Brave ("no better") | Yes for tap-taken trips; the "go back 5 pages" back-button hijack is only reported |
| 8 | "1Blocker which barely worked" / Brave "didn't block the ads, popups, or redirects" | https://www.reddit.com/r/PiracyArchive/comments/1vwr12s/ 2026-08-24 | free streaming/download sites | iPad | 1Blocker, Brave | Yes for redirects and pop tabs; no for the ads themselves |
| 9 | "the constant redirects are annoying" | https://www.reddit.com/r/Kagane/comments/1vvelhs/how_to_stop_redirecting/p6zuvls/ 2026-08-31 | manga site that blocks blockers | Safari | uBlock Origin Lite + AdGuard, had to turn both off | Partly: depends whether the site detects Undirect (it is not an ad blocker, so ad-block walls usually do not fire) |
| 10 | "The ad opens in a new tab ... repeat 7 times" | https://www.reddit.com/r/ReelShorts/comments/1vxbwxm/anyone_else_having_issues_watching_anything_on/p5s6b2x/ 2026-08-25 | short-drama streaming | iPhone, Safari | closing each tab by hand | Yes: pop tab after a tap |
| 11 | "redirecting me to 'ay267.com' whenever I use the search bar" | https://www.reddit.com/r/Safari/comments/1vtgcoi/ 2026-08-20 | ebook download site | Safari | asks for a warning setting | Yes; ay267.com is the same network Undirect's own record caught on lunarx.to |
| 12 | "To actually be able to use the website without 5 million redirect" | https://www.reddit.com/r/AnyNovelRequest/comments/1vtjbpd/link_or_novel_noel/p555qtw/ 2026-08-22 | novel site (novel6s) | iPhone | Block Pop-ups + feature flag "Verify window.open user gesture" | Yes, without feature flags |
| 13 | "redirected to Safari and then Shein multiple times in one chapter" | https://www.reddit.com/r/Wattpad/comments/1vpj5x0/ 2026-08-16 | Wattpad in-app ads to Shein app | phone (app) | nothing | No: happens inside an app, not Safari |
| 14 | "still get redirects when I add a website to the home screen" | https://www.reddit.com/r/Safari/comments/1gscdvx/anyway_to_stop_safari_ios_ad_redirects/pba17e9/ 2026-09-22 | home-screen web app | iPhone | the thread's Safari fix | No: Safari extensions do not run in home-screen web apps |
| 15 | "Safari immediately started bouncing me through a chain of redirect pages" | https://www.reddit.com/r/cybersecurity_help/comments/1vxpm6j/ 2026-08-25 | spam review page, tapped cookie "Consent", scareware | iPhone | nothing | Yes: a tap on a consent button sent cross-site is the case it judges |
| 16 | "The download button redirects to dumb fake file-hosting site" | https://www.reddit.com/r/Roms/comments/1twp56p/whats_the_verdict_on_romsfun_today/p8mstzs/ 2026-09-08 | ROM download site | Safari/Chrome | ad blocker on and off | Partly: if the button itself honestly leads there, Undirect lets it through (the press pointed there) |
| 17 | "dlhd ... redirects to dl streams ... bunch of ads thru safari" | https://www.reddit.com/r/Piracy/comments/1vz9emk/websites_for_live_cable_tv_like_fxx_adult_swim/p63ed6g/ 2026-08-26 | live TV / sports streaming | Safari | nothing | Partly: pop tabs and tap-taken trips yes, ads no |
| 18 | "every time i click on anything on safari/chrome it opens a new tab" | https://www.reddit.com/r/macbookair/comments/1vft22c/so_happy_i_got_16gb_of_ram_but_it_still_doesnt/p7ly74l/ 2026-09-03 | general browsing | MacBook Air | nothing | Yes on sites it is switched on for; Safari only |
| 19 | "Safari and the 1Blocker extension app works for me ... invisible pop ups, and redirects too" | https://www.reddit.com/r/pawchive/comments/1vqx0v6/pop_ups/p4cvq9b/ 2026-08-18 | archive site | Safari | 1Blocker (satisfied) | Rival praise: 1Blocker credited with invisible pop-ups on this site |
| 20 | "im using adguard on safari. Is this good enough to block ... malicious redirects" | https://www.reddit.com/r/CrackSupport/comments/1vejwq3/does_anyone_know_a_safe_way_to_download_sims_4/pab608v/ 2026-09-17 | game download mirror | Safari | AdGuard | Yes: the gap this question asks about |
| 21 | "Getting rid of annoying tabs opening on Safari with: AutoClose" | https://www.reddit.com/r/Safari/comments/1wrazth/ 2026-09-27 | rival self-promotion post | iPhone | AutoClose - Website Blocker | Rival: AutoClose closes tabs by a domain list |
| 22 | "Please allow ads on this site. Click OK to learn more." | https://www.reddit.com/r/iPadOS/comments/1vts6y9/ 2026-08-20 | many sites, anti-adblock popups | M4 iPad Air, iPadOS 27 beta | ad blocker | No: anti-adblock walls are an ad-blocker problem |
| 23 | "keeps redirecting me to a scam page without me clicking on the screen" | https://www.reddit.com/r/iphonehelp/comments/1c5h3uv/ 2024-04-16 | scam page, asks if iPhone has a virus | iPhone | nothing | No: no tap behind it, so Undirect lets it through by design |
| 24 | "What is the best Safari ad block that specifically targets auto redirect ads?" | https://www.reddit.com/r/Safari/comments/1b91ur1/ 2024-03-07 | general | iPhone | 1Blocker, AdGuard, Total Adblock | Partly: tap-driven yes; "auto" redirects with no tap no |
| 25 | "alongside the Ads ... there's always those redirects" | https://www.reddit.com/r/Safari/comments/1f5lvnw/ 2024-08-31 (Google's #1 for "safari redirect blocker") | anime streaming (aniworld) | Safari | AdGuard (blocked the ads, not the redirects) | Yes: exactly the gap |
| 26 | "prevents clicks on websites from opening new tabs without a confirmation" | https://www.reddit.com/r/Safari/comments/1pzedct/ 2025-12-30 | anime streaming | Safari | nothing | Yes (no confirmation prompt; it blocks and lists) |
| 27 | "Safari opening seemingly random tabs on its own? ... super freaked out" | https://www.reddit.com/r/Safari/comments/1u3nomu/ 2026-06-12 | unknown; fears hack | iPhone | nothing | Partly: if a press opened them; also needs reassurance copy that it is a page, not a virus |
| 28 | "every click you make it opens up a separate tab with some ad" | https://www.reddit.com/r/Safari/comments/1gqy27i/ 2024-11-14 | movie sites (soap2day) | Safari | a settings tip from a video | Yes |
| 29 | "AdGuard is letting in ALOT of the ads" | https://www.reddit.com/r/Safari/comments/1cm6l9g/ 2024-05-07 | anime streaming (kissanime) | Mac Safari (came from Arc + uBlock Origin) | AdGuard | Partly: pop tabs yes, ads no |
| 30 | "keeps redirecting me to some weird adult website" | https://www.reddit.com/r/Safari/comments/1eoz266/ 2024-08-10 | manhwa (templescans) | Safari | nothing | Yes for tap-taken trips |
| 31 | "no ad blockers work for redirecting ads that open new tabs" | https://www.reddit.com/r/aniwave/comments/1dpk72s/is_this_aniwave_app_real_or_someone_just_using/lahfasr/ 2024-06-27 | anime streaming | iPhone | ad blockers | Yes: the claim Undirect answers |
| 32 | "click on anything and ad pops up ... redirect me to App Store" | https://www.reddit.com/r/mlb/comments/1o83e0d/i_miss_when_regular_people_could_watch_the/njsl5z2/ 2025-10-16 | sports streams, App Store redirect, back button broken | iPhone | nothing | Partly: tap-taken App Store trip yes; back-button trap only reported |
| 33 | "most free sites trigger a million" pop-ups / "without opening 50 tabs" | https://www.reddit.com/r/cinehunters/comments/1t3guzy/ 2026-05-04 | free movie sites | iPad | switching sites | Yes |
| 34 | "without those annoying 'Your iPhone is infected' popups" | https://www.reddit.com/r/cinehunters/comments/1t5mog5/ 2026-05-06 | Soap2Day alternatives, fake virus | iPad | switching sites | Partly (tap-driven) |
| 35 | "Your site keeps redirecting to ads, to the point where it is unusable" | https://www.reddit.com/r/pokebattler/comments/ccsvco/ 2019-07-13 | game tool site | iPhone Safari | nothing | Yes for tap-taken trips |
| 36 | "keeps redirecting me to the scam tabs like you won a prize" | https://www.reddit.com/r/applehelp/comments/zzr2us/ 2022-12-31 | prize scam, fake virus | Safari | cleared history and data | Partly |
| 37 | "keeps redirecting me to that webpage when visiting certain sites that contain ads" | https://www.reddit.com/r/ios/comments/q8856g/ 2021-10-14 | ad-carrying sites | old iPad, iOS 10 | nothing | No: Undirect needs iOS 26.2 or later (project.yml), so an iOS 10 iPad is out |
| 38 | "stop google from redirecting me to the app store when i accidentally hit" | https://www.reddit.com/r/Safari/comments/1uzg8dx/ 2026-07-17 | Google's "open the app" buttons | iPhone | nothing | No: the button honestly leads to the App Store; Undirect lets honest links through |
| 39 | "the popups and page redirects make this almost unusable in safari" | https://www.reddit.com/r/Askromance/comments/1pz7kq4/abandoned_luna_now_untouchable_novel_read_online/o2ycus5/ 2026-02-01 | web-novel site | iPhone | feature flag workaround | Yes |
| 40 | "There's a bug ... any link i click opens in a new tab" | https://www.reddit.com/r/iPadOS/comments/1rerea1/ 2026-02-25 | general, iPadOS 26.3 | iPad | settings | No: Safari behaviour, not a page trick |
| 41 | "Is there a way to get it to stop doing this?" (Wattpad to Shein) | see 13 | in-app ads | phone | nothing | No |
| 42 | "Bought this for using free streaming sites ... new tabs of ads. Does not work." | Wipr 2 review, 1 star, 2025-07-12, https://apps.apple.com/us/app/id1662217862?see-all=reviews | streaming | iPhone | Wipr 2 ($4.99) | Yes: the job Wipr is not built for |
| 43 | "Still get pages refreshing mid read" | AdGuard review, 1 star, 2023-03-26, https://apps.apple.com/gb/app/id1047223162?see-all=reviews | news/reading | iPhone | AdGuard paid | No: a reload is same-site, Undirect leaves it |
| 44 | "comics ... will still open another tab when clicking to close them" | AdBlock Pro review, 2 stars, 2025-04-30, https://apps.apple.com/us/app/id1018301773?see-all=reviews | comics site, fake close button | iPhone | AdBlock Pro | Yes: a close button that opens a tab is a taken tap |
| 45 | "It doesn't block/has trouble with -redirect adds on certain websites" | AdBlock Pro review, 4 stars, 2020-12-27, same URL | various | iPhone | AdBlock Pro free | Yes |
| 46 | "1 click leads you to another website ... toggle to block redirects" | Halt review, 2 stars, 2025-03-15, https://apps.apple.com/us/app/id1529362535?see-all=reviews | various | iPhone | Halt browser | Yes, and per site |
| 47 | "keep a redirect page in the tab history" so Back loops | uBlock Origin Lite review, 2025-09-20, https://apps.apple.com/us/app/id6745342698?see-all=reviews | various, iOS 26 | iPhone | uBlock Origin Lite | Partly: Undirect sends the tab back itself; back-button hijack only reported |
| 48 | "pop ups that send me to a whole new page ... launch me to a whole other app" | uBlock Origin Lite review, 5 stars, 2026-11-02, same URL | pirate movie sites | iPhone | uBlock Origin Lite (happy) | Yes for the page; app launches only when a tap was taken |
| 49 | "it does not that well with redirects" | uBlock Origin Lite review, 5 stars, 2026-09-13, same URL | various | iPhone | uBlock Origin Lite | Yes: run beside it |
| 50 | "hijack my Safari with a new page ... 'You've won a prize!'" and swiping back reloads it | 1Blocker review, 5 stars, 2018-06-09, https://apps.apple.com/us/app/id1365531024?see-all=reviews | ad-carrying sites | iPhone | 1Blocker | Partly |
| 51 | "Pop-up ads are not blocked because they are not considered ads" | AdGuard review, 5 stars, 2021-04-23, https://apps.apple.com/us/app/id1047223162?see-all=reviews | general | iPhone | AdGuard | Yes: the exact split Undirect is built on |
| 52 | "kept redirecting me to download this app and wasnt able to go back" | Ad Blocker & Browser Protect review, 1 star, 2023-05-13, https://apps.apple.com/us/app/id1585053145?see-all=reviews | fake "your iPhone is vulnerable" ad selling an ad blocker | iPhone | nothing | Partly: tap-driven yes; trust problem: the scareware itself sells blockers |
| 53 | "Redirecting safari sites to apps (including app store) should be a per-domain permission" | https://news.ycombinator.com/item?id=44806044 2025-08-06 | app/App Store hand-offs | iPhone | nothing | Partly: per-site rules exist; universal-link app hand-offs are not judged |
| 54 | "ads that redirect on mobile to pages informing me about viruses on my iPhone" | https://news.ycombinator.com/item?id=17246677 2018-06-06 | news (Reuters) | iPhone | nothing | Partly (no-tap redirects pass) |
| 55 | "uBlock works on Safari on iPhone too. I didn't get ads or redirects." | https://news.ycombinator.com/item?id=46509659 2026-01-06 | general | iPhone | uBlock Origin Lite | Rival praise |

UNREAD this run: every Apple Community thread (discussions.apple.com served a "Security Verification" page to curl, and the owner's Chrome would not render the thread for text extraction); MacRumors forums search ("Just a moment..." Cloudflare page); macmost.com/forum/safari-not-blocking-pop-unders.html (HTTP 406). Apple's customer-review RSS feed for 1Blocker, StopTheMadness Pro, Wipr 2, TabGuard, Tab Blocker, Popup Blocker (strict) (empty feed); Popup Blocker (strict) id6743147700 listing returned 404 in US, GB, CA, AU; TabGuard and Tab Guard: Stop New Tabs had no written reviews.

## Top 15 pains, ranked by how often they came up

Counted from the 55 rows above plus the wider Reddit pull; a pain is counted once per distinct person.

1. **Every tap on a free streaming, anime or sports site opens a new tab of ads** (rows 4, 8, 10, 17, 25, 26, 28, 29, 31, 33, 42, 48). Undirect: yes.
2. **Sent to a fake virus / "iPhone at risk" / McAfee scan page** (1, 2, 5, 6, 34, 36, 52, 54). Undirect: partly; only when a tap triggered it.
3. **"Ad blocker installed, still redirected"**: 1Blocker, AdGuard, Brave, uBlock, Wipr, AdBlock Pro named as not stopping redirects (7, 8, 9, 24, 25, 29, 31, 42, 45, 49). Undirect: yes, beside them.
4. **Manga, manhwa and web-novel readers redirected mid-chapter** (3, 4, 9, 12, 30, 39, 5/6 Royal Road). Undirect: yes for taps.
5. **Redirects "without me clicking"**, while scrolling or on load (1, 2, 23, 24, 54). Undirect: no today.
6. **Back button trapped**: going back re-opens the ad or jumps back 5 pages (7, 32, 47, 50). Undirect: partly (it sends a caught tab back; back-button hijack only reported).
7. **Thrown to the App Store or into another app** (32, 38, 48, 53, 13). Undirect: partly.
8. **Fear it is a virus or hack**: "Does iPhone really get malware?", "freaked out" (2, 3, 27, 36, plus r/cybersecurity_help and r/techsupport posts 2026-10-10). Undirect: answers the fear only if the copy says it is the page, not the phone.
9. **Block Pop-ups is on and it still happens** (12, 7, and the Google PAA "Why am I still getting pop-ups on Safari?"). Undirect: yes.
10. **Workarounds people pass around: Safari feature flag "Verify window.open user gesture"** (12, 39, 7). Undirect: replaces a hidden developer flag.
11. **Fake close buttons and invisible layers that open ads** (19, 44, 1Blocker review 2025-02-28 "invisible popup ad"). Undirect: yes.
12. **Pay-walled or subscription blockers that then fail** (Adblock Plus $40/yr reviews, Total Adblock trial-to-$9.95/month, AdBlock Pro premium). Undirect: paid once.
13. **Blockers that break sites or trigger "please allow ads" walls** (9, 22, Wipr review "there's something wrong with this site", StopTheMadness "Breaks a lot of things"). Undirect: not an ad blocker, so ad-block walls rarely fire.
14. **Home-screen web apps and in-app browsers still redirect** (14, 13). Undirect: no.
15. **Tabs opening by themselves on Mac** (18, r/MacOS "Safari opens new tabs in a non deterministic way"). Undirect: yes on Mac Safari.

## Exact phrases people use

Titles and questions as written (each linked above):

1. "Anyway to stop Safari IOS ad redirects?" (r/Safari 1gscdvx)
2. "Safari-Extension to block redirects?" (r/Safari 1f5lvnw)
3. "How am I supposed to prevent getting redirected?" (r/Safari 1vtgcoi)
4. "Safari opening seemingly random tabs on its own?" (r/Safari 1u3nomu)
5. "keeps redirecting me to a scam page without me clicking on the screen" (r/iphonehelp)
6. "best Safari ad block that specifically targets auto redirect ads" (r/Safari 1b91ur1)
7. "How to block unwanted tabs opening automatically in Safari" (r/Safari bw269n)
8. "looking for extension that blocks tab pop-ups" (r/Safari 17fbifc)
9. "Got redirected to a fake 'iPhone at Risk' settings page" (r/iphone 1x0aitu)
10. "Safari keeps redirecting to ad sites" (r/ios 10qxvct)
11. "New tab ad pop extension" / "without a confirmation" (r/Safari 1pzedct)
12. "How to stop safari from opening tabs?" (r/ios 1gase0g, Google #2)
13. "Best free movie site for iPad (no popups)?" (r/cinehunters)
14. "redirect ads", "pop under ads", "5 million redirect", "opened 50 million tabs" (rows 7, 12, 3, Adblock Plus review)
15. "Why am I still getting pop-ups on Safari?" (Google People Also Ask)

Words people use that the site does not: "redirect ads", "auto redirect", "scam page", "random tabs", "new tab ads", "every click", "without me clicking", "go back", "invisible pop ups". Words the site uses that nobody used: "click layer", "tab-under", "rewritten link", "self-clicked link". Nobody wrote "pop-under" except reviewers of ad blockers and HN; people say "opens a new tab".

## Complaints about rival blockers

- **Subscriptions and trial traps**: Adblock Plus "Not free ... features are only available via paid subscription" (2026-11-06), "$40 for the year" then ads came back (2026-10-30), "$60" annual; Total Adblock trial at $1.99 then $9.95 a month, hard to cancel (many 2022-2025); Ad Blocker & Browser Protect "$15.00 a week" (2021-12-17); 1Blocker moved paid features to a subscription (2020, 2021 reviews); AdGuard Pro became a subscription (2020). Someone asked Adblock Plus to "just make the app have to be paid ONCE" (2026-09-07).
- **Does not stop redirects or pop tabs**: Wipr 2 "Not helpful for streaming sites" (2025-07-12); AdBlock Pro "has trouble with redirect adds" (2020) and comics site still opens tabs (2025); uBlock Origin Lite "does not that well with redirects" (2026-09-13); Halt "Sooo many redirects" (2025-03-15); AdGuard review "Pop-up ads are not blocked because they are not considered ads" (2021).
- **Breaks after iOS updates**: AdGuard "Worked until this last iOS update" and "used to actually work" (both 2026-11-18); AdGuard Pro "STOPPED WORKING ON IOS UPDATE TO 26.3" (2026-02-13); uBlock Lite "slightly broken on iOS 26".
- **Breaks sites / anti-adblock walls**: StopTheMadness Pro "Breaks a lot of things", "no trial option" (2024-10-23) and "breaking more websites" (2025-08-27); Wipr 2 on a recipe site "there's something wrong with this site" wall (2025-11-11); AdBlock Pro grey boxes on a web novel (2024).
- **Slow, battery, data**: AdBlock "Massive battery drain" (2020); AdGuard "rinsing my new iPad Pro m4's battery" (2024) and "makes my WiFi and data bad" (2026-11-10); Adblock Plus "Made my browser so slow" (2026-07-05) and "Safari browsers are desperately slow" (2025-07-21); Wipr 2 "browses a little slower".
- **Privacy distrust**: Adblock Plus "Wants access to your browser history" (2026-08-23) and asked to change DNS (2026-02-16); Halt "Deceptive privacy policy" (2023); scareware ads that push a blocker subscription (Ad Blocker & Browser Protect reviews 2022-2024).
- **What they praise** (to match, not copy): set-and-forget, one-time or free price, works on iPhone, iPad and Mac with one purchase (StopTheMadness "universal app so one purchase"), an indie developer.

## Gaps Undirect does not solve yet that people want

1. **Redirects with no tap** (on load, while scrolling, on a timer): the most-reported fake-virus pattern. Today a no-press navigation is treated as the user's own. Idea: on a site the user has switched on, treat a cross-site top-level navigation with no press and no typed address as suspect, or at least record it so it can be blocked with one tap.
2. **Back-button hijack**: people describe Back reloading the ad or skipping 5 pages. Today it is only reported.
3. **Home-screen web apps and in-app browsers** (Reddit, Wattpad, Instagram): extensions do not run there; worth one honest line in support copy.
4. **Ad blocking itself**: almost every streaming/manga thread wants ads gone too. Undirect should keep saying "run it beside 1Blocker, AdGuard or uBlock Origin Lite" in buyers' words.
5. **"Open in app" and App Store hand-offs**: an HN user wants per-domain permission for site-to-app jumps; Google's own "open the app" buttons send iPhone users to the App Store.
6. **A confirmation prompt** ("without a confirmation", r/Safari 1pzedct): some want to be asked rather than silently blocked.
7. **Reassurance**: many posts are really "is my phone infected?" A site page answering that (it is the page, not the phone; close the tab; do not install what it pushes) would meet the fear before the purchase.
8. **Older devices**: old-iPad users (iOS 10 in row 37) turn up often; Undirect needs iOS 26.2 or macOS 15, which excludes them.
9. **On by default**: Undirect ships off until the toolbar button is pressed per site, while praised rivals are set-and-forget. People ask for "install and forget".
