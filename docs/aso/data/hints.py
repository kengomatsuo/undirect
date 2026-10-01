#!/usr/bin/env python3
"""Collect App Store search hints (type-ahead suggestions) per storefront.
Endpoint: search.itunes.apple.com MZSearchHints, header X-Apple-Store-Front = <storefront id>-1,29.
Run date is stored in output. Results: data/hints.json"""
import json, re, sys, time, urllib.parse, urllib.request, concurrent.futures as cf, datetime
SF = {'US':143441,'GB':143444,'AU':143460,'CA':143455,'DE':143443,'FR':143442,'IT':143450,'ES':143454,'NL':143452,'JP':143462,'KR':143466,'CN':143465,'TW':143470,'HK':143463,'RU':143469,'BR':143503,'PT':143453,'MX':143468,'ID':143476,'IN':143467,'TR':143480,'PL':143478,'SA':143479,'IL':143491,'TH':143475,'VN':143471,'MY':143473,'SE':143456,'NO':143457,'DK':143458,'FI':143447,'CZ':143489,'SK':143496,'HU':143482,'RO':143487,'GR':143448,'HR':143494,'SI':143499,'UA':143492,'PK':143477,'AE':143481}
SEEDS = {
 'US':['pop up','popup','ad block','adblock','block ads','redirect','safari ext','safari block','block pop','stop pop','tab','privacy safari','no more ads'],
 'GB':['pop up','adblock','block ads','redirect','safari ext','popup'],
 'AU':['pop up','adblock','block ads','safari ext'],'CA':['pop up','adblock','block ads','safari ext'],
 'DE':['pop','werbeblocker','werbung block','weiterleitung','safari erw','adblock','popup'],
 'FR':['pop','bloqueur','bloquer pub','redirection','safari ext','adblock','popup'],
 'IT':['pop','blocco pubb','blocca pubb','adblock','reindirizz','safari est','popup'],
 'ES':['pop','bloqueador','bloquear anun','ventanas emerg','redirec','adblock','safari ext'],
 'NL':['pop','adblock','advertentie','reclame blok','omleiding','safari ext'],
 'JP':['ポップ','広告ブロック','広告 ブロ','リダイレクト','safari 拡張','adblock','ポップアップ ブロ'],
 'KR':['팝업','광고 차단','광고차단','리다이렉트','사파리 확장','adblock','광고 막'],
 'CN':['弹窗','广告拦截','广告屏蔽','拦截','safari 扩展','屏蔽广告','去广告'],
 'TW':['彈出','廣告封鎖','廣告攔截','擋廣告','封鎖廣告','safari 擴充'],
 'HK':['廣告封鎖','彈出','擋廣告'],
 'RU':['блок','блокировщик рек','всплывающ','реклама','редирект','adblock','safari расш'],
 'BR':['bloqueador','bloquear anún','pop up','redirecion','adblock','safari ext'],
 'PT':['bloqueador','bloquear anún','pop up','adblock'],
 'MX':['bloqueador','bloquear anun','ventanas emerg','adblock','pop up'],
 'ID':['pemblokir','blokir iklan','pop up','pengalihan','adblock','safari ekst'],
 'IN':['ad block','adblock','pop up','block ads','safari ext','विज्ञापन'],
 'TR':['reklam engel','açılır','pop up','yönlendirme','adblock','reklam'],
 'PL':['blokowanie reklam','blokada reklam','wyskakując','adblock','pop up'],
 'SA':['حظر','إعلانات','منبثقة','adblock','حجب الاعلانات','مانع'],
 'IL':['חוסם','פרסומות','חלונות','adblock'],
 'TH':['บล็อก','โฆษณา','ป๊อปอัพ','adblock','ป้องกันโฆษณา'],
 'VN':['chặn quảng cáo','chặn pop','quảng cáo','adblock','popup'],
 'MY':['sekat iklan','pop up','adblock','blok iklan'],
 'SE':['annons','adblock','popup','blockera','omdirigering'],
 'NO':['annonse','adblock','popup','blokker','omdirigering'],
 'DK':['reklame','adblock','popup','blokker','omdirigering'],
 'FI':['mainos','adblock','popup','esto','uudelleenohjaus'],
 'CZ':['blokování reklam','reklamy','adblock','vyskakovací','popup'],
 'SK':['blokovanie reklám','reklamy','adblock','vyskakovacie'],
 'HU':['reklám','adblock','felugró','blokkoló','popup'],
 'RO':['blocare reclame','reclame','adblock','pop-up','redirecț'],
 'GR':['διαφημίσεις','adblock','αποκλεισμός','pop up','παράθυρα'],
 'HR':['blokiranje reklama','reklame','adblock','skočni','popup'],
 'SI':['blokiranje oglasov','oglasi','adblock','pojavna','popup'],
 'UA':['блокувальник','реклам','adblock','спливаючі','блок'],
 'PK':['adblock','ad block','pop up','block ads'],
 'AE':['حظر','إعلانات','adblock','منبثقة'],
}
def hint(sf, term, tries=3):
    u='https://search.itunes.apple.com/WebObjects/MZSearchHints.woa/wa/hints?clientApplication=Software&term='+urllib.parse.quote(term)
    rq=urllib.request.Request(u,headers={'X-Apple-Store-Front':f'{sf}-1,29','User-Agent':'AppStore/3.0 iOS/17.0'})
    for i in range(tries):
        try:
            t=urllib.request.urlopen(rq,timeout=20).read().decode('utf8')
            return re.findall(r'<key>term</key>\s*<string>(.*?)</string>',t,flags=re.S)
        except Exception as e:
            time.sleep(1+i)
    return None
out={'collected':datetime.date.today().isoformat(),'hints':{}}
jobs=[(c,s) for c,ss in SEEDS.items() for s in ss]
def run(j):
    c,s=j; return c,s,hint(SF[c],s)
with cf.ThreadPoolExecutor(6) as ex:
    for c,s,h in ex.map(run,jobs):
        out['hints'].setdefault(c,{})[s]=h
json.dump(out,open('data/hints.json','w'),ensure_ascii=False,indent=1)
print('done',len(jobs))
