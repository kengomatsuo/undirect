#!/usr/bin/env python3
"""Build calendar-final/wording-done.json from the per-language source files in scratchpad/src.

Each source file holds the written units of one language (body, question, title, poll, sticker,
first-reply line, X cut, heavy piece) per post; this script lays them into each row of
wording-needed.json in that platform's shape and checks every limit.
"""
import json, re, sys, os, collections

S = os.path.dirname(os.path.abspath(__file__))
CAL = '/Users/hafang/Repositories/undirect/docs/plans/app-store-growth/social/calendar-final'
LANGS = ['ar', 'id', 'ja', 'zh-Hant', 'zh-Hans', 'fr', 'it', 'de', 'es', 'pt-BR', 'tr', 'ru']
KEYS = ('B2', 'B', 'Q', 'TK', 'T', 'PQ', 'PO', 'FC', 'ST', 'TQ', 'TO', 'XQ', 'XO', 'X', 'H')
KEY_RE = re.compile(r'^(' + '|'.join(KEYS) + r'): ?(.*)$')
SITE = {'Undirect': 'undirect.matsuokengo.com', 'Cutling': 'cutling.matsuokengo.com'}

const = json.load(open(f'{S}/const.json'))
need = json.load(open(f'{CAL}/wording-needed.json'))
deliv = json.load(open(f'{CAL}/deliveries.json'))
X_KEPT = set(json.load(open(f'{S}/x-kept.json')))
first_ids = {r['id'] for r in json.load(open(f'{CAL}/deliveries-first.json'))['rows']}
EN = collections.defaultdict(dict)
for r in deliv['rows']:
    if r['lang'] == 'en' and r['post']:
        EN[r['post']][r['platform']] = r


def parse(lang):
    """Every src/*.txt may hold several languages, each under a line '=== <lang>'."""
    import glob
    posts = collections.defaultdict(dict)
    for path in sorted(glob.glob(f'{S}/src/*.txt')):
        cur = key = None
        on = False
        for line in open(path, encoding='utf-8').read().split('\n'):
            if line.startswith('=== '):
                on, cur, key = line[4:].strip() == lang, None, None
                continue
            if not on:
                continue
            if line.startswith('@'):
                cur, key = line[1:].strip(), None
                continue
            if cur is None:
                continue
            m = KEY_RE.match(line)
            if m:
                key = m.group(1)
                if key in posts[cur]:
                    raise SystemExit(f'{lang} {cur} {key} written twice ({path})')
                posts[cur][key] = m.group(2)
            elif key:
                posts[cur][key] += '\n' + line
    for p in posts.values():
        for k in p:
            p[k] = p[k].strip()
    return posts


def xlen(s):
    s = re.sub(r'https?://\S+', 'x' * 23, s)
    n = 0
    for ch in s:
        c = ord(ch)
        n += 1 if (c <= 0x10FF or 0x2000 <= c <= 0x200D or 0x2010 <= c <= 0x201F or 0x2032 <= c <= 0x2037) else 2
    return n


def body_en(post):
    caps = [r['caption'] for r in EN[post].values() if r.get('caption') and r['platform'] != 'X']
    if not caps:
        return None
    if len(caps) == 1:
        return caps[0].split('\n\nSearch ')[0]
    pre = caps[0]
    for c in caps[1:]:
        i = 0
        while i < min(len(pre), len(c)) and pre[i] == c[i]:
            i += 1
        pre = pre[:i]
    return pre.rstrip()


def tags(line, lang):
    out = []
    for t in line.split():
        k = t.lstrip('#').lower()
        v = t if k in ('undirect', 'cutling') else const[lang]['tags'].get(k)
        if v is None:
            raise KeyError(f'no tag for {t} in {lang}')
        if v not in out:
            out.append(v)
    return ' '.join(out)


def tail(lines, lang, F, miss):
    C = const[lang]
    out = []
    for ln in lines:
        if ln == '':
            out.append('')
        elif ln == 'Link in bio.':
            out.append(C['bio'])
        elif ln == 'Search Undirect or Cutling on the App Store.':
            out.append(C['search2'])
        elif re.fullmatch(r'Search (\w+) on the App Store\.', ln):
            out.append(C['search'].format(app=ln.split()[1]))
        elif re.fullmatch(r'(\w+) on the App Store: (\S+)', ln):
            a, u = re.fullmatch(r'(\w+) on the App Store: (\S+)', ln).groups()
            out.append(C['onstore'].format(app=a) + ' ' + u)
        elif re.fullmatch(r'\S+\.matsuokengo\.com', ln):
            out.append(ln)
        elif ln.startswith('#'):
            out.append(tags(ln, lang))
        else:
            if not F.get('Q'):
                miss.append('Q')
            out.append(F.get('Q', ''))
    return '\n'.join(out)


def build(row, g, src):
    lang, post, plat = g['lang'], g['post'], row['platform']
    nw = row['needs_wording']
    out = {'id': row['id'], 'post': post, 'platform': plat, 'lang': lang, 'format': row['format'], 'wib': row['wib'], 'caption': None, 'first_comment': None}
    miss = []
    if post is None:
        F = src.get('XH', {})
        link = re.search(r'the store link (\S+) on its own', nw).group(1)
        if F.get('H'):
            out['caption'] = F['H'] + '\n\n' + link
        else:
            miss.append('H')
        return out, miss
    F = src.get(post, {})
    E = EN[post].get(plat)
    ask_cap = 'caption (English:' in nw
    ask_title = 'title (English:' in nw
    ask_poll = 'poll question and' in nw
    ask_stk = 'sticker text (English:' in nw
    ask_fc = 'the line before the link in the' in nw
    C = const[lang]
    if plat == 'X':
        link = re.search(r'ends with the line (\S+) on its own', nw).group(1)
        if ask_poll:
            q, o = F.get('XQ') or F.get('PQ'), F.get('XO') or F.get('PO')
            if not q or not o:
                miss.append('XQ/XO')
            else:
                opts = [x.strip() for x in o.split(' / ')]
                out['poll'] = {'q': q, 'options': opts}
                cap = link
                if F.get('FC') and xlen(q + '\n\n' + F['FC'] + '\n\n' + link) <= 280:
                    cap = F['FC'] + '\n\n' + link
                out['caption'] = cap
                out['x_length'] = xlen(q + '\n\n' + cap)
        else:
            t = F.get('X') or F.get('B')
            if not t:
                miss.append('X')
            else:
                out['caption'] = t + '\n\n' + link
                out['x_length'] = xlen(out['caption'])
        return out, miss
    if ask_cap:
        if post == 'P17':
            b = F.get('B2') if plat in ('Instagram', 'TikTok') else F.get('B')
            if not b:
                miss.append('B/B2')
            else:
                if plat == 'Threads':
                    cap = b + '\n\n' + F.get('Q', '')
                    if not F.get('Q'): miss.append('Q')
                elif plat == 'YouTube':
                    cap = b + '\n\nundirect.matsuokengo.com\ncutling.matsuokengo.com'
                elif plat == 'Instagram':
                    cap = b + '\n\n' + C['bio'] + '\n' + tags('#iphonetips #iosapps #macapps #safari #productivityapps', lang)
                elif plat == 'TikTok':
                    cap = b + '\n\n' + C['search2'] + '\n' + tags('#iphonetips #iphonehacks #techtok', lang)
                else:
                    cap = b
                out['caption'] = cap
        else:
            be = body_en(post)
            assert E['caption'].startswith(be), row['id']
            only_tiktok = sum(1 for r in EN[post].values() if r.get('caption') and r['platform'] != 'X') == 1
            b = F.get('TK') if only_tiktok else F.get('B')
            if not b:
                miss.append('TK' if only_tiktok else 'B')
            else:
                rest = E['caption'][len(be):]
                lines = rest.strip('\n').split('\n') if rest.strip() else []
                t = tail(lines, lang, F, miss)
                out['caption'] = b + ('\n\n' + t if t else '')
    if ask_title:
        m = re.match(r'^(.*?)((?: #\w+)+)$', E['title'])
        if not F.get('T'):
            miss.append('T')
        else:
            out['title'] = F['T'] + ' ' + tags(m.group(2).strip(), lang)
    if ask_poll:
        q, o = (F.get('TQ') or F.get('PQ'), F.get('TO') or F.get('PO')) if plat == 'TikTok' else (F.get('PQ'), F.get('PO'))
        if not q or not o:
            miss.append('poll')
        else:
            out['poll'] = {'q': q, 'options': [x.strip() for x in o.split(' / ')]}
            if len(out['poll']['options']) != len(E['poll']['options']):
                miss.append(f"poll option count {len(out['poll']['options'])} != {len(E['poll']['options'])}")
    if ask_stk:
        if E['sticker'].startswith('Link:'):
            out['sticker'] = E['sticker']
        elif not F.get('ST'):
            miss.append('ST')
        else:
            out['sticker'] = F['ST']
    if ask_fc:
        link = row['first_comment_link']
        en_fc = E['first_comment']['text']
        if plat == 'Facebook':
            if post in ('P17', 'P26') or '\n' in link:
                l = link.split('\n')
                out['first_comment'] = f'Undirect: {l[0]}\nCutling: {l[1]}'
            else:
                app = re.match(r'(\w+) on the App Store', en_fc).group(1)
                out['first_comment'] = C['onstore'].format(app=app) + '\n' + link
        else:
            has_line = not re.fullmatch(r'(\S+\.matsuokengo\.com\n?)+', en_fc)
            if has_line:
                if not F.get('FC'):
                    miss.append('FC')
                out['first_comment'] = F.get('FC', '') + '\n' + link
            else:
                out['first_comment'] = link
    if not (ask_cap or ask_title or ask_poll or ask_stk or ask_fc):
        out['note'] = 'The English row has no caption, sticker or reply to write: the Story frames carry the words.'
    return out, miss


def limits(o):
    bad = []
    p, c = o['platform'], o.get('caption') or ''
    if p == 'X' and o.get('x_length', 0) > 280 and o['post']:
        bad.append(f"X length {o['x_length']}")
    if p == 'Threads' and len(c) > 500:
        bad.append(f'Threads {len(c)}')
    if p == 'Instagram' and (len(c) > 2200 or c.count('#') > 5):
        bad.append('Instagram limit')
    if p == 'TikTok' and (len(c) > 4000 or not 0 <= c.count('#') <= 5):
        bad.append('TikTok limit')
    if o.get('title') and len(o['title']) > 100:
        bad.append(f"title {len(o['title'])}")
    if o.get('poll'):
        mx = {'X': 25, 'Threads': 25, 'YouTube': 65, 'TikTok': 30}.get(p, 30)
        for x in o['poll']['options']:
            w = xlen(x) if p == 'X' else len(x)
            if w > mx:
                bad.append(f'option "{x}" {w}>{mx}')
    return bad


def main():
    rows, missing, over = [], [], []
    counts = collections.Counter()
    srcs = {l: parse(l) for l in LANGS}
    for g in need['groups']:
        if g['lang'] not in LANGS:
            continue
        src = srcs[g['lang']]
        if not src:
            continue
        for row in g['rows']:
            # X stays English only (coordinator, 2026-11-21): X rows written before that stay, no new ones.
            if row['platform'] == 'X' and row['id'] not in X_KEPT:
                continue
            o, miss = build(row, g, src)
            if miss:
                missing.append((row['id'], miss))
                continue
            b = limits(o)
            if b:
                over.append((row['id'], b))
            rows.append(o)
            counts[g['lang']] += 1
    rows.sort(key=lambda o: (o['id'] not in first_ids, o['wib'], o['id']))
    # X rows written before X became English only: the regenerated wording-needed.json no longer
    # lists them, so they are rebuilt from the earlier file (git HEAD) and kept at the end.
    kept = []
    old = json.load(open(f'{S}/wording-needed-old.json'))
    for g in old['groups']:
        if g['lang'] not in LANGS:
            continue
        for row in g['rows']:
            if row['platform'] == 'X' and row['id'] in X_KEPT:
                o, miss = build(row, g, srcs[g['lang']])
                if miss:
                    missing.append((row['id'], miss)); continue
                b = limits(o)
                if b:
                    over.append((row['id'], b))
                o['kept_x'] = 'Written before X was set to English only; not in the current wording-needed.json. Kept, not to be scheduled unless the owner says so.'
                kept.append(o)
    kept.sort(key=lambda o: (o['wib'], o['id']))
    xcounts = collections.Counter(o['lang'] for o in kept)
    rows += kept
    for o in rows:
        o['first_window'] = o['id'] in first_ids
    meta = {'rows': len(rows), 'per_language': dict(counts), 'kept_x_rows_per_language': dict(xcounts), 'first_window_rows': sum(o['first_window'] for o in rows),
            'order': 'first-window rows (deliveries-first.json) first, then by WIB time',
            'prices': 'each country\'s own App Store price, read from App Store Connect and the store lookup on 2026-11-21',
            'fields': 'caption and first_comment are ready to paste; title, poll and sticker appear where the row asks for them'}
    json.dump({'meta': meta, 'rows': rows}, open(f'{CAL}/wording-done.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('rows', len(rows), dict(counts), 'kept X', dict(xcounts))
    print('first-window rows', meta['first_window_rows'])
    only = sys.argv[1] if len(sys.argv) > 1 else None
    mm = [m for m in missing if (not only or f'-{only}-' in m[0] or m[0].endswith('-' + only))]
    print('missing', len(missing), 'shown', len(mm))
    by = collections.Counter(re.sub(r'^(P\d+|X-heavy)-', '', i).rsplit('-', 1)[0] if i.startswith('P') else i for i, _ in missing)
    print(' by lang', dict(by))
    for i, m in mm[:60]:
        print('  ', i, m)
    print('over limit', len(over))
    for i, b in over:
        if not only or f'-{only}-' in i:
            print('  ', i, b)
    # sentence reuse across posts within a language
    for l in LANGS:
        if only and l != only:
            continue
        seen = collections.defaultdict(set)
        for p, F in srcs[l].items():
            for k in ('B', 'B2', 'Q', 'TK', 'FC', 'X', 'PQ', 'TQ', 'T', 'H'):
                for s in re.split(r'(?<=[.!?。！？؟])(?![\d\w»”"“」])\s*|\n+', F.get(k, '')):
                    s = s.strip()
                    if len(s) >= (8 if l in ('ja', 'zh-Hant', 'zh-Hans') else 18):
                        seen[s].add(p)
        d = {s: sorted(v) for s, v in seen.items() if len(v) > 1}
        if d:
            print('reused sentences', l, len(d))
            for s, v in d.items():
                print('   ', v, s)
    # dump one language's prose for the scanner
    if only and srcs.get(only):
        with open(f'{S}/prose-{only}.txt', 'w', encoding='utf-8') as f:
            for p, F in srcs[only].items():
                for k in ('B', 'B2', 'Q', 'TK', 'FC', 'X', 'T', 'H'):
                    if F.get(k):
                        f.write(F[k].replace('\n\n', '\n') + '\n')


main()
