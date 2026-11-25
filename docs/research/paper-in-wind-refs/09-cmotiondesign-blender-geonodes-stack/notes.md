# 09 CMotionDesign: "How the Custom Wind-Blown Paper Stack Works in Blender"

- URL: https://www.youtube.com/watch?v=ad6eTB3hsaU
- Creator: CMotionDesign (YouTube, 2025; setup sold on Gumroad per the description)
- Kind: CG tutorial. A paper stack on a table; the top sheets peel off and stream away in a wind.
- Frames: `frames/f01_t140.jpg` to `f07_t340.jpg` (viewport: the sheets streaming off, then the stack in a render). Page: `page.jpg`, `page.txt`.

## What makes it read as real
- Same staging as ours: a stack on a surface, sheets leaving the top one after another in a stream that bends with the wind. Good to copy for timing (staggered release) and for the stream's shape.
- The sheets curl as they leave, then stay fairly rigid; it reads as procedural (each sheet follows a similar path). Use it for staging, not for the tumble.

## How it was made
Blender Geometry Nodes, controlled from the modifier panel: timing, wind direction and speed, and paper textures (description). Not a physics simulation, so no collisions or real aerodynamics (inferred from "Geometry Nodes" and the controls listed; UNSURE about the node internals, which I did not open).
