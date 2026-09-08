// Which hosts belong to the same site.
//
// This approximates the Public Suffix List rather than shipping it. The list is
// thousands of entries and would be read on every page load, so this covers the
// shapes that actually occur and leans toward calling two hosts different sites,
// which is the safe direction: a wrong "different" refuses a window, a wrong
// "same" lets one through.
globalThis.UndirectSite = (() => {
  // Labels a country registry hands out one level down, as in bbc.co.uk.
  const REGISTRY_LABELS = new Set([
    "ac", "biz", "co", "com", "edu", "go", "gob", "gov", "gr", "in", "id",
    "info", "mil", "ne", "net", "or", "org", "sch", "web",
  ]);

  // Hosts where every subdomain is a different owner, so the subdomain is
  // part of the site rather than a sibling of it.
  const SHARED_HOSTING = [
    "s3.amazonaws.com", "cdn.ampproject.org", "azurewebsites.net",
    "appspot.com", "blogspot.com", "cloudfront.net", "firebaseapp.com",
    "github.io", "gitlab.io", "glitch.me", "herokuapp.com", "netlify.app",
    "pages.dev", "r2.dev", "surge.sh", "vercel.app", "web.app", "workers.dev",
  ];

  function baseDomain(host) {
    if (!host || host.includes(":") || /^[\d.]+$/.test(host)) return host;
    const labels = host.split(".").filter(Boolean);
    if (labels.length <= 2) return labels.join(".");

    for (const suffix of SHARED_HOSTING) {
      if (host === suffix) return host;
      if (!host.endsWith("." + suffix)) continue;
      const depth = suffix.split(".").length + 1;
      return labels.slice(-depth).join(".");
    }

    const tld = labels[labels.length - 1];
    const second = labels[labels.length - 2];
    const depth = tld.length <= 3 && REGISTRY_LABELS.has(second) ? 3 : 2;
    return labels.slice(-depth).join(".");
  }

  function sameSite(a, b) {
    if (!a || !b) return false;
    if (a === b) return true;
    return baseDomain(a) === baseDomain(b);
  }

  // What to do about a destination, given the rules that apply on this page.
  // A rule set for this one site beats a rule set everywhere, and both beat
  // the default.
  function decide(table, host) {
    const base = baseDomain(host);
    if (!table) return "block";
    if (table.here?.[base]) return table.here[base];
    if (table.everywhere?.[base]) return table.everywhere[base];
    return table.policy === "allow" ? "allow" : "block";
  }

  return { baseDomain, sameSite, decide };
})();
