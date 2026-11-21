import sys, subprocess, numpy as np
SR=22050
f,a,c=sys.argv[1],float(sys.argv[2]),float(sys.argv[3])
r=subprocess.run(['ffmpeg','-v','error','-ss',str(a),'-t',str(c-a),'-i',f,'-ac','1','-ar',str(SR),'-f','s16le','-'],capture_output=True)
x=np.frombuffer(r.stdout,dtype=np.int16).astype(np.float32)/32768
h=int(SR*0.02); e=[10*np.log10(np.mean(x[i:i+h]**2)+1e-10) for i in range(0,len(x)-h,h)]
print(' '.join(f'{a+i*0.02:.2f}:{v:.0f}' for i,v in enumerate(e) if i%2==0))
