// Markup the three strips share. Everything here is drawn except what an <iframe> or <img> loads:
// popup/popup.html is the shipping popup's own code, screen/stream.html the demo page's own markup,
// img/iphone-popup.png a simulator capture.
const SB_ICONS = `<svg viewBox="0 0 78 15" fill="#fff"><rect x="0" y="9" width="3.4" height="5" rx="1"/><rect x="5" y="6.5" width="3.4" height="7.5" rx="1"/><rect x="10" y="3.5" width="3.4" height="10.5" rx="1"/><rect x="15" y="1" width="3.4" height="13" rx="1"/>
<path d="M32.5 4.2c2.6 0 5 1 6.800 2.700l1.300-1.400a11.700 11.700 0 0 0-16.200 0l1.300 1.400a9.800 9.800 0 0 1 6.800-2.700zm0 3.900c1.600 0 3 .6 4.100 1.600l1.300-1.400a7.900 7.900 0 0 0-10.800 0l1.300 1.400a6 6 0 0 1 4.100-1.600zm0 3.800c.7 0 1.300.3 1.800.7l-1.800 2-1.800-2c.5-.4 1.100-.7 1.800-.7z"/>
<rect x="48.500" y="1.500" width="25" height="12" rx="3.800" fill="none" stroke="#fff" stroke-opacity=".4"/><rect x="50" y="3" width="22" height="9" rx="2.500"/><path d="M75 5.500v4c.8-.3 1.500-1.100 1.500-2s-.7-1.700-1.500-2z" fill-opacity=".45"/></svg>`;
const statusBar = () => `<div class="sb"><b>9:41</b>${SB_ICONS}</div>`;
const safariBar = (url) => `<div class="safari"><span class="back"><svg viewBox="0 0 12 20" fill="none" stroke="#fff" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2 2 10l8 8"/></svg></span>
<span class="url">${url}</span><span class="more"><svg viewBox="0 0 22 6" fill="#fff"><circle cx="3" cy="3" r="2.400"/><circle cx="11" cy="3" r="2.400"/><circle cx="19" cy="3" r="2.400"/></svg></span></div><div class="home"></div>`;

// The demo's streaming page with its film playing, inside Safari.
const streamScreen = () => `<div class="pt" style="background:#0d0f14">${statusBar()}
<iframe src="screen/stream.html" style="position:absolute;left:0;top:58px;width:440px;height:898px;border:0" scrolling="no"></iframe>${safariBar("undirect.matsuokengo.com")}</div>`;
// The simulator capture of the popup. Its clock read 09.41 (the simulator's region), so the drawn bar covers it.
const popupScreen = () => `<div class="pt" style="background:#000"><img src="img/iphone-popup.png" style="position:absolute;left:0;top:0;width:440px">
<div style="position:absolute;left:0;top:0;width:440px;height:42px;background:#060607"></div>${statusBar()}</div>`;
const phone = (cls, style, screen) => `<div class="phone ${cls || ""}" style="${style}"><div class="screen">${screen}<div class="island" style="transform-origin:0 0;transform:scale(var(--k));left:calc(157px*var(--k));top:calc(14px*var(--k))"></div></div></div>`;

// The shipping popup's own page, cut to a window (x, y, w, h in its 440pt layout) and scaled k times.
const popupCut = (x, y, w, h, k, style = "") => `<div class="cut" style="position:absolute;width:${w * k}px;height:${h * k}px;overflow:hidden;${style}">
<iframe src="popup/popup.html" scrolling="no" style="position:absolute;left:0;top:0;width:440px;height:1000px;border:0;transform-origin:0 0;transform:scale(${k}) translate(${-x}px,${-y}px)"></iframe></div>`;

const popWin = (text, color, style) => `<div class="pop" style="--c:${color};${style}"><em></em><u></u><b>${text}</b></div>`;

if (location.hash.includes("guides")) document.documentElement.addEventListener("DOMContentLoaded", () => {});
window.addEventListener("DOMContentLoaded", () => {
  if (location.hash.includes("guides")) { document.body.classList.add("guides"); document.body.insertAdjacentHTML("beforeend", `<div class="guides"><i style="left:1318px"></i><i style="left:2638px"></i></div>`); }
});
