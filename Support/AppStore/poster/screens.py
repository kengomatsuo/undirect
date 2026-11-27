"""The screens Undirect's store frames show, per language, as pages a device frame holds in an iframe.

Every screen is laid out in points at whatever size the iframe gives it (iPhone 440 x 956, iPad 1032 x 1376, the
iPhone Duo's two screens, a Mac window), so one page serves every device:

  popup.html    the shipping popup (Extension/Resources/popup) as it is, with the extension APIs stubbed and the
                language's own _locales messages; ?view=page|rules|settings picks the view, ?dev=ios|mac the platform's
                styles. On iOS Safari shows it as a sheet under the extension's name and a check button, drawn here.
  video.html    a made-up streaming site in Safari (dark), ?state=ad|play|note|back: a pop-up ad over it, the video
                playing, the page note Undirect shows when it stops something (guard.js NOTE_CSS, its own words), or
                the Back-button puck (fx.js back()) with the note for a Back button trap.
  menu.html     Safari's page menu open over the site, its rows in Safari's own words for the language
                (safari-strings.json) and Undirect's row under its name in that language, pressed.
  mac.html      a Safari window on the Mac with the popover open under the toolbar button.
"""
import json, os, re, shutil
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
EXT = ROOT / "Extension" / "Resources"
NAMES = json.loads((ROOT / "Support/i18n/app-name/names.json").read_text())["names"]
SAFARI = json.loads((HERE / "safari-strings.json").read_text())
RTL = {"ar-SA", "he", "ur-PK"}
FOLDER = {"ar-SA": "ar", "bn-BD": "bn", "de-DE": "de", "en-US": "en", "en-AU": "en_AU", "en-CA": "en_CA",
          "en-GB": "en_GB", "es-ES": "es", "es-MX": "es_MX", "fr-FR": "fr", "fr-CA": "fr_CA", "gu-IN": "gu",
          "kn-IN": "kn", "ml-IN": "ml", "mr-IN": "mr", "nl-NL": "nl", "no": "nb", "or-IN": "or", "pa-IN": "pa",
          "pt-BR": "pt_BR", "pt-PT": "pt_PT", "sl-SI": "sl", "ta-IN": "ta", "te-IN": "te", "ur-PK": "ur",
          "zh-Hans": "zh_CN", "zh-Hant": "zh_TW"}
SITE = "marlowtv.example"


def folder(loc):
    return FOLDER.get(loc, loc)


def messages(loc):
    return json.loads((EXT / "_locales" / folder(loc) / "messages.json").read_text())


def msg(loc, key, *args):
    e = messages(loc)[key]
    s = e["message"]
    for i, a in enumerate(args):
        s = re.sub(r"\$[A-Z_]+\$", str(a), s, count=1) if "$" in s else s
    return s


def name(loc):
    return NAMES.get(folder(loc)) or NAMES.get(loc) or "Undirect"


def sym(n):
    return (HERE / "sym" / f"{n}.png").as_uri()


def symbol(n, size, color, extra=""):
    return (f'<span style="display:inline-block;flex:none;width:{size}px;height:{size}px;background:{color};'
            f'-webkit-mask:url({sym(n)}) center/contain no-repeat;{extra}"></span>')


UTURN = ('<svg viewBox="0 0 24 24" width="100%" height="100%" style="display:block;overflow:visible">'
         '<path d="M16.5 20V10a4.5 4.5 0 0 0-9 0v4.6" fill="none" stroke="#fff" stroke-width="3"/>'
         '<path d="M4.3 14.4h6.4L7.5 20z" fill="#fff" stroke="#fff" stroke-width=".8" stroke-linejoin="round"/></svg>')
CHEVRON = ('<svg viewBox="0 0 24 24" width="100%" height="100%" style="display:block"><path d="M14.5 5.5 8 12l6.5 6.5" '
           'fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>')
ICON_SVG = (EXT / "images" / "toolbar-icon.svg").read_text().replace('width="100" height="100"', 'width="100%" height="100%"')

# The page note and the Back puck are drawn with guard.js's and fx.js's own measures and glass.
GLASS = ("background:rgba(28,28,30,.88);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12),inset 0 1px 0 rgba(255,255,255,.16),"
         "0 1px 2px rgba(0,0,0,.2),0 8px 24px -4px rgba(0,0,0,.28),0 20px 48px -12px rgba(0,0,0,.3)")
NOTE_CSS = (".n{display:inline-grid;align-content:center;box-sizing:border-box;min-height:48px;padding:8px;border-radius:24px;color:#fff;"
            "font:600 15px/20px -apple-system,system-ui,sans-serif;letter-spacing:-.01em;" + GLASS + "}"
            ".n .r{display:flex;align-items:center;gap:10px;white-space:nowrap}"
            ".n .b{flex:none;box-sizing:border-box;width:32px;height:32px;padding:5px;border-radius:50%;"
            "background:linear-gradient(#f2463c,#d92b24);box-shadow:inset 0 1px 0 rgba(255,255,255,.28)}"
            ".n .s{display:flex;align-items:center;gap:8px;padding-inline-end:6px}"
            ".n .h{position:relative;box-sizing:border-box;height:24px;padding:0 8px;border-radius:12px;direction:ltr;"
            "font:500 13px/24px ui-monospace,SFMono-Regular,Menlo,monospace;color:rgba(235,235,245,.7)}"
            ".n .h::after{content:'';position:absolute;left:7px;right:7px;top:50%;height:1.5px;border-radius:1px;background:currentColor}")


def note_html(loc, kind="stopped", host="adserver.example"):
    """guard.js's note: the red badge, its title in the language, and the address struck through (none for a Back trap)."""
    key = {"stopped": "note_stopped", "back": "note_back_trap", "kept": "note_kept_here"}[kind]
    chip = "" if kind == "back" else f'<span class="h">{host}</span>'
    d = "rtl" if loc in RTL else "ltr"
    return (f'<div class="n" dir="{d}"><div class="r"><span class="b">{UTURN}</span><span class="s"><span class="t">{esc(msg(loc, key))}</span>'
            f'{chip}</span></div></div>')


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


# ------------------------------------------------------------------ popup

STATE = {
    "settings": {"enabled": True, "policy": "block", "mode": "watched", "banner": True, "effects": True},
    "counts": {"page": 8, "seen": 8, "session": 12, "lifetime": 340},
    "site": SITE, "guarding": True, "watched": {SITE: True}, "recipe": None,
    "rows": [
        {"base": "adserver.example", "kinds": ["window-open"], "count": 3, "blocked": 3, "url": "https://adserver.example/offer",
         "here": None, "everywhere": "block", "urls": ["https://adserver.example/offer"]},
        {"base": "tabunder.example", "kinds": ["synthetic-click"], "count": 3, "blocked": 3, "url": "https://tabunder.example/",
         "here": None, "everywhere": "block", "urls": ["https://tabunder.example/"]},
        {"base": "clicktrack.example", "kinds": ["click-catcher"], "count": 1, "blocked": 1, "url": "https://clicktrack.example/go",
         "here": None, "everywhere": "block", "urls": ["https://clicktrack.example/go"]},
        {"base": SITE, "kinds": ["overlay"], "count": 1, "blocked": 1, "url": "", "here": None, "everywhere": None,
         "local": True, "lastVerdict": "block"},
    ],
    "everywhere": {"adserver.example": "block", "tabunder.example": "block", "clicktrack.example": "block",
                   "popnet.example": "block"},
    "perSite": {SITE: {"player.example": "allow"}, "news.example": {"comments.example": "allow"},
                "shop.example": {"pay.example": "allow"}},
}


def popup_css(dev):
    css = (EXT / "popup" / "popup.css").read_text()
    css = re.sub(r"\(\s*prefers-color-scheme\s*:\s*dark\s*\)", "all", css)
    if dev == "ios":
        css = re.sub(r"\(\s*pointer\s*:\s*coarse\s*\)", "all", css)
    else:
        css = re.sub(r"@supports \(-apple-visual-effect: -apple-system-vibrancy-fill\)", "@media all", css)
    return css


def write_popup(loc, out):
    """popup-ios.html and popup-mac.html for one language, beside a copy of popup.js."""
    out.mkdir(parents=True, exist_ok=True)
    shutil.copy(EXT / "popup" / "popup.js", out / "popup.js")
    m = messages(loc)
    m["extension_name"] = {"message": name(loc)}
    stub = ("<script>\nconst MESSAGES = %s;\nconst STATE = %s;\n" % (json.dumps(m, ensure_ascii=False), json.dumps(STATE))
            + (ROOT / "tests" / "popup-stub.js").read_text() + "</script>\n")
    view = ("<script>addEventListener('load',()=>setTimeout(()=>{const v=new URLSearchParams(location.search).get('view');"
            "if(v&&v!=='page')show(v+'-view');},300));</script>")
    html = (EXT / "popup" / "popup.html").read_text()
    for dev in ("ios", "mac"):
        (out / f"popup-{dev}.css").write_text(popup_css(dev))
        h = html.replace('href="popup.css"', f'href="popup-{dev}.css"')
        h = h.replace('<script src="popup.js"></script>', stub + '<script src="popup.js"></script>' + view)
        h = h.replace("<head>", '<head><style>html,body{background:transparent!important}</style>', 1) if dev == "mac" else h
        (out / f"popup-{dev}.html").write_text(h)


def sheet_html(loc, out):
    """Safari's sheet on iOS: the extension's name, the check button, the popup under them."""
    d = "rtl" if loc in RTL else "ltr"
    return f"""<!doctype html><html dir="{d}"><meta charset="utf-8"><style>
html,body{{margin:0;height:100%;background:#000;color:#fff;font-family:-apple-system,system-ui,sans-serif;overflow:hidden}}
.top{{height:118px;position:relative}}
.t{{position:absolute;left:0;right:0;top:68px;text-align:center;font-weight:600;font-size:17px}}
.ok{{position:absolute;inset-inline-end:16px;top:58px;width:44px;height:44px;border-radius:50%;background:#0a84ff;display:grid;place-items:center}}
iframe{{border:0;width:100%;height:calc(100% - 118px);display:block;background:#000}}
</style><div class="top"><div class="t">{esc(name(loc))}</div><div class="ok">{symbol("checkmark", 20, "#fff")}</div></div>
<iframe id="f"></iframe><script>document.getElementById('f').src='popup-ios.html'+location.search;</script>
<script src="{(HERE / 'ready.js').as_uri()}"></script></html>"""


# ------------------------------------------------------------------ the site in Safari

PAGE_MENU = ('<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round">'
             '<path d="M3 5h14M3 10h9M3 15h6"/><circle cx="15.5" cy="14" r="2.6"/></svg>')


def site_body(W, loc):
    nav = W["site_nav"]
    film = W["film"]
    return f"""
<div class="hdr"><b class="logo">marlowtv</b>{''.join(f'<span>{esc(x)}</span>' for x in nav[:3])}</div>
<div class="hero"><div class="sky"></div><div class="city">{''.join(f'<i style="left:{x}%;width:{w}%;height:{h}%"></i>' for x, w, h in ((2,9,34),(12,6,52),(19,11,28),(31,7,44),(40,12,30),(53,5,58),(60,10,36),(72,8,48),(82,14,26)))}</div>
<div class="moon"></div><div class="play">{symbol("play.fill", 34, "#fff", "margin-inline-start:6px")}</div>
<div class="bar"><span style="width:38%"></span></div>
<div class="ttl"><b>{esc(film["title"])}</b><span>{esc(film["meta"])}</span></div></div>
<div class="chips"><span>HD</span><span>4K</span><span>5.1</span></div>
<div class="rail"><i style="background:linear-gradient(160deg,#5b3df5,#2a1680)"></i><i style="background:linear-gradient(160deg,#10b77f,#06563c)"></i><i style="background:linear-gradient(160deg,#ff7a45,#93290a)"></i></div>
"""


SITE_CSS = """
html,body{margin:0;height:100%;background:#0b0c10;color:#fff;font-family:-apple-system,system-ui,sans-serif;overflow:hidden}
.page{position:absolute;inset:0;padding-top:var(--top)}
.hdr{display:flex;align-items:center;gap:18px;padding:14px 18px;font-size:15px;color:rgba(255,255,255,.75);border-bottom:1px solid rgba(255,255,255,.08)}
.hdr .logo{color:#ff3d6e;font-size:22px;font-weight:800;letter-spacing:-.03em;margin-inline-end:6px;direction:ltr}
.hero{position:relative;margin:14px 12px 0;aspect-ratio:16/10;border-radius:16px;overflow:hidden;background:#0d1a33}
.sky{position:absolute;inset:0;background:linear-gradient(180deg,#14284f 0%,#1d3a6b 55%,#0d1a33 100%)}
.moon{position:absolute;right:16%;top:16%;width:9%;aspect-ratio:1;border-radius:50%;background:#fdf6d8;box-shadow:0 0 40px 12px rgba(253,246,216,.35)}
.city{position:absolute;left:0;right:0;bottom:0;height:62%}
.city i{position:absolute;bottom:0;background:#08101f;border-top:2px solid rgba(255,214,120,.25)}
.play{position:absolute;left:50%;top:46%;width:84px;height:84px;margin:-42px 0 0 -42px;border-radius:50%;background:#ff3d6e;display:grid;place-items:center;box-shadow:0 10px 40px rgba(255,61,110,.5)}
.bar{position:absolute;left:16px;right:16px;bottom:12px;height:5px;border-radius:3px;background:rgba(255,255,255,.25);display:none}
.bar span{display:block;height:100%;border-radius:3px;background:#ff3d6e}
.playing .play{display:none} .playing .bar{display:block}
.ttl{position:absolute;inset-inline-start:18px;bottom:28px;display:flex;flex-direction:column;gap:4px}
.ttl b{font-size:30px;letter-spacing:-.02em;line-height:1.1} .ttl span{font-size:14px;color:rgba(255,255,255,.7)}
.chips{display:flex;gap:8px;padding:14px 12px}.chips span{font-size:13px;padding:5px 10px;border-radius:8px;background:rgba(255,255,255,.1);color:rgba(255,255,255,.8)}
.rail{display:flex;gap:10px;padding:4px 12px}.rail i{flex:1;aspect-ratio:3/4;border-radius:12px}
.url{position:absolute;left:12px;right:12px;height:46px;border-radius:23px;display:flex;align-items:center;justify-content:center;gap:8px;font-size:16px;color:#fff;background:rgba(40,40,44,.86);box-shadow:inset 0 0 0 1px rgba(255,255,255,.1);direction:ltr}
.tb{position:absolute;left:12px;right:12px;bottom:calc(var(--bottom) + 0px);height:56px;border-radius:28px;display:flex;align-items:center;justify-content:space-around;background:rgba(40,40,44,.86);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12),0 10px 30px rgba(0,0,0,.4);direction:ltr}
.ad{position:absolute;left:50%;top:44%;width:76%;transform:translate(-50%,-50%) rotate(-3deg);border-radius:18px;overflow:hidden;background:#ffd400;color:#111;box-shadow:0 30px 80px rgba(0,0,0,.6);text-align:center;font-weight:900}
.ad .x{position:absolute;inset-inline-end:10px;top:10px;width:26px;height:26px;border-radius:50%;background:rgba(0,0,0,.15);display:grid;place-items:center}
.ad .big{font-size:40px;letter-spacing:-.03em;padding:44px 16px 10px;line-height:1}
.ad .go{margin:14px auto 22px;width:70%;padding:12px;border-radius:12px;background:#e5161d;color:#fff;font-size:20px}
.dim{position:absolute;inset:0;background:rgba(0,0,0,.45)}
.pm{position:absolute;inset-inline-start:8px;top:7px;width:32px;height:32px;border-radius:50%;display:grid;place-items:center}
.menuon .pm{background:rgba(255,255,255,.22)}
.notewrap{position:absolute;left:0;right:0;bottom:calc(var(--bottom) + 72px);display:flex;justify-content:center}
.puck{position:absolute;inset-inline-start:20px;top:40%;width:60px;height:60px}
.puck .disc{position:absolute;inset:0;border-radius:50%;display:grid;place-items:center;padding:16px;box-sizing:border-box;""" + GLASS + """}
.puck i{position:absolute;left:16px;top:27px;width:28px;height:6px;border-radius:3px;background:rgb(255,69,58);box-shadow:0 0 0 1.5px rgba(255,255,255,.9)}
.menu{position:absolute;inset-inline-start:14px;top:calc(var(--top) - 4px);width:min(300px,72%);border-radius:28px;padding:8px 0;background:rgba(48,48,52,.94);box-shadow:inset 0 0 0 1px rgba(255,255,255,.1),0 20px 60px rgba(0,0,0,.6);font-size:17px}
.menu .it{display:flex;align-items:center;gap:14px;padding:12px 20px}
.menu .sep{height:1px;margin:6px 20px;background:rgba(255,255,255,.12)}
.menu .on{background:rgba(255,255,255,.14);margin:0 8px;padding:12px 12px;border-radius:16px}
.menu .ic{width:24px;height:24px;flex:none;display:grid;place-items:center}
"""


def video_html(W, loc, top=54, bottom=20):
    d = "rtl" if loc in RTL else "ltr"
    bars = "".join(f'<i style="transform:rotate({i*45}deg) translateY(-41px)"></i>' for i in range(8))
    return f"""<!doctype html><html dir="{d}"><meta charset="utf-8"><style>{SITE_CSS}{NOTE_CSS}
:root{{--top:{top + 56}px;--bottom:{bottom}px}}</style>
<div class="page" id="p">{site_body(W, loc)}</div>
<div class="url" style="top:{top}px"><span class="pm">{PAGE_MENU}</span>{symbol("lock.fill", 13, "#fff")}{SITE}</div>
<div class="tb">{symbol("chevron.left", 22, "#fff")}{symbol("chevron.right", 22, "rgba(255,255,255,.35)")}{symbol("square.and.arrow.up", 24, "#fff")}{symbol("book", 24, "#fff")}{symbol("square.on.square", 24, "#fff")}</div>
<div id="extra"></div>
<template id="ad"><div class="dim"></div><div class="ad"><div class="x">{symbol("xmark", 12, "#111")}</div><div class="big">{esc(W["ads"][0])}</div>
<div style="font-size:16px;font-weight:600;opacity:.7">$1,000 · iPhone · 🎁</div><div class="go">{esc(W["ads"][5])}</div></div></template>
<template id="note"><div class="notewrap">{note_html(loc, "stopped")}</div></template>
<template id="back"><div class="puck"><div class="disc">{CHEVRON}</div>{bars}</div><div class="notewrap">{note_html(loc, "back")}</div></template>
<script>const s=new URLSearchParams(location.search).get('state')||'play';
const add=id=>document.getElementById('extra').append(document.getElementById(id).content.cloneNode(true));
if(s==='ad')add('ad'); else document.getElementById('p').classList.add('playing');
if(s==='note')add('note'); if(s==='back')add('back');</script>
<script src="{(HERE / 'ready.js').as_uri()}"></script></html>"""


def menu_html(W, loc, top=54, bottom=20):
    d = "rtl" if loc in RTL else "ltr"
    S = SAFARI[loc]
    row = lambda icon, text, cls="": f'<div class="it {cls}"><span class="ic">{icon}</span><span>{esc(text)}</span></div>'
    rows = (row(symbol("translate", 22, "#fff"), S["translate"]) + row(symbol("bookmark", 20, "#fff"), S["bookmark_to"])
            + row(symbol("eye.slash", 22, "#fff"), S["hide"]) + '<div class="sep"></div>'
            + row(f'<span style="width:22px;height:22px;display:block">{ICON_SVG}</span>', name(loc), "on")
            + row(symbol("puzzlepiece.extension", 22, "#fff"), S["extensions"]))
    return f"""<!doctype html><html dir="{d}"><meta charset="utf-8"><style>{SITE_CSS}
:root{{--top:{top + 56}px;--bottom:{bottom}px}} .ring{{position:absolute;width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,.18);box-shadow:0 0 0 4px rgba(255,255,255,.9)}}</style>
<div class="page playing">{site_body(W, loc)}</div><script>document.documentElement.classList.add("menuon")</script><div class="dim" style="background:rgba(0,0,0,.35)"></div>
<div class="url" style="top:{top}px"><span class="pm">{PAGE_MENU}</span>{symbol("lock.fill", 13, "#fff")}{SITE}</div>
<div class="tb">{symbol("chevron.left", 22, "#fff")}{symbol("chevron.right", 22, "rgba(255,255,255,.35)")}{symbol("square.and.arrow.up", 24, "#fff")}{symbol("book", 24, "#fff")}{symbol("square.on.square", 24, "#fff")}</div>
<div class="menu">{rows}</div>
<script src="{(HERE / 'ready.js').as_uri()}"></script></html>"""


def mac_html(W, loc):
    """Safari on the Mac, dark: the toolbar with Undirect's button, the site, and (?view=page|rules|settings) the popover
    open under the button; ?state=back shows the Back puck and the note instead."""
    bars = "".join(f'<i style="transform:rotate({i*45}deg) translateY(-41px)"></i>' for i in range(8))
    return f"""<!doctype html><html dir="ltr"><meta charset="utf-8"><style>{SITE_CSS}{NOTE_CSS}
:root{{--bottom:20px}} html,body{{background:#0b0c10}} .page{{padding-top:52px}} .page .hero{{aspect-ratio:21/8;margin:16px 24px 0}} .page .rail{{padding:4px 24px}} .page .rail i{{aspect-ratio:16/9}} .page .chips{{padding:14px 24px}}
.tool{{position:absolute;left:0;right:0;top:0;height:52px;background:#2a2a2d;border-bottom:1px solid #000;display:flex;align-items:center;gap:14px;padding:0 16px}}
.dots{{display:flex;gap:8px}}.dots i{{width:12px;height:12px;border-radius:50%}}
.addr{{flex:1;max-width:460px;margin:0 auto;height:30px;border-radius:9px;background:#3a3a3d;display:flex;align-items:center;justify-content:center;gap:6px;font-size:13px;color:#ddd}}
.ub{{width:30px;height:30px;border-radius:7px;display:grid;place-items:center}} .lit .ub{{background:rgba(255,255,255,.16)}}
.pop{{position:absolute;right:10px;top:58px;width:340px;bottom:16px;border-radius:14px;overflow:hidden;background:rgba(40,40,44,.94);box-shadow:0 0 0 .5px rgba(255,255,255,.22),0 18px 50px rgba(0,0,0,.55)}}
.pop iframe{{border:0;width:340px;height:100%;background:transparent}}
.arrow{{position:absolute;right:32px;top:48px;width:22px;height:11px;background:rgba(40,40,44,.94);clip-path:polygon(0 100%,50% 0,100% 100%)}}
.notewrap{{bottom:28px}}
</style><div class="page playing" dir="{'rtl' if loc in RTL else 'ltr'}">{site_body(W, loc)}</div>
<div class="tool"><div class="dots"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i></div>
{symbol("sidebar.left", 18, "#bbb")}{symbol("chevron.left", 16, "#bbb")}{symbol("chevron.right", 16, "#666")}
<div class="addr">{symbol("lock.fill", 11, "#ccc")}{SITE}</div>
<div class="ub"><span style="width:18px;height:18px;display:block">{ICON_SVG}</span></div>{symbol("square.and.arrow.up", 18, "#bbb")}{symbol("plus", 18, "#bbb")}{symbol("square.on.square", 18, "#bbb")}</div>
<div id="extra"></div>
<template id="pop"><div class="arrow"></div><div class="pop"><iframe id="f"></iframe></div></template>
<template id="back"><div class="puck"><div class="disc">{CHEVRON}</div>{bars}</div><div class="notewrap">{note_html(loc, "back")}</div></template>
<script>const q=new URLSearchParams(location.search),v=q.get('view'),s=q.get('state');
const add=id=>document.getElementById('extra').append(document.getElementById(id).content.cloneNode(true));
if(v){{document.body.classList.add('lit');add('pop');document.getElementById('f').src='popup-mac.html?view='+v;}}
if(s==='back')add('back');</script>
<script src="{(HERE / 'ready.js').as_uri()}"></script></html>"""


def pad_html(W, loc):
    """Safari on iPad (or the Duo's inner screen): the site, and the popup as a popover under the page menu (?view=)."""
    return video_html(W, loc, top=34, bottom=16).replace("<div id=\"extra\"></div>", "<div id=\"extra\"></div>"
        '<div id="pp" style="display:none;position:absolute;inset-inline-start:14px;top:92px;width:390px;bottom:90px;border-radius:26px;overflow:hidden;'
        'background:#1c1c1e;box-shadow:0 0 0 .5px rgba(255,255,255,.2),0 24px 70px rgba(0,0,0,.6)"><iframe id="pf" style="border:0;width:100%;height:100%"></iframe></div>'
        "<script>{const v=new URLSearchParams(location.search).get('view');if(v){const p=document.getElementById('pp');p.style.display='block';"
        "document.getElementById('pf').src='popup-ios.html?view='+v;}}</script>")


def write_all(W, loc, out):
    """Every screen for one language into out/ (one folder per language, shared by every device)."""
    write_popup(loc, out)
    (out / "sheet.html").write_text(sheet_html(loc, out))
    (out / "video.html").write_text(video_html(W, loc))
    (out / "menu.html").write_text(menu_html(W, loc))
    (out / "mac.html").write_text(mac_html(W, loc))
    (out / "pad.html").write_text(pad_html(W, loc))
    # Duo and iPad show the same pages; their status bars are shorter on iPad
    (out / "menu-pad.html").write_text(menu_html(W, loc, top=34, bottom=16))
