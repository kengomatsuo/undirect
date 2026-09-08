// Per-site fixes that are cheaper than fighting the page.
// Each recipe runs once, at document_start, before any page script.
globalThis.UNDIRECT_RECIPES = [
  {
    id: "lunarx",
    hosts: ["lunarx.to"],
    // Their own arming script checks this flag and never requests the pop tag.
    label: "Turned on the site's own ad opt-out",
    apply() {
      try {
        localStorage.setItem("lunar_ads_optout", "true");
      } catch (e) {}
      try {
        document.cookie =
          "lunar_ads_optout=true; path=/; max-age=31536000; samesite=lax";
      } catch (e) {}
    },
  },
];
