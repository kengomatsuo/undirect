// Keeps the record of where pages tried to send the user, decides what the
// rules say, and turns "block everywhere" into a network rule so the request
// never leaves the machine.
const api = globalThis.browser ?? globalThis.chrome;

const FIRST_DYNAMIC_RULE_ID = 1000;
const MAX_ROWS_PER_TAB = 100;

const DEFAULT_SETTINGS = {
  enabled: true,
  sweep: true,
  veto: true,
  recipes: true,
  banner: false, // a note in the page when something is stopped
  policy: "block", // what an unknown cross-site destination gets
};

// tabId -> { site, blocked, seen, rows: Map(base -> row), recipe }
const perTab = new Map();
let sessionBlocked = 0;

async function readState() {
  const stored = await api.storage.local.get([
    "settings", "everywhere", "perSite", "ruleIds", "nextRuleId", "lifetime",
  ]);
  return {
    settings: { ...DEFAULT_SETTINGS, ...(stored.settings ?? {}) },
    everywhere: stored.everywhere ?? {},   // base -> "allow" | "block"
    perSite: stored.perSite ?? {},         // siteBase -> { base -> verdict }
    ruleIds: stored.ruleIds ?? {},         // base -> dynamic rule id
    nextRuleId: stored.nextRuleId ?? FIRST_DYNAMIC_RULE_ID,
    lifetime: stored.lifetime ?? 0,
  };
}

function blockRule(id, base) {
  return {
    id,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: `||${base}`,
      resourceTypes: [
        "main_frame", "sub_frame", "script", "xmlhttprequest",
        "websocket", "media", "image", "other",
      ],
    },
  };
}

// The network layer can only express "block this everywhere", so that is the
// only verdict it carries. A block for one site is held in JavaScript.
async function syncRule(base, verdict) {
  const state = await readState();
  const existing = state.ruleIds[base];

  if (verdict === "block" && existing === undefined) {
    const id = state.nextRuleId;
    await api.declarativeNetRequest.updateDynamicRules({ addRules: [blockRule(id, base)] });
    await api.storage.local.set({
      ruleIds: { ...state.ruleIds, [base]: id },
      nextRuleId: id + 1,
    });
    return;
  }

  if (verdict !== "block" && existing !== undefined) {
    await api.declarativeNetRequest.updateDynamicRules({ removeRuleIds: [existing] });
    const ruleIds = { ...state.ruleIds };
    delete ruleIds[base];
    await api.storage.local.set({ ruleIds });
  }
}

function tabEntry(tabId) {
  let entry = perTab.get(tabId);
  if (!entry) {
    entry = { site: "", blocked: 0, seen: 0, rows: new Map(), recipe: null };
    perTab.set(tabId, entry);
  }
  return entry;
}

// The badge counts the whole session, so it is set without a tab id. The
// per-page number lives in the popup, where there is room to label it.
function paintBadge() {
  try {
    api.action.setBadgeText({ text: sessionBlocked ? String(sessionBlocked) : "" });
    api.action.setBadgeBackgroundColor?.({ color: "#a3231c" });
  } catch (e) {
    // a window with no toolbar, nothing to paint
  }
}

async function note(tabId, msg) {
  if (tabId === undefined) return;
  const entry = tabEntry(tabId);
  const base = msg.base || msg.host || "";
  if (!base) return;

  entry.seen += 1;
  if (msg.blocked) {
    entry.blocked += 1;
    sessionBlocked += 1;
  }

  const row = entry.rows.get(base) ?? { base, kinds: [], count: 0, blocked: 0, url: "" };
  row.count += 1;
  if (msg.blocked) row.blocked += 1;
  if (msg.kind && !row.kinds.includes(msg.kind)) row.kinds.push(msg.kind);
  if (msg.url && !row.url) row.url = msg.url;
  entry.rows.set(base, row);

  while (entry.rows.size > MAX_ROWS_PER_TAB) {
    entry.rows.delete(entry.rows.keys().next().value);
  }

  paintBadge();

  const state = await readState();
  await api.storage.local.set({ lifetime: state.lifetime + (msg.blocked ? 1 : 0) });
  pushSnapshot();

  // A destination the guard had to stop, and no rule yet: block it everywhere
  // so the retry dies at the request.
  if (msg.blocked && msg.learn && !state.everywhere[base] && !state.perSite[msg.site]?.[base]) {
    await api.storage.local.set({ everywhere: { ...state.everywhere, [base]: "block" } });
    await syncRule(base, "block");
  }
}

api.runtime.onMessage.addListener((msg, sender) => {
  const tabId = sender?.tab?.id;

  if (msg?.type === "undirect:hello") {
    perTab.delete(tabId);
    const entry = tabEntry(tabId);
    entry.site = msg.site ?? "";
    paintBadge();
    return undefined;
  }

  if (msg?.type === "undirect:seen") {
    note(tabId, msg);
    return undefined;
  }

  if (msg?.type === "undirect:recipe") {
    tabEntry(tabId).recipe = msg.label ?? msg.id;
    return undefined;
  }

  if (msg?.type === "undirect:popup") {
    const entry = perTab.get(msg.tabId) ?? tabEntry(msg.tabId);
    return readState().then((state) => ({
      settings: state.settings,
      counts: {
        page: entry.blocked,
        seen: entry.seen,
        session: sessionBlocked,
        lifetime: state.lifetime,
      },
      site: entry.site,
      recipe: entry.recipe,
      rows: [...entry.rows.values()].map((row) => ({
        ...row,
        here: state.perSite[entry.site]?.[row.base] ?? null,
        everywhere: state.everywhere[row.base] ?? null,
      })),
      everywhere: state.everywhere,
      perSite: state.perSite,
    }));
  }

  if (msg?.type === "undirect:rule") {
    return applyRule(msg).then(() => ({ ok: true }));
  }

  if (msg?.type === "undirect:set") {
    return applySettings(msg.settings).then((settings) => ({ settings }));
  }

  return undefined;
});

// ------------------------------------------------------------------ writes

// { base, verdict: "allow" | "block" | null, scope: "here" | "everywhere", site }
async function applyRule(change) {
  const state = await readState();

  if (change.scope === "everywhere") {
    const everywhere = { ...state.everywhere };
    if (change.verdict) everywhere[change.base] = change.verdict;
    else delete everywhere[change.base];
    await api.storage.local.set({ everywhere });
    await syncRule(change.base, change.verdict);
  } else {
    const forSite = { ...(state.perSite[change.site] ?? {}) };
    if (change.verdict) forSite[change.base] = change.verdict;
    else delete forSite[change.base];
    const perSite = { ...state.perSite, [change.site]: forSite };
    if (!Object.keys(forSite).length) delete perSite[change.site];
    await api.storage.local.set({ perSite });
    // A rule for one site cannot live in the network layer, so a block set
    // everywhere has to step aside and let the page decide in JavaScript.
    if (change.verdict === "allow" && state.everywhere[change.base] === "block") {
      await syncRule(change.base, null);
    }
  }

  pushSnapshot(true);
}

async function applySettings(patch) {
  const state = await readState();
  const settings = { ...state.settings, ...patch };
  await api.storage.local.set({ settings });
  pushSnapshot(true);
  return settings;
}

// ------------------------------------------------------------------ the app

// The app cannot read extension storage, so the current picture is sent to the
// native handler, which writes it into the shared group container.
let pushedAt = 0;
let pushTimer = null;

async function pushSnapshot(now = false) {
  if (!now) {
    if (pushTimer) return;
    const wait = Math.max(0, 2000 - (Date.now() - pushedAt));
    pushTimer = setTimeout(() => {
      pushTimer = null;
      pushSnapshot(true);
    }, wait);
    return;
  }

  pushedAt = Date.now();
  const state = await readState();
  const snapshot = {
    policy: state.settings.policy ?? "block",
    enabled: state.settings.enabled !== false,
    banner: state.settings.banner === true,
    everywhere: state.everywhere,
    perSite: state.perSite,
    counts: { session: sessionBlocked, lifetime: state.lifetime },
    writtenAt: Date.now(),
  };
  try {
    await api.runtime.sendNativeMessage("com.matsuokengo.undirect", { snapshot });
  } catch (e) {
    // no container app listening, which is fine
  }
}

// The app sends changes back the other way. Safari only offers this on macOS,
// so on iOS the app shows the list and cannot change it.
function listenToApp() {
  let port;
  try {
    port = api.runtime.connectNative("com.matsuokengo.undirect");
  } catch (e) {
    return;
  }
  port.onMessage?.addListener?.((raw) => {
    // Safari's shape for this is not documented, so take the payload from
    // either the message itself or a userInfo wrapper around it.
    const msg = raw?.action ? raw : raw?.userInfo ?? raw;
    if (msg?.action === "rule") applyRule(msg);
    else if (msg?.action === "settings") applySettings(msg.settings ?? {});
    else if (msg?.action === "sync") pushSnapshot(true);
  });
  port.onDisconnect?.addListener?.(() => setTimeout(listenToApp, 5000));
}

listenToApp();
pushSnapshot(true);

api.tabs?.onRemoved?.addListener((tabId) => perTab.delete(tabId));
