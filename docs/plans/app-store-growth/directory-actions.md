# Directory suggested actions (read 2026-11-18)

Read in Chrome from each site's dashboard, edit or manage page, signed in as the owner where the session held. Nothing was posted, saved or submitted. Badges "on site" were checked against `web/_generator` in both repos and the live pages (curl, 2026-11-18). Chrome's extension disconnected partway through MacUpdate. MacUpdate's account page, Uptodown and Product Hunt's Embed panel were not read.

## Biggest gaps

1. **MacNative, Undirect: still "In review".** MacNative says "Free listings publish once the badge is live on your site." Undirect's site has no MacNative badge. Its badge panel stays locked until approval, so copy Cutling's pattern with `slug=undirect` (code below).
2. **MacPip, Cutling: the 24 h X boost is claimed but not finished.** It launched today (Nov 18). The ready post was never made and no post link was pasted. Undirect can't claim the boost while Cutling holds it.
3. **MacPip, Undirect: no launch day yet.** A launch day is free with the badge.
4. **MacPip says Undirect's badge is "Not found yet",** but the badge is in undirect.matsuokengo.com's live HTML. The website saved on the listing may not be the home page. Check the listing's website field, then press Check.
5. **No directory badges in either GitHub README** (both repos are public). The owner asked for badges on GitHub.
6. **AlternativeTo: neither app is live.** `/software/cutling/about/` and `/software/undirect/about/` return 404 and search finds neither. The owner is signed out there.
7. **MacUpdate:** a search finds neither app. Undirect was submitted on 2026-11-10.
8. **The listing-quality fixes MacPip's coach lists** (one line, keywords, categories, "alternative to", FAQ, screenshots) are free and undone on both apps.

## Table

| Site | App | Action offered | Free / paid | Done? | Embed code or exact steps |
|---|---|---|---|---|---|
| MacPip | Cutling | 24 h rocket boost: follow @macpiphq, post the ready text on X, paste the post link | Free, one per launch, +25 Pips | **Not done** (link field empty; claim held) | macpip.com/apps/cutling, owner box. Ready text: "Just launched Cutling on @macpiphq 🚀 the free Mac app directory. Cutling puts your most-used text one tap away. Come say hi: macpip.com/apps/cutling". Post from the owner's X, paste the status URL, press Check |
| MacPip | Undirect | 24 h rocket boost | Free | Not done; blocked while Cutling holds the claim | Same box on macpip.com/apps/undirect |
| MacPip | Undirect | Pick a launch day (home page day with votes) | Free with badge, or Featured | **Not done** | macpip.com/maker → Pick a launch day |
| MacPip | Cutling | Launch day | Free with badge | Done (launched Nov 18) | |
| MacPip | both | Badge | Free (needed for free launch) | Cutling: verified. Undirect: on site, MacPip says not found | `<a href="https://macpip.com/apps/cutling?ref=badge"><img src="https://macpip.com/badge/cutling.svg" height="58" alt="Cutling is listed on MacPip"></a>` (swap `undirect`) |
| MacPip | both | Share links on X, Bluesky, Mastodon, LinkedIn (status page) | Free | Not done | Status page "Copy / X / Bluesky / Mastodon / LinkedIn" |
| MacPip | both | Black Friday deal ("Add my deal"), shows on Deals page | Free | Not done | macpip.com/maker → Free extras → Add my deal |
| MacPip | both | Add where the app is made (flag on card) | Free | Not done | Free extras |
| MacPip | both | Invite 3 Mac makers → free Featured week | Free | 0 of 3 | macpip.com/invite/kenneth-fang |
| MacPip | both | Follow @macpiphq; repost the launch video | Free | Unknown | Free extras |
| MacPip | both | Listing coach (Cutling 6/15, Undirect 3/10+): main word "utility" in one line; add "tool", "tweaks", "menu bar" to copy; up to 2 more categories; "alternative to" apps; 3 more "- " feature lines; FAQ (3 to 5 Qs); 4+ landscape screenshots (have 2); X handle; Undirect "Runs on" Mac facts | Free | Not done | Status page → Listing coach → Fix it |
| MacPip | — | Maker profile: picture and short bio (+30 Pips), first review (+50), votes | Free | Profile 2 of 5 | macpip.com/maker/profile |
| MacPip | — | Maker MCP for listing edits | Free | Not set up | `https://macpip.com/api/mcp/maker` |
| MacPip | — | iPip, sister directory for iPhone and iPad apps (linked in MacPip's footer) | Free (GUESS: not opened) | Not listed | ipip.fyi |
| MacPip | both | Featured $25/7 d, Side Spot from $25/day, Featured relaunch $19.99, Top Spot $100/7 d, App Page spot $25/7 d, Hand review $79 | Paid | Not bought | |
| Mac Browse | both | Badge | Free (keeps link dofollow) | **Done**, both footers | `<a href="https://macbrowse.com"><img src="https://macbrowse.com/badge/listed-light.svg" alt="Listed on Mac Browse" width="220" height="48"></a>` |
| Mac Browse | both | "Featured on Mac Browse" share card: pick a style, download image, Post on X / Share on Reddit / Copy link | Free | Not done | macbrowse.com/dashboard → card per app |
| Mac Browse | both | Listing $12 once (permanent dofollow, ranked above free); Featured $29/mo | Paid | Not bought | |
| Mac App Index | both | Badge | Free | **Done**, verified, both live | `<a href="https://macappindex.com/apps/cutling?ref=badge"><img src="https://macappindex.com/apps/cutling/badge.svg?theme=light&height=56"></a>` (swap `undirect`) |
| Mac App Index | both | Upvote on listing (0 each) | Free | Not done | |
| Mac App Index | both | Paid listing $9.99 (no badge) | Paid | Not needed | |
| MacNative | Undirect | Put MacNative's badge on the site so the free listing publishes | Free | **Not done**, still In review | GUESS from Cutling's live code: `<a href="https://macnative.io/apps/undirect?utm_source=macnative-badge&utm_medium=referral"><img src="https://macnative.io/badge?kind=listed&theme=light&slug=undirect"></a>` in `undirect/web/_generator/generate.py` badges block |
| MacNative | Cutling | Badge | Free | **Done**, live | macnative.io/profile/apps/9469/badge → Get embed code |
| MacNative | both | X handle on listing (credit in posts, makers wall) | Free | **Empty** | profile/apps/<id>/edit → X / Twitter handle |
| MacNative | both | Discount → featured in Deals with a badge | Free | Not done | Edit page, optional discount field |
| MacNative | both | Starting price field | Free | Empty on Cutling | Edit page |
| MacNative | both | Featured badge | Editorial only | n/a | Contact page |
| MacNative | both | Launch Boost $15 once; SEO article add-on | Paid | Not bought | profile/apps/<id>/upgrade |
| MacBase | both | Badge → check mark plus dofollow link; "Check my site" | Free | **Done** (on both sites; ASG10 says verified) | `featured-on-macbase.svg` linking `macbase.app/apps/<slug>?ref=badge` |
| MacBase | both | Featured $20/week, $59/month, $149/3 months | Paid | Not bought | Booked by email |
| MacBase | both | Dashboard suggestions | — | **Not read**: owner is signed out of MacBase | Owner signs in at macbase.app/login |
| NativeShelf | both | Badge | Free | **Done**, "Badge verified" on both | `<a href="https://nativeshelf.com/cutling?ref=badge" target="_blank" title="Featured on NativeShelf.com"><img src="https://nativeshelf.com/badge/dark.png?v=6" alt="Featured on NativeShelf.com" width="232" height="68" /></a>` (sites link to nativeshelf.com home instead of the app page) |
| NativeShelf | both | Premium €9 once; Sponsor €29/€19 per week; Launch Week €29; Launch Kit €29 | Paid | Not bought | Dashboard → Manage |
| Indie App Catalog | both | No badge, boost or share offer on the listings or About page | — | Live: /app/5527 (Cutling), /app/5526 (Undirect) | Owner signed out; no dashboard read |
| getindieapps | both | "Share" buttons on listing | Free | Unknown | getindieapps.com/app/cutling-clipboard-keyboard, /app/undirect-popup-blocker |
| getindieapps | both | Featured $49 / 30 days | Paid | Not bought | Manage link from submit email; dashboard needs an email sign-in link (owner) |
| AlternativeTo | both | Badge (any listed app) | Free | Not possible: neither app is live (404) | alternativeto.net/badges once listed |
| Product Hunt | Undirect | Launched Nov 17. Admin bar offers Embed (badge), Dashboard, Share, forum thread; ads from $250 | Badge free; ads paid | No PH badge on either site or README | producthunt.com/products/undirect → Embed (not read, Chrome dropped) |
| Product Hunt | Cutling | Scheduled Nov 24, 12:01 AM PST. Prompt: "Start conversations in your product forum to engage early users"; ads from $250 | Free / paid | Forum thread not started | producthunt.com/products/cutling → Start new thread |
| MacUpdate | both | Not found by search | — | Undirect submitted Nov 10, not visible | Account page not read |
| Uptodown | both | Not listed (handoff: needs upload or authorship claim) | — | Not started | |
| GitHub | both | Directory badges in README.md (repos are public) | Free | **Not done** in either README | Reuse the footer badge HTML |

## Notes for whoever builds the badge changes

- Cutling repeats the badge block in each template (`Cutling/web/_generator/templates/*/index.html`), while Undirect builds it in one place (`undirect/web/_generator/generate.py:268`). To add a badge to Cutling, move the block into one shared place first.
- MacPip's "Paste your post link" and Mac Browse's "Post on X" both need the owner's X account.

## Outcome, 2026-11-18 (session asg-directories-2)

Every row above marked Not done, read back on each site after the change.

| Row | Now |
|---|---|
| MacPip, Undirect launch day | **Booked free for Tue Dec 8.** The site said "Your launch day is booked. We found your badge, so the day is yours." The badge was missed before because the listing's App link was the App Store page; it is now `https://undirect.matsuokengo.com/`, while Buy and Mac App Store buttons still go to the App Store with ct=macpip (same as Cutling). |
| MacPip, listing coach | **Undirect 4 → 12 of 15, Cutling 6 → 13 of 15.** One line with "utility", copy rewritten with "- " feature lines, 2 more categories (Undirect: Browsers, Security and Privacy; Cutling: Clipboard and Text, Menu Bar), alternatives (Undirect: Poper Blocker, wBlock, Wipr; Cutling: Paste, Maccy, PastePal, TextExpander), 4-question FAQ, 5 landscape screenshots each (Undirect's old black ones replaced by the red set), made in Indonesia, works offline, open source with the GitHub repo, all store languages, Apple silicon and Intel (both Release builds are arm64 + x86_64). Left: X handle (owner) and a deal (owner refused discounts). Undirect's badge tick waits on MacPip's daily check. |
| MacPip, where made | Done on both: Indonesia. |
| MacPip, Black Friday deal | Skipped: the owner refused discounts. Same for MacNative's discount field. |
| MacPip, 24 h X boost (both), share links, follow @macpiphq | Held, with the MacBase and Mac Browse X posts, until the owner makes a public X account (recommended @monholt, free on 2026-11-18, matches monholt.com); then it goes in the X-handle fields on MacPip, iPip and MacNative. His X account (@mctsuokengo) is protected, so MacPip cannot see a post from it until it is public. |
| MacPip, invite 3 makers, maker picture and bio | Need the owner: whom to invite, and his own picture and words. |
| MacPip, maker MCP | Not needed; the listings were edited in the browser. |
| iPip | **Both listed, free launch Sat Nov 21** ("Cutling is in." / "Undirect is in."). Needed the iPip badge on each site (added: Cutling 447caa06, Undirect fbeea16, both deployed and found by iPip) and 3 votes for that day's makers. |
| MacNative, starting price | Done: Cutling 4.99, Undirect 1.99 ("Your changes have been saved."). |
| MacNative, X handle | Waits on the owner (see MacPip). |
| MacNative, Undirect badge | Blocked: still "In review"; the badge page says "This unlocks once your app is approved." `macnative.io/badge?slug=undirect` returns 404, so a copied badge would show broken. |
| MacBase, dashboard | Read signed in: free offers are the share posts (drafted) and the banner; Featured is paid. |
| Mac Browse, share card | Drafted for the owner. |
| Mac App Index, upvote | Skipped: it would be the maker voting for his own app. |
| Product Hunt, Cutling forum thread | **Posted** on the owner's word ("up to you"): producthunt.com/p/cutling/which-snippet-would-you-save-first. First titled "What do you type over and over?", renamed because Textfold's forum already has a thread with that title and question. |
| MacUpdate | Account showed no vendor apps, no association request and no submission mail (only sign-up and verify mails, Nov 10 and 11); Cutling had never been submitted. **Both submitted** ("Your app has been submitted! We'll review your application and get back to you by email within 10 days."). Undirect's first press returned "Api server error"; the second went through, so a duplicate is possible if the first was stored. |
| Uptodown | Not started: Uptodown lists from an uploaded installer or a page to claim, and these App Store apps have neither. |

## Follow-ups, 2026-11-18 (session asg-directories-3)

| Row | Now |
|---|---|
| MacPip, Cutling 24 h boost | **Started.** The post had been found but the boost never began: the box said "One step left." After ticking "I follow @macpiphq" and pressing "Done, start my boost": "Thanks! It is up now. Cutling has 24 hours in Shared on X today." The last press is what starts a boost, on MacPip and iPip alike. |
| iPip, both | @monholtco follows @ipiphq; "I follow @ipiphq" ticked on both status pages. "Check my site" on both: "We found your iPip badge." Launch day Sat Nov 21 opens 00:00 UTC (07:00 WIB); each boost post goes out that morning. |
| MacPip, Undirect | Approved, launch Tue Dec 8, 7:00 WIB. Boost post goes out that morning; posting earlier would spend the 24 h before the launch. |
| MacNative, Undirect badge | Still "In review"; "This unlocks once your app is approved." |
| MacBase and Mac Browse share posts | Texts come from each dashboard. Mac Browse's own text says "is featured on Mac Browse", which is the paid tier's word, so the posts say "is now live on Mac Browse" instead. One post a day from @monholtco, from Nov 19. |
