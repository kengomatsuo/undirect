#!/usr/bin/env python3
"""Builds the owner's review page for the Japanese Cutling TikTok posts (card ASG221): each film playing in a phone
frame beside its Japanese caption and voice lines with English glosses, its time in JST and WIB, and why it is made the
way it is. Reads copy-ja.json and posts.json beside this file and the finished films in ~/Downloads/Claude/cutling-ja/.

    python3 review.py <out-dir>      -> <out-dir>/index.html plus media/ (published together as one Artifact)"""
import html, json, shutil, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
MEDIA = Path.home() / "Downloads/Claude/cutling-ja"
out = Path(sys.argv[1]); (out / "media").mkdir(parents=True, exist_ok=True)
copy = json.loads((HERE / "copy-ja.json").read_text())["posts"]
plan = json.loads((HERE / "posts.json").read_text())
e = html.escape


def media(name):
    src = MEDIA / name
    if not src.exists():
        return None
    dst = out / "media" / src.name
    if not dst.exists() or dst.stat().st_mtime < src.stat().st_mtime:
        shutil.copyfile(src, dst)
    return f"media/{src.name}"


def br(s):
    return e(s).replace("\n", "<br>")


cards = []
for p in plan["posts"]:
    c = copy[p["key"]]
    film, cover = media(p["film"]), media(p["cover"])
    tags = " ".join(t["tag"] for t in c["hashtags"])
    phone = (f'<video src="{film}" poster="{cover or ""}" controls playsinline preload="metadata"></video>' if film
             else '<div class="pending">Rendering. This film joins the page when its render is checked.</div>')
    voice = "".join(
        f'<li><span class="ja" lang="ja">{e(v["ja"])}</span><span class="gl">{e(v["gloss"])}</span></li>'
        for v in (c.get("voice") or []))
    cards.append(f"""
<article class="post" id="{e(p['key'].replace('_', '-'))}">
  <div class="phone">{phone}</div>
  <div class="words">
    <p class="when"><b>{e(p['jst'])} JST</b> · {e(p['wib'])} WIB · TikTok @monholt</p>
    <h2>{e(p['name'])}</h2>
    <p class="why">{e(p['why'])}</p>
    <h3>Caption</h3>
    <p class="ja cap" lang="ja">{br(c['caption']['ja'])}<br><span class="tags">{e(tags)}</span></p>
    <p class="gl">{br(c['caption']['gloss'])}</p>
    <h3>Cover line</h3>
    <p><span class="ja" lang="ja">{e(c['cover']['ja'])}</span> <span class="gl">{e(c['cover']['gloss'])}</span></p>
    <h3>Japanese voice (ElevenLabs)</h3>
    <ol class="voice">{voice}</ol>
    <p class="note">{e(c.get('voice_decision') or '')}</p>
    {f'<p class="gate">{e(p["gate"])}</p>' if p.get('gate') else ''}
  </div>
</article>""")

page = f"""<title>Cutling in Japanese</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Sans+JP:wght@400;700&display=swap">
<style>
/* Layout: one row per post, phone on the left, its words on the right; stacks at phone width. */
:root {{ --bg:#f4f7f5; --fg:#14201b; --muted:#5b6b64; --line:#d5e0db; --accent:#0d9a72; --card:#ffffff; --warn:#8a5a00;
  --sans:"Inter","Noto Sans JP",system-ui,sans-serif; --ja:"Noto Sans JP","Hiragino Sans",system-ui,sans-serif; }}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{ --bg:#0f1513; --fg:#e7efeb; --muted:#93a59d; --line:#24322c; --accent:#3cc99c; --card:#161f1b; --warn:#e0b25a; color-scheme:dark }} }}
:root[data-theme="dark"] {{ --bg:#0f1513; --fg:#e7efeb; --muted:#93a59d; --line:#24322c; --accent:#3cc99c; --card:#161f1b; --warn:#e0b25a; color-scheme:dark }}
body {{ background:var(--bg); color:var(--fg); font:15px/1.55 var(--sans); padding-left:max(16px, env(safe-area-inset-left, 0px)); padding-right:max(16px, env(safe-area-inset-right, 0px)); padding-block:32px 64px }}
main {{ max-width:1040px; margin:0 auto; display:grid; gap:40px }}
header h1 {{ font-size:28px; margin:0 0 8px; text-wrap:balance }}
header p {{ margin:0 0 6px; max-width:68ch; color:var(--muted) }}
header b {{ color:var(--fg) }}
.post {{ display:grid; grid-template-columns:300px 1fr; gap:28px; padding-top:32px; border-top:1px solid var(--line) }}
.phone video, .pending {{ width:100%; aspect-ratio:9/16; border-radius:22px; background:#000; display:block; max-width:100% }}
.pending {{ display:grid; place-items:center; padding:24px; text-align:center; color:#cfd8d4; background:#1b2420; box-sizing:border-box }}
.words {{ min-width:0 }}
h2 {{ font-size:22px; margin:2px 0 6px }}
h3 {{ font-size:12px; text-transform:uppercase; letter-spacing:.08em; color:var(--muted); margin:18px 0 6px }}
.when {{ margin:0; color:var(--accent); font-variant-numeric:tabular-nums }}
.why {{ margin:0; color:var(--muted); max-width:62ch }}
.ja {{ font-family:var(--ja); font-size:16px }}
.cap {{ background:var(--card); border:1px solid var(--line); border-radius:10px; padding:12px 14px; margin:0 }}
.tags {{ color:var(--accent) }}
.gl {{ display:block; color:var(--muted); font-size:13.5px }}
.voice {{ margin:0; padding-left:20px; display:grid; gap:6px }}
.note {{ color:var(--muted); font-size:13.5px; max-width:62ch }}
.gate {{ color:var(--warn); font-weight:600 }}
@media (max-width:720px) {{ .post {{ grid-template-columns:1fr }} .phone {{ max-width:320px }} }}
</style>
<main>
<header>
  <h1>Cutling in Japanese, on TikTok</h1>
  <p><b>Why these exist.</b> {e(plan['why'])}</p>
  <p><b>Where they go.</b> {e(plan['account'])}</p>
  <p><b>Your hunch about ElevenLabs.</b> {e(plan['elevenlabs'])}</p>
  <p><b>What happens on your go.</b> {e(plan['go'])}</p>
</header>
{''.join(cards)}
</main>"""
(out / "index.html").write_text(page)
print(out / "index.html")
