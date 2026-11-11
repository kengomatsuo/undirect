#!/usr/bin/env python3
"""Render the universal 16:9 creative asset (5244x2950, no alpha) per locale for Undirect and Cutling.

    python3 Support/AppStore/render_creative.py <undirect|cutling> [locale ...] [--force]

Apple asks for the focal point "within the center of your composition to prevent any unwanted
clipping" (developer.apple.com/app-store/asset-best-practices). On iPhone the product page header
crops much of the asset away. Apple's Universal template (creative_assets-universal_asset_template-static.psd,
layer "Art Safe Area") marks the area every surface keeps: x 1921-3323, y 660-1622 of 5244x2950.
Headline and the top of the app card sit inside it; the rest of the card runs past it as backdrop.
"""
import glob, html, importlib.util, json, os, subprocess, sys
from concurrent.futures import ThreadPoolExecutor

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "creative-src")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
NOTO = os.path.expanduser("~/Repositories/undirect/.shots/noto")
CUTLING = os.path.expanduser("~/Repositories/Cutling")

spec = importlib.util.spec_from_file_location("shots", os.path.join(HERE, "render_screenshots.py"))
shots = importlib.util.module_from_spec(spec); spec.loader.exec_module(shots)

APPS = {
    "undirect": dict(card="ucard.png", bg="linear-gradient(120deg,#ff4a3d 0%,#e3192b 55%,#a80f24 100%)",
                     shadow="0 40px 160px rgba(70,0,10,.55)", out=os.path.join(HERE, "../../.shots/creative")),
    "cutling": dict(card="ccard.png", bg="#128a72", shadow="0 40px 140px rgba(0,0,0,.28)",
                    out=os.path.join(CUTLING, "fastlane/creative")),
}

def headlines(app):
    if app == "undirect":
        h = json.load(open(os.path.join(HERE, "headlines.json"), encoding="utf8"))
        out = {}
        for code, v in h.items():
            for loc in (["en-US", "en-AU", "en-CA", "en-GB"] if code == "en" else [code]): out[loc] = v["c1a"]
        return out
    w = json.load(open(os.path.join(CUTLING, "docs/aso/data/writers-en.json"), encoding="utf8"))
    for f in glob.glob(os.path.join(CUTLING, "docs/aso/data/writers/*.json")): w.update(json.load(open(f, encoding="utf8")))
    locs = [d for d in os.listdir(os.path.join(CUTLING, "fastlane/screenshots")) if os.path.isdir(os.path.join(CUTLING, "fastlane/screenshots", d))]
    return {l: (w[l]["captions"]["f1"][0] if l in w else "Clipboard keyboard for snippets") for l in locs if l in w or l.startswith("en")}

def keep_last_pair(t):
    # The last two words stay on one line ("for Safari"), so a two-line headline never leaves one word alone.
    # A headline with no spaces (one Japanese word) is kept on one line and shrunk to fit, down to 60px.
    if "\n" in t or " " not in t.strip(): return t
    head, _, last = t.rstrip().rpartition(" ")
    return head + "&nbsp;" + last

def render(app, loc, text, force):
    a = APPS[app]; out = os.path.abspath(os.path.join(a["out"], loc, "universal.png"))
    if os.path.exists(out) and not force: return loc, "kept"
    cfg = shots.FONTS.get(loc); fam = cfg[0] if cfg else None
    face = f"@font-face{{font-family:'{fam}';src:url('file://{NOTO}/{shots.FACES[fam]}.ttf');font-weight:100 900}}" if fam else ""
    family = f"'{fam}',-apple-system" if fam else "-apple-system,'SF Pro Display'"
    weight = cfg[1] if cfg else 700
    # Canvas 2622x1475 (rendered at 2x). Apple's safe area at this scale: x 960-1662, y 330-811.
    # The iPhone header puts its status bar over roughly y 265-420, so the headline starts below it.
    doc = f"""<!doctype html><html lang="{loc}" {'dir=rtl' if cfg and cfg[4] else ''}><meta charset=utf-8><style>{face}
*{{margin:0;box-sizing:border-box}}html,body{{width:2622px;height:1475px;overflow:hidden}}
body{{background:{a['bg']};font-family:{family};color:#fff;position:relative}}
h1{{position:absolute;left:50%;top:525px;transform:translate(-50%,-50%);width:690px;text-align:center;font-size:84px;word-break:auto-phrase;text-wrap:balance;
line-height:{1.25 if fam else 1.04};font-weight:{weight};{'' if fam else 'letter-spacing:-.025em;'}}}
.c{{position:absolute;left:50%;top:632px;transform:translateX(-50%);width:560px;border-radius:44px;overflow:hidden;box-shadow:{a['shadow']}}}
.c img{{display:block;width:100%}}</style>
<h1 id=h>{keep_last_pair(html.escape(text)).replace(chr(10), '<br>')}</h1><div class=c><img src="file://{SRC}/{a['card']}"></div>
<script>document.fonts.ready.then(()=>{{const h=document.getElementById('h');let s=84;const fit=()=>{{while((h.scrollWidth>690||h.offsetHeight>190)&&s>40){{s-=4;h.style.fontSize=s+'px'}}}};if(!/\\s|\\u00a0/.test(h.textContent)){{h.style.whiteSpace='nowrap';fit();if(s<60){{h.style.whiteSpace='';s=84;h.style.fontSize='84px'}}}}fit();}})</script></html>"""
    os.makedirs(os.path.dirname(out), exist_ok=True)
    page, raw, prof = out + ".html", out + ".raw.png", f"/tmp/creative-{os.getpid()}-{abs(hash(out)) % 99999}"
    open(page, "w", encoding="utf8").write(doc)
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=2",
                    "--window-size=2622,1475", "--virtual-time-budget=4000", f"--screenshot={raw}",
                    f"--user-data-dir={prof}", f"file://{page}"], capture_output=True, timeout=400)
    subprocess.run(["magick", raw, "-alpha", "off", "-resize", "5244x2950!", "PNG24:" + out], check=True)
    os.remove(raw); os.remove(page); subprocess.run(["rm", "-rf", prof])
    return loc, "rendered"

if __name__ == "__main__":
    args = [x for x in sys.argv[1:] if not x.startswith("--")]
    app, only, force = args[0], set(args[1:]), "--force" in sys.argv
    h = headlines(app)
    jobs = [(app, l, t, force) for l, t in sorted(h.items()) if not only or l in only]
    with ThreadPoolExecutor(2) as ex: res = list(ex.map(lambda j: render(*j), jobs))
    print(len([r for r in res if r[1] == "rendered"]), "rendered of", len(res))
