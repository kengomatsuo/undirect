# Market read: comparable App Store listings, US storefront, fetched 2026-11-18

Scope: what the listings of comparable apps look like, so the owner can change two of his own. Not a conversion benchmark: no competitor's funnel is public, so nothing here says what any listing converts at. Every row was read from the app's own apps.apple.com page (saved in `sources/page-<id>.html`); the four pages whose price, rating and chart badge matter most were also read in Claude in Chrome (`sources/chrome-read-2026-11-18.md`; one browser connected, own tab, closed afterwards). Pictures: the first two screenshots of every app are in `shots/<id>-s1.jpg` and `-s2.jpg`. Source index: `notes.md`. Nothing committed.

## How the apps were found, and what that does not tell you

I used Apple's own search API (`itunes.apple.com/search`, US, top 25 per term, 10 terms from the brief; files in `sources/search/`) because apps.apple.com has no search page. Its ordering is not guaranteed to match the App Store app's search ranking: UNSURE how closely they agree. Candidates were then chosen by rating count and by price model (all the paid-up-front ones I saw). Wipr 2 and Hush Nag Blocker did not appear in my ten Safari searches; I added them after a name search because Wipr 2 is the closest paid-up-front blocker (search for "wipr").

"Price model" is read from the page: price button "Get" plus an "In-App Purchases" list = Free + IAP; a dollar price on the button = paid up front. Whether an IAP is a subscription or has a free trial is not on the page (trials show in the purchase sheet): UNSURE for every row. IAP lists include old price points, so they are ranges, not today's price. "Video" = the page's media list contains an app preview. The text in the screenshot columns I read off the saved images myself; "(no caption)" means no headline text.

## Category 1: clipboard / snippet keyboards (Cutling's category)

Sorted by rating count. The last row is Cutling.

| # | App | Price model | Price | Subtitle | 1st screenshot text | 2nd screenshot text | Video | Rating / count | Chart | Released, min OS | Saved page |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | [AutoPaste - Keyboard](https://apps.apple.com/us/app/id1571506312) | Free + IAP | Free | Keyboard to share & text fast | Send 1000 messages in 1 sec! | Fast Copy & Paste Keyboard | no | 4.6 / 125,748 | none shown | 2021, iOS 15.6+ | `sources/page-1571506312.html` |
| 2 | [Auto Paste Keyboard](https://apps.apple.com/us/app/id1570011952) | Free + IAP | Free | AutoPaste & Auto Clicker | Send thousands of messages in seconds! | AUTO PASTE KEYBOARD / Paste any message. In one tap. | no | 4.7 / 90,625 | none shown | 2021, iOS 15.0+ | `sources/page-1570011952.html` |
| 3 | [Paste Keyboard](https://apps.apple.com/us/app/id1066723174) | Free + IAP | Free | Super Easy Copy&Paste Keyboard | Easy Copy Paste (New Update) | Simple, Quickly / use your messages | no | 4.7 / 44,410 | none shown | 2016, iOS 15.0+ | `sources/page-1066723174.html` |
| 4 | [AutoSend - Paste Keyboard App](https://apps.apple.com/us/app/id1570364756) | Free + IAP | Free | Copy and Paste Font Keyboard | Use Keyboard Anywhere | AutoSend / On Snapchat and TikTok DMs | no | 4.6 / 13,179 | none shown | 2021, iOS 17.0+ | `sources/page-1570364756.html` |
| 5 | [Copypasta Keyboard](https://apps.apple.com/us/app/id1499757423) | Free + IAP | Free | Copy & Paste, repeat, and more | (no caption; chat full of repeated emoji) | Copypasta app screen; says 'Tired of ads? Pay to remove.' | no | 4.8 / 9,518 | none shown | 2020, iOS 13.2+ | `sources/page-1499757423.html` |
| 6 | [WordBoard: Text Expander](https://apps.apple.com/us/app/id960167417) | Free + IAP | Free | Snippets, Shortcuts & AI Keys | TYPE 10X FASTER (+ 'Apple Featured, Great Apps for iOS 26', 5 stars) | TAP KEYS / SEND MESSAGES | no | 4.9 / 5,619 | none shown | 2015, iOS 18.0+ | `sources/page-960167417.html` |
| 7 | [Copy and Paste](https://apps.apple.com/us/app/id1572815929) | Free (no IAP listed) | Free | lazy paste keyboard | Copy and Paste | Repeat Text | no | 4.6 / 3,281 | none shown | 2021, iOS 10.0+ | `sources/page-1572815929.html` |
| 8 | [Clipboard - Paste Keyboard](https://apps.apple.com/us/app/id1514741180) | Free + IAP | Free | Auto Copy and Paste Keyboard | (no caption; dark snippet list UI) | (no caption; iMessage with keyboard) | yes | 4.5 / 1,872 | none shown | 2020, iOS 15.0+ | `sources/page-1514741180.html` |
| 9 | [LazyBoard: Text Expander](https://apps.apple.com/us/app/id1459047306) | Free + IAP | Free | Quick Reply & Snippet Keyboard | TYPE WITH ONE TAP (+ '4.4 App Store Rating' laurel) | ADD KEYBOARD SHORTCUTS | no | 4.4 / 591 | none shown | 2019, iOS 17.0+ | `sources/page-1459047306.html` |
| 10 | [Phraser - Paste Keyboard](https://apps.apple.com/us/app/id1106396024) | Free + IAP | Free | Save & Paste Text Snippets | Your info in your keyboard | Switch & Insert | no | 4.7 / 550 | none shown | 2016, iOS 26.0+ | `sources/page-1106396024.html` |
| 11 | [FastBoard - Phrase Keyboard](https://apps.apple.com/us/app/id1462074199) | Free + IAP | Free | Save Reusable Text・1-Tap Paste | Your Phrases, One Tap / A Blazing-Fast Shortcut Keyboard | Always Ready, Anywhere | no | 4.7 / 253 | none shown | 2019, iOS 15.6+ | `sources/page-1462074199.html` |
| 12 | [CopyEasy Text Snippets](https://apps.apple.com/us/app/id6767789668) | Paid up front | $2.99 | Paste Replies Faster | Save once. Copy in one tap. | Every phrase within reach. | no | 5.0 / 1 | none shown | 2026, iOS 17.0+ | `sources/page-6767789668.html` |
| 13 | [Cutling - Clipboard Keyboard](https://apps.apple.com/us/app/id6759476314) | Paid up front | $4.99 | Paste Text Snippets & Replies | Clipboard keyboard for snippets / Tap once to paste saved text into any app | All you retype, in one place / Addresses, account numbers, emails and more | yes | - / 0 | none shown | 2026, iOS 18.0+ | `sources/page-6759476314.html` |

Wording of each row's IAP list, from the page:

| App | IAP list as printed |
|---|---|
| AutoPaste | AutoPaste+ $4.99, $6.99, $8.99, $14.99, $18.99 (names say "Weekly") |
| Auto Paste Keyboard | Become PRO $14.99 / $39.99, Lifetime Pro $79.99, Remove Ads $4.99 |
| Paste Keyboard | Monthly Premium $1.99-$4.99, Yearly Premium $17.99, Remove Ads $99.99 |
| AutoSend | Lifetime $4.99, Weekly $4.99 / $7.99, VIP $2.99 / $9.99, Tip $0.99 |
| Copypasta | Text $0.99, Upside Down $2.99, Remove Ads $1.99, Text Memes $1.99 |
| WordBoard | Monthly Pro $7.99, Annual Pro $49.99, Pro $99.99 |
| Clipboard - Paste Keyboard | Annual Premium iOS $4.99, Annual Premium Mac $4.99 |
| LazyBoard | Weekly $1.99, Monthly $4.99, Yearly $24.99, Lifetime $40.99 |
| Phraser | Unlimited Phrases $0.99 |
| FastBoard | FastBoard Pro $14.99 |

### Patterns among the most-rated (rows 1-7, 3,281 to 125,748 ratings)

1. All seven are free to download. Six have IAP, one lists none (row 7). The only paid-up-front app in the set, CopyEasy (row 12, $2.99), has 1 rating. Cutling ($4.99) is the only paid-up-front app with a real feature set and zero ratings. Rows 1-7, 12, 13.
2. Their rating counts come from apps released 2016-2021 (rows 1-7, "Released" column), so age explains part of the count. I cannot separate age from conversion: UNSURE.
3. The first screenshot is a huge 3-8 word headline on a flat colour, mostly a speed or ease claim: "Send 1000 messages in 1 sec!", "Send thousands of messages in seconds!", "TYPE 10X FASTER", "Easy Copy Paste" (rows 1, 2, 3, 6). Three of seven carry a number or a speed word. Cutling's headline is two lines of smaller text. Look at `shots/1571506312-s1.jpg`, `shots/1570011952-s1.jpg`, `shots/960167417-s1.jpg` beside `shots/6759476314-s1.jpg`.
4. Social proof is used as screenshot content when it exists: WordBoard (row 6) shows "Apple Featured, Great Apps for iOS 26" and 5 stars in its first screenshot; LazyBoard (row 9, 591 ratings) shows a "4.4 App Store Rating" laurel. Cutling and CopyEasy have none to show.
5. Six of seven put copy / paste / text in the subtitle, and six of seven have "Paste" or "Copy" in the name (rows 1-7; WordBoard is the exception on the name). Cutling's name carries "Clipboard Keyboard", and its subtitle "Paste Text Snippets & Replies" carries "Paste" and "Text".
6. None of the seven has an app preview video. Cutling has one. Only row 8 (1,872 ratings) of the whole set besides Cutling has one.
7. The volume is in a different job from Cutling's. The top screenshots show repeat-spamming DMs ("I MISS THE RAGE", "On Snapchat and TikTok DMs", "Repeat Text"). The apps whose screenshots show saved personal info, which is Cutling's job (Phraser "Your info in your keyboard", FastBoard, LazyBoard, CopyEasy; rows 9-12), have 1 to 591 ratings. GUESS: the search term "copy paste keyboard" is mostly typed by people wanting the spam-repeat tool, so ranking there is a different audience.
8. In the snippet / personal-info sub-group (rows 9-11) the monetisation is a low unlock ($0.99, Phraser) or subscription / lifetime ($14.99 FastBoard; LazyBoard $1.99 weekly to $40.99 lifetime). Nobody there asks $4.99 up front.

## Category 2: Safari popup / ad blockers and paid Safari extensions (Undirect's category)

Sorted by rating count within groups. The last row is Undirect. Rows 7, 10 and 11 are paid up front and are the nearest peers.

| # | App | Price model | Price | Subtitle | 1st screenshot text | 2nd screenshot text | Video | Rating / count | Chart | Released, min OS | Saved page |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | [AdBlock Pro for Safari](https://apps.apple.com/us/app/id1018301773) | Free + IAP | Free | Ad Blocker for Web and YouTube | (laurels) 10+ years on App Store. iPhone, iPad, Mac, Vision Pro. 'Apple Essentials for Better Browsing', 'The Best Safari Extensions'... | Block ads and trackers. Save data and privacy. | no | 4.5 / 74,692 | none shown | 2015, iOS 15.0+ | `sources/page-1018301773.html` |
| 2 | [Total Adblock - Ad Blocker](https://apps.apple.com/us/app/id1564900435) | Free + IAP | Free | Faster Browsing With No Ads | Block Ads in Safari / Remove banners, video ads and pop-ups by default | Cut data usage by up to half by blocking data consuming ads. | no | 4.0 / 43,360 | none shown | 2021, iOS 15.6+ | `sources/page-1564900435.html` |
| 3 | [AdGuard Ad Blocker for Safari](https://apps.apple.com/us/app/id1047223162) | Free + IAP | Free | No Ads DNS, Adblock, Privacy | The World's Most Advanced Ad Blocker / No annoyances, No trackers, No ads | Take back your privacy and security | no | 4.4 / 20,488 | #180 Utilities | 2015, iOS 15.0+ | `sources/page-1047223162.html` |
| 4 | [Adblock Plus for Safari & Apps](https://apps.apple.com/us/app/id1028871868) | Free + IAP | Free | Ad Blocker for Web & Privacy | The Power of Adblock Plus for iPhone / Safari Ads Blocked, Ads in Apps Blocked, Trackers Blocked | (no headline; dashboard) 'Family Sharing' | no | 4.3 / 19,975 | none shown | 2015, iOS 17.0+ | `sources/page-1028871868.html` |
| 5 | [1Blocker: Ad Blocker](https://apps.apple.com/us/app/id1365531024) | Free + IAP | Free | Better browsing in Safari | Ad Blocker for Safari (+ 'The Best Safari Extensions' laurel, 'As seen on' Forbes, NYT, Verge...) | Remove ads on sites. Stick with Safari. | no | 4.5 / 13,119 | none shown | 2018, iOS 16.0+ | `sources/page-1365531024.html` |
| 6 | [Ad Blocker & Browser Protect](https://apps.apple.com/us/app/id1585053145) | Free + IAP | Free | Filter ads PRO for Safari | Landscape banner: Automatically Blocks: Ads, Harmful Scripts, Annoying Popups, Social Trackers | Landscape banner: AdBlock, Ultimate Ad Blocker | no | 4.2 / 7,403 | none shown | 2021, iOS 14.0+ | `sources/page-1585053145.html` |
| 7 | [Weblock: adblock & proxy](https://apps.apple.com/us/app/id558818638) | Paid up front | $1.99 | Best ad blocker since 2012 | Weblock lets you block ads in any and all apps effortlessly | Top utility app around the world. Trusted by over 750 000 users | no | 4.3 / 4,893 | none shown | 2012, iOS 12.0+ | `sources/page-558818638.html` |
| 8 | [AdGuard Pro: Safari Ad Blocker](https://apps.apple.com/us/app/id1126386264) | Paid up front | $9.99 | Privacy & Browser Security | The World's Most Advanced Ad Blocker / No annoyances, No trackers, No ads (same art as the free AdGuard) | Take back your privacy and security | no | 4.4 / 3,180 | #26 Utilities | 2016, iOS 15.0+ | `sources/page-1126386264.html` |
| 9 | [BlockBear!](https://apps.apple.com/us/app/id1023924541) | Free (no IAP listed) | Free | Block ads and save data | Block ads and protect your privacy with a bear | Ad free browsing in Safari (with/without BlockBear) | no | 4.7 / 2,801 | none shown | 2015, iOS 9.0+ | `sources/page-1023924541.html` |
| 10 | [Wipr 2](https://apps.apple.com/us/app/id1662217862) | Paid up front + tip IAP | $4.99 | Block ads, trackers, and more | Block all the bad things | List: banner ads, popups, video ads, ... anti-blocker nags, trackers, data collection | no | 4.7 / 1,378 | #4 Utilities | 2024, iOS 17.0+ | `sources/page-1662217862.html` |
| 11 | [Noir - Dark Mode for Safari](https://apps.apple.com/us/app/id1581140954) | Paid up front | $2.99 | Browse better at night | Add a dark mode to every website | Works automatically and on all websites | no | 4.6 / 1,373 | #3 Utilities | 2021, iOS 15.0+ | `sources/page-1581140954.html` |
| 12 | [Hush Nag Blocker](https://apps.apple.com/us/app/id1544743900) | Free (no IAP listed) | Free | Block Cookie and Tracking Nags | (app screen: 'Hush is enabled'; only 1 screenshot) | (none) | no | 4.4 / 1,092 | none shown | 2020, iOS 14.3+ | `sources/page-1544743900.html` |
| 13 | [uBlock Origin Lite](https://apps.apple.com/us/app/id6745342698) | Free (no IAP listed) | Free | An efficient content blocker | (no caption; extension popup UI) | (no caption; settings UI) | no | 4.7 / 1,005 | none shown | 2025, iOS 18.5+ | `sources/page-6745342698.html` |
| 14 | [Banish - Block 'Open in App'](https://apps.apple.com/us/app/id1632848430) | Paid up front | $2.99 | Hide annoying popups in Safari | Block annoying 'Open in App' popups (before/after) | Hide popups that block the page (before/after) | no | 3.8 / 263 | none shown | 2022, iOS 15.0+ | `sources/page-1632848430.html` |
| 15 | [wBlock: Ad Blocker for Safari](https://apps.apple.com/us/app/id6746388723) | Free (no IAP listed) | Free | Tracker & popup blocking | Block ads and trackers in Safari / Pick your filter lists and see your Safari Rules count | Add userscripts | no | 4.8 / 193 | none shown | 2025, iOS 15.4+ | `sources/page-6746388723.html` |
| 16 | [Poper Blocker: Ad Blocker](https://apps.apple.com/us/app/id6743758947) | Free (no IAP listed) | Free | Block Ads & Popups Instantly | Trusted by over 3 million customers / The Ultimate Safari Pop Up Blocker | Block Ads for Faster Browsing | no | 4.3 / 20 | none shown | 2025, iOS 17.0+ | `sources/page-6743758947.html` |
| 17 | [Undirect - Popup Blocker](https://apps.apple.com/us/app/id6810513194) | Paid up front | $1.99 | Stop Safari redirects & tabs | Popup blocker for Safari | One press guards a site | yes | - / 0 | none shown | 2026, iOS 26.2+ | `sources/page-6810513194.html` |

IAP lists as printed: AdBlock Pro 1 month $1.99 to Lifetime $39.99; Total Adblock $7.99 and $29.99-$47.90 annual; AdGuard (free) $1.99 to $19.99; Adblock Plus Monthly about $4, Yearly about $40; 1Blocker Monthly $2.99, Yearly $14.99, Lifetime $39.99; Wipr 2 lists "Filtr" $4.99 / $24.99 plus tips $1.99-$19.99.

Chart badges: AdGuard (free) "#180 Utilities", AdGuard Pro "#26 Utilities", Wipr 2 "#4 Utilities", Noir "#3 Utilities". The page does not say whether these are the paid or free charts: UNSURE. Cutling and Undirect show no chart badge. No other listed app shows one.

### Patterns among the most-rated (rows 1-5, 13,119 to 74,692 ratings)

1. All five are free to download with subscription-type IAP, with a lifetime option in two (AdBlock Pro, 1Blocker). None is paid up front. Rows 1-5.
2. All five were released 2015-2021, four of them in 2015-2018. Rows 1-5, "Released" column.
3. Among apps with 1,000+ ratings that are paid up front: Weblock $1.99 (4,893), AdGuard Pro $9.99 (3,180), Wipr 2 $4.99 (1,378, chart #4), Noir $2.99 (1,373, chart #3). Noir is a dark-mode extension, not a blocker, but it is the same shelf of "paid Safari extensions" and shows $2.99 sustaining a top-3 chart badge. Weblock's price is the same $1.99 as Undirect's now. Their release years are 2012, 2016, 2024, 2021: all older than Undirect (2026).
4. First screenshots fall into two kinds. Brand plus a big claim: "The World's Most Advanced Ad Blocker / No annoyances, No trackers, No ads" (AdGuard), "The Power of Adblock Plus for iPhone", "Block Ads in Safari / Remove banners, video ads and pop-ups by default" (Total Adblock). Or laurels and press: AdBlock Pro (Apple-style laurels, "10+ years on App Store"), 1Blocker ("The Best Safari Extensions" laurel and "As seen on" Forbes, NYT, The Verge). Rows 1-5. Undirect's "Popup blocker for Safari" is a category label with no benefit or number.
5. The paid peers state one concrete job in plain words: "Block all the bad things" (Wipr 2), "Add a dark mode to every website" (Noir), "Block annoying 'Open in App' popups" with a before/after wipe (Banish), "Hide popups that block the page" (Banish second shot). Rows 7, 10, 11, 14. Look at `shots/1632848430-s1.jpg`. Banish ($2.99, 263 ratings, 3.8) is the closest in problem: it also targets popups in Safari and charges up front.
6. Subtitles are 3-6 words and name the job or the platform: "Ad Blocker for Web and YouTube", "Better browsing in Safari", "Block ads, trackers, and more", "Hide annoying popups in Safari". Undirect's "Stop Safari redirects & tabs" fits that shape.
7. None of the top five has an app preview video (Undirect has one). Screenshot count: 4-10, Undirect 5.
8. Two high-count rows rely on claims I cannot check from the page: Weblock "Trusted by over 750 000 users" and Poper Blocker "Trusted by over 3 million customers" (Poper has 20 ratings). Treat as marketing, not fact.
9. Two listings use identical art for different apps (AdGuard free and AdGuard Pro share both first screenshots). Reuse is normal here.

## How the two live listings differ from those patterns

Both listings were read the same way (page, Chrome, saved images): `sources/page-6759476314.html`, `sources/page-6810513194.html`.

| | Cutling | Undirect |
|---|---|---|
| Price | $4.99 up front, no IAP, in a field where the 7 most-rated are free | $1.99 up front, no IAP; paid peers are $1.99-$9.99, free apps hold the volume |
| Ratings | none ("hasn't received enough ratings" on the page) | none (same text) |
| Minimum OS | iOS 18.0 | iOS 26.2 (page and lookup API both say so). Every comparable above lists iOS 9 to 18.5, except Phraser at 26.0 |
| Subtitle | "Paste Text Snippets & Replies" | "Stop Safari redirects & tabs" |
| 1st screenshot | "Clipboard keyboard for snippets / Tap once to paste saved text into any app", small type, shows a setup screen ("Keyboard Setup / Test Your Keyboard") | "Popup blocker for Safari", shows a dark Undirect panel listing blocked script pop-up, script-made click, invisible link layer |
| 2nd screenshot | "All you retype, in one place / Addresses, account numbers, emails and more" (snippet grid) | "One press guards a site" (the Safari share-sheet menu) |
| Video | yes: poster frame says "Straight from the keyboard / Works in any app you type in" (`shots/6759476314-video-poster.jpg`) | yes: poster frame says "Your tap hits what you see" (`shots/6810513194-video-poster.jpg`) |
| Media order | 2 video entries, then 5 screenshots (page data) | 1 video entry, then 5 screenshots |
| Chart / rank | none | none |
| Description opening | "Cutling puts your most-used text one tap away." (plain) | "Undirect stops a page taking your click. Pop networks do not wait to be clicked..." (explains the mechanism; no mention of "popup" until later) |
| Last update | 1.6.0, Oct 10 | 1.0.4, Nov 11: "New App Store images. The app itself is unchanged." |

Observations tied to the table:
- Cutling's first screenshot shows setup, not the result. The top rows show the result or a claim. Cutling's own second screenshot (the grid of addresses and bank account) is closer to the job than its first.
- Undirect's first screenshot shows an engineering view (blocked script pop-up, script-made click). Banish and Wipr show what the user sees afterwards. Compare `shots/6810513194-s1.jpg` with `shots/1632848430-s1.jpg`.
- Undirect's images changed on Nov 10-11 (version 1.0.4 date: Nov 10 in the API, Nov 11 on the page). The 58,666-impression week of Nov 9 you gave me may have mostly run on the old images: GUESS, I have no image history.

## What the owner's own numbers say (his figures, not verified)

- Cutling: 158 page views and 3 first-time downloads is 1.9% of page views; 3 of 11,248 impressions is 0.027%. The brief's 0.05% matches 6 / 11,248, not 3. UNSURE which was meant.
- Undirect: 4 / 591 = 0.68% of page views; 591 / 58,666 = 1.0% impression-to-view.
- I have no competitor funnel numbers, so I cannot say whether 1.9% or 0.68% is low: UNSURE.

## Search visibility check (Apple's search API, indicative only)

Position of each app among up to 200 results per term: Cutling #43 of 184 for "clipboard keyboard", #174 of 189 for "snippet keyboard", absent for "text snippets", "copy paste keyboard", "text expander", "paste keyboard", "snippets". Undirect absent for all of "popup blocker", "pop up blocker", "redirect blocker", "safari extension", "ad blocker safari", "block pop-ups safari" (159-177 results each). Files in `sources/search200/`. This API may not reproduce the in-app ranking: UNSURE. But if it does, the impressions both apps get come from somewhere other than those exact terms, which his App Store Connect "source type" (search / browse / referral) report would show and I cannot see.

## Candidate changes these rows point to (all GUESS, to be tested, none verified to lift conversion)

1. Undirect: lower the minimum iOS if the code allows it. Comparable apps reach back to iOS 15-18; at 26.2 the page cannot be installed on older phones, which counts against page-view-to-download. How many of his 591 viewers were on older iOS is not something I can see.
2. Undirect: first screenshot as the user's outcome, in the Banish style (before/after of a redirect being stopped), with a plain claim in 3-8 words. Subtitle already fits the pattern.
3. Cutling: first screenshot as the result (a tap pasting an address into a message) with a short claim; the setup screen can move later. Test a lower price or a free tier with a one-time unlock: every well-rated competitor is free first. Phraser's $0.99 unlock is the cheapest model in the snippet sub-group.
4. Both: no rating exists to show; social proof cannot be copied until ratings exist.

## Not collected

- App preview video content (only the poster frame was read).
- Whether any IAP is a subscription or has a trial.
- Ratings text and reviews of competitors beyond the four pages read in Chrome.
- Third screenshot onward, iPad and Mac media, and the App Store app's real search results (the in-app search needs the App Store app; the web has none).
