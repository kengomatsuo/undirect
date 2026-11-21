# Listing images, both apps (ASG39)

Direction B, "on the desktop", picked 2026-11-20 after the owner saw A (brand poster) and B at
MacNative's card size and left the choice to us: a brand-coloured wallpaper, the real app UI
floated on it with a deep shadow, a white headline beside it. One appearance per app: Undirect
dark, Cutling light (.claude/rules/store-release.md).

- `b.css`, `fit.js`, `wall.html`: shared by both apps (Cutling keeps copies in
  Cutling/fastlane/compose/mac). `wall.html#red` and the other palettes are rendered once to
  `wall-<palette>.jpg`; the command is in its comment.
- `undirect/panel-1..5.html`: Undirect's five Mac frames, 1440x900 CSS at 2x.
  `python3 Support/AppStore/render_screenshots.py --kinds mac` localises the headline per
  locale and renders them; with `en` it also writes `Support/AppStore/listing-cover.png`
  (frame 01 at 1440x756, `#wide`) and `web/og.png` (1200x630).
- `undirect/safari-open.png` and `safari-menu.png` are frames 12.2 s and 10.2 s of the real
  Safari take `undirect-promo/wire/public/previews/mac-103-popup.mov`; `dark.png` is
  `capture_mac_popup.py`'s dark popup; `icon.png` is `../listing-icon.png` at 256 px.
- `submit/`: frame 01 cut to the sizes directories ask for.

## iPhone and iPad (ASG94)

The same direction in portrait, after 26 top iPhone decks (docs/research/iphone-screenshot-decks.md):
the wallpaper's `#<palette>-tall` shape, real UI crops floated with the deep shadow, a centred headline,
frame 1 a cover with icon and name. iPip and other directories show an iPhone shot in a phone frame
whose Dynamic Island covers the top ~8%, so every word and card sits below 100 CSS px of 956.

- `tall.py <spec.json>` writes `<app>/{iphone,ipad}/panel-N.html` from `<app>/tall.json`, which names
  each card as a crop of a capture in `<app>/cap/` and asserts the safe band. `tall.css` styles them.
- `undirect/tall.json`: `python3 Support/AppStore/render_screenshots.py --kinds iphone,ipad --locales en`
  renders it; the other locales are not rendered yet.
- Cutling keeps copies of `tall.py`, `tall.css` and `fit.js` in Cutling/fastlane/compose/tall, its spec
  in `compose/tall/cutling/`, and renders with `compose/tall/render.py` to fastlane/screenshots_tall.
- `ipip-frame.html#<png>` shows a shot inside iPip's phone frame, to check nothing is covered.
