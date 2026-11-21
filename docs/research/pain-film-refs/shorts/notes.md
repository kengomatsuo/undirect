# Short-form references for the Undirect and Cutling films

Collected 2026-11-21 with `yt-dlp` (YouTube Shorts, public TikTok profiles) and `ffmpeg`. TikTok Creative Center
top-ads returned "No search results found" to a plain fetch, and Meta Ad Library was not reachable without a
browser, so every reference below is a public organic or boosted post.

Files beside this note:

- `stills/<id>-last.jpg`: the last frame (540 px wide).
- `sheets/<id>-end4s.jpg`: the last 4 s at 4 fps, 8x2 (`ffmpeg -sseof -4 ... fps=4,scale=270:-1,tile=8x2`).
- `sheets/<id>-timeline.jpg`: the whole film at 2 fps, 10 frames per row. Frame *k* (from 0, reading left to right, top to bottom) is at *t = k / 2* s. The Cutling explainer (109 s) is sampled at 1.28 fps.
- `grid/set1.jpg`, `grid/set2.jpg`, `grid/ours3.jpg`: end frames with a 10x10 grid. Each cell is 108 x 192 px of a 1080 x 1920 frame. All pixel positions below were read from these grids.
- `sheets/all-last-frames-gridded.jpg`: all 44 last frames, gridded. The order is alphabetical by id, as in `ls stills`.
- `sheets/switch-on-klip-vs-totaladblock-10fps.jpg`: two switch-on beats at 10 fps. Rows 1-3 are Klip from 6.0 s; rows 4-7 are Total Adblock from 14.5 s.

Cut times come from `ffmpeg select='gt(scene,0.30)'`. Animated or green-screen films often show no cuts at that
threshold, so beat lengths were read off the 2 fps and 10 fps sheets (±0.25 s and ±0.05 s).

Views are what the platform returned on 2026-11-21.

## Platform overlays, for reading the pixel numbers

Measurements by a third party (Manypixels), taken from TikTok's own downloadable templates, at 1080x1920:
- **TikTok standard in-feed:** keep 240 px clear at the top, 660 px at the bottom, and 120 px on each side.
- **TikTok right rail:** like, comment and share sit in a column 180 px wide that rises 1,080 px from the bottom. At 1080 x 1920 that covers x 900-1080, y 840-1920.
- **TikTok with an anchor or a caption:** the bottom reserve grows to 812, 878, 946 or 1,014 px for 1 to 4 caption lines.
- Source: https://www.manypixels.co/blog/social-media-design/tiktok-ad-specs

Meta Reels ads: 14% top (about 269 px), 35% bottom (about 672 px), 6% sides (about 65 px). These numbers come from
third-party readings of Meta's Ads Guide; Meta's help page states the rule in words only. YouTube Shorts: no
sourced number was found this session.

---

## Our own films (for comparison)

### ours-cutling-explainer (liked by the owner)
- **Source:** `~/Repositories/cutling-promo/out/explainer-en-portrait.mp4`, 1080x1920, 109.3 s.
- **End card:** held about 4 s on a near-black background with a soft green glow behind the icon.
  - Icon: 240 px square at x 420-660, y 690-930.
  - "Cutling" title: about y 970-1040.
  - Tagline "Paste without leaving the chat": about y 1095-1140.
  - Nothing sits below y 1140 except the glow.
- Files: `grid/ours3.jpg` (right panel), `sheets/ours-cutling-explainer-end4s.jpg`.

### ours-undirect-adtab (rejected)
- **Source:** `~/Repositories/undirect-promo/out/pain/AdTabEveryTap-v1.mp4`, 13.2 s; scene cut at 2.63 s.
- **End:** the phone dissolves into the end card at about 10.5 s, then holds for about 2.7 s.
  - Icon: 256 px at x 410-666, y 550-806.
  - "Undirect": y 860-960.
  - "$1.99 once": about y 1020-1070, with letters about 48 px tall.
  - "Safari on iPhone, iPad and Mac": y 1130-1165.
  - The whole block runs from y 550 to 1165, which is 32% of the height, and the bottom 755 px are empty.
- Files: `grid/ours3.jpg` (left panel), `sheets/ours-undirect-adtab-end4s.jpg`.

### ours-cutling-address-v3 (rejected)
- **Source:** `~/Repositories/cutling-promo/out/pain/address-v3.mp4`, 19.2 s; cuts at 6.60 s and 15.10 s.
- **Beats:**
  - Typing pain, 0-6.6 s: one phone mock, centred, on a grey background.
  - Switch, 6.6-8.0 s, with a globe zoom.
  - "One tap", 8.0-15.1 s, on flat green.
  - End card, 15.1-19.2 s.
- **End card** (flat green):
  - "CUTLING ON" pill: y 300-350.
  - "$4.99 once.": y 380-470.
  - "iPhone, iPad and Mac.": about y 510.
  - Icon: 532 px at x 184-716, y 600-1140.
  - App Store badge: 248 x 80 at y 1154-1234.
  - Nothing sits below y 1234.
- Files: `grid/ours3.jpg` (middle panel), `sheets/ours-cutling-address-v3-timeline.jpg`.

---

## 1. End screens and the last 3 seconds

### yt-klip-address: Klip, "Never type your address again". Closest competitor; same structure as ours
- **Link:** https://www.youtube.com/watch?v=tyKtvYbZkTs, 82 views (posted 2026-11-04).
- **Length:** 30.0 s, 1080x1920.
- **Beats:**
  - Pain montage, 0-5.0 s: "Typing my address. Again." / "...and again." / "Every. Single. Checkout.", with three phones cut every 0.5 s from 3.5 s.
  - "There's a better way.", 5.0-6.6 s, over a rewind effect.
  - Switch, 6.6-8.6 s (see section 2).
  - "Tap. Tap. Tap.", 10.5-14 s: about 0.5 s per field, each with a green check.
  - "Even the gate code.", 14-17 s: push-in on the field, then confetti on "Place order".
  - "Next shop? 3 seconds.", 17-21 s.
  - "Any form.", 21-24 s.
  - "Saved once. Ready everywhere.", 24-27 s: Mac plus iPhone.
  - End card, 27-30 s.
- **End card** (full-bleed peach-to-lilac gradient, no box):
  - Icon: 312 px at x 384-696, y 514-825.
  - "Klip" wordmark: y 896-1080, about 180 px tall.
  - "Your details, / one tap away.": two lines at y 1123-1285, second line in brand orange.
  - Badge: 432 x 134 at x 324-756, y 1378-1512.
  - "iPhone · iPad · Mac": y 1581.
- **Placement:** the badge and platform line sit inside TikTok's 660 px bottom reserve (y > 1260). The block fills y 514-1581, 56% of the height, and stays left of the right rail.
- **Captions:** two-line, about 70 px type, at y 40-140, above TikTok's 240 px top line.
- Files: `grid/set1.jpg` (panel 1), `sheets/yt-klip-address-timeline.jpg`, `sheets/yt-klip-address-end4s.jpg`, `stills/yt-klip-address-last.jpg`.

### yt-grammarly-cover: Grammarly, "Get that cover letter right"
- **Link:** https://www.youtube.com/shorts/G4dSAzJRdJI, 518k views.
- **Length:** 59.2 s.
- **Beats:**
  - Creator talking to camera, 0-14.5 s.
  - Full-screen product recording, 14.5-23 s.
  - Creator again, to 55 s.
  - End card, 55-59 s.
- **End card** (white):
  - Logo mark: 164 px at x 458-622, y 497-659.
  - "grammarly.com": x 238-838, y 702-778.
  - "Works where you write": y 875.
  - Row of seven app icons at y about 1000, spanning x 76-1015, so it runs under the TikTok right rail.
  - Nothing below y 1015.
- Files: `grid/set1.jpg` (panel 2), `sheets/yt-grammarly-cover-timeline.jpg`, `stills/yt-grammarly-cover-last.jpg`.

### yt-apple-17e: Apple, "iPhone 17e. A whole lot of storage."
- **Link:** https://www.youtube.com/watch?v=WJxDLtYwVsk, 341k views.
- **Length:** 11.5 s.
- **Beats:**
  - Hamster gag, 0-7 s.
  - Phone drops into frame, 7.5-8.5 s.
  - "iPhone 17e" in the centre of the frame, 8.5-10 s.
  - Apple logo glows on the phone's back, 10-11.5 s.
- **End:** a full-bleed photo with no card. The logo is 152 px at x 464-616, y 842-1026, dead centre.
- Files: `grid/set1.jpg` (panel 3), `sheets/yt-apple-17e-timeline.jpg`.

### yt-paste-find and yt-paste-meet: Paste (clipboard app)
- **Links:** https://www.youtube.com/watch?v=6H7WUD-zMkE (365 views), https://www.youtube.com/watch?v=316nPqpqMMs (251 views).
- **Length:** 23.7 s and 28.1 s.
- **Layout:** a static headline sits at the top the whole time; subtitles are pill captions at about y 470; there is no end card.
- **Last frame of yt-paste-find:**
  - Headline "Find anything you ever copied": y 356-540.
  - Product image: edge to edge, x 22-1058, y 626-1318.
- These are low-effort and low-reach, kept as the counter-example.
- Files: `grid/set1.jpg` (panel 4), `sheets/yt-paste-meet-timeline.jpg`.

### tt-ddg-sunglasses: DuckDuckGo, "Our sunglasses don't spy on you"
- **Link:** https://www.tiktok.com/@duckduckgo/video/7668741317207330062, 1.1M views.
- **Length:** 9.7 s; cuts at 5.21 s and 7.84 s.
- **Beats:**
  - Deadpan talking head, 0-5.2 s.
  - Product macro on kinetic type, 5.2-7.8 s.
  - Logo, 7.8-9.7 s.
- **End:**
  - Chrome logo: 793 px wide, 73% of the frame, at x 140-933, y 557-1350.
  - Caption "from DuckDuckGo.": y 1469-1534, inside TikTok's bottom reserve.
- Files: `grid/set2.jpg` (panel 1), `stills/tt-ddg-sunglasses-last.jpg`.

### tt-calai-fastest: Cal AI, "The fastest way to count calories"
- **Link:** https://www.tiktok.com/@calai.app/video/7475920092623047979, 261k views.
- **Length:** 15.4 s.
- **Beats:**
  - Hook, 0-2.5 s: "The FASTEST Calorie Tracker" over a plate.
  - "1) Scan your food", 2.5-5 s.
  - "2) Get the macros", 5-8.5 s.
  - "3) Edit if necessary", 8.5-13 s.
  - "Download Cal AI right now", 13-15.4 s.
- **Camera:** a real hand holds a real iPhone in a real kitchen; the thumb does the presses.
- **End:** no card; the film ends in the scene.
  - Caption box: white, x 136-944, y 216-454.
  - Phone in hand: x 410-918, y 557-1447.
- Files: `grid/set2.jpg` (panel 2), `sheets/tt-calai-fastest-timeline.jpg`.

### tt-totaladblock-drowning: Total Adblock, "Mindfulness meltdown"
- **Link:** https://www.tiktok.com/@totaladblock/video/7408185574693162273, 8.3k views.
- **Length:** 29.2 s.
- **End:** no card; the creator is back in the calm scene.
  - Logo sticker: a white box, x 108-968, y 259-410.
  - Price caption "only cost me 1.99": y 1091-1242, just above TikTok's bottom reserve.
- The switch-on beat is in section 2.
- Files: `grid/set2.jpg` (panel 3), `sheets/tt-totaladblock-drowning-timeline.jpg`.

### yt-apple-pay: Apple, "How to pay in store with Apple Pay"
- **Link:** https://www.youtube.com/watch?v=EKB8_OeWGDo, 275k views.
- **Length:** 16.1 s.
- **Beats:**
  - Title, 0-2.5 s.
  - Recap, 10-14 s: three full-width bands, "Double click." / "Tap." / "Done.", each with an icon at the right edge (x about 930-1040).
  - Logo, 14.3-16.1 s.
- **End:** the Apple Pay logo is 540 px wide at x 270-810, y 853-1069, centred on white.
- Files: `grid/set2.jpg` (panel 4), `sheets/yt-apple-pay-timeline.jpg`.

### yt-apple-safari-privacy: Apple, "Privacy on iPhone: Safari helps block data trackers"
- **Link:** https://www.youtube.com/watch?v=Spb-ka7xrR8, 13.2M views.
- **Length:** 65.1 s. This is a 1920x1440 master, not vertical, but it is the most-viewed Safari-blocking film found.
- **End sequence:**
  - "Safari. A browser that's actually private.": 52.5-55 s, as small white type over the scene, centred.
  - "Privacy. That's iPhone.": 56-58 s.
  - Verizon: 58-59 s.
  - Apple logo: 59-65 s, small and centred over a full-bleed burst.
- Files: `sheets/yt-apple-safari-privacy-timeline.jpg`, `stills/yt-apple-safari-privacy-last.jpg`.

### tt-brave-blocks: Brave, "A browser that blocks ads and tracking"
- **Link:** https://www.tiktok.com/@brave/video/7616011325621243150, 1.2M views.
- **Length:** 14.0 s, 1080x1080.
- **Beats:** rival logos get a "MOGGED" stamp every 0.5 s, from 0 to 7.4 s, cut to the beat at 0.07-0.6 s intervals. Then come close-up textures of the Brave lion, 7.4-14 s.
- **End:** the logo fills the whole square, which is x 0-1080, y 420-1500 in a 9:16 frame.
- Files: `sheets/tt-brave-blocks-timeline.jpg`.

### Other end frames (positions from `sheets/all-last-frames-gridded.jpg`, ±30 px)
- **tt-textexpander-claude** (https://www.tiktok.com/@textexpander/video/7617880895374069005, 1.1k views): talking head.
  - Caption "and give TextExpander a 30 day free trial": y about 1445-1535.
  - URL in a full-width orange bar: y about 1620-1770, deep inside the bottom reserve.
- **yt-abp-2026** (https://www.youtube.com/watch?v=u4t5NUF8ELk, 1.4k views): no card.
  - Title: y about 196-386.
  - Label list: y about 1195-1534.
- **tt-structured-keynote** (https://www.tiktok.com/@structured.app/video/7649417658676333857, 551k views): green-screen creator over keynote footage. Caption at y about 310-490, "WWDC 26" in the centre, no card.
- **yt-apple-cash, yt-apple-downtime, yt-apple-id** (3.8M, 2.7M, 3.9M views): they end on a full-bleed UI screenshot, with the presenter cut out and standing in the bottom 45% (y about 1060-1920). There is no logo card.
- **tt-onesec-nyc** (https://www.tiktok.com/@one_sec_app/video/7389199073745620257, 123k views): after the App Store page is shown (21.5-23.5 s), the film loops back to the opening crosswalk-button macro. No card.

**What the end frames add up to.** Of 41 references:
- **Designed card (6):** Klip, Grammarly, Apple Pay, Apple 17e, DuckDuckGo and Brave end on a designed card. In all six the mark is big: 29-80% of the frame width. Ours runs 22-49%: 240 px is 22%, 256 px is 24% and 532 px is 49%.
- **No card (the rest):** they end inside the scene, with a logo sticker or a caption over live footage.
- **Under the overlays:**
  - The text that runs lowest is the price, platform or CTA line: Klip 1581, DuckDuckGo 1534, TextExpander 1770.
  - The highest-placed logo sticker is Total Adblock at 259.
- Files: `sheets/all-last-frames-gridded.jpg`, `grid/set1.jpg`, `grid/set2.jpg`.

---

## 2. The "turn it on / use it" beat

| Ref | Beat | Length | How the press is shown | Still |
|---|---|---|---|---|
| yt-klip-address | Field tapped (6.8 s), keyboard up (6.9), push-in with motion blur (7.3), ring on globe (7.5), menu (7.7), pick Klip (8.2), blur, pinboard in (8.6) | **2.0 s** | Grey ring under the finger point, a 0.1 s camera push-in, menu held 0.5 s | `sheets/switch-on-klip-vs-totaladblock-10fps.jpg` rows 1-3 |
| tt-totaladblock-drowning | Whip-blur cut (15.1), thumb on power button with red ripple (15.3-15.7), "0% Updating" (15.9), "16%" (about 17), whip-blur (17.5), "Ad Blocking is ON" (18.0) | **2.7 s** press to ON | A real thumb on a real phone, held in a hand. A whip-pan cuts out the progress wait. The voiceover runs over it | same sheet, rows 4-7; `sheets/tt-totaladblock-drowning-timeline.jpg` |
| tt-totaladblock-links | Popup "Paused" to "ON": orange shield turns green | **1.5 s** | No finger; the colour change is the event | `sheets/tt-totaladblock-links-timeline.jpg`, frames 45-47 |
| tt-totaladblock-nightmare | Full-screen "Ad Blocking is ON" UI | **1.0 s** | No press; a cutaway to the state | `sheets/tt-totaladblock-nightmare-timeline.jpg`, frames 52-53 |
| yt-apple-pay | Double-click side button, then Face ID, then Tap, then a check | **2.0 / 1.5 / 1.5 / 1.5 s** | Animated ring on the side button; the phone glows on "Tap" | `sheets/yt-apple-pay-timeline.jpg` |
| yt-apple-translate (5.2M views, https://www.youtube.com/shorts/iHULL6iy9Vg) | Side-button press opens Visual Intelligence; red circle on "Translate" (16.5-17.5 s); translated menu (17.5 s) | **1.0 s** press to result | Red outline ring around the button the finger will hit | `sheets/yt-apple-translate-timeline.jpg` |
| yt-apple-cash (3.8M, https://www.youtube.com/shorts/eaRRXk7CzWM) | "+" ring 0.5 s; amount counts $1, $3, $30 over 1.5 s; red box on Request 1.0 s; send ring 0.5 s | **0.5-1.5 s per step** | Red ring or box, then the result | `sheets/yt-apple-cash-timeline.jpg` |
| yt-apple-id (3.9M, https://www.youtube.com/shorts/Nv5kDGhn46g) | Ring on Wallet 0.5 s, ring on "Driver's License" row 1.5 s | **0.5-1.5 s** | Red ring | `sheets/yt-apple-id-timeline.jpg`, frames 14, 21-23 |
| yt-apple-safari-privacy | Thumb taps the Safari icon in macro (49-50 s), then trackers burst off (50-52 s) | **1.0 s** tap + **2 s** payoff | Real thumb, close macro, then a physical burst | `sheets/yt-apple-safari-privacy-timeline.jpg`, frames 98-103 |
| tt-calai-busy (300k, https://www.tiktok.com/@calai.app/video/7482403221856587054) | Shutter tap to macros screen | **about 2.0 s** (2.5-4.5 s) | Real thumb | `sheets/tt-calai-busy-timeline.jpg` |
| yt-lina-hashtags (https://www.youtube.com/shorts/ZbJezqyyV-o) | Camera pushes from medium shot to macro (5-8.5 s); typed "hh" expands into hashtags (8.5-10 s) | **1.5 s** expansion | Real hand, macro push-in, whip-spin transition into a screen recording | `sheets/yt-lina-hashtags-timeline.jpg` |
| ours (owner's note) | Undirect switch-on | 4.5 s now, about 1 s before | | owner feedback |

**Measured range for a press-to-result beat:** 1.0-2.7 s. The median of the eight branded beats is 1.5-2.0 s. Every
beat over 1.5 s either moves the camera (a push-in or whip) or shows progress; none holds a static UI for 4 s.

---

## 3. Keyboard, clipboard and text-replacement shorts

| Ref | Link, views | Length | What makes typing versus one tap feel fast | Still |
|---|---|---|---|---|
| yt-klip-address | https://www.youtube.com/watch?v=tyKtvYbZkTs, 82 | 30.0 s | Big two-line headline per beat with the key word in brand colour ("Tap. Tap. Tap." builds one word per tap, 0.5 s each). Push-in on the keyboard and on single fields. Confetti on "Place order". Timer claim "Next shop? 3 seconds." | `sheets/yt-klip-address-timeline.jpg` |
| yt-lina-hashtags | https://www.youtube.com/shorts/ZbJezqyyV-o, 235 | 39.8 s | Talking head to a real phone in hand, then a slow push-in to macro on the keys. The expansion lands in macro. A whip-spin cuts to the Settings recording. Word-by-word captions with purple highlight at about y 120-260 | `sheets/yt-lina-hashtags-timeline.jpg` |
| tt-kevin-copypaste | https://www.tiktok.com/@kevinstratvert/video/7382993145077812526, 17.5k | 44.1 s | The pain is shown as fast 0.5 s cuts of manual copy and paste with a yellow cursor highlight. The payoff "pastes all of it" fills a whole sheet at once. Red-highlight word captions at about y 1530 | `sheets/tt-kevin-copypaste-timeline.jpg` |
| tt-kevin-jotform | https://www.tiktok.com/@kevinstratvert/video/7620601192816626958, 157k | 30.9 s | "I'll just type one sentence and..." The form builds itself in about 2 s inside a laptop mock on a cyan background, alternating with the talking head every 2-4 s | `sheets/tt-kevin-jotform-timeline.jpg` |
| yt-grammarly-cover | https://www.youtube.com/shorts/G4dSAzJRdJI, 518k | 59.2 s | Creator's story first; 8.5 s of full-screen product in the middle; no split screen | `sheets/yt-grammarly-cover-timeline.jpg` |
| tt-grammarly-card | https://www.tiktok.com/@grammarlyofficial/video/7585329567372479799, 225k | 12.4 s | No app at all: overhead hands address an envelope with a marker. The writing tip is the joke | `sheets/tt-grammarly-card-timeline.jpg` |
| tt-iphonetricks-kb | https://www.tiktok.com/@iphonetricks/video/7058315367218711810, 979 | 24.5 s | 20 s of a teaser shot of the phone's back, then a 4 s screen recording. A low-effort counter-example | `sheets/tt-iphonetricks-kb-timeline.jpg` |
| tt-raycast-quicklinks | https://www.tiktok.com/@raycastapp/video/7349208467720195334, 1.5k | 60.1 s | Screen recording with about 2 s cuts | `sheets/tt-raycast-quicklinks-timeline.jpg` |
| tt-paste-copy, tt-paste-safari | https://www.tiktok.com/@pasteapp/video/7706901919289167107 (257), https://www.tiktok.com/@pasteapp/video/7706904762104515862 (266) | 34.9 s, 23.7 s | Static screen-recording explainers; low reach | `sheets/tt-paste-copy-timeline.jpg` |
| yt-email-fast | https://www.youtube.com/watch?v=e-tCcijVuC8, 55k | 98.5 s, landscape | A classic how-to for text replacement of an email address; long and slow | `sheets/yt-email-fast-timeline.jpg` |
| yt-textrepl-best | https://www.youtube.com/shorts/ojKPHA3sON0, 57 | 59.1 s | Screen recording only | `sheets/yt-textrepl-best-timeline.jpg` |

YouTube search for high-view text-replacement and autofill Shorts found nothing over 1k views in the Shorts filter.
The high-view hits (175k for "How To Change Autofill Address On iPhone") are 1-3 minute landscape how-tos. **Across
these references, the keyboard films that reach people show a real hand on a real phone, or the creator, not a
mock on a flat colour** (Cal AI, Lina, Total Adblock, one sec, Apple tips).

---

## 4. Ad-blocker and privacy shorts: how the pain beats vary

| Ref | Link, views | Length | How the pain is shown | Still |
|---|---|---|---|---|
| tt-totaladblock-nightmare | https://www.tiktok.com/@totaladblock/video/7408149385491549473, 7.9k | 40.7 s | Series "Living in Ad Disturbia #1": a cook on a recipe site. The pain escalates by number: "15 second ad", then "30 second unskippable ad", then "another ad", each separated by a 1.0 s black time-skip card ("15 Seconds later..", "30 Seconds later..", "An eternity later.."). "15 minute recipe, 30 minutes longer". Product 1.0 s, then "1.99" | `sheets/tt-totaladblock-nightmare-timeline.jpg` |
| tt-totaladblock-links | https://www.tiktok.com/@totaladblock/video/7410338323849317664, 3.6k | 22.4 s | "#3": hunting fake download buttons. Repeated attempts every 0.5-1.0 s ("Ah must be this one", "No, fake link!", "This one? No", "Has to be this one! No") with rising frustration (hand to forehead). Payoff: walks away with the laptop | `sheets/tt-totaladblock-links-timeline.jpg` |
| tt-totaladblock-drowning | https://www.tiktok.com/@totaladblock/video/7408185574693162273, 8.3k | 29.2 s | Meditation interrupted by the creator playing the ad itself ("CLICK NOW TO SAVE", "We got car insurance everywhere"), cut every 1.5 s between calm and ad-person | `sheets/tt-totaladblock-drowning-timeline.jpg` |
| yt-apple-safari-privacy | https://www.youtube.com/watch?v=Spb-ka7xrR8, 13.2M | 65.1 s | Trackers as silver-suited people clinging to the user; about 12 locations, each vignette 2-4 s (library, park, museum, dinner, tent, gym, salon, waiting room). One idea, many settings | `sheets/yt-apple-safari-privacy-timeline.jpg` |
| tt-brave-blocks | https://www.tiktok.com/@brave/video/7616011325621243150, 1.2M | 14.0 s | No pain shown: rival browsers "MOGGED" on the beat | `sheets/tt-brave-blocks-timeline.jpg` |
| tt-brave-5s | https://www.tiktok.com/@brave/video/7690676953443011854, 552k | 5.2 s | Meme: a film clip under "Please disable your ad blocker to continue using this site." | `sheets/tt-brave-5s-timeline.jpg` |
| yt-abp-2026, yt-abp-work, yt-abp-crying | https://www.youtube.com/watch?v=u4t5NUF8ELk (1.4k), https://www.youtube.com/watch?v=8XwmVyjxiUE (1.8k), https://www.youtube.com/watch?v=C6NxR2WsME0 (1.8k) | 12.0 / 7.5 / 15.0 s | One-joke POV skits. "Without" versus "with": the same staircase shot with the labels swapped (getting scammed / tracked / annoying ads, then trackers blocked / ads blocked). No product UI | `sheets/yt-abp-2026-timeline.jpg`, `sheets/yt-abp-work-timeline.jpg` |
| yt-block-ads-ios | https://www.youtube.com/watch?v=JBDv5y3Kbm0, 489k | 96.0 s, landscape | Overhead real phone on a bright yellow mat with props; real game ads ("Get Bonus!") pop up under a real finger; ends with a before-and-after | `sheets/yt-block-ads-ios-timeline.jpg` |
| tt-ghostery-stop | https://www.tiktok.com/@ghostery/video/7597394707676810499, 1.1k | 45.2 s | Offline metaphor for data tracking; low reach | `sheets/tt-ghostery-stop-timeline.jpg` |

Three Brave carousels (https://www.tiktok.com/@brave/video/7633871885159222542 910k,
https://www.tiktok.com/@brave/video/7603074501433167118 647k, https://www.tiktok.com/@brave/video/7662837097044167950
51k) are photo slideshows; only their audio downloaded, so they are not measured.

---

## Other references (the turn-on beat and hooks)

- **tt-onesec-nyc** (https://www.tiktok.com/@one_sec_app/video/7389199073745620257, 123k, 29.0 s):
  - **Metaphor:** a crosswalk "wait" button; a creator in the street.
  - **Product:** a real phone in hand in macro, 8-21 s, with one-word captions at y about 1500 (inside TikTok's bottom reserve).
  - **App Store page:** shown on a real phone, 21.5-23.5 s.
  - **Ending:** loops back to the opening shot.
  - Files: `sheets/tt-onesec-nyc-timeline.jpg`.
- **tt-opal-propaganda** (https://www.tiktok.com/@opal/video/7564773002391342358, 954k, 9.9 s):
  - The first frame (0-0.33 s) is a hand holding a phone showing Opal's block screen.
  - Then aesthetic b-roll cuts every 0.25-0.35 s under a static centred text list (y about 780-1140).
  - No card.
  - Files: `sheets/tt-opal-propaganda-timeline.jpg`.
- **tt-opal-sign** (https://www.tiktok.com/@opal/video/7565894283702570262, 125k, 13.2 s): physical props (app-icon tiles under a hand), then a laptop playing a fireplace. Files: `sheets/tt-opal-sign-timeline.jpg`.
- **tt-structured-ai** (https://www.tiktok.com/@structured.app/video/7631158324603538721, 21k, 15.6 s). Files: `sheets/tt-structured-ai-timeline.jpg`.
- **tt-onesec-productive** (https://www.tiktok.com/@one_sec_app/video/7268716903852461345, 24k, 10.4 s): creator skit, ends on hands with the product. Files: `sheets/tt-onesec-productive-timeline.jpg`.
- **yt-apple-downtime** (https://www.youtube.com/shorts/HGp005A-2mM, 2.7M, 18.9 s): same Apple-tip format as Cash and ID. Files: `sheets/yt-apple-downtime-timeline.jpg`.

---

## What to build

### 1. Switch-on beat: 2.0 s, never more than 2.5 s
- **Measured:** branded beats run 1.0-2.7 s from press to result, with a median of 1.5-2.0 s.
  - Klip: 2.0 s (`sheets/switch-on-klip-vs-totaladblock-10fps.jpg`).
  - Total Adblock: 2.7 s, with a whip-pan hiding the wait (same sheet).
  - Apple Pay: 2.0 s per step (`sheets/yt-apple-pay-timeline.jpg`).
  - Apple Translate: 1.0 s (`sheets/yt-apple-translate-timeline.jpg`).
  - Ours is 4.5 s now; the earlier 1 s was right for a cutaway but too short for a press.
- **Build it as:**
  - 0.0-0.3 s: the finger lands, with a 0.15 s camera push-in (motion blur) onto the toolbar or keyboard.
  - 0.3-0.7 s: a press ring under the finger (Apple Translate's and Cash's red ring; Klip's grey ring).
  - 0.7-1.0 s: the state flips with a colour change from off to on (Total Adblock's orange-to-green shield, `sheets/tt-totaladblock-links-timeline.jpg`).
  - 1.0-2.0 s: hold on the on-state while the first payoff starts. That is the blocked tab for Undirect, or the address landing for Cutling.
  - Cut out on the move, not after a still hold.

### 2. End-screen composition at 1080x1920
- **Background:** full-bleed scene or gradient to every edge, never a box.
  - Klip uses a gradient (`grid/set1.jpg`).
  - Apple 17e and Total Adblock use live footage (`grid/set1.jpg`, `grid/set2.jpg`).
  - Ending inside the last scene, with the phone still in hand, is what most of the high-view references do (`sheets/all-last-frames-gridded.jpg`).
- **Icon:** 300-380 px, centred at x 540, with its top at y 480-520. Klip is 312 px at y 514-825 (`grid/set1.jpg`). This is larger than our 240-256 px (`grid/ours3.jpg`). The 532 px icon in address-v3 is too big beside a 248 px badge.
- **Name:** 150-180 px wordmark at y 880-1080 (Klip: y 896-1080).
- **Line under the name** (benefit or price): two lines at y 1120-1290, about 70 px type, with the key word in the brand colour (Klip's "one tap away.", `grid/set1.jpg`).
  - Price: "$1.99 once" or "$4.99 once" sits here at 70-80 px.
  - Total Adblock shows its price as a 70 px caption at y 1091-1242 (`grid/set2.jpg`). Ours is 48 px (`grid/ours3.jpg`).
- **App Store badge:** about 430 x 134 px, centred, y 1370-1510 (Klip: 432 x 134 at y 1378-1512, `grid/set1.jpg`).
- **Platform line:** "iPhone · iPad · Mac" at 32-36 px, y 1570-1590 (Klip, `grid/set1.jpg`).
- **What may run under the overlays:**
  - **Bottom reserve** (TikTok y > 1260; Reels about y > 1248): the badge, the platform line and background. A secondary caption may also go here, as in DuckDuckGo (y 1469-1534, `grid/set2.jpg`) and TextExpander (URL bar y 1620-1770, `sheets/all-last-frames-gridded.jpg`). Never the name or the price.
  - **Right rail** (x 900-1080, y 840-1920): background and decorative edges only. Grammarly runs icons under it (`grid/set1.jpg`).
  - **Top 240 px:** a caption may sit at y 40-140, as Klip's does (`sheets/yt-klip-address-timeline.jpg`). Keep the logo sticker below y 250 (Total Adblock 259-410, `grid/set2.jpg`).
- **Length of hold:** 2.5-3.0 s.
  - Klip holds 3 s (`sheets/yt-klip-address-end4s.jpg`).
  - DuckDuckGo holds 1.9 s and Apple Pay 1.8 s (`grid/set2.jpg`).
  - Ours holds about 2.7-4 s.

### 3. Three Cutling film ideas
1. **"The race", in split screen. Two real hands, one per half.**
   - **Layout:** top half (y 0-960) types an address by hand on a real iPhone at true speed, with a typo and an autocorrect fix. Bottom half (y 960-1920) taps one Cutling chip.
   - **Timers:** big counters run in each half, "0:14" versus "0:01". Klip's "Next shop? 3 seconds." is the timer claim (`sheets/yt-klip-address-timeline.jpg`).
   - **Escalation:** "Order 1 / Order 2 / Order 3" with 0.8 s black time-skip cards between them. Total Adblock's "15 seconds later.." cards set the pattern (`sheets/tt-totaladblock-nightmare-timeline.jpg`).
   - **Finish:** a stacked three-band recap in Apple Pay's style ("Hold globe. / Tap. / Done.") (`sheets/yt-apple-pay-timeline.jpg`).
2. **"Macro push-in", with a real phone in a real place.**
   - **Shooting:** hand-held, as Cal AI and one sec are (`sheets/tt-calai-fastest-timeline.jpg`, `sheets/tt-onesec-nyc-timeline.jpg`), at a café counter at checkout.
   - **Camera:** pushes from a medium shot to a macro on the keyboard as the thumb taps the "Home address" chip.
   - **Speed ramp:** the address lands with a 0.3 s ramp and a soft tick sound.
   - **Transitions:** whip-spin from Messages to Safari checkout to Mail, as in Lina's whip-spin and Total Adblock's whip-blur (`sheets/yt-lina-hashtags-timeline.jpg`, `sheets/switch-on-klip-vs-totaladblock-10fps.jpg`).
   - **Ending:** stay in the scene, with a logo sticker at the top and "$4.99 once" at y 1100-1240 (`grid/set2.jpg`).
3. **"Every. Single. Form.", a rhythm montage with a physical joke.**
   - **Cold open:** overhead hands write an address on an envelope with a marker, as in Grammarly's 225k envelope post (`sheets/tt-grammarly-card-timeline.jpg`). Then cut to a phone asking for the same address.
   - **Montage:** six forms (delivery, visa, gym sign-up, landlord email, bank, school), each filled with one tap, cut on the beat every 0.4-0.5 s. Opal cuts every 0.3 s (`sheets/tt-opal-propaganda-timeline.jpg`); Klip at 0.5 s (`sheets/yt-klip-address-timeline.jpg`).
   - **Counter:** "6 forms. 6 taps."
   - **Finish:** the Mac and iPad pick up the same snippet (Klip's "Saved once. Ready everywhere." beat, `sheets/yt-klip-address-timeline.jpg`).
   - **Warning:** Klip already ships this exact structure: pain montage, "There's a better way", switch, "Tap. Tap. Tap.", device lineup, then a card. Cutling's film has to differ by using real hands and real places, not phone mocks on a gradient.

### 4. How ad-blocker shorts vary the pain, applied to Undirect
- **Same idea, a new setting each beat:** Apple's trackers follow people through about 12 places, 2-4 s each (`sheets/yt-apple-safari-privacy-timeline.jpg`). For Undirect, the same tap hijack lands on:
  - a recipe "Jump to recipe" button;
  - a streaming site's play button;
  - a news article's close-X;
  - a download page.
- **Escalation by number:** Total Adblock goes 15 s, 30 s, "an eternity", with 1.0 s black time-skip cards (`sheets/tt-totaladblock-nightmare-timeline.jpg`). For Undirect: "Tap 1: new tab. Tap 2: App Store. Tap 3: casino."
- **Repeated attempts:** Total Adblock's "This one? No, fake link!", one attempt every 0.5-1.0 s (`sheets/tt-totaladblock-links-timeline.jpg`). For Undirect: the thumb tries the real button three times and gets thrown elsewhere each time.
- **Personify the offender:** Total Adblock's creator plays the ad (`sheets/tt-totaladblock-drowning-timeline.jpg`); Apple's trackers wear silver suits (`sheets/yt-apple-safari-privacy-timeline.jpg`).
- **Without versus with, same shot:** Adblock Plus repeats one shot and swaps the labels (`sheets/yt-abp-2026-timeline.jpg`).
- **Payoff after the switch:** the same tap now stays on the page. Hold 1.0 s on the page staying put, then end in the scene with the logo sticker and "$1.99 once".
