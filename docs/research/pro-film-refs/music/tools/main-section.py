"""For a track with no single lift to cut to: find its main section (the first run of 12 s or more within 4 dB of its loud level) and
a 20 s listening window that starts 4 s before it, on a downbeat, so the entry into the section is heard.
    uv run --with numpy python main-section.py <dir with src/<key>.mp3 and beats/<key>.json> <key> ...   -> JSON lines"""
import sys, json, subprocess
import numpy as np
SR = 11025
d = sys.argv[1]
for key in sys.argv[2:]:
    r = subprocess.run(['ffmpeg', '-v', 'error', '-i', f'{d}/src/{key}.mp3', '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True)
    x = np.frombuffer(r.stdout, dtype=np.int16).astype(np.float32) / 32768
    b = json.load(open(f'{d}/beats/{key}.json'))
    dur = len(x) / SR
    h = SR // 2  # half-second levels, smoothed over 3 s
    e = np.array([np.mean(x[i:i + h] ** 2) for i in range(0, len(x) - h, h)], dtype=np.float64)
    lv = 10 * np.log10(np.convolve(e, np.ones(6) / 6, mode='same') + 1e-10)
    loud = np.percentile(lv, 90)
    on = lv >= loud - 4
    runs, i = [], 0
    while i < len(on):
        if on[i]:
            j = i
            while j < len(on) and on[j]:
                j += 1
            runs.append((i, j))
            i = j
        else:
            i += 1
    # a beat that drops out for a bar is still the same section: join runs less than 2 s apart
    joined = []
    for r in runs:
        if joined and (r[0] - joined[-1][1]) * 0.5 <= 2:
            joined[-1] = (joined[-1][0], r[1])
        else:
            joined.append(r)
    runs = joined
    # the first time the track reaches its loud level and stays there 12 s or more; failing that, its longest loud run
    long_runs = [r for r in runs if (r[1] - r[0]) * 0.5 >= 12]
    best = long_runs[0] if long_runs else max(runs, key=lambda r: r[1] - r[0])
    s = best[0] * 0.5
    # the level just before the section: how much of an entry there is to hear
    before = float(lv[max(0, best[0] - 8):max(1, best[0] - 1)].mean()) if best[0] > 2 else None
    downs = [t for t in b.get('downbeats', [])] or [0.0]
    lead = 4.0 if s >= 4 else s
    start = min(downs, key=lambda t: abs(t - (s - lead)))
    start = max(0.0, min(start, dur - 20.5))
    bpm = b['bpm']
    print(json.dumps(dict(key=key, bpm=round(bpm, 1), duration=round(dur, 1), main_from=round(s, 1), main_to=round(best[1] * 0.5, 1),
                          entry_dB=None if before is None else round(float(loud - before), 1), window=[round(float(start), 2), 20.0], main_in_clip=round(max(0.0, s - start), 1), loud_runs=[[round(a * 0.5), round(c * 0.5)] for a, c in runs if c - a >= 6])))
