"""Scores Mixkit tracks for a sharp rise after a build, from the waveform file Mixkit publishes for each track
(https://assets.mixkit.co/music/<id>/<id>-waveform.json, one peak pair per 9600 samples), so hundreds can be screened
without downloading audio. Reads tracks.json ({id: {title, artist, ...}}) and wf/<id>.json; prints the best lifts.
    python3 -I mixkit-screen.py"""
import json
tr = json.load(open('tracks.json'))
res = []
for i, t in tr.items():
    try:
        d = json.load(open(f'wf/{i}.json'))
    except Exception:
        continue
    dt = d['samples_per_pixel'] / d['sample_rate']
    a = d['data']
    e = [max(abs(a[2 * k]), abs(a[2 * k + 1])) for k in range(len(a) // 2)]
    n = len(e)
    if n * dt < 50:
        continue
    w = max(1, int(1 / dt))
    s = [sum(e[max(0, k - w // 2):k + w // 2 + 1]) / len(e[max(0, k - w // 2):k + w // 2 + 1]) for k in range(n)]
    mx = sorted(s)[int(n * 0.95)]
    b6 = int(6 / dt)
    best = None
    for k in range(int(5 / dt), n - int(12 / dt)):
        bef = sum(s[k - b6:k]) / b6
        aft = sum(s[k:k + b6]) / b6
        if bef < 2 or aft < 0.8 * mx:
            continue  # silence before is no build; a rise that stays under the track's loud level is no lift
        sharp = (sum(s[k:k + w]) / w) / (sum(s[k - w:k]) / w + 0.5)
        sc = (aft / bef) * min(sharp, 3)
        if not best or sc > best[0]:
            best = (sc, k * dt, aft / bef)
    if best:
        res.append((best, i, t))
res.sort(key=lambda x: -x[0][0])
for b, i, t in res[:70]:
    print(f"{i:>5} score {b[0]:5.1f} lift at {b[1]:5.1f} s, {b[2]:.1f}x  {t['title']} | {t['artist']}")
