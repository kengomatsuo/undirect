import subprocess, sys, os
sys.path.insert(0, os.path.dirname(__file__)); from zones import Z
W=os.path.dirname(os.path.abspath(__file__))
def grad(top,bottom):
    c=[]
    if top: c+=["(", "-size", f"1080x{top}", "gradient:rgba(0,0,0,0.62)-rgba(0,0,0,0)", ")", "-geometry", "+0+0", "-composite"]
    if bottom: c+=["(", "-size", f"1080x{bottom}", "gradient:rgba(0,0,0,0)-rgba(0,0,0,0.78)", ")", "-geometry", f"+0+{1920-bottom}", "-composite"]
    return c
def ui(p):
    d=[]; wf="rgba(255,255,255,0.92)"
    circ=lambda cx,cy,r: ["-draw", f"circle {cx},{cy} {cx+r},{cy}"]
    rect=lambda a,b,c,e: ["-draw", f"roundrectangle {a},{b} {c},{e} 10,10"]
    if p=="tiktok":
        d+=rect(330,135,520,170)+rect(580,130,760,175)+circ(1000,152,26)
        for cy in (900,1060,1210,1350,1490): d+=circ(995,cy,46)
        d+=circ(995,1650,42)+rect(40,1590,360,1635)+rect(40,1660,770,1695)+rect(40,1712,640,1747)+rect(40,1775,500,1805)
    elif p in ("reels","fbreels"):
        d+=rect(40,110,230,165)+circ(1010,137,30)
        for cy in (1150,1300,1450,1580): d+=circ(1015,cy,40)
        d+=rect(980,1680,1050,1750)+circ(80,1600,38)+rect(135,1583,400,1618)+rect(420,1578,560,1622)+rect(40,1665,820,1700)+rect(40,1735,520,1765)
    elif p=="shorts":
        d+=circ(900,140,30)+circ(1010,140,30)
        for cy in (1100,1250,1400,1550): d+=circ(1010,cy,44)
        d+=rect(975,1660,1045,1730)+circ(80,1640,36)+rect(135,1622,420,1658)+rect(440,1618,580,1662)+rect(40,1700,830,1740)+rect(40,1760,600,1795)+rect(40,1820,480,1850)
    elif p=="story":
        d+=rect(20,28,1060,36)+circ(80,100,34)+rect(130,82,420,118)+rect(40,1780,880,1860)+circ(980,1820,36)
    elif p=="threads":
        d+=circ(945,1786,50)
    return ["-fill", wf]+d
def outline(p):
    z=Z[p]; c=["-fill","none","-stroke","rgba(255,40,40,0.9)","-strokewidth","4"]
    for a,b,e,f in z["safe"]:
        if (a,b,e,f)!=(0,0,1080,1920): c+=["-draw", f"rectangle {a},{b} {e-1},{f-1}"]
    return c+["-stroke","none"]
for p,z in Z.items():
    cmd=["magick","-size","1080x1920","xc:none"]+grad(z["top"],z["bottom"])+ui(p)+outline(p)+[f"{W}/overlays/{p}.png"]
    subprocess.run(cmd, check=True)
    print(p)
