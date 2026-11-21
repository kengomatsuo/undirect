import sys, subprocess, numpy as np
SR=11025
def pcm(f):
    r=subprocess.run(['ffmpeg','-v','error','-i',f,'-ac','1','-ar',str(SR),'-f','s16le','-'],capture_output=True)
    return np.frombuffer(r.stdout,dtype=np.int16).astype(np.float32)/32768
for spec in sys.argv[1:]:
    f,D,U=spec.split(','); D=float(D); U=float(U); x=pcm(f); full=10*np.log10(np.mean(x*x)+1e-10)
    st=D-4*U; out=[]; lows=[]
    step=U/4
    for i in range(-2,32):
        a=st+i*step; seg=x[max(0,int(a*SR)):max(0,int((a+step)*SR))]
        if a<0 or len(seg)<10: out.append(' ..'); continue
        v=10*np.log10(np.mean(seg*seg)+1e-10)-full
        X=np.abs(np.fft.rfft(seg))**2; fr=np.fft.rfftfreq(len(seg),1/SR); lo=10*np.log10(X[(fr>=20)&(fr<90)].sum()/X[fr>=20].sum()+1e-9)
        out.append(f'{v:3.0f}'); lows.append(lo)
    print(f.split('/')[-1][:26].ljust(26), f'D={D:.2f} U={U:.2f}', '|'.join(' '.join(out[k:k+4]) for k in range(2,34,4)), ' pre:',' '.join(out[:2]))
