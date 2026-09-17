// Whether a navigation is the one the user asked for.
//
// The page-world hooks cover the calls a script makes to open a window. They
// cannot cover `location.href = ...`, because `window.location` is unforgeable:
// no script can replace it. So the same trick done by assignment is invisible
// in the page and has to be judged from the background page instead, where the
// navigation itself is visible.
//
// What separates a theft from an ordinary trip off-site is the gesture. These
// networks wait for a real press and ride it, so a cross-site navigation that
// arrives in the moment after a press the user aimed somewhere else is the
// press being taken. A cross-site navigation with no press behind it at all is
// the user typing an address, opening a bookmark or going back, and is left
// alone.
//
// A sign-in or a checkout is also a press followed by a cross-site address the
// press did not name, and looks identical by that test alone. What tells them
// apart is carriesAWayBack(): the address such a flow goes to almost always
// names, in its own query string, a URL back on the site that sent it there.
// An ad redirect has nothing to gain by doing that. A popup asked for at a
// size is the same signal for a new window, read in bridge.js where the size
// is visible and handed here as `tab.sizedExpected`.
//
// Every verdict carries `quiet`: whether the moment is worth a row in the
// popup. Ordinary browsing - the same site, no press, a click landing exactly
// where it was aimed - says nothing interesting and stays quiet. A rule
// firing, a sign-in read as one, a popup vouched for by its size, and a press
// actually taken all changed what would otherwise have happened, so they are
// the four shapes this project set out to tell apart, and each gets a line.
globalThis.UndirectNavigation = (() => {
  const TAP_MS = 1500; // how long a press stays a plausible cause

  // A tab as the background page knows it: the site on screen, when the user
  // last pressed something in it, and the destinations that press could
  // honestly lead to.
  //
  //   { site, tapAt, expected: Set<base>, sizedExpected: Set<base> }
  //
  // `expected` is where the very thing pressed pointed - an ordinary link or
  // button, not itself a shape worth a row. `sizedExpected` is a window the
  // page asked for at a size, which is the popup half of the same signal
  // `carriesAWayBack` reads for a same-tab redirect.
  //
  // `table` is the usual rules table, so a destination the user allowed is
  // allowed here too, and "allow" as the default policy turns this off.
  function judge({ now, tab, url, table, newTab = false }) {
    const Site = globalThis.UndirectSite;
    const base = destination(url);
    if (!base) return verdict("allow", "not a web address", base, true);

    // Nothing is known about what the tab was showing, so there is nothing to
    // compare against. Guessing here would undo the first page of a session.
    if (!tab?.site) return verdict("allow", "the tab is unknown", base, true);

    if (Site.sameSite(base, tab.site)) return verdict("allow", "the same site", base, true);

    const explicit = table?.here?.[base] ?? table?.everywhere?.[base];
    if (explicit) {
      return verdict(explicit === "block" ? "steal" : "allow", "a rule says so", base, false);
    }

    if (!tab.tapAt || now - tab.tapAt > TAP_MS) {
      return verdict("allow", "no press to take", base, true);
    }

    if (tab.expected?.has?.(base)) {
      return verdict("allow", "where the press pointed", base, true);
    }

    if (tab.sizedExpected?.has?.(base)) {
      return verdict("allow", "asked for at a size", base, false);
    }

    // A sign-in or a checkout sends the user elsewhere and means to have them
    // back: the address it goes to carries a way back to this site, in a
    // parameter of its own query string. An ad redirect has no reason to carry
    // one, since it is not planning on returning the visit.
    // Only for the same tab. A pop tab's address names the page it came from
    // too (lunarx.to, 2026-09-17), and a real sign-in in a new window asks for
    // it at a size, which is handled above.
    if (!newTab && carriesAWayBack(url, tab.site)) {
      return verdict("allow", "carries a way back here", base, false);
    }

    return table?.policy === "allow"
      ? verdict("allow", "allowed by default", base, false)
      : verdict("steal", "took the press", base, false);
  }

  function carriesAWayBack(url, site) {
    const Site = globalThis.UndirectSite;
    let params;
    try {
      params = new URL(String(url ?? "")).searchParams;
    } catch (e) {
      return false;
    }
    for (const raw of params.values()) {
      let decoded = null;
      try {
        decoded = decodeURIComponent(raw);
      } catch (e) {
        // left as null; raw is still tried below
      }
      for (const candidate of [raw, decoded]) {
        if (!candidate || !/^https?:\/\//i.test(candidate)) continue;
        try {
          if (Site.sameSite(new URL(candidate).hostname, site)) return true;
        } catch (e) {
          // not a URL after all
        }
      }
    }
    return false;
  }

  // A window the page opened, judged against the tab that opened it. A tab the
  // user opened themselves has no opener and never reaches this.
  function judgeOpened({ now, opener, url, table }) {
    if (!opener) return verdict("allow", "nobody opened it", destination(url), true);
    return judge({ now, tab: opener, url, table, newTab: true });
  }

  function destination(url) {
    try {
      const { protocol, hostname } = new URL(String(url ?? ""));
      if (protocol !== "http:" && protocol !== "https:") return "";
      return globalThis.UndirectSite.baseDomain(hostname);
    } catch (e) {
      return "";
    }
  }

  const verdict = (ruling, because, base, quiet) => ({ ruling, because, base, quiet });

  return { judge, judgeOpened, destination, TAP_MS };
})();
