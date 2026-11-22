#!/usr/bin/env python3
"""Writes popup/ and screen/stream.html.

popup/ : the shipping toolbar popup (Extension/Resources/popup) as the iPhone draws it, dark,
with the extension APIs stubbed the way tests/build.py and capture_mac_popup.py do, so a strip can show
the real rows at any size without a soft enlargement. State is the demo page's: 8 stopped on matsuokengo.com.

screen/stream.html : the demo's own streaming page (web/demo/stream/index.html, the page the films use) with its
film playing: the page's markup and styles as they ship, its scripts dropped, and a still of the film
(img/night-harbor-3840.jpg, rendered from the film's Remotion source) where the <video> plays. The status
bar and Safari's bar around it are drawn in common.css, not captured.

    python3 Support/AppStore/creative/src/build_parts.py
"""
import json, os, re, shutil
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
SRC = os.path.join(ROOT, "Extension", "Resources")
OUT = os.path.join(HERE, "popup")

def row(base, kind, n, url, **kw):
    return dict({"base": base, "kinds": [kind], "count": n, "blocked": n, "url": url, "here": None, "everywhere": "block", "urls": [url]}, **kw)

STATE = {
    "settings": {"enabled": True, "policy": "block", "mode": "watched"},
    "counts": {"page": 8, "seen": 8, "session": 12, "lifetime": 340},
    "site": "matsuokengo.com", "guarding": True, "watched": {"matsuokengo.com": True}, "recipe": None,
    "rows": [
        row("adserver.example", "window-open", 3, "https://adserver.example/offer"),
        row("tabunder.example", "synthetic-click", 3, "https://tabunder.example/"),
        row("clicktrack.example", "click-catcher", 1, "https://clicktrack.example/go"),
        row("matsuokengo.com", "overlay", 1, "", everywhere=None, local=True, lastVerdict="block"),
    ],
    "everywhere": {"adserver.example": "block", "tabunder.example": "block", "clicktrack.example": "block"},
    "perSite": {},
}

def iphone_dark(css):
    css = re.sub(r"\(\s*prefers-color-scheme\s*:\s*dark\s*\)", "all", css)
    css = re.sub(r"\(\s*pointer\s*:\s*coarse\s*\)", "all", css)
    return re.sub(r"@supports \(-webkit-touch-callout: none\)", "@media all", css)

os.makedirs(OUT, exist_ok=True)
messages = json.load(open(os.path.join(SRC, "_locales", "en", "messages.json")))
stub = ("<script>\nconst MESSAGES = %s;\nconst STATE = %s;\n" % (json.dumps(messages), json.dumps(STATE))
        + open(os.path.join(ROOT, "tests", "popup-stub.js")).read() + "</script>\n")
html = open(os.path.join(SRC, "popup", "popup.html")).read()
html = html.replace('<script src="popup.js"></script>', stub + '<script src="popup.js"></script>')
open(os.path.join(OUT, "popup.html"), "w").write(html)
open(os.path.join(OUT, "popup.css"), "w").write(iphone_dark(open(os.path.join(SRC, "popup", "popup.css")).read()))
shutil.copy(os.path.join(SRC, "popup", "popup.js"), os.path.join(OUT, "popup.js"))
for extra in re.findall(r'(?:src|href)="([^"]+)"', html):
    p = os.path.normpath(os.path.join(SRC, "popup", extra))
    if os.path.isfile(p) and extra not in ("popup.js", "popup.css"):
        d = os.path.normpath(os.path.join(OUT, extra)); os.makedirs(os.path.dirname(d), exist_ok=True); shutil.copy(p, d)
        print("copied", extra)
print("wrote", OUT)

page = open(os.path.join(ROOT, "web", "demo", "stream", "index.html")).read()
page = re.sub(r"<script[\s\S]*?</script>", "", page)
page = page.replace('<div class="player" id="player"', '<div class="player playing" id="player"')
page = re.sub(r"<video[^>]*></video>", '<img class="film" src="../img/night-harbor-3840.jpg">', page)
page = page.replace("</style>", "  .player .film { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; }\n"
                    "  html { scrollbar-width: none; } body { overflow: hidden; }\n</style>")
os.makedirs(os.path.join(HERE, "screen"), exist_ok=True)
open(os.path.join(HERE, "screen", "stream.html"), "w").write(page)
print("wrote screen/stream.html")
