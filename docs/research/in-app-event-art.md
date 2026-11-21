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
