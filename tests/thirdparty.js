// Loaded from a different origin than the page. The timer matters: it clears
// the page's own frames out of the stack, which is how real pop code runs.
window.__thirdPartyOpen = (url) =>
  new Promise((resolve) => setTimeout(() => resolve(window.open(url)), 0));
// A window asked for at a size, from code that is not the page's own - the
// shape a real "Sign in with Google" popup takes, called from Google's own
// script rather than the site's.
window.__thirdPartyOpenSized = (url) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(window.open(url, "_blank", "width=500,height=600")), 0)
  );
window.__thirdPartyClickAnchor = (a) => a.click();
// The window taken from a fresh iframe, as lunarx.to's tag.min.js does
// (2026-11-24): its open() is not the top window's.
window.__thirdPartyIframeOpen = (url) =>
  new Promise((resolve) =>
    setTimeout(() => {
      const frame = document.createElement("iframe");
      frame.style.display = "none";
      document.body.appendChild(frame);
      resolve(frame.contentWindow.open(url, "_blank"));
    }, 0)
  );
