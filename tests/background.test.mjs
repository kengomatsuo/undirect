// The background half, run against stub extension APIs.
//
// It exists for one reason: the navigation detector has to answer while Safari
// is still bringing this page back from being unloaded, and a browser harness
// cannot stage that moment. Run it with `bun tests/background.test.mjs`.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = join(dirname(new URL(import.meta.url).pathname), "..", "Extension", "Resources");
const read = (p) => readFileSync(join(root, p), "utf8");

const results = [];
const ok = (name, pass, detail) => {
  results.push({ name, pass, detail });
  console.log(`${pass ? "ok  " : "FAIL"} ${name}${pass || !detail ? "" : ` -- ${detail}`}`);
};

// A world the background page can run in: storage that answers when we say so,
// so a navigation can be announced before the rules have been read.
//
// `watched` seeds storage directly rather than going through the
// undirect:watch message, because a slowStorage world cannot finish a
// message-driven write before the navigation it needs to stage is announced.
// It defaults to watching site.com, which is what every check below judges
// against, so the guard being off by default costs no existing check a line.
function world({ slowStorage = false, matchedRules = null,
                 watched = { "site.com": true }, settings = {}, stored = {} } = {}) {
  const local = {
    settings: { enabled: true, policy: "block", mode: "watched", ...settings },
    watched,
    ...stored,
  };
  const session = {};
  let releaseStorage = null;
  const gate = slowStorage
    ? new Promise((resolve) => {
        releaseStorage = resolve;
      })
    : Promise.resolve();

  const calls = { goBack: [], removed: [], rules: [], badge: [], reloaded: [] };
  const listeners = { message: [], before: [], committed: [], created: [], updated: [], gone: [] };

  const api = {
    runtime: {
      onMessage: { addListener: (fn) => listeners.message.push(fn) },
      sendNativeMessage: () => Promise.resolve(),
      connectNative: () => ({
        onMessage: { addListener() {} },
        onDisconnect: { addListener() {} },
      }),
      getURL: (p) => p,
    },
    storage: {
      local: {
        get: async (keys) => {
          await gate;
          const out = {};
          for (const k of [].concat(keys)) if (k in local) out[k] = local[k];
          return out;
        },
        set: async (patch) => {
          await gate;
          Object.assign(local, patch);
        },
      },
      session: {
        get: async () => {
          await gate;
          return session;
        },
        set: async (patch) => {
          Object.assign(session, patch);
        },
      },
    },
    declarativeNetRequest: {
      updateDynamicRules: async (change) => calls.rules.push(change),
      ...(matchedRules
        ? { getMatchedRules: async () => ({ rulesMatchedInfo: matchedRules }) }
        : {}),
    },
    action: {
      setBadgeText: (t) => calls.badge.push(t.text),
      setBadgeBackgroundColor: () => {},
    },
    tabs: {
      goBack: async (id) => calls.goBack.push(id),
      remove: async (id) => calls.removed.push(id),
      update: async () => {},
      reload: async (id) => calls.reloaded.push(id),
      onRemoved: { addListener: (fn) => listeners.gone.push(fn) },
      onCreated: { addListener: (fn) => listeners.created.push(fn) },
      onUpdated: { addListener: (fn) => listeners.updated.push(fn) },
    },
    webNavigation: {
      onBeforeNavigate: { addListener: (fn) => listeners.before.push(fn) },
      onCommitted: { addListener: (fn) => listeners.committed.push(fn) },
    },
  };

  const scope = {
    chrome: api,
    browser: undefined,
    setTimeout,
    clearTimeout,
    Date,
    Promise,
    JSON,
    Set,
    Map,
    Object,
    Array,
    String,
    Number,
    Math,
    console,
  };
  const load = new Function(
    "globalThis",
    "chrome",
    `${read("lib/site.js")};${read("lib/navigation.js")};${read("background.js")}`
  );
  load(scope, api);

  const send = (msg, tabId) =>
    listeners.message.map((fn) => fn(msg, tabId === undefined ? {} : { tab: { id: tabId } }));
  const emit = (which, ...args) => listeners[which].forEach((fn) => fn(...args));
  const settle = () => new Promise((resolve) => setTimeout(resolve, 5));

  return { api, calls, local, send, emit, settle, releaseStorage };
}

const main = (tabId, url) => ({ frameId: 0, tabId, url });

// ---------------------------------------------------------------- the checks

{
  // The ordinary case: a press on the page, then the page sends the tab to
  // another site. That is the press being taken.
  const w = world();
  await w.settle();
  w.send({ type: "undirect:hello", site: "site.com" }, 7);
  await w.settle();
  w.send({ type: "undirect:tap", site: "site.com", expect: "" }, 7);
  w.emit("before", main(7, "https://pop.example/x"));
  w.emit("committed", main(7, "https://pop.example/x"));
  await w.settle();
  ok("a taken press is sent back", w.calls.goBack.includes(7), JSON.stringify(w.calls.goBack));
  ok("and the destination is blocked everywhere",
     w.local.everywhere?.["pop.example"] === "block", JSON.stringify(w.local.everywhere));
  ok("and a network rule carries it",
     w.calls.rules.some((c) => c.addRules?.some((r) => r.condition.urlFilter.includes("pop.example"))));
}

{
  // The same theft, but Safari had unloaded this page and the navigation is
  // what woke it: the rules are still being read when the navigation is
  // announced. This is the case that let a theft through.
  const w = world({ slowStorage: true });
  w.send({ type: "undirect:tap", site: "site.com", expect: "" }, 7);
  w.emit("before", main(7, "https://pop.example/x"));
  w.releaseStorage();
  await w.settle();
  w.emit("committed", main(7, "https://pop.example/x"));
  await w.settle();
  ok("a theft during the wake is still caught", w.calls.goBack.includes(7),
     JSON.stringify(w.calls.goBack));
}

{
  // A press aimed off-site is the user going somewhere, not a theft.
  const w = world();
  await w.settle();
  w.send({ type: "undirect:hello", site: "site.com" }, 7);
  await w.settle();
  w.send({ type: "undirect:tap", site: "site.com", expect: "elsewhere.example" }, 7);
  w.emit("before", main(7, "https://elsewhere.example/x"));
  w.emit("committed", main(7, "https://elsewhere.example/x"));
  await w.settle();
  ok("a press aimed off-site is left alone", w.calls.goBack.length === 0,
     JSON.stringify(w.calls.goBack));
}

{
  // No press at all: an address typed in the bar, a bookmark, going back.
  const w = world();
  await w.settle();
  w.send({ type: "undirect:hello", site: "site.com" }, 7);
  await w.settle();
  w.emit("before", main(7, "https://elsewhere.example/x"));
  w.emit("committed", main(7, "https://elsewhere.example/x"));
  await w.settle();
  ok("a navigation nobody pressed is left alone", w.calls.goBack.length === 0,
     JSON.stringify(w.calls.goBack));
}

{
  // A chain of server redirects answers for the address the user asked for,
  // not for wherever it ended up.
  const w = world();
  await w.settle();
  w.send({ type: "undirect:hello", site: "site.com" }, 7);
  await w.settle();
  w.send({ type: "undirect:tap", site: "site.com", expect: "site.com" }, 7);
  w.emit("before", main(7, "https://site.com/out?to=partner"));
  w.emit("committed", main(7, "https://partner.example/landing"));
  await w.settle();
  ok("a redirect from a link the user followed is left alone",
     w.calls.goBack.length === 0, JSON.stringify(w.calls.goBack));
}

{
  // A tab opened behind the press, which is the pop-under.
  const w = world();
  await w.settle();
  w.send({ type: "undirect:hello", site: "site.com" }, 7);
  await w.settle();
  w.send({ type: "undirect:tap", site: "site.com", expect: "" }, 7);
  w.emit("created", { id: 9, openerTabId: 7, url: "about:blank" });
  w.emit("updated", 9, { url: "https://pop.example/under" });
  await new Promise((resolve) => setTimeout(resolve, 400));
  ok("a tab opened behind the press is closed", w.calls.removed.includes(9),
     JSON.stringify(w.calls.removed));
}

{
  // A sign-in window: the page asked for it at a size, which is the page
  // vouching for a window the user is meant to work in.
  const w = world();
  await w.settle();
  w.send({ type: "undirect:hello", site: "site.com" }, 7);
  await w.settle();
  w.send({ type: "undirect:tap", site: "site.com", expect: "" }, 7);
  // The base domain, which is what the guard works out before it reports.
  w.send({ type: "undirect:seen", kind: "window-open", base: "google.com",
           host: "accounts.google.com", url: "https://accounts.google.com/o/oauth2",
           blocked: false, learn: false, sized: true, site: "site.com" }, 7);
  await w.settle();
  w.emit("created", { id: 9, openerTabId: 7, url: "https://accounts.google.com/o/oauth2" });
  w.emit("updated", 9, { url: "https://accounts.google.com/o/oauth2" });
  await new Promise((resolve) => setTimeout(resolve, 400));
  ok("a window asked for at a size is left alone", w.calls.removed.length === 0,
     JSON.stringify(w.calls.removed));
}

{
  // The same window, asked for as a bare tab. Being the page's own code buys
  // nothing: that is how the pop on lunarx.to arrives.
  const w = world();
  await w.settle();
  w.send({ type: "undirect:hello", site: "site.com" }, 7);
  await w.settle();
  w.send({ type: "undirect:tap", site: "site.com", expect: "" }, 7);
  w.send({ type: "undirect:seen", kind: "window-open", base: "pop.example",
           host: "pop.example", url: "https://pop.example/x",
           blocked: false, learn: false, sized: false, site: "site.com" }, 7);
  await w.settle();
  w.emit("created", { id: 9, openerTabId: 7, url: "https://pop.example/x" });
  w.emit("updated", 9, { url: "https://pop.example/x" });
  await new Promise((resolve) => setTimeout(resolve, 400));
  ok("a bare tab the page opened is still closed", w.calls.removed.includes(9),
     JSON.stringify(w.calls.removed));
}

{
  // iOS Safari gives a pop tab no openerTabId. The press a moment before
  // names the tab it came from.
  const w = world();
  await w.settle();
  w.send({ type: "undirect:hello", site: "site.com" }, 7);
  await w.settle();
  w.send({ type: "undirect:tap", site: "site.com", expect: "" }, 7);
  w.emit("created", { id: 9, url: "" });
  w.emit("updated", 9, { url: "https://pop.example/x" });
  await new Promise((resolve) => setTimeout(resolve, 400));
  ok("a pop tab with no opener is traced to the press and closed", w.calls.removed.includes(9),
     JSON.stringify(w.calls.removed));
}

{
  // The same, but the press named that destination: a link the user opened.
  const w = world();
  await w.settle();
  w.send({ type: "undirect:hello", site: "site.com" }, 7);
  await w.settle();
  w.send({ type: "undirect:tap", site: "site.com", expect: "elsewhere.example" }, 7);
  w.emit("created", { id: 9, url: "" });
  w.emit("updated", 9, { url: "https://elsewhere.example/page" });
  await new Promise((resolve) => setTimeout(resolve, 400));
  ok("a link opened in a new tab with no opener is left alone", w.calls.removed.length === 0,
     JSON.stringify(w.calls.removed));
}

{
  // A tab the user opened themselves has no opener.
  const w = world();
  await w.settle();
  w.emit("created", { id: 9, url: "https://elsewhere.example/" });
  w.emit("updated", 9, { url: "https://elsewhere.example/" });
  await new Promise((resolve) => setTimeout(resolve, 400));
  ok("a tab with no opener is left alone", w.calls.removed.length === 0,
     JSON.stringify(w.calls.removed));
}

{
  // The record survives Safari unloading this page: the popup asked for it
  // before the restore had finished and got a blank page back.
  const w = world({ slowStorage: true });
  w.api.storage.session.set({
    sessionBlocked: 3,
    tabs: [[7, { site: "site.com", url: "", blocked: 2, seen: 4,
                 rows: [["pop.example", { base: "pop.example", kinds: ["redirect"], count: 2, blocked: 2, url: "" }]],
                 recipe: null, expected: [], undos: [] }]],
  });
  const answer = w.send({ type: "undirect:popup", tabId: 7 }).find(Boolean);
  w.releaseStorage();
  const state = await answer;
  ok("the popup waits for the record instead of inventing a blank one",
     state.rows.length === 1 && state.counts.seen === 4,
     JSON.stringify({ rows: state.rows.length, seen: state.counts.seen }));
}

{
  // What the network layer refused, which the page never sees. A learned
  // rule's id is in `ruleIds`, so the row can name a host.
  const w = world({
    stored: { ruleIds: { "llvpn.com": 1000 } },
    matchedRules: [{ rule: { ruleId: 1000, rulesetId: "_dynamic" }, timeStamp: 1000 }],
  });
  await w.settle();
  w.send({ type: "undirect:hello", site: "site.com" }, 7);
  await w.settle();
  const answer = w.send({ type: "undirect:popup", tabId: 7 }).find(Boolean);
  const state = await answer;
  const row = state.rows.find((r) => r.kinds.includes("network-rule"));
  ok("a stop at the request is listed and named",
     !!row && row.base === "llvpn.com", JSON.stringify(state.rows));
  // Pre-existing gap, unrelated to watching: the popup response carries
  // {page, seen}, not {session, lifetime}. Fixed here since it was found
  // while widening this suite, not part of the opt-in change itself.
  ok("and it is counted", state.counts.page >= 1, String(state.counts.page));
}

{
  // Safari's shape, seen on iOS 26: the request, no rule.
  const w = world({
    stored: { ruleIds: { "llvpn.com": 1000 } },
    matchedRules: [{ request: { url: "https://llvpn.com/tag.min.js" }, tabId: 7, timeStamp: 1000 }],
  });
  await w.settle();
  w.send({ type: "undirect:hello", site: "site.com" }, 7);
  await w.settle();
  const state = await w.send({ type: "undirect:popup", tabId: 7 }).find(Boolean);
  ok("a Safari match with no rule id is named from its URL",
     state.rows.some((r) => r.base === "llvpn.com"), JSON.stringify(state.rows));
}

// ------------------------------------------------------- off by default

{
  // The Bing/Teams regression: an unwatched site is left alone, and - the
  // half that actually matters - nothing is learned from it. This is the
  // whole point of opt-in: a misjudged press on a site nobody turned the
  // guard on for must never reach the permanent, global `everywhere` block.
  const w = world({ watched: {} });
  await w.settle();
  w.send({ type: "undirect:hello", site: "site.com" }, 7);
  await w.settle();
  w.send({ type: "undirect:tap", site: "site.com", expect: "" }, 7);
  w.emit("before", main(7, "https://pop.example/x"));
  w.emit("committed", main(7, "https://pop.example/x"));
  await w.settle();
  ok("an unwatched site is left alone", w.calls.goBack.length === 0,
     JSON.stringify(w.calls.goBack));
  ok("and learns nothing", w.local.everywhere === undefined,
     JSON.stringify(w.local.everywhere));
}

{
  const w = world({ watched: {} });
  await w.settle();
  w.send({ type: "undirect:hello", site: "site.com" }, 7);
  await w.settle();
  w.send({ type: "undirect:tap", site: "site.com", expect: "" }, 7);
  w.emit("created", { id: 9, openerTabId: 7, url: "about:blank" });
  w.emit("updated", 9, { url: "https://pop.example/under" });
  await new Promise((resolve) => setTimeout(resolve, 400));
  ok("an unwatched pop tab survives", w.calls.removed.length === 0,
     JSON.stringify(w.calls.removed));
}

{
  // "Every site" restores today's always-on behavior without naming any site.
  const w = world({ watched: {}, settings: { mode: "everywhere" } });
  await w.settle();
  w.send({ type: "undirect:hello", site: "site.com" }, 7);
  await w.settle();
  w.send({ type: "undirect:tap", site: "site.com", expect: "" }, 7);
  w.emit("before", main(7, "https://pop.example/x"));
  w.emit("committed", main(7, "https://pop.example/x"));
  await w.settle();
  ok("everywhere mode still guards every site", w.calls.goBack.includes(7),
     JSON.stringify(w.calls.goBack));
}

{
  // The master switch beats the watch list, even for a site on it.
  const w = world({ watched: { "site.com": true }, settings: { enabled: false } });
  await w.settle();
  w.send({ type: "undirect:hello", site: "site.com" }, 7);
  await w.settle();
  w.send({ type: "undirect:tap", site: "site.com", expect: "" }, 7);
  w.emit("before", main(7, "https://pop.example/x"));
  w.emit("committed", main(7, "https://pop.example/x"));
  await w.settle();
  ok("the master switch beats a watched site", w.calls.goBack.length === 0,
     JSON.stringify(w.calls.goBack));
}

{
  // Turning watch on has to refresh `cached` itself - announced() judges
  // synchronously and cannot wait for pushSnapshot to happen to do it - and
  // the reload is what makes the page-world hooks actually take effect.
  const w = world({ watched: {} });
  await w.settle();
  await Promise.all(w.send({ type: "undirect:watch", site: "site.com", on: true, tabId: 7 }));
  await w.settle();
  w.send({ type: "undirect:hello", site: "site.com" }, 7);
  await w.settle();
  w.send({ type: "undirect:tap", site: "site.com", expect: "" }, 7);
  w.emit("before", main(7, "https://pop.example/x"));
  w.emit("committed", main(7, "https://pop.example/x"));
  await w.settle();
  ok("turning watch on arms the very next navigation", w.calls.goBack.includes(7),
     JSON.stringify(w.calls.goBack));
  ok("and reloads the tab", w.calls.reloaded.includes(7),
     JSON.stringify(w.calls.reloaded));
}

{
  // Off deletes the key rather than storing false, so a watched site is
  // exactly the keys of the map - the app's watchedSites list depends on it.
  const w = world({ watched: { "site.com": true } });
  await w.settle();
  await Promise.all(w.send({ type: "undirect:watch", site: "site.com", on: false, tabId: 7 }));
  await w.settle();
  ok("turning watch off deletes the key", !("site.com" in (w.local.watched ?? {})),
     JSON.stringify(w.local.watched));
}

{
  // A popup opened right after Safari woke the background page has no
  // entry.site yet - hello() hasn't run - so the site falls back to the URL.
  const w = world({ watched: {} });
  await w.settle();
  const answer = w.send({ type: "undirect:popup", tabId: 7, url: "https://www.site.com/x" }).find(Boolean);
  const state = await answer;
  ok("the popup resolves the site from the tab URL", state.site === "site.com", state.site);
  ok("and reports guarding false for it", state.guarding === false, String(state.guarding));
}

{
  // A stale content script - loaded before the site was switched off, or
  // just never entitled in the first place - cannot buy a row on its own say.
  const w = world({ watched: {} });
  await w.settle();
  w.send({ type: "undirect:seen", kind: "window-open", base: "pop.example",
           host: "pop.example", url: "https://pop.example/x",
           blocked: true, learn: true, site: "site.com" }, 7);
  await w.settle();
  const answer = w.send({ type: "undirect:popup", tabId: 7 }).find(Boolean);
  const state = await answer;
  ok("a report from an unwatched page is dropped", state.rows.length === 0,
     JSON.stringify(state.rows));
  ok("and nothing is learned from it", w.local.everywhere === undefined,
     JSON.stringify(w.local.everywhere));
}

{
  // The network-rule exemption: a silent stop is the one thing still worth
  // reporting on a site nobody turned the guard on for.
  const w = world({
    watched: {},
    stored: { ruleIds: { "llvpn.com": 1000 } },
    matchedRules: [{ rule: { ruleId: 1000, rulesetId: "_dynamic" }, timeStamp: 1000 }],
  });
  await w.settle();
  w.send({ type: "undirect:hello", site: "site.com" }, 7);
  await w.settle();
  const answer = w.send({ type: "undirect:popup", tabId: 7 }).find(Boolean);
  const state = await answer;
  const row = state.rows.find((r) => r.kinds.includes("network-rule"));
  ok("a network stop is reported even on an unwatched site",
     !!row && row.base === "llvpn.com", JSON.stringify(state.rows));
}

{
  // A trap with no other site behind it is listed under the page's own
  // site, and never learned: that would block the site itself.
  const w = world();
  await w.settle();
  w.send({ type: "undirect:hello", site: "site.com" }, 7);
  await w.settle();
  w.send({ type: "undirect:seen", kind: "overlay", base: "site.com", local: true,
           host: "", url: "", blocked: true, learn: true, site: "site.com" }, 7);
  await w.settle();
  const state = await w.send({ type: "undirect:popup", tabId: 7 }).find(Boolean);
  const row = state.rows.find((r) => r.base === "site.com");
  ok("a trap on the page itself gets a row", !!row && row.local === true, JSON.stringify(state.rows));
  ok("and counts as stopped", state.counts.page === 1, String(state.counts.page));
  ok("and blocks nothing", w.local.everywhere === undefined && w.local.ruleIds === undefined,
     JSON.stringify([w.local.everywhere, w.local.ruleIds]));
}

const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length} checks, ${failed.length} failed`);
process.exit(failed.length ? 1 : 0);
