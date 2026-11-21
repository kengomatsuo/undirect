import json, os, sys, subprocess, glob, shutil
W=os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0,W)
from zones import Z, unsafe_fraction, where
OUT=sys.argv[1]
os.makedirs(f"{OUT}/sheets",exist_ok=True); os.makedirs(f"{OUT}/worst",exist_ok=True)
CONF=0.5; LARGE=40; FRAC=0.25
def boxes(fr):
    return [b for b in fr["boxes"] if b["c"]>=CONF and len(b["t"].strip())>=2]
def analyse(key, zone):
    z=Z[zone]; data=json.load(open(f"{W}/ocr/{key}.json")); n=len(data)
    per=[]
    for i,fr in enumerate(data):
        hits=[]
        for b in boxes(fr):
            f=unsafe_fraction(z,b["x"],b["y"],b["w"],b["h"])
            if f>=FRAC: hits.append(dict(t=b["t"],frac=round(f,2),large=b["h"]>=LARGE,where=where(z,b["x"],b["y"],b["w"],b["h"]),box=[round(b["x"]),round(b["y"]),round(b["w"]),round(b["h"])],area=b["w"]*b["h"]*f))
        per.append(dict(i=i,t=i/2,hits=hits))
    any_=[p for p in per if p["hits"]]; lg=[p for p in per if any(h["large"] for h in p["hits"])]
    end=[p for p in per if p["t"]>=per[-1]["t"]-3 and any(h["large"] for h in p["hits"])]
    score=lambda p: sum(h["area"]*(4 if h["large"] else 1) for h in p["hits"])
    worst=max(per,key=score)
    return dict(key=key,zone=zone,frames=n,pct_any=round(100*len(any_)/n),pct_large=round(100*len(lg)/n),end_large=bool(end),worst=dict(t=worst["t"],i=worst["i"],hits=sorted(worst["hits"],key=lambda h:-h["area"])[:6]),flags=[bool(p["hits"]) for p in per],flags_large=[any(h["large"] for h in p["hits"]) for p in per])
def sheet(r):
    key,zone=r["key"],r["zone"]; ov=f"{W}/overlays/{zone}.png"
    tdir=f"{W}/thumbs/{key}-{zone}"; shutil.rmtree(tdir,ignore_errors=True); os.makedirs(tdir)
    subprocess.run(["ffmpeg","-v","error","-framerate","2","-i",f"{W}/frames/{key}/%04d.jpg","-i",ov,"-filter_complex","[0][1]overlay=0:0,scale=120:213","-q:v","3",f"{tdir}/%04d.jpg"],check=True)
    files=sorted(glob.glob(f"{tdir}/*.jpg"))
    red=[f for f,l in zip(files,r["flags_large"]) if l]; orange=[f for f,a,l in zip(files,r["flags"],r["flags_large"]) if a and not l]
    for fs,col in ((red,"red"),(orange,"orange")):
        if fs: subprocess.run(["mogrify","-fill","none","-stroke",col,"-strokewidth","6","-draw","rectangle 3,3 116,209"]+fs,check=True)
    n=len(files); rows=(n+19)//20
    tile=f"{tdir}/tile.png"
    subprocess.run(["ffmpeg","-v","error","-y","-framerate","2","-i",f"{tdir}/%04d.jpg","-vf",f"tile=20x{rows}:padding=2:color=0x111111","-frames:v","1",tile],check=True)
    font="/System/Library/Fonts/Helvetica.ttc"
    head=["magick","-size",f"{60+20*120+21*2}x26","xc:#111","-font",font,"-pointsize","15","-fill","#ddd"]
    for c in range(20): head+=["-annotate",f"+{60+c*122+30}+19",f"+{c/2:.1f}s"]
    subprocess.run(head+[f"{tdir}/head.png"],check=True)
    left=["magick","-size",f"60x{rows*122*213//120+2}","xc:#111","-font",font,"-pointsize","15","-fill","#ddd"]
    for i in range(rows): left+=["-annotate",f"+6+{i*215+110}",f"{i*10}s"]
    subprocess.run(left+[f"{tdir}/left.png"],check=True)
    title=f"{key} under {zone} UI. Red border: subtitle or headline text (>=40 px) under a covered or gradient band. Orange: smaller text only. Time = row + column."
    subprocess.run(["magick","(","-size",f"{60+20*122+2}x40","xc:#111","-font",font,"-pointsize","20","-fill","white","-annotate","+10+28",title,")","(",f"{tdir}/head.png",")","(",f"{tdir}/left.png",tile,"+append",")","-background","#111","-append","-quality","62",f"{OUT}/sheets/{key}--{zone}.jpg"],check=True)
    i=r["worst"]["i"]; d=[]
    for h in r["worst"]["hits"]:
        x,y,w,hh=h["box"]; d+=["-draw",f"rectangle {x},{y} {x+w},{y+hh}"]
    subprocess.run(["magick",f"{W}/frames/{key}/{i+1:04d}.jpg",ov,"-composite","-fill","none","-stroke","#00e5ff","-strokewidth","5"]+d+["-resize","540x","-quality","80",f"{OUT}/worst/{key}--{zone}.jpg"],check=True)
combos=json.load(open(sys.argv[2] if len(sys.argv)>2 else f"{W}/combos.json"))
res=[]
for key,zone in combos:
    r=analyse(key,zone); sheet(r); res.append(r)
    print(key,zone,r["pct_any"],r["pct_large"],r["end_large"],r["worst"]["t"],[h["t"] for h in r["worst"]["hits"]][:3],flush=True)
json.dump(res,open(f"{OUT}/results.json","w"),ensure_ascii=False,indent=1)
