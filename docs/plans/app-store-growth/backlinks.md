# Backlinks and listings for Undirect and Cutling (card ASG46a, 2026-11-20)

Every third-party page that the niche's Google results and AI Overviews cite, or that ranks for the niche queries, and where either app can be listed or mentioned. Each row was checked on 2026-11-20 and written here as it landed. **Nothing on this page has been posted, sent or submitted.** Every text below waits for the owner's yes, item by item.

Sources: queries and citations from `docs/research/seo-research-niche.md` (Google in the owner's Chrome, Claude's WebSearch); places already worked from `directory-actions.md`, `inbox-actions.md`, `BOARD.md` (ASG1, ASG9, ASG10, ASG21, ASG33, ASG37, ASG48, ASG51) and `social-posts.md`. Facts in the ready texts come from the live sites (`undirect.matsuokengo.com/llms.txt`, `cutling.matsuokengo.com/llms.txt`, read 2026-11-20), `listing-copy.md` and the iTunes lookup API (Undirect 1.0.4 $1.99, Cutling 1.6.2 $4.99, both with 0 ratings, read 2026-11-20).

## How the ranking is counted

"Score" = the number of the 15 research queries (7 Undirect, 8 Cutling) in whose Google organic results, Google AI Overview citations or WebSearch results the page or site appears, counted by `scratchpad/count.py` over the research file plus the AI Overview citations named in words there (for example "Cites the AC threads, Reddit, wikiHow"). A page that appears in an AI Overview counts once more than one that only ranks, because AI Overviews are what the ASG46 goal is about. Places that never appear in the research file but rank for close queries ("Paste alternatives", "1Blocker alternatives", "best clipboard manager for Mac and iPhone", "best Safari extensions to block pop-ups", "TextExpander alternative for iPhone", WebSearch 2026-11-20) get a score of 0 and sort after the rest.

Domain counts from the research file (organic + AI Overview + WebSearch rows): apps.apple.com 12, reddit.com 12 organic plus 4 AI Overviews, discussions.apple.com 9, support.apple.com 6, wikihow.com 3 organic plus 3 AI Overviews, clipbook.app 5, quora.com 3 organic plus 2 AI Overviews, facebook.com 4, youtube.com 4 organic plus 6 AI Overviews, 1blocker.com 4, adguard.com 4, pasteapp.io 4, onetapapp.co 3, bytesizeapps.net 3, typefire.app 2, medium.com 2, growthacademy.com.br 1 plus 1 AI Overview, macnative.io 1, producthunt.com 1, peerpush.com 1, idownloadblog.com 1, appleinsider.com 1 plus 1 AI Overview, sixcolors.com 1, mwm.ai 1.

## What blocks some places outright

- **Reddit cannot be read in this session**: reddit.com is refused by Claude in Chrome ("This site is not allowed due to safety restrictions") and answers 403 to curl; Redlib mirrors sit behind an Anubis bot wall, which was not bypassed. Thread data below comes from the pullpush.io archive API (post and comment text, dates, authors). **Each subreddit's own rules on self-promotion were not read**, so the owner reads the sidebar of r/Safari, r/ios, r/iphone and r/macapps before any reply goes up. What was read: two other app makers already reply in these threads naming their own apps (TabGuard in r/Safari 1gscdvx on 2025-12-22; Fast Reply's maker in r/ios 1ig035s on 2026-09-06), and r/macapps' moderator says on the MacPowerUsers forum that they remove "hundreds, sometimes thousands" of promotional posts a month (talk.macpowerusers.com/t/advertising-software-in-the-mpu-forum/44348).
- **Old Reddit threads are still open**: comments were added in 2026 to 1gscdvx (last 2026-09-22), 1ipczla (2026-09-21), 1gase0g (2026-09-03), 1ig035s (2026-09-06) and 1nlrm2i (2026-08-05), so a reply is possible on those.

(more sections follow as they land)
- **Apple Community does not allow it**: the Apple Support Communities Use Agreement (discussions.apple.com/terms, read through search 2026-11-20) bars using the site "to sell or market products or services" and allows a URL only when it directly answers the question. A maker recommending his own paid app falls under that, so none of the 9 Apple Community appearances gets a reply. Apple Support 102524 is Apple's own page and cannot be changed.
- **Pages that were not readable**: slant.co answered Cloudflare 526 (site down); wikiHow, clipboardai.app, bytesizeapps.net, clipbook.app and macmenubar.com refused WebFetch. MacNative's edit page showed signed out, so whether it has an "alternative to" field is unknown.

## Ranked list

Score as defined above. "Followed" = the link from the page to the app's site carries no nofollow/ugc (read from the live page where marked).

| # | Place | Score | App there now? | How a listing is made | Cost | Followed link? | Status |
|---|---|---|---|---|---|---|---|
| 1 | Reddit r/Safari 1f5lvnw "Safari-Extension to block redirects?" (2024-08-31) | 4 (organic #1 on 2 queries, AI Overview on 2) | No (13 comments name AdGuard, uBlock in Firefox, Roadblock) | Reply from the owner's Reddit account | Free | Reddit links are nofollow (GUESS, not read) | Text A ready |
| 2 | Reddit r/Safari 1gscdvx "Anyway to stop Safari IOS ad redirects?" (2024-11-16, last comment 2026-09-22) | 2 (organic #1, AI Overview) | No (TabGuard's maker replied 2025-12-22) | Reply | Free | GUESS nofollow | Text B ready |
| 3 | wikiHow "Block Page Redirects" | 6 (3 organic, 3 AI Overviews) | No | Edit the article | Free | n/a | Not worth it: policy page refused fetch; wikiHow removes product promotion (GUESS from its edit policy, unread). No text. |
| 4 | Quora "How do I stop websites from opening new tabs in Safari" (quora.com/How-do-I-stop-websites-from-opening-new-tabs-in-Safari) | 5 (3 organic, 2 AI Overviews) | No (top answer is Quora's bot, 33 related) | Answer from the owner's Quora account (signed out now) with the affiliation stated | Free | GUESS nofollow | Text C ready |
| 5 | Reddit r/macapps 1hw45qq "What is the best clipboard manager app for Mac, and why?" (2025-01-07, 68 comments, last 2025-12-01) | 2 (organic #2, AI Overview) | No (Paste 30, Raycast 15, Maccy 8, PastePal 6 mentions) | Reply; r/macapps rules unread and heavily moderated | Free | GUESS nofollow | Text D ready |
| 6 | Facebook "fb-answers" pages: best-safari-pop-up-blocker-extension, safari-redirect-blocker-recommendations, how-to-stop-site-redirects-on-iphone | 4 organic | No. Page reads "Summarized by Meta AI" from public posts in groups (Mac Computer Users Group, Apple Macintosh Enthusiasts) and Pages | No submission. Only a public post on the owner's Facebook Page, or in a public group whose rules allow it, can be summarised into it | Free | n/a | Text E ready (Page post) |
| 7 | App Store featuring nomination (App Store Connect → app → Featuring → Nominations; App Store stories such as apps.apple.com/us/mac/story/id1655204803 are cited by the "clipboard manager mac" AI Overview) | 1 AI Overview + App Store listings in 12 result sets | Neither nominated | Nomination form in App Store Connect, type App Launch, App Enhancements or New Content, tied to an upcoming release (Apple's App Store Connect Help, "Nominate your app for featuring") | Free | n/a | Text F ready, for Cutling's next release (1,000 text / 100 image caps, ASG43) and Undirect's next version |
| 8 | Reddit r/ios 1gase0g "How to stop safari from opening tabs?" (2024-10-24, 70 comments, last 2026-09-03) | 1 (organic #2) | No. A commenter describes exactly Undirect's case: a layer over the video player so a tap opens an ad | Reply | Free | GUESS nofollow | Text G ready |
| 9 | Reddit r/Safari 1nlrm2i "Ad blocker and redirect blocker for iPhone safari" (2025-09-20, last 2026-08-05) | 1 (organic #1) | No (Wipr 2, wBlock, uBlock Lite, AdBlock Pro named) | Reply | Free | GUESS nofollow | Text H ready |
| 10 | Reddit r/ios 1ig035s "TextExpander no longer working on iOS: what are the best options?" (2025-02-02, last 2026-09-06) | 1 (organic #4) | No. Thread worries about keyboards logging keystrokes; Fast Reply's maker replied 2026-09-06 | Reply | Free | GUESS nofollow | Text I ready |
| 11 | Reddit r/macapps 1cyce28 "Check Out PastePal! Best Clipboard at One Time Payment!" (2024-05-22, 67 comments) | 1 (organic #2 for the pay-once Paste alternative query) | No | Reply | Free | GUESS nofollow | Text J ready |
| 12 | Reddit r/iphone 1ipczla "[TIPS] Prevent ad pop-ups on Safari" (2025-02-14, last 2026-09-21) | 1 (organic #2) | No | Reply | Free | GUESS nofollow | Text G works here too |
| 13 | macnative.io/alternatives/paste | 1 (organic #3) | No. Lists Maccy, PastePal, CleanClip, Pastebot, Klipto, Deck, Copse, Just Copy, OrbitPaste, Raycast; small MacNative-listed apps are on it, so it draws from listings | Cutling is listed on MacNative; how alternatives pages are compiled is not stated in macnative.io/guidelines. Ask through macnative.io/contact | Free | Unknown | Text K ready. Undirect cannot: its MacNative listing was rejected (ASG37) |
| 14 | producthunt.com/products/paste/alternatives | 1 (organic #2) | No. Editorial top 5 (Maccy, Pasta, CleanClip, CopyCat, Unclutter) plus products filtered by tags "clipboard history" (22), "menu bar apps" (34), "mac" (50) | Cutling's launch (Nov 24) carries only "Productivity" and "Custom Keyboards"; adding a clipboard or menu bar tag in Edit Launch would put it in the filtered list (GUESS from the tag filter) | Free | ugc (read on Undirect's PH page: `rel="noreferrer noopener ugc"`) | Edit waits for the owner's yes; no text needed |
| 15 | Product Hunt forum producthunt.com/p/paste/best-clipboard-manager-for-mac (27 upvotes, 36 replies, 804 views) | 0 (linked from #14) | No | Reply from the owner's PH account | Free | ugc | Text L ready |
| 16 | peerpush.com/alternatives/paste "7 Paste Alternatives (2026)" | 1 (organic #8) | No. Lists Pluks, Pouch, Yank, NanoClip, Pastery, WinV, ClipBear, all PeerPush listings | Submit URL at peerpush.com/submit; free tier "waits in the launch queue" and is invisible until its slot; paid plans go live at once (BF code BF2026, 30% off until Nov 28) | Free (queue) or paid | Yes on Yank's page (`rel="noopener"`, plan unknown) | Text M ready; both apps |
| 17 | growthacademy.com.br "Top 10 clipboard managers Mac 2026" | 2 (organic #6, AI Overview) | No (Maccy, Paste, Raycast, Spotlight, PastePal, Alfred, Pastebot, CopyQ, Clipy, Flycut) | No author, no contact; only a blog comment form | Free | Unknown | Text N ready (comment) |
| 18 | AlternativeTo (alternativeto.net/software/cutling/about/, /undirect/about/) | 0 in research; owns every WebSearch result for "Paste alternatives" and "1Blocker alternatives" | Both live. Cutling is added as alternative to Maccy, Paste, TextExpander, espanso and 80 more; Undirect to Popup Blocker (strict), Poper Blocker, uBlock Origin, Wipr and 28 more. But neither shows on the iPhone lists of Paste (12 apps), Maccy (12) or 1Blocker: those sort by likes and both have 0 | Done; rises with likes and reviews from users | Free | nofollow (read on Cutling's page) | Nothing to submit. Pending edit (ASG40) still locks Cutling's listing |
| 19 | GitHub awesome-mac (jaywcjlove, 118,932 stars, PRs merged daily, read 2026-11-20) | 0 | No. Clipboard Tools lists Paste, Pastebot, Maccy and 30 more, paid App Store apps included; System Related Tools has AdBlock One for Safari | Pull request: one per app, alphabetical, one sentence, and the same line in README.md, README-zh.md, README-ja.md and README-ko.md (docs/CONTRIBUTING.md) | Free | GitHub README links are nofollow (GUESS) but the list is widely copied and read by AI crawlers | Texts O1, O2 ready |
| 20 | GitHub open-source-ios-apps (dkhamsing, 53,376 stars, entries added Nov 2026) | 0 | No. Categories safari-extension and content-blocking exist (wBlock added Aug 2026); keyboards sit under productivity | Pull request editing contents.json | Free | GUESS nofollow | Texts P1, P2 ready |
| 21 | GitHub open-source-mac-os-apps (serhii-londar, 51,467 stars) | 0 | No. Categories extensions, browser, keyboard, menubar, productivity; AdGuard for Safari is in extensions | Pull request editing applications.json, one per app | Free | GUESS nofollow | Texts Q1, Q2 ready |
| 22 | SaaSHub (saashub.com/paste-app-alternatives) | 0 in research; ranks for "alternatives" queries | No | Account, then saashub.com/services/submit with categories and competitors; verification needs an email on the product's domain. The page asks AI agents to have the human submit | Free | nofollow (read on Maccy's page) | Text M fields reused |
| 23 | MacMenuBar.com (Cutling only) | 0 | No (search for "cutling": nothing) | Form at macmenubar.com/submit-your-menu-bar-app/; checked by hand; needs at least 3 screenshots showing the app in the real macOS menu bar | No fee named on the page | Unknown | Needs the owner to take 3 menu bar screenshots; text M reused |
| 24 | switchingtomac.com "7 Best Clipboard Managers for Mac in 2026" (Nov 7, 2026, staff, edited by Aseem Kishore) | 0 | No. Says Paste is the only one with official iPhone and iPad apps | Contact form at switchingtomac.com/about/#contact-us | Free | Unknown | Text R ready |
| 25 | igeeksblog.com "20 Best Safari Extensions for iPhone and iPad" (updated Jun 8, 2026, Ravi Teja KNTS) | 0 | No; names no pop-up or redirect blocker | Email info@igeeksblog.com (from the page's structured data) | Free | Unknown | Text S ready |
| 26 | YouTube Shorts (4 organic, 6 AI Overview citations, mostly how-to Shorts) | 4+6 | Cutling's Shorts exist; no Undirect Short answers "how do I stop Safari redirecting me on iPhone" | The owner's own channel; a Short titled with the question, made from the existing Undirect film | Free | n/a | Not a backlink; listed because AI Overviews cite Shorts on 3 Undirect queries. Film work belongs to a video session |
| 27 | mwm.ai | 1 (WebSearch) | Cutling has an auto page (mwm.ai/apps/cutling-clipboard-keyboard/6759476314); Undirect not found at the guessed slug (410) | Built from App Store data; no submission | n/a | n/a | Nothing to do |
| 28 | Rival vendor pages: clipbook.app (5), pasteapp.io (4), 1blocker.com (4), adguard.com (4), onetapapp.co (3), bytesizeapps.net/WordBoard (3), typefire.app (2), saneclip.com, mausformac.com, octoclip.app, clipboardai.app, fastreplyapp.com, magiclasso.co | as shown | No | Each is a competitor's own "alternatives" or "best of" page | — | — | Skipped: a competitor will not list a rival, and several were unreadable to fetch. Their weight is better answered by Undirect's and Cutling's own compare pages (ASG50a, ASG50b) |
| 29 | idownloadblog.com/2026/09/24/paste-snippets-app/ | 1 | No | The article promotes iDownloadBlog's own keyboard ("we have built") | — | — | Skipped: publisher's own rival app |
| 30 | MacRumors 2022 "Four iOS Safari Extensions to Make the Web Less Annoying", sixcolors.com (RedirectWeb review), 9to5mac, AppleInsider | 0 to 2 | No | News tips; low odds for a $1.99 extension with no reviews yet | Free | — | Not drafted; worth a pitch only after the apps have ratings |
| 31 | learn-anything/safari-extensions (398 stars, last push 2022-06-30) | 0 | No | PR | Free | — | Skipped: unmaintained |

## Ready texts

All in the owner's first person, each naming him as the maker. Facts from the live llms.txt files and listing-copy.md. Links without campaign parameters on Reddit and Quora, since those communities read long tracking links as ads.

**A. r/Safari 1f5lvnw (reply to the post)**

> I make a Safari extension for this, so take it with that in mind: Undirect. Several replies here say AdGuard cleans up the ads but a tap on a sketchy streaming site still opens a new tab or sends the page elsewhere. That part is what Undirect handles. It doesn't block ads. It removes the invisible layer some pages lay over the player, puts back a link that gets rewritten while you're pressing it, and stops new tabs and pop-unders you didn't ask for. Every address the page tried shows up in its toolbar popup, and you can block or allow each one for that site or everywhere. It stays off on a site until you press its button there, and it runs fine next to AdGuard.
>
> $1.99 once for iPhone, iPad and Mac (needs iOS 26.2 or macOS 15), no account, and the code is on GitHub. There's a page of made-up misbehaving sites to try it on first: undirect.matsuokengo.com/demo/

**B. r/Safari 1gscdvx**

> Maker of a Safari extension here, so I'm biased. Block Pop-ups only stops windows a script opens. Most of the redirects people describe come from a transparent layer over the page that catches your tap, or a link that changes between press and release, and Safari has no switch for those. Undirect (undirect.matsuokengo.com) clears the layer, puts the real link back and stops tabs you didn't open, then lists every address the page tried so you can block it for that site or everywhere. You turn it on per site with its toolbar button. $1.99 once, iPhone, iPad and Mac, iOS 26.2 or later.

**C. Quora answer**

> Safari's Block Pop-ups setting (Settings, Apps, Safari on iPhone; Settings, Websites, Pop-up Windows on a Mac) stops windows that a script opens on its own. It doesn't stop the other common trick: a page puts an invisible layer over itself, so your tap on a video or a button lands on an ad link and opens a new tab, or sends the page you were reading somewhere else.
>
> I make a Safari extension for that second case, Undirect. You press its toolbar button on the site that misbehaves, and from then on it removes the layer, puts back links rewritten mid-tap, and stops tabs and pop-unders you didn't ask for. Its popup lists every address the page tried, and each can be blocked on that site or everywhere. It is not an ad blocker, so it sits fine next to one. It costs $1.99 once for iPhone, iPad and Mac. https://undirect.matsuokengo.com/

**D. r/macapps 1hw45qq**

> Disclosure: I make Cutling, so weigh this accordingly. On the Mac it lives in the menu bar and ⌘⇧V opens a picker where your pointer is, with your saved snippets and what you copied earlier; it pastes straight into the app you were in. The history skips anything a password manager marks as concealed, so copied passwords don't land in it. The part Paste-style managers usually don't do: the same snippets show up on a keyboard on iPhone and iPad through your own iCloud, so your address or bank details are one tap away in any app there too. $4.99 once covers Mac, iPhone and iPad, no subscription, GPL-3.0 on GitHub. Limits: 100 text snippets and 25 images. cutling.matsuokengo.com

**E. Facebook Page post (owner's Page)**

> Safari's Block Pop-ups is on and pages still open ad tabs? That setting only stops windows a script opens. Many sites put an invisible layer over the page, so your tap opens an ad or a redirect instead of what you aimed at. Undirect is a Safari extension for iPhone, iPad and Mac that removes that layer, puts back links rewritten mid-tap and stops tabs you didn't ask for, then shows every address the page tried. $1.99 once. undirect.matsuokengo.com

**F. App Store featuring nomination (App Enhancements)**

> Cutling: Cutling is a keyboard for iPhone and iPad and a menu bar app for Mac that keeps the text people retype, such as an address, bank details or a reply, and puts it into any app with one tap or ⌘⇧V. This update raises the limits to 1,000 text and 100 image cutlings. One purchase covers all three platforms, with no account, no ads and Data Not Collected; the site and listing are in 60 languages.
>
> Undirect: Undirect is a Safari extension for iPhone, iPad and Mac for the redirects Block Pop-ups doesn't catch: invisible layers that steal a tap, links rewritten between press and release, and pop-under tabs. It lists every address a page tried and turns blocked ones into Safari content-blocking rules, so the request never leaves the device. No account, no analytics, no server; 50 languages.

(Fill the "what's new" part from the real release notes on the day; Undirect's needs its next version's change.)

**G. r/ios 1gase0g and r/iphone 1ipczla**

> The comment above about a layer on top of the video player is the cause: you tap play and you're really tapping an ad link, so Safari opens it as a normal tab and Block Pop-ups lets it through. I make a Safari extension that removes those layers, Undirect, so I'm not neutral. You switch it on for the site with its toolbar button; after that taps go to the player, tabs you didn't open are stopped, and the popup lists every address the page tried. It isn't an ad blocker and runs next to AdGuard. $1.99 once for iPhone, iPad and Mac, iOS 26.2 or later. undirect.matsuokengo.com

**H. r/Safari 1nlrm2i**

> Wipr 2 or wBlock for the ads, as people say. For the redirect half, I make Undirect (biased, obviously). It doesn't block ads; it stops the tap-hijacking: invisible layers over the page, links rewritten mid-tap, and new tabs you never opened. Each address a page tried shows in its popup to block for that site or everywhere. $1.99 once, iPhone, iPad and Mac. undirect.matsuokengo.com

**I. r/ios 1ig035s**

> I make a snippet keyboard, Cutling, so I'm biased, but it answers the keylogging worry in this thread differently: it doesn't watch what you type for abbreviations. You switch to its keyboard and tap the saved text, or start typing a snippet's name to find it. Full Access is only there so the keyboard can read your saved snippets; it has no network access and sends nothing, and the App Store label is Data Not Collected. Your iOS text replacements can be imported. $4.99 once, includes the Mac app. cutling.matsuokengo.com

**J. r/macapps 1cyce28**

> Another pay-once one, and I'm its maker: Cutling, $4.99 once for Mac, iPhone and iPad together. It is snippet-first more than history-first: you save your address, bank details or replies, then paste them with ⌘⇧V on the Mac or tap them from a keyboard on iPhone. The Mac side also keeps a copy history that skips password-manager items. Syncs through your own iCloud if you turn it on. cutling.matsuokengo.com

**K. Email to MacNative (via macnative.io/contact)**

> Subject: Cutling for the Paste alternatives page
>
> Hi, Cutling is listed on MacNative (macnative.io/apps/cutling). Your Paste alternatives page answers "Which Paste alternative syncs with iPhone and iPad?", and Cutling may fit there: it is $4.99 once, the Mac app is a menu bar picker on ⌘⇧V with a copy history that skips password-manager items, and the same snippets appear on a keyboard on iPhone and iPad through the user's iCloud. Is the page built from listings, and is there anything I should add to Cutling's listing for it to be considered?
>
> Kenneth Fang

**L. Product Hunt thread "Best Clipboard Manager for Mac?"**

> I make Cutling, so add salt. It's snippet-first: your address, bank details and replies on ⌘⇧V on the Mac, plus a copy history that skips password-manager items, and the same snippets on a keyboard on iPhone and iPad. $4.99 once for all three. It's launching here on Nov 24 if you want to see it.

**M. PeerPush / SaaSHub fields**

Name, tagline, short text, description, categories and price as in `listing-copy.md`. Competitors field: Cutling: Paste, Maccy, PastePal, TextExpander, WordBoard. Undirect: 1Blocker, AdGuard, Wipr, Tab Blocker, TabGuard, Poper Blocker.

**N. growthacademy comment**

> One more for readers who want iPhone too: Cutling ($4.99 once) keeps snippets in the Mac menu bar on ⌘⇧V and on a keyboard on iPhone and iPad, synced through iCloud, with a copy history that skips password-manager items. I'm its developer. cutling.matsuokengo.com

**O1. awesome-mac PR "Add Cutling to Clipboard Tools"** (insert after Cue; same line translated in the zh, ja, ko READMEs)

```
* [Cutling](https://cutling.matsuokengo.com/) - Snippet and clipboard history app in the menu bar that skips concealed password items and syncs snippets to its iPhone keyboard. [![Open-Source Software][OSS Icon]](https://github.com/kengomatsuo/Cutling) ![Native App][Native Icon] [![App Store][app-store Icon]](https://apps.apple.com/app/id6759476314?platform=mac)
```

**O2. awesome-mac PR "Add Undirect to System Related Tools"** (next to AdBlock One, alphabetical)

```
* [Undirect](https://undirect.matsuokengo.com/) - Safari extension that stops invisible click layers, rewritten links and pop-under tabs, and lists every address a page tried. [![Open-Source Software][OSS Icon]](https://github.com/kengomatsuo/undirect) ![Native App][Native Icon] [![App Store][app-store Icon]](https://apps.apple.com/app/id6810513194?platform=mac)
```

PR body for both: "Adds <app> (<one sentence above>). Native Swift, GPL-3.0, paid on the App Store; I'm the developer."

**P1/P2. open-source-ios-apps contents.json**

```json
{"title": "Cutling", "category-ids": ["productivity"], "description": "Keyboard and Mac menu bar app for saved text and images", "source": "https://github.com/kengomatsuo/Cutling", "itunes": "https://apps.apple.com/app/id6759476314", "screenshots": ["https://cutling.matsuokengo.com/img/en-us/keyboard.webp"], "date_added": "<day of PR>", "suggested_by": "@kengomatsuo", "license": "gpl-3.0", "lang": "swift"}
{"title": "Undirect", "category-ids": ["safari-extension"], "description": "Safari extension that stops redirects, pop-unders and invisible click layers", "source": "https://github.com/kengomatsuo/undirect", "itunes": "https://apps.apple.com/app/id6810513194", "screenshots": ["https://undirect.matsuokengo.com/img/iphone-popup.webp"], "date_added": "<day of PR>", "suggested_by": "@kengomatsuo", "license": "gpl-3.0", "lang": "swift"}
```

**Q1/Q2. open-source-mac-os-apps applications.json**

```json
{"title": "Cutling", "short_description": "Menu bar snippets and clipboard history that skips concealed password items, synced with an iPhone keyboard.", "categories": ["productivity", "menubar"], "repo_url": "https://github.com/kengomatsuo/Cutling", "icon_url": "https://raw.githubusercontent.com/kengomatsuo/Cutling/main/CutlingAction/Media.xcassets/AppIcon.appiconset/AppIcon.png", "screenshots": ["https://cutling.matsuokengo.com/img/en-us/mac-picker.webp", "https://cutling.matsuokengo.com/img/en-us/mac-history.webp"], "official_site": "https://cutling.matsuokengo.com/", "languages": ["swift"]}
{"title": "Undirect", "short_description": "Safari extension that stops invisible click layers, rewritten links and pop-under tabs.", "categories": ["extensions", "security"], "repo_url": "https://github.com/kengomatsuo/undirect", "icon_url": "https://raw.githubusercontent.com/kengomatsuo/undirect/main/Extension/Resources/images/icon-512.png", "screenshots": ["https://undirect.matsuokengo.com/img/mac-app.webp"], "official_site": "https://undirect.matsuokengo.com/", "languages": ["swift", "javascript"]}
```

**R. switchingtomac contact form**

> Your Nov 7 clipboard managers piece says Paste is the only one with official iPhone and iPad apps. Cutling also has one, as a keyboard: snippets saved on the Mac (menu bar, ⌘⇧V, with a copy history that skips password-manager items) appear on iPhone and iPad through the user's iCloud. It's $4.99 once for all three. I'm the developer; happy to send a promo code if you want to try it. cutling.matsuokengo.com

**S. Email to info@igeeksblog.com**

> Subject: A Safari extension for redirects, for your Safari extensions list
>
> Hi Ravi, your list of Safari extensions for iPhone has ad blockers but nothing for redirects, which is what most readers mean by "Safari keeps opening ad pages". Undirect handles that: it removes invisible layers that catch a tap, puts back links rewritten between press and release, and stops pop-under tabs, then lists every address the page tried. It's $1.99 once for iPhone, iPad and Mac, open source, and there's a demo page of misbehaving sites at undirect.matsuokengo.com/demo/. I'm the developer and can send a code.
>
> Kenneth Fang

## What the owner gives

- Reddit (A, B, D, G, H, I, J): a Reddit account, the sidebar rules read for each subreddit, and a yes per reply. Two rival makers already reply this way in the same threads.
- Quora (C), Product Hunt thread (L), growthacademy comment (N): his yes; Quora needs sign-in.
- Facebook Page post (E): his yes, from Meta Business Suite.
- Featuring nominations (F): his yes and the next release's real notes; Account Holder, Admin, App Manager or Marketing role.
- PeerPush, SaaSHub: accounts made on his yes; SaaSHub asks the human to submit.
- GitHub PRs (O, P, Q): his yes; they go from the kengomatsuo account.
- MacMenuBar: three screenshots of Cutling in the real menu bar.
- Emails and forms (K, R, S): his yes.
