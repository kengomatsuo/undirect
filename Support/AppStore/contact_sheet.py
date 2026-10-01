#!/usr/bin/env python3
"""Contact sheets of the rendered store screenshots, one image per kind and batch of locales,
written to .shots/contact/<kind>-<batch>.png. A row is a locale, a column a frame.
    python3 Support/AppStore/contact_sheet.py [--per 6]"""
import argparse, json, os
from PIL import Image, ImageDraw
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
A = os.path.join(ROOT, "Support", "AppStore")
ap = argparse.ArgumentParser(); ap.add_argument("--per", type=int, default=6); ap.add_argument("--kinds", default="iphone,ipad,mac")
a = ap.parse_args()
codes = ["en"] + sorted(json.load(open(os.path.join(A, "headlines.json"))))
codes = list(dict.fromkeys(codes))
os.makedirs(os.path.join(ROOT, ".shots", "contact"), exist_ok=True)
for kind in a.kinds.split(","):
    cw = {"iphone": 230, "ipad": 300, "mac": 400}[kind]
    for bi in range(0, len(codes), a.per):
        batch = [c for c in codes[bi:bi + a.per] if c != "en" or True]
        tiles = []
        for c in batch:
            d = os.path.join(A, kind) if c == "en" else os.path.join(A, c, kind)
            row = []
            for n in range(1, 6):
                p = os.path.join(d, "%02d.png" % n)
                if os.path.exists(p):
                    im = Image.open(p).convert("RGB"); im.thumbnail((cw, 2000)); row.append(im)
            tiles.append((c, row))
        ch = max(im.size[1] for _, r in tiles for im in r)
        W = 70 + 5 * (cw + 6); H = len(tiles) * (ch + 6)
        sheet = Image.new("RGB", (W, H), (60, 60, 64)); dr = ImageDraw.Draw(sheet)
        for i, (c, row) in enumerate(tiles):
            dr.text((6, i * (ch + 6) + 6), c, fill=(255, 255, 255))
            for j, im in enumerate(row):
                sheet.paste(im, (70 + j * (cw + 6), i * (ch + 6)))
        sheet.save(os.path.join(ROOT, ".shots", "contact", "%s-%02d.png" % (kind, bi // a.per + 1)))
