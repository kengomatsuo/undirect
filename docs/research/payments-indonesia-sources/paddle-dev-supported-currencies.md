SOURCE https://developer.paddle.com/concepts/sell/supported-currencies.md
fetched 2026-11-23
> For the complete documentation index, see [llms.txt](https://developer.paddle.com/llms.txt).
>
> To search these docs, send a `GET` request to `https://paddle-docs-retrieval.kapa-paddle.workers.dev/?q=<question>` with a URL-encoded question. No authentication needed. It returns a JSON array of `{content, source_url}`, most relevant first.

# Supported currencies

Sell products in a range of currencies — ready-to-use, with no extra engineering effort required.

---

Paddle has built-in support for multi-currency for both payments and payouts, letting customers purchase in their local currency and letting you get paid in yours.

Paddle automatically calculates taxes and handles sales tax liability for all countries and currencies.

{% card-group cols=3 %}
{% card title="Boost conversion rates" %}

Offering local currencies can increase sales and reduce FX fees for customers.

{% /card %}
{% card title="Sell in 30+ popular currencies" %}

Paddle has built-in support for popular currencies for payment and payouts.

{% /card %}
{% card title="No extra engineering effort" %}

All supported currencies are ready-to-use as part of the Paddle API and Paddle.js.

{% /card %}
{% /card-group %}

## How it works

### Payments

- Price items in over 30 different currencies with no additional setup needed.
- Customers can pay in a currency that's not their local currency. For example, you can offer pricing in US Dollar to customers where the dollar is popular but not the official currency.
- You can use price overrides to offer country-specific prices, regardless of the currency.
- Paddle takes care of taxes and handles sales tax liability for all currencies and countries.

### Payouts

- When customers make a purchase, you can hold your balance in US Dollar (`USD`), euro (`EUR`), Pound Sterling (`GBP`), Australian Dollar (`AUD`), and Canadian Dollar (`CAD`).
- You can get paid by Paddle in a currency that's different to your balance currency.
- You can query the API to get a breakdown of earnings and fees for a transaction.

Set your balance currency in **Paddle > My account > Settings > Currencies**, or using the API with {% method-badge method="PATCH" /%} [`/settings/balance-currency`](https://developer.paddle.com/api-reference/settings/update-balance-currency.md).

## List of supported currencies

You can also get this list programmatically. {% method-badge method="GET" /%} [`/currencies`](https://developer.paddle.com/api-reference/currencies/list-currencies.md) returns every currency that Paddle supports, including the number of decimals used and the minimum amount Paddle can charge.

### Payment currencies

| Code | Name | Decimals | Bank transfers | Min. charge |
| --- | --- | --- | --- | --- |
| USD | US Dollar | 2 | Yes | 0.70 |
| GBP | Pound Sterling | 2 | Yes | 0.55 |
| EUR | Euro | 2 | Yes | 0.65 |
| ARS | Argentine Peso | 2 |  | 780.00 |
| AUD | Australian Dollar | 2 |  | 1.10 |
| BRL | Brazilian Real | 2 |  | 4.00 |
| CAD | Canadian Dollar | 2 |  | 1.00 |
| CHF | Swiss Franc | 2 |  | 0.60 |
| CLP | Chilean Peso | 0 |  | 800 |
| CNY | Chinese Yuan | 2 |  | 5.10 |
| COP | Colombian Peso | 2 |  | 2980.00 |
| CZK | Czech Koruna | 2 |  | 15.50 |
| DKK | Danish Krone | 2 |  | 4.70 |
| HKD | Hong Kong Dollar | 2 |  | 5.50 |
| HUF | Hungarian Forint | 2 |  | 252.00 |
| ILS | Israeli Shekels | 2 |  | 2.50 |
| INR | Indian Rupee | 2 |  | 60.00 |
| JPY | Japanese Yen | 0 |  | 100 |
| KRW | South Korean Won | 0 |  | 980 |
| MXN | Mexican Pesos | 2 |  | 13.70 |
| NOK | Norwegian Krone | 2 |  | 7.25 |
| NZD | New Zealand Dollar | 2 |  | 1.20 |
| PEN | Peruvian Sol | 2 |  | 2.50 |
| PLN | Polish Zloty | 2 |  | 2.65 |
| RUB | Ruble | 2 |  | 59.00 |
| SEK | Swedish Krona | 2 |  | 6.80 |
| SGD | Singapore Dollar | 2 |  | 0.90 |
| THB | Thai Baht | 2 |  | 23.00 |
| TRY | Turkish Lira | 2 |  | 27.00 |
| TWD | New Taiwan Dollar | 2 |  | 25.00 |
| UAH | Ukraine Hryvnia | 2 |  | 29.00 |
| VND | Vietnamese Dong | 0 |  | 20276 |
| ZAR | South African Rand | 2 |  | 12.75 |

### Payout currencies

| Code | Name | Balance currency |
| --- | --- | --- |
| USD | US Dollar | Yes |
| GBP | Pound Sterling | Yes |
| EUR | Euro | Yes |
| AUD | Australian Dollar | Yes |
| CAD | Canadian Dollar | Yes |
| CHF | Swiss Franc |  |
| CNY | Chinese Yuan |  |
| CZK | Czech Koruna |  |
| DKK | Danish Krone |  |
| HUF | Hungarian Forint |  |
| PLN | Polish Zloty |  |
| SEK | Swedish Krona |  |
| ZAR | South African Rand |  |
HTTP 200
