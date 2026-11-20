/* Store source. Every App Store button on this site is a campaign link (pt and ct). A visitor
   who arrived from a listing or a post gets that source as the campaign token instead of the
   page's own, so App Store Connect > Analytics > Campaigns counts the download under the place
   that sent them: ?ref=macpip, ?utm_source=macappindex.com, a t.co referrer (x), and so on.
   Search engines and this site's own pages keep the page's token. The same file ships on the
   Cutling and Undirect sites (web/_generator/store-source.js in each repo). */
(function () {
  var KEY = "store_source";
  var NAMED = {
    "t.co": "x", "x.com": "x", "twitter.com": "x", "youtu.be": "youtube", "youtube.com": "youtube",
    "instagram.com": "instagram", "tiktok.com": "tiktok", "threads.net": "threads", "threads.com": "threads",
    "facebook.com": "facebook", "news.ycombinator.com": "hackernews", "reddit.com": "reddit"
  };
  var SEARCH = /^(google|bing|duckduckgo|yahoo|ecosia|baidu|yandex|startpage|brave|kagi|naver|qwant|seznam|search)$/;

  function clean(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 30);
  }

  function fromHost(host) {
    host = String(host).toLowerCase().replace(/^(www|m|l|lm|mobile|old)\./, "");
    if (NAMED[host]) return NAMED[host];
    var p = host.split(".");
    if (p.length < 2) return clean(host);
    var i = p.length - 2;
    if (p.length > 2 && p[i].length <= 3 && p[p.length - 1].length === 2) i--; // co.uk, com.au
    return clean(p[i]);
  }

  function fromParam(v) {
    v = String(v || "").trim();
    if (!v) return "";
    return v.indexOf(".") > -1 ? fromHost(v.replace(/^https?:\/\//, "").split("/")[0]) : clean(v);
  }

  function fromVisit() {
    var q;
    try { q = new URLSearchParams(location.search); } catch (e) { return ""; }
    var v = fromParam(q.get("ct") || q.get("ref") || q.get("utm_source") || q.get("source"));
    if (v) return v;
    var host;
    try { host = new URL(document.referrer).hostname; } catch (e) { return ""; }
    if (!host || host === location.hostname) return "";
    var t = fromHost(host);
    return SEARCH.test(t) ? "" : t;
  }

  var source = fromVisit();
  try {
    if (source) sessionStorage.setItem(KEY, source);
    else source = sessionStorage.getItem(KEY) || "";
  } catch (e) {}
  if (!source) return;

  function apply() {
    var links = document.querySelectorAll('a[href*="apps.apple.com"][href*="pt="]');
    for (var i = 0; i < links.length; i++) {
      try {
        var u = new URL(links[i].href);
        u.searchParams.set("ct", source);
        links[i].href = u.toString();
      } catch (e) {}
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply);
  else apply();
})();

/* Language routing. English lives at the site root; every other language under /<code>/.
   A visitor who picked a language, or whose browser asks for one, is sent there from the root pages. */
(function () {
  var LANGS = {"ar-sa":"ar-SA","bn-bd":"bn-BD","ca":"ca","cs":"cs","da":"da","de-de":"de-DE","el":"el","en-au":"en-AU","en-ca":"en-CA","root":"en-GB","en-us":"en-US","es-es":"es-ES","es-mx":"es-MX","fi":"fi","fr-ca":"fr-CA","fr-fr":"fr-FR","gu-in":"gu-IN","he":"he","hi":"hi","hr":"hr","hu":"hu","id":"id","it":"it","ja":"ja","kn-in":"kn-IN","ko":"ko","ml-in":"ml-IN","mr-in":"mr-IN","ms":"ms","nl-nl":"nl-NL","no":"no","or-in":"or-IN","pa-in":"pa-IN","pl":"pl","pt-br":"pt-BR","pt-pt":"pt-PT","ro":"ro","ru":"ru","sk":"sk","sl-si":"sl-SI","sv":"sv","ta-in":"ta-IN","te-in":"te-IN","th":"th","tr":"tr","uk":"uk","ur-pk":"ur-PK","vi":"vi","zh-hans":"zh-Hans","zh-hant":"zh-Hant"};
  var KEY = "undirect_lang";
  var codes = Object.keys(LANGS);

  function store(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }

  function match(list) {
    for (var i = 0; i < list.length; i++) {
      var tag = String(list[i]).toLowerCase().replace("_", "-");
      var parts = tag.split("-");
      var base = parts[0];
      if (base === "zh") {
        var hant = parts.indexOf("hant") > -1 || /^zh-(tw|hk|mo)$/.test(tag);
        return hant ? "zh-hant" : "zh-hans";
      }
      if (base === "nb" || base === "nn") base = "no";
      if (tag === "en-gb" || tag === "en") return "root";
      if (codes.indexOf(tag) > -1) return tag;
      var found = codes.filter(function (c) { return c.split("-")[0] === base; });
      if (found.length) return found.indexOf(base) > -1 ? base : found[0];
    }
    return null;
  }

  function choose() {
    var s = stored();
    if (s && LANGS[s]) return s;
    return match(navigator.languages || [navigator.language || "en"]);
  }

  var script = document.currentScript;
  if (script && script.hasAttribute("data-404")) {
    var el = document.getElementById("nf-data");
    if (!el) return;
    var data = JSON.parse(el.textContent);
    var d = data[choose() || "root"];
    if (d) {
      document.documentElement.lang = d.lang;
      document.documentElement.dir = d.rtl ? "rtl" : "ltr";
      document.getElementById("nf-title").textContent = d.title;
      document.getElementById("nf-text").textContent = d.text;
      var a = document.getElementById("nf-link");
      a.textContent = d.link;
      a.href = d.home;
    }
    return;
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[data-lang]");
    if (a) store(a.getAttribute("data-lang"));
  });

  var html = document.documentElement;
  if (html.hasAttribute("data-root") && location.search.indexOf("stay") === -1) {
    var target = choose();
    if (target && target !== "root") {
      var page = html.getAttribute("data-page") || "";
      location.replace("/" + target + "/" + page);
    }
  }
})();
