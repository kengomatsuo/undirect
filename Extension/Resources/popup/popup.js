const api = globalThis.browser ?? globalThis.chrome;

const t = (key, ...args) => api.i18n.getMessage(key, args.map(String));
const plural = (n, stem) => t(n === 1 ? `${stem}_one` : `${stem}_other`, n);

let current = null;
let tabId;
let view = "page";

function localizeStatic() {
  for (const el of document.querySelectorAll("[data-i18n]")) {
    el.textContent = t(el.dataset.i18n);
  }
}

function verdictOf(row, policy) {
  if (row.here) return { verdict: row.here, scope: "scope_here" };
  if (row.everywhere) return { verdict: row.everywhere, scope: "scope_everywhere" };
  return { verdict: policy, scope: "scope_default" };
}

async function setRule(base, verdict, scope, site) {
  await api.runtime.sendMessage({
    type: "undirect:rule",
    base,
    verdict,
    scope,
    site: site || current.site,
  });
  load();
}

function renderRows(state) {
  const list = document.getElementById("rows");
  list.replaceChildren();

  if (!state.rows.length) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = t("popup_page_empty");
    list.append(li);
    return;
  }

  const ordered = [...state.rows].sort((a, b) => b.count - a.count);

  for (const row of ordered) {
    const { verdict, scope } = verdictOf(row, state.settings.policy);
    const li = document.createElement("li");

    const name = document.createElement("span");
    name.className = "name";
    name.textContent = row.base;
    name.title = row.url || row.base;

    const state_ = document.createElement("span");
    state_.className = "state";
    state_.dataset.verdict = verdict;
    state_.textContent = `${t(verdict === "block" ? "state_blocked" : "state_allowed")} ${t(scope)}`;

    const what = document.createElement("span");
    what.className = "what";
    const kinds = row.kinds.map((k) => t(`kind_${k.replace(/-/g, "_")}`) || k);
    what.textContent = [plural(row.count, "popup_tries"), kinds.join(", ")]
      .filter(Boolean)
      .join(" ");

    const actions = document.createElement("span");
    actions.className = "actions";
    const flipped = verdict === "block" ? "allow" : "block";
    for (const scopeName of ["here", "everywhere"]) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = t(`action_${flipped}_${scopeName}`);
      button.addEventListener("click", () => setRule(row.base, flipped, scopeName));
      actions.append(button);
    }

    li.append(name, state_, what, actions);
    list.append(li);
  }
}

// One row of the rules screen: what it applies to, what it says, and the two
// ways out of it.
function ruleRow(base, verdict, scope, site) {
  const li = document.createElement("li");

  const name = document.createElement("span");
  name.className = "name";
  name.textContent = base;

  const chip = document.createElement("span");
  chip.className = "state";
  chip.dataset.verdict = verdict;
  chip.textContent = t(verdict === "block" ? "state_blocked" : "state_allowed");

  const what = document.createElement("span");
  what.className = "what";
  what.textContent = scope === "here" ? site : t("scope_everywhere");

  const actions = document.createElement("span");
  actions.className = "actions";

  const flipped = verdict === "block" ? "allow" : "block";
  const flip = document.createElement("button");
  flip.type = "button";
  flip.textContent = t(`action_${flipped}`);
  flip.addEventListener("click", () => setRule(base, flipped, scope, site));

  const clear = document.createElement("button");
  clear.type = "button";
  clear.textContent = t("action_clear");
  clear.addEventListener("click", () => setRule(base, null, scope, site));

  actions.append(flip, clear);
  li.append(name, chip, what, actions);
  return li;
}

function renderRules(state) {
  const everywhere = document.getElementById("rules-everywhere");
  const bySite = document.getElementById("rules-by-site");
  everywhere.replaceChildren();
  bySite.replaceChildren();

  const globals = Object.entries(state.everywhere ?? {});
  if (!globals.length) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = t("rules_empty");
    everywhere.append(li);
  }
  for (const [base, verdict] of globals.sort()) {
    everywhere.append(ruleRow(base, verdict, "everywhere", ""));
  }

  const bySiteRules = Object.entries(state.perSite ?? {}).flatMap(([site, rules]) =>
    Object.entries(rules).map(([base, verdict]) => [site, base, verdict])
  );
  if (!bySiteRules.length) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = t("rules_empty");
    bySite.append(li);
  }
  for (const [site, base, verdict] of bySiteRules.sort()) {
    bySite.append(ruleRow(base, verdict, "here", site));
  }
}

function renderView() {
  const onRules = view === "rules";
  document.getElementById("rules-view").hidden = !onRules;
  for (const panel of document.querySelectorAll(".page-view")) {
    panel.hidden = onRules;
  }
  document.getElementById("view-toggle").textContent = t(
    onRules ? "popup_page_link" : "popup_rules_link"
  );
}

function renderBanner(enabled) {
  document.getElementById("banner").checked = enabled;
  document.getElementById("banner-state").textContent = t(
    enabled ? "popup_guard_on" : "popup_guard_off"
  );
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
  url.searchParams.set(
    "body",
    `Site: ${site}\n\nWhat the guard recorded:\n${seen}\n\nWhat happened instead:\n`
  );
  api.tabs.create({ url: url.href });
  window.close();
}

function renderGuard(enabled) {
  document.getElementById("guard").checked = enabled;
  document.getElementById("guard-state").textContent = t(
    enabled ? "popup_guard_on" : "popup_guard_off"
  );
}

async function load() {
  const tabs = await api.tabs.query({ active: true, currentWindow: true });
  tabId = tabs[0]?.id;

  const state = await api.runtime.sendMessage({ type: "undirect:popup", tabId });
  if (!state) return;
  current = state;

  renderGuard(state.settings.enabled);
  renderBanner(state.settings.banner === true);

  const count = document.getElementById("page-count");
  if (!state.counts.seen) {
    count.textContent = t("popup_page_quiet");
    count.classList.add("empty");
  } else {
    count.classList.remove("empty");
    count.textContent = `${plural(state.counts.page, "popup_stopped")} ${plural(
      state.counts.seen,
      "popup_seen"
    )}`;
  }

  const recipe = document.getElementById("page-recipe");
  recipe.hidden = !state.recipe;
  if (state.recipe) recipe.textContent = `${t("popup_recipe_heading")}: ${state.recipe}`;

  renderRows(state);
  renderRules(state);
  renderView();

  for (const radio of document.querySelectorAll('input[name="policy"]')) {
    radio.checked = radio.value === state.settings.policy;
  }

  document.getElementById("session").textContent = plural(state.counts.session, "popup_session");
  document.getElementById("total").textContent = plural(state.counts.lifetime, "popup_total");

  if (tabId !== undefined) {
    const status = await api.tabs
      .sendMessage(tabId, { type: "undirect:status" })
      .catch(() => null);
    document.getElementById("bridge-warning").hidden = !status || status.bridgeLoaded;
  }
}

document.getElementById("guard").addEventListener("change", async (e) => {
  const enabled = e.target.checked;
  await api.runtime.sendMessage({ type: "undirect:set", settings: { enabled } });
  renderGuard(enabled);
});

for (const radio of document.querySelectorAll('input[name="policy"]')) {
  radio.addEventListener("change", async (e) => {
    await api.runtime.sendMessage({
      type: "undirect:set",
      settings: { policy: e.target.value },
    });
    load();
  });
}

document.getElementById("view-toggle").addEventListener("click", () => {
  view = view === "rules" ? "page" : "rules";
  renderView();
});

document.getElementById("banner").addEventListener("change", async (e) => {
  const banner = e.target.checked;
  await api.runtime.sendMessage({ type: "undirect:set", settings: { banner } });
  renderBanner(banner);
});

document.getElementById("report").addEventListener("click", reportSite);

localizeStatic();
renderView();
load();
