# References for the iPhone strip directions (ASG148, 22 Nov 2026)

Every set below was fetched this day from `https://itunes.apple.com/lookup?id=<id>&country=us` (`screenshotUrls`,
frames 1-3) and looked at as a strip. Each line says what the set does and the idea taken, or why none was.

## Direct rivals (what the buyer sees beside us in search)

| App | id | What frames 1-3 do | What we take or avoid |
|---|---|---|---|
| 1Blocker | 1365531024 | White ground, small headline, straight phone, a hand-drawn underline; frame 1 is a wall of press logos; the ads in its phones are red blocks with a stop hand. | Avoid: three separate posters, nothing joins them. Take: the 9:41 clock, a made-up site in the phone, and the stopped thing drawn as a plain coloured block (the pop-up windows of directions 3 and 4). |
| AdGuard | 1047223162 | Black ground; one tilted phone whose two halves sit in frames 1 and 2. | Take: a single object cut by the gutter makes two frames one picture. Avoid: tiny type on black. |
| Wipr 2 | 1662217862 | Purple; frame 2 is nothing but a list of fifteen things it blocks. | Take: a frame may be only type (direction 2), and naming the enemy sells (direction 4 shows it as a pile, not a list). Avoid: a feature list where a result should be. |
| AdBlock Pro | 1018301773 | Red-orange gradient, laurel badges, two settings screens. | Avoid: settings screens as the pitch. Its red is why a flat red gradient no longer sets us apart. |
| Undirect (live) | 6810513194 | Red gradient, headline over a cropped phone, three separate frames. | The thing being replaced: no idea a viewer gets without reading. |

## Best-designed sets from other categories

| App | id | What frames 1-3 do | Idea taken |
|---|---|---|---|
| Flighty | 1358823008 | A drawn plane and its route fly out of frame 1 into the tilted phone of frame 2. | Direction 3: one drawn path carries the eye across all three frames, and things travel along it. |
| Any Distance | 1545233932 | "Track your runs" in giant type, a tilted phone across the gutter, a route line under everything. | Direction 2: type as large as the frame allows; Direction 3: a line that is also the subject. |
| Opal | 1497465230 | Headline is the result with a number ("Get back 1h23m every day"), soft blurred edges, a stone as the brand object. | Directions 1-3: each headline is what the buyer gets, not what the app has. Direction 1: one physical object stands for the app. |
| Halide | 885697368 | Frame 1 is a photographed tabletop still life with the phone among real objects. | Direction 1: a photograph nobody took, the phone standing in the scene. |
| Bear | 1016366447 | A sculpted white bear rises through frame 1; the icon made into an object. | Direction 3: the app icon itself, at monument size, is the picture. |
| CapWords | 6738896465 | Sticker objects scattered across the gutters, a phone straddling frames 1-2. | Direction 3: the pop-up windows as loose objects placed across the gutters. |
| Tiimo | 1480220328 | Cards slide out of the phone past its edge. | Directions 1-3: the popup's own row lifted out of the phone and shown large. |
| Headspace | 493145008 | Flat colour fields and one round shape running through two frames. | Direction 3: one flat shape, two colours, no gradient tricks. |
| Duolingo | 570060128 | Full-bleed UI with no device; a three-word caption in a coloured block. | Direction 2: three-word lines that read at thumbnail size. |
| Copilot Money | 1447330651 | Cards float without a device and fade at the edges. | Direction 2: the Blocked row floats free of any device. |
| Structured | 1499198946 | A tilted phone crosses frames 1-2; captions are three or four words. | Direction 2: the phone turned and tilted so it has to cross the gutters. |
| Moises | 1515796612 | Photography behind the phone. | Direction 1: the scene, not a gradient, is the background. |
| Things 3 | 904237743 | Plain blue, a sentence per frame, full screens. | Avoid for search size: the sentences are too small to read at 300 px a frame. |
| Arc Search | 6472513080 | Frame 1 is only two short lines of type on a gradient. | Direction 2: a frame can carry no UI at all if the line is the pitch. |
| Opal, frame 2 | 1497465230 | Shows the thing being blocked (a blurred app icon, "Blocked by Opal") inside the phone, large. | Direction 4: show what gets stopped, at full size, on the losing side of a line. |
| Finch, Play, Croissant, Bezel, Linear | (looked at) | Straight phones under a headline. | Nothing taken: the same pattern as the rivals. |

## Our own

| Source | Idea taken |
|---|---|
| The app icon (`Support/icon/build.py`, the MUTCD R3-4 U-turn arrow) | Direction 3 is that exact outline, stroke 520 px, centred on frame 2. |
| The 1.0.5 In-App Event still (`studio-render` skill, the paperweight) | Direction 1 uses the same path tracer, sweep and soft boxes, and the same black veined stone as the thing that holds. |
| The demo's streaming page (`web/demo/stream`, Marlow TV, made up for the demo) | The page in every phone: a film that just plays is the result the buyer wants. |
| The shipping popup (`Extension/Resources/popup`) | Every enlarged row is the popup's own code rendered large, not a redraw. |

## Which direction came from what

1. **The chain stops here** (path-traced still): Halide's tabletop and Opal's stone, with our own event still's stone.
2. **One sentence** (type over a landscape phone): Any Distance's giant type, Arc Search's type-only frame, Structured's tilted phone.
3. **The U-turn** (the icon as a road): Flighty's route across the gutter, Bear's icon-as-object, CapWords' loose objects.
4. **One press** (the same phone cut in two): Opal's frame 2 and Wipr's named enemies. Added after the owner lifted the rule against showing pop-up pages.
