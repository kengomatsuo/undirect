// HTML templates for the calendar's images. Each returns the inner HTML of one frame;
// build.ts wraps it at 1080x1350 (Instagram, X) or 1080x1920 (TikTok, Stories) and
// screenshots it. Asset paths are relative to the _assets folder the page is written in.

export type Size = "ig" | "tt" | "story";
type Props = Record<string, any>;

export const BRAND = {
  Undirect: { accent: "#D92B24", deep: "#1c0605", ink: "#0d0303", icon: "undirect-icon.png", name: "Undirect" },
  Cutling: { accent: "#17BB8A", deep: "#04170f", ink: "#020a07", icon: "cutling-icon.png", name: "Cutling" },
} as const;

// *word* marks the words drawn on the brand colour, as the films do.
export const hl = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\*([^*]+)\*/g, '<span class="hl">$1</span>');

export function frame(inner: string, size: Size, app: keyof typeof BRAND): string {
  const b = BRAND[app];
  const h = size === "ig" ? 1350 : 1920;
  // TikTok and Stories cover the bottom ~400 px and the right edge with their own controls.
  const pad = size === "ig" ? "96px 88px 96px" : "230px 120px 440px";
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{width:1080px;height:${h}px;overflow:hidden}
  body{font-family:-apple-system,"SF Pro Display",system-ui,"Helvetica Neue",Arial,sans-serif;color:#fff;
    background:radial-gradient(120% 70% at 50% 0%, ${b.accent}38 0%, transparent 60%),
      radial-gradient(90% 60% at 50% 110%, ${b.accent}24 0%, transparent 70%), linear-gradient(180deg, ${b.deep}, ${b.ink});
    -webkit-font-smoothing:antialiased}
  .wrap{position:absolute;inset:0;padding:${pad};display:flex;flex-direction:column}
  .hl{background:${b.accent};color:#fff;padding:0 .14em;border-radius:.12em;-webkit-box-decoration-break:clone;box-decoration-break:clone}
  .head{font-weight:800;letter-spacing:-.025em;line-height:1.08}
  .dim{color:rgba(255,255,255,.62)}
  .brand{display:flex;align-items:center;gap:22px;font-weight:700;font-size:44px;letter-spacing:-.01em}
  .brand img{width:96px;height:96px;border-radius:22px}
  .center{flex:1;display:flex;flex-direction:column;justify-content:center}
  .demo{position:absolute;top:18px;right:18px;background:#111;color:#fff;font:600 22px/1 -apple-system,system-ui;padding:9px 14px;border-radius:10px;letter-spacing:.02em;opacity:.85}
  .accent{color:${b.accent}}
  </style></head><body><div class="wrap">${inner}</div></body></html>`;
}

const brandRow = (app: keyof typeof BRAND, size = 96) =>
  `<div class="brand"><img src="${BRAND[app].icon}" style="width:${size}px;height:${size}px"><span>${BRAND[app].name}</span></div>`;

const fs = (size: Size, ig: number, tt: number) => (size === "ig" ? ig : tt);

// ---------- iOS-style pieces (drawn, dark mode) ----------
const toggle = (on: boolean) =>
  `<span style="display:inline-block;width:96px;height:58px;border-radius:29px;background:${on ? "#34C759" : "#39393d"};position:relative;flex:none">
   <span style="position:absolute;top:4px;${on ? "right:4px" : "left:4px"};width:50px;height:50px;border-radius:25px;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.3)"></span></span>`;
const row = (label: string, right = "", extra = "") =>
  `<div style="display:flex;align-items:center;justify-content:space-between;padding:0 36px;height:104px;border-bottom:1px solid #38383a;font-size:40px;${extra}"><span>${label}</span>${right}</div>`;
const chev = `<span style="color:#8e8e93;font-size:44px">›</span>`;
const iosGroup = (rows: string) =>
  `<div style="background:#1c1c1e;border-radius:30px;overflow:hidden;width:100%">${rows}</div>`;

// ---------- Cutling keyboard mock (light, copied from the App Store screenshots) ----------
type Item = { t: string; s: string; c: string; img?: boolean; qr?: boolean; on?: boolean };
const QR = [0, 1, 3, 4, 5, 9, 12, 15, 19, 20, 21, 23, 24, 7, 17];
const qrGrid = (px: number, gap: number) => `<div style="width:${px}px;height:${px}px;display:grid;grid-template-columns:repeat(5,1fr);gap:${gap}px">${Array.from({ length: 25 }, (_, i) => `<span style="background:${QR.includes(i) ? "#111" : "transparent"};border-radius:3px"></span>`).join("")}</div>`;
export function keyboard(items: Item[], w = 904): string {
  const card = (i: Item) => `<div style="background:#fff;border-radius:18px;padding:18px 20px;min-height:104px;${i.on ? "outline:5px solid #17BB8A;" : ""}">
    <div style="display:flex;align-items:center;gap:12px;font:700 28px/1.2 -apple-system,system-ui;color:#111">
      <span style="width:28px;height:28px;border-radius:7px;background:${i.c};flex:none"></span>${i.t}</div>
    ${i.qr ? `<div style="margin-top:12px;height:120px;border-radius:12px;background:#f2f2f4;display:flex;align-items:center;justify-content:center">${qrGrid(96, 4)}</div>` : i.img ? `<div style="margin-top:12px;height:120px;border-radius:12px;background:linear-gradient(135deg,#cfe9ff,#e9d7ff 60%,#ffe2c2);position:relative;overflow:hidden">
      <div style="position:absolute;left:14px;top:14px;right:60px;height:16px;border-radius:8px;background:rgba(255,255,255,.8)"></div>
      <div style="position:absolute;left:14px;top:44px;width:120px;height:56px;border-radius:10px;background:rgba(255,255,255,.75)"></div></div>`
      : `<div style="margin-top:8px;font:400 23px/1.25 -apple-system,system-ui;color:#8a8a8e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${i.s}</div>`}
  </div>`;
  return `<div style="width:${w}px;background:#d4d6dc;border-radius:40px;padding:26px 22px 30px;color:#111">
    <div style="display:flex;align-items:center;justify-content:center;gap:14px;font:500 30px -apple-system,system-ui;padding:6px 0 24px">
      <span style="width:28px;height:32px;border:4px solid #111;border-radius:6px;display:inline-block"></span>Add from Clipboard</div>
    <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px">${items.map(card).join("")}</div>
    <div style="display:flex;justify-content:space-between;margin-top:22px;padding:0 10px">
      <span style="width:64px;height:64px;border-radius:14px;background:#adb0b8"></span>
      <span style="flex:1;margin:0 16px;height:64px;border-radius:14px;background:#fff"></span>
      <span style="width:64px;height:64px;border-radius:14px;background:#adb0b8"></span></div>
  </div>`;
}

const phone = (inner: string, w = 860, h = 980, light = true) =>
  `<div style="width:${w}px;height:${h}px;border-radius:64px;background:${light ? "#fff" : "#000"};border:14px solid #0c0c0c;box-shadow:0 30px 80px rgba(0,0,0,.55),0 0 0 3px #333;overflow:hidden;position:relative;color:#111">${inner}</div>`;

const shotImg = (name: string, maxH: number) =>
  `<img src="${name}.png" style="max-width:100%;max-height:${maxH}px;border-radius:44px;box-shadow:0 30px 90px rgba(0,0,0,.6);display:block;margin:0 auto">`;

// ---------- the templates ----------
export const T: Record<string, (p: Props, size: Size) => { app: keyof typeof BRAND; html: string }> = {
  big: (p, size) => ({
    app: p.app,
    html: `<div class="center"><div class="head" style="font-size:${fs(size, 112, 120)}px">${hl(p.text)}</div></div>
      ${p.icon ? brandRow(p.app, 104) : ""}`,
  }),

  text: (p, size) => ({
    app: p.app,
    html: `<div class="center">${(p.lines as string[]).map((l, i) =>
        `<div class="head" style="font-size:${fs(size, 84, 92)}px;${i ? "margin-top:56px;" : ""}${i && !p.keepBright ? "color:rgba(255,255,255,.92)" : ""}">${hl(l)}</div>`).join("")}
      ${p.small ? `<div class="dim" style="font-size:42px;margin-top:64px;font-weight:500;line-height:1.3">${hl(p.small)}</div>` : ""}</div>
      ${p.icon ? `<div style="display:flex;justify-content:center"><img src="${BRAND[p.app as "Cutling"].icon}" style="width:120px;height:120px;border-radius:28px"></div>` : ""}`,
  }),

  quote: (p, size) => ({
    app: "Cutling",
    html: `<div class="center" style="background:transparent">
      <div style="font:800 260px/0.6 Georgia,serif;color:#17BB8A;margin-bottom:40px">“</div>
      <div class="head" style="font-size:${fs(size, 104, 112)}px">${hl(p.quote)}</div>
      <div class="dim" style="font-size:40px;margin-top:60px;font-weight:500">${p.cite}</div></div>`,
  }),

  cols: (p, size) => {
    const col = ([h, s]: string[], strong: boolean) => `<div style="flex:1;border-radius:40px;padding:56px 44px;background:${strong ? BRAND[p.app as "Cutling"].accent : "rgba(255,255,255,.08)"};display:flex;flex-direction:column;justify-content:center;min-height:${fs(size, 640, 760)}px">
      <div class="head" style="font-size:76px">${h}</div><div style="font-size:50px;font-weight:600;margin-top:28px;line-height:1.2;${strong ? "" : "color:rgba(255,255,255,.75)"}">${s}</div></div>`;
    return { app: p.app, html: `<div class="center"><div style="display:flex;gap:32px">${col(p.left, false)}${col(p.right, true)}</div></div>` };
  },

  prices: (_p, size) => ({
    app: "Cutling",
    html: `<div class="center"><div style="display:flex;gap:36px;align-items:center">
      <div style="flex:1;border-radius:36px;padding:70px 30px;background:rgba(255,255,255,.08);text-align:center">
        <div class="head" style="font-size:${fs(size, 96, 100)}px;color:#9a9a9a;text-decoration:line-through;text-decoration-thickness:10px;text-decoration-color:#9a9a9a">$29.99</div>
        <div style="font-size:48px;color:#9a9a9a;margin-top:20px;font-weight:600">a year</div></div>
      <div style="flex:1;border-radius:36px;padding:70px 30px;background:#17BB8A;text-align:center">
        <div class="head" style="font-size:${fs(size, 112, 120)}px">$4.99</div>
        <div style="font-size:48px;margin-top:20px;font-weight:700">once</div></div>
    </div></div>`,
  }),

  shot: (p, size) => ({
    app: p.app,
    html: `<div class="head" style="font-size:${fs(size, 84, 96)}px;margin-bottom:${fs(size, 52, 70)}px">${hl(p.head)}</div>
      <div style="flex:1;display:flex;align-items:${size === "ig" ? "flex-start" : "center"};justify-content:center;min-height:0">${shotImg(p.shot, fs(size, 960, 1100))}</div>`,
  }),

  store: (p, size) => ({
    app: p.app,
    html: `<div class="head" style="font-size:${fs(size, 88, 96)}px">${hl(p.head)}</div>
      <div class="dim" style="font-size:36px;margin:20px 0 ${fs(size, 44, 60)}px;font-weight:500">${p.sub}</div>
      <div style="flex:1;display:flex;align-items:${size === "ig" ? "flex-start" : "center"};justify-content:center;min-height:0">
        <img src="store-${p.capture}.png" style="max-width:100%;max-height:${fs(size, 860, 1000)}px;border-radius:36px;box-shadow:0 30px 90px rgba(0,0,0,.6)"></div>`,
  }),

  settings: (p, size) => ({
    app: "Undirect",
    html: `<div class="head" style="font-size:${fs(size, 100, 108)}px">${hl(p.top)}</div>
      <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:40px 0">
      <div style="width:100%;background:#000;border-radius:48px;padding:40px 30px;font-family:-apple-system,system-ui">
        <div style="display:flex;align-items:center;gap:16px;font-size:40px;color:#0a84ff;margin:0 10px 26px">‹ Apps<span style="flex:1;text-align:center;color:#fff;font-weight:600;margin-right:110px">Safari</span></div>
        <div style="color:#8e8e93;font-size:30px;margin:0 36px 14px">GENERAL</div>
        ${iosGroup(row("AutoFill", chev) + row("Favorites", chev) + row("Block Pop-ups", toggle(true), "background:#2c2c2e") + row("Extensions", chev, "border:none"))}
      </div></div>
      <div class="head" style="font-size:${fs(size, 100, 108)}px">${hl(p.bottom)}</div>`,
  }),

  flags: (p, size) => ({
    app: "Undirect",
    html: `<div class="head" style="font-size:${fs(size, 86, 96)}px">${hl(p.head)}</div>
      <div style="flex:1;display:flex;align-items:center;justify-content:center;padding-top:40px">
      <div style="width:100%;background:#000;border-radius:48px;padding:40px 30px">
        <div style="display:flex;align-items:center;font-size:40px;color:#0a84ff;margin:0 10px 26px">‹ Advanced<span style="flex:1;text-align:center;color:#fff;font-weight:600;margin-right:150px">Feature Flags</span></div>
        ${iosGroup(row("Use Speech Synthesis", toggle(false)) + row("Verify window.open user gesture", toggle(false), "outline:6px solid #FFD60A;outline-offset:-6px;border-radius:24px") + row("Web Inspector", toggle(false), "border:none"))}
        <div style="color:#8e8e93;font-size:30px;margin:24px 36px 0">Settings › Apps › Safari › Advanced › Feature Flags</div>
      </div></div>`,
  }),

  split: (_p, size) => ({
    app: "Cutling",
    html: `<div style="display:flex;gap:28px;flex:1;min-height:0">
      <div style="flex:1;display:flex;flex-direction:column">
        <div class="head" style="font-size:60px;margin-bottom:36px">Text Replacement</div>
        <div style="background:#000;border-radius:36px;padding:28px 0">
          ${["On my way!|omw", "Thanks so much!|ty", "123 Main St, Apt 4B|addr"].map((r) => { const [a, b] = r.split("|"); return `<div style="padding:22px 28px;border-bottom:1px solid #2c2c2e"><div style="font-size:32px">${a}</div><div style="font-size:26px;color:#8e8e93;margin-top:6px">${b}</div></div>`; }).join("")}
          <div style="font-size:26px;color:#8e8e93;padding:26px 28px;line-height:1.35">Plain text. Fires only when you type the shortcut.</div>
        </div></div>
      <div style="flex:1.15;display:flex;flex-direction:column">
        <div class="head" style="font-size:60px;margin-bottom:36px"><span class="hl">Cutling</span></div>
        <div style="zoom:0.56">
          ${keyboard([
            { t: "Home Address", s: "123 Main Street, Apt 4B<br>New York, NY 10001", c: "#0a84ff" },
            { t: "Email Signature", s: "Best regards, Alex Chen", c: "#bf5af2" },
            { t: "Office Map", s: "", c: "#ff9f0a", img: true },
            { t: "Reply: Hours", s: "We're open 9 to 5, Monday to Friday, and on Saturday mornings.", c: "#30d158" },
          ], 866)}
        </div></div></div>`,
  }),

  virus: (p, size) => ({
    app: "Undirect",
    html: `<div class="head" style="font-size:${fs(size, 96, 104)}px;margin-bottom:56px">${hl(p.head)}</div>
      <div style="flex:1;display:flex;justify-content:center;min-height:0">${phone(`
        <div class="demo">Demo page</div>
        <div style="padding:90px 50px 0;filter:blur(1.5px)">
          <div style="font:600 30px -apple-system,system-ui,sans-serif;color:#555;text-align:center;margin-bottom:40px">device-care.example</div>
          <div style="font:800 56px/1.15 -apple-system,system-ui,sans-serif">Your <span style="color:#0a84ff">iPhone</span> is severely damaged by <span style="color:#e00">(12) virus!</span></div>
          <div style="font:400 30px/1.4 -apple-system,system-ui,sans-serif;color:#444;margin-top:30px">We have detected that your iPhone has been infected with viruses. It will soon corrupt your SIM card, data, photos and contacts if you don't take any action.</div>
          <div style="font:700 40px -apple-system,system-ui,sans-serif;color:#e00;margin:34px 0;text-align:center">1 minute and 24 seconds</div>
          <div style="background:#0a84ff;color:#fff;border-radius:18px;text-align:center;font:700 38px/96px -apple-system,system-ui,sans-serif">Protect iPhone</div>
        </div>`, 820, fs(size, 860, 1040))}</div>`,
  }),

  xbtn: (p, size) => {
    const x = (st: string, n: number, look: string) => `<div style="position:absolute;${st};display:flex;align-items:center;gap:12px">
      <span style="${look};display:flex;align-items:center;justify-content:center">✕</span>
      <span style="width:58px;height:58px;border-radius:29px;background:#D92B24;color:#fff;font:800 34px/58px -apple-system,system-ui,sans-serif;text-align:center">${n}</span></div>`;
    return {
      app: "Undirect",
      html: `<div class="head" style="font-size:${fs(size, 96, 104)}px;margin-bottom:56px">${hl(p.head)}</div>
      <div style="flex:1;display:flex;justify-content:center;min-height:0">${phone(`
        <div class="demo">Demo page</div>
        <div style="padding:90px 40px 0">
          <div style="font:600 28px -apple-system,system-ui,sans-serif;color:#777;text-align:center;margin-bottom:28px">recipes.example</div>
          <div style="height:26px;width:80%;background:#e6e6e6;border-radius:13px;margin:14px 0"></div>
          <div style="height:26px;width:62%;background:#e6e6e6;border-radius:13px;margin:14px 0 34px"></div>
          <div style="position:relative;height:${fs(size, 470, 600)}px;border-radius:26px;background:linear-gradient(160deg,#ffcf3f,#ff6b2c);padding:40px;color:#311">
            <div style="font:900 64px/1 -apple-system,system-ui,sans-serif">MEGA SALE</div>
            <div style="font:700 38px/1.2 -apple-system,system-ui,sans-serif;margin-top:16px">Phones from $1. Tap to claim.</div>
            <div style="position:absolute;bottom:34px;left:40px;background:#311;color:#fff;font:800 34px/80px -apple-system,system-ui,sans-serif;padding:0 40px;border-radius:40px">CLAIM</div>
            ${x("top:22px;right:22px", 1, "width:66px;height:66px;border-radius:33px;background:rgba(0,0,0,.55);color:#fff;font:700 34px -apple-system,system-ui,sans-serif")}
            ${x("bottom:40px;right:22px", 2, "width:80px;height:80px;border-radius:12px;background:#fff;color:#311;font:900 44px -apple-system,system-ui,sans-serif;box-shadow:0 4px 10px rgba(0,0,0,.25)")}
          </div>
          ${x(`top:${fs(size, 216, 236)}px;right:40px`, 3, "width:52px;height:52px;border-radius:26px;background:#ddd;color:#555;font:700 28px -apple-system,system-ui,sans-serif")}
        </div>`, 820, fs(size, 860, 1040))}</div>`,
    };
  },

  dm: (_p, size) => {
    const b = (t: string, me = false) => `<div style="align-self:${me ? "flex-end" : "flex-start"};max-width:76%;background:${me ? "#7a3cff" : "#efefef"};color:${me ? "#fff" : "#111"};font:400 32px/1.3 -apple-system,system-ui,sans-serif;padding:20px 28px;border-radius:36px;margin:8px 0">${t}</div>`;
    return {
      app: "Cutling",
      html: `<div class="head" style="font-size:${fs(size, 80, 92)}px;margin-bottom:44px">The same three DMs, <span class="hl">forty times</span> a day</div>
      <div style="flex:1;display:flex;justify-content:center;min-height:0">${phone(`
        <div style="padding:70px 34px 0;display:flex;flex-direction:column">
          <div style="display:flex;align-items:center;gap:16px;font:700 30px -apple-system,system-ui,sans-serif;margin-bottom:26px"><span style="width:56px;height:56px;border-radius:28px;background:linear-gradient(135deg,#f9a,#fc6)"></span>maya.buys.things</div>
          ${b("Is this still available?")}${b("Where do you ship?")}${b("How do I pay?")}
        </div>
        <div style="position:absolute;left:0;bottom:0;zoom:.88">
        ${keyboard([
          { t: "Still available", s: "Yes! Still available in medium and large.", c: "#30d158", on: true },
          { t: "Shipping", s: "We ship worldwide, 3 to 7 days.", c: "#0a84ff" },
          { t: "How to pay", s: "Pay by card at the link in our bio.", c: "#ff9f0a" },
          { t: "Sizes", s: "S, M and L. Measurements in the photos.", c: "#bf5af2" },
        ], 945)}</div>`, 860, fs(size, 920, 1080))}</div>`,
    };
  },

  reader: (_p, size) => ({
    app: "Undirect",
    html: `<div class="head" style="font-size:${fs(size, 88, 96)}px;margin-bottom:50px">Next is the button. The <span class="hl">layer</span> over it isn't.</div>
      <div style="flex:1;display:flex;justify-content:center;min-height:0">${phone(`
        <div class="demo">Demo page</div>
        <div style="background:#15151a;position:absolute;inset:0;padding:96px 50px 0;color:#ddd">
          <div style="font:600 28px -apple-system,system-ui,sans-serif;color:#888;text-align:center;margin-bottom:34px">reader.example</div>
          <div style="font:800 58px -apple-system,system-ui,sans-serif;color:#fff">Chapter 41</div>
          ${[92, 88, 95, 70, 90, 84, 60].map((w) => `<div style="height:22px;width:${w}%;background:#2c2c34;border-radius:11px;margin:22px 0"></div>`).join("")}
          <div style="display:flex;justify-content:space-between;margin-top:${fs(size, 40, 120)}px;position:relative">
            <div style="font:700 36px/96px -apple-system,system-ui,sans-serif;padding:0 46px;border-radius:20px;background:#2c2c34">‹ Prev</div>
            <div style="font:700 36px/96px -apple-system,system-ui,sans-serif;padding:0 46px;border-radius:20px;background:#4a4aff;color:#fff">Next ›</div>
            <div style="position:absolute;inset:-40px -24px;border:6px dashed #D92B24;border-radius:26px;background:rgba(217,43,36,.12)"></div>
            <div style="position:absolute;right:0;top:-96px;font:700 28px -apple-system,system-ui,sans-serif;color:#ff6b62">invisible layer</div>
          </div>
        </div>`, 820, fs(size, 860, 1040), false)}</div>`,
  }),

  kb: (p, size) => {
    const parcel = p.mode === "parcel";
    const items: Item[] = parcel
      ? [
          { t: "Mum", s: "14 Elm Road, Bristol BS1 4XY", c: "#ff375f", on: true },
          { t: "Office", s: "Unit 3, 80 Harbour St, Leeds LS1 2AB", c: "#0a84ff" },
          { t: "Aunt Rina", s: "22 Example Lane, Apt 9, Portland", c: "#30d158" },
          { t: "My address", s: "221 Example Street, Flat 4", c: "#ff9f0a" },
        ]
      : [
          { t: "Booking QR", s: "", c: "#bf5af2", qr: true, on: true },
          { t: "Booking link", s: "cal.example/alex-chen", c: "#0a84ff" },
          { t: "Work Email", s: "alex@example.com", c: "#30d158" },
          { t: "Home Address", s: "123 Main Street, Apt 4B", c: "#ff9f0a" },
        ];
    const top = parcel
      ? `<div style="padding:70px 40px 0;font-family:-apple-system,system-ui,sans-serif">
          <div style="font:800 46px -apple-system,system-ui,sans-serif;margin-bottom:24px">Send a parcel</div>
          <div style="font:600 24px -apple-system,system-ui,sans-serif;color:#8a8a8e;margin-bottom:8px">RECIPIENT</div>
          <div style="border:3px solid #17BB8A;border-radius:18px;padding:20px 24px;font:400 32px/1.35 -apple-system,system-ui,sans-serif">14 Elm Road<br>Bristol BS1 4XY</div>
          <div style="font:600 24px -apple-system,system-ui,sans-serif;color:#8a8a8e;margin:22px 0 8px">SERVICE</div>
          <div style="border:2px solid #ddd;border-radius:18px;padding:20px 24px;font:400 32px -apple-system,system-ui,sans-serif;color:#999">Standard, 2 to 3 days</div></div>`
      : `<div style="padding:70px 34px 0;display:flex;flex-direction:column;font-family:-apple-system,system-ui,sans-serif">
          <div style="text-align:center;font:600 28px -apple-system,system-ui,sans-serif;color:#666;margin-bottom:24px">Sam</div>
          <div style="align-self:flex-start;background:#e9e9eb;font:400 32px/1.3 -apple-system,system-ui,sans-serif;padding:18px 26px;border-radius:34px">Can you send the booking QR again?</div>
          <div style="align-self:flex-end;margin-top:16px;width:210px;height:210px;border-radius:30px;background:#fff;border:3px solid #e5e5e5;display:flex;align-items:center;justify-content:center">${qrGrid(150, 8)}</div>
          <div style="align-self:flex-end;margin-top:8px;font:500 24px -apple-system,system-ui,sans-serif;color:#8a8a8e">Pasted from Cutling</div></div>`;
    return {
      app: "Cutling",
      html: `<div class="head" style="font-size:${fs(size, 84, 94)}px;margin-bottom:44px">${parcel ? "Three addresses, <span class=\"hl\">one tap</span> each" : "An image is a <span class=\"hl\">cutling</span> too"}</div>
      <div style="flex:1;display:flex;justify-content:center;min-height:0">${phone(`${top}
        <div style="position:absolute;left:0;bottom:0;zoom:.88">${keyboard(items, 945)}</div>`, 860, fs(size, 960, 1080))}</div>`,
    };
  },

  // ---------- Stories ----------
  storyq: (p, size) => {
    const vis = p.shot
      ? `<div style="display:flex;justify-content:center">${shotImg(p.shot, 1020)}</div>`
      : p.visual === "stream"
      ? `<div style="display:flex;justify-content:center">${phone(`<div class="demo">Demo page</div>
          <div style="background:#0f1115;position:absolute;inset:0;padding:86px 34px 0">
            <div style="font:600 24px -apple-system,system-ui,sans-serif;color:#888;text-align:center;margin-bottom:24px">stream.example</div>
            <div style="height:300px;border-radius:20px;background:linear-gradient(180deg,#1b2a44,#0a1222);display:flex;align-items:center;justify-content:center"><span style="width:110px;height:110px;border-radius:55px;background:#e11;display:flex;align-items:center;justify-content:center;color:#fff;font-size:50px">▶</span></div>
            <div style="margin-top:30px;height:120px;border-radius:14px;background:#ffcf3f;color:#311;font:900 44px/120px -apple-system,system-ui,sans-serif;text-align:center;outline:7px solid #D92B24;outline-offset:6px">BANNER AD</div></div>`, 700, 700, false)}</div>`
      : p.visual === "download"
      ? `<div style="display:flex;justify-content:center">${phone(`<div class="demo">Demo page</div>
          <div style="padding:90px 40px 0;font-family:-apple-system,system-ui,sans-serif">
            <div style="font:600 24px -apple-system,system-ui,sans-serif;color:#888;text-align:center;margin-bottom:24px">file-host.example</div>
            <div style="font:700 34px -apple-system,system-ui,sans-serif">Night.Harbor.2026.1080p.mp4</div>
            <div style="margin-top:28px;background:#1fa64a;color:#fff;font:800 40px/100px -apple-system,system-ui,sans-serif;text-align:center;border-radius:16px">⬇ DOWNLOAD</div>
            <div style="display:flex;gap:18px;margin-top:20px"><span style="flex:1;background:#f07b16;color:#fff;font:700 30px/80px -apple-system,system-ui,sans-serif;text-align:center;border-radius:14px">▶ Start Download</span><span style="flex:1;background:#2a62e0;color:#fff;font:700 30px/80px -apple-system,system-ui,sans-serif;text-align:center;border-radius:14px">⚡ Fast Download</span></div>
            <div style="margin-top:26px;text-align:center;font:500 28px -apple-system,system-ui,sans-serif;color:#1a56d6;text-decoration:underline">night.harbor.2026.mp4 (2.31 GB)</div></div>`, 700, 700)}</div>`
      : p.visual === "settings"
      ? `<div style="background:#000;border-radius:44px;padding:34px 24px">${iosGroup(row("Block Pop-ups", toggle(true), "border:none"))}</div>`
      : "";
    return {
      app: p.app,
      html: `<div class="head" style="font-size:88px">${hl(p.q)}</div>
        <div style="height:${p.shot ? 90 : vis ? 300 : 520}px"></div>${vis}`,
    };
  },

  storylink: (p) => ({
    app: p.app,
    html: `<div class="center" style="align-items:center;text-align:center">
      <img src="${BRAND[p.app as "Cutling"].icon}" style="width:260px;height:260px;border-radius:58px;box-shadow:0 30px 80px rgba(0,0,0,.5)">
      <div class="head" style="font-size:110px;margin-top:50px">${p.app}</div>
      <div style="font-size:48px;font-weight:600;margin-top:24px;color:rgba(255,255,255,.8)">${p.app === "Undirect" ? "Stops the tabs a tap sets off" : "Your saved text, one tap away"}</div>
      <div style="height:260px"></div></div>`,
  }),
};

// ---------- Story stickers, drawn where they go (a guide copy; the posted frame stays clean) ----------
export function sticker(st: { type: string; q?: string; options?: string[]; correct?: number; emoji?: string; url?: string; label?: string }): string {
  const box = (inner: string, top = 860) => `<div style="position:absolute;left:170px;right:170px;top:${top}px;background:#fff;color:#111;border-radius:40px;box-shadow:0 20px 60px rgba(0,0,0,.45);padding:40px 40px 44px;font-family:-apple-system,system-ui,sans-serif">${inner}</div>`;
  const q = st.q ? `<div style="font:700 44px/1.2 -apple-system,system-ui,sans-serif;text-align:center;margin-bottom:28px">${st.q}</div>` : "";
  const t = st.type.toLowerCase();
  if (t.startsWith("link")) return `<div style="position:absolute;left:50%;transform:translateX(-50%);top:1290px;background:#fff;color:#1d63ff;border-radius:22px;padding:22px 34px;font:700 40px -apple-system,system-ui,sans-serif;box-shadow:0 14px 40px rgba(0,0,0,.4);white-space:nowrap">🔗 ${st.label ?? st.url}</div>`;
  if (t.startsWith("poll")) return box(q + (st.options ?? []).map((o) => `<div style="border:3px solid #e6e6e6;border-radius:999px;padding:20px;margin-top:16px;text-align:center;font:600 38px -apple-system,system-ui,sans-serif">${o}</div>`).join(""));
  if (t.startsWith("quiz")) return box(q + (st.options ?? []).map((o, i) => `<div style="display:flex;align-items:center;gap:20px;border:3px solid #e6e6e6;border-radius:999px;padding:18px 22px;margin-top:16px;font:600 36px -apple-system,system-ui,sans-serif"><span style="width:52px;height:52px;border-radius:26px;background:#f1f1f1;display:flex;align-items:center;justify-content:center;font-size:28px">${"ABCD"[i]}</span>${o}</div>`).join(""));
  if (t.startsWith("emoji")) return box(q + `<div style="height:16px;border-radius:8px;background:linear-gradient(90deg,#c13584,#fd1d1d,#fcb045);margin:30px 10px 10px;position:relative"><span style="position:absolute;left:62%;top:-38px;font-size:76px">${st.emoji ?? "😤"}</span></div>`);
  if (t.startsWith("questions")) return box(`<div style="margin:-40px -40px 26px;padding:34px 40px;border-radius:40px 40px 0 0;background:linear-gradient(135deg,#6a5cff,#c13584);color:#fff;font:700 42px/1.2 -apple-system,system-ui,sans-serif;text-align:center">${st.q}</div><div style="background:#f1f1f1;border-radius:22px;padding:26px;color:#999;font:500 34px -apple-system,system-ui,sans-serif;text-align:center">Type something…</div>`);
  if (t.startsWith("add yours")) return box(`<div style="font:800 30px -apple-system,system-ui,sans-serif;letter-spacing:.08em;color:#c13584;text-align:center;margin-bottom:14px">ADD YOURS</div>${q}<div style="background:#111;color:#fff;border-radius:18px;padding:22px;text-align:center;font:700 36px -apple-system,system-ui,sans-serif">Add yours</div>`);
  return box(q);
}

export const T2: Record<string, (p: Props, size: Size) => { app: keyof typeof BRAND; html: string }> = {
  ttend: (p) => ({
    app: p.app,
    html: `<div class="center" style="align-items:center;text-align:center">
      <img src="${BRAND[p.app as "Cutling"].icon}" style="width:240px;height:240px;border-radius:54px">
      <div class="head" style="font-size:96px;margin-top:50px">Search <span class="hl">${p.app}</span></div>
      <div class="head" style="font-size:96px">on the App Store</div>
      <div class="dim" style="font-size:44px;margin-top:36px;font-weight:600">${p.app === "Undirect" ? "Safari on iPhone, iPad and Mac" : "iPhone, iPad and Mac"}</div></div>`,
  }),
};
