# 07 Lachlan Pace: "Houdini | Newspapers - Vellum Simulation"

- URL: https://www.youtube.com/watch?v=aZxL7VpH2ng
- Creator: Lachlan Pace (student work, featured on the 2023 Houdini student reel per the description)
- Kind: CG with breakdown. A stack of newspapers on a stone ledge is released into a velocity field and catches on a statue.
- Frames: `frames/f01_t2.jpg` to `f03_t10.jpg` (finished shots), `f04_t18.jpg` to `f08_t34.jpg` (breakdown: unpinning, wedging, render). Page: `page.jpg`, `page.txt`.

## What makes it read as real
- Starts exactly like our shot: a neat stack at rest, then the top layers come off in sequence, not all at once (the breakdown labels this "Unpinning").
- Sheets fold along the newspaper spine and flap at the free edges; each sheet keeps big flat panels and bends in one or two places.
- Many sheets in the air at different depths with strong depth of field; foreground pages blur into shapes.
- Light: low sun, pages go translucent and warm when backlit; print shows through.
- Camera: slow drifting moves, several angles of the same event.

## How it was made
Houdini Vellum, rendered in Blender (description). "Stacked some newspapers, released them into a velocity field"; "used wedging to test different seeds and noise amplitudes for the velocity". Breakdown shows the stack being unpinned in steps, a wedge grid of variations, and Blender renders. Our takeaway: pin the stack, release sheets one by one over time, drive them with a noisy velocity field, and wedge the seed and noise amplitude to pick the best take.
