// Builds the @monholtco approval package: every post in a finished version for X, Instagram,
// TikTok, Threads, Facebook and YouTube, its media under ~/Downloads/social-calendar/P<nn>/,
// review copies (720 px, ~1.5 Mbps) under ~/Downloads/social-calendar/review/, and one review page
// written twice: index.html (local) and artifact.html (published as a claude.ai Artifact).
// Run: bun install && bun build.ts   (needs ffmpeg on PATH)
// Re-run after the films in ~/Downloads/pain-films-v4 are re-rendered: films are linked, not
// copied, and the trimmed cuts and App Store captures are made again from the current files.

import { $ } from "bun";
import { existsSync, mkdirSync, readFileSync, writeFileSync, copyFileSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { join, basename } from "node:path";
import { chromium, type Browser } from "playwright";
import { posts, type Post, type Img } from "./posts";
import { T, T2, frame, hl, sticker, BRAND, type Size } from "./templates";
import { THREADS_Q, YT_TITLE, X_THREAD, TT_REPLY, CARD } from "./platforms";

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

// Poster and suggested platform cover per film, in seconds: the first frame where the headline
// sits over a real screen, read from 2 fps tiles of the Nov 21 13:00 renders. 1.2 s landed on a
// dark transition card ("Next order…") in the Cutling address film.
const POSTER: Record<string, number> = {};
const posterAt = (film: string) => POSTER[film] ?? 0.5;
const coverLabel = (film: string) => `suggested cover: 0:${posterAt(film).toFixed(1).padStart(4, "0")}`;

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

// ---------- checks ----------
const xLen = (s: string) => s.replace(/\b[\w.-]+\.(com|example)(\/[^\s]*)?/g, "x".repeat(23)).length;
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
  const t = T[img.tpl] ?? T2[img.tpl];
  if (!t) throw new Error("no template " + img.tpl);
  const { app, html } = t(img as any, size);
  const doc = frame(html, size, app).replace("</body>", `${(img as any).overlay ?? ""}</body>`);
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


// ---------- per-platform versions ----------
type Plat = "X" | "Instagram" | "TikTok" | "Threads" | "Facebook" | "YouTube";
const PLATS: Plat[] = ["X", "Instagram", "TikTok", "Threads", "Facebook", "YouTube"];
const HANDLE: Record<Plat, string> = { X: "@monholtco", Instagram: "monholtco", TikTok: "@monholt", Threads: "@monholtco", Facebook: "Monholt (Page)", YouTube: "channel to confirm" };
type Ver = {
  plat: Plat; format: string; title?: string; text?: string;
  follow?: { label: string; text: string; media?: string[] }[];
  poll?: { q: string; options: string[] }; media: string[]; post?: string[]; sticker?: string; notes?: string[];
};
const THREADS_TOPIC = "Tech Threads";
const YT_TAGS = {
  u: { title: "#SafariTips #iPhoneTips", desc: "#iPhoneTips #AdBlocker #PopUps #Undirect" },
  umac: { title: "#SafariTips #MacTips", desc: "#MacTips #AdBlocker #PopUps #Undirect" },
  c: { title: "#iPhoneTips #iPhoneKeyboard", desc: "#iPhoneTips #iPhoneKeyboard #Clipboard #Cutling" },
  cmac: { title: "#MacTips #Clipboard", desc: "#MacTips #Clipboard #ProductivityApps #Cutling" },
  csmb: { title: "#iPhoneTips #SmallBusiness", desc: "#iPhoneTips #iPhoneKeyboard #SmallBusiness #Cutling" },
};
const appOf = (p: Post) => (p.app === "Both" ? "Undirect" : p.app) as "Undirect" | "Cutling";
const tagsOf = (p: Post) => p.tags ?? (appOf(p) === "Undirect" ? "u" : "c");
const firstUse = new Set<string>();

function versions(p: Post, d: string): Ver[] {
  const app = appOf(p), url = URLS[app], tags = TAGS[tagsOf(p)], q = THREADS_Q[p.n];
  const f = (n: string) => join(d, n);
  const film = p.film ? join(FILMS, p.film + ".mp4") : undefined;
  const igImgs = (p.images ?? []).map((_, i) => f(`ig-${i + 1}.png`));
  const ttImgs = (p.images ?? []).map((_, i) => f(`tt-${i + 1}.png`));
  const ttEnd = join(ASSETS, `tt-end-${app}.png`);
  const card = CARD[p.n];
  const body = p.body ?? p.kept?.x?.replace(/\n?\S+\.(com|example)\/\S*/g, "").trim() ?? "";
  const ig = `${body}\n\nLink in bio.\n${tags.ig}`;
  const tt = `${body}\n\nSearch ${p.app === "Both" ? "Undirect or Cutling" : app} on the App Store.\n${tags.tt}`;
  const threads = `${body}\n\n${q}`;
  const fbComment = { label: "First comment (links in comments; Facebook is testing a cap on link posts for Pages)", text: p.app === "Both" ? `Undirect: ${URLS.Undirect}\nCutling: ${URLS.Cutling}` : `${app} on the App Store: ${url}` };
  const xReply = p.reply ? { label: "Our first reply", text: `${p.reply}\n${url}` } : undefined;
  const thReply = { label: "Our first reply", text: p.app === "Both" ? `${URLS.Undirect}\n${URLS.Cutling}` : url };
  const yt = YT_TAGS[tagsOf(p)];
  const ytDesc = `${body}\n\n${p.app === "Both" ? `Undirect: ${URLS.Undirect}\nCutling: ${URLS.Cutling}` : `${app} on the App Store: ${url}`}\n\n${yt.desc}`;
  const ytNote = "Needs the channel confirmed: there is no record of a @monholtco YouTube channel.";
  const out: Ver[] = [];
  const storyFrames = [f("story-1-guide.png"), f("story-2-guide.png")];
  const storyPost = [f("story-1.png"), f("story-2.png")];

  if (p.kind === "film") {
    const trial = !firstUse.has(p.film!); firstUse.add(p.film!);
    out.push({ plat: "X", format: "Video", text: p.body, follow: xReply && [xReply], media: [film!] });
    out.push({ plat: "Instagram", format: trial ? "Trial reel" : "Reel", text: ig, media: [film!],
      notes: trial ? ["First Instagram use of this cut: post as a trial reel set to graduate on performance. Needs 200 followers; below that, post it as a normal Reel."] : undefined });
    out.push({ plat: "TikTok", format: "Video", text: tt, media: [film!] });
    out.push({ plat: "Threads", format: "Video", text: threads, follow: [thReply], media: [film!] });
    out.push({ plat: "Facebook", format: "Reel", text: body, follow: [fbComment], media: [film!] });
    out.push({ plat: "YouTube", format: "Short", title: `${YT_TITLE[p.n]} ${yt.title}`, text: ytDesc, media: [film!], notes: [ytNote] });
  } else if (p.kind === "image" || p.kind === "carousel") {
    const multi = igImgs.length > 1;
    const th = X_THREAD[p.n];
    if (th) out.push({ plat: "X", format: "Thread", text: th[0].text, media: th[0].slide ? [igImgs[th[0].slide - 1]] : [],
      follow: [...th.slice(1).map((t, i) => ({ label: `Post ${i + 2}`, text: t.text, media: t.slide ? [igImgs[t.slide - 1]] : undefined })), { label: `Post ${th.length + 1}`, text: `${p.reply}\n${url}` }] });
    else out.push({ plat: "X", format: "Image", text: p.body, follow: xReply && [xReply], media: igImgs.slice(0, 4) });
    out.push({ plat: "Instagram", format: multi ? "Carousel" : "Single image", text: ig, media: igImgs });
    out.push({ plat: "TikTok", format: "Photo mode", text: tt, media: [...ttImgs, ttEnd], notes: ["Photo set: the post's slides, then the search slide."] });
    out.push({ plat: "Threads", format: multi ? "Carousel" : "Image", text: threads, follow: [thReply], media: igImgs });
    out.push({ plat: "Facebook", format: "Image post", text: body, follow: [fbComment], media: igImgs });
    out.push({ plat: "YouTube", format: "Community post", text: `${body}\n\n${url}`, media: igImgs.slice(0, 1), notes: [ytNote, "Community posts need the channel to have them switched on."] });
  } else if (p.kind === "poll") {
    const pl = p.poll!;
    out.push({ plat: "X", format: "Poll", poll: pl.x, follow: xReply && [xReply], media: [] });
    out.push({ plat: "Instagram", format: `Story, ${pl.ig.sticker.toLowerCase()} sticker`, media: storyFrames, post: storyPost,
      sticker: `${pl.ig.sticker}: "${pl.ig.q}"${pl.ig.options ? ` · ${pl.ig.options.join(" / ")}` : ""}${pl.ig.correct !== undefined ? ` · correct: ${pl.ig.options![pl.ig.correct]}` : ""}${pl.ig.emoji ? ` · ${pl.ig.emoji}` : ""}`,
      notes: [pl.ig.note ?? "", `Frame 2: link sticker to ${url}.`, "The sticker is drawn on the review frames to show where it goes; post the clean frames and add the sticker in the app."].filter(Boolean) });
    const rep = TT_REPLY[p.n];
    if (rep) out.push({ plat: "TikTok", format: "Reply to a comment", text: `${pl.tt.caption}\n${tags.tt}`, media: [f("reply.mp4")],
      notes: [`Post as a video reply to the first comment that asks "${rep.question}". TikTok adds that comment's sticker itself, so none is drawn here.`] });
    else out.push({ plat: "TikTok", format: "Video", text: `${pl.tt.caption}\n${tags.tt}`, media: [pl.tt.cut ? f(`${pl.tt.film}-${pl.tt.cut === "6s" ? "first6s" : "no-endcard"}.mp4`) : join(FILMS, pl.tt.film + ".mp4")],
      poll: pl.tt.options ? { q: pl.tt.q, options: pl.tt.options } : undefined, notes: [`${pl.tt.type}: "${pl.tt.q}"`, pl.tt.note ?? ""].filter(Boolean) });
    out.push({ plat: "Threads", format: "Poll", poll: { q, options: pl.x.options }, follow: [{ label: "Our first reply", text: `${p.reply}\n${url}` }], media: [] });
    out.push({ plat: "Facebook", format: "Story", media: [f("story-1.png"), f("story-2-guide.png")], post: storyPost, notes: ["Same frames as the Instagram Story, posted to the Page from Business Suite; frame 2 carries the link sticker (Business Suite's Story link sticker is unchecked, GUESS)."] });
    out.push({ plat: "YouTube", format: "Community poll", poll: { q, options: pl.x.options }, media: [], notes: [ytNote, "Community polls need the channel to have community posts switched on."] });
  } else {
    // text rows and kept drafts
    const kept = p.kind === "kept";
    const x = kept ? p.kept!.x! : p.body!;
    out.push({ plat: "X", format: "Single post", text: x, follow: kept ? undefined : xReply && [xReply], media: [],
      notes: kept ? [`Text as approved in ${p.kept!.source}.`, ...(p.n === 50 ? ["Then the MacPip boost."] : [])] : undefined });
    const sale = p.kept?.media;
    const storyRow = p.n === 9 || p.n === 26 || p.n === 50;
    if (sale) out.push({ plat: "Instagram", format: "Carousel", text: p.kept!.ig, media: [f("sale-undirect-ig.png"), f("sale-cutling-ig.png")], notes: ["Draft 11."] });
    else if (storyRow) out.push({ plat: "Instagram", format: "Story, link sticker", media: [f("story-1-guide.png")], post: [f("story-1.png")], sticker: `Link: ${url}`, notes: ["The link sticker is drawn on the review frame; post the clean frame and add the sticker in the app."] });
    else out.push({ plat: "Instagram", format: "Single image", text: ig, media: [f("card-ig.png")] });
    out.push({ plat: "TikTok", format: "Photo mode", text: sale ? p.kept!.tt : tt, media: sale ? [f("sale-undirect-tt.png"), f("sale-cutling-tt.png")] : [f("card-tt.png"), ttEnd] });
    out.push({ plat: "Threads", format: sale ? "Carousel" : "Text", text: threads, follow: [thReply], media: sale ? [f("sale-undirect-ig.png"), f("sale-cutling-ig.png")] : [] });
    if (storyRow) out.push({ plat: "Facebook", format: "Story", media: [f("story-1-guide.png")], post: [f("story-1.png")], notes: ["Link sticker to " + url + " (Business Suite's Story link sticker is unchecked, GUESS)."] });
    else out.push({ plat: "Facebook", format: "Image post", text: body, follow: [fbComment], media: sale ? [f("sale-undirect-ig.png"), f("sale-cutling-ig.png")] : [f("card-ig.png")] });
    out.push({ plat: "YouTube", format: "Community post", text: `${body}\n\n${p.app === "Both" ? `${URLS.Undirect}\n${URLS.Cutling}` : url}`, media: sale ? [f("sale-undirect-ig.png")] : [], notes: [ytNote, "Community posts need the channel to have them switched on."] });
  }
  return out;
}

// ---------- checks on every version ----------
function checkVers(p: Post, vs: Ver[]): string[] {
  const out: string[] = [];
  for (const v of vs) {
    const all = [v.title, v.text, v.poll?.q, ...(v.poll?.options ?? []), ...(v.follow ?? []).map((x) => x.text)].filter(Boolean).join("\n");
    if (v.plat === "X") { for (const t of [v.text, ...(v.follow ?? []).map((x) => x.text)]) if (t && xLen(t) > 280) out.push(`X text is ${xLen(t)} characters`); }
    if (v.plat === "Threads") {
      if (v.text && v.text.length > 500) out.push(`Threads post is ${v.text.length} characters`);
      const end = (v.poll?.q ?? v.text ?? "").trim();
      if (!end.endsWith("?")) out.push("Threads post does not end on a question");
    }
    if (v.plat === "YouTube" && v.title && v.title.length > 100) out.push(`YouTube title is ${v.title.length} characters`);
    v.poll?.options.forEach((o) => o.length > 25 && out.push(`${v.plat} poll option "${o}" over 25`));
    if (v.plat === "Instagram" && v.text && (v.text.match(/#/g) ?? []).length > 5) out.push("more than 5 Instagram tags");
    if (v.plat === "TikTok" && v.text) { const n = (v.text.match(/#/g) ?? []).length; if (n < 3 || n > 5) out.push(`${n} TikTok tags`); if (!/Search .* on the App Store\./.test(v.text)) out.push("TikTok caption lacks the search line"); }
    if (p.app === "Cutling" && /\bbank|IBAN/i.test(all)) out.push(`bank details in ${v.plat}`);
    if (p.app === "Cutling" && /clipboard history/i.test(all) && !/Mac/.test(all)) out.push(`clipboard history without Mac on ${v.plat}`);
    if (inSale(p) && p.kind !== "kept" && /\$[0-4]\.99/.test(all)) out.push(`price inside the Black Friday window on ${v.plat}`);
    for (const m of [...v.media, ...(v.post ?? [])]) if (!existsSync(m)) out.push(`${v.plat}: missing file ${m.replace(OUT + "/", "")}`);
  }
  return out;
}

// ---------- new media ----------
async function textCards(browser: Browser, p: Post, d: string) {
  const c = CARD[p.n];
  if (!c) return;
  await render(browser, { tpl: "big", app: c.app, text: c.text, icon: true }, "ig", join(d, "card-ig.png"));
  await render(browser, { tpl: "big", app: c.app, text: c.text, icon: true }, "tt", join(d, "card-tt.png"));
  if (p.n === 9 || p.n === 26 || p.n === 50) {
    const app = c.app, link = sticker({ type: "link", label: p.app === "Both" ? "APP STORE" : app.toUpperCase() });
    await render(browser, { tpl: "big", app, text: c.text, icon: false }, "story", join(d, "story-1.png"));
    await render(browser, { tpl: "big", app, text: c.text, icon: false, overlay: link }, "story", join(d, "story-1-guide.png"));
  }
}

async function storyGuides(browser: Browser, p: Post, d: string) {
  const pl = p.poll!; const app = appOf(p);
  await render(browser, { ...pl.ig.bg, overlay: sticker({ type: pl.ig.sticker, q: pl.ig.q, options: pl.ig.options, correct: pl.ig.correct, emoji: pl.ig.emoji }) }, "story", join(d, "story-1-guide.png"));
  await render(browser, { tpl: "storylink", app, overlay: sticker({ type: "link", label: app.toUpperCase() }) }, "story", join(d, "story-2-guide.png"));
}

async function replyVideo(browser: Browser, p: Post, d: string) {
  const r = TT_REPLY[p.n]; if (!r) return;
  const b = BRAND[appOf(p)];
  const lines = r.answer.map((l, i) => `<div style="font:800 ${i ? 64 : 52}px/1.15 -apple-system,system-ui,sans-serif;margin-top:${i ? 18 : 0}px">${hl(l).replace(/class="hl"/g, `style="background:${b.accent};padding:0 .12em;border-radius:.12em"`)}</div>`).join("");
  const html = `<!doctype html><html><body style="margin:0;width:1080px;height:1920px;background:transparent"><div style="position:absolute;left:90px;right:150px;top:640px;background:rgba(10,10,10,.94);color:#fff;border-radius:44px;padding:54px 56px;box-shadow:0 30px 80px rgba(0,0,0,.5)">${lines}</div></body></html>`;
  const tmp = join(ASSETS, "_reply.html"); writeFileSync(tmp, html);
  const pg = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await pg.goto("file://" + tmp); await pg.screenshot({ path: join(d, "reply-overlay.png"), omitBackground: true }); await pg.close();
  const src = join(FILMS, r.film + ".mp4");
  const t = r.cut === "6s" ? Math.min(6, await endCardAt(src)) : await endCardAt(src);
  await $`ffmpeg -v error -y -i ${src} -i ${join(d, "reply-overlay.png")} -t ${t.toFixed(2)} -filter_complex ${"[0][1]overlay=0:0:enable=gte(t\\,1)"} -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac -movflags +faststart ${join(d, "reply.mp4")}`;
}

// ---------- review copies: what the page shows, small enough to publish ----------
const REVIEW = join(OUT, "review");
const reviewMap = new Map<string, string>();
async function review(abs: string, pidName: string): Promise<string> {
  if (reviewMap.has(abs)) return reviewMap.get(abs)!;
  const isVid = abs.endsWith(".mp4");
  const base = abs.startsWith(FILMS) ? `f/${basename(abs)}` : abs.startsWith(ASSETS) ? `i/${basename(abs).replace(/\.png$/, ".jpg")}`
    : isVid ? `f/${pidName}-${basename(abs)}` : `i/${pidName}-${basename(abs).replace(/\.png$/, ".jpg")}`;
  const to = join(REVIEW, base);
  mkdirSync(join(REVIEW, base.split("/")[0]), { recursive: true });
  const fresh = existsSync(to) && statSync(to).mtimeMs > statSync(abs).mtimeMs;
  if (!fresh) {
    if (isVid) await $`ffmpeg -v error -y -i ${abs} -vf scale=720:1280 -c:v libx264 -b:v 1500k -maxrate 1800k -bufsize 3000k -preset medium -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart ${to}`;
    else await $`ffmpeg -v error -y -i ${abs} -vf scale=720:-2 -q:v 3 ${to}`;
  }
  if (isVid) {
    const film = basename(abs, ".mp4").replace(/-(first6s|no-endcard)$/, "");
    const poster = to.replace(/\.mp4$/, ".jpg");
    if (!existsSync(poster) || statSync(poster).mtimeMs < statSync(to).mtimeMs) await $`ffmpeg -v error -y -ss ${posterAt(film)} -i ${to} -frames:v 1 -q:v 3 ${poster}`;
  }
  reviewMap.set(abs, "review/" + base);
  return "review/" + base;
}

// ---------- page ----------
const esc = (s = "") => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const br = (s = "") => esc(s).replace(/\n/g, "<br>");
type Row = { p: Post; t: ReturnType<typeof times>; vs: (Ver & { rmedia: string[] })[]; issues: string[] };

function pageBody(rows: Row[]) {
  const count = new Map<string, number>();
  for (const r of rows) for (const v of r.vs) { const k = `${v.plat}|${v.format.startsWith("Story") ? "Story" : v.format}`; count.set(k, (count.get(k) ?? 0) + 1); }
  const formatsOf = (pl: Plat) => [...count.entries()].filter(([k]) => k.startsWith(pl + "|")).map(([k, n]) => [k.split("|")[1], n] as const).sort((a, b) => b[1] - a[1]);
  const stickerCount = new Map<string, number>();
  for (const r of rows) for (const v of r.vs) if (v.plat === "Instagram" && v.format.startsWith("Story")) { const s = v.format.replace("Story, ", ""); stickerCount.set(s, (stickerCount.get(s) ?? 0) + 1); }
  const byApp = rows.reduce((a, r) => ((a[r.p.app] = (a[r.p.app] ?? 0) + 1), a), {} as Record<string, number>);
  const gated = rows.filter((r) => r.p.gate).length;
  const failing = rows.filter((r) => r.issues.length).length;

  const mediaHtml = (srcs: string[]) => {
    if (!srcs.length) return "";
    const one = (s: string) => s.endsWith(".mp4")
      ? `<video controls preload="none" playsinline poster="${s.replace(/\.mp4$/, ".jpg")}" src="${s}"></video>`
      : `<img loading="lazy" src="${s}" alt="">`;
    return srcs.length > 1 ? `<div class="slides">${srcs.map(one).join("")}</div><p class="hint">${srcs.length} slides, swipe</p>` : `<div class="one">${one(srcs[0])}</div>`;
  };
  const vcard = (r: Row, v: Row["vs"][0], i: number) => {
    const film = r.p.film ?? (v.plat === "TikTok" ? r.p.poll?.tt.film : undefined);
    const cover = v.rmedia[0]?.endsWith(".mp4") && film ? `<p class="meta strong">${esc(coverLabel(film))}</p>` : "";
    const poll = v.poll ? `<div class="poll"><p class="pq">${esc(v.poll.q)}</p>${v.poll.options.map((o) => `<div class="opt"><span>${esc(o)}</span><small>${o.length}</small></div>`).join("")}</div>` : "";
    return `<section class="pv${i ? " off" : ""}" data-plat="${v.plat}">
      <header class="pvh"><span class="plat p-${v.plat}">${v.plat}</span><span class="fmt">${esc(v.format)}</span><span class="who">${esc(HANDLE[v.plat])}</span></header>
      ${v.title ? `<p class="yt-title">${esc(v.title)} <small>${v.title.length}/100</small></p>` : ""}
      ${v.text ? `<p class="cap">${br(v.text)}</p>` : ""}${poll}
      ${v.plat === "Threads" ? `<p class="meta">Topic: ${THREADS_TOPIC}</p>` : ""}
      ${mediaHtml(v.rmedia)}${cover}
      ${v.sticker ? `<p class="meta">Sticker: ${esc(v.sticker)}</p>` : ""}
      ${(v.follow ?? []).map((x) => `<div class="follow"><p class="fl">${esc(x.label)}</p><p class="cap">${br(x.text)}</p>${x.media ? mediaHtml((x as any).rmedia ?? []) : ""}</div>`).join("")}
      ${(v.notes ?? []).length ? `<ul class="notes">${v.notes!.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>` : ""}
    </section>`;
  };

  let lastDay = "";
  const posts = rows.map((r) => {
    const { p, t } = r;
    const day = t.day !== lastDay ? `<h2 class="day">${t.day}</h2>` : "";
    lastDay = t.day;
    const kind = { film: "Film", image: "Image", carousel: "Carousel", poll: "Poll", text: "Text", kept: "Kept draft" }[p.kind];
    return `${day}<article class="post${p.gate ? " gated" : ""}" id="${pid(p)}" data-app="${p.app}" data-gate="${p.gate ? 1 : 0}">
      <div class="ph"><label class="tick"><input type="checkbox" id="c-${pid(p)}" data-id="${pid(p)}"><b>${pid(p)}</b></label>
        <span class="app a-${p.app}">${p.app}</span><span class="kind">${kind}</span>${p.gate ? `<span class="wait">After 1.0.5</span>` : ""}</div>
      <p class="when"><b>${t.wib.split(" WIB")[0]} WIB</b> · ${esc(t.et)} · ${t.part}</p>
      <p class="pain">${esc(p.pain)}</p>
      ${p.gate ? `<p class="gate">Waiting: ${esc(p.gate)}</p>` : ""}
      ${r.issues.length ? `<p class="gate bad">Check failed: ${esc(r.issues.join("; "))}</p>` : ""}
      ${(p.notes ?? []).length ? `<details class="pn"><summary>Notes</summary><ul>${p.notes!.map((n) => `<li>${esc(n)}</li>`).join("")}</ul></details>` : ""}
      <div class="tabs" role="tablist">${r.vs.map((v, i) => `<button type="button" class="tab${i ? "" : " on"}" data-plat="${v.plat}">${v.plat === "Instagram" ? "IG" : v.plat === "Facebook" ? "FB" : v.plat === "YouTube" ? "YT" : v.plat}</button>`).join("")}</div>
      <div class="pvs">${r.vs.map((v, i) => vcard(r, v, i)).join("")}</div>
    </article>`;
  }).join("");

  const matrix = PLATS.map((pl) => `<tr><th>${pl}</th><td>${formatsOf(pl).map(([f, n]) => `<span class="fc">${esc(f)} <b>${n}</b></span>`).join("")}</td></tr>`).join("");
  return `<title>Monholt social calendar</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap">
<style>
/* Layout: one column of post cards on a phone, a platform switch per post; wide screens show all six versions side by side. */
:root{--bg:#f3f4f2;--card:#ffffff;--ink:#17191a;--mute:#5d6462;--line:#dfe2df;--u:#d92b24;--c:#128f69;--wait:#9a5b00;--waitbg:#fff1d6;--bad:#b3261e;--badbg:#fde7e5;--chip:#eceeeb;
--display:"Space Grotesk",ui-sans-serif,system-ui,sans-serif;--body:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#121413;--card:#1b1e1d;--ink:#eef0ee;--mute:#a3aaa7;--line:#2c312f;--u:#ff5a52;--c:#2fd19f;--wait:#ffbf5c;--waitbg:#36290f;--bad:#ff8a80;--badbg:#3a1714;--chip:#242826;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#121413;--card:#1b1e1d;--ink:#eef0ee;--mute:#a3aaa7;--line:#2c312f;--u:#ff5a52;--c:#2fd19f;--wait:#ffbf5c;--waitbg:#36290f;--bad:#ff8a80;--badbg:#3a1714;--chip:#242826;color-scheme:dark}
*{box-sizing:border-box}
body{background:var(--bg);color:var(--ink);font:15px/1.5 var(--body);padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:16px 80px}
.wrap{max-width:1240px;margin:0 auto}
h1{font:700 26px/1.15 var(--display);margin:4px 0 6px;text-wrap:balance}
.lead{color:var(--mute);margin:0 0 12px}
.warn{background:var(--waitbg);color:var(--wait);border-radius:12px;padding:10px 12px;margin:0 0 12px;font-weight:600}
.sum{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:12px;margin-bottom:12px}
.sum h3{font:600 13px var(--body);text-transform:uppercase;letter-spacing:.06em;color:var(--mute);margin:0 0 8px}
.tw{overflow-x:auto}table{border-collapse:collapse;width:100%}th{text-align:left;font-weight:600;padding:6px 10px 6px 0;vertical-align:top;white-space:nowrap}td{padding:6px 0}
.fc{display:inline-block;background:var(--chip);border-radius:999px;padding:2px 10px;margin:2px 4px 2px 0;font-size:13px;white-space:nowrap}
.fc b{font-variant-numeric:tabular-nums}
.bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:12px 0}
.bar button,.bar select{font:inherit;padding:8px 12px;border-radius:10px;border:1px solid var(--line);background:var(--card);color:var(--ink);min-height:40px}
.bar .go{background:var(--ink);color:var(--bg);border-color:var(--ink);font-weight:600}
button:focus-visible,select:focus-visible,input:focus-visible{outline:3px solid var(--c);outline-offset:2px}
#out{width:100%;font:13px ui-monospace,monospace;padding:8px;border-radius:10px;border:1px solid var(--line);background:var(--card);color:var(--ink)}
.count{color:var(--mute);font-size:13px}
.day{font:700 19px var(--display);margin:26px 0 10px;position:sticky;top:env(safe-area-inset-top,0px);background:var(--bg);padding:6px 0;z-index:2}
.post{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:14px;margin-bottom:14px;min-width:0}
.post.gated{border:2px solid var(--wait)}
.ph{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.tick{display:flex;gap:8px;align-items:center;cursor:pointer;font:700 18px var(--display)}.tick input{width:24px;height:24px}
.app,.kind,.wait{font-size:12px;border-radius:999px;padding:2px 10px;border:1px solid var(--line)}
.a-Undirect{background:var(--u);color:#fff;border-color:var(--u)}.a-Cutling{background:var(--c);color:#fff;border-color:var(--c)}.a-Both{background:var(--ink);color:var(--bg)}
.wait{background:var(--waitbg);color:var(--wait);border-color:var(--wait)}
.when{margin:6px 0 0;font-size:13px;color:var(--mute);font-variant-numeric:tabular-nums}.pain{margin:2px 0 6px;font-size:13px;color:var(--mute)}
.gate{background:var(--waitbg);color:var(--wait);border-radius:10px;padding:6px 10px;font-size:13px;margin:6px 0}.gate.bad{background:var(--badbg);color:var(--bad)}
.pn{font-size:13px;color:var(--mute);margin:4px 0 8px}.pn ul{margin:4px 0;padding-left:18px}
.tabs{display:flex;gap:4px;overflow-x:auto;margin:8px 0 10px;padding-bottom:2px}
.tab{font:600 13px var(--body);padding:7px 12px;border-radius:999px;border:1px solid var(--line);background:transparent;color:var(--ink);white-space:nowrap;min-height:36px}
.tab.on{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.pvs{display:grid;gap:14px}.pv{min-width:0}.pv.off{display:none}
.pvh{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:6px}
.plat{font:700 12px var(--body);text-transform:uppercase;letter-spacing:.06em}.fmt{font-size:12px;background:var(--chip);border-radius:999px;padding:2px 9px}.who{font-size:12px;color:var(--mute)}
.yt-title{font-weight:700;margin:4px 0}.yt-title small{color:var(--mute);font-weight:400}
.cap{margin:6px 0;overflow-wrap:anywhere}
.meta{font-size:12px;color:var(--mute);margin:4px 0}.meta.strong{color:var(--ink);font-weight:600}
.one,.slides{max-width:380px}
.one img,.one video,.slides img,.slides video{display:block;width:100%;max-width:100%;border-radius:12px;background:#000;height:auto}
video{aspect-ratio:9/16}
.slides{display:flex;gap:6px;overflow-x:auto;scroll-snap-type:x mandatory}.slides>*{flex:0 0 100%;scroll-snap-align:start}
.hint{font-size:12px;color:var(--mute);margin:4px 0}
.poll{margin:6px 0;max-width:380px}.pq{font-weight:600;margin:0 0 6px}.opt{display:flex;justify-content:space-between;border:1.5px solid var(--c);color:var(--ink);border-radius:999px;padding:6px 14px;margin:5px 0}.opt small{color:var(--mute)}
.follow{border-left:3px solid var(--line);padding-left:10px;margin:10px 0}.fl{font-size:12px;color:var(--mute);margin:0}
.notes{font-size:12.5px;color:var(--mute);padding-left:18px;margin:6px 0}
@media (min-width:1100px){.tabs{display:none}.pvs{grid-template-columns:repeat(3,minmax(0,1fr))}.pv.off{display:block}.pv{border-top:1px solid var(--line);padding-top:10px}}
@media (prefers-reduced-motion:reduce){*{scroll-behavior:auto}}
</style>
<div class="wrap">
<h1>Monholt social calendar</h1>
<p class="lead">@monholtco, Sun Nov 22 to Sun Dec 20 2026: ${rows.length} posts, each in a finished version for X, Instagram, TikTok, Threads, Facebook and YouTube. Times in WIB with US Eastern beside them.</p>
<p class="warn">YouTube: needs the channel confirmed. There is no record of a @monholtco YouTube channel, so every YouTube version waits on that.</p>
<div class="sum"><h3>Formats per platform</h3><div class="tw"><table>${matrix}</table></div>
<h3 style="margin-top:10px">Instagram Story stickers</h3><div>${[...stickerCount.entries()].map(([k, n]) => `<span class="fc">${esc(k)} <b>${n}</b></span>`).join("")}</div>
<h3 style="margin-top:10px">Posts</h3><div>${Object.entries(byApp).map(([k, n]) => `<span class="fc">${k} <b>${n}</b></span>`).join("")}<span class="fc">Ready <b>${rows.length - gated}</b></span><span class="fc">Waiting on 1.0.5 <b>${gated}</b></span><span class="fc">Check failed <b>${failing}</b></span></div></div>
<div class="bar"><button type="button" class="go" id="copy">Copy my go</button><button type="button" id="all">Tick all ready</button><button type="button" id="none">Clear</button>
<label for="pf" class="count">Show</label><select id="pf"><option value="">First platform</option>${PLATS.map((p) => `<option>${p}</option>`).join("")}</select>
<select id="f" aria-label="Filter posts"><option value="">All posts</option><option value="Undirect">Undirect</option><option value="Cutling">Cutling</option><option value="gate">Waiting on 1.0.5</option></select>
<span id="n" class="count"></span></div>
<textarea id="out" rows="3" readonly hidden></textarea>
${posts}
</div>
<script>
(function(){
var K="monholt-cal-v2",s={};try{s=JSON.parse(localStorage.getItem(K)||"{}")}catch(e){}
var boxes=[].slice.call(document.querySelectorAll("input[data-id]"));
function save(){try{localStorage.setItem(K,JSON.stringify(s))}catch(e){}document.getElementById("n").textContent=boxes.filter(function(b){return b.checked}).length+" of "+boxes.length+" ticked"}
boxes.forEach(function(b){b.checked=!!s[b.dataset.id];b.addEventListener("change",function(){s[b.dataset.id]=b.checked;save()})});save();
document.getElementById("all").addEventListener("click",function(){boxes.forEach(function(b){if(b.closest(".post").dataset.gate==="0"){b.checked=true;s[b.dataset.id]=true}});save()});
document.getElementById("none").addEventListener("click",function(){boxes.forEach(function(b){b.checked=false;s[b.dataset.id]=false});save()});
document.getElementById("copy").addEventListener("click",function(){var ids=boxes.filter(function(b){return b.checked}).map(function(b){return b.dataset.id});var o=document.getElementById("out");o.hidden=false;o.value="Go: "+(ids.join(", ")||"none");o.select();try{navigator.clipboard.writeText(o.value).catch(function(){})}catch(e){}});
function show(post,plat){var tabs=post.querySelectorAll(".tab"),pvs=post.querySelectorAll(".pv");for(var i=0;i<pvs.length;i++){var on=pvs[i].dataset.plat===plat;pvs[i].classList.toggle("off",!on);tabs[i].classList.toggle("on",on)}}
document.addEventListener("click",function(e){var t=e.target.closest&&e.target.closest(".tab");if(t)show(t.closest(".post"),t.dataset.plat)});
document.getElementById("pf").addEventListener("change",function(e){var v=e.target.value||"X";[].forEach.call(document.querySelectorAll(".post"),function(p){show(p,v)});try{localStorage.setItem(K+"-plat",v)}catch(x){}});
try{var lp=localStorage.getItem(K+"-plat");if(lp){document.getElementById("pf").value=lp;[].forEach.call(document.querySelectorAll(".post"),function(p){show(p,lp)})}}catch(e){}
document.getElementById("f").addEventListener("change",function(e){var v=e.target.value;[].forEach.call(document.querySelectorAll(".post"),function(p){p.hidden=!!v&&!(p.dataset.app===v||(v==="gate"&&p.dataset.gate==="1"))})});
})();
</script>`;
}

// ---------- main ----------
async function main() {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch(existsSync(join(HOME, "Library/Caches/ms-playwright/chromium_headless_shell-1255")) && !process.env.PW_OWN
    ? { executablePath: join(HOME, "Library/Caches/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-mac-arm64/chrome-headless-shell") } : {});
  if (!only) {
    await prepareAssets(browser);
    for (const app of ["Undirect", "Cutling"] as const) await render(browser, { tpl: "ttend", app }, "tt", join(ASSETS, `tt-end-${app}.png`));
  }
  const rows: Row[] = [];
  const allText: string[] = [];
  const firstLines = new Map<string, number>(), replies = new Map<string, number>();
  for (const p of posts) {
    const d = dir(p); mkdirSync(d, { recursive: true });
    if (!only) {
      if (p.images) for (const [i, img] of p.images.entries()) { await render(browser, img, "ig", join(d, `ig-${i + 1}.png`)); await render(browser, img, "tt", join(d, `tt-${i + 1}.png`)); }
      if (p.poll) {
        await render(browser, p.poll.ig.bg, "story", join(d, "story-1.png"));
        await render(browser, { tpl: "storylink", app: appOf(p) }, "story", join(d, "story-2.png"));
        await storyGuides(browser, p, d);
        const tt = p.poll.tt;
        if (tt.cut) await cutFilm(tt.film, tt.cut, join(d, `${tt.film}-${tt.cut === "6s" ? "first6s" : "no-endcard"}.mp4`));
        await replyVideo(browser, p, d);
      }
      if (p.kept?.media) for (const f of p.kept.media) copyFileSync(join(SOCIAL, f), join(d, f));
      await textCards(browser, p, d);
    }
    const vs = versions(p, d);
    const issues = checkVers(p, vs);
    if (p.reply) { if (replies.has(p.reply)) issues.push(`X reply repeats P${pad(replies.get(p.reply)!)}`); replies.set(p.reply, p.n); }
    if (p.body) { const fl = p.body.split("\n")[0]; if (firstLines.has(fl)) issues.push(`first line repeats P${pad(firstLines.get(fl)!)}`); firstLines.set(fl, p.n); }
    const rvs = [];
    for (const v of vs) {
      const rmedia = []; for (const m of v.media) if (existsSync(m)) rmedia.push(await review(m, pid(p)));
      for (const fo of v.follow ?? []) if (fo.media) { const r = []; for (const m of fo.media) if (existsSync(m)) r.push(await review(m, pid(p))); (fo as any).rmedia = r; }
      rvs.push({ ...v, rmedia });
    }
    const t = times(p);
    rows.push({ p, t, vs: rvs, issues });
    const txt = [`${pid(p)} · ${t.wib} · ${t.et} · ${p.app} · ${p.kind}${p.gate ? " · WAITING: " + p.gate : ""}`, "",
      ...vs.map((v) => [`== ${v.plat}: ${v.format} ==`, v.title ? `Title: ${v.title}` : "", v.text ?? "", v.poll ? `Poll: ${v.poll.q}\n${v.poll.options.map((o) => "- " + o).join("\n")}` : "",
        v.plat === "Threads" ? `Topic: ${THREADS_TOPIC}` : "", v.sticker ? `Sticker: ${v.sticker}` : "",
        ...(v.follow ?? []).map((x) => `${x.label}:\n${x.text}`), `Media: ${(v.post ?? v.media).map((m) => m.replace(OUT + "/", "")).join(", ") || "none"}`,
        ...(v.notes ?? []).map((n) => `Note: ${n}`)].filter(Boolean).join("\n") + "\n")].join("\n");
    writeFileSync(join(d, "captions.txt"), txt + "\n");
    if (p.kind !== "kept") for (const s of [p.body, p.reply, p.poll?.tt.caption.split("\n\nSearch")[0], THREADS_Q[p.n], YT_TITLE[p.n], ...(X_THREAD[p.n] ?? []).map((x) => x.text)]) if (s) allText.push(s.replace(/\n+/g, " "));
    if (issues.length) console.log(pid(p), issues.join("; "));
  }
  await browser.close();
  const body = pageBody(rows);
  writeFileSync(join(OUT, "artifact.html"), body);
  writeFileSync(join(OUT, "index.html"), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>${body}</body></html>`);
  writeFileSync(join(HERE, "captions.txt"), allText.join("\n") + "\n");
  writeFileSync(join(HERE, "calendar-final.txt"), posts.map((p) => readFileSync(join(dir(p), "captions.txt"), "utf8")).join("\n" + "-".repeat(60) + "\n\n"));
  const counts = new Map<string, number>(); for (const r of rows) for (const v of r.vs) counts.set(`${v.plat}: ${v.format}`, (counts.get(`${v.plat}: ${v.format}`) ?? 0) + 1);
  console.log([...counts.entries()].sort().map(([k, n]) => `${k} ${n}`).join("\n"));
  console.log(`review files: ${reviewMap.size}`);
  console.log(`built ${rows.length} posts → ${join(OUT, "index.html")} and artifact.html`);
}

await main();
