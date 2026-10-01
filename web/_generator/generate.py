#!/usr/bin/env python3
"""Build the Undirect website into dist/.

    python3 web/_generator/generate.py [--output-dir DIR] [--check]

Pages (home, support, privacy) are written once per language. English (en-GB)
is served at the site root so the URLs the App Store already points at keep
working; every other language lives under /<lowercased store code>/.

Where each language's words come from:
  * Support/i18n/store/<code>.json   name, subtitle, promo, description
  * App/Localizable.xcstrings        the three feature titles and sentences
  * web/_generator/strings/<code>.json   everything only the site needs
A strings file may carry "_inherit": "<code>" and override single keys.
The static files in web/ (stylesheet, images, video, demo/) are copied as they are.
"""
import argparse
import datetime
import html
import json
import re
import shutil
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
WEB = HERE.parent
REPO = WEB.parent
BASE = "https://undirect.matsuokengo.com"
APP_ID = "6810513194"
APP_URL = f"https://apps.apple.com/app/id{APP_ID}"
EULA_URL = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
SOURCE_URL = "https://github.com/kengomatsuo/undirect"
EMAIL = "kenneth@matsuokengo.com"
ROOT_CODE = "en-GB"          # served at /
PAGES = ["", "support/", "privacy/"]
THEME = {"light": "#f7f6f4", "dark": "#0b0b0d"}

# store code -> App/Localizable.xcstrings code
APP_CODE = {
    "bn-BD": "bn", "gu-IN": "gu", "kn-IN": "kn", "ml-IN": "ml", "mr-IN": "mr",
    "or-IN": "or", "pa-IN": "pa", "ta-IN": "ta", "te-IN": "te", "ur-PK": "ur",
    "sl-SI": "sl", "no": "nb", "en-US": "en",
}
FEATURES = [  # (icon, title key, body key) in the xcstrings catalog
    ("layers", "Invisible layers", "A page can cover itself to catch a press meant for something else."),
    ("swap", "Swapped links", "Some pages rewrite a link between the press and the release."),
    ("window", "Uninvited windows", "A new tab opens only where your press pointed."),
]
DESTINATION_TITLE = "Every destination"
ICONS = {
    "layers": '<path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="m3 13 9 5 9-5"/>',
    "swap": '<path d="M4 8h14l-3-3"/><path d="M20 16H6l3 3"/>',
    "window": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18"/>',
}
OG_LOCALE = {
    "ca": "ca_ES", "cs": "cs_CZ", "da": "da_DK", "el": "el_GR", "fi": "fi_FI", "he": "he_IL",
    "hi": "hi_IN", "hr": "hr_HR", "hu": "hu_HU", "id": "id_ID", "it": "it_IT", "ja": "ja_JP",
    "ko": "ko_KR", "ms": "ms_MY", "no": "nb_NO", "pl": "pl_PL", "ro": "ro_RO", "ru": "ru_RU",
    "sk": "sk_SK", "sv": "sv_SE", "th": "th_TH", "tr": "tr_TR", "uk": "uk_UA", "vi": "vi_VN",
    "zh-Hans": "zh_CN", "zh-Hant": "zh_TW",
}


BADGES = json.loads((HERE / "badges.json").read_text(encoding="utf-8"))["map"]
BADGE_HEIGHT = 48          # Apple asks for at least 40 px on screen


def badge_html(loc, alt):
    """Apple's own black badge, unmodified, in the language of the page."""
    code = BADGES[loc.code]
    svg = (HERE / "badges" / f"{code}.svg").read_text(encoding="utf-8")
    vb = re.search(r'viewBox="[\d.\-]+[ ,]+[\d.\-]+[ ,]+([\d.]+)[ ,]+([\d.]+)"', svg)
    w, h = float(vb.group(1)), float(vb.group(2))
    width = round(w / h * BADGE_HEIGHT)
    return (f'<a class="badge" href="{APP_URL}" rel="noopener">'
            f'<img src="/img/badges/{code}.svg" width="{width}" height="{BADGE_HEIGHT}" alt="{esc(alt)}"></a>')


def load(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def esc(s):
    return html.escape(s, quote=True)


class Locale:
    def __init__(self, entry):
        self.code = entry["code"]
        self.name = entry["name"]
        self.rtl = entry["rtl"]
        self.is_root = self.code == ROOT_CODE
        self.path = "" if self.is_root else self.code.lower()
        # hreflang is BCP 47: keep the store code's own casing.
        self.hreflang = self.code

    @property
    def lang_attr(self):
        return self.code

    def url(self, page=""):
        parts = [p for p in (self.path, page.strip("/")) if p]
        return BASE + "/" + "/".join(parts) + ("/" if parts else "")

    def href(self, page=""):
        return self.url(page)[len(BASE):]


def sentence_case(line, turkish=False):
    """Store copy shouts its two small headings in capitals; a heading here is sentence case."""
    if line == line.lower() or line != line.upper():
        return line
    low = (line.replace("İ", "i").replace("I", "ı") if turkish else line).lower()
    first = ("İ" if low[0] == "i" else low[0].upper()) if turkish else low[0].upper()
    return first + low[1:]


def build_strings(loc, app_catalog):
    store = load(REPO / "Support/i18n/store" / f"{loc.code}.json")
    paras = store["description"].split("\n\n")
    if len(paras) != 7:
        raise SystemExit(f"{loc.code}: store description has {len(paras)} paragraphs, expected 7")
    fix = lambda line: sentence_case(line, turkish=loc.code == "tr")

    def split_heading(p):
        head, _, body = p.partition("\n")
        return fix(head.strip()), body.strip()

    app = APP_CODE.get(loc.code, loc.code)

    def app_str(key):
        if app in ("en", "en-GB", "en-US") or key not in app_catalog:
            return key
        units = app_catalog[key].get("localizations", {})
        for c in (app, loc.code):
            if c in units:
                return units[c]["stringUnit"]["value"]
        return key if app.startswith("en") else None

    s = {
        "name": store["name"], "subtitle": store["subtitle"], "promo": store["promo"],
        "h1": paras[0], "problem1": paras[1], "problem2": paras[2],
        "dest_title": app_str(DESTINATION_TITLE), "dest1": paras[3], "dest2": paras[4],
        "private_h": split_heading(paras[5])[0], "private": split_heading(paras[5])[1],
        "req_h": split_heading(paras[6])[0], "req": split_heading(paras[6])[1],
    }
    for i, (icon, tk, bk) in enumerate(FEATURES, 1):
        s[f"feat{i}_t"], s[f"feat{i}_b"] = app_str(tk), app_str(bk)
    missing = [k for k, v in s.items() if not v]
    if missing:
        raise SystemExit(f"{loc.code}: no source for {missing}")
    return s


def load_site_strings(code, seen=()):
    d = load(HERE / "strings" / f"{code}.json")
    parent = d.pop("_inherit", None)
    if parent:
        base = load_site_strings(parent, seen + (code,))
        base.update(d)
        return base
    return d


# ---------------------------------------------------------------- html parts

def head(loc, locales, t, page, title, description, ld, extra=""):
    canon = loc.url(page)
    alts = []
    for l in locales:
        alts.append(f'<link rel="alternate" hreflang="{l.hreflang}" href="{l.url(page)}">')
    alts.append(f'<link rel="alternate" hreflang="x-default" href="{locales_by_code[ROOT_CODE].url(page)}">')
    og_locale = OG_LOCALE.get(loc.code, loc.code.replace("-", "_"))
    return f"""<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(description)}">
<link rel="canonical" href="{canon}">
{chr(10).join(alts)}
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="{THEME['light']}" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="{THEME['dark']}" media="(prefers-color-scheme: dark)">
<meta name="apple-itunes-app" content="app-id={APP_ID}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Undirect">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(description)}">
<meta property="og:url" content="{canon}">
<meta property="og:locale" content="{og_locale}">
<meta property="og:image" content="{BASE}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(title)}">
<meta name="twitter:description" content="{esc(description)}">
<meta name="twitter:image" content="{BASE}/og.png">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="apple-touch-icon" href="/icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/style.css">
{extra}<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False, separators=(',', ':'))}</script>
<script src="/site.js" defer></script>
</head>"""


def nav(loc, locales, t, page):
    def link(p, label):
        cur = ' aria-current="page"' if p == page else ""
        return f'<li><a href="{loc.href(p)}"{cur}>{esc(label)}</a></li>'

    items = []
    for l in locales:
        cur = ' aria-current="true"' if l is loc else ""
        items.append(
            f'<li><a href="{l.href(page)}" hreflang="{l.hreflang}" lang="{l.lang_attr}" data-lang="{l.path or "root"}"{cur}>{esc(l.name)}</a></li>')
    return f"""<a class="skip" href="#main">{esc(t['skip'])}</a>
<header>
<nav class="site-nav">
<a class="nav-brand" href="{loc.href()}"><img src="/icon.png" alt="" width="32" height="32">Undirect</a>
<ul class="nav-links">
{link('support/', t['nav_support'])}
{link('privacy/', t['nav_privacy'])}
<li><a href="/demo/" hreflang="en">{esc(t['nav_demo'])}</a></li>
<li class="lang"><details><summary lang="{loc.lang_attr}">{esc(loc.name)}</summary><ul class="lang-menu">
{chr(10).join(items)}
</ul></details></li>
</ul>
</nav>
</header>"""


def footer(loc, t):
    return f"""<footer class="site-footer">
<ul class="footer-links">
<li><a href="{loc.href()}">Undirect</a></li>
<li><a href="{loc.href('support/')}">{esc(t['nav_support'])}</a></li>
<li><a href="{loc.href('privacy/')}">{esc(t['nav_privacy'])}</a></li>
<li><a href="{EULA_URL}" rel="noopener">{esc(t['f_terms'])}</a></li>
<li><a href="{SOURCE_URL}" rel="noopener">{esc(t['f_source'])}</a></li>
</ul>
<p class="copyright">&copy; 2026 Kenneth Fang</p>
</footer>"""


def document(loc, locales, t, page, title, description, ld, body, extra_head=""):
    dir_attr = ' dir="rtl"' if loc.rtl else ""
    return f"""<!doctype html>
<html lang="{loc.lang_attr}"{dir_attr} data-page="{page}"{' data-root="1"' if loc.is_root else ''}>
{head(loc, locales, t, page, title, description, ld, extra_head)}
<body>
{nav(loc, locales, t, page)}
<main id="main">
{body}
</main>
{footer(loc, t)}
</body>
</html>
"""


def breadcrumb(loc, t, page, label):
    return {"@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Undirect", "item": loc.url()},
        {"@type": "ListItem", "position": 2, "name": label, "item": loc.url(page)}]}


def person():
    return {"@type": "Person", "name": "Kenneth Fang", "url": "https://matsuokengo.com"}


def home_page(loc, locales, s, t):
    title = f"{s['name']} | {s['subtitle']}"
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "WebSite", "@id": BASE + "/#site", "name": "Undirect", "url": BASE + "/", "inLanguage": loc.code},
        {"@type": "SoftwareApplication", "@id": BASE + "/#app", "name": s["name"],
         "applicationCategory": "UtilitiesApplication",
         "operatingSystem": "iOS, iPadOS, macOS", "description": s["promo"], "inLanguage": loc.code,
         "url": loc.url(), "image": BASE + "/icon-512.png", "downloadUrl": APP_URL, "installUrl": APP_URL,
         "author": person(), "offers": {"@type": "Offer", "price": "0.99", "priceCurrency": "USD"}},
    ]}
    cta = badge_html(loc, t["cta_get"])
    cta_text = f'<a class="text-link" href="{APP_URL}" rel="noopener">{esc(t["cta_get"])}</a>'
    feats = "\n".join(
        f'<li><svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[icon]}</svg><h3>{esc(s[f"feat{i}_t"])}</h3><p>{esc(s[f"feat{i}_b"])}</p></li>'
        for i, (icon, _, _) in enumerate(FEATURES, 1))
    body = f"""<section class="hero"><div class="wrap">
<div>
<h1>{esc(s['h1'])}</h1>
<p class="lead">{esc(s['promo'])}</p>
<div class="cta-row">{cta}<a class="btn btn-quiet" href="/demo/" hreflang="en">{esc(t['nav_demo'])}</a></div>
<p class="cta-note">{esc(t['devices_line'])}</p>
</div>
<div class="hero-shot"><img src="/img/iphone-popup.webp" width="660" height="1434" alt="{esc(t['alt_phone'])}" fetchpriority="high"></div>
</div></section>

<section class="section sunken"><div class="wrap"><div class="problem">
<p>{esc(s['problem1'])}</p>
<p>{esc(s['problem2'])}</p>
</div></div></section>

<section class="section"><div class="wrap">
<h2>{esc(t['video_title'])}</h2>
<div class="film"><video controls playsinline preload="none" poster="/media/film-poster.webp" width="1280" height="720" aria-label="{esc(t['video_title'])}">
<source src="/media/film.mp4" type="video/mp4"></video></div>
</div></section>

<section class="section sunken"><div class="wrap">
<ul class="features">
{feats}
</ul>
</div></section>

<section class="section"><div class="wrap split">
<div>
<h2>{esc(s['dest_title'])}</h2>
<p>{esc(s['dest1'])}</p>
<p>{esc(s['dest2'])}</p>
</div>
<img src="/img/mac-app.webp" width="1100" height="1071" loading="lazy" alt="{esc(t['alt_mac'])}">
</div></section>

<section class="section sunken"><div class="wrap">
<h2>{esc(t['demo_title'])}</h2>
<p>{esc(t['demo_text'])}</p>
<a class="text-link" href="/demo/" hreflang="en">{esc(t['demo_link'])}</a>
</div></section>

<section class="section private"><div class="wrap">
<h2>{esc(s['private_h'])}</h2>
<p>{esc(s['private'])}</p>
<a class="text-link" href="{loc.href('privacy/')}">{esc(t['text_link_privacy'])}</a>
</div></section>

<section class="section sunken cta-band"><div class="wrap">
<h2>{esc(s['req_h'])}</h2>
<p>{esc(s['req'])}</p>
<div class="cta-row">{cta_text}</div>
</div></section>"""
    return document(loc, locales, t, "", title, s["promo"], ld, body)


def email_link(text):
    return esc(text).replace("{email}", f'<a href="mailto:{EMAIL}">{EMAIL}</a>')


def support_page(loc, locales, s, t):
    title = f"{t['nav_support']} | {s['name']}"
    qa = [(t[f"q{i}"], t[f"a{i}"]) for i in range(1, 6)]
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "FAQPage", "inLanguage": loc.code, "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in qa]},
        breadcrumb(loc, t, "support/", t["nav_support"]),
    ]}
    faq = "\n".join(f'<details><summary>{esc(q)}</summary><div class="answer"><p>{esc(a)}</p></div></details>' for q, a in qa)
    body = f"""<div class="page">
<div class="page-head"><h1>{esc(t['nav_support'])}</h1><p>{esc(t['support_sub'])}</p></div>
<div class="prose">
<section><h2>{esc(t['s_contact_h'])}</h2>
<p>{email_link(t['s_contact'])}</p>
<p>{esc(t['s_report'])}</p></section>
<section><h2>{esc(t['s_common_h'])}</h2>
<div class="faq">
{faq}
</div></section>
</div>
</div>"""
    return document(loc, locales, t, "support/", title, t["meta_support"], ld, body)


def privacy_page(loc, locales, s, t):
    title = f"{t['nav_privacy']} | {s['name']}"
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "WebPage", "name": title, "url": loc.url("privacy/"), "inLanguage": loc.code,
         "isPartOf": {"@id": BASE + "/#site"}, "dateModified": "2026-09-10"},
        breadcrumb(loc, t, "privacy/", t["nav_privacy"]),
    ]}
    secs = "\n".join(
        f'<section><h2>{esc(t[f"p{i}_h"])}</h2><p>{email_link(t[f"p{i}"]) if i == 6 else esc(t[f"p{i}"])}</p></section>'
        for i in range(1, 7))
    body = f"""<div class="page">
<div class="page-head"><h1>{esc(t['nav_privacy'])}</h1><p>{esc(t['privacy_effective'])}</p></div>
<div class="prose">
<p class="summary">{esc(s['private'])}</p>
{secs}
</div>
</div>"""
    return document(loc, locales, t, "privacy/", title, t["meta_privacy"], ld, body)


# ------------------------------------------------------------------ extras

def not_found_page(locales, all_t):
    """404.html: English by default, switched to the visitor's language by site.js."""
    root = locales_by_code[ROOT_CODE]
    t = all_t[ROOT_CODE]
    data = {l.path or "root": {"title": all_t[l.code]["nf_title"], "text": all_t[l.code]["nf_text"],
                               "link": all_t[l.code]["nf_link"], "home": l.href(), "rtl": l.rtl, "lang": l.code}
            for l in locales}
    return f"""<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(t['nf_title'])} | Undirect</title>
<meta name="robots" content="noindex">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="{THEME['light']}" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="{THEME['dark']}" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="stylesheet" href="/style.css">
<script id="nf-data" type="application/json">{json.dumps(data, ensure_ascii=False, separators=(',', ':'))}</script>
<script src="/site.js" defer data-404="1"></script>
</head>
<body>
<main id="main" class="notfound wrap">
<h1 id="nf-title">{esc(t['nf_title'])}</h1>
<p id="nf-text">{esc(t['nf_text'])}</p>
<a class="btn" id="nf-link" href="/">{esc(t['nf_link'])}</a>
</main>
</body>
</html>
"""


def sitemap(locales):
    today = datetime.date.today().isoformat()
    out = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
    for page in PAGES:
        for l in locales:
            out.append("<url>")
            out.append(f"<loc>{l.url(page)}</loc>")
            out.append(f"<lastmod>{today}</lastmod>")
            for a in locales:
                out.append(f'<xhtml:link rel="alternate" hreflang="{a.hreflang}" href="{a.url(page)}"/>')
            out.append(f'<xhtml:link rel="alternate" hreflang="x-default" href="{locales_by_code[ROOT_CODE].url(page)}"/>')
            out.append("</url>")
    out.append(f"<url><loc>{BASE}/demo/</loc><lastmod>{today}</lastmod></url>")
    out.append("</urlset>")
    return "\n".join(out) + "\n"


def site_js(locales):
    langs = {l.path or "root": l.code for l in locales}
    return (HERE / "site.js.tpl").read_text(encoding="utf-8").replace("/*LANGS*/{}", json.dumps(langs, separators=(",", ":")))


locales_by_code = {}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--output-dir", default=str(REPO / "dist"))
    ap.add_argument("--check", action="store_true", help="validate strings only, write nothing")
    args = ap.parse_args()
    out = Path(args.output_dir).resolve()

    locales = [Locale(e) for e in load(HERE / "locales.json")]
    locales_by_code.update({l.code: l for l in locales})
    app_catalog = load(REPO / "App/Localizable.xcstrings")["strings"]
    en_keys = set(load_site_strings(ROOT_CODE))

    all_s, all_t, problems = {}, {}, []
    for l in locales:
        all_s[l.code] = build_strings(l, app_catalog)
        t = load_site_strings(l.code)
        miss, extra = en_keys - set(t), set(t) - en_keys
        if miss or extra:
            problems.append(f"{l.code}: missing {sorted(miss)} extra {sorted(extra)}")
        for k, v in t.items():
            if "—" in v or "–" in v or "·" in v:
                problems.append(f"{l.code}.{k}: em dash, en dash or middot")
            if k in ("p6", "s_contact") and "{email}" not in v:
                problems.append(f"{l.code}.{k}: no {{email}}")
        all_t[l.code] = t
    if problems:
        print("\n".join(problems))
        sys.exit(1)
    if args.check:
        print(f"{len(locales)} locales ok")
        return

    if out.exists():
        shutil.rmtree(out)
    shutil.copytree(WEB, out, ignore=shutil.ignore_patterns("_generator", ".DS_Store", "CNAME.bak"))
    # Old hand-written pages are replaced by generated ones.
    for stale in ("index.html", "support", "privacy"):
        p = out / stale
        if p.is_file():
            p.unlink()
        elif p.is_dir():
            shutil.rmtree(p)

    n = 0
    for l in locales:
        for page, fn in (("", home_page), ("support/", support_page), ("privacy/", privacy_page)):
            dest = out / l.path / page / "index.html" if l.path else out / page / "index.html"
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(fn(l, locales, all_s[l.code], all_t[l.code]), encoding="utf-8")
            n += 1
    (out / "img" / "badges").mkdir(parents=True, exist_ok=True)
    for code in sorted(set(BADGES.values())):
        shutil.copy(HERE / "badges" / f"{code}.svg", out / "img" / "badges" / f"{code}.svg")
    (out / "404.html").write_text(not_found_page(locales, all_t), encoding="utf-8")
    (out / "sitemap.xml").write_text(sitemap(locales), encoding="utf-8")
    (out / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {BASE}/sitemap.xml\n", encoding="utf-8")
    (out / "site.js").write_text(site_js(locales), encoding="utf-8")
    (out / "site.webmanifest").write_text(json.dumps({
        "name": "Undirect", "short_name": "Undirect", "start_url": "/", "display": "browser",
        "background_color": THEME["dark"], "theme_color": THEME["dark"],
        "icons": [{"src": "/icon-192.png", "sizes": "192x192", "type": "image/png"},
                  {"src": "/icon-512.png", "sizes": "512x512", "type": "image/png"}]}, indent=1) + "\n", encoding="utf-8")
    print(f"{len(locales)} languages, {n} pages -> {out}")


if __name__ == "__main__":
    main()
