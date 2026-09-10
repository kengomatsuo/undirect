# The app icon

Every icon in the project comes out of one script:

```bash
python3 Support/icon/build.py
```

It rewrites `App/AppIcon.icon`, the ten `Extension/Resources/images/icon-*.png`
files and `Extension/Resources/images/toolbar-icon.svg`. Editing any of those by
hand puts them out of step with each other, so change the script instead. It
needs `rsvg-convert`, which comes from `brew install librsvg`.

## The mark

A U-turn arrow, copied from the geometry of the MUTCD R3-4 road sign rather than
drawn by eye. That sign builds its whole arrow out of the stroke width `w`:

| Element | Value |
| --- | --- |
| Outer bend radius | `2w` |
| Inner bend radius | `w` |
| Leg centres apart | `3w` |
| Head width | `2.16w` |
| Corner radius | 15pt at `w = 120` |

The tight inner radius of exactly `w` is what makes the turn read as mechanical.
Earlier drafts used a semicircular centreline, which gave an inner radius of
`0.5w` more and looked soft.

**The head height is derived, never set.** The sign puts a barb in the base of
the head, and its base therefore sits `0.34w` above the point where the leg
ends. Undirect drops the barb for a flat base, which moves the base down by that
same `0.34w`. Carrying the sign's published head height of `2.21w` across that
change pushes the tip `0.34w` too low, which is both visibly wrong against the
tail and enough to run off a 1024pt canvas. So `build()` sets `tip_y = tail_y`
and lets the height fall out at `1.88w`. The check that it is right: `1.88 +
0.34 = 2.22`, back to the sign's ratio.

Two more things the script guarantees, each of which was got wrong first:

- **One closed path, not a body plus a head.** Two abutting paths leave a
  hairline seam where the antialiasing of each edge meets.
- **The bend is centred, not the bounding box.** The head overhangs the bend to
  the left by `0.58w`. Centring the bounding box therefore pushes the bend off
  the middle of the canvas. `cx` pins the bend axis and the overhang is allowed
  to sit where it falls.

`build()` asserts its own bounding box stays inside the viewBox before anything
is written.

## Packaging

`App/AppIcon.icon` is an Icon Composer package: an `icon.json` document plus an
`Assets/` folder. The plate is black with a slight lift at the top, the mark is
`#E5322B`, and Liquid Glass is off for the mark — with `glass: true` the bevel
drains the colour towards grey.

Two constraints from Apple, both from
[Creating your app icon using Icon Composer](https://developer.apple.com/documentation/Xcode/creating-your-app-icon-using-icon-composer):

- **The package name must match the App Icon build setting.** Both app targets
  set `ASSETCATALOG_COMPILER_APPICON_NAME: AppIcon`, so the file has to stay
  `AppIcon.icon`. Renaming it silently drops the icon from the build.
- **An Icon Composer file replaces an asset catalogue icon.** Xcode uses the
  `.icon` instead of any `AppIcon` set, and generates the back-compatible images
  itself, so `App/Assets.xcassets/AppIcon.appiconset` was deleted rather than
  left as a fallback. `AccentColor.colorset` stays.

XcodeGen 2.46 needs no help here. `App` is already a source path, and XcodeGen
records the package as a single `wrapper.icon` file reference in the Resources
phase of both app targets rather than walking into it. Nothing in `project.yml`
had to change. Verify after any XcodeGen upgrade:

```bash
grep -n "AppIcon.icon" Undirect.xcodeproj/project.pbxproj
```

One `PBXFileReference` with `lastKnownFileType = wrapper.icon` is correct. A
group with `icon.json` and `mark.png` as separate children is not.

## The toolbar glyph

`toolbar-icon.svg` is the same path with `fill="currentColor"`, because Safari
renders it as a template image and supplies the colour. Its `viewBox` is the
mark's own bounding box plus a small pad, so Safari scales it to fill the
toolbar slot.

It shortens both legs — `tail` from `3.30` to `3.08`, `arm` from `1.42` to
`1.20` — so the glyph sits closer to square in a square slot. Both move by the
same amount, which keeps the head at `1.88w`.

`manifest.json` points `action.default_icon` at this file and lists sizes 48
through 512 under `icons`. The 16, 19, 32, 38 and 64 PNGs are unreferenced and
kept only because they already existed; nothing breaks if they go.
