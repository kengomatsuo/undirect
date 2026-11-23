SOURCE https://docs.dodopayments.com/features/payment-methods.md
fetched 2026-11-23
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.dodopayments.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Payment Methods

> Complete guide to payment methods supported by Dodo Payments, including credit/debit cards, digital wallets, BNPL, UPI/Rupay, European options, and how to configure them for your checkout.

Dodo Payments supports 40+ payment methods across 220+ countries. All methods are pre-configured and managed by Dodo Payments — no additional contracts, integrations, or merchant accounts needed. Turn on new methods instantly.

## Why Offer Multiple Payment Methods?

> [card] Boost Conversion
>
> Local payment methods increase sales 20-30% in target markets.

> [card] One Platform
>
> All methods managed through a single API and dashboard.

> [card] Smart Routing
>
> The right options appear based on customer location, currency, and device.

## How Payment Methods Are Selected

Dodo Payments automatically shows customers the payment methods available to them based on:

* **Billing Country** — Regional methods like iDEAL (Netherlands) or UPI (India) only appear for customers in those countries
* **Transaction Currency** — Payment methods are filtered by the currency they support
* **Device Type** — Apple Pay only appears on compatible Apple devices and browsers
* **Transaction Type** — Some methods don't support subscriptions or have minimum transaction amounts

> [!NOTE]
>
> All payment methods are pre-configured and managed by Dodo Payments. No setup is required — they become available once your account is verified and live mode is enabled.

## Supported Payment Methods

| Payment Method | Supported Countries | Supported Currencies | Subscriptions |
| :- | :- | :- | :-: |
| **Credit Cards** | Global | All currencies | Yes |
| **Debit Cards** | Global | All currencies | Yes |
| **Apple Pay** | Global, including India | All currencies, including INR | Yes |
| **Google Pay** | Global (except India) | All currencies | Yes |
| **Amazon Pay** | Global (except India) | USD, EUR, GBP, AUD, CHF, DKK, HKD, JPY, NOK, NZD, SEK, ZAR | No |
| **Cash App Pay** | US | USD | Yes |
| **ACH Direct Debit** | US | USD | No |
| **SEPA Direct Debit** | Eurozone | EUR | No |
| **Klarna** | US, Europe | USD, EUR, GBP, DKK, NOK, SEK, CZK, RON, PLN, CHF | Yes |
| **Afterpay** | US, UK | USD, GBP | No |
| **UPI** | India | INR | Yes\* |
| **Rupay** | India | INR | Yes\* |
| **iDEAL** | Netherlands | EUR | No |
| **Bancontact** | Belgium | EUR | No |
| **EPS** | Austria | EUR | No |
| **Multibanco** | Portugal | EUR | No |
| **BLIK** | Poland | PLN | No |
| **Satispay** | Europe | EUR | Yes |
| **PAYCO** | South Korea | KRW | No |
| **Naver Pay** | South Korea | KRW | Yes |
| **Kakao Pay** | South Korea | KRW | Yes |
| **RevolutPay** | Global | GBP | No |
| **Billie** | Global | GBP | No |
| **Pix** | Brazil | BRL | Yes |
| **Stablecoins** | Global (except India) | USD | No |
| **WeChat Pay** | Global | USD, CNY | No |
| **GCash** | Philippines | PHP | Yes |
| **Alipay HK** | Hong Kong | HKD | No |
| **FPS** | Hong Kong | HKD, CNY | No |
| **Touch 'n Go** | Malaysia | MYR | No |

> [!NOTE]
>
> \*All Indian-issued cards (Visa, Mastercard, Rupay, etc.) and UPI support subscriptions with RBI-compliant mandates. The 48-hour processing delay applies to all Indian-issued cards and UPI. See the [India Payment Methods](https://docs.dodopayments.com/features/payment-methods/india.md) page for details on mandate requirements.

> [!WARNING]
>
> PayPal is temporarily unavailable for new transactions. We'll update this page when restored.

## Minimum Amounts

Every payment method follows the minimum amount for the checkout currency. In USD, the minimum is \$0.50 for one-time payments and \$1.00 for subscriptions. Other currencies have their own minimums. See [Minimum Amounts](https://docs.dodopayments.com/features/adaptive-currency.md#minimum-amounts) for each currency.

These methods also appear only within an amount range:

| Payment Method | Appears When |
| :- | :- |
| **Klarna** | An amount is due today, so not on a free-trial checkout. On USD checkouts, the billing address is in the US and the amount is above \$50.00 (\$50.01 minimum) |
| **Afterpay** | The checkout is a one-time payment in USD with a US billing address and the amount is above \$50.00 (\$50.01 minimum) |
| **Stablecoins** | The checkout is in USD and the amount is from \$0.50 to \$10,000 |
| **PAYCO**, **Naver Pay**, **Kakao Pay** | The checkout is in KRW and the total is worth at least about \$1.00 |
| **WeChat Pay** | The checkout is a one-time payment in USD or CNY and the amount is at most 1,000.00 CNY or the USD equivalent |

## Payment Method Categories

> [card] [Credit & Debit Cards](https://docs.dodopayments.com/features/payment-methods/cards.md)
>
> Accept Visa, Mastercard, Amex, Discover, JCB, UnionPay, and regional networks like Cartes Bancaires and Interac.

> [card] [Digital Wallets](https://docs.dodopayments.com/features/payment-methods/digital-wallets.md)
>
> Apple Pay, Google Pay, Amazon Pay, Cash App Pay, and RevolutPay for fast, secure one-tap checkout.

> [card] [Buy Now Pay Later](https://docs.dodopayments.com/features/payment-methods/bnpl.md)
>
> Klarna, Afterpay, and Billie installment options to increase average order value and conversion.

> [card] [ACH Direct Debit](https://docs.dodopayments.com/features/payment-methods/ach.md)
>
> Bank account debits for US customers paying in USD, available on one-time payments.

> [card] [India](https://docs.dodopayments.com/features/payment-methods/india.md)
>
> UPI, Rupay cards, and Apple Pay in INR, with RBI-compliant subscription mandates for the Indian market.

> [card] [Europe](https://docs.dodopayments.com/features/payment-methods/europe.md)
>
> iDEAL (Netherlands), Bancontact (Belgium), EPS (Austria), Multibanco (Portugal), and BLIK (Poland).

> [card] [South Korea](https://docs.dodopayments.com/features/payment-methods/south-korea.md)
>
> Kakao Pay, Naver Pay, and PAYCO wallets plus Korean local cards, billed in KRW.

> [card] [Pix](https://docs.dodopayments.com/features/payment-methods/pix.md)
>
> Instant bank transfers for the Brazilian market via QR code or copy-paste key.

> [card] [Stablecoins](https://docs.dodopayments.com/features/payment-methods/stablecoins.md)
>
> Accept stablecoin payments from customers worldwide (excluding India), billed in USD.

> [card] [WeChat Pay](https://docs.dodopayments.com/features/payment-methods/wechat.md)
>
> QR code payments for Chinese customers via WeChat, supporting USD and CNY.

> [card] [Asia-Pacific](https://docs.dodopayments.com/features/payment-methods/asia-pacific.md)
>
> GCash (Philippines), Alipay HK and FPS (Hong Kong), and Touch 'n Go (Malaysia).

## Disable Payment Methods at the Business Level

You can disable specific payment methods from your dashboard. This applies across all checkout sessions for your business without needing to configure each session individually.

**1. Open Settings**

Go to **Settings → Payment Methods** in your Merchant Dashboard.

**2. Disable Methods**

Toggle off any payment methods you don't want to offer.

> [!TIP]
>
> Disable payment methods that have high fraud rates in your region, or limit options to only the methods your business supports operationally.

> [!NOTE]
>
> Business-level settings act as a global filter. Per-checkout restrictions via `allowed_payment_method_types` further narrow the available methods within what's enabled at the business level.

## Restrict Payment Methods Per Checkout

In addition to business-level settings, you can restrict which methods appear for individual checkout sessions using `allowed_payment_method_types`:

> [tab] JavaScript
>
> ```javascript theme={null}
> const session = await client.checkoutSessions.create({
>   product_cart: [{ product_id: 'pdt_123', quantity: 1 }],
>   allowed_payment_method_types: [
>     'credit',
>     'debit',
>     'apple_pay',
>     'google_pay'
>   ],
>   return_url: 'https://example.com/success'
> });
> ```

> [tab] Python
>
> ```python theme={null}
> session = client.checkout_sessions.create(
>     product_cart=[{"product_id": "pdt_123", "quantity": 1}],
>     allowed_payment_method_types=[
>         "credit",
>         "debit",
>         "apple_pay",
>         "google_pay"
>     ],
>     return_url="https://example.com/success"
> )
> ```

> [tab] cURL
>
> ```bash theme={null}
> curl -X POST https://test.dodopayments.com/checkouts \
>   -H "Authorization: Bearer $DODO_PAYMENTS_API_KEY" \
>   -H "Content-Type: application/json" \
>   -d '{
>     "product_cart": [{"product_id": "pdt_123", "quantity": 1}],
>     "allowed_payment_method_types": ["credit", "debit", "apple_pay", "google_pay"],
>     "return_url": "https://example.com/success"
>   }'
> ```

### Available Method Types

| Type | Description |
| :- | :- |
| `credit` | Credit cards (Visa, Mastercard, Amex, Discover, JCB, UnionPay, etc.) |
| `debit` | Debit cards |
| `apple_pay` | Apple Pay |
| `google_pay` | Google Pay |
| `amazon_pay` | Amazon Pay |
| `cashapp` | Cash App Pay |
| `ach` | ACH Direct Debit (US) |
| `klarna` | Klarna BNPL |
| `afterpay_clearpay` | Afterpay / Clearpay |
| `upi_intent` | UPI via QR code (India). See [India Payment Methods](https://docs.dodopayments.com/features/payment-methods/india.md) |
| `ideal` | iDEAL (Netherlands) |
| `bancontact_card` | Bancontact (Belgium) |
| `eps` | EPS (Austria) |
| `multibanco` | Multibanco (Portugal) |
| `blik` | BLIK (Poland) |
| `sepa` | SEPA Direct Debit (Eurozone) |
| `satispay` | Satispay (Europe) |
| `payco` | PAYCO (South Korea) |
| `naver_pay` | Naver Pay (South Korea) |
| `kakao_pay` | Kakao Pay (South Korea) |
| `revolut_pay` | RevolutPay |
| `billie` | Billie B2B BNPL |
| `pix` | Pix (Brazil) |
| `crypto_currency` | Stablecoins |
| `we_chat_pay` | WeChat Pay |
| `gcash` | GCash (Philippines) |
| `ali_pay_hk` | Alipay HK (Hong Kong) |
| `fps` | FPS (Hong Kong) |
| `touch_n_go` | Touch 'n Go (Malaysia) |

> [!WARNING]
>
> Always include `credit` and `debit` as fallbacks. If all specified payment methods are unavailable for a customer, checkout will fail.

### API Endpoints

> [card] [Checkout Sessions](https://docs.dodopayments.com/api-reference/checkout-sessions/create.md)
>
> Create checkout with allowed methods.

> [card] [Preview Checkout](https://docs.dodopayments.com/api-reference/checkout-sessions/preview.md)
>
> Preview pricing and taxes before creating a session.

> [card] [Update Payment Method](https://docs.dodopayments.com/api-reference/subscriptions/update-payment-method.md)
>
> Restrict methods on a subscription's payment-method update page.

## Best Practices

> [accordion] Match methods to your market
>
> Include regional payment methods for your target markets. iDEAL captures \~60% of online payments in the Netherlands; UPI dominates in India. Omitting these methods significantly hurts conversion.

> [accordion] Always provide card fallbacks
>
> Include `credit` and `debit` as fallbacks even when targeting specific methods. Not all customers have access to every payment method.

> [accordion] Consider transaction minimums
>
> Klarna and Afterpay appear on USD checkouts with a US billing address only when the amount is \$50.01 or more. Don't include them for products outside this range — they won't appear. All other payment methods follow the [minimum amount for the checkout currency](https://docs.dodopayments.com/features/adaptive-currency.md#minimum-amounts).

> [accordion] Test across regions and devices
>
> Use test mode to verify payment method availability for different customer locations, currencies, and device types before going live.

## Troubleshooting

> [accordion] Payment method not appearing
>
> Check these factors:
>
> 1. Is the method included in `allowed_payment_method_types`?
> 2. Does the customer's location match the method's supported region?
> 3. Does the method support the transaction currency?
> 4. Is the transaction amount within the method's supported range (e.g., Klarna/Afterpay minimum \$50.01 on USD checkouts)?
> 5. For subscriptions: does the method support recurring payments?
>
> **Solution:** Remove `allowed_payment_method_types` temporarily to see all eligible methods, then narrow down the issue.

> [accordion] Unexpected methods appearing
>
> **Possible causes:**
>
> * `allowed_payment_method_types` not being passed correctly
> * Parameter formatted incorrectly (must be an array of strings)
>
> **Solution:** Log your API request payload and verify the parameter structure.

> [accordion] Regional method not available
>
> **Check:**
>
> * Customer billing address matches the method's region
> * Currency is set correctly (e.g., EUR for iDEAL)
> * Adaptive Currency is enabled if the customer is international
>
> **Solution:** Verify billing address country code and currency in your API request.

> [accordion] Indian payment method issues
>
> UPI and Rupay subscriptions have unique requirements including 48-hour processing delays and RBI mandate limits.
>
> **See:** [India Payment Methods](https://docs.dodopayments.com/features/payment-methods/india.md) for complete guidance.

## Related Pages

> [card] [Adaptive Currency](https://docs.dodopayments.com/features/adaptive-currency.md)
>
> Show prices in 80+ local currencies and accept payments in the customer's local currency.

> [card] [Checkout Guide](https://docs.dodopayments.com/developer-resources/checkout-session.md)
>
> Complete checkout implementation guide.

> [card] [Testing Process](https://docs.dodopayments.com/miscellaneous/testing-process.md)
>
> Test cards, UPI IDs, and wallet testing in test mode.

> [card] [Subscriptions](https://docs.dodopayments.com/features/subscription.md)
>
> Recurring billing and payment method updates for subscriptions.

## Request a Payment Method

We continuously add new payment methods. If you need a specific method not listed here, contact [support@dodopayments.com](mailto:support@dodopayments.com).


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.
HTTP 200
