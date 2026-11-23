// Screenshots one part of a real page: the block that holds the given text, as the browser draws it.
// Run: bun capture-part.ts <name> <url> "<text inside the part>" [--desktop] [--up n] [--pad px] [--dark]
//   --up n climbs n parent elements from the text before taking the box; --pad adds page around it;
//   --within <css> looks for the text only inside that element (GitHub keeps a hidden raw copy of a file);
//   --to "<text>" [--to-up n] stretches the box to a second part; --ratio 16:9 grows the crop to that shape.
// Writes src/<name>.png.
import { chromium } from "../calendar-final/node_modules/playwright/index.mjs";
import { homedir } from "node:os";
import { join } from "node:path";

const HERE = import.meta.dir;
const shell = join(homedir(), "Library/Caches/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-mac-arm64/chrome-headless-shell");
const a = process.argv.slice(2);
const [name, url, text] = a;
const val = (f: string) => { const i = a.indexOf(f); return i >= 0 ? a[i + 1] : undefined; };
const desktop = a.includes("--desktop");
const browser = await chromium.launch({ executablePath: shell });
const ctx = await browser.newContext(desktop
  ? { viewport: { width: Number(val("--width") ?? 1440), height: 900 }, deviceScaleFactor: 2, locale: "en-US", colorScheme: a.includes("--dark") ? "dark" : "light" }
  : { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: "en-US", colorScheme: a.includes("--dark") ? "dark" : "light",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1" });
const p = await ctx.newPage();
await p.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
await p.waitForTimeout(Number(val("--wait") ?? 5000));
const box = await p.evaluate(([text, up, within, to, toUp]) => {
  const root = (within && document.querySelector(within)) || document.body;
  const find = (t: string, climb: number) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let n: Node | null; let el: HTMLElement | null = null;
    while ((n = walker.nextNode())) if (n.textContent && n.textContent.includes(t)) { el = n.parentElement; break; }
    if (!el) return null;
    for (let i = 0; i < climb; i++) if (el.parentElement) el = el.parentElement;
    return el;
  };
  const el = find(text, Number(up));
  if (!el) return null;
  el.scrollIntoView({ block: "center" });
  const r = el.getBoundingClientRect();
  let b = { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height };
  const end = to ? find(to, Number(toUp)) : null;   // --to "<text>": stretch the box down to that part too
  if (end) {
    const q = end.getBoundingClientRect(); const x2 = Math.max(b.x + b.w, q.right + window.scrollX), y2 = Math.max(b.y + b.h, q.bottom + window.scrollY);
    const x1 = Math.min(b.x, q.left + window.scrollX), y1 = Math.min(b.y, q.top + window.scrollY);
    b = { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
  }
  return b;
}, [text, val("--up") ?? "0", val("--within") ?? "", val("--to") ?? "", val("--to-up") ?? "0"] as const);
if (!box) { console.log("not found:", text); process.exit(1); }
const pad = Number(val("--pad") ?? 16);
let clip = { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: box.w + pad * 2, height: box.h + pad * 2 };
// --ratio w:h grows the shorter side around the part, so the crop needs no padding added later
const ratio = val("--ratio");
if (ratio) {
  const [rw, rh] = ratio.split(":").map(Number);
  if (clip.width / clip.height > rw / rh) { const h = (clip.width * rh) / rw; clip = { ...clip, y: Math.max(0, clip.y - (h - clip.height) / 2), height: h }; }
  else { const w = (clip.height * rw) / rh; clip = { ...clip, x: Math.max(0, clip.x - (w - clip.width) / 2), width: w }; }
}
await p.screenshot({ path: join(HERE, "src", name + ".png"), fullPage: true, clip });
console.log("ok", name, JSON.stringify(box));
await browser.close();
