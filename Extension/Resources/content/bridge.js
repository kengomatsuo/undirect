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

  function tell(kind, host, url, blocked) {
    const msg = { __undirect: 1, kind, host: host || "", url: url || "", blocked };
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

  // A press invites nothing on its own: these networks pick a real click and
  // ride it. What decides is the destination, what the user said about it, and
  // whose code is asking.
  function ruling(url) {
    const host = hostOf(url);
    if (!host || withinSite(host)) return { host, verdict: "allow", quiet: true };

    const base = Site.baseDomain(host);
    const explicit = table.here?.[base] ?? table.everywhere?.[base];
    if (explicit) return { host, verdict: explicit };
    if (callerBelongsToPage()) return { host, verdict: "allow" };
    return { host, verdict: table.policy === "allow" ? "allow" : "block" };
  }

  function refuses(kind, url) {
    const { host, verdict, quiet } = ruling(url);
    if (quiet) return false;
    tell(kind, host, String(url ?? ""), verdict === "block");
    return verdict === "block";
  }

  window.open = function (url, ...rest) {
    if (refuses("window-open", url)) return null;
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

  tell("ready", "", "", false);
})();
