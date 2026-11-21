# analyse.py <dir with mp3/ and beats/> : the biggest lifts on downbeats and how a 6-beat film would sit on each
import sys, json, glob, os, subprocess
import numpy as np
SR = 11025
def pcm(f):
    r = subprocess.run(['ffmpeg','-v','error','-i',f,'-ac','1','-ar',str(SR),'-f','s16le','-'],capture_output=True)
    return np.frombuffer(r.stdout, dtype=np.int16).astype(np.float32)/32768
def db(x): return float(10*np.log10(np.mean(x*x)+1e-10)) if len(x) else -100.0
def band_share(x, lo, hi):
    X = np.abs(np.fft.rfft(x))**2; f = np.fft.rfftfreq(len(x), 1/SR)
    return float(10*np.log10(X[(f>=lo)&(f<hi)].sum()/X[f>=20].sum()+1e-12))
rows = []
d = sys.argv[1]
for bj in sorted(glob.glob(f'{d}/beats/*.json')):
    name = os.path.basename(bj)[:-5]
    try: b = json.load(open(bj))
    except Exception: continue
    x = pcm(f'{d}/mp3/{name}.mp3'); dur = len(x)/SR
    if dur < 40: continue
    bp = b['beatPeriod']
    n = min([4, 6, 8, 12, 16], key=lambda n: abs(n*bp-2.9)); U = n*bp
    seg = lambda a, c: x[max(0,int(a*SR)):max(0,int(c*SR))]
    full = db(x); low = band_share(x, 20, 90)
    X = np.abs(np.fft.rfft(x[:SR*90])); f = np.fft.rfftfreq(len(x[:SR*90]),1/SR); cent = float((X*f).sum()/X.sum())
    best = []
    for D in b.get('downbeats', []):
        if D - 2.2*U < 0 or D + 2*U > dur: continue
        pre = db(seg(D-2*U, D-0.15)); pre0 = db(seg(D-4*U, D-2*U)) if D-4*U >= 0 else -99
        post = db(seg(D, D+U)); post2 = db(seg(D+U, D+2*U)); edge = db(seg(D, D+0.4)) - db(seg(D-0.5, D-0.1))
        if pre - full < -32: continue  # silence before is no build
        best.append(dict(name=name, bpm=round(b['bpm'],1), beats=n, U=round(U,3), D=round(D,3), start=round(D-4*U,2), film=round(6*U,1),
                         pre0=round(pre0-full,1), pre=round(pre-full,1), post=round(post-full,1), post2=round(post2-full,1), lift=round(post-pre,1), edge=round(edge,1),
                         low=round(low,1), cent=round(cent), dur=round(dur), isdrop=any(abs(D-q)<0.3 for q in b.get('drops',[])), nsec=len(b.get('sections',[]))))
    best.sort(key=lambda r: -(r['lift']+0.5*max(0,r['edge'])))
    keep = []
    for r in best:
        if all(abs(r['D']-k['D'])>12 for k in keep): keep.append(r)
        if len(keep) == 2: break
    rows += keep
rows.sort(key=lambda r: -r['lift'])
json.dump(rows, open(f'{d}/lifts.json','w'), indent=0)
for r in rows: print(f"{r['name'][:30]:30} bpm {r['bpm']:5} n{r['beats']:2} U {r['U']:5} D {r['D']:7} st {r['start']:6} film {r['film']:4} | pre0 {r['pre0']:6} pre {r['pre']:6} post {r['post']:5} p2 {r['post2']:5} | lift {r['lift']:5} edge {r['edge']:5} low {r['low']:6} cent {r['cent']:5} {'DROP' if r['isdrop'] else ''}")
