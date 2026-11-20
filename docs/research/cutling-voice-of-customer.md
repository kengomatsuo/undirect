# Cutling: voice of the customer

Card ASG46. What real people say about pasting saved text (address, bank details, signatures, canned replies) on iPhone and iPad, snippet keyboards, text expanders, and Mac clipboard managers that sync with iPhone. Collected 2026-11-20 so Cutling's site, llms.txt and AI-facing files speak in buyers' own words.

Cutling facts used for the "Cutling solves it" column, read from `~/Repositories/Cutling/web/_generator/ai_facts.py`, `translations/en-US.json` and `generate.py` on 2026-11-20: iPhone/iPad custom keyboard (needs Full Access; FAQ says it does not log keystrokes, access the internet or transmit data); paid once, no subscription, no IAP; Mac menu bar app with ⌘⇧V picker, clipboard history that skips concealed (password-manager) items, optional direct paste (off by default, needs Accessibility); iCloud (CloudKit) sync; text and image cutlings; caps of 100 text cutlings and 25 image cutlings, 1,000 characters each (`LIVE_CAPS` in generate.py); keyboard suggests email cutlings in email fields and can pull in iOS text replacements; formatting (bold, italics, links) kept; expiry dates; Recently Deleted for 30 days; no account; Data Not Collected.

## How sources were reached

- App Store reviews: the RSS feed (`itunes.apple.com/us/rss/customerreviews/...`) returned entries only for PastePal (50); every other app returned an empty feed on 2026-11-20. Reviews for the rest come from the `?see-all=reviews` web page (`apps.apple.com/us/app/id<id>?see-all=reviews`), which embeds about 10 reviews per app (Apple's "most helpful" pick, not most recent).
- Reddit: pullpush.io answered "Rate limit exceeded ... does not provide free scraping resources for agents"; reddit.com blocks curl and is blocked in Claude in Chrome. Reddit was searched through the arctic-shift API (`arctic-shift.photon-reddit.com/api/posts/search`, title search).
- Apple Community: blocked to curl (302) and showed "We'll be back" in Chrome. A web search says the Apple Support Community went read-only on 2026-11-20. Thread titles come from search results; thread bodies are UNREAD unless quoted.
- MacRumors forums: Cloudflare challenge to curl. UNREAD except titles seen in search results.
- Mac Power Users forum (talk.macpowerusers.com, Discourse JSON): read directly.
- Hacker News: hn.algolia.com API.

## Findings (one row per complaint, as it landed)

Columns: quote (under 15 words) · source and date · situation · device · what they tried · Cutling solves it?

### App Store reviews of rivals

| # | Quote | Source, date | Situation | Device | Tried | Cutling? |
|---|---|---|---|---|---|---|
| A1 | "type out the same info over and over and over" | WordBoard review, apps.apple.com/us/app/id960167417, 2019-12-26 | blogger sending the same details to companies | iPhone | WordBoard free tier; wants more saved items | yes: keyboard in any app. Partly on volume: Cutling caps text cutlings at 100 |
| A2 | "kept a note on my phone of information/text that I use" | WordBoard review, 2021-05-19 | daily reused text kept in Notes, switching back and forth | iPhone | Notes app, then WordBoard | yes: this is Cutling's core job |
| A3 | "I can't trust any app that sends everything I type" | WordBoard review (1 star), 2020-03-12 | fear a keyboard reads bank, SSN, licence numbers | iPhone | refused Full Access keyboard | partly: Cutling needs Full Access too; answer is its no-network, Data Not Collected label, said plainly |
| A4 | "US$100 ... for a keyboard" | WordBoard review (1 star), 2025-07-03 | angry at add-on price | iPhone | WordBoard | yes: paid once, low price, no IAP |
| A5 | "Canned responses at your fingertips" (praise) | WordBoard review, 2018-03-23 | canned replies in Gmail, texts, forums | iPhone | WordBoard | yes |
| A6 | "great for delivery drivers" (praise) | WordBoard review, 2018-11-12 | driver sending the same messages daily; wants keyboard to reopen at first page | iPhone | WordBoard | yes on the job; UNKNOWN on where the keyboard reopens |
| A7 | "ability to add custom variables" | WordBoard review, 2021-08-06 | wants to swap a name across many snippets | iPhone | WordBoard | no: Cutling has no placeholders / fill-ins |
| A8 | "wish that I could format my snippets with bold, italics" | SnippetKeys review, 2022-03-19 | business replies needing links and bold | iPhone | SnippetKeys | yes: formatting kept (bold, italics, links) |
| A9 | "Store all your information like name address on one key" (praise) | SnippetKeys review, 2019-11-13 | name and address | iPhone | SnippetKeys | yes |
| A10 | "there are free apps that allow unlimited copy and paste" | SnippetKeys review (2 stars), 2020-07-28 | price objection | iPhone | free paste keyboards | partly: Cutling is paid, capped at 100 text |
| A11 | "you can't really delete anything you create" | Paste Snippets Keyboard review, 2026-11-13 | deleting and scrolling back to place in a long list | iPhone | Paste Snippets Keyboard | yes on delete (plus Recently Deleted); UNKNOWN on scroll position |
| A12 | "No ads, no limits, no bloat" (praise) | Paste Keyboard id1572822628 review, 2026-07-26 | the bar free paste keyboards set | iPhone | Paste Keyboard (free) | partly: no ads yes; limits exist (100/25) |
| A13 | "Most of the other paste keyboards are paid, have many ads" | Paste Keyboard review, 2024-11-13 | rejects ads and item limits | iPhone | several paste keyboards | partly: no ads, but paid and capped |
| A14 | "found a bank account number ... prompt to paste it" | Clip Keyboard id1543660502 review (1 star, "Scam beware"), 2026-11-04 | a suggestion feature surfaced a bank number and felt like a scam | iPhone | Clip Keyboard | partly: Cutling also suggests by field (email field); a clear "suggestions run on device" line matters |
| A15 | "it interferes with dictation" / "making itself the default keyboard" | TextExpander id6805960547 review, 2026-10-06 | new TE iPhone keyboard is buggy | iPhone | TextExpander | UNKNOWN: Cutling's behaviour with dictation not checked |
| A16 | "no joy with Apple (or other) keyboard covers" | TextExpander review, 2026-10-06 | iPad with hardware keyboard: custom keyboard does nothing | iPad | TextExpander keyboard | UNKNOWN: Cutling iPad + Magic Keyboard not checked; iOS custom keyboards mostly do not appear with a hardware keyboard |
| A17 | "Causes Magic Keyboard to malfunction" | TextExpander review, 2026-10-15 | M5 iPad Pro, iPadOS 27.0.1 | iPad | removed TE keyboard | UNKNOWN |
| A18 | "no 'add snippet' button" | TextExpander review, 2026-09-16 | cannot create snippets on iPhone | iPhone | TE | yes: save from app, share sheet, Control Center, Shortcuts |
| A19 | Sign in with Google but not Apple; "put in my email 100 times" | TextExpander reviews, 2026-11-08 / 2026-11-05 | account required before use | iPhone | TE | yes: Cutling has no account |
| A20 | "insists on making itself the default keyboard" | TextExpander review, 2026-10-06 | keyboard order | iPhone | TE | UNKNOWN |
| A21 | "sync is just terrible" | PastePal review (2 stars), 2026-06-05 | Mac to iPhone sync slow; must open settings on both to force | Mac + iPhone | firewall check, manual sync | partly: Cutling syncs snippets via CloudKit; Mac history does not reach iPhone |
| A22 | "Can't sync with Mac since last update" | PastePal review, 2026-10-05 | sync broken | Mac + iPhone | PastePal | partly (as A21) |
| A23 | "iCloud sync stopped working" | PastePal review (1 star), 2025-07-31 | same Apple ID on all devices, still no sync | Mac + iPad + iPhone | settings checked | partly: same iCloud dependency; Cutling has a troubleshooting entry |
| A24 | "often doesn't appear in the PastePal keyboard unless I first open" | PastePal review (3 stars), 2026-08-16 | iOS cannot read the clipboard in background | iPhone | Picture-in-Picture trick | no: Cutling's iOS side is saved snippets, not live clipboard history |
| A25 | "It only stores the last item copied before opening the app" | PastePal review (1 star), 2025-06-10 | expected iPhone clipboard history | iPhone | PastePal | no (iOS limit); say so plainly |
| A26 | "Required me to pay to paste" | PastePal review (1 star), 2025-06-02 | wanted free trial of a few items | iPhone | PastePal | no: Cutling is paid upfront too (no trial) |
| A27 | "ended up purchasing it TWICE" | PastePal review (1 star), 2025-05-28 | Restore Purchase failed on second device | iPad + iPhone | Restore Purchase | yes if one universal purchase covers iPhone, iPad and Mac (ai_facts says the purchase includes Cutling for Mac) |
| A28 | "STOP ASKING FOR ACCESSIBILITY PERMISSION" | PastePal review (1 star), 2025-05-15 | wants copy-to-clipboard only | Mac | PastePal | yes: Cutling's direct paste is off by default |
| A29 | "They removed all my history and collections" | PastePal review (1 star), 2025-05-09 | data loss after update | Mac/iOS | support emails | partly: Recently Deleted 30 days; no export noted |
| A30 | "Can't search text in screenshots" | PastePal review, 2026-09-21 | wants OCR in history | Mac | PastePal | no |
| A31 | "Unreliable for Images" | PastePal review (1 star), 2026-02-15 | image clips drop | Mac/iOS | moved to Yoink | partly: image cutlings exist (25 cap, need Full Access) |
| A32 | "won't even let me exclude 1Password" | PastePal review (2 stars), 2025-08-14 | trial limits; wants password manager excluded | Mac | Alfred, Paste, Raycast Pro, Keyboard Maestro | yes: Cutling skips concealed items by default |
| A33 | "Customer service is terrible" | Paste review (3 stars, "I'm a subscriber"), 2025-05-26 | copy loop bug, support blamed other apps | Mac | quit app | n/a (support quality) |
| A34 | "severe lag that occurs when searching clipboard history" | Paste review (1 star), 2026-01-27 | paying customer, slow search | Mac | Paste | UNKNOWN on Cutling search speed with large history |
| A35 | "IF the search functionality is working" | Paste review (3 stars), 2023-12-16 | hundreds of templates, search fails | Mac | Paste | UNKNOWN |
| A36 | "some may find it a bit pricy" | Paste review (5 stars), 2025-10-20 | price aside, loves it | Mac | Paste | yes: paid once |
| A37 | "only had a subscription model ... just feels weird" | Maccy review, 2023-02-02 | rejected Paste for subscription | Mac | Ditto on Windows, Paste | yes |
| A38 | "handles sensitive values from apps like 1Password perfectly" (praise) | Maccy review, 2023-10-05 | password safety in history | Mac | Maccy | yes |
| A39 | "using a notepad to save all the items that I copy" | Maccy review, 2024-05-07 | reused items kept in a notepad on another screen | Mac | notepad | yes |
| A40 | "option to 'pin' certain items that would then not get cleared" | CopyClip review, 2020-02-12 | a few clips used forever | Mac | CopyClip | yes: save from history to a cutling |
| A41 | "not only does it NOT support copying tables" | CopyClip review, 2019-12-23 | tables in Word break | Mac | CopyClip | UNKNOWN |
| A42 | "losing something I'd JUST put in my clipboarb" [sic] | Paste review, 2025-05-27, title "I had no idea how helpful this would be" | overwrote the clipboard by accident | Mac | Paste | yes on Mac (history) |

### Mac Power Users forum (talk.macpowerusers.com)

| # | Quote | Source, date | Situation | Device | Tried | Cutling? |
|---|---|---|---|---|---|---|
| M1 | "I do NOT want another iOS keyboard." | talk.macpowerusers.com/t/36910 post 7, 2024-04-12 | wants last few copies from Mac on iPhone | Mac + iPhone | Paste, Pycopaste | partly: Cutling is a keyboard; snippets sync, history does not |
| M2 | "trying to avoid another iOS keyboard" | t/36910 post 1, 2024-04-12 | same | Mac + iPhone | Paste | partly |
| M3 | "sync only went Mac → iOS" | t/36910 post 12, 2024-04-13 | lost items saved on iPhone | Mac + iPhone | Paste | yes for snippets (two-way iCloud) |
| M4 | "it always crashes on iOS" | t/36910 post 17, 2024-04-13 | Paste iOS crash, wiped clips | iPhone/iPad | reinstall, delete iCloud DB | n/a |
| M5 | "cumbersome to switch from keyboard to keyboard" | t/36910 post 14, 2024-04-13 | juggling several keyboards | iPhone | | no: iOS globe-key switching is unavoidable for any custom keyboard |
| M6 | "My icloud clipboard has been entirely inconsistent" | t/36910 post 28, 2024-04-22 | Universal Clipboard flaky | Mac + iPhone | built-in | partly: saved snippets do not depend on Handoff |
| M7 | "its synchronization with IOS is very bad" | t/40354 post 1, 2025-04-05 | Paste Mac good, iOS sync bad | Mac + iPhone | Paste | partly |
| M8 | "40$ cad/year for a clipboard manager seems a bit too much" | t/40354 post 3, 2025-04-05 | price of Paste | Mac | Paste | yes |
| M9 | "Paste being a subscription is absurd. It's a clipboard manager." | t/15703 post 10, 2020-02-10 | Paste went subscription | Mac | moved to Copy'em | yes |
| M10 | "costs only one time the same as one year of Paste" | t/32585 post 4, 2023-02-03 | price comparison | Mac + iOS | PastePal | yes |
| M11 | "what exactly does the subscription c[over]" | t/32585 post 8, 2023-02-05 | Paste rarely updated | Mac | Paste | yes |
| M12 | "personal non-subscription-based iPad iOS App" | t/27628 post 1, 2022-02-06 | text expansion on iPad, no TE subscription | iPad | TypeIt4Me, Alfred | yes on snippets; no on typed-abbreviation expansion |
| M13 | "I hate using other keyboard like Textexpander in IOS" | t/27628 post 3, 2022-02-06 | uses built-in text replacement synced from Alfred | iPhone | Apple text replacement | partly: Cutling can pull text replacements in, but is still a keyboard |
| M14 | "Only thing that really works: built in text expansion" | t/27628 post 6, 2022-02-06 | | iPad | | partly |
| M15 | "the app was so bad it made using iPads and phones a misery" | t/37920 post 4, 2024-07-22 | cancelled TE subscription over iOS keyboard | iPhone/iPad | TE beta keyboard | yes (one-time, works offline) |
| M16 | "couldn't pull up my pumpkin pie list" | t/48381 post 5, 2026-11-17 | recipe snippets in store, TE keyboard expired | iPhone | TE | yes |
| M17 | "some keyboards send your keystrokes back to their masters" | t/5308 post 8, 2018-07-20 | keyboard privacy fear | iPhone | deleted Bitmoji | partly: answer with no-network claim |
| M18 | "frustrating to cycle through them and switch" | t/5308 post 15, 2018-07-20 | keyboard switching friction | iPhone | stock keyboard only | no (iOS limit) |
| M19 | "Deleted Paste ... because he refuses to add a custom kB" | t/23582 post 5, 2021-06-01 | wants a keyboard to fly in reference text | iPhone | Paste, PastePal | yes |
| M20 | "it comes up with no text" | t/23582 post 7, 2021-06-19 | snippet keyboard empty until app opened | iPhone | PastePal | UNKNOWN for Cutling |

### Apple Community and MacRumors (titles only unless quoted)

| # | Quote | Source, date | Situation | Device | Tried | Cutling? |
|---|---|---|---|---|---|---|
| C1 | "Keyboard Shortcuts/Text Replacement Not Syncing" (title) | discussions.apple.com/thread/7276541 (2015-2017) | built-in text replacements do not reach other devices | iPhone + Mac | sign out of iCloud, toggle iCloud Drive (per search summary) | yes: Cutling syncs its own snippets through CloudKit. Body UNREAD |
| C2 | "Text Replacement Syncing Logic requires a Complete Re-write" (title) | discussions.apple.com/thread/255065009 | same, recent | iPhone + Mac | | yes. Body UNREAD |
| C3 | "Text replacements not syncing any more between Yosemite and iOS 9" (title) | discussions.apple.com/thread/7258713 | | | | yes. Body UNREAD |
| C4 | "text replacement not syncing" (title) | forums.macrumors.com/threads/text-replacement-not-syncing.2344200 | | | | yes. Body UNREAD |
| C5 | "How can you trust a developer's privacy statement" (title) | forums.macrumors.com/threads/...2370212 | Full Access distrust | iPhone | | partly. Body UNREAD |
| C6 | "Question about 3rd party keyboards" (title) | discussions.apple.com/thread/254919255 | Full Access | iPhone | | partly. Body UNREAD |
| C7 | "are all third party keyboards keystroke loggers" (title) | forums.imore.com/threads/...300387 | Full Access | iPhone | | partly. Body UNREAD |

### Reddit (comments read through the arctic-shift API)

| # | Quote | Source, date | Situation | Device | Tried | Cutling? |
|---|---|---|---|---|---|---|
| R1 | "Imagine to paying monthly subscription for a Clipboard app" | reddit.com/r/macapps/comments/1hw45qq comment m675gom, 2025-01-09 | "best clipboard manager" thread | Mac | | yes |
| R2 | "30$ is a lot for a Clipboard manager" | 1hw45qq m67qsvh, 2025-01-09 | Paste price | Mac | | yes |
| R3 | "$29.99 is crazy to me" | 1hw45qq nrrj1dn, 2025-12-02 | Paste yearly price vs free Windows history | Mac | | yes |
| R4 | "crashing in the background for me every day for months" | 1hw45qq m60zzm6, 2025-01-08 | Paste subscriber on old €10/yr price | Mac | | n/a |
| R5 | "Paste, only because it has a iOS and iPadOS apps that synchronizes" | 1hw45qq m60x6o5, 2025-01-08 | sync is why people stay on Paste | Mac + iPhone | Setapp | partly: Cutling syncs snippets, not full history |
| R6 | "hate ... floating and temporary windows that are never the size or the position" | 1hw45qq m61q7jd, 2025-01-08 | picker placement | Mac | PastePal side panel | partly: Cutling's picker opens at the pointer |
| R7 | "syncs ... using your iCloud, and It automatically converts formatted text into plain text" | 1hw45qq m5zh5gj, 2025-01-08 | wants plain-text paste option | Mac + iPhone | CloudClip | UNKNOWN: Cutling keeps formatting; a plain-text paste option not checked |
| R8 | "I have a subscription of Paste which I will not renew" | r/macapps/comments/1cyce28 l59g01p, 2024-05-23 | leaving Paste; slow with Excel data | Mac | PastePal, PasteNow, CopyLess 2 | yes on price |
| R9 | "Currently it only saves if I open PastePal app or keyboard" | 1cyce28 l5lond7, 2024-05-25 | wants Android-style automatic iPhone history | iPhone | PastePal | no (iOS limit) |
| R10 | "like the clipboard in Android" | 1cyce28 l5o9bor, 2024-05-26 | expects automatic history on iPhone | iPhone | | no (iOS limit) |
| R11 | "it doesn't make any sense paying it twice" | 1cyce28 l5nk94p, 2024-05-26 | bought Mac, iPhone not unlocked | Mac + iPhone | refund request | yes if one purchase covers both (ai_facts: purchase includes Mac) |
| R12 | "Raycast dont allow images to save as Snippet" | 1cyce28 l5a86vf, 2024-05-23 | image snippets wanted | Mac | Raycast | yes (image cutlings) |
| R13 | "all text is keylogged - including sensitive passwords and banking information" | r/ios/comments/1ig035s nb1rqee, 2025-08-28 | TextExpander "Suggested Snippet" showed a typed password | iPhone/Mac | stopped using TE | partly: Cutling does not watch typing on iOS; say so in plain words |
| R14 | "doesn't log or transmit your keystrokes like TextExpander does" | 1ig035s p87sfrr, 2026-09-07 | switching for privacy | iPhone | Fast Reply | yes, if Cutling states it |
| R15 | "they don't seem to work ? Am I missing something" | 1ig035s on75yql, 2026-05-22 | Android user can't find a working iOS text expander | iPhone | several App Store apps | yes: setup guide matters |
| R16 | "they are no longer supporting TextExpander on iOS" | 1ig035s malmy9u, 2025-02-03 | TE 4 for iOS retired | iPhone | TE support | yes |
| R17 | "I hope you'll add a lifetime plan" | r/iosapps/comments/1rooqbi o9fd6bx, 2026-03-09 | clipboard app launched as subscription | iPhone | | yes (paid once) |
| R18 | "abandon it before building enough snippets for the habit to stick" | r/iosapps/comments/1tkd7db on7rjl9, 2026-05-22 | setup effort kills text expanders | iPhone/Mac | | partly: import of iOS text replacements helps; starter cutlings UNKNOWN |
| R19 | "they all seem too complicated" | 1tkd7db on7ztrj, 2026-05-22 | gave up on TextExpander years ago | iPhone/Mac | TE | yes: tap-to-insert, no abbreviations to learn |
| R20 | "the price is a bit too high for me" | 1tkd7db ondx0rg, 2026-05-23 | Snippety | iPhone/Mac | | yes (price) |
| R21 | "do you support variables in the sni[ppets]" | 1tkd7db onjrzfc, 2026-05-24 | AI prompt templates with variables | Mac | Snippety | no: no placeholders |
| R22 | "unhappy with its new subscription model" | r/iosapps/comments/1varacz p0ojhd5, 2026-07-30 | long-time TextExpander user | Mac + iOS | Snippety | yes |
| R23 | "couldn't find the option to buy a lifetime ... for both" | 1varacz p1dqwh6, 2026-08-03 | wants one purchase for Mac and iOS | Mac + iPhone | Snippety | yes |
| R24 | "copy-paste doesn't work between an iPhone and a Mac" | r/iosapps/comments/1xtuimc 19siugfbhkitf, 2026-11-12 | Universal Clipboard fails | iPhone + Mac | | partly: saved cutlings sync; one-off copies don't |
| R25 | "make the 'save on open' limitation really obvious" | 1xtuimc 19shtquobq5hd, 2026-11-12 | iOS clipboard apps confuse Android/Mac users | iPhone | | relevant: Cutling copy should say iPhone holds saved cutlings, not live history |
| R26 | "exclude specific apps (like a password manager)" | r/iosapps/comments/1wgza3f p9y48fe, 2026-09-15 | CloudKit clipboard sync and passwords | Mac + iPad | Pasly | yes: concealed items skipped |
| R27 | "It's a fully local app by design" (developer reply) | r/iosapps/comments/1q4n5uu nxzsuf5, 2026-01-06 | buyers ask for no-cloud, no-AI | iPhone | | yes |
| R28 | "Nothing that's worth $30. But it does have iOS integration" | r/macapps/comments/1cle6xz l2t9pwm, 2024-05-06 | "battle of the clipboard managers" | Mac | | yes |
| R29 | "Consider switching to a one-time purchase model" | 1cle6xz l46h8vu, 2024-05-15 | told to Paste | Mac | | yes |
| R30 | "I save ... passwords, codes" in Paste | 1cle6xz l2t1vjw, 2024-05-06 | some users want sensitive items kept | Mac | Paste | no by design: Cutling skips concealed items |
| R31 | "People DO NOT agree with your pricing policy" | r/macapps/comments/1hcs08k m1qvfvy, 2024-12-13 | Paste dev downvoted | Mac | | yes |
| R32 | "Copy 'Em is good, except that the sync'ing with iOS app is a paid subscription" | 1hcs08k m1rc6lv, 2024-12-13 | sync locked behind subscription | Mac + iPhone | Copy 'Em | yes: iCloud sync included |
| R33 | "Both tried accessing the internet from first opening" | 1hcs08k m1t6tyd, 2024-12-13 | distrust of clipboard apps that phone home | Mac | PastePal, Cliptools, Maccy | yes: no network, Data Not Collected |
| R34 | "ridiculous that Raycast charges you a monthly fee" | 1hcs08k m1r716j, 2024-12-13 | Raycast clipboard history over 3 months paid | Mac | Raycast | yes |
| R35 | "No cloud, complete privacy?" | 1hcs08k ms4zt2v, 2025-05-14 | sync via vendor cloud doubted | Mac | ClipLog | yes: user's own iCloud |
| R36 | "Where is lifetime option? Will not purchase subscription" | r/iosapps/comments/1v52wpy ozgysut, 2026-07-24 | ClipBox Mac launch | Mac + iPhone | | yes |
| R37 | "does it work for all my devices ... or ... purchase for each device" | 1v52wpy ozgz1e3, 2026-07-24 | universal purchase question | Mac + iPhone | | yes (state it plainly) |
| R38 | "does it skip stuff marked as sensitive?" | 1v52wpy ozfnxh7, 2026-07-24 | first check for any history tool | Mac | | yes |
| R39 | "copying and pasting into notes in order to share between devices" | 1v52wpy ozft5bv, 2026-07-24 | Notes as a snippet store, gets messy | iPhone + Mac | Notes | yes |
| R40 | "I always wished for a clipboard manager where I don't have to open it" | 1v52wpy ozfy3fj, 2026-07-24 | iOS background limit | iPhone | | no (iOS limit) |
| R41 | "paying an annual subscription for a clipboard history app" | 1v52wpy p0nbxxx, 2026-07-30 | looking to switch to lifetime | Mac/iPhone | | yes |
| R42 | "iOS limitations make these types of apps useless." | r/iosapps/comments/1tkal73 onq0uy6, 2026-05-25 | skeptic of iPhone clipboard apps | iPhone | | partly: Cutling's iOS job (saved cutlings) does not depend on background capture |
| R43 | "send the same things many times every day: WhatsApp replies ... addresses" | 1tkal73 on7k2eu (developer), 2026-05-22 | the use case in a vendor's words | iPhone | | yes |
| R44 | "Raycast ... [can't] access it's clipboard history on my phone" | 1cle6xz l2wdz59, 2024-05-07 | stays on Paste for iPhone sync | Mac + iPhone | Raycast | partly |

### Other sources

| # | Quote | Source, date | Situation | Device | Tried | Cutling? |
|---|---|---|---|---|---|---|
| O1 | "exclude passwords from making it into the history? This is the most annoying" | news.ycombinator.com/item?id=40652733, 2024-06-11 | Maccy captures passwords; user scripts it off | Mac | wrapper scripts | yes |
| O2 | "doubt you'll find any keyboards worth using that don't request full access" | news.ycombinator.com/item?id=43932559, 2025-05-09 | Full Access is normal | iPhone | | context: say why Cutling needs it |
| O3 | deletions on Mac do not sync; "Obviously, they don't care." | discussions.apple.com/thread/255065009, 2023-08-14 (read via WebFetch) | built-in Text Replacement: adds sync Mac→iPhone, deletes don't; 3+ Apple Support calls over two years | iPhone 13 Pro + Mac + iPad | Apple Support escalations | yes: Cutling's own CloudKit sync |
| O4 | replacements gone from iPad after 18.7.2 | discussions-jp-prz.apple.com/thread/256182344 (via search summary; body UNREAD) | update wiped text replacements on one device | iPad | | partly |
| O5 | "Tahoe clipboard manager has an 8 hour memory, why" (title) | forums.macrumors.com/threads/...2458897 (MacRumors banned this IP; body UNREAD) | macOS 26 Spotlight history expires | Mac | Spotlight ⌘4 | yes: Cutling history plus saved cutlings that never expire unless set |
| O6 | "x would allow to paste from y" for every paste (title) | discussions.apple.com/thread/256136327 (body UNREAD) | iPadOS 26 paste prompts | iPad | | UNKNOWN whether Cutling image cutlings trigger it; text inserted by a keyboard does not use the pasteboard |
| O7 | "Copy/paste between Apple devices stopped after iOS upgrade" (title) | discussions.apple.com/thread/256326827 (body UNREAD) | Universal Clipboard broke | iPhone + Mac | | partly |

## Top 15 pains, ranked by how often they came up

Counts are rows above that carry the pain (one person can count once per pain). Sample is small and skewed to Mac power users and r/iosapps launch threads, so the order is a guide, not a measurement.

| Rank | Pain | Rows | Count | Cutling |
|---|---|---|---|---|
| 1 | A subscription for a clipboard or snippet app feels wrong ("for a clipboard app", "$29.99 is crazy") | A36 A37 M8 M9 M10 M11 M15 R1 R2 R3 R17 R22 R28 R29 R31 R32 R34 R36 R41 | 19 | yes: paid once, no IAP |
| 2 | Mac and iPhone don't stay in step: sync is slow, one-way, or stops after an update | A21 A22 A23 M3 M6 M7 R5 R24 R44 O3 O7 C1 C2 C3 C4 | 15 | partly: saved cutlings sync both ways via iCloud; Mac history does not reach iPhone |
| 3 | Rival apps break or get abandoned (TextExpander iOS keyboard retired/buggy, Paste crashes, PastePal bugs and silent support) | A15 A17 A33 A34 M4 M15 M16 R4 R16 + 8 PastePal 1-2 star reviews | 17 (spread over many complaints) | n/a, but "one developer, paid once, works offline" answers the fear |
| 4 | Fear that a keyboard with Full Access logs what you type, bank details included | A3 A14 M17 R13 R14 R33 R35 O2 C5 C6 C7 | 11 | partly: Cutling still needs Full Access; its answer is no network, Data Not Collected, no account, said in plain words |
| 5 | Retyping the same address, details or replies, or keeping them in Notes and switching back and forth | A1 A2 A5 A9 A39 R39 R43 M16 | 8 | yes: the core job |
| 6 | iPhone can't build clipboard history in the background; you must open the app after each copy | A24 A25 M1 R9 R10 R25 R40 R42 | 8 | no (iOS limit). Cutling's iPhone side is saved cutlings, which this does not affect; say so |
| 7 | Built-in Text Replacement doesn't sync, loses entries after updates, and is too basic | C1 C2 C3 C4 O3 O4 M12 M13 M14 | 9 | yes: own sync, and it can pull text replacements in |
| 8 | Copied passwords land in clipboard history | A32 A38 O1 R26 R38 | 5 (+R30 wants the opposite) | yes: concealed items skipped |
| 9 | Switching keyboards with the globe key is a chore; "I do NOT want another iOS keyboard" | M1 M2 M5 M13 M18 | 5 | no: any custom keyboard has this; in-field suggestions and pulling in text replacements soften it |
| 10 | Paying twice: Mac and iPhone sold separately, Restore Purchase fails | A27 R11 R23 R37 | 4 | yes: one purchase includes Mac (ai_facts) |
| 11 | Paywall before you can try anything, or an account/sign-in first | A19 A26, PastePal 1-star "Awful, paid app disguised as free" (RSS, 2025-07-27) | 3 | partly: no account; no free trial either |
| 12 | Free paste keyboards are full of ads or item limits | A10 A12 A13 | 3 | partly: no ads; caps of 100 text / 25 image |
| 13 | Snippets need variables, fill-ins or placeholders | A7 R21 M (t/30167 fill-ins) | 3 | no |
| 14 | Search over a big history is slow or can't see text in images | A30 A34 A35 | 3 | no on OCR; UNKNOWN on speed |
| 15 | iPad with a hardware keyboard: custom keyboard doesn't show or breaks the Magic Keyboard | A16 A17 | 2 | UNKNOWN: not tested |

Close behind: images unreliable or not savable as snippets (A31 R12, Cutling yes), formatting (A8 wants bold and links: yes; R7 wants plain text: UNKNOWN), setup feels complicated and people quit before the habit sticks (R15 R18 R19), Accessibility prompt for direct paste (A28: Cutling has it off by default), macOS Tahoe's Spotlight history forgets after 8 hours (O5, body UNREAD).

## Exact phrases people search or ask with

From the quotes above and Google's People Also Ask boxes recorded in `docs/research/seo-research-niche.md` (Cutling niche, 2026-11-20).

1. "Is there a clipboard app for iPhone?" (PAA)
2. "How do I save my email address on my iPhone keyboard?" (PAA)
3. "type out the same info over and over" (A1)
4. "subscription for a clipboard app" / "$30 for a clipboard manager" (R1 R2 R28)
5. "one-time purchase" / "Where is lifetime option?" / "lifetime plan" (M10 R17 R36)
6. "Why isn't the clipboard sync working between my iPhone and Mac?" (PAA) / "copy-paste doesn't work between an iPhone and a Mac" (R24)
7. "Text replacement not syncing" (C1 C4 thread titles)
8. "keylogged ... passwords and banking information" / "are all third party keyboards keystroke loggers" (R13 C7)
9. "does it skip stuff marked as sensitive?" / "exclude passwords" (R38 O1)
10. "does it work for all my devices" / "paying it twice" (R37 R11)
11. "Is there a text expander app available on iOS?" (PAA) / "TextExpander no longer working on iOS" (thread title 1ig035s)
12. "canned responses" (A5) / "saved replies" (One Touch Paste listing)
13. "What is the difference between Paste and PastePal?" / "Is Maccy paid now?" (PAA)
14. "I do NOT want another iOS keyboard" (M1)
15. "clipboard in Android" / "where I don't have to open it to save" (R10 R40)
16. "How to sync iPhone and MacBook clipboard?" (PAA)

## Complaints about rivals, by theme

- Subscription: Paste ($29.99/yr cited R3; "40$ cad/year" M8; went subscription Feb 2020, t/15703), Raycast clipboard history over 3 months (R34), Copy 'Em iOS sync (R32), TextExpander (R22 M15), ClipBox and other new iOS apps launching with subscriptions (R17 R36). People move to PastePal, Maccy, Copy 'Em or Alfred to escape it.
- Full Access and keylogging fear: TextExpander's "Suggested Snippet" surfaced a typed password (R13, 2025-08-28) and a rival now markets itself as not logging keystrokes (R14); Clip Keyboard's suggestion surfaced a bank number and was called a scam (A14); WordBoard 1-star "can't trust any app that sends everything I type" (A3); PastePal and Cliptools reaching the internet on first launch (R33).
- Sync breaking: PastePal (A21 A22 A23, "Sync Is a Dealbreaker"), Paste iOS sync (M7) and Mac→iOS-only behaviour (M3), Apple's own Text Replacement (O3, C1-C4) and Universal Clipboard (M6 R24 O7).
- iOS keyboard switching friction: M1 M2 M5 M18; TextExpander keyboard forcing itself default and breaking dictation and the Magic Keyboard (A15 A17); PastePal keyboard empty until the app is opened (A24 M20).
- Price: WordBoard add-on "US$100" (A4); Snippety "a bit too high" (R20); free keyboards win on "no ads, no limits" (A12 A13).
- Losing history: PastePal "removed all my history and collections" (A29); Paste search failing over hundreds of templates (A35); Maccy database growing past 10 GB (HN 49362799); Tahoe Spotlight history expiring (O5).

## Gaps Cutling does not solve yet (feature ideas)

1. Placeholders and fill-ins in a cutling (a name, today's date, a cursor spot) (A7 R21, TextExpander fill-ins t/30167).
2. Typed-abbreviation expansion, for people who want ";addr" to expand without opening a keyboard (M12 M13; R13 shows the privacy cost of doing it by watching keystrokes).
3. Mac clipboard history visible on iPhone and iPad (M1 R5 R44): people stay on Paste for this.
4. A try-before-buy path (A26, PastePal 1-star 2025-07-27, Snippety moved to freemium for this reason, 1tkd7db on7nmlm).
5. Higher caps: 100 text cutlings and 1,000 characters each will not hold a WordBoard-style library (A1 asks for more; PastePal user with 1,000+ clips, 2025-04-12) or long canned emails.
6. Text search inside image cutlings and screenshots (A30, r/iosapps 1xtuimc).
7. Export and backup of cutlings (A29 lost everything; Paste user asks for export, 1cle6xz l7cyyrk).
8. Plain-text paste on demand (R7).
9. Sharing a set of cutlings with a team or partner (Paste pinboards, Snippety shared via iCloud collaboration, 1tkd7db on83lx7).
10. Keyboard reopening where you left off, or at the top, by choice (A6 A11).
11. iPad with Magic Keyboard: confirm and document whether the Cutling keyboard works there (A16 A17).
12. Windows or Android: no request found in this sample beyond R10's Android comparison; UNREAD as a demand signal.

## What this means for the site and AI files

- Lead with the job in buyers' words: "the same address, bank details and replies, over and over", "kept in Notes", "without retyping". These match A1 A2 R39 R43.
- Say "paid once, one purchase covers iPhone, iPad and Mac" in one line, since #1 and #10 are the most repeated objections, and "no account" because TextExpander's sign-in drew 1-star reviews.
- Answer Full Access head-on with what Cutling does not do (no network, no keystroke reading, Data Not Collected), because the fear is about keylogging and bank details, the exact things Cutling is sold for.
- Be honest that iPhone cannot keep a clipboard history in the background; Cutling's iPhone side is saved cutlings, so it is not affected (#6 is a source of 1-star reviews for rivals that implied otherwise).
- Name password skipping on Mac as a feature, in the words people check for: "skips copied passwords" (R38).
- llms.txt "queries" could add: "clipboard app for iPhone and Mac without a subscription", "text expander for iPhone that doesn't log keystrokes", "my text replacements don't sync between iPhone and Mac", "save my address and bank details to paste on iPhone".
