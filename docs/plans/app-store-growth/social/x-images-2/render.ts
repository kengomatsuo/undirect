// Lays out the X pictures that put real captures side by side or one above another (pictures/<id>.html), and
// saves each at 2x. Nothing in a layout is drawn: every image in it is a real capture from src/.
// A layout sets its own size with <meta name="size" content="1200x675">; 16:9 is the default.
// Run: bun render.ts            (every layout)
//      bun render.ts x01 x09    (only these)
import { chromium } from "../calendar-final/node_modules/playwright/index.mjs";
import { readdirSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const HERE = import.meta.dir;
const shell = join(homedir(), "Library/Caches/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-mac-arm64/chrome-headless-shell");
const only = process.argv.slice(2);
const ids = readdirSync(join(HERE, "pictures")).filter((f) => f.endsWith(".html")).map((f) => f.replace(/\.html$/, ""))
  .filter((id) => !only.length || only.includes(id)).sort();
const browser = await chromium.launch({ executablePath: shell });
for (const id of ids) {
  const file = join(HERE, "pictures", id + ".html");
  const m = readFileSync(file, "utf8").match(/<meta name="size" content="(\d+)x(\d+)">/);
  const [width, height] = m ? [Number(m[1]), Number(m[2])] : [1200, 675];
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 });
  await page.goto("file://" + file);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(HERE, id + ".png") });
  await page.close();
  console.log("rendered", id, `${width * 2}x${height * 2}`);
}
await browser.close();
