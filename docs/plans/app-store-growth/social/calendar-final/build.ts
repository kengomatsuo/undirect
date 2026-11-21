// Builds the @monholtco approval package: media per post under ~/Downloads/social-calendar/P<nn>/,
// every caption as text, and one review page, ~/Downloads/social-calendar/index.html.
// Run: bun install && bun build.ts   (needs ffmpeg on PATH)
// Re-run after the films in ~/Downloads/pain-films-v4 are re-rendered: films are linked, not
// copied, and the trimmed cuts and App Store captures are made again from the current files.

import { $ } from "bun";
import { existsSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync, copyFileSync, lstatSync, unlinkSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { chromium, type Browser } from "playwright";
import { posts, type Post, type Img } from "./posts";
import { T, frame, hl, BRAND, type Size } from "./templates";

const HOME = homedir();
const OUT = join(HOME, "Downloads/social-calendar");
const FILMS = join(HOME, "Downloads/pain-films-v4");
const ASSETS = join(OUT, "_assets");
const REPO = join(import.meta.dir, "../../../../..");
const SOCIAL = join(import.meta.dir, "..");
const HERE = import.meta.dir;
const only = process.argv.includes("--page-only");

const URLS = { Undirect: "undirect.matsuokengo.com", Cutling: "cutling.matsuokengo.com" } as const;
const TAGS = {
  u: { ig: "#iphonetips #iphonehacks #safari #adblock #iosapps", tt: "#iphonetips #iphonehacks #popupads #techtok" },
  umac: { ig: "#macapps #mactips #safari #adblock #macbooktips", tt: "#macbooktips #mactips #macapps #techtok" },
  c: { ig: "#iphonetips #textreplacement #productivityapps #iosapps #macapps", tt: "#textreplacement #iphonetips #iphonehacks #techtok" },
  cmac: { ig: "#macapps #macbooktips #mactips #productivityapps #iosapps", tt: "#macapps #macbooktips #mactips #techtok" },
  csmb: { ig: "#smallbusinesstips #iphonetips #productivityapps #iosapps #textreplacement", tt: "#smallbusiness #iphonetips #techtok" },
};

const pad = (n: number) => String(n).padStart(2, "0");
const pid = (p: Post) => `P${pad(p.n)}`;
const dir = (p: Post) => join(OUT, pid(p));

// ---------- times ----------
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmtDay = (d: Date) => `${DAYS[d.getUTCDay()]} ${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;
const SLOT = { 1: { wib: "02:20", et: "14:20", prev: true, part: "US afternoon" }, 2: { wib: "05:50", et: "17:50", prev: true, part: "US evening" }, 3: { wib: "21:20", et: "09:20", prev: false, part: "US morning" } } as const;
function times(p: Post) {
  const d = new Date(p.date + "T00:00:00Z");
  if (p.slot === "kept") return { day: fmtDay(d), wib: `${p.keptTime!.wib} WIB ${fmtDay(d)}`, et: `${p.keptTime!.et} ET`, part: "kept time" };
  const s = SLOT[p.slot];
  const e = new Date(d.getTime() - (s.prev ? 86400000 : 0));
  return { day: fmtDay(d), wib: `${s.wib} WIB ${fmtDay(d)}`, et: `${s.et} ET ${fmtDay(e)}`, part: s.part };
}

// Black Friday prices run until 15:00 WIB Dec 1: no price in any post before then.
function inSale(p: Post) {
  const t = p.slot === "kept" ? p.keptTime!.wib : SLOT[p.slot].wib;
  const at = new Date(`${p.date}T${t}:00+07:00`).getTime();
  return at >= new Date("2026-11-27T00:00:00+07:00").getTime() && at < new Date("2026-12-01T15:00:00+07:00").getTime();
}

// ---------- captions ----------
type Captions = { x?: string; xReply?: string; xPoll?: { q: string; options: string[] }; ig?: string; igStory?: string; tt?: string };
function captions(p: Post): Captions {
  if (p.kind === "kept") return { x: p.kept!.x, ig: p.kept!.ig, tt: p.kept!.tt };
  const app = p.app as "Undirect" | "Cutling";
  const tags = TAGS[p.tags ?? (app === "Undirect" ? "u" : "c")];
  const xReply = `${p.reply}\n${URLS[app]}`;
  if (p.kind === "poll") {
    const pl = p.poll!;
    const story = [
      `Frame 1: ${pl.ig.sticker} sticker. "${pl.ig.q}"${pl.ig.options ? ` Options: ${pl.ig.options.join(" / ")}.` : ""}${pl.ig.correct !== undefined ? ` Correct: ${pl.ig.options![pl.ig.correct]}.` : ""}${pl.ig.emoji ? ` Emoji: ${pl.ig.emoji}` : ""}`,
      pl.ig.note ?? "",
      `Frame 2: link sticker to ${URLS[app]}, text "${app}".`,
    ].filter(Boolean).join("\n");
    return { xPoll: pl.x, xReply, igStory: story, tt: `${pl.tt.caption}\n${tags.tt}` };
  }
  if (p.kind === "text") return { x: p.body, xReply };
  return {
    x: p.body, xReply,
    ig: `${p.body}\n\nLink in bio.\n${tags.ig}`,
    tt: `${p.body}\n\nSearch ${app} on the App Store.\n${tags.tt}`,
  };
}

// ---------- checks ----------
const xLen = (s: string) => s.replace(/\b[\w.-]+\.(com|example)(\/[^\s]*)?/g, "x".repeat(23)).length;
function check(p: Post, c: Captions): string[] {
  const out: string[] = [];
  const all = [c.x, c.xReply, c.ig, c.tt, c.igStory, c.xPoll?.q, ...(c.xPoll?.options ?? []), p.body].filter(Boolean).join("\n");
  if (c.x && xLen(c.x) > 280) out.push(`X post is ${xLen(c.x)} characters`);
  if (c.xReply && xLen(c.xReply) > 280) out.push(`X reply is ${xLen(c.xReply)} characters`);
  c.xPoll?.options.forEach((o) => o.length > 25 && out.push(`X poll option "${o}" over 25`));
  p.poll?.ig.options?.forEach((o) => o.length > 25 && out.push(`IG option "${o}" over 25`));
  p.poll?.tt.options?.forEach((o) => o.length > 25 && out.push(`TikTok option "${o}" over 25`));
  if (c.ig && (c.ig.match(/#/g) ?? []).length > 5) out.push("more than 5 Instagram tags");
  if (c.tt) { const n = (c.tt.match(/#/g) ?? []).length; if (n < 3 || n > 5) out.push(`${n} TikTok tags`); }
  if (c.ig && p.kind !== "kept" && !c.ig.slice(0, 125).includes(p.body!.split("\n")[0].slice(0, 40))) out.push("hook not in the first 125 characters");
  if (c.tt && !/Search .* on the App Store\./.test(c.tt)) out.push("TikTok caption lacks the search line");
  if (c.x && /#\w/.test(c.x) && p.kind !== "kept") out.push("hashtag on X");
  if (p.app === "Cutling" && /\bbank|IBAN/i.test(all)) out.push("bank details in a Cutling post");
  if (p.app === "Cutling" && /clipboard history/i.test(all) && !/Mac/.test(all)) out.push("clipboard history without Mac");
  if (inSale(p) && p.kind !== "kept" && /\$[0-4]\.99/.test(all)) out.push("price inside the Black Friday window");
  return out;
}

// ---------- media ----------
async function endCardAt(file: string): Promise<number> {
  // The end card is the still frame the film ends on; find where frames start matching it.
  const raw = await $`ffmpeg -v error -i ${file} -vf fps=10,scale=24:42,format=gray -f rawvideo -`.arrayBuffer();
  const px = 24 * 42, buf = new Uint8Array(raw), n = Math.floor(buf.length / px);
  const last = buf.subarray((n - 1) * px, n * px);
  const diff = (i: number) => { let s = 0; for (let k = 0; k < px; k++) s += Math.abs(buf[i * px + k] - last[k]); return s / px; };
  let i = n - 1;
  while (i > 0 && diff(i - 1) < 10) i--;
  // walk back through the fade into the card
  let j = i; while (j > 0 && diff(j - 1) < 40) j--;
  return Math.max(1, j / 10 - 0.3);
}

async function cutFilm(film: string, how: "6s" | "endcard", to: string) {
  const src = join(FILMS, film + ".mp4");
  const end = await endCardAt(src);
  const t = how === "6s" ? Math.min(6, end) : end;
  await $`ffmpeg -v error -y -i ${src} -t ${t.toFixed(2)} -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac -movflags +faststart ${to}`;
  return t;
}

function linkFilm(film: string, toDir: string): string {
  const name = film + ".mp4";
  const at = join(toDir, name);
  if (existsSync(at) || (() => { try { lstatSync(at); return true; } catch { return false; } })()) unlinkSync(at);
  symlinkSync(join("../../pain-films-v4", name), at);
  return name;
}

async function prepareAssets(browser: Browser) {
  mkdirSync(ASSETS, { recursive: true });
  copyFileSync(join(REPO, "web/undirect-app-icon.png"), join(ASSETS, BRAND.Undirect.icon));
  copyFileSync(join(HOME, "Repositories/Cutling/web/cutling-app-icon.png"), join(ASSETS, BRAND.Cutling.icon));
  const C = join(HOME, "Repositories/Cutling/fastlane/screenshots_tall/en-US/iphone");
  const U = join(REPO, "Support/AppStore/iphone");
  // Crop boxes (w:h:x:y) around the device area of each 1320x2868 App Store screenshot.
  const crops: [string, string, string][] = [
    ["c01", join(C, "01.png"), "1200:1305:60:1350"],
    ["c03", join(C, "03.png"), "1020:1932:150:744"],
    ["c06", join(C, "06.png"), "1140:1629:90:891"],
    ["u03", join(U, "03.png"), "1170:1545:75:870"],
  ];
  for (const [name, src, box] of crops) await $`ffmpeg -v error -y -i ${src} -vf crop=${box} ${join(ASSETS, name + ".png")}`;
  // Live App Store page: price, devices and the privacy label, as it reads today.
  const page = await browser.newPage({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 2.5 });
  await page.goto("https://apps.apple.com/us/app/cutling/id6759476314", { waitUntil: "networkidle", timeout: 60000 });
  const box = async (text: string) => (await page.getByText(text, { exact: false }).locator("visible=true").first().boundingBox())!;
  const head = await box("Cutling - Clipboard Keyboard");
  const dev = await box("iPhone, iPad, Mac");
  await page.screenshot({ path: join(ASSETS, "store-header.png"), fullPage: true, clip: { x: 0, y: 47, width: 430, height: head.y - 47 + 112 } });
  // The device line sits under the screenshot carousel: take it as its own strip and stack it.
  await page.screenshot({ path: join(ASSETS, "store-devices.png"), fullPage: true, clip: { x: 0, y: dev.y - 24, width: 430, height: dev.height + 48 } });
  const priv = await box("App Privacy");
  const dnc = await box("Data Not Collected");
  await page.screenshot({ path: join(ASSETS, "store-privacy.png"), fullPage: true, clip: { x: 0, y: priv.y - 30, width: 430, height: dnc.y + dnc.height - priv.y + 170 } });
  const text = await page.evaluate(() => document.body.innerText);
  await page.close();
  if (!text.includes("$4.99") || !text.includes("Data Not Collected")) throw new Error("App Store page no longer shows $4.99 and Data Not Collected; check before posting");
  // header + device strip in one image
  const hp = await browser.newPage({ viewport: { width: 1075, height: 400 } });
  writeFileSync(join(ASSETS, "_stack.html"), `<body style="margin:0;background:#fff;width:1075px"><img src="store-header.png" style="display:block;width:1075px"><img src="store-devices.png" style="display:block;width:1075px"></body>`);
  await hp.goto("file://" + join(ASSETS, "_stack.html"));
  await hp.waitForLoadState("networkidle");
  const h = await hp.evaluate(() => document.body.scrollHeight);
  await hp.setViewportSize({ width: 1075, height: h });
  await hp.screenshot({ path: join(ASSETS, "store-header.png") });
  await hp.close();
}

async function render(browser: Browser, img: Img, size: Size, to: string) {
  const t = T[img.tpl];
  if (!t) throw new Error("no template " + img.tpl);
  const { app, html } = t(img as any, size);
  const doc = frame(html, size, app);
  const tmp = join(ASSETS, `_render.html`);
  writeFileSync(tmp, doc);
  const page = await browser.newPage({ viewport: { width: 1080, height: size === "ig" ? 1350 : 1920 } });
  await page.goto("file://" + tmp);
  await page.waitForLoadState("networkidle");
  // Fail on anything that spills out of the frame.
  const spill = await page.evaluate(() => {
    const H = document.documentElement.clientHeight;
    return [...document.querySelectorAll(".head,.dim,.wrap > *")].some((e) => { const r = e.getBoundingClientRect(); return r.bottom > H + 1 || r.right > 1081; });
  });
  await page.screenshot({ path: to });
  await page.close();
  if (spill) console.warn("  overflow in", to);
}

// ---------- page ----------
const esc = (s = "") => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const br = (s = "") => esc(s).replace(/\n/g, "<br>");

type Media = { x?: string[]; ig?: string[]; tt?: string[]; story?: string[]; video?: string; ttVideo?: string; ttCut?: string };

function page(rows: { p: Post; c: Captions; m: Media; issues: string[]; t: ReturnType<typeof times> }[]) {
  const count = (f: (r: (typeof rows)[0]) => string) => rows.reduce((a, r) => ((a[f(r)] = (a[f(r)] ?? 0) + 1), a), {} as Record<string, number>);
  const byApp = count((r) => r.p.app), byKind = count((r) => r.p.kind), byGate = count((r) => (r.p.gate ? "Waiting on 1.0.5" : "Ready"));
  const missing = rows.filter((r) => r.p.missing?.length).length;
  const chips = (o: Record<string, number>) => Object.entries(o).map(([k, v]) => `<span class="chip"><b>${v}</b> ${esc(k)}</span>`).join("");
  const kindName: Record<string, string> = { film: "Film", image: "Image", carousel: "Carousel", poll: "Poll", text: "X text", kept: "Kept draft" };

  const media = (src: string | undefined, ratio: string) =>
    !src ? "" : src.endsWith(".mp4") ? `<video controls preload="none" playsinline poster="${src.replace(/\.mp4$/, ".jpg")}" src="${src}" style="aspect-ratio:${ratio}"></video>` : `<img loading="lazy" src="${src}" style="aspect-ratio:${ratio}" alt="">`;
  const slider = (srcs: string[], ratio: string) => srcs.length > 1
    ? `<div class="slides">${srcs.map((s) => media(s, ratio)).join("")}</div><div class="dots">${srcs.length} slides, swipe</div>` : media(srcs[0], ratio);

  const xCard = (r: (typeof rows)[0]) => {
    const { c, m, p } = r;
    if (!c.x && !c.xPoll) return "";
    const poll = c.xPoll ? `<div class="poll">${c.xPoll.options.map((o) => `<div class="opt">${esc(o)}<span class="len">${o.length}</span></div>`).join("")}<div class="meta">1 day · poll</div></div>` : "";
    return `<article class="pcard x"><div class="plat">X</div>
      <div class="xrow"><div class="av">M</div><div class="xbody"><div class="who"><b>Monholt</b> <span>@monholtco</span></div>
      <div class="txt">${br(c.xPoll ? c.xPoll.q : c.x)}</div>${poll}${m.x ? `<div class="xmedia">${slider(m.x, m.x[0].endsWith(".mp4") ? "9/16" : "4/5")}</div>` : ""}
      ${c.x ? `<div class="meta">${xLen(c.x)}/280</div>` : ""}</div></div>
      ${c.xReply ? `<div class="xrow reply"><div class="av">M</div><div class="xbody"><div class="who"><b>Monholt</b> <span>@monholtco · reply</span></div><div class="txt">${br(c.xReply)}</div></div></div>` : ""}
    </article>`;
  };
  const igCard = (r: (typeof rows)[0]) => {
    const { c, m } = r;
    if (c.igStory) return `<article class="pcard ig"><div class="plat">Instagram Story</div>
      <div class="story">${(m.story ?? []).map((s, i) => `<div class="sframe"><img loading="lazy" src="${s}" alt="">${i === 0 ? `<div class="sticker">${br(r.p.poll!.ig.q)}${r.p.poll!.ig.options ? r.p.poll!.ig.options.map((o) => `<span>${esc(o)}</span>`).join("") : r.p.poll!.ig.emoji ? `<span class="emo">${r.p.poll!.ig.emoji} ─────●</span>` : `<span class="ans">Type something…</span>`}<i>${esc(r.p.poll!.ig.sticker)} sticker</i></div>` : `<div class="sticker link">🔗 ${URLS[r.p.app as "Cutling"]}<i>link sticker</i></div>`}</div>`).join("")}</div>
      <div class="txt small">${br(c.igStory)}</div></article>`;
    if (!c.ig) return "";
    const cap = esc(c.ig);
    const cut = c.ig.length > 125 ? `${br(c.ig.slice(0, 125))}<span class="more" title="Instagram cuts the caption here">…more</span>${br(c.ig.slice(125))}` : br(c.ig);
    return `<article class="pcard ig"><div class="plat">Instagram ${m.ig && m.ig[0]?.endsWith(".mp4") ? "Reel" : m.ig && m.ig.length > 1 ? "carousel" : "post"}</div>
      <div class="igtop"><div class="av">M</div><b>monholtco</b></div>
      ${m.ig ? slider(m.ig, m.ig[0].endsWith(".mp4") ? "9/16" : "4/5") : ""}
      <div class="txt"><b>monholtco</b> ${cut}</div><div class="meta" title="${cap.length}">Hook in the first 125 characters, before …more</div></article>`;
  };
  const ttCard = (r: (typeof rows)[0]) => {
    const { c, m, p } = r;
    if (!c.tt) return "";
    const pl = p.poll?.tt;
    return `<article class="pcard tt"><div class="plat">TikTok ${pl ? esc(pl.type) : m.tt?.[0]?.endsWith(".mp4") ? "video" : "photo post"}</div>
      <div class="ttmedia">${m.tt ? slider(m.tt, "9/16") : ""}${pl ? `<div class="sticker tt">${esc(pl.q)}${(pl.options ?? []).map((o) => `<span>${esc(o)}</span>`).join("")}</div>` : ""}</div>
      ${m.ttCut ? `<div class="meta">${esc(m.ttCut)}</div>` : ""}${pl?.note ? `<div class="meta">${esc(pl.note)}</div>` : ""}
      <div class="txt"><b>@monholt</b> ${br(c.tt)}</div></article>`;
  };

  let lastDay = "";
  const body = rows.map((r) => {
    const { p, t } = r;
    const dayHead = t.day !== lastDay ? `</section><section class="day"><h2>${t.day}</h2>` : "";
    lastDay = t.day;
    const gate = p.gate ? `<div class="gate">Waiting: ${esc(p.gate)}</div>` : "";
    const miss = p.missing?.length ? `<div class="gate miss">Missing: ${p.missing.map(esc).join(" ")}</div>` : "";
    const notes = [...(p.notes ?? []), ...(p.kept ? [`Text as approved in ${p.kept.source}.`] : [])];
    const issues = r.issues.length ? `<div class="gate miss">Check failed: ${r.issues.map(esc).join("; ")}</div>` : "";
    return `${dayHead}<div class="post ${p.gate ? "gated" : ""}" id="${pid(p)}" data-app="${p.app}" data-kind="${p.kind}" data-gate="${p.gate ? 1 : 0}">
      <header><label class="ok"><input type="checkbox" data-id="${pid(p)}"><span>${pid(p)}</span></label>
        <div class="when"><b>${t.wib.split(" WIB")[0]} WIB</b> · ${t.et} · ${t.part}</div>
        <span class="pill ${p.app}">${p.app}</span><span class="pill">${kindName[p.kind]}</span>${p.gate ? `<span class="pill wait">After 1.0.5</span>` : ""}</header>
      <div class="pain">${esc(p.pain)}</div>${gate}${miss}${issues}
      ${notes.length ? `<ul class="notes">${notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>` : ""}
      <div class="cards">${xCard(r)}${igCard(r)}${ttCard(r)}</div></div>`;
  }).join("");

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Monholt social calendar</title>
<style>
:root{--bg:#f4f4f2;--card:#fff;--ink:#141414;--mute:#6b6b6b;--line:#e3e3df;--u:#D92B24;--c:#0f9e74;--wait:#b26a00;--waitbg:#fff4e0}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#121212;--card:#1d1d1d;--ink:#f2f2f2;--mute:#a0a0a0;--line:#2d2d2d;--waitbg:#3a2a10;--wait:#ffb547}}
:root[data-theme="dark"]{--bg:#121212;--card:#1d1d1d;--ink:#f2f2f2;--mute:#a0a0a0;--line:#2d2d2d;--waitbg:#3a2a10;--wait:#ffb547}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.45 -apple-system,system-ui,"Segoe UI",Roboto,sans-serif}
.top{position:static;z-index:5;background:var(--bg);border-bottom:1px solid var(--line);padding:12px 16px}
.top h1{font-size:20px;margin:0 0 6px}.wrapc{max-width:1280px;margin:0 auto}
.sum{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}.chip{background:var(--card);border:1px solid var(--line);border-radius:999px;padding:3px 10px;font-size:13px}
.bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.bar button,.bar select{font:inherit;padding:6px 12px;border-radius:8px;border:1px solid var(--line);background:var(--card);color:var(--ink)}
.bar .go{background:var(--ink);color:var(--bg);border:none}
#out{width:100%;font:13px ui-monospace,monospace;margin-top:8px;display:none;padding:8px;border-radius:8px;border:1px solid var(--line);background:var(--card);color:var(--ink)}
main{padding:0 16px 80px}.day h2{font-size:18px;margin:28px 0 10px;position:sticky;top:var(--toph,0px);background:var(--bg);padding:6px 0;z-index:3}
.post{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:14px;margin:0 0 16px}
.post.gated{border:2px solid var(--wait)}
.post header{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.ok{display:flex;gap:6px;align-items:center;font-weight:800;font-size:17px;cursor:pointer}.ok input{width:22px;height:22px}
.when{font-size:13px;color:var(--mute);flex:1 1 220px}
.pill{font-size:12px;border:1px solid var(--line);border-radius:999px;padding:2px 9px}.pill.Undirect{color:#fff;background:var(--u);border:none}.pill.Cutling{color:#fff;background:var(--c);border:none}.pill.Both{background:var(--ink);color:var(--bg)}
.pill.wait{background:var(--waitbg);color:var(--wait);border-color:var(--wait)}
.pain{color:var(--mute);font-size:13px;margin:6px 0}
.gate{background:var(--waitbg);color:var(--wait);border-radius:8px;padding:6px 10px;font-size:13px;margin:6px 0}.gate.miss{background:#fde8e8;color:#a11}
.notes{margin:4px 0 8px;padding-left:18px;color:var(--mute);font-size:12.5px}
.cards{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:6px}
.pcard{flex:0 0 min(340px,86vw);scroll-snap-align:start;border:1px solid var(--line);border-radius:14px;padding:10px;background:var(--bg);min-width:0}
.plat{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--mute);margin-bottom:8px}
.av{width:34px;height:34px;border-radius:50%;background:#111;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;flex:none;border:2px solid var(--line)}
.xrow{display:flex;gap:8px}.xbody{min-width:0;flex:1}.who{font-size:14px}.who span{color:var(--mute)}
.reply{margin-top:10px;padding-top:10px;border-top:1px dashed var(--line)}
.txt{white-space:normal;word-wrap:break-word;margin:4px 0}.txt.small{font-size:12.5px;color:var(--mute)}
.meta{font-size:11.5px;color:var(--mute);margin-top:4px}
img,video{display:block;width:100%;border-radius:10px;background:#000;object-fit:cover}
.xmedia{margin-top:8px}.igtop{display:flex;align-items:center;gap:8px;margin-bottom:8px}
.slides{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:6px}.slides>*{flex:0 0 100%;scroll-snap-align:start}.dots{font-size:11px;color:var(--mute);text-align:center;margin-top:4px}
.more{color:var(--mute);background:var(--waitbg);border-radius:4px;padding:0 3px;margin:0 2px;font-size:12px}
.poll{margin-top:8px}.opt{border:1px solid #1d9bf0;color:#1d9bf0;border-radius:999px;padding:5px 12px;margin:5px 0;font-weight:600;display:flex;justify-content:space-between}.opt .len{opacity:.5;font-weight:400;font-size:11px}
.story{display:flex;gap:6px;overflow-x:auto}.sframe{position:relative;flex:0 0 100%}
.sticker{position:absolute;left:12%;right:12%;top:38%;background:#fff;color:#111;border-radius:14px;padding:10px;font-weight:700;font-size:13px;text-align:center;box-shadow:0 6px 20px rgba(0,0,0,.35)}
.sticker span{display:block;border:1px solid #ddd;border-radius:999px;margin-top:6px;padding:3px;font-weight:600}.sticker span.emo,.sticker span.ans{border:none;color:#888}
.sticker i{display:block;font-size:10px;color:#999;font-weight:400;margin-top:6px;font-style:normal}
.sticker.link{top:62%;color:#0a66ff}.ttmedia{position:relative}.sticker.tt{top:30%}
@media (min-width:1100px){.cards{overflow:visible}.pcard{flex:1 1 0}}
@media (min-width:900px){.top{position:sticky;top:0}}
</style></head><body>
<div class="top"><div class="wrapc">
<h1>@monholtco calendar · Nov 22 to Dec 20 · ${rows.length} posts</h1>
<div class="sum">${chips(byApp)}</div><div class="sum">${chips(Object.fromEntries(Object.entries(byKind).map(([k, v]) => [kindName[k], v])))}</div><div class="sum">${chips(byGate)}<span class="chip"><b>${missing}</b> with something missing</span></div>
<div class="bar"><button class="go" id="copy">Copy my go</button><button id="all">Tick all ready</button><button id="none">Clear</button>
<select id="f"><option value="">All posts</option><option value="Undirect">Undirect</option><option value="Cutling">Cutling</option><option value="gate">Waiting on 1.0.5</option><option value="film">Films</option><option value="image">Images and carousels</option><option value="poll">Polls</option></select>
<span id="n" class="meta"></span></div><textarea id="out" rows="3" readonly></textarea></div></div>
<main class="wrapc"><section>${body}</section></main>
<script>
const K="monholt-cal-v1";let s={};try{s=JSON.parse(localStorage.getItem(K)||"{}")}catch(e){}
const boxes=[...document.querySelectorAll("input[data-id]")];
const save=()=>{try{localStorage.setItem(K,JSON.stringify(s))}catch(e){};document.getElementById("n").textContent=boxes.filter(b=>b.checked).length+" of "+boxes.length+" ticked"};
boxes.forEach(b=>{b.checked=!!s[b.dataset.id];b.onchange=()=>{s[b.dataset.id]=b.checked;save()}});save();
document.getElementById("all").onclick=()=>{boxes.forEach(b=>{if(b.closest(".post").dataset.gate==="0"){b.checked=true;s[b.dataset.id]=true}});save()};
document.getElementById("none").onclick=()=>{boxes.forEach(b=>{b.checked=false;s[b.dataset.id]=false});save()};
document.getElementById("copy").onclick=()=>{const ids=boxes.filter(b=>b.checked).map(b=>b.dataset.id);const o=document.getElementById("out");o.style.display="block";o.value="Go: "+(ids.join(", ")||"none");o.select();try{navigator.clipboard.writeText(o.value)}catch(e){}};
document.getElementById("f").onchange=e=>{const v=e.target.value;document.querySelectorAll(".post").forEach(p=>{const d=p.dataset;p.style.display=!v||d.app===v||(v==="gate"&&d.gate==="1")||d.kind===v||(v==="image"&&d.kind==="carousel")?"":"none"})};
const bar=document.querySelector(".top");const fix=()=>document.documentElement.style.setProperty("--toph",(getComputedStyle(bar).position==="sticky"?bar.offsetHeight:0)+"px");fix();addEventListener("resize",fix);
</script></body></html>`;
}

// ---------- main ----------
async function main() {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch(existsSync(join(HOME, "Library/Caches/ms-playwright/chromium_headless_shell-1255")) && !process.env.PW_OWN
    ? { executablePath: join(HOME, "Library/Caches/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-mac-arm64/chrome-headless-shell") } : {});
  if (!only) await prepareAssets(browser);
  const rows = [];
  const allText: string[] = [];
  const firstLines = new Map<string, number>();
  for (const p of posts) {
    const d = dir(p); mkdirSync(d, { recursive: true });
    const c = captions(p);
    const m: Media = {};
    const rel = (f: string) => `${pid(p)}/${f}`;
    if (!only) {
      if (p.film) {
        const f = linkFilm(p.film, d);
        await $`ffmpeg -v error -y -ss 1.2 -i ${join(FILMS, p.film + ".mp4")} -frames:v 1 -vf scale=540:-1 ${join(d, p.film + ".jpg")}`;
        m.x = m.ig = m.tt = [rel(f)];
      }
      if (p.images) {
        const ig: string[] = [], tt: string[] = [];
        for (const [i, img] of p.images.entries()) {
          const a = `ig-${i + 1}.png`, b = `tt-${i + 1}.png`;
          await render(browser, img, "ig", join(d, a)); await render(browser, img, "tt", join(d, b));
          ig.push(rel(a)); tt.push(rel(b));
        }
        m.x = ig.slice(0, 4); m.ig = ig; m.tt = tt;
      }
      if (p.poll) {
        await render(browser, p.poll.ig.bg, "story", join(d, "story-1.png"));
        await render(browser, { tpl: "storylink", app: p.app }, "story", join(d, "story-2.png"));
        m.story = [rel("story-1.png"), rel("story-2.png")];
        const tt = p.poll.tt;
        if (tt.cut) {
          const name = `${tt.film}-${tt.cut === "6s" ? "first6s" : "no-endcard"}.mp4`;
          const sec = await cutFilm(tt.film, tt.cut, join(d, name));
          await $`ffmpeg -v error -y -ss 1.2 -i ${join(d, name)} -frames:v 1 -vf scale=540:-1 ${join(d, name.replace(".mp4", ".jpg"))}`;
          m.tt = [rel(name)]; m.ttCut = `Cut from ${tt.film}.mp4: first ${sec.toFixed(1)} s, ${tt.cut === "6s" ? "before the price line" : "before the end card"}. Re-run build.ts after the re-render.`;
        } else {
          const f = linkFilm(tt.film, d);
          await $`ffmpeg -v error -y -ss 1.2 -i ${join(FILMS, tt.film + ".mp4")} -frames:v 1 -vf scale=540:-1 ${join(d, tt.film + ".jpg")}`;
          m.tt = [rel(f)];
        }
      }
      if (p.kept?.media) {
        for (const f of p.kept.media) copyFileSync(join(SOCIAL, f), join(d, f));
        m.x = [rel("sale-undirect-ig.png"), rel("sale-cutling-ig.png")]; m.ig = m.x; m.tt = [rel("sale-undirect-tt.png"), rel("sale-cutling-tt.png")];
      }
    } else {
      // page-only: rebuild the page from files already on disk
      const has = (f: string) => existsSync(join(d, f));
      if (p.film) m.x = m.ig = m.tt = [rel(p.film + ".mp4")];
      if (p.images) { m.ig = p.images.map((_, i) => rel(`ig-${i + 1}.png`)); m.tt = p.images.map((_, i) => rel(`tt-${i + 1}.png`)); m.x = m.ig.slice(0, 4); }
      if (p.poll) { m.story = [rel("story-1.png"), rel("story-2.png")]; const tt = p.poll.tt; const cut = `${tt.film}-${tt.cut === "6s" ? "first6s" : "no-endcard"}.mp4`; m.tt = [rel(tt.cut && has(cut) ? cut : tt.film + ".mp4")]; if (tt.cut && has(cut)) { const sec = Number((await $`ffprobe -v error -show_entries format=duration -of csv=p=0 ${join(d, cut)}`.text()).trim()); m.ttCut = `Cut from ${tt.film}.mp4: first ${sec.toFixed(1)} s, ${tt.cut === "6s" ? "before the price line" : "before the end card"}. Re-run build.ts after the re-render.`; } }
      if (p.kept?.media) { m.x = [rel("sale-undirect-ig.png"), rel("sale-cutling-ig.png")]; m.ig = m.x; m.tt = [rel("sale-undirect-tt.png"), rel("sale-cutling-tt.png")]; }
    }
    const issues = check(p, c);
    if (p.body) {
      const fl = p.body.split("\n")[0];
      if (firstLines.has(fl)) issues.push(`first line repeats P${pad(firstLines.get(fl)!)}`);
      firstLines.set(fl, p.n);
    }
    const t = times(p);
    const txt = [
      `${pid(p)} · ${t.wib} · ${t.et} · ${p.app} · ${p.kind}${p.gate ? " · WAITING: " + p.gate : ""}`, "",
      c.x ? `X post:\n${c.x}\n` : "", c.xPoll ? `X poll (1 day):\n${c.xPoll.q}\n${c.xPoll.options.map((o) => "- " + o).join("\n")}\n` : "",
      c.xReply ? `X reply:\n${c.xReply}\n` : "", c.ig ? `Instagram caption:\n${c.ig}\n` : "", c.igStory ? `Instagram Story:\n${c.igStory}\n` : "",
      c.tt ? `TikTok caption:\n${c.tt}\n` : "", p.poll ? `TikTok ${p.poll.tt.type}: ${p.poll.tt.q}${p.poll.tt.options ? " " + p.poll.tt.options.join(" / ") : ""}\n` : "",
      `Media: ${[...new Set([...(m.x ?? []), ...(m.ig ?? []), ...(m.tt ?? []), ...(m.story ?? [])])].join(", ") || "none"}`,
    ].filter(Boolean).join("\n");
    writeFileSync(join(d, "captions.txt"), txt + "\n");
    // one prose line per caption body for the scanner (tags and links left out)
    if (p.kind !== "kept") for (const s of [p.body, p.reply, p.poll?.tt.caption.split("\n\nSearch")[0]]) if (s) allText.push(s.replace(/\n+/g, " "));
    rows.push({ p, c, m, issues, t });
    if (issues.length) console.log(pid(p), issues.join("; "));
  }
  await browser.close();
  writeFileSync(join(OUT, "index.html"), page(rows));
  writeFileSync(join(HERE, "captions.txt"), allText.join("\n") + "\n");
  writeFileSync(join(HERE, "calendar-final.txt"), rows.map((r) => readFileSync(join(dir(r.p), "captions.txt"), "utf8")).join("\n" + "-".repeat(60) + "\n\n"));
  console.log(`built ${rows.length} posts → ${join(OUT, "index.html")}`);
}

await main();
