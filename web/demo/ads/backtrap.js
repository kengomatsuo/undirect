// A stand-in Back-button trap. On the first tap it stacks copies of this page
// in the history, so Back seems to do nothing, and when Back is pressed anyway
// it sends the tab to the destination named in data-dest.
(() => {
  const dest = document.currentScript.dataset.dest;
  let armed = false;
  addEventListener("click", () => {
    if (armed) return;
    armed = true;
    for (let i = 0; i < 4; i++) history.pushState({ trap: i }, "", location.href);
  }, true);
  addEventListener("popstate", () => {
    location.href = dest;
  });
})();
