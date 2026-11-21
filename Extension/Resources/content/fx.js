// Effects drawn on the page when the guard stops something, so the trap is
// seen being beaten rather than vanishing in silence. Safari's own Hide
// Distracting Items turns an element into dust as it goes; these do the same
// for the things that tried to take a press. The research behind each choice
// is in docs/research/page-effects.md.
//
// Every effect is drawn in its own layer above the page, inside a closed
// shadow root with pointer-events off, after the guard has already acted: an
// effect never delays or blocks a click, never touches the page's own
// elements, and the page's styles cannot reach it. Each one sits behind a
// flag (settings.effects for all, settings.fx.<name> for one), and with
// Reduce Motion on each becomes a single still picture that fades.
//
// Everything moves on transform and opacity, on springs, so a page busy
// running its own scripts cannot make an effect stutter.
//
//   shatter  the invisible layer that caught a press lights up from the press
//            point, cracks in rings and spokes round it, hangs, and falls
//   burst    a pop-up or a click the page faked: a small window pops up over
//            the press, is struck out, and blows away as its own dust
//   snap     a link swapped under the finger: a band snaps back round it and
//            Undirect's mark lands on its corner
//   field    a trip nobody pressed for: the screen edge flares and pushes back
//   back     Back answered with another site: a Back button comes out of the
//            edge in a snare, and the snare flies apart
(() => {
  "use strict";

  const RED = "217,43,36";   // Undirect red, #D92B24
  const HOT = "255,69,58";   // the same red where it has to carry as light
  const OUT = "cubic-bezier(.33,1,.68,1)";  // ease-out cubic
  const IN = "cubic-bezier(.32,0,.67,0)";   // ease-in cubic

  // The dark glass the note and the Back button are made of: legible over a
  // white page and a black one, with a light edge for the dark page and a
  // shadow for the light one.
  const GLASS =
    "background:rgba(28,28,30,.88);-webkit-backdrop-filter:blur(20px) saturate(180%);backdrop-filter:blur(20px) saturate(180%);" +
    "box-shadow:inset 0 0 0 1px rgba(255,255,255,.12),inset 0 1px 0 rgba(255,255,255,.16)," +
    "0 1px 2px rgba(0,0,0,.2),0 8px 24px -4px rgba(0,0,0,.28),0 20px 48px -12px rgba(0,0,0,.3);";

  const reduced = () => {
    try { return matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; }
  };

  // SwiftUI's spring(duration:bounce:) as the options an animation takes: a
  // CSS linear() easing sampled from the spring, and the time it needs to
  // come within a thousandth of rest.
  function spring(duration, bounce) {
    const w = (2 * Math.PI) / duration;
    const z = 1 - bounce;
    const wd = w * Math.sqrt(1 - z * z);
    const at = bounce
      ? (t) => 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + ((z * w) / wd) * Math.sin(wd * t))
      : (t) => 1 - Math.exp(-w * t) * (1 + w * t);
    const end = bounce ? Math.log(1000) / (z * w) : 9.23 / w;
    const stops = Array.from({ length: 41 }, (_, i) => (i === 40 ? 1 : +at((i / 40) * end).toFixed(4)));
    return { duration: Math.round(end * 1000), easing: `linear(${stops.join(",")})` };
  }

  // The house table (the expressive-motion skill); nothing below invents one.
  const S = {
    pressIn: spring(0.15, 0),     // a touch going down
    bounce: spring(0.35, 0.409),  // arrivals and releases: a tenth past rest, then home
    select: spring(0.5, 0.15),    // a capsule changing size
    small: spring(0.25, 0),       // a fade or a tint
    sheet: spring(0.5, 0),        // a ring spreading
    fling: spring(0.6, 0),        // pieces thrown clear
  };

  function layer() {
    const host = document.createElement("div");
    host.dataset.undirectFx = "";
    host.style.cssText =
      "all:initial;position:fixed;inset:0;z-index:2147483646;pointer-events:none;overflow:hidden;contain:strict";
    document.documentElement.appendChild(host);
    return host.attachShadow({ mode: "closed" });
  }

  function piece(parent, css, html) {
    const el = document.createElement("div");
    el.style.cssText = "position:absolute;box-sizing:border-box;" + css;
    if (html) el.innerHTML = html;
    parent.appendChild(el);
    return el;
  }

  const done = (root, ms) => setTimeout(() => root.host.remove(), ms);

  // Reduce Motion: the effect's resting picture, shown once and faded.
  function rest(root) {
    root.host.animate({ opacity: [0, 1, 1, 0], offset: [0, 0.2, 0.7, 1] }, { duration: 900, fill: "both" });
    done(root, 950);
  }

  // A pop: up fast, home on the bounce.
  function pop(el, by, delay = 0) {
    el.animate({ scale: [1, 1 + by] }, { ...S.pressIn, delay, fill: "forwards" });
    el.animate({ scale: [1 + by, 1] }, { ...S.bounce, delay: delay + 80, fill: "forwards" });
  }

  // Where the finger landed: a ring that spreads and goes. White with a dark
  // hairline, so it shows on a light page and on a dark one.
  function ripple(root, x, y, delay = 0) {
    const ring = piece(root,
      `left:${x - 18}px;top:${y - 18}px;width:36px;height:36px;border-radius:50%;opacity:0;` +
      "border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.28),inset 0 0 0 1px rgba(0,0,0,.28)");
    ring.animate({ transform: ["scale(.3)", "scale(2.6)"], opacity: [1, 0] }, { ...S.sheet, delay, fill: "forwards" });
  }

  // Undirect's mark, the U-turn of the app icon, drawn round the turn: the
  // tail first, the head landing last.
  const MARK =
    '<svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true" style="display:block;overflow:visible">' +
    '<path d="M16.5 20V10a4.5 4.5 0 0 0-9 0v4.6" pathLength="1" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="1"/>' +
    '<path d="M4.3 14.4h6.4L7.5 20z" fill="#fff" stroke="#fff" stroke-width=".8" stroke-linejoin="round" ' +
    'style="transform-box:fill-box;transform-origin:50% 0"/></svg>';

  function mark(parent, delay = 0) {
    parent.innerHTML = MARK;
    if (reduced()) return;
    const [turn, head] = parent.querySelectorAll("path");
    turn.animate({ strokeDashoffset: [1, 0] }, { duration: 280, delay, easing: OUT, fill: "both" });
    head.animate({ scale: [0, 1] }, { ...S.bounce, delay: delay + 200, fill: "both" });
  }

  // Glass breaks in rings and spokes round the point of impact, fine near it
  // and coarse far away. Returns the shards as polygons that tile the pane
  // exactly, each with its centre and its distance from the press.
  function fracture(r, x, y, rand = Math.random) {
    const ox = Math.min(r.right, Math.max(r.left, x));
    const oy = Math.min(r.bottom, Math.max(r.top, y));
    const inside = ([px, py]) => px >= r.left && px <= r.right && py >= r.top && py <= r.bottom;
    const far = Math.max(...[[r.left, r.top], [r.right, r.top], [r.left, r.bottom], [r.right, r.bottom]]
      .map(([cx, cy]) => Math.hypot(cx - ox, cy - oy)));

    // A press in a corner sees a quarter of the directions, so it gets four
    // times the spokes and keeps as many shards as a press in the middle.
    const open = Array.from({ length: 36 }, (_, i) => (i / 36) * 2 * Math.PI)
      .filter((a) => inside([ox + 2 * Math.cos(a), oy + 2 * Math.sin(a)])).length / 36;
    const base = Math.max(8, Math.min(12, Math.round((r.right - r.left + r.bottom - r.top) / 110)));
    const spokes = Math.round(base / Math.max(open, 0.2));

    const radii = [];
    for (let rad = 30 + rand() * 14; rad < far; rad *= 2.2) radii.push(rad);
    radii.push(far * 2); // past every corner; the clip below trims it to the pane

    const angles = Array.from({ length: spokes }, (_, j) => ((j + (rand() - 0.5) * 0.5) / spokes) * 2 * Math.PI);
    const rings = radii.map((rad, k) => angles.map((a) => {
      const reach = k === radii.length - 1 ? rad : rad * (1 + (rand() - 0.5) * 0.3);
      return [ox + reach * Math.cos(a), oy + reach * Math.sin(a)];
    }));

    // Sutherland-Hodgman against the pane's four edges.
    const clip = (pts) => [[0, r.left, 1], [0, r.right, -1], [1, r.top, 1], [1, r.bottom, -1]]
      .reduce((poly, [axis, limit, side]) => {
        const kept = [];
        poly.forEach((a, i) => {
          const b = poly[(i + 1) % poly.length];
          const aIn = side * (a[axis] - limit) >= 0;
          const bIn = side * (b[axis] - limit) >= 0;
          if (aIn) kept.push(a);
          if (aIn !== bIn) {
            const t = (limit - a[axis]) / (b[axis] - a[axis]);
            kept.push([a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]);
          }
        });
        return kept;
      }, pts);

    const shards = [];
    rings.forEach((ring, k) => ring.forEach((outerA, j) => {
      const next = (j + 1) % spokes;
      const pts = clip(k === 0
        ? [[ox, oy], outerA, ring[next]]
        : [rings[k - 1][j], outerA, ring[next], rings[k - 1][next]]);
      if (pts.length < 3) return;
      const cx = pts.reduce((sum, p) => sum + p[0], 0) / pts.length;
      const cy = pts.reduce((sum, p) => sum + p[1], 0) / pts.length;
      shards.push({ pts, cx, cy, dist: Math.hypot(cx - ox, cy - oy) });
    }));
    return shards;
  }

  function shatter({ rect, x, y }) {
    const r = {
      left: Math.max(0, rect.left), top: Math.max(0, rect.top),
      right: Math.min(innerWidth, rect.right), bottom: Math.min(innerHeight, rect.bottom),
    };
    const width = r.right - r.left;
    const height = r.bottom - r.top;
    if (width < 4 || height < 4) return; // a hidden tab measures zero
    const root = layer();

    // The pane, seen for a beat: the trap that was over the page.
    const pane = piece(root,
      `left:${r.left}px;top:${r.top}px;width:${width}px;height:${height}px;overflow:hidden;` +
      `background:linear-gradient(135deg,rgba(255,255,255,.3),rgba(${RED},.14) 45%,rgba(${RED},.22));` +
      `box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.6),inset 0 0 0 3px rgba(${RED},.4)`);
    if (reduced()) return rest(root);

    const CRACK = 170; // the pane is seen whole this long
    const HANG = 120;  // and hangs cracked this long before the first shard drops
    const ox = Math.min(r.right, Math.max(r.left, x ?? r.left + width / 2));
    const oy = Math.min(r.bottom, Math.max(r.top, y ?? r.top + height / 2));
    const shards = fracture(r, ox, oy);
    const far = Math.max(...shards.map((s) => s.dist));

    // Light spreads through the glass from the fingertip, then the pane gives
    // way to its shards as the crack travels out.
    const glow = piece(pane,
      `left:${ox - r.left - far}px;top:${oy - r.top - far}px;width:${far * 2}px;height:${far * 2}px;border-radius:50%;` +
      "background:radial-gradient(circle,rgba(255,255,255,.7),rgba(255,255,255,.16) 35%,rgba(255,255,255,0) 68%)");
    glow.animate({ transform: ["scale(.04)", "scale(1)"], opacity: [1, 0.2] }, { ...S.sheet, fill: "both" });
    pane.animate({ opacity: [0, 1, 1, 0], offset: [0, 0.25, 0.6, 1] }, { duration: CRACK + far * 0.22 + 60, fill: "both" });
    ripple(root, ox, oy, CRACK);

    const stage = piece(root, "inset:0;perspective:1100px");
    let last = 0;
    for (const s of shards) {
      const xs = s.pts.map((p) => p[0]);
      const ys = s.pts.map((p) => p[1]);
      const left = Math.min(...xs);
      const top = Math.min(...ys);
      const el = piece(stage,
        `left:${left}px;top:${top}px;width:${Math.max(...xs) - left}px;height:${Math.max(...ys) - top}px;opacity:0;` +
        `clip-path:polygon(${s.pts.map((p) => `${(p[0] - left).toFixed(1)}px ${(p[1] - top).toFixed(1)}px`).join(",")});` +
        `background:linear-gradient(${Math.round(Math.random() * 360)}deg,rgba(255,255,255,${(0.16 + Math.random() * 0.38).toFixed(2)}),` +
        `rgba(255,255,255,.04) 45%,rgba(${RED},${(0.14 + Math.random() * 0.14).toFixed(2)}))`);

      const ang = Math.atan2(s.cy - oy, s.cx - ox);
      const near = 1 - s.dist / far;
      const crack = CRACK + s.dist * 0.22;             // the crack reaches this shard
      const drop = CRACK + HANG + s.dist * 0.24;       // and it lets go, nearest first
      const life = drop + 560 - crack;
      const axis = `${(Math.random() - 0.5).toFixed(2)},${(Math.random() - 0.5).toFixed(2)},${(Math.random() * 0.4 + 0.1).toFixed(2)}`;
      const at = (dx, dy, turn, size) =>
        `translate3d(${dx.toFixed(1)}px,${dy.toFixed(1)}px,0) rotate3d(${axis},${turn.toFixed(1)}deg) scale(${size})`;
      const jolt = at(Math.cos(ang) * (1 + near * 3), Math.sin(ang) * (1 + near * 3), (Math.random() - 0.5) * 2, 1);
      const push = 24 + near * 80;
      el.animate([
        { transform: at(0, 0, 0, 1), easing: OUT },
        { transform: jolt, offset: 50 / life },
        { transform: jolt, offset: (drop - crack) / life, easing: "cubic-bezier(.5,0,.9,.55)" },
        { transform: at(Math.cos(ang) * push, Math.sin(ang) * push + 300 + Math.random() * 180,
                        (Math.random() < 0.5 ? -1 : 1) * (70 + Math.random() * 150), 0.8) },
      ], { duration: life, delay: crack, fill: "both" });
      el.animate({ opacity: [0, 1, 1, 0], offset: [0, 0.01, (drop - crack + 200) / life, 1] },
        { duration: life, delay: crack, fill: "both" });
      last = Math.max(last, crack + life);
    }
    done(root, last + 50);
  }

  // A small window, as a pop-up is: title bar, three lights, a blank page.
  // Struck, it is the same window under a wash of red.
  const windowArt = (wash) =>
    `background-image:${wash ? `linear-gradient(rgba(${RED},.84),rgba(${RED},.84)),` : ""}` +
    "radial-gradient(circle at 13px 10px,#ff5f57 0 3.5px,rgba(255,95,87,0) 4.1px)," +
    "radial-gradient(circle at 24px 10px,#febc2e 0 3.5px,rgba(254,188,46,0) 4.1px)," +
    "radial-gradient(circle at 35px 10px,#28c840 0 3.5px,rgba(40,200,64,0) 4.1px)," +
    "linear-gradient(#e6e6eb 0 20px,#fff 20px);background-size:88px 66px;background-repeat:no-repeat;";

  function burst({ x, y }) {
    const root = layer();
    if (x == null) { x = innerWidth / 2; y = innerHeight / 2; }
    const W = 88, H = 66, CELL = 11;
    // Above the press, so a finger does not hide it; kept on screen.
    const left = Math.max(8, Math.min(innerWidth - W - 8, x - W / 2));
    const top = Math.max(8, Math.min(innerHeight - H - 8, y - H - 28));

    const win = piece(root,
      `left:${left}px;top:${top}px;width:${W}px;height:${H}px;border-radius:${CELL}px;${windowArt(false)}` +
      `box-shadow:0 0 0 .5px rgba(0,0,0,.3),0 2px 4px rgba(0,0,0,.2),0 12px 28px -6px rgba(0,0,0,.4);transform-origin:${x - left}px ${y - top}px`);
    const slash = piece(root,
      `left:${left - 8}px;top:${top + H / 2 - 4}px;width:${W + 16}px;height:8px;border-radius:4px;` +
      `background:rgb(${RED});box-shadow:0 0 0 2.5px #fff,0 2px 6px rgba(0,0,0,.25);transform:rotate(-35deg)`);
    if (reduced()) return rest(root);

    const STRUCK = 190; // the window is up; the line goes through it
    const GONE = 330;   // and it starts to blow away
    ripple(root, x, y);
    win.animate({ transform: ["scale(.1)", "none"], opacity: [0, 1] }, { ...S.bounce, fill: "both" });
    win.animate({ opacity: [1, 0] }, { duration: 1, delay: GONE, fill: "forwards" });
    slash.animate({ transform: ["rotate(-35deg) scaleX(0)", "rotate(-35deg) scaleX(1)"] }, { ...S.pressIn, delay: STRUCK, fill: "both" });
    slash.animate({ opacity: [1, 0], transform: ["rotate(-35deg) scaleX(1)", "rotate(-35deg) scaleX(1.25)"] },
      { ...S.small, delay: GONE, fill: "forwards" });

    const ring = piece(root,
      `left:${left + W / 2 - 40}px;top:${top + H / 2 - 40}px;width:80px;height:80px;border-radius:50%;opacity:0;` +
      `border:3px solid rgb(${HOT})`);
    ring.animate({ transform: ["scale(.6)", "scale(2.2)"], opacity: [0.9, 0] }, { ...S.sheet, delay: GONE, fill: "forwards" });

    // The window again, gone red and cut into squares that each carry their
    // own piece of it, so what blows away is the window itself.
    for (let row = 0; row < H / CELL; row++) {
      for (let col = 0; col < W / CELL; col++) {
        const corner = (row === 0 ? "t" : row === H / CELL - 1 ? "b" : "") + (col === 0 ? "l" : col === W / CELL - 1 ? "r" : "");
        const round = { tl: "11px 0 0 0", tr: "0 11px 0 0", bl: "0 0 0 11px", br: "0 0 11px 0" }[corner] ?? "0";
        const cell = piece(root,
          `left:${left + col * CELL}px;top:${top + row * CELL}px;width:${CELL}px;height:${CELL}px;opacity:0;border-radius:${round};` +
          `${windowArt(true)}background-position:${-col * CELL}px ${-row * CELL}px`);
        const blow = GONE + col * 22 + Math.random() * 70; // the wind comes from the left
        cell.animate({ opacity: [1, 1] }, { duration: 1, delay: GONE, fill: "forwards" });
        cell.animate({
          transform: ["none",
            `translate(${(30 + Math.random() * 90).toFixed(1)}px,${(-20 - Math.random() * 70 + (row - 2.5) * 9).toFixed(1)}px) ` +
            `rotate(${Math.round(Math.random() * 320 - 160)}deg) scale(.2)`],
          opacity: [1, 0],
        }, { duration: 480 + Math.random() * 280, delay: blow, easing: OUT, fill: "forwards" });
      }
    }
    done(root, 1250);
  }

  function snap({ el }) {
    const rect = el?.getBoundingClientRect?.();
    if (!rect || !rect.width) return;
    const root = layer();
    const band = piece(root,
      `left:${rect.left - 6}px;top:${rect.top - 4}px;width:${rect.width + 12}px;height:${rect.height + 8}px;border-radius:10px;` +
      `background:rgba(${RED},.1);box-shadow:inset 0 0 0 2.5px rgb(${RED}),0 0 0 1.5px rgba(255,255,255,.9)`);
    const badge = piece(root,
      `left:${Math.min(innerWidth - 28, rect.right - 7)}px;top:${Math.max(4, rect.top - 17)}px;width:24px;height:24px;` +
      `border-radius:50%;padding:4px;background:rgb(${RED});box-shadow:0 0 0 1.5px #fff,0 2px 6px rgba(0,0,0,.3)`);
    mark(badge, 160);
    if (reduced()) return rest(root);

    // Pulled off to one side like a rubber band, and let go.
    band.animate({ transform: ["translate(18px,-12px) rotate(5deg) scale(1.14)", "none"], opacity: [0, 1] }, { ...S.bounce, fill: "both" });
    badge.animate({ scale: [0, 1] }, { ...S.bounce, delay: 120, fill: "both" });
    root.host.animate({ opacity: [1, 0] }, { ...S.small, delay: 760, fill: "forwards" });
    done(root, 1150);
  }

  function field() {
    const root = layer();
    const wall = piece(root,
      `inset:0;box-shadow:inset 0 0 0 2px rgb(${HOT}),inset 0 0 40px 8px rgba(${HOT},.6),inset 0 0 130px 28px rgba(255,55,95,.28)`);
    if (reduced()) return rest(root);

    // The wall arrives from outside the screen and overshoots inward, and the
    // knock runs on into the page as a ring.
    const echo = piece(root,
      `inset:6px;border-radius:16px;opacity:0;box-shadow:inset 0 0 0 2px rgba(${HOT},.75),inset 0 0 36px 2px rgba(${HOT},.3)`);
    wall.animate({ transform: ["scale(1.07)", "none"], opacity: [0, 1] }, { ...S.bounce, fill: "both" });
    echo.animate({ transform: ["none", "scale(.9)"], opacity: [0.9, 0] }, { ...S.sheet, delay: 110, fill: "forwards" });
    wall.animate({ transform: ["none", "scale(1.03)"], opacity: [1, 0] }, { ...S.small, delay: 520, fill: "forwards" });
    done(root, 950);
  }

  const CHEVRON =
    '<svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" style="display:block">' +
    '<path d="M14.5 5.5 8 12l6.5 6.5" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function back() {
    const root = layer();
    const puck = piece(root, `left:20px;top:${innerHeight / 2 - 30}px;width:60px;height:60px`);
    const disc = piece(puck, `inset:0;border-radius:50%;display:grid;place-items:center;${GLASS}`, CHEVRON);
    const bars = Array.from({ length: 8 }, (_, i) => piece(puck,
      `left:16px;top:27px;width:28px;height:6px;border-radius:3px;background:rgb(${HOT});` +
      `box-shadow:0 0 0 1.5px rgba(255,255,255,.9);transform:rotate(${i * 45}deg) translateY(-41px)`));
    if (reduced()) return rest(root);

    const SNAP = 430; // the snare has closed; it gives
    puck.animate({ transform: ["translateX(-110px)", "none"] }, { ...S.bounce, fill: "both" });
    bars.forEach((bar, i) => {
      const turn = `rotate(${i * 45}deg)`;
      bar.animate({ transform: [`${turn} translateY(-72px)`, `${turn} translateY(-41px)`], opacity: [0, 1] },
        { ...S.pressIn, delay: 170, fill: "both" });
      bar.animate({
        transform: [`${turn} translateY(-41px) rotate(0deg) scale(1)`,
                    `${turn} translateY(-128px) rotate(${i % 2 ? 160 : -160}deg) scale(.4)`],
        opacity: [1, 0],
      }, { ...S.fling, delay: SNAP, fill: "forwards" });
    });
    pop(disc, 0.08, SNAP);
    puck.animate({ transform: ["none", "translateX(-110px)"] }, { duration: 200, easing: IN, delay: 1000, fill: "forwards" });
    done(root, 1250);
  }

  const EFFECTS = { shatter, burst, snap, field, back };

  // settings: the guard's settings object; effects off turns them all off,
  // fx.<name> false turns one off. The guard calls this from inside its press
  // handlers, so the drawing is put off until the handler has returned: the
  // press never waits for an effect to be built.
  function play(name, args, settings) {
    if (settings?.effects === false || settings?.fx?.[name] === false) return;
    if (window.top !== window || !document.documentElement) return;
    setTimeout(() => {
      try { EFFECTS[name]?.(args ?? {}); } catch (e) { /* an effect never breaks the guard */ }
    }, 0);
  }

  // The note in guard.js is made of the same glass and moves on the same springs.
  globalThis.UndirectFX = {
    play, names: Object.keys(EFFECTS), spring, springs: S, fracture, reduced, mark, pop, glass: GLASS, IN, OUT,
  };
})();
