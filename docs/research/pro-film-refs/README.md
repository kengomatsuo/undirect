# Professional film references (ASG136)

Read and measured 2026-11-21. Step 1 of the owner's ask to make Monholt's social films and
photos look made by a studio. The page the owner reads:
https://claude.ai/artifact/9Df2FgDw3F8fnUFensjEL8 (source in `page/`). Step 2 (2026-11-22, below) built
the first film and the music reel; the owner picks a track and approves the film next.

## What is here

- One note per film (`apple-*.md`, `samsung-*.md`, `app-*.md`): source URL, measured cut
  rhythm, music, sound, type, colour, camera, how real interface is shown, the ending, and
  what to take. 33 films: 8 Apple, 9 Samsung, 16 app studios.
- `measurements.json`: every number in those notes, plus the same measurements for 20 of
  our own films (15 from `~/Downloads/pain-films-v4`, 5 from `~/Repositories/cutling-promo/out`).
- `tools/measure.py`: the measuring script. `tools/notes.py` writes the notes from its output.
- `page/`: the artifact's HTML, the style-frame source and the 16 style frames. `style-frames.html`
  expects these files beside it, all real captures: `reel.jpg` and `menu.jpg` are
  `undirect-promo/public/take/ip-stream-on.mp4` at 7 s and 12 s; `popup-reel.jpg` is
  `take3/reel-on.mp4` near its end; `hj1.jpg`, `hj2.jpg`, `hj3.jpg` are the last frames of
  `take/ip-stream-off.mp4`, `take3/qp-off.mp4`, `take3/reel-off.mp4`; `popup.png` is
  `shots/popup.png`; `icon.png` is `undirect/web/undirect-app-icon.png`; `badge.svg` is
  `cutling-promo/public/app-store-badge.svg`; `InterTight-var.woff2` is from
  `undirect-promo/public/fonts`. Each frame renders with headless Chrome at 1080 x 1920
  (`style-frames.html?s=a1` ... `c4`, and `pa`, `pb`, `pc` at 1080 x 1350).

## Findings across the 33 films

1. **A frame holds one thing.** Median lines of on-screen text per sampled frame: 1.
   46 % of frames carry no words. Words get their own frame (Things, Halide, CleanShot,
   Apple's iPhone 17 Pro and 18 Pro ads) or sit small beside the object (Samsung, Arc Search).
2. **The device is an object or the screen is filmed.** Apple and Samsung light the phone
   and move slowly round it. Linear tilts the interface in the dark with shallow focus.
   Screen Studio 4.0, Dia and Raycast Focus film the real screen through a macro lens.
   Samsung's One UI 7 lifts one real control out of the phone and shows it large.
3. **Cut rate varies a lot and is not the signal.** 0.11 to 0.84 shots a second, median 0.43;
   median shot 1.7 s.
4. **Music changes section.** 32 of 33 have at least one lift; the first lands a median 24 %
   of the way in. Tempo runs from 56 to 186 BPM, so tempo is not the recipe.
5. **Apple's ad music is bass heavy.** In the iPhone 17 Pro and 18 Pro ads the band under
   90 Hz sits 2.3 to 2.5 dB under the full mix. `product-video/research/music-for-promos.md`
   treats a gap that small as the mark of a rejected track; these films show the mark of a
   cheap track is a loop that never changes, not low-end weight.
6. **The logo holds in silence.** Six of six official Apple films and five of Samsung's seven
   long films stop the music 5.0 to 6.4 s before the end.
7. **Captions are short.** Apple's fact cards are 2 to 5 words. Samsung's 15 s Fold8 short
   has eight words in all. The line that names the product's benefit comes once, late.

## Our films against them (same tools)

| Measure | Ours (15 social films) | References (33) |
|---|---|---|
| Lines of text per frame, median | 13 | 1 |
| Frames with no words | 0 % | 46 % |
| Music | two Mixkit loops, 86.6 and 129.6 BPM, on every film | a different track each |
| Section change found by the beat tracker | 0 of 15 | 32 of 33 |
| Silence under the end card | 0 s | about 5 s (Apple, Samsung) |
| Shots a second, median | 0.47 | 0.43 |
| Loudness | -13.8 LUFS | -29 to -8 LUFS |
| Loudness range | 1.9 to 4.9 LU | 2.2 to 17.9 LU |

What reads as generated, each with its evidence on the page: every frame stacks a headline,
a boxed highlight word, an OFF/ON badge and a counter above the phone; the phone is a flat
front-on rectangle on a red or green glow; the same two loops; invented chat threads, made-up
site brands and `.example` addresses; overlay timers and counters that exist in no app; a
Settings screen drawn in code (`social/calendar-final/templates.ts`, lines 159 to 161); an end
card with four lines of text; one template across 87 calendar posts. The one still that reads
as a photograph is the studio-rendered pebble ("No tap. No redirect.").

Cut rate and loudness are already in range and need no change.

## The three directions proposed

- **A Black stage** (recommended): the lit phone alone on black; a card of words and the
  product take turns. From `apple-iphone-18-pro-ad`, `apple-iphone-17-pro-ad`,
  `app-halide-mark-ii`, `app-things`, `app-cleanshot-5`.
- **B Daylight table**: the phone on a sunlit pale set; pages pile up beside it; the one row
  that matters lifts out as a card. From `samsung-short-8th-gen`, `samsung-short-fold8-thin`,
  `samsung-one-ui-7`, `app-arc-search`.
- **C Filmed close**: the real screen at macro distance with shallow focus, fast locked
  shots, silence at the press, one serif line at the end. From `app-screen-studio-4`,
  `app-dia`, `app-raycast-focus`, `app-linear-agent`, `app-arc-1-0`.

Beat tables for a 15 to 20 s Undirect film in each are on the page.

## Music sources checked

- Epidemic Sound Business: US$20 a month billed US$240 yearly, 30 days free; a brand's own
  social posts, websites and ads; 3 channels per platform; revenue under $10M
  (https://www.epidemicsound.com/our-plans/business-plan/, read in Chrome 2026-11-21).
- Mixkit: free, social and online ads, licence forbids Content ID registration
  (see `../promo-video-research.md`, G1). Both loops under the social films are Mixkit
  (`undirect-promo/wire/public/music/mixkit-371.mp3`, `mixkit-opalescent-593.mp3`).
- Artlist: https://artlist.io/page/pricing showed only AI plans in Chrome; the music plans
  were not read. No price is quoted.
- Pixabay stays out (`product-video/research/audio-library.md`, 2026-11-18).
- Superseded on 2026-11-21 by the licence table in `product-video/research/audio-library.md`, section 2: TikTok's and
  Meta's libraries are bound to their platforms by their terms, YouTube's names no other platform, and Unminus joins
  Mixkit as a no-credit source.

## Step 2: the first Black stage film and the music reel (ASG138, ASG139, 2026-11-22)

The owner's answers: direction "up to you" (so A, with the press shot as close as C), and no paid library.

**Film.** `undirect-promo/wire/src/stage/` (`film.ts` holds every timing, take, pose and word; `BlackStage.tsx` the
composition `BlackStage`, 1080 x 1920 at 60 fps, 15.48 s, `lang` en, ja or id). Render and master:
`bun tools/stage.ts render <lang> <version>` then `python3 tools/stage-master.py out/stage/raw-<lang>-<version>.mp4
out/stage/undirect-stage-<lang>-<version>.mp4`, which also writes the 4 fps sheet and the four platform sheets.
`bun test src/stage/film.test.ts` holds the safe box in code. The films on the page are version 2.

- Six beats on the downbeats of the placeholder track ("Thunder", Mixkit 318, 95 BPM, played from 9.762 s; its lift at
  20.19 s lands on the cut to the result at 10.43 s). The music stops on the cut to the end card.
- Takes, cut into `wire/public/stage/`: `hijack.mp4` is `wire/public/takes/F_S1.mp4` (October, the demo site still
  named reelhouse); `press.mp4` is `capture/takes/V8_PI_103_on.mp4` 14.0 to 17.8 s (row press at 1.6 s of it);
  `result.mp4` is `capture/takes/V8_PI_103_list.mp4` 0 to 3.3 s. The V8 takes are Undirect 1.0.3 (10) at 60 fps.
- Decisions changed from the step 1 beat table: the V8 takes replace `ip-stream-on` and `reel-on`, whose popup is the
  old white one; shot 5 opens with the popup up, since no take holds a guarded tap and the popup opening; the press shot
  starts close and pulls back once instead of going in and out; the loupe carries "1 stopped" and Blocked into the clear
  box because the real row sits under the caption band.
- Words: en "Not what you tapped." / "One press." / "$1.99 once"; ja 押したのは、そこじゃない。/ ひと押しで、止まる。/
  300円の買い切り; id "Bukan yang kamu ketuk." / "Sekali ketuk, beres." / "Rp 39.000 sekali bayar" (prices as in
  `social/calendar-final`). Badges are Apple's localized files from tools.applemediaservices.com.
- Checks on version 2: at rest before each cut (0.65, 0.71 and 1.09 s on the product shots); -14.2 LUFS, true peak
  -1.3 dBFS on each language; every word, press, the loupe and the end card inside the box TikTok, Reels and Shorts leave
  clear, on 62 frames x 3 languages x 4 platforms. Version 1 failed the rest check on the press shot (still moving at the
  cut) and its true peak sat at the limit.
- Open before posting: re-record shot 1 on the current demo (Marlow TV) and all takes on 1.1.0; nobody has heard the
  sound; the price line needs the sale price from 27 to 30 November.

**Platform sheets.** `product-video/scripts/platform-overlay-sheet.py` composites each platform's unsafe zones, a
shadow gradient from the top and bottom edges and stand-in buttons over every frame at 4 fps. TikTok's zones are its
own In-Feed template (`product-video/references/overlays/tiktok-in-feed-template.png`), Shorts' are Google's overlay;
Reels uses the strictest of those two since Meta publishes no numbers. The gradients and buttons are drawn, not captured.

**Music.** `music/tracks-reel-1.json` is the first shortlist of eight (file URL, tempo, film beat, lift time, clip window);
`music/measurements.json` the measured lift, build and bass share of each; `music/lifts-*.json` the best lifts of every
track measured (Mixkit, Unminus, Scott Buckley). `music/tools/`: `mixkit-screen.py` scores Mixkit's published
waveforms, `analyse.py` and `refine.py` find and time lifts on downbeats (need `uv run --with numpy`), `curve.py` and
`onset.py` print level curves, `reel.py <tracks.json> <out-dir>` rebuilds a reel's clips and its numbered reel. What each library's licence permits, with
quotes and sources, is in `product-video/research/audio-library.md`, section 2.

**Reel 2 (ASG141, 2026-11-22).** The owner heard reel 1: 1 and 2 "maybe least bad", 7 kept for stya's reveal, the
rest rejected. `music/tracks-reel-2.json` is tracks 9 to 16, every one meeting the floor that 1 and 2 set and the
rejected tracks miss (slow pulse, a build 11 dB or more under the track, a lift of 14 dB or more that holds, bass in the
lifted section); `tools/measure2.py` applies it and `reel-2-measured-*.json` holds every track measured (Mixkit,
Unminus, HoliznaCC0 on Free Music Archive, OpenTracks). `tools/ot.py` and `tools/otget.py` list OpenTracks (DOVA-SYNDROME
until 2026-09-15) and fetch its previews; none of 45 passed. Five passing Mixkit files (1355, 279, 377, 1297, 203) have
no title in `mixkit-titles.json` (910 titles from its listing pages, which answer HTTP 429 when read faster than about
one a second): a file that answers on Mixkit's server without being listed may not be on offer, so they are off the reel.
The film stays on track 1 until the owner picks.

**The film on tracks 13 and 16 (ASG142, 2026-11-22).** The owner picked 13 (Chill Trap) and 16 (Electro Dreams),
"still meh". `wire/src/stage/film.ts` now holds a table of tracks (`TRACKS`: seven moments of each, the fifth its lift)
and the film takes its clock from it: `bun tools/stage.ts render en v5 --track chill-trap` (16.0 s, lift at 10.65 s) and
`--track electro-dreams` (18.0 s, lift at 12.0 s; its kick enters at 16.024 s of the track and the beat tracker follows
the off-beat, so the grid is counted back from the kick). Both are mastered with `stage-master.py <raw> <out> -16`:
-16.1 LUFS, true peak -1.0 and -1.2 dBFS. At -14 the limiter held the lift's peaks by 6 to 11 dB and Electro Dreams
kept 3 dB of lift; at -16 it works 2.6 and 5.8 dB and the lift lands 9 and about 7 dB over the build. Rest before each
cut: 0.65 s or more. Japanese and Indonesian wait for the owner's pick; the three-language cut on track 1 is version 2.

**Reel 3 (2026-11-22).** `music/tracks-reel-3.json` is tracks 17 to 26: the ten in `reel-3-candidates.json` (ASG143, an
audio model's ranking of 1,114 tracks by closeness to the owner's kept tracks), with Complicated, Hangtime and Dont Care
first and the rest in the ranking's order. These hold one level rather than lift, so each clip is the track's own 20 s
from `tools/main-section.py`: about 4 s before the first run of 12 s or more within 4 dB of the track's loud level.
`reel.py` takes such a `window` in place of a lift. The film is not laid on any of them.

`page/audio`, `page/film` and `page/qa` are what the artifact serves; they are ignored by git and rebuilt by `reel.py`
and `stage-master.py` (sheets resized to 1980 px wide for the page).

## Method and limits

- 720p downloads with yt-dlp; Things from Cultured Code's own file. Downloads were not kept.
- Cuts: a frame whose scene score is at least six times the median of its 24 neighbours and
  a local maximum (`cuts_adaptive` in `measure.py`). The fixed 0.3 threshold misses most cuts
  in dark films. Hand count on the iPhone 18 Pro ad: about 27 shots against 24 detected.
- Tempo, beats and section lifts: `product-video/scripts/beats.ts`. Loudness: ffmpeg
  `ebur128`. Speech: whisper-cpp with `ggml-base.en`. Text: `refs-ocr.swift` compiled to
  `tools/ocr` (`swiftc -O -o ocr ~/.claude/skills/product-video/scripts/refs-ocr.swift`),
  one frame per shot.
- Audio was measured, never heard. Genre words come from credits, whisper's tags and
  spectrograms. Font names are by eye unless the brand publishes them.
- Apple's own iPhone 15 Pro and 16 Pro films are no longer on its channel; two re-uploads
  stand in and are used for picture only.
- Flighty has no official film on YouTube and no preview video on its App Store page
  (checked with `refs-appstore.sh`, app id 1358823008), so it is absent. CleanShot, Craft and
  Halide are covered; Screen Studio, Dia, Cursor, Granola and Structured were added.
- The product-video skill asks for 250 references before a storyboard. This pass studied the
  33 films the brief named or implied; the earlier sets in `../promo-video-refs/` and
  `../pain-film-refs/` still stand.
