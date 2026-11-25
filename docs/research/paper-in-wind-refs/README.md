# Paper in wind: references ranked for our shot (ASG215)

Our shot: a gust lifts loose white sheets off a stack held down by a black stone, on a red studio sweep, 9:16, Blender cloth in Cycles (see `../paper-in-wind.md`). Twelve references are saved here, each in its own folder with frames, a page screenshot, the page text and a `notes.md`. The index with URLs and the sources that were gated is `notes.md`. Every reference's frames are on one image: `contact-sheet.jpg` (one row per reference, numbered as the folders).

Searched in Claude in Chrome: YouTube, Artgrid, Pexels, Pixabay, TikTok, Instagram, Behance and ArtStation. Vimeo, Pond5, Shutterstock, Adobe Stock and Reddit were blocked here and were not worked around (`notes.md` rows 13 to 17).

## Top 5 for our shot

1. **02 Just For Laughs Gags, fan blowing stacks off a table** (real, real time). This is our action: stacks held down while a gust peels sheets off the top. Watch `frames/f01_t7.5.jpg` to `f04_t8.25.jpg`. Sheets leave one or a few at a time from the top and the windward edge. They skim low and bounce, they do not arc up, and they stay nearly flat. At full speed it is fast, with each sheet visibly turned between frames 0.25 s apart (my estimate, UNSURE as a number). Match our timing to this unless the film is clearly slow motion.
2. **03 Pexels, Pavel Danilyuk, papers falling in a studio** (real, 4K). This is our look: a plain backdrop, two to five sheets, a still subject. Sheets fall face-on and slip sideways, then one tips and glides off. The sheets nearest the lens are huge, soft and motion blurred. Light: a sheet facing the key goes white and one tipped away goes cool grey. Copy the depth spread and the soft key.
3. **01 Artgrid, MXR Productions, office paper on a Phantom Flex 4K** (real, high speed). The close detail for matching a single sheet. Each sheet holds one soft bow and never ripples like cloth. An edge-on sheet collapses to a bright line, and backlit sheets go translucent with the print showing through. If our sheets wrinkle, flap at the middle, or stay face-on all the time, they will not match.
4. **07 Lachlan Pace, Houdini Vellum newspapers** (CG with breakdown). The closest CG to our setup. A neat stack is unpinned in steps so the layers leave one after another, driven by a velocity field with noise. Seeds and noise amplitude were wedged to pick the take. In our Blender scene that means: release sheets one by one, use turbulence or a noise field rather than a uniform wind, and render several seeds side by side.
5. **10 Ian Hubert, flying papers in Blender** (CG method), with **12 Jamie Sundance** for the first second. Ian's recipe, from the page transcript: soft body instead of cloth, goal off, self collision on, bending 1, a wind just strong enough to make the sheets hover, turned so they skim, then a turbulence force, which he credits with the paper feel. Jamie's soft body goal vertex group pins the part of a sheet under the stone while its free edge flutters (turbulence about 10, wind noise about 10), and a solidify gives the sheet a paper back. Both can be tried in our existing `paper_scene.py` setup within an afternoon.

## Next in line

- **04 Nextil, 200 sheets at 240 fps.** A ream falls as one brick and only fans out when it lands. Our stack must stay solid under the stone, and only the top sheet or two should lift.
- **11 Disney Research OmniAD.** If Blender soft body or cloth still glides but never tumbles, this is the reason and the fix. Tumbling comes from force and torque that depend on the sheet's angle to the wind. A small per-frame script that applies such a lift and torque to each sheet would add it, with no need to simulate the air.
- **06 Paperman.** The film beat to borrow: the sheet bends against its hold first, then pops free.
- **08 Assuena** and **09 CMotionDesign.** The wind front reaches the sheets in order, so they lift in a staggered ribbon. Use this for staging, not for the tumble.
- **05 PTITSA.** Weak image, but real wind lifting sheets off a pile: a small lift, one flip, and the sheet is gone.

## What to match by eye

- Speed. Real time is fast (02). A slow-motion look needs high-speed cues: crisp edges, tiny lag at corners and slow turning (01, 03).
- Bend. Each sheet holds one soft bow or one bent corner, never ripples or wrinkles (01, 02, 03).
- Turn. A sheet rocks, slips sideways, then tips. It does not spin at a steady rate, and it spends real time edge-on (01, 03, 11).
- Release. The stack stays a block. Sheets leave one at a time from the top, windward edge first, with the gust bending the sheet before it lets go (02, 04, 06, 07).
- Light. White facing the key, cool grey turned away, translucent when backlit. Our red sweep will tint the grey side red.
- Count and depth. A few sheets at clearly different depths, with the nearest ones soft and blurred (01, 03).
- Camera. Locked off or a slow drift. The paper does the moving.

## Gaps

- I found no real slow-motion clip of a gust lifting sheets off a stack on a plain backdrop. That exact shot would be ours to film, for example a phone at 240 fps, a desk fan, a ream with a stone on it, and a red card behind.
- UNSURE: the playback speed of 03 relative to real time, and whether any of Paperman's paper was simulated.
