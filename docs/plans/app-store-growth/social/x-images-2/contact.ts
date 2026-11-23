// The contact sheet the owner reads: every post in date order, its words, its picture at the size X's web timeline
// shows it (518 px wide, up to 510 px tall, measured 2026-11-22) and at mobile web size (310 px), and what the picture
// is made from. Writes contact-sheet.jpg.
// Run: bun contact.ts
import { chromium } from "../calendar-final/node_modules/playwright/index.mjs";
import { readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const HERE = import.meta.dir;
const shell = join(homedir(), "Library/Caches/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-mac-arm64/chrome-headless-shell");
const { posts } = JSON.parse(readFileSync(join(HERE, "posts.json"), "utf8")) as { posts: { n: number; when: string; was?: string; pic: string; text: string; from: string }[] };
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>");
const day = (w: string) => new Date(w.replace(" ", "T") + ":00+07:00").toLocaleString("en-GB", { timeZone: "Asia/Jakarta", weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
const rows = [...posts].sort((a, b) => a.when.localeCompare(b.when)).map((p) => {
  const has = existsSync(join(HERE, p.pic));
  const img = (w: number) => has ? `<img src="${p.pic}" style="width:${w}px;max-height:${w === 518 ? 510 : 400}px;object-fit:contain;object-position:left top">` : `<div class="none">picture to come</div>`;
  return `<section><div class="meta"><b>#${p.n}</b> ${day(p.when)} WIB${p.was ? ` <i>(was ${day(p.was)})</i>` : ""}</div>
    <div class="post"><div class="av"></div><div><p class="name"><b>Monholt</b> <span>@monholtco</span></p><p class="t">${esc(p.text)}</p>${img(518)}</div></div>
    <div class="side"><p class="lab">mobile web, 310 px</p>${img(310)}<p class="from">${esc(p.from || "")}</p></div></section>`;
}).join("");
const html = `<!doctype html><meta charset="utf-8"><style>
* { box-sizing: border-box; margin: 0; padding: 0 }
body { width: 1280px; background: #000; color: #e7e9ea; font: 15px/20px -apple-system, system-ui, sans-serif; padding: 28px }
h1 { font: 700 26px/1.2 -apple-system, system-ui; margin-bottom: 6px } .sub { color: #8b8f94; margin-bottom: 22px }
section { display: grid; grid-template-columns: 640px 1fr; gap: 28px; padding: 22px 0; border-top: 1px solid #2f3336 }
.meta { grid-column: 1 / -1; color: #8b8f94; font-size: 14px } .meta b { color: #e7e9ea } .meta i { color: #f4a261; font-style: normal }
.post { display: flex; gap: 10px; border: 1px solid #2f3336; padding: 12px 16px 16px; border-radius: 4px }
.av { flex: none; width: 40px; height: 40px; border-radius: 50%; background: #2f3336 }
.name span { color: #71767b } .t { margin: 2px 0 12px; max-width: 518px }
img { display: block; border-radius: 14px; border: 1px solid #2f3336 }
.lab { color: #71767b; font-size: 12px; margin-bottom: 6px } .from { margin-top: 12px; color: #b9bdc1; font-size: 13px; line-height: 18px }
.none { width: 518px; height: 120px; border: 1px dashed #555; border-radius: 14px; display: grid; place-items: center; color: #777 }
</style><body><h1>@monholtco on X, Nov 23 to Dec 6: each approved post with its picture</h1>
<p class="sub">Words unchanged. Every picture is a real capture, a real screen or a real photo; the grey line under each says which.</p>${rows}</body>`;
writeFileSync(join(HERE, ".contact.html"), html);
const browser = await chromium.launch({ executablePath: shell });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
await page.goto("file://" + join(HERE, ".contact.html"));
await page.waitForTimeout(800);
await page.screenshot({ path: join(HERE, "contact-sheet.jpg"), fullPage: true, type: "jpeg", quality: 85 });
await browser.close();
rmSync(join(HERE, ".contact.html"));
console.log("contact-sheet.jpg", posts.length, "posts");
