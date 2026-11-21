"""Monholt's debut on Instagram (1080x1350) and TikTok (1080x1920): a two-slide post per platform.

Slide 1 asks the debut's question on monholt.com's board (tiles on one grid, one gap, text top-left)
with a pane onto the site's forest. Slide 2 is the shelf: the two live apps in their own colours, each
with a real screen. The forest is one photograph behind both slides, so it runs on across the swipe.
The only set line is the question; the caption (caption.txt) carries the rest.

Run: python3 build.py <empty work dir> [dark|light] [ship]
The four posts render into the work dir with their checks in <work dir>/checks (Instagram's 3:4 grid crop
and square crop, TikTok's overlay, both swipes); "ship" also copies the posts and caption.txt into this
folder and ~/Downloads/monholt-debut/. Dark is the shipped theme: TikTok draws its own labels in white,
and the profile picture is the white tree on black.

What the layout rests on, read 2026-11-21:
- Instagram's profile grid shows 3:4 tiles (272x362 measured on instagram.com/raycastapp and
  /teenageengineering in Chrome), so a 1080x1350 post loses 34 px on each side there.
- TikTok's clear box on 1080x1920 is x 120-960, y 240-1259, and x 120-779 below y 840
  (~/.claude/skills/product-video/references/formats.md, from TikTok's own overlay file).
  Words and marks stay inside it; tiles and the photograph run under the overlays.
- Studio grids reviewed for the shape of a tile: one idea each, type set large and flush top-left,
  a small mark low in the frame (teenage engineering's "now" tile), few words (Raycast).
"""
import pathlib, shutil, subprocess, sys

HERE = pathlib.Path(__file__).resolve().parent
S = pathlib.Path(sys.argv[1]).resolve(); S.mkdir(parents=True, exist_ok=True)
THEME = sys.argv[2] if len(sys.argv) > 2 else "dark"
NAMES = True          # app names beside their icons on slide 2; False leaves the icons alone
R = pathlib.Path.home() / "Repositories"
DL = pathlib.Path.home() / "Downloads" / "monholt-debut"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

ASSETS = {
    "font.woff2": R / "monholt/site/public/fonts/instrument-sans-latin.woff2",
    "forest.jpg": R / "monholt/site/public/img/forest.jpg",   # Tim Mossholder, Unsplash License; the site's own photograph
    "lockup-white.svg": R / "monholt/assets/logos/brand-kit/svg/monholt-lockup-white.svg",
    "lockup-black.svg": R / "monholt/assets/logos/brand-kit/svg/monholt-lockup-black.svg",
    "icon-white.svg": R / "monholt/assets/logos/brand-kit/svg/monholt-icon-white.svg",
    "icon-black.svg": R / "monholt/assets/logos/brand-kit/svg/monholt-icon-black.svg",
    "u-icon.png": R / "undirect/Support/AppStore/listing-icon.png",
    "u-screen.png": R / "undirect/.shots/iphone/assets/popup.png",                                   # 1320x2868
    "c-icon.png": R / "Cutling/fastlane/listing-icon.png",
    "c-screen.png": R / "Cutling/fastlane/screenshots/en-US/iPhone 14 Pro Max-01_KeyboardInMessages.png",  # 1290x2796
}
for name, src in ASSETS.items():
    shutil.copy(src, S / name)

# monholt.com's tokens (site/public/style.css). Each product keeps its own colour in both themes.
T = {
    "light": dict(ground="#E6E6E6", tile="#FFFFFF", ink="#000000", inverse="#000000", on_inverse="white"),
    "dark": dict(ground="#000000", tile="#151515", ink="#FFFFFF", inverse="#FFFFFF", on_inverse="black"),
}[THEME]
INK_MARK = "white" if THEME == "dark" else "black"
APPS = {
    "undirect": dict(name="Undirect", bg="#D92B24", ink="#FFFFFF", icon="u-icon.png", screen="u-screen.png", ratio=2868 / 1320, island=True),
    "cutling": dict(name="Cutling", bg="#DDF3EA", ink="#04281D", icon="c-icon.png", screen="c-screen.png", ratio=2796 / 1290, island=False),
}
W, M, G = 1080, 44, 10
QUESTION = ["What do you", "expect your", "phone to do,", "but it just", "doesn’t?"]

CSS = """
@font-face{font-family:"Instrument Sans";src:url(font.woff2) format("woff2");font-weight:400 700;font-stretch:75%% 100%%}
*{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased}
html,body{width:1080px;height:%(H)dpx;overflow:hidden;background:%(ground)s}
body{position:relative;font-family:"Instrument Sans",sans-serif;font-kerning:normal}
.t{position:absolute;overflow:hidden}
.q{position:absolute;font-weight:500;line-height:.97;letter-spacing:-.032em;white-space:nowrap}
.pane img{position:absolute;max-width:none}
.app{position:absolute;display:flex;align-items:center;gap:20px;font-weight:500;letter-spacing:-.02em}
.phone{position:absolute;background:#000;overflow:hidden}
.phone img{position:absolute;display:block}
.island{position:absolute;background:#000;border-radius:99px}
"""

def tile(x, y, w, h, bg, inner="", cls=""):
    return f'<div class="t {cls}" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;background:{bg}">{inner}</div>'

def pane(slide, x, y, w, h, forest):
    """A window onto the one photograph, which sits at forest=(x, y, width) in the two-slide strip.
    The site's file is 1200 px wide, so it is enlarged once here (Lanczos, a light unsharp) and given film
    grain at the final size; a browser's own scaling leaves it soft and blocky."""
    fx, fy, fw = forest
    big = S / f"forest-{fw}.png"
    if not big.exists():
        magick(S / "forest.jpg", "-colorspace", "Gray", "-filter", "Lanczos", "-resize", f"{fw}x", "-unsharp", "0x1.6+0.8+0.008",
               "-attenuate", "0.42", "+noise", "Gaussian", "-colorspace", "Gray", "-sigmoidal-contrast", "2.2,50%", big)
    img = f'<img src="{big.name}" style="left:{fx - (slide * W + x)}px;top:{fy - y}px;width:{fw}px">'
    return tile(x, y, w, h, "#222", img, "pane")

def phone(app, x, y, body_w, visible_h=None):
    """The real screen in a plain black body. visible_h cuts it where the tile ends."""
    a = APPS[app]; b = round(body_w * .022); sw = body_w - 2 * b; sh = round(sw * a["ratio"])
    body_h = visible_h or sh + 2 * b
    low = "0" if visible_h else f"{round(body_w * .15)}px"
    r_out, r_in = round(body_w * .15), round(body_w * .15) - b
    island = (f'<div class="island" style="left:{b + sw * .393:.1f}px;top:{b + sh * .0145:.1f}px;width:{sw * .214:.1f}px;height:{sh * .0375:.1f}px"></div>'
              if a["island"] else "")
    return (f'<div class="phone" style="left:{x}px;top:{y}px;width:{body_w}px;height:{body_h}px;border-radius:{r_out}px {r_out}px {low} {low}">'
            f'<img src="{a["screen"]}" style="left:{b}px;top:{b}px;width:{sw}px;border-radius:{r_in}px {r_in}px {"0 0" if visible_h else f"{r_in}px {r_in}px"}">{island}</div>')

def app_head(app, x, y, size):
    a = APPS[app]
    name = f'<span>{a["name"]}</span>' if NAMES else ""
    return (f'<div class="app" style="left:{x}px;top:{y}px;color:{a["ink"]};font-size:{round(size * .5)}px">'
            f'<img src="{a["icon"]}" style="width:{size}px;height:{size}px;filter:drop-shadow(0 6px 14px rgba(0,0,0,.22))">{name}</div>')

def question(x, y, size, color):
    return f'<div class="q" style="left:{x}px;top:{y}px;font-size:{size}px;color:{color}">' + "<br>".join(QUESTION) + "</div>"

def lockup(x, y, w, color):
    return f'<img src="lockup-{color}.svg" style="position:absolute;left:{x}px;top:{y}px;width:{w}px">'

def ig():
    H, top_h = 1350, 940
    row_y = M + top_h + G; row_h = H - M - row_y
    brand_w = 330; pane_w = W - 2 * M - G - brand_w
    forest = (376, row_y - 150, 1800)
    col = (W - 2 * M - G) // 2
    s1 = (tile(M, M, W - 2 * M, top_h, T["tile"], question(40, 36, 164, T["ink"]))
          + tile(M, row_y, brand_w, row_h, T["inverse"], lockup(36, row_h - 36 - 55, 238, T["on_inverse"]))
          + pane(0, M + brand_w + G, row_y, pane_w, row_h, forest))
    def product(app, x):
        return tile(x, M, col, top_h, APPS[app]["bg"], app_head(app, (col - 347) // 2, 44, 88) + phone(app, (col - 347) // 2, 168, 347))
    s2 = (product("undirect", M) + product("cutling", M + col + G)
          + pane(1, M, row_y, pane_w, row_h, forest)
          + tile(M + pane_w + G, row_y, brand_w, row_h, T["inverse"],
                 f'<img src="icon-{T["on_inverse"]}.svg" style="position:absolute;left:36px;bottom:36px;height:150px">'))
    return H, [s1, s2]

def tt():
    H, top_h = 1920, 1196          # the top tiles end at y 1240; below runs the photograph, under TikTok's caption
    row_y = M + top_h + G; row_h = H - M - row_y
    forest = (44, row_y - 130, 2600)
    col = (W - 2 * M - G) // 2
    s1 = (tile(M, M, W - 2 * M, top_h, T["tile"],
               question(120 - M, 250 - M - 8, 150, T["ink"]) + lockup(120 - M, top_h - 50 - 60, 260, INK_MARK))
          + pane(0, M, row_y, W - 2 * M, row_h, forest))
    def product(app, x):
        return tile(x, M, col, top_h, APPS[app]["bg"], app_head(app, 40, 250 - M, 100) + phone(app, 40, 250 - M + 100 + 56, 350))
    s2 = (product("undirect", M) + product("cutling", M + col + G)
          + pane(1, M, row_y, W - 2 * M, row_h, forest))
    return H, [s1, s2]

def render(name, H, body):
    css = CSS % dict(H=H, ground=T["ground"])
    f = S / f"{name}.html"
    f.write_text(f'<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body>{body}</body></html>')
    out = S / f"{name}.png"
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", f"--user-data-dir={S / 'chrome-prof'}", "--no-first-run",
                    "--force-device-scale-factor=1", f"--window-size=1080,{H + 300}", "--virtual-time-budget=4000", f"--screenshot={out}", f"file://{f}"],
                   capture_output=True, timeout=90)
    magick(out, "-crop", f"1080x{H}+0+0", "+repage", out)   # headless Chrome paints the last rows of its window wrongly, so the window is taller than the post
    return out

def magick(*a):
    subprocess.run(["magick", *map(str, a)], check=True)

OVERLAY = """<!doctype html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0;padding:0}html,body{width:1080px;height:1920px;overflow:hidden}
body{position:relative;background:url(%(img)s) 0 0/1080px 1920px;font-family:-apple-system,"SF Pro Text",sans-serif;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.45)}
.tabs{position:absolute;top:150px;left:0;right:0;text-align:center;font-size:44px;font-weight:600}.tabs span{margin:0 26px;opacity:.7}.tabs b{opacity:1}
.shade{position:absolute;left:0;right:0;bottom:0;height:820px;background:linear-gradient(transparent,rgba(0,0,0,.5))}
.rail{position:absolute;right:28px;top:860px;width:130px;text-align:center;font-size:32px;font-weight:600}
.rail i{display:block;width:100px;height:100px;margin:0 auto 8px;border-radius:50%%;background:rgba(255,255,255,.92)}.rail div{margin-bottom:44px}
.cap{position:absolute;left:36px;right:210px;bottom:226px;font-size:40px;line-height:1.3}.cap b{display:block;font-size:44px;margin-bottom:14px}
.dots{position:absolute;left:0;right:0;bottom:176px;text-align:center}.dots i{display:inline-block;width:14px;height:14px;margin:0 7px;border-radius:50%%;background:rgba(255,255,255,.5)}.dots i.on{background:#fff}
.nav{position:absolute;left:0;right:0;bottom:0;height:150px;background:#000;display:flex;justify-content:space-around;align-items:center;font-size:30px;text-shadow:none}
.box{position:absolute;border:3px dashed #ff3b6b;pointer-events:none}
</style></head><body>
<div class="shade"></div><div class="tabs"><span>Following</span><b>For You</b></div>
<div class="rail"><div><i style="border:5px solid #fff;background:#000 url(icon-white.svg) center/62%% no-repeat"></i></div><div><i></i>12</div><div><i></i>3</div><div><i></i>1</div><div><i></i>Share</div></div>
<div class="cap"><b>Monholt</b>Hey, I just started Monholt, a small studio making apps that do exactly what they say.<br>I'll share what I ship, what breaks, and ask… <span style="opacity:.8">more</span></div>
<div class="dots"><i class="%(d1)s"></i><i class="%(d2)s"></i></div>
<div class="nav"><span>Home</span><span>Friends</span><span>+</span><span>Inbox</span><span>Profile</span></div>
<div class="box" style="left:120px;top:240px;width:840px;height:600px;border-bottom:0"></div><div class="box" style="left:120px;top:840px;width:659px;height:419px;border-top:0"></div>
</body></html>"""

def checks(posts):
    C = S / "checks"; C.mkdir(exist_ok=True)
    for n in (1, 2):
        ig_png = posts[f"ig-{n}"]
        magick(ig_png, "-gravity", "center", "-crop", "1012x1350+0+0", "+repage", C / f"ig-{n}-grid-3x4.png")
        magick(ig_png, "-gravity", "center", "-crop", "1080x1080+0+0", "+repage", C / f"ig-{n}-square.png")
        f = S / f"tt-{n}-overlay.html"
        f.write_text(OVERLAY % dict(img=posts[f"tt-{n}"].name, d1="on" if n == 1 else "", d2="on" if n == 2 else ""))
        subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", f"--user-data-dir={S / 'chrome-prof'}", "--no-first-run",
                        "--force-device-scale-factor=1", "--window-size=1080,2220", f"--screenshot={C / f'tt-{n}-overlay.png'}", f"file://{f}"],
                       capture_output=True, timeout=90)
        magick(C / f"tt-{n}-overlay.png", "-crop", "1080x1920+0+0", "+repage", C / f"tt-{n}-overlay.png")
    magick(posts["ig-1"], posts["ig-2"], "+append", C / "ig-swipe.png")
    magick(posts["tt-1"], posts["tt-2"], "+append", C / "tt-swipe.png")
    # The grid as a profile shows it: three 3:4 tiles, the debut first.
    magick("(", C / "ig-1-grid-3x4.png", "-resize", "360x480!", ")", "(", "-size", "360x480", "xc:#D92B24", ")", "(", "-size", "360x480", "xc:#0c0c0c", ")",
           "-background", "#0b1014", "-bordercolor", "#0b1014", "-border", "2", "+append", C / "ig-grid-row.png")

if __name__ == "__main__":
    posts = {}
    for plat, (H, slides) in (("ig", ig()), ("tt", tt())):
        for n, body in enumerate(slides, 1):
            posts[f"{plat}-{n}"] = render(f"monholt-debut-{plat}-{n}", H, body)
    checks(posts)
    if len(sys.argv) > 3 and sys.argv[3] == "ship":
        DL.mkdir(parents=True, exist_ok=True)
        for p in posts.values():
            shutil.copy(p, HERE / p.name); shutil.copy(p, DL / p.name)
        shutil.copy(HERE / "caption.txt", DL / "caption.txt")
    for k, p in posts.items():
        print(k, p, p.exists())
