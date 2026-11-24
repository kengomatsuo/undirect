// Runs in the page's own world, where the pop code lives. Everything it does is
// a veto or a note about where the page tried to go; it reads no page data.
(() => {
  "use strict";

  const Site = globalThis.UndirectSite;
  const selfUrl = document.currentScript?.src ?? "";

  let table = { policy: "block", everywhere: {}, here: {} };
  try {
    table = JSON.parse(document.currentScript?.dataset?.table ?? "") || table;
  } catch (e) {
    // the defaults above are the safe reading
  }

  const nativeOpen = window.open;
  const nativeSubmit = HTMLFormElement.prototype.submit;
  const nativeClick = HTMLElement.prototype.click;
  const nativeDispatch = EventTarget.prototype.dispatchEvent;

  const hostOf = (url) => {
    try {
      return new URL(url, location.href).hostname;
    } catch (e) {
      return "";
    }
  };

  // cdn.site.com and www.site.com are the same site. jsdelivr.net is not.
  const withinSite = (host) => !!host && Site.sameSite(host, location.hostname);

  const blankTarget = (el) => {
    const t = el?.getAttribute?.("target") ?? "";
    return t === "_blank" || t === "blank";
  };

  // A window asked for at a size is one the page means the user to work in: a
  // sign-in, a share sheet. The background page takes this as the page
  // vouching for the window; nothing else does. A size alone is not enough:
  // reelfren.net's pop asks for 800x600 (2026-11-07). A sign-in names its way
  // back (Google's popup flow defaults redirect_uri to the page's origin) and
  // a share sheet names the page, so ruling() asks for both.
  const sized = (features) => {
    const f = String(features ?? "");
    return (
      /\b(width|height|innerwidth|innerheight)\s*=\s*[1-9]/i.test(f) ||
      /\bpopup\s*=\s*(1|yes|true)\b/i.test(f)
    );
  };

  function tell(kind, host, url, blocked, deliberate, because) {
    const msg = {
      __undirect: 1,
      kind,
      host: host || "",
      url: url || "",
      blocked,
      sized: !!deliberate,
      because: because || "",
    };
    try {
      postMessage(msg, location.origin);
    } catch (e) {
      try {
        postMessage(msg, "*");
      } catch (e2) {
        // no way to say it; the veto still stands
      }
    }
  }

  // The nearest caller, not any frame in the stack: page code calling a
  // third-party helper would otherwise vouch for whatever that helper does.
  function callerBelongsToPage() {
    let stack = "";
    try {
      stack = new Error().stack ?? "";
    } catch (e) {}
    if (stack === "") return false;
    for (const line of stack.split("\n")) {
      const frame = line.trim();
      if (!frame || !frame.includes("://")) continue; // header and native frames
      if (selfUrl && frame.includes(selfUrl)) continue; // this file
      if (!selfUrl && frame.includes("bridge.js")) continue;
      const caller = /[a-z][a-z0-9+.-]*:\/\/([^/:)\s]+)/i.exec(frame);
      return caller ? withinSite(caller[1]) : false;
    }
    return false;
  }

  // A sign-in or a checkout carries a way back to this site in its own query
  // string almost every time - an ad has no reason to. lib/site.js holds the
  // reading; the background asks it about a same-tab redirect, and this asks
  // it about a window that never reaches the background in time.
  const carriesAWayBack = (url) => {
    try {
      return Site.namesSite(new URL(url, location.href).href, location.hostname);
    } catch (e) {
      return false;
    }
  };

  // The press the user last made in this document, and where it pointed.
  // Safari's background judges a new tab on the same two facts and closes it
  // when the press was aimed elsewhere (navigation.js judge()); deciding it
  // here instead stops the window before Safari opens a tab and switches to
  // it, so the page draws the stop at the press rather than after the trip
  // (lunarx.to, 2026-11-24). Same window as TAP_MS there.
  const TAP_MS = 1500;
  const press = { at: -Infinity, expected: new Set() };
  function pressed(target) {
    const now = performance.now();
    if (now - press.at > TAP_MS) press.expected = new Set();
    press.at = now;
    const link = target?.closest?.("a[href], area[href]");
    const form = target?.closest?.("form[action]");
    const host = hostOf(link?.href || form?.action || "");
    if (host) press.expected.add(Site.baseDomain(host));
  }
  addEventListener("pointerdown", (e) => {
    if (!e.isTrusted) return;
    pressed(e.target);
  }, true);
  addEventListener("keydown", (e) => {
    if (!e.isTrusted) return;
    if (e.key === "Enter" || e.key === " ") pressed(e.target);
  }, true);
  const takesThePress = (host) =>
    performance.now() - press.at <= TAP_MS && !press.expected.has(Site.baseDomain(host));

  // A press invites nothing on its own: these networks pick a real click and
  // ride it. What decides is the destination, what the user said about it, and
  // whose code is asking - caller, size, or a way back all count as asking.
  function ruling(url, features) {
    const host = hostOf(url);
    const deliberate = sized(features) && carriesAWayBack(url);
    if (!host || withinSite(host)) return { host, verdict: "allow", quiet: true, sized: deliberate };

    const base = Site.baseDomain(host);
    const explicit = table.here?.[base] ?? table.everywhere?.[base];
    if (explicit) {
      return { host, verdict: explicit, sized: deliberate, because: "a rule says so" };
    }

    if (deliberate) return { host, verdict: "allow", sized: deliberate, because: "asked for at a size" };
    if (carriesAWayBack(url)) {
      return { host, verdict: "allow", sized: deliberate, because: "carries a way back here" };
    }
    // The page's own code may open a window, but not on a press the user
    // aimed somewhere else: on lunarx.to the pop network is served from the
    // site itself, so the caller vouches for nothing there.
    if (callerBelongsToPage() && !takesThePress(host)) {
      return { host, verdict: "allow", sized: deliberate, because: "the page's own code" };
    }
    return {
      host,
      sized: deliberate,
      verdict: table.policy === "allow" ? "allow" : "block",
      because: table.policy === "allow" ? "allowed by default" : "took the press",
    };
  }

  function refuses(kind, url, features) {
    const { host, verdict, quiet, sized: deliberate, because } = ruling(url, features);
    if (quiet) return false;
    tell(kind, host, String(url ?? ""), verdict === "block", deliberate, because);
    return verdict === "block";
  }

  window.open = function (url, ...rest) {
    if (refuses("window-open", url, rest[1])) return null;
    return nativeOpen.call(window, url, ...rest);
  };

  HTMLFormElement.prototype.submit = function () {
    if (blankTarget(this) && refuses("form-submit", this.action)) return undefined;
    return nativeSubmit.call(this);
  };

  HTMLElement.prototype.click = function () {
    if (
      this.tagName === "A" &&
      blankTarget(this) &&
      !this.hasAttribute("download") &&
      refuses("synthetic-click", this.href)
    ) {
      return undefined;
    }
    return nativeClick.call(this);
  };

  EventTarget.prototype.dispatchEvent = function (event) {
    const el = this;
    if (
      event?.type === "click" &&
      el?.tagName === "A" &&
      blankTarget(el) &&
      !el.hasAttribute?.("download") &&
      refuses("synthetic-click", el.href)
    ) {
      return true;
    }
    return nativeDispatch.call(this, event);
  };

  // The Back-button trap: a page stacks copies of the address already showing,
  // so Back stays put, and re-stacks one each time Back pops it. WebKit already
  // skips entries pushed with no gesture (bug 241885); these ride a real tap
  // or answer the Back press itself. One copy is kept, since a sheet or a menu
  // that Back should close pushes exactly that; past one, or in reply to Back,
  // the push only replaces the entry, which the page cannot tell apart.
  const nativePush = History.prototype.pushState;
  const nativeReplace = History.prototype.replaceState;
  const BACK_MS = 700;
  let lastPop = -Infinity;
  let copies = 0;
  addEventListener("popstate", () => {
    lastPop = performance.now();
    copies = 0;
  }, true);

  History.prototype.pushState = function (state, unused, url) {
    let target = null;
    try {
      target = new URL(url ?? location.href, location.href).href;
    } catch (e) {
      // the native call throws the page's own error
    }
    if (target !== null && target === location.href) {
      const answeringBack = performance.now() - lastPop < BACK_MS;
      if (copies >= 1 || answeringBack) {
        tell("back-hijack", location.hostname, target, true, false, "the same page again");
        return nativeReplace.apply(this, arguments);
      }
      copies += 1;
    } else if (target !== null) {
      copies = 0;
    }
    return nativePush.apply(this, arguments);
  };

  tell("ready", "", "", false);
})();
