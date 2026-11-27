#!/usr/bin/env python3
"""Undirect's store frames as one picture across every frame, in the system of Cutling's main store page.

    python3 build.py [locale ...|--all] [--only iphone,ipad,duo-outer,duo-inner,mac] [--no-render]
    python3 build.py sheet [--only ...]        one contact sheet per device, every built language a row
    python3 build.py publish [locale ...|--all] frames into Support/AppStore/<locale>/ (English: the default sets)

Each set is one HTML page as wide as all its frames, rendered once per frame with the page shifted, so whatever lies
across a seam lines up to the pixel (out/<locale>/<device>/pano.html beside NN.png). The ground is the icon's black,
the headline a giant condensed white line per frame, and a piece of the app at poster size lies across every seam:
the pop-ups the page throws, Undirect's row in Safari's page menu, the note it shows on the page, a blocked row, the
Back puck, the Back trap note, the rule menu, the icon. No device crosses a seam. Right-to-left languages run the page
from the right: frame 1 is the right-hand slice and every element is placed from the right.

Screens are the shipping popup in the language's own messages and pages drawn from Safari's own strings
(screens.py); words are words/<locale>.json, written per language from words/meanings.md.
"""
import json, os, shutil, subprocess, sys
from pathlib import Path

import screens as S
from screens import esc, symbol

HERE = Path(__file__).resolve().parent
APPSTORE = HERE.parent
OUT = HERE / "out"
STORE = [l["code"] for l in json.loads((APPSTORE / "locales.json").read_text())["locales"]]
ENGLISH = ("en-US", "en-GB", "en-AU", "en-CA")
RED = "#D92B24"
HOT = "#FF453A"

# device -> frame px, frames, screen points of the device it shows, kind
DEV = {
    "iphone": dict(w=1320, h=2868, n=8, kind="phone", pts=(440, 956), shot=(1320, 2868)),
    "ipad": dict(w=2064, h=2752, n=8, kind="pad", pts=(774, 1032), shot=(2064, 2752)),
    "duo-outer": dict(w=1398, h=2034, n=8, kind="phone", pts=(466, 678), shot=(1398, 2034)),
    "duo-inner": dict(w=2007, h=2853, n=8, kind="pad", pts=(540, 768), shot=(2007, 2853)),
    "mac": dict(w=2880, h=1800, n=5, kind="mac", pts=(960, 600), shot=(2880, 1800)),
}
# Which words each Mac frame carries (five frames tell the eight's story)
MAC_KEYS = ["1", "2", "5", "6", "7"]

HEAD_FONT = {
    "ja": '"Hiragino Sans"', "zh-Hans": '"PingFang SC"', "zh-Hant": '"PingFang TC"', "ko": '"Apple SD Gothic Neo"',
    "th": '"Thonburi"', "hi": '"Kohinoor Devanagari"', "mr-IN": '"Kohinoor Devanagari"', "bn-BD": '"Kohinoor Bangla"',
    "gu-IN": '"Kohinoor Gujarati"', "te-IN": '"Kohinoor Telugu"', "ta-IN": '"Tamil Sangam MN"', "kn-IN": '"Kannada Sangam MN"',
    "ml-IN": '"Malayalam Sangam MN"', "pa-IN": '"Gurmukhi Sangam MN"', "or-IN": '"Oriya Sangam MN"', "ur-PK": '"Noto Nastaliq Urdu"',
    "ar-SA": '"SF Arabic"', "he": '"SF Hebrew"'}
# Line heights where a script's marks reach past SF's condensed line box (Cutling's measured values)
HEAD_LH = {**{l: 1.22 for l in ("hi", "mr-IN", "bn-BD", "gu-IN", "pa-IN", "or-IN", "kn-IN", "te-IN", "ml-IN", "ta-IN")},
           "th": 1.3, "ar-SA": 1.12, "he": .98, "ur-PK": 1.7, "ja": 1.08, "zh-Hans": 1.08, "zh-Hant": 1.08, "ko": 1.08, "vi": 1.0}
WORD_BREAK = {"ja": "auto-phrase", "ko": "keep-all", "zh-Hans": "keep-all", "zh-Hant": "keep-all"}

CSS = """
html,body{margin:0;overflow:hidden;-webkit-font-smoothing:antialiased}
.stage{position:absolute;left:0;top:0;overflow:hidden;background:#0E0E10;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.glow{position:absolute;border-radius:50%;filter:blur(120px);background:rgba(217,43,36,.22);pointer-events:none}
.col{position:absolute;z-index:40}
.h1{font-weight:900;font-variation-settings:"wdth" 50;font-stretch:50%;letter-spacing:-.008em;line-height:.86;white-space:nowrap;color:#fff}
.h1 .ln{display:inline-block}
.sub{text-wrap:balance;font-weight:700;letter-spacing:-.017em;line-height:1.1;color:rgba(255,255,255,.86)}
.fine{font-weight:600;letter-spacing:-.01em;line-height:1.15;color:rgba(255,255,255,.6)}
.dev{position:absolute;box-sizing:border-box;background:#050505;box-shadow:0 0 0 calc(var(--u)*5px) #2c2c2e,0 0 0 calc(var(--u)*9px) #77777c,0 calc(var(--u)*70px) calc(var(--u)*140px) rgba(0,0,0,.7),0 0 calc(var(--u)*260px) rgba(217,43,36,.18)}
.scr{position:relative;overflow:hidden;background:#000}
.scr iframe{position:absolute;left:0;top:0;border:0;transform-origin:0 0;background:#000}
.sb{position:absolute;left:0;right:0;top:0;z-index:5;display:flex;align-items:center;justify-content:space-between;box-sizing:border-box;color:#fff;font-family:system-ui;font-weight:600}
.island{position:absolute;background:#000;border-radius:999px;z-index:6}
.ad{position:absolute;box-sizing:border-box;border-radius:calc(var(--s)*.07);overflow:hidden;box-shadow:0 calc(var(--s)*.05) calc(var(--s)*.12) rgba(0,0,0,.55);font-family:system-ui;text-align:center;direction:ltr}
.ad .tb{height:calc(var(--s)*.11);background:rgba(0,0,0,.14);display:flex;align-items:center;gap:calc(var(--s)*.02);padding:0 calc(var(--s)*.04)}
.ad .tb i{width:calc(var(--s)*.035);height:calc(var(--s)*.035);border-radius:50%;background:rgba(0,0,0,.28)}
.ad .big{overflow:hidden;font-weight:900;font-size:calc(var(--s)*.15);line-height:1;letter-spacing:-.03em;padding:calc(var(--s)*.07) calc(var(--s)*.05) calc(var(--s)*.03);white-space:nowrap}
.ad .go{margin:calc(var(--s)*.03) auto calc(var(--s)*.07);width:64%;padding:calc(var(--s)*.035);border-radius:calc(var(--s)*.04);background:#111;color:#fff;font-weight:800;font-size:calc(var(--s)*.06);white-space:nowrap;overflow:hidden}
.piece{position:absolute;transform-origin:0 0}
.row{position:absolute;box-sizing:border-box;display:flex;align-items:center;background:rgba(44,44,48,.96);color:#fff;box-shadow:inset 0 0 0 2px rgba(255,255,255,.1),0 40px 90px rgba(0,0,0,.6)}
.ring{position:absolute;border-radius:50%;background:rgba(255,255,255,.16);box-shadow:0 0 0 calc(var(--d)*.05) rgba(255,255,255,.95),0 0 0 calc(var(--d)*.24) rgba(255,255,255,.08)}
.card{position:absolute;box-sizing:border-box;background:#1C1C1E;color:#fff;box-shadow:inset 0 0 0 2px rgba(255,255,255,.08),0 40px 90px rgba(0,0,0,.6)}
.tile{position:absolute;border-radius:22.5%;overflow:hidden;box-shadow:0 0 0 2px rgba(255,255,255,.12),0 50px 120px rgba(0,0,0,.7),0 0 200px rgba(217,43,36,.35)}
""" + S.NOTE_CSS

FIT = """<script>addEventListener('load',async()=>{await document.fonts.ready;
for(const c of document.querySelectorAll('.col')){const max=+c.dataset.w,maxh=+c.dataset.h;
for(const el of c.querySelectorAll('.h1,.sub,.fine')){let fs=parseFloat(el.style.fontSize);const min=fs*.2;
const wide=()=>[...el.querySelectorAll('.ln')].reduce((a,l)=>Math.max(a,l.getBoundingClientRect().width),0)||el.scrollWidth;
while(wide()>max+1&&fs>min){fs*=.97;el.style.fontSize=fs+'px';}}
const h=c.querySelector('.h1');let fs=parseFloat(h.style.fontSize);while(c.scrollHeight>maxh&&fs>40){fs*=.97;h.style.fontSize=fs+'px';}}
for(const el of document.querySelectorAll('.ad .big,.ad .go,.row .nm')){let fs=parseFloat(getComputedStyle(el).fontSize);while(el.scrollWidth>el.clientWidth+1&&fs>8){fs*=.95;el.style.fontSize=fs+'px';}}});</script>"""
SHIFT = """<script>addEventListener('DOMContentLoaded',()=>{const x=+new URLSearchParams(location.search).get('x')||0;
document.querySelector('.stage').style.transform=`translateX(${-x}px)`;});</script>"""


def words(loc):
    p = HERE / "words" / f"{loc}.json"
    return json.loads(p.read_text())


def lines(s, sub=False):
    return "<br>".join(f'<span class="ln">{esc(x)}</span>' for x in s.split("|"))


class Pano:
    """One page n frames wide; x is measured in reading order, from the right for a right-to-left language."""
    def __init__(self, loc, dev):
        d = DEV[dev]
        self.loc, self.dev, self.d = loc, dev, d
        self.w, self.h, self.n = d["w"], d["h"], d["n"]
        self.W = self.w * self.n
        self.rtl = loc in S.RTL
        self.u = (self.w / 1320 + self.h / 2868) / 2 if d["kind"] != "mac" else self.h / 1800 * 1.1
        self.parts = []

    def pos(self, x, y, rot=0, w=None, z=None, origin=None):
        side = "right" if self.rtl else "left"
        r = -rot if self.rtl else rot
        s = f"position:absolute;{side}:{x:.1f}px;top:{y:.1f}px;"
        if w is not None:
            s += f"width:{w:.1f}px;"
        if r:
            s += f"transform:rotate({r}deg);"
        if origin:
            s += f"transform-origin:{origin};"
        if z is not None:
            s += f"z-index:{z};"
        return s

    def add(self, s):
        self.parts.append(s)

    def frame_x(self, i):
        return (self.n - 1 - i) * self.w if self.rtl else i * self.w


# ------------------------------------------------------------------ parts

def head(P, i, t, name, *, size, top, width=None, left=None, sub=None, maxh=None, fine=None, align="start"):
    w = width or P.w * .86
    x = i * P.w + (left if left is not None else (P.w - w) / 2)
    sub = sub or size * .23
    lh = HEAD_LH.get(P.loc, .86)
    s = t["s"].replace("{name}", name)
    col = (f'<div class="h1" style="font-size:{size}px;line-height:{lh}">{lines(t["h"])}</div>'
           f'<div class="sub" style="font-size:{sub}px;margin-top:{size*.14}px">{lines(s)}</div>')
    if fine:
        col += f'<div class="fine" style="font-size:{sub*.7}px;margin-top:{sub*.35}px">{lines(fine)}</div>'
    return (f'<div class="col" data-w="{w}" data-h="{maxh or P.h*.36}" style="{P.pos(x, top, w=w)};text-align:{align}">{col}</div>')


def sbar(ws, pad=False):
    if pad:
        h, fs = ws * .034, ws * .0125
        return f'<div class="sb" style="height:{h}px;padding:0 {ws*.03}px;font-size:{fs}px"><span>9:41</span>{icons(fs*4.2)}</div>'
    h, fs = ws * .118, ws * .041
    return (f'<div class="sb" style="height:{h}px;padding:{h*.1}px {ws*.075}px 0 {ws*.115}px;font-size:{fs}px">'
            f'<span style="width:{ws*.16}px">9:41</span>{icons(fs*3)}</div>')


def icons(width):
    h = width * .26
    return (f'<svg width="{width}" height="{h}" viewBox="0 0 78 20" fill="#fff"><rect x="0" y="13" width="4" height="7" rx="1.2"/>'
            '<rect x="6" y="9" width="4" height="11" rx="1.2"/><rect x="12" y="5" width="4" height="15" rx="1.2"/><rect x="18" y="1" width="4" height="19" rx="1.2"/>'
            '<path d="M37 4.2c3.6 0 6.9 1.4 9.3 3.7l1.6-1.7C45 3.4 41.2 1.8 37 1.8S29 3.4 26.1 6.2l1.6 1.7C30.1 5.6 33.4 4.2 37 4.2zm0 5c2.2 0 4.2.8 5.7 2.2l1.6-1.7C42.4 8 39.8 6.8 37 6.8s-5.4 1.2-7.3 2.9l1.6 1.7c1.5-1.4 3.5-2.2 5.7-2.2zm0 5c.9 0 1.7.3 2.3.9L37 17.5l-2.3-2.4c.6-.6 1.4-.9 2.3-.9z"/>'
            '<rect x="53.5" y="3.5" width="21" height="13" rx="4" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="1.6"/><rect x="56" y="6" width="16" height="8" rx="2.2"/></svg>')


def device(P, src, x, y, w, kind=None, z=5, pts=None):
    """A device around a screen page (src, relative to the language's screens folder), placed at page x, y."""
    kind = kind or P.d["kind"]
    pw, ph = pts or P.d["pts"]
    if kind == "phone":
        b = w * .025; ws = w - 2 * b; hs = ws * ph / pw; R = w * (.155 if ph / pw > 2 else .11)
        bar = sbar(ws)
        isl = (f'<div class="island" style="width:{ws*.265}px;height:{ws*.078}px;left:{(ws-ws*.265)/2}px;top:{ws*.027}px"></div>'
               if ph / pw > 2 else "")
    else:
        b = w * .024; ws = w - 2 * b; hs = ws * ph / pw; R = w * .052
        bar = sbar(ws, pad=True); isl = ""
    k = ws / pw
    return (f'<div class="dev" style="--u:{P.u};{P.pos(x, y, z=z)};width:{w}px;height:{hs+2*b}px;border-radius:{R}px;padding:{b}px">'
            f'<div class="scr" style="width:{ws}px;height:{hs}px;border-radius:{R-b}px">'
            f'<iframe src="{src}" style="width:{pw}px;height:{ph}px;transform:scale({k})"></iframe>{bar}{isl}</div></div>'), hs + 2 * b


def mac_window(P, src, x, y, w, z=5):
    pw, ph = P.d["pts"]
    k = w / pw
    return (f'<div style="{P.pos(x, y, z=z)};width:{w}px;height:{ph*k}px;border-radius:{14*k}px;overflow:hidden;'
            f'box-shadow:0 0 0 {2*k}px rgba(255,255,255,.14),0 {40*k}px {120*k}px rgba(0,0,0,.75),0 0 {200*k}px rgba(217,43,36,.16)">'
            f'<iframe src="{src}" style="position:absolute;left:0;top:0;border:0;width:{pw}px;height:{ph}px;transform:scale({k});transform-origin:0 0"></iframe></div>')


ADS = [("#FFD400", "#111"), ("#FF3D9A", "#fff"), ("#22E07A", "#08140c"), ("#29C5FF", "#06121a"), ("#FF7A1A", "#fff"), ("#F2F2F2", "#E5161D")]


def ad(P, x, y, s, rot, text, go, ci, z):
    bg, fg = ADS[ci % len(ADS)]
    return (f'<div class="ad" style="--s:{s}px;{P.pos(x, y, rot, w=s, z=z)};background:{bg};color:{fg}">'
            f'<div class="tb"><i></i><i></i><i></i><span style="margin-inline-start:auto">{symbol("xmark", s*.045, fg)}</span></div>'
            f'<div class="big">{esc(text)}</div><div class="go">{esc(go)}</div></div>')


def menu_row(P, x, y, w, name, rot=0, z=20):
    """Undirect's row in Safari's page menu at poster size: the icon and the name, a press ring on it."""
    h = w * .21
    return (f'<div class="row" style="{P.pos(x, y, rot, w=w, z=z)};height:{h}px;border-radius:{h*.3}px;padding:0 {h*.32}px;gap:{h*.26}px">'
            f'<span style="width:{h*.42}px;height:{h*.42}px;display:block;flex:none">{S.ICON_SVG}</span>'
            f'<span class="nm" style="font-size:{h*.33}px;font-weight:600;letter-spacing:-.02em;white-space:nowrap;overflow:hidden;max-width:{w - h*1.9}px">{esc(name)}</span></div>'
            f'<div class="ring" style="--d:{h*.78}px;width:{h*.78}px;height:{h*.78}px;{P.pos(x + w - h*.98, y + h*.11 + ((w - h*.98)*(rot/57.3) if rot else 0), z=z+1)}"></div>')


def note_piece(P, x, y, scale, kind, rot=0, z=20):
    return (f'<div class="piece" style="{P.pos(x, y, z=z)};transform:{"rotate(%sdeg) " % (-rot if P.rtl else rot) if rot else ""}scale({scale});'
            f'transform-origin:{"100% 0" if P.rtl else "0 0"}">{S.note_html(P.loc, kind)}</div>')


def blocked_card(P, x, y, w, rot=0, z=20):
    """A row of the popup's page list at poster size: the address, how it reached, and its state."""
    k = w / 400
    loc = P.loc
    return (f'<div class="card" style="{P.pos(x, y, rot, w=w, z=z)};border-radius:{26*k}px;padding:{20*k}px {22*k}px;'
            f'display:flex;align-items:center;gap:{14*k}px" dir="{"rtl" if P.rtl else "ltr"}">'
            f'<div style="flex:1;min-width:0"><div style="font-size:{22*k}px;font-weight:600;direction:ltr;text-align:start">tabunder.example</div>'
            f'<div style="font-size:{15*k}px;color:rgba(235,235,245,.6);margin-top:{4*k}px;white-space:nowrap">{esc(S.msg(loc, "method_synthetic_click"))}</div></div>'
            f'<div style="flex:none;display:flex;align-items:center;gap:{6*k}px;padding:{8*k}px {14*k}px;border-radius:{999}px;background:rgba(255,69,58,.18);'
            f'color:{HOT};font-size:{18*k}px;font-weight:600;white-space:nowrap">{esc(S.msg(loc, "state_blocked"))}</div></div>')


def puck(P, x, y, d, z=20):
    bars = "".join(f'<i style="position:absolute;left:{d*.267}px;top:{d*.45}px;width:{d*.467}px;height:{d*.1}px;border-radius:{d*.05}px;'
                   f'background:{HOT};box-shadow:0 0 0 {d*.025}px rgba(255,255,255,.9);transform:rotate({i*45}deg) translateY(-{d*.68}px)"></i>'
                   for i in range(8))
    return (f'<div style="{P.pos(x, y, z=z)};width:{d}px;height:{d}px">'
            f'<div style="position:absolute;inset:0;border-radius:50%;padding:{d*.27}px;box-sizing:border-box;{S.GLASS}">{S.CHEVRON}</div>{bars}</div>')


def rule_menu(P, x, y, w, rot=0, z=20):
    """The choices on a destination's row, at poster size, Block everywhere ticked."""
    k = w / 360
    items = [("action_allow_here", False), ("action_allow_everywhere", False), ("action_block_here", False),
             ("action_block_everywhere", True)]
    rows = "".join(
        f'<div style="display:flex;align-items:center;gap:{12*k}px;padding:{13*k}px {20*k}px;font-size:{19*k}px;'
        f'{"border-top:%spx solid rgba(255,255,255,.1);" % (1*k) if j else ""}">'
        f'<span style="width:{18*k}px;flex:none">{symbol("checkmark", 16*k, "#fff") if on else ""}</span>'
        f'<span style="white-space:nowrap;{"color:%s;font-weight:600" % HOT if on else ""}">{esc(S.msg(P.loc, key))}</span></div>'
        for j, (key, on) in enumerate(items))
    return (f'<div class="card" style="{P.pos(x, y, rot, w=w, z=z)};border-radius:{24*k}px;padding:{6*k}px 0;background:rgba(48,48,52,.97)" '
            f'dir="{"rtl" if P.rtl else "ltr"}">{rows}</div>')


def tile(P, x, y, s, rot=0, z=20):
    return f'<div class="tile" style="{P.pos(x, y, rot, z=z)};width:{s}px;height:{s}px"><img src="{(HERE / "icon.png").as_uri()}" style="width:100%;display:block"></div>'


# ------------------------------------------------------------------ the sets

def portrait(P, W, name, scr):
    """Eight frames for iPhone, iPad and both iPhone Duo screens: positions are fractions of the frame, sizes by u."""
    w, h, u = P.w, P.h, P.u
    pad = P.d["kind"] == "pad"
    phone_top = P.dev in ("iphone", "duo-outer")
    top = h * (.105 if phone_top else .06)
    size = min(w * .40, h * (.105 if not pad else .12))
    T = {k: W[k] for k in map(str, range(1, 9))}
    for i in range(8):
        P.add(head(P, i, T[str(i + 1)], name, size=size, top=top, maxh=h * .33, sub=size * (.28 if pad else .23),
                   fine=T["8"].get("f") if i == 7 else None))
    # where each frame's device sits: below the headline, running off the frame's foot
    dy = h * (.42 if not pad else .37)
    dw = w * (.74 if not pad else .80)
    dx = lambda i: i * w + (w - dw) / 2
    pg = "video.html" if not pad else "pad.html"
    mn = "menu.html" if not pad else "menu-pad.html"
    pop = (lambda v: f"{scr}/sheet.html?view={v}") if not pad else (lambda v: f"{scr}/pad.html?view={v}")

    # 1: the pop-ups a tap brings, piled up and spilling toward frame 2
    ads = W["ads"]
    spots = [(.06, .46, -8), (.50, .50, 7), (.10, .62, 5), (.56, .66, -6), (.02, .78, -4), (.46, .82, 9), (.30, .56, -2), (.24, .72, 3)]
    s = w * .46
    for j, (fx, fy, rot) in enumerate(spots):
        P.add(ad(P, fx * w, fy * h, s, rot, ads[j % len(ads)], ads[(j + 5) % len(ads)], j, 10 + j))
    # 1 | 2: Undirect's row in Safari's page menu, pressed, lying across the seam over the pile
    P.add(menu_row(P, w * .56, h * .405, w * .98, name, rot=-4, z=30))
    # 2: the page menu open in Safari
    d2, _ = device(P, f"{scr}/{mn}", dx(1), dy + h * .06, dw)
    P.add(d2)
    # 2 | 3: the note Undirect shows on the page
    P.add(note_piece(P, w * 1.52, h * .90, 3.4 * u * (1.25 if pad else 1), "stopped", rot=-3))
    # 3: the video plays
    d3, _ = device(P, f"{scr}/{pg}?state=note", dx(2), dy, dw)
    P.add(d3)
    # 3 | 4: a blocked row
    P.add(blocked_card(P, w * 2.55, h * .885, w * .92, rot=3))
    # 4: the page list
    d4, _ = device(P, pop("page"), dx(3), dy, dw)
    P.add(d4)
    # 4 | 5: the Back puck
    P.add(puck(P, w * 3.80, h * .84, 300 * u))
    # 5: the Back trap stopped
    d5, _ = device(P, f"{scr}/{pg}?state=back", dx(4), dy, dw)
    P.add(d5)
    # 5 | 6: its note
    P.add(note_piece(P, w * 4.50, h * .905, 3.2 * u * (1.25 if pad else 1), "back", rot=2))
    # 6: the rules
    d6, _ = device(P, pop("rules"), dx(5), dy, dw)
    P.add(d6)
    # 6 | 7: a row's choices
    P.add(rule_menu(P, w * 5.62, h * .78, w * .72, rot=-3))
    # 7: settings
    d7, _ = device(P, pop("settings"), dx(6), dy, dw)
    P.add(d7)
    # 7 | 8: the icon
    P.add(tile(P, w * 6.80, h * .80, 380 * u, rot=8))
    # 8: iPad and iPhone together
    if P.dev == "iphone":
        pw_ = w * .92
        d8a, _ = device(P, f"{scr}/pad.html?view=page", 7 * w + w * .05, dy + h * .02, pw_, kind="pad", pts=DEV["ipad"]["pts"])
        d8b, _ = device(P, f"{scr}/video.html?state=note", 7 * w + w * .46, dy + h * .14, w * .46, kind="phone", z=8, pts=DEV["iphone"]["pts"])
    else:
        d8a, _ = device(P, f"{scr}/pad.html?view=page", 7 * w + w * .06, dy + h * .02, w * .80, kind="pad", pts=DEV["ipad"]["pts"])
        d8b, _ = device(P, f"{scr}/video.html?state=note", 7 * w + w * .55, dy + h * .16, w * .34, kind="phone", z=8, pts=DEV["iphone"]["pts"])
    P.add(d8a); P.add(d8b)


def landscape(P, W, name, scr):
    """Five Mac frames: the headline on the frame's start side, Safari's window beside it."""
    w, h, u = P.w, P.h, P.u
    size = h * .13
    hw = w * .36
    for i, key in enumerate(MAC_KEYS):
        t = dict(W[key])
        if key == "2":
            t["s"] = W.get("2m", {}).get("s", t["s"])
        P.add(head(P, i, t, name, size=size, top=h * .14, width=hw, left=w * .055, maxh=h * .75,
                   fine=(W["8"]["h"].replace("|", " ") + " · " + W["8"]["s"]) if i == 4 else None))
    ww = w * .54
    win = lambda i, q: mac_window(P, f"{scr}/mac.html?{q}", i * w + w * .43, h * .16, ww)
    # 1: the pile of pop-ups, and Safari under it
    P.add(win(0, "state=play"))
    ads = W["ads"]
    s = w * .2
    for j, (fx, fy, rot) in enumerate([(.42, .20, -7), (.62, .30, 6), (.48, .48, 4), (.70, .56, -5), (.40, .66, 8), (.58, .74, -3)]):
        P.add(ad(P, fx * w, fy * h, s, rot, ads[j % len(ads)], ads[(j + 5) % len(ads)], j, 10 + j))
    # 1 | 2: the toolbar button, pressed, across the seam
    k = 520 * u
    P.add(f'<div class="row" style="{P.pos(w * .90, h * .70, -5, w=k, z=30)};height:{k*.42}px;border-radius:{k*.1}px;justify-content:center;gap:{k*.06}px">'
          f'<span style="width:{k*.2}px;height:{k*.2}px;display:block">{S.ICON_SVG}</span>'
          f'<span style="font-size:{k*.11}px;font-weight:600;white-space:nowrap">{esc(name)}</span></div>')
    P.add(f'<div class="ring" style="--d:{k*.3}px;width:{k*.3}px;height:{k*.3}px;{P.pos(w * .90 + k * .05, h * .70 + k * .06, z=31)}"></div>')
    # 2: the popover on the page list
    P.add(win(1, "view=page"))
    # 2 | 3: a blocked row
    P.add(blocked_card(P, w * 1.78, h * .80, w * .38, rot=3))
    # 3: the Back trap stopped
    P.add(win(2, "state=back"))
    P.add(puck(P, w * 2.86, h * .74, 200 * u))
    # 4: the rules
    P.add(win(3, "view=rules"))
    P.add(rule_menu(P, w * 3.80, h * .62, w * .3, rot=-3))
    # 5: settings, and the icon
    P.add(win(4, "view=settings"))
    P.add(tile(P, w * 4.06, h * .66, 300 * u, rot=-6))


def build(loc, dev, jobs):
    W = words(loc)
    name = S.name(loc)
    scr_dir = OUT / loc / "screens"
    if not (scr_dir / "video.html").exists() or "--screens" in sys.argv or dev == "iphone":
        S.write_all(W, loc, scr_dir)
    P = Pano(loc, dev)
    scr = "../screens"
    # a faint red light behind each frame's device, so the black ground has depth
    for i in range(P.n):
        cx = i * P.w + P.w * (.5 if P.d["kind"] != "mac" else .7)
        r = P.w * (.7 if P.d["kind"] != "mac" else .35)
        P.add(f'<div class="glow" style="{P.pos(cx - r/2, P.h * .55, w=r)};height:{r}px"></div>')
    (landscape if P.d["kind"] == "mac" else portrait)(P, W, name, scr)
    out = OUT / loc / dev
    out.mkdir(parents=True, exist_ok=True)
    hf = HEAD_FONT.get(loc, "")
    font_css = (f'.h1,.sub,.fine{{font-family:system-ui,-apple-system,{hf},sans-serif}}' if hf else "")
    wb = f".h1,.sub,.fine{{word-break:{WORD_BREAK[loc]}}}" if loc in WORD_BREAK else ""
    d = ' dir="rtl"' if P.rtl else ""
    page = (f'<!doctype html><html lang="{loc}"><head><meta charset="utf-8"><style>{CSS}{font_css}{wb}'
            f'html,body{{width:{P.w}px;height:{P.h}px}} .stage{{width:{P.W}px;height:{P.h}px}}</style>{SHIFT}</head>'
            f'<body><div class="stage"{d}>{"".join(P.parts)}</div>{FIT}<script>window.READY_WAIT=2600</script>'
            f'<script src="{(HERE / "ready.js").as_uri()}"></script></body></html>')
    p = out / "pano.html"
    p.write_text(page)
    sw, sh = P.d["shot"]
    only = os.environ.get("FRAMES")
    for i in range(P.n):
        if only and str(i + 1) not in only.split(","):
            continue
        j = {"html": f"{p}?x={P.frame_x(i)}", "png": str(out / f"{i + 1:02d}.png"), "w": sw, "h": sh}
        if (sw, sh) != (P.w, P.h):
            j["scale"] = sw / P.w
        jobs.append(j)


def render(jobs):
    if "--no-render" in sys.argv or not jobs:
        return
    jf = OUT / f"jobs-{os.getpid()}.json"
    jf.write_text(json.dumps(jobs))
    # render-batch takes html as a path and prefixes file://; a query string rides along on it
    r = subprocess.run(["bun", str(HERE / "render-batch.mjs"), str(jf)], cwd=HERE)
    jf.unlink()
    if r.returncode:
        raise SystemExit("some frames failed to render")


def sheet(only):
    for dev in only:
        rows = []
        for loc in sorted(p.name for p in OUT.iterdir() if p.is_dir()):
            fr = sorted((OUT / loc / dev).glob("[0-9][0-9].png"))
            if loc in S.RTL:
                fr = fr[::-1]
            if fr:
                rows.append((loc, fr))
        if not rows:
            continue
        th = 260 if DEV[dev]["kind"] != "mac" else 420
        tmp = OUT / f".sheet-{dev}"; tmp.mkdir(exist_ok=True)
        pngs = []
        for loc, fr in rows:
            rp = tmp / f"{loc}.png"
            subprocess.run(["magick", *map(str, fr), "-resize", f"{th}x", "+append", "-gravity", "NorthWest", "-background", "#222",
                            "-splice", "0x44", "-font", "/System/Library/Fonts/SFNS.ttf", "-pointsize", "30", "-fill", "#fff",
                            "-annotate", "+12+6", f"{loc}  {dev}" + ("  (right to left: frame 1 on the right)" if loc in S.RTL else ""),
                            str(rp)], check=True)
            pngs.append(str(rp))
        out = OUT / f"sheet-{dev}.png"
        if len(pngs) > 10:
            half = (len(pngs) + 1) // 2
            cols = []
            for c, part in enumerate((pngs[:half], pngs[half:])):
                cp = tmp / f"col{c}.png"
                subprocess.run(["magick", *part, "-background", "#222", "-append", "-gravity", "East", "-splice", "40x0", str(cp)], check=True)
                cols.append(str(cp))
            subprocess.run(["magick", *cols, "-background", "#222", "-gravity", "North", "+append", str(out)], check=True)
        else:
            subprocess.run(["magick", *pngs, "-background", "#222", "-append", str(out)], check=True)
        shutil.rmtree(tmp)
        print(out)


def publish(locs):
    """Frames into the folders the upload reads: Support/AppStore/<locale>/{iphone,ipad,mac,duo}; English locales
    read the default sets in Support/AppStore/{iphone,ipad,mac,duo}."""
    for loc in locs:
        base = APPSTORE if loc == "en-US" else APPSTORE / loc
        if loc in ENGLISH and loc != "en-US":
            continue
        for dev in DEV:
            src = sorted((OUT / loc / dev).glob("[0-9][0-9].png"))
            if not src:
                continue
            folder, prefix = ("duo", dev.split("-")[1] + "-") if dev.startswith("duo") else (dev, "")
            dst = base / folder
            dst.mkdir(parents=True, exist_ok=True)
            for old in dst.glob(f"{prefix}[0-9][0-9].png"):
                old.unlink()
            for f in src:
                shutil.copy(f, dst / f"{prefix}{f.name}")
        print("published", loc)


def main():
    argv = sys.argv[1:]
    only = list(DEV)
    if "--only" in argv:
        i = argv.index("--only"); only = argv[i + 1].split(","); argv = argv[:i] + argv[i + 2:]
    a = [x for x in argv if not x.startswith("--")]
    if a and a[0] == "sheet":
        return sheet(only)
    if a and a[0] == "publish":
        return publish(STORE if "--all" in sys.argv else a[1:])
    locs = [l for l in STORE if (HERE / "words" / f"{l}.json").exists()] if "--all" in sys.argv else (a or ["en-US"])
    jobs = []
    for loc in locs:
        for dev in only:
            build(loc, dev, jobs)
    render(jobs)


if __name__ == "__main__":
    main()
