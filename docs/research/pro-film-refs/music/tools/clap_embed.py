"""Embeds audio with LAION-CLAP (laion/clap-htsat-unfused, Apache-2.0) so tracks can be ranked by how they sound.

Each file is decoded to 48 kHz mono, cut into 10 s windows every 5 s (near-silent windows dropped), and each window
becomes one 512-d unit vector. Results go to <out>/<key>.npz (emb, t). Downloads stream to a temp file and are
deleted after embedding.

    venv/bin/python -I clap_embed.py <items.json> <out_dir>      # items: [{key, url | page (OpenTracks) | file}]
Runs in ~/.cache/audio-tools/venv (torch, transformers, numpy). HF_HOME=~/.cache/audio-tools/hf keeps the weights there.
"""
import sys, os, shutil, json, re, html, subprocess, tempfile, threading, queue, urllib.request
import numpy as np
import torch
from transformers import ClapModel, ClapProcessor

SR, WIN, HOP = 48000, 10.0, 5.0
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15'
MODEL = os.environ.get('CLAP_MODEL', os.path.expanduser('~/.cache/audio-tools/models/clap-htsat-unfused'))  # laion/clap-htsat-unfused; laion/larger_clap_music on HF is broken (see audio-understanding.md)


def get(u, ref=None, rng=None):
    h = {'User-Agent': UA}
    if ref:
        h['Referer'] = ref
    if rng:
        h['Range'] = 'bytes=%d-%d' % rng
    return urllib.request.urlopen(urllib.request.Request(u, headers=h), timeout=180).read()


def fetch_one(it, tmp):
    """Whole file, or only bytes 30-60 % of it when the item says part=True (the body of the track, under a third of the
    transfer; ffmpeg resyncs on the first MP3 frame)."""
    u, ref = source_url(it)
    rng = None
    if it.get('part'):
        n = int(urllib.request.urlopen(urllib.request.Request(u, method='HEAD', headers={'User-Agent': UA}),
                                       timeout=60).headers['Content-Length'])
        rng = (int(n * 0.3), int(n * 0.6))
    p = os.path.join(tmp, re.sub(r'\W', '_', it['key']) + '.mp3')
    open(p, 'wb').write(get(u, ref, rng))
    return p


def source_url(it):
    if it.get('url'):
        return it['url'], None
    # OpenTracks: the detail page carries the file in its <source> tag
    h = get(it['page']).decode('utf-8', 'replace')
    return html.unescape(re.search(r'<source src="([^"]+)"', h).group(1)), 'https://opentracks.com/'


def decode(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32)


def windows(x):
    w, h = int(WIN * SR), int(HOP * SR)
    out, ts = [], []
    starts = list(range(0, max(1, len(x) - w + 1), h)) if len(x) >= w else [0]
    for s in starts:
        seg = x[s:s + w]
        if len(seg) < w:
            seg = np.pad(seg, (0, w - len(seg)))
        if 20 * np.log10(np.sqrt(np.mean(seg ** 2)) + 1e-9) < -45:
            continue
        out.append(seg)
        ts.append(s / SR)
    return out, ts


class Clap:
    def __init__(self):
        self.dev = 'mps' if torch.backends.mps.is_available() else 'cpu'
        self.m = ClapModel.from_pretrained(MODEL).to(self.dev).eval()
        self.p = ClapProcessor.from_pretrained(MODEL)

    @torch.no_grad()
    def audio(self, segs, bs=8):
        es = []
        for i in range(0, len(segs), bs):
            f = self.p(audio=segs[i:i + bs], sampling_rate=SR, return_tensors='pt')
            f = {k: v.to(self.dev) for k, v in f.items()}
            e = self.m.get_audio_features(**f)
            e = e.pooler_output if hasattr(e, 'pooler_output') else e
            es.append(torch.nn.functional.normalize(e, dim=-1).cpu().numpy())
        return np.concatenate(es)

    @torch.no_grad()
    def text(self, prompts):
        f = self.p(text=prompts, return_tensors='pt', padding=True)
        f = {k: v.to(self.dev) for k, v in f.items()}
        e = self.m.get_text_features(**f)
        e = e.pooler_output if hasattr(e, 'pooler_output') else e
        return torch.nn.functional.normalize(e, dim=-1).cpu().numpy()


def main(items_path, out):
    os.makedirs(out, exist_ok=True)
    items = [it for it in json.load(open(items_path)) if not os.path.exists(f"{out}/{it['key']}.npz")]
    q = queue.Queue(maxsize=12)
    tmp = tempfile.mkdtemp(prefix='clapdl-')

    todo = queue.Queue()
    for it in items:
        todo.put(it)
    workers = 8

    def fetch():
        while True:
            try:
                it = todo.get_nowait()
            except queue.Empty:
                q.put(None)
                return
            try:
                if it.get('file'):
                    q.put((it, it['file'], False))
                else:
                    q.put((it, fetch_one(it, tmp), True))
            except Exception as e:
                print('ERR fetch', it['key'], e, flush=True)

    for _ in range(workers):
        threading.Thread(target=fetch, daemon=True).start()
    clap = Clap()
    n = 0
    done_workers = 0
    while done_workers < workers:
        job = q.get()
        if job is None:
            done_workers += 1
            continue
        it, p, tmpfile = job
        try:
            segs, ts = windows(decode(p))
            if segs:
                np.savez(f"{out}/{it['key']}.npz", emb=clap.audio(segs), t=np.array(ts), dur=len(segs))
        except Exception as e:
            print('ERR embed', it['key'], e, flush=True)
        finally:
            if tmpfile and os.path.exists(p):
                os.remove(p)
        n += 1
        if n % 25 == 0:
            print(n, '/', len(items), flush=True)
    shutil.rmtree(tmp, ignore_errors=True)
    print('done', n)




def prefetch(items_path, dl_dir, out_items):
    """Download every item to dl_dir first (8 at a time) and write a copy of the items with 'file' set."""
    from concurrent.futures import ThreadPoolExecutor
    os.makedirs(dl_dir, exist_ok=True)
    items = json.load(open(items_path))

    def one(it):
        if it.get('file'):
            return it
        p = os.path.join(dl_dir, re.sub(r'\W', '_', it['key']) + '.mp3')
        if not (os.path.exists(p) and os.path.getsize(p) > 50000):
            try:
                os.replace(fetch_one(it, dl_dir), p)
            except Exception as e:
                print('ERR fetch', it['key'], e, flush=True)
                return None
        return dict(it, file=p)

    with ThreadPoolExecutor(8) as ex:
        got = [r for r in ex.map(one, items) if r]
    json.dump(got, open(out_items, 'w'), ensure_ascii=False)
    print('fetched', len(got), 'of', len(items))


if __name__ == '__main__':
    if sys.argv[1] == 'fetch':
        prefetch(*sys.argv[2:5])  # clap_embed.py fetch <items.json> <dl_dir> <items-with-files.json>
    else:
        main(sys.argv[1], sys.argv[2])
