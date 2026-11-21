#!/usr/bin/env python3
"""measure.py <video> <slug> <outdir>  -> <outdir>/<slug>/{m.json, sheet-*.jpg, f-*.jpg, transcript.txt}"""
import sys, os, re, json, subprocess, statistics as st
video, slug, outroot = sys.argv[1], sys.argv[2], sys.argv[3]
WORK = os.path.dirname(os.path.abspath(__file__))
out = os.path.join(outroot, slug); os.makedirs(out, exist_ok=True)
def run(cmd, **kw): return subprocess.run(cmd, capture_output=True, text=True, **kw)
pr = json.loads(run(["ffprobe","-v","error","-show_streams","-show_format","-of","json",video]).stdout)
vs = [s for s in pr["streams"] if s["codec_type"]=="video"][0]
has_audio = any(s["codec_type"]=="audio" for s in pr["streams"])
dur = float(pr["format"]["duration"]); num,den = vs["r_frame_rate"].split("/"); fps = float(num)/float(den)
W,H = vs["width"], vs["height"]
m = {"slug":slug,"duration":round(dur,2),"width":W,"height":H,"fps":round(fps,2)}
# --- per-frame scene score ---
sc = os.path.join(out,"scene.txt")
run(["ffmpeg","-v","error","-y","-i",video,"-an","-vf",f"scale=320:-2,select='gte(scene,0)',metadata=print:file={sc}","-f","null","-"])
times, scores = [], []
t=None
for line in open(sc):
    a = re.search(r"pts_time:([0-9.]+)", line)
    if a: t=float(a.group(1)); continue
    b = re.search(r"scene_score=([0-9.]+)", line)
    if b and t is not None: times.append(t); scores.append(float(b.group(1)))
def cuts_at(th):
    c=[]
    for t,s in zip(times,scores):
        if s>th and (not c or t-c[-1]>0.12) and t>0.05: c.append(t)
    return c
cuts = cuts_at(0.30); cuts20 = cuts_at(0.20)
def cuts_adaptive():
    c=[]; n=len(scores)
    for i,(t,x) in enumerate(zip(times,scores)):
        if x<0.05 or t<0.05: continue
        nb=scores[max(0,i-12):i]+scores[i+1:i+13]
        if not nb: continue
        med=sorted(nb)[len(nb)//2]
        if x>=max(nb) and x>=6*max(med,0.002) and (not c or t-c[-1]>0.12): c.append(t)
    return c
cutsA = cuts_adaptive()
def shot_stats(c):
    b=[0.0]+c+[dur]; L=[round(b[i+1]-b[i],3) for i in range(len(b)-1)]; L=[x for x in L if x>0.02]
    q=st.quantiles(L,n=4) if len(L)>=4 else [min(L),st.median(L),max(L)]
    return {"shots":len(L),"shots_per_s":round(len(L)/dur,3),"median":round(st.median(L),2),"p25":round(q[0],2),"p75":round(q[2],2),"min":round(min(L),2),"max":round(max(L),2)}
m["cuts_030"]=shot_stats(cuts); m["cuts_020"]=shot_stats(cuts20); m["cuts_adaptive"]=shot_stats(cutsA); m["cut_times_adaptive"]=[round(c,2) for c in cutsA]
cuts=cutsA
noncut=[s for s in scores if s<=0.2]
m["motion"]={"mean_change":round(st.mean(noncut),5),"median_change":round(st.median(noncut),5),
  "still_share_lt_0.001":round(sum(1 for s in noncut if s<0.001)/len(noncut),3),
  "still_share_lt_0.003":round(sum(1 for s in noncut if s<0.003)/len(noncut),3)}
# longest still run (s<0.001)
runlen=0;best=0;prev=None
for t,s in zip(times,scores):
    if s<0.001:
        if prev is None: prev=t
        best=max(best,t-prev)
    else: prev=None
m["motion"]["longest_still_s"]=round(best,2)
# --- colour ---
ss = run(["ffmpeg","-v","error","-i",video,"-an","-vf","fps=2,scale=160:-2,signalstats,metadata=print:file=-","-f","null","-"]).stdout
ya=[float(x) for x in re.findall(r"signalstats.YAVG=([0-9.]+)",ss)]; sa=[float(x) for x in re.findall(r"signalstats.SATAVG=([0-9.]+)",ss)]
if ya: m["colour"]={"luma_mean":round(st.mean(ya),1),"sat_mean":round(st.mean(sa),1),"dark_share_Y_lt_50":round(sum(1 for y in ya if y<50)/len(ya),2),"bright_share_Y_gt_170":round(sum(1 for y in ya if y>170)/len(ya),2)}
# --- audio ---
if has_audio:
    wav=os.path.join(out,"a.wav"); run(["ffmpeg","-v","error","-y","-i",video,"-vn","-ac","1","-ar","16000",wav])
    e=run(["ffmpeg","-hide_banner","-nostats","-i",video,"-vn","-af","ebur128=peak=true:framelog=quiet","-f","null","-"]).stderr
    tail=e[e.rfind("Summary:"):]
    g=lambda p: (float(re.search(p,tail).group(1)) if re.search(p,tail) else None)
    m["loudness"]={"I_LUFS":g(r"I:\s+(-?[0-9.]+) LUFS"),"LRA":g(r"LRA:\s+([0-9.]+) LU"),"peak_dBFS":g(r"Peak:\s+(-?[0-9.]+) dBFS")}
    sd=run(["ffmpeg","-hide_banner","-nostats","-i",video,"-vn","-af","silencedetect=noise=-45dB:d=0.2","-f","null","-"]).stderr
    sil=[(float(a),float(b)) for a,b in zip(re.findall(r"silence_start: (-?[0-9.]+)",sd),re.findall(r"silence_end: ([0-9.]+)",sd))]
    m["silences"]=[[round(a,2),round(b,2)] for a,b in sil]
    def rms(af):
        r=run(["ffmpeg","-hide_banner","-nostats","-i",video,"-vn","-af",af+"astats=measure_overall=RMS_level:measure_perchannel=0","-f","null","-"]).stderr
        x=re.findall(r"RMS level dB: (-?[0-9.]+|-inf)",r); return float(x[-1]) if x and x[-1]!="-inf" else None
    full=rms(""); low=rms("lowpass=f=90,"); hi=rms("highpass=f=5000,")
    m["spectrum"]={"rms_full":full,"rms_lt90":low,"low_gap_dB":round(full-low,1) if full and low else None,"rms_gt5k":hi,"air_gap_dB":round(full-hi,1) if full and hi else None}
    b=run(["bun",os.path.expanduser("~/.claude/skills/product-video/scripts/beats.ts"),wav])
    try:
        B=json.loads(b.stdout); beats=B["beats"]; bp=B["beatPeriod"]
        m["music"]={"bpm":round(B["bpm"],1),"drops":[round(x,2) for x in B["drops"]],"sections":[[round(s["start"],1),round(s["end"],1),round(s["energy"],2),s["label"]] for s in B["sections"]]}
        if cuts and beats:
            tol=0.08; on=sum(1 for c in cuts if min(abs(c-x) for x in beats)<=tol)
            m["music"]["cuts_on_beat"]=round(on/len(cuts),2); m["music"]["chance_level"]=round(min(1,2*tol/bp),2)
            ons=B["onsets"]; on2=sum(1 for c in cuts if min(abs(c-x) for x in ons)<=0.06)
            m["music"]["cuts_with_audio_onset"]=round(on2/len(cuts),2)
            m["music"]["onsets_per_s"]=round(len(ons)/dur,2)
    except Exception as ex: m["music"]={"error":str(ex)[:200]}
    # RMS envelope per second (dB) for locating lifts
    env=run(["ffmpeg","-v","error","-i",wav,"-af","asetnsamples=16000,astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level:file=-","-f","null","-"]).stdout
    ev=[x for x in re.findall(r"RMS_level=(-?[0-9.]+|-inf)",env)]
    m["rms_per_s"]=[ (round(float(x)) if x!="-inf" else -99) for x in ev]
    w=run(["whisper-cli","-m",os.path.expanduser("~/.cache/whisper/ggml-base.en.bin"),"-f",wav,"-np"])
    open(os.path.join(out,"transcript.txt"),"w").write(w.stdout)
    words=len(re.sub(r"\[[^\]]*\]|\([^)]*\)","",re.sub(r"\[\d\d:[^\]]*\]","",w.stdout)).split())
    m["speech_words"]=words
    os.remove(wav)
# --- frames: one per shot (midpoint), max 60; min 12 ---
b=[0.0]+cuts+[dur]; mids=[(b[i]+b[i+1])/2 for i in range(len(b)-1) if b[i+1]-b[i]>0.1]
if len(mids)>60: mids=[mids[int(i*len(mids)/60)] for i in range(60)]
if len(mids)<12: mids=sorted(set(mids+[dur*(i+0.5)/12 for i in range(12)]))
mids=[min(x,dur-0.2) for x in mids]
frames=[]
for i,t in enumerate(mids):
    f=os.path.join(out,f"f-{i:02d}-{t:06.2f}.jpg")
    run(["ffmpeg","-v","error","-y","-ss",f"{t:.2f}","-i",video,"-frames:v","1","-q:v","4","-vf","scale='if(gt(iw,ih),640,-2)':'if(gt(iw,ih),-2,640)'",f]); 
    if os.path.exists(f): frames.append(f)
m["frame_times"]=[round(t,2) for t in mids]
land = W>=H
cw,ch,cols = (320,180,6) if land else (180,320,10)
per=36 if land else 40
for k in range(0,len(frames),per):
    run(["bash",os.path.join(WORK,"tile.sh"),os.path.join(out,f"sheet-{k//per}.jpg"),str(cw),str(ch),str(cols)]+frames[k:k+per])
# --- OCR type size ---
o=run([os.path.join(WORK,"ocr")]+frames).stdout
lines=[l.split("\t") for l in o.splitlines() if l.count("\t")>=3]
big=[(float(l[1]),l[3],os.path.basename(l[0])) for l in lines]
m["ocr"]={"lines":len(big),"max_text_h":round(max([x[0] for x in big],default=0),3),
  "headline_lines":[[x[2][2:11],x[0],x[1]] for x in sorted(big,key=lambda x:-x[0])[:14]]}
open(os.path.join(out,"ocr.tsv"),"w").write(o.replace(out+"/",""))
json.dump(m,open(os.path.join(out,"m.json"),"w"),indent=1)
print(slug, dur, m["cuts_030"], m.get("music",{}).get("bpm"), m.get("loudness"))
