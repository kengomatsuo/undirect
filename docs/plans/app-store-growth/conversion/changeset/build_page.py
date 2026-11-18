import base64, json, datetime
S = "/private/tmp/claude-501/-Users-hafang-Repositories-undirect/e1948e7f-0f2f-49cc-8d45-e2ecfe394b43/scratchpad/"
def img(name): return "data:image/jpeg;base64," + base64.b64encode(open(S + name, "rb").read()).decode()
rows = json.load(open(S + "ud-rows.json"))

# Daily downloads chart, axis cut at 30 so the paid days stay visible; cut bars are marked.
W, H, L, B, T = 760, 250, 34, 40, 18
cap = 30
n = len(rows); bw = (W - L - 8) / n
y = lambda v: T + (H - T - B) * (1 - min(v, cap) / cap)
parts = []
fx0 = L + bw * [r[0] for r in rows].index("2026-10-10"); fx1 = L + bw * ([r[0] for r in rows].index("2026-10-31") + 1)
parts.append(f'<rect x="{fx0:.1f}" y="{T-6}" width="{fx1-fx0:.1f}" height="{H-B-T+6}" class="freeband"/>')
parts.append(f'<text x="{(fx0+fx1)/2:.1f}" y="{T+8}" class="bandlabel" text-anchor="middle">Free, Oct 10–31 ($0 proceeds every day)</text>')
for t in (0, 10, 20, 30):
    parts.append(f'<line x1="{L}" x2="{W-8}" y1="{y(t):.1f}" y2="{y(t):.1f}" class="grid"/><text x="{L-6}" y="{y(t)+4:.1f}" class="tick" text-anchor="end">{t}</text>')
for i, (day, u, p, imp, v) in enumerate(rows):
    x = L + i * bw + 1.5; top = y(u)
    cls = "bar free" if "2026-10-10" <= day <= "2026-10-31" else "bar paid"
    parts.append(f'<rect x="{x:.1f}" y="{top:.1f}" width="{bw-3:.1f}" height="{H-B-top:.1f}" class="{cls}"><title>{day}: {u} downloads, {v} page views, {imp:,} impressions</title></rect>')
    if u > cap:
        parts.append(f'<path d="M{x-1:.1f} {top+9:.1f} l{(bw-1)/2:.1f} -5 l{(bw-1)/2:.1f} 5" class="cut"/><text x="{x+(bw-3)/2:.1f}" y="{top-4:.1f}" class="vlabel" text-anchor="middle">{u}</text>')
    d = datetime.date.fromisoformat(day)
    if d.day in (1, 10, 20):
        parts.append(f'<text x="{x+(bw-3)/2:.1f}" y="{H-B+16}" class="tick" text-anchor="middle">{d.strftime("%b")} {d.day}</text>')
ix = [r[0] for r in rows].index("2026-11-09"); ax = L + ix * bw + bw
parts.append(f'<text x="{ax:.1f}" y="{y(14):.1f}" class="note" text-anchor="middle">Apple Ads: 11k and 20k</text><text x="{ax:.1f}" y="{y(14)+14:.1f}" class="note" text-anchor="middle">impressions, 1 and 2 downloads</text>')
ix10 = L + [r[0] for r in rows].index("2026-10-10") * bw
parts.append(f'<text x="{ix10+bw*2.6:.1f}" y="{y(cap)+30:.1f}" class="note">X post by an Arabic deals account, Oct 10</text>')
chart = f'<svg viewBox="0 0 {W} {H}" role="img" aria-label="Undirect daily first-time downloads, October 1 to November 17">{"".join(parts)}</svg>'

def bench(label, p25, p50, p75, app, applabel, scale):
    sx = lambda v: 4 + v / scale * 92
    return f'''<div class="bench"><div class="benchname">{label}</div>
<div class="track"><span class="iqr" style="left:{sx(p25):.1f}%;width:{sx(p75)-sx(p25):.1f}%"></span><span class="med" style="left:{sx(p50):.1f}%"></span><span class="you" style="left:{sx(app):.1f}%"></span></div>
<div class="benchnums"><span>middle half of peers {p25}%–{p75}%, median <b>{p50}%</b></span><span class="youlabel">{applabel} {app}%</span></div></div>'''

html = open(S + "page_template.html").read()
html = (html.replace("{{CHART}}", chart)
            .replace("{{BENCH_PAID}}", bench("Paid Utilities apps", 0, 0.21, 0.80, 0.13, "Cutling", 13))
            .replace("{{BENCH_FREE}}", bench("Free Utilities apps", 1.13, 3.82, 12.41, 2.99, "Undirect, in its free week", 13))
            .replace("{{CUT_LIVE}}", img("cut-1.6.0-iphone1.jpg")).replace("{{CUT_NEXT}}", img("cut-1.6.1-iphone1.jpg"))
            .replace("{{CUT_MOCK}}", img("cut-mock.jpg")).replace("{{UD_LIVE}}", img("ud-before.jpg")).replace("{{UD_MOCK}}", img("ud-mock.jpg")))
open(S + "page/conversion-change-set.html", "w").write(html)
print(len(html))
