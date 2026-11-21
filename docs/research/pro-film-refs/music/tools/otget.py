"""Fetch OpenTracks previews: ids on argv or from a json list -> mp3/<id>.mp3 and meta/<id>.json (title, composer, conditions)."""
import sys, re, json, html, os, time, urllib.request
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15'
def get(u,raw=False):
    b=urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':UA,'Referer':'https://opentracks.com/'}),timeout=90).read()
    return b if raw else b.decode('utf-8','replace')
os.makedirs('mp3',exist_ok=True); os.makedirs('meta',exist_ok=True)
for i in sys.argv[1:]:
    if os.path.exists(f'mp3/{i}.mp3') and os.path.getsize(f'mp3/{i}.mp3')>50000: continue
    try:
        h=get(f'https://opentracks.com/bgm/detail/{i}')
        src=html.unescape(re.search(r'<source src="([^"]+)"',h).group(1))
        t=re.search(r'『([^』]+)』',h).group(1)
        c=re.search(r'/creator/detail/(\d+)"[^>]*>\s*([^<]+)<',h)
        open(f'mp3/{i}.mp3','wb').write(get(src,True))
        json.dump(dict(id=i,title=t,composer=c.group(2).strip() if c else '',creator=c.group(1) if c else '',page=f'https://opentracks.com/bgm/detail/{i}'),open(f'meta/{i}.json','w'),ensure_ascii=False)
    except Exception as e: print('ERR',i,e)
    time.sleep(0.2)
