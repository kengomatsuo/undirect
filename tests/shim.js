// Stands in for the extension APIs, and for a viewport, so guard.js can be
// exercised in a pane that reports zero size.
window.__caught = [];
window.__notes = []; // the note's own hand-over to the background, kept apart from what the page reported
window.chrome = {
  runtime: {
    getURL: (p) => new URL(p.split("/").pop(), location.href).href,
    // ?hang=1: the background never answers whether the site is guarded, as
    // Safari's can while it wakes the page.
    sendMessage: (msg) => {
      if (msg?.type === "undirect:noteUp" || msg?.type === "undirect:noteGone") window.__notes.push(msg);
      else window.__caught.push(msg);
      if (msg?.type === "undirect:active" && new URLSearchParams(location.search).get("hang")) return new Promise(() => {});
      return Promise.resolve();
    },
    onMessage: { addListener() {} },
  },
  storage: {
    local: {
      // mode: "everywhere" - the shipping default guards nothing until a site
      // is switched on, and this harness has no toolbar button to do that with.
      get: () =>
        Promise.resolve({
          settings: {
            policy: new URLSearchParams(location.search).get("policy") ?? "block",
            mode: new URLSearchParams(location.search).get("mode") ?? "everywhere",
          },
          everywhere: JSON.parse(new URLSearchParams(location.search).get("everywhere") ?? "{}"),
          perSite: JSON.parse(new URLSearchParams(location.search).get("perSite") ?? "{}"),
        }),
    },
    onChanged: { addListener() {} },
  },
};

// Safari hands a real `browser.runtime` to ordinary page scripts, so a page can
// message an extension. The guard reaches for `browser` before `chrome`, so in
// here that object wins and every report goes to Safari instead of the stub,
// silently. The shipping content script runs in an isolated world where
// `browser` is the extension API and this does not arise.
Object.defineProperty(window, "browser", { value: window.chrome, configurable: true });

Object.defineProperty(window, "innerWidth", { value: 1280, configurable: true });
Object.defineProperty(window, "innerHeight", { value: 720, configurable: true });

// Topmost element whose box contains the point: stacking order first, then
// document order, which is what a real hit test settles on here.
document.elementFromPoint = (x, y) => {
  let best = null;
  let bestZ = -Infinity;
  let order = 0;
  for (const el of document.querySelectorAll("*")) {
    order += 1;
    // A real hit test passes through pointer-events: none, as Undirect's own
    // effect layers are drawn.
    if (getComputedStyle(el).pointerEvents === "none") continue;
    const r = el.getBoundingClientRect();
    const width = r.width || (getComputedStyle(el).position === "fixed" ? 1280 : 0);
    const height = r.height || (getComputedStyle(el).position === "fixed" ? 720 : 0);
    if (x < r.left || x > r.left + width || y < r.top || y > r.top + height) continue;
    const z = parseInt(getComputedStyle(el).zIndex, 10);
    const rank = (Number.isFinite(z) ? z : 0) * 1e6 + order;
    if (rank >= bestZ) { bestZ = rank; best = el; }
  }
  return best;
};
