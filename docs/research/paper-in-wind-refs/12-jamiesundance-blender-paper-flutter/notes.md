# 12 Jamie Sundance: "Paper Flutter Physics in Blender (Wind + Soft Body)"

- URL: https://www.youtube.com/watch?v=BY2i_mnpQi4
- Creator: Jamie Sundance (YouTube, 2025; free .blend on Gumroad per the description)
- Kind: CG method, 7.7 min. Posters pinned to a board flutter when a figure walks past.
- Frames: `frames/f01_t15.jpg` to `f07_t400.jpg`. Page: `page.jpg`, `page.txt`.

## What makes it read as real
- For the first second of our shot, while the sheet is still under the stone: the pinned part stays put and the free part ripples. He pins with a soft body **goal vertex group** (the pinned area), then bends the rest with wind plus turbulence.
- From the page transcript in Chrome: goal strength 1, edge bending 1, a collision plane, wind with noise about 10, turbulence strength about 10 ("this is the main thing"), then trial and error; the description says he covers "how to stop it looking floaty". Pre-crumpling the sheet with random proportional editing so it is "not uniform" before simulating.
- A solidify modifier with a second material for the back, so a turning sheet shows paper on its reverse, then subdivision with extra loop cuts so corners stay sharp.

## How it was made
Blender soft body with goal vertex group, wind and turbulence force fields, solidify and subdivision modifiers (transcript and description).
