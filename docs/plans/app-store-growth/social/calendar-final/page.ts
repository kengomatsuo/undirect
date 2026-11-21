// Builds the review page from deliveries.json: one card per post with its approved English versions,
// the 13 languages' local times per platform, what changed since the owner's "All approved", and an
// unticked box; then the X routine. Writes ~/Downloads/social-calendar/artifact.html.
// Run after deliveries.ts: bun page.ts

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, basename } from "node:path";
import { posts } from "./posts";
import { MARKETS } from "./markets";

const OUT = join(homedir(), "Downloads/social-calendar");
const { meta, rows } = JSON.parse(readFileSync(join(import.meta.dir, "deliveries.json"), "utf8"));
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
  return `<div class="pv"><p class="pvh"><b class="plat">${r.platform}</b> <span class="fmt">${esc(r.format)}</span> <span class="who">${esc(r.account)}</span> <span class="loc">${esc(when(r.local))} ${esc(r.zone)}</span></p>
    ${r.title ? `<p class="yt-title">${esc(r.title)}</p>` : ""}
    ${r.poll ? pollHtml(r.poll) : ""}${r.sticker ? `<p class="meta strong">Sticker: ${esc(r.sticker)}</p>` : ""}
    ${r.caption ? `<p class="cap" dir="auto">${br(r.caption)}</p>` : ""}
    ${r.first_comment?.text ? `<div class="follow"><p class="fl">${esc(r.first_comment.label)}</p><p class="cap">${br(r.first_comment.text)}</p></div>` : ""}
    ${r.requires_x_premium ? `<p class="meta warnt">${r.x_length} characters: needs X Premium (over 280).</p>` : ""}
    ${r.changed_since_approval.length ? `<ul class="chgl">${r.changed_since_approval.map((c: string) => `<li>${esc(c)}</li>`).join("")}</ul>` : ""}
    ${r.notes.length ? `<ul class="notes">${r.notes.map((n: string) => `<li>${esc(n)}</li>`).join("")}</ul>` : ""}</div>`;
}

function card(n: number) {
  const p = posts.find((p) => p.n === n)!;
  const id = `P${String(n).padStart(2, "0")}`;
  const rs = byPost.get(id)!;
  const en = PLATS.map((pl) => rs.find((r) => r.lang === "en" && r.platform === pl)).filter(Boolean) as R[];
  const media = en.find((r) => r.media.some((m: string) => m.endsWith(".mp4")))?.media ?? en.find((r) => r.media.length)?.media ?? [];
  const onX = rs.filter((r) => r.platform === "X");
  const grid = `<div class="tw"><table class="mt"><thead><tr><th>Language</th>${PLATS.slice(0, 5).map((pl) => `<th>${pl}</th>`).join("")}<th>X</th></tr></thead><tbody>${MARKETS.map((m) => {
    const cell = (pl: string) => { const r = rs.find((r) => r.lang === m.lang && r.platform === pl); return r ? `<td title="${esc(r.wib)} WIB"><span class="${r.needs_wording ? "nw" : "ok"}">${esc(hm(r.local))}</span></td>` : `<td class="dim">·</td>`; };
    return `<tr><th>${m.name}<small>${m.zone}</small></th>${PLATS.slice(0, 5).map(cell).join("")}${cell("X")}</tr>`;
  }).join("")}</tbody></table></div>`;
  const chips = [
    p.gate ? `<span class="wait">Held for 1.0.5, not in your approved set</span>` : `<span class="okc">Approved post</span>`,
    `<span class="chg">12 new languages</span>`,
    `<span class="chg">Times per platform and country</span>`,
    ...(onX.length ? [`<span class="chg">On X in ${onX.map((r) => r.lang).join(", ")}</span>`] : [`<span class="dimc">Not on X</span>`]),
  ];
  return `<article class="del" id="${id}" data-gate="${p.gate ? 1 : 0}" data-x="${onX.length ? 1 : 0}" data-langs="${MARKETS.map((m) => m.lang).join(" ")}">
    <div class="ph"><label class="tick"><input type="checkbox" data-id="${id}" id="c-${id}"><b>${id}</b></label><span class="app a-${p.app}">${p.app}</span><span class="kind">${p.kind}</span><span class="loc">${esc(p.date)}, local day in each country</span></div>
    <p class="pain">${esc(p.pain)}</p>
    <div class="chips">${chips.join("")}</div>
    ${p.gate ? `<p class="gate">${esc(p.gate)}</p>` : ""}
    ${mediaHtml(media)}
    <details class="tests" open><summary>When it goes out: local time in each country</summary>${grid}<p class="meta"><span class="ok">Black</span>: approved English text, ready. <span class="nw">Amber</span>: awaiting native wording. Hover or long-press for WIB.</p></details>
    <details class="tests"><summary>The approved English versions (${en.length})</summary>${en.map(versionHtml).join("")}</details>
  </article>`;
}

// ---------- X ----------
const xr = rows.filter((r: R) => r.platform === "X").sort((a: R, b: R) => a.wib.localeCompare(b.wib));
const xKind = (r: R) => (r.already_scheduled ? "Already scheduled" : r.id.startsWith("X-heavy") ? "Heavy piece" : r.id.startsWith("X-quote") ? "Quote, by hand" : r.post);
const xHtml = `<div class="tw"><table class="xt"><thead><tr><th></th><th>WIB</th><th>Local</th><th>Language</th><th>What</th><th>Text</th></tr></thead><tbody>${xr.map((r: R) => `<tr class="${r.already_scheduled ? "sch" : ""}"><td>${r.already_scheduled ? "" : `<input type="checkbox" aria-label="${esc(r.id)}" data-id="${esc(r.id)}" id="c-${esc(r.id)}">`}</td><td>${esc(when(r.wib))}</td><td>${esc(hm(r.local))} ${esc(r.zone)}</td><td>${esc(r.language)}</td><td>${esc(xKind(r))}</td><td class="xc">${r.caption ? `<span dir="auto">${br(r.caption)}</span>${r.requires_x_premium ? `<br><span class="warnt">${r.x_length} characters: needs Premium</span>` : ""}` : r.already_scheduled ? esc(r.notes[0]) : `<span class="nw">Awaiting wording</span>`}</td></tr>`).join("")}</tbody></table></div>`;

// ---------- summary ----------
const perLang = meta.deliveries_per_language as Record<string, number>;
const perPlat = meta.deliveries_per_platform_per_language as Record<string, Record<string, number>>;
const ready = rows.filter((r: R) => !r.needs_wording && !r.already_scheduled && !r.id.startsWith("X-quote")).length;
const weeks = [...new Set(posts.map((p) => p.date))].sort();
const dayIds = new Map<string, number[]>();
for (const p of posts) (dayIds.get(p.date) ?? dayIds.set(p.date, []).get(p.date)!).push(p.n);

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
.sum ul{margin:0;padding-left:18px}.sum li{margin:3px 0}
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
.pv{border-top:1px solid var(--line);padding-top:8px;margin-top:8px;min-width:0}.pvh{margin:0 0 4px;font-size:13px;display:flex;flex-wrap:wrap;gap:4px 8px;align-items:baseline}.plat{text-transform:uppercase;letter-spacing:.06em;font-size:12px}.fmt{background:var(--chip);border-radius:999px;padding:1px 8px;font-size:12px}.who{color:var(--mute);font-size:12px}
.yt-title{font-weight:700;margin:4px 0}
.cap{margin:6px 0;overflow-wrap:anywhere;font-size:14px}.meta{font-size:12px;color:var(--mute);margin:4px 0}.meta.strong{color:var(--ink);font-weight:600}.warnt{color:var(--wait);font-weight:600}
.one,.slides{max-width:300px;margin-top:8px}.one img,.one video,.slides img,.slides video{display:block;width:100%;max-width:100%;border-radius:12px;background:#000;height:auto}video{aspect-ratio:9/16}
.slides{display:flex;gap:6px;overflow-x:auto;scroll-snap-type:x mandatory}.slides>*{flex:0 0 100%;scroll-snap-align:start}.hint{font-size:12px;color:var(--mute);margin:4px 0}
.poll{margin:6px 0;max-width:340px}.pq{font-weight:600;margin:0 0 6px}.opt{border:1.5px solid var(--c);border-radius:999px;padding:5px 14px;margin:5px 0}
.follow{border-left:3px solid var(--line);padding-left:10px;margin:8px 0}.fl{font-size:12px;color:var(--mute);margin:0}
.notes,.chgl{font-size:12.5px;color:var(--mute);padding-left:18px;margin:6px 0}.chgl{color:var(--new)}
.xt{font-size:13px;font-variant-numeric:tabular-nums}.xt td{border-top:1px solid var(--line)}.xt .xc{min-width:260px;max-width:460px;overflow-wrap:anywhere}.xt tr.sch td{color:var(--mute)}
</style>
<div class="wrap">
<h1>Monholt social calendar</h1>
<p class="lead">Sun Nov 22 to Sun Dec 20 2026, version 4. These are the 87 posts you approved (82, plus 5 still held for Undirect 1.0.5), now going out in 13 languages. Every language gets the same posts on the same platforms, at each country's own best hours: <b>${Object.values(perLang)[0]}</b> deliveries per language, ${rows.length - 3 - meta.x.quote_slots} in all. Nothing is ticked: what changed needs a new go.</p>
<p class="warn">English captions are the ones you approved, unchanged. The other 12 languages are being written natively by Fable and show as amber until their text arrives. Films and images keep their English on-screen text, because no localized cuts exist.</p>
<div class="sum">
<h3>Since your "All approved"</h3><ul>
<li><b>12 new languages</b>: Arabic, Indonesian, Japanese, Traditional Chinese, Simplified Chinese, French, Italian, German, Spanish, Portuguese (Brazil), Turkish and Russian, each on every platform the post uses.</li>
<li><b>Times</b>: each platform posts at its best hour in each country's own clock (Buffer, Sprout and Metricool's local-time studies; Japan and Indonesia from national surveys), instead of three fixed WIB times.</li>
<li><b>X</b>: follows the routine you approved, 4 posts a day 4 to 8 hours apart. Each language gets 8 X posts: 7 approved posts and 1 heavy how-to piece, about 3 a week across languages. Ten more slots are quotes of trending posts, written and posted by hand on the day. The link closes the post because X's scheduler can't schedule replies.</li>
<li><b>Already on X</b>: the debut is pinned. Tonight's two originals (21:30 and 01:00 WIB) and the Nov 27 Arabic quote stay as scheduled, and no calendar post repeats them.</li>
<li><b>No face</b>: notes that asked for recorded answers now ask for text over the film. No film shows a face.</li>
<li><b>Bank details</b>: the Cutling explainer cuts with a bank-account example are gone. Every language uses the pain films.</li>
<li><b>Rewrites dropped</b>: after your go, version 3 rewrote 19 posts to remove their pitch. Those rewrites are undone, and every English caption is your approved text.</li></ul>
<h3>Deliveries per language</h3><div>${MARKETS.map((m) => `<span class="fc">${m.name} <b>${perLang[m.lang]}</b></span>`).join("")}</div>
<h3>Per platform, in each language</h3><div>${Object.entries(perPlat).map(([pl, c]) => `<span class="fc">${pl} <b>${c.en}</b></span>`).join("")}</div>
<h3>Wording</h3><div><span class="fc">Ready, approved English <b>${ready}</b></span><span class="fc">Awaiting native wording <b>${meta.needs_wording}</b></span></div>
<h3>Before you go</h3><ul>
<li>Instagram, Facebook, Threads and TikTok each carry 39 posts a day across the 13 languages, all from one account per platform.</li>
<li>Instagram, Facebook and X are blocked in Russia, and none of these platforms reaches mainland China without a VPN. Russian and Simplified Chinese posts reach readers outside those countries.</li>
<li>Spanish is timed for Spain. Latin American Spanish speakers would need their own hours.</li>
<li>${meta.x.heavy_pieces.length} heavy pieces fall over 4 weeks. Thirteen languages can't share 2 a week evenly, so it works out to about 3 a week.</li></ul>
</div>
<div class="bar"><button type="button" class="go" id="copy">Copy my go</button><button type="button" id="none">Clear</button>
<select id="fo" aria-label="Show"><option value="">All posts</option><option value="x">On X</option><option value="gate">Held for 1.0.5</option></select>
<span id="n" class="count"></span></div>
<textarea id="out" rows="3" readonly hidden></textarea>
<nav class="jump" aria-label="Days">${[...dayIds.keys()].sort().map((d) => `<a href="#d-${d}">${esc(when(d + " 00:00").slice(0, -6))}</a>`).join("")}<a href="#x-routine">X</a></nav>
${[...dayIds.keys()].sort().map((d) => `<h2 class="day" id="d-${d}">${esc(when(d + " 00:00").slice(0, -6))} <small class="loc">local day</small></h2>${dayIds.get(d)!.map(card).join("")}`).join("")}
<h2 id="x-routine">X, day by day</h2>
<p class="lead">Every X post on @monholtco in time order, with the three already scheduled shown grey.</p>
${xHtml}
</div>
<script>
(function(){var K="monholt-cal-v5",s={};try{s=JSON.parse(localStorage.getItem(K)||"{}")}catch(e){}
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
