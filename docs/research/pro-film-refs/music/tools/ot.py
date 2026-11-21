"""OpenTracks (formerly DOVA-SYNDROME) listing crawler: queries -> items.json (id, title, composer, tags, query)."""
import re, json, html, time, urllib.request, urllib.parse
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15'
def get(u):
    return urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':UA}),timeout=40).read().decode('utf-8','replace')
Q=[('ヒップホップ',[]),('HIPHOP',[]),('Hip Hop',[]),('Trap',[]),('重低音',[]),('シネマティック',[]),('トレーラー',[]),('',['m16','r17']),('',['m37','r17']),('',['m32','r34']),('',['m16','r30']),('',['m37','m32']),('',['m16','m37']),('',['m34','r17']),('',['m21','m37'])]
items={}
for kw,tags in Q:
    for page in range(1,9):
        p=[('sort','2'),('kind','1'),('duration','0'),('loop','0'),('sheet','0'),('vocal','0'),('downloaded','0'),('played','0'),('followed','0'),('favorited','0'),('keywords',kw),('page',str(page))]+[('tags_'+t[0],t) for t in tags]
        try: h=get('https://opentracks.com/bgm?'+urllib.parse.urlencode(p))
        except Exception as e: print('ERR',kw,tags,page,e); break
        blocks=re.split(r'(?=<[^>]+data-private-bgm=")',h)[1:]
        n=0
        for b in blocks:
            i=re.search(r'data-private-bgm="(\d+)"',b).group(1)
            t=re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>','|',b)))
            m=re.search(r'\d{4}\.\d\d\.\d\d \|+([^|]+)\|+by\|([^|]+)\|',t)
            if not m: continue
            n+=1
            if i in items: continue
            dl=re.search(r'Tracks? \|+ ([\d:]+)~? \|+(\d+)\|',t)
            items[i]=dict(id=i,title=m.group(1).strip(),composer=m.group(2).strip(),text=t[t.find('by|'):][:420],query=f'{kw} {"+".join(tags)}'.strip(),dur=dl.group(1) if dl else '',downloads=int(dl.group(2)) if dl else 0)
        print(kw,tags,page,n,len(items),flush=True)
        if n==0: break
        time.sleep(0.25)
json.dump(list(items.values()),open('items.json','w'),ensure_ascii=False,indent=0)
