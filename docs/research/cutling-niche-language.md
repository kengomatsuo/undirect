# Cutling niche language: how people talk about clipboards, snippets and text expanders

Research date: 2026-11-21. Read-only; nothing posted, no logins.

Honesty line every hook below respects: iOS lets no app read the clipboard in the background, so no iPhone app keeps a full clipboard history. On iPhone, Cutling keeps what you save (keyboard has one-tap "add from clipboard"). The Mac app keeps a full clipboard history and skips concealed passwords.

Method note: Reddit could not be read. The Claude in Chrome extension refuses it ("This site is not allowed due to safety restrictions"), reddit.com answers scripts with 403, and the web search tool refuses the domain for this user agent. Third-party Reddit archives were not used to get around that block. The r/iphone, r/ios, r/apple and r/mac coverage the brief asked for is therefore replaced by the closest public forums where the same people post: MacRumors Forums (iPhone, iOS and Mac boards, with reaction counts), Apple Support Community (with "I have this question too" counts), Hacker News, X and App Store reviews (Apple's public customer-review feed). Anything here that says "Reddit" is quoted from a non-Reddit page that cites it.

## Findings log (appended as each lands)

### A. App Store reviews of rival apps (US store, Apple's public review feed)

Corpus: 6,285 unique US reviews pulled 2026-11-21 from `itunes.apple.com/us/rss/customerreviews/.../json` (most helpful + most recent, up to 500 each) for Paste (967805235), Paste Keyboard (1066723174), Clipboard - Paste Keyboard (1514741180), Clipboard : Keyboard Manager (1633027266), Clipboard++ (854707788), Clipboard (1597881414), PastePal (1503446680), Pasted (1576095099), WordBoard text expander (960167417), Gboard (1091700242), Microsoft SwiftKey (911813648), plus AutoPaste and a staffing app named "Clipboard" that were used only as noise checks. 2,513 of them are reviews of the nine clipboard/snippet apps ("clipboard-app subset"). Copied (Kevin Chang) is no longer on the US store: its old ID 1015767231 now resolves to an unrelated app, so it has no reviews here. "Votes" is Apple's helpful-vote count shown on the review. App page URL: `https://apps.apple.com/us/app/id<ID>`; each review is identified by its review ID.

A1. Android switcher, Clipboard - Paste Keyboard, 5 stars, 2024-09-10, review 11710560073, votes 0. "When I moved from Android to iphone I lost the clipboard feature of g board" https://apps.apple.com/us/app/id1514741180

A2. Samsung switcher, Clipboard - Paste Keyboard, 5 stars, 2026-08-23, review 14462948333, votes 0. "It's the main thing I missed from Samsung" (the clipboard; title "So far so good") https://apps.apple.com/us/app/id1514741180

A3. Clipboard - Paste Keyboard, 5 stars, 2026-07-09, review 14284739977. "I was so sad to see that they did not have a clipboard like androids" https://apps.apple.com/us/app/id1514741180

A4. SwiftKey, 5 stars, 2026-10-15, review 14669230649. "I switched from android and missed the clipboard" https://apps.apple.com/us/app/id911813648

A5. Paste Keyboard, 5 stars, 2022-06-21, review 8797537628. "have missed the clipboard option of a Samsung" (then tried Shortcuts, gave up, searched the App Store) https://apps.apple.com/us/app/id1066723174

A6. Gboard on iPhone, 2 stars, 2023-03-28, review 9760163076. "I especially miss the clipboard where you can pin" (Pixel Gboard) https://apps.apple.com/us/app/id1091700242

A7. Gboard on iPhone, 3 stars, 2026-11-12, review 14782892588, votes 1. Title "Please unabandon"; asks Google to "add a clipboard" to match Android. https://apps.apple.com/us/app/id1091700242

A8. Paste Keyboard, 3 stars, 2025-12-24, review 13550364263. "You need to open the app and paste things in one by one." Ends: still not like Android. https://apps.apple.com/us/app/id1066723174

A9. Clipboard++, 3 stars, 2023-04-04, review 9786136362. "you can't automatically save to clipboard like Android phones can" https://apps.apple.com/us/app/id854707788

A10. Clipboard++, 1 star, 2024-11-17, review 11961906596, votes 2. "You literally have to open the app EVERYTIME you copy something." https://apps.apple.com/us/app/id854707788

A11. Clipboard : Keyboard Manager, 3 stars, 2023-12-03, review 10654184717, votes 2. "Is there a way to where I don't have to open the app each time" https://apps.apple.com/us/app/id1633027266

A12. Clipboard, 3 stars, 2024-03-28, review 11094096740, votes 1. Title: "Keeps asking 'Allow Paste' every time" https://apps.apple.com/us/app/id1597881414

A13. Clipboard, 2 stars, 2025-12-10, review 13500064184, votes 1. "I have to copy, swap keyboards, swap back" https://apps.apple.com/us/app/id1597881414

A14. Paste, 1 star, 2020-08-13, review 6314101261, votes 76 (the most-voted review in the whole corpus). Title: "I WILL NEVER BUY ANY SUBSCIPTION" https://apps.apple.com/us/app/id967805235

A15. Paste, 2 stars, 2020-02-10, review 5513664370, votes 3. Title: "Switch to a subscription? For a clipboard manager?" https://apps.apple.com/us/app/id967805235

A16. Paste, 1 star, 2020-02-12, review 5521585932, votes 40. "told me now I needed to subscribe to pay for the same thing" https://apps.apple.com/us/app/id967805235

A17. Paste Keyboard, 1 star, 2026-10-28, review 14723122478, votes 1. Title: "It's a clipboard, not a billboard" (about ads) https://apps.apple.com/us/app/id1066723174

A18. Paste, 1 star, 2022-03-03, review 8417262512, votes 12. "I had issues with the iCloud sync, in which I lost all my clippings." https://apps.apple.com/us/app/id967805235

A19. Paste, 3 stars, 2018-06-03, review 2636801398, votes 3. Title: "Mac Version is Great, But Syncing with iOS Version Doesn't Work At All" https://apps.apple.com/us/app/id967805235

A20. Paste, 1 star, 2024-03-02, review 11001200608, votes 3. Disables its network: "something that listens to every thing you copy into your clipboard" https://apps.apple.com/us/app/id967805235

A21. What people paste, Paste Keyboard, 3 stars, 2026-04-17, review 13968248044. Free tier of 3 items holds "address, instructions for'uber that i have to repeat everytime", plus hard-to-spell last names. https://apps.apple.com/us/app/id1066723174

A22. Clipboard - Paste Keyboard, 4 stars, 2024-02-12, review 10933253464. Pastes "the addresses of the three buildings we manage" instead of typing them over and over. https://apps.apple.com/us/app/id1514741180

A23. Clipboard - Paste Keyboard, 5 stars, 2026-01-04, review 13592973772. Sales script: "re-write the same reply to hundreds of people" https://apps.apple.com/us/app/id1514741180

A24. Paste Keyboard, 5 stars, 2022-08-25, review 9017245745, votes 2. "I usually get asked the same questions over and over again"; also pastes "links to my websites". https://apps.apple.com/us/app/id1066723174

A25. Paste, 5 stars, 2025-05-27, review 12704356702, votes 12. Groups: "hex codes, standard email responses, and links" https://apps.apple.com/us/app/id967805235

A26. Paste, 5 stars, 2025-02-28, review 12366587796. Saved items: "llm prompts, commonly sent email data, common verbiage for work" https://apps.apple.com/us/app/id967805235

A27. WordBoard, 5 stars, 2018-03-23, review 2337707557, votes 3. Title: "Canned responses at your fingertips" https://apps.apple.com/us/app/id960167417

A28. WordBoard, 5 stars, 2015-02-23, review 1157134918, votes 1. "with one touch have my address on the page" https://apps.apple.com/us/app/id960167417

A29. Paste Keyboard, 5 stars, 2024-01-21, review 10849751986, votes 1. Roblox role-play players "needed to paste a lot of text" (a large teen segment of Paste Keyboard's reviews: 55 clipboard-app reviews name Roblox, TikTok, Snapchat, Instagram or Discord). https://apps.apple.com/us/app/id1066723174

A30. Paste, 5 stars, 2023-09-01, review 10322374112. Switcher from Windows/Android: "disappointed that this wasn't built in, like it is with Windows/Android" https://apps.apple.com/us/app/id967805235

A31. Bank details are rare. In the 2,513 clipboard-app reviews, "bank", "IBAN", "account number" or "routing" appear in 5 reviews, and only one (Paste, 2018-04-07, review 2395000353) lists "account numbers" among things kept; one other is a spam review pasting wire instructions. IBAN appears 0 times. This supports the owner's call to drop "bank details" as a lead.

A32. Counts across the 2,513 clipboard-app reviews (reviews mentioning, regex, case-insensitive): "paste/pasting" 747 (all 6,285), "clipboard" 732 (all), "save/saved/saving" 354 (all), "copy and paste / copy-paste / copy paste" 178 (all), "copied" 109, "history" 102, "shortcut" 83, "phrases" 42, "clipboard history" 40, "snippet" 29, "pin/pinned" 24, "template" 16, "text replacement" 13, "text expander" 5, "canned/quick replies" 4. "Same thing over and over / every time / retype" phrasing: 236 (all).

A33. Pain counts in the clipboard-app subset, reviews rated 3 stars or less (total mentioning in brackets): subscription or price 219 (320); crashes or "doesn't work / stopped working" 99 (147); sync broken or lost clips 85 (171); ads 78 (141); must open the app / doesn't save automatically 45 (76); "Allow Paste" and permission pop-ups 41 (72); Full Access and privacy worry 34 (64); free-tier item limits 19 (52); clunky or confusing 10 (20).

A34. What people say they paste, clipboard-app subset (reviews mentioning): replies/responses/messages 63, images/screenshots 56, links/URLs 36, code/terminal commands 32, AI prompts 26, emojis/symbols/fonts 15, passwords 15, addresses 13, email addresses/templates 13, tracking numbers 4, phone numbers 2, bank/account 5 (see A31), IBAN 0.


### B. Forums (MacRumors, BudgetLightForum) and Apple's own iOS 27 change

B1. MacRumors Forums, "How is the keyboard situation so bad?", post #12 quoting the OP (h.gilbert, trying iPhone again from Android), 2024-02-02; reactions 2 on the reply. "mainly clipboard history." Also: GBoard on iPhone was missing "most importantly the clipboard history", and SwiftKey "asks every time to 'allow paste'". https://forums.macrumors.com/threads/how-is-the-keyboard-situation-so-bad.2418144/

B2. BudgetLightForum, "iPhone Clipboard App?", INeedMoreLumens, 2024-12-05, 0 likes on the OP. "I'm really missing the Clipboard feature that's built into Android." After trying an app: "This workaround creates more work for me." (1 like). https://budgetlightforum.com/t/iphone-clipboard-app/226588

B3. MacRumors news, 2026-07-01, 47 comments: iOS 27 adds a one-tap "paste from Safari"-style shortcut above the keyboard for the last thing you copied (text, photos, links). It is one item, not a history. Consequence for copy: "iPhone has no easy paste" is now false; "iPhone remembers only the last thing you copied" stays true. https://www.macrumors.com/2026/07/01/ios-27-new-copy-and-paste-feature/

B4. Counter-evidence. MacRumors, "People who switched from Android phone to iPhone - anything you miss from Android?" (2020, 18 posts): no post names the clipboard; home-screen widgets (4 posts) lead. The clipboard is a specific, loud pain for some switchers, not the top thing every switcher misses. https://forums.macrumors.com/threads/people-who-switched-from-android-phone-to-iphone-anything-you-miss-from-android.2231019/

### C. X posts (read in Chrome, search tab "Top"; likes and views as shown on 2026-11-21)

Search 1: `"clipboard history" iphone android` (42 posts loaded, 34 about iPhone).

C1. @jonathanzliu, 2025-06-23, 16 likes, 8,060 views. "after 1 day using an iphone i want to go back to android." Reason 1 is no clipboard history and "pinned clipboard items": he keeps his Cal.com booking link pinned to paste whenever someone wants to meet. https://x.com/jonathanzliu/status/1936854050479489292

C2. @catalinmpit, 2025-11-25, 40 likes, 5,311 views. "I find it insane how the iPhone still doesn't have clipboard history" https://x.com/catalinmpit/status/1993004773675782438

C3. @UgochukwuCFR, 2023-10-07, 31 likes, 7,890 views. "I can't retrieve recently copied texts"; lost "an important scholarship thread" he meant to paste. https://x.com/UgochukwuCFR/status/1710616449226547695

C4. @boredabdel, 2025-12-10, 8 likes, 828 views. iPhone-to-Android mover: "copy/paste multiple things and have access to them is fantastic." https://x.com/boredabdel/status/1998465603657666794

C5. @cyber_razz, 2026-02-11, 19 likes, 2,840 views. "It's called a clipboard. And on iPhone, it's intentionally dumb." https://x.com/cyber_razz/status/2021497636876927184

C6. @QUANT06, 2026-02-14, 3 likes, 93 views. "iPhone clears the previous one once you copy a new text." https://x.com/QUANT06/status/2022357167945445457

C7. @TheStupidGuy0, 2026-09-12, 3 likes, 137 views. Lists "no clipboard history built-in, even copying text is annoying." https://x.com/TheStupidGuy0/status/2098596021458853940

C8. @Jatiquedev, 2025-12-30, 1 like, 57 views. "Why doesn't iPhone have clipboard history when Android has it?" (first line of a list). https://x.com/Jatiquedev/status/2006019258958938159

C9. @3aayushhh, 2020-09-21, 3 likes. "This update still doesn't have a clipboard history. I'm proper upset" https://x.com/3aayushhh/status/1308081536118517764

C10. @Cartidise, 2025-09-29, 1,910 likes, 203,131 views. "Let's talk about how awful the iPhone keyboard is" — the biggest post in this search is a keyboard rant (autocorrect, no comma, no long-press symbols); clipboard pain rides inside a wider "iPhone keyboard is bad" mood. https://x.com/Cartidise/status/1972555906211541342

C11. @DoingFedTime, 2026-04-30, 79 likes, 3,977 views (privacy thread). Clipboard holds "Passwords you copied from password managers, addresses, phone numbers". Supports the Mac app's "skips concealed passwords" line. https://x.com/DoingFedTime/status/2049715372564381739

C12. @gow88_, 2026-01-23, 58 likes, 29,696 views. A rival launch, "Clipt - Clipboard History", pitches "keyboard clipboard history for iPhone" plus Mac sync. The niche's own sellers lead with the words "clipboard history". https://x.com/gow88_/status/2014578122780508402

Search 2: `"text replacement" iphone` (46 posts loaded). On X, Text Replacement is talked about as a "hidden iPhone feature" tip, and the tips do numbers; complaints about it are rare here (the sync complaints live on Apple's forums, see D-block).

C13. @Kelvinoyibo, 2026-07-22, 114 likes, 6,477 views. "use text replacement to save your X username and wallet address" (iPhone) vs "use clipboard" (Android). Crypto reply-guys are a real repeat-paste crowd. https://x.com/Kelvinoyibo/status/2079915374024225032

C14. @zaheerain, 2026-07-23, 66 likes, 1,171 views. Tip "to a reply guy": text replacement so "your addys will automatically appear". https://x.com/zaheerain/status/2080289371744292906

C15. @PackBagPoints, 2024-12-15, 41 likes, 4,316 views. "bc1p auto types my BTC mint wallet"; another shortcut for "email addy". https://x.com/PackBagPoints/status/1868061515468992975

C16. @TheCleverMethod, 2026-11-19, 1 like, 207 views. "Stop typing your email address over and over." https://x.com/TheCleverMethod/status/2123432405381824631

C17. @DanielHerrold, 2023-07-11, 75 likes, 20,602 views. "Every time I type zzz it auto loads my email address." https://x.com/DanielHerrold/status/1678577927825375234

C18. @Tech_Marsha, 2026-11-10, 63 likes, 2,532 views. "Your iPhone has a hidden keyboard feature that can save you hours of typing." https://x.com/Tech_Marsha/status/2120105408622903540

C19. @EverydayEddie_, 2026-11-14, 0 likes, 15 views. "tired of typing your email on your iphone over and over" https://x.com/EverydayEddie_/status/2121637325624987749

C20. @ashfakapurba, 2026-11-16, 0 likes, 3 views. "Still typing the same work messages from scratch" https://x.com/ashfakapurba/status/2122344025609121927

C21. @DegenBibee, 2026-04-04, 34 likes, 1,848 views. "How to automate replies using Text Replacement" https://x.com/DegenBibee/status/2040161943898480899

C22. @darasoba, 2026-07-10, 188 likes, 21,404 views; @kenkenlewu, 2026-07-13, 66 likes, 7,098 views; @Fosudo reply, 2023-10-08, 97 likes. All teach Text Replacement to type the Naira sign. @naa_maalum, 2025-08-24, 6,918 likes, 503,328 views: Text Replacement for a religious honorific symbol. The biggest Text Replacement posts are about typing a symbol the keyboard lacks, not about saved text. https://x.com/darasoba/status/2075575026791625010 , https://x.com/naa_maalum/status/1959622368755880312

C23. @Radiator1305, 2026-11-14, 0 likes, 14 views (a rival's reply-marketing). "iPhone Text Replacement = text only." The limit people hit: Text Replacement holds only plain text and fires only on a typed shortcut. https://x.com/Radiator1305/status/2121604061988557026

C24. @ray_zt, 2026-11-14, 4 likes, 322 views. "I copy and paste from others every time." (about a symbol). https://x.com/ray_zt/status/2121294523842052550

C25. @applefiles_, 2026-11-09, 222 likes, 23,872 views. "Average iPhone user ... Types everything" vs smart user who uses shortcuts: "power user" framing that tip accounts use. https://x.com/applefiles_/status/2119830369201791373

Search 3: `switched to iphone miss clipboard` (29 posts loaded, 21 say "clipboard"; 12 of those 21 are app makers' posts, mostly a coordinated Notchet launch).

C26. @Mujaahid_1, 2026-11-16, 45 likes, 11,171 views. Switcher: "Then no clipboard too ... how do I just paste my account details in chats" — the one place "account details" shows up as a natural phrase: sharing your account for payment in a chat (a Nigerian user, where pasting account details to get paid is everyday). The word is "account details", never "bank number". https://x.com/Mujaahid_1/status/2122338564251980114

C27. @Exquis1t3, 2026-09-11, 5 likes, 538 views. Samsung to iPhone 17: "The only thing I miss is not having a native clipboard" https://x.com/Exquis1t3/status/2098319057774920018

C28. @elliot_solution, 2026-11-21, 1 like, 45 views. "Clipboard history is the first thing every Windows person misses on a Mac. Win V spoiled us" — the Windows-to-Mac switcher is the Mac-side twin of the Android angle, and there the full history is honest. https://x.com/elliot_solution/status/2123758875136471511

C29. @amitr18x (Notchet promo), 2026-11-15, 2 likes, 93 views. "You copy a tracking number, then a link, and the tracking number is gone." Rival copy claims "whole clipboard history on Mac, iPhone and iPad", which iOS does not allow in the background: a claim Cutling must not copy. https://x.com/amitr18x/status/2121753242816373195

C30. @RealEpistates (TurboClipboard), 2026-11-19, 1 like, 7 views. "Isn't it frustrating that your iPhone's clipboard holds just one thing" — rivals open on the one-item clipboard. https://x.com/RealEpistates/status/2123422469637697687

C31. @HisashiSpace, 2026-11-17, 0 likes, 37 views. "Still emailing or messaging yourself just to get a bit of text from your iPhone to your Mac" — the self-email workaround is a recognised habit. https://x.com/HisashiSpace/status/2122385733705220229

C32. @ipiphq, 2026-11-21 (minutes old), 0 likes, 2 views. Cutling's own launch line on iPip: "Clipboard keyboard for the text you type again and again." It already uses the niche's "again and again / over and over" phrasing. https://x.com/ipiphq/status/2123937544471482569

### D. What Gboard actually keeps on Android, the Mac side, Hacker News

D1. Gboard on Android deletes unpinned clipboard items after one hour; only pinned items stay. Android Authority, 2026-08-13 (read in Chrome): Gboard "automatically deletes copied content after one hour, unless you pin it." Its teardown (Gboard 18.0.3 beta) found a setting to stretch unpinned clips to at most 24 hours; @AssembleDebug's post on it, 2026-11-20, 104 likes, 2,567 views. So what an Android switcher has leaned on for months is the pinned list, not a long history. https://androidauthority.com/gboard-clipboard-duration-slider-apk-teardown-3698099 , https://x.com/AssembleDebug/status/2123768279680622987

D2. 9to5Google teardown of Gboard 8.0 beta, 2019-02-23, quoting the app's string: "Unpinned clips will be deleted after 1 hour." (the rule dates to 2019). https://9to5google.com/2019/02/23/gboard-8-0-apk-insight-teardown/

D3. Hacker News, mzmzmzm, 2026-02-13 (item 47004860). New iPhone user: "There is no clipboard history." in a list of "really shocking" UI gaps. https://news.ycombinator.com/item?id=47004860

D4. macOS Tahoe has a built-in clipboard history in Spotlight that kept items 8 hours by default; 26.1 added 30 minutes / 8 hours / 7 days. MacRumors, 2025-11-04. https://www.macrumors.com/2025/11/04/more-spotlight-clipboard-settings-macos-26-1/

D5. MacRumors Forums, "Tahoe clipboard manager has an 8 hour memory. Why?", OptimusGrime, 2025-06-12, reactions 2. "only within the last 8 hours. Lunacy." https://forums.macrumors.com/threads/tahoe-clipboard-manager-has-an-8-hour-memory-why.2458897/

D6. Hacker News, item 45258541, 2025-09-16, replying to "are clipboard managers like Maccy obsolete now?": "Spotlight's clipboard history doesn't even keep items for longer than eight hours." https://news.ycombinator.com/item?id=45258541

D7. Hacker News, azeemba, 2026-08-19 (item 49360670). "The clipboard manager inside spotlight feels cumbersome to use"; replies name CopyClip, ClipTools, Raycast and Maccy (Maccy reported slow, database past 10 GB). https://news.ycombinator.com/item?id=49360670

D8. Hacker News, item 40795443, 2024-06-26. Bought Paste, it "switched to a subscription model", so moved to free Raycast. Same subscription pain as A14-A16, from Mac users. https://news.ycombinator.com/item?id=40795443

D9. Hacker News, item 26477750, 2021-03-16. "I regularly use the last 3-5 clips." — the honest size of a daily history habit. https://news.ycombinator.com/item?id=26477750

D10. Hacker News, item 35679114, 2023-04-23 (author of a Raycast post): native Text Replacements sync with iOS "and they save me a lot of typing on iPhone and iPad". Sync is the praised half when it works; the long-running "Text Replacement doesn't sync" complaints sit on Apple's forums and MacRumors from 2016-2018 (e.g. https://forums.macrumors.com/threads/icloud-text-replacements-sync-issue.2072935/), and Apple Support Community threads on it now redirect to support.apple.com, so they could not be read or counted. https://news.ycombinator.com/item?id=35679114


---

## 1. The words people use, ranked

Ranked by how many reviews use them (2,513 clipboard-app reviews, A32, plus the 6,285-review total where marked), checked against the X and forum reads (C, B, D).

| Rank | Word or phrase | Count | Who says it |
|---|---|---|---|
| 1 | **paste / copy and paste / copy paste** | "paste" 747 (all reviews), "copy and paste" variants 178 | Everyone. The plain verb is the niche's main word. |
| 2 | **clipboard** ("a clipboard", "the clipboard", "no clipboard") | 732 (all reviews) | Everyone. Switchers say they lost "the clipboard" or "a clipboard" (A2, A3, A4, C26, C27), not "clipboard history". |
| 3 | **save / saved** | 354 (all reviews) | Users describing what the app does for them: "saves what I copy", "saved replies". |
| 4 | **over and over / again and again / every time / the same thing** | 236 (all reviews) | The pain, said as repetition (A22, A24, C16, C19, C20). Cutling's own launch line already uses it (C32). |
| 5 | **copied** | 109 | "what I copied", "recently copied texts" (C3). |
| 6 | **history** / **clipboard history** | 102 / 40 | Tech-savvy posters, Windows and Pixel people, and every rival's marketing (C2, C8, C12, B1, D3). Strong on X, weak in plain users' reviews. |
| 7 | **shortcut** / **text replacement** | 83 / 13 in reviews; dominant on X | On X, "Text Replacement" is a "hidden iPhone feature" tip (C13-C25), often with "hack", "trick", "alpha". |
| 8 | **phrases**, **replies / responses**, **canned responses** | 42, 63, 4 | Sellers, support and sales people (A23, A27). |
| 9 | **pin / pinned** | 24 | Gboard and Pixel people specifically (A6, C1). |
| 10 | **snippet** | 29 | Mostly Mac power users and app makers. Rare from ordinary iPhone users. |
| 11 | **template** | 16 | Work users. |
| 12 | **text expander** | 5 | Almost nobody outside productivity circles. |

Takeaways: lead with **copy, paste, clipboard, save, over and over**. Use **clipboard history** only for the Mac or when quoting what Android/Windows had. **Snippet** and **text expander** are seller words; plain users rarely say them. **Bank details / bank number / IBAN** essentially never appear (A31: IBAN 0 of 2,513; "bank" 5, mostly unrelated). The one natural cousin is "**account details**" to paste in chats, from a Nigerian switcher (C26).

## 2. Top 8 pains, in their words, with counts

Counts: reviews rated 3 stars or less in the 2,513 clipboard-app reviews (A33), unless marked as posts.

1. **Paying every month for a clipboard.** 219 low-rated reviews (320 total). "I WILL NEVER BUY ANY SUBSCIPTION" (A14, 76 helpful votes, the most-voted review in the corpus); "Switch to a subscription? For a clipboard manager?" (A15); moved to free Raycast (D8).
2. **iPhone remembers only one thing; a new copy wipes the last.** About 14 posts and threads read (C2, C3, C5, C6, C7, C8, C9, C30, B1, B2, D3, C1, C26, C27). "iPhone clears the previous one once you copy a new text." (C6); "I can't retrieve recently copied texts" (C3).
3. **It crashes or just stops working.** 99 low-rated (147). "Great ... when it works" is a recurring title (Paste reviews).
4. **Sync breaks and clips get lost.** 85 low-rated (171). "I lost all my clippings." (A18); Mac version fine, "Syncing with iOS Version Doesn't Work At All" (A19).
5. **Ads.** 78 low-rated (141). "It's a clipboard, not a billboard" (A17).
6. **Typing the same thing over and over.** 236 reviews use the phrasing (all apps); on X it is the hook of every Text Replacement tip. "Stop typing your email address over and over." (C16); "Still typing the same work messages from scratch" (C20).
7. **The app doesn't save what I copy unless I open it.** 45 low-rated (76). "You literally have to open the app EVERYTIME you copy something." (A10); "I don't have to open the app each time" (A11). This is the iOS rule biting rivals that promise history.
8. **"Allow Paste" pop-ups and keyboard swapping.** 41 low-rated (72), plus B1. "Keeps asking 'Allow Paste' every time" (A12); "copy, swap keyboards, swap back" (A13).

Runners-up: Full Access and privacy worry, 34 low-rated (A20, "listens to every thing you copy"); free-tier item caps, 19; macOS Spotlight's history forgets after 8 hours, "Lunacy." (D5, D6).

## 3. Is the Android-switcher angle real?

**Verdict: real, specific, but small. Use it as one recurring angle, not the main message.**

- **How many.** App Store: 27 of 6,285 reviews mention Android, Samsung, Pixel or Gboard-on-Android together with clipboard, copy or paste; about 16 of those are switchers saying they miss the clipboard (A1-A9, A30). X: in a "clipboard history" iphone android search, about 10 organic posts make the Android comparison (C1-C9, C26, C27). Forums: MacRumors and BudgetLightForum each have one clear case (B1, B2). One big 2020 MacRumors "what do you miss from Android" thread has zero clipboard mentions (B4): widgets and home screen come first.
- **How upvoted.** Modest. Best organic posts: 45 likes / 11,171 views (C26), 40 / 5,311 (C2), 31 / 7,890 (C3), 16 / 8,060 (C1). Nothing viral. The viral iPhone-vs-Android posts are about the keyboard as a whole (C10: 1,910 likes / 203,131 views).
- **What exactly they miss.** Samsung users miss "the clipboard" (a panel of recent copies). Pixel/Gboard users miss **pinned** items (A6, C1: a Cal.com booking link pinned "at all times"). Gboard on Android deletes unpinned clips after one hour (D1, D2), so the part they depended on for weeks was the **pinned list**, which is exactly what Cutling keeps on iPhone. That is the honest bridge: "Your pinned clips, on iPhone", not "your clipboard history, on iPhone".
- **What they end up using.** SwiftKey (A4; but "allow paste" every time, B1), Clipboard - Paste Keyboard (A1, A2, A3), Paste Keyboard (A5, A8), Gboard for iOS, which has no clipboard and is seen as abandoned (A7, B1), and Apple Shortcuts, which one switcher tried and gave up on (A5). Several conclude it is "still not ideal or like Android" (A8).
- **The twin angle that is fully honest:** Windows users on a Mac miss Win+V (C28), and the Mac's built-in Spotlight history forgets after 8 hours by default (D4-D6). On the Mac, Cutling does keep a full history, so "clipboard history" can be said plainly there.
- **Watch out:** iOS 27 (shipped September 2026) puts a one-tap "paste from [app]" button above the keyboard for the last copied item (B3). Do not say pasting on iPhone is clumsy; say iPhone keeps only the last thing you copied.

## 4. What people actually paste again and again

From the 2,513 clipboard-app reviews (A34), the Text Replacement tips on X (C13-C24) and the switcher posts:

1. **Email address.** The single most common item in X tips (C16, C17, C19; "email addy" C15). Reviews: 13.
2. **Replies to the same questions** (sales, marketplace sellers, customer messages). Reviews: 63 mention replies/responses/messages (A23, A24, A27).
3. **Links**: booking link (C1), website links (A24), work links (A25). Reviews: 36.
4. **Home or work address** (A21, A22, A28). Reviews: 13.
5. **Images and screenshots.** Reviews: 56, mostly Mac (Paste). On iPhone this is Text Replacement's known gap (C23).
6. **Code, terminal commands, hex codes, AI prompts** (A25, A26). Reviews: 32 code, 26 prompts. Mostly Mac.
7. **Crypto wallet addresses and X handle** for reply-guys (C13, C14, C15). A distinct, X-native crowd.
8. **Symbols the keyboard lacks** (Naira sign, religious honorific): the biggest Text Replacement posts by far (C22), but it is Text Replacement's job, not a clipboard pitch.
9. **Tracking numbers, phone numbers, names that are hard to spell** (A21, C29): small counts (4, 2).
10. **Bank account details / IBAN: almost never** (A31). The only natural version is "account details" in chats in Nigeria (C26).

## 5. Hooks built from their words

Rules kept: no line says or implies the iPhone app records everything you copy. On iPhone the claim is always "save it once, tap it from the keyboard". Full history is claimed only for the Mac.

### X (5)

1. "Gboard on Android kept your pinned clips. Cutling puts that pinned list on your iPhone keyboard." — rests on D1, D2, A6, C1.
2. "Still typing your email address over and over? Save it once. Tap it from the keyboard. $4.99, once." — rests on C16, C17, C19, A32 ("over and over").
3. "Your iPhone clipboard holds one thing. Keep the stuff you paste every day one tap away." — rests on C5, C6, B3 (one item, even with iOS 27's paste button).
4. "Reply guys: your wallet address and your X handle, one tap from the keyboard. No text-replacement codes to remember." — rests on C13, C14, C15, C23.
5. "Moved from Windows and miss Win+V? Cutling for Mac keeps your clipboard history and skips passwords." — rests on C28, D4-D6, C11 (Mac only; full history is true there).

### TikTok (5, first on-screen line)

1. "Switched from Android? The thing you'll miss is the clipboard. Here's the fix." (video shows saving with "add from clipboard", then tapping it from the keyboard) — rests on A1-A5, C26, C27, D1.
2. "Stop typing your address into every delivery app." — rests on A21, A22, A28.
3. "POV: you answer the same question 40 times a day." (saved replies) — rests on A23, A24, A27.
4. "iPhone hidden feature: Text Replacement. Text only, though. For whole replies and links, I use this." — rests on C18, C22, C23.
5. "A clipboard app you pay for once. No subscription." — rests on A14, A15, A16, A33, D8.

Lines kept out on purpose: "never lose anything you copy on iPhone" and "your clipboard history on iPhone" (iOS forbids it, A10, A11); "bank details" (A31); "pasting on iPhone is hard" (iOS 27, B3).
