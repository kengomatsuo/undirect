#!/usr/bin/env python3
"""Mac App Store popup frames, composited from the real popup code.

Safari's popover cannot be driven from here without installing a second Mac copy
of the app, so these frames are composited, and the commit says so. The shipping
Extension/Resources/popup is loaded as it is (extension APIs stubbed, as
tests/build.py does) into a 340px frame laid over a blurred copy of the live demo
page, which stands in for the popover material that shows through the Mac popup's
unpainted page. The toolbar strip reuses the buttons of the real Safari capture
in .shots/mac/assets/popup.png, with the Undirect button redrawn red and badged,
as it is while a site is guarded.

Writes <out>/mac-popup-<hash>.png, mac-toggle-<hash>.png and mac-dark-<hash>.png.

    python3 Support/AppStore/capture_mac_popup.py [--out .shots/captures/new]
"""
import argparse, json, os, re, shutil, subprocess, sys, tempfile
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SRC = os.path.join(ROOT, "Extension", "Resources")
CHROME = os.environ.get("CHROME", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
OLD = os.path.join(ROOT, ".shots", "mac", "assets", "popup.png")  # a real Safari capture

POP_H = 509  # the popup's own height at 340px, measured in Chrome
STATE = {
    "settings": {"enabled": True, "policy": "block", "mode": "watched"},
    "counts": {"page": 8, "seen": 8, "session": 12, "lifetime": 340},
    "site": "matsuokengo.com", "guarding": True, "watched": {"matsuokengo.com": True}, "recipe": None,
    "rows": [
        {"base": "adserver.example", "kinds": ["window-open"], "count": 3, "blocked": 3, "url": "https://adserver.example/x", "here": None, "everywhere": "block"},
        {"base": "tabunder.example", "kinds": ["synthetic-click"], "count": 3, "blocked": 3, "url": "https://tabunder.example/x", "here": None, "everywhere": "block"},
        {"base": "clicktrack.example", "kinds": ["click-catcher"], "count": 1, "blocked": 1, "url": "https://clicktrack.example/x", "here": None, "everywhere": "block"},
        {"base": "matsuokengo.com", "kinds": ["overlay"], "count": 1, "blocked": 1, "url": "", "here": None, "everywhere": None, "local": True, "lastVerdict": "block"},
    ],
    "everywhere": {"adserver.example": "block", "tabunder.example": "block", "clicktrack.example": "block"},
    "perSite": {},
}


def dark_css(text):
    """Chrome headless offers no switch for prefers-color-scheme, so dark is the dark branch made unconditional."""
    return re.sub(r"\(\s*prefers-color-scheme\s*:\s*dark\s*\)", "all", text)


def popup_page(work, scheme):
    messages = json.load(open(os.path.join(SRC, "_locales", "en", "messages.json")))
    stub = ("<script>\nconst MESSAGES = %s;\nconst STATE = %s;\n" % (json.dumps(messages), json.dumps(STATE))
            + open(os.path.join(ROOT, "tests", "popup-stub.js")).read() + "</script>\n")
    html = open(os.path.join(SRC, "popup", "popup.html")).read()
    html = html.replace('<script src="popup.js"></script>', stub + '<script src="popup.js"></script>')
    open(os.path.join(work, "popup.html"), "w").write(html)
    css = open(os.path.join(SRC, "popup", "popup.css")).read()
    open(os.path.join(work, "popup.css"), "w").write(dark_css(css) if scheme == "dark" else css)
    shutil.copy(os.path.join(SRC, "popup", "popup.js"), os.path.join(work, "popup.js"))


def chrome(args, scheme, scale):
    flags = [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-sandbox",
             "--force-device-scale-factor=%d" % scale, "--force-color-profile=srgb",
             "--default-background-color=00000000", "--virtual-time-budget=6000",
            ] + args
    return subprocess.run(flags, capture_output=True, text=True, timeout=180)


def toolbar_base(work):
    """The real Safari toolbar capsule, with the old Undirect button painted out."""
    im = Image.open(OLD).convert("RGBA")
    px = im.load()
    fill = px[470, 30]
    for y in range(24, 80):
        for x in range(338, 412):
            px[x, y] = fill
    im.crop((318, 0, 855, 100)).save(os.path.join(work, "toolbar.png"))


ICON = open(os.path.join(SRC, "images", "toolbar-icon.svg")).read()

BAR = """
<img src=page.png style="position:absolute;left:-773px;top:56px;width:1200px">
<div style="position:absolute;left:0;top:0;width:427px;height:57px;background:#fff;border-bottom:.5px solid rgba(0,0,0,.2)"></div>
<div style="position:absolute;left:0;top:0;width:11px;height:57px"></div>
<div style="position:absolute;left:158px;top:0;width:269px;height:50px;background:url(toolbar.png) 0 0/269px 50px no-repeat"></div>
<div style="position:absolute;left:170px;top:15px;width:25px;height:27px">%(icon)s</div>
<div style="position:absolute;left:190px;top:9px;min-width:11px;height:11px;border-radius:6px;background:#ff3b30;color:#fff;font:600 8px/11px -apple-system,sans-serif;text-align:center;padding:0 2px">8</div>
<div style="position:absolute;left:%(ax)spx;top:46px;width:20px;height:11px;background:@MAT@;clip-path:polygon(0 100%%,50%% 0,100%% 100%%);-webkit-backdrop-filter:blur(34px);backdrop-filter:blur(34px)"></div>
<div class=pop style="left:11px;top:56px;width:340px;height:%(h)dpx"><iframe src=popup.html style="height:%(h)dpx"></iframe></div>
"""
ALONE = """
<img src=page.png style="position:absolute;left:-760px;top:-90px;width:1200px">
<div class=pop style="left:0;top:0;width:340px;height:%(h)dpx;border-radius:26px;box-shadow:none"><iframe src=popup.html style="height:%(h)dpx"></iframe></div>
"""


def shoot(work, name, scheme, w, h, scale, body, radius=0):
    mat = "rgba(246,246,248,.74)" if scheme == "light" else "rgba(44,44,46,.72)"
    html = ("<!doctype html><meta charset=utf-8><style>html,body{margin:0;background:transparent}"
            "#s{position:relative;width:%dpx;height:%dpx;overflow:hidden;border-radius:%dpx;background:%s}"
            ".pop{position:absolute;overflow:hidden;border-radius:26px;background:%s;"
            "-webkit-backdrop-filter:blur(34px) saturate(1.7);backdrop-filter:blur(34px) saturate(1.7);"
            "box-shadow:0 0 0 .5px rgba(0,0,0,.18)}"
            ".pop iframe{display:block;border:0;width:340px;background:transparent}"
            "svg{width:100%%;height:100%%}</style><div id=s>%s</div>"
            % (w, h, radius, "#fff" if scheme == "light" else "#1c1c1e", mat, body.replace("@MAT@", mat)))
    page = os.path.join(work, "scene-" + name + ".html")
    open(page, "w").write(html)
    out = os.path.join(work, name + ".png")
    chrome(["--window-size=%d,%d" % (w, h), "--screenshot=" + out, "file://" + page], scheme, scale)
    if not os.path.exists(out):
        sys.exit("no screenshot for " + name)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=os.path.join(ROOT, ".shots", "captures", "new"))
    a = ap.parse_args()
    h = subprocess.check_output(["git", "-C", ROOT, "rev-parse", "--short", "HEAD"], text=True).strip()
    work = tempfile.mkdtemp(prefix="macpopup-")
    toolbar_base(work)
    os.makedirs(a.out, exist_ok=True)
    demo = subprocess.check_output(["curl", "-sL", "https://undirect.matsuokengo.com/demo/"], text=True)
    css = subprocess.check_output(["curl", "-sL", "https://undirect.matsuokengo.com/style.css"], text=True)
    for scheme in ("light", "dark"):
        d = os.path.join(work, scheme)
        os.makedirs(d)
        shutil.copy(os.path.join(work, "toolbar.png"), d)
        popup_page(d, scheme)
        page = demo.replace("<head>", '<head><base href="https://undirect.matsuokengo.com/demo/">', 1)
        page = page.replace('<link rel="stylesheet" href="/style.css">', "<style>" + css + "</style>")
        if scheme == "dark":
            page = dark_css(page)
        open(os.path.join(d, "demo.html"), "w").write(page)
        chrome(["--window-size=1200,900", "--screenshot=" + os.path.join(d, "page.png"), "file://" + os.path.join(d, "demo.html")], scheme, 1)
    bar = BAR % {"icon": ICON, "ax": 11 + 170 - 10, "h": POP_H}
    p = shoot(os.path.join(work, "light"), "popup", "light", 427, 57 + POP_H + 14, 2, bar)
    Image.open(p).save(os.path.join(a.out, "mac-popup-%s.png" % h))
    Image.open(p).crop((6, 0, 6 + 830, 472)).save(os.path.join(a.out, "mac-toggle-%s.png" % h))
    p = shoot(os.path.join(work, "dark"), "dark", "dark", 340, POP_H, 4, ALONE % {"h": POP_H}, radius=26)
    Image.open(p).save(os.path.join(a.out, "mac-dark-%s.png" % h))
    print(work)


if __name__ == "__main__":
    main()
