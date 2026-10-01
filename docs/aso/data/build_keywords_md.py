#!/usr/bin/env python3
"""Writes keywords.md from proposal.json, Apple's table and the probe data."""
import json,sys,os
from collections import defaultdict
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import build_proposal as B
P=json.load(open('proposal.json'))
S=json.load(open('data/search2.json'))['res']
rows=B.rows
inv={}
for loc,labs in B.APPLE.items():
    for l in labs: inv[l]=loc
g=defaultdict(list)
for c in rows:
    if len(c)<3: continue
    d=inv.get(c[2],'?')
    a=sorted(inv[x.strip()] for x in (c[3].split(',') if len(c)>3 and c[3] else []) if x.strip() in inv)
    g[(d,tuple(a))].append(c[0])
L=[]
w=L.append
w("# Keyword targets per storefront\n")
w("Every term below traces to a measurement in `data/` (M1 type-ahead, M2 live search, M3 competitor pages) or to a rule in `sources.md`. "
  "Result counts are how many apps the live App Store search returned for that exact query on 2026-10-01 (cap about 250). "
  "A small n means few apps carry all the words, so a name or subtitle that holds them can reach the top. "
  "Type-ahead gives presence and order, not volume; no search-popularity score was available, so volume is stated as a signal, never as a number.\n")
w("## 1. What people type\n")
w("The terms people begin to type, by storefront, for this product family (from `data/hints.json`):\n")
w("| Storefront | Typed (type-ahead order) | Where Undirect's own words stand |")
w("| --- | --- | --- |")
rowsT=[
("US, GB, AU, CA","pop up blocker, popup blocker, safari pop up blocker, block pop up ads, pop up ad blocker, safari ad blocker, ad blocker, adblock, tab blocker, stop ads, remove ads, redirect blocker (US and GB only)","'popunder', 'pop under', 'stop redirect', 'redirect safari', 'unwanted tab', 'tab hijack' return no type-ahead; 'redirect' completes to 'redirect blocker' (US, GB, 2nd place)"),
("DE","popup blocker, pop up blocker, werbeblocker, werbung blockieren, safari erweiterungen","'weiterleitung' completes only to SMS-forwarding apps"),
("FR","bloqueur de pub, bloquer publicité safari, popup blocker, anti pub, bloqueur safari","'redirection' completes to a maps app and to 'Direct - Remove Redirection'"),
("IT","blocca pubblicità, blocca popup, popup blocker, bloccare pubblicità safari","'reindirizzamento' returns 1 app"),
("ES, MX","bloqueador de anuncios (safari), bloqueo de ventanas emergentes, bloquear publicidad en safari, anti anuncios para safari","'bloqueo de ventanas emergentes' returns 1 to 2 apps"),
("NL","adblocker safari, pop-up, advertentieblokkering","'omleiding' no completion"),
("JP","広告ブロック (+ 無料, safari), ポップアップ ブロック, ポップアップブロッカー, safari 広告ブロック","'リダイレクト' returns 21 apps"),
("KR","광고 차단, 광고차단, 팝업차단, 사파리 광고차단","'리다이렉트' returns 11 apps"),
("CN","弹窗拦截, 广告拦截, 广告屏蔽, 去除广告, safari 广告拦截器","'重定向' completes only to a redirect-engine app"),
("TW, HK","彈出視窗攔截器, 廣告攔截, 廣告封鎖, safari 廣告攔截器","'重新導向' returns 10 apps"),
("RU","блокировщик рекламы (safari, бесплатно), блокировка рекламы в safari, антиреклама, блокировщик всплывающих окон","'перенаправление' returns 2 apps"),
("BR, PT","bloquear anúncios (no safari), bloqueador de pop ups, bloqueador de anuncios, anti anúncio","'redirecionamento' returns shop apps"),
("ID, MY","blokir iklan, pop up blocker, popup blocker, anti iklan, adblock","'pengalihan' returns 10 apps"),
("TR","reklam engelleyici, pop up blocker","'açılır pencere engelleyici' returns 8 apps"),
("PL","blokada reklam, blokowanie reklam, pop up blocker","'blokada wyskakujących okien' returns 0"),
("SA, AE","مانع الاعلانات, حاجب اعلانات, حجب الاعلانات, ازالة الاعلانات","'نوافذ منبثقة' returns 11 apps"),
("VN","chặn quảng cáo (safari), popup","'chặn popup' returns 42 apps"),
("TH","บล็อคโฆษณา, โฆษณา","'ป้องกันโฆษณา' returns 14 apps"),
("SE, NO, DK, FI","pop up blockerare, blockera annonser, annonsblockering; 'popup blocker' (NO, DK, FI)","'reklameblokering' 12, 'mainosesto' 17"),
("CZ, SK, HU, RO, GR, HR, SI, UA, IL","only 'adblock' and the local word for ad blocker complete ('reklám blokkoló', 'חוסם פרסומות', 'блок реклами')","HR and SI 'blokiranje reklam/oglasov' return 0 apps"),
("IN, PK and all Indic scripts","only Latin: ad blocker for safari, adblock pro for safari, pop up blocker","no Indic-script completion exists"),
]
for r in rowsT: w("| "+" | ".join(r)+" |")
w("\nTwo facts drive everything after this. First, 'pop up blocker' and 'popup blocker' return the same leaders (identical first six in the US, identical first four in DE, the same four in GB in a different order), so the name needs only one spelling. "
  "Second, 'adblock' completes in 38 of the 41 probed storefronts (all but CN, TW, HK) and returns 229 to 250 apps in each of the 35 storefronts where it was searched: the head of the market is closed to an app with no ratings, and Undirect is not a general ad blocker.\n")
w("## 2. Which of Undirect's fields each storefront indexes\n")
w("From Apple's table (A4, 175 storefronts), mapped to the 50 locales Undirect ships. 'Default' is the language the storefront shows when the app has it; 'additional' are the extra languages the practitioner sources (P4 to P6) say are also searched. "
  "Only the default row is certain; the rest is group B.\n")
w("| Storefronts | Default | Additional | Count | Example storefronts |")
w("| --- | --- | --- | --- | --- |")
for (d,a),v in sorted(g.items(),key=lambda kv:-len(kv[1])):
    w(f"| {len(v)} | {d} | {', '.join(a) or ''} | {len(v)} | {', '.join(v[:8])}{' ...' if len(v)>8 else ''} |")
w("")
w("Reading it: **en-GB is the default for 135 storefronts and an additional language for 37 more, so 172 of 175 storefronts see en-GB's name, subtitle and keywords** "
  "(the three that do not are the US, Japan and Canada). en-GB is the field set that matters most for reach outside the US. "
  "es-MX is the default of 16 storefronts and additional in 3 (Belize, Uruguay, US). fr-FR is the default in 4 and additional in 28 (Francophone Africa, Cambodia, Laos, Guyana, Switzerland, Luxembourg, Belgium, Egypt and others). "
  "Arabic is additional in 17 storefronts and in the US. India lists 11 Indic languages as additional on top of en-GB.\n")
w("## 3. Rules for allocating words\n")
for t in [
"**Words combine only inside one locale** (P4, P5, P6). The name and subtitle that make 'safari popup blocker' must sit in the same locale as the keyword field that holds the rest. So en-US and en-GB each carry the full English set; no storefront indexes both, so the repeat costs nothing.",
"**AU and NZ index en-AU and en-GB together**, so en-AU holds words en-GB does not. Canada indexes en-CA and fr-CA, never en-US, so en-CA repeats the English set.",
"**A word counted once is counted once**: never repeat a word between name, subtitle and keywords of one locale (A1, P3). The generator in `data/build_proposal.py` fails a locale that does.",
"**The US gets nine extra 100-byte fields** (ar, zh-Hans, zh-Hant, fr, ko, pt-BR, ru, es-MX, vi). Undirect's English term set is only about 65 bytes, so en-US holds all of it. Do not pad those nine fields with English filler; they stay native for their own storefronts. The unused space is reserve for terms the first month of rank data proves.",
"**Japan's additional language is en-US.** Its English words come from the en-US field, not en-GB.",
"**Visible name and subtitle stay in the storefront's language** (P5): a German reader sees the de-DE name. Where the Latin phrase 'popup blocker' is what locals type (DE, NO, DK, FI, CZ, SK, HU, RO, HR, SI, PL, TR, ID, MS, VI, GR), the name uses it. Where a native phrase wins (JA, KO, ZH, RU, UK, FR, IT, ES, PT, NL, SV), the name carries that phrase and native review decides the exact form.",
"**Keyword fields hold single words**, one form each (A1). Phrases come from combining a name word with a keyword word in the same locale.",
"**Left out on purpose**: 'adblock' and 'adblocker' (competing app names AdBlock Pro, Adblock Plus; A1 and 2.3.7 forbid competing app names and trademarks, and Undirect is not a general ad blocker), 'tracker', 'privacy', 'link', 'site', 'browser' (current copy; no type-ahead, loose intent: 'tracker blocker' returns call-blocking and AirTag apps), 'overlay' (photo apps), 'new tab' (new-tab-page apps), 'malware' (antivirus apps), 'free' and 'app' (A1).",
]: w("- "+t)
w("\n## 4. Per locale\n")
w("Name and keywords are final proposals; native review is still needed for any name that is not a Latin phrase. Subtitle and promo for non-English locales are specified, not written. "
  "'must contain' lists the words the native writer should place in the subtitle; the keyword field omits them. Bytes are UTF-8 bytes of the keyword field (limit 100). "
  "'Kind' says whether the change touches only the hidden keyword field or visible copy as well.\n")
w("| Locale | Primary / additional storefronts | Name | Subtitle must contain | Keywords (bytes) | Kind |")
w("| --- | --- | --- | --- | --- | --- |")
for c,e in sorted(P.items()):
    sub=e['subtitle'] if isinstance(e['subtitle'],str) else ', '.join(e['subtitle']['mustContain'])
    st=e['storefronts']; kind='keywords + visible' if e['change']['subtitle'] or e['change']['name'] else 'keywords only'
    w(f"| {c} | {len(st['primary'])} / {len(st['additional'])} | {e['name']} | {sub} | `{e['keywords']}` ({e['keywordBytes']}) | {kind} |")
w("\nEvidence for each locale is in `proposal.json` under `why`.\n")
w("## 5. Open queries Undirect can reach, by storefront\n")
w("Queries from M2 where fewer than 60 apps matched, which is where a name or subtitle holding the words can reach the top results quickly. "
  "The first result's rating count shows how entrenched the leader is.\n")
w("| Query | Apps matched | Top result (ratings) | Undirect rank today |")
w("| --- | --- | --- | --- |")
items=[]
for k,v in S.items():
    c,t=k.split('|',1)
    if v['n']<60 and v['top']:
        items.append((c,t,v['n'],v['top'][0],v['und']))
for c,t,n,tp,u in sorted(items):
    w(f"| {c}: {t} | {n} | {tp['name'].replace(chr(8211),'-')} ({tp['n']}) | {u if u else 'not listed'} |")
open('keywords.md','w').write('\n'.join(L)+'\n')
print('ok',len(L))
