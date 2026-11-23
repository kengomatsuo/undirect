#!/usr/bin/env python3
"""Builds the owner's review page for the Cutling 2.0 release posts: every post inside a mock of the platform it goes
to, with its film or carousel playing and its final words, its time in WIB and US Eastern, and what is done by hand.
Reads posts.json beside this file and the finished media in ~/Downloads/cutling-2-release-posts/.

    python3 review.py <out-dir>      -> <out-dir>/index.html plus media/ (published together as one Artifact)"""
import base64, html, json, re, shutil, subprocess, sys
from datetime import datetime, timedelta
from pathlib import Path

HERE = Path(__file__).resolve().parent
MEDIA = Path.home() / "Downloads/cutling-2-release-posts"
AVATAR = Path.home() / "Repositories/monholt/assets/logos/brand-kit/avatar/monholt-avatar-1024-white-on-black.png"
out = Path(sys.argv[1]); (out / "media").mkdir(parents=True, exist_ok=True)
d = json.loads((HERE / "posts.json").read_text())
e = html.escape


def avatar_uri():
    small = out / "avatar.png"
    subprocess.run(["sips", "-Z", "96", str(AVATAR), "--out", str(small)], check=True, capture_output=True)
    uri = "data:image/png;base64," + base64.b64encode(small.read_bytes()).decode()
    small.unlink()
    return uri


AV = avatar_uri()


def media(name):
    """Copies a finished file beside the page and returns its relative URL."""
    src = MEDIA / name
    if not src.exists():
        raise SystemExit(f"missing finished file: {src}")
    dst = out / "media" / src.name
    if not dst.exists() or dst.stat().st_mtime < src.stat().st_mtime:
        shutil.copyfile(src, dst)
    return f"media/{src.name}"


def when(s):
    t = datetime.strptime(s, "%Y-%m-%d %H:%M")
    et = t - timedelta(hours=12)
    return f"{t.strftime('%a %b %-d, %H:%M')} WIB", f"{et.strftime('%a %b %-d, %-I:%M %p')} US Eastern"


def rich(text, link_cls="lk"):
    """Post text as the platform shows it: hashtags and links coloured, line breaks kept."""
    t = e(text)
    t = re.sub(r"(https?://[^\s<]+|cutling\.matsuokengo\.com)", lambda m: f'<span class="{link_cls}">{m.group(1)}</span>', t)
    t = re.sub(r"(?<![\w&])#(\w+)", lambda m: f'<span class="{link_cls}">#{m.group(1)}</span>', t)
    return t.replace("\n", "<br>")


def video(src, poster, ratio, extra=""):
    return (f'<div class="vid" style="aspect-ratio:{ratio}"><video src="{e(src)}" poster="{e(poster)}" muted loop playsinline preload="none"></video>'
            f'<button class="snd" type="button" aria-label="Sound on or off"><svg viewBox="0 0 24 24" width="18" height="18"><path class="off" d="M3 9v6h4l5 4V5L7 9H3zm13.6 3 2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4L16.6 12z"/>'
            f'<path class="on" d="M3 9v6h4l5 4V5L7 9H3zm11.5 3A4.5 4.5 0 0 0 12 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg></button>{extra}</div>')


ICON = {
    "reply": '<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4V5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    "repost": '<svg viewBox="0 0 24 24"><path d="M7 7h10v6m0 0-3-3m3 3 3-3M17 17H7v-6m0 0 3 3m-3-3-3 3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "heart": '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-9.6A4 4 0 0 1 12 8a4 4 0 0 1 7 2.4C19 15.600 12 20 12 20z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    "share": '<svg viewBox="0 0 24 24"><path d="M4 12v7h16v-7M12 15V4m0 0-4 4m4-4 4 4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "send": '<svg viewBox="0 0 24 24"><path d="M21 3 10 14m11-11-7 18-4-7-7-4 18-7z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    "save": '<svg viewBox="0 0 24 24"><path d="M6 4h12v16l-6-4-6 4V4z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    "bars": '<svg viewBox="0 0 24 24"><path d="M5 20V10m7 10V4m7 16v-7" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
    "thumb": '<svg viewBox="0 0 24 24"><path d="M8 20H5V10h3m0 10V10l4-7c1.500 0 2.500 1 2.500 2.500L14 9h4.500a1.500 1.500 0 0 1 1.500 1.800l-1.300 7.500A2 2 0 0 1 16.700 20H8z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
}


def acts(names, cls="acts"):
    return f'<div class="{cls}">' + "".join(f'<span class="ic">{ICON[n]}</span>' for n in names) + "</div>"


def rail(names, labels=None):
    return '<div class="rail">' + "".join(f'<span class="ic">{ICON[n]}</span>' for n in names) + "</div>"


def carousel(files):
    slides = "".join(f'<img src="{e(media(f))}" alt="Slide {i + 1} of {len(files)}" loading="lazy">' for i, f in enumerate(files))
    dots = "".join(f'<i{" class=on" if i == 0 else ""}></i>' for i in range(len(files)))
    return f'<div class="car"><div class="track">{slides}</div><span class="count">1/{len(files)}</span></div><div class="dots">{dots}</div>'


def fold(text, at, more="more"):
    """A caption as the feed shows it: its start, then "more", which opens the rest."""
    if len(text) <= at:
        return f'<span class="cap">{rich(text)}</span>'
    para = text.find("\n\n")
    cut = text[:para] if 0 < para <= at else text[:at].rsplit(" ", 1)[0]
    gap = " " if cut[-1:] in ".!?" else ""
    return (f'<span class="cap folded"><span class="head">{rich(cut)}{gap}… <button type="button" class="more">{more}</button></span>'
            f'<span class="full">{rich(text)}</span></span>')


def mock(film, p):
    plat = p["platform"]
    files = film["files"]
    key = p.get("file", "9x16")
    cover = files.get("cover")
    if "X" == plat:
        ratio = {"1x1": "1/1", "16x9": "16/9", "9x16": "9/16"}[key]
        poster = files.get({"1x1": "cover1x1", "16x9": "cover16x9"}.get(key, "cover"), cover)
        v = video(media(files[key]), media(poster), ratio)
        tall = ' style="max-width:62%"' if key == "9x16" else ""
        reply = (f'<div class="x-post reply"><img class="av" src="{AV}" alt=""><div class="b"><div class="who"><b>Monholt</b> <span>@monholtco · 1m</span></div>'
                 f'<div class="tx">{rich(p["reply_text"], "xl")}</div>{acts(["reply", "repost", "heart", "bars", "share"])}</div></div>') if p.get("reply_text") else ""
        return ("x", f'<div class="x-post"><img class="av" src="{AV}" alt=""><div class="b"><div class="who"><b>Monholt</b> <span>@monholtco · now</span></div>'
                     f'<div class="tx">{rich(p["text"], "xl")}</div><div class="x-media"{tall}>{v}</div>{acts(["reply", "repost", "heart", "bars", "share"])}</div></div>{reply}')
    if plat.startswith("Instagram"):
        is_car = key == "carousel"
        ig_media = carousel(files["carousel"]) if is_car else video(media(files[key]), media(cover), "9/16")
        ig = (f'<div class="ig"><div class="hd"><span class="ring"><img class="av" src="{AV}" alt=""></span><b>monholtco</b></div>{ig_media}'
              f'<div class="row">{acts(["heart", "reply", "send"])}{acts(["save"], "acts end")}</div>'
              f'<div class="cp"><b>monholtco</b> {fold(p["text"], 125)}</div></div>')
        fb_media = (f'<div class="fb-grid">' + "".join(f'<img src="{e(media(f))}" alt="" loading="lazy">' for f in files["carousel"][:5])
                    + f'<span class="plus">+{len(files["carousel"]) - 5}</span></div>') if is_car else video(media(files[key]), media(cover), "9/16")
        comment = (f'<div class="fb-c"><img class="av" src="{AV}" alt=""><div class="bub"><b>Monholt</b><br>{rich(p["first_comment"], "fl")}</div></div>') if p.get("first_comment") else ""
        fb = (f'<div class="fb"><div class="hd"><img class="av" src="{AV}" alt=""><div><b>Monholt</b><span>Just now · Public</span></div></div>'
              f'<div class="tx">{fold(p["text"], 210, "See more")}</div>{fb_media}'
              f'<div class="bar"><span>{ICON["thumb"]} Like</span><span>{ICON["reply"]} Comment</span><span>{ICON["share"]} Share</span></div>{comment}</div>')
        return ("pair", [("Instagram", "ig-wrap", ig), ("Facebook", "fb-wrap", fb)])
    if plat == "TikTok":
        over = (f'{rail(["heart", "reply", "save", "share"])}<div class="tt-b"><b>Monholt</b><div class="tt-c">{fold(p["text"], 90)}</div>'
                f'<div class="tt-m">♫ original sound · Monholt</div></div>')
        return ("tiktok", f'<div class="full">{video(media(files[key]), media(cover), "9/16", over)}</div>')
    if plat == "Threads":
        reply = (f'<div class="th reply"><img class="av" src="{AV}" alt=""><div class="b"><div class="who"><b>monholtco</b> <span>1m</span></div>'
                 f'<div class="tx">{rich(p["reply_text"], "tl")}</div>{acts(["heart", "reply", "repost", "send"])}</div></div>') if p.get("reply_text") else ""
        return ("threads", f'<div class="th"><img class="av" src="{AV}" alt=""><div class="b"><div class="who"><b>monholtco</b> <span class="tag">iPhone</span> <span>now</span></div>'
                           f'<div class="tx">{rich(p["text"], "tl")}</div><div class="th-media">{video(media(files[key]), media(cover), "9/16")}</div>'
                           f'{acts(["heart", "reply", "repost", "send"])}</div></div>{reply}')
    if plat.startswith("YouTube Short"):
        desc = (HERE / p["description_file"]).read_text().strip()
        over = (f'{rail(["thumb", "reply", "share"])}<div class="tt-b"><b>@matsuokengo</b><div class="tt-c">{rich(p["title"], "yl")}</div></div>')
        return ("shorts", f'<div class="full">{video(media(files[key]), media(cover), "9/16", over)}</div>'
                          f'<details class="desc"><summary>Description and tags</summary><p>{rich(desc, "lk")}</p><p class="tags">Tags: {e(p["tags"])}</p></details>')
    if plat.startswith("YouTube"):
        desc = (HERE / p["description_file"]).read_text().strip()
        return ("youtube", f'<div class="yt">{video(media(files[key]), media(files.get("cover16x9", cover)), "16/9")}<h4>{e(p["title"])}</h4>'
                           f'<div class="ch"><span class="yav">MK</span><b>Matsuo Kengo</b><span>@matsuokengo</span></div>'
                           f'<details class="desc" open><summary>Description and tags</summary><p>{rich(desc, "lk")}</p><p class="tags">Tags: {e(p["tags"])}</p></details></div>')
    raise SystemExit(f"no mock for {plat}")


def card(film, p, label, cls, body):
    wib, et = when(p["when"])
    note = f'<p class="note">{e(p["note"])}</p>' if p.get("note") else ""
    hand = []
    if p.get("reply_text") and label in ("X", "Threads"):
        hand.append("Our reply with the link is posted by hand right after it goes out.")
    if label == "Facebook" and p.get("first_comment"):
        hand.append("The first comment with the link is posted by hand.")
    hand_html = "".join(f'<p class="hand">{e(h)}</p>' for h in hand)
    return (f'<article class="post"><header><h3>{e(label)}</h3><p class="when"><b>{e(wib)}</b><span>{e(et)}</span></p></header>'
            f'<div class="mock {cls}">{body}</div>{note}{hand_html}</article>')


CHECKS = json.loads((HERE / "checks.json").read_text()) if (HERE / "checks.json").exists() else {}
days = []
count = 0
for film in d["films"]:
    cards = []
    for p in sorted(film["posts"], key=lambda q: q["when"]):
        kind, body = mock(film, p)
        if kind == "pair":
            for label, cls, b in body:
                cards.append(card(film, p, label, cls, b)); count += 1
        else:
            label = {"x": "X", "tiktok": "TikTok", "threads": "Threads", "shorts": "YouTube Shorts", "youtube": "YouTube"}[kind]
            cards.append(card(film, p, label, kind, body)); count += 1
    chk = "".join(f"<li>{e(c)}</li>" for c in CHECKS.get(film["key"], []))
    chk_html = f'<details class="checks"><summary>What was checked on the finished files</summary><ul>{chk}</ul></details>' if chk else ""
    days.append(f'<section class="day" id="{e(film["key"])}"><div class="dayhead"><p class="eyebrow">{e(film["day"])}</p><h2>{e(film["title"])}</h2>'
                f'<p class="what">{e(film["what"])}</p>{chk_html}</div><div class="posts">{"".join(cards)}</div></section>')

nav = "".join(f'<a href="#{e(f["key"])}"><b>{e(f["day"])}</b>{e(f["title"])}</a>' for f in d["films"])
page = (HERE / "review.template.html").read_text()
page = (page.replace("{{NAV}}", nav).replace("{{DAYS}}", "".join(days)).replace("{{COUNT}}", str(count))
        .replace("{{BUILT}}", datetime.now().strftime("%b %-d, %H:%M WIB")))
(out / "index.html").write_text(page)
print(out / "index.html", count, "posts")
