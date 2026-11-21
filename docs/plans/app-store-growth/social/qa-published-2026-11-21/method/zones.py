# Platform zones on a 1080x1920 frame. Sources in the report (README.md).
# safe: list of (x0,y0,x1,y1) rectangles whose union is the area no UI or scrim covers.
# top/bottom: gradient band heights (the guide's unsafe top/bottom margins, where the scrim sits).
Z = {
 # TikTok In-Feed Standard LTR template, measured by ManyPixels (scaled 720x1280 -> 1080x1920)
 "tiktok": dict(top=240, bottom=660, safe=[(120,240,960,840),(120,840,780,1260)]),
 # Meta Ads Guide (Instagram Reels / Stories, Facebook Reels): 14% top, 35% bottom, 6% sides.
 # Right rail below y 840 at Google's 192 px: GUESS for Meta, which publishes no rail width.
 "reels":  dict(top=269, bottom=672, safe=[(65,269,1015,840),(65,840,888,1248)]),
 "fbreels":dict(top=269, bottom=672, safe=[(65,269,1015,840),(65,840,888,1248)]),
 "story":  dict(top=269, bottom=672, safe=[(65,269,1015,1248)]),
 # Google "Universal Video Ad Safe Zones", vertical 1080x1920: 288 top, 672 bottom, 48 left, 192 right.
 "shorts": dict(top=288, bottom=672, safe=[(48,288,888,1248)]),
 # Threads web player: no scrim, a mute chip only (measured in Chrome 2026-11-22).
 "threads":dict(top=0, bottom=0, safe=[(0,0,1080,1920)], blocks=[(895,1736,995,1836)]),
}
def unsafe_fraction(z, x, y, w, h, step=4):
    """Share of a box's area outside the safe union (or inside a block)."""
    tot=bad=0
    xs=range(int(x), int(x+w), step); ys=range(int(y), int(y+h), step)
    for yy in ys:
        for xx in xs:
            tot+=1
            inside=any(a<=xx<c and b<=yy<d for a,b,c,d in z["safe"])
            blocked=any(a<=xx<c and b<=yy<d for a,b,c,d in z.get("blocks",[]))
            if (not inside) or blocked: bad+=1
    return bad/tot if tot else 0
def where(z, x, y, w, h):
    cy=y+h/2; cx=x+w/2
    if z.get("blocks") and any(a<=cx<c and b<=cy<d for a,b,c,d in z["blocks"]): return "mute chip"
    if y < z["top"]: return "top bar and its gradient"
    if y+h > 1920-z["bottom"]: return "caption and its bottom gradient"
    if x+w > 780 and y+h > 840: return "right rail"
    return "side margin"
