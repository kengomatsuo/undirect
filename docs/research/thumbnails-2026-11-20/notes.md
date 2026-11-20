# Thumbnail research for Cutling and Undirect, fetched 2026-11-20

Brief: studio-tune owner ask 3 (the current thumbnails, a film frame with a caption line, are "lazy"). Goal: three distinct styles per video, A/B tested.

Method: YouTube search result pages and channel pages read in Claude in Chrome (own tab, closed at the end). Page zoomed to 50 percent and screenshotted for the grids (`grids/`). Each example's thumbnail file is the image YouTube serves at i.ytimg.com/vi/<id>, the same file the grid shows (one file per example, `*.jpg` in this folder). Video ids, titles, view counts and ages come from the result pages. Contact sheets for quick viewing are in `sheets/` (not examples). Guide pages are saved as text and html in `sources/`.

Limits, stated plainly:
- View counts are the only performance signal available. Click-through rate of other channels is private, so "strong" means high views for the topic plus a clear structure, not proven CTR.
- Nothing here came from a comparison or review site. The three guides below are the vendors' own pages (vidIQ, TubeBuddy, Thumbnail Test); YouTube Help is the platform's own.
- AdGuard, 1Blocker, Wipr and Maccy have no useful own video channel on YouTube (the AdGuard handle returned one 17-year-old clip, the 1Blocker handle returned nothing). Their visuals are therefore seen only through third-party review thumbnails (u02, u04, u05, c10). UNSURE whether they publish elsewhere.
- Hex values of the two brand colours were not looked up; recipes name them "brand green" and "brand red".
- No domain guide in ~/.claude/skills/domain-guides matches this subject (ERP, offline sync, Indonesian business, integrity, email law), so no guide rows to report.
- Not downloaded or edited: nothing outside this folder was touched, no video was changed.

## 1. Platform and guide sources (read in full, saved)

| # | URL | saved file | what to take |
|---|-----|-----------|--------------|
| 1 | https://support.google.com/youtube/answer/72431?hl=en | `sources/yt-help-72431.txt` (html beside it) | Upload 3840x2160 for videos and 2160x3840 for Shorts, min width 640, 16:9 for videos and 9:16 for Shorts; 2 MB limit on mobile upload, 50 MB on desktop. A vertical video with a 16:9 custom thumbnail is replaced by an auto-generated 4:5 crop on home, explore and subscriptions, so a Short needs its own 9:16 file. Custom Shorts thumbnails can only be added in Studio on a computer. Page carries no date; fetched 2026-11-20. |
| 2 | https://support.google.com/youtube/answer/13861714?hl=en | `sources/yt-help-thumbnail-test.txt` (html beside it) | Test and Compare: up to 3 thumbnails or titles per video, winner by watch-time share, desktop only, needs advanced features. Shorts, Premieres and scheduled lives cannot be tested, so the three styles for Shorts cannot be A/B tested natively and must be rotated by hand. Under 720p every variant is downscaled to 480p. Tell variants apart strongly or the test runs long. Fetched 2026-11-20, no page date. |
| 3 | https://vidiq.com/blog/post/youtube-thumbnail-design-tips/ | `sources/vidiq-design-tips.txt` (html beside it) | Updated 14 Jul 2026. 500 breakout videos: 69 percent show a face (80 percent of the top 50), 56 percent high-contrast colour, 89 percent a face or high contrast. Median overlay text 5 words, advice 3 to 5. Only about 1 in 20 used an exaggerated expression. One focal point, 1 or 2 arrows or circles at most, heavy sans font with stroke or block, keep text out of the lower-right duration badge, keep key items off the edges, change one thing per variant. |
| 4 | https://vidiq.com/blog/post/types-youtube-thumbnails/ | `sources/vidiq-thumbnail-styles.txt` (html beside it) | Updated 26 Jun 2026, reviewed 8 Oct 2026. Twelve formats; the ones that fit these apps: burning question, before-and-after, versus, tutorial/how-to, featured product, stat. Basis for recipes B and C. |
| 5 | https://www.tubebuddy.com/blog/11-youtube-thumbnail-tips-from-big-creators/ | `sources/tubebuddy-11-tips.txt` (html beside it) | Published 18 Dec 2024, modified 18 Sep 2026. Before on the left and after on the right, never swapped. Use a phone or camera photo, not a video frame (the source of the current thumbnails). Minimal text that supports the title. 45 percent of viewing is on TV, so check legibility at both sizes. Consistent fonts, colours and logo across a series. Do not bait. |
| 6 | https://thumbnailtest.com/guides/youtube-thumbnail-layout/ | `sources/thumbnailtest-layout.txt` (html beside it) | Updated 12 Jan 2026. Layout checklist: simple background, short large text, branding, composition, a subtle call to action. The vendor sells A/B testing, so treat its testing advice as promotion; the layout list is generic. |

## 2. Examples (thumbnail file per row; views as shown on the page on 2026-11-20)

Clipboard managers, keyboards and Mac utilities (competitors and their reviewers)

| # | URL | saved file | what to take |
|---|-----|-----------|--------------|
| 7 | https://www.youtube.com/watch?v=2j1x68LOic4 | `c01-raycast-keyboard-ios-2j1x68LOic4.jpg` | Raycast Primary Keyboard for iOS, 268K in 3 weeks, the closest rival to Cutling. Black frame, dark keyboard photographed close, one cyan Return key as the only colour, zero words. Object close-up in the brand's own accent. Recipe C. |
| 8 | https://www.youtube.com/watch?v=LIJLTKVXv38 | `c02-raycast-clipboard-history-LIJLTKVXv38.jpg` | Raycast Clipboard History, 4.5K. Glass tile with orange clipboard icon centred on black, no words. Same family as c01 but only 4.5K: icon-only without a hook did not draw views. |
| 9 | https://www.youtube.com/watch?v=dOzTzVtg5lk | `c03-raycast-master-clipboard-dOzTzVtg5lk.jpg` | Raycast Master Clipboard History, 21K. Giant glowing clipboard glyph, no words. The one glowing object fills most of the frame and reads at small size. Recipe C. |
| 10 | https://www.youtube.com/watch?v=2prqkC5Vpf4 | `c04-paste-intelligent-clipboard-2prqkC5Vpf4.jpg` | Paste (the Mac clipboard app) own channel, 16K. Pale grey, a two-line black title at left, orange gradient panel with UI cards at right. A template: every Paste thumbnail is the same, so the series is recognisable but flat. |
| 11 | https://www.youtube.com/watch?v=JOoqwj3zx5U | `c05-paste-power-search-JOoqwj3zx5U.jpg` | Paste Power Search, 28K. Same template, two words. Shows the template holds 2 to 3 words. |
| 12 | https://www.youtube.com/watch?v=mJ7xo3DyqmU | `c06-paste-mcp-mJ7xo3DyqmU.jpg` | Paste MCP, 25K. Same template, two words. |
| 13 | https://www.youtube.com/watch?v=528JdoB7K_4 | `c07-bproductive-paste-review-528JdoB7K_4.jpg` | Be Productive review of Paste, 11K. Mint background, black caps "BEST CLIPBOARD APP!" with CLIPBOARD on a white block, MacBook with the app panel below. Keyword highlighted on a block. |
| 14 | https://www.youtube.com/watch?v=Lx1eqYXK3ek | `c08-techsimplify-find-clipboard-Lx1eqYXK3ek.jpg` | TechSimplify, 49K. Flat cyan, small "How To Find", the word Clipboard white on a black pill, a red curved arrow into a phone dialog. One keyword, one arrow, one phone. Recipe A in its calmest form. |
| 15 | https://www.youtube.com/watch?v=ALbtiJdmJdo | `c09-trevornace-hidden-clipboard-ALbtiJdmJdo.jpg` | Trevor Nace, 15K. Blue gradient, "Hidden Clipboard on iPhone" in four giant black words filling the left half, hand holding a phone with a red arrow, app icon top-left. Cleanest big-pain-text layout in the clipboard niche. Recipe A. |
| 16 | https://www.youtube.com/watch?v=EeGkzeALCzk | `c10-maccy-review-EeGkzeALCzk.jpg` | Maccy review, 19K. Desk photograph of a MacBook, Maccy icon bottom-right, no words. Counter-example: the icon sits where the duration badge lands and nothing says why to click. This is close to what the current thumbnails do. |
| 17 | https://www.youtube.com/watch?v=tcmEgq5eM1Y | `c11-stephenrobles-mac-clipboard-apps-tcmEgq5eM1Y.jpg` | Stephen Robles, 76K. Face with open hands, two floating app icons (Paste, Maccy-like), "Boost Your Mac Productivity!". Face plus app icons, four words, teal. Needs a person; these apps have no face. |
| 18 | https://www.youtube.com/watch?v=UVh8U1OkASI | `c12-setapp-mac-clipboard-history-UVh8U1OkASI.jpg` | Setapp, 164K. Purple background, large Cmd+C keycaps graphic, thinking man, "View clipboard history on Mac", logo top-right. Keycaps as the object: a Cutling key could replace the face. |

Ad blockers, Safari extensions and redirect fixes

| # | URL | saved file | what to take |
|---|-----|-----------|--------------|
| 19 | https://www.youtube.com/watch?v=JBDv5y3Kbm0 | `u01-newesc-block-ads-ios-JBDv5y3Kbm0.jpg` | NewEsc Tech, 489K. Yellow with one big red broken stop-hand sign and "2 MINUTES" in huge red outlined caps. Red stop-hand is an object that carries the topic; red on yellow is the loudest pairing in the niche. Recipes A and C. |
| 20 | https://www.youtube.com/watch?v=yrXRC3COvVU | `u02-slimothy-block-all-ads-yrXRC3COvVU.jpg` | SlimothyTV, 100K. Phone in hand showing three app icons (shield, check, command) beside red italic "BLOCK ALL ADS!" and a YouTube 2026 badge. Shows the apps themselves as rival logos; a Safari extension with no logo of its own risks being lost. |
| 21 | https://www.youtube.com/watch?v=MXfCq6HOGrI | `u03-trevornace-block-ads-iphone-MXfCq6HOGrI.jpg` | Trevor Nace, 57K in 6 days. Dark grey, white Apple logo, "BLOCK ADS" in two giant white words, phone showing a real page full of ads. Two words, thousand-pixel-thick letters, a real ad-laden page as proof. Recipe C. |
| 22 | https://www.youtube.com/watch?v=1FpBjDOTtBk | `u04-stephenrobles-13-safari-ext-1FpBjDOTtBk.jpg` | Stephen Robles, 145K. Smiling face, collage of extension icons around a laptop and phone, no words. Icon collage works for a list video; poor for a single product. |
| 23 | https://www.youtube.com/watch?v=u2mtv5f_LiU | `u05-saunders-block-ads-safari-u2mtv5f_LiU.jpg` | Saunders Tech, 194K. A raw Safari Extensions settings list in a hand, no words. Proof shot: the real settings toggle. Strong views with plain design, because the query itself ("block ads in Safari") carries it. |
| 24 | https://www.youtube.com/watch?v=-iknrxFKHYo | `u06-iprohackr-block-yt-safari-ads-iknrxFKHYo.jpg` | iProHackr, 64K. Grey, "NO ADS!" in black brush caps, phone with a red cross over an ad, YouTube and Safari icons. Red cross over the unwanted thing is a before/after in one frame. |
| 25 | https://www.youtube.com/watch?v=MM-i_3bsNSI | `u07-feanler-redirect-ads-iphone-MM-i_3bsNSI.jpg` | Feanler, 46K. A Settings screenshot, no words, no styling. Counter-example, and on redirect-specific queries it sits beside better thumbnails. |
| 26 | https://www.youtube.com/watch?v=f0dU7zKMk8Y | `u08-earnandlearn-stop-auto-redirect-f0dU7zKMk8Y.jpg` | Earn and Learn, 3.3K. Safari icon in a white card, smiling man, "STOP" white over "REDIRECT" yellow on black, letterboxed. The redirect niche's default: face, Safari icon, STOP. Differentiate away from it. |
| 27 | https://www.youtube.com/watch?v=8AMCwgldsdU | `u09-howtodo-stop-sites-opening-8AMCwgldsdU.jpg` | How To Do It, 12K. Blue sunburst, "STOP WEBSITES OPENING SAFARI" in four white outlined caps lines, phone with a red-crossed Safari icon. Strongest pain-text layout for the redirect topic. Recipe A. |

Tech and iPhone-tips channels

| # | URL | saved file | what to take |
|---|-----|-----------|--------------|
| 28 | https://www.youtube.com/watch?v=KTDJiVpSDTI | `t01-mkbhd-trust-KTDJiVpSDTI.jpg` | MKBHD, 3.4M. Face with hands pressed, no words. Face-led; needs a person, so not for these apps. |
| 29 | https://www.youtube.com/watch?v=g6Die8gVFn0 | `t02-mkbhd-ipad-mini-g6Die8gVFn0.jpg` | MKBHD, 12M. Half-face behind a tilted iPad Mini, no words. The product fills the frame; a phone held up covering half the face. |
| 30 | https://www.youtube.com/watch?v=ESABTN4VtrA | `t03-mkbhd-iphone-duo-review-ESABTN4VtrA.jpg` | MKBHD, 13M. Rim-lit foldable opened like a book under the eyes, saturated blue, no words. Giant single object, dramatic light. Recipe C. |
| 31 | https://www.youtube.com/watch?v=M9sHX0HpYIo | `t04-ijustine-homeview-M9sHX0HpYIo.jpg` | iJustine, 540K. Smiling face left, product held, "HOME VIEW" in two condensed white caps stacked at right. Two words, tall condensed type, a product in her hand. |
| 32 | https://www.youtube.com/watch?v=YPdYDxo3Bqk | `t05-ijustine-iphone-duo-unboxing-YPdYDxo3Bqk.jpg` | iJustine, 536K. Purple, shocked face, phone half-folded, "iPhone DUO" in huge white caps, with the "iPhone" mirrored below. Two words plus the object. |
| 33 | https://www.youtube.com/watch?v=bkLe_da_Q5A | `t06-zollotech-ios-273-end-of-era-bkLe_da_Q5A.jpg` | Zollotech, 272K. Dark, glowing phone centre, "iOS 27.3" on a blue tag left and "End of an Era!" right. Phone as the only object with colour glow, text split left and right. |
| 34 | https://www.youtube.com/watch?v=LrhUa4k73AY | `t07-zollotech-first-things-iphone-duo-LrhUa4k73AY.jpg` | Zollotech, 142K. Foldable seen from the front with home screen full of icons and "Try This First" over the top. Three words over a product shot, no face. |
| 35 | https://www.youtube.com/watch?v=nQaneSzdFVY | `t08-brandonbutch-ios-273-nQaneSzdFVY.jpg` | Brandon Butch, 124K. Smiling face, phone with real home screen, a large "27.3" version badge. Version badge as the one word. |
| 36 | https://www.youtube.com/watch?v=SZqmL1MF5sM | `t09-brandonbutch-homeview-SZqmL1MF5sM.jpg` | Brandon Butch, 119K. The product's clock face glowing in a close crop on a wooden stump, no words. Single object close-up. Recipe C. |
| 37 | https://www.youtube.com/watch?v=lmIO18kLcZU | `t10-mrwhosetheboss-35-hidden-tricks-lmIO18kLcZU.jpg` | Mrwhosetheboss, 8.8M. Split frame: left red with a crossed phone and one fingerprint, right green with a ticked phone and two fingerprints; no words. The strongest before/after in the set, readable at any size. Recipe B. |
| 38 | https://www.youtube.com/watch?v=S7r_ipKQjkA | `t11-mrwhosetheboss-100-tricks-S7r_ipKQjkA.jpg` | Mrwhosetheboss, 7.1M. Split frame: red "LEVEL 1" plain home screen left, green "LEVEL 65" busy phone with a yellow arrow right. Two labels of two words each, red left and green right. Recipe B. |
| 39 | https://www.youtube.com/watch?v=FwNzHZqR5h4 | `t12-brightside-20-hidden-iphone-FwNzHZqR5h4.jpg` | Bright Side, 7.2M. Black, "HIDDEN FEATURES" in white caps at left, hands holding a phone with the Safari bottom bar circled in red. Two words plus one red circle on the exact spot. Recipes A and C. |

Japanese iPhone-tips channels

| # | URL | saved file | what to take |
|---|-----|-----------|--------------|
| 40 | https://www.youtube.com/watch?v=zglk7mvIkiA | `j01-mizuoji-10-iphone-tricks-zglk7mvIkiA.jpg` | Mizu-ojisan, 4.5M. Beige, "iPhone" black plus "隠し技" and a red "10選" in giant type, a hand holding a phone with a red circle and a hand-written red question. Giant kanji in red, 2 words. Japanese pattern: red numerals plus a red circle on the phone. |
| 41 | https://www.youtube.com/watch?v=24-OVVm-EUI | `j02-mizuoji-system-data-24-OVVm-EUI.jpg` | Mizu-ojisan, 2.8M. "今スグ!" in a speech bubble, "消す方法!" in giant red, a red arrow at the highlighted storage bar. The pain word in red, the arrow lands on the phone detail. Recipe A. |
| 42 | https://www.youtube.com/watch?v=_yDfgdYLi8E | `j03-boochoco-iphone-6-tips-_yDfgdYLi8E.jpg` | boo choco, 2.4M. Letterboxed split, left a call screen, right a phone, magenta "2回押すと…" with a yellow arrow and red box on the side button. Before/after teaser built from two screens. Recipe B. |
| 43 | https://www.youtube.com/watch?v=pUSeygfbIjo | `j04-smakin-voice-memo-pUSeygfbIjo.jpg` | Smakin, 2.4M. "96%が知らない" in small black, "声で" and "メモをとる" in huge red and black, a yellow arrow into the phone. A statistic as the hook plus two lines of giant type. Recipe A. |
| 44 | https://www.youtube.com/watch?v=Q95IpOXQFcM | `j05-ikouza-iphone-10-tricks-Q95IpOXQFcM.jpg` | iKouza, 2.1M. Man in sunglasses, "裏技" on a blue bar. Face-led and older; the text is smaller than the others. |

Indonesian iPhone-tips channel

| # | URL | saved file | what to take |
|---|-----|-----------|--------------|
| 45 | https://www.youtube.com/watch?v=ikI9muwHZMw | `i01-haylsworld-iphone16-tips-ikI9muwHZMw.jpg` | Hayls World, 3.3M. Presenter at right, phone at left filling the frame, the model name on the phone, a red arrow, cyan sunburst. Phone as the biggest object, wordless except the model. |
| 46 | https://www.youtube.com/watch?v=kZAVx_iYZpQ | `i02-haylsworld-iphone15-tips-kZAVx_iYZpQ.jpg` | Hayls World, 2.9M. Same layout, lilac background in the phone's colour, hand-drawn arrows, huge "15". One background colour per model: the series is recognisable. |
| 47 | https://www.youtube.com/watch?v=UCtuEsqQBG8 | `i03-haylsworld-iphone13-ios15-UCtuEsqQBG8.jpg` | Hayls World, 2.3M. Same layout in mint. Confirms the colour-per-video series trick; the Indonesian market rewards face plus object. |

Shorts (9:16) and Shorts shelves

| # | URL | saved file | what to take |
|---|-----|-----------|--------------|
| 48 | https://www.youtube.com/shorts/0PXAOIrgyk8 | `s01-short-iphone-tricks-change-life-0PXAOIrgyk8.jpg` | 5.6M. Man holding a phone, one white hand-drawn arrow to it, no words (the file is the 16:9 form with the 9:16 cut in the middle). Arrow plus object. |
| 49 | https://www.youtube.com/shorts/NB95YTEknNo | `s02-short-hidden-iphone-tricks-12-NB95YTEknNo.jpg` | 654K. Fingerprint UI under a finger, orange case, no words. Real UI close-up. |
| 50 | https://www.youtube.com/shorts/jbGEQX-quVs | `s03-short-6-iphone-tricks-jbGEQX-quVs.jpg` | 6.9M. Home screen with a big yellow "#2". One numeral, one phone. |
| 51 | https://www.youtube.com/shorts/YpwGoqs1zjA | `s04-short-camera-trick-YpwGoqs1zjA.jpg` | 15M. Beach sunset photographed through a phone, no words. A photo, not a mock-up. |
| 52 | https://www.youtube.com/shorts/2lFN8ig-Qkc | `s05-short-secret-button-2lFN8ig-Qkc.jpg` | 1.1K, new. Settings screenshot with a white "on" tag. Weak: raw screen, tiny tag. |

Grid screenshots (what the feed looks like around the example; one per query)

| # | URL | saved file | what to take |
|---|-----|-----------|--------------|
| 53 | https://www.youtube.com/results?search_query=iphone+clipboard+manager+keyboard | `grids/g01-search-iphone-clipboard-keyboard-shorts-shelf.jpg` | Shorts shelf for the Cutling query: phone mock-ups with a small top caption in white on dark ("I have added text", "How to Find Clipboard on iPhone" on a black bar). Captions are small and in the top third. First result is c08. |
| 54 | https://www.youtube.com/results?search_query=iphone+clipboard+manager+keyboard | `grids/g02-search-iphone-clipboard-first-result-techsimplify.jpg` | Full-size TechSimplify result (c08) at 16:9 beside its title and a 1:10 duration badge, which covers the lower-right corner. |
| 55 | https://www.youtube.com/results?search_query=iphone+tips+shorts | `grids/g03-search-iphone-tips-shorts-shelf.jpg` | Shorts shelf for iPhone tips: face-plus-phone, UI close-ups, a numeral. Almost no text. |
| 56 | https://www.youtube.com/results?search_query=block+ads+safari+iphone+extension | `grids/g04-search-block-ads-safari-iphone-extension.jpg` | The ad-blocker list view: BLOCK ADS white-on-dark, NO ADS with red cross, face collage. Red, white and black dominate; a red-led thumbnail is the norm there, so Undirect's red will not stand out by colour alone. |
| 57 | https://www.youtube.com/results?search_query=mac+clipboard+manager+best | `grids/g05-search-mac-clipboard-manager-best.jpg` | Mac clipboard list: Paste-style panels, a "BEST CLIPBOARD MANAGER" caps title, a cat mascot for Copycat, orange/blue app glow. Green is unused in this feed, so Cutling's brand green is free for contrast. |
| 58 | https://www.youtube.com/results?search_query=safari+popup+redirect+iphone+stop | `grids/g06-search-safari-popup-redirect-iphone-stop.jpg` | The redirect list: purple FREE SPINS cards in the Shorts shelf, a man's face with "STOP SITE REDIRECTION", "BLOCK REDIRECTS" and "STOP REDIRECT" faces. The FREE SPINS card art in the shelf looks like our own current style; UNSURE whose upload it is. The niche is full of face-plus-STOP, so a face-free split or object stands apart. |
| 59 | https://www.youtube.com/results?search_query=iPhone+%E3%82%AF%E3%83%AA%E3%83%83%E3%83%97%E3%83%9C%E3%83%BC%E3%83%89+%E4%BE%BF%E5%88%A9 | `grids/g07-search-ja-iphone-clipboard.jpg` | Japanese clipboard list: yellow and white captions on phone screenshots, red icons, text in the top third. Japanese thumbnails carry more characters than English (8 to 14). |
| 60 | https://www.youtube.com/results?search_query=cara+atasi+safari+iphone+iklan+pop+up+redirect | `grids/g08-search-id-safari-iklan-popup-redirect.jpg` | Indonesian redirect list: purple FREE SPINS cards twice in the Shorts shelf, other results are plain settings screenshots and a cartoon card. Little competition on thumbnail craft in Indonesian. |

## 3. What the examples show

1. The loudest videos in these niches put two to four words in giant heavy type on one side and one object on the other (c09, u03, u09, j02, j04, t04, t12). Words are 2 to 4 in English and Indonesian, 6 to 12 characters in Japanese.
2. The widest-viewed tech thumbnails are wordless or near-wordless and rely on one object (t02, t03, t09, c01, s04). That works for MKBHD-scale audiences; for a small channel a short word still helps.
3. Split frames with red on one side and green on the other pull the highest views in the iPhone-tips set (t10, t11, j03). TubeBuddy's rule: before left, after right.
4. Competitor apps use no faces: Raycast and Paste use an object or UI card on a flat dark or pale ground. Reviewers add a face.
5. Raw settings screenshots and a desk photo with a logo in the corner (u05, u07, c10) are the weak or lazy end; u05 survives only on query demand.
6. The redirect niche shows the same layout again and again: face, Safari icon, STOP (u08, g06). The Undirect redirect topic has almost no split or object thumbnails.
7. Shorts thumbnails are mostly a phone or a hand and at most one numeral or tag. Text is small at the top.
8. YouTube's own tool cannot A/B test Shorts (row 2), and a 16:9 file on a Short is replaced by an auto 4:5 crop on home (row 1).

## 4. Three recipes

Sizes: a long-form thumbnail is built at 1920x1080 (shown at 168x94 in a small feed row, a scale of 11.4); a Short at 1080x1920 (shown about 168x299, a scale of 6.4). Targets below are for the type's cap height, which is the height of a capital letter, and are design targets from the guides' "legible at phone size" advice, not measurements from the examples. A letter below about 12 px tall at 168 px wide is unreadable.

### Recipe 1: Pain line (big words, a drawn mark, a phone)

Sources: c08, c09, u09, u01, u02, j02, j04, j01, t12.

- Layout, 16:9: words fill the left 55 percent in 2 or 3 stacked lines; the phone fills the right 45 percent, tilted 6 to 10 degrees, showing the real problem screen; one arrow or one circle (never two) lands on the exact spot. No face. A reaction element that is not a face: the red cross or stop sign of u01/u06.
- Layout, 9:16: words in the top 35 percent at 3 lines maximum; the phone below, full width; the arrow or circle on the screen detail. Keep the lowest 12 percent clear.
- Words: 3 (English and Indonesian), 6 to 10 characters (Japanese). Cutling "One tap pastes it", in Indonesian "Tempel sekali tap", in Japanese "ワンタップで貼る". Undirect "Stop fake tabs", Indonesian "Stop tab palsu", Japanese "勝手に開くを止める".
- Type: heavy sans, cap height 22 px or more at 168 px wide (250 px at 1920 wide; 140 px at 1080 wide for Shorts). White or near-white with a 6 to 8 px dark stroke, or black on a light block.
- Colour: Cutling, brand green slab behind the words and a dark phone, white text. Undirect, brand red on the stop-hand or the circle and on one keyword, near-black background so the red is the only warm colour; the scam page on the phone stays muted so it does not compete with the brand red.

### Recipe 2: Split proof (before and after, two halves)

Sources: t10, t11, j03, u06; vidIQ and TubeBuddy rows 4 and 5.

- Layout, 16:9: a hard vertical split down the middle, before on the left and after on the right, never swapped. Same phone or same screen on both sides. A one-word label per side, or none. A single mark per side (cross left, tick right).
- Layout, 9:16: a horizontal split, before on top and after at the bottom.
- Words: 0 to 2 per side, 4 at most in total. Cutling "By hand" / "One tap". Undirect "Hijacked" / "Blocked" (English), "Dibajak" / "Aman" (Indonesian), "乗っ取り" / "ブロック" (Japanese).
- Type: cap height 20 px or more at 168 px wide per label.
- Colour: the "after" half carries the brand colour. Cutling: before in grey with a keyboard typing digits by hand, after with a brand-green keyboard and the number filled in. Undirect: before with the purple FREE SPINS page desaturated, after the same page cleared with a brand-red shield or a red "blocked" badge. Red is the brand here, so do not use red as the "bad" side; use the scam page's own colours for bad.

### Recipe 3: One giant object (a close-up with at most three words)

Sources: c01, c03, t03, t09, t07, u03, u01, t02.

- Layout, 16:9: a single object cropped so it fills 60 to 70 percent of the frame, off-centre, on a flat or very dark ground with a rim light; words at most three, in one corner away from the lower right. Cutling: the keyboard from the phone with the saved-text bar and one brand-green key, or a giant clipboard glyph. Undirect: a giant brand-red stop-hand or shield over a half-open fake tab.
- Layout, 9:16: the object centred and full width, words (or none) in the top third.
- Words: 0 to 3. Cutling "Paste faster" or none. Undirect "No redirects" or "BLOCK". Japanese 4 to 6 characters, Indonesian 2 words.
- Type: if used, cap height 25 px or more at 168 px wide (285 px at 1920 wide); otherwise none.
- Colour: the object is the only saturated item. Cutling brand green glow against near-black. Undirect brand red against near-black or white. Green is not used by any clipboard competitor in g05, and red is common in g04, so Undirect should use a red object on a non-red ground rather than red text on red.

## 5. For the A/B test

- Native test (row 2) takes up to 3 thumbnails per long video, desktop, advanced features on. That fits the three recipes exactly; they differ in kind, which the help page says shortens the test.
- Shorts cannot be tested natively. Upload each style for a fixed window (for example 7 days each) at the same posting time and compare, or accept that a Short gets one style. UNSURE whether the Studio rules change; row 2 was read on 2026-11-20.
- Upload long-form at 1280x720 or larger (guides say 2 MB under 1280x720 mobile limit; the platform recommends 3840x2160), Shorts at 2160x3840 from a computer.
- The three styles per video in each of en, id and ja means words must be rewritten per language, not translated; keep Japanese in 6 to 10 characters.
