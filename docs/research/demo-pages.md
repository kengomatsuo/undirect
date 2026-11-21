# Demo pages: what a real article page and a real stream page look like

Research for the remake of `web/demo/scroll/` (Northwind Daily) and `web/demo/back/`
(Kickoff Live), 2026-11-21. Live pages were opened in Chrome at a 1470 px viewport and
measured with `getComputedStyle` and `getBoundingClientRect`; published guidance was
fetched the same day. Each figure names the page it was read from.

## News article pages

### Measured, 2026-11-21, desktop 1470 px

| Element | The Guardian | BBC News | The New York Times |
|---|---|---|---|
| Ground | `#ffffff` | white | `#ffffff` |
| Ink | `#121212` | `#202224` | `#121212` headline, `#363636` body |
| Headline | serif 34/39 px, weight 500 | serif 38/44 px, weight 500 | serif 40/46 px, weight 700 |
| Standfirst | serif 20/23 px, weight 500 | none on this story | none on this story |
| Section label | serif 20 px, weight 700, red `#c70000`, above the headline's column | none | small sans label |
| Body | serif 17/23.8 px (1.4), 12 px between paragraphs | serif 18/26 px (1.44) | serif 20/30 px (1.5), 15 px between paragraphs |
| Body column | 620 px, about 61 characters a line | 721 px | 600 px, about 52 characters a line |
| Caption | sans 12/16 px | serif 12/14 px, grey `#545658` | 16 px, grey `#727272`, credit after it |
| Timestamp | sans, small, under the byline | sans 12/14 px, "42 minutes ago" | under the byline |
| Lead picture | 620 px, column width, square corners | 721 x 406 px (16:9), square corners | wider than the text column (720 px over 600) |

Pages: <https://www.theguardian.com/world/2026/nov/20/denmark-russian-diplomat-us-ukrainian-rapper-attempted-killing>,
<https://www.bbc.com/news/articles/cxnv4zvmdy0jo>,
<https://www.nytimes.com/2026/11/20/world/europe/ukraine-wildlife-war.html>.

What the three share, and what the remake copies:

1. **Order of the top**: section label, headline, standfirst, byline with a time, lead
   picture, caption with a credit, then body. Nothing sits between the masthead and the
   label.
2. **A serif does all the reading**: headline and body are the same family or close
   cousins; a sans is kept for labels, captions, times and navigation.
3. **The headline is only about twice the body size** (34 to 40 px over 17 to 20 px), set
   at weight 500 to 700 with tight leading (1.15). The pages get their authority from the
   measure and the rules, not from a giant title.
4. **Square pictures.** None of the three rounds a news photograph. The rejected page's
   12 px radius on a gradient block is the clearest "template" tell it had.
5. **Captions are small and grey with a credit**, and sit directly under the picture.
6. **Hairline rules and a meta column** organise the page (The Guardian's dotted rules,
   the BBC's grey bands). These are how a newspaper looks, so the site-design ban on
   hairlines and small labels, written for landing pages, is set aside here on purpose.
7. **A relative time ("42 minutes ago")** on the BBC page never dates. A fixed date would
   age in every film shot later, so Northwind Daily uses a relative time.

### Published guidance

- Line length 45 to 90 characters, 66 the target for long text; line height at least 1.5
  for long text and 1 to 1.35 for headings; 1 em between paragraphs, never more than
  1.5 em. U.S. Web Design System, <https://designsystem.digital.gov/components/typography/>.
- The Washington Post's public tokens: a headline serif, Georgia for body, a sans
  (Franklin) for meta and subheads; sizes 12, 14, 16, 18, 20, 24, 28, 32, 40, 48 px;
  line heights 1.1, 1.25, 1.5, 1.6. <https://build.washingtonpost.com/foundations/typography>.
- An older outside measurement of the NYT gives 17/24 px body on a phone
  (<https://uxdesign.cc/an-in-depth-look-into-good-text-blog-layouts-8773788c5b2c>);
  not re-measured here because the Chrome window does not narrow to 390 px.

### Decisions for Northwind Daily

- Body 18/28 px on a phone and 20/32 px on a desk, column 660 px (57 characters a line as built, 43 on a phone),
  one serif (Charter, which ships with iOS and macOS, then Iowan Old Style, Georgia).
- Headline 34/38 px on a phone, 52/56 px on a desk, weight 700: a step above the
  measured dailies because the first screen is what gets filmed.
- A right rail (most read, weather) from 1080 px up, so a desk screen is a composed page
  and not a lone column.
- Pictures are drawn in SVG as flat editorial illustration and credited as illustration:
  a drawn picture that says it is drawn is honest, a gradient pretending to be a
  photograph is not. A data chart (wave height) and a locator diagram do what a real
  newsroom's graphics desk does.
- The section navigation is plain text, not links: an in-page link would scroll the page
  and fire the redirect by itself.

## Live-stream pages

### Seen and measured, 2026-11-21, desktop 1470 px

| Element | YouTube live watch page | DAZN home | BBC Sport match page |
|---|---|---|---|
| Ground | white (dark in dark mode) | near black | dark band over a light page |
| Player | 1018 x 572 px (16:9), 12 px radius, 16 to 24 px from the left edge | n/a | n/a |
| Right rail | 404 px, other streams with a red LIVE tag on the thumbnail | n/a | n/a |
| Title | sans 20/28 px, weight 700, directly under the player | sans, heavy, about 36 px | sans 44/48 px, weight 700 |
| Channel row | 16 px name weight 500, 12 px grey count, a 40 px pill button | | |
| Team names | | | sans 24/28 px either side of the score |
| Section tabs | | Home, All sports, Live TV, Schedule | Scores, Tables, Head-to-head, 16/22 px |
| Accent | red, only on LIVE and the progress bar | one yellow, only on the active item | yellow brand band |

Pages: <https://www.youtube.com/@NASA/live>, <https://www.dazn.com/en-GB/home>,
<https://www.bbc.com/sport/football/live/c3kgdxnggq7pt>,
<https://www.twitch.tv/directory/category/sports> (live rows carry a red dot and a viewer count).

What they share, and what the remake copies:

1. **The player is the page.** It starts right under a short bar, is as wide as the
   layout allows, and everything else is smaller than it.
2. **16:9, and a large centred play control** on a poster frame before playback.
3. **Red means live and nothing else.** A red dot or tag with the word, next to a
   viewer count.
4. **Title, then one row of meta, directly under the player**, in a heavy sans.
5. **A rail of what else is on**, each tile with its own live tag or kick-off time.
6. **One brand colour used sparingly** on a dark or neutral ground.

### The score bug

- The score and clock are the core read and stay fixed; period, cards and the rest are a
  second layer. A small bug with exact type and spacing reads better than a big one, and
  the recent trend drops gradients and bevels for flat blocks. Sports Video Group,
  2026-06-09, <https://www.sportsvideo.org/2026/06/09/designing-the-modern-scorebug-how-broadcast-graphics-teams-are-rethinking-the-most-important-element-on-screen/>.
- The bug already works as a standing summary of the match; improve its accuracy, do not
  reinvent it. <https://medium.com/juanjramirez/the-football-score-bug-a-case-study-on-creating-innovative-digital-on-screen-interfaces-9da29101c92a>.
- A live feed should show it is alive in a visible place, not as a timestamp in a footer.
  <https://dev.to/annonthe/real-time-reliability-how-live-score-ux-earns-trust-for-philippine-basketball-fans-492>.
- Player controls must not sit on top of a score ticker (reported on Sky Sports clips,
  unverified audit: <https://releaselens.pages.dev/demos/skysports>). The bug goes top
  left, the controls bottom.

### Decisions for Kickoff Live

- A broadcast frame drawn in SVG (a night match from the main camera, pitch in true
  perspective from a computed homography), with a flat score bug top left, a red LIVE tag
  and a centred play control. No footage, so no licence to show.
- The advertising boards in the frame carry the other demo sites' names, except Marlow TV:
  Marlow is a town, and no copy may name a place.
- Team names are club nicknames (Kestrels, Ironworks), never towns: the old "Harbour Town
  v Northgate" read as places, and Northgate is a real one.
- Tapping play starts the bug's clock and shows the control bar; a second tap pauses.
  No video plays. The trap script still sees the tap first: it listens on the window in
  the capture phase.
- No link on the page uses a `#` address: a hash navigation adds a history entry, and
  going back over it would fire the trap's `popstate` without a tap on play.
- Light and dark: the page follows the system, the player stays dark in both, as on
  YouTube.

## Type that exists on the devices

The pages are filmed in Safari on iPhone and Mac, and may load no third-party font
(the limit is CSS and SVG beside the pages). Faces that ship with both systems, checked in
`/System/Library/Fonts` on macOS 27: Charter, Iowan Old Style, Georgia, Didot, Bodoni 72,
Avenir Next, Avenir Next Condensed, DIN Condensed, DIN Alternate. New York is reachable
only as `ui-serif` and only in Safari, so it is not the first choice: the frames here
are shot in Chrome and must show what Safari shows.

## The plan the pages were built from

```
ASK     remake two static pages so they pass for real sites; same URLs, same script
        includes, same data-dest, same site names, footer line kept. Goes: the gradient
        "photo", the two paragraphs inside each page that explained the demo, the
        place-like team names. Stays: env.js, the ad scripts, og.png, every other page.
SOURCES the measured pages and guidance above.
SCREEN  /demo/scroll/ and /demo/back/, reached from /demo/ and /demo/cases/, opened by
        people trying Undirect and by the film camera, in Safari on iPhone and Mac.
TREE    Northwind: masthead, section row, article head (label, h1, standfirst), byline,
        lead figure, body (three subheads, chart, pull quote, topics), rail (most read,
        week ahead, tides, opinion), more stories, footer.
        Kickoff: bar, player (frame, score bug, live tag, play control, control bar),
        title block, match panel (score, key moments, stats), fixture tiles, footer.
DATA    none. Both pages are static.
STATE   Kickoff only: playing (a class on the player) and the match clock (a number in a
        closure). Northwind has no state and no script of its own.
ACTION  tap on the player:
          sync   toggle the class, swap the label Play/Pause, start or stop a 1 s timer
          commit the play control and the dimming layer fade out, the control bar fades in
          moves  opacity only, 0.2 s; the play control scales to 0.96 while pressed
          fails  nothing to fail: no network, no media
        timer tick: two text nodes change (bug clock, panel minute), once a second
        scroll on Northwind: nothing of the page's own; the ad script listens
TIMING  first paint is the whole page; the two SVG pictures have width and height set, so
        nothing moves when they land.
SIZE    lead figure 3:2 on a phone, 16:10 from 720 px; player 16:9 at every width.
EDGES   phone 390, tablet 1180, desk 1440; light and dark; reduced motion (the live dots
        stop pulsing); no script (both pages still render whole); a short window (the
        article is 4,313 px tall on a desk and 5,499 px on a phone, so it always scrolls
        past the script's 240 px).
```

## Reference against built

Measured on the built pages with `getComputedStyle` and `getBoundingClientRect`, Chromium,
2026-11-21. Phone is 390 x 844 with touch, desk is 1440 x 900, tablet 1180 x 820.

### Northwind Daily

| Element | Reference (measured dailies) | Built, phone | Built, desk |
|---|---|---|---|
| Headline | serif 34 to 40 px, weight 500 to 700, leading 1.15 | Charter 34/38 px, 700 | Charter 52/56 px, 700 (larger on purpose) |
| Standfirst | 20/23 px | 20/28 px | 23/32 px |
| Body | 17 to 20 px, leading 1.4 to 1.5 | 18/28 px (1.56) | 20/32 px (1.6) |
| Paragraph gap | 12 to 15 px | 20 px | 24 px |
| Characters a line | 52 to 61 | 43 | 57 |
| Body column | 600 to 721 px | 358 px | 660 px |
| Lead picture | column width or wider, square corners | 390 x 260 px, full width, radius 0 | 760 x 475 px, radius 0 |
| Caption | 12 to 16 px, grey | sans 13/18 px, soft grey | same |
| Section label | bold, accent colour, above the headline | sans 13/18 px, 700, accent | 14/18 px |
| Gutter | | 16 px | 166 px (1,108 px content, centred) |
| Sideways scroll | none | 0 px | 0 px (also 0 at 1180) |

The paragraph gap and leading are looser than the dailies because Charter is wider and
darker than their custom faces; set at their 1.4 it reads cramped at 18 px.

### Kickoff Live

| Element | Reference | Built, phone | Built, desk |
|---|---|---|---|
| Player | 16:9, the widest thing on the page (YouTube 1018 x 572, radius 12) | 390 x 219 px, edge to edge, radius 0 | 964 x 542 px, radius 12, 40 px from the left edge |
| Title | heavy sans, 20 to 44 px, directly under the player | Avenir Next Condensed 30/34 px, 700 | 38/42 px |
| Meta row | 12 to 16 px, grey, live tag in red | 14/20 px, tag 12/20 px on `#d91f2b` | same |
| Score bug | small, flat, top left, score and clock fixed | DIN Condensed 15 px, 173 x 26 px, 12 px from the corner | 24 px type, 277 x 41 px, 29 px from the corner |
| Play control | large, centred | 60 px circle | 87 px circle |
| Score in the panel | team names 24/28 px either side of the score (BBC Sport) | DIN Condensed 60/52 px, names 16/20 px | same |
| Rail | 404 px (YouTube) | stacked under the title | 372 px |
| Gutter | | 16 px | 40 px at 1440 (32 px gutter in a 1,424 px frame) |
| Sideways scroll | none | 0 px | 0 px (also 0 at 1180) |

### Per-event cost

The only repeating work either page adds is Kickoff Live's clock: one `setInterval` at
1 Hz that sets two text nodes, and only while the player is in its playing state. Nothing
runs per frame or per scroll event from the pages themselves.

## Critique of the frames

```
ROUND 1 (frames in docs/screenshots/demo-pages/)
Northwind Daily
Seen in one second: a harbour at first light under a bold serif headline.
Idea: the storm is told the way a newsroom's graphics desk would tell it: one drawn
  scene, one chart of the wave heights, the tides and the week's weather in the rail.
Live thing: none, on purpose. A news article that animates reads as a template.
Layout words: masthead / head / figure / column with rail / grid of three / footer band
Scores: design 8 - usability 8.5 - creativity 7.5 - content 8 -> 8.0
Fixed this round: the nameplate ran into Subscribe at 390 px (now left beside the menu,
  22 px); most-read numerals all read 0 (a grid item is not a list item, explicit
  counter); chart labels shrank to 8 px on a phone (chart rebuilt in HTML, labels 13 px).
Left: on a desk the rail ends about 1,500 px before the article does, so the right
  third is empty for two screens. Real dailies do the same; a pinned rail would fill it
  and the house rule for public pages forbids pinning.

Kickoff Live
Seen in one second: a floodlit pitch with a white play control in the middle.
Idea: the picture is a true camera view (pinhole projection of a real pitch's
  measurements), so the frame reads as broadcast and not as a diagram.
Live thing: the bug's clock runs once play is pressed, and the panel's minute follows it.
Layout words: bar / player with title / panel of three cards / row of four tiles / footer
Scores: design 8 - usability 8.5 - creativity 8 - content 7.5 -> 8.1
Fixed this round: the player sat flush under the bar on a desk (a class rule outranked
  the element rule for the top padding); the score read "1:0" (now a drawn dash); the
  dark crest vanished on the dark card (steel outline); white on the dark-mode live red
  was 3.3:1 (the tag is now `#d91f2b` in both modes, 5.0:1); fixture shields were blank
  (initials added).
Left: the fixture tiles are flat colour with shields, which is what real services show
  for a match with no footage yet, but four in a row is the plainest part of the page.
```

The site-design skill's landing-page caps (no small labels, no hairlines, four real
photographs, eight moving elements) were not applied: they would make both pages look
less like a newspaper and a stream. Its measure, margin, contrast, overflow and
two-typeface rules were.
