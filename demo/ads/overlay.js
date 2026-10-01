// A stand-in click thief. A clear form covers the page, so the first press
// lands on its hidden submit button and opens the destination in a new tab.
(() => {
  const dest = document.currentScript.dataset.dest;
  const form = document.createElement("form");
  form.action = dest;
  form.target = "_blank";
  form.style.cssText = "position:fixed;inset:0;z-index:2147483000;margin:0;opacity:0";
  const submit = document.createElement("input");
  submit.type = "submit";
  submit.style.cssText = "width:100%;height:100%;opacity:0;cursor:default";
  form.append(submit);
  const arm = () => {
    document.body.append(form);
    form.addEventListener("submit", () => setTimeout(() => form.remove(), 50));
  };
  if (document.body) arm();
  else addEventListener("DOMContentLoaded", arm);
})();
