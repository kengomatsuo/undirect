# Stripe-like payments for Monholt HQ (card ASG186)

Fetched 2026-11-23. Private research: public copy never names the owner's country. Saved copies of every source are in `/Users/hafang/Repositories/undirect/docs/research/payments-indonesia-sources/`; `notes.md` there maps source number to file, and the `S` numbers below are its row numbers. Pricing, plan and region pages were read in Claude in Chrome, not through a plain fetch.

## Answer

The owner's premise is half out of date. Stripe is not closed to Indonesia any more, but what is open is useless to him.

1. **Midtrans works for him as an individual.** KTP plus NPWP is enough, and the individual column of Midtrans's own table includes cards (Visa, Mastercard, JCB), QRIS, GoPay, ShopeePay and most virtual accounts. Foreign cards are accepted. Everything is charged in rupiah only, and PayPal and Apple Pay are not documented. stya already runs on it (below).
2. **Xendit does not take individuals.** Its help centre says so, and cards are "enterprises and non-individuals only". It also has a USD 50 minimum monthly fee that would exceed stya's whole collection cost many times over. A PT or CV could open it; he cannot as a sole maker.
3. **Stripe in Indonesia is invite-only ("Preview") and domestic only.** An Indonesian Stripe account takes IDR bank-transfer virtual accounts only and cannot do international transactions. To get Stripe cards, Apple Pay and Billing he would need a US company; Atlas costs $500, which Stripe offsets with a $500 deposit when he opens a Treasury account within 7 days, so year one is about $0 and later years are about $325 of Delaware and agent fees plus US tax filings and an accountant, and the Indonesian tax effect is unresearched.
4. **A merchant of record is the real "Stripe-like" answer for buyers abroad, and it pays an Indonesian.** Polar, Paddle, Gumroad, Creem and Dodo all list Indonesia. Lemon Squeezy closed to new sign-ups on 2026-11-16 and shuts down on 2027-03-31. Fees run 3.9% + 40c to 10% + 50c.
5. **HQ can read all of the real candidates without a server of its own.** Midtrans only by webhook (there is no ordinary list API), the others by a read-only key from a cron Worker.

Recommended pick, per business:

| Business | Pick | Why in one line |
|---|---|---|
| stya subscriptions from Indonesian venues | Stay on Midtrans (QRIS below Rp 571.429, virtual account above) | Already built; cheapest per invoice; Xendit's USD 50 minimum and individual ban rule it out; HQ should read stya's own settled invoices, not Midtrans |
| Selling to buyers abroad | If a direct-sale product ever exists: Polar first, Creem or Dodo if fees matter more than documented payout path. Do not move Undirect or Cutling off the App Store | Fixed 40-50c per sale is 30% or more of what those two apps net; HQ already reads Apple |
| Invoicing client work | Bank transfer, with Midtrans Payment Link or Invoicing only if a client wants QRIS or a virtual account | No merchant of record takes services; foreign-client invoicing is not covered by anything researched (UNSURE, open question 2) |

## Findings, with the constraint quoted

### Midtrans

| # | Finding | URL | Saved file |
|---|---|---|---|
| M1 | Fees per successful sale: bank transfer or virtual account IDR 4,000; GoPay 2%; QRIS 0.7%; ShopeePay 2%; DANA 1.5%; OVO 1.5%; card 2.9% + IDR 2,000; Indomaret/Alfamart IDR 5,000. "Setting up is free". Fees exclude VAT "except for QRIS, GoPay, and ShopeePay". An older blog block on the same page says ShopeePay 1.5%: the table (2%) is the newer figure. Digital and gaming merchants "are subject to different rates": UNSURE whether apps or SaaS count. | https://midtrans.com/pricing (S1) | midtrans-pricing.txt |
| M2 | VAT works as 11% of the fee: on a Rp 100,000 sale paid by bank transfer the fee is Rp 4,440 and he nets Rp 95,560. Fees are deducted at withdrawal. | https://docs.midtrans.com/docs/how-much-does-midtrans-charge-for-its-payment-service (S23) | midtrans-fees.md |
| M3 | Individuals: "Individual: Owner's ID (KTP), NPWP". Starter pack (bank transfer, GoPay, QRIS) needs KTP; "+ Card Payment" adds NPWP. Companies add deeds, SK Menkeh, NIB/SIUP/TDP. So NIB is not needed for an individual. | https://docs.midtrans.com/docs/what-are-the-legal-documents-required-for-midtrans-account-registration (S2) and https://midtrans.com/passport (S3) | midtrans-legal-documents.md ; midtrans-passport.txt |
| M4 | Midtrans's own table (image, read by eye): Individual gets card payment, BNI, BRI, Mandiri bill, Permata, GoPay, ShopeePay, QRIS, Alfamart, Akulaku, Kredivo. Individual does not get BCA virtual account, Indomaret, BCA KlikPay, OCTO Clicks, Danamon, BRImo, UOB. Card activation: "wait for further updates within 10 working days". | https://docs.midtrans.com/docs/differences-in-available-payment-methods-between-individuals-and-business-entities (S4) | midtrans-individual-vs-entity-table.png ; midtrans-passport.txt |
| M5 | Website: price must show "in IDR or Rupiah"; an App Store or Play Store link, Instagram or marketplace page is accepted. Catalog-only submissions can accept only bank transfer, QRIS and GoPay. | https://docs.midtrans.com/docs/what-are-the-website-or-application-criterias-for-registering-a-midtrans-account (S7) and https://docs.midtrans.com/docs/do-i-have-to-have-a-website-to-activate-my-midtrans-account (S8) | midtrans-website-criteria.md ; midtrans-no-website.md |
| M6 | Foreign buyers: "Yes, you can receive payments from a foreign issuing bank". Currency: "Midtrans currently only processes transactions in Indonesian Rupiah". You convert at checkout and send IDR; a USD card is converted by the card network. Foreign bank transfers into a VA can bounce if non-real-time. | https://docs.midtrans.com/docs/can-i-receive-payments-from-a-foreign-issuing-bank (S5) and https://docs.midtrans.com/docs/can-i-receive-payments-using-other-currency-than-idr (S6) | midtrans-foreign-cards.md ; midtrans-other-currency.md |
| M7 | Wallets: Google Pay exists ("currently only payment using cards is available in Indonesia"). No Apple Pay and no PayPal appears anywhere in Midtrans's doc index or method pages I saved (absence only: UNSURE). | https://docs.midtrans.com/reference/payment-method-google-pay (S21) | midtrans-google-pay.md ; midtrans-llms.txt |
| M8 | Recurring: "One click / recurring / subscription needs additional bank's approval and agreement". The first charge must succeed "in 3DS mode". Subscription API: "Currently only credit_card and gopay are supported" (GoPay by token). No QRIS or virtual-account auto-charge. | https://docs.midtrans.com/docs/one-click-two-clicks-and-recurring-transaction (S9) and https://docs.midtrans.com/reference/create-subscription (S10) | midtrans-recurring.md ; midtrans-create-subscription.md |
| M9 | Payment Link: "no technical integration is required", shareable by WhatsApp or email; also creatable by API. | https://docs.midtrans.com/docs/introduction-to-payment-link (S19) and https://docs.midtrans.com/docs/payment-link-via-api (S20) | midtrans-payment-link-intro.md ; midtrans-payment-link-api.md |
| M10 | Payout: request any business day, but only for sales settled "at least 3 business days" ago; no fee for withdrawal; manual or automatic. First withdrawal needs bank details, all documents and one settled sale; Midtrans may contact by email or WhatsApp within 3 working days. | https://docs.midtrans.com/docs/when-can-i-withdraw-my-transaction-funds-from-midtrans (S11) and https://docs.midtrans.com/docs/how-can-i-have-my-money-in-my-account-payout (S12) | midtrans-withdraw.md ; midtrans-payout-howto.md |
| M11 | Reading data: webhooks carry `signature_key`; status codes decide retries (2xx none, 500 once, 503 four times, 400/404 twice), so a missed webhook is lost after that. Status API takes an `order_id`. The "Transaction History List API" needs "BI SNAP Credentials" (whether an ordinary merchant can get them: UNSURE). Dashboard exports CSV for at most 31 days; a daily report can be emailed to up to several addresses; Balance page is a dashboard page with no balance API documented. | https://docs.midtrans.com/docs/https-notification-webhooks (S16), https://docs.midtrans.com/docs/get-status-api-requests (S17), https://docs.midtrans.com/reference/transaction-history-list-api (S18), https://docs.midtrans.com/docs/transactions-page-reporting-operations (S14), https://docs.midtrans.com/docs/how-can-i-get-daily-report (S15), https://docs.midtrans.com/docs/balance-page-manage-withdraw-your-funds (S13) | midtrans-webhooks.md ; midtrans-status-api.md ; midtrans-ref-transaction-history-list.md ; midtrans-transactions-page.md ; midtrans-daily-report-doc.md ; midtrans-balance-page.md |
| M12 | Test mode: a Sandbox account on first login, simulated transactions; the real function only after activation. | https://docs.midtrans.com/docs/testing-payment-on-sandbox (S22) and https://midtrans.com/passport (S3) | midtrans-sandbox.md ; midtrans-passport.txt |

### Xendit

| # | Finding | URL | Saved file |
|---|---|---|---|
| X1 | "At the moment, we not accomodate Individual business to create an account." It points individuals to register a legal entity. Documents for PT, CV, PMA: director KTP and NPWP, company NPWP, NIB (or TDP and SIUP), deed, SK Menkeh. No sole-proprietor column in that article. Xendit's docs add that individuals and sole proprietors "are only allowed for sub-accounts" (of a platform, so not a stand-alone route for him). | https://help.xendit.co/hc/en-us/articles/360035083911-Can-Individual-businesses-use-Xendit-s-services (S26), https://help.xendit.co/hc/en-us/articles/10891368765593-ID-What-are-the-legal-documents-required-to-register-to-Xendit-for-Indonesian-Merchants (S27), https://docs.xendit.co/docs/indonesia-business-documents (S28) | xendit-help-individual.txt ; xendit-help-legal-docs-id.txt ; xendit-docs-indonesia-business-documents.md |
| X2 | Cards: "only available for enterprises and non-individuals only"; Visa, Mastercard, JCB from "over 100 countries"; "expected processing time is 21 working days". Apple Pay and Google Pay ride on the Cards channel (Apple Pay needs a verified checkout domain when you build your own page). Cards T+2 business days. | https://help.xendit.co/hc/en-us/articles/4418964809881-What-is-the-requirement-to-activate-Credit-Card-on-my-payment-method (S29), https://docs.xendit.co/docs/apple-pay (S41), https://docs.xendit.co/docs/google-pay (S42), https://docs.xendit.co/docs/id-credit-cards (S31) | xendit-help-card-activation.txt ; xendit-docs-apple-pay.md ; xendit-docs-google-pay.md ; xendit-docs-id-credit-cards.md |
| X3 | Fees (Indonesia, plus a flat IDR 4,000 Xendit processing fee on top of each): QRIS 0.70% "for transactions above IDR 100,000"; virtual accounts and Alfamart/Indomaret IDR 9,000; GoPay 3% non-digital or 5% digital; OVO 3% to 5.5% by merchant type; DANA 3% to 3.5%; cards 2.9% + IDR 2,000; AMEX 3.9% + IDR 2,000. The digital-merchant tiers cost more, which matters for app or SaaS sellers. The ShopeePay Indonesia row and the sub-IDR 100,000 QRIS row were not captured: UNSURE. | https://www.xendit.co/en/pricing/ (S24) | xendit-pricing-indonesia.txt |
| X4 | "Monthly Minimum Fee of USD 50 (or a local currency equivalent)", added to the invoice when fees are lower, except the first month. The page is Xendit's global docs; whether the Indonesian contract carries the same minimum is UNSURE. The processing fee is also charged on failed card attempts. | https://docs.xendit.co/docs/transaction-fees (S25) | xendit-docs-transaction-fees.md |
| X5 | The merchant withholds PPh 23 from Xendit's service fees and must upload a withholding slip (Bukti Potong) to get it back; paperwork Midtrans's saved pages do not mention (UNSURE for Midtrans). | https://docs.xendit.co/docs/indonesia-withholding-tax (S43) | xendit-docs-indonesia-withholding-tax.md |
| X6 | Settlement: QRIS "T+1 BUSINESS DAYS", max IDR 10,000,000 a payment; e-wallets, QR, direct debit and PayLater count calendar days. | https://docs.xendit.co/docs/qris (S30) and https://docs.xendit.co/docs/settlements-overview (S32) | xendit-docs-qris.md ; xendit-docs-settlements-overview.md |
| X7 | Subscriptions: dashboard or API; needs a channel that supports merchant-initiated transactions; Xendit schedules and retries; hosted payment link; webhooks per cycle. Payment links are no-code. | https://docs.xendit.co/docs/how-subscriptions-work (S38), https://docs.xendit.co/docs/subscriptions-overview (S39), https://docs.xendit.co/docs/creating-payment-links (S40) | xendit-docs-how-subscriptions-work.md ; xendit-docs-subscriptions-overview.md ; xendit-docs-creating-payment-links.md |
| X8 | Reading data: `GET /transactions` with a `Transaction Read` key (filters by date, type, status, channel; each row carries `settlement_status` and `estimated_settlement_time`), `GET /balance`, API keys with None/Read/Write per product, separate test and live keys, scheduled reports, balance history 92 days, webhooks with `x-callback-token` and up to six retries. | https://docs.xendit.co/apidocs/list-transactions (S34), https://docs.xendit.co/apidocs/get-balance (S35), https://docs.xendit.co/docs/api-keys (S36), https://docs.xendit.co/docs/scheduling-reports (S44), https://docs.xendit.co/docs/balance-overview (S33), https://docs.xendit.co/docs/handling-webhooks (S37) | xendit-api-list-transactions.md ; xendit-api-get-balance.md ; xendit-docs-api-keys.md ; xendit-docs-scheduling-reports.md ; xendit-docs-balance-overview.md ; xendit-docs-handling-webhooks.md |

### Stripe

| # | Finding | URL | Saved file |
|---|---|---|---|
| T1 | Stripe's country list marks Indonesia "Preview". Its help centre: "Stripe is available in Indonesia as an invite-only program"; register interest and wait to be contacted. Accepted types: company, sole proprietorship, individual; for an individual a KTP is enough and a store link counts as a website; IDR bank account only. | https://stripe.com/global (S73) and https://support.stripe.com/questions/requirements-to-open-a-stripe-account-in-indonesia (S74) | stripe-global.txt ; stripe-support-requirements-indonesia.txt |
| T2 | What an Indonesian account can do: "Indonesia Bank transfer (virtual account)" only; "only accept payments in IDR"; "We don't support cross-border or international transactions". Payout 4 working days. So no cards, Apple Pay, Google Pay or PayPal, and nothing for buyers abroad. | https://support.stripe.com/questions/supported-payment-methods-currencies-and-businesses-for-stripe-accounts-in-indonesia (S75) and https://support.stripe.com/questions/payout-schedule-for-stripe-accounts-in-indonesia (S76) | stripe-support-methods-indonesia.txt ; stripe-support-payout-indonesia.txt |
| T3 | An account in another country needs "A legal entity registered in the same country", a local address, and "A physical bank account in that country ... can't be a virtual bank account". So a Wise or Payoneer balance does not do it either. | https://support.stripe.com/questions/requirements-to-open-a-stripe-account-in-another-country (S77) | stripe-support-other-country.txt |
| T4 | Atlas: "Atlas costs $500, including Delaware filing fees and your first year of registered agent service"; "Founders from anywhere in the world can use Atlas"; no US address or SSN needed (a US tax ID can take weeks without them); Stripe gives $500 when you open a Treasury account within 7 days. After year one: "registered agent service costs $100 per year" and you pay Delaware's annual report and franchise tax yourself. | https://stripe.com/atlas (S78) | stripe-atlas.txt |
| T5 | Delaware, domestic corporation: annual report $50, franchise tax minimum $175 (authorized-shares method; $400 minimum under the assumed-par-value method), late penalty $200 plus 1.5% a month. LLC annual tax not fetched: UNSURE. A foreign-owned US company must file Form 5472: "A penalty of $25,000" for missing it. | https://corp.delaware.gov/paytaxes/ (S83) and https://www.irs.gov/instructions/i5472 (S84) | delaware-annual-report-tax.txt ; irs-i5472-instructions.txt |
| T6 | Stripe fees (US): 2.9% + 30c domestic cards; Billing 0.7% of billing volume; Invoicing 0.4% per paid invoice. Stripe's own merchant of record, Managed Payments, needs a business in US, CA, much of Europe, AU, HK, JP or SG (Indonesia is absent), sells digital products only, and "doesn't support" professional services. Its price was not captured: UNSURE. | https://stripe.com/pricing (S79), https://docs.stripe.com/payments/managed-payments/eligibility (S80) | stripe-pricing-us.txt ; stripe-managed-payments-eligibility.md |
| T7 | Read access: Stripe restricted API keys give a service only the permissions it needs, so a read-only key is possible. | https://docs.stripe.com/keys-best-practices (S82) | stripe-docs-restricted-keys.md |

### Merchants of record

| # | Finding | URL | Saved file |
|---|---|---|---|
| R1 | **Polar**: Indonesia is in the payout country list, paid through Stripe Connect Express. "Stripe Payments doesn't need to be available in your country." The payout account must be a bank account "in the same country as the business" in local currency; "Most multi-currency or borderless accounts (Wise, Payoneer, Revolut, etc.) do not satisfy Stripe's verification". So he needs an IDR bank account. | https://polar.sh/docs/merchant-of-record/supported-countries (S52) and https://polar.sh/docs/features/finance/accounts (S53) | polar-supported-countries.md ; polar-docs-features-finance-accounts.md |
| R2 | Polar fees: Starter 5% + 50c; Pro $20 a month 3.8% + 40c; Growth $100 3.6% + 35c; +1.5% for international (non-US) cards; disputes $15; no separate subscription fee on Starter. Payouts: 7-day settlement delay for organisations created since 2026-05-12, minimum $10, manual withdrawal, Stripe payout fees ($2 a month active, 0.25% + $0.25 per payout, up to 1% cross-border). Balance is in USD. Pricing page matches the docs. | https://polar.sh/docs/merchant-of-record/fees (S56), https://polar.sh/docs/features/finance/payouts (S54), https://polar.sh/docs/features/finance/balance (S55), https://polar.sh/resources/pricing (S57) | polar-docs-merchant-of-record-fees.md ; polar-docs-features-finance-payouts.md ; polar-docs-features-finance-balance.md ; polar-pricing.txt |
| R3 | Polar API: organization access tokens, full organization resources (products, orders, subscriptions), 500 requests per minute in production, webhooks. Open source repo is alive (10,512 stars, pushed 2026-11-23, not archived). A payouts read endpoint was not checked: UNSURE. | https://polar.sh/docs/api-reference/introduction (S58) | polar-docs-oat.md |
| R4 | **Paddle**: "5% + 50c per Checkout transaction", no monthly fee. Works with software businesses anywhere except the sanctions list; Indonesia is not on it and its tax table row says USD, tax exclusive. Payout currencies do not include IDR (USD works); a different payout currency can cost "a conversion margin of up to 1.5%"; the bank may charge too. Payout methods named: bank/wire (PayPal also appears in the page; terms not read). Paddle sells software, so services and client work are out. | https://www.paddle.com/pricing (S46), https://www.paddle.com/help/start/intro-to-paddle/which-countries-are-supported-by-paddle (S47), https://developer.paddle.com/concepts/sell/supported-countries-locales.md (S48), https://www.paddle.com/help/manage/get-paid/can-i-be-paid-in-my-local-currency (S49) | paddle-pricing.txt ; paddle-help-countries.txt ; paddle-dev-countries.md ; paddle-help-local-currency.txt |
| R5 | Paddle API: `GET /transactions` with the `transaction.read` permission; API keys carry per-key permissions. Seller approval steps and payout minimum were not read: UNSURE. | https://developer.paddle.com/api-reference/transactions/list-transactions.md (S50) and https://developer.paddle.com/api-reference/about/authentication.md (S51) | paddle-dev-list-transactions.md ; paddle-dev-authentication.md |
| R6 | **Lemon Squeezy is out**: "no longer accepting new sign-ups and will shut down on March 31, 2027" (sign-ups ended 2026-11-16). Its successor, Stripe Managed Payments, needs a business in a supported location, which Indonesia is not (T6). The page itself suggests Atlas. | https://docs.lemonsqueezy.com/migration (S62), https://docs.lemonsqueezy.com/migration/faq (S63), https://www.lemonsqueezy.com/pricing (S61) | lemonsqueezy-migration.txt ; lemonsqueezy-migration-faq.txt ; lemonsqueezy-pricing.txt |
| R7 | **Gumroad**: "10% + $0.50" per direct sale, 30% through Discover; merchant of record since 2025-01-01; memberships and SaaS subscriptions supported; digital only. Payout: Indonesia IDR bank deposit; "We do not support alternative payout modes like Payoneer, Wise"; "standard $100 USD" minimum; payouts cover sales through the previous Friday. Gumroad API was not read: UNSURE. | https://gumroad.com/pricing (S65) and https://gumroad.com/help/article/13-getting-paid (S66) | gumroad-pricing.txt ; gumroad-help-getting-paid.txt |
| R8 | **Creem**: "3.9% + 40c per successful transaction"; Indonesia is in its 88 payout countries; bank payout "7 EUR/USD or 1% of the payout amount, whichever is higher"; payouts on the 1st and 15th. Some countries carry bank-partner restrictions; whether Indonesia does was not readable: UNSURE. A $50 minimum payout appears only in a search summary, not in a saved page: UNSURE. | https://www.creem.io/pricing (S67), https://docs.creem.io/merchant-of-record/supported-countries (S68), https://docs.creem.io/merchant-of-record/finance/payouts (S69) | creem-pricing.txt ; creem-docs-supported-countries.txt ; creem-docs-payouts.txt |
| R9 | **Dodo Payments**: "4% + 40c per transaction"; payouts free, "Fee of $5 if payout <$1000"; USD SWIFT $25 for non-US businesses; refund $1; dispute $30. Eligibility follows the country of the government ID you verify; Indonesia is listed. | https://dodopayments.com/pricing (S70) and https://docs.dodopayments.com/miscellaneous/accepted-countries-and-territories (S71) | dodo-pricing.txt ; dodo-docs-accepted-countries.txt |
| R10 | **FastSpring**: no public rate (sales-led). Payout: 14-day settlement delay, USD 100 minimum, 2.5% fee if store currency differs from payout currency. Indonesia not confirmed in the saved page: UNSURE. Left out of the comparison. | https://developer.fastspring.com/docs/receive-payouts (S72) | fastspring-docs-receive-payouts.txt |

### Why QRIS and virtual accounts matter

| # | Finding | URL | Saved file |
|---|---|---|---|
| Q1 | Bank Indonesia: QRIS users and merchants reached 71.91 million and 51.31 million, transactions up 70.95% year on year. Every merchant of record above takes cards (and PayPal on some) but none was shown to take QRIS or a virtual account; Midtrans and Xendit lead with them. | https://www.bi.go.id/en/publikasi/ruang-media/news-release/Pages/sp_2825426.aspx (S85) | bi-release-qris-oct2026.txt |

## Cost estimate

Volumes come from data on disk, not guesses. Rate: Rp 17.836 per USD, JISDOR 2026-08-14, the figure `~/Repositories/pos/docs/pricing.md` fetched (three months old, so re-read JISDOR before committing).

**stya collection (14 paying accounts, the figure in `~/Repositories/pos/docs/pricing.md` section 4.7; one outlet each; list prices of 2026-10-01: Basic Rp 100.000 a month, Plus Rp 200.000).**

| Option | All 14 on Basic (Rp 1.400.000 a month) | All 14 on Plus (Rp 2.800.000 a month) |
|---|---|---|
| Midtrans QRIS, 0.7% VAT-inclusive | 14 x 700 = Rp 9.800 | 14 x 1.400 = Rp 19.600 |
| Midtrans virtual account, Rp 4.440 each | 14 x 4.440 = Rp 62.160 | Rp 62.160 |
| Xendit QRIS, 0.7% + Rp 4.000 processing | 14 x 4.700 = Rp 65.800 | 14 x 5.400 = Rp 75.600 |
| Xendit with USD 50 minimum (if it applies) | 50 x 17.836 = Rp 891.800 = 63.7% of revenue | Rp 891.800 = 31.9% |
| MoR (Polar, 5% + 50c on USD) | not applicable: venues pay rupiah by QRIS or transfer | not applicable |

Midtrans QRIS and a virtual account cost the same at Rp 571.429 (4.000 / 0.007), the crossover stya's own pricing doc already uses. Annual prepay of Basic (Rp 1.000.000): QRIS Rp 7.000, virtual account Rp 4.440.

Why each component beats the others for stya: Midtrans over Xendit because an individual cannot open Xendit and its USD 50 minimum alone (Rp 891.800) is about 90 times Midtrans's whole QRIS bill at Basic volume (Rp 9.800) and 14 times the virtual-account bill; QRIS and virtual account over cards because a card is 2.9% + IDR 2,000 and, per stya's doc, few Indonesian small venues use one; Midtrans over a merchant of record because MoRs cost 5% + 50c and show no QRIS. stya's code already issues Midtrans invoices from its own merchant account (`pricing.md` section 7.1, proven in the sandbox on 2026-09-24); whether the production account is activated I could not tell from the docs: UNSURE.

**Undirect and Cutling if sold outside the App Store (illustration only).** HQ's live 30-day view on 2026-11-23 (`monholt-pnl.md` line 16): Undirect 11 sold for $10.67 proceeds, Cutling 4 for $14.27, together 15 sales and $24.94. Treating $24.94 as the money the buyers' side leaves him (it is Apple's net, so real buyer prices are higher; UNSURE by how much):

| Option | Percent part on $24.94 | Fixed part, 15 x per-sale | Total | Share of $24.94 |
|---|---|---|---|---|
| Polar Starter or Paddle, 5% + 50c | $1.25 | $7.50 | $8.75 | 35% |
| Gumroad direct, 10% + 50c | $2.49 | $7.50 | $9.99 | 40% |
| Dodo, 4% + 40c | $1.00 | $6.00 | $7.00 | 28% |
| Creem, 3.9% + 40c | $0.97 | $6.00 | $6.97 | 28% |

The fixed 40c to 50c per sale is the cost: Undirect nets about $0.97 a sale in HQ's data ($10.67 / 11), so a 50c fee takes half. Payout minimums also bite at this volume: Gumroad $100, Creem $50 (unconfirmed), Polar $10 plus Stripe's $2 a month; one month of these two apps (about $25 to $42) would not reach Gumroad's minimum. Keep both on the App Store, which HQ already reads (`monholt-pnl.md` section 3.1).

**Stripe via Atlas, per year.** Year one $500 less the $500 Treasury credit if claimed within 7 days = about $0. Year two on, for a Delaware C corporation: agent $100 + annual report $50 + franchise tax minimum $175 = $325 (the $175 assumes the authorized-shares method; $400 minimum under the other method; Atlas's default share structure not checked: UNSURE). Not priced: the accountant for the Form 5472 and the US return, Stripe's international-card surcharge, Managed Payments' price, and how Indonesia taxes a US company he owns. Those four are why I cannot show a break-even against a 5% merchant of record.

**Client invoices.** No client-invoice volume exists in the brief or in HQ's data I read, so I did not estimate one. Per invoice, Midtrans QRIS is 0.7% and a virtual account Rp 4.440; Stripe Invoicing would be 0.4% plus card fees (US company needed).

## What HQ could read automatically

HQ is a Cloudflare Worker behind Access. Inbound webhooks need a public path outside Access (my inference, not a sourced fact); pulls from a cron need nothing public.

| Option | Pull (cron into D1) | Push (webhook) | What is missing |
|---|---|---|---|
| Midtrans | Status API per `order_id` only; no list API for an ordinary key (the list API needs BI SNAP credentials) | Yes, signed, but retries are few (M11) | Balance and payouts: dashboard only. So HQ must record each `order_id` when it is created and re-check unsettled ones |
| stya's own database | Settled `platform_invoices` rows (stya already confirms Midtrans notifications by signature and marks bills paid) | not needed | Best source for stya revenue; Midtrans fee per invoice would still have to be computed from M1 |
| Xendit (only if a PT or CV opens it) | List Transactions, Get Balance, read-only key, settlement status per row | Yes, `x-callback-token` | USD 50 minimum, no individual account |
| Polar | Orders, subscriptions with an organization token, 500 requests a minute | Yes | Payout list endpoint not checked (UNSURE); each payout needs a reverse invoice downloaded by hand for the books |
| Paddle | `GET /transactions`, read permission | Yes | Payout and balance endpoints not checked (UNSURE) |
| Gumroad, Creem, Dodo | not checked (UNSURE) | not checked | read APIs unverified |
| Stripe via Atlas | Restricted key, read-only | Yes | Needs the US company first |

## What he must do himself to open each

**Midtrans (individual).** Register at midtrans.com and verify the email; log in (sandbox first); click the "One more step" banner; upload KTP, and NPWP for cards; accept the terms document that arrives by email; give a site or an App Store, Instagram or catalog link that shows prices in rupiah; keep to the allowed-business rules; set bank details; wait for Midtrans's review and, for cards, about 10 working days; make one real sale; request the first withdrawal (about 3 business days after settlement). Unchecked: whether the bank account may be in a name other than his (Midtrans has a page on it that I did not read), and whether Midtrans needs a business entity for the card recurring approval.

**Xendit.** Needs a PT or CV with NIB and deeds, then 21 working days for cards. Not for him alone.

**Stripe Indonesia.** Register interest at stripe.com/global and wait for an invitation. Even if invited, it takes only virtual-account payments in rupiah.

**Stripe via Atlas.** Form a Delaware company through Atlas ($500), open a Treasury account within 7 days for the credit, get a US tax ID (weeks if he has no US phone, address and SSN), connect Stripe, file the annual report, pay franchise tax and the registered agent, and ask an Indonesian tax adviser about owning a US company before starting.

**Polar.** Create an organization; pass its account review; connect a Stripe Connect Express payout account in Indonesia with an IDR bank account in his own name (Wise or Payoneer will probably be refused); choose the plan.

**Paddle, Gumroad, Creem, Dodo.** Each needs its own sign-up and review; I read none of those flows. Paddle receives wire in USD (his bank converts, maybe at a cost); Gumroad pays IDR to a local bank; Creem and Dodo list Indonesia but their Indonesian rails are unconfirmed.

## Open questions for the owner

1. If a merchant of record is chosen for anything sold to Indonesian buyers, it will not offer QRIS or virtual account, the methods most local buyers use (Bank Indonesia counts 71.91 million QRIS users). Should such a product be sold in rupiah through Midtrans instead, and abroad through a merchant of record? (The design as drafted lacks the local method for the Indonesian side; nothing else was added.)
2. How are client-work invoices paid today, and from where (Indonesia or abroad)? None of the merchants of record take services, and no option for foreign clients was researched (Wise Business, Payoneer or direct SWIFT are untested here).
3. Is stya's Midtrans merchant account activated for production, and is stya a PT or CV? That decides whether HQ's stya revenue comes from Midtrans or from stya's own rows.
4. Does he want to take on a US company (Atlas) at all? It is a tax and compliance decision, not a payments one.

## UNSURE, collected

- Whether Midtrans counts apps or SaaS as "digital product" merchants with higher rates (M1).
- Whether Xendit's USD 50 minimum applies to an Indonesian contract (X4).
- The Xendit ShopeePay Indonesia rate and the sub-IDR 100,000 QRIS rate (X3).
- Whether Midtrans's Transaction History List API can be had by an ordinary merchant (M11).
- Midtrans bank-account-name rule and withholding-tax handling.
- Indonesia status in Creem's bank-partner restrictions and its payout minimum (R8).
- Paddle, Gumroad, Creem, Dodo read APIs and onboarding steps; Polar payout endpoint.
- Stripe Managed Payments price, Delaware LLC tax, Atlas default shares, accountant cost, Indonesian tax effect of a US company.
- Midtrans's own PayPal and Apple Pay absence: found only as an absence in saved pages.

## Rows for the Indonesia business guide

The guide `~/.claude/skills/domain-guides/references/guide-indonesia-business/guide.md` has no payment-gateway rows, so all of these are new (fetched 2026-11-23).

| # | URL | saved file | what to take |
|---|---|---|---|
| G1 | https://midtrans.com/passport | `/Users/hafang/Repositories/undirect/docs/research/payments-indonesia-sources/midtrans-passport.txt` | Midtrans takes an individual with KTP (+ NPWP for cards); card activation about 10 working days |
| G2 | https://help.xendit.co/hc/en-us/articles/360035083911-Can-Individual-businesses-use-Xendit-s-services | `/Users/hafang/Repositories/undirect/docs/research/payments-indonesia-sources/xendit-help-individual.txt` | Xendit takes no individual accounts; cards enterprises only |
| G3 | https://docs.xendit.co/docs/transaction-fees | `/Users/hafang/Repositories/undirect/docs/research/payments-indonesia-sources/xendit-docs-transaction-fees.md` | USD 50 monthly minimum fee |
| G4 | https://support.stripe.com/questions/supported-payment-methods-currencies-and-businesses-for-stripe-accounts-in-indonesia | `/Users/hafang/Repositories/undirect/docs/research/payments-indonesia-sources/stripe-support-methods-indonesia.txt` | Stripe Indonesia: invite-only, VA and IDR only, no international |
| G5 | https://polar.sh/docs/merchant-of-record/supported-countries | `/Users/hafang/Repositories/undirect/docs/research/payments-indonesia-sources/polar-supported-countries.md` | Indonesia in MoR payout lists (Polar, Gumroad, Creem, Dodo); Lemon Squeezy closed 2026-11-16 |
| G6 | https://docs.xendit.co/docs/indonesia-withholding-tax | `/Users/hafang/Repositories/undirect/docs/research/payments-indonesia-sources/xendit-docs-indonesia-withholding-tax.md` | Merchant withholds PPh 23 on gateway fees and issues a Bukti Potong |
