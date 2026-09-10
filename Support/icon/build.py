#!/usr/bin/env python3
"""Regenerate every icon from one geometry: the app icon, the extension icons,
and the toolbar glyph.

    python3 Support/icon/build.py

Needs rsvg-convert (brew install librsvg). Writes:
    App/AppIcon.icon/                          Icon Composer package
    Extension/Resources/images/icon-*.png      extension icons
    Extension/Resources/images/toolbar-icon.svg toolbar glyph

The mark copies the U-turn arrow from the MUTCD R3-4 road sign, whose whole
shape derives from the stroke width w: outer bend radius 2w, inner radius w,
legs 3w apart, head 2.16w wide. See docs/app-icon.md.
"""
import json, math, os, shutil, subprocess

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
IMG = os.path.join(REPO, "Extension", "Resources", "images")
PKG = os.path.join(REPO, "App", "AppIcon.icon")
RED, PLATE_TOP, PLATE_BOTTOM = "#E5322B", "#101013", "#000000"


def build(w=120.0, r=15.0, cx=512.0, cy=434.0, tail=3.30, arm=1.42, head_w=2.16):
    """One closed path. `tail` and `arm` are leg lengths in multiples of w; the
    head height is whatever puts the tip level with the tail end, as on the sign."""
    hw, ax = head_w * w / 2, cx - 1.5 * w
    tail_y, arm_y = cy + tail * w, cy + arm * w
    tip_y = tail_y
    V = [(cx + 2*w, tail_y), (cx + w, tail_y), (cx + w, cy), (cx - w, cy),
         (cx - w, arm_y), (ax + hw, arm_y), (ax, tip_y), (ax - hw, arm_y),
         (cx - 2*w, arm_y), (cx - 2*w, cy), (cx + 2*w, cy)]
    arcs = {2: (w, 0), 9: (2 * w, 1)}     # edge i -> i+1 is a bend, already smooth
    rounded = {0, 1, 4, 5, 6, 7, 8}       # every straight-line corner
    n = len(V)

    def unit(a, b):
        dx, dy = b[0] - a[0], b[1] - a[1]
        m = math.hypot(dx, dy)
        return (dx / m, dy / m), m

    entry, exit_, corner = {}, {}, {}
    for i in range(n):
        p, prev, nxt = V[i], V[(i - 1) % n], V[(i + 1) % n]
        if i not in rounded:
            entry[i] = exit_[i] = p
            continue
        ui, li = unit(prev, p)
        uo, lo = unit(p, nxt)
        phi = math.atan2(ui[0]*uo[1] - ui[1]*uo[0], ui[0]*uo[0] + ui[1]*uo[1])
        d = min(r * abs(math.tan(phi / 2)), li * 0.5, lo * 0.5)
        entry[i] = (p[0] - d*ui[0], p[1] - d*ui[1])
        exit_[i] = (p[0] + d*uo[0], p[1] + d*uo[1])
        corner[i] = (d / abs(math.tan(phi / 2)), 1 if phi > 0 else 0)

    f = lambda pt: f"{pt[0]:.2f} {pt[1]:.2f}"
    out = [f"M {f(exit_[0])}"]
    for i in range(n):
        j = (i + 1) % n
        if i in arcs:
            rad, sweep = arcs[i]
            out.append(f"A {rad:.2f} {rad:.2f} 0 0 {sweep} {f(entry[j])}")
        else:
            out.append(f"L {f(entry[j])}")
        if j in corner:
            rad, sweep = corner[j]
            out.append(f"A {rad:.2f} {rad:.2f} 0 0 {sweep} {f(exit_[j])}")
    out.append("Z")

    xs = [p[0] for p in V] + [ax - hw]
    ys = [p[1] for p in V] + [cy - 2*w]
    return " ".join(out), (min(xs), min(ys), max(xs), max(ys))


def svg(body, viewbox="0 0 1024 1024", size=1024):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" '
            f'width="{size}" height="{size}">{body}</svg>')


def rsvg(src, dst, size):
    subprocess.run(["rsvg-convert", "-w", str(size), "-h", str(size), "-o", dst, src],
                   check=True)


def main():
    tmp = os.path.join(REPO, ".icon-build")
    os.makedirs(tmp, exist_ok=True)
    d, bb = build()
    assert bb[0] >= 0 and bb[1] >= 0 and bb[2] <= 1024 and bb[3] <= 1024, f"clipped: {bb}"

    # 1. app icon package
    mark_svg = os.path.join(tmp, "mark.svg")
    open(mark_svg, "w").write(svg(f'<path d="{d}" fill="#fff"/>'))
    if os.path.isdir(PKG):
        shutil.rmtree(PKG)
    os.makedirs(os.path.join(PKG, "Assets"))
    rsvg(mark_svg, os.path.join(PKG, "Assets", "mark.png"), 1024)
    grad = ["extended-srgb:0.063,0.063,0.075,1.0", "extended-srgb:0.000,0.000,0.000,1.0"]
    dark = ["extended-srgb:0.055,0.055,0.063,1.0", "extended-srgb:0.000,0.000,0.000,1.0"]
    json.dump({
        "fill-specializations": [{"value": {"linear-gradient": grad}},
                                 {"appearance": "dark", "value": {"linear-gradient": dark}}],
        "groups": [{"layers": [{"name": "mark", "image-name": "mark.png",
                                "fill": {"solid": "extended-srgb:0.898,0.196,0.169,1.0"},
                                "glass": False}],
                    "shadow": {"kind": "neutral", "opacity": 0.5}, "specular": True,
                    "translucency": {"enabled": True, "value": 0.5}}],
        "supported-platforms": {"squares": "shared"},
    }, open(os.path.join(PKG, "icon.json"), "w"), indent=2, sort_keys=True)
    print(f"wrote {os.path.relpath(PKG, REPO)}")

    # 2. extension icons, same plate and mark
    plate = os.path.join(tmp, "plate.svg")
    open(plate, "w").write(svg(
        f'<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">'
        f'<stop offset="0" stop-color="{PLATE_TOP}"/>'
        f'<stop offset="1" stop-color="{PLATE_BOTTOM}"/></linearGradient></defs>'
        f'<rect width="1024" height="1024" rx="232" fill="url(#bg)"/>'
        f'<path d="{d}" fill="{RED}"/>'))
    for s in (16, 19, 32, 38, 48, 64, 96, 128, 256, 512):
        rsvg(plate, os.path.join(IMG, f"icon-{s}.png"), s)
    print("wrote Extension/Resources/images/icon-*.png")

    # 3. toolbar glyph: legs shortened together so the head keeps its 1.88w
    #    height while the glyph sits closer to square in the toolbar slot.
    td, (x0, y0, x1, y1) = build(tail=3.08, arm=1.20)
    pad = 24
    vb = f"{x0-pad:.0f} {y0-pad:.0f} {x1-x0+2*pad:.0f} {y1-y0+2*pad:.0f}"
    open(os.path.join(IMG, "toolbar-icon.svg"), "w").write(
        svg(f'<path d="{td}" fill="currentColor"/>', viewbox=vb, size=100) + "\n")
    print("wrote Extension/Resources/images/toolbar-icon.svg")

    shutil.rmtree(tmp)


if __name__ == "__main__":
    main()
