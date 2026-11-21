// Runs in the isolated world at document_start, in every frame.
// Watches for the click-stealing patterns, records where the page tried to send
// the user, and applies whatever the user has allowed or blocked.
(() => {
  "use strict";

  const api = globalThis.browser ?? globalThis.chrome;
  if (!api?.runtime) return;

  const Site = globalThis.UndirectSite;

  const COVERAGE = 0.55;      // share of the viewport that makes a node a screen
  const HOVER_MS = 40;        // gap between hover hit-tests
  const FORWARD_MS = 350;     // wait for the browser's own click before forwarding
  const BACK_MS = 700;        // popstate to navigation, for the back hijack

  // Kept in sync with DEFAULT_SETTINGS in background.js by hand - two copies
  // because a page reads its own settings once, at document_start, rather
  // than asking the background and waiting.
  const settings = {
    enabled: true, sweep: true, veto: true, recipes: true, banner: true, effects: true,
    policy: "block", mode: "watched",
  };
  const site = location.hostname;
  const siteBase = Site.baseDomain(site);

  let table = { policy: "block", everywhere: {}, here: {} };
  let armed = false;          // this document has already tried something
  let lastPopstate = -Infinity;
  let bridgeLoaded = false;

  // Unknown means inert. Read only after the storage lookup in start()
  // resolves, so a page never gets a live window before its own watch state
  // is known - every check below reads this instead of `settings.enabled`.
  let active = false;

  // ---------------------------------------------------------------- helpers

  const parse = (url) => {
    try {
      return new URL(url, location.href);
    } catch (e) {
      return null;
    }
  };

  const hostOf = (url) => parse(url)?.hostname ?? "";

  const isOurs = (host) => !host || Site.sameSite(host, site);

  const verdictFor = (host) => Site.decide(table, host);

  const blankTarget = (el) => {
    const t = el?.getAttribute?.("target") ?? "";
    return t === "_blank" || t === "blank";
  };

  function coverage(rect) {
    const area = innerWidth * innerHeight;
    if (area <= 0) return 0; // a hidden tab measures zero, and 0/0 is not "huge"
    const w = Math.min(rect.right, innerWidth) - Math.max(rect.left, 0);
    const h = Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 0);
    if (w <= 0 || h <= 0) return 0;
    return (w * h) / area;
  }

  function paintsNothing(el) {
    const s = getComputedStyle(el);
    if (parseFloat(s.opacity) < 0.05) return true;
    if (s.backgroundImage !== "none") return false;
    const bg = s.backgroundColor;
    if (bg === "transparent") return true;
    const m = /^rgba?\(([^)]+)\)$/.exec(bg);
    if (!m) return false;
    const parts = m[1].split(",").map((v) => parseFloat(v));
    return parts.length > 3 && parts[3] < 0.05;
  }

  function floatsAbove(el) {
    const s = getComputedStyle(el);
    if (s.position !== "fixed" && s.position !== "absolute") return false;
    const z = parseInt(s.zIndex, 10);
    return Number.isFinite(z) && z >= 1000;
  }

  // A layer hidden by its own opacity, holding nothing, floated over the page.
  // A real backdrop under a modal is see-through by its background, and the
  // modal it guards is drawn on top of it; an empty full-screen layer at
  // opacity 0.01 exists only to be pressed without being seen. reelfren.net
  // lays one over the player whose onclick opens the pop (2026-11-07).
  function invisibleLayer(el) {
    if (el.childElementCount > 0 || el.textContent.trim() !== "") return false;
    if (parseFloat(getComputedStyle(el).opacity) >= 0.05) return false;
    return floatsAbove(el);
  }

  // The _blank form or anchor this node sits in, if any.
  function blankAncestor(el) {
    let node = el;
    for (let depth = 0; node?.nodeType === 1 && depth < 4; depth++) {
      const tag = node.tagName;
      if ((tag === "FORM" || tag === "A") && blankTarget(node)) return node;
      if (tag === "INPUT" && node.type === "submit" && blankTarget(node.form)) {
        return node.form;
      }
      node = node.parentElement;
    }
    return null;
  }

  // ---------------------------------------------------------------- the record

  // The note: one capsule of dark glass at the foot of the page each time
  // something is stopped, so a person sees Undirect working without being
  // interrupted. Safari gives extensions no notifications API, so this is the
  // only way to say something happened while the reader is looking at the page.
  //
  // It rises from the bottom edge on a spring. Undirect's mark draws itself in
  // the badge, and the address the page reached for arrives whole on a red
  // chip that is then wiped away into dust, leaving the address struck through
  // (Safari's own Hide Distracting Items takes an element away the same way).
  // A block that lands while it is up rolls the title to a count ("3 stopped")
  // and the capsule's width follows. It never takes focus and covers only
  // itself; a click sends it away, the pointer resting on it holds it, and
  // left alone it goes by itself. On the first NOTE_OFFER notes it carries a
  // gear that opens Undirect's popup, where the note can be switched off.
  // Research and the plan: docs/research/page-effects.md.
  const FX = globalThis.UndirectFX;
  const NOTE_MS = 4000;
  const NOTE_OFFER_MS = 6500; // longer while it carries the gear
  const NOTE_OFFER = 3;
  const HIT_MS = 560;         // the address is read whole this long, then struck
  const WIPE_MS = 420;
  const GEAR =
    '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">' +
    '<path d="M8.1 4 8.6 1.8h2.8L11.9 4l1 .4 1.9-1.2 2 2-1.2 1.9.4 1 2.2.5v2.8l-2.2.5-.4 1 1.2 1.9-2 2-1.9-1.2-1 .4-.5 2.2H8.6L8.1 16l-1-.4-1.9 1.2-2-2 1.2-1.9-.4-1-2.2-.5V8.6L4 8.1l.4-1-1.2-1.9 2-2 1.9 1.2z"/>' +
    '<circle cx="10" cy="10" r="2.7"/></svg>';
  const NOTE_CSS =
    ".n{pointer-events:auto;box-sizing:border-box;display:grid;justify-content:start;align-content:center;overflow:clip;" +
    "min-height:48px;max-width:min(440px,100%);padding:8px;border-radius:24px;cursor:default;color:#fff;" +
    "font:600 15px/20px -apple-system,BlinkMacSystemFont,system-ui,sans-serif;letter-spacing:-.01em;" +
    "-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased;" + FX.glass + "}" +
    ".r{display:flex;align-items:center;gap:10px;width:max-content;" +
    "max-width:calc(min(440px,100vw - 24px - env(safe-area-inset-left,0px) - env(safe-area-inset-right,0px)) - 16px)}" +
    ".b{flex:none;box-sizing:border-box;width:32px;height:32px;padding:5px;border-radius:50%;" +
    "background:linear-gradient(#f2463c,#d92b24);box-shadow:inset 0 1px 0 rgba(255,255,255,.28)}" +
    ".s{display:flex;align-items:center;gap:8px;min-width:0}.s:last-child{padding-inline-end:6px}" +
    // Short of room, the address gives way first, down to a stub; only then does the title wrap.
    ".t{flex:0 1 auto;min-width:0}" +
    ".c{position:relative;flex:0 999 auto;min-width:64px;display:flex;direction:ltr}.c[hidden]{display:none}" +
    ".h,.k{box-sizing:border-box;height:24px;padding:0 8px;border-radius:12px;white-space:nowrap;overflow:hidden;" +
    "text-overflow:ellipsis;text-align:center;font:500 13px/24px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:0}" +
    ".h{position:relative;flex:1 1 auto;min-width:0;max-width:168px;color:rgba(235,235,245,.7)}" +
    ".h::after{content:'';position:absolute;left:7px;right:7px;top:50%;height:1.5px;border-radius:1px;" +
    "background:currentColor;transform-origin:0 50%}" +
    ".k{position:absolute;inset:0;background:#d92b24;color:#fff}" +
    ".g{all:unset;flex:none;position:relative;box-sizing:border-box;width:32px;height:32px;border-radius:50%;" +
    "display:grid;place-items:center;cursor:pointer;color:#fff;background:rgba(255,255,255,.14);" +
    "-webkit-tap-highlight-color:transparent;" +
    `transition:background-color .15s,scale ${FX.springs.pressIn.duration}ms ${FX.springs.pressIn.easing}}` +
    ".g::after{content:'';position:absolute;inset:-6px}" + // a 44 px target round a 32 px look
    `.g svg{display:block;transition:rotate ${FX.springs.select.duration}ms ${FX.springs.select.easing}}` +
    "@media (hover:hover){.g:hover{background:rgba(255,255,255,.24)}.g:hover svg{rotate:60deg}}" +
    ".g:active{background:rgba(255,255,255,.32);scale:.96}" +
    ".g:focus-visible{outline:2px solid #fff;outline-offset:2px}" +
    ".d{position:fixed;left:0;top:0}.d i{position:absolute;opacity:0;border-radius:1px}" +
    "@media (prefers-reduced-motion:reduce){.g,.g svg{transition:none}.g:hover svg{rotate:none}}" +
    "@media (prefers-contrast:more),(prefers-reduced-transparency:reduce){.n{background:#1c1c1e;" +
    "-webkit-backdrop-filter:none;backdrop-filter:none;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.7),0 8px 24px -4px rgba(0,0,0,.3)}" +
    ".h{color:rgba(235,235,245,.85)}}";
  let notesShown = 0;
  let note = null;

  function say(key, sub, fallback) {
    try { return api.i18n.getMessage(key, sub) || fallback; } catch (e) { return fallback; }
  }

  function noteTitle(kind) {
    if (kind === "back-hijack") return say("note_back_trap", undefined, "Back button trap stopped");
    if (kind === "no-tap") return say("note_kept_here", undefined, "Kept you here");
    return say("note_stopped", undefined, "Stopped");
  }

  function showNote(kind, host) {
    if (!settings.banner || window.top !== window || !document.body) return;
    // A Back trap's title is the note's whole text: the trap is often the
    // page's own, and its address struck through would read as the page's.
    const named = kind !== "back-hijack";
    if (note) {
      note.count += 1;
      retitle(say("note_count", [String(note.count)], note.count + " stopped"), () => named && strike(host));
      if (!FX.reduced()) FX.pop(note.card, 0.05);
      FX.mark(note.badge);
      return refresh();
    }
    const offer = notesShown < NOTE_OFFER;
    notesShown += 1;
    try { api.storage.local.set({ notesShown }); } catch (e) {}

    const root = document.createElement("div");
    root.style.cssText =
      "all:initial;position:fixed;z-index:2147483647;left:0;right:0;bottom:0;display:flex;justify-content:center;" +
      "pointer-events:none;padding:0 calc(12px + env(safe-area-inset-right,0px)) " +
      "calc(14px + env(safe-area-inset-bottom,0px)) calc(12px + env(safe-area-inset-left,0px))";
    const shadow = root.attachShadow({ mode: "closed" });
    shadow.innerHTML =
      "<style>" + NOTE_CSS + "</style>" +
      '<div class="n"><div class="r"><span class="b" aria-hidden="true"></span>' +
      '<span class="s" role="status" aria-live="polite"><span class="t"></span>' +
      '<span class="c"><span class="h"></span></span></span></div></div>' +
      '<div class="d" aria-hidden="true"></div>';
    const card = shadow.querySelector(".n");
    const n = note = {
      root, card, badge: shadow.querySelector(".b"), title: shadow.querySelector(".t"),
      chip: shadow.querySelector(".c"), host: shadow.querySelector(".h"), dust: shadow.querySelector(".d"),
      count: 1, life: offer ? NOTE_OFFER_MS : NOTE_MS, timer: 0, striking: 0, resize: null,
    };
    card.dir = say("@@bidi_dir", undefined, "ltr");
    n.title.textContent = noteTitle(kind);
    const parts = [n.badge, n.title, n.chip];
    if (offer) {
      const button = document.createElement("button");
      button.className = "g";
      button.type = "button";
      button.innerHTML = GEAR;
      button.title = say("note_settings", undefined, "Settings");
      button.setAttribute("aria-label", button.title);
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        button.disabled = true;
        // The popup holds the note's own switch. Safari opens it only for a
        // press it can still see, which a message to the background may lose;
        // then the note says where the button is instead.
        api.runtime.sendMessage({ type: "undirect:openPopup" }).then((reply) => reply?.opened, () => false).then((opened) => {
          if (note !== n) return;
          if (opened) return hideNote();
          retitle(say("note_where", undefined, "Press Undirect in the toolbar for settings."), () => {
            clearTimeout(n.striking);
            button.remove();
            n.chip.hidden = true; // a later block brings it back with its address
          });
          refresh();
        });
      });
      card.firstChild.appendChild(button);
      parts.push(button);
    }
    card.addEventListener("click", hideNote);
    card.addEventListener("pointerenter", () => clearTimeout(n.timer));
    card.addEventListener("pointerleave", refresh);
    card.addEventListener("focusin", () => clearTimeout(n.timer));
    card.addEventListener("focusout", refresh);
    document.documentElement.appendChild(root);

    if (FX.reduced()) {
      card.animate({ opacity: [0, 1] }, { duration: 200 });
    } else {
      card.animate({ transform: ["translateY(calc(100% + 24px)) scale(.9)", "none"], opacity: [0, 1] }, FX.springs.bounce);
      parts.forEach((el, i) => el.animate({ transform: ["translateY(10px) scale(.92)", "none"], opacity: [0, 1] },
        { ...FX.springs.bounce, delay: 60 + i * 60, fill: "backwards" }));
    }
    FX.mark(n.badge, 160);
    if (named) strike(host);
    else n.chip.hidden = true;
    refresh();
  }

  // The address arrives whole on a red chip. After a beat the chip is wiped
  // away from the left, its dust blown off to the right, and the address is
  // left struck through. Reduced motion shows only that last state.
  function strike(host) {
    const n = note;
    n.chip.hidden = false;
    n.host.textContent = host;
    n.chip.querySelector(".k")?.remove();
    clearTimeout(n.striking);
    if (FX.reduced()) return;
    const cover = document.createElement("span");
    cover.className = "k";
    cover.setAttribute("aria-hidden", "true"); // the address is read once, from under it
    cover.textContent = host;
    n.chip.appendChild(cover);
    n.striking = setTimeout(() => {
      if (note !== n) return;
      const sweep = { duration: WIPE_MS, easing: "cubic-bezier(.65,0,.35,1)", fill: "both" };
      n.host.animate({ transform: ["scaleX(0)", "scaleX(1)"] }, { ...sweep, pseudoElement: "::after" });
      cover.animate({ clipPath: ["inset(0 0 0 0 round 12px)", "inset(0 0 0 100% round 12px)"] }, sweep)
        .onfinish = () => cover.remove();
      const box = n.chip.getBoundingClientRect();
      for (let i = 0; i < 36; i++) {
        const along = Math.random();
        const size = 2 + Math.random() * 3;
        const bit = document.createElement("i");
        bit.style.cssText =
          `left:${box.left + along * box.width}px;top:${box.top + Math.random() * box.height}px;` +
          `width:${size}px;height:${size}px;background:${i % 4 ? "#e8463d" : "#ffd5d0"}`;
        n.dust.appendChild(bit);
        bit.animate({
          transform: ["none", `translate(${16 + Math.random() * 48}px,${-8 - Math.random() * 34}px) rotate(${Math.random() * 240 - 120}deg) scale(.3)`],
          opacity: [1, 0],
        }, { duration: 480 + Math.random() * 380, delay: along * WIPE_MS, easing: FX.OUT, fill: "forwards" })
          .onfinish = () => bit.remove();
      }
    }, HIT_MS);
  }

  // Whatever changes the capsule's size happens inside this, and the capsule
  // springs from the old size to the new one. The row inside is always laid
  // out at its final width from the leading edge and the capsule clips its
  // far end, so the badge stays put and no line wraps on the way.
  function morph(change) {
    const { card } = note;
    const from = [card.offsetWidth, card.offsetHeight];
    note.resize?.cancel();
    change();
    if (FX.reduced()) return;
    note.resize = card.animate({
      width: [from[0] + "px", card.offsetWidth + "px"],
      height: [from[1] + "px", card.offsetHeight + "px"],
    }, FX.springs.select);
  }

  // The title rolls: the old one up and out, the new one up into place.
  function retitle(text, also) {
    const n = note;
    const land = () => {
      if (note !== n) return;
      morph(() => {
        n.title.textContent = text;
        also?.();
      });
    };
    if (FX.reduced()) return land();
    n.title.animate({ transform: ["none", "translateY(-12px)"], opacity: [1, 0] }, { duration: 110, easing: FX.IN })
      .onfinish = () => {
        land();
        n.title.animate({ transform: ["translateY(14px)", "none"], opacity: [0, 1] }, FX.springs.bounce);
      };
  }

  function refresh() {
    if (!note) return;
    clearTimeout(note.timer);
    note.timer = setTimeout(hideNote, note.life);
  }

  function hideNote() {
    if (!note) return;
    const gone = note;
    note = null;
    clearTimeout(gone.timer);
    clearTimeout(gone.striking);
    gone.card.style.pointerEvents = "none";
    gone.card.animate(
      FX.reduced() ? { opacity: [1, 0] } : { transform: ["none", "translateY(calc(100% + 24px)) scale(.94)"], opacity: [1, 0] },
      { duration: 200, easing: FX.IN, fill: "forwards" });
    setTimeout(() => gone.root.remove(), 220);
  }

  // Every cross-site destination the page reached for, whether or not it was
  // stopped. The popup lists these so the user can decide about each one.
  const TRAPS = new Set(["click-catcher", "overlay", "back-hijack"]);
  const SHOWN_WHERE_CAUGHT = new Set(["click-catcher", "overlay", "href-swap"]);
  let lastPress = {};

  function fx(name, args) {
    globalThis.UndirectFX?.play(name, args, settings);
  }

  function seen({ kind, host, url, blocked, learn, sized, because }) {
    if (!active) return;
    if (blocked) armed = true;
    // A trap leading nowhere else is still a trap: listed under this site.
    const local = isOurs(host);
    if (local && !(blocked && TRAPS.has(kind))) return;
    if (blocked && (!local || kind === "back-hijack")) showNote(kind, Site.baseDomain(host));
    if (blocked) {
      // The trap's own effect; the layer that shatters and the link that
      // snaps back are drawn where they are caught, since only there is the
      // element still in hand.
      if (kind === "no-tap") fx("field");
      else if (kind === "back-hijack") fx("back");
      else if (!SHOWN_WHERE_CAUGHT.has(kind)) fx("burst", lastPress);
    }
    try {
      api.runtime.sendMessage({
        type: "undirect:seen",
        kind,
        base: local ? siteBase : Site.baseDomain(host),
        local,
        host,
        url: url ?? "",
        blocked: !!blocked,
        learn: !!learn && !local,
        sized: !!sized,
        because: because || undefined,
        site: siteBase,
      });
    } catch (e) {
      // the background page is gone; the veto already happened
    }
  }

  // ---------------------------------------------------------------- detectors

  // Every real press, with wherever the thing under it honestly leads. The
  // background page cannot see a press, and it is the only half that can see a
  // navigation, so the two have to be put side by side there: a press aimed at
  // this site followed by a trip to another one is the press being taken.
  function pressed(target) {
    const link = target?.closest?.("a[href], area[href]");
    const form = target?.closest?.("form[action]");
    const where = link?.href || form?.action || "";
    try {
      api.runtime.sendMessage({
        type: "undirect:tap",
        site: siteBase,
        expect: where ? hostOf(where) : "",
      });
    } catch (e) {
      // the background page is gone; it will judge the next one
    }
  }

  addEventListener(
    "pointerdown",
    (e) => {
      if (!active || !e.isTrusted) return;
      lastPress = { x: e.clientX, y: e.clientY };
      pressed(e.target);
    },
    true
  );

  // A press is the usual way in, but not the only one: a keyboard or a switch
  // reaches a control without ever touching the screen.
  addEventListener(
    "keydown",
    (e) => {
      if (!active || !e.isTrusted) return;
      if (e.key !== "Enter" && e.key !== " ") return;
      pressed(e.target);
    },
    true
  );

  // A. The click catcher: a transparent screen over the page whose job is to
  // receive the click you meant for something underneath. This is deception
  // rather than a destination, so it goes whatever the rules say.
  const cleared = new WeakSet(); // nodes already judged innocent

  function sweep(x, y) {
    let removed = 0;
    for (let round = 0; round < 5; round++) {
      const hit = document.elementFromPoint(x, y);
      if (!hit || hit === document.body || hit === document.documentElement) break;
      // Our own effects never take a press, but a hit test that ignores
      // pointer-events (a test harness, an old engine) must not judge them.
      if (hit.closest?.("[data-undirect-fx]")) break;
      if (cleared.has(hit)) break;

      const blank = blankAncestor(hit);
      const node = blank ?? hit;
      if (node === document.body || node === document.documentElement) break;
      if (coverage(node.getBoundingClientRect()) < COVERAGE) {
        cleared.add(hit);
        break;
      }
      if (!paintsNothing(node)) {
        cleared.add(hit);
        break;
      }
      // A transparent full-screen _blank form is damning on its own, and so
      // is an empty layer hidden by its opacity. A plain one could be a real
      // click-outside layer, so wait until the page has shown its hand.
      if (!blank && !invisibleLayer(node) && !(armed && floatsAbove(node))) {
        cleared.add(hit);
        break;
      }

      const where = blank?.action || blank?.href || "";
      const rect = node.getBoundingClientRect();
      node.style.pointerEvents = "none";
      node.remove();
      removed += 1;
      fx("shatter", { rect, x, y });
      seen({
        kind: blank ? "click-catcher" : "overlay",
        host: hostOf(where),
        url: where,
        blocked: true,
        learn: true,
      });
    }
    return removed;
  }

  // Hovering is the cheap moment to clear a catcher: do it here and the press
  // that follows lands on the page, with nothing to forward. Throttled by the
  // clock, not by a frame, since a page nobody is looking at gets no frames.
  let hoverCheckedAt = 0;

  addEventListener(
    "pointermove",
    (e) => {
      if (!active || !settings.sweep || !e.isTrusted) return;
      const now = performance.now();
      if (now - hoverCheckedAt < HOVER_MS) return;
      hoverCheckedAt = now;
      sweep(e.clientX, e.clientY);
    },
    true
  );

  // A press with no hover before it, which is every tap on a phone. Removing
  // the catcher here costs the click, so hand it on if the browser drops it.
  let clickedAt = 0;
  let forwarding = false;

  addEventListener("click", (e) => {
    if (e.isTrusted) clickedAt = performance.now();
  }, true);

  function forwardClick(x, y) {
    const moment = performance.now();
    setTimeout(() => {
      if (clickedAt >= moment) return; // the browser delivered it after all
      const under = document.elementFromPoint(x, y);
      const target = under?.closest?.(
        "a[href], button, input, select, textarea, label, summary, [role=button], [onclick]"
      );
      if (!target) return;
      forwarding = true;
      try {
        target.click();
      } catch (err) {
        // nothing else to try
      } finally {
        forwarding = false;
      }
    }, FORWARD_MS);
  }

  addEventListener(
    "pointerdown",
    (e) => {
      if (!active || !settings.sweep || !e.isTrusted) return;
      if (sweep(e.clientX, e.clientY)) forwardClick(e.clientX, e.clientY);
    },
    true
  );

  // The last trusted press: what was under the finger, and where it honestly
  // pointed. B and B2 both read this - one to tell a replayed click from a
  // hijack, the other to catch the href changing underneath the press.
  let pressedAnchor = null;
  let pressedHref = "";
  let pressedTarget = "";

  addEventListener(
    "pointerdown",
    (e) => {
      if (!e.isTrusted) return;
      const a = e.target?.closest?.("a");
      pressedAnchor = a ?? null;
      pressedHref = a?.getAttribute("href") ?? "";
      pressedTarget = a?.getAttribute("target") ?? "";
    },
    true
  );

  // B. A click the page dispatched itself, on a link to somewhere else. Search
  // results do this for their own click-through logging, replaying the very
  // link just pressed - nothing swapped, so that is not a hijack. Only a
  // synthetic click landing away from the last real press is one.
  addEventListener(
    "click",
    (e) => {
      if (!active || !settings.veto || e.isTrusted || forwarding) return;
      const a = e.target?.closest?.("a");
      if (!a || !blankTarget(a) || a.hasAttribute("download")) return;
      const url = parse(a.href);
      if (!url || isOurs(url.hostname)) return;
      if (a === pressedAnchor && hostOf(pressedHref) === url.hostname) return;

      const verdict = verdictFor(url.hostname);
      seen({
        kind: "synthetic-click",
        host: url.hostname,
        url: a.href,
        blocked: verdict === "block",
        learn: true,
      });
      if (verdict !== "block") return;
      e.preventDefault();
      e.stopImmediatePropagation();
    },
    true
  );

  // B2. The link you pressed, changed before you let go. These networks rewrite
  // an anchor on mousedown and put it back after, so the press and the release
  // disagree about where you were going. Deception again, so the rules do not
  // get a say in whether it is undone.
  addEventListener(
    "click",
    (e) => {
      if (!active || !settings.veto || !e.isTrusted) return;
      const a = e.target?.closest?.("a");
      if (!a || a !== pressedAnchor) return;

      const href = a.getAttribute("href") ?? "";
      const target = a.getAttribute("target") ?? "";
      // Tracking code decorates links with extra query parameters all the time.
      // Only a different host, or a new _blank, is somebody taking the click.
      const wentElsewhere = hostOf(href) !== hostOf(pressedHref);
      const gainedBlank = target !== pressedTarget && blankTarget(a);
      if (!wentElsewhere && !gainedBlank) return;

      e.preventDefault();
      e.stopImmediatePropagation();
      fx("snap", { el: a });
      seen({
        kind: "href-swap",
        host: hostOf(href),
        url: href,
        blocked: true,
        learn: true,
      });

      if (pressedHref) a.setAttribute("href", pressedHref);
      if (pressedTarget) a.setAttribute("target", pressedTarget);
      else a.removeAttribute("target");
      if (!pressedHref) return;

      // Send the user where they were going before the swap.
      forwarding = true;
      try {
        a.click();
      } catch (err) {
        // nothing else to try
      } finally {
        forwarding = false;
      }
    },
    true
  );

  // C. The same trick with a form instead of a link.
  addEventListener(
    "submit",
    (e) => {
      if (!active || !settings.veto) return;
      const form = e.target;
      if (!blankTarget(form)) return;
      if (coverage(form.getBoundingClientRect()) < COVERAGE) return;
      if (!paintsNothing(form)) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      fx("shatter", { rect: form.getBoundingClientRect(), ...lastPress });
      seen({
        kind: "click-catcher",
        host: hostOf(form.action),
        url: form.action,
        blocked: true,
        learn: true,
      });
    },
    true
  );

  // D. A trip off the site that nobody asked for: on load, on a timer, while
  // scrolling, or in reply to the Back button.
  //
  // The background page judges a same-tab trip by the press before it, and
  // with no press it cannot tell a script's redirect from the user typing an
  // address: Safari's webNavigation has no transitionType. The Navigation API
  // can. Its `navigate` event is never raised by the address bar, a bookmark or
  // Back, only by the page itself or a link on it (HTML, "navigate": user
  // involvement is not "browser UI" and the initiator is same-origin), and a
  // cross-document push or replace can be cancelled before any request is
  // made. Safari has it from 26.2, the iOS deployment target; an older Mac
  // Safari has no `navigation` and keeps the background's judgement alone.
  //
  // A link or form the user activated, or any press in the last few seconds,
  // goes to the background as before: a button that sends the page to a
  // checkout is a press followed by a script's trip. Back is the exception. It
  // is the user's own press, and a page answering it with another site is the
  // trap people describe, whatever they tapped before.
  //
  // Not learned as a network block: one wrong call would block that site
  // everywhere, and the next attempt here is cancelled the same way.
  const NO_TAP_MS = 5000;
  const ASK_MS = 1500;        // longest a held trip waits on the background
  let lastActivation = -Infinity;
  let known = false;          // start() has read whether this site is guarded
  let held = null;            // a trip cancelled before that was known

  const activated = (e) => {
    if (e.isTrusted) lastActivation = performance.now();
  };
  addEventListener("click", activated, true);
  addEventListener("keydown", activated, true);
  addEventListener("popstate", () => (lastPopstate = performance.now()), true);
  addEventListener(
    "beforeunload",
    () => {
      if (performance.now() - lastPopstate < BACK_MS) armed = true;
    },
    true
  );

  function stop(url, afterBack) {
    const ruling = globalThis.UndirectNavigation.judgeUnasked({
      url,
      pageUrl: location.href,
      table,
      afterBack,
    });
    if (ruling.ruling !== "steal") return false;
    seen({
      kind: afterBack ? "back-hijack" : "no-tap",
      host: hostOf(url),
      url,
      blocked: true,
      learn: false,
      because: ruling.because,
    });
    return true;
  }

  const nav = window.top === window ? globalThis.navigation : null;
  nav?.addEventListener?.("navigate", (e) => {
    const now = performance.now();
    if (e.navigationType === "traverse") {
      lastPopstate = now;
      return;
    }
    if (e.navigationType === "reload" || !e.cancelable || e.userInitiated) return;
    if (e.formData) return; // a form posting what the user typed
    if (!settings.enabled) return;
    const url = e.destination?.url ?? "";
    if (isOurs(hostOf(url))) return;

    const afterBack = now - lastPopstate < BACK_MS;
    const pressed = now - lastActivation < NO_TAP_MS || navigator.userActivation?.isActive;
    if (pressed && !afterBack) return;

    if (!known) {
      // A redirect in the page's first script runs before storage answers.
      // Hold it, and send it on once start() says this site is not guarded.
      e.preventDefault();
      held = { url, replace: e.navigationType === "replace", afterBack };
      return;
    }
    if (active && stop(url, afterBack)) e.preventDefault();
  });

  function settle() {
    known = true;
    const trip = held;
    held = null;
    if (!trip || (active && stop(trip.url, trip.afterBack))) return;
    if (trip.replace) location.replace(trip.url);
    else location.assign(trip.url);
  }

  // E. Whatever the page-world half saw.
  addEventListener("message", (e) => {
    if (e.source !== window) return;
    const msg = e.data;
    if (msg?.__undirect !== 1) return;
    if (msg.kind === "ready") {
      bridgeLoaded = true;
      return;
    }
    seen({
      kind: msg.kind,
      host: msg.host,
      url: msg.url,
      blocked: !!msg.blocked,
      learn: !!msg.blocked,
      because: msg.because,
      sized: !!msg.sized,
    });
  });

  // ---------------------------------------------------------------- start-up

  // site.js goes in first and its load event says so, which beats relying on
  // the order two dynamically inserted scripts happen to run in.
  function injectBridge() {
    const lib = document.createElement("script");
    lib.src = api.runtime.getURL("lib/site.js");
    lib.addEventListener("load", () => {
      lib.remove();
      const el = document.createElement("script");
      el.src = api.runtime.getURL("content/bridge.js");
      el.dataset.table = JSON.stringify(table);
      el.addEventListener("load", () => el.remove());
      (document.head ?? document.documentElement).appendChild(el);
    });
    (document.head ?? document.documentElement).appendChild(lib);
  }

  function applyRecipes() {
    if (!settings.recipes) return;
    for (const recipe of globalThis.UNDIRECT_RECIPES ?? []) {
      const match = recipe.hosts.some((h) => site === h || site.endsWith("." + h));
      if (!match) continue;
      try {
        recipe.apply();
      } catch (e) {
        continue;
      }
      try {
        api.runtime.sendMessage({
          type: "undirect:recipe",
          id: recipe.id,
          label: recipe.label,
          site: siteBase,
        });
      } catch (e) {
        // nothing to report to
      }
    }
  }

  api.runtime.onMessage?.addListener?.((msg) => {
    if (msg?.type === "undirect:status") {
      return Promise.resolve({ armed, bridgeLoaded, site, siteBase });
    }
    return undefined;
  });

  async function start() {
    const isTop = window.top === window;
    if (isTop) {
      try {
        api.runtime.sendMessage({ type: "undirect:hello", site: siteBase });
      } catch (e) {
        // nothing to report to
      }
    }

    let stored = {};
    try {
      stored = await api.storage.local.get(["settings", "everywhere", "perSite", "watched", "notesShown", "noteDefaultOn"]);
    } catch (e) {
      stored = {};
    }
    Object.assign(settings, stored.settings ?? {});
    notesShown = stored.notesShown ?? 0;
    // 1.0.6 turned the note on for everyone; an older stored `false` was the old default.
    if (!stored.noteDefaultOn) settings.banner = true;
    table = {
      policy: settings.policy ?? "block",
      everywhere: stored.everywhere ?? {},
      here: stored.perSite?.[siteBase] ?? {},
    };

    if (settings.enabled === false) {
      active = false;
    } else if (settings.mode === "everywhere") {
      active = true;
    } else if (isTop && stored.watched?.[siteBase] === true) {
      active = true;
    } else {
      // A subframe cannot read its own top-level site - a cross-origin frame
      // cannot see `top.location` - so it asks the background, which already
      // knows the tab's real address. A top frame asks too when storage says
      // no: a site switched on in a private window lives in storage.session,
      // which content scripts cannot read. Slower than the storage read, and
      // the frame stays inert until the answer lands.
      //
      // A trip held at load (see D) waits on this answer, and Safari may be
      // waking the background page or may never answer at all: on a loaded
      // Mac it was still silent twenty seconds in. So after ASK_MS the held
      // trip is let go as though the site were not guarded, and the answer
      // still switches the guard on whenever it lands.
      const late = setTimeout(settle, ASK_MS);
      try {
        const answer = await api.runtime.sendMessage({ type: "undirect:active" });
        active = !!answer?.active;
        if (answer?.here) table.here = answer.here;
      } catch (e) {
        active = false;
      }
      clearTimeout(late);
    }

    settle();
    if (!active) return;
    applyRecipes();
    injectBridge();
  }

  start();
})();
