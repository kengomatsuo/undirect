// A stand-in redirect network. Once the reader has scrolled a little, it sends
// the tab to the destination named in data-dest. Nobody taps anything.
// ?after=<px> on the page's address moves "a little" (240 px), so a film can show the scroll before the jump.
(() => {
  const dest = document.currentScript.dataset.dest;
  const after = Number(new URLSearchParams(location.search).get("after")) || 240;
  let fired = false;
  addEventListener("scroll", () => {
    if (fired || scrollY < after) return;
    fired = true;
    location.href = dest;
  }, { passive: true });
})();
