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
