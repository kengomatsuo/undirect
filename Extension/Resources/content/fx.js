// Effects drawn on the page when the guard stops something, so the trap is
// seen being beaten rather than vanishing in silence. Safari's own Hide
// Distracting Items dissolves an element as it goes; these do the same for
// the things that tried to take a press.
//
// Every effect is drawn in its own layer above the page with pointer-events
// off, after the guard has already acted: an effect never delays or blocks a
// click, and never touches the page's own elements. Each one sits behind a
// flag (settings.effects for all, settings.fx.<name> for one), and with
// Reduce Motion on each becomes a single still outline that fades.
//
//   shatter  the invisible layer that caught a press shows itself as tinted
//            glass, then breaks from the point that was pressed and falls away
//   burst    a pop-up or a click the page faked: a ring bursts at the press
//   snap     a link swapped under the finger: its outline snaps back
//   field    a trip nobody pressed for: the screen edge pushes back once
//   back     Back answered with another site: an arrow bounces at the edge
(() => {
  "use strict";

  const RED = "216,53,42";
  const reduced = () => {
    try { return matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; }
  };

  function layer() {
    const root = document.createElement("div");
    root.dataset.undirectFx = "";
    root.style.cssText =
      "all:initial;position:fixed;inset:0;z-index:2147483646;pointer-events:none;overflow:hidden;contain:strict";
    document.documentElement.appendChild(root);
    return root;
  }

  function piece(root, css) {
    const el = document.createElement("div");
    el.style.cssText = "position:absolute;pointer-events:none;box-sizing:border-box;" + css;
    root.appendChild(el);
    return el;
  }

  const done = (root, ms) => setTimeout(() => root.remove(), ms);

  // A still outline for Reduce Motion, and the first beat of every shatter.
  function outline(root, r, ms) {
    const el = piece(root,
      `left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;` +
      `border:2px dashed rgba(${RED},.85);border-radius:6px;` +
      `background:repeating-linear-gradient(135deg,rgba(${RED},.14) 0 10px,rgba(${RED},.05) 10px 20px)`);
    el.animate([{ opacity: 0 }, { opacity: 1, offset: 0.25 }, { opacity: 0 }], { duration: ms, easing: "ease-out", fill: "both" });
    return el;
  }

  function shatter({ rect, x, y }) {
    const root = layer();
    const r = {
      left: Math.max(0, rect.left), top: Math.max(0, rect.top),
      width: Math.min(innerWidth, rect.right) - Math.max(0, rect.left),
      height: Math.min(innerHeight, rect.bottom) - Math.max(0, rect.top),
    };
    if (r.width < 4 || r.height < 4) return root.remove();
    if (reduced()) { outline(root, r, 900); return done(root, 950); }

    const ox = x ?? r.left + r.width / 2;
    const oy = y ?? r.top + r.height / 2;
    const cols = Math.max(3, Math.min(8, Math.round(r.width / 110)));
    const rows = Math.max(3, Math.min(10, Math.round(r.height / 110)));
    const w = r.width / cols;
    const h = r.height / rows;
    const far = Math.hypot(r.width, r.height);
    const j = () => (Math.random() * 0.3 - 0.15) * 100;

    // The pane, seen for a beat: the trap that was over the page.
    const pane = outline(root, r, 260);
    pane.style.borderStyle = "solid";

    // The impact where the finger landed.
    const ring = piece(root,
      `left:${ox - 22}px;top:${oy - 22}px;width:44px;height:44px;border-radius:50%;` +
      `border:3px solid rgba(255,255,255,.95);box-shadow:0 0 18px rgba(${RED},.9)`);
    ring.animate([{ transform: "scale(.2)", opacity: 1 }, { transform: "scale(2.2)", opacity: 0 }],
      { duration: 420, easing: "cubic-bezier(.2,.7,.3,1)", fill: "both" });

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cx = r.left + (col + 0.5) * w;
        const cy = r.top + (row + 0.5) * h;
        const dist = Math.hypot(cx - ox, cy - oy);
        const ang = Math.atan2(cy - oy, cx - ox);
        const push = 40 + 90 * (1 - dist / far);
        const shard = piece(root,
          `left:${r.left + col * w}px;top:${r.top + row * h}px;width:${w + 1}px;height:${h + 1}px;` +
          `background:linear-gradient(160deg,rgba(255,255,255,.22),rgba(${RED},.2));` +
          `border:1px solid rgba(255,255,255,.45);` +
          `clip-path:polygon(${j()}% ${j()}%,${100 + j()}% ${j()}%,${100 + j()}% ${100 + j()}%,${j()}% ${100 + j()}%)`);
        const spin = (Math.random() * 2 - 1) * 160;
        shard.animate([
          { transform: "none", opacity: 0.95 },
          { transform: `translate(${Math.cos(ang) * push * 0.35}px,${Math.sin(ang) * push * 0.35}px) rotate(${spin * 0.2}deg)`, opacity: 0.95, offset: 0.25 },
          { transform: `translate(${Math.cos(ang) * push}px,${Math.sin(ang) * push + 220}px) rotate(${spin}deg) scale(.55)`, opacity: 0 },
        ], { duration: 780, delay: 120 + dist * 0.35, easing: "cubic-bezier(.4,0,.8,.6)", fill: "both" });
      }
    }
    done(root, 120 + far * 0.35 + 820);
  }

  function burst({ x, y }) {
    const root = layer();
    if (x == null) { x = innerWidth / 2; y = innerHeight / 2; }
    // A red stop mark where the press was, ringed, with sparks thrown off.
    const mark = piece(root,
      `left:${x - 22}px;top:${y - 22}px;width:44px;height:44px;border-radius:50%;background:rgb(${RED});` +
      `box-shadow:0 0 0 4px rgba(255,255,255,.9),0 6px 24px rgba(${RED},.6);display:grid;place-items:center`);
    mark.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M5 5l10 10M15 5L5 15" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/></svg>';
    if (reduced()) {
      mark.animate([{ opacity: 1 }, { opacity: 1, offset: 0.6 }, { opacity: 0 }], { duration: 800, fill: "both" });
      return done(root, 850);
    }
    mark.animate([
      { transform: "scale(.2)", opacity: 0 },
      { transform: "scale(1.15)", opacity: 1, offset: 0.25 },
      { transform: "scale(1)", opacity: 1, offset: 0.7 },
      { transform: "scale(.6)", opacity: 0 },
    ], { duration: 900, easing: "cubic-bezier(.3,1.5,.5,1)", fill: "both" });
    const ring = piece(root,
      `left:${x - 40}px;top:${y - 40}px;width:80px;height:80px;border-radius:50%;border:4px solid rgba(${RED},.95)`);
    ring.animate([{ transform: "scale(.4)", opacity: 1 }, { transform: "scale(1.9)", opacity: 0 }],
      { duration: 620, easing: "cubic-bezier(.2,.8,.3,1)", fill: "both" });
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * 360 + Math.random() * 10;
      const spark = piece(root,
        `left:${x - 3}px;top:${y - 13}px;width:6px;height:26px;border-radius:3px;` +
        `background:linear-gradient(rgb(255,200,180),rgb(${RED}));transform-origin:50% 50%`);
      spark.animate([
        { transform: `rotate(${a}deg) translateY(-18px) scaleY(1)`, opacity: 1 },
        { transform: `rotate(${a}deg) translateY(-${70 + Math.random() * 30}px) scaleY(.25)`, opacity: 0 },
      ], { duration: 560, easing: "cubic-bezier(.1,.7,.3,1)", fill: "both" });
    }
    done(root, 950);
  }

  function snap({ el }) {
    const rect = el?.getBoundingClientRect?.();
    if (!rect || !rect.width) return;
    const root = layer();
    const box = piece(root,
      `left:${rect.left - 4}px;top:${rect.top - 3}px;width:${rect.width + 8}px;height:${rect.height + 6}px;` +
      `border:3px solid rgba(${RED},1);border-radius:8px;box-shadow:0 0 0 6px rgba(${RED},.25),0 0 22px rgba(${RED},.6)`);
    box.animate(reduced()
      ? [{ opacity: 1 }, { opacity: 0 }]
      : [
          { transform: "scale(1.35) rotate(-3deg)", opacity: 0 },
          { transform: "scale(.94) rotate(1deg)", opacity: 1, offset: 0.35 },
          { transform: "scale(1.03)", opacity: 1, offset: 0.6 },
          { transform: "scale(1)", opacity: 0 },
        ], { duration: 820, easing: "cubic-bezier(.3,1.4,.5,1)", fill: "both" });
    done(root, 860);
  }

  function field() {
    const root = layer();
    const edge = piece(root,
      `inset:0;border-radius:0;box-shadow:inset 0 0 0 6px rgba(${RED},.95),inset 0 0 140px rgba(${RED},.55)`);
    edge.animate(reduced()
      ? [{ opacity: 0 }, { opacity: 1, offset: 0.3 }, { opacity: 0 }]
      : [
          { opacity: 0, transform: "scale(1.04)" },
          { opacity: 1, transform: "scale(.975)", offset: 0.25 },
          { opacity: 0.8, transform: "scale(1.005)", offset: 0.55 },
          { opacity: 0, transform: "scale(1)" },
        ], { duration: 900, easing: "cubic-bezier(.3,1.3,.5,1)", fill: "both" });
    done(root, 950);
  }

  function back() {
    const root = layer();
    const y = innerHeight / 2 - 26;
    const chip = piece(root,
      `left:12px;top:${y}px;width:52px;height:52px;border-radius:50%;background:rgba(22,24,28,.92);` +
      `box-shadow:0 0 0 3px rgba(${RED},.9);display:grid;place-items:center;color:#fff;` +
      `font:600 26px/1 -apple-system,system-ui,sans-serif`);
    chip.textContent = "←";
    chip.animate(reduced()
      ? [{ opacity: 0 }, { opacity: 1, offset: 0.2 }, { opacity: 0 }]
      : [
          { transform: "translateX(-70px)", opacity: 0 },
          { transform: "translateX(8px)", opacity: 1, offset: 0.3 },
          { transform: "translateX(-4px)", opacity: 1, offset: 0.45 },
          { transform: "translateX(0)", opacity: 1, offset: 0.75 },
          { transform: "translateX(-30px)", opacity: 0 },
        ], { duration: 1100, easing: "cubic-bezier(.3,1.3,.5,1)", fill: "both" });
    done(root, 1150);
  }

  const EFFECTS = { shatter, burst, snap, field, back };

  // settings: the guard's settings object; effects off turns them all off,
  // fx.<name> false turns one off.
  function play(name, args, settings) {
    if (settings?.effects === false || settings?.fx?.[name] === false) return;
    if (window.top !== window || !document.documentElement) return;
    try { EFFECTS[name]?.(args ?? {}); } catch (e) { /* an effect never breaks the guard */ }
  }

  globalThis.UndirectFX = { play, names: Object.keys(EFFECTS) };
})();
