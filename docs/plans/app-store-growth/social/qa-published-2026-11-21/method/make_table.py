import json, sys
OUT=sys.argv[1]
R={(r["key"],r["zone"]):r for r in json.load(open(f"{OUT}/results.json"))}
posts=json.load(open(sys.argv[2]))
def verdict(r): return "hide" if (r["pct_large"]>=5 or r["end_large"]) else "OK"
def worst(r):
    w=r["worst"]; m,s=divmod(w["t"],60)
    if not w["hits"]: return "nothing covered"
    seen=[]; 
    for h in w["hits"]:
        if h["where"] not in [x[1] for x in seen]: seen.append((h["t"],h["where"]))
    txt="; ".join(f'"{t[:40]}" under the {wh}' for t,wh in seen[:2])
    return f"{int(m)}:{s:04.1f} {txt}"
rows=[]
for plat,date,what,url,key,zone in posts:
    r=R[(key,zone)]; sheet=f"sheets/{key}--{zone}.jpg"
    rows.append(f"| {plat} | {date} | {what} | {url} | {r['pct_any']}% | {r['pct_large']}% | {worst(r)} | **{verdict(r)}** | [{key}--{zone}]({sheet}) |")
print("| Platform | Posted | Post | URL | Frames with any text covered | Frames with subtitle/headline-size text covered | Worst moment | Verdict | Sheet |")
print("|---|---|---|---|---|---|---|---|---|")
print("\n".join(rows))
