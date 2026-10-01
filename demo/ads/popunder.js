// A stand-in pop network. The first click anywhere opens a window on the
// destination named in data-dest. Served from another site than the page.
(() => {
  const dest = document.currentScript.dataset.dest;
  let fired = false;
  document.addEventListener("click", () => {
    if (fired) return;
    fired = true;
    window.open(dest, "_blank");
    window.focus();
  }, true);
})();
