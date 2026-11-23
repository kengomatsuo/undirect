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
