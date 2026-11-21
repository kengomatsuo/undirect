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

  // A note drawn in the page, off unless asked for. Safari gives extensions no
  // notifications API, so this is the only way to say something happened while
  // the reader is looking at the page.
  // The note: a small card at the foot of the page each time something is
  // stopped, so a person sees Undirect working without being interrupted.
  // The address the page reached for sits in a chip that cracks and falls
  // apart, then stays behind struck through, so the note reads at a glance.
  // It never takes focus, covers only itself, counts blocks that land while
  // it is up ("3 stopped", each one breaking in turn), and fades on its own.
  // On the first NOTE_OFFER notes it carries a Settings button that opens
  // Undirect's popup, where the note can be switched off.
  const NOTE_MS = 3600;
  const NOTE_OFFER = 3;
  const SHARDS = [ // vertical slices of the chip, jagged where they meet
    "0 0,26% 0,20% 52%,28% 100%,0 100%",
    "26% 0,47% 0,41% 46%,50% 100%,28% 100%,20% 52%",
    "47% 0,70% 0,64% 58%,73% 100%,50% 100%,41% 46%",
    "70% 0,100% 0,100% 100%,73% 100%,64% 58%",
  ];
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
    if (note) {
      note.count += 1;
      note.title.textContent = say("note_count", [String(note.count)], note.count + " stopped");
      breakChip(host);
      return refresh();
    }
    const offer = notesShown < NOTE_OFFER;
    notesShown += 1;
    try { api.storage.local.set({ notesShown }); } catch (e) {}

    const root = document.createElement("div");
    root.style.cssText =
      "all:initial;position:fixed;z-index:2147483647;left:50%;transform:translateX(-50%);" +
      "bottom:calc(16px + env(safe-area-inset-bottom, 0px));pointer-events:none";
    const shadow = root.attachShadow({ mode: "closed" });
    shadow.innerHTML =
      "<style>" +
      ".n{pointer-events:auto;display:flex;align-items:center;gap:10px;padding:9px 12px 9px 10px;" +
      "border-radius:14px;background:rgba(22,24,28,.94);color:#f7f8fa;" +
      "font:13px/1.3 -apple-system,system-ui,sans-serif;box-shadow:0 8px 28px rgba(0,0,0,.3);" +
      "max-width:min(400px,calc(100vw - 32px));animation:in .42s cubic-bezier(.34,1.56,.64,1) both}" +
      ".n.out{animation:out .22s ease-in both}" +
      ".i{flex:none;width:22px;height:22px;border-radius:50%;background:#d8352a;display:grid;place-items:center}" +
      ".i.on{animation:pop .5s cubic-bezier(.34,1.8,.64,1) both}" +
      ".t{font-weight:600;white-space:nowrap}" +
      ".c{position:relative;min-width:0;display:flex}" +
      ".h,.s{font-family:ui-monospace,Menlo,monospace;font-size:12px;padding:2px 7px;border-radius:6px;" +
      "background:#d8352a;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:180px}" +
      ".h.gone{background:transparent;color:rgba(247,248,250,.6);text-decoration:line-through;" +
      "transition:color .3s,background .3s}" +
      ".s{position:absolute;left:0;top:0;pointer-events:none;" +
      "animation:fall .7s cubic-bezier(.45,0,.75,.4) both}" +
      "button{all:unset;cursor:pointer;white-space:nowrap;color:#9db7ff;padding:2px 0 2px 6px;font-size:12px}" +
      "button:focus-visible{outline:2px solid #9db7ff;border-radius:4px}" +
      "@keyframes in{from{opacity:0;transform:translateY(14px) scale(.96)}to{opacity:1;transform:none}}" +
      "@keyframes out{to{opacity:0;transform:translateY(8px)}}" +
      "@keyframes pop{from{transform:scale(.3)}to{transform:scale(1)}}" +
      "@keyframes fall{0%{transform:none;opacity:1}" +
      "18%{transform:translate(calc(var(--dx) * .15),-3px) rotate(calc(var(--r) * .2))}" +
      "100%{transform:translate(var(--dx),34px) rotate(var(--r));opacity:0}}" +
      "@media (prefers-reduced-motion:reduce){.n{animation:fade .2s both}.n.out{animation:fade .2s reverse both}" +
      ".i,.i.on{animation:none;transform:none}.s{display:none}" +
      "@keyframes fade{from{opacity:0}to{opacity:1}}}" +
      "</style>" +
      '<div class="n" role="status" aria-live="polite">' +
      '<span class="i"><svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">' +
      '<path d="M2.5 6.2 5 8.6 9.6 3.6" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
      '<span class="t"></span><span class="c"><span class="h"></span></span></div>';
    const card = shadow.querySelector(".n");
    note = { root, card, icon: shadow.querySelector(".i"), title: shadow.querySelector(".t"),
             chip: shadow.querySelector(".c"), host: shadow.querySelector(".h"), count: 1, timer: 0, breaking: 0 };
    note.title.textContent = noteTitle(kind);
    if (offer) {
      const button = document.createElement("button");
      button.textContent = say("note_settings", undefined, "Settings");
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        // The popup holds the note's own switch. Safari opens it only for a
        // press it can still see, which a message to the background may lose;
        // then the note says where the button is instead.
        api.runtime.sendMessage({ type: "undirect:openPopup" }).then((reply) => {
          if (reply?.opened) return hideNote();
          note && (note.title.textContent = say("note_where", undefined, "Press Undirect in the toolbar for settings."));
          note && refresh();
        }, () => {});
        button.remove();
      });
      card.appendChild(button);
    }
    document.documentElement.appendChild(root);
    breakChip(host);
    refresh();
  }

  // Put the address in the chip whole, then crack it into falling shards and
  // leave it struck through. Reduced motion skips the shards (CSS).
  function breakChip(host) {
    const n = note;
    n.host.textContent = host;
    n.host.classList.remove("gone");
    n.icon.classList.remove("on");
    clearTimeout(n.breaking);
    n.breaking = setTimeout(() => {
      if (note !== n) return;
      SHARDS.forEach((poly, i) => {
        const shard = document.createElement("span");
        shard.className = "s";
        shard.textContent = host;
        shard.style.width = n.host.offsetWidth + "px";
        shard.style.clipPath = "polygon(" + poly + ")";
        shard.style.setProperty("--dx", (i - 1.5) * 9 + "px");
        shard.style.setProperty("--r", (i % 2 ? 1 : -1) * (10 + i * 7) + "deg");
        shard.style.animationDelay = i * 35 + "ms";
        n.chip.appendChild(shard);
        setTimeout(() => shard.remove(), 900);
      });
      n.host.classList.add("gone");
      void n.icon.offsetWidth;
      n.icon.classList.add("on");
    }, 450);
  }

  function refresh() {
    clearTimeout(note.timer);
    note.timer = setTimeout(hideNote, NOTE_MS);
  }

  function hideNote() {
    if (!note) return;
    const gone = note;
    note = null;
    clearTimeout(gone.timer);
    gone.card.classList.add("out");
    setTimeout(() => gone.root.remove(), 240);
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
