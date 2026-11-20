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
