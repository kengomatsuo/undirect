#!/usr/bin/env python3
"""Live App Store search per storefront (MZStore search JSON, the endpoint the App Store client uses).
For each (country, term): ordered result ids, top-15 name/subtitle/ratingCount, and Undirect's rank (id 6810513194).
Output data/search2.json."""
import json,time,urllib.parse,urllib.request,datetime,os,sys
UND='6810513194'
SF={'US':143441,'GB':143444,'AU':143460,'CA':143455,'DE':143443,'FR':143442,'IT':143450,'ES':143454,'NL':143452,'JP':143462,'KR':143466,'CN':143465,'TW':143470,'HK':143463,'RU':143469,'BR':143503,'PT':143453,'MX':143468,'ID':143476,'IN':143467,'TR':143480,'PL':143478,'SA':143479,'IL':143491,'TH':143475,'VN':143471,'MY':143473,'SE':143456,'NO':143457,'DK':143458,'FI':143447,'CZ':143489,'SK':143496,'HU':143482,'RO':143487,'GR':143448,'HR':143494,'SI':143499,'UA':143492,'PK':143477,'AE':143481}
Q=json.load(open('data/queries.json'))
path='data/search2.json'
out=json.load(open(path)) if os.path.exists(path) else {'collected':datetime.date.today().isoformat(),'res':{}}
def call(c,t):
    u='https://search.itunes.apple.com/WebObjects/MZStore.woa/wa/search?clientApplication=Software&media=software&term='+urllib.parse.quote(t)
    for i in range(4):
        for h in (f'{SF[c]},29',f'{SF[c]}-2,29',f'{SF[c]}-1,29'):
            rq=urllib.request.Request(u,headers={'X-Apple-Store-Front':h,'User-Agent':'iTunes/12.9 (Macintosh; OS X 10.15) AppleWebKit/605'})
            try: return json.load(urllib.request.urlopen(rq,timeout=30))
            except Exception as e: time.sleep(1)
        time.sleep(4*(i+1))
for c,ts in Q.items():
    for t in ts:
        k=f'{c}|{t}'
        if out['res'].get(k): continue
        d=call(c,t)
        if not d: print('FAIL',k,flush=True); continue
        ids=[r['id'] for r in d['pageData']['bubbles'][0]['results']] if d.get('pageData',{}).get('bubbles') else []
        res=d.get('storePlatformData',{}).get('native-search-lockup',{}).get('results',{})
        top=[]
        for i in ids[:15]:
            x=res.get(i,{}); ur=x.get('userRating') or {}
            top.append({'id':i,'name':x.get('name'),'sub':x.get('subtitle'),'n':ur.get('ratingCount'),'r':ur.get('value')})
        out['res'][k]={'n':len(ids),'und':(ids.index(UND)+1) if UND in ids else None,'top':top}
        json.dump(out,open(path,'w'),ensure_ascii=False,indent=1)
        time.sleep(1.2)
print('ok')
