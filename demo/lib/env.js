// Where the stand-in ad network and the stand-in destinations live.
// On localhost each one gets its own *.localhost name, so the browser sees
// separate sites without any real network. Elsewhere the ad scripts come from
// a CDN and the destinations are made-up .example addresses that never load.
(() => {
  const host = location.hostname;
  const local = host === "127.0.0.1" || host === "localhost" || host.endsWith(".localhost");
  const port = location.port ? ":" + location.port : "";
  const origin = (name) => `${location.protocol}//${name}.localhost${port}`;
  // ?landed=name picks another stand-in host, so a take can start from a clean slate.
  const landedName = new URLSearchParams(location.search).get("landed") || "prize-hub";
  window.DEMO = {
    local,
    site: (name) => (local ? origin(name) : `https://${name}.example`),
    // ?landed=here sends the redirect to this site's own stand-in page, so a recording can show the page it ends on.
    landed: () => (local ? origin(landedName) + "/demo/landed/" : landedName === "here" ? `${location.origin}/demo/landed/` : `https://${landedName}.example/win`),
    loadAd(name, dest) {
      const s = document.createElement("script");
      s.src = local
        ? `${origin("adnet")}/demo/ads/${name}.js`
        : `https://cdn.jsdelivr.net/gh/kengomatsuo/undirect@main/web/demo/ads/${name}.js`;
      s.dataset.dest = dest;
      document.head.append(s);
    },
  };
})();
