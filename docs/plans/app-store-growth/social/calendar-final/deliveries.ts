// Writes the schedulable export of the @monholtco calendar (version 7: English, Japanese and Indonesian):
//   deliveries.json        every delivery from Nov 22 2026: each post on Instagram, Facebook, Threads and TikTok
//                          in English, then Japanese, then Indonesian on consecutive days, three a day per
//                          platform; once on YouTube in English with Japanese and Indonesian titles and
//                          descriptions; and English only on X, which translates each post
//   design-needed.json     rows with no finished media for their platform and language, for Fable
//   deliveries-first.json  Instagram, Facebook, Threads, TikTok and YouTube from now to Nov 24 23:59 WIB,
//                          approved posts only
//   deliveries-next.json   the Japanese and Indonesian rows from now to Nov 25 23:59 WIB, ready to schedule
//   wording-needed.json    every caption still to be written, grouped by post and language
// Run: bun deliveries.ts
//
// The English captions are the owner's approved ones ("All approved", 2026-11-21), read verbatim from
// calendar-final.txt as committed in APPROVED. No caption is written here: non-English captions come from
// Fable's wording-done.json, and every new X piece is null with a `needs_wording` brief.

import { $ } from "bun";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, isAbsolute, basename } from "node:path";
import { posts, type Post } from "./posts";
import { MARKETS, PART_OF_SLOT, deliveryTime, iso, DAY, HOUR, type Market, type Plat, type Part, type LangCode } from "./markets";

const APPROVED = "8ab6e232"; // the version the owner approved
const HERE = import.meta.dir;
const OUT = join(homedir(), "Downloads/social-calendar");
const NOW = process.env.NOW ?? new Date(Date.now() + 7 * 3600000).toISOString().slice(0, 16).replace("T", " "); // WIB; rows before this are past
const FIRST_END = "2026-11-25 00:00";
const NEXT_END = "2026-11-26 00:00";

// ---------- the approved text ----------
type Follow = { label: string; text: string };
type Block = { plat: Plat; format: string; text?: string; title?: string; poll?: { q: string; options: string[] }; sticker?: string; topic?: string; follow: Follow[]; media: string[]; notes: string[] };

const raw = await $`git -C ${HERE} show ${APPROVED}:./calendar-final.txt`.text();
const approved = new Map<number, Block[]>();
for (const chunk of raw.split(/\n-{20,}\n/)) {
  const head = chunk.match(/^\s*P(\d+) ·/);
  if (!head) continue;
  const blocks: Block[] = [];
  for (const part of chunk.split(/\n== /).slice(1)) {
    const [hdr, ...lines] = part.split("\n");
    const m = hdr.match(/^(\w+): (.+) ==$/)!;
    const b: Block = { plat: m[1] as Plat, format: m[2], follow: [], media: [], notes: [] };
    const text: string[] = [];
    let mode: "text" | "follow" | "poll" = "text";
    for (const l of lines) {
      let r: RegExpMatchArray | null;
      if ((r = l.match(/^Title: (.*)$/))) b.title = r[1];
      else if ((r = l.match(/^Poll: (.*)$/))) { b.poll = { q: r[1], options: [] }; mode = "poll"; }
      else if (mode === "poll" && (r = l.match(/^- (.*)$/))) b.poll!.options.push(r[1]);
      else if ((r = l.match(/^Sticker: (.*)$/))) b.sticker = r[1];
      else if ((r = l.match(/^Topic: (.*)$/))) b.topic = r[1];
      else if ((r = l.match(/^(Our first reply|First comment[^:]*):$/))) { b.follow.push({ label: r[1], text: "" }); mode = "follow"; }
      else if ((r = l.match(/^Media: (.*)$/))) { b.media = r[1] === "none" ? [] : r[1].split(", ").map((p) => (isAbsolute(p) ? p : join(OUT, p))); mode = "text"; }
      else if ((r = l.match(/^Note: (.*)$/))) b.notes.push(r[1]);
      else if (mode === "follow") { const f = b.follow[b.follow.length - 1]; f.text = f.text ? `${f.text}\n${l}` : l; }
      else if (mode === "text") text.push(l);
    }
    const t = text.join("\n").trim();
    if (t) b.text = t;
    b.follow.forEach((f) => (f.text = f.text.trim()));
    blocks.push(b);
  }
  approved.set(Number(head[1]), blocks);
}
if (approved.size !== 87) throw new Error(`expected 87 approved posts, read ${approved.size}`);

// ---------- what each row carries ----------
const pid = (n: number) => `P${String(n).padStart(2, "0")}`;
const APP_ID = { Undirect: "6810513194", Cutling: "6759476314" } as const;
const PCODE: Record<Plat, string> = { X: "x", Threads: "th", Instagram: "ig", Facebook: "fb", TikTok: "tt", YouTube: "yt" };
const storeLink = (app: "Undirect" | "Cutling", plat: Plat, lang: string) => `https://apps.apple.com/app/apple-store/id${APP_ID[app]}?pt=127609326&ct=${PCODE[plat]}-${lang.toLowerCase()}&mt=8`;
const appsOf = (p: Post): ("Undirect" | "Cutling")[] => (p.app === "Both" ? ["Undirect", "Cutling"] : [p.app]);
const HANDLE: Record<Plat, string> = { X: "@monholtco", Instagram: "monholtco", TikTok: "@monholt", Threads: "@monholtco", Facebook: "Monholt (Page)", YouTube: "@matsuokengo" };

// Notes the owner's no-face rule replaces: anything that asked for a recorded answer.
const NO_FACE: [RegExp, string][] = [
  [/^Reply with a video to each "Other"\.$/, `Answer each "Other" with a reply video of text over the film or a screen recording; no face on camera.`],
  [/^Answer each question as its own video; the trimmed film backs the first answer\.$/, "Answer each question as its own video of text over the trimmed film; no face on camera."],
];
const noFace = (n: string) => { for (const [re, to] of NO_FACE) if (re.test(n)) return to; return n; };
const YT_NOTE = /^(Needs the channel confirmed|Community posts need|Community polls need)/;

// Limits each platform enforces on what is written (platform help pages; the house rules add the rest).
const LIMIT: Record<Plat, string> = {
  X: "280 characters (a link counts 23) unless X Premium is active",
  Instagram: "2,200 characters, hook in the first 125, at most 5 hashtags",
  Facebook: "keep to the English length",
  Threads: "500 characters, one topic tag",
  TikTok: "4,000 characters, the pain in the first line, 3-5 hashtags",
  YouTube: "title 100 characters with 2 hashtags; description 5,000 characters with 3 hashtags",
};

type Row = {
  id: string; post: string | null; app: string; lang: LangCode | "ar"; language: string; country: string;
  platform: Plat; account: string; format: string;
  wib: string; local: string; zone: string; time_source: string;
  caption: string | null; title?: string | null; poll?: { q: string | null; options: (string | null)[] } | null; sticker?: string | null;
  first_comment: { label: string; text: string | null; link?: string } | null;
  media: string[] | null; on_screen_text: string;
  needs_design?: string | null; needs_localized_media?: boolean; frame_fail?: string[];
  needs_wording: string | null;
  approved_post: boolean; in_approved_set: boolean; changed_since_approval: string[];
  x_length?: number; requires_x_premium?: boolean;
  already_scheduled?: boolean; notes: string[];
  translations?: { lang: LangCode; language: string; title: string; description: string }[];
};
const rows: Row[] = [];
const tOf = (wib: string) => new Date(wib.replace(" ", "T") + ":00Z").getTime();
const EN = MARKETS.find((m) => m.lang === "en")!;
const missingMedia = new Set<string>();

const onScreen = (b: Block, lang: LangCode) => {
  if (!b.media.length) return "none";
  if (lang === "en") return "English";
  return b.media.some((m) => m.endsWith(".mp4")) ? "English: no localized cut of this film exists; the caption is in the post's language" : "English: no localized version of this image exists; the caption is in the post's language";
};

function brief(p: Post, b: Block, m: Market): string {
  const en = (s?: string) => (s ? JSON.stringify(s) : "none");
  const parts = [`${m.name} for ${pid(p.n)} on ${b.plat} (${b.format}), written natively from the English row ${pid(p.n)}-en-${b.plat}`];
  if (b.text) parts.push(`caption (English: ${en(b.text)})`);
  if (b.title) parts.push(`title (English: ${en(b.title)})`);
  if (b.poll) parts.push(`poll question and ${b.poll.options.length} options (English: ${en(b.poll.q)} / ${b.poll.options.join(" / ")})${b.plat === "X" ? ", options 25 characters each" : ""}`);
  if (b.sticker) parts.push(`sticker text (English: ${en(b.sticker)})`);
  if (b.follow.length) parts.push(`the line before the link in the ${b.follow[0].label.split(" (")[0].toLowerCase()} (English: ${en(b.follow[0].text)})`);
  if (/\$\d/.test(b.text ?? "") || /\$\d/.test(b.follow[0]?.text ?? "")) parts.push(`prices in the ${m.country} App Store's own currency, read from the store, not converted`);
  parts.push(`limit: ${LIMIT[b.plat]}`);
  return parts.join("; ");
}

function rowFor(p: Post, b: Block, m: Market, when: { wib: string; local: string; why: string }, extra: Partial<Row> = {}): Row {
  const en = m.lang === "en";
  b.media.forEach((f) => existsSync(f) || missingMedia.add(f));
  const fc = b.follow[0];
  const link = appsOf(p).map((a) => storeLink(a, b.plat, m.lang)).join("\n");
  const changed = en ? [] : ["New: this language was not in the approved set"];
  return {
    id: `${pid(p.n)}-${m.lang}-${b.plat}`, post: pid(p.n), app: p.app, lang: m.lang, language: m.name, country: m.country,
    platform: b.plat, account: HANDLE[b.plat], format: b.format,
    wib: when.wib, local: when.local, zone: m.zone, time_source: when.why,
    caption: en ? b.text ?? null : null,
    ...(b.title ? { title: en ? b.title : null } : {}),
    ...(b.poll ? { poll: en ? b.poll : { q: null, options: b.poll.options.map(() => null) } } : {}),
    ...(b.sticker ? { sticker: en ? b.sticker : null } : {}),
    first_comment: fc ? (en ? { label: fc.label.split(" (")[0], text: fc.text } : { label: fc.label.split(" (")[0], text: null, link }) : null,
    media: b.media, on_screen_text: onScreen(b, m.lang),
    needs_wording: en ? null : brief(p, b, m),
    approved_post: !p.gate, in_approved_set: en && !p.gate, changed_since_approval: changed,
    notes: [...b.notes.filter((n) => !YT_NOTE.test(n)).map(noFace), ...(b.plat === "YouTube" ? ["Channel @matsuokengo, scheduled with youtube.ts upload --publish-at."] : []), ...(p.gate ? [`Held: ${p.gate}`] : []), ...(m.note ? [m.note] : [])],
    ...extra,
  };
}

// ---------- Instagram, Facebook, Threads, TikTok: every post in English, Japanese and Indonesian ----------
// Owner, 2026-11-21 (version 7): post only in English, Japanese and Indonesian. Each platform keeps about
// 3 posts a day from one account, and each day's three are one English, one Japanese and one Indonesian,
// each at its market's best local hour. Every post goes out in all three languages on consecutive days:
// English first, Japanese the next day, Indonesian the day after. 87 posts at one new post a day run
// past Dec 20; the calendar runs until every post has gone out in all three.
// Posts tied to an outside date (Product Hunt day, the sale, MacPip day) go out in all three languages on
// that date: English at its approved minute, Japanese and Indonesian in their evening.
const KEPT_PART: Record<number, Part> = { 9: "pm", 17: "pm", 26: "pm", 50: "pm" };
const DATED = new Set([9, 17, 26, 50]);
const ROTATED: Plat[] = ["Instagram", "Facebook", "Threads", "TikTok"];
const NON_X: Plat[] = [...ROTATED, "YouTube"];
const LANGS: LangCode[] = ["en", "ja", "id"];
const MK = Object.fromEntries(MARKETS.map((m) => [m.lang, m])) as Record<LangCode, Market>;
const approvedTime = (p: Post) => {
  const s = p.slot === "kept" ? p.keptTime!.wib : ({ 1: "02:20", 2: "05:50", 3: "21:20" } as Record<number, string>)[p.slot];
  return `${p.date} ${s}`;
};
// English deliveries still in each platform's scheduler after the 2026-11-21 cleanup (social-posts.md,
// "Cleanup 2026-11-21"): kept at their minutes and built around. Every other scheduled row was removed.
const SCHEDULED: Record<string, string> = {
  "P03-en-Facebook": "2026-11-22 21:02", "P06-en-Facebook": "2026-11-23 21:02", "P05-en-Facebook": "2026-11-24 08:02", "P09-en-Facebook": "2026-11-24 15:07",
  "P05-en-Instagram": "2026-11-24 08:00",
  "P03-en-Threads": "2026-11-22 20:34", "P01-en-Threads": "2026-11-23 00:04", "P02-en-Threads": "2026-11-23 02:04", "P06-en-Threads": "2026-11-23 20:34",
  "P04-en-Threads": "2026-11-24 00:04", "P05-en-Threads": "2026-11-24 02:04", "P09-en-Threads": "2026-11-24 15:07",
};
// The sale's prices start at 00:00 Pacific on Nov 27 (inbox-actions.md): 15:00 WIB. It ends 00:00 Pacific Dec 1.
const SALE_START = "2026-11-27 15:00", SALE_END = "2026-12-01 15:00";
const SALE_POSTS = new Set([17, 26]);

// Fable's native wording, one entry per post, language and platform.
type Worded = { id: string; caption: string | null; first_comment: string | null; title?: string; poll?: { q: string; options: string[] }; sticker?: string; note?: string };
const wordedList: Worded[] = JSON.parse(readFileSync(join(HERE, "wording-done.json"), "utf8")).rows;
const worded = new Map(wordedList.map((w) => [w.id, w]));

// The minute of a delivery: a scheduled row keeps its minute; a dated English row keeps its approved
// minute; everything else lands on `day` (the market's local calendar day) at that platform's hour.
function timeOn(p: Post, b: Block, m: Market, day: string, part: Part): { wib: string; local: string; why: string } {
  const sched = SCHEDULED[`${pid(p.n)}-${m.lang}-${b.plat}`];
  if (sched) { const t = tOf(sched); return { wib: sched, local: iso(t + m.off * HOUR), why: "already scheduled at this minute (social-posts.md)" }; }
  if (p.slot === "kept" && m.lang === "en") {
    const t = tOf(approvedTime(p));
    // P17 shows sale prices, so on these platforms it waits for the sale to open (X keeps its own minute).
    if (p.n === 17 && iso(t) < SALE_START && b.plat !== "X") { const u = tOf(SALE_START) + HOUR + (t % HOUR); return { wib: iso(u), local: iso(u + m.off * HOUR), why: "the approved minute's hour after the sale opens (00:00 Pacific)" }; }
    return { wib: iso(t), local: iso(t + m.off * HOUR), why: "the approved minute, tied to the launch or sale day" };
  }
  const d = deliveryTime(day, part, b.plat, m);
  if (p.n === 17 && iso(d.t) < SALE_START) {
    const t = tOf(SALE_START) + HOUR + (Number(d.local.slice(14)) % 60) * 60000;
    return { wib: iso(t), local: iso(t + m.off * HOUR), why: `${d.why}, moved to the first hour after the sale opens (00:00 Pacific)` };
  }
  return { wib: iso(d.t), local: d.local, why: d.why };
}

// Fills a Japanese or Indonesian row from wording-done.json; throws if Fable has no wording for it.
function word(r: Row): Row {
  if (r.lang === "en") return r;
  const w = worded.get(r.id);
  if (!w) throw new Error(`no wording for ${r.id}`);
  r.caption = w.caption ?? null;
  if ("title" in r) r.title = w.title ?? null;
  if ("poll" in r) r.poll = w.poll ?? null;
  if ("sticker" in r) r.sticker = w.sticker ?? null;
  if (r.first_comment) r.first_comment = { label: r.first_comment.label, text: w.first_comment ?? null };
  else if (w.first_comment) r.first_comment = { label: "First comment", text: w.first_comment };
  if (w.note) r.notes.push(w.note);
  r.needs_wording = null;
  return r;
}

// What each scheduler can't take, from the 2026-11-21 scheduling and cleanup runs (social-posts.md).
function toolNotes(r: Row) {
  if (r.platform === "Instagram" && /^Story, (poll|quiz|questions|emoji slider|add yours) sticker$/.test(r.format)) r.notes.push("Business Suite's Instagram Story editor offers only Mention, Link and emoji stickers: post this from the Instagram app at the time.");
  if (r.platform === "TikTok" && r.sticker) r.notes.push("TikTok Studio's web uploader has no poll sticker: post this from the TikTok app at the time.");
  if (r.platform === "TikTok") r.notes.push("Posts disclosed as Your brand can't be edited or deleted in TikTok Studio on the web, only in the TikTok app: check it in TikTok's frame before scheduling.");
  if (r.platform === "Facebook" && r.first_comment?.text) r.notes.push("Business Suite can't attach a first comment: post it by hand at this time.");
}

const ordered = [...posts].sort((a, b) => approvedTime(a).localeCompare(approvedTime(b)) || a.n - b.n);
const localDay = (wib: string, m: Market) => iso(tOf(wib) + m.off * HOUR).slice(0, 10);
const addDays = (d: string, n: number) => iso(tOf(`${d} 00:00`) + n * DAY).slice(0, 10);
const FIRST_DAY = "2026-11-22";
const partOf = (p: Post) => (p.slot === "kept" ? KEPT_PART[p.n] : PART_OF_SLOT[String(p.slot)]);
// One platform's run: the scheduled rows, then the dated posts on their dates, then day by day.
for (const pl of ROTATED) {
  const queue = ordered.filter((p) => approved.get(p.n)!.some((b) => b.plat === pl));
  const done = new Map<string, string>(); // `${n}|${lang}` -> that market's local day
  const onDay = new Map<string, Set<LangCode>>(); // local day -> languages already posting that day
  const emit = (p: Post, l: LangCode, day: string, part: Part) => {
    const b = approved.get(p.n)!.find((b) => b.plat === pl)!;
    const m = MK[l];
    const when = timeOn(p, b, m, day, part);
    const r = word(rowFor(p, b, m, when));
    if (SCHEDULED[r.id]) r.already_scheduled = true;
    if (l === "en" && when.wib !== approvedTime(p)) r.changed_since_approval.push(`Time: approved ${approvedTime(p)} WIB for every platform; now ${when.wib} WIB, this platform's best hour in ${m.zone}`);
    if (r.notes.some((n, i) => n !== b.notes.filter((n) => !YT_NOTE.test(n))[i])) r.changed_since_approval.push("Note changed: answers are text over film, no face on camera");
    toolNotes(r);
    rows.push(r);
    const d = localDay(when.wib, m);
    done.set(`${p.n}|${l}`, d);
    (onDay.get(d) ?? onDay.set(d, new Set()).get(d)!).add(l);
  };
  for (const p of queue) if (SCHEDULED[`${pid(p.n)}-en-${pl}`]) emit(p, "en", "", partOf(p));
  for (const p of queue.filter((p) => DATED.has(p.n))) for (const l of LANGS) if (!done.has(`${p.n}|${l}`)) emit(p, l, p.date, KEPT_PART[p.n]);
  const open = () => queue.some((p) => LANGS.some((l) => !done.has(`${p.n}|${l}`)));
  for (let day = FIRST_DAY; open(); day = addDays(day, 1)) {
    if (day > "2027-12-31") throw new Error(`${pl}: the run never ends`);
    // A new English post starts only while each later language is at most one post behind, so a post's
    // three languages stay on consecutive days.
    const behind = (l: LangCode, prev: LangCode) => queue.filter((p) => done.has(`${p.n}|${prev}`) && !done.has(`${p.n}|${l}`)).length;
    const enOk = behind("ja", "en") <= 1 && behind("id", "ja") <= 1;
    for (const l of LANGS) {
      if (onDay.get(day)?.has(l) || (onDay.get(day)?.size ?? 0) >= 3) continue;
      const prev = l === "ja" ? "en" : "ja";
      const p = l === "en"
        ? (enOk ? queue.find((p) => !DATED.has(p.n) && !done.has(`${p.n}|en`)) : undefined)
        : queue.find((p) => !done.has(`${p.n}|${l}`) && done.has(`${p.n}|${prev}`) && done.get(`${p.n}|${prev}`)! < day);
      if (p) emit(p, l, day, partOf(p));
    }
  }
}

// ---------- YouTube @matsuokengo: every post once, in English ----------
// Owner, 2026-11-21: each film is uploaded once, in English, on its approved day; Studio carries the Japanese
// and Indonesian titles and descriptions (Subtitles > Title and description), from wording-done.json.
for (const p of ordered) {
  const b = approved.get(p.n)!.find((b) => b.plat === "YouTube");
  if (!b) continue;
  const r = rowFor(p, b, EN, timeOn(p, b, EN, p.date, partOf(p)));
  if (SCHEDULED[r.id]) r.already_scheduled = true;
  if (r.wib !== approvedTime(p)) r.changed_since_approval.push(`Time: approved ${approvedTime(p)} WIB for every platform; now ${r.wib} WIB, this platform's best hour in ET`);
  if (b.format === "Short") {
    r.translations = MARKETS.filter((m) => m.lang !== "en").map((m) => {
      const w = worded.get(`${pid(p.n)}-${m.lang}-YouTube`);
      if (!w?.title || !w.caption) throw new Error(`no YouTube wording for ${pid(p.n)} ${m.lang}`);
      return { lang: m.lang, language: m.name, title: w.title, description: w.caption };
    });
    r.notes.push("Add the Japanese and Indonesian titles and descriptions in YouTube Studio: Subtitles > the video > Title and description > Add language.");
  } else r.notes.push("YouTube offers no translations for community posts, so this goes out in English only.");
  rows.push(r);
}

// ---------- X: the routine (docs/research/x-account-health-and-practice.md) ----------
// English only (owner, 2026-11-21): X has shown every post translated into the reader's language by
// default since April 2026 (TechCrunch 2026-04-08), so one English post reaches every market and the
// other twelve languages post nothing new on X. One account, 4 originals a day 6 hours apart (the
// routine's 3-5 a day, 4-8 hours apart), each slot at a local peak of a different region, 3 heavy
// pieces a week (the routine's 2-4), link on the last line (X's scheduler cannot schedule replies).
const X_SLOTS: { wib: string; zone: string; off: number; why: string }[] = [
  { wib: "03:00", zone: "ET", off: -12, why: "15:00 ET (Sprout tech X 11-16), 17:00 Brasília, 21:00 CET (Buffer X evening)" },
  { wib: "09:00", zone: "JST", off: 2, why: "11:00 JST (MIC 11-12時), 10:00 Taipei, 09:00 WIB (Jakpat 07-09)" },
  { wib: "15:00", zone: "CET", off: -6, why: "09:00 CET (Buffer X 9:00), 11:00 Riyadh, Istanbul and Moscow (Sprout tech X 11-16)" },
  { wib: "21:00", zone: "ET", off: -12, why: "09:00 ET (Buffer X Tue 9:00), 11:00 Brasília, 21:00 WIB (Jakpat 18-21), 23:00 JST (MIC 22-23時)" },
];
const HEAVY_PER_WEEK = 3;
const QUOTE_EVERY_DAYS = 3; // live quotes of trending posts, posted by hand on the day
// Already scheduled in X on 2026-11-21 (social-posts.md): kept, not repeated, and counted in the cadence.
const X_TAKEN = [
  { wib: "2026-11-21 21:30", lang: "en" as const, what: "Original, Undirect: \"Safari's Block Pop-ups setting has one exception...\"", post: null },
  { wib: "2026-11-22 01:00", lang: "en" as const, what: "Original, Cutling: \"Safari AutoFill puts your address into checkout forms...\"", post: null },
  { wib: "2026-11-27 20:15", lang: "ar" as const, what: "Arabic quote of @APPS_RH: Undirect half price Nov 27-30", post: null },
];
// Approved posts whose English X version would repeat tonight's originals.
const X_DUP_EN = new Set([5, 54]);

type XSlot = { t: number; s: (typeof X_SLOTS)[number]; kind?: "post" | "heavy" | "quote" | "original"; post?: Post };
const xs: XSlot[] = [];
const taken = X_TAKEN.map((x) => new Date(x.wib.replace(" ", "T") + ":00Z").getTime());
for (let d = new Date("2026-11-22T00:00:00Z").getTime(); d <= new Date("2026-12-20T00:00:00Z").getTime(); d += DAY) {
  for (const s of X_SLOTS) {
    const t = d + Number(s.wib.slice(0, 2)) * HOUR;
    if (taken.some((x) => Math.abs(x - t) < 4 * HOUR)) continue;
    xs.push({ t, s });
  }
}
const xBlock = (n: number) => approved.get(n)!.find((b) => b.plat === "X")!;

// 1. Every approved post with a schedulable X version goes out once, in the free slot nearest its
// approved minute; posts tied to an outside date (kept) go first and stay within 4 hours of it.
// A carousel post's X thread goes out as one post over its slides (X's scheduler can't schedule threads):
// the thread's first and last parts, the approved words, link on the last line.
const xPosts = posts.filter((p) => !p.gate && (xBlock(p.n).format !== "Thread" || p.kind === "carousel") && !X_DUP_EN.has(p.n));
const threadAsPost = (t: string) => { const parts = t.split(/\nPost \d+:\n/); return parts.length > 1 ? `${parts[0]}\n\n${parts.at(-1)}` : t; };
for (const p of [...xPosts].sort((a, b) => Number(b.slot === "kept") - Number(a.slot === "kept") || approvedTime(a).localeCompare(approvedTime(b)))) {
  const at = tOf(approvedTime(p));
  const free = xs.filter((s) => !s.kind && (p.slot !== "kept" || Math.abs(s.t - at) <= 4 * HOUR)).sort((a, b) => Math.abs(a.t - at) - Math.abs(b.t - at) || a.t - b.t);
  if (!free.length) throw new Error(`no X slot for P${p.n}`);
  free[0].kind = "post";
  free[0].post = p;
}
// 2. Heavy pieces and quotes at evenly spaced points of the month, each taking the nearest free slot.
const spread = (n: number, kind: "heavy" | "quote") => {
  const t0 = xs[0].t, t1 = xs.at(-1)!.t;
  for (let i = 0; i < n; i++) {
    const target = t0 + ((i + 0.5) * (t1 - t0)) / n;
    const s = xs.filter((s) => !s.kind).sort((a, b) => Math.abs(a.t - target) - Math.abs(b.t - target))[0];
    if (!s) throw new Error(`no free X slot for ${kind} ${i + 1}`);
    s.kind = kind;
  }
};
const weeks = (xs.at(-1)!.t - xs[0].t + DAY) / (7 * DAY);
spread(Math.round(weeks * HEAVY_PER_WEEK), "heavy");
spread(Math.round((weeks * 7) / QUOTE_EVERY_DAYS), "quote");
// 3. Every slot left is a new English original, for the writer.
xs.filter((s) => !s.kind).forEach((s) => (s.kind = "original"));

const xLen = (s: string) => [...s.replace(/\S+\.(com|example)(\/\S*)?/g, "x".repeat(23))].length;
let heavyN = 0, origN = 0;
for (const s of xs) {
  const wib = iso(s.t);
  const local = iso(s.t + s.s.off * HOUR);
  const base = { lang: "en" as LangCode, language: EN.name, country: "Every market: X translates each post for its reader", platform: "X" as Plat, account: HANDLE.X, wib, local, zone: s.s.zone, time_source: s.s.why, first_comment: null, media: [] as string[], on_screen_text: "none", notes: [] as string[] };
  if (s.kind === "quote") {
    rows.push({ ...base, id: `X-quote-${wib.replace(/\D/g, "")}`, post: null, app: "either", format: "Quote post",
      caption: null,
      needs_wording: "A quote of a post trending in the hours before this slot about a pain one of our apps fixes, with one line of substance; no link unless the quoted post asks for one; English; 280 characters. Written and posted by hand at the time: the post to quote isn't known in advance.",
      approved_post: false, in_approved_set: false, changed_since_approval: ["New: X routine quote slot"], notes: ["Not schedulable ahead: the quoted post is chosen at the time."] });
    continue;
  }
  if (s.kind === "heavy" || s.kind === "original") {
    const k = s.kind === "heavy" ? heavyN++ : origN++;
    const app = (k + (s.kind === "heavy" ? 0 : 1)) % 2 ? "Cutling" : "Undirect";
    const link = storeLink(app as "Undirect", "X", "en");
    rows.push({ ...base, id: s.kind === "heavy" ? `X-heavy-en-${k + 1}` : `X-original-en-${k + 1}`, post: null, app, format: s.kind === "heavy" ? "Long post (heavy piece)" : "Single post",
      caption: null,
      needs_wording: s.kind === "heavy"
        ? `English heavy piece for X: a how-to deep dive on one ${app} pain not covered by the other heavy pieces, as one long post (X's scheduler can't schedule threads; long posts need X Premium, up to 25,000 characters); the store link ${link} on its own last line. X translates it for every reader, so write for a worldwide audience: no US-only references.`
        : `English original for X on one ${app} pain, a different pain or angle from the approved posts in the days around it and from every other new original; no sentence or opening shared with another post (the routine); 280 characters including the store link ${link} on its own last line. X translates it for every reader, so write for a worldwide audience: no US-only references.`,
      approved_post: false, in_approved_set: false, changed_since_approval: [s.kind === "heavy" ? "New: X routine heavy piece" : "New: X routine original, filling a slot the 12 dropped languages used"],
      notes: s.kind === "heavy" ? ["Needs X Premium for its length; without it, post by hand as a thread at this time."] : [] });
    continue;
  }
  const p = s.post!;
  const b = xBlock(p.n);
  const r = rowFor(p, b, EN, { wib, local, why: s.s.why });
  Object.assign(r, { zone: s.s.zone, country: base.country });
  const reply = b.follow[0]?.text;
  const body = b.format === "Thread" && b.text ? threadAsPost(b.text) : b.text;
  const caption = b.poll ? [b.poll.q, reply].filter(Boolean).join("\n\n") : [body, reply].filter(Boolean).join("\n\n");
  r.caption = b.poll ? reply ?? null : caption;
  r.first_comment = null;
  r.x_length = xLen(caption);
  r.requires_x_premium = r.x_length > 280;
  r.changed_since_approval.push(`Time: approved ${approvedTime(p)} WIB; now ${wib} WIB under the X routine`);
  if (reply) r.changed_since_approval.push("Our first reply now closes the post itself, link on the last line: X's scheduler can't schedule replies");
  if (b.poll) r.notes.push("Poll: the question is the poll question; the caption text sits under it.");
  rows.push(r);
}
// The Arabic quote of @APPS_RH is a thank-you to a curator, kept scheduled outside the three languages.
const X_LANG = { ar: { name: "Arabic", country: "Saudi Arabia", zone: "Riyadh", off: -4 } } as const;
for (const x of X_TAKEN) {
  const m = x.lang === "en" ? MK.en : X_LANG[x.lang];
  const t = new Date(x.wib.replace(" ", "T") + ":00Z").getTime();
  rows.push({ id: `X-scheduled-${x.wib.replace(/\D/g, "")}`, post: null, app: "", lang: x.lang, language: m.name, country: m.country, platform: "X", account: HANDLE.X, format: "Already scheduled", wib: x.wib, local: iso(t + m.off * HOUR), zone: m.zone, time_source: "scheduled in X on 2026-11-21",
    caption: null, first_comment: null, media: [], on_screen_text: "none", needs_wording: null, approved_post: false, in_approved_set: false, changed_since_approval: [], already_scheduled: true,
    notes: [`${x.what}. Already in X's Scheduled list (social-posts.md): do not schedule again.`] });
}

// ---------- formats: every format on every platform ----------
// Owner, 2026-11-21: not mostly video. Single images, carousels, text posts and polls on X, Instagram and
// Facebook; Stories on Instagram and Facebook; Reels and TikTok videos; TikTok photo carousels; Threads
// text and image posts. A post keeps its approved kind; only the format a platform shows it in changes.
const KIND = new Map(posts.map((p) => [pid(p.n), p.kind]));
const slides = (post: string, max: number) => {
  const dir = join(OUT, post);
  return existsSync(dir) ? readdirSync(dir).filter((f) => /^ig-\d+\.png$/.test(f)).sort().slice(0, max).map((f) => join(dir, f)) : [];
};
// Facebook Stories already scheduled stay Stories.
const fbPollPosts = ordered.filter((p) => p.kind === "poll" && !SCHEDULED[`${pid(p.n)}-en-Facebook`] && approved.get(p.n)!.some((b) => b.plat === "Facebook" && b.format === "Story"));
const fbPolls = new Set(fbPollPosts.filter((_, i) => i % 2 === 0).map((p) => pid(p.n)));
for (const r of rows) {
  const kind = r.post ? KIND.get(r.post) : undefined;
  if (r.platform === "TikTok" && r.format === "Photo mode") r.format = "Photo carousel";
  if (r.platform === "Instagram" && kind === "text" && r.format === "Single image") r.format = "Text post (text card)";
  if (r.platform === "Facebook" && kind === "text") { r.format = "Text post"; r.media = []; r.on_screen_text = "none"; }
  if ((r.platform === "Facebook" || r.platform === "X") && kind === "carousel") {
    const s = slides(r.post!, r.platform === "X" ? 4 : 10);
    r.format = r.platform === "X" ? `Carousel (${s.length} images)` : "Carousel";
    r.media = s;
  }
  // Every other poll post that Facebook showed as a Story becomes a Facebook poll; the rest stay Stories.
  if (r.platform === "Facebook" && r.post && fbPolls.has(r.post)) {
    const src = r.lang === "en" ? approved.get(Number(r.post.slice(1)))!.find((b) => b.poll)?.poll : worded.get(`${r.post}-${r.lang}-Threads`)?.poll;
    r.format = "Poll";
    r.media = [];
    r.on_screen_text = "none";
    r.poll = src ? { q: src.q, options: src.options } : null;
    if (!src) r.needs_wording = `${r.language} poll question and options for ${r.post} on Facebook, from the English poll`;
    r.notes.push("Facebook poll: read Business Suite's composer for a poll option first; if a Page post offers none, post it from the Facebook app at this time.");
  }
}
const FORMATS_NEEDED: Partial<Record<Plat, [string, RegExp][]>> = {
  X: [["single image", /^Image$/], ["carousel", /^Carousel/], ["text post", /^Single post$/], ["poll", /^Poll$/], ["video", /^Video$/]],
  Instagram: [["single image", /^Single image$/], ["carousel", /^Carousel$/], ["text post", /^Text post/], ["poll", /poll sticker/], ["Story", /^Story/], ["Reel", /reel$/i]],
  Facebook: [["single image", /^Image post$/], ["carousel", /^Carousel$/], ["text post", /^Text post$/], ["poll", /^Poll$/], ["Story", /^Story/], ["Reel", /^Reel$/]],
  Threads: [["text post", /^Text$/], ["image post", /^Image$/]],
  TikTok: [["video", /^Video$/], ["photo carousel", /^Photo carousel$/]],
};
const formatBad: string[] = [];
for (const [pl, need] of Object.entries(FORMATS_NEEDED) as [Plat, [string, RegExp][]][]) for (const [name, re] of need) if (!rows.some((r) => r.platform === pl && re.test(r.format))) formatBad.push(`${pl} has no ${name}`);
if (formatBad.length) throw new Error(`formats missing:\n${formatBad.join("\n")}`);

// ---------- media: each row's file fits its platform's frame ----------
// A TikTok post, a Story, a Reel and a Short fill a 9:16 screen; anything else there floats in a dark frame
// (P12-it-TikTok, 2026-11-21). A row whose file is missing or the wrong shape gets media null and a
// needs_design brief for Fable; nothing is designed here.
const dims = new Map<string, [number, number] | null>();
const sizeOf = (f: string): [number, number] | null => {
  if (dims.has(f)) return dims.get(f)!;
  let wh: [number, number] | null = null;
  if (existsSync(f)) {
    const out = f.endsWith(".mp4")
      ? Bun.spawnSync(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", f]).stdout.toString().trim().split(",")
      : (Bun.spawnSync(["sips", "-g", "pixelWidth", "-g", "pixelHeight", f]).stdout.toString().match(/pixel(?:Width|Height): (\d+)/g) ?? []).map((s) => s.split(": ")[1]);
    if (out.length === 2 && out.every((n) => /^\d+$/.test(n))) wh = [Number(out[0]), Number(out[1])];
  }
  dims.set(f, wh);
  return wh;
};
const needsVertical = (r: Row) => r.platform === "TikTok" || /^Story/.test(r.format) || /reel$/i.test(r.format) || r.format === "Short";
const shape = (r: Row) => (needsVertical(r) ? "1080x1920 (9:16)" : r.platform === "X" || r.platform === "YouTube" ? "1080x1350 (4:5) or 1080x1080" : "1080x1350 (4:5)");
const aspectBad: string[] = [];
for (const r of rows) {
  if (!r.media?.length) continue;
  const wrong = r.media.map((f) => [f, sizeOf(f)] as const).filter(([, wh]) => !wh || (needsVertical(r) && Math.abs(wh[0] / wh[1] - 9 / 16) > 0.01));
  if (!wrong.length) continue;
  const why = wrong.map(([f, wh]) => (wh ? `${basename(f)} is ${wh[0]}x${wh[1]}` : `${basename(f)} is missing`)).join("; ");
  r.needs_design = `${r.format}, ${shape(r)}, ${r.language}: ${r.app} ${r.post ?? ""} as in the English row; ${why}`;
  r.media = null;
}
for (const r of rows) if (r.media?.length && needsVertical(r)) for (const f of r.media) { const wh = sizeOf(f)!; if (Math.abs(wh[0] / wh[1] - 9 / 16) > 0.01) aspectBad.push(`${r.id} ${basename(f)} ${wh.join("x")}`); }
if (aspectBad.length) throw new Error(`media off its platform's aspect:\n${aspectBad.join("\n")}`);

// Japanese and Indonesian rows over English on-screen text: flagged for a localized cut or image.
for (const r of rows) if (r.lang !== "en" && r.media?.length && /^English/.test(r.on_screen_text)) r.needs_localized_media = true;

// What the frame check of 2026-11-21 found in the media itself (overlays: Google's Shorts file and TikTok's
// In-Feed template, references in product-video/references/formats.md). Fable redesigns; the rows say why.
const FRAME_QA: Record<string, string> = {
  "u1.mp4": "end card: the App Store badge and device line sit under the Reels, Shorts and TikTok caption band (below y 1248)",
  "cutling-address.mp4": "end card: the App Store badge and device line sit under the Reels, Shorts and TikTok caption band (below y 1248)",
  "cutling-email.mp4": "end card: the App Store badge and device line sit under the Reels, Shorts and TikTok caption band (below y 1248)",
  "u2-short.mp4": "end card: the App Store badge and device line sit under the Reels, Shorts and TikTok caption band (below y 1248)",
  "cutling-android.mp4": "end card: the App Store badge and device line sit under the Reels, Shorts and TikTok caption band (below y 1248)",
  "u-mac.mp4": "end card: the App Store badge and device line sit under the Reels, Shorts and TikTok caption band (below y 1248)",
  "P05/tt-1.png": "\"The tabs still open.\" sits under TikTok's caption band and the toggle under its right rail",
  "P09/card-tt.png": "the Cutling badge sits under TikTok's caption band and \"Product Hunt\" touches the right rail",
  "P12/tt-1.png": "a 4:5 card floats in the top half of a dark 9:16 frame; its top words sit under TikTok's search bar",
  "_assets/tt-end-Cutling.png": "\"Cutling\" and \"App Store\" run under TikTok's right button column",
  "_assets/tt-end-Undirect.png": "\"Undirect\" and \"App Store\" run under TikTok's right button column",
};
const qaKey = (f: string) => Object.keys(FRAME_QA).find((k) => f.endsWith(`/${k}`));
for (const r of rows) if (r.media?.length && (r.platform === "TikTok" || /reel$/i.test(r.format) || r.format === "Short")) {
  const hits = r.media.map(qaKey).filter(Boolean) as string[];
  if (hits.length) r.notes.push(`Frame check 2026-11-21 failed: ${hits.map((k) => `${k}: ${FRAME_QA[k]}`).join("; ")}. Do not schedule until Fable's fix lands.`), (r.frame_fail = hits);
}

// ---------- checks ----------
rows.sort((a, b) => a.wib.localeCompare(b.wib) || a.id.localeCompare(b.id));
// Every calendar delivery; not X's three earlier items or quotes.
const cal = rows.filter((r) => !(r.platform === "X" && r.already_scheduled) && !r.id.startsWith("X-quote"));
const count = (f: (r: Row) => boolean) => Object.fromEntries(LANGS.map((l) => [l, cal.filter((r) => r.lang === l && f(r)).length]));
const perLang = count(() => true);
const perPlat = Object.fromEntries((["X", ...NON_X] as Plat[]).map((pl) => [pl, count((r) => r.platform === pl)]));
const rotBad: string[] = [];
const ldOf = (r: Row) => localDay(r.wib, MK[r.lang as LangCode]);
for (const pl of ROTATED) {
  const want = posts.filter((p) => approved.get(p.n)!.some((b) => b.plat === pl)).length;
  for (const l of LANGS) {
    const ids = cal.filter((r) => r.platform === pl && r.lang === l).map((r) => r.post);
    if (ids.length !== want || new Set(ids).size !== want) rotBad.push(`${pl} ${l}: ${ids.length} rows for ${want} posts`);
  }
}
if (cal.some((r) => r.platform === "YouTube" && r.lang !== "en")) rotBad.push("non-English YouTube row");
if (cal.some((r) => !LANGS.includes(r.lang as LangCode))) rotBad.push("a row outside en, ja and id");
for (const [id, wib] of Object.entries(SCHEDULED)) { const r = rows.find((r) => r.id === id); if (!r || r.wib !== wib || !r.already_scheduled) rotBad.push(`scheduled ${id} moved or missing`); }
for (const r of cal.filter((r) => r.platform !== "X" && r.lang !== "en" && r.format !== "Poll")) if (r.needs_wording || r.caption !== (worded.get(r.id)!.caption ?? null)) rotBad.push(`${r.id} caption not from wording-done.json`);
// A post's languages go en, then ja, then id, on consecutive local days where nothing scheduled is in the way.
const lag = { ja: [] as number[], id: [] as number[] };
for (const pl of ROTATED) for (const p of posts) {
  const d = Object.fromEntries(LANGS.map((l) => [l, cal.find((r) => r.platform === pl && r.post === pid(p.n) && r.lang === l)])) as Record<LangCode, Row | undefined>;
  if (!d.en) continue;
  const day = (r: Row) => tOf(`${ldOf(r)} 00:00`) / DAY;
  if (day(d.ja!) < day(d.en) || day(d.id!) < day(d.ja!)) rotBad.push(`${pl} ${pid(p.n)} languages out of order`);
  lag.ja.push(day(d.ja!) - day(d.en));
  lag.id.push(day(d.id!) - day(d.ja!));
}
// Each local day carries at most one post per language per platform, scheduled rows aside.
const sameDay: string[] = [];
for (const pl of ROTATED) {
  const seen = new Map<string, Row[]>();
  for (const r of cal.filter((r) => r.platform === pl)) (seen.get(`${ldOf(r)}|${r.lang}`) ?? seen.set(`${ldOf(r)}|${r.lang}`, []).get(`${ldOf(r)}|${r.lang}`)!).push(r);
  for (const [k, rs] of seen) if (rs.length > 1 && rs.filter((r) => !r.already_scheduled).length > 0 && !rs.every((r) => DATED.has(Number(r.post!.slice(1))) || r.already_scheduled)) sameDay.push(`${pl} ${k} ${rs.map((r) => r.post).join("+")}`);
}
if (sameDay.length) rotBad.push(`two posts in one language on one day:\n${sameDay.join("\n")}`);
for (const pl of ROTATED) {
  const ts = cal.filter((r) => r.platform === pl).map((r) => tOf(r.wib)).sort((a, b) => a - b);
  ts.forEach((t, i) => i && t - ts[i - 1] < 15 * 60000 && rotBad.push(`${pl} two posts within 15 minutes at ${iso(t)}`));
}
for (const r of cal.filter((r) => SALE_POSTS.has(Number(r.post?.slice(1))) && r.platform !== "X" && r.platform !== "YouTube")) if (r.wib < SALE_START || r.wib >= SALE_END) rotBad.push(`${r.id} at ${r.wib} WIB, outside the sale`);
for (const r of cal.filter((r) => r.post === "P09" && ROTATED.includes(r.platform))) if (ldOf(r) !== "2026-11-24") rotBad.push(`${r.id} off Product Hunt day`);
// About 3 a day per platform, counted by WIB day over the run.
const perDay: Record<string, { min: number; max: number; mean: number; last_day: string }> = {};
for (const pl of NON_X) {
  const rs = cal.filter((r) => r.platform === pl);
  const last = rs.map((r) => r.wib.slice(0, 10)).sort().at(-1)!;
  const days = new Map<string, number>();
  for (let d = tOf("2026-11-22 00:00"); iso(d).slice(0, 10) <= last; d += DAY) days.set(iso(d).slice(0, 10), 0);
  for (const r of rs) if (days.has(r.wib.slice(0, 10))) days.set(r.wib.slice(0, 10), days.get(r.wib.slice(0, 10))! + 1);
  const v = [...days.values()];
  perDay[pl] = { min: Math.min(...v), max: Math.max(...v), mean: Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 100) / 100, last_day: last };
  if (perDay[pl].max > 5) rotBad.push(`${pl} ${perDay[pl].max} posts on one WIB day`);
}
if (rotBad.length) throw new Error(`calendar broken:\n${rotBad.join("\n")}`);
// X is English only; the one other-language X row is the Arabic quote already scheduled.
const xOther = rows.filter((r) => r.platform === "X" && r.lang !== "en" && !r.already_scheduled);
if (xOther.length) throw new Error(`non-English X rows ${xOther.map((r) => r.id).join(", ")}`);
// X cadence: gaps and daily counts on the one account.
const xt = rows.filter((r) => r.platform === "X").map((r) => new Date(r.wib.replace(" ", "T") + ":00Z").getTime()).sort((a, b) => a - b);
const gaps = xt.slice(1).map((t, i) => (t - xt[i]) / HOUR);
const xDays = new Map<string, number>();
xt.forEach((t) => xDays.set(iso(t).slice(0, 10), (xDays.get(iso(t).slice(0, 10)) ?? 0) + 1));
// The two English originals already scheduled tonight sit 3.5 hours apart; that gap is X's, not ours.
const takenT = new Set(X_TAKEN.map((x) => new Date(x.wib.replace(" ", "T") + ":00Z").getTime()));
const badGap = gaps.filter((g, i) => (g < 4 || g > 8) && !(takenT.has(xt[i]) && takenT.has(xt[i + 1])));
const xPerDay = [...xDays.entries()].filter(([d]) => d >= "2026-11-22" && d <= "2026-12-20").map(([, n]) => n);
const heavy = rows.filter((r) => r.id.startsWith("X-heavy")).map((r) => r.wib);
const ht = heavy.map((w) => new Date(w.replace(" ", "T") + ":00Z").getTime());
const winStart = new Date("2026-11-22T00:00:00Z").getTime(), winEnd = new Date("2026-12-21T00:00:00Z").getTime();
const heavyWeeks: number[] = [];
for (let w = winStart; w + 7 * DAY <= winEnd; w += DAY) heavyWeeks.push(ht.filter((t) => t >= w && t < w + 7 * DAY).length);
const bad = [
  ...(badGap.length ? [`${badGap.length} X gaps outside 4-8 hours: ${badGap.join(", ")}`] : []),
  ...(Math.min(...xPerDay) < 3 || Math.max(...xPerDay) > 5 ? [`X per day ${Math.min(...xPerDay)}-${Math.max(...xPerDay)}`] : []),
  ...(Math.min(...heavyWeeks) < 2 || Math.max(...heavyWeeks) > 4 ? [`heavy per 7 days ${Math.min(...heavyWeeks)}-${Math.max(...heavyWeeks)}`] : []),
];
if (bad.length) throw new Error(`X routine broken: ${bad.join("; ")}`);
const words = rows.filter((r) => r.needs_wording);
const formatCount = Object.fromEntries((["X", ...NON_X] as Plat[]).map((pl) => [pl, cal.filter((r) => r.platform === pl).reduce((o, r) => ((o[r.format] = (o[r.format] ?? 0) + 1), o), {} as Record<string, number>)]));
const hist = (v: number[]) => v.reduce((o, n) => ((o[n] = (o[n] ?? 0) + 1), o), {} as Record<number, number>);

// ---------- write ----------
const meta = {
  built: new Date().toISOString(), approved_commit: APPROVED, version: 7,
  window: `2026-11-22 to ${Object.values(perDay).map((d) => d.last_day).sort().at(-1)}, WIB`,
  languages: MARKETS.map(({ lang, name, country, zone, off }) => ({ lang, name, country, zone, hours_from_wib: off })),
  deliveries_per_language: perLang, deliveries_per_platform_per_language: perPlat,
  rotation: {
    version: 7, platforms: ROTATED, rule: "one account per platform; one post a day starts in English, the next day in Japanese, the day after in Indonesian, so each day's three are en, ja and id, each at its market's best local hour; posts tied to a date go out in all three that day; YouTube English with ja and id titles and descriptions; X English only",
    per_day: perDay, already_scheduled: Object.keys(SCHEDULED).length,
    days_from_en_to_ja: hist(lag.ja), days_from_ja_to_id: hist(lag.id),
  },
  formats: formatCount,
  needs_design: rows.filter((r) => r.needs_design).length,
  needs_localized_media: rows.filter((r) => r.needs_localized_media).length,
  frame_fail: rows.filter((r) => r.frame_fail).length,
  x: { per_day_min: Math.min(...xPerDay), per_day_max: Math.max(...xPerDay), gap_hours_min: Math.min(...gaps), gap_hours_max: Math.max(...gaps), gaps_outside_4_to_8: badGap.length, english_only: true, heavy_per_7_days_min: Math.min(...heavyWeeks), heavy_per_7_days_max: Math.max(...heavyWeeks), heavy_pieces: heavy, new_originals: rows.filter((r) => r.id.startsWith("X-original")).length, approved_posts: rows.filter((r) => r.platform === "X" && r.post).length, quote_slots: rows.filter((r) => r.id.startsWith("X-quote")).length },
  needs_wording: words.length, missing_media: [...missingMedia],
};
// Fable's list: new media no file exists for, localized cuts of English on-screen media, and fixes the
// frame check found. Grouped by file so one design pass covers every row that uses it.
const byFile = (pred: (r: Row) => boolean, key: (r: Row) => string[]) => {
  const g = new Map<string, Row[]>();
  for (const r of rows.filter(pred)) for (const k of key(r)) (g.get(k) ?? g.set(k, []).get(k)!).push(r);
  return [...g.entries()].map(([file, rs]) => ({ file, rows: rs.map((r) => ({ id: r.id, platform: r.platform, format: r.format, lang: r.lang, wib: r.wib })) }));
};
const design = {
  meta: { built: meta.built, rule: "Rows here have no finished media for their platform and language. Design is Fable's; this file only lists what is missing and why." },
  new_media: rows.filter((r) => r.needs_design).map((r) => ({ id: r.id, platform: r.platform, format: r.format, lang: r.lang, wib: r.wib, needs_design: r.needs_design })),
  localized_media: byFile((r) => !!r.needs_localized_media, (r) => r.media!.map((f) => f.replace(`${OUT}/`, "").replace(`${homedir()}/`, "~/"))).map((g) => ({ ...g, langs: [...new Set(g.rows.map((r) => r.lang))], needs: "the same frames with their on-screen words in each listed language" })),
  frame_fixes: Object.entries(FRAME_QA).map(([file, issue]) => ({ file, issue, rows: rows.filter((r) => r.frame_fail?.includes(file)).map((r) => r.id) })),
};
writeFileSync(join(HERE, "design-needed.json"), JSON.stringify(design, null, 1) + "\n");
writeFileSync(join(HERE, "deliveries.json"), JSON.stringify({ meta, rows }, null, 1) + "\n");
const first = rows.filter((r) => r.platform !== "X" && r.approved_post && r.wib >= NOW && r.wib < FIRST_END);
const firstCount = (k: "lang" | "platform") => first.reduce((o, r) => ((o[r[k]] = (o[r[k]] ?? 0) + 1), o), {} as Record<string, number>);
writeFileSync(join(HERE, "deliveries-first.json"), JSON.stringify({ meta: { window: `${NOW} to 2026-11-24 23:59 WIB`, platforms: NON_X, approved_posts_only: true, rows: first.length, ready_to_schedule: first.filter((r) => !r.needs_wording).length, needs_wording: first.filter((r) => r.needs_wording).length, per_language: firstCount("lang"), per_platform: firstCount("platform"), note: "Western markets' Nov 24 evening falls on Nov 25 WIB, so their Nov 24 posts are in deliveries.json, not here." }, rows: first }, null, 1) + "\n");

// The non-English rows from now to Nov 25 23:59 WIB, every one worded, for the scheduling run.
const next = rows.filter((r) => r.platform !== "X" && r.lang !== "en" && r.wib >= NOW && r.wib < NEXT_END);
if (next.some((r) => r.needs_wording)) throw new Error("deliveries-next has an unworded row");
const nextCount = (k: "lang" | "platform") => next.reduce((o, r) => ((o[r[k]] = (o[r[k]] ?? 0) + 1), o), {} as Record<string, number>);
writeFileSync(join(HERE, "deliveries-next.json"), JSON.stringify({ meta: { window: `${NOW} to 2026-11-25 23:59 WIB`, version: 7, what: "the Japanese and Indonesian rows in this window, captions from wording-done.json; rows with frame_fail or needs_localized_media wait for Fable before scheduling", rows: next.length, per_language: nextCount("lang"), per_platform: nextCount("platform"), held: next.filter((r) => !r.approved_post).length }, rows: next }, null, 1) + "\n");

// Wording grouped by post and language, so one writer pass covers a post's platforms together.
const groups = new Map<string, { post: string | null; lang: LangCode; language: string; app: string; rows: { id: string; platform: Plat; format: string; wib: string; needs_wording: string; first_comment_link?: string }[] }>();
for (const r of words) {
  const k = `${r.post ?? r.id}|${r.lang}`;
  if (!groups.has(k)) groups.set(k, { post: r.post, lang: r.lang, language: r.language, app: r.app, rows: [] });
  groups.get(k)!.rows.push({ id: r.id, platform: r.platform, format: r.format, wib: r.wib, needs_wording: r.needs_wording!, ...(r.first_comment?.link ? { first_comment_link: r.first_comment.link } : {}) });
}
const wn = [...groups.values()].sort((a, b) => a.rows[0].wib.localeCompare(b.rows[0].wib));
writeFileSync(join(HERE, "wording-needed.json"), JSON.stringify({ meta: { rules: "Write natively in each language (human-prose language rules), never translated word for word from the English; keep each English row's meaning, numbers and app facts; prices from that country's App Store; one app per post; no country of ours named.", groups: wn.length, rows: words.length, first_window_rows: first.filter((r) => r.needs_wording).length }, groups: wn }, null, 1) + "\n");

console.log(JSON.stringify({ ...meta, next: { rows: next.length, per_language: nextCount("lang"), per_platform: nextCount("platform") }, first: { rows: first.length, per_language: firstCount("lang"), per_platform: firstCount("platform") }, wording_groups: wn.length }, null, 1));
