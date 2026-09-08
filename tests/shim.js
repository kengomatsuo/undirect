// Stands in for the extension APIs, and for a viewport, so guard.js can be
// exercised in a pane that reports zero size.
window.__caught = [];
window.chrome = {
  runtime: {
    getURL: (p) => new URL(p.split("/").pop(), location.href).href,
    sendMessage: (msg) => { window.__caught.push(msg); return Promise.resolve(); },
    onMessage: { addListener() {} },
  },
  storage: {
    local: {
      get: () =>
        Promise.resolve({
          settings: { policy: new URLSearchParams(location.search).get("policy") ?? "block" },
          everywhere: JSON.parse(new URLSearchParams(location.search).get("everywhere") ?? "{}"),
          perSite: JSON.parse(new URLSearchParams(location.search).get("perSite") ?? "{}"),
        }),
    },
    onChanged: { addListener() {} },
  },
};

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
