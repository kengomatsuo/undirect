// Loaded from a different origin than the page. The timer matters: it clears
// the page's own frames out of the stack, which is how real pop code runs.
window.__thirdPartyOpen = (url) =>
  new Promise((resolve) => setTimeout(() => resolve(window.open(url)), 0));
window.__thirdPartyClickAnchor = (a) => a.click();
