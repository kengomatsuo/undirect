import sys, subprocess, json, numpy as np
SR=22050
def pcm(f):
    r=subprocess.run(['ffmpeg','-v','error','-i',f,'-ac','1','-ar',str(SR),'-f','s16le','-'],capture_output=True)
    return np.frombuffer(r.stdout,dtype=np.int16).astype(np.float32)/32768
out=[]
for spec in sys.argv[1:]:
    key,f,bj,D,U=spec.split('|'); D=float(D); U=float(U); x=pcm(f); b=json.load(open(bj))
    h=int(SR*0.01); e=np.array([np.mean(x[i:i+h]**2) for i in range(0,len(x)-h,h)])
    w=30; best=None
    for i in range(int((D-0.6*U)/0.01), int((D+0.9*U)/0.01)):
        a=10*np.log10(e[i:i+w].mean()+1e-10); p=10*np.log10(e[i-w:i].mean()+1e-10)
        if best is None or a-p>best[0]: best=(a-p,i*0.01)
    on=best[1]
    full=10*np.log10(np.mean(x*x)+1e-10)
    lv=lambda a,c: round(float(10*np.log10(np.mean(x[max(0,int(a*SR)):int(c*SR)]**2)+1e-10)-full),1)
    low=lambda a,c: (lambda X,fr: round(float(10*np.log10(X[(fr>=20)&(fr<90)].sum()/X[fr>=20].sum()+1e-9)),1))(np.abs(np.fft.rfft(x[int(a*SR):int(c*SR)]))**2, np.fft.rfftfreq(int(c*SR)-int(a*SR),1/SR))
    r=dict(key=key,bpm=b['bpm'],beat=round(b['beatPeriod'],4),U=round(U,3),lift_at=round(on,2),jump=round(float(best[0]),1),build=lv(max(0,on-4*U),on-0.1),section=lv(on,on+2*U),lift_db=round(lv(on,on+2*U)-lv(max(0,on-2*U),on-0.1),1),
           low_share_section=low(on,on+2*U),duration=round(len(x)/SR,1),sections=len(b['sections']),lifts_found=len(b['drops']))
    out.append(r); print(r)
json.dump(out,open('shortlist-measure.json','w'),indent=1)
