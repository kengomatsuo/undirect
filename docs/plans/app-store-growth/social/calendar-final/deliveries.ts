// Writes the schedulable export of the @monholtco calendar:
//   deliveries.json        every delivery, Nov 22-Dec 20 2026, every language, every platform
//   deliveries-first.json  Instagram, Facebook, Threads, TikTok and YouTube from now to Nov 24 23:59 WIB,
//                          approved posts only, so scheduling can start before the rest is worded
//   wording-needed.json    every caption still to be written, grouped by post and language
// Run: bun deliveries.ts
//
// The English captions are the owner's approved ones ("All approved", 2026-11-21), read verbatim from
// calendar-final.txt as committed in APPROVED. No caption is written here: every non-English caption and
// every new X piece is null with a `needs_wording` brief, for the writer to fill.

import { $ } from "bun";
import { existsSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, isAbsolute } from "node:path";
import { posts, type Post } from "./posts";
import { MARKETS, PART_OF_SLOT, deliveryTime, iso, DAY, HOUR, type Market, type Plat, type Part, type LangCode } from "./markets";

const APPROVED = "8ab6e232"; // the version the owner approved
const HERE = import.meta.dir;
const OUT = join(homedir(), "Downloads/social-calendar");
const NOW = process.env.NOW ?? "2026-11-21 18:30"; // WIB; rows before this are past
const FIRST_END = "2026-11-25 00:00";

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
const storeLink = (app: "Undirect" | "Cutling", plat: Plat, lang: LangCode) => `https://apps.apple.com/app/apple-store/id${APP_ID[app]}?pt=127609326&ct=${PCODE[plat]}-${lang.toLowerCase()}&mt=8`;
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
  id: string; post: string | null; app: string; lang: LangCode; language: string; country: string;
  platform: Plat; account: string; format: string;
  wib: string; local: string; zone: string; time_source: string;
  caption: string | null; title?: string | null; poll?: { q: string | null; options: (string | null)[] } | null; sticker?: string | null;
  first_comment: { label: string; text: string | null; link?: string } | null;
  media: string[]; on_screen_text: string;
  needs_wording: string | null;
  approved_post: boolean; in_approved_set: boolean; changed_since_approval: string[];
  x_length?: number; requires_x_premium?: boolean;
  already_scheduled?: boolean; notes: string[];
};
const rows: Row[] = [];
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

// ---------- Instagram, Facebook, Threads, TikTok, YouTube: every post, every language ----------
// Posts tied to an outside date (Product Hunt day, the sale, MacPip day) keep their approved minute in
// English and go out in the evening locally elsewhere, which stays inside that day in Pacific time.
const KEPT_PART: Record<number, Part> = { 9: "pm", 17: "pm", 26: "pm", 50: "pm" };
const NON_X: Plat[] = ["Instagram", "Facebook", "Threads", "TikTok", "YouTube"];
const approvedTime = (p: Post) => {
  const s = p.slot === "kept" ? p.keptTime!.wib : ({ 1: "02:20", 2: "05:50", 3: "21:20" } as Record<number, string>)[p.slot];
  return `${p.date} ${s}`;
};

for (const p of posts) {
  const blocks = approved.get(p.n)!;
  for (const m of MARKETS) {
    for (const b of blocks.filter((b) => NON_X.includes(b.plat))) {
      const part = p.slot === "kept" ? KEPT_PART[p.n] : PART_OF_SLOT[String(p.slot)];
      let when: { wib: string; local: string; why: string };
      if (p.slot === "kept" && m.lang === "en") {
        const t = new Date(approvedTime(p).replace(" ", "T") + ":00Z").getTime();
        when = { wib: iso(t), local: iso(t + m.off * HOUR), why: "the approved minute, tied to the launch or sale day" };
      } else {
        const d = deliveryTime(p.date, part, b.plat, m);
        when = { wib: iso(d.t), local: d.local, why: d.why };
      }
      const r = rowFor(p, b, m, when);
      if (m.lang === "en" && when.wib !== approvedTime(p)) r.changed_since_approval.push(`Time: approved ${approvedTime(p)} WIB for every platform; now ${when.wib} WIB, this platform's best hour in ${m.zone}`);
      if (r.notes.some((n, i) => n !== b.notes.filter((n) => !YT_NOTE.test(n))[i])) r.changed_since_approval.push("Note changed: answers are text over film, no face on camera");
      rows.push(r);
    }
  }
}

// ---------- X: the routine (docs/research/x-account-health-and-practice.md) ----------
// One account, 3-5 originals a day, 4-8 hours apart, about 2-3 heavy pieces a week, link on the last
// line (X's scheduler cannot schedule replies). Thirteen languages share it, so each language gets the
// same number of X posts: 7 approved posts and 1 heavy piece, at a WIB hour inside its local window.
const X_SLOTS: { wib: string; langs: LangCode[] }[] = [
  { wib: "03:00", langs: ["en", "pt-BR", "fr", "it", "de", "es"] }, // 15:00 ET, 17:00 Brasília, 21:00 CET
  { wib: "09:00", langs: ["id", "zh-Hant", "zh-Hans", "ja"] }, // 09:00 WIB, 10:00 Taipei, 11:00 JST
  { wib: "15:00", langs: ["ar", "tr", "ru", "fr", "it", "de", "es"] }, // 11:00 Riyadh/Istanbul/Moscow, 09:00 CET
  { wib: "21:00", langs: ["en", "pt-BR", "ar", "tr", "ru", "id", "zh-Hant", "zh-Hans", "ja"] }, // 09:00 ET, 11:00 Brasília, 17:00 Riyadh, 21:00 WIB, 22:00 Taipei, 23:00 JST
];
const X_WHY: Record<string, string> = { en: "Buffer X Tue 9:00 / Sprout tech 11-16 ET", "pt-BR": "Sprout tech X 11-16, Brasília", fr: "Buffer X 9:00 / evening, CET", it: "Buffer X 9:00 / evening, CET", de: "Buffer X 9:00 / evening, CET", es: "Buffer X 9:00 / evening, CET", ar: "Sprout tech X 11-16; our 132-download Arabic post went out 16:16 Riyadh", tr: "Sprout tech X 11-16, Istanbul", ru: "Sprout tech X 11-16, Moscow", id: "Jakpat 07-09 and 18-21", "zh-Hant": "GUESS: MIC's Japan hours applied to Taipei", "zh-Hans": "GUESS: MIC's Japan hours applied to UTC+8", ja: "MIC 11-12時 and 22-23時" };
const PER_LANG_X = 8;
// Already scheduled in X on 2026-11-21 (social-posts.md): not repeated, and counted in the cadence.
const X_TAKEN = [
  { wib: "2026-11-21 21:30", lang: "en" as LangCode, what: "Original, Undirect: \"Safari's Block Pop-ups setting has one exception...\"", post: null },
  { wib: "2026-11-22 01:00", lang: "en" as LangCode, what: "Original, Cutling: \"Safari AutoFill puts your address into checkout forms...\"", post: null },
  { wib: "2026-11-27 20:15", lang: "ar" as LangCode, what: "Arabic quote of @APPS_RH: Undirect half price Nov 27-30", post: null },
];
// Approved posts whose English X version would repeat tonight's originals.
const X_DUP_EN = new Set([5, 54]);

type XSlot = { t: number; langs: LangCode[]; lang?: LangCode; quote?: boolean };
const xs: XSlot[] = [];
for (let d = new Date("2026-11-22T00:00:00Z").getTime(); d <= new Date("2026-12-20T00:00:00Z").getTime(); d += DAY) {
  for (const s of X_SLOTS) {
    const t = d + Number(s.wib.slice(0, 2)) * HOUR;
    const taken = X_TAKEN.map((x) => new Date(x.wib.replace(" ", "T") + ":00Z").getTime());
    if (taken.some((x) => Math.abs(x - t) < 4 * HOUR)) continue;
    xs.push({ t, langs: s.langs });
  }
}
// Slots beyond 13 x 8 are spread through the month as live quotes of trending posts.
const nQuote = xs.length - MARKETS.length * PER_LANG_X;
for (let i = 0; i < nQuote; i++) xs[Math.floor(((i + 0.5) * xs.length) / nQuote)].quote = true;
const got = new Map<LangCode, number[]>(MARKETS.map((m) => [m.lang, []]));
const open = xs.filter((s) => !s.quote);
open.forEach((s, i) => {
  const cands = s.langs.filter((l) => got.get(l)!.length < PER_LANG_X);
  if (!cands.length) { s.quote = true; return; }
  // The language whose remaining need is largest against the slots still open to it goes first.
  const left = (l: LangCode) => open.slice(i).filter((o) => o.langs.includes(l)).length;
  const urgency = (l: LangCode) => (PER_LANG_X - got.get(l)!.length) / left(l);
  cands.sort((a, b) => urgency(b) - urgency(a) || (got.get(a)!.at(-1) ?? 0) - (got.get(b)!.at(-1) ?? 0));
  s.lang = cands[0];
  got.get(s.lang)!.push(s.t);
});
const short = MARKETS.filter((m) => got.get(m.lang)!.length !== PER_LANG_X);
if (short.length) throw new Error(`X slots left ${short.map((m) => `${m.lang} at ${got.get(m.lang)!.length}`).join(", ")}`);

// One heavy piece per language, at evenly spaced points of the month (about 3 a week): each target
// takes the nearest slot of a language that has none yet.
const heavyAt = new Map<LangCode, number>();
{
  const assigned = xs.filter((s) => s.lang);
  const t0 = assigned[0].t, t1 = assigned.at(-1)!.t;
  for (let i = 0; i < MARKETS.length; i++) {
    const target = t0 + ((i + 0.5) * (t1 - t0)) / MARKETS.length;
    const s = assigned.filter((s) => !heavyAt.has(s.lang!)).sort((a, b) => Math.abs(a.t - target) - Math.abs(b.t - target))[0];
    heavyAt.set(s.lang!, got.get(s.lang!)!.indexOf(s.t));
  }
}
const xLen = (s: string) => [...s.replace(/\S+\.(com|example)(\/\S*)?/g, "x".repeat(23))].length;
const usedX = new Map<LangCode, Set<number>>(MARKETS.map((m) => [m.lang, new Set()]));
const lastOnX = new Map<number, number>();
const xBlock = (n: number) => approved.get(n)!.find((b) => b.plat === "X")!;
for (const s of xs) {
  const wib = iso(s.t);
  if (s.quote) {
    rows.push({ id: `X-quote-${wib.replace(/\D/g, "")}`, post: null, app: "either", lang: "en", language: "English or the quoted post's language", country: "", platform: "X", account: HANDLE.X, format: "Quote post", wib, local: iso(s.t - 12 * HOUR), zone: "ET", time_source: "keeps the 4-8 hour cadence",
      caption: null, first_comment: null, media: [], on_screen_text: "none",
      needs_wording: "A quote of a post trending in the hours before this slot about a pain one of our apps fixes, with one line of substance; no link unless the quoted post asks for one; English or the quoted post's language; 280 characters. Written and posted by hand at the time: the post to quote isn't known in advance.",
      approved_post: false, in_approved_set: false, changed_since_approval: ["New: X routine quote slot"], notes: ["Not schedulable ahead: the quoted post is chosen at the time."] });
    continue;
  }
  const m = MARKETS.find((m) => m.lang === s.lang)!;
  const k = got.get(m.lang)!.indexOf(s.t);
  const local = iso(s.t + m.off * HOUR);
  const when = { wib, local, why: X_WHY[m.lang] };
  if (k === heavyAt.get(m.lang)) {
    const app = MARKETS.indexOf(m) % 2 ? "Cutling" : "Undirect";
    rows.push({ id: `X-heavy-${m.lang}`, post: null, app, lang: m.lang, language: m.name, country: m.country, platform: "X", account: HANDLE.X, format: "Long post (heavy piece)", wib, local, zone: m.zone, time_source: when.why,
      caption: null, first_comment: null, media: [], on_screen_text: "none",
      needs_wording: `${m.name} heavy piece for X: a how-to deep dive on one ${app} pain, as one long post (X's scheduler can't schedule threads; long posts need X Premium, up to 25,000 characters); the store link ${storeLink(app as "Undirect", "X", m.lang)} on its own last line.`,
      approved_post: false, in_approved_set: false, changed_since_approval: ["New: X routine heavy piece"], notes: ["Needs X Premium for its length; without it, post by hand as a thread at this time."] });
    continue;
  }
  const day = (iso: string) => new Date(iso.slice(0, 10) + "T00:00:00Z").getTime();
  const dLocal = day(local);
  const cands = posts.filter((p) => !p.gate && !usedX.get(m.lang)!.has(p.n) && xBlock(p.n).format !== "Thread" && !(m.lang === "en" && X_DUP_EN.has(p.n)) && (p.slot !== "kept" || day(p.date) === dLocal));
  cands.sort((a, b) => {
    const sc = (p: Post) => Math.abs(day(p.date) - dLocal) / DAY + (s.t - (lastOnX.get(p.n) ?? -Infinity) < 3 * DAY ? 10 : 0);
    return sc(a) - sc(b) || a.n - b.n;
  });
  const p = cands[0];
  usedX.get(m.lang)!.add(p.n);
  lastOnX.set(p.n, s.t);
  const b = xBlock(p.n);
  const r = rowFor(p, b, m, when);
  if (m.lang === "en") {
    const reply = b.follow[0]?.text;
    const caption = b.poll ? [b.poll.q, reply].filter(Boolean).join("\n\n") : [b.text, reply].filter(Boolean).join("\n\n");
    r.caption = b.poll ? reply ?? null : caption;
    r.first_comment = null;
    r.x_length = xLen(caption);
    r.requires_x_premium = r.x_length > 280;
    r.changed_since_approval.push(`Time: approved ${approvedTime(p)} WIB; now ${wib} WIB under the X routine`);
    if (reply) r.changed_since_approval.push("Our first reply now closes the post itself, link on the last line: X's scheduler can't schedule replies");
    if (b.poll) r.notes.push("Poll: the question is the poll question; the caption text sits under it.");
  } else {
    r.first_comment = null;
    r.needs_wording = r.needs_wording!.replace(/; the line before the link in the our first reply[^;]*/, "") + `; the post ends with the line ${storeLink(p.app === "Both" ? "Undirect" : (p.app as "Undirect"), "X", m.lang)} on its own (X's scheduler can't schedule replies)`;
  }
  rows.push(r);
}
for (const x of X_TAKEN) {
  const m = MARKETS.find((m) => m.lang === x.lang)!;
  const t = new Date(x.wib.replace(" ", "T") + ":00Z").getTime();
  rows.push({ id: `X-scheduled-${x.wib.replace(/\D/g, "")}`, post: null, app: "", lang: x.lang, language: m.name, country: m.country, platform: "X", account: HANDLE.X, format: "Already scheduled", wib: x.wib, local: iso(t + m.off * HOUR), zone: m.zone, time_source: "scheduled in X on 2026-11-21",
    caption: null, first_comment: null, media: [], on_screen_text: "none", needs_wording: null, approved_post: false, in_approved_set: false, changed_since_approval: [], already_scheduled: true,
    notes: [`${x.what}. Already in X's Scheduled list (social-posts.md): do not schedule again.`] });
}

// ---------- checks ----------
rows.sort((a, b) => a.wib.localeCompare(b.wib) || a.id.localeCompare(b.id));
const cal = rows.filter((r) => !r.already_scheduled && !r.id.startsWith("X-quote"));
const count = (f: (r: Row) => boolean) => Object.fromEntries(MARKETS.map((m) => [m.lang, cal.filter((r) => r.lang === m.lang && f(r)).length]));
const perLang = count(() => true);
if (new Set(Object.values(perLang)).size !== 1) throw new Error(`unequal per-language counts ${JSON.stringify(perLang)}`);
const perPlat = Object.fromEntries((["X", ...NON_X] as Plat[]).map((pl) => [pl, count((r) => r.platform === pl)]));
for (const [pl, c] of Object.entries(perPlat)) if (new Set(Object.values(c)).size !== 1) throw new Error(`unequal ${pl} counts ${JSON.stringify(c)}`);
// X cadence: gaps and daily counts on the one account.
const xt = rows.filter((r) => r.platform === "X").map((r) => new Date(r.wib.replace(" ", "T") + ":00Z").getTime()).sort((a, b) => a - b);
const gaps = xt.slice(1).map((t, i) => (t - xt[i]) / HOUR);
const xDays = new Map<string, number>();
xt.forEach((t) => xDays.set(iso(t).slice(0, 10), (xDays.get(iso(t).slice(0, 10)) ?? 0) + 1));
const badGap = gaps.filter((g) => g < 4 || g > 8);
const xPerDay = [...xDays.entries()].filter(([d]) => d >= "2026-11-22" && d <= "2026-12-20").map(([, n]) => n);
const heavy = rows.filter((r) => r.id.startsWith("X-heavy")).map((r) => r.wib);
const words = rows.filter((r) => r.needs_wording);

// ---------- write ----------
const meta = {
  built: new Date().toISOString(), approved_commit: APPROVED, window: "2026-11-22 to 2026-12-20, WIB",
  languages: MARKETS.map(({ lang, name, country, zone, off }) => ({ lang, name, country, zone, hours_from_wib: off })),
  deliveries_per_language: perLang, deliveries_per_platform_per_language: perPlat,
  x: { per_day_min: Math.min(...xPerDay), per_day_max: Math.max(...xPerDay), gap_hours_min: Math.min(...gaps), gap_hours_max: Math.max(...gaps), gaps_outside_4_to_8: badGap.length, heavy_pieces: heavy, quote_slots: rows.filter((r) => r.id.startsWith("X-quote")).length },
  needs_wording: words.length, missing_media: [...missingMedia],
};
writeFileSync(join(HERE, "deliveries.json"), JSON.stringify({ meta, rows }, null, 1) + "\n");
const first = rows.filter((r) => r.platform !== "X" && r.approved_post && r.wib >= NOW && r.wib < FIRST_END);
const firstCount = (k: "lang" | "platform") => first.reduce((o, r) => ((o[r[k]] = (o[r[k]] ?? 0) + 1), o), {} as Record<string, number>);
writeFileSync(join(HERE, "deliveries-first.json"), JSON.stringify({ meta: { window: `${NOW} to 2026-11-24 23:59 WIB`, platforms: NON_X, approved_posts_only: true, rows: first.length, ready_to_schedule: first.filter((r) => !r.needs_wording).length, needs_wording: first.filter((r) => r.needs_wording).length, per_language: firstCount("lang"), per_platform: firstCount("platform"), note: "Western markets' Nov 24 evening falls on Nov 25 WIB, so their Nov 24 posts are in deliveries.json, not here." }, rows: first }, null, 1) + "\n");

// Wording grouped by post and language, so one writer pass covers a post's platforms together.
const groups = new Map<string, { post: string | null; lang: LangCode; language: string; app: string; rows: { id: string; platform: Plat; format: string; wib: string; needs_wording: string; first_comment_link?: string }[] }>();
for (const r of words) {
  const k = `${r.post ?? r.id}|${r.lang}`;
  if (!groups.has(k)) groups.set(k, { post: r.post, lang: r.lang, language: r.language, app: r.app, rows: [] });
  groups.get(k)!.rows.push({ id: r.id, platform: r.platform, format: r.format, wib: r.wib, needs_wording: r.needs_wording!, ...(r.first_comment?.link ? { first_comment_link: r.first_comment.link } : {}) });
}
const wn = [...groups.values()].sort((a, b) => a.rows[0].wib.localeCompare(b.rows[0].wib));
writeFileSync(join(HERE, "wording-needed.json"), JSON.stringify({ meta: { rules: "Write natively in each language (human-prose language rules), never translated word for word from the English; keep each English row's meaning, numbers and app facts; prices from that country's App Store; one app per post; no country of ours named.", groups: wn.length, rows: words.length, first_window_rows: first.filter((r) => r.needs_wording).length }, groups: wn }, null, 1) + "\n");

console.log(JSON.stringify({ ...meta, first: { rows: first.length, per_language: firstCount("lang"), per_platform: firstCount("platform") }, wording_groups: wn.length }, null, 1));
