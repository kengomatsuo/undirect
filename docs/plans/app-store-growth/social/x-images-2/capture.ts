// Captures real web pages for the X pictures: nothing on them is drawn, they are the pages as a browser shows them.
// Run: bun capture.ts <name> <url> [--desktop] [--full] [--wait ms] [--scroll y] [--dark] [--click "text"]...
//   phone (default): 390 x 844 at 3x with Safari's iPhone user agent; --desktop: 1440 x 900 at 2x
//   --full saves the whole page; --scroll scrolls first; --click presses a button by its visible text, in order.
// Writes src/<name>.png.
import { chromium } from "../calendar-final/node_modules/playwright/index.mjs";
import { homedir } from "node:os";
import { join } from "node:path";

const HERE = import.meta.dir;
const shell = join(homedir(), "Library/Caches/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-mac-arm64/chrome-headless-shell");
const a = process.argv.slice(2);
const [name, url] = a;
const flag = (f: string) => a.includes(f);
const val = (f: string) => { const i = a.indexOf(f); return i >= 0 ? a[i + 1] : undefined; };
const clicks = a.flatMap((x, i) => (x === "--click" ? [a[i + 1]] : []));
const desktop = flag("--desktop");
const browser = await chromium.launch({ executablePath: shell });
const ctx = await browser.newContext(desktop
  ? { viewport: { width: Number(val("--width") ?? 1440), height: 900 }, deviceScaleFactor: 2, locale: "en-US", colorScheme: flag("--dark") ? "dark" : "light" }
  : { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: "en-US", colorScheme: flag("--dark") ? "dark" : "light",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1" });
const p = await ctx.newPage();
await p.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
await p.waitForTimeout(Number(val("--wait") ?? 4000));
for (const c of clicks) {
  await p.getByText(c, { exact: false }).first().click({ timeout: 8000 }).catch((e) => console.log("click failed", c, String(e).slice(0, 80)));
  await p.waitForTimeout(2500);
}
if (val("--scroll")) { await p.evaluate((y) => window.scrollTo(0, Number(y)), val("--scroll")); await p.waitForTimeout(1500); }
await p.screenshot({ path: join(HERE, "src", name + ".png"), fullPage: flag("--full") });
console.log("ok", name, (await p.title()).slice(0, 90));
await browser.close();
