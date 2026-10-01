#!/usr/bin/env python3
"""Fetch competitor App Store product pages (apps.apple.com) per storefront: name, subtitle, description head. Output data/pages.json"""
import json,re,html,urllib.request,concurrent.futures as cf,datetime,time,sys
APPS={'AdBlock Pro':1018301773,'AdGuard':1047223162,'1Blocker':1365531024,'Wipr 2':1662217862,'uBlock Origin Lite':6745342698,'Adblock Plus':1028871868,'Halt':1529362535,'Poper Blocker':6743758947,'Popup Blocker (Di Tomase)':1592907593,'Direct - Remove Redirection':1672738777,'Undirect':6810513194}
APPS.update(json.load(open('data/extra_ids.json')) if __import__('os').path.exists('data/extra_ids.json') else {})
CC=['us','gb','de','jp','fr','br','kr','cn','id','in','es','it','nl','ru']
def get(a):
    n,i,c=a
    u=f'https://apps.apple.com/{c}/app/id{i}'
    for t in range(3):
        try:
            s=urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15'}),timeout=30).read().decode('utf8','ignore')
            m=re.search(r'<script type="application/json" id="serialized-server-data">(.*?)</script>',s,re.S)
            j=json.loads(m.group(1)); dd=j['data'][0]['data']
            sub=(dd.get('lockup') or {}).get('subtitle')
            def longest(o):
                best=''
                if isinstance(o,str): return o
                it=o.values() if isinstance(o,dict) else (o if isinstance(o,list) else [])
                for v in it:
                    x=longest(v)
                    if len(x)>len(best): best=x
                return best
            desc=longest(dd['shelfMapping'].get('description',{}))
            h1=re.search(r'<h1[^>]*>(.*?)</h1>',s,re.S)
            cl=lambda x: re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>','',x.group(1)))).strip() if x else None
            return (n,c,{'h1':cl(h1),'subtitle':sub,'desc':desc[:700]})
            return (n,c,{'title':cl(title),'h1':cl(h1),'subtitle':cl(sub),'desc':(cl(desc) or '')[:260]})
        except Exception as e:
            err=str(e); time.sleep(2)
    return (n,c,{'err':err})
jobs=[(n,i,c) for n,i in APPS.items() for c in CC]
out={'collected':datetime.date.today().isoformat(),'pages':{}}
with cf.ThreadPoolExecutor(5) as ex:
    for n,c,r in ex.map(get,jobs): out['pages'].setdefault(n,{})[c]=r
json.dump(out,open('data/pages.json','w'),ensure_ascii=False,indent=1)
