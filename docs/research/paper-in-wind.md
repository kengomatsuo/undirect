# Paper in wind: how loose sheets move and how to make ours move that way (ASG215)

Fetched 2026-11-25. Every source below is saved in `docs/research/paper-in-wind-src/`. A finding with no saved file says so. Nothing here is from memory.

## What is wrong with the film now

Read from `~/Repositories/undirect-promo/stay-put/art/scene-paperweight-wind.glsl.js` and `motion.json`:

- Each loose sheet is a rigid box (`sdBox`) bent by one analytic curl (`bendUp`), so it cannot fold, ripple, or lag at a corner.
- Its path is `travel()`: a fixed direction, start speed plus one smooth push. No sheet ever turns toward or away from the wind because of how it is tilted.
- Its turn is `rodr(n, ax, m.z * tl)`: a constant angular rate (`tumble`, 0.7 to 1.1 rad/s) about one fixed axis. Curl flutter is `1 + .35 sin(hz * 2 pi t)`, a sine.
- Four sheets use the same recipe with different constants, so they read as four copies.

## 1. How real paper moves

| Finding | Source (saved file) |
|---|---|
| A business card or leaf falling in air is at Reynolds number about 10^3. Plates there **flutter** (swing side to side) or **tumble** (rotate and drift sideways), and the sort depends on the Reynolds number, the plate's dimensionless moment of inertia and its thickness-to-width ratio. | Andersen, Pesavento, Wang, J. Fluid Mech. 541 (2005) pp. 65-90: `andersen-2005-jfm.pdf` |
| In their measurements and simulations, flutter is periodic and close to simple harmonics; tumbling shows a **period-two** pattern (alternate turns differ); some regimes are apparently chaotic. | same |
| Near the cusp-like **turning points** of a flutter the plate **elevates**. That lift cannot come from the sideways speed alone; the fluid force is dominated by a term proportional to the plate's **angular velocity**. The torque on a freely falling plate is one to two orders smaller than on a glider held at a fixed angle. | same |
| Disks falling in a fluid show four regimes by moment of inertia and Reynolds number: steady fall, periodic oscillation, chaotic, continuous tumbling. In the chaotic one the disk swings with growing amplitude until it flips, tumbles a few times, then drops back to swinging; the count and gaps look random. | Field, Klaus, Moore, Nori 1997, long version: `umich-nori-disks-long.pdf`; Nature page: `nature-field-1997.html` |
| A card dropped flat stays nearly flat; dropped on edge it goes wild. Small start differences matter most in the chaotic case. | `umich-nori-disks-long.pdf` (the card-trick opening) |
| Rectangular cards tumble but do not gyrate; parallelograms and seeds couple tumble with autogyration. | Z. Jane Wang group page: `cornell-falling-paper.html` |

What this means for our shot: a flying sheet is not a rigid plate on a line. Its lift and turn are coupled (it lifts at the turning points), it does not repeat exactly, and it speeds up and slows down as it swings. Constant tumble rate with sine flutter has none of that, which is the owner's "so unnatural".

**Not found:** slow-motion footage of paper blown off a desk. Searches returned stock clips and a Colorado State high-speed collection, none of a stack and a gust, and I did not save any footage. UNSURE whether such footage exists in the open; shooting it ourselves is option D below.

## 2. Best shots and how they were made

Thin evidence; I found no breakdown of a famous flying-paper shot written by the people who made it.

| Shot | What was said | Source (saved file) |
|---|---|---|
| Everything Everywhere All at Once, bagel showdown | "a lot of paper flying around, practical paper that sometimes needed to whoosh by very close to the bagel." The same interview says the team also rendered certain sheets in C4D, with even lighting so anyone could use a sheet in a shot. So: real paper for the hero, CG sheets to fill. | `schoolofmotion-eeaao.html` |
| Houdini artists making paper | "Not stopping flapping": a simulated sheet does not lose energy and reads as fabric; they need more stiffness and drag; the sheet also does not flatten as it falls as real paper does. | `sidefx-proper-paper-sim.html` |
| Houdini Vellum lift | A user finds a patch with default drag "swims" down through turbulent air instead of gliding on lift; the fix offered is a medium for the airflow, or a non-physical workaround. | `sidefx-vellum-aero-lift.html` |
| C4D cloth for paper | A paper-town motion piece: the cloth "animated like paper but ended up looking smooth and lifeless"; character came from random distortion and per-object tuning of gravity, flexion and friction. | `maxon-folding-stuff.html` |

Gap: I found no usable source for how the Harry Potter letters or any fan rig for paper was done (UNSURE; I do not cite one).

The common pattern in what I did read: the pros either shoot paper for hero moments or simulate it with real stiffness, air drag, and an aerodynamic lift model, and in both cases spend the effort on imperfection.

## 3. Methods for our shot

Our constraints: a stone and a stack in a look matched to the event art; two sheets carry printed words that must stay readable at rest and travel with the sheet; 9:16; GPU work on win-pc only.

| Method | Fits | Costs and risks |
|---|---|---|
| A. Keep the SDF tracer, better motion (a per-sheet path from a small rigid-body-plus-lift model: position, tilt, flutter coupled by the physics above) | Same look, same pipeline, 17 s a 1080x1920 frame at 64-96 spp per the studio-render skill | Sheet stays one rigid box with one analytic curl: it cannot ripple, fold at a corner, or peel off a stack. Needs a written flight model and still looks like a stiff card. |
| B. Blender cloth in Cycles on the RTX 4060 (recommended, proved below) | Real sheet bending and peeling, texture (words) rides the mesh by UV, motion blur from the cache, Khronos Neutral tone map is built in, same lights and camera numbers | Cloth is CPU-side; settings need tuning (see below); Blender's cloth has drag but no flutter-tumble aerodynamic model, so gliding is good, tumbling is not automatic. GPL-2.0-or-later, free. |
| C. Houdini Vellum with an aerodynamic lift setup | Best control of lift per the SideFX threads | Paid or apprentice licence, not installed, steeper learning; not tried. UNSURE on licence cost (not fetched). |
| D. Shoot real paper (fan, black or red sweep, 240 fps) and composite | Truest motion, is what EEAAO used for its hero | We have no studio rig; a red seamless sweep, a gust that repeats, and printed words that stay readable and match type in the film are hard on set; stone and stack still need CG. |
| E. Hybrid: Blender sim for motion, our tracer for the final look | Keeps the exact event-art look | Needs a mesh-to-GLSL bridge (the tracer takes analytic SDFs); costly. Not advised. |

### What I learned running B (Blender 4.5.17, win-pc)

- Blender was not on win-pc; I unzipped the portable 4.5.17 build into `C:\paperproof` (398 MB, no installer). Cycles with OptiX sees the RTX 4060 (8 GB).
- First sim blew up into a crumpled ball because the sheet started inside the stack's collision shell (collision thickness plus slab tilt exceeded the 0.9 mm gap). Starting 3 mm above the stack fixed it.
- Real paper density (80 g/m2) gives about 0.07 g per vertex; this is stable once the start gap is right. Bending stiffness near 10 and tension 50 gave stiff paper that curls instead of flapping like cloth.
- Blender's wind needs strengths in the tens of thousands to lift a 1 g sheet. A uniform wind lifts the sheet flat, like a tray, which looks fake. A wind with distance falloff plus a vortex field (axis along depth) makes the sheet rise, arc, and turn its face to the camera: the first signs of the cusp-and-lift behaviour in section 1.
- Not achieved: repeated flutter-and-tumble flips. The cloth glides and curls; it does not tumble end over end. Proof is one sheet for four seconds, not the full shot.

## 4. Recommendation

Use B (Blender cloth, Cycles) for the loose sheets, keep the stone and stack in the same Blender scene so contacts are real, and add a second pass of tuning for tumble: more turbulence scale variety, a sheet that starts with a rolled corner, and per-sheet seeds so the four sheets differ. Reasons: the owner's complaint is the motion, the tracer cannot make a sheet bend against the wind, cloth can; words on the sheet follow by UV; render time is fine on the 4060; no new cost. Keep A as the fallback only for far, small, blurred sheets, where rigid motion with the physics-coupled path is enough.

Open risk: if after tuning the cloth glides but never tumbles, the next step is C (Vellum) or D, to be decided by the coordinator.

## 5. Proof and timing (measured on win-pc, 2026-11-25)

Files in `~/Repositories/undirect-promo/monholt-films-3/out/paper-proof/`:

- `paper-proof-1sheet-1080x1920.mp4`: 4.0 s, 30 fps, 120 frames, one sheet with the `ink1.png` words lifting off the stack and leaving up and right.
- `frame-sheet-old-above-new.png`: top row the current film at 10.9 to 13.7 s, bottom row the proof at frames 1, 14, 22, 30, 40, 52, 70, 100.
- `side-by-side-old-left-new-right.mp4`: the current film's 10.75-14.35 s beside the proof, 540x960 each.
- `paper_scene.py`: the whole Blender scene (sweep, stack, stone, two soft boxes, camera numbers from the tracer scene). The exact command is in its header; the settings used were `wind=40000 turb=40 bend=10 ten=50 wx=.8 wy=-.2 wz=.9 wlx=-30 wly=0 wlz=10 fp=1.0 vort=60`.
- `frames/` the 120 PNGs; `dbg/` the tuning stills; `old-frames/` the film frames.

Timing: cloth sim 68 s for 120 frames (CPU, i9-13900H); Cycles with OptiX at 1080x1920, 64 samples with denoise and motion blur: 456 s for 120 frames, 3.8 s a frame. Total about 9 minutes for these 4 seconds, against about 17 s a frame for the tracer at 64-96 spp (studio-render skill), so Cycles is not slower here.

Estimate for a full shot (UNSURE, extrapolated): four sheets plus two printed ones means about four times the cloth work (about 5 min of sim) and perhaps 6 to 10 s a frame at 96 samples; the film's flying parts are about 160 + 215 frames (0-5.4 s and 10.75-17.9 s), so roughly 40 to 60 minutes of render plus sim for all of them, and extra for retakes after tuning.

What the proof shows, plainly:

- Better: the sheet lifts at its free edge, arcs, ripples at the rim and turns its face to the camera, and speed is not constant. The words ride the sheet by UV and are sharp while it lies still.
- Not yet: it is one sheet and small in frame, so the words are not readable once it moves; it glides and curls but does not flutter-flip or tumble; the lighting is a little darker than the film and the stone's white vein is not in the proof (the stone is plain black; the vein node exists but did not render visibly, UNSURE why).
- Tuning knobs found by trial are listed in section 3; per-sheet seeds and a rolled starting corner are the next steps.


## 6. The real shots in Blender (A1, A2, A3), 2026-11-25

Scene: `~/Repositories/undirect-promo/monholt-films-3/out/paper-proof/stay_put.py` (one file, `shot=A1|A2|A3`). Frames: `~/Repositories/undirect-promo/public/m3/art/blender/{a1,a2,a3}/f-NNNN.jpg`, 1080x1920, 30 fps, JPEG at Blender quality 94 (about ffmpeg q 3). Frame sheets beside the old film: `frame-sheet-a1-old-above-new.png`, `frame-sheet-a2-old-above-new.png`, `frame-sheet-a3-old-above-new.png`, and `frame-sheet-a2-vs-refs-1-3.png` against the saved real footage (`paper-in-wind-refs/`, #1 and #3).

What matched the event art (checked against `card.png`, `details.png` and `public/m3/art/f-0000.jpg`): the tracer's own camera (`pos (-6,22,96)`, `at (2,2.6,0)`, 34 deg), the red sweep with its cove, the two soft boxes, an 18-layer stack with each layer a hair off the last, the stone built as the tracer's smooth union of two ellipsoids with its white vein, three curled top sheets under the stone, Khronos Neutral tone map. At t = 0 the A2 frame sits on top of `f-0000.jpg` almost sheet for sheet. Region colours (sRGB, mine against the tracer frame): top wall 144,1,16 against 144,1,16; floor 213,23,41 against 215,4,34; stack top 203,179,168 against 210,193,183. The floor keeps a little more green than the tracer's.

What the sheets do now, and why:

- **Paper, not fabric.** Cloth solver with mass 0.02 per vertex, tension 800, bending 800, damping 10 and 40, 64x46 vertices for A1 and A3 and 40x28 for A2 (a 64x46 A2 run left sheets hanging at the end and crinkled mid-flight, so I kept the 40x28 sim; the render still smooths it with a subdivision level), then one level of subdivision and a solidify. Lower bending (20 to 100) crinkled and tore at the rim; 2000 folded sharp creases; about 800 keeps flat areas with one soft bow, which is what the real footage shows (ref #1).
- **Why those numbers.** Blender's cloth gives a heavy sheet realistic fall speed only at masses near 0.01 to 0.3 per vertex; at the real 80 g/m2 (about 5e-6 per vertex) a sheet barely falls. So mass, air viscosity (0.1) and wind (tens of thousands) are tuned by eye, not physical.
- **Motion.** The push on a cloth sheet in Blender is along its normal, so each sheet has its own wind aimed at its face plus an upward bias, its own turbulence (size 0.08 to 0.14 m) and seed, gravity weight reduced for the near sheets; no two take the same path. The sheets rock, slip, tip, spend time edge-on and clear the frame. Turbulence above about 8000 or any vortex crumples a sheet.
- **The top sheets** (pinned under the stone) crumpled under the solver where they meet the stone, so they are shape-keyed curls whose curl and twist ride a damped spring driven by the gust plus noise; each lags and overshoots by its own amount. This stays smooth like paper.
- **A1:** the sheet with `ink1.png` is held still 3.58 s by starting the cloth cache at the release frame, then lifted out of the top over 1.79 s while focus moves from 74 cm to the stone. **A3:** `ink2.png`, held 2.67 s, lifted out in 0.91 s. The printed words are a texture on the mesh (UV), black ink on the front only, so they stay crisp while held (checked at 100 percent) and bend, blur and tumble with the sheet.

Render times on win-pc (RTX 4060, Blender 4.5.17, Cycles OptiX with denoise, motion blur on, 1080x1920). These were measured while up to five Blender jobs shared the GPU, so they overstate a lone job; the single-sheet test before, at 64 samples, took 3.8 s a frame alone.

| Shot | Frames | Cloth sim | Render (sharing the GPU) |
|---|---|---|---|
| A1 | 161 (hold 107 copies of one 256-sample frame, 54 lift frames at 128 samples) | 82 s | 50 s for the hold frame; 1164 s for the 54 lift frames (21.6 s each) |
| A3 | 107 (80 hold copies, 27 lift frames at 128 samples) | 20 s | 34 s for the hold frame; 491 s for 27 lift frames (18.2 s each) |
| A2 | 107 frames at 80 samples | 22 s | 620 s for 107 frames (5.8 s each; the GPU was shared with one other job for part of it) |

What I could not make look real:

- Sheets never fully flip end over end the way thrown paper does in ref #3; they rock and tip and some go edge-on, but a sheet never spends a full second spinning.
- A sheet released from hold sometimes shows light creasing while it is being pushed hardest (A1 frames about 125 to 135, A3 frames about 90 to 95). It is mild and short; the old film's rigid card had none.
- The stone's white vein edge is slightly ragged at 1080x1920.
- The old film's near-sheet shadow on the floor is darker and sharper than the new one.
- All values above were tuned by eye on stills; a real slow-motion clip of a gust lifting sheets off a stack on a plain backdrop was not found (the refs README says so too), so the pace of A2 is a judgment, not a match to a measurement.


## 7. Zero wrinkles: the rendered sheet is a smooth subdivision of a coarse cage (2026-11-25, evening)

The owner: the movement is fine, any crease ruins the paper. A fix by tuning stiffness can always fail on some frame, so the sheet that is rendered can no longer hold a crease at all.

- **How.** The cloth sim is unchanged (same numbers as the shots the owner accepted, so the motion and timing are the same). It no longer gets rendered. Each frame its mesh is sampled at 9x7 places (a cage of 8x6 quads, for every loose sheet) and that cage, one shape key per frame, is what the camera sees, through Corrective Smooth, a Catmull-Clark subdivision (4 levels at render, corners kept) and a 0.1 mm solidify. A surface made this way can only bend in curves wider than a cage cell, about 2.4 cm.
- **The three curled top sheets** got the same treatment: a 20x12 cage of the analytic curl (driven by the damped spring), smoothed and subdivided.
- **Measured, every frame, not by eye.** `stay_put.py ... crease` evaluates each rendered sheet in every frame and reports the sharpest angle between neighbouring faces. Largest over all frames: A1 3.1 degrees, A3 3.0, A2 8.7 (a crease would show tens of degrees). Output: `out/paper-proof/crease-check.txt`.
- **Looked at, at 100 percent.** Four lift frames of A1 and A3 and four mid-flight frames of A2 as 1000-pixel crops, plus before and after sheets: `public/m3/art/blender/frame-sheet-a1-before-above-after.png`, `-a2-`, `-a3-`. Words on the held sheets remain crisp and every sheet shows one smooth bow.
- **Dead ends worth knowing.** Simulating the coarse cage itself (63 vertices) changed the motion completely: Blender's air drag and wind scale with vertex count and area differently, and no ratio I tried matched. Driving the cage from the fine sim keeps the motion exactly.
- **Render times** (win-pc, several jobs sharing the GPU): A1 sim 87 s, hold frame 65 s, 54 lift frames 1085 s (20 s each); A3 sim 37 s, hold frame 47 s, 27 lift frames 659 s (24 s each); A2 sim 45 s, 107 frames 1282 s (12 s each). Run alone, a frame is about 4 to 6 s.
- **Not done:** the old film's frames could not be put above the new ones this time (the film file in Downloads is gone); the sheets compare the previous Blender render (`out/paper-proof/before-wrinkle/`) with the new one.

## Sources saved (folder `docs/research/paper-in-wind-src/`)

`andersen-2005-jfm.pdf`, `umich-nori-disks-long.pdf`, `nature-field-1997.html`, `cornell-falling-paper.html`, `schoolofmotion-eeaao.html`, `sidefx-proper-paper-sim.html`, `sidefx-vellum-aero-lift.html`, `maxon-folding-stuff.html`, `blender-cloth*.html`, `blender-force-*.html`, `blender-download-index.html`, `blender-requirements.html`, `blender-cloth-cc-header.txt` (source header says GPL-2.0-or-later).
