"""Builds the listening reel from tracks.json: for each track, the four film beats before its lift and the two after,
levelled to -16 LUFS, as an MP3 clip, plus one reel with a spoken number before each (macOS `say`).
    python3 -I reel.py <out-dir>      # downloads each track from its `url` into <out-dir>/src first"""
import json, os, re, subprocess, sys, urllib.request

here = os.path.dirname(os.path.abspath(__file__))
out = sys.argv[1]
os.makedirs(f'{out}/src', exist_ok=True)
T = json.load(open(f'{here}/../tracks.json'))
words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']
parts = []
for t in T:
    src = f"{out}/src/{t['key']}.mp3"
    if not os.path.exists(src):
        req = urllib.request.Request(t['url'], headers={'User-Agent': 'Mozilla/5.0'})
        open(src, 'wb').write(urllib.request.urlopen(req, timeout=120).read())
    st = max(0, t['lift'] - 4 * t['U'])
    dur = t['lift'] + 2 * t['U'] - st
    raw = f"{out}/raw-{t['n']}.wav"
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(st), '-t', str(dur), '-i', src, '-af', f'afade=t=in:d=0.25,afade=t=out:st={dur - 0.9:.2f}:d=0.9', '-ar', '48000', '-ac', '2', raw], check=True)
    m = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', raw, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
    tail = m[m.rfind('Summary:'):]
    i = float(re.search(r'I:\s+(-?[\d.]+) LUFS', tail).group(1))
    pk = float(re.search(r'Peak:\s+(-?[\d.]+) dBFS', tail).group(1))
    g = min(-16 - i, -1.5 - pk)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', raw, '-af', f'volume={g:.2f}dB', '-c:a', 'libmp3lame', '-b:a', '160k', f"{out}/{t['n']:02d}-{t['key']}.mp3"], check=True)
    subprocess.run(['say', '-v', 'Samantha', '-o', f"{out}/say.aiff", f"Track {words[t['n'] - 1]}. {t['title']}."], check=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{out}/say.aiff', '-af', 'volume=-4dB,apad=pad_dur=0.5', '-ar', '48000', '-ac', '2', f"{out}/say-{t['n']}.wav"], check=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', raw, '-af', f'volume={g:.2f}dB,apad=pad_dur=0.8', f"{out}/norm-{t['n']}.wav"], check=True)
    parts += [f"{out}/say-{t['n']}.wav", f"{out}/norm-{t['n']}.wav"]
    os.remove(raw)
open(f'{out}/list.txt', 'w').write(''.join(f"file '{os.path.abspath(p)}'\n" for p in parts))
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', f'{out}/list.txt', '-c:a', 'libmp3lame', '-b:a', '160k', f'{out}/music-reel.mp3'], check=True)
for p in parts + [f'{out}/list.txt', f'{out}/say.aiff']:
    os.remove(p)
