// Keeps the record of where pages tried to send the user, decides what the
// rules say, and turns "block everywhere" into a network rule so the request
// never leaves the machine.
//
// It is also the only half that can see a navigation, which is what catches the
// trip off-site done by assigning to `location`. See lib/navigation.js.
//
// The two libraries come from the manifest's background scripts rather than an
// `import`, so this half does not rest on how Safari resolves a module
// specifier in a background page.
const api = globalThis.browser ?? globalThis.chrome;
const Site = globalThis.UndirectSite;
const Nav = globalThis.UndirectNavigation;

const FIRST_DYNAMIC_RULE_ID = 1000;
const MAX_ROWS_PER_TAB = 100;
const POP_TAB_MS = 15000;  // how long a new tab is still its opener's doing
const REPORT_MS = 250;     // let the guard's report land before closing a tab
const UNDO_LIMIT = 3;      // undos per tab before recording alone
const UNDO_WINDOW_MS = 10000;

const DEFAULT_SETTINGS = {
  enabled: true,
  sweep: true,
  veto: true,
  recipes: true,
  banner: false, // a note in the page when something is stopped
  policy: "block", // what an unknown cross-site destination gets
  mode: "watched", // "watched": only sites turned on; "everywhere": every site
};

// tabId -> { site, url, blocked, seen, rows: Map(base -> row), recipe,
//            expected: Set(base), undos: [when] }
const perTab = new Map();
let sessionBlocked = 0;

// New tab id -> the tab that opened it, and when. A tab the user opened has no
// opener and never lands here.
const popTabs = new Map();

// The press, the navigation announced and the navigation nobody could judge
// yet, all keyed by tab. These are the span of one press and are kept apart
// from the record above so they can be written without waiting for a restore.
const presses = new Map();
const pendings = new Map();
const unjudged = new Map();

// Safari may unload this page (persistent: false), so the
// session badge and page rows are kept in storage.session too.
let saveTimer = null;
function saveSession() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    const tabs = [...perTab].map(([id, e]) => [
      id,
      { ...e, rows: [...e.rows], expected: [...e.expected], sizedExpected: [...e.sizedExpected] },
    ]);
    Promise.resolve(api.storage.session?.set({ sessionBlocked, tabs })).catch(() => {});
  }, 250);
}

// Counts noted before this resolves are added, never replaced.
const restored = (async () => {
  try {
    const got = await api.storage.session?.get(["sessionBlocked", "tabs"]);
    if (!got) return;
    sessionBlocked += got.sessionBlocked ?? 0;
    for (const [id, e] of got.tabs ?? []) {
      if (!perTab.has(id)) {
        perTab.set(id, {
          ...e,
          rows: new Map(e.rows),
          expected: new Set(e.expected ?? []),
          sizedExpected: new Set(e.sizedExpected ?? []),
          undos: e.undos ?? [],
        });
      }
    }
    for (const id of perTab.keys()) paintBadge(id);
  } catch (e) {
    // no session storage: start empty
  }
})();

// The last answer readState gave. A navigation has to be judged in the moment
// it is announced, and a storage read is a promise, so the judgement reads this
// instead and the next read refreshes it.
let cached = null;

async function readState() {
  const stored = await api.storage.local.get([
    "settings", "everywhere", "perSite", "watched", "learned", "ruleIds", "nextRuleId", "lifetime",
  ]);
  cached = {
    settings: { ...DEFAULT_SETTINGS, ...(stored.settings ?? {}) },
    everywhere: stored.everywhere ?? {},   // base -> "allow" | "block"
    perSite: stored.perSite ?? {},         // siteBase -> { base -> verdict }
    watched: stored.watched ?? {},         // siteBase -> true, absence is off
    learned: stored.learned ?? {},         // base -> true, set by note()'s learn path
    ruleIds: stored.ruleIds ?? {},         // base -> dynamic rule id
    nextRuleId: stored.nextRuleId ?? FIRST_DYNAMIC_RULE_ID,
    lifetime: stored.lifetime ?? 0,
  };
  return cached;
}

// The rules as they apply on one site, in the shape lib/site.js expects.
function tableFor(state, site) {
  return {
    policy: state.settings.policy ?? "block",
    everywhere: state.everywhere,
    here: state.perSite[site] ?? {},
  };
}

// Whether the guard runs on a site at all. Off by default: automatic judging
// misread a Bing result and a teams.live.com popup, and each misreading wrote
// a permanent global block (note()'s learn path) for the whole destination.
// Gated here, before judge() is ever called - not inside tableFor(), since an
// emptied table reads as "allowed by default" and fills the popup with rows
// instead of going quiet.
function guarding(state, site) {
  if (!state || state.settings.enabled === false) return false;
  if (state.settings.mode === "everywhere") return true;
  return !!site && state.watched?.[site] === true;
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
    entry = {
      site: "",
      url: "",
      blocked: 0,
      seen: 0,
      rows: new Map(),
      recipe: null,
      expected: new Set(),       // ordinary presses: a link or button, not a row
      sizedExpected: new Set(),  // a window the page asked for at a size
      undos: [],
    };
    perTab.set(tabId, entry);
  }
  return entry;
}

// A new site in the tab: nothing it did before is this page's doing.
function startOver(entry, site) {
  entry.site = site;
  entry.expected = new Set();
  entry.sizedExpected = new Set();
  entry.blocked = 0;
  entry.seen = 0;
  entry.rows = new Map();
  entry.recipe = null;
  entry.matchedAt = Date.now();
}

// Per tab, not the session: a badge on a page that has done nothing read as
// that page having ten stopped attempts, because the number belonged to the
// browser, not the icon it sat on. Safari clears a tab's own badge text on
// its next navigation, which is the same freshness the rest of this project
// gives a tab's record.
//
// Off on a site: a dimmed icon, no count and no popup, so a press lands in
// onClicked and turns it on. On: the full icon, and a press opens the popup.
async function paintBadge(tabId) {
  if (tabId === undefined || !api.action) return;
  try {
    const state = cached ?? (await readState());
    let site = perTab.get(tabId)?.site || "";
    if (!site) site = Nav.destination((await api.tabs.get(tabId))?.url ?? "");
    const on = guarding(state, site);
    const count = on ? perTab.get(tabId)?.blocked ?? 0 : 0;
    await Promise.all([
      api.action.setBadgeText({ tabId, text: count ? String(count) : "" }),
      api.action.setBadgeBackgroundColor?.({ tabId, color: "#a3231c" }),
      api.action.setPopup({ tabId, popup: on ? "popup/popup.html" : "" }),
      api.action.setIcon({
        tabId,
        path: on ? "images/toolbar-icon.svg" : "images/toolbar-icon-off.svg",
      }),
      api.action.setTitle({ tabId, title: api.i18n.getMessage(on ? "action_title_on" : "action_title_off") }),
    ]);
  } catch (e) {
    // the tab closed, or a window with no toolbar
  }
}

async function paintAllTabs() {
  try {
    for (const tab of await api.tabs.query({})) paintBadge(tab.id);
  } catch (e) {
    // no tabs to paint
  }
}

// Only fires while the popup is unset, which is exactly when the site is off.
api.action?.onClicked?.addListener?.(async (tab) => {
  const site = perTab.get(tab?.id)?.site || Nav.destination(tab?.url ?? "");
  if (!site) return;
  const state = await readState();
  // Already on, and only the paint was missed: show the popup instead.
  if (guarding(state, site)) {
    await paintBadge(tab.id);
    return api.action.openPopup?.().catch(() => {});
  }
  if (state.settings.enabled === false) await applySettings({ enabled: true });
  await applyWatch({ site, on: true, tabId: tab.id });
});

async function note(tabId, msg) {
  if (tabId === undefined) return;
  const base = msg.base || msg.host || "";
  if (!base) return;

  await restored; // an entry made before the restore would shut it out
  const state = await readState();
  // A stop at the network layer happens whether or not the site is watched,
  // and it is the only diagnostic for a domain gone silently dead, so it is
  // exempt (msg.always). Everything else trusts nobody but a watched site.
  if (!msg.always && !guarding(state, msg.site || perTab.get(tabId)?.site || "")) return;

  const entry = tabEntry(tabId);

  // A window the page asked for at a size is a sign-in or a share sheet, which
  // is the page vouching for it. A bare tab is not: on lunarx.to the pop
  // network is the page's own code, so being the page buys nothing by itself.
  if (!msg.blocked && msg.sized) entry.sizedExpected.add(base);

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
  if (msg.local) row.local = true;
  // What actually happened, most recently: a row shown by the current rule
  // alone read "Blocked by default" for a sign-in that was, in that instance,
  // let straight through, since nothing had ever set a rule for it.
  row.lastVerdict = msg.blocked ? "block" : "allow";
  row.lastBecause = msg.because ?? null;
  entry.rows.set(base, row);
  saveSession();

  while (entry.rows.size > MAX_ROWS_PER_TAB) {
    entry.rows.delete(entry.rows.keys().next().value);
  }

  paintBadge(tabId);

  await api.storage.local.set({ lifetime: state.lifetime + (msg.blocked ? 1 : 0) });
  pushSnapshot();

  // A destination the guard had to stop, and no rule yet: block it everywhere
  // so the retry dies at the request. Recorded in `learned` too, separately
  // from a block the user set by hand, so a future cleanup can tell them apart.
  if (msg.blocked && msg.learn && !msg.local && !state.everywhere[base] && !state.perSite[msg.site]?.[base]) {
    await api.storage.local.set({
      everywhere: { ...state.everywhere, [base]: "block" },
      learned: { ...state.learned, [base]: true },
    });
    await syncRule(base, "block");
  }
}

api.runtime.onMessage.addListener((msg, sender) => {
  const tabId = sender?.tab?.id;

  if (msg?.type === "undirect:hello") {
    hello(tabId, msg.site ?? "");
    return undefined;
  }

  if (msg?.type === "undirect:seen") {
    note(tabId, msg);
    return undefined;
  }

  // The user pressed something. What matters is the moment and whether the
  // thing under their finger leads off this site.
  if (msg?.type === "undirect:tap") {
    tap(tabId, msg);
    return undefined;
  }

  if (msg?.type === "undirect:recipe") {
    tabEntry(tabId).recipe = msg.label ?? msg.id;
    saveSession();
    return undefined;
  }

  if (msg?.type === "undirect:popup") {
    // The entry has to be read after the restore, not before it. Reading it
    // first handed back a blank page record whenever Safari had unloaded this
    // page, and the blank entry it created then shut the real one out.
    return restored
      .then(() => noteNetworkBlocks(msg.tabId))
      .then(readState)
      .then((state) => {
      const entry = perTab.get(msg.tabId) ?? tabEntry(msg.tabId);
      // entry.site resists relabeling by a thief (see hello()), so it wins.
      // The URL is only a fallback for a popup opened before hello() has run,
      // e.g. right after Safari woke the background page.
      const site = entry.site || Nav.destination(msg.url ?? "");
      return {
        settings: state.settings,
        // What this tab has seen, and nothing wider: a session or lifetime
        // count answers a different question than the one the popup is open
        // to ask, which is "what has THIS page done."
        counts: { page: entry.blocked, seen: entry.seen },
        site,
        guarding: guarding(state, site),
        recipe: entry.recipe,
        rows: [...entry.rows.values()].map((row) => ({
          ...row,
          here: state.perSite[entry.site]?.[row.base] ?? null,
          everywhere: state.everywhere[row.base] ?? null,
        })),
        everywhere: state.everywhere,
        perSite: state.perSite,
        watched: state.watched,
      };
    });
  }

  if (msg?.type === "undirect:rule") {
    return applyRule(msg).then(() => ({ ok: true }));
  }

  if (msg?.type === "undirect:set") {
    return applySettings(msg.settings).then((settings) => ({ settings }));
  }

  if (msg?.type === "undirect:watch") {
    return applyWatch(msg).then((state) => ({ watched: state.watched }));
  }

  // A subframe cannot read its own top-level site (cross-origin), so it asks
  // here instead. `sender.tab.url` is the tab's top-level address in MV3
  // regardless of which frame sent the message.
  if (msg?.type === "undirect:active") {
    return readState().then((state) => ({
      active: guarding(state, Nav.destination(sender?.tab?.url ?? "")),
    }));
  }

  return undefined;
});

// --------------------------------------------------- what the rules stopped

// A rule that blocks at the request never reaches the page, so the guard
// cannot witness it and the popup had nothing to show: a silent stop read
// exactly like nothing having happened. Asking which rules matched is the only
// way to tell the difference. Every rule is a learned one, named in `ruleIds`.
async function noteNetworkBlocks(tabId) {
  if (tabId === undefined || !api.declarativeNetRequest?.getMatchedRules) return;
  await restored;

  let matched;
  try {
    const got = await api.declarativeNetRequest.getMatchedRules({ tabId });
    matched = got?.rulesMatchedInfo ?? got ?? [];
  } catch (e) {
    return; // no feedback permission, or Safari would rather not say
  }
  if (!matched.length) return;

  const entry = tabEntry(tabId);
  const state = await readState();
  const dynamic = new Map(Object.entries(state.ruleIds).map(([base, id]) => [id, base]));

  const since = entry.matchedAt ?? 0;
  let newest = since;
  for (const info of matched) {
    const when = info.timeStamp ?? 0;
    if (when <= since) continue;
    newest = Math.max(newest, when);
    // Safari reports the request and leaves out the rule, so the host
    // is read from the URL and kept only if one of our rules names it.
    let base = dynamic.get(info.rule?.ruleId);
    if (!base && info.request?.url) {
      const host = Nav.destination(info.request.url);
      if (host && state.ruleIds[host] !== undefined) base = host;
    }
    if (!base) continue;
    // Already blocked, so there is nothing to learn from it. Reported even on
    // an unwatched site (`always`): a silent network stop reads exactly like
    // nothing having happened, and this is the only diagnostic for it.
    await note(tabId, {
      kind: "network-rule",
      base,
      host: base,
      url: "",
      blocked: true,
      learn: false,
      always: true,
      because: "stopped at the request",
      site: entry.site,
    });
  }
  entry.matchedAt = newest;
  saveSession();
}

// ------------------------------------------------------------- the gesture

// A page announcing itself. The record belongs to the tab and outlives the
// page: wiping it on each load is what made the popup say nothing had happened
// on a tab that had just been taken somewhere. The page a pop lands on runs
// this too, and it was announcing itself over the record of its own theft.
async function hello(tabId, site) {
  if (tabId === undefined) return;
  await restored;
  const entry = tabEntry(tabId);

  // The destination of a theft does not get to relabel the tab. Without this
  // the pop's own page becomes "this site" for a moment, and a rule set in the
  // popup would land against the thief instead of the site being read.
  const thief =
    entry.stolen &&
    Date.now() - entry.stolen.at < POP_TAB_MS &&
    Site.sameSite(entry.stolen.base, site);
  if (!thief && entry.site && site && !Site.sameSite(site, entry.site)) startOver(entry, site);
  else if (!thief) entry.site = site;

  presses.delete(tabId);
  paintBadge(tabId);
  saveSession();
}

// The press is written down the instant it arrives, with nothing awaited
// first. Safari unloads this page, and on the way back up a press that waited
// for the restore was landing after the navigation it was meant to explain, so
// the theft was judged as though the user had never pressed anything.
function tap(tabId, msg) {
  if (tabId === undefined) return;
  const press = presses.get(tabId) ?? { at: 0, site: "", expected: new Set() };
  press.at = Date.now();
  press.site = msg.site || press.site;
  if (msg.expect) press.expected.add(Site.baseDomain(msg.expect));
  presses.set(tabId, press);
}

// ---------------------------------------------------------- the navigation

// Only the top frame: a frame going somewhere cannot take the window with it.
function mainFrame(details) {
  return details?.frameId === 0 && typeof details.tabId === "number" && details.tabId >= 0;
}

// What a navigation is judged against, from whatever is known right now. The
// press stands on its own so this answers even while the record is restoring.
function tabView(tabId) {
  const entry = perTab.get(tabId);
  const press = presses.get(tabId);
  return {
    site: entry?.site || press?.site || "",
    tapAt: press?.at ?? 0,
    expected: new Set([...(entry?.expected ?? []), ...(press?.expected ?? [])]),
    sizedExpected: new Set(entry?.sizedExpected ?? []),
  };
}

// Announced, not yet arrived. Judging here rather than at the commit is what
// makes a chain of server redirects inherit the ruling on the address the user
// actually asked for.
function announced(details) {
  if (!mainFrame(details)) return;
  const state = cached;

  // Woken by this very navigation, so the rules have not been read yet. Keep
  // the address and judge it at the commit: a beat late, rather than missed.
  if (!state) {
    unjudged.set(details.tabId, { url: details.url, at: Date.now() });
    return;
  }

  const tab = tabView(details.tabId);
  if (!guarding(state, tab.site)) return;
  const ruling = Nav.judge({
    now: Date.now(),
    tab,
    url: details.url,
    table: tableFor(state, tab.site),
  });
  pendings.set(details.tabId, {
    base: ruling.base,
    url: details.url,
    stolen: ruling.ruling === "steal",
    quiet: ruling.quiet,
    because: ruling.because,
  });
}

async function arrived(details) {
  if (!mainFrame(details)) return;

  let pending = pendings.get(details.tabId);
  pendings.delete(details.tabId);
  const late = unjudged.get(details.tabId);
  unjudged.delete(details.tabId);

  await restored;
  const entry = tabEntry(details.tabId);
  const base = Nav.destination(details.url);

  // The address from the announcement, not the one that arrived: a chain of
  // server redirects still answers for where the user asked to go.
  if (!pending && late) {
    const state = cached ?? (await readState());
    const tab = tabView(details.tabId);
    if (guarding(state, tab.site)) {
      const ruling = Nav.judge({
        now: late.at,
        tab,
        url: late.url,
        table: tableFor(state, tab.site),
      });
      pending = {
        base: ruling.base,
        url: late.url,
        stolen: ruling.ruling === "steal",
        quiet: ruling.quiet,
        because: ruling.because,
      };
    }
  }

  if (!pending?.stolen) {
    // A judged moment that was let through: a rule, a callback home, or the
    // default policy said yes. Worth a row even though nothing was undone.
    if (pending && !pending.quiet) {
      await note(details.tabId, {
        kind: "redirect",
        base: pending.base,
        host: pending.base,
        url: details.url,
        blocked: false,
        learn: false,
        because: pending.because,
        site: entry.site,
      });
    }

    // Somewhere the user asked to go. The new document starts with no press
    // behind it and nothing promised.
    // Its count starts over too, or the badge carries the last site's number.
    if (base && entry.site && !Site.sameSite(base, entry.site)) {
      startOver(entry, base);
      presses.delete(details.tabId);
    } else if (base && !entry.site) {
      entry.site = base;
    }
    if (base) entry.url = details.url;
    paintBadge(details.tabId);
    saveSession();
    return;
  }

  const target = base || pending.base;
  // Remembered so the page it was taking us to cannot relabel the tab when its
  // own content script announces itself. See hello().
  entry.stolen = { base: target, at: Date.now() };
  await note(details.tabId, {
    kind: "redirect",
    base: target,
    host: target,
    url: details.url,
    blocked: true,
    learn: true,
    because: pending.because,
    site: entry.site,
  });

  // The block rule now kills the retry at the request, so an undo that keeps
  // failing is a page in a loop rather than a theft worth chasing.
  const now = Date.now();
  entry.undos = entry.undos.filter((when) => now - when < UNDO_WINDOW_MS);
  if (entry.undos.length >= UNDO_LIMIT) return;
  entry.undos.push(now);
  saveSession();

  try {
    if (api.tabs?.goBack) await api.tabs.goBack(details.tabId);
    else if (entry.url) await api.tabs.update(details.tabId, { url: entry.url });
  } catch (e) {
    // nothing to go back to, so the record is all there is
  }
}

// A window the page opened. Safari does not offer
// webNavigation.onCreatedNavigationTarget, so the opener comes from the tab
// itself and the address from whichever event names one first.
function opened(tab) {
  if (tab?.id === undefined) return;
  const now = Date.now();
  const opener = tab.openerTabId ?? presserFor(tab.id, now);
  if (opener === undefined) return;
  for (const [id, watch] of popTabs) {
    if (now - watch.at > POP_TAB_MS) popTabs.delete(id);
  }
  popTabs.set(tab.id, { opener, at: now });
  judgeOpened(tab.id, tab.url);
}

// iOS Safari creates a pop tab with no openerTabId (seen on lunarx.to,
// 2026-09-17). A tab born in the moment after a press elsewhere is taken
// to be that press's doing; judgeOpened still lets through where it pointed.
const OPENER_GUESS_MS = 1000;

function presserFor(tabId, now) {
  let best;
  for (const [id, press] of presses) {
    if (id === tabId || now - press.at > OPENER_GUESS_MS) continue;
    if (!best || press.at > presses.get(best).at) best = id;
  }
  return best;
}

async function judgeOpened(tabId, url) {
  const watch = popTabs.get(tabId);
  if (!watch) return;
  const base = Nav.destination(url);
  if (!base) return; // about:blank so far, which is how a replace tab starts
  popTabs.delete(tabId);

  // A beat, so the guard's report of the same window is already in the record
  // when this is judged and the row reads as one event rather than two.
  //
  // The report does not authorise the window. The page-world half lets a site's
  // own code open one, and on lunarx.to the pop network *is* the page's own
  // code: its gate is served from a subdomain of the site and its tag reports a
  // page frame as the caller. So a tab arriving on a press aimed elsewhere is
  // judged on the press, whoever asked for it.
  await new Promise((resolve) => setTimeout(resolve, REPORT_MS));
  await restored;

  const opener = tabView(watch.opener);
  const state = cached ?? (await readState());
  if (!guarding(state, opener.site)) return;
  const ruling = Nav.judgeOpened({
    now: watch.at, // the press that opened it, not the address arriving late
    opener: opener.site ? opener : null,
    url,
    table: tableFor(state, opener.site),
  });

  if (ruling.ruling !== "steal") {
    // A window that was let through and is worth explaining: a sized popup
    // vouched for, a rule, or the default policy - not just any tab the user
    // opened themselves, which stays quiet.
    if (!ruling.quiet) {
      await note(watch.opener, {
        kind: "pop-tab",
        base,
        host: base,
        url,
        blocked: false,
        learn: false,
        because: ruling.because,
        site: opener?.site ?? "",
      });
    }
    return;
  }

  await note(watch.opener, {
    kind: "pop-tab",
    base,
    host: base,
    url,
    blocked: true,
    learn: true,
    because: ruling.because,
    site: opener?.site ?? "",
  });
  try {
    await api.tabs.remove(tabId);
  } catch (e) {
    // already gone
  }
}

api.webNavigation?.onBeforeNavigate?.addListener?.(announced);
api.webNavigation?.onCommitted?.addListener?.(arrived);
api.tabs?.onCreated?.addListener?.(opened);
api.tabs?.onActivated?.addListener?.(({ tabId }) => paintBadge(tabId));
api.tabs?.onUpdated?.addListener?.((tabId, changeInfo) => {
  if (changeInfo?.url) judgeOpened(tabId, changeInfo.url);
  if (changeInfo?.url || changeInfo?.status) paintBadge(tabId);
  // Once the page has settled, whatever the network layer refused is countable.
  if (changeInfo?.status === "complete") noteNetworkBlocks(tabId);
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
  await readState(); // refresh `cached` before the next navigation is judged
  pushSnapshot(true);
  paintAllTabs();
  return settings;
}

// { site, on, tabId }. The site is normalised to a base domain, the same key
// perSite uses. Off deletes the key rather than storing false, so a watched
// list is exactly its own keys.
async function applyWatch(change) {
  const state = await readState();
  const site = Site.baseDomain(change.site || "");
  if (!site) return state;

  const watched = { ...state.watched };
  if (change.on) watched[site] = true;
  else delete watched[site];
  await api.storage.local.set({ watched });
  const fresh = await readState(); // refresh `cached` before the reload lands
  pushSnapshot(true);
  paintAllTabs();

  // The page-world hooks are installed once, at document_start, and cannot be
  // added or removed after the fact - so the only way a toggle takes effect,
  // in either direction, is a reload. See docs/rules-and-record.md.
  if (change.tabId !== undefined) {
    try {
      await api.tabs.reload(change.tabId);
    } catch (e) {
      // the tab is gone, or isn't a reloadable page
    }
  }
  return fresh;
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
    mode: state.settings.mode ?? "watched",
    banner: state.settings.banner === true,
    everywhere: state.everywhere,
    perSite: state.perSite,
    watched: state.watched,
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
    else if (msg?.action === "watch") applyWatch(msg); // no tabId from the app: lands next load
    else if (msg?.action === "sync") pushSnapshot(true);
  });
  port.onDisconnect?.addListener?.(() => setTimeout(listenToApp, 5000));
}

listenToApp();
pushSnapshot(true);
paintAllTabs();

api.tabs?.onRemoved?.addListener((tabId) => {
  perTab.delete(tabId);
  popTabs.delete(tabId);
  presses.delete(tabId);
  pendings.delete(tabId);
  unjudged.delete(tabId);
  saveSession();
});
