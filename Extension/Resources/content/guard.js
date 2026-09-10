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

  const settings = { enabled: true, sweep: true, veto: true, recipes: true, banner: false, policy: "block" };
  const site = location.hostname;
  const siteBase = Site.baseDomain(site);

  let table = { policy: "block", everywhere: {}, here: {} };
  let armed = false;          // this document has already tried something
  let lastPopstate = 0;
  let bridgeLoaded = false;

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
  let bannerHost = null;
  let bannerTimer = 0;
  let bannerText = null;

  function showBanner(host) {
    if (!settings.banner || window.top !== window || !document.body) return;
    if (host && host === bannerHost) return;
    bannerHost = host;

    let root = document.getElementById("undirect-note");
    if (!root) {
      root = document.createElement("div");
      root.id = "undirect-note";
      root.style.cssText =
        "all:initial;position:fixed;z-index:2147483647;left:16px;bottom:16px";
      const shadow = root.attachShadow({ mode: "closed" });
      shadow.innerHTML =
        "<style>" +
        ".n{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;" +
        "background:#16181c;color:#f7f8fa;font:13px/1.3 -apple-system,system-ui,sans-serif;" +
        "box-shadow:0 6px 24px rgba(0,0,0,.28);max-width:320px}" +
        ".h{font-family:ui-monospace,Menlo,monospace;opacity:.75;overflow:hidden;" +
        "text-overflow:ellipsis;white-space:nowrap}" +
        "button{all:unset;cursor:pointer;opacity:.6;padding:0 4px}" +
        "button:hover{opacity:1}" +
        "</style>" +
        '<div class="n"><span>Stopped</span><span class="h"></span>' +
        '<button aria-label="Dismiss">&times;</button></div>';
      shadow.querySelector("button").addEventListener("click", hideBanner);
      bannerText = shadow.querySelector(".h");
      document.body.appendChild(root);
    }
    if (bannerText) bannerText.textContent = host || "a pop-up";
    clearTimeout(bannerTimer);
    bannerTimer = setTimeout(hideBanner, 4000);
  }

  function hideBanner() {
    clearTimeout(bannerTimer);
    bannerHost = null;
    bannerText = null;
    document.getElementById("undirect-note")?.remove();
  }

  // Every cross-site destination the page reached for, whether or not it was
  // stopped. The popup lists these so the user can decide about each one.
  function seen({ kind, host, url, blocked, learn }) {
    if (blocked) armed = true;
    if (isOurs(host)) return;
    if (blocked) showBanner(Site.baseDomain(host));
    try {
      api.runtime.sendMessage({
        type: "undirect:seen",
        kind,
        base: Site.baseDomain(host),
        host,
        url: url ?? "",
        blocked: !!blocked,
        learn: !!learn,
        site: siteBase,
      });
    } catch (e) {
      // the background page is gone; the veto already happened
    }
  }

  // ---------------------------------------------------------------- detectors

  // A. The click catcher: a transparent screen over the page whose job is to
  // receive the click you meant for something underneath. This is deception
  // rather than a destination, so it goes whatever the rules say.
  const cleared = new WeakSet(); // nodes already judged innocent

  function sweep(x, y) {
    let removed = 0;
    for (let round = 0; round < 5; round++) {
      const hit = document.elementFromPoint(x, y);
      if (!hit || hit === document.body || hit === document.documentElement) break;
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
      // A transparent full-screen _blank form is damning on its own. A plain
      // one could be a real click-outside layer, so wait until the page has
      // already shown its hand.
      if (!blank && !(armed && floatsAbove(node))) {
        cleared.add(hit);
        break;
      }

      const where = blank?.action || blank?.href || "";
      node.style.pointerEvents = "none";
      node.remove();
      removed += 1;
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
      if (!settings.enabled || !settings.sweep || !e.isTrusted) return;
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
      if (!settings.enabled || !settings.sweep || !e.isTrusted) return;
      if (sweep(e.clientX, e.clientY)) forwardClick(e.clientX, e.clientY);
    },
    true
  );

  // B. A click the page dispatched itself, on a link to somewhere else.
  addEventListener(
    "click",
    (e) => {
      if (!settings.enabled || !settings.veto || e.isTrusted || forwarding) return;
      const a = e.target?.closest?.("a");
      if (!a || !blankTarget(a) || a.hasAttribute("download")) return;
      const url = parse(a.href);
      if (!url || isOurs(url.hostname)) return;

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

  addEventListener(
    "click",
    (e) => {
      if (!settings.enabled || !settings.veto || !e.isTrusted) return;
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
      if (!settings.enabled || !settings.veto) return;
      const form = e.target;
      if (!blankTarget(form)) return;
      if (coverage(form.getBoundingClientRect()) < COVERAGE) return;
      if (!paintsNothing(form)) return;
      e.preventDefault();
      e.stopImmediatePropagation();
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

  // D. Back button sent somewhere new. We cannot stop this one from here; it
  // arms the sweeper and names the host so the block rule catches the retry.
  addEventListener("popstate", () => (lastPopstate = performance.now()), true);
  addEventListener(
    "beforeunload",
    () => {
      if (performance.now() - lastPopstate < BACK_MS) armed = true;
    },
    true
  );

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
    if (window.top === window) {
      try {
        api.runtime.sendMessage({ type: "undirect:hello", site: siteBase });
      } catch (e) {
        // nothing to report to
      }
    }

    applyRecipes();

    let stored = {};
    try {
      stored = await api.storage.local.get(["settings", "everywhere", "perSite"]);
    } catch (e) {
      stored = {};
    }
    Object.assign(settings, stored.settings ?? {});
    table = {
      policy: settings.policy ?? "block",
      everywhere: stored.everywhere ?? {},
      here: stored.perSite?.[siteBase] ?? {},
    };

    injectBridge();
  }

  start();
})();
