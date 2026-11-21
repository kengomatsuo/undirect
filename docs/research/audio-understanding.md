# Audio understanding: models that let an agent hear music (ASG143)

Written 2026-11-22. The ask: a way to pick music for Monholt's promo films by how it sounds,
not by tempo and loudness alone. Every row below was read on the page named in its source
column that day (GitHub API for repo licences, the Hugging Face API for model licences and file
sizes, PyPI for wheels). "Runs here" means on this Mac: Apple M3, 16 GB shared by every session,
no Docker. GUESS marks what was not read from a source.

## 1. The repo the owner remembered

His saved reel DfII6u2Nl_p (@ultra.skills, "three free sound tools for Claude-made videos",
`instagram-saves-social.md`) shows **Earshot**, **RealSFX** and the Openverse API.

- **Earshot** is `github.com/Leonxlnx/earshot` (MIT, 5,453 stars, created 2026-10-15, pushed
  2026-11-20). Its own description: "Sound effects for coding agents: ask in plain words and
  earshot renders the sound in code. CPU-only, no audio model, open source." It **makes** sound
  effects; it does not listen to audio, so it cannot rank music.
- **RealSFX**: GitHub search for `realsfx` returns nothing (2026-11-22). Still unnamed.
- The tools that actually understand sound, effects included, are the ones below; CLAP is the
  one sound-effect search engines are built on (for example `TaaroBravo/semantic-audio-search`,
  MIT: "Self-hosted semantic audio search engine powered by CLAP").

## 2. The candidates

| Tool | What it outputs | Licence (code / weights) | Size | Runs here | Source |
|---|---|---|---|---|---|
| **LAION-CLAP**, `laion/clap-htsat-unfused` | 512-d vectors for audio and for text in one space: text-to-audio and audio-to-audio similarity, zero-shot tags from any word list | code CC0-1.0; weights Apache-2.0 | 0.61 GB | **Yes, installed and used** (transformers on PyTorch MPS) | github.com/LAION-AI/CLAP; huggingface.co/laion/clap-htsat-unfused |
| LAION-CLAP music checkpoint on Hugging Face, `laion/larger_clap_music` | should be the music-tuned version of the row above | Apache-2.0 | 0.78 GB | **Broken as published**: downloaded, sha256 matches Hugging Face's, loads with no missing keys, yet every text prompt gets the same vector and noise scores 0.98 against music. The model's own discussion #2 ("Equally-weighted output", opened 2023-12-05, still unanswered 2026-01-04) reports the same. The original checkpoint `music_audioset_epoch_15_esc_90.14.pt` (lukewys/laion_clap, CC0, 2.35 GB, `laion_clap` package) was not tried | huggingface.co/laion/larger_clap_music/discussions/2 |
| **Microsoft CLAP** (`msclap`) | the same kind of similarity, plus a captioner (`clapcap`) | code MIT (repo and PyPI `msclap` 1.3.4); weights repo `microsoft/msclap` (2022, 2023 and clapcap checkpoints together 4.74 GB) | about 0.7-2 GB per checkpoint (GUESS from the 4.74 GB total) | Probably: pure PyTorch (GUESS, not installed) | github.com/microsoft/CLAP; huggingface.co/microsoft/msclap |
| **Essentia TensorFlow models** | fixed labels: Discogs genre (400 styles), mood and theme, instruments, danceability, voice or instrumental, plus embeddings | library AGPL-3.0; models CC BY-NC-SA 4.0: "All the models created by the MTG are licensed under CC BY-NC-SA 4.0 and are also available under proprietary license upon request" | small (GUESS: the size request timed out) | Yes: PyPI `essentia-tensorflow` 2.1b6.dev1438 ships a macOS 15 arm64 wheel (cp314) | github.com/MTG/essentia; essentia.upf.edu/models.html |
| **PANNs** (`audioset_tagging_cnn`, `panns-inference`) | 527 AudioSet labels with probabilities (music genres, instruments, sound effects) and a 2048-d embedding | code MIT; weights CC BY 4.0 (Zenodo record 3987831) | Cnn14 about 0.31-0.33 GB | Probably: plain PyTorch (GUESS, not installed) | github.com/qiuqiangkong/audioset_tagging_cnn; zenodo.org/records/3987831 |
| **MOSS-Music-8B** (OpenMOSS, released 2026-05-01) | free text: music captions, key, tempo, chords, structure, lyrics, answers to questions | Apache-2.0 | bf16 18.1 GB; MLX 4-bit 6.0 GB (`mlx-community/MOSS-Music-8B-Thinking-4bit`) | **Yes, installed** via `mlx-audio` 0.6.7 (`mlx_audio/stt/models/moss_music`) | huggingface.co/OpenMOSS-Team/MOSS-Music-8B-Thinking; github.com/OpenMOSS/MOSS-Music |
| **Qwen2-Audio-7B-Instruct** | free text about any audio, music included | Apache-2.0 (model card) | bf16 16.8 GB; MLX 4-bit 6.56 GB | Yes on paper via `mlx-audio` (`mlx-community/Qwen2-Audio-7B-Instruct-4bit`); not installed, MOSS-Music chosen instead | huggingface.co/Qwen/Qwen2-Audio-7B-Instruct; its MLX card says "~4.7 tokens/sec" on M-series |
| **Qwen2.5-Omni** | free text (and speech) | 3B: Qwen Research licence (non-commercial); 7B: Apache-2.0 | 3B MLX 4-bit thinker 2.55 GB; 7B bf16 22.4 GB | 3B yes via MLX, but its licence rules out our commercial use; 7B too big unquantised | huggingface.co/Qwen/Qwen2.5-Omni-3B and -7B |
| **Qwen3-Omni-30B-A3B** (Instruct, Captioner) | free text; the Captioner writes detailed audio captions | Apache-2.0 | MLX 4-bit 21.8 GB; Captioner bf16 63.4 GB | No: larger than the Mac's 16 GB | huggingface.co/Qwen/Qwen3-Omni-30B-A3B-Captioner; github.com/QwenLM/Qwen3-Omni |
| **NVIDIA Audio Flamingo 3, Music Flamingo** | free text, music QA | "NVIDIA OneWay Noncommercial License" | 17.9 GB, 16.5 GB | No: non-commercial, and no MLX port found | huggingface.co/nvidia/audio-flamingo-3; /nvidia/music-flamingo-hf |
| **SALMONN** (ByteDance, Tsinghua) | free text | code and weights Apache-2.0 | 7B and 13B, on top of Vicuna, Whisper and BEATs | Not practical: three stacked models; GUESS that its inference code expects CUDA | github.com/bytedance/SALMONN; huggingface.co/tsinghua-ee/SALMONN-7B |
| **LTU** (Listen, Think, Understand) | free text | no LICENSE file in the repo; LLaMA-based | 7B | Not practical (no licence, GUESS CUDA-only) | github.com/YuanGongND/ltu |
| **MERT** (m-a-p) | embeddings only; needs a trained head to say anything | code Apache-2.0; weights CC BY-NC 4.0 | 95M (1.7 GB repo), 330M (5.25 GB) | Yes, but non-commercial weights and no labels | github.com/yizhilll/MERT; huggingface.co/m-a-p/MERT-v1-95M |
| **LP-MusicCaps** | one music caption per 10 s | model card MIT | repo 5.35 GB with several checkpoints | Probably (PyTorch BART); superseded by MOSS-Music for captions | github.com/seungheondoh/lp-music-caps; huggingface.co/seungheondoh/lp-music-caps |

MOSS-Music's own evaluation (model card): MOSS-Music-8B-Instruct averages 80.38 across eight
public music QA benchmarks against Gemini 3.1 Pro's 75.17 and Music Flamingo's 73.87; the
Thinking variant scores 4.53 on MusicCaps captioning by a GPT-5.4 judge. That, a music-only
training set, the Apache licence and a 6 GB MLX build are why it replaced Qwen2-Audio as the
describer.

## 3. What is installed

`~/.cache/audio-tools/`: a Python 3.12 venv (`venv/`: torch 2.15, transformers 5.24, mlx-audio
0.6.7; transformers 4.57.1 after a 5.24 test showed the same broken output, so the fault is the checkpoint), `models/clap-htsat-unfused/` and `models/moss-music-4bit/`. `pget.sh`
downloads a Hugging Face file in 16 ranged parts, since the Hugging Face client stalled on
this connection.

The scripts live with the other music tools, in `pro-film-refs/music/tools/`:

- `clap_embed.py`: downloads each track (Mixkit as the middle third of the file), cuts 10 s
  windows every 5 s, and stores one CLAP vector per window; downloads are deleted.
- `clap_rank.py`: scores each track against the reference films and the text prompts and
  prints the calibration against the owner's verdicts.
- `describe.py`: MOSS-Music writes one line per track.

## 4. Run on our problem (2026-11-22)

**Pool:** every Mixkit track (923, heard from the middle third of each file to save transfer), every
Unminus track the site lists (51, crawled from its artist and mood pages), HoliznaCC0's 65 CC0
tracks, and the 59 OpenTracks tracks already screened for reel 2 (one fetch failed). 1,114
embeddings in all, the 16 reel tracks included.

**References:** the audio of eight films with no or almost no voice, from `pro-film-refs/`: Apple
iPhone 15 Pro Titanium, 16 Pro reveal, 17 Pro ad, 17 "scratch", 18 Pro ad; Samsung One UI 8.5,
the 8th-gen short and the Fold8 short. Downloaded with yt-dlp and deleted after embedding.

**Scores** (`clap_rank.py`), each the mean of a track's best quarter of 10 s windows:

- `ref`: closeness to the centroid of the eight films; `near`: best window against each film.
- `text`: closeness to four prompts written before any result was seen, starting with "Apple
  iPhone product film music, modern, confident, catchy build".
- `taste`: closeness to the owner's direction: the mean of reel tracks 1, 2, 13 and 16 minus the
  mean of 3, 4, 5, 6 and 8.

### Calibration against the owner's ear

Pairs of one liked and one rejected track that each score puts in his order (20 pairs; 10 is chance):

| Score | Liked above rejected |
|---|---|
| `ref`, closeness to the Apple and Samsung films | **4 of 20**: backwards |
| `near` | 3 of 20: backwards |
| `text`, the four prompts | **19 of 20** |
| `taste`, rebuilt without each verdict in turn (leave one out) | **40 of 40** held-out comparisons |

**Closeness to the reference films does not match his ear; it runs against it.** CLAP hears the
Apple films as swelling, cinematic beds, and his rejects (Atoms in Peace, Born of the Sky, Other
World) are the cinematic tracks, so they sit closest. Per film, only Samsung One UI 8.5 scored above
chance (12 of 20); the iPhone 18 Pro ad scored 0 of 20. What he keeps is beat-led: 808s, punchy
drums, trap and hip-hop. Single prompts confirm it: "trap beat" and "modern minimal electronic
beat for a tech product advert, punchy drums, deep bass" order all 20 pairs his way; "cinematic
orchestral score" orders 2.

So the ranking uses `text` plus `taste`, and `ref` is kept as a column only. Two limits: nine
verdicts is a small sample, and every verdict was on tracks he called "meh", so the scores learn
"beat-led, not cinematic", not "great rather than meh". Unrated reel-2 tracks (Torey, Lil Pump
Type, Bowers & Wilkins) land in the top 60 of 1,114, which says the model hears them as his kind
of track; it cannot tell which of them he will love.

MOSS-Music's lines on the calibration tracks (from 30 s clips):

| Reel track | Owner | ref | text | taste | rank of 1,114 | MOSS-Music |
|---|---|---|---|---|---|---|
| 1 Thunder | liked | 0.639 | 0.457 | +0.445 | 42 | This track is an instrumental hip-hop piece featuring a steady 808 bassline, sharp trap-style beats, and repetitive synth patterns, maintaining a tense, mid-tempo energy that stays level. |
| 2 Waveform | liked | 0.543 | 0.403 | +0.529 | 67 | This is an energetic instrumental hip-hop track featuring a steady boom-bap beat, maintaining consistent dynamics. |
| 13 Chill Trap | liked | 0.666 | 0.486 | +0.338 | 63 | A short, steady instrumental hip-hop/chillhop track featuring a drum machine beat and a synth or electric/acoustic piano/guitar melody, with a constant, slightly mellow or neutral background vibe that stays level for its 6-second duration. |
| 16 Electro Dreams | liked | 0.517 | 0.433 | +0.496 | 47 | This is a suspenseful, energetic media score featuring strings (violins/cellos) and percussion, building in tension and intensity toward its end. |
| 7 5 Stages of You | liked for a different film | 0.612 | 0.408 | +0.408 | 149 | This instrumental hip hop track features bass, drums, and a melancholic melody on a key instrument (piano/synth), maintaining a consistent, steady mellow mood from 0:13 to 0:28. |
| 3 Other World | rejected | 0.675 | 0.398 | +0.062 | 576 | This is a melancholic instrumental track featuring an acoustic guitar, characterized by a steady, medium-paced rhythm that maintains a relatively constant, somber mood without significant dynamic builds or drops. |
| 4 Atoms in Peace | rejected | 0.738 | 0.364 | -0.108 | 884 | This is an upbeat, driving electronic trance track featuring prominent synthesizers that gradually build in intensity and drops into high-energy sections. |
| 5 Kickin' Heart | rejected | 0.636 | 0.384 | +0.101 | 566 | This is a steady, mid-tempo ambient/electronic track driven by a synthetic beat, which uses melancholic lead synth melodies and sweeping riser sound effects to build a continuous, contemplative yet forward-moving mood. |
| 6 Silent Descent | rejected | 0.563 | 0.316 | -0.333 | 1085 | This is a cinematic orchestral piece featuring woodwinds (flute, oboe) and strings, evoking a melancholic yet sweeping and epic mood. The energy remains steady but gradually builds in intensity, starting around 0:23. |
| 8 Born of the Sky | rejected | 0.719 | 0.404 | -0.260 | 939 | This piece is epic, cinematic orchestral music that builds in energy, featuring prominent lead strings and brass instruments, conveying an intense, dramatic, and somewhat melancholic mood. |

The words separate them too: eight of nine verdicts follow "hip-hop beat" against "orchestral,
acoustic, ambient or trance". Electro Dreams (16, liked) is the exception: from its 30 s clip the
model heard a strings-and-percussion score.

### Top 10 for reel 3

Tracks already offered in reels 1 and 2 are left out, and no artist appears more than twice.
Score is z(text) + z(taste); ref is the closeness to the films, for reference. Full data in
`pro-film-refs/music/reel-3-candidates.json`.

| # | Track | Source | Licence | Score | ref | MOSS-Music, one line |
|---|---|---|---|---|---|---|
| 1 | **Chalie Puth**, Arulo | Mixkit (https://assets.mixkit.co/music/326/326.mp3) | Mixkit Stock Music Free License: commercial, any platform, no credit | 3.44 | 0.56 | This upbeat 80s-style synth-pop/funk instrumental track (0:29-0:31) features a driving electronic drum beat, prominent bass, and bright synthesizer lead, maintaining a consistent energetic and positive groove throughout its excerpt. |
| 2 | **Complicated**, Arulo | Mixkit (https://assets.mixkit.co/music/281/281.mp3) | Mixkit Stock Music Free License: commercial, any platform, no credit | 3.39 | 0.60 | This is a mellow, melancholic lo-fi hip-hop/chillhop instrumental track featuring a steady boom-bap beat, prominent piano/synth lead, and a consistent, contemplative, mid-tempo energy that builds no significant tension or dynamic shifts. |
| 3 | **Hangtime**, WOWA | Unminus (https://feeds.soundcloud.com/stream/768679555-unminus-hangtime.mp3) | Unminus License: commercial, any platform, no credit | 3.25 | 0.70 | Based on the audio, I would describe this as a steady, mid-tempo hip-hop or trap instrumental track. It features heavy bass (808s), rhythmic drums/percussion, and a repetitive, somewhat dark or moody synth melody. The energy is consistent and driving, designed for mixing picture rather than having a dynamic build. |
| 4 | **Christmas in the Guetto**, Michael Ramir C. | Mixkit (https://assets.mixkit.co/music/899/899.mp3) | Mixkit Stock Music Free License: commercial, any platform, no credit | 3.13 | 0.68 | This instrumental track falls into the pop or corporate background music genre, featuring bass and drums as lead instruments, and has an upbeat, positive, and energetic mood that builds slightly in intensity. |
| 5 | **Latin By Coldise Free Edm Music**, Coldise | Unminus (https://feeds.soundcloud.com/stream/1270254490-unminus-latin-by-coldise-free-edm-music.mp3) | Unminus License: commercial, any platform, no credit | 3.13 | 0.66 | This high-energy electronic track, driven by fast-paced synthesizers and a steady beat, creates an upbeat, almost sterile or corporate mood, maintaining a constant, driving energy throughout. |
| 6 | **South Waves**, Eugenio Mininni | Mixkit (https://assets.mixkit.co/music/555/555.mp3) | Mixkit Stock Music Free License: commercial, any platform, no credit | 3.11 | 0.56 | This fast-paced instrumental track fuses electronic beats and synthesizers into an energetic, action-oriented score; it maintains a relentless, driving intensity from beginning to end. |
| 7 | **Barry Under**, Uberan Mino | Unminus (https://feeds.soundcloud.com/stream/1923324272-unminus-barry-under.mp3) | Unminus License: commercial, any platform, no credit | 3.08 | 0.72 | This is an energetic, trance-style electronic track driven by a steady 4/4 beat, pulsing bass, and arpeggiated synths, creating an uplifting, hypnotic, and consistently high-energy mood. |
| 8 | **Dont Care**, Kit Wheston | Unminus (https://feeds.soundcloud.com/stream/2372644364-unminus-dont-care.mp3) | Unminus License: commercial, any platform, no credit | 2.92 | 0.73 | This is a melancholic instrumental hip-hop/trap beat featuring heavy bass and steady drums. It maintains a mid-tempo, somber, "sad" or "tough" vibe, staying at a consistent level rather than building significantly during the initial 23-second excerpt. |
| 9 | **You're Somewhere in Between**, Michael Ramir C. | Mixkit (https://assets.mixkit.co/music/928/928.mp3) | Mixkit Stock Music Free License: commercial, any platform, no credit | 2.90 | 0.56 | This fast-paced instrumental pop/electronic track features driving beats and bright lead instruments (like guitars or synths) for an upbeat, positive, and energetic feel that builds consistently in intensity. |
| 10 | **Macario**, Mauro Urbina | Mixkit (https://assets.mixkit.co/music/772/772.mp3) | Mixkit Stock Music Free License: commercial, any platform, no credit | 2.89 | 0.65 | This high-energy rock/instrumental track features heavy electric guitar riffs and driving percussion, building in intensity from its rhythmic opening (0:02) through increasingly urgent chord progressions (0:13-0:46) to a dynamic peak (0:59), perfectly suited for action or thriller editing. |

**Disagreements to hear for yourself:** CLAP's zero-shot tags call all ten "hip hop beat", but
MOSS-Music hears only Complicated, Hangtime and Dont Care as hip-hop or trap. It hears Barry
Under as trance (his rejected Atoms in Peace was trance), Macario as guitar rock, and Christmas in
the Guetto, Latin by Coldise and You're Somewhere in Between as pop or corporate. If the
describer is right, the closest matches to his kept tracks are 2, 3 and 8. Both models are machine
listening; neither replaces his ear.

Licences: Mixkit and Unminus rows are as recorded in `product-video/research/audio-library.md`
section 2 (read 2026-11-21): commercial use on any platform, no credit, never register the track
with Content ID. No OpenTracks or HoliznaCC0 track made the top 10.

### Practical notes

- Speed here: CLAP embedded 1,114 tracks in about 5 minutes on MPS. MOSS-Music takes 40 to 100 s
  a track and peaks at 7.9 GB of memory, so run it only on a shortlist.
- MOSS-Music settings that work: temperature 0.7, top-p 0.9, repetition penalty 1.05. Greedy
  decoding loops ("no no no ..."); a 1.15 penalty garbles answers into digits; one run in 20 still
  degenerated into digits and gave a clean answer on a retry.
- `laion/larger_clap_music` on Hugging Face is broken (section 2); use `clap-htsat-unfused` or the
  original `laion_clap` music checkpoint.

### Rerun

```
cd <scratch>; P=~/Repositories/undirect/docs/research/pro-film-refs/music/tools
~/.cache/audio-tools/venv/bin/python -I $P/clap_embed.py fetch items.json dl items-files.json
~/.cache/audio-tools/venv/bin/python -I $P/clap_embed.py refs.json emb          # refs: [{key: "ref-x", file}]
~/.cache/audio-tools/venv/bin/python -I $P/clap_embed.py items-files.json emb
~/.cache/audio-tools/venv/bin/python -I $P/clap_rank.py emb items-files.json ranked.json
~/.cache/audio-tools/venv/bin/python -I $P/describe.py ranked.json key1,key2 desc.json
```
