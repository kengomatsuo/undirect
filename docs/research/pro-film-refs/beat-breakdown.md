# Higgsfield examples and one film against its beats

Read and measured 2026-11-22. Findings are appended as they land; each carries its source URL.
Anything not measured or read on the page named is marked GUESS.

## Part A: Higgsfield

### Prices (https://higgsfield.ai/pricing, read in Chrome 2026-11-22)

The page was running a "Black Friday 63% OFF" banner with a countdown of about 21 hours, so the
struck-through figure is the regular price and the other is the sale price.

| Plan | Billed monthly | Billed yearly (per month) | Credits a month | Page's own example |
|---|---|---|---|---|
| Basic | $9 | $9 | 120 | 7 videos on Seedance 2.0 Fast; 2 videos in parallel |
| Plus | $39 on sale, "renews at $49" | $27 on sale, regular $49 ("Save $264") | 1,000 | 67 videos on Seedance 2.5; 6 videos in parallel |
| Ultra | $79 on sale, "renews at $129" | $50 on sale, regular $129 ("Save $948") | 3,000 (6K and 9K tiers exist) | 200 videos on Seedance 2.5 |

Credits per 5 s clip, from the comparison table on the same page: Seedance 2.5 720p 35, 1080p 80;
Higgsfield Genjutsu 720p 35, 1080p 100; Genjutsu Lite 720p 10, 1080p 20; Seedance 2.0 720p about 22,
1080p about 60, 4K about 110; Seedance 2.0 Fast 720p about 12; Kling 4.0 720p 12.5, 1080p 18.75;
Kling 4.0 Flash 720p 7.5; Kling 3.0 720p about 7, 1080p about 8, 4K about 30. The page also says
"Approximately 14 credits per video & 2 credits per image" and "Unlimited & free gens work only on
higgsfield.ai".

What that means for one 20 s film (arithmetic on the page's numbers, not a quote): six 5 s plates at
1080p cost 480 credits on Seedance 2.5, 600 on Genjutsu, about 113 on Kling 4.0, about 48 on Kling 3.0.
Basic's 120 credits cover one such film only on the Kling models; Plus covers two on Seedance 2.5
before any retakes.

### Ten published examples

Stills are in `docs/research/pro-film-refs/higgsfield/`, four frames across each. "Real UI" means a recording of a real
app's screen; a screen the model drew, or one redrawn in a motion tool, is said as such.

| # | Example and URL | What the shot looks like | Higgsfield feature or preset, as stated | Real UI? | Still |
|---|---|---|---|---|---|
| 1 | **Aurora SaaS**, Higgsfield's own template gallery. https://higgsfield.ai/marketing-studio/preset/aurora-saas-6b8237e9-8097-49bb-befb-9ac1fac8068d | 16:9, 9.4 s. No camera. Teal and blue light blooms drift on near-black. White headline words arrive one at a time, centred ("Knock out", "your goals", "with"). A logo tile lands large and shrinks to a round badge. A white dashboard card floats in, slightly tilted, and a hand cursor presses a button. | Marketing Studio, Motion tab, labelled "Product motion". The template page says "Recreate template": upload a product image, or "Paste link of your website or social". | No. The dashboard is drawn by the model from the upload or link. | `preset-aurora-saas.jpg` |
| 2 | **Monospace Callouts**, same gallery. https://higgsfield.ai/marketing-studio/preset/monospace-callouts-46406130-acc3-43f0-b6fe-554a22cad279 (preview file: https://cdn.higgsfield.ai/marketing-studio-motion-preview/aef59e19-f388-4dcc-b55a-e43a5c48c835.mp4) | 9:16, 15.1 s. Photoreal macro. A watch comes apart into its parts on black; slow push and orbit through the gears; hard side light, deep shadow. Small monospace labels sit beside parts ("28,800", "100%", "9H"). Ends front-on with the wordmark letter-spaced under it. | Marketing Studio, "Product motion". | No interface at all. | `preset-monospace-callouts.jpg` |
| 3 | **Signal Red HUD** and **Copper HUD**, same gallery (Motion tab of https://higgsfield.ai/marketing-studio). Preview files: https://cdn.higgsfield.ai/marketing-studio-motion-preview/82772c0a-9518-472c-9825-3d84b74f3ee0.mp4 and https://cdn.higgsfield.ai/marketing-studio-motion-preview/10549795-1814-4ad4-b992-511f475a0e4a.mp4 | 9:16, 5.7 s and 7.3 s. Product on white or black, then a macro along an edge with a focus pull, then hairline callouts and small caps labels in red or copper pinned to the object. Ends on black: one line of type, rings rippling out. | Marketing Studio, "Product motion". | No. | `preset-signal-red-hud.jpg`, `preset-copper-hud.jpg` |
| 4 | **Break Typography**, same gallery. Preview file: https://cdn.higgsfield.ai/marketing-studio-motion-preview/0a30c63a-1dbc-4217-b15c-ebad1c1ca3cb.mp4 | 9:16, 10.1 s. Type only, white and red on black. Letters scatter and snap together into "REBUILD", then a two-line phrase, then the wordmark with a small line under it. | Marketing Studio, "Product motion". | No. | `preset-break-typography.jpg` |
| 5 | **Falling Type Mosaic** and **Split Flap Scoreboard**, same gallery. Preview files: https://cdn.higgsfield.ai/marketing-studio-v2-2d-motion/0e566f58-daa7-4b55-b110-9f7861b87f7f.mp4 and https://cdn.higgsfield.ai/marketing-studio-v2-2d-motion/0164971e-0d43-44af-afbd-55e01d080e1e.mp4 | 16:9, 9.4 s and 9:16, 7.3 s. Flat 2D. The brand name on tiles falls and stacks until it fills the frame, or flips like a station board, then wipes to the product with stickers popping on. No light, no depth. | Marketing Studio, "Product motion". Their files sit in a folder named `marketing-studio-v2-2d-motion`; the photoreal ones sit in `marketing-studio-motion-preview`. | No. | `preset-falling-type-mosaic.jpg`, `preset-split-flap.jpg` |
| 6 | **Addx Studio, "Product Launch video made with Higgsfield Ai"**, for a web app called Meet Near Me. https://www.youtube.com/watch?v=vn2TJl4CohU (2026-05-24, 66 s, 1,418 views) | The closest thing found to the owner's plan. It alternates four kinds of shot: type cards (grey type on white or black); the app's dark interface as motion graphics (a search field typing "I want to learn karate", a create-event form with a lime button, a wall of event cards); photo prints fanning out on white; and filmed-looking plates: a woman pulling on a karate helmet in a blue dojo (handheld, wide, then close on her face, then top-down on the mat), friends in silhouette on a beach at sunset, a rooftop party under string lights with shallow focus. A search pill and the line "Find your people." sit over the plates. | The title says made with Higgsfield AI. It does not say which shots or which model. GUESS: the filmed-looking plates. | Partly. The interface is the product's own, shown as redrawn UI animation rather than a raw recording (by eye). The plates carry no screen. | `addx-meet-near-me.jpg` |
| 7 | **Higgsfield, '"Vibecoding" for Video is Here'**, its own channel. https://www.youtube.com/watch?v=yvuVH6Zg5Vk (2026-02-04, 7 min 43 s, 132,645 views) | The launch demo of Vibe Motion. Results shown: a logo drawn in a neon green stroke on black; an Instagram Reel poster for a festival; white property cards sliding across grey; and, under the chapter "UX/UI App Prototype in Motion" (6:16), a flat phone outline, front-on, centred on red, its screen counting to "304" with a tick and "Access Granted". | Vibe Motion: "a real-time, fully editable canvas" where fonts, colours, layouts and timing can be changed after generating (the video's description). | No. The phone and its screen are drawn. No camera move, no light on the device. | `vibe-motion-official.jpg` |
| 8 | **Greg Preece, "Create SaaS Motion Graphics In Seconds! (Higgsfield Tutorial)"**. https://www.youtube.com/watch?v=VWp1Jip79JI (2026-04-24, 6 min 38 s, 34,622 views; the description carries his affiliate link) | Vibe Motion from typed prompts. A white "Content Creator" card on a soft lavender gradient with a 3D cursor pressing its button; a navigation menu widget on navy, rows lighting up as the cursor passes; a row of app icons above a card on blue; a phone outline with chat bubbles on warm beige, then a serif line alone on the beige. All front-on, no camera. | Vibe Motion (the menu "Create with Vibe Motion" is on screen). | No. Every widget is drawn from the prompt. | `greg-preece-saas-vibe-motion.jpg` |
| 9 | **Jake In Motion, "Higgsfield AI Motion Designer: I Tested the Claims"**, a working motion designer. https://www.youtube.com/watch?v=QLZNiwaKqWg (2026-09-15, 16 min, 366,171 views) | An outside test of Higgsfield's After Effects plugin. Three prompts and their results: a line-drawn logo reveal, a stop-motion crumpled paper, and a title "Effects of After Effects" that comes back as flat kinetic type, pink and lime on black after a revision. His chapter titles: "False Advertising", "Higgsfield isn't ChatGPT Astra", "Initial Setup Issues". His spoken verdict was not transcribed (YouTube refused the captions with HTTP 429). | "AI Motion Designer": Higgsfield's After Effects plugin driven by a GPT model (his description). | No. | `jake-in-motion-test.jpg` |
| 10 | **Higgsfield blog, "Build a Full Marketing Stack for Your App: Full Prompts"**. https://higgsfield.ai/blog/marketing-studio-video-2 (2026-04-30) | The only official walk-through for an app. The prompt for its product reveal asks for a phone in a dark void, a crash zoom, an ice cube shattering in slow motion, an orbit and a pull-back, deep blacks with a mint rim light. The post embeds no result video (checked in Chrome: the page's only videos are the site header's), so this look is read from the prompt, not seen. | Marketing Studio with "App" chosen in place of product. Presets named: Hyper Motion (the reveal), TV Spot, Pro Virtual Try On, Wild Card. 15 s, 9:16 and 16:9. | No. The app (CUE) and its screens were themselves made with GPT Image. The screens go in as still reference images, and the prompts tell the model not to animate them. | none |

### What the examples show

1. **Higgsfield is two different things.** One makes filmed-looking plates (the product templates, Hyper Motion, the
   Seedance and Kling models on the price page). The other, Vibe Motion and the After Effects plugin, draws flat
   motion graphics from a prompt. Examples 1 to 5 and 7 to 9 are almost all the second kind.
2. **Nobody found here puts a real screen recording inside a Higgsfield shot.** In all ten the interface is drawn
   by the model, redrawn in a motion tool, or passed in as a still. The one film that mixes plates with a real
   product's interface (6) keeps them in separate shots and lays only a search pill and a headline over the plate.
3. **Higgsfield's own gallery is physical products**: cans, jars, cosmetics, a watch. Of the 50 Motion templates
   the page had loaded on 2026-11-22, one (Aurora SaaS) is for software, and its screen is an invented dashboard.
4. **The app-shaped results are flat.** Where a phone appears (7, 8) it is a front-on outline on a colour field, which
   is the look the earlier review in `README.md` lists under what reads as generated.

Leads that did not hold: Dan Kulkov's post (https://x.com/DanKulkov/status/2018713024652075230, 25.1K views) says he
tried Higgsfield for his new iOS app and plans to "vibe create 10 motion videos", but carries no video; the post it
quotes is unavailable. "Higgsfield AI: The Future of AI Video Ads" by ukasha.motion
(https://www.youtube.com/watch?v=vNbFZc2UDS4) is an ad concept about Higgsfield made in After Effects, by its own
description, so it is not Higgsfield output. Higgsfield's community search
(https://higgsfield.ai/community/generations) returns "No shots match your search" for "app promo", and for "iphone"
returns people holding phones with no interface. TikTok and Instagram were not searched.

GUESS, for the decision: if Higgsfield is used, it is for plates with no screen in them (a hand, a room, a person
reacting), cut next to the real recordings as shot 6 does, with the compositing done in Remotion as now. The Apple
film in Part B uses filmed shots in exactly two places, 4.2 s of its 30 s.

## Part B: one film, every cut and move against its beats

### The film and why this one

**"iPhone 17 Pro: Smart Group Selfies"**, Apple's own channel, published 2026-02-07, 35 s file (30 s of film, then
5 s of black silence), 1920 x 1080 at 30 fps. https://www.youtube.com/watch?v=er7MJvQCdsM
Music, credited in the description: "Party at My House" by Inspector Spacetime.

Why it was picked over the others:

1. It is the same kind of film Undirect needs: a feature shown on a **real screen recorded in a hand**, with a live
   action shot only at the start and before the logo, two small type cards and a logo. No voice.
2. Its cuts sit on a tempo grid more tightly than any other Apple or Samsung film with real interface that was
   surveyed with 25 cuts or more. The survey below downloaded 16 official Apple and Samsung films and scored how tightly each film's cut
   times bunch at one phase of its music's tempo (0 = no relation, 1 = every cut at the same place in the beat).
   The tempo was scanned 5 % either side of the beat tracker's figure, so a film with few cuts scores high by luck;
   the last column is what luck alone gives.
3. It is 30 s at 135 BPM, close to a 20 s social film in pace, and short enough to read every frame.

| Film (official channel) | Cuts found | Score | Luck alone | URL |
|---|---|---|---|---|
| Apple, The new Mac mini with M6 (43 s, product render, no interface) | 29 | 0.50 | 0.30 | https://www.youtube.com/watch?v=3WpzNmY35S4 |
| **Apple, iPhone 17 Pro: Smart Group Selfies (35 s)** | 38 | **0.49** | 0.26 | https://www.youtube.com/watch?v=er7MJvQCdsM |
| Apple, HomePod mini 2 (41 s) | 28 | 0.44 | 0.30 | https://www.youtube.com/watch?v=xLL4UnrLNWs |
| Samsung, Note Assist, Galaxy Tab S12 Ultra (42 s) | 26 | 0.44 | 0.31 | https://www.youtube.com/watch?v=ZWWkYESs27A |
| Apple, iPhone Air (54 s) | 31 | 0.35 | 0.29 | https://www.youtube.com/watch?v=sKJ0_NNcJzI |
| Apple, The all-new MacBook Neo (36 s) | 27 | 0.35 | 0.31 | https://www.youtube.com/watch?v=bg3iEHHTGtQ |
| Apple, iPhone 18 Pro ad (55 s) | 29 | 0.34 | 0.30 | https://www.youtube.com/watch?v=DDnNc60onT4 |
| Apple, iPhone 17 Pro ad (60 s) | 35 | 0.29 | 0.27 | https://www.youtube.com/watch?v=TNhX1uR2vO8 |
| Samsung, Privacy Display, Galaxy S26 Ultra (35 s) | 19 | 0.39 | 0.37 | https://www.youtube.com/watch?v=VmY9nPrxEY8 |
| Samsung, Welcome to Foldables (35 s) | 66 | 0.17 | 0.20 | https://www.youtube.com/watch?v=LVOqdUUbBVA |
| Samsung, Ultra Unfolds, Z Fold7 (35 s) | 14 | 0.65 | 0.43 | https://www.youtube.com/watch?v=Ni84rwldILE |
| Samsung, The Odyssey is coming home (16 s) | 13 | 0.65 | 0.44 | https://www.youtube.com/watch?v=9Pw7ViTxURY |
| Apple, AirPods Max 2 (39 s) | 8 | 0.77 | 0.57 | https://www.youtube.com/watch?v=RrfJVP-6Quw |
| Apple, Safari Helps Keep Distractions Hidden (16 s) | 6 | 0.87 | 0.65 | https://www.youtube.com/watch?v=iUr53gDq380 |
| Apple, Safari Helps Keep Trackers Away (16 s) | 7 | 0.59 | 0.60 | https://www.youtube.com/watch?v=a110BjghioM |
| Samsung, Thin. Pocket-light, Z Fold8 (15 s) | 7 | 0.56 | 0.60 | https://www.youtube.com/watch?v=T9MzsCVUwk8 |

What the survey itself says: **no official Apple or Samsung film here is cut on the beat from start to finish.** The
best scores are about twice what luck gives. The breakdown below shows where the grid is kept and where it is not.

The two 16 s Apple Safari films are the closest in subject (a man pestered by pop-ups; Safari hides them) and are
worth watching for the idea, but they are an actor talking, with 6 and 7 cuts, so there is little to line up.

No Higgsfield-made app promo was good enough to stand as the reference: see Part A.

### How it was measured

- **Download:** `yt-dlp`, 1080p AV1 with AAC sound, 1,050 frames. Every frame pulled with `ffmpeg`.
- **Tempo and beats:** onset times were measured at every eighth-note slot of the track (126 of 129 slots carry a
  clear onset) and a straight line fitted: **134.98 BPM, one beat = 0.4445 s = 13.3 frames, one bar = 1.778 s**. The
  fit's error is 1 ms through the main groove and 8 ms over the whole track, so the tempo does not drift.
  librosa's own tracker gave 135.1.
- **Which beat is "1":** the first sound in the file is at 0.068 s and is the loudest hit of the opening. From there
  the low band (40 to 110 Hz) carries a hit on every beat, and the eighth note straight after one beat in every four
  is empty (about 20 dB under its neighbours) in all 17 bars. That four-beat repeat starts on the first hit, so bar 1
  beat 1 = 0.068 s and the bar is four beats. Bar lines are therefore measured, not assumed, but nobody listened: the
  audio was analysed, never heard.
- **Cuts and moves:** the mean change between consecutive frames was printed for all 1,050 frames, then every cut and
  every move was confirmed by looking at the frames one by one (sheets at 10 fps for the whole film, every single
  frame around each event). A move's start is the first frame in which it is visible; its rest is the first frame
  with nothing moving.
- **Offset:** event time minus the nearest beat, in milliseconds. Minus means the picture changes before the beat.
  A frame lasts 33 ms, so no offset is finer than that.
- **Limit:** a fixed delay between sound and picture in YouTube's file of up to about one frame cannot be ruled out
  from the file alone. It would move every offset by the same amount and leave the pattern as it is.

### The music's sections (measured from band energy at each eighth note)

| Bars | Time (s) | What the track does | What the picture does |
|---|---|---|---|
| 1 to 2 | 0.07 to 3.62 | Intro. Kick on every beat, hi-hat on every eighth. On beats 3 and 4 of bar 2 the drums drop out and two bass stabs land on the off-beats (2.96, 3.40 s). | Live action: she holds the phone up, friends walk in. Cut to the phone in a hand at 2.57 s. |
| 3 to 9 | 3.62 to 16.07 | Full groove, 7 bars, level steady. | Ten shots of real phone screens, then a type card across bars 8.4 to 9. |
| 10 | 16.07 to 17.85 | Breakdown bar: kick and hats thin out; the last eighth (17.63 to 17.85 s) is silent. | One more phone shot, held still. Three blank white frames in the silence. |
| 11 to 16 | 17.85 to 28.52 | The drop: groove back for 6 bars. | Eight still photos, a type card, one live-action shot. |
| 17 | 28.52 to 30.0 | Final hit, rings out, gone by 29.9 s. | Apple logo. Cut to black at 30.0 s. |

### Every cut and every motion event

Sheets, all in `docs/research/pro-film-refs/breakdown/`:

- `contact-sheet-cuts.jpg`: one frame per cut (25), each labelled with its time, bar.beat and offset.
- `beat-sheet.jpg`: the film laid out as music: one row per bar, one tile per eighth note, red edge where a cut landed.
  This is the one to open to see each cut against its beat.
- `motion-events.jpg`: each of the 15 moves, six frames from start to rest.
- `timeline.png`: the sound level with beat lines, cuts, moves and type marked on it.
- `events-table.md` and `events.json`: the table below as files. `tools/events.py` is the hand-read event list,
  `tools/render.py` redraws every sheet from it.

| # | Time (s) | Frame | Kind | Nearest bar.beat | Offset (ms) | From nearest eighth (ms) | Comes to rest | On screen | How type enters |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 0.000 | 0 | cut | 1.1 | -68 | -68 (beat) |  | Shot 1. Low-angle handheld: a woman holds the iPhone up for a selfie, street and sky behind. Slow drift. |  |
| 2 | 1.800 | 54 | move | 2.1 | -46 | -46 (beat) |  | A friend steps in from the left edge (to within 3 frames); a second from the right at f66. |  |
| 3 | 2.567 | 77 | cut | 2.3 | -168 | +54 (off-beat) |  | Shot 2. Phone in a hand, screen centre frame, real Camera viewfinder with three faces. |  |
| 4 | 3.367 | 101 | move | 2.4 | +187 | -35 (off-beat) | 3.633 s, 3.1 +9 ms | Viewfinder zooms out to fit them; yellow ZOOM badge fades in. | badge fades in over 2 frames |
| 5 | 3.900 | 117 | cut | 3.2 | -169 | +54 (off-beat) |  | Shot 3. Another phone, divers on a beach. |  |
| 6 | 4.000 | 120 | move | 3.2 | -69 | -69 (beat) | 4.233 s, 3.2 +165 ms | Viewfinder zooms out; ZOOM badge. | badge fades in |
| 7 | 4.467 | 134 | cut | 3.3 | -46 | -46 (beat) |  | Shot 4. Another phone, friends with two dogs. |  |
| 8 | 4.500 | 135 | move | 3.3 | -13 | -13 (beat) | 4.733 s, 3.3 +220 ms | Zoom-out starts on the first frame after the cut. | badge fades in |
| 9 | 4.933 | 148 | cut | 3.4 | -24 | -24 (beat) |  | Shot 5. Another phone, cowboy hat and a horse. Holds still 30 frames. |  |
| 10 | 5.933 | 178 | move | 4.2 | +87 | +87 (beat) | 6.200 s, 4.3 -91 ms | Viewfinder zooms out as two more lean in; ZOOM badge. | badge fades in |
| 11 | 6.500 | 195 | cut | 4.3 | +209 | -13 (off-beat) |  | Shot 6. Another phone, three jockeys. |  |
| 12 | 6.800 | 204 | move | 4.4 | +64 | +64 (beat) | 7.067 s, 5.1 -113 ms | Viewfinder zooms out; ZOOM badge. | badge fades in |
| 13 | 7.400 | 222 | cut | 5.1 | +220 | -2 (off-beat) |  | Shot 7. Another phone, three friends in an arcade. |  |
| 14 | 7.700 | 231 | move | 5.2 | +75 | +75 (beat) | 7.867 s, 5.3 -203 ms | Viewfinder zooms out; ZOOM badge. | badge fades in |
| 15 | 7.900 | 237 | hit | 5.3 | -169 | +53 (off-beat) | 8.100 s, 5.3 +31 ms | Viewfinder blinks to black for 2 frames, then fades back wider. |  |
| 16 | 8.333 | 250 | cut | 5.4 | -180 | +42 (off-beat) |  | Shot 8. Another phone, three in leather jackets in a park. The longest shot (82 frames). |  |
| 17 | 8.900 | 267 | move | 6.1 | -58 | -58 (beat) | 9.167 s, 6.1 +208 ms | Viewfinder zooms out as more people arrive; ZOOM badge. | badge fades in |
| 18 | 10.400 | 312 | move | 6.4 | +108 | +108 (beat) | 10.667 s, 7.1 -70 ms | Badge changes to ROTATE; the viewfinder turns into a landscape band inside the upright phone. | badge swaps in place |
| 19 | 11.067 | 332 | cut | 7.2 | -114 | +108 (off-beat) |  | Shot 9. Another phone, cosplay group, already landscape. No move, 13 frames. |  |
| 20 | 11.500 | 345 | cut | 7.3 | -125 | +97 (off-beat) |  | Shot 10. Back to the horse group, now six people. |  |
| 21 | 11.533 | 346 | move | 7.3 | -92 | -92 (beat) | 11.833 s, 7.3 +208 ms | Viewfinder shrinks to the landscape band; ROTATE badge. | badge fades in |
| 22 | 12.033 | 361 | cut | 7.4 | -36 | -36 (beat) |  | Shot 11. Back to the divers, now six. Holds still 28 frames. |  |
| 23 | 12.967 | 389 | move | 8.2 | +8 | +8 (beat) | 13.233 s, 8.3 -170 ms | Viewfinder shrinks to the landscape band; ROTATE badge. | badge fades in |
| 24 | 13.767 | 413 | text | 8.4 | -81 | -81 (beat) | 14.033 s, 8.4 +186 ms | Cut to a white card. "Fit everyone in", small black type, one centred line. | On in full at the cut, the three words spread wide; the gaps close in 8 frames. No fade, no rise. |
| 25 | 14.633 | 439 | text | 9.2 | -103 | -103 (beat) | 14.900 s, 9.2 +163 ms | "automatically" joins the line; the first three words shift left to make room. Full line then holds 30 frames. | Slides in from the right, gap closing in 8 frames. |
| 26 | 15.900 | 477 | cut | 10.1 | -170 | +52 (off-beat) |  | Shot 13. Back to the first phone, now five faces. | Line cut off, no exit move. |
| 27 | 16.067 | 482 | move | 10.1 | -4 | -4 (beat) | 16.333 s, 10.2 -182 ms | Viewfinder shrinks to the landscape band; ROTATE badge. Then holds still 41 frames. | badge fades in |
| 28 | 17.733 | 532 | hit | 11.1 | -115 | +107 (off-beat) |  | Cut to blank white for 3 frames (the music is silent here). |  |
| 29 | 17.833 | 535 | cut | 11.1 | -15 | -15 (beat) |  | Photo 1, landscape, a still on white. No move at all. On 22 frames. |  |
| 30 | 18.667 | 560 | cut | 11.3 | -71 | -71 (beat) |  | Photo 2, landscape, after 3 blank white frames. On 23 frames. |  |
| 31 | 19.567 | 587 | cut | 12.1 | -60 | -60 (beat) |  | Photo 3, portrait, after 4 blank frames. On 23 frames. |  |
| 32 | 20.467 | 614 | cut | 12.3 | -49 | -49 (beat) |  | Photo 4, portrait, after 4 blank frames. On 23 frames. |  |
| 33 | 21.367 | 641 | cut | 13.1 | -38 | -38 (beat) |  | Photo 5, landscape, after 4 blank frames. On 23 frames. |  |
| 34 | 22.267 | 668 | cut | 13.3 | -27 | -27 (beat) |  | Photo 6, portrait, after 4 blank frames. On 23 frames. |  |
| 35 | 23.167 | 695 | cut | 14.1 | -16 | -16 (beat) |  | Photo 7, landscape, after 4 blank frames. On 23 frames. |  |
| 36 | 24.000 | 720 | cut | 14.3 | -72 | -72 (beat) |  | Photo 8, portrait, after 2 blank frames. On 27 frames. |  |
| 37 | 24.900 | 747 | text | 15.1 | -61 | -61 (beat) |  | White card: "Group selfies on iPhone 17 Pro", same small black type. Holds 54 frames. | On in full at the cut. No animation in or out. |
| 38 | 26.700 | 801 | cut | 16.1 | -39 | -39 (beat) |  | Shot 23. Live action again: the whole group huddled round the phone, handheld, they lean in. |  |
| 39 | 28.333 | 850 | hit | 17.1 | -183 | +39 (off-beat) | 28.567 s, 17.1 +50 ms | Cut to white. Apple logo, black. | Logo lands about 2.3 times its size and shrinks to rest in 7 frames. |
| 40 | 30.000 | 900 | cut | 17.4 | +150 | -72 (off-beat) |  | Cut to black. The file runs 5 more seconds of black silence. |  |

### The patterns, in plain words (all measured unless marked GUESS)

**1. The film has two halves, and only the second is cut on the beat.**
Up to the drop at 17.85 s the picture is a real screen filmed in a hand, and the cuts do not sit on the beat. Of the
12 cuts in that stretch, 3 fall within 55 ms of a beat, 6 within 55 ms of the off-beat (the "and"), 2 on a sixteenth
and 1 elsewhere. Chance alone would put 3 on the beat and 3 on the off-beat, so "cuts lean to the off-beat" is a
lean seen in 12 cuts, not a rule.

**2. In the first half the cut follows the action, not the music.**
Every phone shot runs the same way: cut in, hold, the viewfinder moves, rest, cut out. In 8 of 10 shots the cut
comes 6 to 12 frames (0.20 to 0.40 s) after the move has come to rest. The two exceptions rest longer on purpose:
16 frames before the type card and 42 frames before the drop.

**3. Moves start near a beat, loosely.**
9 of the 11 viewfinder moves begin within 92 ms (three frames) of a beat; chance would give 4 or 5. Only 3 are
within 55 ms. These are real recordings, so the move cannot be redrawn, only the clip slid along the track.
GUESS: that is what was done, to the nearest few frames.

**4. Everything that moves takes about a quarter of a second.**
The 11 viewfinder moves last 5 to 9 frames (8 frames, 0.27 s, is the most common). The type closes up in 8 frames.
The logo settles in 7. Half a beat here is 6.7 frames. Nothing eases for longer than 0.3 s.

**5. Shot lengths before the drop, in beats, in order:** 5.8, 3.0, 1.3, 1.0, 3.5, 2.0, 2.1, 6.1, 1.0, 1.2, 3.9,
4.8 (the card), 4.1. A long shot is followed by a pair of short ones; no length repeats three times.

**6. Picture and music meet where the music changes section**, each within two frames:

| Music | Picture | Offset |
|---|---|---|
| Full groove enters, bar 3 beat 1, 3.624 s | The first zoom-out comes to rest at 3.633 s | +9 ms |
| Breakdown starts, bar 10 beat 1, 16.070 s | The last phone move starts at 16.067 s | -4 ms |
| Silent eighth, 17.63 to 17.85 s | Three blank white frames from 17.733 s | inside it |
| The drop, bar 11 beat 1, 17.849 s | First still photo at 17.833 s | -15 ms |
| Bar 15 beat 1, 24.961 s | Last type card at 24.900 s | -61 ms |
| Bar 16 beat 1, 26.739 s | Live-action shot at 26.700 s | -39 ms |
| Final hit, bar 17 beat 1, 28.517 s | Logo at rest at 28.567 s (it lands large at 28.333 s) | +50 ms |

**7. After the drop the grid is strict: one change every two beats, on beats 1 and 3.**
Eight photos, the card and the live shot: ten changes, every one 15 to 72 ms **before** its beat (mean 45 ms, a
frame and a third), none after it. The photos are spaced 25, 27, 27, 27, 27, 27, 25 and 27 frames; two beats are
26.67 frames, so the editor steps 27 and takes two frames back when the lead grows.
GUESS: the lead is deliberate, a picture change a frame early reading as on the beat. A fixed sound delay in
YouTube's file would give the same number, and the file alone cannot tell the two apart.

**8. The stills do not move at all.** The change between frames is zero while each photo is up: no push, no scale,
no fade. The energy is the cut itself plus 2 to 4 blank white frames before each photo (3, 3, 4, 4, 4, 4, 4, 2).

**9. Type: two cards, 4 words and 6 words, small black type on white, one centred line about a quarter of the
frame wide.**
- Card 1, "Fit everyone in": on at full strength on the cut, the three words spread apart, closing up in 8 frames.
  "automatically" slides in from the right 26 frames (two beats) later and the line is at rest at 14.9 s. The full
  line then holds 1.0 s (2.25 beats); the card lasts 2.13 s (4.8 beats). It is not on the beat (81 ms before 8.4;
  the second phrase 103 ms before 9.2).
- Card 2, "Group selfies on iPhone 17 Pro": no animation. On at the cut, off at the cut, 1.8 s (4 beats).
- There is no fade anywhere in the film. Every exit is a cut.

**10. The logo straddles the last hit.** It appears about 2.3 times its size 183 ms before the final hit and is at
rest 50 ms after it, so the settle and the hit arrive together. It holds 1.67 s while the hit rings out; the music
is gone by 29.9 s and the picture cuts to black at 30.0 s. The 5 s of silence in the file is black, after the logo.

**11. The music starts two frames after the picture** (0.068 s), on a full hit, not a fade.

**12. The track was cut to the film.** Its sections run 2, 7, 1, 6 and 1 bars. GUESS: songs are not written in
sections of 7 and 6 bars, so the editor shortened the song to make the breakdown and the drop land where the
picture needed them (the drop is 59 % of the way in).

### Applying it to a 20 s Undirect film at about 135 BPM

GUESS throughout: this is a proposal built from the numbers above, not something measured. At 135 BPM a beat is
0.444 s (26.7 frames at the film's 60 fps), a bar 1.78 s, and 11 bars are 19.6 s.

| Bar | Seconds | What Apple's film does there | Undirect |
|---|---|---|---|
| 1 | 0 to 1.8 | Filmed shot; music in on frame 2 | The hook: the tap that lands somewhere it should not. A plate or a real recording. Music in on a full hit 4 frames (at 60 fps) after picture. |
| 2 to 5 | 1.8 to 8.9 | Real screens, cut on the action | Three or four real recordings of the hijack. Each: hold, the redirect happens, rest 0.2 to 0.4 s, cut. Slide each take so the redirect starts within three 30 fps frames of a beat. Lengths mixed, about 3, 1, 1, 3, 2, 2 beats. The first redirect comes to rest on the beat where the groove enters. |
| 6 | 8.9 to 10.7 | Type card | "Not what you tapped." On at the cut, words apart, closed up in 0.27 s; a second phrase may join two beats later; the full line holds at least 1 s. |
| 7 | 10.7 to 12.4 | Breakdown bar: one held shot, a silent eighth, three blank frames | The press: Undirect switched on, real recording, its move starting on beat 1 of the bar, then held still. The last eighth of the bar silent, with 3 blank frames (6 at 60 fps). |
| 8 to 9 | 12.4 to 16.0 | The drop: a still every two beats | The result: four stills or frozen frames (pages that stayed put, the popup's stopped rows), one on beats 1 and 3 of each bar, each cut 33 to 67 ms ahead of its beat, a few blank frames before each, nothing moving inside them. |
| 10 | 16.0 to 17.8 | Static card, 4 beats | "$1.99 once" (the sale price from 27 to 30 November). On at the cut, no animation, 4 beats. |
| 11 | 17.8 to 19.6 | Logo straddles the final hit | The app icon lands about 2.3 times its size and settles in 0.23 s so that it comes to rest on the last hit. The hit rings out; no cut to silence. |

What this asks of the track: an intro, one breakdown bar with a gap, a drop at about 60 % (12.4 s of 20), and a
final hit that rings. A track that holds one level (reel 3) gives the drop nothing to land on unless it is cut to
make one, as Apple's was.

Where this differs from the Black stage film as built (README, step 2): that film puts its cuts on downbeats and
rests 0.65 to 1.09 s before each cut, and stops the music on the cut to the end card. Apple rests 0.20 to 0.40 s,
keeps the downbeats for the drop and the logo, and lets the last hit ring under the logo.

Where Higgsfield plates would go, if used: bar 1 and one shot late in the film, the two places Apple uses a filmed
shot (2.6 s and 1.6 s of 30 s). Everything between is the real screen.
