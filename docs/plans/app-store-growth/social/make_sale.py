"""Black Friday 2026 sale cards for Instagram (1080x1350) and TikTok (1080x1920), one per app,
on each app's listing wallpaper (Support/AppStore/listing-design, direction B).
Run: python3 make_sale.py <empty work dir>; the PNGs land in that dir."""
import pathlib, shutil, subprocess, sys
S = pathlib.Path(sys.argv[1]); S.mkdir(parents=True, exist_ok=True)
H = pathlib.Path.home() / "Repositories"
for src, dst in ((H/"Cutling/fastlane/screenshots_mac/raw/en-US/01_Picker.png", "c-picker.png"),
                 (H/"Cutling/fastlane/listing-icon.png", "c-icon.png"),
                 (H/"undirect/.shots/mac/assets/popup.png", "u-popup.png"),
                 (H/"undirect/Support/AppStore/listing-icon.png", "u-icon.png")):
    shutil.copy(src, S / dst)
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
APPS = {
 "undirect": dict(name="Undirect", now="$0.99", was="$1.99", off="50% off", icon="u-icon.png",
   c=("#7A0D17","#D9302B","#1A0306","#FFE1D8","#FF7A5E"), line="Stops Safari redirects and pop-up tabs"),
 "cutling": dict(name="Cutling", now="$2.99", was="$4.99", off="40% off", icon="c-icon.png",
   c=("#0F6B57","#1FAE8F","#062A23","#E8FFF7","#7EEBCB"), line="A keyboard for the text you type again and again"),
}
def wall(c):
    a,b,d,l,m = c
    return f'''<svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%">
<defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{a}"/><stop offset=".55" stop-color="{b}"/><stop offset="1" stop-color="{d}"/></linearGradient>
<linearGradient id="g2" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{l}" stop-opacity=".95"/><stop offset=".35" stop-color="{m}"/><stop offset="1" stop-color="{a}" stop-opacity="0"/></linearGradient>
<linearGradient id="g3" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="{d}"/><stop offset=".6" stop-color="{b}"/><stop offset="1" stop-color="{m}"/></linearGradient>
<filter id="b1"><feGaussianBlur stdDeviation="18"/></filter><filter id="b2"><feGaussianBlur stdDeviation="3"/></filter><filter id="b3"><feGaussianBlur stdDeviation="60"/></filter></defs>
<rect width="1440" height="900" fill="{d}"/>
<ellipse cx="1100" cy="180" rx="700" ry="420" fill="{b}" opacity=".55" filter="url(#b3)"/>
<path d="M-200 760 C 200 420, 620 980, 1000 560 S 1500 260, 1700 420 L 1700 1100 L -200 1100 Z" fill="url(#g1)" filter="url(#b2)"/>
<path d="M-200 520 C 260 260, 640 760, 1060 380 S 1520 40, 1700 120 L 1700 300 C 1460 260, 1200 520, 980 640 S 300 560, -200 820 Z" fill="url(#g2)" opacity=".9" filter="url(#b2)"/>
<path d="M-200 980 C 300 700, 760 1020, 1180 760 S 1560 600, 1700 700 L 1700 1100 L -200 1100 Z" fill="url(#g3)" opacity=".95" filter="url(#b2)"/>
<path d="M-100 560 C 320 330, 650 770, 1060 410 S 1480 90, 1640 150" fill="none" stroke="{l}" stroke-width="10" opacity=".55" filter="url(#b1)"/>
</svg>'''
def ui(key, top, k):
    if key == "undirect":
        return f'''<svg width="0" height="0" style="position:absolute"><clipPath id="cut"><rect x="300" y="15" width="320" height="51" rx="25.5"/><rect x="71" y="84" width="512" height="801" rx="34"/></clipPath></svg>
<div style="position:absolute;left:50%;top:{top}px;width:640px;height:902px;margin-left:-{int(640*k/2)+20}px;transform:scale({k});transform-origin:top left;filter:drop-shadow(0 40px 60px rgba(30,0,4,.6))"><img src="u-popup.png" style="position:absolute;inset:0;width:640px;clip-path:url(#cut)"></div>'''
    w = int(560*k)
    return f'<img src="c-picker.png" style="position:absolute;left:50%;top:{top}px;width:{w}px;margin-left:-{w//2}px;border-radius:{int(18*k)}px;box-shadow:0 50px 100px -30px rgba(0,20,15,.75),0 0 0 1px rgba(255,255,255,.18)">'
def page(key, h, pad_top, ui_top, k):
    a = APPS[key]
    return f'''<!doctype html><html><head><meta charset="utf-8"><style>
*{{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased}}
html,body{{width:540px;height:{h}px;overflow:hidden;background:#000}}
.f{{position:relative;width:540px;height:{h}px;overflow:hidden;font-family:-apple-system,"SF Pro Display",system-ui,sans-serif;color:#fff}}
.copy{{position:absolute;left:40px;right:40px;top:{pad_top}px;z-index:3;text-shadow:0 2px 24px rgba(0,0,0,.3)}}
.app{{display:flex;align-items:center;gap:14px;font-weight:700;font-size:28px;letter-spacing:-.02em}}
.app img{{width:60px;height:60px;filter:drop-shadow(0 10px 18px rgba(0,0,0,.3))}}
.chip{{display:inline-block;margin-top:26px;padding:7px 13px;border-radius:9px;background:#fff;color:#111;font-weight:800;font-size:15px;letter-spacing:.12em;text-shadow:none}}
.price{{display:flex;align-items:baseline;gap:16px;margin-top:10px}}
.now{{font-weight:850;font-size:104px;line-height:1;letter-spacing:-.045em}}
.was{{font-weight:600;font-size:34px;opacity:.7;text-decoration:line-through;text-decoration-thickness:3px}}
.off{{font-weight:700;font-size:30px;letter-spacing:-.01em;margin-top:4px}}
.s{{font-weight:500;font-size:19px;line-height:1.35;opacity:.9;margin-top:14px}}
.grain{{position:absolute;inset:0;pointer-events:none;opacity:.10;mix-blend-mode:overlay;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}}
</style></head><body><div class="f">{wall(a["c"])}
<div class="copy"><div class="app"><img src="{a["icon"]}">{a["name"]}</div>
<div class="chip">BLACK FRIDAY</div>
<div class="price"><span class="now">{a["now"]}</span><span class="was">{a["was"]}</span></div>
<div class="off">{a["off"]}, Nov 27 to 30</div>
<div class="s">{a["line"]}.<br>One purchase for iPhone, iPad and Mac.</div></div>
{ui(key, ui_top, k)}<div class="grain"></div></div></body></html>'''
for key in APPS:
    for plat, h, pad, ut, k in (("ig", 675, 44, 392, .58), ("tt", 960, 120, 520, .62)):
        f = S / f"sale-{key}-{plat}.html"
        f.write_text(page(key, h, pad, ut, k))
        out = S / f"sale-{key}-{plat}.png"
        subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--user-data-dir=" + str(S / "chrome-prof"), "--no-first-run", "--force-device-scale-factor=2",
                        f"--window-size=540,{h}", f"--screenshot={out}", f"file://{f}"], capture_output=True, timeout=60)
        print(out, out.exists())
