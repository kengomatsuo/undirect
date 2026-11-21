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
import { allSlots, LOCAL, HELP_OVR, PROMISES, type Slot, type SPlat } from "./schedule";
import { JA, ID, AR, ZH, EN_HELP, LOCAL_FILMS, type LangUnit, type Lang } from "./lang-posts";

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
const POSTER: Record<string, number> = { "explainer-ja-portrait": 18, "explainer-id-portrait": 18, iphone: 1 };
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
  const base = abs.startsWith(FILMS) || abs.includes("/Repositories/") ? `f/${basename(abs).replace(/^(explainer|iphone)/, (m) => (abs.includes("undirect-promo") ? "undirect-id-preview" : abs.includes("explainer-") ? m : m))}` : abs.startsWith(ASSETS) ? `i/${basename(abs).replace(/\.png$/, ".jpg")}`
    : isVid ? `f/${pidName}-${basename(abs)}` : `i/${pidName}-${basename(abs).replace(/\.png$/, ".jpg")}`;
  const to = join(REVIEW, base);
  mkdirSync(join(REVIEW, base.split("/")[0]), { recursive: true });
  const fresh = existsSync(to) && statSync(to).mtimeMs > statSync(abs).mtimeMs;
  if (!fresh) {
    if (isVid) {
      // ~1.5 Mbps, lower for long films so every review copy stays near 11 MB; letterbox, never stretch.
      const dur = Number((await $`ffprobe -v error -show_entries format=duration -of csv=p=0 ${abs}`.text()).trim());
      const kb = Math.max(500, Math.min(1500, Math.floor((11e6 * 8) / dur / 1000) - 96));
      const vf = "scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2:black";
      await $`ffmpeg -v error -y -i ${abs} -vf ${vf} -c:v libx264 -b:v ${kb}k -maxrate ${Math.round(kb * 1.2)}k -bufsize ${kb * 2}k -preset medium -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart ${to}`;
    }
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

// ---------- deliveries: every post on its platform's slot ----------
const APP_ID = { Undirect: "6810513194", Cutling: "6759476314" } as const;
const PCODE: Record<string, string> = { X: "x", Threads: "th", Instagram: "ig", Facebook: "fb", TikTok: "tt", YouTube: "yt" };
const storeLink = (app: "Undirect" | "Cutling", plat: string, lang: Lang) => `https://apps.apple.com/app/apple-store/id${APP_ID[app]}?pt=127609326&ct=${PCODE[plat]}-${lang}&mt=8`;
const LTAGS = {
  ja: { Undirect: { ig: "#iPhone便利機能 #広告ブロック #スマホ便利機能 #Safari", tt: "#iPhone便利機能 #広告ブロック #スマホ便利機能", ytT: "#iPhone便利機能 #広告ブロック", ytD: "#iPhone便利機能 #広告ブロック #スマホ便利機能 #Undirect" },
        Cutling: { ig: "#iPhone便利機能 #ユーザー辞書 #仕事効率化 #キーボードアプリ", tt: "#iPhone便利機能 #ユーザー辞書 #仕事効率化", ytT: "#iPhone便利機能 #ユーザー辞書", ytD: "#iPhone便利機能 #ユーザー辞書 #仕事効率化 #Cutling" } },
  zh: { Undirect: { ig: "#iPhone技巧 #iPhone #Safari #廣告", tt: "#iPhone技巧 #iPhone #Safari", ytT: "#iPhone技巧", ytD: "#iPhone技巧 #iPhone #Undirect" },
        Cutling: { ig: "#iPhone技巧 #iPhone #鍵盤 #效率", tt: "#iPhone技巧 #iPhone #鍵盤", ytT: "#iPhone技巧", ytD: "#iPhone技巧 #iPhone #Cutling" } },
  id: { Undirect: { ig: "#TipsiPhone #BlokirIklan #iPhoneIndonesia #Safari", tt: "#TipsiPhone #BlokirIklan #iPhoneIndonesia", ytT: "#TipsiPhone #BlokirIklan", ytD: "#TipsiPhone #BlokirIklan #iPhoneIndonesia #Undirect" },
        Cutling: { ig: "#TipsiPhone #TutorialiPhone #iPhoneIndonesia #KeyboardiPhone", tt: "#TipsiPhone #TutorialiPhone #iPhoneIndonesia", ytT: "#TipsiPhone #TutorialiPhone", ytD: "#TipsiPhone #TutorialiPhone #iPhoneIndonesia #Cutling" } },
};
const SEARCH = { ja: (a: string) => `App Storeで「${a}」と検索してください。`, id: (a: string) => `Cari ${a} di App Store.`, en: (a: string) => `Search ${a} on the App Store.` } as const;
const BIO = { ja: "リンクはプロフィールから。", id: "Link di bio.", en: "Link in bio.", zh: "連結在個人檔案。" } as const;
const FIRST_COMMENT = { ja: "最初のコメント", id: "Komentar pertama", en: "First comment" } as const;
const filmPath = (f: string) => (LOCAL_FILMS[f] ? join(HOME, LOCAL_FILMS[f]) : join(FILMS, f + ".mp4"));

type Del = {
  key: string; id: string; lang: Lang; plat: SPlat; t: number; arm: string; why: string; app: string; kind: string;
  region?: "eu"; vers: (Ver & { rmedia?: string[] })[]; help: boolean; status: string[]; tests: string[]; gate?: string; film?: string; p?: Post; unit?: LangUnit;
};

function unitVersions(u: LangUnit, plat: SPlat): Ver[] {
  const link = (pl: string) => storeLink(u.app, pl, u.lang);
  const film = u.film ? filmPath(u.film) : undefined;
  const media = film ? [film] : [];
  const localNote = u.film && !LOCAL_FILMS[u.film] && u.lang !== "en" ? ["English on-screen text under a native caption: no localized cut of this film exists."] : u.film && LOCAL_FILMS[u.film] ? ["The film carries this language on screen."] : [];
  const bankNote = u.film?.startsWith("cut-") ? ["The explainer shows a bank-account example on screen (the owner's own explainer); the caption does not lead with it."] : [];
  const notes = [...localNote, ...bankNote];
  const out: Ver[] = [];
  const tags = u.lang === "ja" || u.lang === "id" || u.lang === "zh" ? LTAGS[u.lang][u.app] : undefined;
  if (plat === "X") out.push({ plat: "X", format: film ? "Video" : "Single post", text: u.help ? u.text : `${u.text}\n${link("X")}`, media, notes });
  if (plat === "Threads") out.push({ plat: "Threads", format: film ? "Video" : "Text", text: `${u.text}\n\n${u.q ?? ""}`.trim(), follow: u.help ? undefined : [{ label: "Our first reply", text: link("Threads") }], media, notes });
  if ((plat === "Instagram" || plat === "IG+FB") && tags) out.push({ plat: "Instagram", format: "Reel", text: `${u.text}\n\n${BIO[u.lang as "ja"]}\n${tags.ig}`, media, notes });
  if (plat === "IG+FB") out.push({ plat: "Facebook", format: "Reel", text: u.text, follow: [{ label: FIRST_COMMENT[u.lang as "ja"] ?? "First comment", text: link("Facebook") }], media, notes });
  if (plat === "TikTok" && tags) out.push({ plat: "TikTok", format: "Video", text: `${u.text}\n\n${SEARCH[u.lang as "ja"](u.app)}\n${tags.tt}`, media, notes });
  if (plat === "YouTube" && tags) out.push({ plat: "YouTube", format: "Short", title: `${u.yt} ${tags.ytT}`, text: `${u.text}\n\n${u.app}: ${link("YouTube")}\n\n${tags.ytD}`, media, notes: [...notes, "Needs the channel confirmed: the earlier Shorts went to @matsuokengo; there is no record of a @monholtco channel."] });
  return out;
}

function enVersions(p: Post, plat: SPlat, d: string): Ver[] {
  let vs = versions(p, d);
  const h = HELP_OVR[p.n];
  if (h) vs = vs.map((v) => {
    const nv: Ver = { ...v, notes: [...(v.notes ?? [])] };
    if (h.body && nv.text && p.body && nv.text.includes(p.body)) nv.text = nv.text.replace(p.body, h.body);
    if (h.body && nv.plat === "X" && nv.format !== "Thread") nv.text = h.body;
    if (h.slides) { nv.media = nv.media.slice(0, nv.plat === "TikTok" ? h.slides : h.slides); if (nv.follow) nv.follow = nv.follow.filter((f) => !/Undirect|Cutling|\.com/.test(f.text)); }
    if (h.image) nv.media = nv.media.map((m) => (m.endsWith("ig-1.png") ? join(d, h.image!) : m.endsWith("tt-1.png") ? join(d, h.image!.replace("ig", "tt")) : m));
    if (h.reply) nv.follow = [{ label: "Our first reply", text: h.reply }];
    else if (h.dropReply) nv.follow = undefined;
    if (nv.plat === "Facebook") nv.follow = h.reply ? [{ label: "First comment", text: h.reply }] : undefined;
    if (nv.plat === "Instagram" && h.storyOne && nv.media.length > 1) { nv.media = nv.media.slice(0, 1); nv.post = nv.post?.slice(0, 1); nv.notes = ["Frame 1 only: no link frame, since this post helps without a pitch."]; }
    if (nv.text) nv.text = nv.text.replace(/\n\nSearch (Undirect|Cutling) on the App Store\./, "");
    if (nv.plat === "TikTok" && nv.media.length > 1 && !nv.media[0].endsWith(".mp4")) nv.media = nv.media.filter((m) => !m.includes("tt-end-"));
    return nv;
  });
  const want = plat === "IG+FB" ? ["Instagram", "Facebook"] : [plat];
  let out = vs.filter((v) => want.includes(v.plat));
  if (p.gate && (plat === "X" || plat === "Threads")) out = out.map((v) => ({ ...v, format: "Image", media: [join(d, "event-ig.png")], notes: ["Still: the owner's 1.0.5 event art (path-traced stone on the red sweep), with our own line on it, in place of the film.", "Event text pending the owner's pick: nothing here quotes the event's name line or description.", "A new render in this style for the iPhone scroll scene would help here (Fable, studio-render)."] }));
  if (p.gate) out = out.map((v) => ({ ...v, notes: [...(v.notes ?? []).filter((n) => !n.startsWith("Event text")), "Event text pending the owner's pick."] }));
  return out;
}

const fitEN = (kind: string, plat: SPlat, n?: number): boolean => {
  if (plat === "Instagram") return fitEN(kind, "IG+FB", n) && kind !== "text";
  if (plat === "YouTube") return kind === "film";
  if (plat === "X") return true;
  if (plat === "Threads") return true;
  if (plat === "IG+FB") return kind !== "help-unit" && !(kind === "text") && !(kind === "kept" && ![9, 17, 26, 50].includes(n ?? 0)) || kind === "text";
  if (plat === "TikTok") return ["film", "image", "carousel", "poll", "text"].includes(kind) || (kind === "kept" && n === 17);
  return false;
};
const PREF: Record<string, SPlat[]> = {
  film: ["TikTok", "IG+FB", "YouTube", "X", "Threads"], image: ["IG+FB", "X", "Threads", "TikTok"], carousel: ["IG+FB", "X", "Threads", "TikTok"],
  poll: ["X", "Threads", "IG+FB"], text: ["X", "Threads"], kept: ["IG+FB", "Threads", "TikTok"], "help-unit": ["X", "Threads"],
};
const day = (iso: string) => new Date(iso + "T00:00:00Z").getTime();
const wibOf = (t: number) => new Date(t).toISOString().slice(11, 16);

function schedule(): Del[] {
  const slots = allSlots();
  const used = new Set<Slot>();
  const dels: Del[] = [];
  const onPlat = new Map<string, Set<SPlat>>();
  type Item = { id: string; date: string; kind: string; p?: Post; u?: LangUnit; help: boolean };
  const items: Item[] = posts.filter((p) => p.kind !== "kept" || [9, 17, 26, 50].includes(p.n)).map((p) => ({ id: pid(p), date: p.date, kind: p.kind, p, help: !!HELP_OVR[p.n] }));
  EN_HELP.forEach((u, i) => items.push({ id: u.id, date: new Date(day("2026-11-23") + Math.round((i * 26) / EN_HELP.length) * 86400000).toISOString().slice(0, 10), kind: "help-unit", u, help: true }));
  items.sort((a, b) => a.date.localeCompare(b.date));
  const en = slots.filter((s) => s.lang === "en");
  const ig = (p: SPlat): SPlat => (p === "Instagram" ? "IG+FB" : p);
  const take = (it: Item, s: Slot) => { used.add(s); (onPlat.get(it.id) ?? onPlat.set(it.id, new Set()).get(it.id)!).add(ig(s.plat)); dels.push(mk(it, s)); };
  const mk = (it: Item, s: Slot): Del => ({ key: `${it.id}-${s.plat}-${s.t}`, id: it.id, lang: "en", region: s.region, plat: s.plat, t: s.t, arm: s.arm, why: s.why, app: it.p?.app ?? it.u!.app, kind: it.kind, vers: [], help: it.help, status: [], tests: [], gate: it.p?.gate, film: it.p?.film, p: it.p, unit: it.u });
  // KEPT drafts keep their own X times, moved to the quarter hour.
  const KEPT_X: Record<number, string> = { 9: "2026-11-24T15:00", 17: "2026-11-27T07:15", 26: "2026-11-30T11:15", 50: "2026-12-08T07:15" };
  for (const p of posts.filter((p) => p.kind === "kept")) {
    const t = new Date(KEPT_X[p.n] + ":00Z").getTime();
    const it = items.find((i) => i.p === p)!;
    dels.push({ ...mk(it, { lang: "en", plat: "X", date: p.date, time: wibOf(t), t, arm: "kept", why: "Kept draft at its own time (moved to X's quarter hour)" } as Slot) });
    (onPlat.get(it.id) ?? onPlat.set(it.id, new Set()).get(it.id)!).add("X");
  }
  // Pass 1: every post gets one platform near its approved day.
  for (const [lo, hi] of [[-1, 4], [-3, 8], [-10, 28]]) for (const it of items) {
    if (it.kind === "kept" || onPlat.has(it.id)) continue;
    const d0 = day(it.date);
    // Spread the native formats: some polls go to an Instagram and Facebook Story first, the two
    // reply videos to TikTok, and a third of the image posts to TikTok photo mode.
    const n = it.p?.n ?? 0;
    const pref: SPlat[] = it.p && TT_REPLY[n] ? ["TikTok", "X", "Threads"] : it.kind === "poll" && n % 2 === 0 ? ["IG+FB", "X", "Threads"]
      : (it.kind === "image" || it.kind === "carousel") && n % 3 === 0 ? ["TikTok", "IG+FB", "X", "Threads"] : PREF[it.kind];
    for (const pl of pref) {
      const s = en.find((s) => !used.has(s) && s.plat === pl && fitEN(it.kind, pl, it.p?.n) && day(s.date) >= d0 + lo * 86400000 && day(s.date) <= d0 + hi * 86400000);
      if (s) { take(it, s); break; }
    }
  }
  for (const it of items) if (!onPlat.has(it.id)) console.warn("no English slot for", it.id);
  // Pass 2: fill the remaining English slots with more platforms for nearby posts; help posts first
  // on X and Threads, so 3 in 10 help a stranger.
  for (const s of en.filter((s) => !used.has(s))) {
    const cands = items.filter((it) => fitEN(it.kind, s.plat, it.p?.n) && !(onPlat.get(it.id)?.has(ig(s.plat))) && Math.abs(day(it.date) - day(s.date)) <= 6 * 86400000 && !(s.plat === "IG+FB" && it.kind === "help-unit"));
    // Keep every native format in use: Stories on Instagram and Facebook, photo mode and reply
    // videos on TikTok, until each has a few posts.
    const fmtN = (k: string[]) => dels.filter((x) => x.plat === s.plat && k.includes(x.kind)).length;
    const bonus = (it: Item) => (s.plat === "IG+FB" && it.kind === "poll" && fmtN(["poll"]) < 5 ? 2 : 0) + (s.plat === "TikTok" && ["image", "carousel"].includes(it.kind) && fmtN(["image", "carousel"]) < 5 ? 2 : 0)
      + (s.plat === "TikTok" && it.p && TT_REPLY[it.p.n] ? 3 : 0) + (s.plat === "Threads" && it.kind === "poll" && fmtN(["poll"]) < 6 ? 1 : 0);
    cands.sort((a, b) => bonus(b) - bonus(a) || (Number(b.help) - Number(a.help)) * ((s.plat === "X" || s.plat === "Threads") ? 1 : 0) || (onPlat.get(a.id)?.size ?? 0) - (onPlat.get(b.id)?.size ?? 0) || Math.abs(day(a.date) - day(s.date)) - Math.abs(day(b.date) - day(s.date)));
    if (cands[0]) take(cands[0], s);
  }
  // Language tracks: units in order, each once per platform.
  const lang = (L: LangUnit[], lg: Lang) => {
    const byPlat = new Map<SPlat, number>();
    for (const s of slots.filter((s) => s.lang === lg)) {
      const pool = L.filter((u) => (s.plat === "X" || s.plat === "Threads" ? true : !!u.film) && (lg !== "ar" || (s.date >= "2026-11-27" && s.date <= "2026-11-30") === !!u.sale));
      const used2 = dels.filter((x) => x.lang === lg && x.plat === s.plat).map((x) => x.id);
      const offset = { X: 0, Threads: 3, Instagram: 1, "IG+FB": 0, TikTok: 0, YouTube: 2 }[s.plat] ?? 0;
      const order = [...pool.slice(offset % Math.max(pool.length, 1)), ...pool.slice(0, offset % Math.max(pool.length, 1))];
      const ok = (u: LangUnit) => !used2.includes(u.id) && (s.plat !== "Threads" || !!u.q || lg !== "ja");
      const u = (s.plat === "Threads" ? order.find((u) => ok(u) && u.help) : undefined) ?? order.find(ok);
      if (!u) { console.warn("no unit for", lg, s.plat, s.date); continue; }
      byPlat.set(s.plat, (byPlat.get(s.plat) ?? 0) + 1);
      dels.push({ key: `${u.id}-${s.plat}-${s.t}`, id: u.id, lang: lg, plat: s.plat, t: s.t, arm: s.arm, why: s.why, app: u.app, kind: u.film ? "film" : "text", vers: [], help: !!u.help, status: ["New"], tests: [], film: u.film, unit: u });
    }
  };
  lang(JA, "ja"); lang(ID, "id"); lang(AR, "ar"); lang(ZH, "zh");
  return dels.sort((a, b) => a.t - b.t);
}

function addTests(dels: Del[]) {
  const wk = (t: number) => Math.floor((t - day("2026-11-22")) / (7 * 86400000));
  const igFirst = new Set<string>();
  for (const d of dels) {
    const track = `${d.lang.toUpperCase()}${d.region ? " Europe" : ""} ${d.plat}`;
    const read = d.plat === "X" || d.plat === "Threads" ? "replies, profile visits and App Store taps (ct) at 48 h" : "median views, 3-second hold, average watch time and App Store taps (ct) at 48 h";
    if (d.arm === "sale") d.tests.push(`T5 Arabic on X, sale arm: ct=x-ar taps against the two weekly Arabic arms; stop if under 1 tap a week after 3 weeks.`);
    else if (d.arm !== "kept") {
      const pair = dels.find((o) => o !== d && o.lang === d.lang && o.plat === d.plat && o.arm !== d.arm && o.arm !== "kept" && o.arm !== "sale" && wk(o.t) === wk(d.t) && o.kind === d.kind)
        ?? dels.find((o) => o !== d && o.lang === d.lang && o.plat === d.plat && o.arm !== d.arm && o.arm !== "kept" && o.arm !== "sale" && Math.abs(o.t - d.t) < 7 * 86400000);
      d.tests.push(`T1 time, ${track} arm ${d.arm} (${d.why}).` + (pair ? ` Paired with ${pair.id} at arm ${pair.arm}, ${fmtWhen(pair.t)}.` : " No other-arm post of this kind this week; pairs with the next one.") + ` Read: ${read}; a slot wins at 7 of 8 pairs.`);
    }
    if (d.lang === "zh") d.tests.push("T6 Taiwan trial: ct=th-zh taps over four weeks; stop if none, keep if taps beat the Japanese Threads track per post.");
    if (d.region) d.tests.push("T7 Europe: the same English post at a European evening slot; read ct taps from European storefronts in App Store Connect against the US slot of the same post.");
    if (d.lang === "ar" && d.arm !== "sale") d.tests.push("T5 Arabic on X: ct=x-ar taps; stop if under 1 tap a week after 3 weeks (GUESS threshold).");
    const ig = d.vers.find((v) => v.plat === "Instagram" && v.media[0]?.endsWith(".mp4"));
    if (ig) {
      const f = basename(ig.media[0], ".mp4"); const k = `${d.lang}-${f}`;
      if (!igFirst.has(k)) { igFirst.add(k); const pr = PROMISES[f];
        ig.format = "Reel (trial reels if 1,000+ followers)";
        d.tests.push(`T2 hook on Instagram: if @monholtco has 1,000+ followers, post this film as three trial reels the same day${pr ? `, one per promise: "${pr[0]}" (claim), "${pr[1]}" (hook), "${pr[2]}" (number)` : ""}; keep the one with the best 3-second hold and average watch time, then saves and shares. Under 1,000 followers (trial reels need 1,000): post it as a normal Reel.`); }
    }
    const fb = d.vers.find((v) => v.plat === "Facebook" && v.media[0]?.endsWith(".mp4"));
    if (fb && fb.text) {
      const lines = fb.text.split("\n"); const q = d.p ? THREADS_Q[d.p.n] : d.unit?.q ?? d.unit?.yt;
      if (q) { fb.follow = [...(fb.follow ?? []), { label: "A/B hook B (Business Suite reel A/B test)", text: `${q}\n\n${lines.slice(lines[0] ? 0 : 1).join("\n")}` }];
        d.tests.push("T2 hook on Facebook: Business Suite A/B test of this reel, caption A (as written) against B (opens on the question), goal average time watched, 24 h; carry the winner to the next TikTok and X post."); }
    }
    if ((d.plat === "TikTok" || d.plat === "YouTube") && d.film) {
      const base = d.film.replace(/-short$/, "");
      const other = dels.find((o) => o !== d && o.plat === d.plat && o.lang !== d.lang && o.film && o.film.replace(/-short$/, "") === base && Math.abs(o.t - d.t) < 7 * 86400000);
      if (other) d.tests.push(`T3 language: the same film in ${other.lang.toUpperCase()} on ${other.plat} ${fmtWhen(other.t)} (${other.id}). Read views and ct taps per language; taps decide, since iPhone share is 21% in Indonesia and 52-54% in the US and Japan.`);
    }
    if ((d.plat === "X" || d.plat === "Threads") && d.t >= day("2026-12-06")) d.tests.push(`T4 format, weeks 3-4: ${d.vers[0]?.format ?? "post"} on ${d.plat}; compare replies and link taps against the other formats on ${track} in the same slot arm.`);
    if (d.help) d.tests.push("Helps a stranger with no pitch: read saves, shares and profile visits; no link to tap.");
  }
}

const DAYN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmtT = (t: number) => { const d = new Date(t); return `${DAYN[d.getUTCDay()]} ${MON[d.getUTCMonth()]} ${d.getUTCDate()} ${d.toISOString().slice(11, 16)}`; };
const fmtWhen = (t: number) => fmtT(t) + " WIB";
const localOf = (d: Del) => { const L = d.region ? LOCAL.eu : LOCAL[d.lang]; return `${fmtT(d.t + L.off * 3600000)} ${L.label}`; };

// ---------- checks on every delivery ----------
function checkDel(d: Del): string[] {
  const out: string[] = [];
  for (const v of d.vers) {
    const all = [v.title, v.text, v.poll?.q, ...(v.poll?.options ?? []), ...(v.follow ?? []).map((x) => x.text)].filter(Boolean).join("\n");
    if (v.plat === "X") for (const t of [v.text, ...(v.follow ?? []).map((x) => x.text)]) if (t) { const len = d.lang === "ja" ? [...t.replace(/https?:\/\/\S+/g, "x".repeat(23))].reduce((a, c) => a + (/[　-鿿＀-￯]/.test(c) ? 2 : 1), 0) : xLen(t.replace(/https?:\/\/\S+/g, "x".repeat(23))); if (len > 280) out.push(`X text is ${len} weighted characters`); }
    if (v.plat === "Threads") { if (v.text && v.text.length > 500) out.push(`Threads post is ${v.text.length} characters`); const end = (v.poll?.q ?? v.text ?? "").trim(); if (!/[?？]$/.test(end)) out.push("Threads post does not end on a question"); }
    if (v.plat === "YouTube" && v.title && v.title.length > 100) out.push(`YouTube title is ${v.title.length} characters`);
    v.poll?.options.forEach((o) => o.length > 25 && out.push(`${v.plat} poll option "${o}" over 25`));
    if (v.plat === "Instagram" && v.text && (v.text.match(/#/g) ?? []).length > 5) out.push("more than 5 Instagram tags");
    if (v.plat === "TikTok" && v.text) { const n = (v.text.match(/#/g) ?? []).length; if (n < 3 || n > 5) out.push(`${n} TikTok tags`); }
    if (d.app === "Cutling" && /\bbank|IBAN|rekening|振込/i.test(all)) out.push(`bank details in ${v.plat}`);
    if (d.app === "Cutling" && /clipboard history|クリップボード履歴|riwayat/i.test(all) && !/Mac|macOS/.test(all)) out.push(`clipboard history without Mac on ${v.plat}`);
    if (d.help && /apps\.apple\.com|matsuokengo\.com/.test(all)) out.push(`help post carries a link on ${v.plat}`);
    if (d.p && inSale(d.p) && d.p.kind !== "kept" && /\$[0-4]\.99/.test(all)) out.push(`price inside the Black Friday window on ${v.plat}`);
    for (const m of [...v.media, ...(v.post ?? [])]) if (!existsSync(m)) out.push(`${v.plat}: missing file ${m.replace(HOME + "/", "~/")}`);
  }
  return out;
}

// ---------- page ----------
const esc = (s = "") => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const br = (s = "") => esc(s).replace(/\n/g, "<br>");
const LNAME: Record<Lang, string> = { en: "English", id: "Indonesian", ja: "Japanese", ar: "Arabic", zh: "Traditional Chinese" };

function pageBody(dels: Del[], issues: Map<Del, string[]>) {
  const ids = new Map<string, Del[]>(); for (const d of dels) (ids.get(d.id) ?? ids.set(d.id, []).get(d.id)!).push(d);
  const count = (f: (d: Del) => string | string[]) => { const m = new Map<string, number>(); for (const d of dels) for (const k of [f(d)].flat()) m.set(k, (m.get(k) ?? 0) + 1); return [...m.entries()].sort((a, b) => b[1] - a[1]); };
  const chips = (e: [string, number][]) => e.map(([k, n]) => `<span class="fc">${esc(k)} <b>${n}</b></span>`).join("");
  const platLang = PLATS.map((pl) => { const r = dels.filter((d) => d.vers.some((v) => v.plat === pl)); return `<tr><th>${pl}</th><td>${(["en", "id", "ja", "ar", "zh"] as Lang[]).map((l) => { const n = r.filter((d) => d.lang === l).length; return n ? `<span class="fc">${LNAME[l]} <b>${n}</b></span>` : ""; }).join("")}</td></tr>`; }).join("");
  const fmtRows = PLATS.map((pl) => { const m = new Map<string, number>(); for (const d of dels) for (const v of d.vers) if (v.plat === pl) { const f = v.format.replace(/ \(.*\)$/, "").replace(/^Story, .*/, "Story"); m.set(f, (m.get(f) ?? 0) + 1); } return `<tr><th>${pl}</th><td>${chips([...m.entries()].sort((a, b) => b[1] - a[1]))}</td></tr>`; }).join("");
  const testCount = count((d) => d.tests.map((t) => t.split(/[,:]/)[0]));
  const helpN = dels.filter((d) => d.help).length;
  const langPosts = (["en", "id", "ja", "ar", "zh"] as Lang[]).map((l) => `<span class="fc">${LNAME[l]}: <b>${new Set(dels.filter((d) => d.lang === l).map((d) => d.id)).size}</b> posts, <b>${dels.filter((d) => d.lang === l).length}</b> deliveries${l === "en" ? ` (${dels.filter((d) => d.region).length} at European times)` : ""}</span>`).join("");
  const mediaHtml = (srcs: string[] = []) => !srcs.length ? "" : srcs.length > 1
    ? `<div class="slides">${srcs.map(one).join("")}</div><p class="hint">${srcs.length} slides, swipe</p>` : `<div class="one">${one(srcs[0])}</div>`;
  function one(s: string) { return s.endsWith(".mp4") ? `<video controls preload="none" playsinline poster="${s.replace(/\.mp4$/, ".jpg")}" src="${s}"></video>` : `<img loading="lazy" src="${s}" alt="">`; }
  const vHtml = (d: Del, v: Del["vers"][0]) => {
    const film = v.media[0]?.endsWith(".mp4") ? basename(v.media[0], ".mp4").replace(/-no-endcard$/, "") : undefined;
    const poll = v.poll ? `<div class="poll"><p class="pq">${esc(v.poll.q)}</p>${v.poll.options.map((o) => `<div class="opt"><span>${esc(o)}</span><small>${o.length}</small></div>`).join("")}</div>` : "";
    return `<div class="pv"><p class="pvh"><b class="plat">${v.plat}</b> <span class="fmt">${esc(v.format)}</span> <span class="who">${esc(HANDLE[v.plat])}</span></p>
      ${v.title ? `<p class="yt-title">${esc(v.title)} <small>${v.title.length}/100</small></p>` : ""}${v.text ? `<p class="cap" dir="auto">${br(v.text)}</p>` : ""}${poll}
      ${v.plat === "Threads" ? `<p class="meta">Topic: ${d.lang === "ja" || d.lang === "zh" ? "iPhone (GUESS: no community tag checked for this language)" : THREADS_TOPIC}</p>` : ""}
      ${mediaHtml(v.rmedia)}${film ? `<p class="meta strong">${esc(coverLabel(film))}</p>` : ""}
      ${v.sticker ? `<p class="meta">Sticker: ${esc(v.sticker)}</p>` : ""}
      ${(v.follow ?? []).map((x) => `<div class="follow"><p class="fl">${esc(x.label)}</p><p class="cap" dir="auto">${br(x.text)}</p>${(x as any).rmedia ? mediaHtml((x as any).rmedia) : ""}</div>`).join("")}
      ${(v.notes ?? []).length ? `<ul class="notes">${v.notes!.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>` : ""}</div>`;
  };
  let last = "";
  const cards = dels.map((d) => {
    const dt = new Date(d.t), dayKey = `${DAYN[dt.getUTCDay()]} ${MON[dt.getUTCMonth()]} ${dt.getUTCDate()}`;
    const head = dayKey !== last ? `<h2 class="day" id="d-${dt.toISOString().slice(0, 10)}">${dayKey} <small>WIB</small></h2>` : ""; last = dayKey;
    const iss = issues.get(d) ?? [];
    return `${head}<article class="del${d.gate ? " gated" : ""}" data-lang="${d.lang}" data-plat="${d.plat}" data-gate="${d.gate ? 1 : 0}" data-help="${d.help ? 1 : 0}" data-new="${d.status.length ? 1 : 0}">
      <div class="dh"><span class="tm">${wibOf(d.t)} WIB</span><span class="loc">${esc(localOf(d))}</span></div>
      <div class="ph"><label class="tick"><input type="checkbox" data-id="${d.id}" id="c-${d.key}"><b>${d.id}</b></label>
        <span class="lg l-${d.lang}">${d.lang.toUpperCase()}${d.region ? " · Europe" : ""}</span><span class="pl">${d.plat}</span><span class="app a-${d.app}">${d.app}</span>
        ${d.help ? `<span class="help">Helps, no pitch</span>` : ""}${d.gate ? `<span class="wait">After 1.0.5</span>` : ""}
        ${d.status.map((s) => `<span class="chg">${esc(s)}</span>`).join("")}</div>
      ${d.p ? `<p class="pain">${esc(d.p.pain)}</p>` : ""}
      ${d.gate ? `<p class="gate">Waiting: ${esc(d.gate)} Event text pending the owner's pick.</p>` : ""}
      ${iss.length ? `<p class="gate bad">Check failed: ${esc(iss.join("; "))}</p>` : ""}
      <details class="tests"><summary>Test: ${esc(d.tests[0]?.split(/[,:]/)[0] ?? "none")}${d.tests.length > 1 ? ` +${d.tests.length - 1}` : ""}</summary><ul>${d.tests.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></details>
      ${d.vers.map((v) => vHtml(d, v)).join("")}
    </article>`;
  }).join("");
  const days = [...new Set(dels.map((d) => new Date(d.t).toISOString().slice(0, 10)))];
  return `<title>Monholt social calendar</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap">
<style>
/* Layout: one column of timed posts per WIB day; each card shows the audience's local time, its language, platform, test and finished text. */
:root{--bg:#f3f4f2;--card:#ffffff;--ink:#17191a;--mute:#5d6462;--line:#dfe2df;--u:#d92b24;--c:#128f69;--wait:#9a5b00;--waitbg:#fff1d6;--bad:#b3261e;--badbg:#fde7e5;--chip:#eceeeb;--new:#1f5fd1;--newbg:#e6efff;--helpc:#4f3fb0;--helpbg:#efeaff;
--display:"Space Grotesk",ui-sans-serif,system-ui,sans-serif;--body:Inter,ui-sans-serif,system-ui,-apple-system,"Hiragino Sans","Noto Sans JP","Noto Naskh Arabic",sans-serif}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#121413;--card:#1b1e1d;--ink:#eef0ee;--mute:#a3aaa7;--line:#2c312f;--u:#ff5a52;--c:#2fd19f;--wait:#ffbf5c;--waitbg:#36290f;--bad:#ff8a80;--badbg:#3a1714;--chip:#242826;--new:#8fb4ff;--newbg:#16233d;--helpc:#c3b6ff;--helpbg:#251f45;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#121413;--card:#1b1e1d;--ink:#eef0ee;--mute:#a3aaa7;--line:#2c312f;--u:#ff5a52;--c:#2fd19f;--wait:#ffbf5c;--waitbg:#36290f;--bad:#ff8a80;--badbg:#3a1714;--chip:#242826;--new:#8fb4ff;--newbg:#16233d;--helpc:#c3b6ff;--helpbg:#251f45;color-scheme:dark}
*{box-sizing:border-box}
body{background:var(--bg);color:var(--ink);font:15px/1.5 var(--body);padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:16px 80px}
.wrap{max-width:860px;margin:0 auto}
h1{font:700 26px/1.15 var(--display);margin:4px 0 6px;text-wrap:balance}
.lead{color:var(--mute);margin:0 0 12px}.warn{background:var(--waitbg);color:var(--wait);border-radius:12px;padding:10px 12px;margin:0 0 10px;font-weight:600}
.sum{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:12px;margin-bottom:12px}
.sum h3{font:600 12px var(--body);text-transform:uppercase;letter-spacing:.06em;color:var(--mute);margin:12px 0 6px}.sum h3:first-child{margin-top:0}
.tw{overflow-x:auto}table{border-collapse:collapse;width:100%}th{text-align:left;font-weight:600;padding:5px 10px 5px 0;vertical-align:top;white-space:nowrap}td{padding:5px 0}
.fc{display:inline-block;background:var(--chip);border-radius:999px;padding:2px 10px;margin:2px 4px 2px 0;font-size:13px}.fc b{font-variant-numeric:tabular-nums}
.bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:12px 0}
.bar button,.bar select{font:inherit;padding:8px 12px;border-radius:10px;border:1px solid var(--line);background:var(--card);color:var(--ink);min-height:40px}
.bar .go{background:var(--ink);color:var(--bg);border-color:var(--ink);font-weight:600}
button:focus-visible,select:focus-visible,input:focus-visible,summary:focus-visible{outline:3px solid var(--c);outline-offset:2px}
#out{width:100%;font:13px ui-monospace,monospace;padding:8px;border-radius:10px;border:1px solid var(--line);background:var(--card);color:var(--ink)}
.count{color:var(--mute);font-size:13px}
.jump{display:flex;gap:6px;overflow-x:auto;padding-bottom:4px;margin-bottom:6px}.jump a{flex:none;font-size:13px;padding:4px 10px;border-radius:999px;background:var(--chip);color:var(--ink);text-decoration:none}
.day{font:700 19px var(--display);margin:24px 0 8px;position:sticky;top:env(safe-area-inset-top,0px);background:var(--bg);padding:6px 0;z-index:2}.day small{font:500 12px var(--body);color:var(--mute)}
.del{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:12px 14px;margin-bottom:12px;min-width:0}.del.gated{border:2px solid var(--wait)}
.dh{display:flex;flex-wrap:wrap;gap:4px 12px;align-items:baseline}.tm{font:700 18px var(--display);font-variant-numeric:tabular-nums}.loc{color:var(--mute);font-size:13px;font-variant-numeric:tabular-nums}
.ph{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:6px}
.tick{display:flex;gap:8px;align-items:center;cursor:pointer;font:700 16px var(--display)}.tick input{width:22px;height:22px}
.lg,.pl,.app,.help,.wait,.chg{font-size:12px;border-radius:999px;padding:2px 9px;border:1px solid var(--line)}
.lg{font-weight:700}.a-Undirect{background:var(--u);color:#fff;border-color:var(--u)}.a-Cutling{background:var(--c);color:#fff;border-color:var(--c)}.a-Both{background:var(--ink);color:var(--bg)}
.help{background:var(--helpbg);color:var(--helpc);border-color:transparent}.wait{background:var(--waitbg);color:var(--wait);border-color:var(--wait)}.chg{background:var(--newbg);color:var(--new);border-color:transparent}
.pain{margin:6px 0 0;font-size:13px;color:var(--mute)}
.gate{background:var(--waitbg);color:var(--wait);border-radius:10px;padding:6px 10px;font-size:13px;margin:6px 0}.gate.bad{background:var(--badbg);color:var(--bad)}
.tests{font-size:13px;margin:8px 0;color:var(--mute)}.tests summary{cursor:pointer;color:var(--ink);font-weight:600}.tests ul{margin:4px 0;padding-left:18px}
.pv{border-top:1px solid var(--line);padding-top:8px;margin-top:8px;min-width:0}.pvh{margin:0 0 4px;font-size:13px}.plat{text-transform:uppercase;letter-spacing:.06em;font-size:12px}.fmt{background:var(--chip);border-radius:999px;padding:1px 8px;font-size:12px}.who{color:var(--mute);font-size:12px}
.yt-title{font-weight:700;margin:4px 0}.yt-title small{color:var(--mute);font-weight:400}
.cap{margin:6px 0;overflow-wrap:anywhere}.meta{font-size:12px;color:var(--mute);margin:4px 0}.meta.strong{color:var(--ink);font-weight:600}
.one,.slides{max-width:340px}.one img,.one video,.slides img,.slides video{display:block;width:100%;max-width:100%;border-radius:12px;background:#000;height:auto}video{aspect-ratio:9/16}
.slides{display:flex;gap:6px;overflow-x:auto;scroll-snap-type:x mandatory}.slides>*{flex:0 0 100%;scroll-snap-align:start}.hint{font-size:12px;color:var(--mute);margin:4px 0}
.poll{margin:6px 0;max-width:340px}.pq{font-weight:600;margin:0 0 6px}.opt{display:flex;justify-content:space-between;border:1.5px solid var(--c);border-radius:999px;padding:6px 14px;margin:5px 0}.opt small{color:var(--mute)}
.follow{border-left:3px solid var(--line);padding-left:10px;margin:8px 0}.fl{font-size:12px;color:var(--mute);margin:0}
.notes{font-size:12.5px;color:var(--mute);padding-left:18px;margin:6px 0}
</style>
<div class="wrap">
<h1>Monholt social calendar</h1>
<p class="lead">Sun Nov 22 to Sun Dec 20 2026, version 3: ${ids.size} posts in ${dels.length} deliveries, each on its own platform slot for its audience's country: English for the US and Europe, Indonesian, Japanese, Arabic, and a small Traditional Chinese trial for Taiwan. Times are WIB with the audience's local time beside them. Nothing is ticked: this version needs a new go.</p>
<p class="warn">YouTube: needs the channel confirmed. The earlier Shorts went to @matsuokengo; there is no record of a @monholtco channel.</p>
<p class="warn">Instagram trial reels need 1,000 followers. Below that, every "trial reels" card posts as a normal Reel.</p>
<div class="sum"><h3>Posts per language</h3><div>${langPosts}</div>
<h3>Deliveries per platform and language</h3><div class="tw"><table>${platLang}</table></div>
<h3>Formats per platform</h3><div class="tw"><table>${fmtRows}</table></div>
<h3>Tests</h3><div>${chips(testCount)}</div>
<h3>Help with no pitch</h3><div><span class="fc">${helpN} of ${dels.length} deliveries <b>${Math.round((helpN / dels.length) * 100)}%</b></span></div>
<h3>Since your last go</h3><div>${chips(count((d) => d.status.length ? d.status : ["Unchanged"]))}</div></div>
<div class="bar"><button type="button" class="go" id="copy">Copy my go</button><button type="button" id="all">Tick all ready</button><button type="button" id="none">Clear</button>
<select id="fl" aria-label="Language"><option value="">All languages</option><option value="en">English</option><option value="id">Indonesian</option><option value="ja">Japanese</option><option value="ar">Arabic</option><option value="zh">Traditional Chinese</option></select>
<select id="fp" aria-label="Platform"><option value="">All platforms</option>${["X", "Threads", "IG+FB", "Instagram", "TikTok", "YouTube"].map((p) => `<option>${p}</option>`).join("")}</select>
<select id="fo" aria-label="Show"><option value="">Everything</option><option value="new">New or changed</option><option value="help">Helps, no pitch</option><option value="gate">Waiting on 1.0.5</option></select>
<span id="n" class="count"></span></div>
<textarea id="out" rows="3" readonly hidden></textarea>
<nav class="jump" aria-label="Days">${days.map((d) => { const t = new Date(d + "T00:00:00Z"); return `<a href="#d-${d}">${DAYN[t.getUTCDay()]} ${t.getUTCDate()}</a>`; }).join("")}</nav>
${cards}
</div>
<script>
(function(){
var K="monholt-cal-v3",s={};try{s=JSON.parse(localStorage.getItem(K)||"{}")}catch(e){}
var boxes=[].slice.call(document.querySelectorAll("input[data-id]"));
function ids(){var o={};boxes.forEach(function(b){if(b.checked)o[b.dataset.id]=1});return Object.keys(o)}
function sync(id,v){boxes.forEach(function(b){if(b.dataset.id===id)b.checked=v});s[id]=v}
function save(){try{localStorage.setItem(K,JSON.stringify(s))}catch(e){}var all={};boxes.forEach(function(b){all[b.dataset.id]=1});document.getElementById("n").textContent=ids().length+" of "+Object.keys(all).length+" posts ticked"}
boxes.forEach(function(b){b.checked=!!s[b.dataset.id];b.addEventListener("change",function(){sync(b.dataset.id,b.checked);save()})});save();
document.getElementById("all").addEventListener("click",function(){boxes.forEach(function(b){if(b.closest(".del").dataset.gate==="0")sync(b.dataset.id,true)});save()});
document.getElementById("none").addEventListener("click",function(){boxes.forEach(function(b){sync(b.dataset.id,false)});save()});
document.getElementById("copy").addEventListener("click",function(){var o=document.getElementById("out");o.hidden=false;o.value="Go: "+(ids().join(", ")||"none");o.select();try{navigator.clipboard.writeText(o.value).catch(function(){})}catch(e){}});
function filt(){var l=document.getElementById("fl").value,p=document.getElementById("fp").value,o=document.getElementById("fo").value;[].forEach.call(document.querySelectorAll(".del"),function(a){var d=a.dataset;a.hidden=(l&&d.lang!==l)||(p&&d.plat!==p)||(o==="new"&&d.new!=="1")||(o==="help"&&d.help!=="1")||(o==="gate"&&d.gate!=="1")})}
["fl","fp","fo"].forEach(function(i){document.getElementById(i).addEventListener("change",filt)});
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
    copyFileSync(join(REPO, "Support/AppStore/events/1.0.5/details.png"), join(ASSETS, "event-details.png"));
  }
  for (const p of posts) {
    const d = dir(p); mkdirSync(d, { recursive: true });
    if (only) continue;
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
    if (p.n === 47) {
      await render(browser, { tpl: "text", app: "Undirect", logo: false, lines: ["Random tabs in Safari: it's the *page.*", "Your iPhone is fine."], small: "Close them, and don't install anything they push." }, "ig", join(d, "help-ig-1.png"));
      await render(browser, { tpl: "text", app: "Undirect", logo: false, lines: ["Random tabs in Safari: it's the *page.*", "Your iPhone is fine."], small: "Close them, and don't install anything they push." }, "tt", join(d, "help-tt-1.png"));
    }
    if (p.gate) {
      const line = p.film?.startsWith("u-back") ? "Back just goes *back.*" : "No tap. *No redirect.*";
      await render(browser, { tpl: "eventart", line }, "ig", join(d, "event-ig.png"));
    }
  }
  await browser.close();
  const dels = schedule();
  for (const d of dels) {
    d.vers = d.p ? enVersions(d.p, d.plat, dir(d.p)) : unitVersions(d.unit!, d.plat);
    if (d.p) {
      d.status.push("Time and platform set changed");
      if (HELP_OVR[d.p.n]) d.status.push("Pitch removed: helps a stranger");
      if (d.p.gate) d.status.push("1.0.5 event art");
    } else if (d.lang === "en") d.status = ["New"];
  }
  // Black Friday prices run Nov 27 to 15:00 WIB Dec 1: a pain film posted then is trimmed before its
  // end card, which shows the full price.
  const saleFrom = new Date("2026-11-27T00:00:00Z").getTime(), saleTo = new Date("2026-12-01T15:00:00Z").getTime();
  mkdirSync(join(ASSETS, "cuts"), { recursive: true });
  for (const d of dels) if (d.t >= saleFrom && d.t < saleTo && d.lang !== "ar") for (const v of d.vers) {
    const m = v.media[0];
    if (!m?.endsWith(".mp4") || !m.startsWith(FILMS)) continue;
    const f = basename(m, ".mp4"), cut = join(ASSETS, "cuts", `${f}-no-endcard.mp4`);
    if (!existsSync(cut)) await cutFilm(f, "endcard", cut);
    v.media = [cut, ...v.media.slice(1)];
    v.notes = [...(v.notes ?? []), "Trimmed before its end card: the card shows the full price, and this goes out during the Black Friday prices."];
  }
  addTests(dels);
  const issues = new Map<Del, string[]>();
  const xs = dels.filter((d) => d.plat === "X").sort((a, b) => a.t - b.t);
  for (let i = 1; i < xs.length; i++) if (xs[i].t - xs[i - 1].t < 55 * 60000) (issues.get(xs[i]) ?? issues.set(xs[i], []).get(xs[i])!).push(`X post ${Math.round((xs[i].t - xs[i - 1].t) / 60000)} min after ${xs[i - 1].id}`);
  const seen = new Map<string, Del>();
  for (const d of dels) {
    const iss = [...(issues.get(d) ?? []), ...checkDel(d)];
    for (const v of d.vers) { const k = `${v.plat}|${v.text ?? v.poll?.q}`; if (v.text || v.poll) { if (seen.has(k) && seen.get(k)!.key !== d.key) iss.push(`${v.plat} text repeats ${seen.get(k)!.id}`); seen.set(k, d); } }
    if (iss.length) { issues.set(d, iss); console.log(d.id, d.plat, iss.join("; ")); }
    for (const v of d.vers) {
      v.rmedia = []; for (const m of v.media) if (existsSync(m)) v.rmedia.push(await review(m, d.p ? pid(d.p) : d.id));
      for (const fo of v.follow ?? []) if (fo.media) { const r = []; for (const m of fo.media) if (existsSync(m)) r.push(await review(m, d.p ? pid(d.p) : d.id)); (fo as any).rmedia = r; }
    }
  }
  const body = pageBody(dels, issues);
  writeFileSync(join(OUT, "artifact.html"), body);
  writeFileSync(join(OUT, "index.html"), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>${body}</body></html>`);
  // text record, one block per delivery, and one prose line per English caption for the scanner
  const rec = dels.map((d) => [`${d.id} · ${d.lang.toUpperCase()} · ${d.plat} · ${fmtWhen(d.t)} · ${localOf(d)}${d.gate ? " · WAITING: " + d.gate : ""}${d.help ? " · helps, no pitch" : ""}`,
    ...d.status.map((s) => `Status: ${s}`), ...d.tests.map((t) => `Test: ${t}`),
    ...d.vers.map((v) => [`== ${v.plat}: ${v.format} ==`, v.title ? `Title: ${v.title}` : "", v.text ?? "", v.poll ? `Poll: ${v.poll.q}\n${v.poll.options.map((o) => "- " + o).join("\n")}` : "", v.sticker ? `Sticker: ${v.sticker}` : "",
      ...(v.follow ?? []).map((x) => `${x.label}:\n${x.text}`), `Media: ${(v.post ?? v.media).map((m) => m.replace(HOME + "/", "~/")).join(", ") || "none"}`, ...(v.notes ?? []).map((n) => `Note: ${n}`)].filter(Boolean).join("\n"))].join("\n")).join("\n\n" + "-".repeat(60) + "\n\n");
  writeFileSync(join(HERE, "calendar-final.txt"), rec + "\n");
  const lines = (L: Lang) => [...new Set(dels.filter((d) => d.lang === L).flatMap((d) => d.vers.flatMap((v) => [v.text, ...(v.follow ?? []).map((f) => f.text)]).filter(Boolean).map((t) => t!.split("\n\n")[0].replace(/\n/g, " ").replace(/https?:\/\/\S+/g, "").trim())))].filter(Boolean);
  writeFileSync(join(HERE, "captions.txt"), lines("en").join("\n") + "\n");
  writeFileSync(join(HERE, "captions-id.txt"), lines("id").join("\n") + "\n");
  writeFileSync(join(HERE, "captions-ja.txt"), lines("ja").join("\n") + "\n");
  writeFileSync(join(HERE, "captions-ar.txt"), lines("ar").join("\n") + "\n");
  const by = (f: (d: Del) => string) => { const m = new Map<string, number>(); dels.forEach((d) => m.set(f(d), (m.get(f(d)) ?? 0) + 1)); return [...m.entries()].map(([k, n]) => `${k} ${n}`).join(", "); };
  console.log("deliveries", dels.length, "| by lang:", by((d) => d.lang), "\nby lang+plat:", by((d) => `${d.lang}-${d.plat}`), "\nhelp", dels.filter((d) => d.help).length,
    "\ntests:", (() => { const m = new Map<string, number>(); dels.forEach((d) => d.tests.forEach((t) => { const k = t.split(/[,:]/)[0]; m.set(k, (m.get(k) ?? 0) + 1); })); return [...m.entries()].map(([k, n]) => `${k} ${n}`).join(", "); })(),
    "\nposts:", new Set(dels.map((d) => d.id)).size, "issues:", issues.size, "review files:", reviewMap.size);
}

await main();
