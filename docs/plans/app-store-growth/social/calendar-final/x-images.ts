// Renders the picture of every X post that has one (x-posts.ts) and a timeline check beside it.
//
// The look is direction A, the black stage, from docs/research/pro-film-refs/README.md: one real capture
// lifted out on black, lit from above, with one short line and the app's icon. Nothing on a picture is
// drawn: every card is a crop of a real screen (an App Store screenshot's device area, a simulator take,
// the App Store page, or the live demo site), listed in SOURCES with where it came from.
//
// Out, under ../x-images/:
//   src/<name>.png        the crops, kept so a picture can be re-rendered without the other repos
//   <row id>.png          the 1200 x 675 picture
//   checks/<row id>.jpg   the picture inside X's web timeline (518 px wide) and its mobile web timeline
//                         (310 px wide), at the sizes measured on x.com on 2026-11-22, with the post's words.
//                         The avatar, name and text styling around it are drawn; the sizes are X's.
//   checks/ocr.json       macOS Vision's reading of every picture, and the bank words it must not find
//
// Run: bun x-images.ts            (every picture)
//      bun x-images.ts P08 P20    (only the rows whose id starts with one of these)
//      bun x-images.ts --src      (cut the crops again from their originals first)

import { $ } from "bun";
import { existsSync, mkdirSync, writeFileSync, rmSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { chromium, type Browser } from "playwright";
import { X_POSTS, type Picture } from "./x-posts";

const HOME = homedir();
const HERE = import.meta.dir;
const REPO = join(HERE, "../../../../..");
const OUT = join(HERE, "../x-images");
const SRC = join(OUT, "src");
const CHECKS = join(OUT, "checks");
const TMP = join(OUT, ".tmp");

const CT = join(HOME, "Repositories/Cutling/fastlane/screenshots_tall/en-US/iphone");
const CM = join(HOME, "Repositories/Cutling/fastlane/screenshots_mac/en-US");
const CP = join(HOME, "Repositories/cutling-promo/public");
const UA = join(REPO, "Support/AppStore");
const UT = join(HOME, "Repositories/undirect-promo/capture/takes");
const AS = join(HOME, "Downloads/social-calendar/_assets");
const FONT = join(HOME, "Repositories/undirect-promo/public/fonts/InterTight-var.woff2");
const ICON = { Undirect: join(REPO, "web/undirect-app-icon.png"), Cutling: join(HOME, "Repositories/Cutling/web/cutling-app-icon.png") };
const GLOW = { Undirect: "232,52,44", Cutling: "23,187,138" };

type Source = { from: string; at?: number; crop: [number, number, number, number]; r?: number; what: string };
// `from` is a file, a film with `at` seconds, or "live:<path>:<light|dark>", a 440 x 956 phone-size capture
// of the live demo site at 3x. Crops are x, y, width, height in the original's pixels; `r` is the corner
// radius of the original's own card, in its pixels, where a crop runs along that card's edge.
export const SOURCES: Record<string, Source> = {
  // Cutling: device areas of the App Store screenshots shipped on 2026-11-18 (no bank details in any).
  "c-sign": { from: join(CT, "01.png"), crop: [164, 1690, 992, 330], r: 100, what: "an email ending in the saved sign-off" },
  "c-tile-notes": { from: join(CT, "01.png"), crop: [76, 2280, 576, 176], what: "one cutling on the keyboard: Meeting Notes" },
  "c-suggest": { from: join(CT, "02.png"), crop: [60, 1764, 1200, 500], r: 96, what: "the keyboard in an email field: Work Email and Signature offered first" },
  "c-addr-field": { from: join(CT, "03.png"), crop: [150, 1750, 1020, 410], what: "a home address tapped into a chat, above the keyboard" },
  "c-tiles": { from: join(CT, "04.png"), crop: [120, 1030, 1080, 356], what: "two cutlings: Home Address and Email Signature" },
  "c-tiles-links": { from: join(CT, "04.png"), crop: [120, 2194, 1080, 370], what: "two cutlings: Booking Ref and Meeting Link" },
  "c-tile-bio": { from: join(CT, "04.png"), crop: [120, 1800, 1080, 380], what: "two cutlings: Social Bio and Phone Number" },
  "c-grid-4": { from: join(CT, "04.png"), crop: [120, 1030, 1080, 756], what: "four cutlings in the app" },
  "c-addclip": { from: join(CT, "05.png"), crop: [60, 892, 1200, 416], r: 96, what: "Add from Clipboard on the keyboard" },
  "c-mac-history": { from: join(CT, "06.png"), crop: [90, 990, 860, 580], what: "the Mac picker's History tab" },
  // Cutling: simulator takes and windows.
  "c-form": { from: join(CP, "rec/k2-tap.mp4"), at: 5.0, crop: [50, 400, 1220, 440], what: "a delivery form with the address tapped in" },
  "c-newmenu": { from: join(CP, "rec3/en/iphone-save.mp4"), at: 9.5, crop: [480, 170, 800, 340], what: "the app's add menu: Text Cutling, Image Cutling" },
  "c-mac-hotkey": { from: join(CP, "captures/mac-window.png"), crop: [420, 200, 1040, 400], what: "the Mac app's shortcut page: Shift-Command-V" },
  "c-icloud": { from: join(CM, "05_Sync.png"), crop: [730, 1486, 1100, 270], what: "the Mac app's iCloud settings: sync on, up to date" },
  // Cutling: the App Store page as it read on 2026-11-21 (build.ts captured it).
  "c-privacy": { from: join(AS, "store-privacy.png"), crop: [140, 360, 790, 330], what: "the App Store privacy label: Data Not Collected" },
  "c-store": { from: join(AS, "store-header.png"), crop: [0, 0, 1075, 366], what: "the App Store header: name and $4.99" },
  "c-devices": { from: join(AS, "store-devices.png"), crop: [30, 40, 1015, 100], what: "the App Store device line: iPhone, iPad, Mac" },
  // Undirect: device areas of the App Store screenshots shipped on 2026-11-21.
  "u-popup-rows": { from: join(UA, "iphone/01.png"), crop: [136, 2050, 1048, 262], what: "the popup on a guarded site: 8 stopped, the first one blocked" },
  "u-menu": { from: join(UA, "iphone/02.png"), crop: [120, 1950, 690, 370], what: "Safari's page menu: Turn Off Content Blockers, Undirect" },
  "u-list": { from: join(UA, "iphone/03.png"), crop: [110, 890, 1100, 484], what: "the addresses one page reached for, each blocked" },
  "u-everywhere": { from: join(UA, "iphone/03.png"), crop: [170, 1890, 980, 360], what: "the Everywhere rules: addresses blocked on every site" },
  "u-urlbar": { from: join(UA, "iphone/04.png"), crop: [120, 905, 1080, 370], what: "the demo film site open in Safari" },
  "u-settings-rows": { from: join(UA, "iphone/05.png"), crop: [110, 1560, 1100, 284], what: "Settings: Guard on, on the sites you turn on" },
  "u-mac-popup": { from: join(UA, "mac/02.png"), crop: [1780, 520, 950, 780], what: "the toolbar button and popup in Safari on the Mac" },
  // Undirect: iPhone simulator takes of 1.0.3 on the demo film site.
  "u-menu-row": { from: join(UT, "V8_PI_103_on.mp4"), at: 34, crop: [60, 1290, 700, 360], what: "Safari's page menu with the Undirect row" },
  "u-power": { from: join(UT, "V8_PI_103_list.mp4"), at: 1, crop: [330, 1560, 660, 560], what: "the power button: site guarded" },
  "u-blocked-row": { from: join(UT, "V8_PI_103_list.mp4"), at: 1, crop: [40, 2100, 1240, 370], what: "one stopped address, marked Blocked" },
  "u-rule-menu": { from: join(UT, "V8_PI_103_list.mp4"), at: 5, crop: [556, 1660, 734, 650], r: 70, what: "the rule menu: Allowed on this site" },
  // Undirect: the live demo site, where every destination is the same harmless stand-in page.
  "u-landed": { from: "live:/demo/landed/:light", crop: [60, 640, 1200, 740], what: "the stand-in page a hijacked press lands on" },
  "u-fine": { from: "live:/demo/fine/:light", crop: [0, 0, 1320, 640], what: "the demo news site that behaves, with its Sign in button" },
  "u-stream": { from: "live:/demo/stream/:dark", crop: [0, 230, 1320, 760], what: "the demo film site's player before the press" },
};

const browser: Browser = await chromium.launch(existsSync(join(HOME, "Library/Caches/ms-playwright/chromium_headless_shell-1255"))
  ? { executablePath: join(HOME, "Library/Caches/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-mac-arm64/chrome-headless-shell") } : {});

const args = process.argv.slice(2);
const only = args.filter((a) => !a.startsWith("--"));
for (const d of [OUT, SRC, CHECKS, TMP]) mkdirSync(d, { recursive: true });

// ---------- crops ----------
async function cut(name: string, s: Source) {
  const to = join(SRC, name + ".png");
  if (existsSync(to) && !args.includes("--src")) return;
  const [x, y, w, h] = s.crop;
  let from = s.from;
  if (from.startsWith("live:")) {
    const [, path, scheme] = from.split(":");
    const ctx = await browser.newContext({ viewport: { width: 440, height: 956 }, deviceScaleFactor: 3, colorScheme: scheme as "light" | "dark", isMobile: true, hasTouch: true,
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1" });
    const p = await ctx.newPage();
    await p.goto("https://undirect.matsuokengo.com" + path, { waitUntil: "load" });
    await p.waitForTimeout(1500);
    from = join(TMP, `live-${name}.png`);
    await p.screenshot({ path: from });
    await ctx.close();
  } else if (!existsSync(from)) throw new Error(`${name}: ${from} is missing and src/${name}.png was never cut`);
  if (s.at !== undefined) await $`ffmpeg -v error -y -ss ${s.at} -i ${from} -frames:v 1 -vf crop=${w}:${h}:${x}:${y} ${to}`;
  else await $`ffmpeg -v error -y -i ${from} -vf crop=${w}:${h}:${x}:${y} ${to}`;
}
const used = new Set(Object.values(X_POSTS).flatMap((p) => p.picture?.shots ?? []));
for (const n of used) { if (!SOURCES[n]) throw new Error(`no source named ${n}`); await cut(n, SOURCES[n]); }
const dims = new Map<string, [number, number]>([...used].map((n) => [n, [SOURCES[n].crop[2], SOURCES[n].crop[3]]]));

// ---------- the picture ----------
const CSS = `
@font-face{font-family:"Inter Tight";src:url("file://${FONT}") format("woff2");font-weight:100 900}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1200px;height:675px;overflow:hidden;background:#000;color:#fff;font-family:"Inter Tight",system-ui,sans-serif}
.spot{position:absolute;inset:0;background:radial-gradient(58% 46% at 50% 0%,rgba(190,205,230,.17),transparent 72%)}
.floor{position:absolute;left:0;right:0;bottom:0;height:210px;background:linear-gradient(transparent,#07070a 60%,#0c0c10)}
.glow{position:absolute;border-radius:50%;filter:blur(80px)}
.card{position:absolute;overflow:hidden;background:#000;box-shadow:0 0 0 1.5px rgba(255,255,255,.12),0 40px 90px rgba(0,0,0,.9)}
.card img{display:block;width:100%;height:100%}
.card::after{content:"";position:absolute;inset:0;background:linear-gradient(118deg,rgba(255,255,255,.10) 0,rgba(255,255,255,.02) 24%,transparent 42%);pointer-events:none}
.line{position:absolute;font-weight:500;letter-spacing:-.014em;line-height:1.06;text-wrap:balance}
.icon{position:absolute;box-shadow:0 0 0 1.5px rgba(255,255,255,.14),0 18px 40px rgba(0,0,0,.7)}
`;
type Box = { x: number; y: number; w: number; h: number };
const fit = (name: string, box: Box) => {
  const [sw, sh] = dims.get(name)!;
  const k = Math.min(box.w / sw, box.h / sh);
  const w = sw * k, h = sh * k;
  return { x: box.x + (box.w - w) / 2, y: box.y + (box.h - h) / 2, w, h };
};
const card = (name: string, b: Box, tilt: string, radius = 0.075) =>
  `<div class="card" style="left:${b.x}px;top:${b.y}px;width:${b.w}px;height:${b.h}px;border-radius:${SOURCES[name].r ? (SOURCES[name].r! * b.w) / SOURCES[name].crop[2] : Math.min(b.w, b.h) * radius}px;transform:perspective(2200px) ${tilt}"><img src="file://${join(SRC, name + ".png")}"></div>`;
const glow = (app: "Undirect" | "Cutling", b: Box, a = 0.34) =>
  `<div class="glow" style="left:${b.x + b.w * 0.1}px;top:${b.y + b.h * 0.45}px;width:${b.w * 0.8}px;height:${b.h * 0.6}px;background:rgba(${GLOW[app]},${a})"></div>`;
const icon = (app: "Undirect" | "Cutling", x: number, y: number, s: number) =>
  `<img class="icon" src="file://${ICON[app]}" style="left:${x}px;top:${y}px;width:${s}px;height:${s}px;border-radius:${s * 0.225}px">`;

function html(app: "Undirect" | "Cutling" | "Both", p: Picture) {
  const one = app === "Both" ? "Undirect" : app;
  let body = "";
  if (p.layout === "side" || p.layout === "side-right") {
    const right = p.layout === "side-right";
    const b = fit(p.shots[0], { x: right ? 524 : 56, y: 48, w: 620, h: 579 });
    const tx = right ? 64 : 722;
    body = glow(one, b) + card(p.shots[0], b, right ? "rotateY(-9deg) rotateX(4deg)" : "rotateY(9deg) rotateX(4deg)")
      + `<div style="position:absolute;left:${tx}px;top:0;width:420px;height:675px;display:flex;flex-direction:column;justify-content:center;gap:34px">
           <div class="line" style="position:static;font-size:62px">${p.line}</div>
           <img class="icon" src="file://${ICON[one]}" style="position:static;width:84px;height:84px;border-radius:19px"></div>`;
  } else if (p.layout === "under") {
    const b = fit(p.shots[0], { x: 130, y: 44, w: 940, h: 372 });
    body = glow(one, b, 0.3) + card(p.shots[0], b, "rotateX(9deg) rotateY(-5deg)", 0.11)
      + `<div class="line" style="left:60px;right:60px;top:${Math.max(b.y + b.h + 44, 452)}px;text-align:center;font-size:62px;white-space:nowrap">${p.line}</div>`
      + icon(one, 562, 568, 76);
  } else if (p.layout === "pair") {
    const a = fit(p.shots[0], { x: 64, y: 44, w: 516, h: 390 }), b = fit(p.shots[1], { x: 620, y: 44, w: 516, h: 390 });
    body = glow(one, { x: 250, y: 60, w: 700, h: 380 }, 0.22) + card(p.shots[0], a, "rotateY(8deg) rotateX(4deg)") + card(p.shots[1], b, "rotateY(-8deg) rotateX(4deg)")
      + `<div class="line" style="left:60px;right:60px;top:466px;text-align:center;font-size:58px;white-space:nowrap">${p.line}</div>`
      + icon(one, 562, 568, 76);
  } else if (p.layout === "stack") {
    const a = fit(p.shots[0], { x: 190, y: 40, w: 820, h: 290 }), b0 = fit(p.shots[1], { x: 190, y: 0, w: 820, h: 90 });
    const b = { ...b0, y: a.y + a.h + 18 };
    body = glow(one, { x: a.x, y: a.y, w: a.w, h: a.h + b.h }, 0.3) + card(p.shots[0], a, "rotateX(7deg) rotateY(-4deg)", 0.12) + card(p.shots[1], b, "rotateX(7deg) rotateY(-4deg)", 0.3)
      + `<div class="line" style="left:60px;right:60px;top:${b.y + b.h + 44}px;text-align:center;font-size:62px;white-space:nowrap">${p.line}</div>`
      + icon(one, 562, 572, 76);
  } else {
    body = `<div class="glow" style="left:230px;top:150px;width:330px;height:200px;background:rgba(${GLOW.Undirect},.36)"></div><div class="glow" style="left:640px;top:150px;width:330px;height:200px;background:rgba(${GLOW.Cutling},.34)"></div>`
      + `<img class="icon" src="file://${ICON.Undirect}" style="left:330px;top:92px;width:240px;height:240px;border-radius:54px;transform:perspective(1800px) rotateY(10deg) rotateX(4deg)">`
      + `<img class="icon" src="file://${ICON.Cutling}" style="left:630px;top:92px;width:240px;height:240px;border-radius:54px;transform:perspective(1800px) rotateY(-10deg) rotateX(4deg)">`
      + `<div class="line" style="left:60px;right:60px;top:430px;text-align:center;font-size:70px;white-space:nowrap">${p.line}</div>`;
  }
  return `<!doctype html><meta charset="utf-8"><style>${CSS}</style><body><div class="spot"></div><div class="floor"></div>${body}</body>`;
}

// ---------- the timeline check ----------
// Measured on x.com on 2026-11-22, signed in as @monholtco, with a script reading each post's media box:
// web at a 1470 px window shows a single picture 518 px wide at its own ratio, up to 510 px tall, 48 px in
// from the post's left edge; the mobile web layout at 390 px shows it 310 px wide. Neither crops a 16:9.
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
function checkHtml(id: string, text: string, link: string | null) {
  const post = (w: number, label: string, frame: number) => `<div class="col" style="width:${frame}px"><p class="lab">${label}</p>
    <div class="post" style="width:${frame}px"><div class="av"></div><div class="b" style="width:${w}px"><p class="n"><b>Monholt</b> <span>@monholtco · now</span></p>
    <p class="t">${esc(text).replace(/\n/g, "<br>")}${link ? `<br><span class="l">${esc(link)}</span>` : ""}</p>
    <img src="file://${join(OUT, id + ".png")}" style="width:${w}px;height:${(w * 675) / 1200}px"></div></div></div>`;
  return `<!doctype html><meta charset="utf-8"><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#e7e9ea;font:15px/20px -apple-system,system-ui,sans-serif;padding:20px;display:flex;gap:28px;align-items:flex-start;width:1060px}
  .lab{color:#71767b;font-size:12px;margin-bottom:10px}.post{display:flex;gap:8px;border:1px solid #2f3336;padding:12px 16px 14px;border-radius:2px}.av{flex:none;width:40px;height:40px;border-radius:50%;background:#2f3336}
  .n span{color:#71767b}.t{margin:2px 0 12px}.l{color:#1d9bf0}img{display:block;border-radius:7.2px;border:1px solid #2f3336}</style>
  <body>${post(518, "X on the web, picture 518 px wide (drawn frame, measured size)", 598)}${post(310, "X mobile web at 390 px, picture 310 px wide", 390)}</body>`;
}

// ---------- render ----------
const rows: { id: string; app: "Undirect" | "Cutling" | "Both" }[] = JSON.parse(readFileSync(join(HERE, "deliveries.json"), "utf8")).rows.filter((r: { platform: string }) => r.platform === "X");
const appOf = new Map(rows.map((r) => [r.id, r.app]));
const todo = Object.entries(X_POSTS).filter(([id, p]) => p.picture && (!only.length || only.some((o) => id.startsWith(o))));
const page = await browser.newPage({ viewport: { width: 1200, height: 675 }, deviceScaleFactor: 1 });
const chk = await browser.newPage({ viewport: { width: 1060, height: 700 }, deviceScaleFactor: 2 });
for (const [id, p] of todo) {
  const app = appOf.get(id) ?? "Both";
  const f = join(TMP, id + ".html");
  writeFileSync(f, html(app === "Both" || !["Undirect", "Cutling"].includes(app) ? "Both" : app, p.picture!));
  await page.goto("file://" + f);
  await page.evaluate(() => (document as Document).fonts.ready);
  // A line that runs past its box is a broken picture, not a smaller one.
  const over = await page.evaluate(() => [...document.querySelectorAll<HTMLElement>(".line")].some((l) => { const r = l.getBoundingClientRect(); return r.left < 40 || r.right > 1160 || r.bottom > 650 || l.scrollWidth > l.clientWidth + 1; }));
  if (over) throw new Error(`${id}: "${p.picture!.line}" does not fit its picture`);
  await page.screenshot({ path: join(OUT, id + ".png") });
  const c = join(TMP, id + "-check.html");
  writeFileSync(c, checkHtml(id, p.text, p.link));
  await chk.goto("file://" + c);
  const h = await chk.evaluate(() => document.body.scrollHeight);
  await chk.setViewportSize({ width: 1060, height: h });
  await chk.screenshot({ path: join(CHECKS, id + ".jpg"), type: "jpeg", quality: 88 });
  console.log(id, p.picture!.layout, p.picture!.shots.join("+") || "icons");
}
await browser.close();
rmSync(TMP, { recursive: true, force: true });

// ---------- no bank details on any picture ----------
const BANK = /\b(bank|iban|swift|routing|sort code|account (no|number)|de89)\b/i;
const pics = Object.entries(X_POSTS).filter(([, p]) => p.picture).map(([id]) => join(OUT, id + ".png")).filter(existsSync);
const ocrOut = join(CHECKS, "ocr.json");
await $`swift ${join(HERE, "../qa-published-2026-11-21/method/ocr.swift")} ${ocrOut} ${pics}`.env({ ...process.env, LANGS: "en-US" });
const read: { f: string; boxes: { t: string }[] }[] = JSON.parse(readFileSync(ocrOut, "utf8"));
const report = read.map((r) => ({ picture: r.f, text: r.boxes.map((b) => b.t), bank_words: r.boxes.map((b) => b.t).filter((t) => BANK.test(t)) }));
writeFileSync(ocrOut, JSON.stringify({ checked: new Date().toISOString(), must_not_match: BANK.source, pictures: report }, null, 1) + "\n");
const bad = report.filter((r) => r.bank_words.length);
if (bad.length) throw new Error(`bank details on ${bad.map((b) => `${b.picture}: ${b.bank_words.join(", ")}`).join("; ")}`);
console.log(`${pics.length} pictures read by Vision, none shows a bank word`);
