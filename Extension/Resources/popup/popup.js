const api = globalThis.browser ?? globalThis.chrome;

const t = (key, ...args) => api.i18n.getMessage(key, args.map(String));
const plural = (n, stem) => t(n === 1 ? `${stem}_one` : `${stem}_other`, n);

let current = null;
let tabId;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function localizeStatic() {
  for (const node of document.querySelectorAll("[data-i18n]")) {
    node.textContent = t(node.dataset.i18n);
  }
  for (const node of document.querySelectorAll("[data-i18n-label]")) {
    node.append(t(node.dataset.i18nLabel));
  }
}

function show(id) {
  for (const view of document.querySelectorAll(".view")) view.hidden = view.id !== id;
  window.scrollTo(0, 0);
}

// because (lib/navigation.js) -> a short, localized line for why. A rule
// already reads as "Blocked everywhere", so it gets no line of its own.
const REASONS = {
  "carries a way back here": "reason_way_back",
  "asked for at a size": "reason_sized",
  "took the press": "reason_took_press",
  "allowed by default": "reason_default_allow",
  "the page's own code": "reason_own_code",
};

const label = (verdict, scope) =>
  `${t(verdict === "block" ? "state_blocked" : "state_allowed")} ${t(scope)}`;

// A rule set for this destination wins. Short of one, what actually happened
// last time is the honest default.
function choiceOf(row, policy) {
  if (row.here) return `${row.here}:here`;
  if (row.everywhere) return `${row.everywhere}:everywhere`;
  return `default:${row.lastVerdict ?? policy}`;
}

const capital = (text) => text.charAt(0).toUpperCase() + text.slice(1);

async function send(msg) {
  await api.runtime.sendMessage(msg);
}

// A short chip over an invisible native menu: the chip names the verdict,
// the menu opens with every rule it can have.
function menu(verdict, options, chosen, name, onChange) {
  const wrap = el("label", "verdict");
  wrap.dataset.verdict = verdict;
  wrap.append(el("span", "", t(verdict === "block" ? "state_blocked" : "state_allowed")));
  const select = el("select");
  for (const [value, text] of options) {
    const option = el("option", "", text);
    option.value = value;
    option.selected = value === chosen;
    select.append(option);
  }
  select.setAttribute("aria-label", name);
  select.addEventListener("change", () => onChange(select.value));
  wrap.append(select);
  return wrap;
}

function scopeOf(row) {
  if (row.here) return t("scope_here");
  if (row.everywhere) return t("scope_everywhere");
  return t("scope_default");
}

function verdictMenu(row, policy) {
  const chosen = choiceOf(row, policy);
  const fallback = row.lastVerdict ?? policy;
  const verdict = row.here ?? row.everywhere ?? fallback;
  const options = [
    [`default:${fallback}`, label(fallback, "scope_default")],
    ["block:here", label("block", "scope_here")],
    ["allow:here", label("allow", "scope_here")],
    ["block:everywhere", label("block", "scope_everywhere")],
    ["allow:everywhere", label("allow", "scope_everywhere")],
  ];
  return menu(verdict, options, chosen, row.base, async (value) => {
    const [choice, scope] = value.split(":");
    const site = current.site;
    // The narrower rule wins, so it goes whenever the choice is wider.
    if ((choice === "default" || scope === "everywhere") && row.here) {
      await send({ type: "undirect:rule", base: row.base, verdict: null, scope: "here", site });
    }
    if (choice === "default" && row.everywhere) {
      await send({ type: "undirect:rule", base: row.base, verdict: null, scope: "everywhere", site });
    }
    if (choice !== "default") {
      await send({ type: "undirect:rule", base: row.base, verdict: choice, scope, site });
    }
    load();
  });
}

function renderRows(state) {
  const list = document.getElementById("rows");
  list.replaceChildren();

  document.getElementById("page-quiet").hidden = state.rows.length > 0;
  if (!state.rows.length) return;

  for (const row of [...state.rows].sort((a, b) => b.count - a.count)) {
    const li = el("li", "row dest");
    const text = el("div", "text");
    const name = el("span", "title", row.base);
    name.title = row.url || row.base;
    const kinds = row.kinds.map((k) => t(`kind_${k.replace(/-/g, "_")}`) || k);
    const reason = REASONS[row.lastBecause] ? t(REASONS[row.lastBecause]) : "";
    const scope = row.local ? "" : `${capital(scopeOf(row))}.`;
    const detail = [scope, plural(row.count, "popup_tries"), kinds.length ? `${kinds.join(", ")}.` : "", reason]
      .filter(Boolean)
      .join(" ");
    const sub = el("span", "subtitle title", detail);
    sub.title = detail;
    text.append(name, sub);
    // A trap on this site has no destination to rule on.
    const control = row.local ? el("span", "removed", t("state_removed")) : verdictMenu(row, state.settings.policy);
    li.append(text, control);
    list.append(li);
  }
}

function ruleRow(base, verdict, scope, site) {
  const li = el("li", "row dest");
  const text = el("div", "text");
  text.append(el("span", "title", base), el("span", "subtitle title", scope === "here" ? site : capital(t("scope_everywhere"))));

  const options = [["block", t("action_block")], ["allow", t("action_allow")], ["", t("action_clear")]];
  const control = menu(verdict, options, verdict, base, async (value) => {
    await send({ type: "undirect:rule", base, verdict: value || null, scope, site });
    load();
  });
  li.append(text, control);
  return li;
}

function emptyRow() {
  const li = el("li", "row");
  li.append(el("span", "title empty", t("rules_empty")));
  return li;
}

function renderRules(state) {
  const everywhere = document.getElementById("rules-everywhere");
  const bySite = document.getElementById("rules-by-site");

  const globals = Object.entries(state.everywhere ?? {}).sort();
  everywhere.replaceChildren(...(globals.length ? globals.map(([b, v]) => ruleRow(b, v, "everywhere", "")) : [emptyRow()]));

  const local = Object.entries(state.perSite ?? {})
    .flatMap(([site, rules]) => Object.entries(rules).map(([b, v]) => [site, b, v]))
    .sort();
  bySite.replaceChildren(...(local.length ? local.map(([s, b, v]) => ruleRow(b, v, "here", s)) : [emptyRow()]));
}

function renderWatch(state) {
  const watch = document.getElementById("watch");
  const note = document.getElementById("watch-note");
  document.getElementById("site").textContent = state.site || t("app_title");

  watch.checked = state.guarding;
  watch.disabled = !state.site || state.settings.enabled === false || state.settings.mode === "everywhere";

  if (state.settings.enabled === false) note.textContent = t("popup_watch_master_off");
  else if (state.settings.mode === "everywhere") note.textContent = t("popup_watch_everywhere");
  else if (!state.site) note.textContent = t("popup_watch_unknown");
  else note.textContent = t(state.guarding ? "popup_watch_on" : "popup_watch_off");
}

// A prefilled issue on the public repository. It opens in a tab and sends
// nothing until the person submits it themselves.
function reportSite() {
  const site = current?.site || "";
  const rows = current?.rows ?? [];
  const seen = rows.length
    ? rows.map((r) => `- ${r.base} (${r.kinds.join(", ") || "seen"}, x${r.count})`).join("\n")
    : "- nothing recorded";
  const url = new URL("https://github.com/kengomatsuo/undirect/issues/new");
  url.searchParams.set("title", `Missed a pop on ${site}`);
  url.searchParams.set("body", `Site: ${site}\n\nWhat the guard recorded:\n${seen}\n\nWhat happened instead:\n`);
  api.tabs.create({ url: url.href });
  window.close();
}

async function load() {
  const tabs = await api.tabs.query({ active: true, currentWindow: true });
  tabId = tabs[0]?.id;

  const state = await api.runtime.sendMessage({ type: "undirect:popup", tabId, url: tabs[0]?.url });
  if (!state) return;
  current = state;

  renderWatch(state);

  document.getElementById("page-section").hidden = !state.guarding;
  document.getElementById("page-count").textContent = state.counts.page
    ? plural(state.counts.page, "popup_stopped")
    : "";

  const recipe = document.getElementById("page-recipe");
  recipe.hidden = !state.recipe;
  if (state.recipe) recipe.textContent = `${t("popup_recipe_heading")}: ${state.recipe}`;

  renderRows(state);
  renderRules(state);

  document.getElementById("guard").checked = state.settings.enabled !== false;
  document.getElementById("banner").checked = state.settings.banner === true;
  for (const radio of document.querySelectorAll('input[name="policy"]')) {
    radio.checked = radio.value === state.settings.policy;
  }
  for (const radio of document.querySelectorAll('input[name="mode"]')) {
    radio.checked = radio.value === (state.settings.mode ?? "watched");
  }

  document.getElementById("bridge-warning").hidden = true;
  if (state.guarding && tabId !== undefined) {
    const status = await api.tabs.sendMessage(tabId, { type: "undirect:status" }).catch(() => null);
    document.getElementById("bridge-warning").hidden = !status || status.bridgeLoaded;
  }
}

document.getElementById("watch").addEventListener("change", async (e) => {
  await send({ type: "undirect:watch", site: current?.site, on: e.target.checked, tabId });
  // The tab reloads: the hooks this controls are installed at document_start.
  window.close();
});

document.getElementById("guard").addEventListener("change", async (e) => {
  await send({ type: "undirect:set", settings: { enabled: e.target.checked } });
  load();
});

document.getElementById("banner").addEventListener("change", async (e) => {
  await send({ type: "undirect:set", settings: { banner: e.target.checked } });
});

for (const name of ["policy", "mode"]) {
  for (const radio of document.querySelectorAll(`input[name="${name}"]`)) {
    radio.addEventListener("change", async (e) => {
      await send({ type: "undirect:set", settings: { [name]: e.target.value } });
      load();
    });
  }
}

for (const node of document.querySelectorAll("[data-go]")) {
  node.addEventListener("click", () => show(node.dataset.go));
}

document.getElementById("report").addEventListener("click", reportSite);

localizeStatic();
load();
