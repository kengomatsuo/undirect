import subprocess, sys, glob, os
def fp(path, ts=(15,40,70,85)):
    out=[]
    for t in ts:
        b=subprocess.run(['ffmpeg','-v','error','-ss',str(t),'-i',path,'-frames:v','1','-vf','scale=27:48,format=gray','-f','rawvideo','-'],capture_output=True).stdout
        out.append(b)
    return out
def diff(a,b):
    s=n=0
    for x,y in zip(a,b):
        if len(x)!=len(y) or not x: return 999
        s+=sum(abs(p-q) for p,q in zip(x,y)); n+=len(x)
    return s/n
H=os.path.expanduser('~')
cands=sorted(glob.glob(H+'/Repositories/cutling-promo/out/*/explainer-*-portrait.mp4')+glob.glob(H+'/Repositories/cutling-promo/out/explainer-*-portrait.mp4')+glob.glob(H+'/Repositories/undirect-promo/wire/out/*/explainer2-*-portrait.mp4')+glob.glob(H+'/Repositories/undirect-promo/wire/out/explainer2-*-portrait.mp4'))
cf={c:fp(c) for c in cands}
D=sys.argv[1]
for f in sorted(glob.glob(D+'/*.mp4')):
    if not os.path.basename(f).startswith(('tt-','yt-','fb-')): continue
    p=fp(f); r=sorted((diff(p,cf[c]),c) for c in cf)
    print(os.path.basename(f), '->', r[0][1].replace(H,'~'), round(r[0][0],1), '| next', round(r[1][0],1), r[1][1].replace(H,'~'))
