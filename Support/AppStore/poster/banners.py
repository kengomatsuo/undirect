#!/usr/bin/env python3
"""Undirect's App Store header and search banner per language: one 5244 x 2950 PNG, no alpha, in the frames' look.

    python3 banners.py [locale ...|--all]      out/banners/<locale>.png
    python3 banners.py sheet                   every built language on one picture

Apple's Universal template keeps x 1921-3323, y 660-1622 safe on every surface; the iPhone product-page header puts
its status bar over about y 530-840, so the headline starts at y 870 (Cutling's banners.py measured the same). In the
safe area: frame 2's headline and Undirect's row in Safari's page menu, pressed. Outside it, backdrop that any surface
may cut: the pop-ups the page throws on the left, the phone with the list of what was stopped on the right.
Upload and placement: ../banner.py (upload <app> undirect-poster out/banners/{locale}.png, then place)."""
import json, subprocess, sys
from pathlib import Path

import build as B
import screens as S
from screens import esc

W_, H_ = 5244, 2950
OUT = B.OUT / "banners"


def page(loc):
    W = B.words(loc)
    name = S.name(loc)
    scr_dir = B.OUT / loc / "screens"
    S.write_all(W, loc, scr_dir)
    B.DEV["banner"] = dict(w=W_, h=H_, n=1, kind="phone", pts=(440, 956), shot=(W_, H_))
    P = B.Pano(loc, "banner")
    P.u = 1.55
    P.add(f'<div class="glow" style="left:{W_*.5-1500}px;top:{H_*.25}px;width:3000px;height:2400px;background:rgba(217,43,36,.20)"></div>')
    # headline: frame 2's, centred in the safe area under the status bar
    t = W["2"]
    lh = B.HEAD_LH.get(loc, .86)
    P.add(f'<div class="col" data-w="1380" data-h="470" style="position:absolute;left:{(W_-1380)/2}px;top:870px;width:1380px;text-align:center">'
          f'<div class="h1" style="font-size:250px;line-height:{lh}">{B.lines(t["h"].replace("|", "|"))}</div></div>')
    # the row, pressed, under it
    P.add(B.menu_row(P, (W_ - 1300) / 2, 1380, 1300, name, rot=-3, z=30))
    # left: the pile of pop-ups
    ads = W["ads"]
    for j, (x, y, rot) in enumerate([(380, 700, -8), (1050, 560, 6), (200, 1350, 5), (980, 1250, -6), (520, 1950, -3), (1250, 1900, 8), (160, 2450, 4)]):
        P.add(B.ad(P, x, y, 720, rot, ads[j % len(ads)], ads[(j + 5) % len(ads)], j, 10 + j))
    # right: the phone with the list, the note and a blocked row
    d, _ = B.device(P, "../screens/sheet.html?view=page", 3700, 560, 1180)
    P.add(d)
    P.add(B.blocked_card(P, 3420, 2250, 1250, rot=3))
    P.add(B.note_piece(P, 3360, 1880, 4.6, "stopped", rot=-3))
    hf = B.HEAD_FONT.get(loc, "")
    font_css = f'.h1{{font-family:system-ui,-apple-system,{hf},sans-serif}}' if hf else ""
    out = OUT / loc
    out.mkdir(parents=True, exist_ok=True)
    # the screens folder sits beside out/<loc>/, the same relative path as the frames use
    html = (f'<!doctype html><html lang="{loc}"><head><meta charset="utf-8"><style>{B.CSS}{font_css}'
            f'html,body{{width:{W_}px;height:{H_}px}} .stage{{width:{W_}px;height:{H_}px}}</style></head>'
            f'<body><div class="stage"{" dir=rtl" if P.rtl else ""}>{"".join(P.parts)}</div>{B.FIT}<script>window.READY_WAIT=2600</script>'
            f'<script src="{(B.HERE / "ready.js").as_uri()}"></script></body></html>')
    p = B.OUT / loc / "banner" / "banner.html"
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(html)
    return {"html": str(p), "png": str(OUT / f"{loc}.raw.png"), "w": W_, "h": H_}


def main():
    a = [x for x in sys.argv[1:] if not x.startswith("--")]
    if a and a[0] == "sheet":
        fs = sorted(OUT.glob("*.png"))
        fs = [f for f in fs if f.stem in B.STORE]
        subprocess.run(["magick", "montage", *map(str, fs), "-tile", "6x", "-geometry", "640x360+8+8", "-background", "#222",
                        str(B.OUT / "sheet-banners.png")], check=True)
        return print(B.OUT / "sheet-banners.png")
    locs = [l for l in B.STORE if (B.HERE / "words" / f"{l}.json").exists()] if "--all" in sys.argv else (a or ["en-US"])
    jobs = [page(l) for l in locs]
    B.render(jobs)
    for j in jobs:   # PNG24, no alpha, as App Store Connect asks
        raw = Path(j["png"]); dst = raw.with_name(raw.name.replace(".raw", ""))
        subprocess.run(["magick", str(raw), "-background", "#0E0E10", "-alpha", "remove", "-alpha", "off", "PNG24:" + str(dst)], check=True)
        raw.unlink()
        print(dst)


if __name__ == "__main__":
    main()
