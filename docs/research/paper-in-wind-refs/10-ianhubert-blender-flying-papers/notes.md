# 10 Ian Hubert: "Animating flying papers/bags in Blender - Lazy Tutorials"

- URL: https://www.youtube.com/watch?v=F8j1K-_OlH4
- Creator: Ian Hubert (YouTube, 2019, 832K views when opened)
- Kind: CG method, 57 s. Many paper planes blown across the ground; final shot from his film.
- Frames: `frames/f01_t2.jpg` to `f08_t50.jpg` (the setup, the sheets lifting, the turbulence result, the film shot). Page: `page.jpg`, `page.txt`.

## What makes it read as real
- The method, read from the page transcript in Chrome: subdivided planes; ground as a collision object; papers as **soft bodies** (not cloth) with goal off, self collision on, bending raised to 1 for stiffness; a wind pointed up and turned down "so they're just barely hovering", rotated "so they skim along the ground"; then a **turbulence** force, which he says is "what gives it that random motion makes it feel like paper".
- Matches what the real clips show: sheets skim low and the randomness comes from turbulent air, not from the sheet itself.

## How it was made
Blender soft body + wind + turbulence force fields (transcript). Directly testable in our Blender scene as an alternative to the cloth modifier.
