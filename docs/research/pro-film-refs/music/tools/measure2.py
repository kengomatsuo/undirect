"""measure2.py <dir with mp3/ and beats/> : each track's biggest lift after a quiet build, measured against reel 1's
tracks 1 and 2 (build 14 dB or more under the track, lift 15 dB or more, bass in the section, 65-100 BPM felt)."""
import sys, json, glob, os, subprocess, re
import numpy as np
SR=22050
def pcm(f):
    r=subprocess.run(['ffmpeg','-v','error','-i',f,'-ac','1','-ar',str(SR),'-f','s16le','-'],capture_output=True)
    return np.frombuffer(r.stdout,dtype=np.int16).astype(np.float32)/32768
def db(x): return float(10*np.log10(np.mean(x*x)+1e-10)) if len(x) else -100.0
def kdb(x):
    # a rough ear weighting for a phone: high-pass at 150 Hz (first order, twice) before the level
    X=np.fft.rfft(x); f=np.fft.rfftfreq(len(x),1/SR); H=(f/150)**2/(1+(f/150)**2); return float(10*np.log10(np.sum(np.abs(X*H)**2)/len(x)**2*2+1e-12))
rows=[]; d=sys.argv[1]
for bj in sorted(glob.glob(f'{d}/beats/*.json')):
    name=os.path.basename(bj)[:-5]
    try: b=json.load(open(bj))
    except Exception: continue
    x=pcm(f'{d}/mp3/{name}.mp3'); dur=len(x)/SR
    if dur<45: continue
    bp=b['beatPeriod']
    if not bp or bp<0.2: continue  # the beat tracker found no tempo
    n=min([4,6,8,12,16],key=lambda n:abs(n*bp-2.9)); U=n*bp
    full=db(x); h=int(SR*0.01); e=np.array([np.mean(x[i:i+h]**2) for i in range(0,len(x)-h,h)],dtype=np.float64)
    seg=lambda a,c: x[max(0,int(a*SR)):max(0,int(c*SR))]
    best=None; w=30
    c=np.concatenate([[0],np.cumsum(e)]); L=len(c)-1
    N2=int(2*U/0.01)
    for i in range(N2+int(0.2*U/0.01)+2, len(e)-N2-w-3):
        a=10*np.log10(max(c[min(i+w,L)]-c[i],0)/w+1e-10); p=10*np.log10(max(c[i]-c[i-w],0)/w+1e-10)
        if a-p<6: continue
        t=i*0.01
        pre=10*np.log10(max(c[i-2]-c[i-N2],0)/(2*U/0.01-2)+1e-10); post=10*np.log10(max(c[min(i+N2,L)]-c[i],0)/(2*U/0.01)+1e-10)
        if pre-full<-34: continue
        sc=(post-pre)+0.3*min(a-p,20)
        if best is None or sc>best[0]: best=(sc,t,post-pre,pre-full,post-full)
    if not best: continue
    t=best[1]
    build=db(seg(max(0,t-4*U),t-0.1))-full
    X=np.abs(np.fft.rfft(seg(t,t+2*U)))**2; fr=np.fft.rfftfreq(len(seg(t,t+2*U)),1/SR); low=float(10*np.log10(X[(fr>=20)&(fr<90)].sum()/X[fr>=20].sum()+1e-9))
    cent=float((np.sqrt(X)*fr).sum()/np.sqrt(X).sum())
    klift=kdb(seg(t,t+2*U))-kdb(seg(t-2*U,t-0.1))
    sustain=db(seg(t+2*U,t+4*U))-db(seg(t,t+2*U)) if t+4*U<dur else 0
    bpm=b['bpm']; felt=bpm/2 if bpm>120 else bpm
    rows.append(dict(key=name,bpm=round(bpm,1),felt=round(felt,1),U=round(U,3),lift=round(float(t),2),lift_db=round(float(best[2]),1),klift=round(klift,1),build=round(build,1),section=round(float(best[4]),1),low=round(low,1),cent=round(cent),sustain=round(sustain,1),dur=round(dur),early=round(float(t-4*U),1)))
ok=lambda r: bool(r['lift_db']>=14 and r['build']<=-11 and r['low']>=-6 and r['sustain']>-4)
rows.sort(key=lambda r:(not ok(r),-r['klift']))
json.dump(rows,open(f'{d}/measure2.json','w'),indent=0)
for r in rows[:int(sys.argv[2]) if len(sys.argv)>2 else 30]:
    print(f"{'OK ' if ok(r) else '   '}{r['key'][:26]:26} bpm {r['bpm']:5} U {r['U']:5} lift@{r['lift']:6} +{r['lift_db']:4} k+{r['klift']:4} build {r['build']:5} low {r['low']:5} cent {r['cent']:4} sus {r['sustain']:4} start {r['early']}")
