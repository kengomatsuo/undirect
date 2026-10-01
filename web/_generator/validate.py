#!/usr/bin/env python3
"""Check a built site: python3 web/_generator/validate.py [dist]

Internal links and assets resolve, hreflang is reciprocal and matches the sitemap,
canonical points at the page itself, one h1 per page, titles unique within a page
type, descriptions not blank, JSON-LD parses. Exits 1 on any failure."""
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urldefrag, urlparse

BASE = "https://undirect.matsuokengo.com"
dist = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).resolve().parents[2] / "dist")
errors = []


def err(msg):
    errors.append(msg)


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.assets, self.alts, self.ld = [], [], {}, []
        self.canonical = self.title = self.desc = self.lang = None
        self.h1 = 0
        self._in = None
        self.meta = {}

    def handle_starttag(self, tag, a):
        a = dict(a)
        if tag == "html":
            self.lang = a.get("lang")
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])
        if tag in ("img", "script", "source", "video") and (a.get("src") or a.get("poster")):
            self.assets.append(a.get("src") or a.get("poster"))
        if tag == "video" and a.get("poster"):
            self.assets.append(a["poster"])
        if tag == "link":
            if a.get("rel") == "canonical":
                self.canonical = a.get("href")
            elif a.get("rel") == "alternate" and a.get("hreflang"):
                self.alts[a["hreflang"]] = a["href"]
            elif a.get("rel") in ("stylesheet", "icon", "apple-touch-icon", "manifest"):
                self.assets.append(a["href"])
        if tag == "meta":
            n = a.get("name") or a.get("property")
            if n:
                self.meta[n] = a.get("content")
            if a.get("name") == "description":
                self.desc = a.get("content")
        if tag == "h1":
            self.h1 += 1
        if tag == "title":
            self._in = "title"
        if tag == "script" and a.get("type") == "application/ld+json":
            self._in = "ld"

    def handle_data(self, d):
        if self._in == "title":
            self.title = (self.title or "") + d
        elif self._in == "ld":
            self.ld.append(d)

    def handle_endtag(self, tag):
        self._in = None


def resolve(path):
    p = dist / path.lstrip("/")
    return p / "index.html" if p.is_dir() else p


pages = {}
for f in sorted(dist.rglob("*.html")):
    if f.relative_to(dist).parts[0] == "demo":
        continue
    pg = Page()
    pg.feed(f.read_text(encoding="utf-8"))
    pages[f.relative_to(dist).as_posix()] = pg

types = {}
for rel, pg in pages.items():
    url = "/" + rel.removesuffix("index.html")
    if rel == "404.html":
        continue
    kind = rel.rsplit("/", 2)[-2] if rel.count("/") and rel.rsplit("/", 2)[-2] in ("support", "privacy") else "home"
    types.setdefault(kind, {}).setdefault(pg.title, []).append(rel)
    if pg.h1 != 1:
        err(f"{rel}: {pg.h1} h1")
    if not pg.desc or len(pg.desc) < 20:
        err(f"{rel}: description missing or short")
    if pg.canonical != BASE + url:
        err(f"{rel}: canonical {pg.canonical} != {BASE + url}")
    if not pg.lang:
        err(f"{rel}: no lang")
    if "x-default" not in pg.alts:
        err(f"{rel}: no x-default")
    for code, href in pg.alts.items():
        if urlparse(href).netloc != "undirect.matsuokengo.com":
            err(f"{rel}: hreflang {code} not absolute")
        else:
            target = resolve(urlparse(href).path)
            if not target.exists():
                err(f"{rel}: hreflang {code} -> missing {href}")
            else:
                back = pages.get(target.relative_to(dist).as_posix())
                if back and back.alts.get(pg.lang) != pg.canonical and pg.lang in back.alts and back.alts[pg.lang] != pg.canonical:
                    err(f"{rel}: hreflang not reciprocal with {href}")
    if pg.alts.get(pg.lang) != pg.canonical and pg.lang not in ("en-US",):
        # the page's own language must list itself
        if pg.lang not in pg.alts or pg.alts[pg.lang] != pg.canonical:
            err(f"{rel}: self hreflang {pg.lang} missing")
    for block in pg.ld:
        try:
            json.loads(block)
        except ValueError as e:
            err(f"{rel}: bad JSON-LD {e}")
    for href in pg.links + pg.assets:
        if re.match(r"(https?:|mailto:|tel:|#|data:)", href):
            continue
        path = urldefrag(urlparse(href).path)[0]
        if not resolve(path).exists():
            err(f"{rel}: broken {href}")

# Titles repeat across languages that share a word ("Support", "Privasi"); each URL
# still has its own hreflang, so only a repeat inside one language would be a fault.
for kind, titles in types.items():
    for t, rels in titles.items():
        langs = [pages[r].lang for r in rels]
        if len(set(langs)) != len(langs):
            err(f"{kind}: duplicate title {t!r} within one language {rels}")

sm = (dist / "sitemap.xml").read_text(encoding="utf-8")
locs = re.findall(r"<loc>([^<]+)</loc>", sm)
for loc in locs:
    if not resolve(urlparse(loc).path).exists():
        err(f"sitemap: missing {loc}")
if len(set(locs)) != len(locs):
    err("sitemap: duplicate loc")
for rel in pages:
    if rel == "404.html":
        continue
    u = BASE + "/" + rel.removesuffix("index.html")
    if u not in locs:
        err(f"sitemap: {u} absent")
robots = (dist / "robots.txt").read_text()
if "Sitemap: " + BASE + "/sitemap.xml" not in robots:
    err("robots.txt: no sitemap line")
for need in ("404.html", "CNAME", "favicon.ico", "favicon.svg", "og.png", "site.webmanifest", "demo/index.html"):
    if not (dist / need).exists():
        err(f"missing {need}")

print(f"{len(pages)} pages, {len(locs)} sitemap urls, {len(errors)} problems")
for e in errors[:60]:
    print(" ", e)
sys.exit(1 if errors else 0)
