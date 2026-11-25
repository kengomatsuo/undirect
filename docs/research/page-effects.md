# Page note and page effects: research and plan

Read on 2026-11-21 for the redesign of the note (`content/guard.js`) and the five
effects (`content/fx.js`). Each finding names its source and what the build takes
from it. The plan the code was written from is at the end.

## Findings

### 1. Apple removes things with a dissolve, and the removed thing becomes the particles

- Safari's Hide Distracting Items hides the picked element "with an animation" the
  moment it is chosen (Mac) or after Hide is tapped (iPhone). Reviewers describe a
  dissolve into a burst of particles, the Thanos effect. Apple documents the feature,
  not the renderer.
  - https://support.apple.com/en-us/120682
  - https://www.intego.com/mac-security-blog/how-to-use-distraction-control-in-safari-to-remove-unwanted-web-page-elements/
  - https://apple.gadgethacks.com/how-to/safaris-secret-weapon-distraction-free-browsing-gives-you-complete-control-over-webpage-annoyances-0385603
- Telegram ships the same idea for a deleted message (a "vaporize" animation it calls
  energy-efficient); a bug report says it is drawn with Metal.
  - https://telegram.org/blog/message-effects-and-more
  - https://bugs.telegram.org/c/66255
- Arc's Boosts "Zap" removes an element with a click and gives a restore control. No
  source describes its motion, so nothing is taken from it beyond the verb.
  - https://resources.arc.net/hc/en-us/articles/19212718608151-Boosts-Customize-Any-Website
- Family (Benji Taylor) drops a deleted token into a trash can, and rates delight by how
  rarely a moment happens: the less often a feature is used, the bigger the moment may be.
  - https://benji.org/family-values

**Taken:** the blocked address in the note and the refused pop-up both turn into their
own dust and blow away, instead of fading. A trap being caught is rare next to a scroll
or a tap, so it can carry a big moment.

### 2. Motion is brief, tied to the action, and never the only message

Apple HIG, Motion (https://developer.apple.com/design/human-interface-guidelines/motion):

- Add motion on purpose, never for its own sake.
- Motion is optional: it must not be the only carrier of information.
- Feedback motion follows the gesture and is brief and precise.
- Avoid motion on interactions that happen all the time.
- Let people cancel motion: nobody waits for an animation before acting.

Rauno Freiberg adds that an animation seen for the hundredth time becomes a burden, and
that what a finger covers should be shown beside it.
https://rauno.me/craft/interaction-design

**Taken:** every effect starts at the press point or the trapped element, is over inside
about a second, sits in a layer that takes no pointer events, and repeats what the note
says in words. The refused pop-up is drawn above the press point, not under the finger.

### 3. Springs, with bounce only where there is momentum

- WWDC23 "Animate with springs": a spring is a duration and a bounce. Bounce 0 is the
  default, 0.15 is brisk, 0.3 is clearly bouncy, above 0.4 needs care. Springs keep
  velocity when retargeted. https://developer.apple.com/videos/play/wwdc2023/10158/
- WWDC18 "Designing Fluid Interfaces": start from 100% damping; use about 80% where the
  motion has momentum; a thing leaves along the path it arrived by.
  https://developer.apple.com/videos/play/wwdc2018/803/
- The house spring table (`expressive-motion`): `pressIn` 0.15/0, `bounce` 0.35/0.409,
  `select` 0.5/0.15, `small` 0.25/0, `sheet` 0.5/0, `fling` 0.6/0; press scale 0.96; pop
  +5% for a pill, +8% for a check; label roll 12 to 16 pt; stagger 60 ms; a drawn tick
  190 ms and a drawn circle 280 ms on ease-out cubic; leave 0.2 s ease-in cubic.

**Taken:** every move is one of those springs, written as SwiftUI's
`spring(duration:bounce:)` and sampled into a CSS `linear()` easing by one function in
`fx.js`. The note enters from the bottom edge on `bounce` and leaves down the same way.
No hand-drawn bezier stands in for a spring.

### 4. A small floating surface: thick, rounded, concentric, dark with a light edge

- WWDC23 "Design dynamic Live Activities": the Dynamic Island wants extra-rounded thick
  shapes, heavy text, concentric insets with even margins, snug content, and updates
  that move (numbers roll, content is replaced) instead of blinking.
  https://developer.apple.com/videos/play/wwdc2023/10194/
- WWDC25 "Meet Liquid Glass" and HIG Materials: glass belongs to the control layer that
  floats over content; the regular variant must stay legible over anything; small
  elements read the brightness behind them; touch makes glass flex and light up from the
  fingertip; glass appears by materialising, never by a plain fade; no glass on glass;
  tint only the one primary thing. Reduce Motion removes the elastic part, Reduce
  Transparency makes it frosty, Increase Contrast gives it a solid fill and a border.
  https://developer.apple.com/videos/play/wwdc2025/219/
  https://developer.apple.com/design/human-interface-guidelines/materials
- A content script cannot read the pixels behind it, so the note cannot flip between a
  light and a dark glass the way the system does.

**Taken:** the note is one capsule of dark smoked glass (blur and saturation behind an
82% fill), which keeps white text above 4.5:1 on a white page and on a black one, with a
light hairline and top highlight for dark pages and a three-layer shadow for light ones.
Reduce Transparency and Increase Contrast get a solid fill. Insets are concentric: a 48 px
capsule, 8 px padding, 32 px round badge and button. The count and the title roll; the
capsule's width follows on a spring. The shatter effect lights the hidden layer from the
press point before it breaks.

### 5. Toasts: one at a time, about four seconds, pausable, a way out

- Sonner (Emil Kowalski): enter from `translateY(100%)`, 400 ms `ease` transitions
  because a transition can be retargeted mid-flight and a keyframe cannot; 4 s default
  life; the timer stops on hover and in a hidden tab; swipe dismisses on distance or on
  a velocity over 0.11 px/ms; reduced motion removes all of it.
  https://emilkowal.ski/ui/building-a-toast-component
  https://github.com/emilkowalski/sonner/blob/main/src/styles.css
- Material 3 snackbar: one at a time, a newer one replaces the older, 4 to 10 s.
  https://m3.material.io/components/snackbar/guidelines
- WAI-ARIA and WCAG 4.1.3: a non-urgent message is `role="status"` and never moves focus.
  https://www.w3.org/WAI/ARIA/apg/patterns/alert/
  https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html
  (These three were taken from the house `ui-patterns` toast reference, which read them
  on 2026-10-20; they were not fetched again today.)
- Apple HIG, Accessibility: 44 pt controls on iOS and 28 pt on the Mac; 4.5:1 text
  contrast; avoid views that only a timer dismisses; under Reduce Motion tighten springs,
  swap travel for fades and do not animate blurs.
  https://developer.apple.com/design/human-interface-guidelines/accessibility
- `ui-patterns` toasts: about 4 s for a plain confirmation, about 7 s when it carries an
  action; bottom or corner, never the centre; pause on hover and focus; always a way out.

**Taken:** one note, bottom centre, `role="status"`. A later block merges into it as a
count. It stays 4 s, or 6.5 s while it carries the gear; the timer stops while the
pointer or keyboard focus is on it; a click on the note dismisses it. The gear is a
32 px icon button with a 44 px hit area and the `note_settings` string as its name.
A note still up when the page goes (the stopped link swap is followed at once by the
navigation the person asked for) is drawn again on the next page in the tab, with its
count and its gear, fading in rather than rising: the page reports `undirect:noteUp`
and `undirect:noteGone`, and the background hands it on at the next page's hello, as
it already did for an undone redirect.

### 6. What an icon may replace

- `perfect-build` checklist, "An icon in place of a word": where a familiar symbol
  carries the meaning, the icon replaces the word and the word becomes the accessible
  name. A gear for settings is that case, and it is the owner's own request.
- Undirect's mark is a U-turn arrow built from the MUTCD R3-4 sign (`docs/app-icon.md`),
  in Undirect red `#D92B24`.

**Taken:** the note's badge is the mark itself, drawn as a stroke that runs round the
turn each time something is sent back. The same badge lands on a link whose address was
swapped. Red is kept for the trap and for the mark, nothing else.

## Plan

```
ASK     Redesign the note and the five effects. Changes: look and motion of both; the
        note's Settings text becomes a gear icon button; a click on the note dismisses it;
        the timer pauses under the pointer. Stays: settings.banner, settings.effects,
        settings.fx.<name>, Reduce Motion, top frame only, data-undirect-fx on effect
        roots, pointer-events none on effects, the closed shadow root, undirect:openPopup
        and its fallback sentence, merge into a count, notesShown and the three offers.
        Goes: the dashed red outlines, the hatch fill, the glow halos, the "←" text chip,
        the check on a red disc. No string is added or changed.
SOURCES sections 1 to 6 above.
BASE    fx.js holds the shared motion: spring() and the springs table, used by the note.
BOUNDARY guard.js calls UndirectFX.play(name, args, settings) and reads UndirectFX.springs.
        fx.js imports nothing. The manifest loads fx.js before guard.js in one world.
SCREEN  any web page a guarded site shows, top frame; reached by a trap being stopped.
TREE    note: host > shadow > card(.n) > row(.r) > badge(.b) · title(.t) · chip(.c: .h
        struck address under .k red cover) · gear button(.g); dust layer(.d) beside the card.
        effect: host[data-undirect-fx] > shadow > pieces.
KIT     none in a content script; held against the Dynamic Island, Sonner and Safari's
        own dissolve (sections 1, 4, 5).
PLACE   note bottom centre above the safe area on iPhone, iPad and Mac. Effects at the
        press point, on the element, at the screen edge.
PROPS   motion: Web Animations on transform, opacity, translate, scale, rotate. Width of
        the capsule: one WAAPI width/height animation on one 48 px element (measured).
RULES   effect pieces take no pointer events and never touch a page element.
WORDS   no new string. Gear = note_settings as aria-label and title.
DATA    notesShown in storage.local, read at start(), written when a note opens.
STATE   note {count, timer, held}: one object, as before. Nothing derived is stored.
ACTION  trap stopped, no note up:
          sync   build the card, append, start the timer
          moves  card rises from the edge on bounce; badge, title, chip, gear follow
                 60 ms apart; the mark draws; at 520 ms the chip's red cover is wiped
                 left to right into dust and the address is left struck through
        trap stopped, note up:
          sync   count += 1, timer restarts
          moves  title rolls to "N stopped"; capsule width springs to fit; card pops 5%;
                 the mark redraws; the new address arrives whole and dissolves
        gear pressed:
          sync   send undirect:openPopup, remove the gear
          moves  opened: the note leaves. refused: the title rolls to the fallback
                 sentence, the chip goes, the capsule resizes
        note clicked: leaves now. pointer or focus on it: timer held. timer ends: leaves
          moves  down and out, 200 ms ease-in cubic, scale .94
        each effect: drawn after the guard has acted; one host, removed by a timer
ARRIVE  nothing loads; the note is built from strings already in memory.
FLAGS   settings.banner false: no note. settings.effects false: no effect.
        settings.fx.<name> false: that effect is not drawn. A frame that is not the top: neither.
TIMING  note in: bounce (0.35 s, 0.409). out: 200 ms ease-in cubic. life 4 s, 6.5 s with
        the gear. shatter about 1.05 s, burst 1.1 s, snap 1.0 s, field 0.8 s, back 1.2 s.
        Interrupted: a second trap never restarts the card; a second effect gets its own host.
SIZE    capsule 48 px high, radius 24, padding 8; badge and gear 32 px; title 15/20 semibold;
        address 13/24 monospace, 168 px at most then an ellipsis; width up to 440 px or the
        viewport less 24 px and the side safe areas.
EDGES   long title: wraps to two lines, capsule grows. long address: ellipsis. right to
        left: the row mirrors from @@bidi_dir; the address stays left to right. hidden tab
        (viewport 0): shatter returns before drawing. Reduce Motion: note fades, no dust,
        effects are one still shape that fades. Increase Contrast or Reduce Transparency:
        solid capsule. A page's own CSS: cannot reach inside either shadow root.
GUIDE   HIG Motion, Materials, Accessibility; WCAG 4.1.3 and 1.4.3.
```

## As built

Changes the plan did not foresee, each found while judging the frames:

- **Effects are drawn after the press handler returns** (`setTimeout(…, 0)` in `play`).
  Building the shatter took 2.7 ms at the median and 11.5 ms at worst in headless
  Chromium on the Mac; inside the guard's `pointerdown` handler that is time the press
  waits. The call now costs 0.1 ms.
- **A Back trap's note carries no address.** `note_back_trap` is described in the
  catalogue as the note's whole text, the trap is often the page's own, and the page's own
  address struck through reads as the page being blocked. It also keeps the title on one
  line at 390 px. A later block that merges in brings the chip back with its address.
- **Short of room, the address gives way before the title wraps**, down to a 64 px stub
  with an ellipsis.
- **The refused pop-up turns red before it blows away**, because white dust cannot be
  seen on a white page.
- **The capsule's row is anchored to its leading edge while the width springs**, so the
  badge never slides under the clip.
- **The chip's red cover is hidden from assistive technology**, or the address is read twice.

Measured in headless Chromium (playwright-cli 0.1.22, on the Mac, not a device):

| What | Plan | Built |
|---|---|---|
| capsule height, radius | 48 px, 24 px | 48 px, 24 px |
| capsule to the bottom edge | 14 px plus the safe area | 14 px |
| capsule to the side edges at 390 px | 12 px at least | 44.4 px ("Stopped", 301 px wide) |
| badge, gear | 32 px round | 32 x 32, 50% |
| gear hit area | 44 px | 32 px with a -6 px inset `::after` |
| title | 600 15/20 | 600 15px/20px, `rgb(255,255,255)` |
| address | 500 13/24, radius 12 | 500 13px/24px, 12px, `rgba(235,235,245,.7)` |
| capsule fill | `rgba(28,28,30,.88)` | `rgba(28,28,30,.88)` |

The same figures came back at 390 x 844, 1180 x 820 and 1280 x 800.

| Path | Cost |
|---|---|
| `UndirectFX.play` inside a press handler | 0.1 ms |
| building the note (first block) | 1.6 to 3.5 ms |
| a block merging into the note | 1.5 ms |
| frames through a merge (title roll, width and height spring, dust) | 69 frames, mean 16.7 ms, worst 16.8 ms |
| frames through shatter, 1440 x 900 at 2x | 78 frames, mean 16.7 ms, worst 16.8 ms |
| frames through shatter, 390 x 844 at 3x | 74 frames, mean 17.6 ms, worst 50 ms (two frames over 20 ms, both while the shards are first drawn) |
| frames through burst, snap, field, back | mean 16.7 ms, worst 16.8 ms at both sizes |

No iPhone, iPad or Mac Safari has run this yet. Safari draws `backdrop-filter`,
`clip-path` layers and `linear()` easings with its own compositor, so the frame figures
above are a floor for the logic, not a reading of the device.

Frames: `docs/screenshots/page-effects/`. `note-*` are the note (cropped to the foot of
the page), `shatter-*`, `burst-*`, `snap-*`, `field-*`, `back-*` the effects in the order
they play, `*-light*` and `*-dark*` the page under them, `*-phone-*` at 390 x 844,
`*-tablet-*` at 1180 x 820, `still-*` and `note-still-*` with Reduce Motion on.

## What was not built

- Swipe to dismiss. It needs `touch-action: none` on the note, which would take a scroll
  that starts on it; a click dismisses instead.
- The note above the keyboard. With the keyboard up on iPhone a `position: fixed` note at
  the bottom sits behind it, as the old one did.
- A glass that turns light on light pages. A content script cannot sample what is behind
  it, and guessing from the page's background colour is wrong on any page with a photo.
