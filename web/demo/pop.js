// A stand-in pop network, for trying Undirect.
// Served from a CDN, so the page sees third-party code.
(() => {
  const catcher = document.createElement("form");
  catcher.action = "https://clicktrack.example/go";
  catcher.target = "_blank";
  catcher.style.cssText = "position:fixed;inset:0;z-index:3000;margin:0;opacity:0";
  const submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "";
  submit.style.cssText = "width:100%;height:100%;opacity:0;cursor:default";
  catcher.append(submit);

  // A plain layer with no link behind it.
  const veil = document.createElement("div");
  veil.style.cssText = "position:fixed;inset:0;z-index:2000;background:transparent";

  const arm = () => document.body.append(veil, catcher);
  if (document.body) arm();
  else addEventListener("DOMContentLoaded", arm);

  document.addEventListener(
    "click",
    () => {
      window.open("https://adserver.example/offer");
      const link = document.createElement("a");
      link.href = "https://tabunder.example/";
      link.target = "_blank";
      document.body.append(link);
      link.click();
      link.remove();
    },
    true
  );
})();
