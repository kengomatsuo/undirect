# In-App Event art: Apple's rules, the overlay, and 23 live cards

Read 2026-11-21 for the second version of the 1.0.5 event art, "The Stay-Put Update"
(`Support/AppStore/events/1.0.5/`). The first version, a grey wireframe page with one red arrow on
near-black, was rejected by the owner. Every rule below names the page it came from; a number with no
Apple source says so.

## Apple's rules

From [In-App Events](https://developer.apple.com/app-store/in-app-events/) (fetched and quoted
2026-11-21):

| Rule | Apple's words |
|---|---|
| Card image | `.jpg, .jpeg, .png`, 16:9, 1920x1080 px minimum, 3840x2160 px maximum |
| Details image | `.jpg, .jpeg, .png`, 9:16, 1080x1920 px minimum, 2160x3840 px maximum |
| No text, no logo | "When possible, avoid using text or logos in your media, especially if they include your event name or app name." |
| No border, no scrim | "Don't add borders or gradients to your media. Crops and gradients are automatically applied to your media in order to ensure consistency across the App Store." |
| The two images match | "Aim to create visual continuity across your event card and event details page by using similar colors or illustration styles." |
| Nothing important under the text | "In App Store Connect, you can preview what your provided media will look like in an event card and event details page to confirm that crucial aspects of your image or video will not be obscured." |

From [In-App Event media and audio specifications](https://developer.apple.com/help/app-store-connect/reference/in-app-event-media-and-audio-specifications)
(App Store Connect Help): the same sizes, a 500 MB limit per file, and "Event Card media should appear in
landscape orientation and Event Detail media should appear in portrait orientation." The page gives no
colour space and no safe area.

From [App Store asset best practices](https://developer.apple.com/app-store/asset-best-practices/):

- "Design for both aspect ratios. You need media for the event card (16:9 landscape) and the event
  details page (9:16 portrait). Ensure both communicate your event's essence. Use similar colors or
  illustration styles for visual continuity."
- "Consider the event badge. ... Design your media to complement the badge rather than duplicate it."
- "Design key elements with a safe area in mind to accommodate different devices and orientations. Be
  sure your focal point artwork is within the center of your composition to prevent any unwanted
  clipping."
- "Focus on a single, clear idea. Visually dense or cluttered assets dilute your impact." (said of the
  product page header; taken here as the standard for any store image)

**Apple publishes no safe area in pixels for either image.** Three Apple pages and the WWDC21 session
[Meet in-app events on the App Store](https://developer.apple.com/videos/play/wwdc2021/10171/) were
read for one; each only points at the App Store Connect preview. The path
`developer.apple.com/help/app-store-connect/reference/in-app-events/` is a 404.

## What Apple lays over the image, measured

Apple's own web App Store shows both images with their overlays, so its stylesheet gives real numbers.
Read from `apps.apple.com/assets/index~Cuua8lPjmd.css` on 2026-11-21 (rules `.gradient-overlay`,
`.text-container` and `.event-detail`, with the type tokens they name), then rebuilt in a test page
around this event's text and measured with `getBoundingClientRect`:

| | Event card (385x216 CSS px) | Event details page (340x604 CSS px) |
|---|---|---|
| Scrim | a gradient to `rgb(83 83 83 / 48%)` over the **bottom 80%** of the image | a gradient to the image's own background colour over the **bottom 70%** |
| Blur | `backdrop-filter: blur(10px)`, masked from 6% to 85% of the scrim's height, with `saturate(1.5) brightness(.85)` | the same |
| Text | bottom left, 12 px 16 px padding: badge, name (17 px), short description clamped to one line (12 px semibold), white | bottom, 16 px padding: badge, name (26 px bold), long description (15 px), a rule, then the app's icon, name and a View button |
| Top of the text block | **69.5%** of the height from the top | **64.3%** with a three-line long description |
| Other | none | a date pill at the top left, 16 px in |

A 10 px blur on a 385 px wide card is a 50 px blur at 1920 px wide, so fine detail in the lower half of
the card turns to colour and nothing else.

The iPhone App Store app could not be measured from this machine. Its text is set larger against the
card than the web's, so its overlay reaches higher. Third-party figures, neither from Apple nor
explained by their authors:

- Yellowhead, [Safe zone guidelines](https://www.yellowhead.com/blog/in-app-events-promotional-content-safe-zone-guidelines/):
  card "The top 5% and bottom 40% are at risk of cropping", "A 6% margin on the sides prevents
  unexpected truncation"; details "40% of the bottom may be cut off due to UI overlays", "8% on the top
  can also be hidden". The article names no device and no method.
- AppTweak, [Strategies and best practices for In-App Events](https://www.apptweak.com/en/aso-blog/strategies-best-practices-for-ios-15-in-app-events):
  the overlaid text is white, so "avoid using white backgrounds and bright-colored elements on the
  bottom left corner of the event card"; Hulu's card is its example of white text lost on a light image.

**The band this art keeps to: the page, which is the key subject, sits between 5% and 60% of the height
on both images and in the middle of the width, and nothing light sits below 62%.** That is the stricter
third-party figure, which Apple's web overlay (69.5% and 64.3%) sits inside. The App Store Connect
preview is still the last check before the art is submitted.

## 23 live event cards

The US store's current events for 16 apps, read 2026-11-21 from the public product pages
(`https://apps.apple.com/us/app/id<ID>`, the `appEvents` shelf; the card is `moduleArtwork`, the details
image is `artwork` on `?eventid=<event>`). The images are other companies' artwork and stay out of this
repo. Seven of the details images were viewed as well.

| App (ID) | Event, badge | The card | Taken |
|---|---|---|---|
| Headspace (493145008) | Feel Your Best: Mind Reset, Special Event | One orange half-circle face rising from the bottom edge on a peach sky. Nothing else | One shape, one saturated brand colour, the frame cropping it |
| Strava (426826309) | November 5k Challenge, Challenge | One badge on flat yellow with a chalk ring round it | A single object in the middle; the whole image in one hue |
| CARROT Weather (961390574) | iPhone Duo, Major Update | One device, centred in the upper two thirds, on flat brand blue | A Major Update can be one object on the brand colour |
| Spotify (324684580) | Running Mode, Major Update | Three dark UI panels in the upper 60% on brand green; the lower 40% empty | Dark UI floated on the brand colour; the lower band left bare on purpose |
| Canva (897446215) | Unwrap Canva Pro: Black Friday, Special Event | Photo and UI tiles in the upper 60% on a purple ground; the lower 40% empty | The same bare lower band |
| Goodnotes (1444383602) | Restyle Your Handwriting, Major Update | A thick plum stroke looping across pale lilac, behind a floating panel | One sweeping line carrying the motion behind a still object |
| Goodnotes (1444383602) | 2027 Planners are here!, Major Update | Three planner pages fanned on cyan, running off the bottom edge | Pages as objects with a shadow, not as screenshots |
| Flighty (1358823008) | A Smooth Start to Every Trip, Major Update | A map over the whole frame, a route with three markers in the upper two thirds, the foot faded pale | A pattern that fills the frame, with the meaning in a few marks on it |
| Pinterest (429047995) | Get set for the season, Special Event | Three tilted photo cards on a dark blue textured ground | |
| Facebook (284882215) | Get Facebook Verified, Major Update | A photo with a floating profile card and check badges | |
| Duolingo (570060128) | Join Duo's Pokémon Party!, Challenge | Five characters across a sky | |
| Opal (1497465230) | Stay for Another Slice, Live Event | A soft-focus candle-lit table | |
| Strava (426826309) | The Wiz Khalifa Challenge, Challenge | A portrait photo | |
| Disney+ (1446075923) | two events, Premiere and New Season | Key art, the lower third faded to black by the studio | A baked-in fade, which Apple's page says not to add |
| Pokémon GO (1094591345) | three events, Special Event | A character in a landscape; one has a phone running off the bottom edge | |
| Clash Royale (1053012308) | Giant Evolution is outrageous!, New Season | One character breaking the ground, filling the frame | |
| Genshin Impact (1517783697) | four events, Major Update | Character key art and one landscape | |

What the strongest of them share, and the first version lacked:

- **One saturated ground from edge to edge.** Not one of the 23 is a line diagram on a dark neutral
  ground; the app cards (Headspace, Strava, CARROT, Spotify, Canva, Goodnotes) each flood the frame
  with one brand colour.
- **One idea, large.** Headspace is a single shape. The cards that show UI show one object or one tight
  group, never a diagram.
- **The subject in the upper 60%, the rest bare.** Spotify and Canva leave the lower 40% as plain
  ground. On the details images the subject ends between 40% and 60% of the height (Headspace's face
  near 30%, Strava's badge by 40%, CARROT's device by 48%, Pinterest's cards by 55%), and the rest is
  the ground carried down.
- **Depth and a little craft.** A shadow under a floated object, a texture, a hand-made ring. No card
  is a wireframe.

## The design for 1.0.5

- **The picture: a page standing still in a current.** The event's two lines are "The Stay-Put
  Update" and "Pages can no longer send you away with no tap". A current that carries everything off,
  and one thing it cannot move, says that with no word. The page is the rock in the stream; the white
  arrows are the redirects, bent round it and gone.
- **The arrows leave to the upper right**, the direction of the outbound-link arrow, and their heads
  are about as wide for their stroke as the app icon's (2.1 strokes drawn, 2.16 in `docs/app-icon.md`).
  None of them is the icon's U-turn, so the art carries no logo.
- **The ground is the listing's red.** `#E3192B` is the base of `Support/AppStore/listing-design/wall.html#red`,
  the wallpaper behind every Undirect screenshot and `web/og.png`; the bands are flat tints of it from
  `#CD112A` to `#F7433B`. The page is dark with the site's dark tokens (`web/style.css`), since every
  Undirect listing image shows dark UI (`.claude/rules/store-release.md`).
- **The current is computed, not drawn.** `art.html` solves Laplace's equation for the stream function
  around the page's own rounded outline and fills the bands between stream lines, so they pinch at the
  page's sides and spread before and behind it the way water does. The line that splits on the page is
  a band edge, so the two sides of the split are two tints. The arrows are traced along the same
  stream lines.
- **No gradient, border or scrim** is in the art, after Apple's rule; the only soft edge is the shadow
  under the page and under each arrow.
- **Where things sit**, measured on the built page with `getBoundingClientRect`. Card, 1920x1080: the
  page spans 13.1% to 59.2% of the height and 38.3% to 61.7% of the width; the four arrows span 4.7% to
  61.3% of the height, their heads all inside the middle 88% of the width, and one tail runs off the
  left edge on purpose. Details, 1080x1920: the page spans 14.6% to 58.9% of the height; the three
  arrows span 8.1% to 61.9%. Below that, both images are bands of red only, which is what Apple's blur
  and white text land on.
- **Checked under Apple's overlay.** Both images were laid under the web overlay above with this
  event's badge, name and descriptions, at 385 px and 298 px wide for the card and 340 px for the
  details page: the white text reads on the blurred red, the card's page and arrows stay clear of it,
  and in the details image the lower third of the page fades under the scrim without the text touching it.
- **One source for both.** The same file draws both images and picks the layout from the window's
  shape, so the two keep one style, as Apple asks. The render command is in the comment at the top of
  `Support/AppStore/events/1.0.5/art.html`; a 3840x2160 window gives the same picture at twice the size.

## Third pass: three concrete options (2026-11-21)

The owner called the second version ugly as well and questioned the abstract direction, so this pass
drops the brief toward abstraction. The job, said without naming a page or an arrow: **someone
scrolling the store sees one picture under two lines of white text and, in a second, feels "this keeps
me where I am".** Three pictures that answer it, each a card and a details image, sit in
`Support/AppStore/events/1.0.5/options/<name>/`, with `options/contact-sheet.png` showing all three
under Apple's overlay. The two earlier versions stay where they were (`card-v1.png`, `card.png`).

### Sources read for this pass

- [App Store asset best practices](https://developer.apple.com/app-store/asset-best-practices/),
  fetched again 2026-11-21, under "Focus on your core experience": **"While you may depict content
  outside of your app or game in use, it must still relate to its general functionality."** Under
  "Image": "Your photography, illustration, and graphic design should feel current ... Aim for strong
  composition and a clear focal point for each asset." A metaphor is allowed; each option below names
  how it relates to what the update does.
- [In-App Events](https://developer.apple.com/app-store/in-app-events/), fetched again: the Do and
  Don't lists repeat "Avoid using text or logos in your media" for the card and for the details page.
  None of the three options carries a letter, a numeral or the U-turn mark.
- The web App Store's stylesheet, `apps.apple.com/assets/index~Cuua8lPjmd.css`, still served on
  2026-11-21. The overlay numbers above are reused; the rule text was copied into the contact sheet so
  the blur is Apple's own: `.gradient-overlay { backdrop-filter: blur(10px); background:
  linear-gradient(#0000, var(--color) var(--height)); filter: saturate(1.5) brightness(var(--brightness));
  mask-image: linear-gradient(180deg, #0000 6%, #000001 85%) }`. Type tokens read from the same file:
  card name `--title-2-tall` (400 17px/1.41), card description and both badges `--callout-emphasized`
  (600 12px/1.25), details name `--large-title-emphasized` (700 26px/1.23), details description
  `--title-3` (400 15px/1.33), the date pill's radius `--global-border-radius-medium` (12px).
- The 23 live cards in the table above were not fetched again. What this pass takes from them is the
  list under the table: one idea, large; the subject in the upper 60%; depth and a little craft.
- Three web searches for current event-card or Today-tab art direction (2026-11-21) returned the
  Apple pages above and ASO blogs already cited, and no gallery. Khoi Vinh's "Illustration in the App
  Store" (<https://www.subtraction.com/2018/05/22/illustration-in-the-app-store/>) is the one essay
  they point to on the store's illustration; the page refused the fetch (TLS handshake), so nothing is
  taken from it.
- The product's own material: `web/demo/scroll/harbour.svg` (the Northwind Daily story's picture, whose
  boat, light and palette option A grows from; the event's deep link opens the demo this story is in),
  `docs/screenshots/page-effects/` and the icon's two colours in `Support/icon/build.py`
  (`#E5322B` on near-black).

### The three options

| | A. Moored | B. Paperweight | C. Catnap |
|---|---|---|---|
| The picture | A harbour at dusk cut through at the waterline: a red fishing boat rides a running tide and stays, held by an anchor on the bed | A river stone on a stack of pages on a red sweep; the wind takes every loose sheet up and away, and the pages under the stone stay | A black cat asleep in a red armchair under the one lamp left on |
| Kind | Flat illustration with light and grain | A path-traced still life that reads as a studio photograph | Flat illustration, a character |
| How it relates to the update | The thing that holds you is under the surface and unseen, which is how the extension works; the harbour is the demo story's own | Pages, a force that carries things off, and one weight that stops it | "Stay put" as a creature; the icon's black and red. The loosest tie of the three to what the app does |
| Ground under Apple's text | Deep water, `#090c21` at the foot | The red sweep, `#ce0420` at the foot | A dark floor, `#0e0b11` at the foot |

**Where the subject sits** (fractions of the height from the top; Apple's text starts at 69.5% on the
card and 64.3% on the details page):

| | Card, 1920x1080 | Details, 1080x1920 |
|---|---|---|
| A. Moored | mast light 4%, waterline 39%, anchor from 48%, its lower fluke under the bed from 61% | mast light 4.6%, waterline 26%, anchor from 50%, its lower fluke under the bed from 58% |
| B. Paperweight | stone from 33%, stack down to 60%; the loose sheets run from there off the top right corner | loose sheets from 14%, stone from 45.5%, stack down to 58% |
| C. Catnap | lamp 5% to 13%, chair and cat 18% to 61.5% | lamp 14% to 20%, chair and cat 27% to 60% |

### How they are made

- **`options/render.mjs`** drives headless Chrome over the DevTools protocol and saves a page's canvas
  (or the whole page, for the contact sheet). `--enable-unsafe-swiftshader` is the flag that gave
  headless Chrome a WebGL2 context on this Mac, and the context it gave is the real GPU
  (`ANGLE Metal Renderer: Apple M3`); `--use-angle=metal` alone gave none. No Xcode, no local build.
- **A and C** are canvas drawings (`options/src/moored.html`, `options/src/catnap.html`): one file each
  draws both images and takes its layout from the window's shape, at any multiple of the minimum size.
- **B** is a small path tracer in a fragment shader (`options/src/pt.html` with
  `options/src/scene-paperweight.glsl.js`): signed distance fields for the stone, the stack and each
  sheet, two soft boxes sampled directly, a thin lens for depth of field, an open shutter for the
  sheets' motion, and light let through the thin sheets so a backlit page glows. At 1920x1080 and 900
  samples a pixel one image takes about six minutes on the M3's GPU (350 s and 361 s measured).
  Nothing is painted on afterwards but the tone curve (Khronos PBR Neutral, which keeps the red red)
  and a little grain.
- **No gradient, border or scrim** is added to any of the three, after Apple's rule. The dusk sky, the
  lamp's cone and the fall-off of the studio light are the pictures' own light.
- Render commands are in the comment at the top of each source file.
- **The contact sheet** (`options/src/contact.html`) lays each card and details image under the overlay
  rules above with this event's own badge, name and descriptions, at Apple's web sizes (385 px and
  340 px wide), with the two rejected cards under the same overlay for comparison. The details page's
  scrim colour is each image's own lower third, averaged. It is a replica of the web store: the App
  Store Connect preview and a phone are still the last check before the art is submitted.
- **Not done here:** nothing was uploaded, `event.json` still names the second version's `card.png`
  and `details.png`, and the owner has not chosen. The chosen pair is copied over those two files (or
  `event.json`'s `media` is pointed at it) before `create_event.py` runs.

