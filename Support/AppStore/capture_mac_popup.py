#!/usr/bin/env python3
"""Mac App Store popup frames, composited from the real popup code, all dark.

Safari's popover cannot be driven from here without installing a second Mac copy
of the app, so these frames are composited, and the commit says so. The shipping
Extension/Resources/popup is loaded as it is (extension APIs stubbed, as
tests/build.py does) into a 340px frame. The plate behind it is a real Safari dark
frame from the 1.0.3 Mac take, with the popup closed and the Undirect button red.

Writes <out>/mac-popup-<hash>.png, mac-toggle-<hash>.png and mac-dark-<hash>.png.

    python3 Support/AppStore/capture_mac_popup.py [--out .shots/captures/new]
"""
import argparse, json, os, re, shutil, subprocess, sys, tempfile
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SRC = os.path.join(ROOT, "Extension", "Resources")
CHROME = os.environ.get("CHROME", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
FILM = os.path.expanduser("~/Repositories/undirect-promo/wire/public/previews/mac-103-popup.mov")  # Safari dark, 2940x1846

STATE = {
    "settings": {"enabled": True, "policy": "block", "mode": "watched"},
    "counts": {"page": 8, "seen": 8, "session": 12, "lifetime": 340},
    "site": "matsuokengo.com", "guarding": True, "watched": {"matsuokengo.com": True}, "recipe": None,
    "rows": [
        {"base": "adserver.example", "kinds": ["window-open"], "count": 3, "blocked": 3, "url": "https://adserver.example/pop?id=4410", "here": None, "everywhere": "block",
         "urls": ["https://adserver.example/pop?id=4410", "https://adserver.example/r/88213?sub=demo", "https://cdn.adserver.example/go/7", "https://adserver.example/pop?id=4410&retry=2", "https://adserver.example/z/1"]},
        {"base": "tabunder.example", "kinds": ["synthetic-click"], "count": 3, "blocked": 3, "url": "https://tabunder.example/t/52", "here": None, "everywhere": "block",
         "urls": ["https://tabunder.example/t/52", "https://tabunder.example/t/52?b=1"]},
        {"base": "clicktrack.example", "kinds": ["click-catcher"], "count": 1, "blocked": 1, "url": "https://clicktrack.example/c?src=demo", "here": None, "everywhere": "block",
         "urls": ["https://clicktrack.example/c?src=demo"]},
        {"base": "matsuokengo.com", "kinds": ["overlay"], "count": 1, "blocked": 1, "url": "", "here": None, "everywhere": None, "local": True, "lastVerdict": "block"},
    ],
    "everywhere": {"adserver.example": "block", "tabunder.example": "block", "clicktrack.example": "block"},
    "perSite": {},
}


# Frame 1 fits the panel's crop: the three sample rows, one address each.
COMPACT = json.loads(json.dumps(STATE))
COMPACT["counts"]["page"] = COMPACT["counts"]["seen"] = 7
COMPACT["rows"] = [dict(r, urls=r["urls"][:1]) for r in COMPACT["rows"][:3]]


def dark_css(text):
    """Chrome headless offers no switch for prefers-color-scheme, so dark is the dark branch made unconditional,
    and the Mac-only fill Safari picks through @supports is applied the same way."""
    text = re.sub(r"\(\s*prefers-color-scheme\s*:\s*dark\s*\)", "all", text)
    return re.sub(r"@supports \(-apple-visual-effect: -apple-system-vibrancy-fill\)", "@media all", text)


def popup_page(work, state):
    messages = json.load(open(os.path.join(SRC, "_locales", "en", "messages.json")))
    stub = ("<script>\nconst MESSAGES = %s;\nconst STATE = %s;\n" % (json.dumps(messages), json.dumps(state))
            + open(os.path.join(ROOT, "tests", "popup-stub.js")).read() + "</script>\n")
    html = open(os.path.join(SRC, "popup", "popup.html")).read()
    html = html.replace('<script src="popup.js"></script>', stub + '<script src="popup.js"></script>')
    os.makedirs(work, exist_ok=True)
    open(os.path.join(work, "popup.html"), "w").write(html)
    open(os.path.join(work, "popup.css"), "w").write(dark_css(open(os.path.join(SRC, "popup", "popup.css")).read()))
    shutil.copy(os.path.join(SRC, "popup", "popup.js"), os.path.join(work, "popup.js"))
    shutil.copy(os.path.join(work, "..", "plate.png"), work)


def chrome(args, scale):
    flags = [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-sandbox",
             "--force-device-scale-factor=%d" % scale, "--force-color-profile=srgb",
             "--default-background-color=00000000", "--virtual-time-budget=6000",
            ] + args
    return subprocess.run(flags, capture_output=True, text=True, timeout=180)


def film_plate(work):
    """A closed-popup frame of the real take, cut to the top right of the Safari window."""
    full = os.path.join(work, "film.png")
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-ss", "0.2", "-i", FILM, "-frames:v", "1", full], check=True)
    Image.open(full).convert("RGB").crop((2086, 0, 2940, 1426)).save(os.path.join(work, "plate.png"))


def pop_height(work):
    """The popup's own height at 340px, read from the rendered page."""
    page = os.path.join(work, "popup.html")
    html = open(page).read() + '<script>setTimeout(()=>document.documentElement.dataset.h=document.body.scrollHeight,1500)</script>'
    probe = os.path.join(work, "probe.html")
    open(probe, "w").write(html)
    out = chrome(["--window-size=340,900", "--dump-dom", "file://" + probe], 1).stdout
    return int(re.search(r'data-h="(\d+)"', out).group(1))


BAR = """
<img src=plate.png style="position:absolute;left:0;top:0;width:427px">
<div style="position:absolute;left:223.5px;top:8px;width:12px;height:12px;border-radius:6px;background:#e5484d;color:#fff;font:700 8.5px/12px -apple-system,sans-serif;text-align:center">%(badge)d</div>
<div style="position:absolute;left:209px;top:46px;width:20px;height:11px;background:@MAT@;clip-path:polygon(0 100%%,50%% 0,100%% 100%%);-webkit-backdrop-filter:blur(34px);backdrop-filter:blur(34px)"></div>
<div class=pop style="left:48px;top:57px;width:340px;height:%(h)dpx"><iframe src=popup.html style="height:%(h)dpx"></iframe></div>
"""
ALONE = """
<img src=plate.png style="position:absolute;left:-48px;top:-57px;width:427px">
<div class=pop style="left:0;top:0;width:340px;height:%(h)dpx;border-radius:26px;box-shadow:none"><iframe src=popup.html style="height:%(h)dpx"></iframe></div>
"""


# The scene names the same color scheme as the popup: a frame whose scheme differs from its parent paints an opaque canvas.
def shoot(work, name, w, h, scale, body, radius=0):
    mat = "rgba(72,72,78,.46)"  # measured from the take: the popover over its black and its blue page
    html = ("<!doctype html><meta charset=utf-8><meta name=color-scheme content='light dark'><style>html,body{margin:0;background:transparent}"
            "#s{position:relative;width:%dpx;height:%dpx;overflow:hidden;border-radius:%dpx;background:#1c1c1e}"
            ".pop{position:absolute;overflow:hidden;border-radius:26px;background:%s;"
            "-webkit-backdrop-filter:blur(34px) saturate(1.3);backdrop-filter:blur(34px) saturate(1.3);"
            "box-shadow:0 0 0 .5px rgba(255,255,255,.22),0 12px 34px rgba(0,0,0,.45)}"
            ".pop iframe{display:block;border:0;width:340px;background:transparent}"
            "</style><div id=s>%s</div>"
            % (w, h, radius, mat, body.replace("@MAT@", mat)))
    page = os.path.join(work, "scene-" + name + ".html")
    open(page, "w").write(html)
    out = os.path.join(work, name + ".png")
    chrome(["--window-size=%d,%d" % (w, h), "--screenshot=" + out, "file://" + page], scale)
    if not os.path.exists(out):
        sys.exit("no screenshot for " + name)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=os.path.join(ROOT, ".shots", "captures", "new"))
    a = ap.parse_args()
    h = subprocess.check_output(["git", "-C", ROOT, "rev-parse", "--short", "HEAD"], text=True).strip()
    work = tempfile.mkdtemp(prefix="macpopup-")
    film_plate(work)
    os.makedirs(a.out, exist_ok=True)
    compact, full = os.path.join(work, "compact"), os.path.join(work, "full")
    popup_page(compact, COMPACT)
    popup_page(full, STATE)
    ch, fh = pop_height(compact), pop_height(full)
    print("popup heights", ch, fh)
    p = shoot(compact, "popup", 427, 57 + ch + 12, 2, BAR % {"badge": COMPACT["counts"]["page"], "h": ch})
    Image.open(p).save(os.path.join(a.out, "mac-popup-%s.png" % h))
    im = Image.open(p).crop((6, 0, 6 + 830, 472))
    # the crop ends on the next section's heading, so the last clear row carries down over it
    im.paste(im.crop((0, 455, 830, 456)).resize((830, 17)), (0, 455))
    im.save(os.path.join(a.out, "mac-toggle-%s.png" % h))
    p = shoot(full, "dark", 340, fh, 4, ALONE % {"h": fh}, radius=26)
    Image.open(p).save(os.path.join(a.out, "mac-dark-%s.png" % h))
    print(work)


if __name__ == "__main__":
    main()
