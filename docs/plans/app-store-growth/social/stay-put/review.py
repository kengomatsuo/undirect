#!/usr/bin/env python3
"""Builds the owner's review page for the Stay-Put posts: every post inside a mock of the platform it goes to, with its
film or picture and its final words, its time in WIB and US Eastern, the posts already scheduled that day in grey, and
what is done by hand. Reads posts.json beside this file and the finished media in ~/Downloads/Claude/stay-put-posts/.
The page carries small copies of the films (720 px wide); the files to post are the full ones in the Downloads folder.

    python3 review.py <out-dir>      -> <out-dir>/index.html plus media/ (published together as one Artifact)"""
import base64, html, json, re, shutil, subprocess, sys
from datetime import datetime, timedelta
from pathlib import Path

HERE = Path(__file__).resolve().parent
MEDIA = Path.home() / "Downloads/Claude/stay-put-posts"
AVATAR = Path.home() / "Repositories/monholt/assets/logos/brand-kit/avatar/monholt-avatar-1024-white-on-black.png"
out = Path(sys.argv[1]); (out / "media").mkdir(parents=True, exist_ok=True)
d = json.loads((HERE / "posts.json").read_text())
EVENT = d["links"]["event"]
e = html.escape

# Already scheduled and kept (social-posts.md, read 2026-11-25): shown in grey under their day.
KEPT = {
    "Fri Nov 27": [("07:55-08:19", "“Next chapter” film on TikTok, Instagram + Facebook, Threads, YouTube Short"), ("15:45", "X: “Next chapter” film"), ("21:45", "X: Black Friday sale, both apps")],
    "Sat Nov 28 (Fri Nov 27 in the US)": [("15:15", "X: “× means close” film"), ("22:37", "YouTube: “Next chapter” long cut"), ("23:25-23:47", "“× means close” film on TikTok, Instagram + Facebook, Threads, YouTube Short")],
}


def avatar_uri():
    small = out / "avatar.png"
    subprocess.run(["sips", "-Z", "96", str(AVATAR), "--out", str(small)], check=True, capture_output=True)
    uri = "data:image/png;base64," + base64.b64encode(small.read_bytes()).decode()
    small.unlink()
    return uri


AV = avatar_uri()


def media(name, small=None):
    """Copies a finished file beside the page (a film as a 720 px preview) and returns its relative URL."""
    src = MEDIA / name
    if not src.exists():
        raise SystemExit(f"missing finished file: {src}")
    dst = out / "media" / (small or src.name)
    if not dst.exists() or dst.stat().st_mtime < src.stat().st_mtime:
        if src.suffix == ".mp4":
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(src), "-vf", "scale=720:-2", "-c:v", "libx264", "-crf", "25", "-preset", "slow",
                            "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", str(dst)], check=True)
        elif src.suffix == ".png":
            subprocess.run(["magick", str(src), "-resize", "1200x1200>", "-quality", "86", str(dst.with_suffix(".jpg"))], check=True)
            return f"media/{dst.with_suffix('.jpg').name}"
        else:
            shutil.copyfile(src, dst)
    return f"media/{dst.name}"


def when(s):
    t = datetime.strptime(s, "%Y-%m-%d %H:%M")
    et = t - timedelta(hours=12)
    return f"{t.strftime('%a %b %-d, %H:%M')} WIB", f"{et.strftime('%a %b %-d, %-I:%M %p')} US Eastern"


def link(text, tag_hint=""):
    return text.replace("{event}", EVENT).replace("{cutling}", d["links"]["cutling"])


def rich(text, link_cls="lk"):
    t = e(link(text))
    t = re.sub(r"(https?://[^\s<]+)", lambda m: f'<span class="{link_cls}">{m.group(1)}</span>', t)
    t = re.sub(r"(?<![\w&])#(\w+)", lambda m: f'<span class="{link_cls}">#{m.group(1)}</span>', t)
    return t.replace("\n", "<br>")


def video(src, poster, ratio, extra=""):
    return (f'<div class="vid" style="aspect-ratio:{ratio}"><video src="{e(src)}" poster="{e(poster)}" muted loop playsinline preload="none"></video>'
            f'<button class="snd" type="button" aria-label="Sound on or off"><svg viewBox="0 0 24 24" width="18" height="18"><path class="off" d="M3 9v6h4l5 4V5L7 9H3zm13.6 3 2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4L16.6 12z"/>'
            f'<path class="on" d="M3 9v6h4l5 4V5L7 9H3zm11.5 3A4.5 4.5 0 0 0 12 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg></button>{extra}</div>')


ICON = {
    "reply": '<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4V5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    "repost": '<svg viewBox="0 0 24 24"><path d="M7 7h10v6m0 0-3-3m3 3 3-3M17 17H7v-6m0 0 3 3m-3-3-3 3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "heart": '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-9.6A4 4 0 0 1 12 8a4 4 0 0 1 7 2.4C19 15.6 12 20 12 20z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    "share": '<svg viewBox="0 0 24 24"><path d="M4 12v7h16v-7M12 15V4m0 0-4 4m4-4 4 4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "send": '<svg viewBox="0 0 24 24"><path d="M21 3 10 14m11-11-7 18-4-7-7-4 18-7z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    "save": '<svg viewBox="0 0 24 24"><path d="M6 4h12v16l-6-4-6 4V4z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    "bars": '<svg viewBox="0 0 24 24"><path d="M5 20V10m7 10V4m7 16v-7" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
    "thumb": '<svg viewBox="0 0 24 24"><path d="M8 20H5V10h3m0 10V10l4-7c1.5 0 2.5 1 2.5 2.5L14 9h4.5a1.5 1.5 0 0 1 1.5 1.8l-1.3 7.5A2 2 0 0 1 16.7 20H8z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
}
acts = lambda names, cls="acts": f'<div class="{cls}">' + "".join(f'<span class="ic">{ICON[n]}</span>' for n in names) + "</div>"
rail = lambda names: '<div class="rail">' + "".join(f'<span class="ic">{ICON[n]}</span>' for n in names) + "</div>"


def fold(text, at, more="more"):
    text = link(text)
    if len(text) <= at:
        return f'<span class="cap">{rich(text)}</span>'
    para = text.find("\n\n")
    cut = text[:para] if 0 < para <= at else text[:at].rsplit(" ", 1)[0]
    gap = " " if cut[-1:] in ".!?" else ""
    return (f'<span class="cap folded"><span class="head">{rich(cut)}{gap}… <button type="button" class="more">{more}</button></span>'
            f'<span class="full">{rich(text)}</span></span>')


def placeholder(key, extra=""):
    m = d["media"][key]
    return (f'<div class="vid ph" style="aspect-ratio:9/16"><img src="{e(media(m["cover"]))}" alt="">'
            f'<div class="phl"><b>{e(m["placeholder"])}</b><span>{m["length_s"]} s · “Blown away”</span></div>{extra}</div>')


def film(key):
    m = d["media"][key]
    if m.get("placeholder"):
        return placeholder(key)
    small = m["file"].replace(".mp4", "-preview.mp4")
    return video(media(m["file"], small), media(m["cover"]), "9/16")


def still(key):
    m = d["media"][key]
    return media(m["file"])


def carousel(key, ratio="4/5"):
    files = d["media"][key]["files"]
    slides = "".join(f'<img src="{e(media(f))}" alt="Slide {i + 1} of {len(files)}" loading="lazy" style="aspect-ratio:{ratio}">' for i, f in enumerate(files))
    dots = "".join(f'<i{" class=on" if i == 0 else ""}></i>' for i in range(len(files)))
    return f'<div class="car"><div class="track">{slides}</div><span class="count">1/{len(files)}</span></div><div class="dots">{dots}</div>'


def story(key, who="monholtco"):
    return (f'<div class="story"><img src="{e(media(d["media"][key]["file"]))}" alt="{e(d["media"][key]["what"])}">'
            f'<div class="bars"><i></i></div><div class="sh"><img class="av" src="{AV}" alt=""><b>{who}</b><span>now</span></div>'
            f'<div class="reply">Send message</div></div>')


def ratio_of(key):
    return "16/9" if key == "card" else "9/16" if key in ("details",) or key.endswith("9x16") else "4/5"


def mock(p):
    plat, key = p["platform"], p["media"]
    if "Story" in plat:
        return [("Instagram Story", "story-wrap", story(key)), ("Facebook Story", "story-wrap", story(key, "Monholt"))]
    if plat.startswith("Instagram carousel"):
        ig = (f'<div class="ig"><div class="hd"><span class="ring"><img class="av" src="{AV}" alt=""></span><span><b>monholtco</b> and <b>kenneth_j.fang</b></span></div>{carousel(key)}'
              f'<div class="row">{acts(["heart", "reply", "send"])}{acts(["save"], "acts end")}</div>'
              f'<div class="cp"><b>monholtco</b> {fold(p["text"], 125)}</div></div>')
        files = d["media"][key]["files"]
        grid = '<div class="fb-grid4">' + "".join(f'<img src="{e(media(f))}" alt="" loading="lazy">' for f in files) + "</div>"
        fc = re.search(r"Facebook first comment by hand: (.*)$", p.get("note", ""))
        comment = f'<div class="fb-c"><img class="av" src="{AV}" alt=""><div class="bub"><b>Monholt</b><br>{rich(fc.group(1), "fl")}</div></div>' if fc else ""
        fb = (f'<div class="fb"><div class="hd"><img class="av" src="{AV}" alt=""><div><b>Monholt</b><span>Just now · Public</span></div></div>'
              f'<div class="tx">{fold(p["text"], 210, "See more")}</div>{grid}'
              f'<div class="bar"><span>{ICON["thumb"]} Like</span><span>{ICON["reply"]} Comment</span><span>{ICON["share"]} Share</span></div>{comment}</div>')
        return [("Instagram carousel", "ig-wrap", ig), ("Facebook photos", "fb-wrap", fb)]
    if plat == "TikTok photo post":
        over = (f'{rail(["heart", "reply", "save", "share"])}<div class="tt-b"><b>Monholt</b><div class="tt-t">{e(p["title"])}</div><div class="tt-c">{fold(p["text"], 80)}</div></div>')
        return [("TikTok photo post", "tiktok", f'<div class="full ttp">{carousel(key, "9/16")}{over}</div>')]
    is_film = key in ("stay-put", "not-a-photo")
    if plat == "X":
        body = (f'<div class="x-media" style="max-width:62%">{film(key)}</div>' if is_film else
                f'<div class="x-media x-img"><img src="{e(still(key))}" alt="{e(d["media"][key]["what"])}" style="aspect-ratio:{ratio_of(key)};object-fit:cover"></div>')
        reply = (f'<div class="x-post reply"><img class="av" src="{AV}" alt=""><div class="b"><div class="who"><b>Monholt</b> <span>@monholtco · 1m</span></div>'
                 f'<div class="tx">{rich(p["reply"], "xl")}</div>{acts(["reply", "repost", "heart", "bars", "share"])}</div></div>') if p.get("reply") else ""
        return [("X", "x", f'<div class="x-post"><img class="av" src="{AV}" alt=""><div class="b"><div class="who"><b>Monholt</b> <span>@monholtco · now</span></div>'
                           f'<div class="tx">{rich(p["text"], "xl")}</div>{body}{acts(["reply", "repost", "heart", "bars", "share"])}</div></div>{reply}')]
    if plat.startswith("Instagram"):
        ig = (f'<div class="ig"><div class="hd"><span class="ring"><img class="av" src="{AV}" alt=""></span><span><b>monholtco</b> and <b>kenneth_j.fang</b></span></div>{film(key)}'
              f'<div class="row">{acts(["heart", "reply", "send"])}{acts(["save"], "acts end")}</div>'
              f'<div class="cp"><b>monholtco</b> {fold(p["text"], 125)}</div></div>')
        fc = re.search(r"Facebook first comment by hand: (.*)$", p.get("note", ""))
        comment = f'<div class="fb-c"><img class="av" src="{AV}" alt=""><div class="bub"><b>Monholt</b><br>{rich(fc.group(1), "fl")}</div></div>' if fc else ""
        fb = (f'<div class="fb"><div class="hd"><img class="av" src="{AV}" alt=""><div><b>Monholt</b><span>Just now · Public</span></div></div>'
              f'<div class="tx">{fold(p["text"], 210, "See more")}</div>{film(key)}'
              f'<div class="bar"><span>{ICON["thumb"]} Like</span><span>{ICON["reply"]} Comment</span><span>{ICON["share"]} Share</span></div>{comment}</div>')
        return [("Instagram Reel", "ig-wrap", ig), ("Facebook Reel", "fb-wrap", fb)]
    if plat == "TikTok":
        m = d["media"][key]
        over = (f'{rail(["heart", "reply", "save", "share"])}<div class="tt-b"><b>Monholt</b><div class="tt-c">{fold(p["text"], 90)}</div>'
                f'<div class="tt-m">♫ original sound · Monholt</div></div>')
        if m.get("placeholder"):
            return [("TikTok", "tiktok", f'<div class="full">{placeholder(key, over)}</div>')]
        return [("TikTok", "tiktok", f'<div class="full">{video(media(m["file"], m["file"].replace(".mp4", "-preview.mp4")), media(m["cover"]), "9/16", over)}</div>')]
    if plat == "Threads":
        body = (f'<div class="th-media">{film(key)}</div>' if is_film else
                f'<div class="th-media th-img"><img src="{e(still(key))}" alt="{e(d["media"][key]["what"])}"></div>')
        reply = (f'<div class="th reply"><img class="av" src="{AV}" alt=""><div class="b"><div class="who"><b>monholtco</b> <span>1m</span></div>'
                 f'<div class="tx">{rich(p["reply"], "tl")}</div>{acts(["heart", "reply", "repost", "send"])}</div></div>') if p.get("reply") else ""
        return [("Threads", "threads", f'<div class="th"><img class="av" src="{AV}" alt=""><div class="b"><div class="who"><b>monholtco</b> <span class="tag">{e(p.get("topic", "iPhone"))}</span> <span>now</span></div>'
                                       f'<div class="tx">{rich(p["text"], "tl")}</div>{body}{acts(["heart", "reply", "repost", "send"])}</div></div>{reply}')]
    if plat.startswith("YouTube Short"):
        m = d["media"][key]
        over = f'{rail(["thumb", "reply", "share"])}<div class="tt-b"><b>@matsuokengo</b><div class="tt-c">{rich(p["title"], "yl")}</div></div>'
        vid = placeholder(key, over) if m.get("placeholder") else video(media(m["file"], m["file"].replace(".mp4", "-preview.mp4")), media(m["cover"]), "9/16", over)
        return [("YouTube Short", "shorts", f'<div class="full">{vid}</div>'
                                            f'<details class="desc"><summary>Description and tags</summary><p>{rich(p["text"], "lk")}</p><p class="tags">Tags: {e(p["tags"])}</p></details>')]
    raise SystemExit(f"no mock for {plat}")


def card(p, label, cls, body):
    wib, et = when(p["when"])
    notes = [p[k] for k in ("replaces",) if p.get(k)]
    note = "".join(f'<p class="note">Replaces {e(n)}.</p>' for n in notes)
    if p.get("collab") and label.startswith("Instagram"):
        note = f'<p class="collab">collab: {e(p["collab"])}</p>' + note
    if p.get("note") and "first comment" not in p["note"]:
        note += f'<p class="note">{e(p["note"])}</p>'
    hand = []
    if p.get("reply") and label in ("X", "Threads"):
        hand.append("The reply with the link goes under it by hand right after it posts.")
    if label == "Facebook Reel" and "first comment" in p.get("note", ""):
        hand.append("The first comment with the link is posted by hand.")
    if p.get("collab") and label.startswith("Instagram"):
        hand.insert(0, f"Collab: {p['collab']}, set in Business Suite's collaborator field. After he accepts, he shares it to his Story mentioning @monholtco, and @monholtco reshares that Story from the Instagram app.")
    hand_html = "".join(f'<p class="hand">{e(h)}</p>' for h in hand)
    return (f'<article class="post"><header><h3>{e(label)}</h3><p class="when"><b>{e(wib)}</b><span>{e(et)}</span></p></header>'
            f'<div class="mock {cls}">{body}</div>{note}{hand_html}</article>')


DAYTEXT = {
    "Thu Nov 26": ("Tomorrow", "A short note the day before: my first App Store event, and why the art looks the way it does. The picture is the event card itself."),
    "Fri Nov 27": ("The Stay-Put Update film", "The event and the $0.99 price start at 15:00 WIB; the film goes out on the next US morning. The one Stay-Put film is undirect-b2's “Blown away” (ASG215): two sentences strangers wrote about Safari, printed on the art's loose sheets, blow away in its wind, and the real Undirect 1.1.1 answers each. Its moving art comes from this calendar's render. The Story goes up first, at 20:17."),
    "Sat Nov 28 (Fri Nov 27 in the US)": ("The film on X, the glass on Threads", "X gets the film three hours after the sale post, at lunchtime in the US. Threads gets how the glass breaks, with the real timings from the effect's code."),
    "Sun Nov 29": ("“This isn't a photo”", "How the art was made: real renders of the scene from 1 to 900 light paths per pixel, then the gust from the first film."),
    "Mon Nov 30": ("Last day of $0.99, and the note", "On X, the Black Friday price ends at midnight Pacific. Threads carries no prices: it gets the note Undirect shows on the page."),
    "Tue Dec 1": ("The made-up sites", "The demo pages the event links to: seven fictional sites that misbehave on purpose."),
    "Thu Dec 3": ("iOS 18", "The part of the update people miss: it runs on iOS 18 too."),
    "Fri Dec 4": ("Quiet if you want it", "The glass and the note can be switched off; the stopping goes on."),
    "Sat Dec 5": ("The stone, close up", "A crop of the event card: the flaws that make it read as a photo."),
    "Sun Dec 6": ("1 and 900", "The art at one light path per pixel beside the finished one."),
    "Wed Dec 2": ("Why the update exists", "The bug behind 1.1.1: a few pop-ups still flashed open for a moment in 1.1.0. The picture is the glass breaking, from the first film."),
}

days, count = [], 0
SECTION = lambda p: p.get("section", "stayput")
order = sorted({(SECTION(p), p["day"]) for p in d["posts"]}, key=lambda sd: (sd[0] == "cutling", min(q["when"] for q in d["posts"] if (SECTION(q), q["day"]) == sd)))
cal_rows = []
cut_started = False
for sec, day in order:
    posts = sorted([p for p in d["posts"] if p["day"] == day and SECTION(p) == sec], key=lambda q: q["when"])
    if sec == "cutling" and not cut_started:
        cut_started = True
        days.append('<section class="secthead" id="cutling"><p class="eyebrow wait">Waiting: goes out only once Cutling 2.0 reads Ready for Sale</p>'
                    '<h2>Cutling 2.0, the same set</h2><p class="what">Planned for Dec 1, the day 2.0 is set to go on sale (release scheduled for Dec 1, 07:00 WIB; its event, the Write-It-Once Update, from 15:00 WIB). '
                    'On Nov 25 both 2.0 versions read Prepare for Submission, so if 2.0 is not on sale by Dec 1 these move with it. The Five names and Five taps films (Dec 2 and 3) are already waiting for the same moment.</p></section>')
    cards = []
    for p in posts:
        for label, cls, body in mock(p):
            cards.append(card(p, label, cls, body)); count += 1
            wib, et = when(p["when"])
            mf = d["media"][p["media"]]
            what = mf.get("file") or mf.get("placeholder") or f'{len(mf["files"])} pictures'
            wait = " (waits for Cutling 2.0)" if sec == "cutling" else ""
            cal_rows.append((p["when"], f'<tr><td>{e(wib)}</td><td>{e(et)}</td><td>{e(label)}{e(wait)}</td><td>{e(what)}</td></tr>'))
    kept = KEPT.get(day, []) if sec == "stayput" else []
    for t, what in kept:
        dt = datetime.strptime(posts[0]["when"][:10] + " " + t[:5], "%Y-%m-%d %H:%M")
        cal_rows.append((dt.strftime("%Y-%m-%d %H:%M"), f'<tr><td class="k">{e(dt.strftime("%a %b %-d, ") + t)} WIB</td><td class="k"></td><td class="k" colspan="2">Already scheduled: {e(what)}</td></tr>'))
    kept_html = ('<div class="kept"><b>Already scheduled this day, kept</b>' + "".join(f"<span>{e(t)} WIB · {e(w)}</span>" for t, w in kept) + "</div>") if kept else ""
    title, what = DAYTEXT.get(day, (day, "")) if sec == "stayput" else ("Cutling 2.0 is out", "X and Threads with the event art and the five names, an Instagram and Facebook carousel, Stories, and a TikTok photo post.")
    did = ("c-" if sec == "cutling" else "") + re.sub(r"[^a-z0-9]+", "-", day.lower()).strip("-")[:16]
    days.append(f'<section class="day" id="{did}"><div class="dayhead"><p class="eyebrow">{e(day)}</p><h2>{e(title)}</h2>'
                f'<p class="what">{e(what)}</p>{kept_html}</div><div class="posts">{"".join(cards)}</div></section>')
    order_nav = None

cal = '<table class="cal"><thead><tr><th>When</th><th>US Eastern</th><th>Where</th><th>Media</th></tr></thead><tbody>' + "".join(r for _, r in sorted(cal_rows)) + "</tbody></table>"
nav = "".join(f'<a href="#{("c-" if sec == "cutling" else "") + re.sub(r"[^a-z0-9]+", "-", day.lower()).strip("-")[:16]}"><b>{e(day.split(" (")[0])}</b>{e(DAYTEXT.get(day, (day,))[0] if sec == "stayput" else "Cutling 2.0 (waiting)")}</a>' for sec, day in order)
page = (HERE / "review.template.html").read_text()
page = (page.replace("{{NAV}}", nav).replace("{{DAYS}}", "".join(days)).replace("{{COUNT}}", str(count)).replace("{{CAL}}", cal)
        .replace("{{HEROIMG}}", media("stay-put-details-9x16.png")).replace("{{BUILT}}", datetime.now().strftime("%b %-d, %H:%M WIB")))
(out / "index.html").write_text(page)
print(out / "index.html", count, "posts")
