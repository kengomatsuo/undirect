---
title: "Card multi-currency processing"
slug: "card-multi-currency-processing"
description: "Optimize your international sales with Xendit's Card Multi-Currency Processing, allowing shoppers to pay in their currency while you settle in yours."
tags: ["currencies", "multiple currencies"]
updated: 2026-09-09T02:30:46Z
published: 2026-09-09T02:30:46Z
canonical: "docs.xendit.co/card-multi-currency-processing"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.xendit.co/llms.txt
> Use this file to discover all available pages before exploring further.

# Card multi-currency processing

## Overview

Card Multi-Currency Processing lets your shoppers pay with their cards in a wide range of currencies supported by the card schemes, while you continue to get paid in a single settlement currency of your choice.

Previously, accepting a foreign card meant the charge was processed and settled in your local currency, and the shopper's bank applied its own conversion and fees to the shopper's statement. With Card multi-currency processing, you can present the charge to the shopper in their own currency, improving conversion and reducing surprises at the bank statement while Xendit handles the conversion, scheme settlement, and reconciliation on the back end. Funds land in your balance in a predictable currency.

Card multi-currency processing is best suited for:

- **Card-heavy merchants** who want to maximize authorization rates and conversion on international cards.
- **Cross-border and international merchants** selling to shoppers across multiple countries from a single Xendit integration.

Card multi-currency rpocessing is available across the following Xendit checkout integrations:

- Payment Session
- Xendit Components
- Payments API (v3)

> Card multi-currency processing currently supports **card** payment methods (Visa, Mastercard, and other supported schemes, subject to availability per country).

---

## How it works

A multi-currency transaction involves two currencies. Understanding them is the key to reading your transaction reports and reconciling settlements.

| Term | Description |
| --- | --- |
| **Transacting currency** | The currency the shopper is charged in - what appears on their card statement (also called the *presentment* currency). |
| **Settlement currency** | The currency the transaction is settled in. |

The end-to-end flow:

1. **Shopper pays in currency A.** The shopper sees and is charged in the transacting currency (for example, EUR), so the amount on their statement matches what they expected to pay.
2. **The transaction is settled in currency B.** Depending on your country, this is either USD or your local currency. Xendit applies the FX conversion, scheme and processing fees, and credits the net amount to your balance in the settlement currency.

Xendit manages the FX, the fees, and the reconciliation throughout, and gives you full visibility of the rate and amounts applied to every transaction.

### A worked example

Suppose you are a merchant in Singapore and a shopper in the Eurozone pays you **EUR 100**:

- **Transacting:** The shopper is charged **EUR 100** - this is what appears on their card statement.
- **FX conversion:** Xendit converts EUR → USD using a daily reference rate from a trusted third-party rate provider, plus your configured FX spread.
- **Settlement:** The transaction is settled in **USD** (Singapore non-local currencies settle in USD), and the converted amount, net of fees, is credited to your USD balance.

---

## Pricing and FX

Multi-currency processing is priced separately from standard foreign card acceptance and has two components:

- **Multi-currency processing rate**;  a billing rate specific to Card multi-currency processing transactions. This rate is set per country and is higher than the standard foreign card rate.
- **FX spread**; a percentage spread applied on top of the daily reference rate to convert the transacting currency into your settlement currency.

**How the FX rate is determined.** Xendit prices conversions using a daily reference rate sourced from a trusted third-party rate provider, plus a configurable **FX spread (%)**. Both the multi-currency processing rate and the FX spread are configured per country.

> The processing rate and FX spread that apply to your account are configured by Xendit for your country. Contact your account manager or [Xendit support](https://www.xendit.co/en/contact/) for the rates applicable to you.

---

## Transactions view and reporting

For every Card multi-currency processing transaction, your dashboard and transaction reports show the full money trail so you can reconcile precisely:

| Field | What it shows |
| --- | --- |
| **Transacting amount and currency** | What the shopper actually paid. |
| **Settlement amount and currency** | The currency and net amount settled and credited to your balance. |
| **Xendit FX** | The applied rate — the daily reference rate plus your FX spread (%). |

This gives you clear visibility of the rates and amounts on each transaction, end to end.

---

## Transaction reconciliation

Because a multi-currency transaction moves through a transacting currency, an FX conversion, and a settlement currency, your reconciliation needs to tie all three together. The Xendit transaction report exposes each of these values as dedicated columns so you can reconcile a single transaction end to end.

### Reconciliation columns

When you export a transaction report, the following columns capture the multi-currency money trail. See [Transactions report → Additional columns](https://docs.xendit.co/docs/transactions-report#additional-columns) for the full list of available and additional columns.

| Column | What it shows |
| --- | --- |
| **Currency** | The transacting currency — the currency the shopper was charged in. |
| **Amount** | The amount the shopper was charged, in the transacting currency. |
| **Converted Currency** | The currency the transaction amount is converted into when FX conversion happens. |
| **Converted Amount** | The amount after currency conversion, expressed in the converted currency. |
| **Settlement Currency** | The currency the funds are settled to your account in. |
| **Net Amount Currency** | The balance currency the transaction is settled to, after fees. |
| **Net Amount** | The net amount credited to your balance, after fees and taxes. |
| **Forex Rate** | The FX rate applied to the transaction. *Available via on-demand report.* |

> Some columns, such as **Forex Rate**, are only included when you generate an on-demand report. Enable the additional columns you need when exporting.

### Worked example

Consider a card payment where a shopper is charged **IDR 10,000** and you are settled in **USD**. The transaction report and dashboard show a consistent trail across all three views:

| Field | Value |
| --- | --- |
| Currency / Amount (transacting) | IDR 10,000.00 |
| Converted Currency / Converted Amount | USD 0.54 |
| Settlement Currency | USD |
| Net Amount Currency / Net Amount | USD 0.51 |

In the **Transactions** list, the payment appears in the transacting currency (IDR 10,000.00) with the card channel and reference. Opening the transaction shows the **Transaction Breakdown**: the transaction amount (IDR 10,000), the converted amount (USD 0.54), and the net amount (USD 0.51). On the **Balance** page, the same transaction is credited to your USD balance as USD 0.51, annotated with the original amount it was converted from (IDR 10,000.00).

To reconcile, match the transaction on your **Reference** or **Transaction ID**, confirm the transacting **Amount** and **Currency** against your order records, and confirm the **Net Amount** and **Net Amount Currency** against the credit on your Xendit balance.

---

## Availability

Card multi-currency processing is rolling out globally on a country-by-country basis, prioritized by demand, market fit, and readiness. Availability depends on Xendit's processing and settlement capabilities in each market.

Rollout sequence:

1. Hong Kong - Visa / Mastercard supported
2. Singapore - Visa / Mastercard supported
3. Thailand - Visa / Mastercard supported, except for domestic debit
4. Malaysia - Not supported yet
5. Philippines - Not supported yet

### Supported transacting and settlement currencies by country

| Country | Transacting currencies | Settlement currency |
| --- | --- | --- |
| Hong Kong / Singapore | All scheme-supported currencies | Local currency settles locally; non-local currencies settle in USD |
| Thailand | Subset of currency pairs | THB |
| Malaysia | Subset of currency pairs | MYR |
| Philippines | Subset of currency pairs | PHP |

> Thailand, Malaysia, and the Philippines currently support a smaller subset of currency pairs. The full list of currencies will be available soon. For the specific per-country coverage, please check with your account manager.

For Thailand, Malaysia, and the Philippines, the currencies currently supported for transacting are:

| Code | Currency |
| --- | --- |
| USD | US Dollar |
| EUR | Euro |
| HKD | Hong Kong Dollar |
| SGD | Singapore Dollar |
| IDR | Indonesian Rupiah |
| PHP | Philippine Peso |
| MYR | Malaysian Ringgit |
| THB | Thai Baht |
| VND | Vietnamese Dong |

---

## Supported currencies

The table below lists the currencies supported for multi-currency processing, along with their ISO 4217 currency code and the number of decimal places for each.

Availability of a specific currency for your account depends on your country and the per-country coverage described in [Availability](/docs/card-multi-currency-processing#availability). Use the three-letter currency code when specifying the transacting currency in your integration.

### Currency codes

| Code | Currency | Decimals |
| --- | --- | --- |
| AED | United Arab Emirates Dirham | 2 |
| AFN | Afghanistan Afghani | 2 |
| ALL | Albanian Lek | 2 |
| AMD | Armenian Dram | 2 |
| AOA | Angola Kwanza | 2 |
| ARS | Argentine Peso | 2 |
| AUD | Australian Dollar | 2 |
| AZN | Azerbaijanian Manat | 2 |
| BAM | Bosnia and Herzegovina Convertible Mark | 2 |
| BDT | Bangladeshi Taka | 2 |
| BGN | Bulgarian Lev | 2 |
| BHD | Bahraini Dinar | 3 |
| BIF | Burundi Franc | 0 |
| BND | Brunei Dollar | 2 |
| BOB | Boliviano | 2 |
| BRL | Brazilian Real | 2 |
| BWP | Botswana Pula | 2 |
| BYN | Belarusian Ruble | 2 |
| CAD | Canadian Dollar | 2 |
| CDF | Congolese Franc | 2 |
| CHF | Swiss Franc | 2 |
| CLP | Chilean Peso | 0 |
| CNY | Yuan Renminbi | 2 |
| COP | Colombian Peso | 2 |
| CRC | Costa Rican Colon | 2 |
| CZK | Czech Koruna | 2 |
| DKK | Danish Krone | 2 |
| DOP | Dominican Peso | 2 |
| DZD | Algerian Dinar | 2 |
| EGP | Egyptian Pound | 2 |
| ETB | Ethiopian Birr | 2 |
| EUR | Euro | 2 |
| FJD | Fiji Dollar | 2 |
| GBP | Pound Sterling | 2 |
| GEL | Georgian Lari | 2 |
| GHS | Ghana Cedi | 2 |
| GIP | Gibraltar Pound | 2 |
| GMD | Gambian Dalasi | 2 |
| GNF | Guinea Franc | 0 |
| GTQ | Guatemalan Quetzal | 2 |
| HKD | Hong Kong Dollar | 2 |
| HNL | Honduran Lempira | 2 |
| HTG | Haitian Gourde | 2 |
| HUF | Hungarian Forint | 2 |
| IDR | Indonesian Rupiah | 2 |
| ILS | New Israeli Sheqel | 2 |
| INR | Indian Rupee | 2 |
| ISK | Iceland Krona | 0 |
| JMD | Jamaican Dollar | 2 |
| JOD | Jordanian Dinar | 3 |
| JPY | Japanese Yen | 0 |
| KES | Kenyan Shilling | 2 |
| KGS | Kyrgyz Som | 2 |
| KHR | Cambodian Riel | 2 |
| KRW | South Korean Won | 0 |
| KWD | Kuwaiti Dinar | 3 |
| KZT | Kazakh Tenge | 2 |
| LAK | Lao Kip | 2 |
| LBP | Lebanese Pound | 2 |
| LKR | Sri Lanka Rupee | 2 |
| LRD | Liberian Dollar | 2 |
| MAD | Moroccan Dirham | 2 |
| MDL | Moldovan Leu | 2 |
| MGA | Malagasy Ariary | 2 |
| MKD | Macedonian Denar | 2 |
| MMK | Myanmar Kyat | 2 |
| MNT | Mongolian Tugrik | 2 |
| MOP | Macanese Pataca | 2 |
| MUR | Mauritius Rupee | 2 |
| MVR | Maldivian Rufiyaa | 2 |
| MWK | Malawi Kwacha | 2 |
| MXN | Mexican Peso | 2 |
| MYR | Malaysian Ringgit | 2 |
| MZN | Mozambique Metical | 2 |
| NAD | Namibia Dollar | 2 |
| NGN | Nigerian Naira | 2 |
| NIO | Nicaraguan Cordoba Oro | 2 |
| NOK | Norwegian Krone | 2 |
| NPR | Nepalese Rupee | 2 |
| NZD | New Zealand Dollar | 2 |
| OMR | Rial Omani | 3 |
| PAB | Panamanian Balboa | 2 |
| PEN | Peruvian Sol | 2 |
| PGK | Papua New Guinean Kina | 2 |
| PHP | Philippine Peso | 2 |
| PKR | Pakistan Rupee | 2 |
| PLN | Polish Zloty | 2 |
| PYG | Paraguayan Guarani | 0 |
| QAR | Qatari Rial | 2 |
| RON | Romanian Leu | 2 |
| RSD | Serbian Dinar | 2 |
| RUB | Russian Ruble | 2 |
| RWF | Rwanda Franc | 0 |
| SAR | Saudi Riyal | 2 |
| SCR | Seychelles Rupee | 2 |
| SEK | Swedish Krona | 2 |
| SGD | Singapore Dollar | 2 |
| SLE | Sierra Leone Leone (new) | 2 |
| SOS | Somali Shilling | 2 |
| SRD | Surinam Dollar | 2 |
| THB | Thai Baht | 2 |
| TJS | Tajikistani Somoni | 2 |
| TND | Tunisian Dinar | 3 |
| TRY | Turkish Lira | 2 |
| TTD | Trinidad and Tobago Dollar | 2 |
| TWD | New Taiwan Dollar | 2 |
| TZS | Tanzanian Shilling | 2 |
| UAH | Ukrainian Hryvnia | 2 |
| UGX | Uganda Shilling | 2 |
| USD | US Dollar | 2 |
| UYU | Peso Uruguayo | 2 |
| UZS | Uzbekistan Sum | 2 |
| VND | Vietnamese Dong | 0 |
| XAF | CFA Franc BEAC | 0 |
| XCD | East Caribbean Dollar | 2 |
| XCG | Caribbean Guilder | 2 |
| XOF | CFA Franc BCEAO | 0 |
| XPF | CFP Franc | 0 |
| YER | Yemeni Rial | 2 |
| ZAR | South African Rand | 2 |
| ZMW | Zambian Kwacha | 2 |

---

## Getting started

Card multi-currency processing is **enabled by default** for eligible merchants in supported countries; there is typically nothing extra to integrate if you already accept cards through one of the supported Xendit checkout products.

To start accepting multi-currency card payments:

1. **Confirm eligibility.** Ensure your account is in a supported country and that cards are active on your account.
2. **Use a supported integration.** Accept cards via the Payment Session Links, Xendit Components and Payments API (v3).
3. **Set the transacting currency.** Present and charge the shopper in their currency using the supported integration's currency parameter.
4. **Reconcile from your reports.** Use the transacting, settled, and FX fields described above to reconcile each transaction.

> Xendit manages Card multi-currency processing rollout by country and by merchant. If you would like multi-currency processing enabled or disabled for your account, contact your account manager.

---

## Frequently asked questions

**How is Card multi-currency processing different from foreign card acceptance?** With standard foreign card acceptance, the charge is processed and settled in your local currency, and the shopper's issuing bank handles the conversion on their side (with its own fees on the shopper's statement). With Card multi-currency processing, the shopper is charged in their own currency and Xendit handles the conversion to your settlement currency — giving the shopper a clearer statement and you predictable settlement.

**What currency does the shopper see on their statement?** The transacting currency; the currency you charged them in. This avoids the unexpected conversion fees and rate surprises that can occur with foreign card transactions.

**What currency will I be paid out in?** Your settlement currency, which depends on your country. For Hong Kong and Singapore, local-currency transactions settle locally and non-local currencies settle in USD. For Thailand, Malaysia, and the Philippines, settlement is in the local currency (THB, MYR, and PHP respectively).

**How is the exchange rate calculated?** Xendit uses a daily reference rate from a trusted third-party rate provider, plus a configurable FX spread (%). The exact rate applied to each transaction is shown in your transaction reporting.

**Which currencies can I accept?** This depends on your country. Hong Kong and Singapore support all scheme-supported currencies; Thailand, Malaysia, and the Philippines currently support a subset of currency pairs. See [Supported currencies](/docs/card-multi-currency-processing#supported-currencies) for the full list of currency codes.

**Do I need multiple bank accounts to use multi-currency processing?** No. Card multi-currency processing is designed specifically so you do not need to maintain multiple bank accounts or handle FX yourself; Xendit converts and settles to a single settlement currency.

---
