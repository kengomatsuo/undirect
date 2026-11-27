# Undirect's store frames and banners (UND-SHOTS)

One picture across every frame, in the system of Cutling's main store page (`~/Repositories/Cutling/fastlane/compose/creative/cpp`):
the icon's black ground, a giant condensed white headline per frame, and a piece of the app at poster size lying across
every seam (the pop-ups a page throws, Undirect's row in Safari's page menu, the note it shows on the page, a blocked
row, the Back puck, the Back trap note, a row's rule choices, the icon). No device crosses a seam.

| Set | Frames | Size |
|---|---|---|
| iPhone | 8 | 1320 x 2868 |
| iPad | 8 | 2064 x 2752 |
| iPhone Duo outer / inner | 8 + 8 | 1398 x 2034 / 2007 x 2853 |
| Mac | 5 | 2880 x 1800 |
| Banner (header and search) | 1 | 5244 x 2950, PNG24 |

What is real per language: the popup is the shipping `Extension/Resources/popup` with that language's `_locales`
messages; the page note and Back puck are drawn with guard.js's and fx.js's own measures and words; Safari's page menu
rows are Safari's own strings, read from the iOS Simulator runtime by `safari_strings.py` into `safari-strings.json`;
the app's name is `Support/i18n/app-name/names.json`. The streaming site is made up (`marlowtv.example`).

Words: `words/<locale>.json`, each language composed from `words/meanings.md`, with an English back-translation under `_bt`.
English variants (en-GB, en-AU, en-CA) read the en-US default sets.

```
python3 build.py [locale ...|--all] [--only iphone,ipad,duo-outer,duo-inner,mac]   # out/<locale>/<device>/NN.png
python3 build.py sheet                                                                # out/sheet-<device>.png
python3 build.py publish --all       # into Support/AppStore/<locale>/{iphone,ipad,duo,mac} (en-US: the default sets)
python3 banners.py --all             # out/banners/<locale>.png
python3 upload.py ios|mac            # replace every set on the editable version, then read back by checksum
python3 ../banner.py upload 6810513194 undirect-poster 'Support/AppStore/poster/out/banners/{locale}.png'
python3 ../banner.py place 6810513194 undirect-poster version <version id>
```
