# "iPhone 17 Pro: Smart Group Selfies" (Apple, https://www.youtube.com/watch?v=er7MJvQCdsM), 1080p30 download.
# Every cut and motion event, read frame by frame on 2026-11-22. Frame n is on screen from n/30 s.
# Beat grid measured from the film's own audio (see beat-breakdown.md): 134.98 BPM, beat 1 of bar 1 at 0.068 s.
FPS = 30.0
BEAT = 0.44451      # s
T0 = 0.068          # s, bar 1 beat 1
# (frame, kind, settle_frame or None, on screen, how type enters)
#   kind: cut = picture changes; move = something starts moving; text = type in or out; hit = flash, blink or logo pop
EVENTS = [
 (0,   'cut',  None, 'Shot 1. Low-angle handheld: a woman holds the iPhone up for a selfie, street and sky behind. Slow drift.', ''),
 (54,  'move', None, 'A friend steps in from the left edge (to within 3 frames); a second from the right at f66.', ''),
 (77,  'cut',  None, 'Shot 2. Phone in a hand, screen centre frame, real Camera viewfinder with three faces.', ''),
 (101, 'move', 109,  'Viewfinder zooms out to fit them; yellow ZOOM badge fades in.', 'badge fades in over 2 frames'),
 (117, 'cut',  None, 'Shot 3. Another phone, divers on a beach.', ''),
 (120, 'move', 127,  'Viewfinder zooms out; ZOOM badge.', 'badge fades in'),
 (134, 'cut',  None, 'Shot 4. Another phone, friends with two dogs.', ''),
 (135, 'move', 142,  'Zoom-out starts on the first frame after the cut.', 'badge fades in'),
 (148, 'cut',  None, 'Shot 5. Another phone, cowboy hat and a horse. Holds still 30 frames.', ''),
 (178, 'move', 186,  'Viewfinder zooms out as two more lean in; ZOOM badge.', 'badge fades in'),
 (195, 'cut',  None, 'Shot 6. Another phone, three jockeys.', ''),
 (204, 'move', 212,  'Viewfinder zooms out; ZOOM badge.', 'badge fades in'),
 (222, 'cut',  None, 'Shot 7. Another phone, three friends in an arcade.', ''),
 (231, 'move', 236,  'Viewfinder zooms out; ZOOM badge.', 'badge fades in'),
 (237, 'hit',  243,  'Viewfinder blinks to black for 2 frames, then fades back wider.', ''),
 (250, 'cut',  None, 'Shot 8. Another phone, three in leather jackets in a park. The longest shot (82 frames).', ''),
 (267, 'move', 275,  'Viewfinder zooms out as more people arrive; ZOOM badge.', 'badge fades in'),
 (312, 'move', 320,  'Badge changes to ROTATE; the viewfinder turns into a landscape band inside the upright phone.', 'badge swaps in place'),
 (332, 'cut',  None, 'Shot 9. Another phone, cosplay group, already landscape. No move, 13 frames.', ''),
 (345, 'cut',  None, 'Shot 10. Back to the horse group, now six people.', ''),
 (346, 'move', 355,  'Viewfinder shrinks to the landscape band; ROTATE badge.', 'badge fades in'),
 (361, 'cut',  None, 'Shot 11. Back to the divers, now six. Holds still 28 frames.', ''),
 (389, 'move', 397,  'Viewfinder shrinks to the landscape band; ROTATE badge.', 'badge fades in'),
 (413, 'text', 421,  'Cut to a white card. "Fit everyone in", small black type, one centred line.', 'On in full at the cut, the three words spread wide; the gaps close in 8 frames. No fade, no rise.'),
 (439, 'text', 447,  '"automatically" joins the line; the first three words shift left to make room. Full line then holds 30 frames.', 'Slides in from the right, gap closing in 8 frames.'),
 (477, 'cut',  None, 'Shot 13. Back to the first phone, now five faces.', 'Line cut off, no exit move.'),
 (482, 'move', 490,  'Viewfinder shrinks to the landscape band; ROTATE badge. Then holds still 41 frames.', 'badge fades in'),
 (532, 'hit',  None, 'Cut to blank white for 3 frames (the music is silent here).', ''),
 (535, 'cut',  None, 'Photo 1, landscape, a still on white. No move at all. On 22 frames.', ''),
 (560, 'cut',  None, 'Photo 2, landscape, after 3 blank white frames. On 23 frames.', ''),
 (587, 'cut',  None, 'Photo 3, portrait, after 4 blank frames. On 23 frames.', ''),
 (614, 'cut',  None, 'Photo 4, portrait, after 4 blank frames. On 23 frames.', ''),
 (641, 'cut',  None, 'Photo 5, landscape, after 4 blank frames. On 23 frames.', ''),
 (668, 'cut',  None, 'Photo 6, portrait, after 4 blank frames. On 23 frames.', ''),
 (695, 'cut',  None, 'Photo 7, landscape, after 4 blank frames. On 23 frames.', ''),
 (720, 'cut',  None, 'Photo 8, portrait, after 2 blank frames. On 27 frames.', ''),
 (747, 'text', None, 'White card: "Group selfies on iPhone 17 Pro", same small black type. Holds 54 frames.', 'On in full at the cut. No animation in or out.'),
 (801, 'cut',  None, 'Shot 23. Live action again: the whole group huddled round the phone, handheld, they lean in.', ''),
 (850, 'hit',  857,  'Cut to white. Apple logo, black.', 'Logo lands about 2.3 times its size and shrinks to rest in 7 frames.'),
 (900, 'cut',  None, 'Cut to black. The file runs 5 more seconds of black silence.', ''),
]
# Music landmarks, from band energy at every eighth-note slot (seconds).
MUSIC = [
 (0.068,  'First hit: beat 1 of bar 1. Kick on every beat, hats on every eighth.'),
 (2.735,  'Bar 2 beat 3: drums drop out for two beats; two bass stabs on the off-beats (2.96, 3.40 s).'),
 (3.624,  'Bar 3 beat 1: full groove in. Runs 7 bars.'),
 (16.070, 'Bar 10 beat 1: breakdown bar, kick and hats thin out.'),
 (17.630, 'Last eighth of bar 10: one eighth of full silence.'),
 (17.849, 'Bar 11 beat 1: the drop. Groove back, 6 bars.'),
 (28.517, 'Bar 17 beat 1: final hit, rings out.'),
 (29.900, 'Music gone.'),
]
def grid(t):
    """nearest beat -> (bar, beat, offset_ms); offset negative = before the beat"""
    n = round((t - T0) / BEAT)
    return n // 4 + 1, n % 4 + 1, (t - (T0 + n * BEAT)) * 1000
def sub(t, div):
    """offset in ms from the nearest 1/div of a beat"""
    p = BEAT / div; n = round((t - T0) / p)
    return (t - (T0 + n * p)) * 1000, n % div
