# Pain posts, rewritten from the buyer's side (ASG76)

Each post opens on the moment the buyer is in, in the words they used on Reddit and in App Store reviews (row numbers point at docs/research/undirect-voice-of-customer.md as U# and ../cutling/docs/research/cutling-voice-of-customer.md as C-rank). The product comes last, in one line. Claims hold for what ships today: Undirect 1.0.4 judges a trip by the tap before it, so posts about redirects with no tap wait for 1.0.5.

Platform versions and hashtags are filled in from docs/research/social-formats-2026.md once it lands.

## Undirect

| # | Pain (their words) | Hook | Body | Close |
|---|---|---|---|---|
| UA | "every click you make it opens up a separate tab with some ad" (U28), "opened 50 million tabs" (U3) | Chapter 41. You tap Next. A casino opens. You close it, tap Next again. A crypto site. | That's not you being clumsy. The page puts an invisible layer over the button so your tap goes to an ad first. | Undirect sends the tap to the button you meant. Safari on iPhone, iPad and Mac, $1.99 once. |
| UB | "I have an ad blocker and still get redirected" (U25, U31, U42) | You paid for an ad blocker. Every tap on the stream still opens a new tab. | Ad blockers hide ads. The tab that opens when you tap play isn't an ad they can see, it's the page taking your tap. | Undirect only does that part, so keep your blocker and run both. |
| UC | "Block Pop-ups" is on (U12) | Settings, Safari, Block Pop-ups: on. And the tabs keep coming. | Safari lets a tab through when it thinks you asked for it, and a page can make any tap look like you asked. | Undirect checks where you actually tapped. |
| UD | "Safari opening seemingly random tabs on its own? ... super freaked out" (U27), "does my iPhone have a virus" (U2) | Your iPhone doesn't have a virus. | The "iPhone at risk" page came from the website you were on. Close the tab, don't install or pay for anything it pushes, and you're fine. | When a tap set it off, Undirect stops it opening at all. |
| UE | "The ad opens in a new tab ... repeat 7 times" (U10) | Count how many times you closed an ad tab tonight just to watch one episode. | (poll on X: 0 / 1-5 / 6-20 / I stopped counting) | Reply with Undirect link under the poll, not in it. |
| UF | fake close button: "will still open another tab when clicking to close them" (U44) | You hit the X on the ad. Another ad opens. | The X is part of the ad. | With Undirect on that site, the X stays a close button. |
| UG | Feature-flag workaround: "Verify window.open user gesture" (U12, U39) | Someone on Reddit told you to turn on a hidden Safari developer flag to stop redirect tabs. | It half works and it's buried in Advanced, Feature Flags. | Undirect does the same job with one toolbar press per site. |
| UH | subscription blockers: "$40 for the year" then ads came back | $40 a year to block ads, and the redirect tabs still get through. | | Undirect: $1.99 once, no account, nothing leaves your device. |
| UI (1.0.5 only) | "keeps redirecting me to a scam page without me clicking" (U23), "go back 5 pages" (U7, U47) | Scrolling a recipe. No tap. The page jumps to "Your iPhone is infected". You press Back and it's still there. | | Undirect 1.0.5 keeps you on the recipe, and Back goes back. |

## Cutling

| # | Pain (their words) | Hook | Body | Close |
|---|---|---|---|---|
| CA | "type out the same info over and over" (C rank 5), kept in Notes | "Can you send me your account number?" Open Notes. Scroll. Copy. Back to the chat. Paste. Fix the space you copied. | Every week. | Save it once in Cutling and tap it in from the keyboard in any app. |
| CB | subscription for a clipboard app (C rank 1, 19 people) | $29.99 a year. For a clipboard. | | Cutling is $4.99 once, for iPhone, iPad and Mac. |
| CC | keyboard Full Access fear (C rank 4): "are all third party keyboards keystroke loggers" | Would you let a keyboard app hold your bank details? Fair question. | Cutling's keyboard has no network, no account, no analytics. The App Store label says Data Not Collected. It looks at the word before the cursor to suggest a cutling, on the phone, and sends nothing anywhere (KeyboardViewController.swift reads documentContextBeforeInput; no URLSession in the keyboard). | |
| CD | Text Replacement not syncing (C rank 7) | Your Text Replacements were on your iPhone. Then an update. Now they're on neither. | | Cutlings sync through your own iCloud, iPhone, iPad and Mac, and hold whole paragraphs and images. |
| CE | Paying twice (C rank 10) | Bought the Mac clipboard app. Found out the iPhone one is another purchase. | | Cutling is one purchase for all three. |
| CF | Passwords in clipboard history (C rank 8) | Scroll your Mac clipboard history. Count the passwords in it. | | Cutling's history skips anything your password manager marks as concealed. |
| CG | Checkout forms | Fifth checkout this week. Street, flat number, postcode, phone, by thumb. | | One tap from the Cutling keyboard fills the lot. |
| CH | Customer replies (canned responses, C A5) | You sell on Instagram. "Is this still available?" "Where do you ship?" "How do I pay?" Forty times a day. | | Save each answer once and tap it in. |
| CI (fill-ins release only) | "do you support variables in the snippets" (R21), "ability to add custom variables" (A7) | "Hi Sarah, your Pro order ships Nov 24." You typed one word of that. | Write the reply once with a blank for the name and one for the plan; the date fills itself. On iPhone the Cutling keyboard stops at each blank and you type the name with your own keyboard. On a Mac, ⇧⌘V opens a small form with a preview. | Paid once, no subscription. Media: ~/Downloads/cutling-fill-ins/cutling-fill-ins-clip.mp4 and the iPhone and Mac stills beside it. |

CI goes out only once web/_generator/live.py LIVE_FEATURES["fill-ins"] is True (release day) and the owner says go. Do not use the line "Cutling's keyboard never reads your typing": KeyboardViewController.swift reads the word before the cursor (documentContextBeforeInput) to suggest cutlings. Say instead that the blank is typed with your own keyboard and nothing leaves the phone.

## Per-platform versions (rules from docs/research/social-formats-2026.md)

X: no hashtags, no link in the post (Buffer: link posts on free accounts suppressed); the link goes in our own first reply. Threads: topic Tech Threads, end on a question, link in a reply. Instagram: hook on the cover or slide 1, pain in the first 125 characters, 5 tags. TikTok: pain on screen in 3 s, search phrase said and shown, 3-5 tags, hand-held or screen recording.

### UA Undirect, the ad tab on every tap
- X: Chapter 41. You tap Next. A casino opens. Close it, tap Next again. Crypto site.\n\nThat's not your thumb. The page lays an invisible layer over the button so your tap goes to an ad first.\n\nI built a Safari extension that sends the tap where you meant it. (reply: Undirect, $1.99 once, iPhone, iPad and Mac + link)
- Threads (Tech Threads): same opening, ends "How many ad tabs did you close last night?" Link in a reply.
- Instagram carousel, 5 slides: 1 "Tap Next. Casino." 2 "Close it. Tap Next. Crypto site." 3 "It's not you. There's an invisible layer over the button." 4 screen recording frames: tap with Undirect on, chapter turns. 5 "Undirect. Safari, iPhone, iPad, Mac. $1.99 once." Tags #iphonetips #iphonehacks #safari #adblock #iosapps
- TikTok 12 s: on screen "ad tabs opening by themselves in Safari?" (0-3 s, phone in hand on a reading page, tap opens ad); "it's an invisible layer over the button" (3-6 s); Undirect on, same tap turns the page (6-12 s). Caption: how to stop Safari opening ad tabs every time you tap. #iphonetips #iphonehacks #popupads #techtok

### UB Undirect, "I already have an ad blocker"
- X: You paid for an ad blocker. Every tap on the stream still opens a new tab.\n\nBlockers hide ads. The tab that opens when you press play isn't an ad they can see. It's the page taking your tap.\n\nThat part is all Undirect does, so keep your blocker and run both. (reply: link)
- Threads: same, ends "Which blocker are you using, and does it stop the tabs?"
- TikTok stitch: stitch a creator saying Block Pop-ups or an ad blocker "doesn't work", then 6 s screen recording of Undirect stopping the tab. Caption: ad blocker on and Safari still opens new tabs. #iphonetips #popupads #techtok

### UD Undirect, "does my iPhone have a virus"
- X: Your iPhone doesn't have a virus.\n\nThat "iPhone at risk" page came from the website you were on. Close the tab. Don't install or pay for anything it asks for. Your phone is fine.\n\nSend this to the person in your family who panics at these. (no app line; reply with Undirect for the tap-triggered ones)
- Instagram carousel, made to be sent: 1 "Got this? Your iPhone is fine." (blurred fake page) 2 "It's the website, not your phone." 3 "Close the tab." 4 "Don't install, call or pay anything it shows." 5 "When a tap set it off, Undirect stops it opening." Tags #iphonetips #iphonehacks #safari #scamawareness #iosapps
- Threads: same, ends "Has someone in your family fallen for one of these?"

### UF Undirect, the fake X
- X: You hit the X on the ad. Another ad opens.\n\nThe X was part of the ad.\n\nWith Undirect on for that site, the X stays a close button. (reply: link)
- TikTok 8 s: tap the X, ad opens (0-3 s, "the X on the ad is also an ad"), Undirect on, tap X, ad closes. #iphonetips #popupads #techtok

### CA Cutling, "send me your account number"
- X: "Can you send me your account number?"\n\nOpen Notes. Scroll. Copy. Back to the chat. Paste. Delete the space you copied with it.\n\nEvery week. So I made a keyboard that types it in one tap. (reply: Cutling, $4.99 once, iPhone, iPad, Mac + link)
- Threads: same, ends "What do you retype the most?"
- Instagram Reel 10 s, cover text "Stop digging in Notes for your account number": Notes shuffle (0-4 s), Cutling keyboard tap (4-8 s). Tags #iphonetips #textreplacement #productivityapps #iosapps #macapps
- TikTok: "your iPhone can type your account number for you" did-you-know screen recording, search phrase "save account number on iPhone keyboard". #iphonetips #iphonehacks #textreplacement #techtok

### CB Cutling, the subscription
- X: $29.99 a year. For a clipboard.\n\nI'd rather pay once. So Cutling is $4.99, one purchase for iPhone, iPad and Mac, no account. (reply: link) (#buildinpublic allowed: maker story)
- Threads: same, ends "Which app subscription annoys you most?"

### CC Cutling, would you trust a keyboard with your bank details
- X: Would you let a keyboard app hold your bank details? Fair question, and you should ask it.\n\nCutling's keyboard has no network code, no account, no analytics. The App Store label says Data Not Collected. It looks at the word before the cursor to suggest a saved item, on the phone, and nothing leaves it.
- Threads: same, ends "What would you need to see before trusting one?"

### CH Cutling, the Instagram seller
- Instagram Reel 12 s, cover "40 DMs. Same 3 questions.": DM comes in "still available?", tap, answer in; "where do you ship?", tap; "how do I pay?", tap. Caption opens "Answering the same 3 DMs all day?" Tags #smallbusinesstips #iphonetips #productivityapps #iosapps #textreplacement
- TikTok: same clip, said aloud "how I answer the same DMs in one tap". #smallbusiness #iphonetips #techtok
- Threads: "Selling on Instagram: what's the question you answer 40 times a day?" Link in reply.
