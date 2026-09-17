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
  // sign-in, a share sheet. A pop asks for a tab and nothing else, because a
  // small window in front of the reader is no use to it. The background page
  // takes this as the page vouching for the window; nothing else does.
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
  // string almost every time - an ad has no reason to. This is the same
  // reading background.js's lib/navigation.js does for a same-tab redirect,
  // kept here too since a window this call is deciding whether to even open
  // never reaches the background in time for that check to matter.
  function carriesAWayBack(url) {
    let params;
    try {
      params = new URL(url, location.href).searchParams;
    } catch (e) {
      return false;
    }
    for (const raw of params.values()) {
      let decoded = null;
      try {
        decoded = decodeURIComponent(raw);
      } catch (e) {}
      for (const candidate of [raw, decoded]) {
        if (!candidate || !/^https?:\/\//i.test(candidate)) continue;
        try {
          if (withinSite(new URL(candidate).hostname)) return true;
        } catch (e) {}
      }
    }
    return false;
  }

  // A press invites nothing on its own: these networks pick a real click and
  // ride it. What decides is the destination, what the user said about it, and
  // whose code is asking - caller, size, or a way back all count as asking.
  function ruling(url, features) {
    const host = hostOf(url);
    const deliberate = sized(features);
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
    if (callerBelongsToPage()) {
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

  tell("ready", "", "", false);
})();
