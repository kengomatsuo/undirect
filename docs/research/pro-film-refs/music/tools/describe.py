"""Writes one line per track with MOSS-Music-8B (Apache-2.0, 4-bit MLX, via mlx-audio), from a 30 s clip.

    venv/bin/python -I describe.py <ranked.json> <key1,key2,...> <out.json>

The clip starts where clap_rank found the track's most reference-like window (best_t, shifted by the 30 % offset when
clap_embed fetched only the middle third). The download is deleted after.
Model folder: $MOSS_MODEL, default ~/.cache/audio-tools/models/moss-music-4bit.
"""
import sys, os, re, json, subprocess, tempfile
sys.path.insert(0, os.path.dirname(__file__))
from clap_embed import fetch_one

PROMPT = ('Answer in English only, in one sentence of at most 40 words, for a film editor: the genre, lead instruments, '
          'mood and energy of this music, and whether it builds or stays level.')
MODEL = os.environ.get('MOSS_MODEL', os.path.expanduser('~/.cache/audio-tools/models/moss-music-4bit'))


def clip(it, tmp):
    src = fetch_one(dict(it, part=False), tmp)
    dur = float(subprocess.run(['ffprobe', '-v', '0', '-show_entries', 'format=duration', '-of', 'csv=p=0', src],
                               capture_output=True, text=True).stdout)
    start = it.get('best_t', 0) + (0.3 * dur if it.get('part') else 0)
    start = max(0, min(start, dur - 30))
    out = os.path.join(tmp, 'clip.wav')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(start), '-t', '30', '-i', src, '-ac', '1', '-ar', '16000',
                    out], check=True)
    os.remove(src)
    return out, start


def main(ranked, keys, out):
    from mlx_audio.stt import load
    rows = {r['key']: r for r in json.load(open(ranked))['rows']}
    done = json.load(open(out)) if os.path.exists(out) else {}
    model = load(MODEL)
    tmp = tempfile.mkdtemp(prefix='moss-')
    for k in keys.split(','):
        if k in done:
            continue
        wav, start = clip(rows[k], tmp)
        # Greedy decoding loops ("no no no ..."), and a 1.15 repetition penalty garbles the answer ("Based on23109:");
        # sampling at 0.7 with a light penalty gives whole answers. The <think> block is cut here; markdown is flattened.
        r = model.generate(wav, prompt=PROMPT, max_tokens=3000, temperature=0.7, top_p=0.9, repetition_penalty=1.05,
                           repetition_context_size=64, enable_time_marker=False, strip_thinking=False)
        line = re.sub(r'\s+', ' ', re.sub(r'[*#]', '', r.text.split('</think>')[-1])).strip()
        done[k] = dict(line=line, clip_start=round(start, 1), tokens_cap_hit='</think>' not in r.text)
        os.remove(wav)
        json.dump(done, open(out, 'w'), ensure_ascii=False, indent=1)
        print(k, '|', done[k]['line'], flush=True)
    os.rmdir(tmp)


if __name__ == '__main__':
    main(*sys.argv[1:4])
