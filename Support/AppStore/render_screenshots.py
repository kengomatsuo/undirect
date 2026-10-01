#!/usr/bin/env python3
"""Render the localized App Store screenshots.

Takes the English hypershots panels in .shots/<kind>/panels (untracked), swaps
only the headline text for each locale in Support/AppStore/headlines.json, and
renders with headless Chrome at the exact App Store canvas, the way the
hypershots render.sh does. Output goes to Support/AppStore/<code>/<kind>/NN.png.

    python3 Support/AppStore/render_screenshots.py [--kinds iphone,ipad,mac] [--locales de-DE,ja] [--jobs 6]

Needs the Noto fonts: Support/AppStore/fetch_noto_fonts.sh (writes .shots/noto).
English locales keep the English sets in Support/AppStore/{iphone,ipad,mac}.
rebreaks.json holds the few headlines that did not fit at the panel floor and were
re-broken at word boundaries (words untouched). Headline h1/h2/h3 map to iPhone and iPad panels 1-3; the Mac set has two panels
that carry h1 and h3.
"""
import argparse, html, json, os, re, shutil, subprocess, sys
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SHOTS = os.path.join(ROOT, ".shots")
APPSTORE = os.path.join(ROOT, "Support", "AppStore")
CHROME = os.environ.get("CHROME", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")

# kind -> (profile, css w, css h, scale, panel number -> headline key)
KINDS = {
    "iphone": ("iphone-6.9-alt", 440, 956, 3, {1: "h1", 2: "h2", 3: "h3"}),
    "ipad": ("ipad-13", 1032, 1376, 2, {1: "h1", 2: "h2", 3: "h3"}),
    "mac": ("mac-2880", 1440, 900, 2, {1: "h1", 2: "h3"}),
}

# code -> (font family, weight, letter-spacing override, line-height, rtl). None = keep the theme.
LATIN = None
SANS = ("Noto Sans", 800, None, None, False)
def script(fam, lh, w=800, rtl=False):
    return (fam, w, "0", lh, rtl)
FONTS = {
    "ar-SA": script("Noto Sans Arabic", 1.35, rtl=True),
    "he": script("Noto Sans Hebrew", 1.2, rtl=True),
    "ur-PK": script("Noto Nastaliq Urdu", 2.0, w=700, rtl=True),
    "hi": script("Noto Sans Devanagari", 1.3), "mr-IN": script("Noto Sans Devanagari", 1.3),
    "bn-BD": script("Noto Sans Bengali", 1.3), "gu-IN": script("Noto Sans Gujarati", 1.3),
    "pa-IN": script("Noto Sans Gurmukhi", 1.3), "kn-IN": script("Noto Sans Kannada", 1.3),
    "ml-IN": script("Noto Sans Malayalam", 1.3), "or-IN": script("Noto Sans Oriya", 1.3),
    "ta-IN": script("Noto Sans Tamil", 1.3), "te-IN": script("Noto Sans Telugu", 1.3),
    "th": script("Noto Sans Thai", 1.3),
    "ja": script("Noto Sans JP", 1.2), "ko": script("Noto Sans KR", 1.2),
    "zh-Hans": script("Noto Sans SC", 1.2), "zh-Hant": script("Noto Sans TC", 1.2),
    "ru": SANS, "uk": SANS, "el": SANS, "vi": SANS,
}
FACES = {  # family -> file in .shots/noto
    "Noto Sans": "NotoSans", "Noto Sans Arabic": "NotoSansArabic", "Noto Sans Hebrew": "NotoSansHebrew",
    "Noto Nastaliq Urdu": "NotoNastaliqUrdu", "Noto Sans Devanagari": "NotoSansDevanagari",
    "Noto Sans Bengali": "NotoSansBengali", "Noto Sans Gujarati": "NotoSansGujarati",
    "Noto Sans Gurmukhi": "NotoSansGurmukhi", "Noto Sans Kannada": "NotoSansKannada",
    "Noto Sans Malayalam": "NotoSansMalayalam", "Noto Sans Oriya": "NotoSansOriya",
    "Noto Sans Tamil": "NotoSansTamil", "Noto Sans Telugu": "NotoSansTelugu", "Noto Sans Thai": "NotoSansThai",
    "Noto Sans JP": "NotoSansJP", "Noto Sans KR": "NotoSansKR", "Noto Sans SC": "NotoSansSC", "Noto Sans TC": "NotoSansTC",
}

# Mac copy column width; ml-IN's one-word second line needs more at the panel floor.
MAC_WIDTH = {"ml-IN": 456}

# Shrinks any "\n"-broken headline until its widest line fits the box, down to the
# panel's own floor. fit.js (loaded after) then does the height. A failure is
# recorded on <html data-wfail> for the renderer to read out of the DOM dump.
FIT_JS = """(async()=>{await document.fonts.ready;const fails=[];
for(const el of document.querySelectorAll('[data-fit]')){
 if(el.dataset.nowrap!=='1')continue;
 const floor=el.dataset.fitFloor?parseFloat(el.dataset.fitFloor):26;
 let size=parseFloat(getComputedStyle(el).fontSize);
 const wide=()=>{const r=document.createRange();r.selectNodeContents(el);return r.getBoundingClientRect().width>el.clientWidth+0.5};
 while(wide()&&size>floor){size-=1;el.style.fontSize=size+'px'}
 if(wide())fails.push(el.dataset.i18n);}
document.documentElement.dataset.wfail=fails.join(',');})();"""


def noto_css(fam):
    f = FACES[fam]
    return ("@font-face{font-family:'%s';src:url('%s.ttf') format('truetype');font-weight:100 900;"
            "font-display:block}\n" % (fam, f))


def build_noto_css():
    d = os.path.join(SHOTS, "noto")
    with open(os.path.join(d, "noto.css"), "w") as fh:
        for fam in FACES:
            fh.write(noto_css(fam))
    with open(os.path.join(d, "fit-i18n.js"), "w") as fh:
        fh.write(FIT_JS)


def make_panel(src, code, text, kind):
    s = open(src, encoding="utf-8").read()
    cfg = FONTS.get(code)
    lines = [html.escape(l.strip(), quote=False) for l in text.split("\n")]
    inner = "<br>".join(lines)
    nowrap = len(lines) > 1
    rtl = bool(cfg and cfg[4])

    def swap(m):
        tag = m.group(1)
        extra = ' lang="%s"' % code
        if rtl:
            extra += ' dir="rtl"'
        if nowrap:
            extra += ' data-nowrap="1"'
        return tag[:-1] + extra + ">" + inner + m.group(3)
    s, n = re.subn(r'(<div class="headline"[^>]*data-i18n="p\d\.headline"[^>]*>)(.*?)(</div>)', swap, s, count=1, flags=re.S)
    assert n == 1, src
    css = ""
    if cfg:
        fam, w, ls, lh, _ = cfg
        css = ".panel .headline{font-family:'%s','Noto Sans',sans-serif;font-weight:%s;" % (fam, w)
        if ls is not None:
            css += "letter-spacing:%s;" % ls
        if lh:
            css += "line-height:%s;" % lh
        css += "}\n"
        extra_link = '<link rel="stylesheet" href="../../noto/noto-faces.css">\n'
    else:
        extra_link = ""
    if nowrap:
        css += ".panel .headline{white-space:nowrap}\n"
    else:
        css += ".panel .headline{text-wrap:balance}\n"
    css += ".panel .headline{overflow-wrap:normal}\n"
    if kind == "mac":
        # the 470px column ends 7px from the window; a longer line must shrink, not touch it
        css += ".mac .wrap{width:%dpx}\n" % MAC_WIDTH.get(code, 430)
    head_add = extra_link + "<style>" + css + "</style>"
    s = s.replace("</head>", head_add + "</head>", 1)
    s = s.replace('<script src="../fit.js"></script>',
                  '<script src="../../noto/fit-i18n.js"></script>\n<script src="../fit.js"></script>', 1)
    return s


def chrome(args, out=None):
    flags = [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-sandbox",
             "--default-background-color=FFFFFFFF", "--force-color-profile=srgb",
             "--virtual-time-budget=8000"] + args
    return subprocess.run(flags, capture_output=True, text=True, timeout=180)


def render_one(job):
    kind, code, n, key, text = job
    profile, w, h, scale, _ = KINDS[kind]
    ws = os.path.join(SHOTS, kind)
    pdir = os.path.join(ws, "panels-" + code)
    os.makedirs(pdir, exist_ok=True)
    page = os.path.join(pdir, "panel-%d.html" % n)
    src = os.path.join(ws, "panels", "panel-%d.html" % n)
    open(page, "w", encoding="utf-8").write(make_panel(src, code, text, kind))
    out = os.path.join(ws, "out", profile, code)
    os.makedirs(out, exist_ok=True)
    png = os.path.join(out, "panel-%d.png" % n)
    common = ["--force-device-scale-factor=%d" % scale, "--window-size=%d,%d" % (w, h)]
    url = "file://" + page
    r = chrome(common + ["--dump-dom", url])
    dom = r.stdout
    m = re.search(r'<script[^>]*\bid="hypershots-boxes"[^>]*>(.*?)</script>', dom, re.S)
    if not m:
        return (kind, code, n, "FAIL", "no boxes dump")
    j = json.loads(m.group(1))
    wf = re.search(r'data-wfail="([^"]*)"', dom)
    problems = []
    if j["panelW"] != w or j["panelH"] != h:
        problems.append("panel %sx%s" % (j["panelW"], j["panelH"]))
    if j["fitFailures"]:
        problems.append("fit (height) at floor: " + ",".join(j["fitFailures"]))
    if wf and wf.group(1):
        problems.append("fit (width) at floor: " + wf.group(1))
    px = [c["px"] for c in j["copy"]]
    if problems:
        return (kind, code, n, "FAIL", "; ".join(problems), px)
    r = chrome(common + ["--screenshot=" + png, url])
    if not os.path.exists(png):
        return (kind, code, n, "FAIL", "no screenshot")
    json.dump(j, open(os.path.join(out, "panel-%d.boxes.json" % n), "w"))
    return (kind, code, n, "OK", "", px)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--kinds", default="iphone,ipad,mac")
    ap.add_argument("--locales", default="")
    ap.add_argument("--jobs", type=int, default=6)
    a = ap.parse_args()
    heads = json.load(open(os.path.join(APPSTORE, "headlines.json"), encoding="utf-8"))
    rebreaks = json.load(open(os.path.join(APPSTORE, "rebreaks.json"), encoding="utf-8"))
    codes = [c for c in a.locales.split(",") if c] or sorted(heads)
    build_noto_css()
    # noto-faces.css lives next to the fonts; its urls are relative to itself
    shutil.copy(os.path.join(SHOTS, "noto", "noto.css"), os.path.join(SHOTS, "noto", "noto-faces.css"))
    jobs = []
    for kind in a.kinds.split(","):
        panels = KINDS[kind][4]
        for code in codes:
            # fresh profile.css per kind
            for n, key in panels.items():
                text = rebreaks.get(code, {}).get(kind, {}).get(key, heads[code][key])
                jobs.append((kind, code, n, key, text))
    for kind in a.kinds.split(","):
        _, w, h, _, _ = KINDS[kind]
        open(os.path.join(SHOTS, kind, "profile.css"), "w").write(
            "/* generated by render_screenshots.py */\n:root{ --panel-w:%dpx; --panel-h:%dpx; }\n" % (w, h))
    results = []
    with ThreadPoolExecutor(a.jobs) as ex:
        for res in ex.map(render_one, jobs):
            results.append(res)
            print(*res[:5], res[5] if len(res) > 5 else "", flush=True)
    bad = [r for r in results if r[3] != "OK"]
    # copy to the store layout
    for kind, code, n, status, *_ in results:
        if status != "OK":
            continue
        profile = KINDS[kind][0]
        dst = os.path.join(APPSTORE, code, kind)
        os.makedirs(dst, exist_ok=True)
        shutil.copy(os.path.join(SHOTS, kind, "out", profile, code, "panel-%d.png" % n),
                    os.path.join(dst, "%02d.png" % n))
    json.dump([list(r) for r in results], open(os.path.join(SHOTS, "render-report.json"), "w"))
    print("done: %d ok, %d failed" % (len(results) - len(bad), len(bad)))
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
