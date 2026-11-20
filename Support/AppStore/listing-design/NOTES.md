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
