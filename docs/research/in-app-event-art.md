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


## Event text

Read 2026-11-21 for the rewrite of the event's name, short description and long description (card
ASG128), after the owner read the first text and said the description needs rework. Each finding was
written here as it landed.

### Apple's rules for the three fields

From [In-App Events](https://developer.apple.com/app-store/in-app-events/), section "Creating effective
metadata", fetched 2026-11-21:

| Field | Limit | Apple's words |
|---|---|---|
| Event name | 30 characters, title case | "Choose a distinctive, unique name ... This should be the actual name of the event, such as 'June Leaderboard Climb,' rather than a call to action or tagline, such as 'Watch the livestream.' Avoid generic terms or describing the type of event, since the event badge already displays this information." |
| Short description | 50 characters, sentence case | "Briefly summarize your In-App Event ... This information displays on your event card." |
| Long description | 120 characters, sentence case | "Provide more information about your event — such as potential rewards ... This information displays on your event details page." |

The same section, on all three:

- The text must be about the event: "make sure it accurately portrays your event and is specific to the
  event experience, rather than sharing general information about your app or promoting its content or
  services." The Don't list repeats it as "Don't use the description to promote your app or services."
- "Use proper capitalization and punctuation. Avoid using all capitals and don't use excessive
  punctuation marks, such as multiple exclamation points."
- "Avoid claims that can't be verified, such as 'the best' or '#1,' as well as extra words, such as
  'game event.'"
- "Don't include specific prices in your metadata ... Including specific pricing will lead to rejection
  by App Review." This is the one line on the page that names rejection outright.
- Do list, for the card and for the details page: "Use title case. Choose a name that accurately
  describes the event. Use sentence case and describe the event experience." Don't list: "Don't use a
  call to action as the name. Avoid using all capitals. Don't use multiple punctuation points."

[App Review Guideline 2.3.13](https://developer.apple.com/app-store/review/guidelines/), fetched the
same day, is the rule a reviewer cites: "All event metadata must be accurate and pertain to the event
itself, rather than the app more generally." It also says "your event deep link must direct users to
the proper destination within your app."

Apple's Tech Talk [Get started with in-app events](https://developer.apple.com/videos/play/tech-talks/10889/)
(transcript read 2026-11-21) adds:

- "Avoid including the type of event in the title or descriptions." **"The Stay-Put Update" sits
  directly under a badge that reads MAJOR UPDATE, so the card says "update" twice.**
- Metadata also falls under guideline 2.3.8 (fit for a 4+ audience).
- Apple's own example of a Major Update is named for the feature, "Guided Climbs", and its Premiere
  example's short description is praised because it lifts "unique aspects of the show ... such as how
  it features stories from the world's best climbers": a concrete particular, not a summary of the app.
- Who sees the card: "People who have previously downloaded your app or game, including those who have
  deleted it, will see them above your screenshots ... users who have not downloaded your app will see
  your event cards below your screenshots." In search, a person who has the app sees the event card
  beside it and a person who does not sees screenshots; a search for the event itself shows the card
  "regardless of user state". So the card's first readers are people who already own Undirect, and the
  text has to tell an owner what changed as well as tell a stranger what it does.
- "Remember that the link must be directed to your app or game not somewhere else like the web."
  `event.json`'s deep link is `https://undirect.matsuokengo.com/demo/`, and `project.yml` declares no
  associated domain, so that link opens Safari and not the app. Not part of the text, but it is the
  other thing in this event a reviewer could turn down.

The App Store Connect help pages [Offer In-App Events](https://developer.apple.com/help/app-store-connect/offer-in-app-events/offer-in-app-events),
[Submit an In-App Event](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-in-app-event)
and [In-App Event badges](https://developer.apple.com/help/app-store-connect/reference/in-app-events/in-app-event-badges)
repeat the three limits and the badge definitions and list no rejection reasons of their own. Major
Update is "Introducing significant new features, content, or experiences ... These events go beyond
minor enhancements like UI adjustments or bug fixes", so the text has to show a new capability and
must not read as a fix. In-App Events show on the App Store for iOS and iPadOS only ("People can
discover your In-App Events right on the App Store in iOS and iPadOS"), so every reader of this text is
holding an iPhone or an iPad.

### 85 live events, read for their words

The US store's current events for 51 apps, read 2026-11-21 from the public product pages
(`https://apps.apple.com/us/app/id<ID>`; each event's `title`, `subtitle` and `detail` in the page's
`serialized-server-data` are the name, short description and long description, and `kind` is the
badge). 114 pages were fetched, 51 had events, 85 events in all: 38 Major Update, 23 Special Event,
9 Challenge, 6 New Season, 5 Live Event, 4 Premiere. **None of the 13 Safari extensions and blockers
fetched has an event running** (1Blocker, AdGuard, AdBlock Pro, Wipr 2, uBlock Origin Lite,
StopTheMadness Pro, Hush, Noir, Vinegar, Magic Lasso, Dark Reader, Kagi for Safari, Halt), so there is
no rival card to match or to differ from.

Counted over the 38 Major Update events:

| What | Count |
|---|---|
| Name contains the word "update" | 0 of 38 (0 of all 85) |
| Name length, median | 25 characters; short description 44.5; long description 114 |
| Short description says "you" or "your" | 12 of 38 |
| Short description opens with the reader's situation as a question | 3 of 38: Goodnotes, Uber, Zero |
| Short description ends with a full stop / an exclamation mark / nothing | 13 / 6 / 19 |
| Long description ends with a full stop | 28 of 38 |
| Long description is one sentence / two / three | 14 / 18 / 4 |
| Long description names the app | 19 of 38 |
| Name is not in title case | 18 of 38, most of them large companies (YouTube, Google, Lightroom, Tinder) |

The cards that read best, word for word:

| App | Name | Short description | Long description |
|---|---|---|---|
| Flighty | A Smooth Start to Every Trip | Know when to leave for the airport | Plan your drive, check-in, security, and lounge time. Get traffic alerts and a reminder when it's time to leave. |
| Goodnotes | Restyle Your Handwriting | Messy notes? Make them neat in one tap! | Lasso your handwriting, tap Restyle and pick a style. Available in select languages. |
| Lightroom | One tap to open closed eyes | Fix accidental blinks and rescue your best photos. | Turn nearly perfect portraits and group pictures into lifetime favorites by opening closed eyes naturally with one tap. |
| Uber | New: Parking, now on Uber | Driving? Book a parking spot with Parking on Uber. | No more circling the lot and hoping you'll find a spot. Reserve a parking spot ahead of time with Parking on Uber. |
| Zero | GLP-1 Mode | Taking a GLP-1? You're in the right place. | New GLP-1 Mode adds medication tracking and guidance alongside AI meal analysis. Included with Zero Plus. |
| Notability | Map your ideas on Whiteboards | Room to think on an infinite canvas. | Whiteboards grow as your ideas do. Add shapes, link them with connectors, and turn a brainstorm into a diagram on iPad. |
| Tinder | The group chat is going out | New Group Hangouts: Bring friends. Meet theirs. | With Group Hangouts, bring your besties, pick an activity, and meet other groups. Fun is a given, romance is optional. |
| Spotify | Running Mode | Meet your personalized running tool | Your run style. Your BPM. Your custom playlist. |

And the weak ones, for the same reason each time, that a line says nothing the line above it did not:
NYT Games repeats its short description as the first sentence of the long one, YouTube's long
description is its short one with "With custom feeds, you can" in front, and Hearthstone's "New Tavern
Pass!" is followed by "New Tavern Pass Available Now".

What the strong ones do, taken for this event:

- **The name is the feature or what it gives you, never the release.** "Running Mode", "GLP-1 Mode",
  "Restyle Your Handwriting", "A Smooth Start to Every Trip". The badge says Major Update, so the name
  is free to say something else.
- **The short description is one moment in the reader's own day.** "Know when to leave for the
  airport", "Fix accidental blinks", "Messy notes?", "Driving?". None describes how the feature works.
  The current "Pages can no longer send you away with no tap" describes the mechanism from the page's
  side, in the repo's word ("with no tap") where buyers write "without me clicking".
- **The long description is the particulars the short one had no room for:** the steps (Goodnotes), the
  things covered (Flighty), the pain in the user's words and then the fix (Uber). Two sentences is the
  commonest shape.
- **A limit is said plainly, as the last sentence.** "Available in select languages." (Goodnotes),
  "Included with Zero Plus." (Zero), "Available only for users in the U.S. and Canada" (Uber). So "on
  sites where Undirect is on" has a place in the long description and precedent for being there.
- **Three lines, three jobs.** Name, short and long each add something; none restates another.

### What vendors say about search

AppTweak, [Strategies and best practices for In-App Events](https://www.apptweak.com/en/aso-blog/strategies-best-practices-for-ios-15-in-app-events)
(last updated 2024-09-25, fetched 2026-11-21): event name "keywords indexed—meaning your app can rank
in search results for these terms", short description "keywords indexed", long description "not
indexed". Its evidence is one observation (Peacock's card showing for "streaming") and no test. Apple's
page says only that "Users can also search for In-App Events directly." Treated as a hypothesis: a
name or short description that holds "redirect" costs nothing and may be found; `docs/aso/research.md`
finding 2 has "redirect" completing to "redirect blocker" in the US and GB type-ahead. "Stay-Put" is a
word nobody types.

A web search for developers' own reports of an event rejected over its name or description
(2026-11-21) found none; the Apple forum threads it returned are about apps and in-app purchases.

### What the buyer says, and what 1.0.5 can be said to do

The words are from `docs/research/undirect-voice-of-customer.md`: "keeps redirecting me to a scam page
without me clicking on the screen" (row 23), "suddenly and violently redirected me" (row 1), "auto
redirect ads" (row 24), "wasn't able to go back" (row 52), "go back 5 pages" (row 7). Nobody in the 55
rows wrote "no tap" or "send you away"; they write "redirected", "scam page", "without clicking" and
"go back". The 1.0.5 release notes and the site already say "without you tapping", "stays put", "Back
works again" and "on any site where Undirect is on", so the event text keeps those four and adds none.

Two limits on what the text may claim:

- **The Back half is shown on Mac Safari only.** `docs/research/undirect-pains.md` ("The Back trap on
  iOS Safari 26") records that the demo trap does not fire on the iPad simulator even with Undirect
  off, because WebKit already skips those history entries. The no-tap redirect is shown on iOS
  (`docs/screenshots/pains/ios-scroll-guard-on-article-stays.png`). The event card is seen on iPhone
  and iPad only, so the text leads with the redirect and gives Back a clause, except in set C.
- **The guard works on sites where Undirect has been switched on**, and lets a sign-in round trip and
  a link shim through. "Never" and "every site" are out; "on sites where Undirect is on" goes in the
  long description where it fits.

The event has an en-US text only, and App Store Connect shows the primary language to every reader
whose language the event lacks, so the words are also read by people for whom English is a second
language. "Stay put" is an idiom; the short and long descriptions around it use plain verbs.

### The sets

Rendered over the Paperweight art in `Support/AppStore/events/1.0.5/options/text-sheet.png` (source
`options/src/text-sheet.html`, which fails the render if a line passes Apple's limit). Each line was
counted by the script and run through `ai-prose-scan.ts`: 0 hits on these twelve lines. A first name
for set B, "No Tap, No Redirect", was dropped because the scanner bans the shape.

| | Name | Short description | Long description |
|---|---|---|---|
| Before | The Stay-Put Update (19) | Pages can no longer send you away with no tap (45) | Undirect now keeps you on the page when a site redirects as it loads or while you scroll, and Back takes you back. (114) |
| A. The complaint, answered | The Page Stays Put (18) | Redirected without tapping anything? Not anymore. (49) | On sites where Undirect is on, a page can't send you elsewhere as it loads or while you scroll. And Back works again. (117) |
| B. The reader's moment | No Redirect Without a Tap (25) | Read to the end. The page can't send you away. (46) | You're reading, you touch nothing, and you land on a scam page. Undirect now stops that, and Back works again. (110) |
| C. The Back button | Back Means Back (15) | Pages can no longer trap you with the Back button (49) | Press Back five times and still on the same page? That's over, and so are redirects that fire without a tap. (108) |
| D. The name kept | The Stay-Put Update (19) | Now stops pages that redirect on their own (42) | If a page tries to send you off as it loads or while you scroll, you stay put and the address shows in your list. (113) |

**The pick is A.** Its short description is row 23's complaint turned into a question and answered,
the shape of the three best-worded Major Update cards in the sample (Goodnotes, Uber, Zero). Its three
lines do three jobs: the name is what the picture shows (pages that stay under the stone), the card
line is the reader's own moment, and the details line holds what the card had no room for, which is
when the redirect fires, the limit said plainly as Goodnotes and Zero say theirs, and Back. It costs
the name already written into the launch notes.

**On the name.** "The Stay-Put Update" is a real name and nothing in Apple's text forbids it, but it
repeats the badge's word directly under the badge, Apple asks that the name not describe the type of
event, and none of the 85 live names does. "The Page Stays Put" keeps the phrase and the picture and
drops the repeat. If the name is kept, A's two descriptions sit under it unchanged, and D shows the
name with descriptions written for it.

What each of the others costs: B's name wraps to two lines on the details page with "Tap" alone on the
second, and its long description leaves out the limit. C promises the half that is unproven on the
devices that will see the card. D has no room for Back.

Not done: nothing was uploaded, submitted or committed, and `event.json` still holds the old text. No
second reader checked the lines for machine prose; the house notes ask for one, and they also name
`~/library/research/ai-prose-2026/` and `ad-psychology/`, neither of which is on this Mac. A wider
sample of live cards was started through Apple's search API and stopped, because the API throttled it.

## Event text, second pass: the descriptions only, with more pop

2026-11-21, after the owner read `options/text-sheet.png`. His words: "I didn't mean the title. I was
only talking about the description. Visual overhaul and like even more tricks detected or something I
don't know. Keep the main point of the app still in Idk add more pop or something RESEARXH OTHERSSSSSS".
So the name stays "The Stay-Put Update", and the sets and the pick in the section above are
superseded: they changed the name, and they explained where he wants energy.

### What each version can truthfully claim

Guideline 2.3.13 asks that the text be accurate, and the event runs 2026-11-27 to 2026-12-27.

- **1.0.5** (build 15, in review, the version the event opens with): the two new catches, a redirect
  nobody tapped for (as a page loads, on a timer, while scrolling) and a Back-button trap. These are
  the "more tricks detected". The Back half is shown on Mac Safari only (first pass, above).
- **1.0.6** (`project.yml` reads `MARKETING_VERSION: "1.0.6"`; built, not submitted): the "visual
  overhaul". Read from `Extension/Resources/content/fx.js`, `docs/research/page-effects.md` and the
  frames in `docs/screenshots/page-effects/`: a smoked-glass note at the foot of the page whose blocked
  address is wiped into dust ("Stopped", "Kept you here", "Back button trap stopped"), and five effects
  drawn on the trap itself. `shatter`: the invisible layer lights up from the press, cracks and falls.
  `burst`: a small pop-up window is struck out and blows away. `snap`: a band snaps back round a
  swapped link. `field`: the screen edge flares red and pushes back on a redirect nobody tapped for.
  `back`: a Back button comes out of the edge in a snare that flies apart.

A line about anything shattering, bursting or being seen is false until 1.0.6 is on the store, so the
sets come in two kinds and the second is marked.

### 242 live events, read for what makes a line land

The first pass's 85 events plus a wider read on 2026-11-21: the 50 apps on each of the US store's
iPhone and iPad chart pages in 25 categories (`https://apps.apple.com/us/iphone/charts/<genre>` and
`/ipad/charts/<genre>`, 1,881 apps), each product page read for its events as before, utilities,
productivity, design and photo categories first. The read was stopped at 982 of those pages (18 more
timed out), which with the first pass's 114 makes 1,096 pages, 160 apps with an event and **242
events in English**: 91 Special Event, 90 Major Update, 18 Premiere, 15 Challenge, 15 Live Event,
12 New Season, 1 Competition. The store's search page and its search API both answered 429, so apps
were found through the charts and not by name; games, social and entertainment charts were the ones
left unread.

Counted over all 242 (Major Update's 90 in brackets):

| What the short description does | Count |
|---|---|
| Is one sentence or one phrase | 219 (79) |
| Is two or three sentences of five words or fewer each | 19 (8) |
| Opens on the reader's situation as a question of six words or fewer | 4 (3) |
| Has a number in it | 17 (5) |
| Ends on an exclamation mark | 36 (11) |
| Opens with Experience, Discover, Explore, Enjoy, Meet, Introducing, Celebrate, Try or "A new way" | 22 (9) |

**Nine in ten short descriptions are one flat sentence, and the ones a reader remembers are nearly all
in the other tenth.** The 19 that break into beats, with the device each uses:

| Device | Lines, word for word |
|---|---|
| Two beats, the second turning the first | "Skip the card. Send a birthday song." (Smule) · "Bring friends. Meet theirs." (Tinder) · "Unfold to read. Half-fold to type." (Freenotes) · "Bigger screen. More room for your day." (Structured) · "Clean up iPhone storage. Keep your favorites." (Swipewipe) · "When night falls. They rise." (Roblox) · "Faster on-device transcription. Less waiting." (Auday) |
| The reader's own moment as a question, then the answer | "Messy notes? Make them neat in one tap!" (Goodnotes) · "Driving? Book a parking spot with Parking on Uber." (Uber) · "Taking a GLP-1? You're in the right place." (Zero) · "Are you a SNOOZE criminal?" (Alarmy) |
| Three beats that sound alike | "Shiny badges. Shady deals. Nonstop heists." (Brawl Stars) · "Run with Wiz. Stay consistent. Earn your badge." (Strava) · "Stunningly realistic. Sharp. Precise." (Kling) |

One-sentence lines that still land, and why:

| Device | Lines |
|---|---|
| A verb you can see, first | "Freeze before the turkey turns, or start over!" (Snapchat) · "Race through neon streets and towering skylines." (Subway Surfers) · "Ring up customers fast, anywhere on the floor" (Square) · "Lasso your handwriting, tap Restyle and pick a style." (Goodnotes, long) |
| A count or the things by name where others write "more" | "25 new VPN locations" / "China, Bolivia, Jamaica, Lebanon, & more" (Proton VPN) · "Twice the language, math, and memory challenges." (Elevate) · "Halftone, Kaleidoscope, Neon Glow and more" (Superimpose X) · "135 new cards" (Hearthstone) |
| A turn of phrase | "Make your move or move on" (Hinge, name) · "Turkey Day essentials, minus the trot." (DoorDash) · "Library on one side, decks on the other." (Edjing) |
| The pain in the reader's words, then gone | "No more circling the lot and hoping you'll find a spot." (Uber, long) · "Even when your mind wanders, Notability stays focused." (Notability, long) · "Feeling like pen pals?" (Hinge, long) |
| A last word that is a joke or a twist | "Fun is a given, romance is optional." (Tinder, long) · "get stuffing, pumpkin pie, and stretchy pants delivered." (DoorDash, long) |

Long descriptions almost never use beats: 2 of 242 are short sentences throughout (Spotify's "Your run
style. Your BPM. Your custom playlist." is one). The commoner strong shape is a beat or two and then
one full sentence: "Good food. Your favorite faces. Add warm tones and film grain to the moments
you'll want to keep forever." (ism), "Ditch typing! Tell AI Lab your Halloween concepts and watch it
create epic, spooky edits." (CapCut).

What the flat ones share, and the current text shares with them:

- A stock opener and an abstract noun: "Experience weather in a new way on iPhone Duo" (CARROT), "A new
  way to enjoy Sofa on iPhone Duo.", "Make networking easier and more memorable." (LinkedIn),
  "Explore the latest tools from Zillow."
- The feature stated from the maker's side: "Introducing a more intuitive way to log your food"
  (Cronometer), "New design makes the app faster and easier to use" (Weather on the Way).
- Nothing to picture. "Pages can no longer send you away with no tap" has no verb a reader can see, no
  count, no turn, and is told from the page's side.

Taken for this pass: break the short description into two beats or a question and its answer; put a
count in it ("two more tricks"); use verbs with a picture in them (flings, hijacks, shatter, burst,
snap back, bounce off), which for 1.0.6 are also the effects' own names in `fx.js`; end on the app's
main point, said as the reader's ("your click"); and let the long description be a beat or two and
then a full sentence. None of the 13 Safari extensions and blockers read in the first pass has an
event, and none turned up in the charts with one, so no rival's card says any of this.

### What Apple's rules still hold these lines to

Sentence case, no all capitals, one exclamation mark at most, no "best" or "#1", no price, and the
text about the event. A long description must also stand without the short one, because the details
page shows the name and the long description only (the overlay measured above has no short
description on it): a long line that opens "One yanks you…" or "And the Back button…" leans on a card
the reader may not have in front of them, and two drafts were rewritten for that.

### The sets, second pass

Name unchanged, "The Stay-Put Update" (19). Rendered in
`Support/AppStore/events/1.0.5/options/text-sheet-2.png` (source `options/src/text-sheet-2.html`,
which fails the render over Apple's limits). All twelve lines: 0 hits in `ai-prose-scan.ts`. The beat
and question shapes are the choice the research above names, and the scanner does not flag them.

True of 1.0.5 alone:

| | Short description | Long description |
|---|---|---|
| 1A. The tally | Two more tricks caught. Your click stays yours. (47) | A page flings you to a scam site mid-scroll. Another hijacks your Back button. Both tricks now go nowhere. You stay put. (120) |
| 1B. The wink | Keep scrolling. You're not going anywhere. (42) | It now catches the redirect that fires mid-scroll and the Back button that won't let you leave. Your click, your call. (118) |
| 1C. Call and answer | Redirect ambush? Blocked. Back trap? Broken. (44) | Pages can't fling you to another site while you scroll, or rig Back to keep you. Your click goes where you aim it. (114) |

True only once 1.0.6 is live:

| | Short description | Long description |
|---|---|---|
| 2A. Both asks in one line | More tricks caught. Now you watch them break. (45) | Invisible layers shatter. Pop-ups burst. Redirects you never asked for bounce off. Your click lands where you aimed. (116) |
| 2B. The effect first | Tap a trap. Watch it shatter. (29) | Undirect now shows its work: overlays shatter, pop-ups burst, links snap back. And it catches two more tricks. (110) |
| 2C. The three asks | New look. New catches. Still your click. (40) | Traps now shatter and burst right on the page. Two more get caught. Your click still goes where you aim it. (107) |

**Picks: 1A now, 2A the day 1.0.6 is live.** 1A is the owner's own sentence ("even more tricks
detected", "keep the main point") as a count and a promise, and its long description is two small
scenes that end on the event's name. 2A carries both of his asks, more tricks and the new look, in
eight words, and its long description is the effects themselves in the order a reader meets them.
1B has the most charm and the least news on the card; 1C is the loudest and leads half its card with
Back, which is shown on Mac Safari only so far. 2B sells the shatter best and leaves "more tricks" to
the details page; 2C is the plainest of the three.

Each effect named in row 2 is in `fx.js`: `shatter` (invisible layer), `burst` (pop-up), `snap`
(swapped link), `field` (a redirect nobody tapped for, pushed back at the screen edge). They play
unless the person has turned effects off, and under Reduce Motion each is a still picture that fades,
so "watch them break" is true of the default.

Not done: nothing uploaded, submitted or committed; `event.json` holds the old text; no second reader
checked the lines for machine prose.

## Event text, third pass: whatever trick they add, in two stages

2026-11-21, after the owner read `options/text-sheet-2.png`. His words: "Its more like no matter the
tricks they add we adapt kind of vibe. 1C felt closest to heart but think one more time. The 2A should
be addition or something no? We're aiming for 1.0.6 to be done before the announcement anyways right?
Update at 1.0.6 but be reiable." The name stays. The next version is now numbered 1.1.0 and is meant
to be live before the event starts on 2026-11-27. So each option is a pair: a stage 1 text true of the
release on the store, and a stage 2 text that is stage 1 plus one beat for the visual overhaul, put up
once 1.1.0 is on the store. The second pass's row 2 was a different message; this pass makes it an
addition.

### What the pair shape allows, counted

- **1C's card line has no room.** "Redirect ambush? Blocked. Back trap? Broken." is 44 of 50
  characters. Naming both tricks in call and answer costs 37 at the least ("Redirect? Blocked. Back
  trap? Broken."), which leaves 12 for one more beat: the adapt beat ("Next? Ready.", 12) or a
  visual beat, never both. So a card that names both tricks cannot grow at stage 2, and a card that
  grows has to carry the adapt feeling in general words ("New trick? Caught.").
- **The long description needs a base of about 85 characters** to take a beat of 30 to 38 and still
  end on the main point. 1C's long line is 114, so its pair uses a tightened form of it.
- **The details page shows no short description** (second pass), so each long line still names both
  tricks by itself.

### Which word is true of which trap

Read again from `Extension/Resources/content/fx.js`, because stage 2 has to be exact:

| Trap | Effect | What a line may say |
|---|---|---|
| Invisible layer over the page | `shatter` | shatters |
| Pop-up, or a click the page faked | `burst` | bursts, blows away |
| Link swapped under the finger | `snap` | snaps back |
| Redirect nobody tapped for | `field` | is pushed back at the screen edge |
| Back answered with another site | `back` | "the snare flies apart" (the file's own comment) |

The two tricks this event is about are the last two rows, and neither of them shatters. A stage 2
line whose subject is "traps" in general therefore says "break" or "fly apart", which is true of all
five, and "shattered" is used only where the subject is the invisible layer. "Watch" is in three of
the four beats because it tells the reader the change is one they will see, which "shattered" alone
does not: it reads as a figure of speech for "caught".

### The adapt feeling without a promise

"Whatever they try, Undirect catches it" is a claim nobody can check, the kind Apple's page asks to
avoid, and the guard lets some trips through by design. The pairs carry the feeling three other ways,
each true today: as attitude with no claim in it ("Next? Bring it.", "Next? Ready."), as a fact about
this release that implies the next ("Pages learned to… Undirect learned to stop both", "Two new
tricks. Two new catches."), and as the constant outcome ("Pages change tricks. You stay put.").

### The pairs

Rendered in `Support/AppStore/events/1.0.5/options/text-sheet-3.png` (source
`options/src/text-sheet-3.html`), 1C beside them as the reference and the added beat marked under each
stage 2. All 15 distinct lines: 0 hits in `ai-prose-scan.ts`, each within 50 or 120. The devices are
the ones counted in the second pass: call and answer (1C's own shape), two beats with a turn, a count.

| Pair | Stage | Short description | Long description |
|---|---|---|---|
| Reference, 1C | | Redirect ambush? Blocked. Back trap? Broken. (44) | Pages can't fling you to another site while you scroll, or rig Back to keep you. Your click goes where you aim it. (114) |
| A. 1C, and what's next | 1 | Redirect? Blocked. Back trap? Broken. Next? Ready. (50) | Pages can't fling you away mid-scroll or rig Back to keep you. Your click, your call. (85) |
| | 2 | the same line (50) | Pages can't fling you away mid-scroll or rig Back to keep you. **Now you watch their traps break.** Your click, your call. (118) |
| B. Bring it | 1 | New trick? Caught. Next? Bring it. (34) | Mid-scroll redirects? Caught. Rigged Back buttons? Caught. Your click, your call. (81) |
| | 2 | New trick? Caught. **Watch it break.** Next? Bring it. (50) | Mid-scroll redirects? Caught. Rigged Back buttons? Caught. **Invisible layers? Shattered on screen.** Your click, your call. (120) |
| C. They change, you stay | 1 | Pages change tricks. You stay put. (34) | Pages learned to redirect you mid-scroll and rig Back. Undirect learned to stop both. (85) |
| | 2 | Pages change tricks. You stay put. **Traps don't.** (47) | Pages learned to redirect you mid-scroll and rig Back. Undirect learned to stop both. **Now watch their traps fly apart.** (118) |
| D. Two for two | 1 | Two new tricks. Two new catches. (32) | A page redirects you mid-scroll. Another rigs Back. Undirect catches both. Your click, your call. (97) |
| | 2 | Two new tricks. Two new catches. **Watch them break.** (50) | A page redirects you mid-scroll. Another rigs Back. Undirect catches both. **Watch the traps break.** Your click, your call. (120) |

**The pick is B.** It is 1C's call and answer with the answer turned on the tricks still to come,
which is the feeling he named, and it is the only call-and-answer card with room for the stage 2
beat, so the visual overhaul reaches the card and not only the details page. Its long line keeps 1C's
shape, names both tricks, and at stage 2 adds the one effect that can be called a shatter. It costs
the tricks' names on the card: "New trick?" is general where 1C said "Redirect ambush" and "Back
trap".

The others: A is nearest to 1C and names both tricks on the card, and its card cannot change at
stage 2. C is the calmest, explains the event's name, and its stage 2 beat is the picture's own joke
(the pages under the stone stay, the loose sheets do not); it has no call and answer and no "your
click". D is the most exact about what is new and the least like 1C. A's long pair fits under B's
card if 1C's sentence is wanted on the details page.

Still open from the first pass: the Back half is shown on Mac Safari only, and every pair names it.
Not done: nothing uploaded, submitted or committed; `event.json` holds the old text; no second reader
checked the lines for machine prose.

## Event text, fourth pass: the result, not the feature

2026-11-21, after the owner read `options/text-sheet-3.png` and turned down all four pairs: "rigs the
BACK BUTTON. not just Back. They don't actually seem like they will attract customers at all. Remember
users want results not feature exhibition." The third pass's lines listed tricks and catches, which is
the maker's view of the update. This pass says what the buyer gets to do. "Back button" is written in
full everywhere. The name, the limits and the two stages are unchanged.

### Live cards that sell a result, read again

From the 242 events gathered in the second pass. In each, the short description's object is the
reader's own goal, and the feature that delivers it is named in the long description or nowhere:

| App | Short description | Where the feature is |
|---|---|---|
| Flighty | "Know when to leave for the airport" | Long: "Get traffic alerts and a reminder when it's time to leave." |
| Lightroom | "Fix accidental blinks and rescue your best photos." | Long: "opening closed eyes naturally with one tap" |
| Square | "Ring up customers fast, anywhere on the floor" (name: "Beat the Black Friday Lines") | Long: "with Tap to Pay on iPhone, so lines keep moving on your busiest day." |
| Uber | "Driving? Book a parking spot with Parking on Uber." | Long opens on the result: "No more circling the lot and hoping you'll find a spot." |
| Swipewipe | "Clean up iPhone storage. Keep your favorites." | Long: "make room for this season's memories." |

Two more of the same kind in the long description: Affinity, "Take a project from first sketch to
print-ready file without switching apps or reaching for a laptop."; Notability, "Even when your mind
wanders, Notability stays focused."

The cards that exhibit features, for contrast: "Sync, AI background removal, archive and more"
(Stylebook), "Themes, Widgets & Dynamic Island" (iScreen), "Halftone, Kaleidoscope, Neon Glow and more"
(Superimpose X), "China, Bolivia, Jamaica, Lebanon, & more" (Proton VPN). **The second pass listed the
last two under a device worth copying, "the things by name where others write more". That was a
mistake for this event:** a list of named things has energy, and it is still a list of what the maker
built. The third pass's "Mid-scroll redirects? Caught. Rigged Back buttons? Caught." is the same list
with question marks.

What the result cards share, taken for this pass: the verb is something the reader does (know, fix,
ring up, keep, take), its object is theirs (the airport, your best photos, your favorites, the line in
their own shop), and no tool is named on the card.

### What the buyer was doing, and what they wanted

From `docs/research/undirect-voice-of-customer.md`, read again for the activity, not the trick:

| What they were doing | Their words | Rows |
|---|---|---|
| Reading the news | "the page suddenly and violently redirected me to a completely different URL"; "ads that redirect on mobile to pages informing me about viruses on my iPhone" | 1, 2, 54 |
| Reading a chapter | "getting redirected to a mcafee scam site while reading"; "To actually be able to use the website without 5 million redirect" | 5, 6, 12, 30, 39 |
| Trying to leave | "kept redirecting me to download this app and wasnt able to go back"; having to "go back 5 pages" | 7, 32, 47, 52 |
| Wondering whether the phone is broken | "Safari opening seemingly random tabs on its own? ... super freaked out"; asking whether an iPhone "really" gets malware | 2, 3, 27, 36 |

So the results are: finish the article or the chapter, never land on the scam page, go back with one
press of the Back button, and stop wondering whether the phone is infected. The last one is what the
visual overhaul gives a buyer, and it is the stage 2 beat: with 1.1.0 the page's attempt is shown
where it happened ("Stopped" with the address, "Kept you here"), so the buyer sees it was the page.
That is a result. "Traps shatter" was the feature.

### Words left out

Caught, blocked, trap, trick, layer, shatter, redirect, and "Back" without "button". "Scam page" stays
because it is the buyer's own word (rows 5, 23, 36 and the phrase list). The feeling the owner named in
the third pass, whatever pages try you still get where you meant to go, is kept as "whatever the page
tries" and "pages try", which name no tool.

### The pairs

Rendered in `Support/AppStore/events/1.0.5/options/text-sheet-4.png` (source
`options/src/text-sheet-4.html`), the current text beside them and the added beat marked under each
stage 2. All 16 lines: 0 hits in `ai-prose-scan.ts`, each within 50 or 120.

| Pair | Stage | Short description | Long description |
|---|---|---|---|
| A. Read on | 1 | Reading? Read on. Leaving? Leave. (33) | Whatever the page tries, you finish the article and the Back button takes you back. (83) |
| | 2 | Reading? Read on. Leaving? Leave. **Worried? Don't.** (49) | Whatever the page tries, you finish the article and the Back button takes you back. **See it happen and stop wondering.** (117) |
| B. The article, not the scam page | 1 | Read the article, not the scam page. (36) | Finish what you opened. Press the Back button once and go back. (63) |
| | 2 | Read the article, not the scam page. **Watch it try.** (50) | Finish what you opened. Press the Back button once and go back. **See what the page tried, and know it's not your phone.** (118) |
| C. Still here | 1 | Still here. Still reading. (26) | A page tries to send you away. You stay, and the Back button still takes you back. (82) |
| | 2 | Still here. Still reading. **Now you see why.** (43) | A page tries to send you away. You stay, and the Back button still takes you back. **You see it, and you know you're fine.** (120) |
| D. Pages try | 1 | Pages try. You read on. (23) | Scroll and stay. Press the Back button and go back. Tap a link and land on it. (78) |
| | 2 | Pages try. You read on. **And you see each try.** (45) | Scroll and stay. Press the Back button and go back. Tap a link and land on it. **And see for yourself each time.** (110) |

**The pick is B.** "Read the article, not the scam page." is what the buyer was doing and what they
got instead, in their own two nouns, and it needs no knowledge of the app to be understood, which is
what a card has to do for someone who has not bought yet. Its long line is two results a person can
check by doing them, the second with a count in it ("once", against "go back 5 pages"). Its stage 2
long line answers the fear in rows 2, 27 and 36 directly. Its weak point is the stage 2 card beat,
"Watch it try.", which says the buyer will see something and does not say why that helps; A's
"Worried? Don't." is the better beat.

The others: A keeps the call and answer he liked in the second pass and is the wittiest, and a reader
has to work out that "Leaving? Leave." means the Back button. C is the calmest and is what "stay put"
means; it shows less of the before. D states the third pass's feeling in five words and carries the
app's main point ("Tap a link and land on it"); its card is the least concrete.

Still open: none of these lines has room for "on sites where Undirect is on", the Back button half is
shown on Mac Safari only, stage 2 is true only once 1.1.0 is on the store, and no second reader
checked the lines for machine prose. Nothing uploaded, submitted or committed; `event.json` holds the
old text.
