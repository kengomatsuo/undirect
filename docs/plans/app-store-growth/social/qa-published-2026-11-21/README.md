# Published @monholt / @monholtco posts inside each platform's UI (ASG140)

Audit made 2026-11-22 WIB, after the owner watched the TikToks and said the words are covered and faded by the top and bottom shadow. The 2026-11-21 QA checked end cards only; this one measures every frame.

## Result

- **30 of 44 published posts should be hidden** by the rule below: every Cutling film on every platform except Threads, and the 2026-11-20 Undirect film everywhere except Threads.
- **OK (14):** the five Threads videos (Threads draws no scrim, only a mute chip), the 2026-11-18 Undirect film in English and Indonesian on TikTok, Instagram and YouTube (six posts; its "safe" layout keeps the words in the middle box, at the cost of a small picture), and the three debut photo posts.
- The worst films are the 2026-11-20 Cutling cuts (green2): 74-80% of frames have text under a band, 29-38% have large text there. The Notes screen runs from the top bar to the caption, so the note lines the film is about sit in the shadow most of the time.
- The 2026-11-20 Undirect cut (fix) puts "YOU WON!", the 7 7 7 reel and the end card ("Undirect / Stop pages taking your click") in the bottom band: 23-26% of frames, the end card included.
- Nothing was changed on any platform. Hiding or archiving waits for the owner.

Verdict rule: **hide** when large text (40 px or taller on 1080x1920: subtitles, headlines and the phone's note lines) is under a covered or gradient band in 5% or more of frames, or in the last 3 seconds; otherwise **OK**. "Any text" also counts small UI text such as keyboard keys and status bars.

## Table

| Platform | Posted | Post | URL | Frames with any text covered | Frames with subtitle/headline-size text covered | Worst moment | Verdict | Sheet |
|---|---|---|---|---|---|---|---|---|
| TikTok | 2026-11-18 | Cutling film, en | https://www.tiktok.com/@monholt/video/7709459196093189377 | 58% | 10% | 0:11.5 "birthday ideas for Ana," under the caption and its bottom gradient | **hide** | [cut-talent-en--tiktok](sheets/cut-talent-en--tiktok.jpg) |
| TikTok | 2026-11-18 | Cutling film, id | https://www.tiktok.com/@monholt/video/7709462782848027912 | 56% | 10% | 0:20.5 "kado buat Ana: lilin? atau" under the caption and its bottom gradient | **hide** | [cut-talent-id--tiktok](sheets/cut-talent-id--tiktok.jpg) |
| TikTok | 2026-11-18 | Cutling film, ja | https://www.tiktok.com/@monholt/video/7709465283420884230 | 57% | 9% | 0:22.0 "キャンドル？それか本" under the caption and its bottom gradient | **hide** | [cut-talent-ja--tiktok](sheets/cut-talent-ja--tiktok.jpg) |
| TikTok | 2026-11-18 | Undirect film, en | https://www.tiktok.com/@monholt/video/7709525552813706502 | 6% | 4% | 0:05.0 "7|7|7" under the caption and its bottom gradient | **OK** | [und-safe-en--tiktok](sheets/und-safe-en--tiktok.jpg) |
| TikTok | 2026-11-18 | Undirect film, id | https://www.tiktok.com/@monholt/video/7709526816582683905 | 4% | 2% | 0:06.5 "7|Z|7" under the caption and its bottom gradient | **OK** | [und-safe-id--tiktok](sheets/und-safe-id--tiktok.jpg) |
| TikTok | 2026-11-20 | Cutling film, en | https://www.tiktok.com/@monholt/video/7710225334066613524 | 78% | 29% | 0:13.5 "swift COBADEFF if asked" under the caption and its bottom gradient | **hide** | [cut-green2-en--tiktok](sheets/cut-green2-en--tiktok.jpg) |
| TikTok | 2026-11-20 | Cutling film, id | https://www.tiktok.com/@monholt/video/7710226143017815302 | 80% | 33% | 0:22.0 "jumat, bilang ibu kos soal" under the caption and its bottom gradient; "Tempel" under the right rail | **hide** | [cut-green2-id--tiktok](sheets/cut-green2-id--tiktok.jpg) |
| TikTok | 2026-11-20 | Cutling film, ja | https://www.tiktok.com/@monholt/video/7710233816341728532 | 80% | 38% | 0:21.5 "キャンドル？それか本" under the caption and its bottom gradient; "ペースト" under the right rail | **hide** | [cut-green2-ja--tiktok](sheets/cut-green2-ja--tiktok.jpg) |
| TikTok | 2026-11-20 | Undirect film, en | https://www.tiktok.com/@monholt/video/7710227289488821525 | 30% | 26% | 0:05.0 "7|7|7" under the caption and its bottom gradient | **hide** | [und-fix-en--tiktok](sheets/und-fix-en--tiktok.jpg) |
| TikTok | 2026-11-20 | Undirect film, id | https://www.tiktok.com/@monholt/video/7710228322042662164 | 26% | 24% | 0:06.0 "7|7|7" under the caption and its bottom gradient | **hide** | [und-fix-id--tiktok](sheets/und-fix-id--tiktok.jpg) |
| Instagram Reel | 2026-11-18 | Cutling film, en | https://www.instagram.com/monholtco/reel/Df4zPvsnCdh/ | 62% | 11% | 0:15.5 "birthday ideas for Ana," under the caption and its bottom gradient | **hide** | [cut-talent-en--reels](sheets/cut-talent-en--reels.jpg) |
| Instagram Reel | 2026-11-18 | Cutling film, id | https://www.instagram.com/monholtco/reel/Df4zm8Ik7E9/ | 61% | 11% | 0:14.5 "kado buat Ana: lilin? atau" under the caption and its bottom gradient | **hide** | [cut-talent-id--reels](sheets/cut-talent-id--reels.jpg) |
| Instagram Reel | 2026-11-18 | Cutling film, ja | https://www.instagram.com/monholtco/reel/Df4z6OCACov/ | 58% | 11% | 0:22.0 "キャンドル？それか本" under the caption and its bottom gradient | **hide** | [cut-talent-ja--reels](sheets/cut-talent-ja--reels.jpg) |
| Instagram Reel | 2026-11-18 | Undirect film, en | https://www.instagram.com/monholtco/reel/Df4yeh5kXV_/ | 5% | 3% | 0:05.0 "7|7|7" under the caption and its bottom gradient | **OK** | [und-safe-en--reels](sheets/und-safe-en--reels.jpg) |
| Instagram Reel | 2026-11-18 | Undirect film, id | https://www.instagram.com/monholtco/reel/Df4y8Nhjdee/ | 4% | 2% | 0:06.5 "7|Z|7" under the caption and its bottom gradient | **OK** | [und-safe-id--reels](sheets/und-safe-id--reels.jpg) |
| Instagram Reel | 2026-11-20 | Cutling film, en | https://www.instagram.com/monholtco/reel/Df9oYa0ET_k/ | 77% | 29% | 0:13.5 "swift COBADEFF if asked" under the caption and its bottom gradient | **hide** | [cut-green2-en--reels](sheets/cut-green2-en--reels.jpg) |
| Instagram Reel | 2026-11-20 | Cutling film, id | https://www.instagram.com/monholtco/reel/Df9o4xzFFpu/ | 74% | 32% | 0:22.0 "jumat, bilang ibu kos soal" under the caption and its bottom gradient | **hide** | [cut-green2-id--reels](sheets/cut-green2-id--reels.jpg) |
| Instagram Reel | 2026-11-20 | Cutling film, ja | https://www.instagram.com/monholtco/reel/Df9sCRZDsLY/ | 75% | 36% | 0:20.0 "キャンドル？それか本" under the caption and its bottom gradient | **hide** | [cut-green2-ja--reels](sheets/cut-green2-ja--reels.jpg) |
| Instagram Reel | 2026-11-20 | Undirect film, en | https://www.instagram.com/monholtco/reel/Df9p_JXATfk/ | 28% | 25% | 0:05.0 "7|7|7" under the caption and its bottom gradient | **hide** | [und-fix-en--reels](sheets/und-fix-en--reels.jpg) |
| Instagram Reel | 2026-11-20 | Undirect film, id | https://www.instagram.com/monholtco/reel/Df9qdGOkzIs/ | 26% | 23% | 0:06.0 "7|7|7" under the caption and its bottom gradient | **hide** | [und-fix-id--reels](sheets/und-fix-id--reels.jpg) |
| Facebook Reel | 2026-11-20 | Cutling film, en | https://www.facebook.com/reel/1184833024131920 | 77% | 29% | 0:13.5 "swift COBADEFF if asked" under the caption and its bottom gradient | **hide** | [cut-green2-en--reels](sheets/cut-green2-en--reels.jpg) |
| Facebook Reel | 2026-11-20 | Cutling film, id | https://www.facebook.com/reel/1696643515409100 | 74% | 32% | 0:22.0 "jumat, bilang ibu kos soal" under the caption and its bottom gradient | **hide** | [cut-green2-id--reels](sheets/cut-green2-id--reels.jpg) |
| Facebook Reel | 2026-11-20 | Cutling film, ja | https://www.facebook.com/reel/1662848915533004 | 75% | 36% | 0:20.0 "キャンドル？それか本" under the caption and its bottom gradient | **hide** | [cut-green2-ja--reels](sheets/cut-green2-ja--reels.jpg) |
| Facebook Reel | 2026-11-20 | Undirect film, en | https://www.facebook.com/reel/1122685347224385 | 28% | 25% | 0:05.0 "7|7|7" under the caption and its bottom gradient | **hide** | [und-fix-en--reels](sheets/und-fix-en--reels.jpg) |
| Facebook Reel | 2026-11-20 | Undirect film, id | https://www.facebook.com/reel/2642573382845866 | 26% | 23% | 0:06.0 "7|7|7" under the caption and its bottom gradient | **hide** | [und-fix-id--reels](sheets/und-fix-id--reels.jpg) |
| Threads | 2026-11-20 | Cutling film, en | https://www.threads.com/@monholtco/post/Df9n8KKk3J1 | 0% | 0% | nothing covered | **OK** | [cut-green2-en--threads](sheets/cut-green2-en--threads.jpg) |
| Threads | 2026-11-20 | Cutling film, id | https://www.threads.com/@monholtco/post/Df9oYWRky_O | 0% | 0% | nothing covered | **OK** | [cut-green2-id--threads](sheets/cut-green2-id--threads.jpg) |
| Threads | 2026-11-20 | Cutling film, ja | https://www.threads.com/@monholtco/post/Df9rogWk0OY | 0% | 0% | nothing covered | **OK** | [cut-green2-ja--threads](sheets/cut-green2-ja--threads.jpg) |
| Threads | 2026-11-20 | Undirect film, en | https://www.threads.com/@monholtco/post/Df9o4FDk-TT | 0% | 0% | nothing covered | **OK** | [und-fix-en--threads](sheets/und-fix-en--threads.jpg) |
| Threads | 2026-11-20 | Undirect film, id | https://www.threads.com/@monholtco/post/Df9pTsTkyEV | 0% | 0% | nothing covered | **OK** | [und-fix-id--threads](sheets/und-fix-id--threads.jpg) |
| YouTube Short | 2026-11-20 | Cutling film, en (green2) | https://youtube.com/shorts/2fqy53bWT9M | 80% | 29% | 0:13.5 "swift COBADEFF if asked" under the caption and its bottom gradient | **hide** | [cut-green2-en--shorts](sheets/cut-green2-en--shorts.jpg) |
| YouTube Short | 2026-11-20 | Cutling film, id (green2) | https://youtube.com/shorts/n8777ommVvw | 78% | 32% | 0:22.0 "jumat, bilang ibu kos soal" under the caption and its bottom gradient | **hide** | [cut-green2-id--shorts](sheets/cut-green2-id--shorts.jpg) |
| YouTube Short | 2026-11-20 | Cutling film, ja (green2) | https://youtube.com/shorts/cSiXwHFGSxM | 75% | 36% | 0:20.0 "キャンドル？それか本" under the caption and its bottom gradient | **hide** | [cut-green2-ja--shorts](sheets/cut-green2-ja--shorts.jpg) |
| YouTube Short | 2026-11-20 | Cutling film, en (green) | https://youtube.com/shorts/FkNwbsz7R28 | 62% | 12% | 0:14.5 "birthday ideas for Ana," under the caption and its bottom gradient | **hide** | [cut-green-en--shorts](sheets/cut-green-en--shorts.jpg) |
| YouTube Short | 2026-11-20 | Cutling film, id (green) | https://youtube.com/shorts/POalUZojCxI | 61% | 11% | 0:20.0 "kado buat Ana: lilin? atau" under the caption and its bottom gradient | **hide** | [cut-green-id--shorts](sheets/cut-green-id--shorts.jpg) |
| YouTube Short | 2026-11-20 | Cutling film, ja (green) | https://youtube.com/shorts/pSjuhAeqMBg | 58% | 11% | 0:21.0 "キャンドル？それか本" under the caption and its bottom gradient | **hide** | [cut-green-ja--shorts](sheets/cut-green-ja--shorts.jpg) |
| YouTube Short | 2026-11-18 | Cutling film, en (amber) | https://youtube.com/shorts/YCESwtjVemM | 62% | 12% | 0:15.5 "birthday ideas for Ana," under the caption and its bottom gradient; "9:41" under the top bar and its gradient | **hide** | [cut-talent-en--shorts](sheets/cut-talent-en--shorts.jpg) |
| YouTube Short | 2026-11-18 | Cutling film, id (amber) | https://youtube.com/shorts/Uq82K0WHFnU | 62% | 11% | 0:14.5 "kado buat Ana: lilin? atau" under the caption and its bottom gradient | **hide** | [cut-talent-id--shorts](sheets/cut-talent-id--shorts.jpg) |
| YouTube Short | 2026-11-18 | Cutling film, ja (amber) | https://youtube.com/shorts/pQpEPfupD0E | 59% | 12% | 0:22.0 "キャンドル？それか本" under the caption and its bottom gradient | **hide** | [cut-talent-ja--shorts](sheets/cut-talent-ja--shorts.jpg) |
| YouTube Short | 2026-11-18 | Undirect film, en | https://youtube.com/shorts/qLfTI47kP2Q | 5% | 3% | 0:05.0 "7|7|7" under the caption and its bottom gradient | **OK** | [und-safe-en--shorts](sheets/und-safe-en--shorts.jpg) |
| YouTube Short | 2026-11-18 | Undirect film, id | https://youtube.com/shorts/ublF8QHiOZg | 4% | 2% | 0:06.5 "7|Z|7" under the caption and its bottom gradient | **OK** | [und-safe-id--shorts](sheets/und-safe-id--shorts.jpg) |
| TikTok photo | 2026-11-21 | Debut, 2 photos (monholt-debut-tt-1, tt-2) | https://www.tiktok.com/@monholt/photo/7710631569291005205 | photo 1: 0 boxes; photo 2: 5 small boxes | 0 | Photo 2: the Cutling phone's keyboard cells (Email Signature, Wi-Fi Password, Phone Number, 14 px) sit under the right rail; the headline and both app names are clear | **OK** | [tt-1](photos/debut-tt-1--tiktok.jpg), [tt-2](photos/debut-tt-2--tiktok.jpg) |
| Instagram Story | 2026-11-21 | Debut story (monholt-debut-tt-1) | id 18132329827895296, live 24 h | 0 boxes | 0 | nothing covered | **OK** | [tt-1 story](photos/debut-tt-1--story.jpg) |
| Instagram feed | 2026-11-21 | Debut carousel (monholt-debut-ig-1, ig-2), 1080x1350 | https://www.instagram.com/monholtco/p/DgAb0UGnX06/ | no overlay on a feed photo | 0 | nothing covered | **OK** | none needed |

Not in the table: text-only posts (the debut post on Facebook and Threads), X (out of scope), YouTube's landscape explainers (HsqOnxszYzA, 3DOZ-00I6i0, U9wtrxiKoyw, 8q1vV3-L0a8, 5PApOfSeOcs, PPsDMFj2QMg, oHqSYLf8RZk, -4vTubZK8gU: 16:9 watch-page videos with no overlay while playing) and the unlisted Solute videos (another product). The three YouTube Shorts dYNZzJYhKBk, NmFG_xc9oPE and -wgj1iPls8s are private and were not audited.

## How it was measured

1. **Posts.** Read from social-posts.md and the BOARD (ASG25, ASG54), then from each profile in Chrome on 2026-11-22: TikTok @monholt (10 videos, 1 photo post), Instagram @monholtco (10 reels, 1 carousel, 1 story), the Monholt Facebook Page reels tab (5), Threads @monholtco (5 videos), and `youtube.ts list` (11 public Shorts). TikTok's five 2026-11-18 posts and Instagram's five 2026-11-18 reels were not in social-posts.md; they are in ASG25.
2. **Files.** The TikTok, YouTube and Facebook copies were downloaded with yt-dlp and matched to local renders by frame fingerprint (`method/fp.py`): Cutling 2026-11-18 = cutling-promo/out/talent, Cutling Shorts FkNwbsz7R28 / POalUZojCxI / pSjuhAeqMBg = out/green, Cutling 2026-11-20 = out/green2, Undirect 2026-11-18 = undirect-promo/wire/out/safe, Undirect 2026-11-20 = wire/out/fix. talent and green share one layout and differ only in colour, so the fingerprint barely separates them; the measurement is the same for both. Instagram blocked the download; its reels are mapped from the posting logs (same files as the TikTok posts of the same day). Threads is mapped the same way.
3. **Frames.** Every source film at 2 fps, 1080x1920 (2,830 frames).
4. **Text.** macOS Vision OCR, accurate level, on every frame (`method/ocr.swift`); Japanese films were read with Japanese first, since the default order lost most of their text. Boxes below 0.5 confidence or shorter than two characters are ignored. A box counts when a quarter or more of it falls outside the platform's safe area.
5. **Sheets.** `sheets/<film>--<platform>.jpg`: every frame at 2 fps with that platform's UI drawn on top (gradients, top bar, right rail, caption lines; `method/overlays/`), the safe area outlined in red. A red border marks a frame with large text under a band, orange a frame with small text only. Time is the row label plus the column label. `worst/` holds the worst frame of each film per platform at full size with the covered words boxed in cyan.

## Overlay geometry and sources

| Platform | Unsafe area on 1080x1920 | Source |
|---|---|---|
| TikTok | top 240, bottom 660, left and right 120, plus a 180 px icon column from y 840 down | TikTok's "In-Feed Standard LTR" template (ads.tiktok.com/help/article?aid=10002745 offers the zip; it gives no numbers in text), as measured from that file by ManyPixels (manypixels.co/blog/social-media-design/tiktok-ad-specs, template downloaded 2026-11-11, scaled from 720x1280) |
| Instagram Reels, Facebook Reels, Instagram Stories | top 14% (269), bottom 35% (672), sides 6% (65) | Meta Ads Guide, Instagram Reels and Instagram Story pages (facebook.com/business/ads-guide/update/video/instagram-reels, .../image/instagram-story), read 2026-11-22 |
| Reels right rail | x 888 and right, from y 840 down | GUESS: Meta publishes no rail width; Google's 192 px right margin is used, as the 2026-11-21 QA did |
| YouTube Shorts | top 288, bottom 672, left 48, right 192 | Google, "Universal Video Ad Safe Zones", vertical example on mobile (services.google.com/fh/files/misc/universalsafezones-youtube.pdf) |
| Threads | a mute chip, about 100 px, centred at x 945, y 1786; no scrim | Measured in the Threads web player in Chrome, 2026-11-22 |

No platform publishes the height of its gradient. The bands above are the guides' unsafe margins, which is where each app draws its top bar, caption and their scrims; the gradients in the sheets are drawn over exactly those bands. If an app's real scrim reaches further in, the true share is higher than this table, not lower.

## Limits

- OCR finds text, not pictures: an app icon, a toggle or a phone screen with no words under a band is not counted.
- TikTok's caption band grows with a longer caption; the template used is the standard one, not the four-line or anchor case (bottom 812-1,014 px per ManyPixels), so long captions cover more.
- The Instagram Story from 2026-11-21 expires on its own after 24 hours.
