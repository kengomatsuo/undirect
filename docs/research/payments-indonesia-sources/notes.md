# Payments for an Indonesian maker: source index (card ASG186)

Fetched 2026-11-23. Every row names the saved copy in this folder. Pricing, plan and region pages and the Xendit, Stripe, Gumroad, Delaware and BI pages were read in Claude in Chrome (curl got 403, empty JS shells, or the page is a pricing table).

| # | URL | saved file | what to take |
|---|-----|-----------|--------------|
| 1 | https://midtrans.com/pricing | midtrans-pricing.txt | per-method fees, VAT note |
| 2 | https://docs.midtrans.com/docs/what-are-the-legal-documents-required-for-midtrans-account-registration | midtrans-legal-documents.md | Individual = KTP + NPWP |
| 3 | https://midtrans.com/passport | midtrans-passport.txt | Starter pack vs card documents, 10 working days, sandbox first |
| 4 | https://docs.midtrans.com/docs/differences-in-available-payment-methods-between-individuals-and-business-entities | midtrans-individual-vs-entity-table.png | table image: Individual gets cards, not BCA VA or Indomaret |
| 5 | https://docs.midtrans.com/docs/can-i-receive-payments-from-a-foreign-issuing-bank | midtrans-foreign-cards.md | foreign cards accepted |
| 6 | https://docs.midtrans.com/docs/can-i-receive-payments-using-other-currency-than-idr | midtrans-other-currency.md | IDR only |
| 7 | https://docs.midtrans.com/docs/what-are-the-website-or-application-criterias-for-registering-a-midtrans-account | midtrans-website-criteria.md | price must show in IDR; App Store link accepted |
| 8 | https://docs.midtrans.com/docs/do-i-have-to-have-a-website-to-activate-my-midtrans-account | midtrans-no-website.md | catalog-only limits methods |
| 9 | https://docs.midtrans.com/docs/one-click-two-clicks-and-recurring-transaction | midtrans-recurring.md | recurring needs bank approval |
| 10 | https://docs.midtrans.com/reference/create-subscription | midtrans-create-subscription.md | subscriptions: credit_card and gopay only |
| 11 | https://docs.midtrans.com/docs/when-can-i-withdraw-my-transaction-funds-from-midtrans | midtrans-withdraw.md | 3 business days |
| 12 | https://docs.midtrans.com/docs/how-can-i-have-my-money-in-my-account-payout | midtrans-payout-howto.md | no withdrawal fee, manual or automatic |
| 13 | https://docs.midtrans.com/docs/balance-page-manage-withdraw-your-funds | midtrans-balance-page.md | balance is a dashboard page |
| 14 | https://docs.midtrans.com/docs/transactions-page-reporting-operations | midtrans-transactions-page.md | CSV export, 31 days max |
| 15 | https://docs.midtrans.com/docs/how-can-i-get-daily-report | midtrans-daily-report-doc.md | daily emailed report |
| 16 | https://docs.midtrans.com/docs/https-notification-webhooks | midtrans-webhooks.md | signature_key, retry table |
| 17 | https://docs.midtrans.com/docs/get-status-api-requests | midtrans-status-api.md | status by order_id only |
| 18 | https://docs.midtrans.com/reference/transaction-history-list-api | midtrans-ref-transaction-history-list.md | list API needs BI SNAP credentials |
| 19 | https://docs.midtrans.com/docs/introduction-to-payment-link | midtrans-payment-link-intro.md | payment links, no integration |
| 20 | https://docs.midtrans.com/docs/payment-link-via-api | midtrans-payment-link-api.md | links by API |
| 21 | https://docs.midtrans.com/reference/payment-method-google-pay | midtrans-google-pay.md | Google Pay: cards only |
| 22 | https://docs.midtrans.com/docs/testing-payment-on-sandbox | midtrans-sandbox.md | sandbox exists |
| 23 | https://docs.midtrans.com/docs/how-much-does-midtrans-charge-for-its-payment-service | midtrans-fees.md | VAT 11% worked example; fees netted at withdrawal |
| 24 | https://www.xendit.co/en/pricing/ | xendit-pricing-indonesia.txt | Indonesia fee rows (digital merchants pay more) |
| 25 | https://docs.xendit.co/docs/transaction-fees | xendit-docs-transaction-fees.md | USD 50 monthly minimum fee |
| 26 | https://help.xendit.co/hc/en-us/articles/360035083911-Can-Individual-businesses-use-Xendit-s-services | xendit-help-individual.txt | individuals not accepted |
| 27 | https://help.xendit.co/hc/en-us/articles/10891368765593-ID-What-are-the-legal-documents-required-to-register-to-Xendit-for-Indonesian-Merchants | xendit-help-legal-docs-id.txt | PT/CV document list |
| 28 | https://docs.xendit.co/docs/indonesia-business-documents | xendit-docs-indonesia-business-documents.md | individuals and sole proprietors only as sub-accounts |
| 29 | https://help.xendit.co/hc/en-us/articles/4418964809881-What-is-the-requirement-to-activate-Credit-Card-on-my-payment-method | xendit-help-card-activation.txt | cards non-individual only, 21 working days |
| 30 | https://docs.xendit.co/docs/qris | xendit-docs-qris.md | QRIS T+1 business days, max 10,000,000 |
| 31 | https://docs.xendit.co/docs/id-credit-cards | xendit-docs-id-credit-cards.md | cards T+2 business days |
| 32 | https://docs.xendit.co/docs/settlements-overview | xendit-docs-settlements-overview.md | settlement varies by channel |
| 33 | https://docs.xendit.co/docs/balance-overview | xendit-docs-balance-overview.md | balance history 92 days |
| 34 | https://docs.xendit.co/apidocs/list-transactions | xendit-api-list-transactions.md | Transaction Read key, settlement_status |
| 35 | https://docs.xendit.co/apidocs/get-balance | xendit-api-get-balance.md | GET /balance |
| 36 | https://docs.xendit.co/docs/api-keys | xendit-docs-api-keys.md | read-only keys, test and live keys |
| 37 | https://docs.xendit.co/docs/handling-webhooks | xendit-docs-handling-webhooks.md | x-callback-token, 6 retries |
| 38 | https://docs.xendit.co/docs/how-subscriptions-work | xendit-docs-how-subscriptions-work.md | subscription plans need MIT channel |
| 39 | https://docs.xendit.co/docs/subscriptions-overview | xendit-docs-subscriptions-overview.md | plan, cycle, attempt objects |
| 40 | https://docs.xendit.co/docs/creating-payment-links | xendit-docs-creating-payment-links.md | no-code payment links |
| 41 | https://docs.xendit.co/docs/apple-pay | xendit-docs-apple-pay.md | Apple Pay via Cards channel |
| 42 | https://docs.xendit.co/docs/google-pay | xendit-docs-google-pay.md | Google Pay via Cards |
| 43 | https://docs.xendit.co/docs/indonesia-withholding-tax | xendit-docs-indonesia-withholding-tax.md | merchant withholds PPh 23 on Xendit fees |
| 44 | https://docs.xendit.co/docs/scheduling-reports | xendit-docs-scheduling-reports.md | scheduled reports |
| 45 | https://docs.xendit.co/docs/cards-recurring-and-merchant-initiated-transactions | xendit-docs-cards-recurring-and-merchant-initiated-transactions.md | card recurring |
| 46 | https://www.paddle.com/pricing | paddle-pricing.txt | 5% + 50c |
| 47 | https://www.paddle.com/help/start/intro-to-paddle/which-countries-are-supported-by-paddle | paddle-help-countries.txt | Indonesia not on the unsupported list; software businesses |
| 48 | https://developer.paddle.com/concepts/sell/supported-countries-locales.md | paddle-dev-countries.md | ID row: USD, tax exclusive |
| 49 | https://www.paddle.com/help/manage/get-paid/can-i-be-paid-in-my-local-currency | paddle-help-local-currency.txt | no IDR payout, 1.5% conversion margin |
| 50 | https://developer.paddle.com/api-reference/transactions/list-transactions.md | paddle-dev-list-transactions.md | transaction.read permission |
| 51 | https://developer.paddle.com/api-reference/about/authentication.md | paddle-dev-authentication.md | API keys with permissions |
| 52 | https://polar.sh/docs/merchant-of-record/supported-countries | polar-supported-countries.md | Indonesia in payout list |
| 53 | https://polar.sh/docs/features/finance/accounts | polar-docs-features-finance-accounts.md | payout account must be local bank in local currency; Wise/Payoneer usually fail |
| 54 | https://polar.sh/docs/features/finance/payouts | polar-docs-features-finance-payouts.md | 7-day delay, Stripe payout fees |
| 55 | https://polar.sh/docs/features/finance/balance | polar-docs-features-finance-balance.md | USD settlement |
| 56 | https://polar.sh/docs/merchant-of-record/fees | polar-docs-merchant-of-record-fees.md | plans, +1.5% international cards |
| 57 | https://polar.sh/resources/pricing | polar-pricing.txt | pricing page check |
| 58 | https://polar.sh/docs/api-reference/introduction | polar-docs-oat.md | org access tokens, 500 requests a minute |
| 59 | https://polar.sh/docs/merchant-of-record/introduction | polar-docs-merchant-of-record-introduction.md | MoR scope |
| 60 | https://polar.sh/docs/llms.txt | polar-llms.txt | doc index |
| 61 | https://www.lemonsqueezy.com/pricing | lemonsqueezy-pricing.txt | 5% + 50c, bank wire and PayPal payouts |
| 62 | https://docs.lemonsqueezy.com/migration | lemonsqueezy-migration.txt | no new sign-ups, shutdown 2027-03-31 |
| 63 | https://docs.lemonsqueezy.com/migration/faq | lemonsqueezy-migration-faq.txt | same |
| 64 | https://www.lemonsqueezy.com/blog/2026-update | lemonsqueezy-blog-2026-update.txt | Stripe Managed Payments move |
| 65 | https://gumroad.com/pricing | gumroad-pricing.txt | 10% + 50c, MoR |
| 66 | https://gumroad.com/help/article/13-getting-paid | gumroad-help-getting-paid.txt | Indonesia IDR bank payout, no Payoneer/Wise |
| 67 | https://www.creem.io/pricing | creem-pricing.txt | 3.9% + 40c |
| 68 | https://docs.creem.io/merchant-of-record/supported-countries | creem-docs-supported-countries.txt | Indonesia listed, bank payout fee |
| 69 | https://docs.creem.io/merchant-of-record/finance/payouts | creem-docs-payouts.txt | payout page |
| 70 | https://dodopayments.com/pricing | dodo-pricing.txt | 4% + 40c, payout fees |
| 71 | https://docs.dodopayments.com/miscellaneous/accepted-countries-and-territories | dodo-docs-accepted-countries.txt | Indonesia listed; eligibility by ID country |
| 72 | https://developer.fastspring.com/docs/receive-payouts | fastspring-docs-receive-payouts.txt | 14-day delay, USD 100 minimum, 2.5% conversion |
| 73 | https://stripe.com/global | stripe-global.txt | Indonesia marked Preview |
| 74 | https://support.stripe.com/questions/requirements-to-open-a-stripe-account-in-indonesia | stripe-support-requirements-indonesia.txt | invite-only, individual allowed |
| 75 | https://support.stripe.com/questions/supported-payment-methods-currencies-and-businesses-for-stripe-accounts-in-indonesia | stripe-support-methods-indonesia.txt | VA only, IDR only, no international |
| 76 | https://support.stripe.com/questions/payout-schedule-for-stripe-accounts-in-indonesia | stripe-support-payout-indonesia.txt | 4 working days |
| 77 | https://support.stripe.com/questions/requirements-to-open-a-stripe-account-in-another-country | stripe-support-other-country.txt | entity, address, real local bank |
| 78 | https://stripe.com/atlas | stripe-atlas.txt | $500, $100 a year agent, no US residence needed |
| 79 | https://stripe.com/pricing | stripe-pricing-us.txt | 2.9% + 30c, Billing 0.7%, Invoicing 0.4% |
| 80 | https://docs.stripe.com/payments/managed-payments/eligibility | stripe-managed-payments-eligibility.md | business must be in US, CA, EU, GB, AU, HK, JP, SG; services excluded |
| 81 | https://docs.stripe.com/payments/managed-payments | stripe-managed-payments.md | MoR for digital products |
| 82 | https://docs.stripe.com/keys-best-practices | stripe-docs-restricted-keys.md | restricted API keys |
| 83 | https://corp.delaware.gov/paytaxes/ | delaware-annual-report-tax.txt | annual report $50, franchise tax minimum $175 |
| 84 | https://www.irs.gov/instructions/i5472 | irs-i5472-instructions.txt | $25,000 penalty for missing Form 5472 |
| 85 | https://www.bi.go.id/en/publikasi/ruang-media/news-release/Pages/sp_2825426.aspx | bi-release-qris-oct2026.txt | 71.91 million QRIS users |
| 86 | https://polar.sh/docs/features/checkout/payment-methods.md | polar-docs-checkout-payment-methods.md | Polar: cards worldwide, Apple Pay (Safari), Google Pay (Chrome), Link, Amazon Pay US/DE, Cash App US, WeChat Pay CN/HK/MO; iDEAL NL, Bancontact BE, EPS AT, UPI IN, Kakao/Naver/Samsung Pay KR; no PayPal, no QRIS |
| 87 | https://polar.sh/docs/features/products.md | polar-docs-products.md | Polar prices in 130+ currencies including IDR, picked by buyer geolocation |
| 88 | https://polar.sh/docs/features/finance/balance (via fees page) and https://polar.sh/docs/features/subscriptions/introduction.md | polar-docs-subscriptions-introduction.md ; polar-docs-features-finance-balance.md | Polar subscriptions exist; non-USD sales convert to USD balance |
| 89 | https://polar.sh/docs/integrate/oat.md and https://polar.sh/docs/api-reference/orders/list.md | polar-docs-oat-scopes.md ; polar-docs-orders-list.md | Polar token has selectable scopes (names not on the page); orders list endpoint |
| 90 | https://polar.sh/docs/api-reference/introduction.md , https://polar.sh/docs/api-reference/subscriptions/list.md , https://polar.sh/docs/features/subscriptions/failed-payments.md , https://polar.sh/docs/features/tax-inclusive-pricing.md | polar-docs-api-oat.md ; polar-docs-subscriptions-list.md ; polar-docs-failed-payments.md ; polar-docs-tax-inclusive-pricing.md | Polar API and subscription retry pages (supporting) |
| 91 | https://docs.dodopayments.com/features/payment-methods.md | dodo-docs-payment-methods.md | Dodo: 40+ methods; Apple Pay global incl. India, Google Pay global except India, PayPal "temporarily unavailable", iDEAL, Bancontact, Pix, UPI, WeChat Pay, GCash, Touch n Go, Klarna, SEPA; no QRIS or Indonesian wallet |
| 92 | https://docs.dodopayments.com/features/adaptive-currency.md | dodo-docs-adaptive-currency.md | Dodo shows IDR to buyers; 2-4% FX fee on buyer by default |
| 93 | https://docs.dodopayments.com/features/payouts.md | dodo-docs-payouts.md | Dodo payout default threshold USD 100 (lowest 50), bi-monthly default, to a linked bank account; "routes and currencies vary by country" |
| 94 | https://docs.dodopayments.com/api-reference/introduction.md , .../payouts/get-payouts.md , .../payments/get-payments.md | dodo-docs-api-keys.md ; dodo-docs-payouts-api.md ; dodo-docs-payments-list.md | Dodo keys carry per-resource Read access; List Payouts and List Payments endpoints |
| 95 | https://docs.dodopayments.com/llms.txt | dodo-docs-llms.txt | Dodo doc index and 2026 changelog (SEPA, Klarna, BLIK, Satispay, Korean methods) |
| 96 | https://docs.creem.io/merchant-of-record/finance/payment-methods.md | creem-docs-payment-methods.md | Creem: cards, Apple Pay, Google Pay global; Alipay (one-time), iDEAL NL (one-time), Alipay HK; no PayPal listed |
| 97 | https://docs.creem.io/api-reference/introduction.md and https://docs.creem.io/llms.txt | creem-docs-api-introduction.md ; creem-docs-llms.txt | Creem single x-api-key, no read-only scope documented |
| 98 | https://developer.paddle.com/concepts/payment-methods.md | paddle-dev-payment-methods-index.md | Paddle: 18 methods; Apple Pay and Google Pay all countries except IN, TR; subscriptions yes |
| 99 | https://developer.paddle.com/concepts/payment-methods/paypal.md , alipay.md , wechat.md , pix.md , upi.md , ideal.md , wire-transfer.md , samsung-pay.md | paddle-dev-paypal.md ; paddle-dev-alipay.md ; paddle-dev-wechat.md ; paddle-dev-pix.md ; paddle-dev-upi.md ; paddle-dev-ideal.md ; paddle-dev-wire-transfer.md ; paddle-dev-samsung-pay.md | Paddle PayPal in all countries incl subscriptions; Alipay and WeChat CN; Pix BR; UPI IN; iDEAL NL no subscriptions; bank transfer EUR GBP USD |
| 100 | https://developer.paddle.com/concepts/sell/supported-currencies.md | paddle-dev-supported-currencies.md | Paddle prices in 30+ currencies; IDR not in the list; balance USD EUR GBP AUD CAD |
| 101 | https://www.paddle.com/help/manage/get-paid/when-and-how-do-i-get-paid and .../is-there-a-fee-taken-for-payouts | paddle-help-when-and-how-do-i-get-paid.txt ; paddle-help-is-there-a-fee-taken-for-payouts.txt | Paddle pays monthly, min USD 100, wire or Payoneer, Wise-style IBAN/SWIFT details accepted, USD 15 SWIFT fee when currency differs from bank country |
| 102 | https://freemius.com/pricing/ and https://freemius.com/help/documentation/getting-started/our-pricing/ | freemius-pricing-page.txt ; freemius-docs-our-pricing.txt | Freemius 3.8% + 50c plus gateway fees (average 3.5%), no payout fees |
| 103 | https://freemius.com/help/documentation/selling-with-freemius/supported-countries/ , .../your-earnings/ , .../multi-currency/ , .../allowed-prohibited-products/ , .../hosted-checkout/ , https://freemius.com/llms.txt | freemius-docs-supported-countries.txt ; freemius-docs-getting-paid.txt ; freemius-docs-multi-currency.txt ; freemius-docs-allowed-products.txt ; freemius-docs-hosted-checkout.txt ; freemius-llms.txt | Freemius lists Indonesia for payouts via PayPal, Payoneer, wire, Wise; USD min 100 on the 10th; USD/EUR/GBP pricing; checkout methods cards, PayPal, iDEAL; software only, no services |
| 104 | https://gumroad.com/help/article/66-gumroads-fees | gumroad-help-66-gumroads-fees.txt | Gumroad help: 10% + 50c "does not include" card processing 2.9% + 30c or PayPal fees; conflicts with pricing page (UNSURE) |
| 105 | https://gumroad.com/help/article/275-paypal-connect and https://gumroad.com/help/article/282-how-do-purchases-work-for-my-customers | gumroad-help-275-paypal-connect.txt ; gumroad-help-282-how-purchases-work.txt | PayPal Connect available to creators in PayPal countries except a list not containing Indonesia; buyers pay by card, Apple Pay, Google Pay, Venmo |
| 106 | https://gumroad.com/help/article/46-what-currency-does-gumroad-use , 82-membership-products , 327-purchasing-power-parity , 280-create-application-api | gumroad-help-46-what-currency-does-gumroad-use.txt ; gumroad-help-82-membership-products.txt ; gumroad-help-327-purchasing-power-parity.txt ; gumroad-help-280-create-application-api.txt | Gumroad local-currency charge for one-time card buys (IDR not in the list read); memberships; example tokens redacted |
| 107 | https://gumroad.com/api | gumroad-api-scopes.txt | view_sales and view_payouts are read-only scopes |
| 108 | https://developer.fastspring.com/docs/payment-methods-accepted-by-fastspring | fastspring-docs-payment-methods-accepted.txt | FastSpring: OVO (ID, IDR, all sellers), PayPal, Apple Pay, Google Pay, iDEAL, Pix, UPI, PromptPay, Alipay, WeChat Pay, SEPA; manual-action methods not for auto subscriptions |
| 109 | https://fastspring.com/pricing/ | fastspring-pricing-page.txt | FastSpring pricing is quote-only, no public rate, no minimum volume |
| 110 | https://www.2checkout.com/pricing/ , https://docs.2checkout.com/get-started/getting-started/payouts , .../cross-border-payments-fee-charges | 2checkout-pricing-page.txt ; 2checkout-docs-payouts.txt ; 2checkout-docs-cross-border-fee.txt | 2Sell 3.5% + 35c, 2Subscribe 4.5% + 45c, +2% cross-border; wire fee USD 15, PayPal and Payoneer payout; Indonesia seller status UNSURE |
| 111 | https://payhip.com/pricing | gated: Cloudflare "Performing security verification" challenge, not bypassed | Payhip fees and methods not read from the vendor |
| 112 | https://help.payhip.com/article/64-connecting-your-paypal-account | payhip-help-connect-paypal.txt | Payhip PayPal connection page (supporting) |
| 113 | https://www.paypal.com/id/business/paypal-business-fees | paypal-id-seller-fees.txt | PayPal Indonesia seller: 3.40% domestic, 4.40% international + fixed fee, 3% conversion, withdrawal to bank free above IDR 1,500,000 else IDR 16,000 |
| 114 | https://developer.paypal.com/docs/api/transaction-search/v1/ | paypal-dev-transaction-search.txt | PayPal read API: GET reporting/transactions and balances |
| 115 | https://support.apple.com/en-us/102775 and https://support.apple.com/en-us/111741 | apple-support-apple-pay-countries.txt ; apple-support-account-payment-methods.txt | Indonesia is not on Apple Pay's country list; in Indonesia Apple Account takes DANA, GoPay, ShopeePay, cards |
| 116 | https://support.google.com/googlepay/answer/12429287 and https://developers.google.com/pay/api/web/support/faq | google-pay-help-countries.txt ; google-pay-api-faq.txt | Google Pay payments list shows India then Iraq, no Indonesia (conflicts with Midtrans doc) |
| 117 | https://stripe.com/pricing/local-payment-methods | stripe-pricing-local-methods.txt | Stripe method list; per-method fees not captured |
