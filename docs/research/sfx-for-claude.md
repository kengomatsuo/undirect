# Sound effects for Claude: finding and judging them by how they sound

Written 2026-11-22. The ask: a real way for Claude to find and judge sound effects for promo
films, the way music was picked (CLAP ranking plus a model's description of each track, see
`audio-understanding.md`). Claude cannot hear, so an audio model has to rank and describe every
candidate. Every row below was read on the named page that day (GitHub API for stars, last push
and repo licence; the Hugging Face API for model licence and gating; the vendor page for sound
licences). "Runs here" means this Mac: Apple M3, 16 GB shared by every session, no Docker, no
money spent. GUESS marks what was not read from a source.

## 1. What exists

### 1a. Skills, MCP servers and repos made for agents

| Tool | What it does | Licence | Stars / last push | Cost | Runs here | Source |
|---|---|---|---|---|---|---|
| **earshot** (`Leonxlnx/earshot`) | The repo from the owner's saved reel. A CLI, Python package, MCP server (20 tools), Claude Code plugin and two agent skills (`earshot`, `real-sound`). `make` renders a sound from a catalogue of 922 designs, 309 of them "learned from 692 recordings in the public domain", rendered by code; `build` layers recorded parts into a missing sound; `describe`, `match`, `rank`, `find` listen with CLAP `laion/larger_clap_general` plus the AudioSet tagger `MIT/ast-finetuned-audioset-10-10-0.4593` | MIT; "every sound it makes is yours to use" | 5,498 / 2026-11-22 | free, CPU only | Yes (Python 3.10+, about 350 MB base, 2.2 GB of models for listening) | https://github.com/Leonxlnx/earshot |
| `sandraschi/sfx-mcp` | MCP wrapper over the Freesound API: CC0 search, download, tag, local cache | MIT | 3 / 2026-11-22 | free, needs a Freesound API key | Yes (GUESS, not installed) | https://github.com/sandraschi/sfx-mcp |
| `johnkimdw/freesound-mcp-server` | MCP server for Freesound search | MIT | 11 / 2025-06-24 | free, needs a key | GUESS yes | https://github.com/johnkimdw/freesound-mcp-server |
| `timjrobinson/FreesoundMCPServer`, `MuShan-bit/freesound-mcp` | the same idea | MIT | 2 each / 2025-07, 2026-01 | free, needs a key | GUESS yes | https://github.com/timjrobinson/FreesoundMCPServer |
| `elevenlabs/elevenlabs-mcp` | official ElevenLabs MCP: text to speech and `text_to_sound_effects` | MIT | 1,558 / 2026-08-20, **archived** | paid service: the Free plan has 10,000 credits a month and a sound effect costs about 200, but the commercial licence starts at Starter (pricing page) | cloud | https://github.com/elevenlabs/elevenlabs-mcp, https://elevenlabs.io/pricing |
| `zavora-ai/mcp-sfxgen` | Rust MCP: Stable Audio locally on Apple Silicon, ElevenLabs in the cloud | "other" | 0 / 2026-10-04 | free locally | needs the gated Stable Audio weights | https://github.com/zavora-ai/mcp-sfxgen |
| `YZ2020CHINA/stable-audio-mcp` | local Stable Audio bridge as MCP and Codex plugin | MIT | 1 / 2026-11-11 | free | needs the gated weights | https://github.com/YZ2020CHINA/stable-audio-mcp |
| `TaaroBravo/semantic-audio-search` | self-hosted CLAP search over your own sound folder (FastAPI, Qdrant, Gradio) | MIT | 12 / 2025-10-04 | free | needs Qdrant (a container): no | https://github.com/TaaroBravo/semantic-audio-search |

### 1b. Sources of recorded sounds

| Source | What it holds | Licence of the sounds | Cost and access | Source |
|---|---|---|---|---|
| **Openverse API** (WordPress) | one search over 591,899 Freesound sounds, 4.0 M Wikimedia audio files and 644,709 Jamendo tracks, filterable by licence; each hit carries a direct file URL (Freesound's HQ MP3 preview), licence, creator and landing page | per sound: CC0, public domain mark, CC BY, and so on; `license=cc0,pdm` returns only no-credit sounds | **free, no key** for anonymous search (measured: "glass shatter" with `cc0,pdm` returns 157 hits) | https://api.openverse.org/v1/audio/ , https://api.openverse.org/v1/audio/stats/ |
| **Freesound API** | the same Freesound sounds with richer filters (duration, tags, descriptors); previews with a token, original files only with OAuth2 | per sound (CC0, CC BY, CC BY-NC) | free, but needs an account and an API key; none is in the vault, so Openverse stands in | https://freesound.org/docs/api/authentication.html |
| **Mixkit sound effects** | a few thousand artist-made effects by category page; preview MP3 at `assets.mixkit.co/active_storage/sfx/<id>/<id>-preview.mp3` | Mixkit Sound Effects Free License: "can be used in your commercial and non-commercial projects for free", lists "Online marketing ads", "Social Media video posts", "Commercial projects"; no credit asked | free, no account; category pages answer plain HTTP | https://mixkit.co/license/#sfxFree (the licence window, read in Chrome) |
| **Pixabay sound effects** | large user-uploaded library | Pixabay Content License: free use, no credit, no standalone redistribution | free, but downloads sit behind a bot check and the API has no audio endpoint (GUESS on the API; the site was not scraped) | https://pixabay.com/service/license-summary/ |
| **Sonniss GDC bundles** | professional libraries given away each GDC | "royalty free and commercially usable", "No attribution is required", no resale as sounds, "Use for AI/ML training is strictly prohibited" | free, but 9 to 48 GB per year (207 GB in all) as ZIP parts: too large to pull for a handful of taps | https://sonniss.com/gameaudiogdc/ |
| **BBC Sound Effects** | 33,000 BBC archive recordings | RemArc licence: personal, educational and research use; commercial use is a paid licence (GUESS from memory: the licensing page refused the fetch on 2026-11-22) | not usable for a promo film | https://sound-effects.bbcrewind.co.uk/licensing |

### 1c. Models that generate a sound from text

| Model | Licence of the weights | Runs here | Verdict | Source |
|---|---|---|---|---|
| Stable Audio Open 1.0 / Small (`stabilityai/stable-audio-open-1.0`, `-small`) | Stability AI Community licence; **gated**: a Hugging Face account has to accept it | Small is built for on-device; neither can be downloaded without an account step that is the owner's | not used: gated | https://huggingface.co/stabilityai/stable-audio-open-small |
| AudioLDM, AudioLDM 2 (`cvssp/audioldm2`) | CC BY-NC-SA 4.0 | yes via diffusers | **non-commercial**: ruled out | https://huggingface.co/cvssp/audioldm2 |
| Tango 2 (`declare-lab/tango2`) | CC BY-NC-SA 4.0 | yes | non-commercial: ruled out | https://huggingface.co/declare-lab/tango2 |
| TangoFlux (`declare-lab/TangoFlux`) | no licence tag on the model; repo licence "NOASSERTION" | GUESS yes | no clear commercial grant: ruled out | https://github.com/declare-lab/TangoFlux |
| AudioGen (`facebook/audiogen-medium`, in `audiocraft`, 23,943 stars) | CC BY-NC 4.0 | yes | non-commercial: ruled out | https://huggingface.co/facebook/audiogen-medium |
| MMAudio (`hkchengrex/MMAudio`, 2,326 stars) | CC BY-NC 4.0 | yes | non-commercial: ruled out | https://huggingface.co/hkchengrex/MMAudio |
| ElevenLabs sound effects | cloud | no commercial licence on the free plan | ruled out | https://elevenlabs.io/pricing |
| **earshot `make` / `build`** | MIT code, no weights: sounds are rendered from numbers learned from public-domain recordings | yes, CPU | **the one free generator whose output a commercial film can use** | https://github.com/Leonxlnx/earshot |

### 1d. Models that judge a sound

| Model | Output | Licence | Size | Runs here | Source |
|---|---|---|---|---|---|
| **LAION-CLAP** `laion/clap-htsat-unfused` | text-to-audio similarity (the ranker) | Apache-2.0 | 0.61 GB | installed (`~/.cache/audio-tools`) | https://huggingface.co/laion/clap-htsat-unfused |
| LAION-CLAP `laion/larger_clap_general` | the same, larger, the one earshot uses | Apache-2.0 | 0.78 GB | yes | https://huggingface.co/laion/larger_clap_general |
| **AST** `MIT/ast-finetuned-audioset-10-10-0.4593` | 527 AudioSet labels with probabilities ("Glass", "Shatter", "Typing") | BSD-3-Clause | 0.35 GB | yes | https://huggingface.co/MIT/ast-finetuned-audioset-10-10-0.4593 |
| Qwen2-Audio-7B-Instruct (MLX 4-bit) | free-text answers about any audio | Apache-2.0 | 6.56 GB | yes via `mlx-audio` (`stt/models/qwen2_audio` is installed) | https://huggingface.co/mlx-community/Qwen2-Audio-7B-Instruct-4bit |
| MOSS-Music-8B (MLX 4-bit) | free-text, trained on music | Apache-2.0 | 6.0 GB | installed | https://huggingface.co/OpenMOSS-Team/MOSS-Music-8B-Thinking |
| CoNeTTE (`Labbeti/conette`) | one-sentence audio caption (AudioCaps, Clotho) | MIT | about 0.5 GB (GUESS) | GUESS yes | https://huggingface.co/Labbeti/conette |
| Whisper audio captioning (`MU-NLPC/whisper-small-audio-captioning`) | one-sentence caption | CC BY-NC 4.0 | small | non-commercial: ruled out | https://huggingface.co/MU-NLPC/whisper-small-audio-captioning |
| Microsoft CLAP `clapcap` | caption | repo MIT (archived 2024-09), weights MS-PL | 4.74 GB repo | not tried | https://huggingface.co/microsoft/msclap |

## 2. What was chosen, and why

**Sources: Openverse (CC0 and public-domain Freesound and Wikimedia sounds) plus Mixkit's effect
pages.** Both answer without an account or a key, both state a licence that covers a commercial
film with no credit, and Openverse returns a direct file URL with each hit. Freesound's own API
would add duration filters but needs a key the vault does not hold.

**Ranker: LAION-CLAP `clap-htsat-unfused`**, already installed for the music work. It was trained
on AudioSet and Freesound-style clips, so sound effects are its home ground more than music was.

**Second ear: AST** (AudioSet tagger). It never sees the description, so when it says "Glass 0.39,
Shatter 0.40" about the file CLAP ranked first for "glass shatters", two independent models agree.

**Caption: Qwen2-Audio-7B-Instruct (MLX 4-bit)**, the general-audio model `mlx-audio` already
ships a loader for. MOSS-Music, the music describer, was tried first because it was installed
and it fails on effects: given Freesound 336425 ("Glass Shattering and Falling", CC0) it wrote
"This audio begins with a sharp, dry slap or punch, followed by the sound of burning wood or a
campfire" (66 s for one 3.7 s file). It was trained on music and should not describe effects.

**Measurements beside the models.** Length, where the peak is, attack, time to fall 20 and 40 dB,
spectral centroid, energy per band and how many separate hits a clip holds are computed from the
samples. "Dry, no reverb" is then a number (a dry close sound falls 40 dB in under about 0.3 s),
not a model's opinion.

**Generator: none installed.** Every text-to-audio model with open weights is either
non-commercial or gated (section 1c). earshot is the one free generator a commercial film can
use, and it is the repo the owner's saved reel showed. Installing it
(`uv pip install "earshot @ git+https://github.com/Leonxlnx/earshot"`) was **refused by the
session's permission classifier** on 2026-11-22, so it was not installed or run; the tool takes
any folder of files with `--dir`, so earshot's output can be ranked beside the recordings once the
owner allows the install.

**Level reference.** earshot's study of eight professional launch films
(https://github.com/Leonxlnx/earshot/blob/main/docs/motion-sfx-study.md) measures effects
"about 13-17 dB over the music when there is music", taken against the quietest 150 ms of the
bed before each effect, and finds that "six of eight films let the music ... carry the cut
rhythm" with effects "at a few chosen moments". The brief here asks for effects under the
music, so `mix.py` sets each effect's loudest 100 ms against the median 100 ms of the music
around it, at a negative figure, and reports the same comparison inside the effect's own band so
a cue that the music covers is flagged.

## 3. What the tests showed (2026-11-22)

**The ranker tells kinds of sound apart.** The film run downloaded 587 recordings for eleven
descriptions. For each description, a recording found by that description's own search words
should score above one found by another's. CLAP ordered 89.4 % of all such pairs correctly (0.5
is chance), from 0.71 for "a stiff card flicked out fast" to 0.99 for "a thin glass pane cracks
then shatters". The labels are loose (a search for "card flick" also returns page turns), so
this is a floor.

**A second model agrees on the clear cases.** AST, which never sees the description, labels the
chosen shatter "Breaking 0.73, Shatter 0.35, Glass 0.19", the knock "Knock 0.58", the card deal
"Shuffling cards 0.53", the keys "Computer keyboard 0.45". Under about 0.2 s it often has no
opinion ("Sound effect 0.07").

**Listeners' sentences work as captions when the match is strong.** The 45,716 distinct
captions of AudioCaps (people describing real clips, MIT, https://github.com/cdjkim/audiocaps)
are embedded once; the nearest three to a sound are printed with their cosine. From 0.45 up they
read true ("Glass breaking and shattering" 0.57, "A typist rapidly punches keyboard keys" 0.50,
"The sound of a page turning is heard" 0.43). Under 0.40 they are noise: the card riffle came
back as "Ducks are quacking very rapidly and loudly" (0.42), which is right about the rhythm
and wrong about the thing.

**Qwen2-Audio could not be used on this Mac while other sessions ran.** The 4-bit model
(6.56 GB) loaded in 25 to 54 s and encoded the audio in 15 s, then produced its first word
after 146 s and its second after another 54 s; MLX held 7.1 GB with eleven other Claude sessions,
a simulator and a test run on the machine. No Qwen sentence was produced. The weights stay in
`~/.cache/audio-tools/models/qwen2-audio-4bit` and `--caption N` calls them, for a time when
the Mac is idle; that path was run only as far as those two words.

**CLAP scores of very short sounds hold steady.** Cutting 0, 5 or 20 ms off a 0.2 s clip and
padding it with 0 to 1 s of silence moved the fit by about 0.05 (knock 0.58 to 0.69, key 0.51
to 0.70, mostly from the padding), never enough to swap a match for a non-match. A score is
still only comparable between candidates of one description.

**Where a track is thin decides which take can sit under it.** Median level per band over the
20.6 s each film uses (`mix.py bands`):

| Track | under 150 Hz | 150 Hz-2 kHz | 2-6 kHz | over 6 kHz |
|---|---|---|---|---|
| Hangtime (Undirect) | -20.9 dB | **-30.8 dB** | -25.1 dB | -23.8 dB |
| Complicated (Cutling) | -20.3 dB | -22.8 dB | **-42.8 dB** | **-40.9 dB** |

Hangtime is full of hi-hats, so a bright, few-millisecond click (a calendar page flicked, a
brittle ice crack) cannot be heard without spiking over the track's own peaks; takes with body
between 150 Hz and 6 kHz were chosen instead, and the low thump was filtered off the glass
break. Complicated has almost nothing above 2 kHz, so low "thocks" were buried by its piano
while crisp key clicks are heard 13 to 22 dB under the music.

**Does a model hear the effects in the finished mix?** CLAP's match to a plain description,
mix against music alone over the same window: glass shattering +0.11, typing +0.07, the three
quick key taps +0.06, the page flip +0.03; card flicks, cracks, single taps and the end thud
within 0.02 of no change. A one-second window under a full track is a blunt test, and it says
what the brief asked for: only the shatter and the typing stand out, the rest sits under the
music. If the owner wants them plainer, raise `over` in `tools/sound-sfx.py`.

## 4. What was built

In `product-video/skills/product-video/scripts/sfx/`:

- `setup.sh`: one-time install into `~/.cache/audio-tools` (venv, CLAP, AST, Qwen2-Audio). Run
  again it skips what is there; the model downloads were done by the same ranged-`curl` method
  it uses, the venv line reuses the venv the music tools made and was not run fresh.
- `sfx.py find "<description>" --query "<search words>" --out <dir>`: fetches candidates from
  Openverse (CC0 and public domain only) and Mixkit, cuts every recording into its separate
  sound events, ranks each event against the description, and writes the best ones as trimmed
  WAVs with `ranked.md` and `ranked.json`: fit, z, AST labels, measurements, listeners'
  sentences, licence, creator and page. `--dir <folder>` ranks local files too; `--allow-by`
  adds CC BY sounds with their credit line; `--caption N` asks Qwen2-Audio.
- `sfx.py batch moments.json --out <dir>`: every moment of a film with the models loaded once.
- `sfx.py describe <files>` and `sfx.py rank "<description>" <files>`: the same listening on
  any file.
- `mix.py bands <track> [start] [length]`: where the track is thin.
- `mix.py cues.json`: lays the effects under the full-length track. A cue's `over` is how far
  it stands over the music inside its own band (30 ms windows); `ceil` holds it under the music
  as a whole (100 ms windows) and `peak_under` holds its spike under the track's peaks. The
  report prints both figures for every cue and flags BURIED and limited ones.

```
PY=~/.cache/audio-tools/venv/bin/python; K=~/Repositories/product-video/skills/product-video/scripts/sfx
zsh $K/setup.sh
$PY -I $K/mix.py bands public/music-full/hangtime.mp3 10.73 20.6
$PY -I $K/sfx.py find "a thin glass pane cracks then shatters, close, dry, no reverb" --query "glass shatter" --query "glass break" --out picks/shatter
$PY -I $K/sfx.py batch tools/sfx-moments.json --out picks --caption 0
$PY -I $K/mix.py out/cues-undirect.json
```

Speed: Freesound's preview host gave about 440 kB/s in total however many downloads ran at
once, so the first run of eleven moments (about 790 files, roughly 200 MB) took about 25 minutes; every file is
cached in `~/.cache/audio-tools/sfx-cache`, and a second run of one moment takes about a minute.

In `undirect-promo/monholt-samples/`: `tools/sfx-moments.json` (the eleven descriptions and
their search words), `public/sfx2/` (the chosen takes with `SOURCES.md` and `sources.json`),
`tools/sound-sfx.py <undirect|cutling>` (writes `out/cues-<film>.json` and mixes it) and
`tools/finish-sfx.sh <name> <film>` (levels to -15 LUFS, holds the encoded true peak under
-1 dBFS, copies the picture stream of the film already encoded from the saved frames, and for
portrait writes the phone copy).

## 5. Each moment's sound

Every source is CC0 1.0 on Freesound (found through Openverse) unless marked; no credit is
required. "fit" and "z" are CLAP against the description; the caption line is what the models
and listeners say; "dry" is the measured fall of 40 dB.

### Undirect, on Hangtime

| Film time | Moment | Description asked for | Chosen | What it sounds like |
|---|---|---|---|---|
| 2.15 s, 10.88 s, 12.23 s, 13.54 s | finger lands on Play; then the three result taps (Play, Download, X) | a soft fingertip tap on glass, one light touch on a phone screen, close, dry | "Tapping on glass.wav", EugeneEverett, https://freesound.org/people/EugeneEverett/sounds/596517 (first hit only, 0.09 s) | fit 0.48, z +3.5. AST: Chink, clink 0.28, Glass 0.08. Listeners: "Glass is tapped and indistinct speech is in the background" (0.41). Falls 20 dB in 22 ms; 78 % of its energy between 150 Hz and 2 kHz, where Hangtime is thinnest |
| 2.25, 2.70, 3.14, 3.60, 4.49 s | five junk pages burst out on the bass stabs | a stiff card flicked out fast, one sharp snap of a playing card, close, dry | "Playing Card Deal Variation 2", el_boss, https://freesound.org/people/el_boss/sounds/571576, played at five speeds (0.86 to 1.08) | fit 0.62, z +4.9. AST: Shuffling cards 0.53. No listener sentence fits (best 0.33). 0.39 s, dry (40 dB in 0.12 s), 74 % between 2 and 6 kHz |
| 4.95 to 6.23 s | the U-turn arrow draws itself | a thick felt marker drawing one long curved line on paper, close, dry | "Marker Lines.WAV", TubbsMedia, https://freesound.org/people/TubbsMedia/sounds/377124 | fit 0.65, z +5.0. AST: Sanding 0.75, Rub 0.69. Listeners: "A hard object is scraped against paper" (0.43), "Paper is torn over and over again" (0.51). A 1.4 s rubbing stroke that swells for 0.6 s; 91 % over 6 kHz |
| 5.25 to 6.35 s | the pages go back into the button | a deck of playing cards riffled quickly back into a stack, close, dry | "cardshuffle;bridge.wav", Abir19, https://freesound.org/people/Abir19/sounds/629503 | fit 0.70, z +6.7 (the strongest match of the run). AST: Crack 0.32, Crunch 0.10. Listeners' lines are noise here ("Ducks are quacking very rapidly", 0.42): a fast chatter of ticks, 0.82 s, dry (0.23 s) |
| 6.28 s | the arrowhead lands | a small wooden block set down on a table, one short dull knock, close, dry | "Bowl put in table", Mixkit 2934, https://mixkit.co/free-sound-effects/table/ (Mixkit Sound Effects Free License) | fit 0.68, z +6.1. AST: Knock 0.58. Listeners: "A male speaking while setting down some objects" (0.44). 0.18 s, 98 % between 150 Hz and 2 kHz |
| 8.07 s, 8.74 s | the glass cracks under the finger, twice | a thin glass pane cracking, one short sharp crack without falling pieces, close, dry | "Ice Crack 9.wav", ecfike, https://freesound.org/people/ecfike/sounds/177219 (second one at 0.9 speed) | fit 0.53, z +4.5. AST: Crack 0.51, Breaking 0.12. CLAP nearest: a twig snapping 0.44. Dry (0.15 s), 80 % between 2 and 6 kHz |
| 9.19 s | the third crack, the glass giving way | the same | "break02.wav", Johnny97, https://freesound.org/people/Johnny97/sounds/566447 (first 0.16 s) | fit 0.60, z +4.7. AST: Breaking 0.83, Crack 0.23, Glass 0.16. Listeners: "Glass breaking and shattering" (0.53) |
| 9.41 s | the sheet shatters | a thin glass pane cracks then shatters, close, dry, no reverb | "window break with axe glass shatter in trailer.wav", kyles, https://freesound.org/people/kyles/sounds/452667 (first 0.95 s, lows under 250 Hz removed) | fit 0.60, z +4.7, top of 112 candidates. AST: Breaking 0.73, Shatter 0.35, Glass 0.19. Listeners: "Glass breaking and shattering" (0.57). Its room tail (40 dB in 1.4 s) is why it is cut at 0.95 s. Mixkit's glass break 759, used in the rejected mix, scores 0.48 and did not reach the top eight |
| 16.58 s | the icon lands on the end card | a heavy book set down on a wooden table, one soft low thud, close, dry | "phone book drop on table and push.wav", toddcircle, https://freesound.org/people/toddcircle/sounds/451652 (first 0.3 s) | fit 0.59, z +5.1. AST: Door 0.15, Thunk 0.12, Knock 0.11. Listeners: "A loud thump occurs" (0.43). 64 % between 150 Hz and 2 kHz, so a phone speaker carries it |

Levels in the mix (`out/audio-undirect-sfx.txt`): every cue stands 3 to 9 dB over the music in
its own band and 1 to 22 dB under the music as a whole; the shatter is the loudest at -1 dB,
the marker stroke the quietest at -17 dB. Nothing is flagged buried.

### Cutling, on Complicated

| Film time | Moment | Description asked for | Chosen | What it sounds like |
|---|---|---|---|---|
| 0.13 to 3.69 s (35 strokes) | the address typed again and again, row after row | someone typing quickly on a laptop keyboard, soft keys, close, dry | "Jimmy's foley typing on macbook", jimmygu3, https://freesound.org/people/jimmygu3/sounds/338183; 14 single strokes cut from it, 12 used (two sit under 2 kHz, where the piano covers them) | fit 0.64, z +5.8. AST on the recording: Computer keyboard 0.87, Typing 0.74. Listeners, on one stroke: "A typist rapidly punches keyboard keys" (0.50). Dry (0.09 to 0.16 s) |
| 3.82 s; 5.16, 5.72, 6.29 s; 11.23, 11.80, 12.37 s | the first key lands on the drop; keys 2 to 4 land; the three Mac keys land (slower playback, 0.83 to 0.9) | a crisp clicky mechanical keyboard key pressed once, one bright sharp click, close, dry (the first wording, "one deep thock, low thud", found takes the piano buried) | "Computer Spacebar.WAV", 14FPanskaVesecka_Karolina, https://freesound.org/people/14FPanskaVesecka_Karolina/sounds/419956 (lows under 300 Hz removed) | fit 0.53, z +5.2. AST: Computer keyboard 0.45, Typing 0.25. Listeners: "A typist rapidly punches keyboard keys" (0.50). 0.29 s, dry (0.14 s) |
| 4.01, 4.20 s; 6.86 s; 9.90, 10.09, 10.28 s | the key is pressed; the tap on Home Address; the three quick taps that fill the field | the same | "spacebar.wav", Kozzi42, https://freesound.org/people/Kozzi42/sounds/544638 | fit 0.54, z +5.1. AST: Computer keyboard 0.21. Listeners: "Rapid clicks from computer keyboard typing" (0.48). 77 % over 6 kHz, dry (0.11 s) |
| 12.94 s | Shift, Command and V go down together | the same | the two spacebar takes, three strokes inside 14 ms | one firm clack instead of one key |
| 12.99 s | the clipboard list stands up | a stiff sheet of card flipped upright, one soft paper flap, close, dry | "Page Turns - 5", SpaceJoe, https://freesound.org/people/SpaceJoe/sounds/484960 (first 0.5 s, lows under 300 Hz removed) | fit 0.58, z +7.1. Listeners: "The sound of a page turning is heard" (0.43). AST has no opinion (Crack 0.17) |
| 13.70, 15.21 s | the selection moves down the list | (a typing stroke) | two of the MacBook strokes | as the typing row |
| 15.97 s | the icon lands on the end card | a heavy book set down on a wooden table, one soft low thud, close, dry | the phone book, as in Undirect | as above |

Levels (`out/audio-cutling-sfx.txt`): the drop key -13 dB against the whole music, the other
landings -15 and -16, the chord -17, taps -19, the page -20, typing -20 on average; in their own
band they stand 15 to 44 dB over a track that is nearly empty there. The end thud is the one
cue in the piano's band: +5 dB there, -5 dB overall.

## 6. The films

Music: the full tracks, Hangtime from 10.730 s and Complicated from 20.420 s, run to the last
frame with a 0.6 s fade. The last 0.6 s was -91 dB in the old files; it is now -16 dB (Undirect)
and -25 dB (Cutling, whose track is quieter there by itself). Loudness measured on each
delivered file (`ebur128`, true peak):

| File in `~/Downloads/monholt-samples/` | Size | Loudness | True peak |
|---|---|---|---|
| `undirect-9x16-sfx.mp4` | 84.9 MB | -15.1 LUFS | -1.2 dBFS |
| `undirect-9x16-sfx-small.mp4` | 22.5 MB | -15.1 LUFS | -1.2 dBFS |
| `undirect-16x9-sfx.mp4` | 79.6 MB | -15.1 LUFS | -1.2 dBFS |
| `cutling-9x16-sfx.mp4` | 31.1 MB | -15.2 LUFS | -1.7 dBFS |
| `cutling-9x16-sfx-small.mp4` | 22.8 MB | -15.2 LUFS | -1.7 dBFS |
| `cutling-16x9-sfx.mp4` | 31.7 MB | -15.2 LUFS | -1.7 dBFS |

The picture of the four full-size files is the stream already encoded from the saved frames,
copied bit for bit; the two phone copies were encoded from `out/frames` (two-pass, 8.6 Mbit/s).
AAC overshoot depends on the signal: at 192 kbit/s the Undirect phone copy read -0.5 dBFS however
low the limiter went, and at 320 kbit/s it reads -1.2.

## 7. Not done, and limits

- earshot is not installed (the install was refused by the permission classifier). It is the
  one free generator and the repo from the owner's reel; `sfx.py --dir` will rank its output.
- No Qwen2-Audio sentence exists for any chosen sound (section 3). The captions above are AST
  labels, listeners' nearest sentences and measurements.
- Nobody has heard these mixes. Every figure is a model's or a measurement's; the owner's ear
  decides, and the weakest machine-described picks are the tap (z +3.5, no keyboard or glass
  label above 0.3) and the card deal (no listener sentence above 0.33).
- The marker stroke is the nearest thing to the rejected whoosh: a real marker on paper, but a
  1.4 s hiss-like rub. It is the quietest cue (-17 dB) and the first to drop if it reads wrong.
- Sound quality is that of Freesound's 128 kbit/s MP3 previews, since the original files need
  a Freesound login. For effects a few tenths of a second long under music this is not the
  weak point, but a Freesound API key in the vault would let the tool fetch originals.
- Nothing was committed, in any of the three repositories.
