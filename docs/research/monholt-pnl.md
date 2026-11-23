# Monholt income and expense per app: research for HQ's Sales screen (ASG185)

Started 2026-11-23. Each finding is written as it lands, with its source. Web sources carry the URL that was fetched; disk sources carry the file and line.

The owner's words, 2026-11-23, on HQ's Sales screen:
- "why no like income expense part for each app or something? Research and design properly, because I prohibit patching if its not a fix"
- "Apple ads expense?"
- On the country list: "Why others 25? ... where's the see all? And why the others 25 seem like its taking full instead of like the percentage from total?"

## 1. What HQ has today (read from the code)

- `sales_daily` (hq/migrations/0001_init.sql): one row per app per day: units, refunds, proceeds (estimated USD), the highest US customer price, territories JSON, platforms JSON. Filled from Apple's daily SALES/SUMMARY report (hq/src/worker/sales.ts), non-USD proceeds converted at that day's frankfurter.dev rate (`meta.rates`).
- The parser (hq/src/worker/salesParse.ts) reads `Developer Proceeds`, `Customer Price`, `Customer Currency`, `Currency of Proceeds`, `Units`, `Country Code`, `Device`. It keeps proceeds only; customer price is kept for the US storefront price label. So **what customers paid (gross) and Apple's share are readable from the same report but thrown away today.**
- `x_resources` (0002_x_credit.sql) is a ledger of every billable X resource per UTC day; `src/shared/xCredit.ts` turns it into an estimated USD for the month (`Account.credit`).
- The country list bug, in code: `top()` in hq/src/worker/queries.ts keeps the top 5 and folds the rest into one "Others" row; `Breakdown` in hq/src/ui/sales.tsx scales each bar against the largest single row across both apps (`top = max(...)`), not against the app's total. So "Others 25" is longer than "United States" whenever the long tail outweighs the first country, and no list ever shows the countries inside "Others". Both are fixes, not redesign: bars are a share of the total, and every country is reachable.
- Live HQ on 2026-11-23 (~/Downloads/Claude/monholt-hq/live/hq-sales.jpg), 30 days: Undirect 11 sold, $10.67 proceeds est.; Cutling 4 sold, $14.27.

## 2. Every expense Monholt has, from disk

| Cost | Per app or shared | Amount and cadence | Source on disk | Can HQ read it? |
|---|---|---|---|---|
| Apple Ads Basic, Undirect | Undirect | Campaign 2145080474 created 2026-11-07, served from 2026-11-09. Invoice S514637852: 4 installs Nov 9-13 (ID $0.93, JO $0.60, PH $1.07, IN $0.84) = $3.44, avg $0.86 an install, **invoiced $0.00 (paid by Apple's credit)** | BOARD.md ASG17 (line 78) | Pending: docs/research/apple-ads-api.md (another agent) |
| Apple Ads Basic, Cutling | Cutling | Campaign created 2026-11-16, no spend by 2026-11-18 | BOARD.md ASG17 | same |
| Apple Ads in HQ | both | Owner card: "HQ shows Apple Ads spend (and installs, cost per install) beside App Store sales" | BOARD.md ASG184 (line 31) | the card this design answers together with ASG185 |
| X API pay-per-use | shared (one @monholtco account promotes both apps) | owned reads $0.001 a post, deduplicated per UTC day; about $1 a month at one run a day; no free tier | claude-house-rules/docs/social-check.md line 14 | Yes, estimated: HQ's `x_resources` ledger already prices it. X's console bill is the true figure |
| X Premium | shared | "He buys X Premium for one month himself" (approved 2026-11-21) | memory startup-link-replies-standing-go.md | No: a subscription bill, entered by hand |
| Apple Developer Program | shared by every Apple app on the account (Undirect, Cutling) | yearly fee (amount checked on the web below) | docs/app-store-submission.md names the programme; stya's own book lists "the Apple developer programme" as a company cost (pos/docs/expenses-is-built.md line 7) | No API for the membership charge: entered once, renews yearly |
| matsuokengo.com | Undirect and Cutling (their sites are undirect./cutling.matsuokengo.com) and the owner's own page | Cloudflare Registrar, expires 2027-01-22 (whois, 2026-11-23) | Cutling/docs/website-domain.md (zone id ca38f216...) | Cloudflare Registrar API lists domains and expiry; the charge appears in Cloudflare billing history |
| monholt.com | Monholt (shared) | Cloudflare Registrar, expires 2027-11-01 (whois) | hq brief | same |
| tolk.id | Tolk | PT Registrasi Neva Angkasa (an Indonesian .id registrar), expires 2027-11-05 (whois) | | No API: by hand |
| solute.id | stya | same registrar, expires 2028-07-29 (whois) | | by hand, and already in stya's own books |
| stya.app | stya | whois did not answer for .app on 2026-11-23 | | |
| Cloudflare (HQ, sites, Access, D1, KV) | shared | Free plan by design ("It runs free on Cloudflare") | monholt-hq-build-brief.md | $0; Cloudflare `billing/history` would show any charge (stya reads it already) |
| GitHub Pages for both app sites | Undirect, Cutling | free | Cutling/docs/website-domain.md | $0 |
| Paid directory listings and launch boosts | per app | **None bought**: MacNative Launch Boost $15 "Not bought", NativeShelf Premium EUR 9 "Not bought", Mac App Index $9.99 paid only; SourceForge, Fazier, Microlaunch, StartupBase "skipped: money" | plans/app-store-growth/directory-actions.md lines 40-52; dr-links.md line 94 | n/a until one is bought; then by hand |
| Product Hunt (Cutling, Nov 24), TinyLaunch, PostYourStartup | per app | free launches | BOARD.md ASG65, inbox-actions.md lines 22-27 | $0 |
| Sound and voice tools | | ElevenLabs ruled out for SFX (no commercial licence on free plan); no paid tool found bought | research/sfx-for-claude.md | none |
| Black Friday sale | per app, a lower price, not an expense | Nov 27-30: Undirect $0.99 (list $1.99), Cutling $2.99 (list $4.99) | memory black-friday-sale-2026.md | shows as lower income per unit, already in the sales report |

Not found on disk as a Monholt cost, so the owner is asked rather than told: what he pays for Claude, any font or stock licence, the bank's fee on Apple's payment, and his Indonesian income tax. The company book in pos/docs/expenses-is-built.md is **Solute's**, a separate business with two co-owners that shares the pos codebase and database; it is not stya's. stya is wholly Monholt's (the owner, 2026-11-23: "monholt is me and I am monholt ... STYA IS NOT SOLUTE"), so stya's income and costs count in full in HQ, read from pos rows of the stya brand only.

### stya's expense book is the house prior art (pos/docs/expenses-is-built.md)

Built 2026-09-21 from a study of Invoice Ninja, Firefly III, Wallos and Spliit:
- An expense keeps the currency it was printed in, the rate, and the converted amount; and a second figure, **what the bank took** (US$25.00 billed became Rp451.548,13 at the bank against Rp439.850,00 at Kurs Pajak).
- A **subscription is its own row** (what is expected, with a min and max; from Firefly III) and each charge links to it, so a missed or dearer bill shows up; next-due dates from Wallos.
- Vendor APIs land in a pulled-charges table, **never straight in the book**: Cloudflare `billing/history` (charges, no file), Anthropic `cost_report` (daily USD usage). Supabase and Rumahweb have no API: upload or mail.
- Receipts are read in the browser (pdf.js, Tesseract), no paid OCR (owner: "I ain't paying for shit").

What HQ takes from it: currency kept with its rate; a recurring cost as one row that makes its charges; pulled charges kept apart from typed ones. What HQ leaves: receipts, PPN, Kurs Pajak and ten-year retention are tax bookkeeping for a company with co-owners; Monholt HQ is a one-person view of whether each app earns more than it costs.

## 3. How the best tools show income against expense

(web findings below, one per source, written as they land)

### 3.1 Apple: proceeds, the monthly financial report, the payment, the delay

- **Payment timing.** Apple: "payments are made to the bank account and the currency you provided within 45 days of the last day of the fiscal month in which the transaction was completed"; one consolidated payment per fiscal month per currency; Apple's bank converts to the bank account's currency at "typically the spot rate on the date of payment"; "Payments may be subject to bank fees ... reducing the amount that's deposited". Financial reports for a fiscal month are out "by the first Friday of the current fiscal month". Only "paid transactions where we are able to collect payment from the customer" count. (https://developer.apple.com/help/app-store-connect/getting-paid/overview-of-receiving-payments, fetched 2026-11-23)
- **Fiscal months are not calendar months** (4-4-5 weeks). RevenueCat's table: fiscal November 2026 = Nov 1-28, paid about Dec 31, 2026; fiscal December 2026 = Nov 29, 2026 - Jan 2, 2027, paid about Feb 4, 2027. Apple pays roughly 33 days after a fiscal month closes; dates are estimates; the official calendar is in App Store Connect. (https://www.revenuecat.com/blog/growth/apple-fiscal-calendar-year-payment-dates/, https://adapty.io/apple-fiscal-calendar/)
- **HQ can read the monthly financial report with the key it already has.** `GET https://api.appstoreconnect.apple.com/v1/financeReports` with `filter[reportType]=FINANCIAL|FINANCE_DETAIL`, `filter[regionCode]`, `filter[reportDate]=YYYY-MM` (Apple fiscal month), `filter[vendorNumber]`; gzip TSV like the sales report. (https://developer.apple.com/documentation/appstoreconnectapi/get-v1-financereports, read in Chrome 2026-11-23). Its fields: Quantity, Partner Share, Extended Partner Share, Partner Share Currency, Customer Price ("inclusive of taxes Apple collects and remits"), Country of Sale, Sale or Return; the Detailed report adds Settlement Date. **No exchange rate and no paid amount in it.** (https://developer.apple.com/help/app-store-connect/reference/financial-report-fields). The key's role must allow Finance reports: not checked yet (the key reads sales today).
- **What reaches the bank is only on the Payments page**: per region units, earned, taxes and adjustments, the exchange rate applied and "the total proceeds owed to you, displayed in your bank account's currency" (https://developer.apple.com/help/app-store-connect/getting-paid/view-payments-and-proceeds). No API. So the paid figure is typed by hand, or read off the bank.
- **US tax withholding on app sales by a non-US developer**: Apple's model as quoted on its forums: "application sales by non-U.S. developers ... are not subject to U.S. tax withholding or reporting" (https://developer.apple.com/forums/thread/29204). Forum quote, not an Apple help page: UNSURE, but it means the gap between Apple's figure and the bank is FX plus bank fees, not a tax line.

### 3.2 RevenueCat: four definitions of revenue, and why its figures never match Apple's payment

- Revenue chart has a switch between **Revenue** (net of refunds), **Revenue (net of taxes)**, **Proceeds** ("RevenueCat's estimate of what you will earn from the stores": minus estimated taxes and store commission) and **Gross revenue before refunds**. In Charts v3 "a refund reduces revenue in the period it was processed" and "does not retroactively change prior periods". The chart has no ad spend and no costs. (https://www.revenuecat.com/docs/dashboard-and-metrics/charts/revenue-chart)
- Reconciling: five named reasons RevenueCat differs from Apple's financial report: settlement vs transaction date, the fiscal calendar, FX (RevenueCat converts at the purchase date, Apple's bank near the payout), estimated tax and commission, and refund timing. Verdict: "Use RevenueCat for trends and forecasting, and use Apple's financial reports for payouts and accounting." (https://www.revenuecat.com/docs/dashboard-and-metrics/reconciling-with-financial-reports)
- What HQ takes: the waterfall **customer paid -> Apple and taxes -> proceeds** is the honest way to show where a $1.99 goes, and HQ's daily report already holds both ends (Customer Price, Developer Proceeds). HQ shows daily figures as "estimated" and lets the monthly report replace them, the way RevenueCat sends accounting to Apple's report.

### 3.3 Appfigures: Estimated, Actual, Paid

- The Payments report sets three columns side by side per fiscal month: **Estimated** (from Apple's Daily report), **Actual** (from the Financial report, about two weeks after the fiscal month), **Paid** (from the Payments report, about five weeks after). iOS columns "snap to Apple's fiscal calendar". Example January: Estimated $4,097.81, Actual $4,093.08, Paid $4,089.75. (https://help.appfigures.com/en/article/comparing-revenue-from-the-payments-report-to-the-sales-report-1xkhhjl/, https://appfigures.com/support/kb/516/the-payments-report)
- What HQ takes: **the same money has three states as time passes**, and a month row says which one it shows. HQ's month moves from estimated (daily reports) to confirmed (financial report via API) to paid (typed, with the bank's amount). This answers "Proceeds stay estimates until the monthly finance report" with a visible state instead of a sentence.

### 3.4 Ad spend beside revenue: Superwall, RevenueCat, AppSprint

- Superwall's ROAS chart: return is "proceeds cohorted by install date" divided by ad spend; spend from connected Meta, Google and Apple Search Ads accounts; defaults to a breakdown by campaign; daily buckets "read close to zero", so weekly is the default. (https://superwall.com/docs/dashboard/charts/roas.md)
- RevenueCat has no native spend chart; its Apple Search Ads integration attributes purchases to campaigns, and spend needs a separate Apple Ads reporting connection; spend and revenue "may use different currencies or conversion methods. Normalize before calculating" (https://www.revenuecat.com/docs/integrations/attribution/apple-search-ads, https://appsprint.app/blog/apple-search-ads-revenuecat-roas).
- What HQ takes: Apple Ads spend sits on the same app row as that app's proceeds, in the same currency, for the same period. HQ cannot attribute sales to the ad (Basic gives no API and no attribution to HQ), so it shows **installs bought and cost per install** from the invoice beside units sold, and never claims a ROAS. Apple Ads Basic has no API (docs/research/apple-ads-api.md): invoice or CSV by hand, or switch to Advanced for a free daily API.

### 3.5 Open-startup and running-cost pages

- Simple Analytics /open: revenue first (MRR, expected revenue this month), then a "Profit" chart with monthly expenses and revenue since October 2019; current month is an estimate; mixed currencies are summed as a "unified currency" without conversion. (https://dashboard.simpleanalytics.com/open)
- Cushion /running-costs: one table, a row per service: Name, Service, Purpose, Cost in its own billing period ("$15/year", "$25/month", one-time "$1,900.00"), Total paid to date. Yearly costs are **not** turned into monthly. (https://cushionapp.com/running-costs)
- Tailscan /open lists the services that keep it running and says plainly which are left out: "Other costs that are variable and/or partial are not included". It stopped publishing figures because competitors used them. (https://tailscan.com/open, read in Chrome)
- open-expenses list (https://github.com/jmstfv/open-expenses): about 22 businesses that publish costs.
- What HQ takes: **a cost list is a short table of the things you pay for, each in its own cadence and currency, with what it has cost so far**; the period view then shows what fell in that period. Partial or doubtful costs are named, not guessed.

### 3.6 Personal and small-business money views

- Monarch Cash Flow: "total income earned, total money spent, and the difference between those two numbers" plus a savings rate in a summary card; bar chart or Sankey "from one state (income) to another (expenses)"; grouped by category, group or merchant; monthly, quarterly or yearly; filters by account or tag. (https://help.monarch.com/hc/en-us/articles/20504904768020-Cash-Flow, read in Chrome). A business-entity grouping exists for business users (search summary of Monarch help, not read directly).
- QuickBooks Profit and Loss by Class puts each class (product line) in a column, and whatever has no class lands in an **Unclassified** column at the far right; QuickBooks has no built-in overhead allocation (Intuit community answers via search, 2026-11-23).
- Managerial accounting on product lines (OpenStax Principles of Managerial Accounting 10.4; Lumen "Segment analysis"): costs traceable to a segment are charged to it; **common costs are not allocated** for judging a segment, because "virtually any allocation scheme is potentially arbitrary" and an allocation can make a line with a positive contribution look like a loss. Segment margin = contribution minus traceable costs; common costs are subtracted once, in the total. Allocation is fair only where a causal link exists. (https://openstax.org/books/principles-managerial-accounting/pages/10-4-evaluate-and-determine-whether-to-keep-or-discontinue-a-segment-or-product, https://courses.lumenlearning.com/suny-managacct/chapter/segment-analysis/)
- What HQ takes: **each app shows what it earned minus what is traceable to it** (its Apple Ads, its paid listings, its own domain if it has one). Shared costs (developer program, X, monholt.com) are one "Shared" column, subtracted once in Monholt's total, like QuickBooks' Unclassified. No split by sales share: with Undirect at about $10 and Cutling at about $14 a month, a $99 fee split by revenue would swing by app every month and say nothing.

### 3.7 Where the sales come from, every country reachable

- Plausible's Locations card (live demo, 30 days, read 2026-11-23): Countries tab shows the top nine countries with a flag, a pale bar behind each row scaled to the first row, and the visitor count; **no "Others" row**. An expand icon opens a modal titled "Countries" with a search box, every country sorted by visitors, and columns for visitors, bounce rate and duration; the share of the total (e.g. "2.2%") shows beside the count on hover; the modal has its own URL (/countries). Saved: ~/Shared/inspo/monholt-pnl/shots/plausible-countries-card.jpg, plausible-countries-all.jpg.
- What HQ takes: the card shows the top rows and a **"All 38 countries"** row that opens the full list (sheet on the phone, panel on the desk) with each country's units and its **share of the app's total**. Bars measure the share of that app's total units (0-100%), so a long tail never draws longer than a real country. "Others" disappears; if a remainder row is kept on the card, its bar is its own share (e.g. 25 of 98 = 26%).

### 3.8 Apple's payment threshold and balances (matters at Monholt's size)

- Minimum payment: an Indonesian bank account in IDR must exceed **0.02 USD**; "All other bank countries or regions and bank account currencies must exceed a minimum payment threshold of 40 USD" (so an Indonesian account held in USD, if it is not in Apple's table, waits until $40). (https://developer.apple.com/help/app-store-connect/reference/reporting/minimum-payment-threshold)
- Unpaid amounts carry forward: the Payments page's **Balance** "consists of any amounts not paid out from previous months, or amounts returned"; "The payment date displayed ... is the date the payment leaves Apple's bank." (https://developer.apple.com/help/app-store-connect/reference/payment-information)
- For HQ: a fiscal month can be **held** (below threshold, carried into the next payment). The payments strip needs that state. Which currency his bank account is in decides it: asked, not guessed.

### 3.9 HQ's own data, read 2026-11-23 (D1, read-only)

- Months stored: Oct 2026 (6 days) and Nov 2026 (21 days); the year backfill is still running (coordinator, 2026-11-23).
- Oct: Undirect 29 units at **$0.00 proceeds** (the "Free for a limited time" promotion an Arabic Apple-deals account posted, ASG18), Cutling 1 unit $2.19. Nov to the 21st: Undirect 15 units $16.10, Cutling 4 units $14.27.
- So **a unit is not always a sale**: free downloads during a free promotion land in the same report with proceeds 0. The income view counts paid units and shows free downloads apart.
- Countries, 30 days to 22 Nov: Undirect 44 units over **23 countries**, the first (US) only 5 units (11%); Cutling 5 units over 5 countries. The tail outweighs any country, which is why "Others" drew longest.

## 4. Periods: windows for units, Apple's months for money (owner's questions, 2026-11-23)

The owner asked: "Why sale and downloads not separated? Why not considering previous prices?", "Why the graph not show the comparison between sales and just free downloads?", "why the proceeds are estimation? I want accurate!", "you think last 7 days, 30 days, and year makes sense if that finance is capped like that?", and, showing App Store Connect Trends (1D / 7D / 2W / 5W / 13W / 26W; Units, Proceeds, Sales cards with total, change against the previous period, daily average, daily bars): "But I can see window here tho?"

- **Apple keeps two tools for exactly this split.** Sales and Trends "estimates sales and proceeds in USD using a rolling average of previous month's exchange rates"; "Payments and Financial Reports finalize payments using the exchange rate applied to convert each report's currency to your bank account's currency". Transactions "may not appear in Sales and Trends Reports until the customer's payment is processed ... possibly in the following fiscal month", and "transactions without collected payments don't appear in financial reports". (https://developer.apple.com/help/app-store-connect/measure-app-performance/differences-in-reporting-tools/, fetched 2026-11-23)
- **Appfigures** snaps its Payments report to Apple's fiscal calendar and offers a "Financial" granularity in its sales report "to align data with Apple's financial and payment reports" (section 3.3).
- **RevenueCat** tells developers to set the Revenue chart "to the custom date range of the fiscal month" to compare with Apple, and to use Apple's reports "for payouts and accounting" (section 3.2).
- **Monarch** picks monthly, quarterly or yearly for its cash-flow summary; Stripe's balance summary is a month that reconciles like a bank statement (sections 3.6, Stripe docs).
- **Decision for HQ.** Two views on the one Sales screen, as Apple has two tools:
  - **Trends** (windows like App Store Connect: 7D, 2W, 5W, 13W, 26W): paid units and free downloads per day, exact counts, with the price in effect under the bars; proceeds shown only as "est." with Apple's own caveat. Change against the previous window and a daily average, as in Apple's cards.
  - **Money** (Apple's fiscal months, year and all time as sums of months): proceeds from Apple's financial report, exact for every closed month; the open month is the only estimate and is marked; the payment received; costs against it, per app and for Monholt.
- A rolling 30-day window would mix exact and estimated money and costs that bill by calendar month, so money never takes a window.

## 5. The design drawn from this (pictures for the owner's pick, nothing built)

Pictures: ~/Downloads/Claude/monholt-hq/pnl/ (contact sheet pnl-overview.png; every screen at phone and desktop, light and dark). Source: ~/Downloads/Claude/monholt-hq/pnl/src/ (pnl-data.js holds every value drawn; pnl.html draws it; render.mjs shoots it).

- **Sales screen = two views**, as Apple has two tools: **Trends** (windows 1D to 26W over the daily report: sold, free downloads, est. proceeds, change against the window before, price in effect under the bars, countries as shares with every country reachable) and **Money** (Apple's fiscal months; Year and All time as sums; only the open month estimated and marked).
- **Money, three directions** for the owner to pick: A Statement (a column per app plus Monholt, shared costs only in Monholt's column, from QuickBooks P&L by Class and segment-margin accounting); B Earned, spent, kept (HQ's coloured app tiles carry money; from Monarch's summary card); C Where each dollar went (one to-scale bar per app from customers paid to kept; from Monarch's Sankey and Stripe's gross/fee/net).
- **House treatments (ASG188)**: proportion bars are shares of the list total; the lesser series sits translucent behind the main one (all downloads translucent behind paid units, so the visible faint part is free downloads; the open month's money translucent against exact months).
- **A payment provider later** (docs/research/payments-indonesia.md: Midtrans by webhook only, Xendit and Polar by read-only API) slots in as a second income row per app beside "From Apple", with its fees as a line like "Apple and taxes"; the layout does not change.
- After the pick: the build spec (one data file, check script), plan cards with Contexts and Neighbours from design-questions.md, and the mock rebuilt as an HQ route.
