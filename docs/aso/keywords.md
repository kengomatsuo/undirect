# Keyword targets per storefront

Every term below traces to a measurement in `data/` (M1 type-ahead, M2 live search, M3 competitor pages) or to a rule in `sources.md`. Result counts are how many apps the live App Store search returned for that exact query on 2026-10-01 (cap about 250). A small n means few apps carry all the words, so a name or subtitle that holds them can reach the top. Type-ahead gives presence and order, not volume; no search-popularity score was available, so volume is stated as a signal, never as a number.

## 1. What people type

The terms people begin to type, by storefront, for this product family (from `data/hints.json`):

| Storefront | Typed (type-ahead order) | Where Undirect's own words stand |
| --- | --- | --- |
| US, GB, AU, CA | pop up blocker, popup blocker, safari pop up blocker, block pop up ads, pop up ad blocker, safari ad blocker, ad blocker, adblock, tab blocker, stop ads, remove ads, redirect blocker (US and GB only) | 'popunder', 'pop under', 'stop redirect', 'redirect safari', 'unwanted tab', 'tab hijack' return no type-ahead; 'redirect' completes to 'redirect blocker' (US, GB, 2nd place) |
| DE | popup blocker, pop up blocker, werbeblocker, werbung blockieren, safari erweiterungen | 'weiterleitung' completes only to SMS-forwarding apps |
| FR | bloqueur de pub, bloquer publicité safari, popup blocker, anti pub, bloqueur safari | 'redirection' completes to a maps app and to 'Direct - Remove Redirection' |
| IT | blocca pubblicità, blocca popup, popup blocker, bloccare pubblicità safari | 'reindirizzamento' returns 1 app |
| ES, MX | bloqueador de anuncios (safari), bloqueo de ventanas emergentes, bloquear publicidad en safari, anti anuncios para safari | 'bloqueo de ventanas emergentes' returns 1 to 2 apps |
| NL | adblocker safari, pop-up, advertentieblokkering | 'omleiding' no completion |
| JP | 広告ブロック (+ 無料, safari), ポップアップ ブロック, ポップアップブロッカー, safari 広告ブロック | 'リダイレクト' returns 21 apps |
| KR | 광고 차단, 광고차단, 팝업차단, 사파리 광고차단 | '리다이렉트' returns 11 apps |
| CN | 弹窗拦截, 广告拦截, 广告屏蔽, 去除广告, safari 广告拦截器 | '重定向' completes only to a redirect-engine app |
| TW, HK | 彈出視窗攔截器, 廣告攔截, 廣告封鎖, safari 廣告攔截器 | '重新導向' returns 10 apps |
| RU | блокировщик рекламы (safari, бесплатно), блокировка рекламы в safari, антиреклама, блокировщик всплывающих окон | 'перенаправление' returns 2 apps |
| BR, PT | bloquear anúncios (no safari), bloqueador de pop ups, bloqueador de anuncios, anti anúncio | 'redirecionamento' returns shop apps |
| ID, MY | blokir iklan, pop up blocker, popup blocker, anti iklan, adblock | 'pengalihan' returns 10 apps |
| TR | reklam engelleyici, pop up blocker | 'açılır pencere engelleyici' returns 8 apps |
| PL | blokada reklam, blokowanie reklam, pop up blocker | 'blokada wyskakujących okien' returns 0 |
| SA, AE | مانع الاعلانات, حاجب اعلانات, حجب الاعلانات, ازالة الاعلانات | 'نوافذ منبثقة' returns 11 apps |
| VN | chặn quảng cáo (safari), popup | 'chặn popup' returns 42 apps |
| TH | บล็อคโฆษณา, โฆษณา | 'ป้องกันโฆษณา' returns 14 apps |
| SE, NO, DK, FI | pop up blockerare, blockera annonser, annonsblockering; 'popup blocker' (NO, DK, FI) | 'reklameblokering' 12, 'mainosesto' 17 |
| CZ, SK, HU, RO, GR, HR, SI, UA, IL | only 'adblock' and the local word for ad blocker complete ('reklám blokkoló', 'חוסם פרסומות', 'блок реклами') | HR and SI 'blokiranje reklam/oglasov' return 0 apps |
| IN, PK and all Indic scripts | only Latin: ad blocker for safari, adblock pro for safari, pop up blocker | no Indic-script completion exists |

Two facts drive everything after this. First, 'pop up blocker' and 'popup blocker' return the same leaders (identical first six in the US, identical first four in DE, the same four in GB in a different order), so the name needs only one spelling. Second, 'adblock' completes in 38 of the 41 probed storefronts (all but CN, TW, HK) and returns 229 to 250 apps in each of the 35 storefronts where it was searched: the head of the market is closed to an app with no ratings, and Undirect is not a general ad blocker.

## 2. Which of Undirect's fields each storefront indexes

From Apple's table (A4, 175 storefronts), mapped to the 50 locales Undirect ships. 'Default' is the language the storefront shows when the app has it; 'additional' are the extra languages the practitioner sources (P4 to P6) say are also searched. Only the default row is certain; the rest is group B.

| Storefronts | Default | Additional | Count | Example storefronts |
| --- | --- | --- | --- | --- |
| 71 | en-GB |  | 71 | AFG, ALB, AGO, AIA, ATG, ARM, AZE, BHS ... |
| 18 | en-GB | fr-FR | 18 | BEN, BFA, KHM, TCD, COD, COG, GNB, GUY ... |
| 16 | es-MX | en-GB | 16 | ARG, BOL, CHL, COL, CRI, DOM, ECU, SLV ... |
| 10 | en-GB | ar-SA | 10 | BHR, IRQ, JOR, KWT, LBY, OMN, QAT, SAU ... |
| 6 | en-GB | ar-SA, fr-FR | 6 | DZA, EGY, LBN, MRT, MAR, TUN |
| 4 | en-GB | hr | 4 | BIH, HRV, MNE, SRB |
| 4 | fr-FR | en-GB | 4 | CMR, CIV, FRA, GAB |
| 3 | zh-Hant | en-GB | 3 | HKG, MAC, TWN |
| 2 | en-AU | en-GB | 2 | AUS, NZL |
| 2 | de-DE | en-GB | 2 | AUT, DEU |
| 2 | en-GB | es-MX | 2 | BLZ, URY |
| 1 | en-GB | fr-FR, nl-NL | 1 | BEL |
| 1 | pt-BR | en-GB | 1 | BRA |
| 1 | en-CA | fr-CA | 1 | CAN |
| 1 | zh-Hans | en-GB | 1 | CHN |
| 1 | en-GB | el, tr | 1 | CYP |
| 1 | en-GB | cs | 1 | CZE |
| 1 | en-GB | da | 1 | DNK |
| 1 | en-GB | fi | 1 | FIN |
| 1 | en-GB | el | 1 | GRC |
| 1 | en-GB | hu | 1 | HUN |
| 1 | en-GB | bn-BD, gu-IN, hi, kn-IN, ml-IN, mr-IN, or-IN, pa-IN, ta-IN, te-IN, ur-PK | 1 | IND |
| 1 | en-GB | id | 1 | IDN |
| 1 | en-GB | he | 1 | ISR |
| 1 | it | en-GB | 1 | ITA |
| 1 | ja | en-US | 1 | JPN |
| 1 | en-GB | de-DE, fr-FR | 1 | LUX |
| 1 | en-GB | ms | 1 | MYS |
| 1 | nl-NL | en-GB | 1 | NLD |
| 1 | en-GB | no | 1 | NOR |
| 1 | en-GB | ur-PK | 1 | PAK |
| 1 | en-GB | pl | 1 | POL |
| 1 | pt-PT | en-GB | 1 | PRT |
| 1 | ko | en-GB | 1 | KOR |
| 1 | en-GB | ro | 1 | ROU |
| 1 | ru | en-GB, uk | 1 | RUS |
| 1 | en-GB | zh-Hans | 1 | SGP |
| 1 | en-GB | sk | 1 | SVK |
| 1 | en-GB | sl-SI | 1 | SVN |
| 1 | es-ES | ca, en-GB | 1 | ESP |
| 1 | en-GB | nl-NL | 1 | SUR |
| 1 | sv | en-GB | 1 | SWE |
| 1 | de-DE | en-GB, fr-FR, it | 1 | CHE |
| 1 | en-GB | th | 1 | THA |
| 1 | en-GB | tr | 1 | TUR |
| 1 | en-GB | ru, uk | 1 | UKR |
| 1 | en-US | ar-SA, es-MX, fr-FR, ko, pt-BR, ru, vi, zh-Hans, zh-Hant | 1 | USA |
| 1 | en-GB | vi | 1 | VNM |

Reading it: **en-GB is the default for 135 storefronts and an additional language for 37 more, so 172 of 175 storefronts see en-GB's name, subtitle and keywords** (the three that do not are the US, Japan and Canada). en-GB is the field set that matters most for reach outside the US. es-MX is the default of 16 storefronts and additional in 3 (Belize, Uruguay, US). fr-FR is the default in 4 and additional in 28 (Francophone Africa, Cambodia, Laos, Guyana, Switzerland, Luxembourg, Belgium, Egypt and others). Arabic is additional in 17 storefronts and in the US. India lists 11 Indic languages as additional on top of en-GB.

## 3. Rules for allocating words

- **Words combine only inside one locale** (P4, P5, P6). The name and subtitle that make 'safari popup blocker' must sit in the same locale as the keyword field that holds the rest. So en-US and en-GB each carry the full English set; no storefront indexes both, so the repeat costs nothing.
- **AU and NZ index en-AU and en-GB together**, so en-AU holds words en-GB does not. Canada indexes en-CA and fr-CA, never en-US, so en-CA repeats the English set.
- **A word counted once is counted once**: never repeat a word between name, subtitle and keywords of one locale (A1, P3). The generator in `data/build_proposal.py` fails a locale that does.
- **The US gets nine extra 100-byte fields** (ar, zh-Hans, zh-Hant, fr, ko, pt-BR, ru, es-MX, vi). Undirect's English term set is only about 65 bytes, so en-US holds all of it. Do not pad those nine fields with English filler; they stay native for their own storefronts. The unused space is reserve for terms the first month of rank data proves.
- **Japan's additional language is en-US.** Its English words come from the en-US field, not en-GB.
- **Visible name and subtitle stay in the storefront's language** (P5): a German reader sees the de-DE name. Where the Latin phrase 'popup blocker' is what locals type (DE, NO, DK, FI, CZ, SK, HU, RO, HR, SI, PL, TR, ID, MS, VI, GR), the name uses it. Where a native phrase wins (JA, KO, ZH, RU, UK, FR, IT, ES, PT, NL, SV), the name carries that phrase and native review decides the exact form.
- **Keyword fields hold single words**, one form each (A1). Phrases come from combining a name word with a keyword word in the same locale.
- **Left out on purpose**: 'adblock' and 'adblocker' (competing app names AdBlock Pro, Adblock Plus; A1 and 2.3.7 forbid competing app names and trademarks, and Undirect is not a general ad blocker), 'tracker', 'privacy', 'link', 'site', 'browser' (current copy; no type-ahead, loose intent: 'tracker blocker' returns call-blocking and AirTag apps), 'overlay' (photo apps), 'new tab' (new-tab-page apps), 'malware' (antivirus apps), 'free' and 'app' (A1).

## 4. Per locale

Name and keywords are final proposals; native review is still needed for any name that is not a Latin phrase. Subtitle and promo for non-English locales are specified, not written. 'must contain' lists the words the native writer should place in the subtitle; the keyword field omits them. Bytes are UTF-8 bytes of the keyword field (limit 100). 'Kind' says whether the change touches only the hidden keyword field or visible copy as well.

| Locale | Primary / additional storefronts | Name | Subtitle must contain | Keywords (bytes) | Kind |
| --- | --- | --- | --- | --- | --- |
| ar-SA | 0 / 17 | Undirect | Safari, نوافذ منبثقة, إعادة توجيه, علامات التبويب | `اعلانات,حجب,مانع,حاجب,اضافة,iphone,mac,popup,سفاري` (78) | keywords + visible |
| bn-BD | 0 / 1 | Undirect: Popup Blocker | Safari | `বিজ্ঞাপন,ব্লক,পপআপ,সাফারি,এক্সটেনশন` (97) | keywords + visible |
| ca | 0 / 1 | Undirect | Safari, bloqueig, redireccions, pestanyes | `anuncis,bloquejador,finestra emergent,extensió,iphone,mac,popup,redirecció,segrest` (84) | keywords + visible |
| cs | 0 / 1 | Undirect: Popup Blocker | Safari, přesměrování, panely | `reklamy,blokování,rozšíření,iphone,mac,vyskakovací,okno,únos` (68) | keywords + visible |
| da | 0 / 1 | Undirect: Popup Blocker | Safari, omdirigering, faner | `reklame,reklamer,blokering,udvidelse,iphone,mac,kapring,blokere` (63) | keywords + visible |
| de-DE | 3 / 1 | Undirect: Popup Blocker | Safari, Weiterleitung, Werbung | `pop-up,blockieren,umleitung,erweiterung,tab,klick,iphone,mac,kapern` (67) | keywords + visible |
| el | 0 / 2 | Undirect: Popup Blocker | Safari, ανακατεύθυνση, καρτέλες | `διαφημίσεις,αποκλεισμός,επέκταση,iphone,mac,αναδυόμενα` (94) | keywords + visible |
| en-AU | 2 / 0 | Undirect: Popup Blocker | Stop Safari redirects & tabs | `browser,website,page,malicious,unwanted,annoying,secure,clean,scam` (66) | keywords + visible |
| en-CA | 1 / 0 | Undirect: Popup Blocker | Stop Safari redirects & tabs | `pop up,ads,block,iphone,ipad,mac,extension,hijack,popunder,window` (65) | keywords + visible |
| en-GB | 135 / 37 | Undirect: Popup Blocker | Stop Safari redirects & tabs | `pop up,advert,ads,block,iphone,ipad,mac,extension,hijack,popunder,window` (72) | keywords + visible |
| en-US | 1 / 1 | Undirect: Popup Blocker | Stop Safari redirects & tabs | `pop up,ads,block,iphone,ipad,mac,extension,hijack,popunder,window` (65) | keywords + visible |
| es-ES | 1 / 0 | Undirect: Ventanas emergentes | Safari, Bloqueo, redirecciones, pestañas | `popup,anuncios,publicidad,bloquear,bloqueador,extensión,iphone,mac,quitar,anti,secuestro` (89) | keywords + visible |
| es-MX | 16 / 3 | Undirect: Ventanas emergentes | Safari, Bloqueo, redirecciones, pestañas | `popup,anuncios,publicidad,bloquear,bloqueador,extensión,iphone,mac,quitar,pop up,secuestro` (91) | keywords + visible |
| fi | 0 / 1 | Undirect: Popup Blocker | Safari, uudelleenohjaus, välilehdet | `mainos,mainokset,esto,laajennus,iphone,mac,kaappaus,ponnahdus,estäjä` (70) | keywords + visible |
| fr-CA | 0 / 1 | Undirect: Bloqueur de pop-up | Safari, redirection, onglet | `popup,publicité,pub,bloquer,fenêtre,contextuelle,extension,iphone,mac,détournement` (85) | keywords + visible |
| fr-FR | 4 / 28 | Undirect: Bloqueur de pop-up | Safari, redirection, onglet | `popup,publicité,pub,bloquer,anti pub,extension,iphone,mac,détournement,fenêtre` (81) | keywords + visible |
| gu-IN | 0 / 1 | Undirect: Popup Blocker | Safari | `જાહેરાત,બ્લૉક,પૉપઅપ,સફારી` (69) | keywords + visible |
| he | 0 / 1 | Undirect | Safari, חלונות קופצים, הפניה, לשוניות | `פרסומות,חוסם,הרחבה,iphone,mac,popup,חטיפה` (62) | keywords + visible |
| hi | 0 / 1 | Undirect: Popup Blocker | Safari | `विज्ञापन,ब्लॉक,पॉपअप,सफारी,एक्सटेंशन` (100) | keywords + visible |
| hr | 0 / 4 | Undirect: Popup Blocker | Safari, preusmjeravanje, kartice | `reklame,oglasi,blokiranje,proširenje,iphone,mac,skočni,prozor,otmica` (70) | keywords + visible |
| hu | 0 / 1 | Undirect: Popup Blocker | Safari, átirányítás, lapok | `reklám,blokkoló,bővítmény,iphone,mac,felugró,ablak,eltérítés` (69) | keywords + visible |
| id | 0 / 1 | Undirect: Popup Blocker | Safari, pengalihan, tab | `iklan,blokir,pemblokir,ekstensi,iphone,mac,peramban,pembajakan,anti iklan` (73) | keywords + visible |
| it | 1 / 1 | Undirect: Blocca Popup | Safari, reindirizzamento, scheda | `pubblicità,bloccare,pop up,annunci,estensione,iphone,mac,dirottamento,finestra` (79) | keywords + visible |
| ja | 1 / 0 | Undirect: ポップアップブロック | Safari, リダイレクト, タブ | `広告,ブロッカー,拡張機能,iphone,mac,迷惑,乗っ取り,クリック` (79) | keywords + visible |
| kn-IN | 0 / 1 | Undirect: Popup Blocker | Safari | `ಜಾಹೀರಾತು,ಬ್ಲಾಕ್,ಪಾಪ್‌ಅಪ್,ಸಫಾರಿ` (84) | keywords + visible |
| ko | 1 / 1 | Undirect: 팝업 차단 | Safari, 리디렉션, 탭 | `광고,광고차단,사파리,확장 프로그램,iphone,mac,리다이렉트,가로채기` (89) | keywords + visible |
| ml-IN | 0 / 1 | Undirect: Popup Blocker | Safari | `പരസ്യം,ബ്ലോക്ക്,പോപ്പ്അപ്പ്,സഫാരി` (93) | keywords + visible |
| mr-IN | 0 / 1 | Undirect: Popup Blocker | Safari | `जाहिरात,ब्लॉक,पॉपअप,सफारी,एक्स्टेंशन` (100) | keywords + visible |
| ms | 0 / 1 | Undirect: Popup Blocker | Safari, ubah hala, tab | `iklan,sekat,penyekat,sambungan,iphone,mac,timbul,rampas` (55) | keywords + visible |
| nl-NL | 1 / 2 | Undirect: Pop-up blokkeren | Safari, omleiding, tabbladen | `advertentie,reclame,extensie,iphone,mac,tabblad,kapen,popup` (59) | keywords + visible |
| no | 0 / 1 | Undirect: Popup Blocker | Safari, omdirigering, faner | `annonse,reklame,blokkering,utvidelse,iphone,mac,kapring,blokkere` (64) | keywords + visible |
| or-IN | 0 / 1 | Undirect: Popup Blocker | Safari | `ବିଜ୍ଞାପନ,ବ୍ଲକ,ପପଅପ,ସାଫାରି,iphone,mac` (80) | keywords + visible |
| pa-IN | 0 / 1 | Undirect: Popup Blocker | Safari | `ਇਸ਼ਤਿਹਾਰ,ਬਲੌਕ,ਪੌਪਅੱਪ,ਸਫਾਰੀ,iphone,mac` (83) | keywords + visible |
| pl | 0 / 1 | Undirect: Popup Blocker | Safari, przekierowania, karty | `reklamy,blokada,blokowanie,rozszerzenie,iphone,mac,wyskakujące,okno,przejęcie` (79) | keywords + visible |
| pt-BR | 1 / 1 | Undirect: Bloqueador de Pop Up | Safari, redirecionamento, abas | `popup,anúncios,bloquear,propaganda,extensão,iphone,mac,sequestro,janela,remover` (81) | keywords + visible |
| pt-PT | 1 / 0 | Undirect: Bloqueador de Pop Up | Safari, redirecionamento, separadores | `popup,anúncios,bloquear,publicidade,extensão,iphone,mac,sequestro,janela` (74) | keywords + visible |
| ro | 0 / 1 | Undirect: Popup Blocker | Safari, redirecționări, file | `reclame,blocare,extensie,iphone,mac,pop-up,fereastră,deturnare` (63) | keywords + visible |
| ru | 1 / 2 | Undirect: Блокировщик | Safari, перенаправления, вкладки, всплывающие окна | `реклама,попап,блокировка,расширение,iphone,mac,редирект` (95) | keywords + visible |
| sk | 0 / 1 | Undirect: Popup Blocker | Safari, presmerovanie, karty | `reklamy,blokovanie,rozšírenie,iphone,mac,vyskakovacie,okno,únos` (66) | keywords + visible |
| sl-SI | 0 / 1 | Undirect: Popup Blocker | Safari, preusmeritve, zavihki | `oglasi,reklame,blokiranje,razširitev,iphone,mac,pojavno,okno,ugrabitev` (71) | keywords + visible |
| sv | 1 / 0 | Undirect: Pop up blockerare | Safari, omdirigering, flikar | `annonser,annons,blockera,tillägg,iphone,mac,kapning,popup,reklam` (65) | keywords + visible |
| ta-IN | 0 / 1 | Undirect: Popup Blocker | Safari | `விளம்பரம்,தடுப்பு,பாப்அப்,சஃபாரி` (90) | keywords + visible |
| te-IN | 0 / 1 | Undirect: Popup Blocker | Safari | `ప్రకటన,బ్లాకర్,పాప్అప్,సఫారి` (78) | keywords + visible |
| th | 0 / 1 | Undirect | Safari, ป๊อปอัป, เปลี่ยนเส้นทาง, แท็บ | `โฆษณา,บล็อก,บล็อค,ส่วนขยาย,iphone,mac` (83) | keywords + visible |
| tr | 0 / 2 | Undirect: Popup Blocker | Safari, yönlendirme, sekme | `reklam,engelleyici,açılır,pencere,uzantı,iphone,mac,engelle,kaçırma` (73) | keywords + visible |
| uk | 0 / 2 | Undirect: Блокувальник | Safari, перенаправлення, вкладки, спливаючі вікна | `реклама,блок,розширення,iphone,mac,редирект,попап` (83) | keywords + visible |
| ur-PK | 0 / 2 | Undirect: Popup Blocker | Safari | `اشتہار,بلاک,پاپ اپ,سفاری,ایکسٹینشن,iphone,mac` (74) | keywords + visible |
| vi | 0 / 2 | Undirect: Popup Blocker | Safari, chuyển hướng, tab | `chặn,quảng cáo,tiện ích,iphone,mac,cửa sổ,chiếm quyền` (69) | keywords + visible |
| zh-Hans | 1 / 2 | Undirect: 弹窗拦截 | Safari, 重定向, 标签页 | `广告,屏蔽,扩展,iphone,mac,浏览器,劫持,去广告` (58) | keywords + visible |
| zh-Hant | 3 / 1 | Undirect: 彈出視窗攔截 | Safari, 重新導向, 分頁 | `廣告,封鎖,擴充功能,iphone,mac,瀏覽器,劫持,彈跳,阻擋` (68) | keywords + visible |

Evidence for each locale is in `proposal.json` under `why`.

## 5. Open queries Undirect can reach, by storefront

Queries from M2 where fewer than 60 apps matched, which is where a name or subtitle holding the words can reach the top results quickly. The first result's rating count shows how entrenched the leader is.

| Query | Apps matched | Top result (ratings) | Undirect rank today |
| --- | --- | --- | --- |
| BR: bloqueador de pop ups | 23 | Bloqueador de Pop Ups (0) | not listed |
| BR: bloquear anúncios no safari | 26 | Bloquear Anúncios no Safari (0) | not listed |
| CZ: blokování reklam | 29 | Ad Blocker ++ (0) | not listed |
| CZ: blokování reklam safari | 13 | Ad Blocker for Safari: No Ads (0) | not listed |
| DE: weiterleitung | 42 | SMS Weiterleitung - OTP & 2FA (2) | not listed |
| DK: reklameblokering | 12 | Aura: Ad Blocker & Private DNS (0) | not listed |
| ES: bloquear ventanas emergentes | 3 | Bloqueo de ventanas emergentes (0) | not listed |
| ES: bloqueo de ventanas emergentes | 1 | Bloqueo de ventanas emergentes (0) | not listed |
| ES: redireccion | 13 | Koco Widgets - Launcher app (20) | not listed |
| FI: mainosesto | 17 | Ad Blocker - Fast & Complete (1) | not listed |
| FI: mainosten esto | 27 | Ad Blocker (2) | not listed |
| FR: bloquer publicité safari | 27 | Bloquer Publicité Safari (0) | not listed |
| FR: bloqueur de pop-up | 39 | Bloqueur de Pop Up (1) | not listed |
| GR: αποκλεισμός διαφημίσεων | 21 | Ad Blocker (0) | not listed |
| HK: 彈出視窗 | 21 | Atom瀏覽器 - 廣告阻擋與隱私保護 (0) | not listed |
| HU: felugró ablak blokkoló | 1 | Pop Up Blocker (0) | not listed |
| HU: reklámblokkoló | 41 | Ad Block ! -Stop advertising (4) | not listed |
| ID: ekstensi safari | 47 | uShield: Browser AdBlocker (0) | not listed |
| ID: pemblokir iklan | 58 | Ad Blocker (0) | not listed |
| ID: pengalihan | 10 | Dragonscapes Adventure (6917) | not listed |
| IL: חוסם פרסומות | 44 | Adblock Plus for Safari & Apps (494) | not listed |
| IT: blocca popup | 43 | 1Blocker - Ad Blocker (589) | not listed |
| IT: reindirizzamento | 1 | Maps Switcher for Safari (0) | not listed |
| JP: リダイレクト | 21 | リダイレクト！：ロジックパズル (6357) | not listed |
| KR: 리다이렉트 | 11 | Instagram (1887111) | not listed |
| KR: 팝업 차단 | 56 | AdBlock Pro for Safari (5228) | not listed |
| KR: 팝업차단 | 56 | AdBlock Pro for Safari (5228) | not listed |
| MX: bloquear anuncios en safari | 28 | AdBlock Pro para Safari (1892) | not listed |
| MX: bloqueo de ventanas emergentes | 2 | Bloqueo de ventanas emergentes (0) | not listed |
| MY: sekat iklan | 35 | ProTube: Block Ads on Video (220) | not listed |
| NL: advertentieblokkering | 25 | Advertentieblokkering ++ (0) | not listed |
| NL: pop-up blokkeren | 24 | Adblock Plus voor Safari (2521) | not listed |
| NO: annonseblokkering | 33 | Ad Blocker (4) | not listed |
| PL: blokowanie reklam | 34 | AdBlock Pro for Safari (2214) | not listed |
| PT: bloquear pop ups | 10 | Bloqueador de Pop Ups (0) | not listed |
| RO: blocare reclame | 32 | Ad Blocker - Fast & Complete (23) | not listed |
| RU: блокировщик всплывающих окон | 2 | Блокировщик Всплывающих Окон (0) | not listed |
| RU: блокировщик рекламы safari | 39 | AdGuard: Блокировщик рекламы (13268) | not listed |
| RU: всплывающие окна | 10 | Ad  Blocker Для  Все браузеры (3) | not listed |
| RU: перенаправление | 2 | Карта Переходник (0) | not listed |
| SA: حجب الاعلانات | 53 | AdBlock Pro for Safari (16809) | not listed |
| SA: نوافذ منبثقة | 11 | Qr Generator : No Pop Up (0) | not listed |
| SE: annonsblockerare | 42 | Snabb Annonsblockerare (12) | not listed |
| SE: annonsblockering | 20 | annonsblockering (3) | not listed |
| SE: pop up blockerare | 15 | Pop up Blockerare (0) | not listed |
| SK: blokovanie reklám | 23 | Ad Blocker & DNS - Urka (0) | not listed |
| TH: ป้องกันโฆษณา | 14 | AdLocker: Block AD and Spam (0) | not listed |
| TR: açılır pencere engelleyici | 8 | Pop Up Blocker (1) | not listed |
| TR: yönlendirme | 38 | Call.io: AI Phone Assistant (17) | not listed |
| TW: safari 擴充功能 | 40 | Gear 瀏覽器 - 支援 Web 擴充功能与 AI智慧翻譯 (57) | not listed |
| TW: 彈出視窗 | 22 | 彈出視窗攔截器 (0) | not listed |
| TW: 彈出視窗攔截器 | 16 | Adblock Plus ABP (814) | not listed |
| TW: 重新導向 | 10 | Clean Links: QR Code 掃描器 (3) | not listed |
| UA: блокувальник реклами | 32 | AdGuard Ad Blocker for Safari (3766) | not listed |
| UA: блокувальник спливаючих вікон | 3 | Pop Up Blocker (0) | not listed |
| US: hijack | 39 | Hijack Poker: Texas Hold’em (431) | 38 |
| US: pop under | 27 | Amazon Shopping (8449634) | 27 |
| US: popunder | 6 | Magic Security: Web Protection (0) | 6 |
| VN: chặn popup | 42 | Ad Blocker ++ (1) | not listed |
