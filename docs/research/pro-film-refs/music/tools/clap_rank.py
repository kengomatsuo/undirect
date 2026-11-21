"""Ranks embedded tracks by how close they sound to the reference films and to text prompts (LAION-CLAP space).

    venv/bin/python -I clap_rank.py <emb_dir> <items.json> <out.json>

Scores, each a cosine in CLAP space (higher = closer):
  ref   mean of the track's best quarter of windows against the centroid of the reference films
        (each film = the mean of its 10 s windows, so a long film counts the same as a short one)
  near  mean over films of the track's best window against that film: "sounds like at least part of one ref"
  text  mean of the best quarter of windows against the mean of the PROMPTS below (fixed before any result was seen)
  taste the same against the owner's direction: mean of his LIKED tracks minus mean of his REJECTED ones
  score z(text) + z(taste), the ranking used. ref and near are kept as columns only: on 2026-11-22 they put his
        rejected tracks above his liked ones (4/20 and 3/20 pairs), because the reference films lean cinematic.
Tracks already offered in reels 1 and 2 are left out of the 'top' list, and an artist appears at most twice in it.
Calibration: the owner's verdicts on reels 1 and 2 (LIKED, REJECTED) are printed with each score and the share of
liked-rejected pairs each score orders correctly (0.5 = chance).
"""
import sys, os, json, glob
import numpy as np

PROMPTS = [
    'Apple iPhone product film music, modern, confident, catchy build',
    'Samsung Galaxy launch film music, sleek electronic, rising energy',
    'modern minimal electronic beat for a tech product advert, punchy drums, deep bass',
    'stylish confident pop instrumental with a big lift, premium commercial',
]
# Zero-shot tags: each group's best-matching words become the track's 'tags' line (CLAP's own reading, no captioner).
TAGS = {
    'genre': ['hip hop beat', 'trap', 'lo-fi', 'house', 'future bass', 'synthwave', 'pop', 'indie rock', 'cinematic orchestral',
              'ambient', 'corporate', 'funk', 'jazz', 'drum and bass', 'piano ballad', 'phonk', 'chillout', 'electro pop'],
    'mood': ['confident', 'uplifting', 'dark', 'tense', 'playful', 'calm', 'epic', 'melancholic', 'energetic', 'cool', 'cheesy'],
    'sound': ['deep sub bass', '808 drums', 'acoustic guitar', 'electric guitar', 'synth lead', 'piano', 'strings', 'claps',
              'vocal chops', 'brass', 'plucks', 'pads'],
}
LIKED, ALSO, REJECTED = [1, 2, 13, 16], [7], [3, 4, 5, 6, 8]


def unit(v):
    return v / np.linalg.norm(v, axis=-1, keepdims=True)


def topq(s):
    s = np.sort(s)[::-1]
    return float(s[:max(1, len(s) // 4)].mean())


sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))


def main(emb, items_path, out):
    films = {os.path.basename(f)[4:-4]: unit(np.load(f)['emb'].mean(0)) for f in glob.glob(f'{emb}/ref-*.npz')}
    F = np.stack(list(films.values()))
    cen = unit(F.mean(0))
    from clap_embed import Clap
    clap = Clap()
    tv = unit(clap.text(PROMPTS).mean(0))
    tagv = {g: clap.text(ws) for g, ws in TAGS.items()}
    items = json.load(open(items_path))
    mean_of = lambda n: unit(np.load(f'{emb}/reel-{n}.npz')['emb'].mean(0))
    taste_from = lambda liked, rejected: unit(np.mean([mean_of(n) for n in liked], 0) -
                                              np.mean([mean_of(n) for n in rejected], 0))
    taste = taste_from(LIKED, REJECTED)
    rows = []
    for it in items:
        p = f"{emb}/{it['key']}.npz"
        if not os.path.exists(p):
            continue
        E = np.load(p)['emb']
        m = unit(E.mean(0))
        tags = {g: [TAGS[g][j] for j in np.argsort(-(v @ m))[:2 if g != 'sound' else 3]] for g, v in tagv.items()}
        rows.append(dict(it, tags_clap=tags, ref=topq(E @ cen), near=float((E @ F.T).max(0).mean()), text=topq(E @ tv),
                         taste=topq(E @ taste),
                         best_t=float(np.load(p)['t'][int(np.argmax(E @ cen))])))
    for k in ('ref', 'near', 'text', 'taste'):
        v = np.array([r[k] for r in rows])
        for r in rows:
            r[k + '_z'] = float((r[k] - v.mean()) / v.std())
    for r in rows:
        r['score'] = r['text_z'] + r['taste_z']
    rows.sort(key=lambda r: -r['score'])
    for i, r in enumerate(rows):
        r['rank'] = i + 1
    offered = {r.get('url') for r in rows if r['key'].startswith('reel-')}
    top, per_artist = [], {}
    for r in rows:
        a = r.get('artist') or r['key']
        if r['key'].startswith('reel-') or r.get('url') in offered or per_artist.get(a, 0) >= 2:
            continue
        per_artist[a] = per_artist.get(a, 0) + 1
        top.append(r['key'])
        if len(top) == 10:
            break
    json.dump(dict(films=list(films), prompts=PROMPTS, top=top, rows=rows), open(out, 'w'), ensure_ascii=False,
              indent=1)

    reel = {r['n']: r for r in rows if r['key'].startswith('reel-')}
    print(f'{len(rows)} tracks ranked; references: {", ".join(films)}')
    print('\nCalibration (rank of', len(rows), ')')
    for n in sorted(reel):
        r = reel[n]
        tag = 'LIKED' if n in LIKED else 'other film' if n in ALSO else 'REJECTED' if n in REJECTED else ''
        print(f"{n:>3} {r['title'][:24]:<24} {tag:<10} ref {r['ref']:.3f} near {r['near']:.3f} text {r['text']:.3f}"
              f" taste {r['taste']:+.3f} score {r['score']:+.2f} rank {r['rank']}")
    for k in ('ref', 'near', 'text', 'taste', 'score'):
        good = [reel[n][k] for n in LIKED if n in reel]
        bad = [reel[n][k] for n in REJECTED if n in reel]
        pairs = [(g > b) + 0.5 * (g == b) for g in good for b in bad]
        print(f'{k:>5}: liked above rejected in {sum(pairs)}/{len(pairs)} pairs ({sum(pairs) / len(pairs):.2f})')




def leave_one_out(emb):
    """Taste direction rebuilt without each verdict in turn; the held-out track is compared with every track of the
    other verdict. Prints the share of those pairs ordered as the owner ordered them."""
    mean_of = lambda n: unit(np.load(f'{emb}/reel-{n}.npz')['emb'].mean(0))
    win = []
    for h in LIKED + REJECTED:
        L, R = [n for n in LIKED if n != h], [n for n in REJECTED if n != h]
        d = unit(np.mean([mean_of(n) for n in L], 0) - np.mean([mean_of(n) for n in R], 0))
        s = lambda n: topq(np.load(f'{emb}/reel-{n}.npz')['emb'] @ d)
        win += [s(h) > s(o) if h in LIKED else s(h) < s(o) for o in (R if h in LIKED else L)]
    print(f'taste, leave one out: {sum(win)}/{len(win)} pairs ordered as the owner did')


if __name__ == '__main__':
    main(*sys.argv[1:4])
    leave_one_out(sys.argv[1])
