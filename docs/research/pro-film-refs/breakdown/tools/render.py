# Renders the sheets and the table for the beat breakdown.
#   python render.py <dir of full-res frames %04d.jpg> <mono wav> <out dir>
# Frames: ffmpeg -i film.mp4 -q:v 2 -start_number 0 hr/%04d.jpg ; audio: ffmpeg -i film.mp4 -vn -ac 1 -ar 44100 a44.wav
import sys, os, json
import numpy as np
from PIL import Image, ImageDraw, ImageFont
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from events import EVENTS, MUSIC, FPS, BEAT, T0, grid, sub
hr, wav, out = sys.argv[1], sys.argv[2], sys.argv[3]
F = lambda s: ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', s)
def frame(i, w, crop=None):
    im = Image.open(f'{hr}/{i:04d}.jpg')
    if crop:
        W, H = im.size; im = im.crop((int(crop[0]*W), int(crop[1]*H), int(crop[2]*W), int(crop[3]*H)))
    return im.resize((w, round(w*im.size[1]/im.size[0])))
def where(t):
    b, bt, o = grid(t); o8, p8 = sub(t, 2)
    if abs(o) <= 55: tag, col = 'on the beat', (40,150,70)
    elif abs(o8) <= 55 and p8 == 1: tag, col = 'on the off-beat', (200,120,0)
    else: tag, col = 'between', (120,120,120)
    return b, bt, o, o8, p8, tag, col
BG, INK = (250,250,248), (20,20,20)

# 1. contact sheet: one frame per picture change
cuts = [e for e in EVENTS if e[1] == 'cut' or e[0] in (413, 747, 850)]
tw, th, lab, cols = 384, 216, 62, 5
rows = (len(cuts)+cols-1)//cols
im = Image.new('RGB', (cols*tw, 70 + rows*(th+lab)), BG); d = ImageDraw.Draw(im)
d.text((12, 8), 'iPhone 17 Pro: Smart Group Selfies (Apple)  |  one frame per cut: the first frame of each shot', fill=INK, font=F(22))
d.text((12, 40), 'bar.beat on a 134.98 BPM grid, beat 1 of bar 1 at 0.068 s. Offset = cut minus nearest beat; minus means the cut comes before the beat. One frame = 33 ms.', fill=(90,90,90), font=F(15))
for k, (f, kind, st, what, how) in enumerate(cuts):
    x, y = (k%cols)*tw, 70 + (k//cols)*(th+lab)
    im.paste(frame(f, tw), (x, y)); d.rectangle([x, y, x+tw-1, y+th-1], outline=(200,200,200))
    t = f/FPS; b, bt, o, o8, p8, tag, col = where(t)
    d.text((x+8, y+th+5), f'#{k+1}   {t:.3f} s   frame {f}', fill=INK, font=F(16))
    d.text((x+8, y+th+27), f'bar {b}.{bt}  {o:+.0f} ms', fill=col, font=F(19))
    d.text((x+200, y+th+31), tag if tag != 'on the off-beat' else f'off-beat {o8:+.0f} ms', fill=col, font=F(14))
im.save(f'{out}/contact-sheet-cuts.jpg', quality=90)

# 2. beat sheet: a row per bar, a tile per eighth note; red frame = a cut fell in the eighth before this tile
tw, th, mg, hd = 212, 119, 200, 64
cutframes = [e[0] for e in cuts if e[0] > 0] + [532, 557, 583, 610, 637, 664, 691, 718]
moves = {e[0]: e for e in EVENTS if e[1] in ('move', 'text', 'hit')}
im = Image.new('RGB', (mg + 8*tw, hd + 17*(th+22)), BG); d = ImageDraw.Draw(im)
d.text((12, 6), 'Beat sheet: each row is one bar (1.778 s), each tile the frame showing at that eighth note. Red edge: a cut landed since the tile before it, with the cut time. Orange dot: a move, type or hit started.', fill=INK, font=F(15))
for c in range(8):
    d.text((mg + c*tw + 6, 36), f'beat {c//2+1}' if c%2 == 0 else '  and', fill=INK if c%2 == 0 else (130,130,130), font=F(18))
notes = {1: 'music starts', 2: 'drums drop out\nbeats 3-4', 3: 'groove in', 10: 'breakdown bar\nsilent last eighth', 11: 'THE DROP', 17: 'final hit'}
prev = -1
for bar in range(1, 18):
    y = hd + (bar-1)*(th+22)
    d.text((10, y+8), f'bar {bar}', fill=INK, font=F(24)); d.text((10, y+40), f'{T0+(bar-1)*4*BEAT:.2f} s', fill=(110,110,110), font=F(15))
    if bar in notes: d.text((10, y+62), notes[bar], fill=(170,40,40), font=F(15))
    for c in range(8):
        t = T0 + ((bar-1)*8 + c)*BEAT/2; f = int(round(t*FPS)); x = mg + c*tw
        if f > 905: continue
        im.paste(frame(min(f, 1049), tw-4), (x+2, y+2))
        got = [cf for cf in cutframes if prev < cf <= f]
        if got:
            d.rectangle([x, y, x+tw-1, y+th+1], outline=(220,30,30), width=4)
            d.text((x+6, y+th+3), 'cut ' + ', '.join(f'{cf/FPS:.2f}' for cf in got), fill=(220,30,30), font=F(13))
        mv = [m for m in moves if prev < m <= f]
        if mv:
            d.ellipse([x+tw-26, y+6, x+tw-8, y+24], fill=(240,140,0), outline=(255,255,255))
            d.text((x+tw-96, y+th+3), f'{moves[mv[0]][1]} {mv[0]/FPS:.2f}', fill=(200,110,0), font=F(13))
        prev = f
im.save(f'{out}/beat-sheet.jpg', quality=88)

# 3. motion events: six frames across each
ev = [e for e in EVENTS if e[2]]
tw, th, mg = 290, 163, 180
im = Image.new('RGB', (mg + 6*tw, 40 + len(ev)*(th+26)), BG); d = ImageDraw.Draw(im)
d.text((12, 8), 'Every motion event, six frames from its first frame to its rest. Left: start time, nearest bar.beat and offset; then where it comes to rest.', fill=INK, font=F(16))
for r, (f, kind, st, what, how) in enumerate(ev):
    y = 40 + r*(th+26); t = f/FPS; b, bt, o = grid(t); sb, sbt, so = grid(st/FPS)
    d.text((8, y+6), f'{kind} {t:.3f} s', fill=INK, font=F(18))
    d.text((8, y+32), f'starts {b}.{bt} {o:+.0f} ms', fill=(200,110,0), font=F(15))
    d.text((8, y+54), f'rests {sb}.{sbt} {so:+.0f} ms', fill=(40,150,70), font=F(15))
    d.text((8, y+76), f'{st-f} frames', fill=(110,110,110), font=F(15))
    crop = (0.2,0.3,0.8,0.7) if kind == 'text' else ((0.3,0.3,0.7,0.7) if f == 850 else None)
    for c, fi in enumerate(np.linspace(f-1 if f not in (413, 850) else f, st, 6).round().astype(int)):
        x = mg + c*tw; tile = frame(int(fi), tw-4, crop); im.paste(tile, (x+2, y+2))
        d.text((x+6, y+th+3), f'frame {fi}  {fi/FPS:.3f} s', fill=(90,90,90), font=F(13))
im.save(f'{out}/motion-events.jpg', quality=88)

# 4. timeline against the audio
import matplotlib; matplotlib.use('Agg')
import matplotlib.pyplot as plt, librosa
y, sr = librosa.load(wav, sr=22050, mono=True)
rms = librosa.feature.rms(y=y, frame_length=512, hop_length=128)[0]; tt = np.arange(len(rms))*128/sr
fig, axs = plt.subplots(5, 1, figsize=(22, 15)); span = 16*BEAT
for r, ax in enumerate(axs):
    a = T0 + r*span - 0.1; b_ = a + span + 0.2 if r < 4 else 30.4
    m = (tt >= a) & (tt <= b_); ax.fill_between(tt[m], 0, rms[m]/rms.max(), color='#9aa7b8', lw=0)
    n = 0
    while T0 + n*BEAT <= 30.2:
        t = T0 + n*BEAT
        if a <= t <= b_:
            ax.axvline(t, color='k', lw=2.2 if n%4 == 0 else 0.6, alpha=0.9 if n%4 == 0 else 0.45)
            ax.text(t+0.01, 1.07, f'{n//4+1}.{n%4+1}', fontsize=13 if n%4 == 0 else 9, weight='bold' if n%4 == 0 else 'normal')
        n += 1
    for f, kind, st, what, how in EVENTS:
        t = f/FPS
        if not a <= t <= b_: continue
        col = {'cut': '#d81e1e', 'move': '#f08c00', 'text': '#1f6fd0', 'hit': '#8a2be2'}[kind]
        ax.axvline(t, color=col, lw=2.4, ymax=0.8, ls='-' if kind == 'cut' else '--')
        if st: ax.plot([t, st/FPS], [0.86, 0.86], color=col, lw=5, solid_capstyle='butt')
        ax.text(t+0.012, 0.62 if kind == 'cut' else 0.9, f'{kind}\n{grid(t)[2]:+.0f} ms', color=col, fontsize=9, va='top' if kind == 'cut' else 'bottom')
    for f in (557, 583, 610, 637, 664, 691, 718):
        if a <= f/FPS <= b_: ax.axvspan(f/FPS, (f + (2 if f == 718 else 3 if f == 557 else 4))/FPS, color='#d81e1e', alpha=0.15, ymax=0.8)
    ax.set_xlim(a, b_); ax.set_ylim(0, 1.25); ax.set_yticks([]); ax.set_xlabel('seconds' if r == 4 else '')
axs[0].set_title('Smart Group Selfies: level of the sound track, beat lines (thick = beat 1), cuts in red, moves in orange with a bar to where they rest, type in blue, hits in purple. Number = ms from the nearest beat.', fontsize=13, loc='left', pad=22)
plt.tight_layout(); plt.savefig(f'{out}/timeline.png', dpi=80); plt.close()

# 5. the table, as markdown
L = ['| # | Time (s) | Frame | Kind | Nearest bar.beat | Offset (ms) | From nearest eighth (ms) | Comes to rest | On screen | How type enters |', '|---|---|---|---|---|---|---|---|---|---|']
for k, (f, kind, st, what, how) in enumerate(EVENTS):
    t = f/FPS; b, bt, o = grid(t); o8, p8 = sub(t, 2)
    rest = ''
    if st: sb, sbt, so = grid(st/FPS); rest = f'{st/FPS:.3f} s, {sb}.{sbt} {so:+.0f} ms'
    L.append(f'| {k+1} | {t:.3f} | {f} | {kind} | {b}.{bt} | {o:+.0f} | {o8:+.0f} ({"beat" if p8 == 0 else "off-beat"}) | {rest} | {what} | {how} |')
open(f'{out}/events-table.md', 'w').write('\n'.join(L) + '\n')
json.dump([{'frame': f, 'time': f/FPS, 'kind': k, 'bar': grid(f/FPS)[0], 'beat': grid(f/FPS)[1], 'offset_ms': round(grid(f/FPS)[2]), 'rest_frame': st, 'on_screen': w, 'type_entry': h} for f, k, st, w, h in EVENTS], open(f'{out}/events.json', 'w'), indent=1)
print('ok', len(cuts), 'cut tiles', len(ev), 'motion events')
