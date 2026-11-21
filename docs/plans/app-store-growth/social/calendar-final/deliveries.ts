// Writes the schedulable export of the @monholtco calendar:
//   deliveries.json        every delivery, Nov 22-Dec 20 2026: every language on Instagram, Facebook, Threads,
//                          TikTok and YouTube; English only on X, which translates each post for its reader
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
  { wib: "2026-11-21 21:30", lang: "en" as LangCode, what: "Original, Undirect: \"Safari's Block Pop-ups setting has one exception...\"", post: null },
  { wib: "2026-11-22 01:00", lang: "en" as LangCode, what: "Original, Cutling: \"Safari AutoFill puts your address into checkout forms...\"", post: null },
  { wib: "2026-11-27 20:15", lang: "ar" as LangCode, what: "Arabic quote of @APPS_RH: Undirect half price Nov 27-30", post: null },
];
// Approved posts whose English X version would repeat tonight's originals.
const X_DUP_EN = new Set([5, 54]);
const EN = MARKETS.find((m) => m.lang === "en")!;

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
const tOf = (wib: string) => new Date(wib.replace(" ", "T") + ":00Z").getTime();

// 1. Every approved post with a schedulable X version goes out once, in the free slot nearest its
// approved minute; posts tied to an outside date (kept) go first and stay within 4 hours of it.
const xPosts = posts.filter((p) => !p.gate && xBlock(p.n).format !== "Thread" && !X_DUP_EN.has(p.n));
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
  const caption = b.poll ? [b.poll.q, reply].filter(Boolean).join("\n\n") : [b.text, reply].filter(Boolean).join("\n\n");
  r.caption = b.poll ? reply ?? null : caption;
  r.first_comment = null;
  r.x_length = xLen(caption);
  r.requires_x_premium = r.x_length > 280;
  r.changed_since_approval.push(`Time: approved ${approvedTime(p)} WIB; now ${wib} WIB under the X routine`);
  if (reply) r.changed_since_approval.push("Our first reply now closes the post itself, link on the last line: X's scheduler can't schedule replies");
  if (b.poll) r.notes.push("Poll: the question is the poll question; the caption text sits under it.");
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
const perPlat = Object.fromEntries((["X", ...NON_X] as Plat[]).map((pl) => [pl, count((r) => r.platform === pl)]));
for (const pl of NON_X) if (new Set(Object.values(perPlat[pl])).size !== 1) throw new Error(`unequal ${pl} counts ${JSON.stringify(perPlat[pl])}`);
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
// Heavy pieces in every 7-day window that fits inside the calendar.
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

// ---------- write ----------
const meta = {
  built: new Date().toISOString(), approved_commit: APPROVED, window: "2026-11-22 to 2026-12-20, WIB",
  languages: MARKETS.map(({ lang, name, country, zone, off }) => ({ lang, name, country, zone, hours_from_wib: off })),
  deliveries_per_language: perLang, deliveries_per_platform_per_language: perPlat,
  x: { per_day_min: Math.min(...xPerDay), per_day_max: Math.max(...xPerDay), gap_hours_min: Math.min(...gaps), gap_hours_max: Math.max(...gaps), gaps_outside_4_to_8: badGap.length, english_only: true, heavy_per_7_days_min: Math.min(...heavyWeeks), heavy_per_7_days_max: Math.max(...heavyWeeks), heavy_pieces: heavy, new_originals: rows.filter((r) => r.id.startsWith("X-original")).length, approved_posts: rows.filter((r) => r.platform === "X" && r.post).length, quote_slots: rows.filter((r) => r.id.startsWith("X-quote")).length },
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
