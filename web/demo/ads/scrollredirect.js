// A stand-in redirect network. Once the reader has scrolled a little, it sends
// the tab to the destination named in data-dest. Nobody taps anything.
(() => {
  const dest = document.currentScript.dataset.dest;
  let fired = false;
  addEventListener("scroll", () => {
    if (fired || scrollY < 240) return;
    fired = true;
    location.href = dest;
  }, { passive: true });
})();
