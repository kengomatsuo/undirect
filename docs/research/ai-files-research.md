# What AI assistants, crawlers and agents read on a site (research for ASG44, 2026-11-20)

Built from this into both sites' generators: `web/_generator/ai_files.py` (undirect e2f60dc, Cutling 48c58f32). This page keeps what was read, so the next card (ASG46 AI recommendation, ASG50 SEO) does not read it again.

## Standards and who audits them

| File or signal | Source read | What it says |
|---|---|---|
| `/llms.txt`, page `.md` copies, `rel="alternate" type="text/markdown"`, `rel="describedby"` | https://llmstxt.org/index.md (v2, Aug 2026) | H1, blockquote, markdown without headings, then H2 lists of `[name](url): note`. Markdown copy at page URL + `index.md`. |
| Chrome Lighthouse "Agentic Browsing" category (Chrome 150+) | https://developer.chrome.com/docs/lighthouse/agentic-browsing/scoring (and `.md.txt` of each audit) | Audits: llms.txt (server error fails, 404 is N/A), ARD manifest, WebMCP tools (forms `toolname`/`tooldescription`, `document.modelContext.registerTool`, origin trial), accessibility for agents, layout stability (CLS). |
| ARD, `/.well-known/ard.json`, `Agentmap:` in robots.txt, `rel="ard"` | https://agenticresourcediscovery.org/spec/ §4.2, §5.1; conformance tool https://github.com/ards-project/ard-spec/tree/main/conformance | Entries need `identifier` `urn:air:<domain>:...`, `displayName`, `type`, one of `url`/`data`, 2-5 `representativeQueries`. Standard types are agent resources (skills, MCP server cards, agent cards, registries); `text/plain` and `text/markdown` documents earn warnings (Lighthouse gives 0.9). Predecessor path `/.well-known/ai-catalog.json` is optional for consumers. |
| Agent Skills discovery | https://github.com/cloudflare/agent-skills-discovery-rfc (v0.2.0) and https://agentskills.io/specification.md | `/.well-known/agent-skills/index.json` with `$schema` `https://schemas.agentskills.io/discovery/0.2.0/schema.json`, each skill `name`, `type` (`skill-md` or `archive`), `description`, `url`, `digest` (sha256 of the artifact). SKILL.md frontmatter `name` (lowercase, hyphens) and `description`. |
| Content Signals in robots.txt | https://blog.cloudflare.com/content-signals-policy/ | `Content-Signal: search=yes, ai-input=yes, ai-train=yes` inside a `User-agent` group. |
| AI crawler names | https://github.com/ai-robots-txt/ai.robots.txt `robots.json` (4,264 stars, pushed 2026-11-16) | 209 entries (206 after case-insensitive duplicates), including OpenAI, Anthropic, Perplexity, Google, Apple, Meta, Amazon, Mistral, xAI (GrokBot, xAI-Grok), DeepSeekBot, ByteDance (Bytespider, DoubaoBot, TikTokSpider), Alibaba (QwenBot, TongyiBot), Baidu (ERNIEBot, YiyanBot), Moonshot (KimiBot, Kimi-SearchBot), Tencent (Hunyuan), Huawei (PetalBot, PanguBot), Yandex (YandexAdditional), Naver-adjacent and coding agents (Claude-Code, Codex, Cursor, Devin). |
| Vendor pages for the main tokens | developers.openai.com/api/docs/bots; support.claude.com/en/articles/8896518; docs.perplexity.ai/guides/bots; developers.google.com/crawling/docs/crawlers-fetchers; support.apple.com/en-us/119829; developers.facebook.com/docs/sharing/webmasters/web-crawlers; developer.amazon.com/amazonbot; docs.mistral.ai/robots; commoncrawl.org/ccbot | Training tokens: GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, meta-externalagent, Amazonbot, MistralAI-Training, CCBot. Anthropic honours the IETF aipref "no AI training" signal from 2026-10-30; Google plans `user-agent: __usage_ai-training` in early 2027. |

## Who serves what (curl of 30 sites, 2026-11-20)

Sites: anthropic, claude, openai, vercel, stripe, cloudflare (www and developers), raycast, linear, supabase, mintlify, shopify, agenticresourcediscovery.org, sindresorhus, usekumiko.app, hypertilemac.com, 1blocker, pasteapp.io, cleanshot, kagi, 1password, setapp, notion, x.ai, perplexity, docs.github.com, nextjs, bun.sh, astro.build, framer.

| Path | Sites serving it (200, not HTML) |
|---|---|
| /llms.txt | 18, including pasteapp.io (Paste, Cutling's main rival) and setapp.com |
| /.well-known/security.txt | 16 |
| /llms-full.txt | 9 |
| /index.md | 6 |
| /pricing.md | 5 |
| /.well-known/ai-catalog.json | 5 (vercel, supabase, cloudflare docs, notion, nextjs) |
| /.well-known/mcp/server-card.json | 3 |
| /humans.txt | 3 |
| /.well-known/ard.json | 2 (supabase, developers.cloudflare.com) |
| /.well-known/mcp.json, /.well-known/agent.json, /agents.json | 2, 1, 1 (cloudflare) |
| /ai.txt, /AGENTS.md, /.well-known/llms.txt, /.well-known/tdmrep.json, /.well-known/ai-plugin.json, /.well-known/agent-card.json, /llms-ctx.txt | 0 |

Shipped indie app examples read in full: usekumiko.app and hypertilemac.com (llms.txt key facts, pages, comparisons; robots.txt naming ~13 AI bots as allowed), 1blocker.com/llms.txt (one rich file: key facts, privacy, features, pricing, compatibility, FAQ), sindresorhus.com (Content-Signal all yes), ia.net (Content-Signal ai-train=no, training bots disallowed).

## Not built, and why

- WebMCP tools: neither site has a form or an action an agent would run; the API needs an origin trial token.
- MCP server card, A2A agent card: no MCP server or agent exists to describe.
- `Link:` HTTP headers and `Accept: text/markdown` negotiation: GitHub Pages cannot set headers.
- ai.txt, tdmrep.json, humans.txt: no site in the survey's niche serves them, and allow-all needs no reservation file.

## Found on the way, for ASG50

- matsuokengo.com (repo ~/Repositories/kengomatsuo, behind Cloudflare's proxy): `/llms.txt` and `/sitemap.xml` both return 200 with the same 58,945-byte body, the home page HTML, so a crawler gets a soft 404 for each; robots.txt is `User-agent: * / Allow: /` with no sitemap line [read: curl 2026-11-20].
- IndexNow answered HTTP 403 for Undirect's 153 URLs after the 2026-11-20 deploy [read: web/deploy.sh web output].
- The owner has Google Search Console open on the matsuokengo.com property [read: owner screenshot 2026-11-20].
