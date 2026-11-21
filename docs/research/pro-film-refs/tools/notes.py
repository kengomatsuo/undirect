#!/usr/bin/env python3
"""notes.py <scratch> <outdir>: one note per measured film + measurements.json"""
import json, os, sys, glob, re, statistics as st
S, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
ids = dict(l.strip().split("\t")[::-1] for l in open(f"{S}/work/map.tsv"))
ids.update({"samsung-short-fold8-thin": "T9MzsCVUwk8", "samsung-short-8th-gen": "hJZL4p5Dj8s"})
THINGS = "https://static.culturedcode.com/things/videos/2026-06-25-meet-things-remastered-2/meettheallnewthings.mp4"

# What the frames show. Written from the per-shot contact sheets read on 2026-11-21.
# Font names are by eye unless the brand publishes them; "GUESS" marks the uncertain ones.
O = {
"apple-iphone-18-pro-intro": dict(
 music='"Stampede" by Genesis Owusu (credited in the video description). A full vocal song under a narrator.',
 sound="Narration carries it (whisper counts 330 words); the song ducks under the voice. Not listened to: measured only.",
 type="Almost none: 92 % of sampled frames carry no words. The story is told by voice and picture.",
 colour="Graphite, bone white and one burgundy (the product colour). Lab scenes are near white, field scenes near black; nothing is tinted with a brand gradient.",
 camera="Live action and CG intercut: macro passes over parts on a white table, a blueprint, a lens, then people in a cave and on a coast. The phone is an object being built and then used.",
 ui="The screen is seen in people's hands (a map, the camera). No floating screenshot.",
 end="Cuts to the Apple logo on black; the last 5.1 s are silent.",
 take="A long film can drop on-screen words almost entirely when a voice exists. We have no voice, so this is a reference for picture discipline, not for structure."),
"apple-iphone-18-pro-ad": dict(
 music='"Struggle with the Beast" by Anna von Hausswolff (credited in the description). A slow dark build, 83.6 BPM measured, heavy in the low end (the band under 90 Hz sits 2.3 dB under the whole mix).',
 sound="No voice. The spectrogram of the first 20 s is one unbroken swelling bed with no clicks or whooshes. The music stops at 49.6 s and the logo holds in silence.",
 type="White SF Pro, medium weight, one line, centred, about 9 % of the frame height (roughly 5 % of the width). Words light up left to right: the line appears dim and a brightness sweep crosses it. A custom wide display face is used once, for PRO FURTHER.",
 colour="Black. The only colour is the product's own burgundy and the light on it. Mean saturation 2.7 on a 0-180 scale: almost monochrome.",
 camera="Every product shot is a slow move on a lit object: a beam of light finds the phone, smoke rolls past the camera bump, the chip glows under glass. Shots run 1.1 to 3.0 s (middle half).",
 ui="Two real screens only (the camera viewfinder, a note written by the assistant), each shown inside the phone, held about 1.5 s.",
 end="PRO FURTHER, then the model name in chrome, then the Apple logo alone for 5.3 s in silence.",
 take="The grammar for direction A: a line of small type and the product take turns; they never share a frame. First music lift at 7.4 s lands on the phone coming out of the smoke; the second at 30.6 s lands on the camera section."),
"apple-iphone-17-pro-ad": dict(
 music="Not credited in the description. 130 BPM measured, bass heavy (low gap 2.5 dB). Lifts at 2.9 s and 30.1 s.",
 sound="No voice. Music stops 5.0 s before the end.",
 type="Opens on three one-word cards in a custom wide orange face: ALL / OUT / PRO, each a single hard cut. After that, small white SF Pro lines, one fact each: 'Forged aluminum unibody', '8x optical-quality zoom'. All captions are 2 to 5 words.",
 colour="Black and the product's orange. Type takes the product colour for the title and white for facts.",
 camera="Macro on the camera bump, dust and rain hitting the phone, an exploded camera module, three phones standing in a row at the end.",
 ui="A thermal map inside the phone outline, three camera samples with their focal length chip, a selfie in the phone frame. Each is on screen under 2 s.",
 end="Three phones in the dark, then the logo; 5.0 s of silence.",
 take="One fact per card, 2 to 5 words, 100 % of frames at two text lines or fewer."),
"apple-ios-26-liquid-glass": dict(
 music="Not credited. 118 BPM measured, a soft bed under the presenter; 13 small lifts mark the chapters.",
 sound="Presenter to camera (632 words). Loudness -19 LUFS, the quietest of the Apple set, because speech leads.",
 type="Name and title lower third in small white type. The interface is the typography: large lock-screen time, magnified text under the glass loupe.",
 colour="Daylight architecture, white rooms, glass. Bright (mean luma 149 of 255) and lightly saturated.",
 camera="The interface is filmed as a material: extreme close-ups of a tab bar bending light, the slide-to-answer knob, a control magnified until it fills the frame, cut against hands using devices in real rooms.",
 ui="Real interface, pushed in until one control fills the screen, with the device edge often still in frame. Whole-device shots sit on white.",
 end="Presenter sign-off, logo, 6.4 s silent tail.",
 take="A single control can carry a shot if the camera goes close enough. This is the source for showing our one switch large."),
"apple-privacy-safari-flock": dict(
 music='"Hårga-Låten" by Zero8 (credited). 87 BPM measured. One lift at 36.6 s when the trackers are shaken off.',
 sound="Two spoken lines at the start ('Excuse me.' 'Who's that?'), then music and action. Loudness range 9.5 LU: it has quiet and loud parts.",
 type="One line in the whole film: 'Keep data trackers off your back.' Small white SF Pro over the last scene, at 44.9 s of 65.",
 colour="Graded live action in a 4:3 frame inside 16:9: teal tiles, wood, silver suits.",
 camera="Live-action comedy. The problem is a person in a silver suit riding on someone's back. 43 shots, 1.3 s median.",
 ui="Three inserts of a phone in a hand showing a real web page, and one press on the Safari icon at 49.4 s.",
 end="The line, the press on Safari, the logo, 5.0 s silent.",
 take="The closest subject to Undirect in the set. A browser nuisance is shown as one physical joke and named in one line at the end. Needs actors, so it is a reference for structure only."),
"apple-iphone-17-scratch": dict(
 music="Not credited. Whisper hears 'upbeat music' entering after the dialogue; lift at 22.3 s.",
 sound="A tense boardroom scene with two spoken lines, long quiet, then music. Loudness range 17.6 LU, the widest in the Apple set.",
 type="One line at the end: 'Relax, it's iPhone 17.' Small, white, over the table.",
 colour="Dark wood, warm practical lamps, the orange phone as the only bright object.",
 camera="Close-ups of faces and one slow slide of the phone across a table.",
 ui="None.",
 end="The line over the phone on the table, then 5.0 s of silence.",
 take="A 35 s film built on one moment and one line. Silence is used as tension."),
"apple-iphone-15-pro-titanium": dict(
 official=False,
 music="Not credited on the re-upload. 137 BPM measured.",
 sound="No voice.",
 type="One word, 'Titanium', dim grey on black at the very end.",
 colour="Black space, orange fire and dust.",
 camera="Fully CG: a meteor forms, burns and becomes the phone's frame. 20 shots in 29 s.",
 ui="None.",
 end="The word Titanium fading up.",
 take="Kept as the 2023 example of Apple naming one material and nothing else. Re-upload on a third-party channel, so not used for audio conclusions."),
"apple-iphone-16-pro-reveal": dict(
 official=False,
 music='"Shift Souls" by Toechter (named in the uploader\'s description). 96 BPM measured.',
 sound="Keynote excerpt; quiet master (-26.8 LUFS) because it is cut from the event stream.",
 type="Nearly none.",
 colour="Black with the titanium finishes.",
 camera="Slow CG turns of the phone body.",
 ui="None.",
 end="The model name.",
 take="The 2024 example. Re-upload of the keynote reveal, so only the picture is used."),
"samsung-galaxy-s26-ultra-intro": dict(
 music="Not credited. 123 BPM measured, loud master (-10.7 LUFS), five lifts, one per chapter.",
 sound="Narrated (408 words). Music is continuous; range only 2.6 LU.",
 type="Chapter titles in white Samsung Sharp Sans, two sizes stacked: a small eyebrow ('Next-Level') over a large name ('Pro Cameras'), centred, placed on the product or the scene.",
 colour="Deep violet and black for the hardware, natural daylight for the people.",
 camera="CG macro inside the phone (chip, lens stack) alternating with live action of friends using it: subway, park, barbecue.",
 ui="The real camera interface filmed in a hand, and screen content shown full frame with a recording timer.",
 end="Product line-up, wordmark, 5.0 s silent.",
 take="Title cards sit on top of footage, never on a flat colour. The eyebrow-plus-name pair is Samsung's signature."),
"samsung-galaxy-s26-design-film": dict(
 music="Not credited. 121 BPM, one lift at 27.0 s.",
 sound="Whisper hears a voice (65 words); loud master (-8.4 LUFS).",
 type="None until the SAMSUNG wordmark.",
 colour="White and pale lilac studio, very low saturation (2.8).",
 camera="Slow CG passes over the camera rings and the frame edge on white; 12 shots in 60 s, 3.1 s median.",
 ui="None.",
 end="SAMSUNG in white on black.",
 take="The source for direction B's light: a bright seamless set with soft shadow, the object turning slowly."),
"samsung-s26-privacy-display": dict(
 music="Not credited. 123 BPM, lift at 18.1 s when the feature switches on.",
 sound="A sung or spoken hook repeats ('Can you do this?'). Music stops 5.2 s before the end.",
 type="'The world's first / Privacy Display' in white Sharp Sans, split left and right of the phone, large (20 % of frame height).",
 colour="Night train and lift interiors, violet phone.",
 camera="People on a train glance at a neighbour's screen; a finger presses the real quick-panel tile in macro; the screen goes dark from the side.",
 ui="The real control is filmed twice at macro distance with the finger on it. The notification is real interface in the phone.",
 end="Phone hero, name, 5.2 s silent.",
 take="The model for our press: the real switch, a real finger, very close, then the result from further back."),
"samsung-one-ui-7": dict(
 music="Not credited. 80 BPM measured; lifts at 36.7, 48.7 and 88.0 s.",
 sound="Narrated (179 words) over music. Range 7.1 LU.",
 type="Opens with black words on white, one or two at a time ('the all-', 'One UI 7', 'More intuitive'). Later, one-word white labels beside a hand-held phone: Personalized, Intuitive, Natural. A hand-drawn 'Press' and 'Talk' label appear by the finger.",
 colour="Real rooms in daylight, the phone's violet wallpaper as the constant.",
 camera="A hand holds the phone in a real room; the camera pushes to the screen; an interface element then leaves the phone and fills the frame as a card (the Gemini prompt pill, the image generator).",
 ui="Real interface in the hand, then the same element enlarged on its own with a soft glow. The lifted element is the hero of each chapter.",
 end="Tagline card and wordmark; 5.7 s silent.",
 take="The source for direction B's lifted card: the one row that matters leaves the phone and is shown large."),
"samsung-a-day-with-one-ui": dict(
 music="Not credited. 94 BPM, gentle.",
 sound="Narrated (108 words).",
 type="Small white captions at the bottom, sentence length, like subtitles. End line 'Your day, your way' centred on black.",
 colour="Warm stylised 3D rooms in sand, terracotta and pink.",
 camera="One long glide through miniature rooms; interface pills float in the room as objects. 10 shots in 62 s.",
 ui="Simplified pills and widgets, not the full interface.",
 end="'Your day, your way' on black.",
 take="Kept as the example of the pastel 3D-room look. It is the look most often copied by generated imagery, which is the risk in direction B."),
"samsung-one-ui-8-5": dict(
 music="Not credited. 130 BPM, bright; lifts at 19.8 and 34.6 s.",
 sound="No voice.",
 type="Two-word white captions in a rounded geometric sans, stacked, beside a character: 'Your world', 'Your spark', 'Your story'. A retro logo treatment near the end.",
 colour="Loud, saturated (17.2 mean), cartoon characters over real streets.",
 camera="App icons become animated characters skating and dancing through real footage; only 16 % of frames are still.",
 ui="Home screen at the start and end; the rest is character animation.",
 end="'Your Galaxy. Your way.' either side of the phone on a dark red ground.",
 take="A two-word caption repeated with one word changing gives a film a chorus. Not our tone, but the caption rhythm is useful."),
"samsung-z-fold7-ultra-unfolds": dict(
 music="Not credited. Whisper hears a sung line ('What's still ahead of us'). 93 BPM, lift at 17.7 s on the unfold.",
 sound="A vocal song, no narrator.",
 type="Tiny lower-case labels beside the phone: 'The new Galaxy Z Fold7', 'Ultra sleek', 'Ultra powerful', then 'Ultra Unfolds' under the phone edge.",
 colour="Starts white, goes to black with violet light for the screen, returns to white.",
 camera="The closed phone stands upright and turns; a hand opens it; lights fill the dark.",
 ui="Screen content only as light.",
 end="Name on white, 5.0 s silent.",
 take="Captions can be very small when the frame is otherwise empty."),
"samsung-short-fold8-thin": dict(
 music="Not credited. Detected at 178 BPM (likely 89 felt). No section change in 15 s.",
 sound="No voice. Cuts land on the beat more often than chance (67 % against 48 %).",
 type="'Thin. Light.' then 'So not a brick.' Small black geometric sans on white, left of a thin vertical rule. One huge word, FOLD, behind the phone at the end.",
 colour="White, tan suede, lilac phone.",
 camera="A jacket pocket: the phone slides in and the pocket does not sag. Three framings of the same jacket.",
 ui="None.",
 end="FOLD behind the phone with 'Innovation in your hands', then SAMSUNG on black.",
 take="A 15 s vertical film with eight words. One physical demonstration, one joke. Direct model for our length and format."),
"samsung-short-8th-gen": dict(
 music="Not credited. 119 BPM.",
 sound="No voice.",
 type="Small centred white captions at the top: 'First foldable?', '8 generations in. Sleek. Durable.' Chat bubbles pop up by the devices carrying the doubts ('Is it durable?', 'Is it heavy?').",
 colour="Pale pink stone set with window light and soft shadow, lilac screens.",
 camera="Devices stand on a plinth in a sunlit set; bubbles pile up; the camera pushes in.",
 ui="Wallpaper only; the bubbles are drawn.",
 end="Two phones on the plinth, name, SAMSUNG on black.",
 take="The set for direction B: plinth, window-light bands, soft shadow. Our stills borrow this light."),
"app-things": dict(
 title="Meet the all-new Things", url=THINGS, channel="Cultured Code (own site)",
 music="Not credited. Solo piano: the spectrogram shows separate struck notes with clean decay and nothing above them. beats.ts reads 186 BPM (double time; about 93 felt).",
 sound="No voice, no effects visible in the spectrogram. Loudness range 15.5 LU: it plays quiet and loud passages. The last 4.0 s are silent.",
 type="Full-screen cards, white rounded bold sans on black: 'all-new', 'all-new design', 'all-new feel', 'all-new power'. The repeated phrase stays put and one word is added. Feature names later sit alone on solid blue: Headings, Checklists, Calendar View.",
 colour="Black cards, pale grey product ground, then the brand blue as a full field.",
 camera="The phone is tilted hard and cropped so one control (the blue plus button) fills a third of the frame; then flat for detail. Motion blur on moves.",
 ui="Real interface throughout, shown large and close, one feature per shot.",
 end="Icon and wordmark on white, held 14.6 s (the longest end hold in the set).",
 take="Words and product alternate as whole frames. A fixed phrase with one changing word is the film's chorus."),
"app-linear-agent": dict(
 music="Not credited. 56 BPM detected; very quiet master (-28.9 LUFS).",
 sound="A soft bed with sparse clicks visible as thin vertical lines in the spectrogram, in step with typing on screen. Range 11.4 LU.",
 type="Interface text only until the end line 'Linear. At your command.' in small white type with the first word bright and the rest grey.",
 colour="Black and grey; 100 % of sampled frames are dark. Saturation 0.7.",
 camera="The interface is a tilted plane in the dark with shallow focus: the near rows sharp, the far rows blurred. 9 shots in 55 s, each a slow drift (5.6 s median).",
 ui="Real interface, real typing, seen at an angle so it reads as an object with depth.",
 end="The line, then the logo mark alone.",
 take="The source for direction C's tilted plane with depth of field, done entirely in software."),
"app-raycast-new": dict(
 music="Not credited. 68 BPM, bass heavy (low gap 2.2 dB).",
 sound="The spectrogram changes texture at each cut and shows click lines on key presses. Range 13.4 LU.",
 type="None until 'NEW RAYCAST' in tiny white capitals at the end.",
 colour="Black, grey, chrome. Saturation 0.4, the lowest in the set.",
 camera="Macro on a dark glass search bar as text is typed; the camera slides across list rows and an emoji grid.",
 ui="Real interface at macro scale; one row fills the frame.",
 end="Two tiny words on black.",
 take="A teaser can be 39 s of one control seen very close."),
"app-raycast-focus": dict(
 music="Not credited. Whisper tags it 'tense music'. 60 BPM. Lifts at 13.0 and 25.0 s.",
 sound="Loudness range 17.9 LU, the widest in the whole set: quiet room tone, a ticking clock, sudden notification stings.",
 type="None until the address 'raycast.com/focus' in a small serif over a typewriter.",
 colour="A dark room, warm lamp, a red wallpaper glowing off the laptop.",
 camera="A writer at night: close on eyes, a clock, tea, then macro shots of the real screen with visible pixels as notifications arrive. 31 shots, 1.4 s median.",
 ui="The screen is filmed, not captured: notifications at an angle, the cursor blinking on an empty page, the launcher list in macro.",
 end="The address, then the icon small on black.",
 take="The source for direction C's story: pressure builds through close-ups, the product is one calm action."),
"app-arc-1-0": dict(
 music="Not credited. Whisper tags 'upbeat music' and one spoken 'Oh my gosh'. 140 BPM. Loud master (-11.5 LUFS).",
 sound="Archive-film crackle by look; one voice clip.",
 type="A white serif on black, one or two words per card: '1.0s', 'everything', 'nothing', 'Arc', 'v1.0', 'Available to all', 'Today'. Archive clips sit in a rounded frame with a small serif caption underneath.",
 colour="Black and white archive, then one blue card for the address.",
 camera="No device. Old footage of inventions that worked or failed, 29 shots in 34 s (0.84 a second, the fastest in the set).",
 ui="Two seconds of the browser at the end.",
 end="'arc.net' in white on a full blue card.",
 take="A serif and a point of view can stand in for product footage. Source for direction C's end line."),
"app-arc-search": dict(
 music="Not credited. 110 BPM. Cuts sit on the beat 56 % of the time against 29 % by chance.",
 sound="Narrated (143 words).",
 type="Small white bold captions to the right of the phone, two lines: 'Arc Search vs. Chrome', 'Chrome has popups & banners', 'Arc Search cleans up for you'.",
 colour="A sunlit room with yellow wallpaper, out of focus.",
 camera="One hand holds a real phone; the camera stays put and whip-pans between sections. 10 shots in 60 s.",
 ui="The real app on a real phone in a real hand, filmed.",
 end="The App Store page on the phone in the hand.",
 take="The cheapest honest look in the set: a hand, a phone, a window. Needs no face."),
"app-notion-ai": dict(
 music="Not credited. 140 BPM, quiet master (-22.4 LUFS).",
 sound="No voice.",
 type="Black bold sans on off-white, centred, two lines: 'Meet the new Notion AI', 'Write smarter, with AI that knows your style'. One word underlined by hand.",
 colour="Off-white with flat fields of blue, red and yellow behind the windows.",
 camera="Flat windows slide and scale; the pointer is visible and does the work.",
 ui="Real interface in cropped windows on colour fields.",
 end="'Try Notion AI for free at Notion.com', then 'Think it. Make it.'",
 take="Headline cards alternate with product frames. 82 % of frames are still: the film moves little and still reads as finished."),
"app-cleanshot-5": dict(
 music="Not credited. 113 BPM. A riser is visible in the spectrogram before the lift at 15.4 s. Cuts sit on the beat 74 % of the time against 30 % by chance, the tightest in the set.",
 sound="No voice.",
 type="White medium sans, one line, centred on a dark colour-glow background: 'The wait is over', 'Add smart zooms', 'That follow your cursor'. 12 caption cards, 2 to 4 words each.",
 colour="Black with violet, blue and magenta light blooms.",
 camera="Tilted app windows in the dark, then flat close-ups of one panel with the pointer.",
 ui="Real interface; a single button or slider is often the whole shot.",
 end="Icon and address on a violet glow.",
 take="The clearest example of caption card, product shot, caption card. Shots change every 2.1 s on the bar."),
"app-craft": dict(
 music="Not credited. 95 BPM, loud (-8.2 LUFS).",
 sound="No voice.",
 type="None beyond the interface.",
 colour="A bright desk with plants and a pink wallpaper on the device.",
 camera="Over-the-shoulder live action: hands on an iPad and a phone on a desk; long takes (one of 42.6 s).",
 ui="The real app used by real hands, filmed from above.",
 end="Device family on white with store badges.",
 take="2020 film, kept as the plain hands-on-device example. Every frame carries 7 lines of interface text, the busiest reference."),
"app-halide-mark-ii": dict(
 music="Not credited. 60 BPM detected; loud (-8.1 LUFS).",
 sound="No voice.",
 type="White bold grotesk on black, stacked one word per line and set left: 'The / Most / Powerful / Pro / Camera'. One word in yellow at full width: XDR.",
 colour="Black, white, one yellow. 93 % of frames are dark.",
 camera="A phone floats on black, small, with the real viewfinder; cuts between it and type cards. 28 shots in 44 s.",
 ui="Real viewfinder on a phone held in a hand or floating.",
 end="Icon and name in spaced capitals.",
 take="Type card and phone card take turns on black, with one accent colour. Proof that a two-person studio can use this grammar."),
"app-halide-2-2": dict(
 music="Not credited. 108 BPM.",
 sound="A voice speaks (94 words).",
 type="None until the lockup.",
 colour="Sunny park, then black studio.",
 camera="Live action of a person with an iPad on grass, then CG close-ups of the tablet edge and controls.",
 ui="Real controls on a tilted tablet, close.",
 end="Icon, 'Halide Mark II for iPad', then the studio's own logo.",
 take="A studio mark at the end of an app film, as Monholt could sign."),
"app-screen-studio-4": dict(
 music="Not credited. 62 BPM. Lift at 18.7 s.",
 sound="Two spoken lines ('It all starts with a simple request.' '...but it shouldn't be this hard.'). Range 9.0 LU.",
 type="None.",
 colour="Warm desk lamp, green banker's lamp, the bright screen.",
 camera="A person at a desk, never fully shown, intercut with macro shots of the real screen at steep angles: an email, a file being renamed, an error dialog. 58 shots in 83 s, 1.1 s median.",
 ui="The screen is filmed through a lens: pixel grid, glare and shallow focus are visible.",
 end="The app's own interface appears and the frustration stops.",
 take="The source for direction C's look: the screen as a physical surface, cut fast."),
"app-dia": dict(
 music="Not credited. Detected 173 BPM (about 86 felt).",
 sound="Dialogue (88 words).",
 type="One line near the end: 'If it's in your tabs', small white sans on black.",
 colour="Saturated kitchen: greens, reds, yellows. Frames have rounded corners.",
 camera="A sitcom scene of friends cooking, intercut with macro shots of text being typed on the real screen. 50 shots, 1.3 s median.",
 ui="Filmed screen, tilted, shallow focus.",
 end="The line, the dock icon, the product answering.",
 take="Macro screen shots hold up next to live action; they read as footage."),
"app-cursor-2": dict(
 music="Not credited. 113 BPM, very quiet (-29.3 LUFS).",
 sound="No voice; three short silences inside the film.",
 type="Black small sans on off-white, one sentence per card: 'Introducing Composer, our first agent model.' 'Review changes in a single place.'",
 colour="Off-white and black, no accent. Saturation 0.8.",
 camera="Flat windows, slow scale.",
 ui="Real interface, full windows, dense.",
 end="The logo mark on black.",
 take="Sentence cards and full windows. Plain, and at 9.5 M views proof that plain is enough when the product is the news."),
"app-granola-recipes": dict(
 music="Not credited. 106 BPM.",
 sound="A founder speaks to camera (118 words).",
 type="Subtitles and small labels.",
 colour="White and soft green gradients; a red sofa.",
 camera="Talking head intercut with flat interface cards on a gradient.",
 ui="Real cards on a soft gradient.",
 end="A single green character on white.",
 take="Shows a face, so not available to us. Kept for the calm card treatment."),
"app-structured": dict(
 music="Not credited. 92 BPM. Lifts at 19.1, 50.5 and 63.4 s.",
 sound="Spoken 'Good morning' and a count-in; nine short silences inside the film; range 16.9 LU.",
 type="Almost none: 88 % of frames carry no words.",
 colour="Graded live action in warm daylight.",
 camera="A day in several people's lives; the app's timeline dots are drawn over the footage as a thin vertical line. 52 shots, 1.1 s median.",
 ui="Interface elements overlaid on live footage.",
 end="Logo; 3.6 s silent.",
 take="A planner app sold with no screenshots. Needs people on camera."),
}

def fmt_lifts(m):
    d = m["music"].get("drops") or []
    return ", ".join(f"{x:.1f} s ({round(100*x/m['duration'])} %)" for x in d[:6]) + (" ..." if len(d) > 6 else "") if d else "none detected"

rows = []
for mj in sorted(glob.glob(f"{S}/meas/*/m.json")):
    m = json.load(open(mj)); slug = m["slug"]; o = O[slug]
    info = {}
    if slug in ids and os.path.exists(f"{S}/dl/{ids[slug]}.info.json"): info = json.load(open(f"{S}/dl/{ids[slug]}.info.json"))
    elif slug in ids and os.path.exists(f"{S}/dl2/{ids[slug]}.info.json"): info = json.load(open(f"{S}/dl2/{ids[slug]}.info.json"))
    title = o.get("title") or info.get("title", slug)
    url = o.get("url") or f"https://www.youtube.com/watch?v={ids[slug]}"
    channel = o.get("channel") or info.get("channel", "")
    date = info.get("upload_date", ""); date = f"{date[:4]}-{date[4:6]}-{date[6:]}" if date else "2026-06-25 (file path date)"
    views = info.get("view_count")
    a = m["cuts_adaptive"]; mu = m["music"]; lo = m["loudness"]; sp = m["spectrum"]; mo = m["motion"]; c = m["colour"]
    sil = m.get("silences", []); tail = round(m["duration"] - sil[-1][0], 1) if sil and sil[-1][1] >= m["duration"] - 0.15 else 0
    # text density
    fr = [os.path.basename(f) for f in glob.glob(os.path.dirname(mj) + "/f-*.jpg")]; cnt = {f: 0 for f in fr}
    for l in open(os.path.dirname(mj) + "/ocr.tsv"):
        p = l.split("\t")
        if len(p) >= 4 and os.path.basename(p[0]) in cnt: cnt[os.path.basename(p[0])] += 1
    L = list(cnt.values()); tl_med = st.median(L); textless = round(100 * sum(1 for x in L if x == 0) / len(L))
    official = o.get("official", True)
    row = dict(slug=slug, title=title, url=url, channel=channel, date=date, views=views, official=official,
               duration=m["duration"], width=m["width"], height=m["height"], shots=a["shots"], shots_per_s=a["shots_per_s"],
               shot_median=a["median"], shot_p25=a["p25"], shot_p75=a["p75"], shot_min=a["min"], shot_max=a["max"],
               bpm=mu.get("bpm"), lifts=mu.get("drops"), cuts_on_beat=mu.get("cuts_on_beat"), chance=mu.get("chance_level"),
               lufs=lo["I_LUFS"], lra=lo["LRA"], peak=lo["peak_dBFS"], low_gap_db=sp["low_gap_dB"], tail_silence_s=tail,
               speech_words=m.get("speech_words"), still_share=mo["still_share_lt_0.001"], luma=c["luma_mean"], sat=c["sat_mean"],
               dark_share=c["dark_share_Y_lt_50"], text_lines_median=tl_med, textless_pct=textless, max_text_h=m["ocr"]["max_text_h"])
    rows.append(row)
    onbeat = f"{round(100*mu['cuts_on_beat'])} % of cuts fall within 80 ms of a beat; chance would give {round(100*mu['chance_level'])} %." if mu.get("cuts_on_beat") is not None else ""
    md = f"""# {title}

- Source: {url}
- Published by: {channel}{'' if official else ' (a re-upload, not the brand channel)'}, {date}{f', {views:,} views when read' if views else ''}
- Read: 2026-11-21, from a {m['width']}x{m['height']} download, {m['duration']:.1f} s. Measured with `measure.py` in this folder. Audio was measured, not listened to.

## Cut rhythm (measured)

{a['shots']} shots in {m['duration']:.1f} s: {a['shots_per_s']:.2f} shots a second. Shot length median {a['median']:.2f} s, middle half {a['p25']:.2f} to {a['p75']:.2f} s, shortest {a['min']:.2f} s, longest {a['max']:.1f} s. {round(100*mo['still_share_lt_0.001'])} % of frames do not change from the frame before.

## Music

{o['music']}

Tempo {mu.get('bpm')} BPM (beats.ts). Section lifts at: {fmt_lifts(m)}. {onbeat}
Loudness {lo['I_LUFS']} LUFS integrated, range {lo['LRA']} LU, peak {lo['peak_dBFS']} dBFS. Band under 90 Hz sits {sp['low_gap_dB']} dB below the full mix.

## Sound design

{o['sound']}

Speech: {m.get('speech_words') or 0} words heard by whisper. Silence at the end: {tail} s.

## Type

{o['type']}

Text on screen: median {tl_med:g} lines per sampled frame; {textless} % of sampled frames carry no words. Largest text box {round(100*m['ocr']['max_text_h'],1)} % of frame height.

## Colour

{o['colour']}

Mean luma {c['luma_mean']} of 255, mean saturation {c['sat_mean']}, {round(100*c['dark_share_Y_lt_50'])} % of frames dark.

## Camera and device

{o['camera']}

## How real interface is shown

{o['ui']}

## How it ends

{o['end']}

## What to take

{o['take']}
"""
    open(f"{OUT}/{slug}.md", "w").write(md)

ours = []
for mj in sorted(glob.glob(f"{S}/meas-ours/*/m.json")):
    m = json.load(open(mj)); a = m["cuts_adaptive"]; mu = m["music"]; lo = m["loudness"]; sp = m["spectrum"]; mo = m["motion"]; c = m["colour"]
    fr = [os.path.basename(f) for f in glob.glob(os.path.dirname(mj) + "/f-*.jpg")]; cnt = {f: 0 for f in fr}
    for l in open(os.path.dirname(mj) + "/ocr.tsv"):
        p = l.split("\t")
        if len(p) >= 4 and os.path.basename(p[0]) in cnt: cnt[os.path.basename(p[0])] += 1
    L = list(cnt.values())
    sil = m.get("silences", []); tail = round(m["duration"] - sil[-1][0], 1) if sil and sil[-1][1] >= m["duration"] - 0.15 else 0
    ours.append(dict(slug=m["slug"], duration=m["duration"], shots=a["shots"], shots_per_s=a["shots_per_s"], shot_median=a["median"],
                     bpm=mu.get("bpm"), lifts=mu.get("drops"), lufs=lo["I_LUFS"], lra=lo["LRA"], low_gap_db=sp["low_gap_dB"], tail_silence_s=tail,
                     still_share=mo["still_share_lt_0.001"], luma=c["luma_mean"], sat=c["sat_mean"], dark_share=c["dark_share_Y_lt_50"],
                     text_lines_median=st.median(L), textless_pct=round(100 * sum(1 for x in L if x == 0) / len(L)), max_text_h=m["ocr"]["max_text_h"],
                     rms_per_s=m.get("rms_per_s")))
refs_rms = {os.path.basename(os.path.dirname(f)): json.load(open(f)).get("rms_per_s") for f in glob.glob(f"{S}/meas/*/m.json")}
json.dump(dict(read="2026-11-21", references=rows, ours=ours), open(f"{OUT}/measurements.json", "w"), indent=1)
json.dump(refs_rms, open(f"{S}/work/refs_rms.json", "w"))
print(len(rows), "notes;", len(ours), "of ours")
