#!/usr/bin/env python3
"""Builds docs/aso/proposal.json and the storefront-index table used by keywords.md.
Run from docs/aso:  python3 data/build_proposal.py
Inputs: raw/loc_rows.json (Apple's App Store localizations table, fetched 2026-10-01),
        ../../Support/i18n/store/<code>.json (current copy).
Checks: keywords <= 100 UTF-8 bytes, name/subtitle <= 30 chars, promo <= 170 chars,
        no keyword repeats a word of the proposed name or finished subtitle, no duplicate terms."""
import json, glob, os, re, sys
from collections import defaultdict

ROOT = os.path.dirname(os.path.abspath(__file__)) + '/..'
STORE = ROOT + '/../../Support/i18n/store'
rows = json.load(open(ROOT + '/raw/loc_rows.json'))[1:]

APPLE = {  # Undirect locale -> Apple language label(s) used in the localizations table
 'ar-SA': ['Arabic'], 'bn-BD': ['Bangla'], 'ca': ['Catalan'], 'cs': ['Czech'], 'da': ['Danish'],
 'de-DE': ['German'], 'el': ['Greek'], 'en-AU': ['English (Australia)'], 'en-CA': ['English (Canada)'],
 'en-GB': ['English (U.K.)'], 'en-US': ['English (US)'], 'es-ES': ['Spanish (Spain)'],
 'es-MX': ['Spanish (Mexico)'], 'fi': ['Finnish'], 'fr-CA': ['French (Canada)'], 'fr-FR': ['French'],
 'gu-IN': ['Gujarati'], 'he': ['Hebrew'], 'hi': ['Hindi'], 'hr': ['Croatian'], 'hu': ['Hungarian'],
 'id': ['Indonesian'], 'it': ['Italian'], 'ja': ['Japanese'], 'kn-IN': ['Kannada'], 'ko': ['Korean'],
 'ml-IN': ['Malayalam'], 'mr-IN': ['Marathi'], 'ms': ['Malay'], 'nl-NL': ['Dutch'], 'no': ['Norwegian'],
 'or-IN': ['Odia'], 'pa-IN': ['Punjabi'], 'pl': ['Polish'], 'pt-BR': ['Portuguese (Brazil)'],
 'pt-PT': ['Portuguese (Portugal)'], 'ro': ['Romanian'], 'ru': ['Russian'], 'sk': ['Slovak'],
 'sl-SI': ['Slovenian'], 'sv': ['Swedish'], 'ta-IN': ['Tamil'], 'te-IN': ['Telugu'], 'th': ['Thai'],
 'tr': ['Turkish'], 'uk': ['Ukrainian'], 'ur-PK': ['Urdu'], 'vi': ['Vietnamese'],
 'zh-Hans': ['Chinese (Simplified)', 'Simplified Chinese'], 'zh-Hant': ['Chinese (Traditional)'],
}
def storefronts(loc):
    labs = APPLE[loc]; prim = []; add = []
    for c in rows:
        if len(c) < 3: continue
        iso, name, default = c[0], c[1], c[2]
        extra = [x.strip() for x in (c[3].split(',') if len(c) > 3 and c[3] else [])]
        if default in labs: prim.append(iso)
        if any(l in extra for l in labs): add.append(iso)
    return prim, add

# ---------------------------------------------------------------- proposal content
PROMO_EN = ("Switch Undirect on for a site from the toolbar button. It stops invisible click layers, "
            "pop-unders and rewritten links, and lists every address a page tried to open.")
PROMO_MEANING = ("Conversion copy only (promo text is not searchable). Say: switch it on per site from the toolbar "
                 "button; it stops invisible click layers, pop-unders and links rewritten mid-click; it lists every "
                 "address a page tried to open. No claim of general ad blocking.")
SUB_EN = "Stop Safari redirects & tabs"
NAME_EN = "Undirect: Popup Blocker"
KW_EN = {
 'en-US': "pop up,ads,block,iphone,ipad,mac,extension,hijack,popunder,window",
 'en-CA': "pop up,ads,block,iphone,ipad,mac,extension,hijack,popunder,window",
 'en-GB': "pop up,advert,ads,block,iphone,ipad,mac,extension,hijack,popunder,window",
 # AU and NZ index en-AU AND en-GB, so en-AU carries words en-GB does not.
 'en-AU': "browser,website,page,malicious,unwanted,annoying,secure,clean,scam",
}

# locale: (name, sub mustContain / meaning, keywords, why)
# name is final when the descriptor is a term Apple's type-ahead returned for that storefront; native review still needed.
def L(name, must, kw, why, sub_note=None):
    return dict(name=name, must=must, kw=kw, why=why, sub_note=sub_note)

NAT = {
 'de-DE': L("Undirect: Popup Blocker", ["Safari","Weiterleitung","Werbung"],
   "pop-up,blockieren,umleitung,erweiterung,tab,klick,iphone,mac,kapern",
   "DE type-ahead: 'popup blocker', 'pop up blocker'; 'werbung blockieren' returns only 65 apps, 'weiterleitung' 42 (SMS apps), so both are open."),
 'fr-FR': L("Undirect: Bloqueur de pop-up", ["Safari","redirection","onglet"],
   "popup,publicité,pub,bloquer,anti pub,extension,iphone,mac,détournement,fenêtre",
   "FR 'bloqueur de pop-up' returns 39 apps, top has 1 rating; 'bloquer publicité safari' 27 apps; type-ahead has 'anti pub', 'bloqueur safari'."),
 'fr-CA': L("Undirect: Bloqueur de pop-up", ["Safari","redirection","onglet"],
   "popup,publicité,pub,bloquer,fenêtre,contextuelle,extension,iphone,mac,détournement",
   "Canada indexes en-CA and fr-CA only. No separate CA type-ahead data for French; reuse FR terms, add 'contextuelle' (existing blind-written copy)."),
 'it': L("Undirect: Blocca Popup", ["Safari","reindirizzamento","scheda"],
   "pubblicità,bloccare,pop up,annunci,estensione,iphone,mac,dirottamento,finestra",
   "IT 'blocca popup' 43 apps, 'blocca pubblicità' 112; type-ahead 'blocca popup', 'bloccare pubblicità safari'; 'reindirizzamento' returns 1 app."),
 'es-ES': L("Undirect: Ventanas emergentes", ["Safari","Bloqueo","redirecciones","pestañas"],
   "popup,anuncios,publicidad,bloquear,bloqueador,extensión,iphone,mac,quitar,anti,secuestro",
   "ES type-ahead 'bloqueo de ventanas emergentes'; that exact query returns 1 app, 'bloquear ventanas emergentes' 3. Name+subtitle together form it."),
 'es-MX': L("Undirect: Ventanas emergentes", ["Safari","Bloqueo","redirecciones","pestañas"],
   "popup,anuncios,publicidad,bloquear,bloqueador,extensión,iphone,mac,quitar,pop up,secuestro",
   "es-MX is the default language of 16 storefronts and additional in 3 (incl. US). MX: same type-ahead, 2 apps for the exact query."),
 'ca': L("Undirect", ["Safari","bloqueig","redireccions","pestanyes"],
   "anuncis,bloquejador,finestra emergent,extensió,iphone,mac,popup,redirecció,segrest",
   "Catalan is additional only in Spain; no type-ahead exists in Catalan, so this field mirrors the Spanish terms. Name keeps the brand."),
 'nl-NL': L("Undirect: Pop-up blokkeren", ["Safari","omleiding","tabbladen"],
   "advertentie,reclame,extensie,iphone,mac,tabblad,kapen,popup",
   "NL 'pop-up blokkeren' 24 apps (top has 0 ratings); 'advertentieblokkering' 25 apps. 'adblocker safari' is the big query, 215 apps."),
 'sv': L("Undirect: Pop up blockerare", ["Safari","omdirigering","flikar"],
   "annonser,annons,blockera,tillägg,iphone,mac,kapning,popup,reklam",
   "SE type-ahead returns 'pop up blockerare' (15 apps) and 'blockera annonser'."),
 'no': L("Undirect: Popup Blocker", ["Safari","omdirigering","faner"],
   "annonse,reklame,blokkering,utvidelse,iphone,mac,kapring,blokkere",
   "NO type-ahead gives 'popup blocker'; 'annonseblokkering' returns 33 apps."),
 'da': L("Undirect: Popup Blocker", ["Safari","omdirigering","faner"],
   "reklame,reklamer,blokering,udvidelse,iphone,mac,kapring,blokere",
   "DK type-ahead gives 'popup blocker'; 'reklameblokering' returns 12 apps."),
 'fi': L("Undirect: Popup Blocker", ["Safari","uudelleenohjaus","välilehdet"],
   "mainos,mainokset,esto,laajennus,iphone,mac,kaappaus,ponnahdus,estäjä",
   "FI type-ahead gives 'popup blocker'; 'mainosten esto' returns 27 apps, 'mainosesto' 17."),
 'cs': L("Undirect: Popup Blocker", ["Safari","přesměrování","panely"],
   "reklamy,blokování,rozšíření,iphone,mac,vyskakovací,okno,únos",
   "CZ 'blokování reklam' returns 29 apps, 'blokování reklam safari' 13; the Latin 'popup blocker' is typed."),
 'sk': L("Undirect: Popup Blocker", ["Safari","presmerovanie","karty"],
   "reklamy,blokovanie,rozšírenie,iphone,mac,vyskakovacie,okno,únos",
   "SK 'blokovanie reklám' returns 23 apps; same pattern as CZ."),
 'hu': L("Undirect: Popup Blocker", ["Safari","átirányítás","lapok"],
   "reklám,blokkoló,bővítmény,iphone,mac,felugró,ablak,eltérítés",
   "HU type-ahead returns 'reklám blokkoló' (41 apps); 'felugró ablak blokkoló' returns 1 app."),
 'ro': L("Undirect: Popup Blocker", ["Safari","redirecționări","file"],
   "reclame,blocare,extensie,iphone,mac,pop-up,fereastră,deturnare",
   "RO 'blocare reclame' 32 apps; 'pop-up blocker' 220 apps, top is AdGuard (416 ratings), so the Latin form is the crowded one; the name carries it anyway."),
 'hr': L("Undirect: Popup Blocker", ["Safari","preusmjeravanje","kartice"],
   "reklame,oglasi,blokiranje,proširenje,iphone,mac,skočni,prozor,otmica",
   "HR 'blokiranje reklama' returns 0 apps; nobody indexes it. Users type 'adblock' (242 apps)."),
 'sl-SI': L("Undirect: Popup Blocker", ["Safari","preusmeritve","zavihki"],
   "oglasi,reklame,blokiranje,razširitev,iphone,mac,pojavno,okno,ugrabitev",
   "SI 'blokiranje oglasov' returns 0 apps; users type 'adblock' (244 apps)."),
 'pl': L("Undirect: Popup Blocker", ["Safari","przekierowania","karty"],
   "reklamy,blokada,blokowanie,rozszerzenie,iphone,mac,wyskakujące,okno,przejęcie",
   "PL type-ahead has 'blokada reklam' (64 apps) and 'blokowanie reklam' (34); the Latin 'pop up blocker' is typed too."),
 'tr': L("Undirect: Popup Blocker", ["Safari","yönlendirme","sekme"],
   "reklam,engelleyici,açılır,pencere,uzantı,iphone,mac,engelle,kaçırma",
   "TR type-ahead has 'reklam engelleyici' (128 apps); 'açılır pencere engelleyici' returns 8 apps; the Latin 'pop up blocker' is typed."),
 'id': L("Undirect: Popup Blocker", ["Safari","pengalihan","tab"],
   "iklan,blokir,pemblokir,ekstensi,iphone,mac,peramban,pembajakan,anti iklan",
   "ID type-ahead has 'blokir iklan' (76 apps), 'popup blocker' (Latin) and 'anti iklan'; Undirect already ranks #100 for 'pop up blocker' on the strength of its keyword field alone."),
 'ms': L("Undirect: Popup Blocker", ["Safari","ubah hala","tab"],
   "iklan,sekat,penyekat,sambungan,iphone,mac,timbul,rampas",
   "MY type-ahead has 'pop up blocker'; 'sekat iklan' returns 35 apps."),
 'vi': L("Undirect: Popup Blocker", ["Safari","chuyển hướng","tab"],
   "chặn,quảng cáo,tiện ích,iphone,mac,cửa sổ,chiếm quyền",
   "VN type-ahead: 'chặn quảng cáo safari', 'chặn quảng cáo'; 'chặn popup' returns 42 apps. vi is also additional in the US."),
 'pt-BR': L("Undirect: Bloqueador de Pop Up", ["Safari","redirecionamento","abas"],
   "popup,anúncios,bloquear,propaganda,extensão,iphone,mac,sequestro,janela,remover",
   "BR 'bloqueador de pop ups' returns 23 apps (top has 0 ratings); type-ahead 'bloquear anúncios', 'bloquear anúncios no safari'."),
 'pt-PT': L("Undirect: Bloqueador de Pop Up", ["Safari","redirecionamento","separadores"],
   "popup,anúncios,bloquear,publicidade,extensão,iphone,mac,sequestro,janela",
   "PT 'bloquear pop ups' returns 10 apps; type-ahead 'bloqueador de pop ups'."),
 'ja': L("Undirect: ポップアップブロック", ["Safari","リダイレクト","タブ"],
   "広告,ブロッカー,拡張機能,iphone,mac,迷惑,乗っ取り,クリック",
   "JP type-ahead 'ポップアップ ブロック', 'ポップアップブロッカー', 'safari 広告ブロック'; 'リダイレクト' returns only 21 apps. Japan also indexes en-US as additional."),
 'ko': L("Undirect: 팝업 차단", ["Safari","리디렉션","탭"],
   "광고,광고차단,사파리,확장 프로그램,iphone,mac,리다이렉트,가로채기",
   "KR type-ahead '팝업차단', '사파리 광고차단'; '팝업 차단' returns 56 apps, '리다이렉트' 11. ko is also additional in the US."),
 'zh-Hans': L("Undirect: 弹窗拦截", ["Safari","重定向","标签页"],
   "广告,屏蔽,扩展,iphone,mac,浏览器,劫持,去广告",
   "CN type-ahead '弹窗拦截', '去除广告', 'safari 广告拦截器'; '弹窗拦截' returns 185 apps but the top is a script manager, so intent is loose."),
 'zh-Hant': L("Undirect: 彈出視窗攔截", ["Safari","重新導向","分頁"],
   "廣告,封鎖,擴充功能,iphone,mac,瀏覽器,劫持,彈跳,阻擋",
   "TW type-ahead '彈出視窗攔截器' returns 16 apps; '廣告攔截' 179; HK default is also zh-Hant."),
 'ru': L("Undirect: Блокировщик", ["Safari","перенаправления","вкладки","всплывающие окна"],
   "реклама,попап,блокировка,расширение,iphone,mac,редирект",
   "RU 'блокировщик всплывающих окон' returns 2 apps; 'блокировщик рекламы' 72. Type-ahead has 'блокировка рекламы в safari', 'антиреклама'. ru is also additional in the US."),
 'uk': L("Undirect: Блокувальник", ["Safari","перенаправлення","вкладки","спливаючі вікна"],
   "реклама,блок,розширення,iphone,mac,редирект,попап",
   "UA 'блокувальник спливаючих вікон' returns 3 apps; type-ahead 'блок реклами', 'анти реклама'."),
 'ar-SA': L("Undirect", ["Safari","نوافذ منبثقة","إعادة توجيه","علامات التبويب"],
   "اعلانات,حجب,مانع,حاجب,اضافة,iphone,mac,popup,سفاري",
   "SA type-ahead 'حاجب اعلانات', 'مانع الاعلانات', 'حجب الاعلانات'; 'نوافذ منبثقة' returns 11 apps. Arabic is additional in 17 storefronts and in the US.",
   sub_note="Name descriptor: use 'حاجب' or 'مانع' plus 'النوافذ المنبثقة' only if the native writer finds a natural noun phrase under 20 characters."),
 'he': L("Undirect", ["Safari","חלונות קופצים","הפניה","לשוניות"],
   "פרסומות,חוסם,הרחבה,iphone,mac,popup,חטיפה",
   "IL type-ahead 'חוסם פרסומות' (44 apps). No type-ahead for pop-ups."),
 'th': L("Undirect", ["Safari","ป๊อปอัป","เปลี่ยนเส้นทาง","แท็บ"],
   "โฆษณา,บล็อก,บล็อค,ส่วนขยาย,iphone,mac",
   "TH type-ahead 'บล็อคโฆษณา'; 'บล็อกโฆษณา' returns 111 apps, 'ป้องกันโฆษณา' 14. Spelling varies (บล็อก and บล็อค), so both are listed."),
 'el': L("Undirect: Popup Blocker", ["Safari","ανακατεύθυνση","καρτέλες"],
   "διαφημίσεις,αποκλεισμός,επέκταση,iphone,mac,αναδυόμενα",
   "GR 'αποκλεισμός διαφημίσεων' returns 21 apps; the Latin 'pop up blocker' is typed."),
}
INDIC = {
 'hi': ("विज्ञापन,ब्लॉक,पॉपअप,सफारी,एक्सटेंशन,iphone,mac,रीडायरेक्ट", "hindi"),
 'bn-BD': ("বিজ্ঞাপন,ব্লক,পপআপ,সাফারি,এক্সটেনশন,iphone,mac,রিডাইরেক্ট", "bangla"),
 'gu-IN': ("જાહેરાત,બ્લૉક,પૉપઅપ,સફારી,એક્સ્ટેન્શન,iphone,mac,રીડાયરેક્ટ", "gujarati"),
 'kn-IN': ("ಜಾಹೀರಾತು,ಬ್ಲಾಕ್,ಪಾಪ್‌ಅಪ್,ಸಫಾರಿ,ಎಕ್ಸ್‌ಟೆನ್ಶನ್,iphone,mac", "kannada"),
 'ml-IN': ("പരസ്യം,ബ്ലോക്ക്,പോപ്പ്അപ്പ്,സഫാരി,എക്സ്റ്റൻഷൻ,iphone,mac", "malayalam"),
 'mr-IN': ("जाहिरात,ब्लॉक,पॉपअप,सफारी,एक्स्टेंशन,iphone,mac,रीडायरेक्ट", "marathi"),
 'or-IN': ("ବିଜ୍ଞାପନ,ବ୍ଲକ,ପପଅପ,ସାଫାରି,iphone,mac", "odia"),
 'pa-IN': ("ਇਸ਼ਤਿਹਾਰ,ਬਲੌਕ,ਪੌਪਅੱਪ,ਸਫਾਰੀ,iphone,mac", "punjabi"),
 'ta-IN': ("விளம்பரம்,தடுப்பு,பாப்அப்,சஃபாரி,நீட்டிப்பு,iphone,mac", "tamil"),
 'te-IN': ("ప్రకటన,బ్లాకర్,పాప్అప్,సఫారి,ఎక్స్‌టెన్షన్,iphone,mac", "telugu"),
 'ur-PK': ("اشتہار,بلاک,پاپ اپ,سفاری,ایکسٹینشن,iphone,mac", "urdu"),
}

def words(s):
    return set(w.lower() for w in re.findall(r"[^\W_]+", s))

def build():
    out = {}; report = []
    allcodes = sorted(os.path.basename(f)[:-5] for f in glob.glob(STORE + '/*.json'))
    for code in allcodes:
        cur = json.load(open(f'{STORE}/{code}.json'))
        prim, add = storefronts(code)
        e = {}
        if code in ('en-US', 'en-GB', 'en-AU', 'en-CA'):
            e['name'] = NAME_EN; e['subtitle'] = SUB_EN; e['keywords'] = KW_EN[code]; e['promo'] = PROMO_EN
            why = {
             'en-US': "Primary for US, additional for Japan. Name gets the top typed query 'pop up blocker' ('popup blocker' returns the same top 6); subtitle carries 'Safari', 'redirects', 'tabs'. Keyword field drops generic words (tracker, privacy, browser) and adds 'pop up', 'ads', 'block', device words.",
             'en-GB': "en-GB is the default language of 135 of 175 storefronts and additional in 37 more, so it is the most widely indexed field set Undirect owns. Same name/subtitle as en-US (combos form only inside one locale); 'advert' added because GB type-ahead returns 'advert blocker'.",
             'en-AU': "AU and NZ index en-AU and en-GB together, so this field holds words en-GB does not. Terms are plausible but have no type-ahead evidence; replace after a month of rank data.",
             'en-CA': "Canada indexes en-CA and fr-CA only, not en-US, so name, subtitle and keywords are repeated here.",
            }[code]
            e['change'] = {'name': True, 'subtitle': True, 'keywords': True, 'promo': True,
                           'kind': 'visible+keywords'}
            nm, sb = NAME_EN, SUB_EN
        elif code in NAT:
            s = NAT[code]
            e['name'] = s['name']
            e['subtitle'] = {'meaning': "Stops redirects and hijacked tabs in Safari (the English line is '%s'). Compose from the screen, not from the English." % SUB_EN,
                             'mustContain': s['must'], 'maxChars': 30,
                             'note': s['sub_note'] or "Every term in mustContain should appear in the subtitle or name; the keyword field below deliberately omits them."}
            e['keywords'] = s['kw']
            e['promo'] = {'meaning': PROMO_MEANING, 'maxChars': 170, 'indexed': False}
            e['change'] = {'name': s['name'] != 'Undirect', 'subtitle': True, 'keywords': True, 'promo': True,
                           'kind': 'visible+keywords'}
            why = s['why']
            nm, sb = s['name'], ' '.join(s['must'])
        else:
            kw, lang = INDIC[code]
            while len(kw.encode('utf8')) > 100: kw = kw.rsplit(',', 1)[0]
            e['name'] = NAME_EN
            e['subtitle'] = {'meaning': "Your click stays yours: stops pages redirecting or opening tabs you did not ask for, in Safari.",
                             'mustContain': ["Safari"], 'maxChars': 30,
                             'note': "No Indic-script query appeared in Apple's type-ahead (India shows only Latin 'adblock', 'pop up blocker'), so the visible lines can follow the current slogan style; keep 'Safari' in Latin."}
            e['keywords'] = kw
            e['promo'] = {'meaning': PROMO_MEANING, 'maxChars': 170, 'indexed': False}
            e['change'] = {'name': True, 'subtitle': False, 'keywords': True, 'promo': False,
                           'kind': 'keywords+name'}
            why = ("India and Pakistan default to en-GB, which already carries every Latin term. This %s field adds native-script terms only; "
                   "type-ahead returned no %s query, so confidence is low." % (lang, lang))
            nm, sb = NAME_EN, ''
        e['why'] = why
        e['storefronts'] = {'primary': prim, 'additional': add}
        # checks
        kb = len(e['keywords'].encode('utf8'))
        e['keywordBytes'] = kb
        probs = []
        if kb > 100: probs.append('keywords %d bytes' % kb)
        if len(e['name']) > 30: probs.append('name %d chars' % len(e['name']))
        if isinstance(e['subtitle'], str) and len(e['subtitle']) > 30: probs.append('subtitle too long')
        if isinstance(e['promo'], str) and len(e['promo']) > 170: probs.append('promo %d' % len(e['promo']))
        terms = e['keywords'].split(',')
        if len(set(terms)) != len(terms): probs.append('duplicate term')
        if ' ,' in e['keywords'] or ', ' in e['keywords']: probs.append('space around comma')
        used = words(nm) | words(sb)
        for t in terms:
            if words(t) and words(t) <= used: probs.append('repeats name/subtitle word: ' + t)
        e['_problems'] = probs
        out[code] = e
        report.append((code, kb, probs))
    return out, report

if __name__ == '__main__':
    out, report = build()
    bad = [(c, p) for c, k, p in report if p]
    for c, k, p in report:
        print(f'{c:8} {k:3}b {"; ".join(p)}')
    if '--write' in sys.argv:
        for c in out: out[c].pop('_problems', None)
        json.dump(out, open(ROOT + '/proposal.json', 'w'), ensure_ascii=False, indent=1)
        print('wrote proposal.json', len(out))
