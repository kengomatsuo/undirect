// Builds the review page from deliveries.json (version 7: English, Japanese and Indonesian): one card per
// post with its English, Japanese and Indonesian deliveries on each platform and their local times, each
// version's words, what still needs Fable (localized media, frame fixes), and an unticked box; then the X
// routine. Writes ~/Downloads/social-calendar/artifact.html.
// Run after deliveries.ts: bun page.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, basename } from "node:path";
import { posts } from "./posts";
import { MARKETS } from "./markets";

const OUT = join(homedir(), "Downloads/social-calendar");
const { meta, rows } = JSON.parse(readFileSync(join(import.meta.dir, "deliveries.json"), "utf8"));
const design = JSON.parse(readFileSync(join(import.meta.dir, "design-needed.json"), "utf8"));
const LORDER: Record<string, number> = { en: 0, ja: 1, id: 2 };
type R = (typeof rows)[number];

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const br = (s = "") => esc(s).replace(/\n/g, "<br>");
const D = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], M = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const when = (s: string) => { const d = new Date(s.replace(" ", "T") + ":00Z"); return `${D[d.getUTCDay()]} ${M[d.getUTCMonth()]} ${d.getUTCDate()} ${s.slice(11)}`; };
const hm = (s: string) => { const d = new Date(s.replace(" ", "T") + ":00Z"); return `${D[d.getUTCDay()]} ${s.slice(11)}`; };

// The review copies published beside the page (review/f films, review/i images).
function review(path: string): { kind: "v" | "i"; src: string; poster?: string } | null {
  const P = path.match(/\/(P\d\d)\//)?.[1];
  const base = basename(path), stem = base.replace(/\.\w+$/, "");
  const tries = path.endsWith(".mp4") ? [`review/f/${base}`, `review/f/${P}-${base}`] : [`review/i/${P}-${stem}.jpg`, `review/i/${P}-${stem}-guide.jpg`, `review/i/${stem}.jpg`];
  for (const t of tries) if (existsSync(join(OUT, t))) return path.endsWith(".mp4") ? { kind: "v", src: t, poster: t.replace(/\.mp4$/, ".jpg") } : { kind: "i", src: t };
  return null;
}
// X pictures (../x-images, rendered by x-images.ts) are published beside the page as review/x/<row id>.jpg.
function xPicture(r: R): string | null {
  const f = (r.media ?? []).find((m: string) => m.includes("/x-images/"));
  if (!f || !existsSync(f)) return null;
  const to = `review/x/${basename(f).replace(/\.png$/, ".jpg")}`;
  mkdirSync(join(OUT, "review/x"), { recursive: true });
  Bun.spawnSync(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "84", f, "--out", join(OUT, to)]);
  return to;
}
const mediaHtml = (paths: string[]) => {
  const ms = paths.map(review).filter(Boolean) as NonNullable<ReturnType<typeof review>>[];
  if (!ms.length) return "";
  const one = (m: (typeof ms)[number]) => (m.kind === "v" ? `<video controls preload="none" playsinline poster="${m.poster}" src="${m.src}"></video>` : `<img loading="lazy" src="${m.src}" alt="">`);
  return ms.length === 1 ? `<div class="one">${one(ms[0])}</div>` : `<div class="slides">${ms.map(one).join("")}</div><p class="hint">${ms.length} frames, swipe</p>`;
};
const pollHtml = (p: { q: string | null; options: (string | null)[] }) => `<div class="poll"><p class="pq">${esc(p.q ?? "")}</p>${p.options.map((o) => `<div class="opt">${esc(o ?? "")}</div>`).join("")}</div>`;

const byPost = new Map<string, R[]>();
for (const r of rows) if (r.post) (byPost.get(r.post) ?? byPost.set(r.post, []).get(r.post)!).push(r);
const PLATS = ["Instagram", "Facebook", "Threads", "TikTok", "YouTube", "X"] as const;

function versionHtml(r: R) {
  return `<div class="pv"><p class="pvh"><b class="plat">${r.platform}</b> <span class="lang">${esc(r.language)}</span> <span class="fmt">${esc(r.format)}</span> <span class="who">${esc(r.account)}</span> <span class="loc">${esc(when(r.local))} ${esc(r.zone)}</span>${r.already_scheduled ? ` <span class="okc">Already scheduled</span>` : ""}</p>
    ${r.title ? `<p class="yt-title">${esc(r.title)}</p>` : ""}
    ${r.poll ? pollHtml(r.poll) : ""}${r.sticker ? `<p class="meta strong">Sticker: ${esc(r.sticker)}</p>` : ""}
    ${r.caption ? `<p class="cap" dir="auto">${br(r.caption)}</p>` : ""}
    ${r.platform === "X" && xPicture(r) ? `<div class="one xone"><img loading="lazy" src="${xPicture(r)}" alt=""></div>` : ""}
    ${r.first_comment?.text ? `<div class="follow"><p class="fl">${esc(r.first_comment.label)}</p><p class="cap">${br(r.first_comment.text)}</p></div>` : ""}
    ${r.frame_fail ? `<p class="meta warnt">Frame check failed: Fable fixes ${esc(r.frame_fail.join(", "))} before this is scheduled.</p>` : ""}
    ${r.needs_localized_media ? `<p class="meta warnt">On-screen text is English: needs a ${esc(r.language)} version of the media.</p>` : ""}
    ${r.needs_design ? `<p class="meta warnt">Needs design: ${esc(r.needs_design)}</p>` : ""}
    ${r.requires_x_premium ? `<p class="meta warnt">${r.x_length} characters: needs X Premium (over 280).</p>` : ""}
    ${r.changed_since_approval.length ? `<ul class="chgl">${r.changed_since_approval.map((c: string) => `<li>${esc(c)}</li>`).join("")}</ul>` : ""}
    ${r.notes.length ? `<ul class="notes">${r.notes.map((n: string) => `<li>${esc(n)}</li>`).join("")}</ul>` : ""}
    ${r.translations ? `<details class="tests"><summary>Japanese and Indonesian titles and descriptions for YouTube Studio</summary>${r.translations.map((t: { language: string; title: string; description: string }) => `<div class="follow"><p class="fl">${esc(t.language)}</p><p class="yt-title" dir="auto">${esc(t.title)}</p><p class="cap" dir="auto">${br(t.description)}</p></div>`).join("")}</details>` : ""}</div>`;
}

function card(n: number) {
  const p = posts.find((p) => p.n === n)!;
  const id = `P${String(n).padStart(2, "0")}`;
  const rs = byPost.get(id)!;
  const del = rs.filter((r) => r.platform !== "X").sort((a, b) => PLATS.indexOf(a.platform) - PLATS.indexOf(b.platform) || LORDER[a.lang] - LORDER[b.lang]);
  const en = del.filter((r) => r.lang === "en");
  const media = en.find((r) => (r.media ?? []).some((m: string) => m.endsWith(".mp4")))?.media ?? en.find((r) => r.media?.length)?.media ?? [];
  const fails = [...new Set(del.flatMap((r) => r.frame_fail ?? []))];
  const loc = del.some((r) => r.needs_localized_media);
  const onX = rs.filter((r) => r.platform === "X");
  const langs = [...new Set(del.map((r) => r.lang))];
  const grid = `<div class="tw"><table class="mt"><thead><tr><th>Platform</th><th>Language</th><th>Local time</th><th>WIB</th></tr></thead><tbody>${[...del, ...onX].map((r) => `<tr><th>${r.platform}</th><td>${esc(r.language)}</td><td>${esc(when(r.local))} ${esc(r.zone)}</td><td>${esc(when(r.wib))}${r.already_scheduled ? ` <span class="okc">scheduled</span>` : ""}</td></tr>`).join("")}</tbody></table></div>`;
  const chips = [
    p.gate ? `<span class="wait">Held for 1.0.5, not in your approved set</span>` : `<span class="okc">Approved post</span>`,
    ...langs.map((l) => `<span class="chg">${esc(MARKETS.find((m) => m.lang === l)!.name)}</span>`),
    ...(fails.length ? [`<span class="wait">Frame check failed: ${esc(fails.join(", "))}</span>`] : []),
    ...(loc ? [`<span class="wait">Japanese and Indonesian media still English</span>`] : []),
    ...(onX.length ? [`<span class="chg">On X in English</span>`] : [`<span class="dimc">Not on X</span>`]),
  ];
  return `<article class="del" id="${id}" data-gate="${p.gate ? 1 : 0}" data-x="${onX.length ? 1 : 0}" data-langs="${langs.join(" ")}">
    <div class="ph"><label class="tick"><input type="checkbox" data-id="${id}" id="c-${id}"><b>${id}</b></label><span class="app a-${p.app}">${p.app}</span><span class="kind">${p.kind}</span><span class="loc">English from ${esc(when((startDay.get(id) ?? p.date) + " 00:00").slice(0, -6))}, then Japanese and Indonesian on the next days</span></div>
    <p class="pain">${esc(p.pain)}</p>
    <div class="chips">${chips.join("")}</div>
    ${p.gate ? `<p class="gate">${esc(p.gate)}</p>` : ""}
    ${mediaHtml(media)}
    <details class="tests" open><summary>Where and when it goes out</summary>${grid}</details>
    <details class="tests"><summary>Each platform's version (${del.length + onX.length})</summary>${[...del, ...onX].map(versionHtml).join("")}</details>
  </article>`;
}

// ---------- X ----------
const xr = rows.filter((r: R) => r.platform === "X").sort((a: R, b: R) => a.wib.localeCompare(b.wib));
const xKind = (r: R) => (r.already_scheduled ? (r.lang === "en" ? "Posted" : "Already scheduled") : r.id.startsWith("X-heavy") ? (r.caption ? "How-to" : "Heavy piece") : r.id.startsWith("X-original") ? "New original" : r.id.startsWith("X-quote") ? "Quote, by hand" : r.post);
const xGoes = (r: R) => { const pic = xPicture(r); const film = (r.media ?? []).find((m: string) => m.endsWith(".mp4")); return pic ? `<img class="xp" loading="lazy" width="1200" height="675" src="${pic}" alt="">` : film ? `<p class="meta">Goes out with the film ${esc(basename(film))}</p>` : ""; };
// One block per X post, in the order X shows it: the words, then the picture or the poll's options.
const xHtml = `<div class="xl">${xr.map((r: R) => `<article class="xr${r.already_scheduled ? " sch" : ""}">
  <p class="xh">${r.already_scheduled ? "" : `<input type="checkbox" aria-label="${esc(r.id)}" data-id="${esc(r.id)}" id="c-${esc(r.id)}">`}<b>${esc(when(r.wib))} WIB</b> <span class="loc">${esc(hm(r.local))} ${esc(r.zone)}</span> <span class="fmt">${esc(xKind(r))}</span>${r.format && !r.already_scheduled ? ` <span class="fmt">${esc(r.format)}</span>` : ""}</p>
  ${r.poll ? `<p class="pq">${esc(r.poll.q ?? "")}</p>` : ""}
  ${r.caption ? `<p class="cap" dir="auto">${br(r.caption)}</p>${r.requires_x_premium ? `<p class="meta warnt">${r.x_length} characters: needs Premium</p>` : ""}` : r.already_scheduled ? `<p class="cap">${esc(r.notes[0])}</p>` : `<p class="cap nw">Awaiting wording</p>`}
  ${r.poll ? `<div class="poll">${r.poll.options.map((o: string | null) => `<div class="opt">${esc(o ?? "")}</div>`).join("")}</div>` : ""}${xGoes(r)}
</article>`).join("")}</div>`;

// ---------- summary ----------
const perLang = meta.deliveries_per_language as Record<string, number>;
const perPlat = meta.deliveries_per_platform_per_language as Record<string, Record<string, number>>;
const rot = meta.rotation;
const ready = rows.filter((r: R) => !r.needs_wording && !r.already_scheduled && !r.id.startsWith("X-quote")).length;
// Each card sits on the local day its English version first goes out on Instagram, Facebook, Threads or TikTok.
const off: Record<string, number> = Object.fromEntries(MARKETS.map((m) => [m.lang, m.off]));
const localDay = (r: R) => new Date(new Date(r.wib.replace(" ", "T") + ":00Z").getTime() + off[r.lang] * 3600000).toISOString().slice(0, 10);
const startDay = new Map<string, string>();
for (const r of rows) if (r.post && r.lang === "en" && ["Instagram", "Facebook", "Threads", "TikTok"].includes(r.platform)) { const d = localDay(r); if (!startDay.has(r.post) || d < startDay.get(r.post)!) startDay.set(r.post, d); }
const dayIds = new Map<string, number[]>();
for (const p of posts) { const d = startDay.get(`P${String(p.n).padStart(2, "0")}`) ?? p.date; (dayIds.get(d) ?? dayIds.set(d, []).get(d)!).push(p.n); }

const html = `<title>Monholt social calendar</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap">
<style>
/* Layout: one column of post cards by local day; each card is one approved post, its 13 languages' times per platform, and its English versions. */
:root{--bg:#f3f4f2;--card:#ffffff;--ink:#17191a;--mute:#5d6462;--line:#dfe2df;--u:#d92b24;--c:#128f69;--wait:#9a5b00;--waitbg:#fff1d6;--chip:#eceeeb;--new:#1f5fd1;--newbg:#e6efff;--okbg:#e3f4ec;--ok:#0d6b4e;
--display:"Space Grotesk",ui-sans-serif,system-ui,sans-serif;--body:Inter,ui-sans-serif,system-ui,-apple-system,"Hiragino Sans","Noto Sans JP","Noto Naskh Arabic",sans-serif}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#121413;--card:#1b1e1d;--ink:#eef0ee;--mute:#a3aaa7;--line:#2c312f;--u:#ff5a52;--c:#2fd19f;--wait:#ffbf5c;--waitbg:#36290f;--chip:#242826;--new:#8fb4ff;--newbg:#16233d;--okbg:#14302a;--ok:#7fe0bd;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#121413;--card:#1b1e1d;--ink:#eef0ee;--mute:#a3aaa7;--line:#2c312f;--u:#ff5a52;--c:#2fd19f;--wait:#ffbf5c;--waitbg:#36290f;--chip:#242826;--new:#8fb4ff;--newbg:#16233d;--okbg:#14302a;--ok:#7fe0bd;color-scheme:dark}
*{box-sizing:border-box}
body{background:var(--bg);color:var(--ink);font:15px/1.5 var(--body);padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:16px 80px}
.wrap{max-width:900px;margin:0 auto}
h1{font:700 26px/1.15 var(--display);margin:4px 0 6px;text-wrap:balance}h2{font:700 20px var(--display);margin:28px 0 8px;text-wrap:balance}
.lead{color:var(--mute);margin:0 0 12px;max-width:65ch}.warn{background:var(--waitbg);color:var(--wait);border-radius:12px;padding:10px 12px;margin:0 0 10px;font-weight:600}
.sum{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:12px;margin-bottom:12px;min-width:0}
.sum h3{font:600 12px var(--body);text-transform:uppercase;letter-spacing:.06em;color:var(--mute);margin:14px 0 6px}.sum h3:first-child{margin-top:0}
.sum a{color:var(--new)}.sum ul{margin:0;padding-left:18px}.sum li{margin:3px 0}
.tw{overflow-x:auto}table{border-collapse:collapse}th{text-align:left;font-weight:600;padding:4px 10px 4px 0;vertical-align:top;white-space:nowrap}td{padding:4px 10px 4px 0;vertical-align:top}
.fc{display:inline-block;background:var(--chip);border-radius:999px;padding:2px 10px;margin:2px 4px 2px 0;font-size:13px}.fc b{font-variant-numeric:tabular-nums}
.bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:12px 0;position:sticky;top:env(safe-area-inset-top,0px);background:var(--bg);padding:8px 0;z-index:3}
body::before{content:"";position:fixed;inset:0 0 auto;height:env(safe-area-inset-top,0px);z-index:10;background:var(--bg)}
.bar button,.bar select{font:inherit;padding:8px 12px;border-radius:10px;border:1px solid var(--line);background:var(--card);color:var(--ink);min-height:40px}
.bar .go{background:var(--ink);color:var(--bg);border-color:var(--ink);font-weight:600}
button:focus-visible,select:focus-visible,input:focus-visible,summary:focus-visible,a:focus-visible{outline:3px solid var(--c);outline-offset:2px}
#out{width:100%;font:13px ui-monospace,monospace;padding:8px;border-radius:10px;border:1px solid var(--line);background:var(--card);color:var(--ink)}
.count{color:var(--mute);font-size:13px}
.jump{display:flex;gap:6px;overflow-x:auto;padding-bottom:4px;margin-bottom:6px}.jump a{flex:none;font-size:13px;padding:4px 10px;border-radius:999px;background:var(--chip);color:var(--ink);text-decoration:none}
.day{font:700 19px var(--display);margin:24px 0 8px}
.del{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:12px 14px;margin-bottom:12px;min-width:0}.del[data-gate="1"]{border:2px solid var(--wait)}
.ph{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center}.loc{color:var(--mute);font-size:13px;font-variant-numeric:tabular-nums}
.tick{display:flex;gap:8px;align-items:center;cursor:pointer;font:700 17px var(--display)}.tick input{width:22px;height:22px}
.app,.kind,.chips span{font-size:12px;border-radius:999px;padding:2px 9px;border:1px solid var(--line)}
.a-Undirect{background:var(--u);color:#fff;border-color:var(--u)}.a-Cutling{background:var(--c);color:#fff;border-color:var(--c)}.a-Both{background:var(--ink);color:var(--bg)}
.chips{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}.chg{background:var(--newbg);color:var(--new);border-color:transparent!important}.wait{background:var(--waitbg);color:var(--wait);border-color:var(--wait)!important}.okc{background:var(--okbg);color:var(--ok);border-color:transparent!important}.dimc{color:var(--mute)}
.pain{margin:6px 0 0;font-size:13px;color:var(--mute)}
.gate{background:var(--waitbg);color:var(--wait);border-radius:10px;padding:6px 10px;font-size:13px;margin:6px 0}
.tests{font-size:13px;margin:10px 0 0}.tests summary{cursor:pointer;font-weight:600}
.mt{font-size:12.5px;font-variant-numeric:tabular-nums;margin-top:6px}.mt th small{display:block;font-weight:400;color:var(--mute)}.mt td{white-space:nowrap}
.ok{color:var(--ink);font-weight:600}.nw{color:var(--wait)}.dim{color:var(--mute)}
.pv{border-top:1px solid var(--line);padding-top:8px;margin-top:8px;min-width:0}.pvh{margin:0 0 4px;font-size:13px;display:flex;flex-wrap:wrap;gap:4px 8px;align-items:baseline}.plat{text-transform:uppercase;letter-spacing:.06em;font-size:12px}.lang{font-weight:600;font-size:13px}.fmt{background:var(--chip);border-radius:999px;padding:1px 8px;font-size:12px}.who{color:var(--mute);font-size:12px}
.yt-title{font-weight:700;margin:4px 0}
.cap{margin:6px 0;overflow-wrap:anywhere;font-size:14px}.meta{font-size:12px;color:var(--mute);margin:4px 0}.meta.strong{color:var(--ink);font-weight:600}.warnt{color:var(--wait);font-weight:600}
.one,.slides{max-width:300px;margin-top:8px}.one img,.one video,.slides img,.slides video{display:block;width:100%;max-width:100%;border-radius:12px;background:#000;height:auto}video{aspect-ratio:9/16}
.slides{display:flex;gap:6px;overflow-x:auto;scroll-snap-type:x mandatory}.slides>*{flex:0 0 100%;scroll-snap-align:start}.hint{font-size:12px;color:var(--mute);margin:4px 0}
.poll{margin:6px 0;max-width:340px}.pq{font-weight:600;margin:0 0 6px}.opt{border:1.5px solid var(--c);border-radius:999px;padding:5px 14px;margin:5px 0}
.follow{border-left:3px solid var(--line);padding-left:10px;margin:8px 0}.fl{font-size:12px;color:var(--mute);margin:0}
.notes,.chgl{font-size:12.5px;color:var(--mute);padding-left:18px;margin:6px 0}.chgl{color:var(--new)}
.xl{max-width:560px}.xr{border-top:1px solid var(--line);padding:12px 0;min-width:0}.xr.sch{color:var(--mute)}.xh{display:flex;flex-wrap:wrap;gap:4px 8px;align-items:center;margin:0 0 4px;font-size:13px;font-variant-numeric:tabular-nums}.xh input{width:22px;height:22px;margin:0 4px 0 0}.xr .cap{margin:4px 0 8px;font-size:15px}.xr .pq{margin:4px 0}.xp{display:block;width:100%;height:auto;border-radius:12px;background:#000}.xone{max-width:420px}
</style>
<div class="wrap">
<h1>Monholt social calendar</h1>
<p class="lead"><b>Version 7: English, Japanese and Indonesian only.</b> These are the 87 posts you approved (82, plus 5 still held for Undirect 1.0.5). On Instagram, Facebook, Threads and TikTok each post goes out three times: in English, then in Japanese the next day, then in Indonesian the day after. Each platform posts three a day, one per language, each at that country's best hour. At one new post a day the run lasts until ${esc(when(meta.window.slice(14, 24) + " 00:00").slice(0, -6))}. YouTube uploads each film once in English. X stays English only, <b>${perPlat.X.en}</b> posts. Nothing is ticked: this version needs a new go.</p>
<p class="warn">${meta.frame_fail} deliveries use a film or image that failed the frame check, and ${meta.needs_localized_media} Japanese and Indonesian deliveries still show English on screen. Both wait for Fable before they're scheduled.</p>
<div class="sum">
<h3>What changed on Nov 22: X only</h3><ul>
<li><b>Every X post is short.</b> ${meta.x.short_posts.worded} posts say their point in one or two lines, ${meta.x.short_posts.median_characters_before_link} characters before the link at the middle of the set. Before, the ones with a film or a picture ran 218 at the middle and 372 at the longest. <a href="#x-routine">See them all</a>.</li>
<li><b>${meta.x.short_posts.with_picture} of them now carry a picture.</b> Each is a real screen from the app, its App Store page or the demo site, lifted out on black with one line. ${meta.x.short_posts.with_film} posts keep their film, and the ${meta.x.short_posts.polls} polls have none because X allows none on a poll.</li>
<li><b>One picture a post.</b> On X's timeline a single 16:9 picture shows whole, 518 px wide on the web and 310 px on a phone. Two or more turn into a strip that cuts the sides off. So the two four-picture posts (P20, P27) go out as one picture each.</li>
<li><b>The first week's three long posts are short how-tos</b> with a picture, and its one empty slot has a post. After Nov 28, ten long posts and ten originals still have no words.</li>
<li><b>Nothing new is scheduled on X.</b> Its Scheduled list holds only the Arabic thank-you of Nov 27. Tick the X rows you want and they go in with their pictures.</li></ul>
<h3>What changed on Nov 21</h3><ul>
<li><b>Only English, Japanese and Indonesian.</b> Arabic, both Chinese scripts, French, Italian, German, Spanish, Portuguese, Turkish and Russian are gone from the calendar and from every scheduler. The one exception is the Arabic thank-you to @APPS_RH on X, Nov 27, which stays.</li>
<li><b>Every post in all three languages</b>, on consecutive days: ${rot.days_from_en_to_ja["1"]} of ${Object.values(rot.days_from_en_to_ja as Record<string, number>).reduce((a, b) => a + b, 0)} Japanese versions follow the English by one day. The rest are the dated posts, which go out in all three on their day (Product Hunt Nov 24, the sale Nov 27 and 30, MacPip Dec 8), and the first week's posts, which wait for the English already scheduled.</li>
<li><b>Every format on every platform.</b> Facebook now has polls, text posts and carousels. Instagram shows the text posts as text cards. TikTok photo posts are photo carousels.</li>
<li><b>A frame check in the generator.</b> Every TikTok, Story, Reel and Short file must be 9:16. All of them are, so no row needed new media. The P12 TikTok was 9:16 too, but it held a 4:5 card floating in a dark frame. That's why the frame check on Nov 21 also looked inside the frame.</li>
<li><b>What the frame check found</b>: on six films the end card puts the App Store badge under the Reels, Shorts and TikTok caption band, and the TikTok photo cards for P05, P09 and P12 and both end cards run under TikTok's buttons. Those deliveries are marked and wait for Fable's fix.</li>
<li><b>Removed from the schedulers</b>: every scheduled post in another language, plus the English Reels and Shorts of P01, P02 and P04, and the Japanese and Indonesian posts over English on-screen text. ${rot.already_scheduled} English deliveries stay scheduled: Facebook Stories P03, P06 and P09, the P05 image on Instagram and Facebook, and seven threads.</li></ul>
<h3>Posts per language, every platform</h3><div>${MARKETS.map((m) => `<span class="fc">${m.name} <b>${perLang[m.lang]}</b></span>`).join("")}</div>
<h3>Posts a day per platform, counted by WIB day</h3><div>${Object.entries(rot.per_day as Record<string, { min: number; max: number; mean: number }>).map(([pl, d]) => `<span class="fc">${pl} <b>${d.mean}</b> (${d.min} to ${d.max})</span>`).join("")}<span class="fc">X <b>4</b></span></div>
<h3>Formats</h3><div>${Object.entries(meta.formats as Record<string, Record<string, number>>).map(([pl, f]) => `<span class="fc">${pl}: ${Object.entries(f).map(([k, n]) => `${esc(k)} <b>${n}</b>`).join(", ")}</span>`).join("")}</div>
<h3>For Fable</h3><div><span class="fc">Media to localize <b>${design.localized_media.length}</b> files</span><span class="fc">Frame fixes <b>${design.frame_fixes.length}</b> files</span><span class="fc">New media <b>${design.new_media.length}</b></span><span class="fc">X pieces to write <b>${meta.needs_wording}</b></span></div>
<h3>Before you go</h3><ul>
<li>Counted by each country's own day, every platform posts exactly one English, one Japanese and one Indonesian post a day. Counted in WIB, the English evening in the US falls on the next WIB day, so a WIB day shows 2 to 4.</li>
<li>TikTok posts marked Your brand can't be edited or deleted in TikTok Studio on the web, only in the TikTok app.</li>
<li>Instagram Stories with poll, quiz, questions, slider or Add Yours stickers, and TikTok poll stickers, are posted from the phone app at their time: the web schedulers don't offer those stickers.</li>
<li>Facebook polls: if Business Suite offers no poll for a Page post, post them from the Facebook app.</li></ul>
</div>
<div class="bar"><button type="button" class="go" id="copy">Copy my go</button><button type="button" id="none">Clear</button>
<select id="fo" aria-label="Show"><option value="">All posts</option><option value="x">On X</option><option value="gate">Held for 1.0.5</option></select>
<span id="n" class="count"></span></div>
<textarea id="out" rows="3" readonly hidden></textarea>
<nav class="jump" aria-label="Days">${[...dayIds.keys()].sort().map((d) => `<a href="#d-${d}">${esc(when(d + " 00:00").slice(0, -6))}</a>`).join("")}<a href="#x-routine">X</a></nav>
${[...dayIds.keys()].sort().map((d) => `<h2 class="day" id="d-${d}">${esc(when(d + " 00:00").slice(0, -6))} <small class="loc">local day</small></h2>${dayIds.get(d)!.map(card).join("")}`).join("")}
<h2 id="x-routine">X, day by day</h2>
<p class="lead">Every X post on @monholtco in time order, English only. The two English originals of Nov 21 and 22 have gone out; the Nov 27 Arabic thank-you to @APPS_RH stays as scheduled.</p>
<p class="lead"><b>Rewritten on Nov 22.</b> ${meta.x.short_posts.worded} posts now make their point in one or two lines (${meta.x.short_posts.median_characters_before_link} characters before the link at the middle of the set, ${meta.x.short_posts.longest_before_link} at the longest). ${meta.x.short_posts.with_picture} of them carry one picture, a real screen on black with one line; ${meta.x.short_posts.with_film} keep their film and ${meta.x.short_posts.polls} are polls, which X shows without a picture. No post on X carries several pictures any more: X's timeline shows one 16:9 picture whole and crops a strip of several.</p>
${xHtml}
</div>
<script>
(function(){var K="monholt-cal-v8",s={};try{s=JSON.parse(localStorage.getItem(K)||"{}")}catch(e){}
var boxes=[].slice.call(document.querySelectorAll("input[data-id]"));
function ids(){return boxes.filter(function(b){return b.checked}).map(function(b){return b.dataset.id})}
function save(){try{localStorage.setItem(K,JSON.stringify(s))}catch(e){}document.getElementById("n").textContent=ids().length+" of "+boxes.length+" ticked"}
boxes.forEach(function(b){b.checked=!!s[b.dataset.id];b.addEventListener("change",function(){s[b.dataset.id]=b.checked;save()})});
document.getElementById("none").onclick=function(){boxes.forEach(function(b){b.checked=false});s={};save()};
document.getElementById("copy").onclick=function(){var t=ids().length?"Go for: "+ids().join(", "):"No posts ticked yet.";var o=document.getElementById("out");o.hidden=false;o.value=t;try{navigator.clipboard.writeText(t).catch(function(){o.select()})}catch(e){o.select()}};
document.getElementById("fo").onchange=function(){var v=this.value;[].forEach.call(document.querySelectorAll(".del"),function(a){a.hidden=(v==="x"&&a.dataset.x!=="1")||(v==="gate"&&a.dataset.gate!=="1")})};
save()})();
</script>`;
writeFileSync(join(OUT, "artifact.html"), html);
console.log(`artifact.html ${(html.length / 1024).toFixed(0)} KB, ${posts.length} cards, ${xr.length} X rows`);
