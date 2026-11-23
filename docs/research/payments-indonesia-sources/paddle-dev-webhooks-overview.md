<!DOCTYPE html><html lang="en" class="has-announcement"><head><meta name="sentry-route-name" content="%2F404"/><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><script>function readThemeFromRoot(root) {
  const attr = root.getAttribute("data-theme");
  if (attr === "dark" || root.classList.contains("dark")) return "dark";
  if (attr === "light" || root.classList.contains("light")) return "light";
  return null;
}

function resolvedDocsTheme(doc) {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") return "dark";
    if (stored === "light") return "light";
    if (stored === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
  } catch {
    /* localStorage blocked */
  }

  const existing = readThemeFromRoot(doc.documentElement);
  if (existing) return existing;
  return "light";
}

function applyDocsThemeToDocument(doc, mode, scrollbar = true) {
  const root = doc.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(mode);
  root.setAttribute("data-theme", mode);
  // data-color-scheme drives the viewport scrollbar (see global.css). The
  // toggle sets it itself, at the click, ahead of the fade.
  if (scrollbar) root.setAttribute("data-color-scheme", mode);
}

const currentTheme = resolvedDocsTheme(document);
applyDocsThemeToDocument(document, currentTheme);

document.addEventListener("astro:before-swap", (event) => {
  const mode = resolvedDocsTheme(document);
  applyDocsThemeToDocument(event.newDocument, mode);
  if (localStorage.getItem("ai-summary-collapsed") === "true") {
    event.newDocument.documentElement.classList.add("ai-summary-collapsed");
  }
  if (document.body.classList.contains("ai-panel-open")) {
    event.newDocument.body.classList.add("ai-panel-open");
  }
});

document.addEventListener("astro:after-swap", () => {
  const mode = resolvedDocsTheme(document);
  applyDocsThemeToDocument(document, mode);
});

// Delegated theme toggle. A single document-level listener avoids the listener
// stacking that occurs when a per-component script re-attaches on every
// astro:after-swap to a button kept alive by transition:persist.
document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const trigger = target.closest("[data-theme-toggle]");
  if (!trigger) return;
  // The swap lands asynchronously, so a second click before it does must
  // flip from the pending theme, not from what <html> still shows.
  const current = window.__docsThemeTarget || resolvedDocsTheme(document);
  const next = current === "dark" ? "light" : "dark";
  window.__docsThemeTarget = next;
  // Cross-fade (see the theme cross-fade rules in global.css): swap the theme
  // inside a view transition, so the browser fades a snapshot of the old page
  // into the new one. The theme-switching class stays on until it has finished; a
  // later click supersedes a pending removal. Without view transitions, or
  // under reduced motion, the switch is instant.
  const root = document.documentElement;
  const run = (window.__docsThemeFadeRun = (window.__docsThemeFadeRun || 0) + 1);
  const settle = () => {
    if (window.__docsThemeFadeRun !== run) return;
    clearTimeout(window.__docsThemeFadeTimer);
    // Only write the attribute when there is something to remove: components
    // watching the <html> class (Mermaid, Wistia) would otherwise run again.
    if (root.classList.contains("theme-switching")) {
      root.classList.remove("theme-switching");
    }
    // Work that would compete with the fade (off-screen diagram redraws)
    // waits for this.
    document.dispatchEvent(new CustomEvent("docs:theme-settled"));
  };
  // Two frames after the swap or the transition: the element under the
  // pointer regains :hover on the next frame, and this keeps that restyle
  // inside the no-transition window so the hover colour doesn't fade in.
  const settleAfterFrames = () => {
    requestAnimationFrame(() => requestAnimationFrame(settle));
  };
  // The viewport scrollbar can't fade, so it flips before the fade starts,
  // ahead of the old snapshot, rather than part-way through or after it.
  root.setAttribute("data-color-scheme", next);
  // The class goes on in the same style pass as the theme swap: both touch
  // every element, and one recalculation instead of two matters on pages
  // with very large code examples. Components that paint the theme
  // themselves (Mermaid diagrams) can hold the new snapshot until they have
  // redrawn, so they fade with the page instead of flipping part-way
  // through; capped so a slow redraw can't stall the switch.
  // Bridge to the ES-module layer (analytics, the Paddle UI demos). This
  // inline script can't import from islands, so it dispatches a window
  // event once the theme has actually changed.
  const announce = () => {
    window.dispatchEvent(
      new CustomEvent("docs:theme-toggled", { detail: { theme: next } }),
    );
  };
  const swap = () => {
    root.classList.add("theme-switching");
    applyDocsThemeToDocument(document, next, false);
    announce();
    const redraws = [];
    document.dispatchEvent(
      new CustomEvent("docs:theme-swapped", {
        detail: { theme: next, waitUntil: (promise) => redraws.push(promise) },
      }),
    );
    if (!redraws.length) return undefined;
    return Promise.race([
      Promise.allSettled(redraws),
      new Promise((resolve) => setTimeout(resolve, 300)),
    ]);
  };
  // Pages with very large collapsed code examples run to tens of thousands
  // of elements. Every style pass over them is slow, and the no-transition
  // rule roughly doubles it, so those pages switch in one pass with no fade,
  // then finish the hover transitions that pass started so nothing trails.
  if (document.getElementsByTagName("*").length > 20000) {
    applyDocsThemeToDocument(document, next);
    announce();
    // Only the colour transitions the swap started; anything else in
    // flight (a panel opening) is left to finish on its own.
    for (const animation of document.getAnimations()) {
      if (
        window.CSSTransition &&
        animation instanceof CSSTransition &&
        /color|fill|stroke|shadow/.test(animation.transitionProperty)
      ) {
        animation.finish();
      }
    }
  } else if (
    typeof document.startViewTransition === "function" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const transition = document.startViewTransition(swap);
    // A second click skips the first transition and rejects its promises;
    // that is expected, so keep it out of the console.
    transition.ready.catch(() => {});
    transition.updateCallbackDone.catch(() => {});
    transition.finished.then(settleAfterFrames, settleAfterFrames);
  } else {
    swap();
    settleAfterFrames();
  }
  // Safety net for a hidden tab, where neither frames nor the transition come.
  clearTimeout(window.__docsThemeFadeTimer);
  window.__docsThemeFadeTimer = setTimeout(settle, 2000);
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* localStorage blocked */
  }
});

try {
  if (localStorage.getItem("ai-summary-collapsed") === "true") {
    document.documentElement.classList.add("ai-summary-collapsed");
  }
} catch {
  /* localStorage blocked */
}

// The reader's code-example client (HTTP, Paddle CLI, an SDK) lives on
// <html data-client>, so client-switcher.css shows the matching variant of
// every api-example in the first paint. Astro's router replaces <html>
// attributes on navigation, so the choice is carried into the incoming
// document in astro:before-swap too. Choosing a client is handled by the
// ApiExample script.
// When storage is blocked or empty, keep the client the current page shows,
// so a choice made with storage blocked lasts across navigations.
function resolvedDocsClient(fallback) {
  const clients = ["http","cli","node","python","go","php"];
  try {
    const stored = localStorage.getItem("docs-client");
    if (clients.includes(stored)) return stored;
  } catch {
    /* localStorage blocked */
  }
  return clients.includes(fallback) ? fallback : "http";
}

document.documentElement.setAttribute("data-client", resolvedDocsClient());

document.addEventListener("astro:before-swap", (event) => {
  event.newDocument.documentElement.setAttribute(
    "data-client",
    resolvedDocsClient(document.documentElement.getAttribute("data-client")),
  );
});</script><script>(function () {
  var ID = "lemon-squeezy-migration-2026";
  var KEY = "paddle-docs-announcement-dismissed";

  function isDismissed() {
    // The in-memory flag is the fallback when localStorage is blocked, so a
    // dismissal at least holds for the rest of the session.
    if (window.__paddleAnnouncementDismissed === ID) return true;
    try {
      return localStorage.getItem(KEY) === ID;
    } catch {
      /* localStorage blocked — show the bar rather than fail closed */
      return false;
    }
  }

  function apply(doc) {
    doc.documentElement.classList.toggle("announcement-dismissed", isDismissed());
  }

  // Runs on every document, including the ones swapped in by the view
  // transition router.
  apply(document);

  // Listeners are document-level and must be registered exactly once. Astro
  // skips re-running an inline script whose text is unchanged, but the text
  // changes whenever the announcement id does — so guard registration the same
  // way the console greeting in MainLayout does.
  if (window.__paddleAnnouncementInit) return;
  window.__paddleAnnouncementInit = true;

  // Carry the dismissed state into the incoming document before it paints,
  // mirroring how the theme script preserves theme across transitions.
  document.addEventListener("astro:before-swap", (event) => {
    apply(event.newDocument);
  });

  // Delegated so a single handler covers every document the router swaps in.
  document.addEventListener("click", (event) => {
    var target = event.target;
    if (!(target instanceof Element)) return;
    var trigger = target.closest("[data-announcement-dismiss]");
    if (!trigger) return;

    // Read the id off the element rather than the closure: a long-lived tab
    // may be showing markup from a newer deploy than this script.
    var id = trigger.getAttribute("data-announcement-id") || ID;

    window.__paddleAnnouncementDismissed = id;
    try {
      localStorage.setItem(KEY, id);
    } catch {
      /* storage blocked — the in-memory flag above covers this session */
    }
    document.documentElement.classList.add("announcement-dismissed");

    // The bar is about to be display:none with focus inside it, which would
    // drop focus to <body>. Hand it to the first thing below instead.
    var next = document.querySelector("header a, header button");
    if (next instanceof HTMLElement) next.focus();

    // Bridge to the ES-module layer: the header just moved up by the bar's
    // height, so anything that measured the old offset has to re-measure.
    // Same pattern as docs:theme-toggled above — this inline script runs
    // pre-FOUC and can't import from islands.
    window.dispatchEvent(new CustomEvent("docs:announcement-dismissed"));
  });
})();</script><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"><link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><meta name="generator" content="Astro v7.3.2"><link rel="canonical" href="https://developer.paddle.com/404"><meta name="robots" content="noindex, nofollow"><link rel="preload" href="/_astro/TWKLausanne-300.BvAgNdgi.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/_astro/SerrifCondensed-Regular.CvpHEvV9.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/_astro/SpaceMono-Regular.Rg4St2Dn.woff2" as="font" type="font/woff2" crossorigin><title>Page not found | Paddle Developer Docs</title><meta name="description" content="We couldn't find that page."><link rel="alternate" type="application/rss+xml" title="Paddle Developer changelog" href="/changelog.xml"><!-- OpenGraph --><meta property="og:type" content="website"><meta property="og:site_name" content="Paddle Developer Docs"><meta property="og:locale" content="en_US"><meta property="og:title" content="Page not found"><meta property="og:description" content="We couldn't find that page."><meta property="og:url" content="https://developer.paddle.com/404"><meta property="og:image" content="https://developer.paddle.com/images/cover-image.webp"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:type" content="image/webp"><meta property="og:image:alt" content="Paddle Developer Docs"><!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@PaddleHQ"><meta name="twitter:title" content="Page not found"><meta name="twitter:description" content="We couldn't find that page."><meta name="twitter:image" content="https://developer.paddle.com/images/cover-image.webp"><meta name="twitter:image:alt" content="Paddle Developer Docs"><script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://developer.paddle.com/"},{"@type":"ListItem","position":2,"name":"Page not found","item":"https://developer.paddle.com/404"}]}</script><script>
      if (!window.__paddleHello) {
        window.__paddleHello = true;
        console.log(
          "%c Hey developer 👋 ",
          "background: #ffd400; color: #1c1a15; font-size: 14px; font-weight: 700; padding: 4px 8px; border-radius: 4px;",
        );
        console.log(
          "Join us and help solve the biggest product and engineering challenges in fintech.",
        );
        console.log("→ https://paddle.com/careers");
      }
    </script><meta name="paddle:nav-data" content="/nav/ad6c0350e4be.json"><link rel="preload" href="/nav/ad6c0350e4be.json" as="fetch" crossorigin="anonymous"><style>astro-island,astro-slot,astro-static-slot{display:contents}</style><script>(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event("astro:load"));})();</script><script>(()=>{var g=Object.defineProperty;var w=(a,s,c)=>s in a?g(a,s,{enumerable:!0,configurable:!0,writable:!0,value:c}):a[s]=c;var l=(a,s,c)=>w(a,typeof s!="symbol"?s+"":s,c);var E=new Set(["__proto__","constructor","prototype"]);{let a={0:t=>y(t),1:t=>c(t),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(c(t)),5:t=>new Set(c(t)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(t),9:t=>new Uint16Array(t),10:t=>new Uint32Array(t),11:t=>Number.POSITIVE_INFINITY*t},s=t=>{let[p,e]=t;return p in a?a[p](e):void 0},c=t=>t.map(s),y=t=>typeof t!="object"||t===null?t:Object.fromEntries(Object.entries(t).map(([p,e])=>[p,s(e)]));class f extends HTMLElement{constructor(){super(...arguments);l(this,"Component");l(this,"hydrator");l(this,"hydrate",async()=>{var b;if(!this.hydrator||!this.isConnected)return;let e=(b=this.parentElement)==null?void 0:b.closest("astro-island[ssr]");if(e){e.addEventListener("astro:hydrate",this.hydrate,{once:!0});return}let r=this.querySelectorAll("astro-slot"),n={},d=this.querySelectorAll("template[data-astro-template]");for(let o of d){let i=o.closest(this.tagName);i!=null&&i.isSameNode(this)&&(n[o.getAttribute("data-astro-template")||"default"]=o.innerHTML,o.remove())}for(let o of r){let i=o.closest(this.tagName);i!=null&&i.isSameNode(this)&&(n[o.getAttribute("name")||"default"]=o.innerHTML)}let u;try{u=this.hasAttribute("props")?y(JSON.parse(this.getAttribute("props"))):{}}catch(o){let i=this.getAttribute("component-url")||"<unknown>",v=this.getAttribute("component-export");throw v&&(i+=` (export ${v})`),console.error(`[hydrate] Error parsing props for component ${i}`,this.getAttribute("props"),o),o}let h;await this.hydrator(this)(this.Component,u,n,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),this.dispatchEvent(new CustomEvent("astro:hydrate"))});l(this,"unmount",()=>{this.isConnected||this.dispatchEvent(new CustomEvent("astro:unmount"))})}disconnectedCallback(){document.removeEventListener("astro:after-swap",this.unmount),document.addEventListener("astro:after-swap",this.unmount,{once:!0})}connectedCallback(){if(!this.hasAttribute("await-children")||document.readyState==="interactive"||document.readyState==="complete")this.childrenConnectedCallback();else{let e=()=>{document.removeEventListener("DOMContentLoaded",e),r.disconnect(),this.childrenConnectedCallback()},r=new MutationObserver(()=>{var n;((n=this.lastChild)==null?void 0:n.nodeType)===Node.COMMENT_NODE&&this.lastChild.nodeValue==="astro:end"&&(this.lastChild.remove(),e())});r.observe(this,{childList:!0}),document.addEventListener("DOMContentLoaded",e)}}async childrenConnectedCallback(){let e=this.getAttribute("before-hydration-url");e&&await import(e),this.start()}getRetryImportUrl(e){let r=new URL(e,document.baseURI);return r.searchParams.set("astro-retry",Date.now().toString()),r.toString()}async importWithRetry(e){try{return await import(e)}catch(r){return await new Promise(n=>setTimeout(n,1e3)),import(this.getRetryImportUrl(e))}}handleHydrationError(e){let r=this.getAttribute("component-url"),n=new CustomEvent("astro:hydration-error",{cancelable:!0,bubbles:!0,composed:!0,detail:{error:e,componentUrl:r}});this.dispatchEvent(n)&&console.error(`[astro-island] Error hydrating ${r}`,e)}async start(){let e=JSON.parse(this.getAttribute("opts")),r=this.getAttribute("client");if(Astro[r]===void 0){window.addEventListener(`astro:${r}`,()=>this.start(),{once:!0});return}try{await Astro[r](async()=>{let n=this.getAttribute("renderer-url");try{let[d,{default:u}]=await Promise.all([this.importWithRetry(this.getAttribute("component-url")),n?this.importWithRetry(n):Promise.resolve({default:()=>()=>{}})]),h=this.getAttribute("component-export")||"default";if(h.includes(".")){this.Component=d;for(let m of h.split(".")){if(E.has(m)||!this.Component||typeof this.Component!="object"&&typeof this.Component!="function"||!Object.hasOwn(this.Component,m))throw new Error(`Invalid component export path: ${h}`);this.Component=this.Component[m]}}else{if(E.has(h))throw new Error(`Invalid component export path: ${h}`);this.Component=d[h]}return this.hydrator=u,this.hydrate}catch(d){return this.handleHydrationError(d),()=>{}}},e,this)}catch(n){this.handleHydrationError(n)}}attributeChangedCallback(){this.hydrate()}}l(f,"observedAttributes",["props"]),customElements.get("astro-island")||customElements.define("astro-island",f)}})();</script><astro-island uid="Z2j4iW0" prefix="r4" component-url="/_astro/AmplitudeInit.BO0HuQXf.js?dpl=6b0058b419d6a107bf36bcbe" component-export="AmplitudeInit" renderer-url="/_astro/client.nSJI_yMW.js?dpl=6b0058b419d6a107bf36bcbe" props="{}" ssr client="load" opts="{&quot;name&quot;:&quot;AmplitudeInit&quot;,&quot;value&quot;:true}"></astro-island><astro-island uid="hulP0" prefix="r5" component-url="/_astro/DreamdataInit.BLvTu96A.js?dpl=6b0058b419d6a107bf36bcbe" component-export="DreamdataInit" renderer-url="/_astro/client.nSJI_yMW.js?dpl=6b0058b419d6a107bf36bcbe" props="{}" ssr client="load" opts="{&quot;name&quot;:&quot;DreamdataInit&quot;,&quot;value&quot;:true}"></astro-island><meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback" content="animate"><script type="module" src="/_astro/ClientRouter.astro_astro_type_script_index_0_lang.B7kMSNqj.js?dpl=6b0058b419d6a107bf36bcbe"></script><link rel="stylesheet" href="/_astro/MainLayout.GODbPDqe.css"><script type="module" src="/_astro/page.BukOZQQl.js"></script></head><body class="section-404"><div class="sr-only"><p>For AI agents and LLMs: a structured documentation index is available at <a href="/llms.txt">/llms.txt</a>. Every page has a Markdown sibling — append <code>.md</code> to any URL. To search these docs, send a GET request to <code>https://paddle-docs-retrieval.kapa-paddle.workers.dev/?q=&lt;question&gt;</code> with a URL-encoded question. No authentication needed.</p></div><a href="#main" class="bg-background sr-only rounded px-3 py-2 shadow focus:not-sr-only focus:fixed focus:top-[calc(var(--announcement-height)_+_0.5rem)] focus:left-2 focus:z-[80]">Skip to content</a><div class="bg-background min-h-screen"><!-- Announcement bar — pinned above the header until dismissed --><aside class="announcement-banner" data-markdown-ignore aria-label="Site announcement" data-astro-cid-5vrird5b><a class="announcement-banner__link" href="/migrate/other-platforms/lemon-squeezy" data-astro-cid-5vrird5b><span class="announcement-banner__message" data-astro-cid-5vrird5b><span class="announcement-banner__message-full" data-astro-cid-5vrird5b>Affected by the Lemon Squeezy wind-down? See how to migrate to Paddle Billing instead.</span><span class="announcement-banner__message-short" data-astro-cid-5vrird5b>Moving from Lemon Squeezy?</span></span><span class="announcement-banner__cta" data-astro-cid-5vrird5b>Read the guide<svg width="1em" height="1em" aria-hidden="true" data-astro-cid-5vrird5b="true" data-icon="carbon:arrow-right"><symbol id="ai:carbon:arrow-right" viewBox="0 0 32 32"><path fill="currentColor" d="m18 6l-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10z"/></symbol><use href="#ai:carbon:arrow-right"></use></svg></span></a><button type="button" class="announcement-banner__dismiss" data-announcement-dismiss data-announcement-id="lemon-squeezy-migration-2026" aria-label="Dismiss announcement" data-astro-cid-5vrird5b><svg width="1em" height="1em" aria-hidden="true" data-astro-cid-5vrird5b="true" data-icon="carbon:close"><symbol id="ai:carbon:close" viewBox="0 0 32 32"><path fill="currentColor" d="M17.414 16L24 9.414L22.586 8L16 14.586L9.414 8L8 9.414L14.586 16L8 22.586L9.414 24L16 17.414L22.586 24L24 22.586z"/></symbol><use href="#ai:carbon:close"></use></svg></button></aside><!-- Header --><header data-astro-transition-persist="site-header" class="border-border bg-background flex h-[var(--header-height)] items-center justify-between border-b px-6 xl:grid xl:flex-none xl:grid-cols-[1fr_auto_1fr]" data-markdown-ignore data-astro-cid-bsspqklq><div class="flex items-center space-x-2 md:space-x-4 xl:justify-self-start" data-astro-cid-bsspqklq><a href="/" class="flex items-center" data-astro-cid-bsspqklq><svg viewBox="0 0 150 28" fill="currentColor" class="text-foreground h-7 w-auto max-w-full shrink-0" aria-hidden="true" data-astro-cid-bsspqklq="true">
  <path d="M0 14.37V13.6538C0.862478 13.6536 1.68957 13.305 2.29944 12.6846C2.9093 12.0643 3.25201 11.223 3.25222 10.3457H3.90313C3.90262 10.7805 3.98635 11.2111 4.14955 11.613C4.31275 12.0148 4.55222 12.38 4.85425 12.6877C5.15629 12.9954 5.51498 13.2395 5.90982 13.4061C6.30465 13.5727 6.7279 13.6584 7.15535 13.6586V14.3748C6.29287 14.375 5.46578 14.7236 4.85591 15.3439C4.24605 15.9643 3.90334 16.8056 3.90313 17.6829H3.25222C3.25273 17.2481 3.169 16.8174 3.0058 16.4156C2.8426 16.0137 2.60313 15.6485 2.3011 15.3408C1.99906 15.0332 1.64037 14.7891 1.24553 14.6225C0.850697 14.4559 0.427454 14.3701 0 14.37ZM3.25222 9.10344H8.846C11.578 9.10344 13.5299 11.0881 13.5299 13.9999C13.5299 16.9117 11.5787 18.8957 8.846 18.8957H3.25222V27.2324H5.59379V21.0133H8.846C12.775 21.0133 15.8715 17.8635 15.8715 13.9999C15.8715 10.1364 12.775 6.98584 8.846 6.98584H3.25222V9.10344Z" />
  <path d="M24.2756 6.96045C26.3308 6.96045 28.1521 8.01885 29.2967 9.68683V7.38381H31.6383V20.617H29.2967V18.314C28.1232 19.9852 26.305 21.0404 24.2756 21.0404C20.4241 21.0404 17.1719 17.944 17.1719 14.0008C17.1719 10.0577 20.4241 6.96045 24.2756 6.96045ZM24.2756 18.9228C27.2931 18.9228 29.2967 16.806 29.2967 14.0008C29.2967 11.1686 27.3197 9.07805 24.2756 9.07805C21.5695 9.07805 19.5134 11.0628 19.5134 14.0008C19.5134 16.9389 21.5695 18.9228 24.2756 18.9228Z" />
  <path d="M40.3022 6.95994C42.3582 6.95994 44.1795 8.01834 45.324 9.68632V0.76709H47.6656V20.6165H45.324V18.3135C44.1795 19.9847 42.3582 21.0399 40.3022 21.0399C36.4514 21.0399 33.1992 17.9435 33.1992 14.0003C33.1992 10.0572 36.4514 6.95994 40.3022 6.95994ZM40.3022 18.9223C43.3463 18.9223 45.324 16.8317 45.324 14.0003C45.324 11.1689 43.3463 9.07754 40.3022 9.07754C37.5968 9.07754 35.5408 11.0622 35.5408 14.0003C35.5408 16.9384 37.5968 18.9223 40.3022 18.9223Z" />
  <path d="M56.5912 6.95994C58.6465 6.95994 60.4678 8.01834 61.6131 9.68632V0.76709H63.9547V20.6165H61.6131V18.3135C60.4678 19.9847 58.6465 21.0399 56.5912 21.0399C52.7405 21.0399 49.4883 17.9435 49.4883 14.0003C49.4883 10.0572 52.7405 6.95994 56.5912 6.95994ZM56.5912 18.9223C59.6353 18.9223 61.6131 16.8317 61.6131 14.0003C61.6131 11.1689 59.6353 9.07754 56.5912 9.07754C53.8851 9.07754 51.8298 11.0622 51.8298 14.0003C51.8298 16.9384 53.8851 18.9223 56.5912 18.9223Z" />
  <path d="M66.293 20.6165V0.76709H68.6353V20.6165H66.293Z" />
  <path d="M77.2973 6.98779C81.7981 6.98779 83.9574 10.5609 83.9574 14.9282H72.7182C73.082 17.4946 74.9557 19.1626 77.2973 19.1626C78.9105 19.1626 80.1591 18.4209 81.0956 16.9654H83.6194C82.7346 19.0034 80.4196 21.0152 77.2973 21.0152C73.3683 21.0152 70.3242 17.8121 70.3242 14.0019C70.3242 10.1916 73.3683 6.98779 77.2973 6.98779ZM81.6158 13.0756C81.6158 10.9047 79.7945 8.84039 77.2973 8.84039C74.9557 8.84039 73.082 10.5116 72.7182 13.0756H81.6158Z" />
  <path d="M145.184 21.1676C143.455 21.1676 142.167 20.7646 141.322 19.9584C140.49 19.1392 140.002 18.0665 139.859 16.7402H141.498C141.563 17.1953 141.654 17.5919 141.771 17.93C141.901 18.268 142.096 18.5866 142.356 18.8857C142.616 19.1847 142.98 19.4123 143.448 19.5683C143.929 19.7243 144.508 19.8024 145.184 19.8024C146.094 19.8024 146.848 19.5618 147.446 19.0807C148.058 18.5866 148.363 17.9495 148.363 17.1693C148.363 16.3631 148.129 15.7715 147.661 15.3944C147.193 15.0043 146.302 14.7053 144.989 14.4972C143.416 14.2632 142.245 13.8601 141.478 13.288C140.711 12.7028 140.327 11.8252 140.327 10.6549C140.327 9.57567 140.75 8.67848 141.595 7.96333C142.44 7.23517 143.513 6.87109 144.813 6.87109C146.218 6.87109 147.336 7.20266 148.168 7.86581C149 8.52895 149.481 9.47815 149.611 10.7134H148.09C147.921 9.84223 147.577 9.21159 147.056 8.82151C146.536 8.43143 145.789 8.23638 144.813 8.23638C143.89 8.23638 143.175 8.44443 142.668 8.86052C142.161 9.27661 141.907 9.82272 141.907 10.4989C141.907 11.227 142.128 11.7731 142.57 12.1372C143.013 12.5013 143.91 12.7874 145.262 12.9954C146.9 13.2555 148.097 13.6845 148.851 14.2827C149.618 14.8678 150.002 15.791 150.002 17.0523C150.002 18.2225 149.54 19.2042 148.617 19.9974C147.707 20.7776 146.562 21.1676 145.184 21.1676Z" />
  <path d="M132.264 21.1676C130.249 21.1676 128.656 20.5305 127.486 19.2562C126.329 17.9819 125.75 16.2655 125.75 14.1071V13.951C125.75 11.8836 126.368 10.1802 127.603 8.84096C128.838 7.50167 130.405 6.83203 132.303 6.83203C133.825 6.83203 135.112 7.22862 136.165 8.02178C137.218 8.81495 137.817 9.93969 137.96 11.396H136.282C135.931 9.25055 134.611 8.17782 132.323 8.17782C130.88 8.17782 129.716 8.70443 128.832 9.75765C127.947 10.7979 127.505 12.1892 127.505 13.9315V14.0876C127.505 15.869 127.928 17.2668 128.773 18.281C129.631 19.2822 130.808 19.7828 132.303 19.7828C133.461 19.7828 134.41 19.4967 135.151 18.9246C135.892 18.3395 136.347 17.4878 136.516 16.3696H138.096C137.862 17.9429 137.231 19.1392 136.204 19.9583C135.177 20.7645 133.864 21.1676 132.264 21.1676Z" />
  <path d="M116.842 19.7633C118.376 19.7633 119.592 19.2367 120.489 18.1835C121.399 17.1303 121.855 15.752 121.855 14.0486V13.8926C121.855 12.2672 121.399 10.9215 120.489 9.85523C119.592 8.776 118.363 8.23638 116.803 8.23638C115.217 8.23638 113.968 8.763 113.058 9.81622C112.148 10.8694 111.693 12.2412 111.693 13.9316V14.0876C111.693 15.752 112.18 17.1173 113.156 18.1835C114.144 19.2367 115.373 19.7633 116.842 19.7633ZM116.842 21.1676C114.814 21.1676 113.156 20.4915 111.868 19.1392C110.581 17.7739 109.938 16.0966 109.938 14.1071V13.9511C109.938 11.9357 110.575 10.2518 111.849 8.89953C113.136 7.54724 114.788 6.87109 116.803 6.87109C118.818 6.87109 120.457 7.54724 121.718 8.89953C122.979 10.2388 123.61 11.9097 123.61 13.9121V14.0681C123.61 16.0706 122.979 17.7544 121.718 19.1197C120.457 20.485 118.831 21.1676 116.842 21.1676Z" />
  <path d="M98.7398 19.6066H100.651C102.407 19.6066 103.739 19.119 104.65 18.1438C105.573 17.1556 106.034 15.7903 106.034 14.0479V13.8919C106.034 12.1885 105.592 10.8492 104.708 9.874C103.837 8.89879 102.478 8.41119 100.632 8.41119H98.7398V19.6066ZM97.043 20.9914V7.0459H100.729C103.031 7.0459 104.78 7.67653 105.976 8.9378C107.185 10.1991 107.79 11.8504 107.79 13.8919V14.0674C107.79 16.1088 107.185 17.7732 105.976 19.0605C104.78 20.3477 103.018 20.9914 100.69 20.9914H97.043Z" />
</svg><span class="sr-only" data-astro-cid-bsspqklq>Paddle Docs home</span></a><div data-version-picker data-open="false" class="relative hidden md:block" data-astro-cid-7raw5mox><!-- Current Version Display --><button type="button" aria-expanded="false" aria-haspopup="true" class="border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-ring inline-flex min-w-[160px] cursor-pointer items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none" data-astro-cid-7raw5mox><span data-astro-cid-7raw5mox>Paddle Billing</span><svg class="chevron size-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-7raw5mox><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-astro-cid-7raw5mox></path></svg></button><!-- Dropdown Links --><div class="bg-popover text-popover-foreground dropdown invisible absolute top-full left-0 z-50 mt-1 min-w-full overflow-hidden rounded-md border p-1 opacity-0 shadow-md transition-all duration-200" data-astro-cid-7raw5mox><a href="https://developer.paddle.com/" class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors focus:outline-none bg-accent text-accent-foreground" data-astro-cid-7raw5mox><div class="flex size-4 items-center justify-center" data-astro-cid-7raw5mox><div class="size-2 rounded-full bg-current" data-astro-cid-7raw5mox></div></div>Paddle Billing</a><a href="https://developer.paddle.com/classic" class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors focus:outline-none" data-astro-cid-7raw5mox><div class="flex size-4 items-center justify-center" data-astro-cid-7raw5mox></div>Paddle Classic</a></div></div><script type="module">(function(){try{var e=typeof window<`u`?window:typeof global<`u`?global:typeof globalThis<`u`?globalThis:typeof self<`u`?self:{};e.SENTRY_RELEASE={id:`7abf5d27c432a89df778c632b3442f035c0185ef`};var t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]=`29d85c26-d983-4e17-92ca-03ba7e2d15a5`,e._sentryDebugIdIdentifier=`sentry-dbid-29d85c26-d983-4e17-92ca-03ba7e2d15a5`)}catch{}})();function e(e,t){e.setAttribute(`data-open`,String(t)),e.querySelector(`button`)?.setAttribute(`aria-expanded`,String(t))}function t(t){document.querySelectorAll(`[data-version-picker][data-open="true"]`).forEach(n=>{n!==t&&e(n,!1)})}document.addEventListener(`click`,n=>{let r=n.target;if(!(r instanceof Element)){t();return}let i=r.closest(`[data-version-picker]`);if(!i){t();return}if(r.closest(`button`)){let n=i.getAttribute(`data-open`)===`true`;t(i),e(i,!n)}}),document.addEventListener(`keydown`,e=>{if(e.key!==`Escape`)return;let n=document.querySelector(`[data-version-picker][data-open="true"]`);n&&(t(),n.querySelector(`button`)?.focus())}),document.addEventListener(`astro:before-swap`,()=>t());</script></div><div class="hidden items-center space-x-2 md:flex xl:justify-self-center" data-astro-cid-bsspqklq><button type="button" data-slot="search-button" class="flex h-9 items-center justify-between rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 hover:bg-accent/40 dark:hover:bg-accent/20 w-64" data-search-trigger="true" aria-label="Search docs" data-astro-cid-bsspqklq="true"><span class="text-muted-foreground flex items-center gap-2"><svg width="1em" height="1em" data-icon="carbon:search"><symbol id="ai:carbon:search" viewBox="0 0 32 32"><path fill="currentColor" d="m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9"/></symbol><use href="#ai:carbon:search"></use></svg><span>Search</span></span><kbd aria-hidden="true" class="bg-muted text-muted-foreground pointer-events-none rounded border px-1.5 py-0.5 font-mono text-[11px] leading-none select-none">⌘ K</kbd></button><astro-island uid="QSrF1" prefix="r2" component-url="/_astro/AskAiButton.rKaVMTkQ.js?dpl=6b0058b419d6a107bf36bcbe" component-export="AskAiButton" renderer-url="/_astro/client.nSJI_yMW.js?dpl=6b0058b419d6a107bf36bcbe" props="{&quot;className&quot;:[0,&quot;hidden md:inline-flex&quot;],&quot;data-astro-cid-bsspqklq&quot;:[0,true]}" ssr client="load" opts="{&quot;name&quot;:&quot;AskAiButton&quot;,&quot;value&quot;:true}" await-children><button data-slot="button" class="items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*=&#x27;size-&#x27;])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[&gt;svg]:px-3 ask-ai-glow hidden md:inline-flex" type="button" aria-label="Ask AI" title="Ask AI"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="size-4"><path fill="currentColor" d="m19 1l-1.26 2.75L15 5l2.74 1.26L19 9l1.25-2.74L23 5l-2.75-1.25M9 4L6.5 9.5L1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5M19 15l-1.26 2.74L15 19l2.74 1.25L19 23l1.25-2.75L23 19l-2.75-1.26"></path></svg><span>Ask AI</span></button><!--astro:end--></astro-island></div><div class="flex items-center gap-1 md:gap-4 xl:justify-self-end" data-astro-cid-bsspqklq><button data-slot="button" class="items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-9 px-4 py-2 has-[>svg]:px-3 block md:hidden" data-search-trigger="true" data-astro-cid-bsspqklq="true"><span class="sr-only" data-astro-cid-bsspqklq>Search</span><svg width="1em" height="1em" viewBox="0 0 32 32" data-astro-cid-bsspqklq="true" data-icon="carbon:search"><use href="#ai:carbon:search"></use></svg></button><astro-island uid="Z2dFJNB" prefix="r3" component-url="/_astro/AskAiButton.rKaVMTkQ.js?dpl=6b0058b419d6a107bf36bcbe" component-export="AskAiButton" renderer-url="/_astro/client.nSJI_yMW.js?dpl=6b0058b419d6a107bf36bcbe" props="{&quot;className&quot;:[0,&quot;block md:hidden&quot;],&quot;variant&quot;:[0,&quot;ghost&quot;],&quot;size&quot;:[0,&quot;icon&quot;],&quot;iconOnly&quot;:[0,true],&quot;data-astro-cid-bsspqklq&quot;:[0,true]}" ssr client="load" opts="{&quot;name&quot;:&quot;AskAiButton&quot;,&quot;value&quot;:true}" await-children><button data-slot="button" class="items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*=&#x27;size-&#x27;])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9 ask-ai-glow block md:hidden" type="button" aria-label="Ask AI" title="Ask AI"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="size-4"><path fill="currentColor" d="m19 1l-1.26 2.75L15 5l2.74 1.26L19 9l1.25-2.74L23 5l-2.75-1.25M9 4L6.5 9.5L1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5M19 15l-1.26 2.74L15 19l2.74 1.25L19 23l1.25-2.75L23 19l-2.75-1.26"></path></svg><span class="sr-only">Ask AI</span></button><!--astro:end--></astro-island><button data-slot="button" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9" data-theme-toggle="true" aria-label="Toggle Theme" data-astro-cid-bsspqklq="true"><span class="sr-only" data-astro-cid-bsspqklq>Toggle Theme</span><svg width="1em" height="1em" class="dark:hidden" data-astro-cid-bsspqklq="true" data-icon="carbon:awake"><symbol id="ai:carbon:awake" viewBox="0 0 32 32"><path fill="currentColor" d="M15 2h2v4.96h-2zm6.687 6.89l3.507-3.506l1.414 1.414l-3.507 3.507zM25.04 15H30v2h-4.96zm-3.347 8.104l1.414-1.414l3.507 3.507L25.2 26.61zM15 25.04h2V30h-2zm-9.604.162l3.508-3.507l1.414 1.414l-3.507 3.507zM2 15h4.96v2H2zm3.39-8.197l1.415-1.414l3.507 3.507l-1.414 1.414zM16 12a4 4 0 1 1-4 4a4 4 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6"/></symbol><use href="#ai:carbon:awake"></use></svg><svg width="1em" height="1em" class="hidden dark:block" data-astro-cid-bsspqklq="true" data-icon="carbon:asleep"><symbol id="ai:carbon:asleep" viewBox="0 0 32 32"><path fill="currentColor" d="M13.503 5.414a15.076 15.076 0 0 0 11.593 18.194a11.1 11.1 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1 1 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.07 13.07 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3"/></symbol><use href="#ai:carbon:asleep"></use></svg></button><!-- Reserves the footprint of the mobile menu button, which Navigation.tsx
         renders as a fixed overlay at the header's right edge (right-6, h-9,
         2.875rem wide), so the theme toggle sits a gap to its left instead of
         underneath it. --><div class="h-9 w-[2.875rem] md:hidden" aria-hidden="true" data-astro-cid-bsspqklq></div><a data-slot="button" class="items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 hidden md:flex" href="https://login.paddle.com/start" data-auth-button="true" data-login-url="https://login.paddle.com/start" data-dashboard-url="https://vendors.paddle.com" data-dashboard-api="https://api.paddle.com/userinfo" data-astro-cid-bsspqklq="true">Login</a></div></header><script type="module" src="/_astro/Header.astro_astro_type_script_index_0_lang.dEwycZyE.js?dpl=6b0058b419d6a107bf36bcbe"></script><div data-markdown-ignore><astro-island uid="ZFt7jr" prefix="r0" component-url="/_astro/SiteSearch.BdaCD4Vd.js?dpl=6b0058b419d6a107bf36bcbe" component-export="default" renderer-url="/_astro/client.nSJI_yMW.js?dpl=6b0058b419d6a107bf36bcbe" props="{}" ssr client="load" opts="{&quot;name&quot;:&quot;SiteSearch&quot;,&quot;value&quot;:true}"></astro-island></div><div class="flex"><div data-astro-transition-persist="navigation" class="contents" data-markdown-ignore><astro-island uid="e9KFj" prefix="r1" component-url="/_astro/index.YaHpruAH.js?dpl=6b0058b419d6a107bf36bcbe" component-export="Navigation" renderer-url="/_astro/client.nSJI_yMW.js?dpl=6b0058b419d6a107bf36bcbe" props="{&quot;currentSection&quot;:[0,&quot;404&quot;],&quot;currentPath&quot;:[0,&quot;/404/&quot;]}" ssr client="load" opts="{&quot;name&quot;:&quot;Navigation&quot;,&quot;value&quot;:true}" await-children><div class="fixed top-[calc(var(--announcement-height)_+_0.875rem)] right-6 z-50 md:hidden"><button class="focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" aria-label="Open menu"><svg focusable="false" preserveAspectRatio="xMidYMid meet" fill="currentColor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg"><path d="M2 12H14V13H2z"></path><path d="M2 9H14V10H2z"></path><path d="M2 6H14V7H2z"></path><path d="M2 3H14V4H2z"></path></svg></button></div><div class="sticky top-[var(--header-offset)] z-40 hidden h-[var(--below-header-height)] transition-[width] duration-300 ease-in-out md:block w-[var(--sidebar-width-collapsed)]"><aside class="nav-sidebar bg-sidebar border-sidebar-border absolute top-0 left-0 flex h-full flex-col border-r collapsed " aria-label="Main navigation" data-markdown-ignore="true"><div class="nav-sidebar-scroll flex-1 overflow-y-auto"><nav class="space-y-2 p-4"><a href="/get-started" class="nav-item "><div class="nav-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="m7.288 23.292l7.997-7.997l1.414 1.414l-7.997 7.997z"/><path fill="currentColor" d="M17 30a1 1 0 0 1-.37-.07a1 1 0 0 1-.62-.79l-1-7l2-.28l.75 5.27L21 24.52V17a1 1 0 0 1 .29-.71l4.07-4.07A8.94 8.94 0 0 0 28 5.86V4h-1.86a8.94 8.94 0 0 0-6.36 2.64l-4.07 4.07A1 1 0 0 1 15 11H7.48l-2.61 3.26l5.27.75l-.28 2l-7-1a1 1 0 0 1-.79-.62a1 1 0 0 1 .15-1l4-5A1 1 0 0 1 7 9h7.59l3.77-3.78A10.92 10.92 0 0 1 26.14 2H28a2 2 0 0 1 2 2v1.86a10.92 10.92 0 0 1-3.22 7.78L23 17.41V25a1 1 0 0 1-.38.78l-5 4A1 1 0 0 1 17 30"/></svg></div><span class="nav-text">Get started</span></a><div class="nav-divider"><hr class="border-sidebar-border my-3"/></div><a href="/concepts" class="nav-item "><div class="nav-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M16 4A12 12 0 1 1 4 16A12 12 0 0 1 16 4m0-2a14 14 0 1 0 14 14A14 14 0 0 0 16 2"/><path fill="currentColor" d="M23 10.41L21.59 9l-4.3 4.3a3 3 0 0 0-4 4L9 21.59L10.41 23l4.3-4.3a3 3 0 0 0 4-4ZM17 16a1 1 0 1 1-1-1a1 1 0 0 1 1 1"/><circle cx="16" cy="7.5" r="1.5" fill="currentColor"/></svg></div><span class="nav-text">Concepts</span></a><a href="/build" class="nav-item "><div class="nav-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M8 4v4H4V4zM2 2v8h8V2Zm16 5v4h-4V7zm-6-2v8h8V5ZM8 16v4H4v-4zm-6-2v8h8v-8Z"/><path fill="currentColor" d="M22 10v6h-6v6h-6v8h20V10Zm-4 8h4v4h-4Zm-2 10h-4v-4h4Zm6 0h-4v-4h4Zm6 0h-4v-4h4Zm0-6h-4v-4h4Zm-4-6v-4h4v4Z"/></svg></div><span class="nav-text">Build</span></a><a href="/migrate" class="nav-item "><div class="nav-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M26 2H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h9v6.17l-2.59-2.58L11 15l5 5l5-5l-1.41-1.41L17 16.17V10h9a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2M6 4h4v4H6Zm20 4H12V4h14Zm0 14H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2M6 24h14v4H6Zm20 4h-4v-4h4Z"/></svg></div><span class="nav-text">Migrate</span></a><div class="nav-divider"><hr class="border-sidebar-border my-3"/></div><a href="/api-reference" class="nav-item "><div class="nav-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M26 22a3.86 3.86 0 0 0-2 .57l-3.09-3.1a6 6 0 0 0 0-6.94L24 9.43a3.86 3.86 0 0 0 2 .57a4 4 0 1 0-4-4a3.86 3.86 0 0 0 .57 2l-3.1 3.09a6 6 0 0 0-6.94 0L9.43 8A3.86 3.86 0 0 0 10 6a4 4 0 1 0-4 4a3.86 3.86 0 0 0 2-.57l3.09 3.1a6 6 0 0 0 0 6.94L8 22.57A3.86 3.86 0 0 0 6 22a4 4 0 1 0 4 4a3.86 3.86 0 0 0-.57-2l3.1-3.09a6 6 0 0 0 6.94 0l3.1 3.09a3.86 3.86 0 0 0-.57 2a4 4 0 1 0 4-4m0-18a2 2 0 1 1-2 2a2 2 0 0 1 2-2M4 6a2 2 0 1 1 2 2a2 2 0 0 1-2-2m2 22a2 2 0 1 1 2-2a2 2 0 0 1-2 2m10-8a4 4 0 1 1 4-4a4 4 0 0 1-4 4m10 8a2 2 0 1 1 2-2a2 2 0 0 1-2 2"/></svg></div><span class="nav-text">API reference</span></a><a href="/webhooks" class="nav-item "><div class="nav-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M24 26a3 3 0 1 0-2.816-4H13v1a5 5 0 1 1-5-5v-2a7 7 0 1 0 6.929 8h6.255A2.99 2.99 0 0 0 24 26"/><path fill="currentColor" d="M24 16a7 7 0 0 0-2.57.487l-3.166-5.54a3.047 3.047 0 1 0-1.732 1l4.119 7.208l.868-.498a5 5 0 1 1-1.85 6.842l-1.732 1.002A7 7 0 1 0 24 16"/><path fill="currentColor" d="M8.532 20.054a3.03 3.03 0 1 0 1.733.998l3.625-6.344l.498-.868l-.868-.497a5 5 0 1 1 6.812-1.844l1.731 1.002a7 7 0 1 0-10.346 2.036c-.457.742-1.102 1.871-2.073 3.572Z"/></svg></div><span class="nav-text">Webhooks</span></a><a href="/paddle-js" class="nav-item "><div class="nav-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="m31 16l-7 7l-1.41-1.41L28.17 16l-5.58-5.59L24 9zM1 16l7-7l1.41 1.41L3.83 16l5.58 5.59L8 23zm11.42 9.484L17.64 6l1.932.517L14.352 26z"/></svg></div><span class="nav-text">Paddle.js</span></a><a href="/sdks" class="nav-item "><div class="nav-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M12.1 2a9.8 9.8 0 0 0-5.4 1.6l6.4 6.4a2.1 2.1 0 0 1 .2 3a2.1 2.1 0 0 1-3-.2L3.7 6.4A9.84 9.84 0 0 0 2 12.1a10.14 10.14 0 0 0 10.1 10.1a11 11 0 0 0 2.6-.3l6.7 6.7a5 5 0 0 0 7.1-7.1l-6.7-6.7a11 11 0 0 0 .3-2.6A10 10 0 0 0 12.1 2m8 10.1a7.6 7.6 0 0 1-.3 2.1l-.3 1.1l.8.8l6.7 6.7a2.88 2.88 0 0 1 .9 2.1A2.72 2.72 0 0 1 27 27a2.9 2.9 0 0 1-4.2 0l-6.7-6.7l-.8-.8l-1.1.3a7.6 7.6 0 0 1-2.1.3a8.27 8.27 0 0 1-5.7-2.3A7.63 7.63 0 0 1 4 12.1a8.3 8.3 0 0 1 .3-2.2l4.4 4.4a4.14 4.14 0 0 0 5.9.2a4.14 4.14 0 0 0-.2-5.9L10 4.2a6.5 6.5 0 0 1 2-.3a8.27 8.27 0 0 1 5.7 2.3a8.5 8.5 0 0 1 2.4 5.9"/></svg></div><span class="nav-text">SDKs and AI tools</span></a><a href="/errors" class="nav-item "><div class="nav-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M2 16A14 14 0 1 0 16 2A14 14 0 0 0 2 16m23.15 7.75L8.25 6.85a12 12 0 0 1 16.9 16.9M8.24 25.16a12 12 0 0 1-1.4-16.89l16.89 16.89a12 12 0 0 1-15.49 0"/></svg></div><span class="nav-text">Errors</span></a><div class="nav-divider"><hr class="border-sidebar-border my-3"/></div><a href="/partners" class="nav-item "><div class="nav-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M22 8h-1V2h-2v6h-6V2h-2v6h-1a2 2 0 0 0-2 2v6a8.01 8.01 0 0 0 7 7.93V30h2v-6.07A8.01 8.01 0 0 0 24 16v-6a2 2 0 0 0-2-2m0 8a6 6 0 0 1-12 0v-6h12Z"/></svg></div><span class="nav-text">Partner with Paddle</span></a><div class="nav-divider"><hr class="border-sidebar-border my-3"/></div><a href="/changelog" class="nav-item "><div class="nav-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M26 6v2.17l-20.36 3.7a2 2 0 0 0-1.64 2v4.34a2 2 0 0 0 1.64 2l2.36.35V24a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1.26l6 1.09V26h2V6Zm-8 18h-8v-3.07l8 1.45ZM6 18.17v-4.34l20-3.63v11.6Z"/></svg></div><span class="nav-text">Changelog</span></a></nav></div><div class="nav-toggle-wrapper"><hr class="border-sidebar-border"/><div class="p-4"><button class="nav-toggle-btn nav-toggle-active" data-tooltip="Expand on hover" aria-label="Expand on hover"><div class="nav-icon-wrapper"><svg focusable="false" preserveAspectRatio="xMidYMid meet" fill="currentColor" width="16" height="16" viewBox="0 0 32 32" aria-hidden="true" class="h-4 w-4" xmlns="http://www.w3.org/2000/svg"><path d="M28,4H4C2.9,4,2,4.9,2,6v20c0,1.1,0.9,2,2,2h24c1.1,0,2-0.9,2-2V6C30,4.9,29.1,4,28,4z M10,26H4V6h6V26z M28,26H12v-9h10.2 l-3.6,3.6L20,22l6-6l-6-6l-1.4,1.4l3.6,3.6H12V6h16V26z"></path></svg></div></button></div></div></aside></div><!--astro:end--></astro-island></div><!-- Main Content --><main id="main" class="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)] grid-rows-[1fr_auto]"><div class="kapa-parser-container flex flex-col items-center px-6 py-24 text-center"><img src="/_astro/new-404.D2Bmp819.svg" alt="Page not found" class="mx-auto mb-20 w-full max-w-40 sm:mb-24 sm:max-w-sm"><script>(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event("astro:only"));})();</script><astro-island uid="27Gob2" component-url="/_astro/NotFoundSuggestions.CEQ4trWP.js?dpl=6b0058b419d6a107bf36bcbe" component-export="default" renderer-url="/_astro/client.nSJI_yMW.js?dpl=6b0058b419d6a107bf36bcbe" props="{}" ssr client="only" opts="{&quot;name&quot;:&quot;NotFoundSuggestions&quot;,&quot;value&quot;:&quot;react&quot;}"></astro-island></div><div data-markdown-ignore><div><footer class="border-border border-t px-6"><div class="mx-auto max-w-7xl py-12"><div class="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between"><div class="flex flex-col gap-6"><a href="https://paddle.com" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 827 256" fill="currentColor" class="text-foreground w-22" aria-hidden="true">
  <path d="M0.524902 131.583V124.655C9.00998 124.653 17.147 121.281 23.1468 115.281C29.1467 109.28 32.5183 101.142 32.5203 92.6561H38.924C38.9189 96.8619 39.7427 101.027 41.3483 104.915C42.9539 108.802 45.3097 112.334 48.2812 115.31C51.2526 118.287 54.7814 120.648 58.6658 122.259C62.5502 123.87 66.7141 124.7 70.9194 124.701V131.629C62.4343 131.631 54.2973 135.003 48.2975 141.004C42.2976 147.004 38.926 155.142 38.924 163.628H32.5203C32.5254 159.422 31.7016 155.257 30.096 151.37C28.4904 147.483 26.1346 143.95 23.1631 140.974C20.1917 137.998 16.6629 135.637 12.7785 134.025C8.89407 132.414 4.7302 131.584 0.524902 131.583ZM32.5203 80.6401H87.5521C114.429 80.6401 133.633 99.838 133.633 128.004C133.633 156.169 114.437 175.359 87.5521 175.359H32.5203V256H55.5567V195.843H87.5521C126.205 195.843 156.669 165.376 156.669 128.004C156.669 90.6316 126.205 60.1567 87.5521 60.1567H32.5203V80.6401Z" />
  <path d="M239.346 59.9033C259.566 59.9033 277.484 70.1412 288.744 86.2754V63.9985H311.781V192.002H288.744V169.725C277.199 185.89 259.312 196.097 239.346 196.097C201.455 196.097 169.46 166.146 169.46 128.004C169.46 89.8625 201.455 59.9033 239.346 59.9033ZM239.346 175.614C269.033 175.614 288.744 155.138 288.744 128.004C288.744 100.608 269.295 80.3867 239.346 80.3867C212.723 80.3867 192.496 99.5846 192.496 128.004C192.496 156.424 212.723 175.614 239.346 175.614Z" />
  <path d="M397.015 59.9029C417.242 59.9029 435.16 70.1408 446.421 86.275V0H469.457V192.002H446.421V169.725C435.16 185.89 417.242 196.097 397.015 196.097C359.132 196.097 327.136 166.146 327.136 128.004C327.136 89.8621 359.132 59.9029 397.015 59.9029ZM397.015 175.614C426.963 175.614 446.421 155.392 446.421 128.004C446.421 100.616 426.963 80.3863 397.015 80.3863C370.4 80.3863 350.173 99.5842 350.173 128.004C350.173 156.423 370.4 175.614 397.015 175.614Z" />
  <path d="M557.265 59.9029C577.484 59.9029 595.402 70.1408 606.67 86.275V0H629.706V192.002H606.67V169.725C595.402 185.89 577.484 196.097 557.265 196.097C519.381 196.097 487.386 166.146 487.386 128.004C487.386 89.8621 519.381 59.9029 557.265 59.9029ZM557.265 175.614C587.213 175.614 606.67 155.392 606.67 128.004C606.67 100.616 587.213 80.3863 557.265 80.3863C530.641 80.3863 510.422 99.5842 510.422 128.004C510.422 156.423 530.641 175.614 557.265 175.614Z" />
  <path d="M652.716 192.002V0H675.76V192.002H652.716Z" />
  <path d="M761.011 60.1626C805.291 60.1626 826.534 94.7249 826.534 136.97H715.962C719.541 161.794 737.975 177.929 761.011 177.929C776.882 177.929 789.166 170.754 798.379 156.675H823.209C814.504 176.389 791.729 195.849 761.011 195.849C722.358 195.849 692.41 164.866 692.41 128.009C692.41 91.1532 722.358 60.1626 761.011 60.1626ZM803.497 119.049C803.497 98.0503 785.579 78.0827 761.011 78.0827C737.975 78.0827 719.541 94.2477 715.962 119.049H803.497Z" />
</svg><span class="sr-only">Paddle home</span></a><div class="text-muted-foreground flex flex-wrap gap-4 text-sm"><a href="https://paddlestatus.com/" target="_blank" rel="noopener noreferrer" class="hover:text-foreground inline-flex items-center gap-1.5 transition-colors"><svg width="1em" height="1em" class="text-muted-foreground/50 ml-1 h-2.5 w-2.5 transition-colors" id="paddle-status-icon" aria-hidden="true" data-icon="carbon:circle-solid"><symbol id="ai:carbon:circle-solid" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="currentColor"/></symbol><use href="#ai:carbon:circle-solid"></use></svg>Status</a><a href="https://security.paddle.com/" target="_blank" rel="noopener noreferrer" class="hover:text-foreground transition-colors">Security</a><a href="/changelog" rel="noopener noreferrer" class="hover:text-foreground transition-colors">Changelog</a><a href="/llm-benchmark" rel="noopener noreferrer" class="hover:text-foreground transition-colors">LLM benchmark</a><a href="https://paddle.engineering/" target="_blank" rel="noopener noreferrer" class="hover:text-foreground transition-colors">Blog</a><a href="https://www.paddle.com/contact" target="_blank" rel="noopener noreferrer" class="hover:text-foreground transition-colors">Contact</a></div><div class="flex gap-4"><a href="/changelog.xml" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-foreground transition-colors" title="RSS Feed"><svg width="1em" height="1em" class="h-5 w-5" data-icon="carbon:rss"><symbol id="ai:carbon:rss" viewBox="0 0 32 32"><path fill="currentColor" d="M8 18c-3.3 0-6 2.7-6 6s2.7 6 6 6s6-2.7 6-6s-2.7-6-6-6m0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4s4 1.8 4 4s-1.8 4-4 4m22-4h-2C28 13 19 4 8 4V2c12.1 0 22 9.9 22 22"/><path fill="currentColor" d="M22 24h-2c0-6.6-5.4-12-12-12v-2c7.7 0 14 6.3 14 14"/></symbol><use href="#ai:carbon:rss"></use></svg><span class="sr-only">RSS Feed</span></a><a href="https://god.gw.postman.com/run-collection/29428794-16aca740-3ad6-4c1a-97be-05dbc504b4c3?action=collection%2Ffork&amp;source=rip_markdown&amp;collection-url=entityId%3D29428794-16aca740-3ad6-4c1a-97be-05dbc504b4c3%26entityType%3Dcollection%26workspaceId%3D5ed2587a-f47e-43e0-810c-0c3e782bca12#?env%5BSandbox%5D=W3sia2V5IjoiYmFzZVVybCIsInZhbHVlIjoiaHR0cHM6Ly9zYW5kYm94LWFwaS5wYWRkbGUuY29tIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQifSx7ImtleSI6ImJlYXJlclRva2VuIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoic2VjcmV0In1d" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-foreground transition-colors" title="Run in Postman"><svg width="1em" height="1em" class="h-5 w-5" data-icon="postman"><symbol id="ai:local:postman" viewBox="0 0 128 128"><path fill="currentColor" d="M62.988 1.943c-12.929.2-25.904 4.428-36.925 12.94-27.125 20.953-32.13 59.93-11.176 87.055 20.957 27.123 59.937 32.124 87.058 11.167 27.114-20.952 32.118-59.918 11.172-87.039C100.68 9.96 81.884 1.65 62.988 1.943m28.875 23.139a9.27 9.27 0 0 1 5.586 1.914l-8.068 8.117a1 1 0 0 0-.076.098.83.83 0 0 0-.239.55.83.83 0 0 0 .313.65h.002l6.1 6.1a9.04 9.04 0 0 1-10.028-1.913c-2.586-2.6-3.336-6.504-1.953-9.891 1.383-3.39 4.68-5.605 8.363-5.625m7.12 3.432a8.87 8.87 0 0 1 2.033 5.674 9.15 9.15 0 0 1-2.688 6.464 10 10 0 0 1-1.098.895L92.307 36.7l-.963-.963.265-.265 7.373-6.96zm-.366 4.193a.78.78 0 0 0-.55.031.73.73 0 0 0-.36.426.73.73 0 0 0 .05.559 2.23 2.23 0 0 1-.257 2.328.64.64 0 0 0-.195.488c.004.184.07.36.195.492a.58.58 0 0 0 .414 0 .68.68 0 0 0 .672-.207 3.57 3.57 0 0 0 .465-3.777v.004a.78.78 0 0 0-.434-.344M79.34 39.43a5.6 5.6 0 0 1 3.31 1.226 4.76 4.76 0 0 0-2.681 1.34L57.162 64.701l-4.476-4.476c11.828-11.772 19.06-17.921 23.556-19.936a5.6 5.6 0 0 1 3.098-.86zm3.965 2.96a2.9 2.9 0 0 1 2.043.844 2.8 2.8 0 0 1 .879 2.121 2.87 2.87 0 0 1-.985 2.07l-24.25 21.106-2.617-2.617 22.887-22.68a2.9 2.9 0 0 1 2.043-.843zm2.994 6.698c-1.69 6.702-10.647 15.783-19.987 24.607l-3.777-3.773zM51.367 61.547l.274.27 3.513 3.513-9.63 2.06zm5.793 5.84.004.004 1.168 1.195.018.084.078.012.248.254.82.84-5.385.66zm3.867 4.076 3.578 3.576A127 127 0 0 1 38.75 91.695a1.44 1.44 0 0 0-.777 1.653l1.035 4.5a.31.31 0 0 1 0 .363.31.31 0 0 1-.414 0l-6.102-6.152L51.3 72.975zm-29.933 21.94.869.814 4.492 4.492-10.016-.648 4.655-4.659z"/></symbol><use href="#ai:local:postman"></use></svg><span class="sr-only">Run in Postman</span></a><a href="https://github.com/paddlehq" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-foreground transition-colors" title="GitHub"><svg width="1em" height="1em" class="h-5 w-5" data-icon="carbon:logo-github"><symbol id="ai:carbon:logo-github" viewBox="0 0 32 32"><path fill="currentColor" fill-rule="evenodd" d="M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.7 3.7 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45a3 3 0 0 0 4.08 1.16a2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76a5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7a5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2"/></symbol><use href="#ai:carbon:logo-github"></use></svg><span class="sr-only">GitHub</span></a><a href="https://linkedin.com/company/paddle" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-foreground transition-colors" title="LinkedIn"><svg width="1em" height="1em" class="h-5 w-5" data-icon="carbon:logo-linkedin"><symbol id="ai:carbon:logo-linkedin" viewBox="0 0 32 32"><path fill="currentColor" d="M26.2 4H5.8C4.8 4 4 4.8 4 5.7v20.5c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V5.7c0-.9-.8-1.7-1.8-1.7M11.1 24.4H7.6V13h3.5zm-1.7-13c-1.1 0-2.1-.9-2.1-2.1s.9-2.1 2.1-2.1c1.1 0 2.1.9 2.1 2.1s-1 2.1-2.1 2.1m15.1 12.9H21v-5.6c0-1.3 0-3.1-1.9-3.1S17 17.1 17 18.5v5.7h-3.5V13h3.3v1.5h.1c.5-.9 1.7-1.9 3.4-1.9c3.6 0 4.3 2.4 4.3 5.5v6.2z"/></symbol><use href="#ai:carbon:logo-linkedin"></use></svg><span class="sr-only">LinkedIn</span></a><a href="https://twitter.com/PaddleHQ" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-foreground transition-colors" title="Twitter"><svg width="1em" height="1em" class="h-5 w-5" data-icon="carbon:logo-x"><symbol id="ai:carbon:logo-x" viewBox="0 0 32 32"><path fill="currentColor" d="M18.234 14.162L26.977 4h-2.072l-7.591 8.824L11.25 4H4.258l9.169 13.343L4.258 28H6.33l8.016-9.318L20.75 28h6.993zm-2.837 3.299l-.93-1.329L7.078 5.56h3.182l5.964 8.532l.93 1.329l7.753 11.09h-3.182z"/></symbol><use href="#ai:carbon:logo-x"></use></svg><span class="sr-only">Twitter</span></a><a href="https://youtube.com/@PaddleHQ" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-foreground transition-colors" title="YouTube"><svg width="1em" height="1em" class="h-5 w-5" data-icon="carbon:logo-youtube"><symbol id="ai:carbon:logo-youtube" viewBox="0 0 32 32"><path fill="currentColor" d="M29.41 9.26a3.5 3.5 0 0 0-2.47-2.47C24.76 6.2 16 6.2 16 6.2s-8.76 0-10.94.59a3.5 3.5 0 0 0-2.47 2.47A36 36 0 0 0 2 16a36 36 0 0 0 .59 6.74a3.5 3.5 0 0 0 2.47 2.47c2.18.59 10.94.59 10.94.59s8.76 0 10.94-.59a3.5 3.5 0 0 0 2.47-2.47A36 36 0 0 0 30 16a36 36 0 0 0-.59-6.74M13.2 20.2v-8.4l7.27 4.2Z"/></symbol><use href="#ai:carbon:logo-youtube"></use></svg><span class="sr-only">YouTube</span></a></div></div><div class="lg:w-md"><astro-island uid="ZKbUrh" component-url="/_astro/newsletter.Isp-lDz8.js?dpl=6b0058b419d6a107bf36bcbe" component-export="NewsletterForm" renderer-url="/_astro/client.nSJI_yMW.js?dpl=6b0058b419d6a107bf36bcbe" props="{}" ssr client="only" opts="{&quot;name&quot;:&quot;NewsletterForm&quot;,&quot;value&quot;:&quot;react&quot;}"></astro-island></div></div></div></footer><footer class="border-border border-t px-6"><div class="mx-auto max-w-7xl py-4"><div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div class="text-muted-foreground flex gap-4 text-xs"><a href="https://paddle.com/legal/privacy" target="_blank" rel="noopener noreferrer" class="hover:text-foreground transition-colors">Privacy policy</a><a href="https://paddle.com/legal/terms" target="_blank" rel="noopener noreferrer" class="hover:text-foreground transition-colors">Terms</a><button type="button" data-iubenda-open-preferences class="hover:text-foreground cursor-pointer transition-colors">Manage cookies</button></div><p class="text-muted-foreground text-xs">Paddle.com Market Ltd. © 2012–2026</p></div></div></footer></div><script type="module">(function(){try{var e=typeof window<`u`?window:typeof global<`u`?global:typeof globalThis<`u`?globalThis:typeof self<`u`?self:{};e.SENTRY_RELEASE={id:`7abf5d27c432a89df778c632b3442f035c0185ef`};var t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]=`e2c0e660-2dce-45f7-975c-1ff38e24261c`,e._sentryDebugIdIdentifier=`sentry-dbid-e2c0e660-2dce-45f7-975c-1ff38e24261c`)}catch{}})();var e=`https://paddlestatus.com/api/v1/summary`;async function t(){try{let t=await fetch(e);return t.ok?(await t.json())?.ongoing_incidents??[]:[]}catch{return[]}}var n=3e5,r=null,i=0,a=null;function o(){return r!==null&&Date.now()-i<n}function s(e,t){let n=document.getElementById(e);n&&(n.classList.remove(`text-muted-foreground/50`),n.classList.remove(`text-destructive`),n.classList.remove(`text-success-foreground`),n.classList.add(t?`text-destructive`:`text-success-foreground`))}function c(){return a||(a=t().then(e=>(r=e.length>0,i=Date.now(),r)).catch(()=>r??!1).finally(()=>{a=null}),a)}async function l(e){if(r!==null){if(s(e,r),o())return;s(e,await c());return}s(e,await c())}var u=!1;function d(e){l(e),!u&&(u=!0,document.addEventListener(`astro:after-swap`,()=>{l(e)}))}d(`paddle-status-icon`),document.addEventListener(`click`,e=>{let t=e.target;t instanceof Element&&t.closest(`[data-iubenda-open-preferences]`)&&window._iub?.cs?.api?.openPreferences?.()});</script></div></main><div data-astro-transition-persist="ai-panel" class="contents" data-markdown-ignore><astro-island uid="Hs7p3" component-url="/_astro/KapaPanelShell.Be5-s0Ip.js?dpl=6b0058b419d6a107bf36bcbe" component-export="KapaPanelShell" renderer-url="/_astro/client.nSJI_yMW.js?dpl=6b0058b419d6a107bf36bcbe" props="{}" ssr client="only" opts="{&quot;name&quot;:&quot;KapaPanelShell&quot;,&quot;value&quot;:&quot;react&quot;}"></astro-island></div></div></div><script id="iubenda-config-script">
      var _iub = _iub || [];
      _iub.csConfiguration = {
        ccpaAcknowledgeOnDisplay: true,
        consentOnContinuedBrowsing: false,
        countryDetection: true,
        enableCcpa: true,
        invalidateConsentWithoutLog: true,
        lang: "en",
        perPurposeConsent: true,
        siteId: 2245752,
        cookiePolicyId: 83216669,
        cookiePolicyUrl: "https://www.paddle.com/legal/privacy",
        privacyPolicyUrl: "https://www.paddle.com/legal/privacy",
        floatingPreferencesButtonDisplay: false,
        banner: {
          acceptButtonCaptionColor: "white",
          acceptButtonColor: "#1c1a15",
          acceptButtonDisplay: true,
          backgroundColor: "#fbfaf9",
          closeButtonRejects: true,
          customizeButtonCaptionColor: "#7e765d",
          customizeButtonColor: "#ebe7df",
          customizeButtonDisplay: true,
          position: "float-bottom-right",
          rejectButtonCaptionColor: "white",
          rejectButtonColor: "#1c1a15",
          rejectButtonDisplay: true,
          textColor: "#1c1a15",
        },
        callback: {
          onConsentRead: function () {
            var isCcpaOptedOut = _iub.cs.api.isCcpaOptedOut();
            var hasConsentForCaptcha = !isCcpaOptedOut;
            var hasConsentForTracking = false;

            var preferences = _iub.cs.api.getPreferences();

            if (preferences && preferences.purposes) {
              hasConsentForCaptcha = !!preferences.purposes["2"];
              hasConsentForTracking = !!preferences.purposes["4"];
            }

            window.dispatchEvent(
              new CustomEvent("iubenda_consent_ready", {
                detail: {
                  hasConsentForCaptcha: hasConsentForCaptcha,
                  hasConsentForTracking: hasConsentForTracking,
                  isCcpaOptedOut: isCcpaOptedOut,
                },
              }),
            );
          },
          onPreferenceExpressedOrNotNeeded: function (preference) {
            dataLayer.push({
              iubenda_ccpa_opted_out: _iub.cs.api.isCcpaOptedOut(),
              iubenda_consent_given_purpose_2: !_iub.cs.api.isCcpaOptedOut(),
            });
            if (!preference) {
              dataLayer.push({
                event: "iubenda_preference_not_needed",
              });
            } else {
              if (preference.consent === true) {
                dataLayer.push({
                  event: "iubenda_consent_given",
                  iubenda_consent_given_purpose_2: true,
                });
              } else if (preference.consent === false) {
                dataLayer.push({
                  event: "iubenda_consent_rejected",
                });
              } else if (preference.purposes) {
                for (var purposeId in preference.purposes) {
                  if (preference.purposes[purposeId]) {
                    dataLayer.push({
                      event: "iubenda_consent_given_purpose_" + purposeId,
                    });
                    if (purposeId === "3") {
                      dataLayer.push({
                        iubenda_consent_given_purpose_3: true,
                      });
                    } else if (purposeId === "4") {
                      dataLayer.push({
                        iubenda_consent_given_purpose_4: true,
                      });
                    } else if (purposeId === "5") {
                      dataLayer.push({
                        iubenda_consent_given_purpose_5: true,
                      });
                    }
                  }
                }
              }
            }
          },
        },
      };
    </script><script id="iubenda-stub-script" src="//cdn.iubenda.com/cs/ccpa/stub.js"></script><script id="iubenda-script" src="//cdn.iubenda.com/cs/iubenda_cs.js"></script><script type="module">(function(){try{var e=typeof window<`u`?window:typeof global<`u`?global:typeof globalThis<`u`?globalThis:typeof self<`u`?self:{};e.SENTRY_RELEASE={id:`7abf5d27c432a89df778c632b3442f035c0185ef`};var t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]=`22a279a9-1f1c-40b6-9657-bdf3f703fa08`,e._sentryDebugIdIdentifier=`sentry-dbid-22a279a9-1f1c-40b6-9657-bdf3f703fa08`)}catch{}})(),document.addEventListener(`astro:before-swap`,e=>{let{newDocument:t}=e;for(let e of document.head.querySelectorAll(`style`))e.textContent?.includes(`iubenda`)&&t.head.append(e);let n=document.getElementById(`iubenda-cs-banner`);n&&t.body.append(n)});</script><script id="gtm-gtag-script">
    // Initialize the data layer for Google Tag Manager (this should be done before the Cookie Solution is loaded)
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }

    // Default consent mode is "denied" for both ads and analytics as well as the optional types, but delay for 2 seconds until the Cookie Solution is loaded
    gtag("consent", "default", {
      ad_storage: "denied",
      analytics_storage: "denied",
      functionality_storage: "denied", // optional
      personalization_storage: "denied", // optional
      security_storage: "denied", // optional
      wait_for_update: 2000, // milliseconds
    });
    // Improve ad click measurement quality (optional)
    gtag("set", "url_passthrough", true);
    // Further redact your ads data (optional)
    // gtag("set", "ads_data_redaction", true);

    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", "GTM-5HSBV9H");
  </script></body></html><script type="module" src="/_astro/404.astro_astro_type_script_index_0_lang.B42BhmDH.js?dpl=6b0058b419d6a107bf36bcbe"></script><script async id="netlify-rum-container" src="/.netlify/scripts/rum" data-netlify-rum-site-id="7110bbc2-cee5-4ea2-94bd-95b357af1e96" data-netlify-deploy-branch="main" data-netlify-deploy-context="production" data-netlify-cwv-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaXRlX2lkIjoiNzExMGJiYzItY2VlNS00ZWEyLTk0YmQtOTViMzU3YWYxZTk2IiwiYWNjb3VudF9pZCI6IjVjMWE3YzllNTUxZTI3MzNjYjQzYmM4MCIsImRlcGxveV9pZCI6IjZiMDA1OGI0MTlkNmExMDdiZjM2YmNiZSIsImlzcyI6Im5ldGxpZnkifQ.sB7M3kr1qt9P4YwlrX5TALGejWdnqYvr4ErTLh7JWUg"></script>
