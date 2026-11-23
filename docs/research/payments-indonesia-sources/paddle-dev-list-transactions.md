> For the complete documentation index, see [llms.txt](https://developer.paddle.com/llms.txt).
>
> To search these docs, send a `GET` request to `https://paddle-docs-retrieval.kapa-paddle.workers.dev/?q=<question>` with a URL-encoded question. No authentication needed. It returns a JSON array of `{content, source_url}`, most relevant first.

# GET /transactions

**List transactions**

Returns a paginated list of transactions. Use the query parameters to page through results.

Use the `include` parameter to include related entities in the response.

**Required permissions:** `transaction.read`

## Query parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `include` | array | optional | Include related entities in the response. Use a comma-separated list to specify multiple entities. |
| `id` | array | optional | Return only the IDs specified. Use a comma-separated list to get multiple entities. |
| `after` | string | optional | Return entities after the specified Paddle ID when working with paginated endpoints. Used in the `meta.pagination.next` URL in responses for list operations. |
| `billed_at` | string (date-time) | optional | Return entities billed at a specific time. Pass an RFC 3339 datetime string, or use `[LT]` (less than), `[LTE]` (less than or equal to), `[GT]` (greater than), or `[GTE]` (greater than or equal to) operators. For example, `billed_at=2023-04-18T17:03:26Z` or `billed_at[LT]=2023-04-18T17:03:26Z`. (operators: `[LT]`, `[LTE]`, `[GT]`, `[GTE]`, e.g. `billed_at[LT]=2023-04-18T17:03:26Z`) |
| `collection_mode` | string | optional | How payment is collected. `automatic` for checkout, `manual` for invoices. |
| `created_at` | string (date-time) | optional | Return entities created at a specific time. Pass an RFC 3339 datetime string, or use `[LT]` (less than), `[LTE]` (less than or equal to), `[GT]` (greater than), or `[GTE]` (greater than or equal to) operators. For example, `created_at=2023-04-18T17:03:26Z` or `created_at[LT]=2023-04-18T17:03:26Z`. (operators: `[LT]`, `[LTE]`, `[GT]`, `[GTE]`, e.g. `created_at[LT]=2023-04-18T17:03:26Z`) |
| `customer_id` | array | optional | Return entities related to the specified customer. Use a comma-separated list to specify multiple customer IDs. |
| `invoice_number` | array | optional | Return entities that match the invoice number. Use a comma-separated list to specify multiple invoice numbers. |
| `origin` | array | optional | Return entities related to the specified origin. Use a comma-separated list to specify multiple origins. |
| `order_by` | string | optional | Order returned entities by the specified field and direction (`[ASC]` or `[DESC]`). For example, `?order_by=id[ASC]`.

Valid fields for ordering: `billed_at`, `created_at`, `id`, and `updated_at`. (default: `"id[DESC]"`) |
| `status` | array | optional | Return entities that match the specified status. Use a comma-separated list to specify multiple status values. |
| `subscription_id` | array | null | optional | Return entities related to the specified subscription. Use a comma-separated list to specify multiple subscription IDs. Pass `null` to return entities that aren't related to any subscription. |
| `per_page` | integer | optional | Set how many entities are returned per page. Paddle returns the maximum number of results if a number greater than the maximum is requested. Check `meta.pagination.per_page` in the response to see how many were returned.

Default: `30`; Maximum: `30`. (Max: 30; default: `30`) |
| `updated_at` | string (date-time) | optional | Return entities updated at a specific time. Pass an RFC 3339 datetime string, or use `[LT]` (less than), `[LTE]` (less than or equal to), `[GT]` (greater than), or `[GTE]` (greater than or equal to) operators. For example, `updated_at=2023-04-18T17:03:26Z` or `updated_at[LT]=2023-04-18T17:03:26Z`. (operators: `[LT]`, `[LTE]`, `[GT]`, `[GTE]`, e.g. `updated_at[LT]=2023-04-18T17:03:26Z`) |

Values for `include`:

- `address` — Include an object for the address entity related to this transaction. Only included where an `address_id` is set against the transaction.
- `adjustments` — Include an array of adjustments related to this transaction. Only included where a transaction has adjustments.
- `adjustments_totals` — Include an object that includes totals for all adjustments against this transaction.
- `available_payment_methods` — Include an array of available payment methods for this transaction.
- `business` — Include an object for the business entity related to this transaction. Only included where a `business_id` is set against the transaction.
- `customer` — Include an object for the customer entity related to this transaction. Only included where a `customer_id` is set against the transaction.
- `discount` — Include an object for the discount entity related to this transaction. Only included where a `discount_id` is set against the transaction.

Values for `collection_mode`:

- `automatic` — Payment is collected automatically using a checkout initially, then using a payment method on file.
- `manual` — Payment is collected manually. Customers are sent an invoice with payment terms and can make a payment offline or using a checkout. Requires `billing_details`.

Values for `origin`:

- `api` — Return transactions where the origin is `api`. Returned transactions were created by the Paddle API.
- `subscription_charge` — Return transactions where the origin is `subscription_charge`. Returned transactions were created automatically by Paddle as a result of a one-time charge for a subscription.
- `subscription_payment_method_change` — Return transactions where the origin is `subscription_payment_method_change`. Returned transactions were created automatically as part of updating a payment method. May be a zero value transaction.
- `subscription_recurring` — Return transactions where the origin is `subscription_recurring`. Returned transactions were created automatically by Paddle as a result of a subscription renewal.
- `subscription_update` — Return transactions where the origin is `subscription_update`. Returned transactions were created automatically by Paddle as a result of an update to a subscription.
- `subscription_import` — Return transactions where the origin is `subscription_import`. Returned transactions that were created automatically by Paddle as a result of a subscription import.
- `web` — Return transactions where the origin is `web`. Returned transactions were created automatically by Paddle.js for a checkout.

Values for `order_by`:

- `billed_at[ASC]` — Order by `billed_at`, ascending.
- `billed_at[DESC]` — Order by `billed_at`, descending.
- `created_at[ASC]` — Order by `created_at`, ascending.
- `created_at[DESC]` — Order by `created_at`, descending.
- `id[ASC]` — Order by `id`, ascending.
- `id[DESC]` — Order by `id`, descending.
- `updated_at[ASC]` — Order by `updated_at`, ascending.
- `updated_at[DESC]` — Order by `updated_at`, descending.

Values for `status`:

- `draft` — Return transactions where the status is `draft`. Returned transactions are missing required fields.
- `ready` — Return transactions where the status is `ready`. Returned transactions have all of the required fields to be marked as `billed` or `completed`.
- `billed` — Return transactions where the status is `billed`. Returned transactions are considered legal records and cannot be updated, only canceled.
- `paid` — Return transactions where the status is `paid`. Returned transactions are fully paid, but have not yet been fully processed internally.
- `completed` — Return transactions where the status is `completed`. Returned transactions are fully paid and processed.
- `canceled` — Return transactions where the status is `canceled`. Returned transactions have been canceled and are no longer due.
- `past_due` — Return transactions where the status is `past_due`. Returned transactions are past due, meaning payment failed for automatically-collected transactions or no payment was received 24 hours after the due date for manually-collected transactions.

## Response (200)

- `data`: array (required)
  - `id`: string (required) — Unique Paddle ID for this transaction entity, prefixed with `txn_`. (pattern: `^txn_[a-z\d]{26}$`)
  - `status`: string (required) — Status of this transaction. You may set a transaction to `billed` or `canceled`, other statuses are set automatically by Paddle. Automatically-collected transactions may return `completed` if payment is captured successfully, or `past_due` if payment failed.
    - `draft` — Transaction is missing required fields. Typically the first stage of a checkout before customer details are captured.
    - `ready` — Transaction has all of the required fields to be marked as `billed` or `completed`.
    - `billed` — Transaction has been updated to `billed`. Billed transactions get an invoice number and are considered a legal record. They cannot be updated, only canceled. Typically used as part of an invoice workflow.
    - `paid` — Transaction is fully paid, but has not yet been processed internally.
    - `completed` — Transaction is fully paid and processed.
    - `canceled` — Transaction has been updated to `canceled`. If an invoice, it's no longer due.
    - `past_due` — Transaction is past due. Occurs for automatically-collected transactions when the related subscription is in dunning, and for manually-collected transactions when no payment has been received 24 hours after the due date.
  - `customer_id`: string | null (required) — Paddle ID of the customer that this transaction is for, prefixed with `ctm_`. (pattern: `^ctm_[a-z\d]{26}$`)
  - `address_id`: string | null (required) — Paddle ID of the address that this transaction is for, prefixed with `add_`. (pattern: `^add_[a-z\d]{26}$`)
  - `business_id`: string | null (required) — Paddle ID of the business that this transaction is for, prefixed with `biz_`. (pattern: `^biz_[a-z\d]{26}$`)
  - `custom_data`: object | null (required) — Your own structured key-value data.
  - `currency_code`: string (required) — Supported three-letter ISO 4217 currency code. Must be `USD`, `EUR`, or `GBP` if `collection_mode` is `manual`.
    - `USD` — United States Dollar
    - `EUR` — Euro
    - `GBP` — Pound Sterling
    - `JPY` — Japanese Yen
    - `AUD` — Australian Dollar
    - `CAD` — Canadian Dollar
    - `CHF` — Swiss Franc
    - `HKD` — Hong Kong Dollar
    - `SGD` — Singapore Dollar
    - `SEK` — Swedish Krona
    - `ARS` — Argentine Peso
    - `BRL` — Brazilian Real
    - `CLP` — Chilean Peso
    - `CNY` — Chinese Yuan
    - `COP` — Colombian Peso
    - `CZK` — Czech Koruna
    - `DKK` — Danish Krone
    - `HUF` — Hungarian Forint
    - `ILS` — Israeli Shekel
    - `INR` — Indian Rupee
    - `KRW` — South Korean Won
    - `MXN` — Mexican Peso
    - `NOK` — Norwegian Krone
    - `NZD` — New Zealand Dollar
    - `PEN` — Peruvian Sol
    - `PLN` — Polish Zloty
    - `RUB` — Russian Ruble
    - `THB` — Thai Baht
    - `TRY` — Turkish Lira
    - `TWD` — New Taiwan Dollar
    - `UAH` — Ukrainian Hryvnia
    - `VND` — Vietnamese Dong
    - `ZAR` — South African Rand
  - `origin`: string (required) — Describes how this transaction was created.
    - `api` — Transaction created via the Paddle API.
    - `subscription_charge` — Transaction created automatically by Paddle as a result of a one-time charge for a subscription.
    - `subscription_payment_method_change` — Transaction created automatically as part of updating a payment method. May be a zero value transaction.
    - `subscription_recurring` — Transaction created automatically by Paddle as a result of a subscription renewal.
    - `subscription_update` — Transaction created automatically by Paddle as a result of an update to a subscription.
    - `web` — Transaction created automatically by Paddle.js for a checkout.
  - `subscription_id`: string | null (required) — Paddle ID of the subscription that this transaction is for, prefixed with `sub_`. (pattern: `^sub_[a-z\d]{26}$`)
  - `invoice_id`: string | null (required) — Paddle ID of the invoice that this transaction is related to, prefixed with `inv_`. Used for compatibility with the Paddle Invoice API, which is now deprecated. This field is scheduled to be removed in the next version of the Paddle API. (pattern: `^inv_[a-z\d]{26}$`)
  - `invoice_number`: string | null (required) — Invoice number for this transaction. Automatically generated by Paddle when you mark a transaction as `billed` where `collection_mode` is `manual`.
  - `collection_mode`: string (required) — How payment is collected for this transaction. `automatic` for checkout, `manual` for invoices. (default: `"automatic"`)
    - `automatic` — Payment is collected automatically using a checkout initially, then using a payment method on file.
    - `manual` — Payment is collected manually. Customers are sent an invoice with payment terms and can make a payment offline or using a checkout. Requires `billing_details`.
  - `discount_id`: string | null (required) — Paddle ID of the discount applied to this transaction, prefixed with `dsc_`. (pattern: `^dsc_[a-z\d]{26}$`)
  - `billing_details`: object | null (required) — Details for invoicing. Required if `collection_mode` is `manual`.
    - `enable_checkout`: boolean (required) — Whether the related transaction may be paid using Paddle Checkout. If omitted when creating a transaction, defaults to `false`. (default: `false`)
    - `purchase_order_number`: string (required) — Customer purchase order number. Appears on invoice documents. (Max length: 100)
    - `additional_information`: string | null (required) — Notes or other information to include on this invoice. Appears on invoice documents. (Max length: 1500)
    - `payment_terms`: object (required) — How long a customer has to pay this invoice once issued. The invoice is due at the end of its payment terms, and is marked as `past_due` 24 hours after its due date if unpaid.
      - `interval`: string (required) — Unit of time.
        - `day`
        - `week`
        - `month`
        - `year`
      - `frequency`: integer (required) — Amount of time. (Min: 1)
  - `billing_period`: object | null (required) — Time period that this transaction is for. Set automatically by Paddle for subscription renewals to describe the period that charges are for.
    - `starts_at`: string (date-time) (required) — RFC 3339 datetime string of when this period starts.
    - `ends_at`: string (date-time) (required) — RFC 3339 datetime string of when this period ends.
  - `items`: array (required) — List of items on this transaction. For calculated totals, use `details.line_items`. (Items: 1–100)
    - `price`: object (required) — Represents a price entity.
      - `id`: string (required) — Unique Paddle ID for this price, prefixed with `pri_`. (pattern: `^pri_[a-z\d]{26}$`)
      - `product_id`: string (required) — Paddle ID for the product that this price is for, prefixed with `pro_`. (pattern: `^pro_[a-z\d]{26}$`)
      - `description`: string (required) — Internal description for this price, not shown to customers. Typically notes for your team. (Length: 2–500)
      - `type`: string (required) — Type of item. Standard items are considered part of your catalog and are shown in the Paddle dashboard. (default: `"standard"`)
        - `custom` — Non-catalog item. Typically created for a specific transaction or subscription. Not returned when listing or shown in the Paddle dashboard.
        - `standard` — Standard item. Can be considered part of your catalog and reused across transactions and subscriptions easily.
      - `name`: string | null (required) — Name of this price, shown to customers at checkout and on invoices. Typically describes how often the related product bills. (Length: 1–150)
      - `billing_cycle`: object | null (required) — How often this price should be charged. `null` if price is non-recurring (one-time).
        - `interval`: string (required) — Unit of time.
          - `day`
          - `week`
          - `month`
          - `year`
        - `frequency`: integer (required) — Amount of time. (Min: 1)
      - `trial_period`: object | null (required) — Trial period for the product related to this price. The billing cycle begins once the trial period is over. `null` for no trial period. Requires `billing_cycle`.
        - `interval`: string (required) — Unit of time.
          - `day`
          - `week`
          - `month`
          - `year`
        - `frequency`: integer (required) — Amount of time. (Min: 1)
        - `requires_payment_method`: boolean (required) — Whether this price requires a payment method (`true`) or not (`false`) when trialing. If `false`, customers can sign up for subscription without entering their payment details, often referred to as a "cardless trial." (default: `true`)
        - `unit_price`: object | null — Trial price. Customers are billed this amount for the duration of the trial period. Applies to all customers except those in countries with `unit_price_overrides`. If `null`, customers are not charged during the trial.
          - `amount`: string (required) — Amount in the lowest denomination for the currency, e.g. 10 USD = 1000 (cents). Although represented as a string, this value must be a valid integer.
          - `currency_code`: string — Supported three-letter ISO 4217 currency code.
            - `USD` — United States Dollar
            - `EUR` — Euro
            - `GBP` — Pound Sterling
            - `JPY` — Japanese Yen
            - `AUD` — Australian Dollar
            - `CAD` — Canadian Dollar
            - `CHF` — Swiss Franc
            - `HKD` — Hong Kong Dollar
            - `SGD` — Singapore Dollar
            - `SEK` — Swedish Krona
            - `ARS` — Argentine Peso
            - `BRL` — Brazilian Real
            - `CLP` — Chilean Peso
            - `CNY` — Chinese Yuan
            - `COP` — Colombian Peso
            - `CZK` — Czech Koruna
            - `DKK` — Danish Krone
            - `HUF` — Hungarian Forint
            - `ILS` — Israeli Shekel
            - `INR` — Indian Rupee
            - `KRW` — South Korean Won
            - `MXN` — Mexican Peso
            - `NOK` — Norwegian Krone
            - `NZD` — New Zealand Dollar
            - `PEN` — Peruvian Sol
            - `PLN` — Polish Zloty
            - `RUB` — Russian Ruble
            - `THB` — Thai Baht
            - `TRY` — Turkish Lira
            - `TWD` — New Taiwan Dollar
            - `UAH` — Ukrainian Hryvnia
            - `VND` — Vietnamese Dong
            - `ZAR` — South African Rand
        - `unit_price_overrides`: array — List of unit price overrides for trial pricing. Use to override base trial price with a custom trial price and currency for a country or group of countries. (Items: max 250)
          - `country_codes`: array (required) — Supported two-letter ISO 3166-1 alpha-2 country code. Customers located in the listed countries are charged the override price. (Items: min 1, unique)
            - Country code (supported) — Two-letter code for a country that Paddle supports sales to. Typically an ISO 3166-1 alpha-2 code, though Paddle uses a small number of codes that ISO doesn't currently assign.
              - `AD` — Andorra
              - `AE` — United Arab Emirates
              - `AG` — Antigua and Barbuda
              - `AI` — Anguilla
              - `AL` — Albania
              - `AM` — Armenia
              - `AO` — Angola
              - `AR` — Argentina
              - `AS` — American Samoa
              - `AT` — Austria
              - `AU` — Australia
              - `AW` — Aruba
              - `AX` — Åland Islands
              - `AZ` — Azerbaijan
              - `BA` — Bosnia and Herzegovina
              - `BB` — Barbados
              - `BD` — Bangladesh
              - `BE` — Belgium
              - `BF` — Burkina Faso
              - `BG` — Bulgaria
              - `BH` — Bahrain
              - `BI` — Burundi
              - `BJ` — Benin
              - `BL` — Saint Barthélemy
              - `BM` — Bermuda
              - `BN` — Brunei
              - `BO` — Bolivia
              - `BQ` — Caribbean Netherlands (Bonaire, Sint Eustatius, and Saba)
              - `BR` — Brazil
              - `BS` — Bahamas
              - `BT` — Bhutan
              - `BV` — Bouvet Island
              - `BW` — Botswana
              - `BZ` — Belize
              - `CA` — Canada
              - `CC` — Cocos Islands
              - `CG` — Republic of Congo
              - `CH` — Switzerland
              - `CI` — Côte d'Ivoire (Ivory Coast)
              - `CK` — Cook Islands
              - `CL` — Chile
              - `CM` — Cameroon
              - `CN` — China
              - `CO` — Colombia
              - `CR` — Costa Rica
              - `CV` — Cape Verde
              - `CW` — Curaçao
              - `CX` — Christmas Island
              - `CY` — Cyprus
              - `CZ` — Czechia (Czech Republic)
              - `DE` — Germany
              - `DJ` — Djibouti
              - `DK` — Denmark
              - `DM` — Dominica
              - `DO` — Dominican Republic
              - `DZ` — Algeria
              - `EC` — Ecuador
              - `EE` — Estonia
              - `EG` — Egypt
              - `EH` — Western Sahara
              - `ER` — Eritrea
              - `ES` — Spain
              - `ET` — Ethiopia
              - `FI` — Finland
              - `FJ` — Fiji
              - `FK` — Falkland Islands
              - `FM` — Micronesia
              - `FO` — Faroe Islands
              - `FR` — France
              - `GA` — Gabon
              - `GB` — United Kingdom
              - `GD` — Grenada
              - `GE` — Georgia
              - `GF` — French Guiana
              - `GG` — Guernsey
              - `GH` — Ghana
              - `GI` — Gibraltar
              - `GL` — Greenland
              - `GM` — Gambia
              - `GN` — Guinea
              - `GP` — Guadeloupe
              - `GQ` — Equatorial Guinea
              - `GR` — Greece
              - `GS` — South Georgia and the South Sandwich Islands
              - `GT` — Guatemala
              - `GU` — Guam
              - `GW` — Guinea-Bissau
              - `GY` — Guyana
              - `HK` — Hong Kong
              - `HM` — Heard Island and McDonald Islands
              - `HN` — Honduras
              - `HR` — Croatia
              - `HU` — Hungary
              - `ID` — Indonesia
              - `IE` — Ireland
              - `IL` — Israel
              - `IM` — Isle of Man
              - `IN` — India
              - `IO` — British Indian Ocean Territory
              - `IQ` — Iraq
              - `IS` — Iceland
              - `IT` — Italy
              - `JE` — Jersey
              - `JM` — Jamaica
              - `JO` — Jordan
              - `JP` — Japan
              - `KE` — Kenya
              - `KG` — Kyrgyzstan
              - `KH` — Cambodia
              - `KI` — Kiribati
              - `KM` — Comoros
              - `KN` — Saint Kitts and Nevis
              - `KR` — South Korea
              - `KW` — Kuwait
              - `KY` — Cayman Islands
              - `KZ` — Kazakhstan
              - `LA` — Lao People's Democratic Republic (Laos)
              - `LB` — Lebanon
              - `LC` — Saint Lucia
              - `LI` — Liechtenstein
              - `LK` — Sri Lanka
              - `LR` — Liberia
              - `LS` — Lesotho
              - `LT` — Lithuania
              - `LU` — Luxembourg
              - `LV` — Latvia
              - `MA` — Morocco
              - `MC` — Monaco
              - `MD` — Moldova
              - `ME` — Montenegro
              - `MF` — Saint Martin
              - `MG` — Madagascar
              - `MH` — Marshall Islands
              - `MK` — Macedonia
              - `MN` — Mongolia
              - `MO` — Macao
              - `MP` — Northern Mariana Islands
              - `MQ` — Martinique
              - `MR` — Mauritania
              - `MS` — Montserrat
              - `MT` — Malta
              - `MU` — Mauritius
              - `MV` — Maldives
              - `MW` — Malawi
              - `MX` — Mexico
              - `MY` — Malaysia
              - `MZ` — Mozambique
              - `NA` — Namibia
              - `NC` — New Caledonia
              - `NE` — Niger
              - `NF` — Norfolk Island
              - `NG` — Nigeria
              - `NL` — Netherlands
              - `NO` — Norway
              - `NP` — Nepal
              - `NR` — Nauru
              - `NU` — Niue
              - `NZ` — New Zealand
              - `OM` — Oman
              - `PA` — Panama
              - `PE` — Peru
              - `PF` — French Polynesia
              - `PG` — Papua New Guinea
              - `PH` — Philippines
              - `PK` — Pakistan
              - `PL` — Poland
              - `PM` — Saint Pierre and Miquelon
              - `PN` — Pitcairn
              - `PR` — Puerto Rico
              - `PS` — Palestinian territories
              - `PT` — Portugal
              - `PW` — Palau
              - `PY` — Paraguay
              - `QA` — Qatar
              - `RE` — Reunion
              - `RO` — Romania
              - `RS` — Republic of Serbia
              - `RW` — Rwanda
              - `SA` — Saudi Arabia
              - `SB` — Solomon Islands
              - `SC` — Seychelles
              - `SE` — Sweden
              - `SG` — Singapore
              - `SH` — Saint Helena
              - `SI` — Slovenia
              - `SJ` — Svalbard and Jan Mayen
              - `SK` — Slovakia
              - `SL` — Sierra Leone
              - `SM` — San Marino
              - `SN` — Senegal
              - `SR` — Suriname
              - `ST` — São Tomé and Príncipe
              - `SV` — El Salvador
              - `SX` — Sint Maarten
              - `SZ` — Swaziland
              - `TC` — Turks and Caicos Islands
              - `TD` — Chad
              - `TF` — French Southern and Antarctic Lands
              - `TG` — Togo
              - `TH` — Thailand
              - `TJ` — Tajikistan
              - `TK` — Tokelau
              - `TL` — Timor-Leste
              - `TM` — Turkmenistan
              - `TN` — Tunisia
              - `TO` — Tonga
              - `TR` — Turkey
              - `TT` — Trinidad and Tobago
              - `TV` — Tuvalu
              - `TW` — Taiwan
              - `TZ` — Tanzania
              - `UA` — Ukraine
              - `UG` — Uganda
              - `UM` — United States Minor Outlying Islands
              - `US` — United States
              - `UY` — Uruguay
              - `UZ` — Uzbekistan
              - `VA` — Holy See (Vatican City)
              - `VC` — Saint Vincent and the Grenadines
              - `VG` — British Virgin Islands
              - `VI` — U.S. Virgin Islands
              - `VN` — Vietnam
              - `VU` — Vanuatu
              - `WF` — Wallis and Futuna
              - `WS` — Samoa
              - `XK` — Kosovo
              - `YT` — Mayotte
              - `ZA` — South Africa
              - `ZM` — Zambia
            - Country code (unsupported) — Two-letter code for a country that Paddle doesn't support sales to. Typically an ISO 3166-1 alpha-2 code, though Paddle uses a small number of codes that ISO doesn't currently assign.
              - `AF` — Afghanistan
              - `AQ` — Antarctica
              - `AN` — Netherlands Antilles. Withdrawn ISO 3166-1 code, succeeded by BQ, CW and SX.
              - `BY` — Belarus
              - `CD` — Democratic Republic of Congo
              - `CF` — Central African Republic
              - `CU` — Cuba
              - `CS` — Serbia and Montenegro. Withdrawn ISO 3166-1 code, succeeded by RS and ME.
              - `HT` — Haiti
              - `IR` — Iran
              - `KP` — North Korea
              - `LY` — Libya
              - `ML` — Mali
              - `MM` — Myanmar (Burma)
              - `NI` — Nicaragua
              - `RU` — Russia
              - `SO` — Somalia
              - `SS` — South Sudan
              - `SD` — Sudan
              - `SY` — Syria
              - `VE` — Venezuela
              - `YE` — Yemen
              - `ZW` — Zimbabwe
          - `unit_price`: object (required) — Override price. This price applies to customers located in the countries for this unit price override.
            - `amount`: string (required) — Amount in the lowest denomination for the currency, e.g. 10 USD = 1000 (cents). Although represented as a string, this value must be a valid integer.
            - `currency_code`: string — Supported three-letter ISO 4217 currency code.
              - `USD` — United States Dollar
              - `EUR` — Euro
              - `GBP` — Pound Sterling
              - `JPY` — Japanese Yen
              - `AUD` — Australian Dollar
              - `CAD` — Canadian Dollar
              - `CHF` — Swiss Franc
              - `HKD` — Hong Kong Dollar
              - `SGD` — Singapore Dollar
              - `SEK` — Swedish Krona
              - `ARS` — Argentine Peso
              - `BRL` — Brazilian Real
              - `CLP` — Chilean Peso
              - `CNY` — Chinese Yuan
              - `COP` — Colombian Peso
              - `CZK` — Czech Koruna
              - `DKK` — Danish Krone
              - `HUF` — Hungarian Forint
              - `ILS` — Israeli Shekel
              - `INR` — Indian Rupee
              - `KRW` — South Korean Won
              - `MXN` — Mexican Peso
              - `NOK` — Norwegian Krone
              - `NZD` — New Zealand Dollar
              - `PEN` — Peruvian Sol
              - `PLN` — Polish Zloty
              - `RUB` — Russian Ruble
              - `THB` — Thai Baht
              - `TRY` — Turkish Lira
              - `TWD` — New Taiwan Dollar
              - `UAH` — Ukrainian Hryvnia
              - `VND` — Vietnamese Dong
              - `ZAR` — South African Rand
      - `tax_mode`: string (required) — How tax is calculated for this price. (default: `"account_setting"`)
        - `account_setting` — Prices use the setting from your account.
        - `external` — Prices are exclusive of tax.
        - `internal` — Prices are inclusive of tax.
        - `location` — Prices are inclusive or exclusive of tax, depending on the country of the transaction.
      - `unit_price`: object (required) — Base price. This price applies to all customers, except for customers located in countries where you have `unit_price_overrides`.
        - `amount`: string (required) — Amount in the lowest denomination for the currency, e.g. 10 USD = 1000 (cents). Although represented as a string, this value must be a valid integer.
        - `currency_code`: string (required) — Supported three-letter ISO 4217 currency code.
          - `USD` — United States Dollar
          - `EUR` — Euro
          - `GBP` — Pound Sterling
          - `JPY` — Japanese Yen
          - `AUD` — Australian Dollar
          - `CAD` — Canadian Dollar
          - `CHF` — Swiss Franc
          - `HKD` — Hong Kong Dollar
          - `SGD` — Singapore Dollar
          - `SEK` — Swedish Krona
          - `ARS` — Argentine Peso
          - `BRL` — Brazilian Real
          - `CLP` — Chilean Peso
          - `CNY` — Chinese Yuan
          - `COP` — Colombian Peso
          - `CZK` — Czech Koruna
          - `DKK` — Danish Krone
          - `HUF` — Hungarian Forint
          - `ILS` — Israeli Shekel
          - `INR` — Indian Rupee
          - `KRW` — South Korean Won
          - `MXN` — Mexican Peso
          - `NOK` — Norwegian Krone
          - `NZD` — New Zealand Dollar
          - `PEN` — Peruvian Sol
          - `PLN` — Polish Zloty
          - `RUB` — Russian Ruble
          - `THB` — Thai Baht
          - `TRY` — Turkish Lira
          - `TWD` — New Taiwan Dollar
          - `UAH` — Ukrainian Hryvnia
          - `VND` — Vietnamese Dong
          - `ZAR` — South African Rand
      - `unit_price_overrides`: array (required) — List of unit price overrides. Use to override the base price with a custom price and currency for a country or group of countries. (Items: max 250)
        - `country_codes`: array (required) — Supported two-letter ISO 3166-1 alpha-2 country code. Customers located in the listed countries are charged the override price. (Items: min 1, unique)
          - Country code (supported) — Two-letter code for a country that Paddle supports sales to. Typically an ISO 3166-1 alpha-2 code, though Paddle uses a small number of codes that ISO doesn't currently assign.
            - `AD` — Andorra
            - `AE` — United Arab Emirates
            - `AG` — Antigua and Barbuda
            - `AI` — Anguilla
            - `AL` — Albania
            - `AM` — Armenia
            - `AO` — Angola
            - `AR` — Argentina
            - `AS` — American Samoa
            - `AT` — Austria
            - `AU` — Australia
            - `AW` — Aruba
            - `AX` — Åland Islands
            - `AZ` — Azerbaijan
            - `BA` — Bosnia and Herzegovina
            - `BB` — Barbados
            - `BD` — Bangladesh
            - `BE` — Belgium
            - `BF` — Burkina Faso
            - `BG` — Bulgaria
            - `BH` — Bahrain
            - `BI` — Burundi
            - `BJ` — Benin
            - `BL` — Saint Barthélemy
            - `BM` — Bermuda
            - `BN` — Brunei
            - `BO` — Bolivia
            - `BQ` — Caribbean Netherlands (Bonaire, Sint Eustatius, and Saba)
            - `BR` — Brazil
            - `BS` — Bahamas
            - `BT` — Bhutan
            - `BV` — Bouvet Island
            - `BW` — Botswana
            - `BZ` — Belize
            - `CA` — Canada
            - `CC` — Cocos Islands
            - `CG` — Republic of Congo
            - `CH` — Switzerland
            - `CI` — Côte d'Ivoire (Ivory Coast)
            - `CK` — Cook Islands
            - `CL` — Chile
            - `CM` — Cameroon
            - `CN` — China
            - `CO` — Colombia
            - `CR` — Costa Rica
            - `CV` — Cape Verde
            - `CW` — Curaçao
            - `CX` — Christmas Island
            - `CY` — Cyprus
            - `CZ` — Czechia (Czech Republic)
            - `DE` — Germany
            - `DJ` — Djibouti
            - `DK` — Denmark
            - `DM` — Dominica
            - `DO` — Dominican Republic
            - `DZ` — Algeria
            - `EC` — Ecuador
            - `EE` — Estonia
            - `EG` — Egypt
            - `EH` — Western Sahara
            - `ER` — Eritrea
            - `ES` — Spain
            - `ET` — Ethiopia
            - `FI` — Finland
            - `FJ` — Fiji
            - `FK` — Falkland Islands
            - `FM` — Micronesia
            - `FO` — Faroe Islands
            - `FR` — France
            - `GA` — Gabon
            - `GB` — United Kingdom
            - `GD` — Grenada
            - `GE` — Georgia
            - `GF` — French Guiana
            - `GG` — Guernsey
            - `GH` — Ghana
            - `GI` — Gibraltar
            - `GL` — Greenland
            - `GM` — Gambia
            - `GN` — Guinea
            - `GP` — Guadeloupe
            - `GQ` — Equatorial Guinea
            - `GR` — Greece
            - `GS` — South Georgia and the South Sandwich Islands
            - `GT` — Guatemala
            - `GU` — Guam
            - `GW` — Guinea-Bissau
            - `GY` — Guyana
            - `HK` — Hong Kong
            - `HM` — Heard Island and McDonald Islands
            - `HN` — Honduras
            - `HR` — Croatia
            - `HU` — Hungary
            - `ID` — Indonesia
            - `IE` — Ireland
            - `IL` — Israel
            - `IM` — Isle of Man
            - `IN` — India
            - `IO` — British Indian Ocean Territory
            - `IQ` — Iraq
            - `IS` — Iceland
            - `IT` — Italy
            - `JE` — Jersey
            - `JM` — Jamaica
            - `JO` — Jordan
            - `JP` — Japan
            - `KE` — Kenya
            - `KG` — Kyrgyzstan
            - `KH` — Cambodia
            - `KI` — Kiribati
            - `KM` — Comoros
            - `KN` — Saint Kitts and Nevis
            - `KR` — South Korea
            - `KW` — Kuwait
            - `KY` — Cayman Islands
            - `KZ` — Kazakhstan
            - `LA` — Lao People's Democratic Republic (Laos)
            - `LB` — Lebanon
            - `LC` — Saint Lucia
            - `LI` — Liechtenstein
            - `LK` — Sri Lanka
            - `LR` — Liberia
            - `LS` — Lesotho
            - `LT` — Lithuania
            - `LU` — Luxembourg
            - `LV` — Latvia
            - `MA` — Morocco
            - `MC` — Monaco
            - `MD` — Moldova
            - `ME` — Montenegro
            - `MF` — Saint Martin
            - `MG` — Madagascar
            - `MH` — Marshall Islands
            - `MK` — Macedonia
            - `MN` — Mongolia
            - `MO` — Macao
            - `MP` — Northern Mariana Islands
            - `MQ` — Martinique
            - `MR` — Mauritania
            - `MS` — Montserrat
            - `MT` — Malta
            - `MU` — Mauritius
            - `MV` — Maldives
            - `MW` — Malawi
            - `MX` — Mexico
            - `MY` — Malaysia
            - `MZ` — Mozambique
            - `NA` — Namibia
            - `NC` — New Caledonia
            - `NE` — Niger
            - `NF` — Norfolk Island
            - `NG` — Nigeria
            - `NL` — Netherlands
            - `NO` — Norway
            - `NP` — Nepal
            - `NR` — Nauru
            - `NU` — Niue
            - `NZ` — New Zealand
            - `OM` — Oman
            - `PA` — Panama
            - `PE` — Peru
            - `PF` — French Polynesia
            - `PG` — Papua New Guinea
            - `PH` — Philippines
            - `PK` — Pakistan
            - `PL` — Poland
            - `PM` — Saint Pierre and Miquelon
            - `PN` — Pitcairn
            - `PR` — Puerto Rico
            - `PS` — Palestinian territories
            - `PT` — Portugal
            - `PW` — Palau
            - `PY` — Paraguay
            - `QA` — Qatar
            - `RE` — Reunion
            - `RO` — Romania
            - `RS` — Republic of Serbia
            - `RW` — Rwanda
            - `SA` — Saudi Arabia
            - `SB` — Solomon Islands
            - `SC` — Seychelles
            - `SE` — Sweden
            - `SG` — Singapore
            - `SH` — Saint Helena
            - `SI` — Slovenia
            - `SJ` — Svalbard and Jan Mayen
            - `SK` — Slovakia
            - `SL` — Sierra Leone
            - `SM` — San Marino
            - `SN` — Senegal
            - `SR` — Suriname
            - `ST` — São Tomé and Príncipe
            - `SV` — El Salvador
            - `SX` — Sint Maarten
            - `SZ` — Swaziland
            - `TC` — Turks and Caicos Islands
            - `TD` — Chad
            - `TF` — French Southern and Antarctic Lands
            - `TG` — Togo
            - `TH` — Thailand
            - `TJ` — Tajikistan
            - `TK` — Tokelau
            - `TL` — Timor-Leste
            - `TM` — Turkmenistan
            - `TN` — Tunisia
            - `TO` — Tonga
            - `TR` — Turkey
            - `TT` — Trinidad and Tobago
            - `TV` — Tuvalu
            - `TW` — Taiwan
            - `TZ` — Tanzania
            - `UA` — Ukraine
            - `UG` — Uganda
            - `UM` — United States Minor Outlying Islands
            - `US` — United States
            - `UY` — Uruguay
            - `UZ` — Uzbekistan
            - `VA` — Holy See (Vatican City)
            - `VC` — Saint Vincent and the Grenadines
            - `VG` — British Virgin Islands
            - `VI` — U.S. Virgin Islands
            - `VN` — Vietnam
            - `VU` — Vanuatu
            - `WF` — Wallis and Futuna
            - `WS` — Samoa
            - `XK` — Kosovo
            - `YT` — Mayotte
            - `ZA` — South Africa
            - `ZM` — Zambia
          - Country code (unsupported) — Two-letter code for a country that Paddle doesn't support sales to. Typically an ISO 3166-1 alpha-2 code, though Paddle uses a small number of codes that ISO doesn't currently assign.
            - `AF` — Afghanistan
            - `AQ` — Antarctica
            - `AN` — Netherlands Antilles. Withdrawn ISO 3166-1 code, succeeded by BQ, CW and SX.
            - `BY` — Belarus
            - `CD` — Democratic Republic of Congo
            - `CF` — Central African Republic
            - `CU` — Cuba
            - `CS` — Serbia and Montenegro. Withdrawn ISO 3166-1 code, succeeded by RS and ME.
            - `HT` — Haiti
            - `IR` — Iran
            - `KP` — North Korea
            - `LY` — Libya
            - `ML` — Mali
            - `MM` — Myanmar (Burma)
            - `NI` — Nicaragua
            - `RU` — Russia
            - `SO` — Somalia
            - `SS` — South Sudan
            - `SD` — Sudan
            - `SY` — Syria
            - `VE` — Venezuela
            - `YE` — Yemen
            - `ZW` — Zimbabwe
        - `unit_price`: object (required) — Override price. This price applies to customers located in the countries for this unit price override.
          - `amount`: string (required) — Amount in the lowest denomination for the currency, e.g. 10 USD = 1000 (cents). Although represented as a string, this value must be a valid integer.
          - `currency_code`: string (required) — Supported three-letter ISO 4217 currency code.
            - `USD` — United States Dollar
            - `EUR` — Euro
            - `GBP` — Pound Sterling
            - `JPY` — Japanese Yen
            - `AUD` — Australian Dollar
            - `CAD` — Canadian Dollar
            - `CHF` — Swiss Franc
            - `HKD` — Hong Kong Dollar
            - `SGD` — Singapore Dollar
            - `SEK` — Swedish Krona
            - `ARS` — Argentine Peso
            - `BRL` — Brazilian Real
            - `CLP` — Chilean Peso
            - `CNY` — Chinese Yuan
            - `COP` — Colombian Peso
            - `CZK` — Czech Koruna
            - `DKK` — Danish Krone
            - `HUF` — Hungarian Forint
            - `ILS` — Israeli Shekel
            - `INR` — Indian Rupee
            - `KRW` — South Korean Won
            - `MXN` — Mexican Peso
            - `NOK` — Norwegian Krone
            - `NZD` — New Zealand Dollar
            - `PEN` — Peruvian Sol
            - `PLN` — Polish Zloty
            - `RUB` — Russian Ruble
            - `THB` — Thai Baht
            - `TRY` — Turkish Lira
            - `TWD` — New Taiwan Dollar
            - `UAH` — Ukrainian Hryvnia
            - `VND` — Vietnamese Dong
            - `ZAR` — South African Rand
      - `allowances`: array (early access) — Usage that this price grants for your usage balance units each billing period. At most one allowance for each usage balance unit, and at most 20 allowances in total. Empty if this price doesn't grant any usage. (Items: max 20, unique)
        - `usage_balance_unit_id`: string (required) — Paddle ID of the usage balance unit that this price grants. (pattern: `^ubu_[a-z\d]{26}$`)
        - `amount`: string (required) — Amount of the usage balance unit that this price grants each billing period. Paddle multiplies it by the item quantity. If `"0"`, customers get a usage balance with nothing in it, so all their usage is recorded as overage. (Max length: 45; pattern: `^(0|[1-9][0-9]{0,34})(\.[0-9]{1,9})?$`)
      - `quantity`: object (required) — Limits on how many times the related product can be purchased at this price. Useful for discount campaigns.
        - `minimum`: integer (required) — Minimum quantity of the product related to this price that can be bought. Required if `maximum` set. (Range: 1–999999999; default: `1`)
        - `maximum`: integer (required) — Maximum quantity of the product related to this price that can be bought. Required if `minimum` set. Must be greater than or equal to the `minimum` value. (Range: 1–999999999; default: `100`)
      - `status`: string (required) — Whether this entity can be used in Paddle. (default: `"active"`)
        - `active` — Entity is active and can be used.
        - `archived` — Entity is archived, so can't be used.
      - `custom_data`: object | null (required) — Your own structured key-value data.
      - `import_meta`: object | null (required) — Import information for this entity. `null` if this entity is not imported.
        - `external_id`: string | null — Reference or identifier for this entity from the provider where it was imported from. (Length: 1–200)
        - `imported_from`: string (required) — Name of the platform or provider where this entity was imported from. (Length: 1–200)
      - `created_at`: string (date-time) (required) — RFC 3339 datetime string of when this entity was created. Set automatically by Paddle.
      - `updated_at`: string (date-time) (required) — RFC 3339 datetime string of when this entity was updated. Set automatically by Paddle.
    - `quantity`: integer (required) — Quantity of this item on the transaction.
    - `proration`: object | null (required) — How proration was calculated for this item. Populated when a transaction is created from a subscription change, where `proration_billing_mode` was `prorated_immediately` or `prorated_next_billing_period`. Set automatically by Paddle.
      - `rate`: string (required) — Rate used to calculate proration.
      - `billing_period`: object (required) — Billing period that proration is based on.
        - `starts_at`: string (date-time) (required) — RFC 3339 datetime string of when this period starts.
        - `ends_at`: string (date-time) (required) — RFC 3339 datetime string of when this period ends.
  - `details`: object (required) — Calculated totals for a transaction, including proration, discounts, tax, and currency conversion. Considered the source of truth for totals on a transaction.
    - `tax_rates_used`: array (required) — List of tax rates applied for this transaction.
      - `tax_rate`: string (required) — Rate used to calculate tax for this transaction.
      - `totals`: object (required) — Calculated totals for the tax applied to this transaction.
        - `subtotal`: string (required) — Subtotal before discount, tax, and deductions. If an item, unit price multiplied by quantity.
        - `discount`: string (required) — Total discount as a result of any discounts applied.

Except for percentage discounts, Paddle applies tax to discounts based on the line item `price.tax_mode`. If `price.tax_mode` for a line item is `internal`, Paddle removes tax from the discount applied.
        - `tax`: string (required) — Total tax on the subtotal.
        - `total`: string (required) — Total after discount and tax.
    - `totals`: object (required) — Breakdown of the total for a transaction. These numbers can be negative when dealing with subscription updates that result in credit.
      - `subtotal`: string (required) — Subtotal before discount, tax, and deductions. If an item, unit price multiplied by quantity.
      - `discount`: string (required) — Total discount as a result of any discounts applied.

Except for percentage discounts, Paddle applies tax to discounts based on the line item `price.tax_mode`. If `price.tax_mode` for a line item is `internal`, Paddle removes tax from the discount applied.
      - `tax`: string (required) — Total tax on the subtotal.
      - `total`: string (required) — Total after discount and tax.
      - `credit`: string (required) — Total credit applied to this transaction. This includes credits applied using a customer's credit balance and adjustments to a `billed` transaction.
      - `credit_to_balance`: string (required) — Additional credit generated from negative `details.line_items`. This credit is added to the customer balance.
      - `balance`: string (required) — Total due on a transaction after credits and any payments.
      - `grand_total`: string (required) — Total due on a transaction after credits but before any payments.
      - `grand_total_tax`: string (required) — Net tax amount included in `grand_total`. Equals the full `tax` amount unless credits are applied, in which case this value is proportionally reduced.
      - `fee`: string | null (required) — Total fee taken by Paddle for this transaction. `null` until the transaction is `completed` and the fee is processed.
      - `earnings`: string | null (required) — Total earnings for this transaction. This is the total minus the Paddle fee. `null` until the transaction is `completed` and the fee is processed.
      - `currency_code`: string (required) — Three-letter ISO 4217 currency code of the currency used for this transaction.
        - `USD` — United States Dollar
        - `EUR` — Euro
        - `GBP` — Pound Sterling
        - `JPY` — Japanese Yen
        - `AUD` — Australian Dollar
        - `CAD` — Canadian Dollar
        - `CHF` — Swiss Franc
        - `HKD` — Hong Kong Dollar
        - `SGD` — Singapore Dollar
        - `SEK` — Swedish Krona
        - `ARS` — Argentine Peso
        - `BRL` — Brazilian Real
        - `CLP` — Chilean Peso
        - `CNY` — Chinese Yuan
        - `COP` — Colombian Peso
        - `CZK` — Czech Koruna
        - `DKK` — Danish Krone
        - `HUF` — Hungarian Forint
        - `ILS` — Israeli Shekel
        - `INR` — Indian Rupee
        - `KRW` — South Korean Won
        - `MXN` — Mexican Peso
        - `NOK` — Norwegian Krone
        - `NZD` — New Zealand Dollar
        - `PEN` — Peruvian Sol
        - `PLN` — Polish Zloty
        - `RUB` — Russian Ruble
        - `THB` — Thai Baht
        - `TRY` — Turkish Lira
        - `TWD` — New Taiwan Dollar
        - `UAH` — Ukrainian Hryvnia
        - `VND` — Vietnamese Dong
        - `ZAR` — South African Rand
    - `adjusted_totals`: object (required) — Breakdown of the totals for a transaction after adjustments.
      - `subtotal`: string (required) — Subtotal before discount, tax, and deductions. If an item, unit price multiplied by quantity.
      - `tax`: string (required) — Total tax on the subtotal.
      - `total`: string (required) — Total after tax.
      - `grand_total`: string (required) — Total due after credits but before any payments.
      - `grand_total_tax`: string (required) — Net tax amount included in `grand_total`. Equals the full `tax` amount unless credits are applied, in which case this value is proportionally reduced.
      - `fee`: string | null (required) — Total fee taken by Paddle for this transaction. `null` until the transaction is `completed` and the fee is processed.
      - `retained_fee`: string (required) — Total Paddle fees retained for this adjustment.
      - `earnings`: string | null (required) — Total earnings for this transaction. This is the total minus the fee.
`null` until the transaction is `completed` and the fee is processed.
      - `currency_code`: string (required) — Three-letter ISO 4217 currency code of the currency used for this transaction.
        - `USD` — United States Dollar
        - `EUR` — Euro
        - `GBP` — Pound Sterling
        - `JPY` — Japanese Yen
        - `AUD` — Australian Dollar
        - `CAD` — Canadian Dollar
        - `CHF` — Swiss Franc
        - `HKD` — Hong Kong Dollar
        - `SGD` — Singapore Dollar
        - `SEK` — Swedish Krona
        - `ARS` — Argentine Peso
        - `BRL` — Brazilian Real
        - `CLP` — Chilean Peso
        - `CNY` — Chinese Yuan
        - `COP` — Colombian Peso
        - `CZK` — Czech Koruna
        - `DKK` — Danish Krone
        - `HUF` — Hungarian Forint
        - `ILS` — Israeli Shekel
        - `INR` — Indian Rupee
        - `KRW` — South Korean Won
        - `MXN` — Mexican Peso
        - `NOK` — Norwegian Krone
        - `NZD` — New Zealand Dollar
        - `PEN` — Peruvian Sol
        - `PLN` — Polish Zloty
        - `RUB` — Russian Ruble
        - `THB` — Thai Baht
        - `TRY` — Turkish Lira
        - `TWD` — New Taiwan Dollar
        - `UAH` — Ukrainian Hryvnia
        - `VND` — Vietnamese Dong
        - `ZAR` — South African Rand
    - `payout_totals`: object | null (required) — Breakdown of the payout total for a transaction. `null` until the transaction is `completed`. Returned in your payout currency.
      - `subtotal`: string (required) — Total before tax and fees.
      - `discount`: string (required) — Total discount as a result of any discounts applied.
Except for percentage discounts, Paddle applies tax to discounts based on the line item `price.tax_mode`. If `price.tax_mode` for a line item is `internal`, Paddle removes tax from the discount applied.
      - `tax`: string (required) — Total tax on the subtotal.
      - `total`: string (required) — Total after tax.
      - `credit`: string (required) — Total credit applied to this transaction. This includes credits applied using a customer's credit balance and adjustments to a `billed` transaction.
      - `credit_to_balance`: string (required) — Additional credit generated from negative `details.line_items`. This credit is added to the customer balance.
      - `balance`: string (required) — Total due on a transaction after credits and any payments.
      - `grand_total`: string (required) — Total due on a transaction after credits but before any payments.
      - `grand_total_tax`: string (required) — Net tax amount included in `grand_total`. Equals the full `tax` amount unless credits are applied, in which case this value is proportionally reduced.
      - `fee`: string (required) — Total fee taken by Paddle for this payout.
      - `earnings`: string (required) — Total earnings for this payout. This is the subtotal minus the Paddle fee.
      - `currency_code`: string (required) — Three-letter ISO 4217 currency code used for the payout for this transaction. If your primary currency has changed, this reflects the primary currency at the time the transaction was billed.
        - `AUD` — Australian Dollar
        - `CAD` — Canadian Dollar
        - `CHF` — Swiss Franc
        - `CNY` — Chinese Yuan
        - `CZK` — Czech Koruna
        - `DKK` — Danish Krone
        - `EUR` — Euro
        - `GBP` — Pound Sterling
        - `HUF` — Hungarian Forint
        - `PLN` — Polish Zloty
        - `SEK` — Swedish Krona
        - `USD` — United States Dollar
        - `ZAR` — South African Rand
      - `exchange_rate`: string (required) — Currency exchange rate, including margin if applicable. `1.0` if the transaction currency matches your payout currency. (default: `"1"`)
      - `fee_rate`: string (required) — Paddle fee rate that was applied to this transaction.
    - `adjusted_payout_totals`: object | null (required) — Breakdown of the payout total for a transaction after adjustments. `null` until the transaction is `completed`.
      - `subtotal`: string (required) — Total before tax and fees.
      - `tax`: string (required) — Total tax on the subtotal.
      - `total`: string (required) — Total after tax.
      - `fee`: string (required) — Total fee taken by Paddle for this payout.
      - `retained_fee`: string (required) — Paddle fees retained for this adjustment.
      - `chargeback_fee`: object (required) — Details of any chargeback fees incurred for this transaction.
        - `amount`: string (required) — Chargeback fee converted into the payout currency.
        - `original`: object | null (required) — Chargeback fee before conversion to the payout currency. `null` when the chargeback fee is the same as the payout currency.
          - `amount`: string (required) — Fee amount for this chargeback in the original currency.
          - `currency_code`: string (required) — Three-letter ISO 4217 currency code for the original chargeback fee.
            - `AUD` — Australian Dollar
            - `CAD` — Canadian Dollar
            - `EUR` — Euro
            - `GBP` — Pound Sterling
            - `USD` — United States Dollar
      - `earnings`: string (required) — Total earnings for this payout. This is the subtotal minus the fee.
      - `currency_code`: string (required) — Three-letter ISO 4217 currency code used for the payout for this transaction. If your primary currency has changed, this reflects the primary currency at the time the transaction was billed.
        - `AUD` — Australian Dollar
        - `CAD` — Canadian Dollar
        - `CHF` — Swiss Franc
        - `CNY` — Chinese Yuan
        - `CZK` — Czech Koruna
        - `DKK` — Danish Krone
        - `EUR` — Euro
        - `GBP` — Pound Sterling
        - `HUF` — Hungarian Forint
        - `PLN` — Polish Zloty
        - `SEK` — Swedish Krona
        - `USD` — United States Dollar
        - `ZAR` — South African Rand
      - `exchange_rate`: string (required) — Currency exchange rate, including margin if applicable. `1.0` if the transaction currency matches your payout currency.
    - `line_items`: array (required) — Information about line items for this transaction. Different from transaction `items` as they include totals calculated by Paddle. Considered the source of truth for line item totals.
      - `price_id`: string (required) — Paddle ID for the price related to this transaction line item, prefixed with `pri_`. (pattern: `^pri_[a-z\d]{26}$`)
      - `quantity`: integer (required) — Quantity of this transaction line item.
      - `proration`: object | null (required) — How proration was calculated for this item. Populated when a transaction is created from a subscription change, where `proration_billing_mode` was `prorated_immediately` or `prorated_next_billing_period`. Set automatically by Paddle.
        - `rate`: string (required) — Rate used to calculate proration.
        - `billing_period`: object (required) — Billing period that proration is based on.
          - `starts_at`: string (date-time) (required) — RFC 3339 datetime string of when this period starts.
          - `ends_at`: string (date-time) (required) — RFC 3339 datetime string of when this period ends.
      - `tax_rate`: string (required) — Rate used to calculate tax for this transaction line item.
      - `unit_totals`: object (required) — Breakdown of the charge for one unit in the lowest denomination of a currency (e.g. cents for USD).
        - `subtotal`: string (required) — Subtotal before discount, tax, and deductions. If an item, unit price multiplied by quantity.
        - `discount`: string (required) — Total discount as a result of any discounts applied.

Except for percentage discounts, Paddle applies tax to discounts based on the line item `price.tax_mode`. If `price.tax_mode` for a line item is `internal`, Paddle removes tax from the discount applied.
        - `tax`: string (required) — Total tax on the subtotal.
        - `total`: string (required) — Total after discount and tax.
      - `totals`: object (required) — Breakdown of a charge in the lowest denomination of a currency (e.g. cents for USD).
        - `subtotal`: string (required) — Subtotal before discount, tax, and deductions. If an item, unit price multiplied by quantity.
        - `discount`: string (required) — Total discount as a result of any discounts applied.

Except for percentage discounts, Paddle applies tax to discounts based on the line item `price.tax_mode`. If `price.tax_mode` for a line item is `internal`, Paddle removes tax from the discount applied.
        - `tax`: string (required) — Total tax on the subtotal.
        - `total`: string (required) — Total after discount and tax.
      - `product`: object (required) — Related product entity for this transaction line item price. Reflects the entity at the time it was added to the transaction.
        - `id`: string (required) — Unique Paddle ID for this product, prefixed with `pro_`. (pattern: `^pro_[a-z\d]{26}$`)
        - `name`: string (required) — Name of this product. (Length: 1–200)
        - `description`: string | null (required) — Short description for this product. (Max length: 2048)
        - `type`: string (required) — Type of item. Standard items are considered part of your catalog and are shown in the Paddle dashboard. (default: `"standard"`)
          - `custom` — Non-catalog item. Typically created for a specific transaction or subscription. Not returned when listing or shown in the Paddle dashboard.
          - `standard` — Standard item. Can be considered part of your catalog and reused across transactions and subscriptions easily.
        - `tax_category`: string (required) — Tax category for this product. Used for charging the correct rate of tax. Selected tax category must be enabled on your Paddle account.
          - `digital-goods` — Non-customizable digital files or media (not software) acquired with an up front payment that can be accessed without any physical product being delivered.
          - `ebooks` — Digital books and educational material which is sold with permanent rights for use by the customer.
          - `implementation-services` — Remote configuration, set-up, and integrating software on behalf of a customer.
          - `professional-services` — Services that involve the application of your expertise and specialized knowledge of a software product.
          - `saas` — Products that allow users to connect to and use online or cloud-based applications over the Internet.
          - `software-programming-services` — Services that can be used to customize and white label software products.
          - `standard` — Software products that are pre-written and can be downloaded and installed onto a local device.
          - `training-services` — Training and education services related to software products.
          - `website-hosting` — Cloud storage service for personal or corporate information, assets, or intellectual property.
        - `image_url` (required) — Image for this product. Included in the checkout and on some customer documents.
          - Image Url — A URL to an image.
          - Empty String
        - `custom_data`: object | null (required) — Your own structured key-value data.
        - `status`: string (required) — Whether this entity can be used in Paddle. (default: `"active"`)
          - `active` — Entity is active and can be used.
          - `archived` — Entity is archived, so can't be used.
        - `import_meta`: object | null (required) — Import information for this entity. `null` if this entity is not imported.
          - `external_id`: string | null — Reference or identifier for this entity from the provider where it was imported from. (Length: 1–200)
          - `imported_from`: string (required) — Name of the platform or provider where this entity was imported from. (Length: 1–200)
        - `created_at`: string (date-time) (required) — RFC 3339 datetime string of when this entity was created. Set automatically by Paddle.
        - `updated_at`: string (date-time) (required) — RFC 3339 datetime string of when this entity was updated. Set automatically by Paddle.
      - `id`: string (required) — Unique Paddle ID for this transaction item, prefixed with `txnitm_`. Used when working with [adjustments](https://developer.paddle.com/build/transactions/create-transaction-adjustments). (pattern: `^txnitm_[a-z\d]{26}$`)
  - `payments`: array (required) — List of payment attempts for this transaction, including successful payments. Sorted by `created_at` in descending order, so most recent attempts are returned first.
    - `payment_attempt_id`: string (required) — UUID for this payment attempt.
    - `stored_payment_method_id`: string (required) — UUID for the stored payment method used for this payment attempt. Deprecated - use `payment_method_id` instead.
    - `payment_method_id`: string | null (required) — Paddle ID of the payment method used for this payment attempt, prefixed with `paymtd_`. (pattern: `^paymtd_[a-z\d]{26}$`)
    - `amount`: string (required) — Amount for collection in the lowest denomination of a currency (e.g. cents for USD).
    - `status`: string (required) — Status of this payment attempt.
      - `authorized` — Authorized but not captured. Payment attempt is incomplete.
      - `authorized_flagged` — Authorized but not captured because it has been flagged as potentially fraudulent. Payment attempt is incomplete.
      - `canceled` — Previously authorized payment attempt has been canceled. Typically when `authorized_flagged` payment attempts are rejected.
      - `captured` — Payment captured successfully. Payment attempt is complete.
      - `error` — Something went wrong and the payment attempt was unsuccessful. Check the `error_code` for more information.
      - `action_required` — Customer must complete an action for this payment attempt to proceed. Typically means that the payment attempt requires 3DS.
      - `pending_no_action_required` — Response required from the bank or payment provider. Transaction is pending.
      - `created` — New payment attempt created.
      - `unknown` — Payment attempt status not known.
      - `dropped` — Payment attempt dropped by Paddle.
    - `error_code`: string | null (required) — Reason why a payment attempt failed. Returns `null` if payment captured successfully.
      - `already_canceled` — Cancellation not possible because the amount has already been canceled. Not typically returned for payments.
      - `already_refunded` — Refund is not possible because the amount has already been refunded. Not typically returned for payments.
      - `authentication_failed` — Payment required an authentication challenge (e.g. 3DS2 for cards, redirects for APMs). The customer completed the challenge but was not successful.
      - `blocked_by_policy` — Payment was blocked by one of the seller's configured policy checks.
      - `blocked_card` — Payment method issuer has indicated that the card cannot be used as it is frozen, lost, damaged, or stolen.
      - `canceled` — Customer has requested that the mandate for recurring payments be canceled.
      - `declined` — Payment method has been declined, with no other information returned.
      - `declined_not_retryable` — Payment method has been declined, and the issuer has indicated that it should not be retried. This could mean the account is closed or the customer revoked authorization to charge the payment method.
      - `expired_card` — Payment method issuer has indicated that this card is expired. Expired cards may also return `invalid_payment_details`, depending on how a payment is routed.
      - `fraud` — Payment method issuer or payment service provider flagged this payment as potentially fraudulent.
      - `invalid_amount` — Payment method issuer or payment service provider cannot process a payment that is this high or low.
      - `invalid_payment_details` — Payment service provider has indicated the payment method isn't valid. This typically means that it's expired. `expired_card` is returned by the payment method issuer, rather than the payment service provider.
      - `issuer_unavailable` — Payment service provider couldn't reach the payment method issuer.
      - `not_enough_balance` — Payment method declined because of insufficient funds, or fund limits being reached.
      - `payment_attempt_expired` — Customer didn't complete the payment before it expired. Typically returned for payment methods where the customer approves the payment in another app, like scanning a QR code.
      - `preferred_network_not_supported` — Payment method has been declined because the network scheme that the customer selected isn't supported by the payment service provider.
      - `prepaid_card_not_supported` — Payment method has been declined because it's a prepaid card and prepaid cards are blocked on this Paddle account.
      - `psp_error` — Something went wrong with the payment service provider, with no other information returned.
      - `redacted_payment_method` — Payment service provider didn't receive payment method information as they've been redacted.
      - `system_error` — Something went wrong with the Paddle platform. Try again later, or check status.paddle.com.
      - `transaction_not_permitted` — Payment method issuer doesn't allow this kind of payment because of limits on the account, or legal or compliance reasons.
      - `unknown` — Payment attempt unsuccessful, with no other information returned.
    - `method_details`: object (required) — Information about the payment method used for a payment attempt.
      - `type`: string (required) — Type of payment method used for this payment attempt.
        - `alipay` — Alipay, popular in China.
        - `apple_pay` — Apple Pay on a supported Apple device.
        - `bancontact` — Bancontact, popular in Belgium.
        - `blik` — BLIK, a popular payment method in Poland.
        - `card` — Credit or debit card.
        - `google_pay` — Google Pay on a supported Android device, Chromebook, or Google Chrome browser.
        - `ideal` — iDEAL, popular in the Netherlands.
        - `kakao_pay` — Kakao Pay, a popular payment method in Korea.
        - `korea_local` — Multi-step Korean payment method workflow, which includes multiple payment options for the Korean market. Deprecated - use `south_korea_local_card`, `kakao_pay`, `naver_pay`, `payco`, or `samsung_pay` instead.
        - `south_korea_local_card` — Korean local credit or debit card.
        - `mb_way` — MB WAY, a popular payment method in Portugal.
        - `naver_pay` — Naver Pay, a popular payment method in Korea.
        - `offline` — Payment recorded offline.
        - `payco` — Payco, a popular payment method in Korea.
        - `paypal` — PayPal.
        - `pix` — Pix, popular in Brazil. Available in early access.
        - `samsung_pay` — Samsung Pay, a popular payment method in Korea.
        - `unknown` — Payment method not known.
        - `upi` — Unified Payments Interface (UPI), popular in India. Available in early access.
        - `wechat_pay` — WeChat Pay, a popular payment method in China.
        - `wire_transfer` — Wire transfer, sometimes called bank transfer.
      - `underlying_details`: object | null (required) — Information about the underlying payment method used to pay. Populated for payment methods that offer multiple payment options, like `korea_local`. Deprecated - use top-level type objects instead.
        - `korea_local`: object | null (required) — Information about the Korean payment method used to pay. `null` unless the type is `korea_local`. Deprecated - use top-level type objects instead.
          - `type`: string (required) — Type of Korean payment method used to pay. Deprecated - use top-level type objects instead.
            - `bc` — BC Card (BCard), a kind of card issued in Korea. (비씨카드)
            - `citi` — Card issued by Citi Bank in Korea. (한국씨티은행)
            - `hana` — Card issued by Hana Bank in Korea. (하나카드)
            - `hyundai` — Hyundai Card, a credit card issued by Hyundai in Korea. (현대카드)
            - `jeju` — Card issued by Jeju Bank in Korea. (제주은행)
            - `jeonbuk` — Card issued by Jeonbuk Bank in Korea. (전북은행)
            - `kakaobank` — Card issued by Kakaobank in Korea. (주식회사 카카오뱅크)
            - `kakaopay` — KakaoPay digital wallet, popular in Korea. (카카오페이) Deprecated - use `type.kakao_pay` instead.
            - `kbank` — Card issued by K Bank in Korea. (케이뱅크)
            - `kdbbank` — Card issued by KDB Bank in Korea. (한국산업은행)
            - `kookmin` — Card issued by Kookmin Bank in Korea. (국민은행)
            - `kwangju` — Card issued by Kwangju Bank in Korea. (광주은행)
            - `lotte` — Lotte Card, a credit card issued by the Lotte Corporation in Korea. (롯데카드)
            - `mg` — Card issued by MG Community Credit Cooperatives (KFCC) in Korea. (MG새마을금고)
            - `naverpaycard` — Card issued by Naver Pay in Korea. (네이버 페이) Deprecated - use `type.naver_pay` instead.
            - `naverpaypoint` — Naver Pay digital wallet, popular in Korea. (네이버 페이) Deprecated - use `type.naver_pay` instead.
            - `nh` — NH Card, a card issued by Nonghyup Bank in Korea. (NH농협은행)
            - `payco` — PayCo digital wallet, popular in Korea. (페이코) Deprecated - use `type.payco` instead.
            - `post` — Card issued by Korea Post. (우체국예금보험)
            - `samsung` — Samsung Card, a card issued by Samsung in Korea. (삼성카드)
            - `samsungpay` — Samsung Pay digital wallet, popular in Korea. (삼성 월렛) Deprecated - use `type.samsung_pay` instead.
            - `savingsbank` — Card issued by the Korean Federation of Savings Banks in Korea. (저축은행중앙회)
            - `shinhan` — Card issued by Shinhan Bank in Korea. (주식회사 신한은행)
            - `shinhyup` — Card issued by the National Credit Unit Federation of Korea (Shinhyup) in Korea. (신한은행 신협)
            - `suhyup` — Card issued by the National Federation of Fisheries Cooperation (Suhyup) in Korea. (수협은행)
            - `tossbank` — Card issued by Toss Bank in Korea. (토스뱅크)
            - `unknown` — Underlying payment method not recognized.
            - `woori` — Card issued by Woori Bank in Korea. (주식회사 우리은행)
      - `south_korea_local_card`: object | null (required) — Information about the Korean credit or debit card used to pay. `null` unless `type` is `south_korea_local_card`.
        - `type`: string — Type of Korean credit or debit card used to pay.
          - `bc` — BC Card (BCard), a kind of card issued in Korea. (비씨카드)
          - `citi` — Card issued by Citi Bank in Korea. (한국씨티은행)
          - `hana` — Card issued by Hana Bank in Korea. (하나카드)
          - `hyundai` — Hyundai Card, a credit card issued by Hyundai in Korea. (현대카드)
          - `jeju` — Card issued by Jeju Bank in Korea. (제주은행)
          - `jeonbuk` — Card issued by Jeonbuk Bank in Korea. (전북은행)
          - `kakaobank` — Card issued by KakaoBank in Korea. (카카오뱅크)
          - `kbank` — Card issued by K Bank in Korea. (케이뱅크)
          - `kdbbank` — Card issued by KDB Bank in Korea. (한국산업은행)
          - `kookmin` — Card issued by Kookmin Bank in Korea. (국민은행)
          - `kwangju` — Card issued by Kwangju Bank in Korea. (광주은행)
          - `lotte` — Lotte Card, a credit card issued by the Lotte Corporation in Korea. (롯데카드)
          - `mg` — Card issued by MG Community Credit Cooperatives (KFCC) in Korea. (MG새마을금고)
          - `nh` — NH Card, a card issued by Nonghyup Bank in Korea. (NH농협은행)
          - `post` — Card issued by Korea Post. (우체국예금보험)
          - `samsung` — Samsung Card, a card issued by Samsung in Korea. (삼성카드)
          - `savingsbank` — Card issued by the Korean Federation of Savings Banks in Korea. (저축은행중앙회)
          - `shinhan` — Card issued by Shinhan Bank in Korea. (주식회사 신한은행)
          - `shinhyup` — Card issued by the National Credit Unit Federation of Korea (Shinhyup) in Korea. (신한은행 신협)
          - `suhyup` — Card issued by the National Federation of Fisheries Cooperation (Suhyup) in Korea. (수협은행)
          - `tossbank` — Card issued by Toss Bank in Korea. (토스뱅크)
          - `unknown` — Underlying payment method not recognized.
          - `woori` — Card issued by Woori Bank in Korea. (주식회사 우리은행)
        - `last4`: string — Last four digits of the card used to pay.
      - `card`: object | null (required) — Information about the credit or debit card used to pay. `null` unless `type` is `card`.
        - `type`: string (required) — Type of credit or debit card used to pay.
          - `american_express` — American Express
          - `diners_club` — Diners Club
          - `discover` — Discover Card
          - `jcb` — JCB Card, popular in Japan
          - `mada` — Mada Card, popular in Saudi Arabia
          - `maestro` — Maestro (debit card)
          - `mastercard` — Mastercard
          - `union_pay` — UnionPay, popular in China
          - `unknown` — Card type unknown
          - `visa` — Visa
        - `last4`: string (required) — Last four digits of the card used to pay.
        - `expiry_month`: integer (required) — Month of the expiry date of the card used to pay.
        - `expiry_year`: integer (required) — Year of the expiry date of the card used to pay.
        - `cardholder_name`: string (required) — The name on the card used to pay.
      - `paypal`: object | null (required) — Information about the PayPal account used to pay. `null` unless `type` is `paypal`.
        - `email`: string (required) — Email address associated with the PayPal account.
        - `reference`: string | null (required) — PayPal billing agreement identifier. Only populated for subscription payments where a billing agreement was created between the customer and PayPal. `null` for one-off PayPal payments.
    - `created_at`: string (date-time) (required) — RFC 3339 datetime string of when this entity was created. Set automatically by Paddle.
    - `captured_at`: string (date-time) | null (required) — RFC 3339 datetime string of when this payment was captured. `null` if `status` is not `captured`.
  - `checkout`: object | null (required) — Paddle Checkout details for this transaction. Returned for automatically-collected transactions and where `billing_details.enable_checkout` is `true` for manually-collected transactions; `null` otherwise.
    - `url`: string | null (required) — Paddle Checkout URL for this transaction, composed of the URL passed in the request or your default payment URL + `?_ptxn=` and the Paddle ID for this transaction. (Length: 1–2048)
  - `created_at`: string (date-time) (required) — RFC 3339 datetime string of when this entity was created. Set automatically by Paddle.
  - `updated_at`: string (date-time) (required) — RFC 3339 datetime string of when this entity was updated. Set automatically by Paddle.
  - `billed_at`: string (date-time) | null (required) — RFC 3339 datetime string of when this transaction was marked as `billed`. `null` for transactions that aren't `billed` or `completed`. Set automatically by Paddle.
  - `revised_at`: string (date-time) | null (required) — RFC 3339 datetime string of when a transaction was revised. Revisions describe an update to customer information for a billed or completed transaction. `null` if not revised. Set automatically by Paddle.
  - `address`: object — Address for this transaction. Reflects the entity at the time it was added to the transaction, or its revision if `revised_at` is not `null`. Returned when the `include` parameter is used with the `address` value and the transaction has an `address_id`.
    - `id`: string (required) — Unique Paddle ID for this address entity, prefixed with `add_`. (pattern: `^add_[a-z\d]{26}$`)
    - `customer_id`: string (required) — Paddle ID for the customer related to this address, prefixed with `ctm_`. (pattern: `^ctm_[a-z\d]{26}$`)
    - `description`: string | null (required) — Memorable description for this address. (Max length: 1024)
    - `first_line`: string | null (required) — First line of this address. (Max length: 1024)
    - `second_line`: string | null (required) — Second line of this address. (Max length: 1024)
    - `city`: string | null (required) — City of this address. (Max length: 200)
    - `postal_code`: string | null (required) — ZIP or postal code of this address. Required for some countries. (Max length: 200)
    - `region`: string | null (required) — State, county, or region of this address. (Max length: 200)
    - `country_code` (required) — Supported two-letter ISO 3166-1 alpha-2 country code for this address.
      - Country code (supported) — Two-letter code for a country that Paddle supports sales to. Typically an ISO 3166-1 alpha-2 code, though Paddle uses a small number of codes that ISO doesn't currently assign.
        - `AD` — Andorra
        - `AE` — United Arab Emirates
        - `AG` — Antigua and Barbuda
        - `AI` — Anguilla
        - `AL` — Albania
        - `AM` — Armenia
        - `AO` — Angola
        - `AR` — Argentina
        - `AS` — American Samoa
        - `AT` — Austria
        - `AU` — Australia
        - `AW` — Aruba
        - `AX` — Åland Islands
        - `AZ` — Azerbaijan
        - `BA` — Bosnia and Herzegovina
        - `BB` — Barbados
        - `BD` — Bangladesh
        - `BE` — Belgium
        - `BF` — Burkina Faso
        - `BG` — Bulgaria
        - `BH` — Bahrain
        - `BI` — Burundi
        - `BJ` — Benin
        - `BL` — Saint Barthélemy
        - `BM` — Bermuda
        - `BN` — Brunei
        - `BO` — Bolivia
        - `BQ` — Caribbean Netherlands (Bonaire, Sint Eustatius, and Saba)
        - `BR` — Brazil
        - `BS` — Bahamas
        - `BT` — Bhutan
        - `BV` — Bouvet Island
        - `BW` — Botswana
        - `BZ` — Belize
        - `CA` — Canada
        - `CC` — Cocos Islands
        - `CG` — Republic of Congo
        - `CH` — Switzerland
        - `CI` — Côte d'Ivoire (Ivory Coast)
        - `CK` — Cook Islands
        - `CL` — Chile
        - `CM` — Cameroon
        - `CN` — China
        - `CO` — Colombia
        - `CR` — Costa Rica
        - `CV` — Cape Verde
        - `CW` — Curaçao
        - `CX` — Christmas Island
        - `CY` — Cyprus
        - `CZ` — Czechia (Czech Republic)
        - `DE` — Germany
        - `DJ` — Djibouti
        - `DK` — Denmark
        - `DM` — Dominica
        - `DO` — Dominican Republic
        - `DZ` — Algeria
        - `EC` — Ecuador
        - `EE` — Estonia
        - `EG` — Egypt
        - `EH` — Western Sahara
        - `ER` — Eritrea
        - `ES` — Spain
        - `ET` — Ethiopia
        - `FI` — Finland
        - `FJ` — Fiji
        - `FK` — Falkland Islands
        - `FM` — Micronesia
        - `FO` — Faroe Islands
        - `FR` — France
        - `GA` — Gabon
        - `GB` — United Kingdom
        - `GD` — Grenada
        - `GE` — Georgia
        - `GF` — French Guiana
        - `GG` — Guernsey
        - `GH` — Ghana
        - `GI` — Gibraltar
        - `GL` — Greenland
        - `GM` — Gambia
        - `GN` — Guinea
        - `GP` — Guadeloupe
        - `GQ` — Equatorial Guinea
        - `GR` — Greece
        - `GS` — South Georgia and the South Sandwich Islands
        - `GT` — Guatemala
        - `GU` — Guam
        - `GW` — Guinea-Bissau
        - `GY` — Guyana
        - `HK` — Hong Kong
        - `HM` — Heard Island and McDonald Islands
        - `HN` — Honduras
        - `HR` — Croatia
        - `HU` — Hungary
        - `ID` — Indonesia
        - `IE` — Ireland
        - `IL` — Israel
        - `IM` — Isle of Man
        - `IN` — India
        - `IO` — British Indian Ocean Territory
        - `IQ` — Iraq
        - `IS` — Iceland
        - `IT` — Italy
        - `JE` — Jersey
        - `JM` — Jamaica
        - `JO` — Jordan
        - `JP` — Japan
        - `KE` — Kenya
        - `KG` — Kyrgyzstan
        - `KH` — Cambodia
        - `KI` — Kiribati
        - `KM` — Comoros
        - `KN` — Saint Kitts and Nevis
        - `KR` — South Korea
        - `KW` — Kuwait
        - `KY` — Cayman Islands
        - `KZ` — Kazakhstan
        - `LA` — Lao People's Democratic Republic (Laos)
        - `LB` — Lebanon
        - `LC` — Saint Lucia
        - `LI` — Liechtenstein
        - `LK` — Sri Lanka
        - `LR` — Liberia
        - `LS` — Lesotho
        - `LT` — Lithuania
        - `LU` — Luxembourg
        - `LV` — Latvia
        - `MA` — Morocco
        - `MC` — Monaco
        - `MD` — Moldova
        - `ME` — Montenegro
        - `MF` — Saint Martin
        - `MG` — Madagascar
        - `MH` — Marshall Islands
        - `MK` — Macedonia
        - `MN` — Mongolia
        - `MO` — Macao
        - `MP` — Northern Mariana Islands
        - `MQ` — Martinique
        - `MR` — Mauritania
        - `MS` — Montserrat
        - `MT` — Malta
        - `MU` — Mauritius
        - `MV` — Maldives
        - `MW` — Malawi
        - `MX` — Mexico
        - `MY` — Malaysia
        - `MZ` — Mozambique
        - `NA` — Namibia
        - `NC` — New Caledonia
        - `NE` — Niger
        - `NF` — Norfolk Island
        - `NG` — Nigeria
        - `NL` — Netherlands
        - `NO` — Norway
        - `NP` — Nepal
        - `NR` — Nauru
        - `NU` — Niue
        - `NZ` — New Zealand
        - `OM` — Oman
        - `PA` — Panama
        - `PE` — Peru
        - `PF` — French Polynesia
        - `PG` — Papua New Guinea
        - `PH` — Philippines
        - `PK` — Pakistan
        - `PL` — Poland
        - `PM` — Saint Pierre and Miquelon
        - `PN` — Pitcairn
        - `PR` — Puerto Rico
        - `PS` — Palestinian territories
        - `PT` — Portugal
        - `PW` — Palau
        - `PY` — Paraguay
        - `QA` — Qatar
        - `RE` — Reunion
        - `RO` — Romania
        - `RS` — Republic of Serbia
        - `RW` — Rwanda
        - `SA` — Saudi Arabia
        - `SB` — Solomon Islands
        - `SC` — Seychelles
        - `SE` — Sweden
        - `SG` — Singapore
        - `SH` — Saint Helena
        - `SI` — Slovenia
        - `SJ` — Svalbard and Jan Mayen
        - `SK` — Slovakia
        - `SL` — Sierra Leone
        - `SM` — San Marino
        - `SN` — Senegal
        - `SR` — Suriname
        - `ST` — São Tomé and Príncipe
        - `SV` — El Salvador
        - `SX` — Sint Maarten
        - `SZ` — Swaziland
        - `TC` — Turks and Caicos Islands
        - `TD` — Chad
        - `TF` — French Southern and Antarctic Lands
        - `TG` — Togo
        - `TH` — Thailand
        - `TJ` — Tajikistan
        - `TK` — Tokelau
        - `TL` — Timor-Leste
        - `TM` — Turkmenistan
        - `TN` — Tunisia
        - `TO` — Tonga
        - `TR` — Turkey
        - `TT` — Trinidad and Tobago
        - `TV` — Tuvalu
        - `TW` — Taiwan
        - `TZ` — Tanzania
        - `UA` — Ukraine
        - `UG` — Uganda
        - `UM` — United States Minor Outlying Islands
        - `US` — United States
        - `UY` — Uruguay
        - `UZ` — Uzbekistan
        - `VA` — Holy See (Vatican City)
        - `VC` — Saint Vincent and the Grenadines
        - `VG` — British Virgin Islands
        - `VI` — U.S. Virgin Islands
        - `VN` — Vietnam
        - `VU` — Vanuatu
        - `WF` — Wallis and Futuna
        - `WS` — Samoa
        - `XK` — Kosovo
        - `YT` — Mayotte
        - `ZA` — South Africa
        - `ZM` — Zambia
      - Country code (unsupported) — Two-letter code for a country that Paddle doesn't support sales to. Typically an ISO 3166-1 alpha-2 code, though Paddle uses a small number of codes that ISO doesn't currently assign.
        - `AF` — Afghanistan
        - `AQ` — Antarctica
        - `AN` — Netherlands Antilles. Withdrawn ISO 3166-1 code, succeeded by BQ, CW and SX.
        - `BY` — Belarus
        - `CD` — Democratic Republic of Congo
        - `CF` — Central African Republic
        - `CU` — Cuba
        - `CS` — Serbia and Montenegro. Withdrawn ISO 3166-1 code, succeeded by RS and ME.
        - `HT` — Haiti
        - `IR` — Iran
        - `KP` — North Korea
        - `LY` — Libya
        - `ML` — Mali
        - `MM` — Myanmar (Burma)
        - `NI` — Nicaragua
        - `RU` — Russia
        - `SO` — Somalia
        - `SS` — South Sudan
        - `SD` — Sudan
        - `SY` — Syria
        - `VE` — Venezuela
        - `YE` — Yemen
        - `ZW` — Zimbabwe
    - `custom_data`: object | null (required) — Your own structured key-value data.
    - `status`: string (required) — Whether this entity can be used in Paddle. (default: `"active"`)
      - `active` — Entity is active and can be used.
      - `archived` — Entity is archived, so can't be used.
    - `created_at`: string (date-time) (required) — RFC 3339 datetime string of when this entity was created. Set automatically by Paddle.
    - `updated_at`: string (date-time) (required) — RFC 3339 datetime string of when this entity was updated. Set automatically by Paddle.
    - `import_meta`: object | null (required) — Import information for this entity. `null` if this entity is not imported.
      - `external_id`: string | null — Reference or identifier for this entity from the provider where it was imported from. (Length: 1–200)
      - `imported_from`: string (required) — Name of the platform or provider where this entity was imported from. (Length: 1–200)
  - `adjustments`: array — List of adjustments for this transaction. Returned when the `include` parameter is used with the `adjustment` value and the transaction has adjustments.
    - `id`: string (required) — Unique Paddle ID for this adjustment entity, prefixed with `adj_`. (pattern: `^adj_[a-z\d]{26}$`)
    - `action`: string (required) — How this adjustment impacts the related transaction.
      - `credit` — Credits some or all the related transaction.
      - `refund` — Refunds some or all the related transaction. Must be approved by Paddle in most cases.
      - `chargeback` — Chargeback for the related transaction. Automatically created by Paddle when a customer successfully disputes a charge.
      - `chargeback_reverse` — Reversal of a chargeback for the related transaction. Automatically created by Paddle when Paddle contests a chargeback successfully.
      - `chargeback_warning` — Warning of an upcoming chargeback for the related transaction. Automatically created by Paddle.
      - `chargeback_warning_reverse` — Reversal of a chargeback warning for the related transaction. Automatically created by Paddle.
      - `credit_reverse` — Reversal of a credit for the related transaction. Automatically created by Paddle.
    - `type`: string (required) — Type of adjustment. Use `full` to adjust the grand total for the related transaction. Include an `items` array when creating a `partial` adjustment. If omitted, defaults to `partial`. (default: `"partial"`)
      - `full` — The grand total for the related transaction is adjusted.
      - `partial` — Some line items for the related transaction are adjusted. Requires `items`.
    - `transaction_id`: string (required) — Paddle ID of the transaction that this adjustment is for, prefixed with `txn_`. (pattern: `^txn_[a-z\d]{26}$`)
    - `subscription_id`: string | null (required) — Paddle ID for the subscription related to this adjustment, prefixed with `sub_`.
Set automatically by Paddle based on the `subscription_id` of the related transaction. (pattern: `^sub_[a-z\d]{26}$`)
    - `customer_id`: string (required) — Paddle ID for the customer related to this adjustment, prefixed with `ctm_`.
Set automatically by Paddle based on the `customer_id` of the related transaction. (pattern: `^ctm_[a-z\d]{26}$`)
    - `reason`: string (required) — Why this adjustment was created. Appears in the Paddle dashboard. Retained for record-keeping purposes.
    - `credit_applied_to_balance`: boolean | null — Whether this adjustment was applied to the related customer's credit balance. Only returned for `credit` adjustments.
    - `currency_code`: string (required) — Three-letter ISO 4217 currency code for this adjustment. Set automatically by Paddle based on the `currency_code` of the related transaction.
      - `USD` — United States Dollar
      - `EUR` — Euro
      - `GBP` — Pound Sterling
      - `JPY` — Japanese Yen
      - `AUD` — Australian Dollar
      - `CAD` — Canadian Dollar
      - `CHF` — Swiss Franc
      - `HKD` — Hong Kong Dollar
      - `SGD` — Singapore Dollar
      - `SEK` — Swedish Krona
      - `ARS` — Argentine Peso
      - `BRL` — Brazilian Real
      - `CLP` — Chilean Peso
      - `CNY` — Chinese Yuan
      - `COP` — Colombian Peso
      - `CZK` — Czech Koruna
      - `DKK` — Danish Krone
      - `HUF` — Hungarian Forint
      - `ILS` — Israeli Shekel
      - `INR` — Indian Rupee
      - `KRW` — South Korean Won
      - `MXN` — Mexican Peso
      - `NOK` — Norwegian Krone
      - `NZD` — New Zealand Dollar
      - `PEN` — Peruvian Sol
      - `PLN` — Polish Zloty
      - `RUB` — Russian Ruble
      - `THB` — Thai Baht
      - `TRY` — Turkish Lira
      - `TWD` — New Taiwan Dollar
      - `UAH` — Ukrainian Hryvnia
      - `VND` — Vietnamese Dong
      - `ZAR` — South African Rand
    - `status`: string (required) — Status of this adjustment. Set automatically by Paddle.

Most refunds for live accounts are created with the status of `pending_approval` until reviewed by Paddle, but some are automatically approved. For sandbox accounts, Paddle automatically approves refunds every ten minutes.

Credit adjustments don't require approval from Paddle, so they're created as `approved`.
      - `pending_approval` — Adjustment is pending approval by Paddle. Most refunds for live accounts must be approved by Paddle.
      - `approved` — Adjustment is approved. Default for credits. Set when Paddle approves a refund that was `pending_approval`.
      - `rejected` — Adjustment has been rejected. Set when Paddle rejects a refund that was `pending_approval`.
      - `reversed` — Adjustment has been reversed. Set by Paddle when a `chargeback_reversal` or `credit_reversal` adjustment is created for this adjustment.
    - `items`: array (required) — List of items on this adjustment. Required if `type` is not populated or set to `partial`. (Items: 1–100)
      - `id`: string (required) — Unique Paddle ID for this adjustment item, prefixed with `adjitm_`. (pattern: `^adjitm_[a-z\d]{26}$`)
      - `item_id`: string (required) — Paddle ID for the transaction item that this adjustment item relates to, prefixed with `txnitm_`. (pattern: `^txnitm_[a-z\d]{26}$`)
      - `type`: string (required) — Type of adjustment for this transaction item. `tax` adjustments are automatically created by Paddle.
Include `amount` when creating a `partial` adjustment.
        - `full` — Full total for this transaction item is adjusted.
        - `partial` — Part of this transaction item is adjusted. Include `amount` to specify the partial amount adjusted.
        - `tax` — Tax for this transaction item is adjusted. Created automatically by Paddle.
        - `proration` — A prorated amount for this transaction item is adjusted. Created automatically by Paddle in some cases when making changes to a subscription.
      - `amount`: string | null (required) — Amount adjusted for this transaction item. Required when item `type` is `partial`.
      - `proration`: object | null (required) — How proration was calculated for this adjustment item.
        - `rate`: string (required) — Rate used to calculate proration.
        - `billing_period`: object (required) — Billing period that proration is based on.
          - `starts_at`: string (date-time) (required) — RFC 3339 datetime string of when this period starts.
          - `ends_at`: string (date-time) (required) — RFC 3339 datetime string of when this period ends.
      - `totals`: object (required) — Breakdown of the total for an adjustment item.
        - `subtotal`: string (required) — Amount multiplied by quantity.
        - `tax`: string (required) — Total tax on the subtotal.
        - `total`: string (required) — Total after tax.
    - `totals`: object (required) — Breakdown of the total for an adjustment.
      - `subtotal`: string (required) — Total before tax. For tax adjustments, the value is 0.
      - `tax`: string (required) — Total tax on the subtotal.
      - `total`: string (required) — Total after tax.
      - `fee`: string (required) — Total fee taken by Paddle for this adjustment.
      - `retained_fee`: string — Paddle fees retained for this adjustment.
      - `earnings`: string (required) — Total earnings. This is the subtotal minus the fee.
For tax adjustments, this value is negative, which means a positive effect in the transaction earnings.
This is because the fee is originally calculated from the transaction total, so if a tax adjustment is made,
then the fee portion of it is returned.
      - `currency_code`: string (required) — Three-letter ISO 4217 currency code used for this adjustment.
        - `USD` — United States Dollar
        - `EUR` — Euro
        - `GBP` — Pound Sterling
        - `JPY` — Japanese Yen
        - `AUD` — Australian Dollar
        - `CAD` — Canadian Dollar
        - `CHF` — Swiss Franc
        - `HKD` — Hong Kong Dollar
        - `SGD` — Singapore Dollar
        - `SEK` — Swedish Krona
        - `ARS` — Argentine Peso
        - `BRL` — Brazilian Real
        - `CLP` — Chilean Peso
        - `CNY` — Chinese Yuan
        - `COP` — Colombian Peso
        - `CZK` — Czech Koruna
        - `DKK` — Danish Krone
        - `HUF` — Hungarian Forint
        - `ILS` — Israeli Shekel
        - `INR` — Indian Rupee
        - `KRW` — South Korean Won
        - `MXN` — Mexican Peso
        - `NOK` — Norwegian Krone
        - `NZD` — New Zealand Dollar
        - `PEN` — Peruvian Sol
        - `PLN` — Polish Zloty
        - `RUB` — Russian Ruble
        - `THB` — Thai Baht
        - `TRY` — Turkish Lira
        - `TWD` — New Taiwan Dollar
        - `UAH` — Ukrainian Hryvnia
        - `VND` — Vietnamese Dong
        - `ZAR` — South African Rand
    - `payout_totals`: object | null (required) — Breakdown of how this adjustment affects your payout balance.
      - `subtotal`: string (required) — Adjustment total before tax and fees.
      - `tax`: string (required) — Total tax on the adjustment subtotal.
      - `total`: string (required) — Adjustment total after tax.
      - `fee`: string (required) — Adjusted Paddle fee.
      - `retained_fee`: string (required) — Paddle fees retained for this adjustment.
      - `chargeback_fee`: object — Chargeback fees incurred for this adjustment. Only returned when the adjustment `action` is `chargeback` or `chargeback_warning`.
        - `amount`: string (required) — Chargeback fee converted into the payout currency.
        - `original`: object | null (required) — Chargeback fee before conversion to the payout currency. `null` when the chargeback fee is the same as the payout currency.
          - `amount`: string (required) — Fee amount for this chargeback in the original currency.
          - `currency_code`: string (required) — Three-letter ISO 4217 currency code for the original chargeback fee.
            - `AUD` — Australian Dollar
            - `CAD` — Canadian Dollar
            - `EUR` — Euro
            - `GBP` — Pound Sterling
            - `USD` — United States Dollar
      - `earnings`: string (required) — Adjusted payout earnings. This is the adjustment total plus adjusted fees.
      - `currency_code`: string (required) — Three-letter ISO 4217 currency code used for the payout for this transaction. If your primary currency has changed, this reflects the primary currency at the time the transaction was billed.
        - `AUD` — Australian Dollar
        - `CAD` — Canadian Dollar
        - `CHF` — Swiss Franc
        - `CNY` — Chinese Yuan
        - `CZK` — Czech Koruna
        - `DKK` — Danish Krone
        - `EUR` — Euro
        - `GBP` — Pound Sterling
        - `HUF` — Hungarian Forint
        - `PLN` — Polish Zloty
        - `SEK` — Swedish Krona
        - `USD` — United States Dollar
        - `ZAR` — South African Rand
    - `tax_rates_used`: array (required)
      - `tax_rate`: string (required) — Rate used to calculate tax for this adjustment.
      - `totals`: object (required) — Calculated totals for the tax applied to this adjustment.
        - `subtotal`: string (required) — Total before tax. For tax adjustments, the value is 0.
        - `tax`: string (required) — Total tax on the subtotal.
        - `total`: string (required) — Total after tax.
    - `created_at`: string (date-time) (required) — RFC 3339 datetime string of when this entity was created. Set automatically by Paddle.
    - `updated_at`: string (date-time) (required) — RFC 3339 datetime string of when this entity was updated. Set automatically by Paddle.
  - `adjustments_totals`: object — Object containing totals for all adjustments on a transaction. Returned when the `include` parameter is used with the `adjustments_totals` value.
    - `subtotal`: string (required) — Total before tax.
    - `tax`: string (required) — Total tax on the subtotal.
    - `total`: string (required) — Total after tax.
    - `fee`: string (required) — Total fee taken by Paddle.
    - `retained_fee`: string (required) — Total gateway fee retained by Paddle.
    - `earnings`: string (required) — Total earnings. This is the subtotal minus the fee.
For tax adjustments, this value is negative, which means a positive effect in the transaction earnings.
This is because the fee is originally calculated from the transaction total, so if a tax adjustment is made,
then the fee portion of it is returned.
As a result, the earnings from all the adjustments performed could be either negative, positive or zero.
    - `breakdown`: object (required) — Breakdown of the total adjustments by adjustment action.
      - `credit`: string (required) — Total amount of credit adjustments.
      - `refund`: string (required) — Total amount of refund adjustments.
      - `chargeback`: string (required) — Total amount of chargeback adjustments.
    - `currency_code`: string (required) — Three-letter ISO 4217 currency code used for adjustments for this transaction.
      - `USD` — United States Dollar
      - `EUR` — Euro
      - `GBP` — Pound Sterling
      - `JPY` — Japanese Yen
      - `AUD` — Australian Dollar
      - `CAD` — Canadian Dollar
      - `CHF` — Swiss Franc
      - `HKD` — Hong Kong Dollar
      - `SGD` — Singapore Dollar
      - `SEK` — Swedish Krona
      - `ARS` — Argentine Peso
      - `BRL` — Brazilian Real
      - `CLP` — Chilean Peso
      - `CNY` — Chinese Yuan
      - `COP` — Colombian Peso
      - `CZK` — Czech Koruna
      - `DKK` — Danish Krone
      - `HUF` — Hungarian Forint
      - `ILS` — Israeli Shekel
      - `INR` — Indian Rupee
      - `KRW` — South Korean Won
      - `MXN` — Mexican Peso
      - `NOK` — Norwegian Krone
      - `NZD` — New Zealand Dollar
      - `PEN` — Peruvian Sol
      - `PLN` — Polish Zloty
      - `RUB` — Russian Ruble
      - `THB` — Thai Baht
      - `TRY` — Turkish Lira
      - `TWD` — New Taiwan Dollar
      - `UAH` — Ukrainian Hryvnia
      - `VND` — Vietnamese Dong
      - `ZAR` — South African Rand
  - `business`: object — Business for this transaction. Reflects the entity at the time it was added to the transaction, or its revision if `revised_at` is not `null`. Returned when the `include` parameter is used with the `business` value and the transaction has a `business_id`.
    - `id`: string (required) — Unique Paddle ID for this business entity, prefixed with `biz_`. (pattern: `^biz_[a-z\d]{26}$`)
    - `customer_id`: string (required) — Paddle ID for the customer related to this business, prefixed with `ctm_`. (pattern: `^ctm_[a-z\d]{26}$`)
    - `name`: string (required) — Name of this business. (Length: 1–1024)
    - `company_number`: string | null (required) — Company number for this business. (Max length: 1024)
    - `tax_identifier`: string | null (required) — Tax or VAT Number for this business. (Max length: 1024)
    - `status`: string (required) — Whether this entity can be used in Paddle. (default: `"active"`)
      - `active` — Entity is active and can be used.
      - `archived` — Entity is archived, so can't be used.
    - `contacts`: array (required) — List of contacts related to this business, typically used for sending invoices. (Items: max 100, unique)
      - `name`: string (required) — Full name of this contact. (Max length: 1024)
      - `email`: string (email) (required) — Email address for this contact. (Length: 1–320)
    - `created_at`: string (date-time) (required) — RFC 3339 datetime string of when this entity was created. Set automatically by Paddle.
    - `updated_at`: string (date-time) (required) — RFC 3339 datetime string of when this entity was updated. Set automatically by Paddle.
    - `custom_data`: object | null (required) — Your own structured key-value data.
    - `import_meta`: object | null (required) — Import information for this entity. `null` if this entity is not imported.
      - `external_id`: string | null — Reference or identifier for this entity from the provider where it was imported from. (Length: 1–200)
      - `imported_from`: string (required) — Name of the platform or provider where this entity was imported from. (Length: 1–200)
  - `customer`: object — Customer for this transaction. Reflects the entity at the time it was added to the transaction, or its revision if `revised_at` is not `null`. Returned when the `include` parameter is used with the `customer` value and the transaction has a `customer_id`.
    - `id`: string (required) — Unique Paddle ID for this customer entity, prefixed with `ctm_`. (pattern: `^ctm_[a-z\d]{26}$`)
    - `name`: string | null (required) — Full name of this customer. Required when creating transactions where `collection_mode` is `manual` (invoices). (Max length: 1024)
    - `email`: string (email) (required) — Email address for this customer. (Length: 1–320)
    - `marketing_consent`: boolean (required) — Whether this customer opted into marketing from you. `false` unless customers check the marketing consent box
when using Paddle Checkout. Set automatically by Paddle. (default: `false`)
    - `status`: string (required) — Whether this entity can be used in Paddle. (default: `"active"`)
      - `active` — Entity is active and can be used.
      - `archived` — Entity is archived, so can't be used.
    - `custom_data`: object | null (required) — Your own structured key-value data.
    - `locale`: string (required) — Valid IETF BCP 47 short form locale tag. If omitted, defaults to `en`. (default: `"en"`)
    - `created_at`: string (date-time) (required) — RFC 3339 datetime string of when this entity was created. Set automatically by Paddle.
    - `updated_at`: string (date-time) (required) — RFC 3339 datetime string of when this entity was updated. Set automatically by Paddle.
    - `import_meta`: object | null (required) — Import information for this entity. `null` if this entity is not imported.
      - `external_id`: string | null — Reference or identifier for this entity from the provider where it was imported from. (Length: 1–200)
      - `imported_from`: string (required) — Name of the platform or provider where this entity was imported from. (Length: 1–200)
  - `discount`: object — Discount for this transaction. Reflects the entity at the time it was added to the transaction. Returned when the `include` parameter is used with the `discount` value and the transaction has a `discount_id`.
    - `id`: string (required) — Unique Paddle ID for this discount, prefixed with `dsc_`. (pattern: `^dsc_[a-z\d]{26}$`)
    - `status`: string (required) — Whether this entity can be used in Paddle. (default: `"active"`)
      - `active` — Entity is active and can be used.
      - `archived` — Entity is archived, so can't be used.
    - `description`: string (required) — Short description for this discount for your reference. Not shown to customers. (Length: 1–500)
    - `enabled_for_checkout`: boolean (required) — Whether this discount can be redeemed by customers at checkout (`true`) or not (`false`). (default: `true`)
    - `code`: string | null (required) — Unique code that customers can use to redeem this discount at checkout. Not case-sensitive. (Length: 1–32; pattern: `^[a-zA-Z0-9]{1,32}$`)
    - `type`: string (required) — Type of discount. Determines how this discount impacts the checkout or transaction total.
      - `flat` — Discounts a checkout or transaction by a flat amount, for example -$100. Requires `currency_code`.
      - `flat_per_seat` — Discounts a checkout or transaction by a flat amount per unit, for example -$100 per user. Requires `currency_code`.
      - `percentage` — Discounts a checkout or transaction by a percentage of the total, for example -10%. Maximum 100%.
    - `mode`: string (required) — Discount mode. Standard discounts are considered part of your catalog and are shown in the Paddle dashboard. (default: `"standard"`)
      - `standard` — Standard discount. Can be considered part of your catalog and reused across transactions and subscriptions easily.
      - `custom` — Non-catalog discount. Can be created via the API, or by Paddle for checkout recovery discounts. Not returned when listing or shown in the Paddle dashboard.
    - `amount`: string (required) — Amount to discount by. For `percentage` discounts, must be an amount between `0.01` and `100`. For `flat` and `flat_per_seat` discounts, amount in the lowest denomination for a currency.
    - `currency_code`: string | null (required) — Supported three-letter ISO 4217 currency code. Required where discount type is `flat` or `flat_per_seat`.
      - `USD` — United States Dollar
      - `EUR` — Euro
      - `GBP` — Pound Sterling
      - `JPY` — Japanese Yen
      - `AUD` — Australian Dollar
      - `CAD` — Canadian Dollar
      - `CHF` — Swiss Franc
      - `HKD` — Hong Kong Dollar
      - `SGD` — Singapore Dollar
      - `SEK` — Swedish Krona
      - `ARS` — Argentine Peso
      - `BRL` — Brazilian Real
      - `CLP` — Chilean Peso
      - `CNY` — Chinese Yuan
      - `COP` — Colombian Peso
      - `CZK` — Czech Koruna
      - `DKK` — Danish Krone
      - `HUF` — Hungarian Forint
      - `ILS` — Israeli Shekel
      - `INR` — Indian Rupee
      - `KRW` — South Korean Won
      - `MXN` — Mexican Peso
      - `NOK` — Norwegian Krone
      - `NZD` — New Zealand Dollar
      - `PEN` — Peruvian Sol
      - `PLN` — Polish Zloty
      - `RUB` — Russian Ruble
      - `THB` — Thai Baht
      - `TRY` — Turkish Lira
      - `TWD` — New Taiwan Dollar
      - `UAH` — Ukrainian Hryvnia
      - `VND` — Vietnamese Dong
      - `ZAR` — South African Rand
    - `recur`: boolean (required) — Whether this discount applies for multiple subscription billing periods (`true`) or not (`false`). (default: `false`)
    - `maximum_recurring_intervals`: integer | null (required) — Number of subscription billing periods that this discount recurs for. Requires `recur`. `null` if this discount recurs forever.

Subscription renewals, midcycle changes, and one-time charges billed to a subscription aren't considered a redemption. `times_used` is not incremented in these cases. (Min: 1)
    - `usage_limit`: integer | null (required) — Maximum number of times this discount can be redeemed. This is an overall limit for this discount, rather than a per-customer limit. `null` if this discount can be redeemed an unlimited amount of times.

Paddle counts a usage as a redemption on a checkout, transaction, or the initial application against a subscription. Transactions created for subscription renewals, midcycle changes, and one-time charges aren't considered a redemption.

Paddle checks this limit when a discount is applied to a checkout or transaction, comparing it against `times_used` at that moment. As `times_used` only increments when a transaction completes, checkouts that are open at the same time can each pass this check, so in some cases a discount may be redeemed more times than this limit allows. (Min: 1)
    - `restrict_to`: array | null (required) — Product or price IDs that this discount is for. When including a product ID, all prices for that product can be discounted. `null` if this discount applies to all products and prices. (Items: unique)
    - `expires_at`: string (date-time) | null (required) — RFC 3339 datetime string of when this discount expires. Discount can no longer be redeemed after this date has elapsed. `null` if this discount can be redeemed forever.

Expired discounts can't be redeemed against transactions or checkouts, but can be applied when updating subscriptions.
    - `custom_data`: object | null (required) — Your own structured key-value data.
    - `times_used`: integer (required) — How many times this discount has been redeemed. Automatically incremented by Paddle.

Paddle counts a usage as a redemption on a checkout, transaction, or subscription. Transactions created for subscription renewals, midcycle changes, and one-time charges aren't considered a redemption.

Incremented when a transaction completes, rather than when a discount is applied to a checkout. See `usage_limit` for how this affects enforcement of the limit.
    - `discount_group_id`: string | null (required) — Paddle ID for the discount group related to this discount, prefixed with `dsg_`. `null` if not in a discount group. (pattern: `^dsg_[a-z\d]{26}$`)
    - `created_at`: string (date-time) (required) — RFC 3339 datetime string of when this entity was created. Set automatically by Paddle.
    - `updated_at`: string (date-time) (required) — RFC 3339 datetime string of when this entity was updated. Set automatically by Paddle.
    - `import_meta`: object | null (required) — Import information for this entity. `null` if this entity is not imported.
      - `external_id`: string | null — Reference or identifier for this entity from the provider where it was imported from. (Length: 1–200)
      - `imported_from`: string (required) — Name of the platform or provider where this entity was imported from. (Length: 1–200)
  - `available_payment_methods`: array — List of available payment methods for this transaction. Returned when the `include` parameter is used with the `available_payment_methods` value.
    - `alipay` — Alipay, popular in China.
    - `apple_pay` — Apple Pay on a supported Apple device.
    - `bancontact` — Bancontact, popular in Belgium.
    - `blik` — BLIK, a popular payment method in Poland.
    - `card` — Credit or debit card.
    - `google_pay` — Google Pay on a supported Android device, Chromebook, or Google Chrome browser.
    - `ideal` — iDEAL, popular in the Netherlands.
    - `kakao_pay` — Kakao Pay, a popular payment method in South Korea.
    - `korea_local` — Multi-step Korean payment method workflow, which includes multiple payment options for the Korean market. Deprecated - use `south_korea_local_card`, `kakao_pay`, `naver_pay`, `payco`, or `samsung_pay` instead.
    - `naver_pay` — Naver Pay, a popular payment method in South Korea.
    - `payco` — Payco, a popular payment method in South Korea.
    - `samsung_pay` — Samsung Pay, a popular payment method in South Korea.
    - `south_korea_local_card` — Korean local credit or debit card.
    - `mb_way` — MB WAY, a popular payment method in Portugal.
    - `paypal` — PayPal.
    - `pix` — Pix, popular in Brazil.
    - `upi` — Unified Payments Interface (UPI), popular in India.
    - `wechat_pay` — WeChat Pay, a popular payment method in China.
- `meta`: object (required) — Information about this response.
  - `request_id`: string (required) — Unique ID for the request relating to this response. Provide this when contacting Paddle support about a specific request.
  - `pagination`: object (required) — Keys used for working with paginated results.
    - `per_page`: integer (required) — Number of entities per page for this response. May differ from the number requested if the requested number is greater than the maximum.
    - `next`: string (uri) (required) — URL containing the query parameters of the original request, along with the `after` parameter that marks the starting point of the next page. Always returned, even if `has_more` is `false`.
    - `has_more`: boolean (required) — Whether this response has another page.
    - `estimated_total`: integer — Estimated number of entities for this response.

For datasets with 100,000 or fewer matches, returns the exact count. For datasets with more than 100,000 matches, returns `100001` to indicate that more than 100,000 entities match. Returns `-1` when counting is skipped or couldn't be calculated.

Use `has_more` and `next` to page through all results rather than relying on `estimated_total` for an exact count.

### Response example

```json
{
  "data": [
    {
      "id": "txn_01hv8xxw3etar07vaxsqbyqasy",
      "status": "draft",
      "customer_id": null,
      "address_id": null,
      "business_id": null,
      "custom_data": null,
      "origin": "web",
      "collection_mode": "automatic",
      "subscription_id": null,
      "invoice_id": null,
      "invoice_number": null,
      "billing_details": null,
      "billing_period": null,
      "currency_code": "GBP",
      "discount_id": null,
      "created_at": "2024-04-12T10:33:52.610609Z",
      "updated_at": "2024-04-12T10:33:52.610609Z",
      "billed_at": null,
      "revised_at": null,
      "items": [
        {
          "price": {
            "id": "pri_01gsz8x8sawmvhz1pv30nge1ke",
            "description": "Monthly",
            "type": "standard",
            "name": "Monthly (per seat)",
            "product_id": "pro_01gsz4t5hdjse780zja8vvr7jg",
            "billing_cycle": {
              "interval": "month",
              "frequency": 1
            },
            "trial_period": null,
            "tax_mode": "account_setting",
            "unit_price": {
              "amount": "3000",
              "currency_code": "USD"
            },
            "unit_price_overrides": [],
            "custom_data": null,
            "quantity": {
              "minimum": 1,
              "maximum": 999
            },
            "status": "active",
            "created_at": "2023-02-23T13:55:22.538367Z",
            "updated_at": "2024-04-11T13:54:52.254748Z",
            "import_meta": null
          },
          "quantity": 10,
          "proration": null
        },
        {
          "price": {
            "id": "pri_01h1vjfevh5etwq3rb416a23h2",
            "description": "Monthly",
            "type": "standard",
            "name": "Monthly (recurring addon)",
            "product_id": "pro_01h1vjes1y163xfj1rh1tkfb65",
            "billing_cycle": {
              "interval": "month",
              "frequency": 1
            },
            "trial_period": null,
            "tax_mode": "account_setting",
            "unit_price": {
              "amount": "10000",
              "currency_code": "USD"
            },
            "unit_price_overrides": [],
            "custom_data": null,
            "quantity": {
              "minimum": 1,
              "maximum": 100
            },
            "status": "active",
            "created_at": "2023-06-01T13:31:12.625056Z",
            "updated_at": "2024-04-09T07:23:00.907834Z",
            "import_meta": null
          },
          "quantity": 1,
          "proration": null
        },
        {
          "price": {
            "id": "pri_01gsz98e27ak2tyhexptwc58yk",
            "description": "One-time addon",
            "type": "standard",
            "name": "One-time addon",
            "product_id": "pro_01gsz97mq9pa4fkyy0wqenepkz",
            "billing_cycle": null,
            "trial_period": null,
            "tax_mode": "account_setting",
            "unit_price": {
              "amount": "19900",
              "currency_code": "USD"
            },
            "unit_price_overrides": [],
            "custom_data": null,
            "quantity": {
              "minimum": 1,
              "maximum": 1
            },
            "status": "active",
            "created_at": "2023-02-23T14:01:28.391712Z",
            "updated_at": "2024-04-09T07:23:10.921392Z",
            "import_meta": null
          },
          "quantity": 1,
          "proration": null
        }
      ],
      "details": {
        "tax_rates_used": [
          {
            "tax_rate": "0.2",
            "totals": {
              "subtotal": "47924",
              "discount": "0",
              "tax": "9585",
              "total": "57509"
            }
          }
        ],
        "totals": {
          "subtotal": "47924",
          "tax": "9585",
          "discount": "0",
          "total": "57509",
          "grand_total": "57509",
          "grand_total_tax": "9585",
          "fee": null,
          "credit": "0",
          "credit_to_balance": "0",
          "balance": "57509",
          "earnings": null,
          "currency_code": "GBP"
        },
        "adjusted_totals": {
          "subtotal": "47924",
          "tax": "9585",
          "total": "57509",
          "grand_total": "57509",
          "grand_total_tax": "9585",
          "fee": "0",
          "earnings": "0",
          "currency_code": "GBP",
          "retained_fee": "0"
        },
        "payout_totals": null,
        "adjusted_payout_totals": null,
        "line_items": [
          {
            "id": "txnitm_01hv8xxw6qxaypzmf81xqgcba9",
            "price_id": "pri_01gsz8x8sawmvhz1pv30nge1ke",
            "quantity": 10,
            "totals": {
              "subtotal": "24000",
              "tax": "4800",
              "discount": "0",
              "total": "28800"
            },
            "product": {
              "id": "pro_01gsz4t5hdjse780zja8vvr7jg",
              "name": "AeroEdit Pro",
              "description": "Designed for professional pilots, including all features plus in Basic plus compliance monitoring, route optimization, and third-party integrations.",
              "type": "standard",
              "tax_category": "standard",
              "image_url": "https://paddle.s3.amazonaws.com/user/165798/bT1XUOJAQhOUxGs83cbk_pro.png",
              "custom_data": {
                "features": {
                  "aircraft_performance": true,
                  "compliance_monitoring": true,
                  "flight_log_management": true,
                  "payment_by_invoice": false,
                  "route_planning": true,
                  "sso": false
                },
                "suggested_addons": [
                  "pro_01h1vjes1y163xfj1rh1tkfb65",
                  "pro_01gsz97mq9pa4fkyy0wqenepkz"
                ],
                "upgrade_description": "Move from Basic to Pro to take advantage of aircraft performance, advanced route planning, and compliance monitoring."
              },
              "status": "active",
              "created_at": "2023-02-23T12:43:46.605Z",
              "updated_at": "2024-04-05T15:53:44.687Z",
              "import_meta": null
            },
            "tax_rate": "0.2",
            "unit_totals": {
              "subtotal": "2400",
              "tax": "480",
              "discount": "0",
              "total": "2880"
            },
            "proration": null
          },
          {
            "id": "txnitm_01hv8xxw6qxaypzmf823nwmr95",
            "price_id": "pri_01h1vjfevh5etwq3rb416a23h2",
            "quantity": 1,
            "totals": {
              "subtotal": "8001",
              "tax": "1600",
              "discount": "0",
              "total": "9601"
            },
            "product": {
              "id": "pro_01h1vjes1y163xfj1rh1tkfb65",
              "name": "Analytics addon",
              "description": "Unlock advanced insights into your flight data with enhanced analytics and reporting features. Includes customizable reporting templates and trend analysis across flights.",
              "type": "standard",
              "tax_category": "standard",
              "image_url": "https://paddle.s3.amazonaws.com/user/165798/97dRpA6SXzcE6ekK9CAr_analytics.png",
              "custom_data": null,
              "status": "active",
              "created_at": "2023-06-01T13:30:50.302Z",
              "updated_at": "2024-04-05T15:47:17.163Z",
              "import_meta": null
            },
            "tax_rate": "0.2",
            "unit_totals": {
              "subtotal": "8001",
              "tax": "1600",
              "discount": "0",
              "total": "9601"
            },
            "proration": null
          },
          {
            "id": "txnitm_01hv8xxw6qxaypzmf829vtr6tx",
            "price_id": "pri_01gsz98e27ak2tyhexptwc58yk",
            "quantity": 1,
            "totals": {
              "subtotal": "15923",
              "tax": "3185",
              "discount": "0",
              "total": "19108"
            },
            "product": {
              "id": "pro_01gsz97mq9pa4fkyy0wqenepkz",
              "name": "Custom domains",
              "description": "Make AeroEdit truly your own with custom domains. Custom domains reinforce your brand identity and make it easy for your team to access your account.",
              "type": "standard",
              "tax_category": "standard",
              "image_url": "https://paddle.s3.amazonaws.com/user/165798/XIG7UXoJQHmlIAiKcnkA_custom-domains.png",
              "custom_data": null,
              "status": "active",
              "created_at": "2023-02-23T14:01:02.441Z",
              "updated_at": "2024-04-05T15:43:28.971Z",
              "import_meta": null
            },
            "tax_rate": "0.2",
            "unit_totals": {
              "subtotal": "15923",
              "tax": "3185",
              "discount": "0",
              "total": "19108"
            },
            "proration": null
          }
        ]
      },
      "payments": [],
      "checkout": {
        "url": "https://aeroedit.com/pay?_ptxn=txn_01hv8xxw3etar07vaxsqbyqasy"
      }
    },
    {
      "id": "txn_01hv8xbtmb6zc7c264ycteehth",
      "status": "past_due",
      "customer_id": "ctm_01hv8wt8nffez4p2t6typn4a5j",
      "address_id": "add_01hv8wt8ny8ms5vtm71bj8vcdd",
      "business_id": null,
      "custom_data": null,
      "origin": "subscription_recurring",
      "collection_mode": "automatic",
      "subscription_id": "sub_01hv8x29kz0t586xy6zn1a62ny",
      "invoice_id": null,
      "invoice_number": null,
      "billing_details": null,
      "billing_period": {
        "starts_at": "2024-05-12T10:18:47.635628Z",
        "ends_at": "2024-06-12T10:18:47.635628Z"
      },
      "currency_code": "USD",
      "discount_id": null,
      "created_at": "2024-04-12T10:24:01.588479Z",
      "updated_at": "2024-04-12T10:24:03.197001Z",
      "billed_at": "2024-04-12T10:24:01.163479Z",
      "revised_at": null,
      "items": [
        {
          "price": {
            "id": "pri_01gsz8x8sawmvhz1pv30nge1ke",
            "description": "Monthly",
            "type": "standard",
            "name": "Monthly (per seat)",
            "product_id": "pro_01gsz4t5hdjse780zja8vvr7jg",
            "billing_cycle": {
              "interval": "month",
              "frequency": 1
            },
            "trial_period": null,
            "tax_mode": "account_setting",
            "unit_price": {
              "amount": "3000",
              "currency_code": "USD"
            },
            "unit_price_overrides": [],
            "custom_data": null,
            "quantity": {
              "minimum": 1,
              "maximum": 999
            },
            "status": "active",
            "created_at": "2023-02-23T13:55:22.538367Z",
            "updated_at": "2024-04-11T13:54:52.254748Z",
            "import_meta": null
          },
          "quantity": 10,
          "proration": {
            "rate": "1",
            "billing_period": {
              "starts_at": "2024-05-12T10:18:47.635628Z",
              "ends_at": "2024-06-12T10:18:47.635628Z"
            }
          }
        },
        {
          "price": {
            "id": "pri_01h1vjfevh5etwq3rb416a23h2",
            "description": "Monthly",
            "type": "standard",
            "name": "Monthly (recurring addon)",
            "product_id": "pro_01h1vjes1y163xfj1rh1tkfb65",
            "billing_cycle": {
              "interval": "month",
              "frequency": 1
            },
            "trial_period": null,
            "tax_mode": "account_setting",
            "unit_price": {
              "amount": "10000",
              "currency_code": "USD"
            },
            "unit_price_overrides": [],
            "custom_data": null,
            "quantity": {
              "minimum": 1,
              "maximum": 100
            },
            "status": "active",
            "created_at": "2023-06-01T13:31:12.625056Z",
            "updated_at": "2024-04-09T07:23:00.907834Z",
            "import_meta": null
          },
          "quantity": 1,
          "proration": {
            "rate": "1",
            "billing_period": {
              "starts_at": "2024-05-12T10:18:47.635628Z",
              "ends_at": "2024-06-12T10:18:47.635628Z"
            }
          }
        }
      ],
      "details": {
        "tax_rates_used": [
          {
            "tax_rate": "0.08875",
            "totals": {
              "subtotal": "40000",
              "discount": "0",
              "tax": "3549",
              "total": "43549"
            }
          }
        ],
        "totals": {
          "subtotal": "40000",
          "tax": "3549",
          "discount": "0",
          "total": "43549",
          "grand_total": "43549",
          "grand_total_tax": "3549",
          "fee": null,
          "credit": "0",
          "credit_to_balance": "0",
          "balance": "43549",
          "earnings": null,
          "currency_code": "USD"
        },
        "adjusted_totals": {
          "subtotal": "40000",
          "tax": "3549",
          "total": "43549",
          "grand_total": "43549",
          "grand_total_tax": "3549",
          "fee": "0",
          "earnings": "0",
          "currency_code": "USD",
          "retained_fee": "0"
        },
        "payout_totals": null,
        "adjusted_payout_totals": null,
        "line_items": [
          {
            "id": "txnitm_01hv8xbv0wdggp4a9338b18ckn",
            "price_id": "pri_01gsz8x8sawmvhz1pv30nge1ke",
            "quantity": 10,
            "totals": {
              "subtotal": "30000",
              "tax": "2662",
              "discount": "0",
              "total": "32662"
            },
            "product": {
              "id": "pro_01gsz4t5hdjse780zja8vvr7jg",
              "name": "AeroEdit Pro",
              "description": "Designed for professional pilots, including all features plus in Basic plus compliance monitoring, route optimization, and third-party integrations.",
              "type": "standard",
              "tax_category": "standard",
              "image_url": "https://paddle.s3.amazonaws.com/user/165798/bT1XUOJAQhOUxGs83cbk_pro.png",
              "custom_data": {
                "features": {
                  "aircraft_performance": true,
                  "compliance_monitoring": true,
                  "flight_log_management": true,
                  "payment_by_invoice": false,
                  "route_planning": true,
                  "sso": false
                },
                "suggested_addons": [
                  "pro_01h1vjes1y163xfj1rh1tkfb65",
                  "pro_01gsz97mq9pa4fkyy0wqenepkz"
                ],
                "upgrade_description": "Move from Basic to Pro to take advantage of aircraft performance, advanced route planning, and compliance monitoring."
              },
              "status": "active",
              "created_at": "2023-02-23T12:43:46.605Z",
              "updated_at": "2024-04-05T15:53:44.687Z",
              "import_meta": null
            },
            "tax_rate": "0.08875",
            "unit_totals": {
              "subtotal": "3000",
              "tax": "266",
              "discount": "0",
              "total": "3266"
            },
            "proration": {
              "rate": "1",
              "billing_period": {
                "starts_at": "2024-05-12T10:18:47.635628Z",
                "ends_at": "2024-06-12T10:18:47.635628Z"
              }
            }
          },
          {
            "id": "txnitm_01hv8xbv0wdggp4a933cx2m9qc",
            "price_id": "pri_01h1vjfevh5etwq3rb416a23h2",
            "quantity": 1,
            "totals": {
              "subtotal": "10000",
              "tax": "887",
              "discount": "0",
              "total": "10887"
            },
            "product": {
              "id": "pro_01h1vjes1y163xfj1rh1tkfb65",
              "name": "Analytics addon",
              "description": "Unlock advanced insights into your flight data with enhanced analytics and reporting features. Includes customizable reporting templates and trend analysis across flights.",
              "type": "standard",
              "tax_category": "standard",
              "image_url": "https://paddle.s3.amazonaws.com/user/165798/97dRpA6SXzcE6ekK9CAr_analytics.png",
              "custom_data": null,
              "status": "active",
              "created_at": "2023-06-01T13:30:50.302Z",
              "updated_at": "2024-04-05T15:47:17.163Z",
              "import_meta": null
            },
            "tax_rate": "0.08875",
            "unit_totals": {
              "subtotal": "10000",
              "tax": "887",
              "discount": "0",
              "total": "10887"
            },
            "proration": {
              "rate": "1",
              "billing_period": {
                "starts_at": "2024-05-12T10:18:47.635628Z",
                "ends_at": "2024-06-12T10:18:47.635628Z"
              }
            }
          }
        ]
      },
      "payments": [
        {
          "payment_attempt_id": "ff8123f6-9cfc-4f04-9984-75e4ad04b169",
          "stored_payment_method_id": "281ff2ca-8550-42b9-bf39-15948e7de62d",
          "payment_method_id": "paymtd_01hv8x1tpjfnttxddw73xnqx6s",
          "amount": "43549",
          "status": "error",
          "error_code": "authentication_failed",
          "method_details": {
            "type": "card",
            "underlying_details": null,
            "south_korea_local_card": null,
            "card": {
              "type": "visa",
              "last4": "3184",
              "expiry_month": 1,
              "expiry_year": 2025,
              "cardholder_name": "Sam Miller"
            },
            "paypal": null
          },
          "created_at": "2024-04-12T10:24:01.692772Z",
          "captured_at": null
        }
      ],
      "checkout": {
        "url": "https://aeroedit.com/pay?_ptxn=txn_01hv8xbtmb6zc7c264ycteehth"
      }
    },
    {
      "id": "txn_01hv8wptq8987qeep44cyrewp9",
      "status": "completed",
      "customer_id": "ctm_01hv8wt8nffez4p2t6typn4a5j",
      "address_id": "add_01hv8wt8ny8ms5vtm71bj8vcdd",
      "business_id": null,
      "custom_data": null,
      "origin": "web",
      "collection_mode": "automatic",
      "subscription_id": "sub_01hv8x29kz0t586xy6zn1a62ny",
      "invoice_id": "inv_01hv8x29nsh54c2pgt0hnq0zkx",
      "invoice_number": "325-10566",
      "billing_details": null,
      "billing_period": {
        "starts_at": "2024-04-12T10:18:47.635628Z",
        "ends_at": "2024-05-12T10:18:47.635628Z"
      },
      "currency_code": "USD",
      "discount_id": null,
      "created_at": "2024-04-12T10:12:33.2014Z",
      "updated_at": "2024-04-12T10:20:21.386946Z",
      "billed_at": "2024-04-12T10:18:48.294633Z",
      "revised_at": null,
      "items": [
        {
          "price": {
            "id": "pri_01gsz8x8sawmvhz1pv30nge1ke",
            "description": "Monthly",
            "type": "standard",
            "name": "Monthly (per seat)",
            "product_id": "pro_01gsz4t5hdjse780zja8vvr7jg",
            "billing_cycle": {
              "interval": "month",
              "frequency": 1
            },
            "trial_period": null,
            "tax_mode": "account_setting",
            "unit_price": {
              "amount": "3000",
              "currency_code": "USD"
            },
            "unit_price_overrides": [],
            "custom_data": null,
            "quantity": {
              "minimum": 1,
              "maximum": 999
            },
            "status": "active",
            "created_at": "2023-02-23T13:55:22.538367Z",
            "updated_at": "2024-04-11T13:54:52.254748Z",
            "import_meta": null
          },
          "quantity": 10,
          "proration": null
        },
        {
          "price": {
            "id": "pri_01h1vjfevh5etwq3rb416a23h2",
            "description": "Monthly",
            "type": "standard",
            "name": "Monthly (recurring addon)",
            "product_id": "pro_01h1vjes1y163xfj1rh1tkfb65",
            "billing_cycle": {
              "interval": "month",
              "frequency": 1
            },
            "trial_period": null,
            "tax_mode": "account_setting",
            "unit_price": {
              "amount": "10000",
              "currency_code": "USD"
            },
            "unit_price_overrides": [],
            "custom_data": null,
            "quantity": {
              "minimum": 1,
              "maximum": 100
            },
            "status": "active",
            "created_at": "2023-06-01T13:31:12.625056Z",
            "updated_at": "2024-04-09T07:23:00.907834Z",
            "import_meta": null
          },
          "quantity": 1,
          "proration": null
        },
        {
          "price": {
            "id": "pri_01gsz98e27ak2tyhexptwc58yk",
            "description": "One-time addon",
            "type": "standard",
            "name": "One-time addon",
            "product_id": "pro_01gsz97mq9pa4fkyy0wqenepkz",
            "billing_cycle": null,
            "trial_period": null,
            "tax_mode": "account_setting",
            "unit_price": {
              "amount": "19900",
              "currency_code": "USD"
            },
            "unit_price_overrides": [],
            "custom_data": null,
            "quantity": {
              "minimum": 1,
              "maximum": 1
            },
            "status": "active",
            "created_at": "2023-02-23T14:01:28.391712Z",
            "updated_at": "2024-04-09T07:23:10.921392Z",
            "import_meta": null
          },
          "quantity": 1,
          "proration": null
        }
      ],
      "details": {
        "tax_rates_used": [
          {
            "tax_rate": "0.08875",
            "totals": {
              "subtotal": "59900",
              "discount": "0",
              "tax": "5315",
              "total": "65215"
            }
          }
        ],
        "totals": {
          "subtotal": "59900",
          "tax": "5315",
          "discount": "0",
          "total": "65215",
          "grand_total": "65215",
          "grand_total_tax": "5315",
          "fee": "3311",
          "credit": "0",
          "credit_to_balance": "0",
          "balance": "0",
          "earnings": "56589",
          "currency_code": "USD"
        },
        "adjusted_totals": {
          "subtotal": "59900",
          "tax": "5315",
          "total": "65215",
          "grand_total": "65215",
          "grand_total_tax": "5315",
          "fee": "3311",
          "earnings": "56589",
          "currency_code": "USD",
          "retained_fee": "0"
        },
        "payout_totals": {
          "subtotal": "59900",
          "discount": "0",
          "tax": "5315",
          "total": "65215",
          "credit": "0",
          "credit_to_balance": "0",
          "balance": "0",
          "grand_total": "65215",
          "grand_total_tax": "5315",
          "fee": "3311",
          "earnings": "56589",
          "currency_code": "USD",
          "exchange_rate": "1",
          "fee_rate": "0.05"
        },
        "adjusted_payout_totals": {
          "subtotal": "59900",
          "tax": "5315",
          "total": "65215",
          "fee": "3311",
          "retained_fee": "0",
          "chargeback_fee": {
            "amount": "0",
            "original": null
          },
          "earnings": "56589",
          "currency_code": "USD",
          "exchange_rate": "1"
        },
        "line_items": [
          {
            "id": "txnitm_01hv8wt98jahpbm1t1tzr06z6n",
            "price_id": "pri_01gsz8x8sawmvhz1pv30nge1ke",
            "quantity": 10,
            "totals": {
              "subtotal": "30000",
              "tax": "2662",
              "discount": "0",
              "total": "32662"
            },
            "product": {
              "id": "pro_01gsz4t5hdjse780zja8vvr7jg",
              "name": "AeroEdit Pro",
              "description": "Designed for professional pilots, including all features plus in Basic plus compliance monitoring, route optimization, and third-party integrations.",
              "type": "standard",
              "tax_category": "standard",
              "image_url": "https://paddle.s3.amazonaws.com/user/165798/bT1XUOJAQhOUxGs83cbk_pro.png",
              "custom_data": {
                "features": {
                  "aircraft_performance": true,
                  "compliance_monitoring": true,
                  "flight_log_management": true,
                  "payment_by_invoice": false,
                  "route_planning": true,
                  "sso": false
                },
                "suggested_addons": [
                  "pro_01h1vjes1y163xfj1rh1tkfb65",
                  "pro_01gsz97mq9pa4fkyy0wqenepkz"
                ],
                "upgrade_description": "Move from Basic to Pro to take advantage of aircraft performance, advanced route planning, and compliance monitoring."
              },
              "status": "active",
              "created_at": "2023-02-23T12:43:46.605Z",
              "updated_at": "2024-04-05T15:53:44.687Z",
              "import_meta": null
            },
            "tax_rate": "0.08875",
            "unit_totals": {
              "subtotal": "3000",
              "tax": "266",
              "discount": "0",
              "total": "3266"
            },
            "proration": null
          },
          {
            "id": "txnitm_01hv8wt98jahpbm1t1v1sd067y",
            "price_id": "pri_01h1vjfevh5etwq3rb416a23h2",
            "quantity": 1,
            "totals": {
              "subtotal": "10000",
              "tax": "887",
              "discount": "0",
              "total": "10887"
            },
            "product": {
              "id": "pro_01h1vjes1y163xfj1rh1tkfb65",
              "name": "Analytics addon",
              "description": "Unlock advanced insights into your flight data with enhanced analytics and reporting features. Includes customizable reporting templates and trend analysis across flights.",
              "type": "standard",
              "tax_category": "standard",
              "image_url": "https://paddle.s3.amazonaws.com/user/165798/97dRpA6SXzcE6ekK9CAr_analytics.png",
              "custom_data": null,
              "status": "active",
              "created_at": "2023-06-01T13:30:50.302Z",
              "updated_at": "2024-04-05T15:47:17.163Z",
              "import_meta": null
            },
            "tax_rate": "0.08875",
            "unit_totals": {
              "subtotal": "10000",
              "tax": "887",
              "discount": "0",
              "total": "10887"
            },
            "proration": null
          },
          {
            "id": "txnitm_01hv8wt98jahpbm1t1v67vqnb6",
            "price_id": "pri_01gsz98e27ak2tyhexptwc58yk",
            "quantity": 1,
            "totals": {
              "subtotal": "19900",
              "tax": "1766",
              "discount": "0",
              "total": "21666"
            },
            "product": {
              "id": "pro_01gsz97mq9pa4fkyy0wqenepkz",
              "name": "Custom domains",
              "description": "Make AeroEdit truly your own with custom domains. Custom domains reinforce your brand identity and make it easy for your team to access your account.",
              "type": "standard",
              "tax_category": "standard",
              "image_url": "https://paddle.s3.amazonaws.com/user/165798/XIG7UXoJQHmlIAiKcnkA_custom-domains.png",
              "custom_data": null,
              "status": "active",
              "created_at": "2023-02-23T14:01:02.441Z",
              "updated_at": "2024-04-05T15:43:28.971Z",
              "import_meta": null
            },
            "tax_rate": "0.08875",
            "unit_totals": {
              "subtotal": "19900",
              "tax": "1766",
              "discount": "0",
              "total": "21666"
            },
            "proration": null
          }
        ]
      },
      "payments": [
        {
          "payment_attempt_id": "937640dd-e3dc-40df-a16c-bb75aafd8f71",
          "stored_payment_method_id": "281ff2ca-8550-42b9-bf39-15948e7de62d",
          "payment_method_id": "paymtd_01hv8x1tpjfnttxddw73xnqx6s",
          "amount": "65215",
          "status": "captured",
          "error_code": null,
          "method_details": {
            "type": "card",
            "underlying_details": null,
            "south_korea_local_card": null,
            "card": {
              "type": "visa",
              "last4": "3184",
              "expiry_month": 1,
              "expiry_year": 2025,
              "cardholder_name": "Sam Miller"
            },
            "paypal": null
          },
          "created_at": "2024-04-12T10:18:33.579142Z",
          "captured_at": "2024-04-12T10:18:47.635628Z"
        },
        {
          "payment_attempt_id": "8f72cfa6-26b4-4a57-91dc-8f2708f7822d",
          "stored_payment_method_id": "a78ece50-356f-4e0c-b72d-ad5368b0a0d9",
          "payment_method_id": "paymtd_01hv8wx2mka7dfsqjjsxh1ne7z",
          "amount": "65215",
          "status": "error",
          "error_code": "declined",
          "method_details": {
            "type": "card",
            "underlying_details": null,
            "south_korea_local_card": null,
            "card": {
              "type": "visa",
              "last4": "0002",
              "expiry_month": 1,
              "expiry_year": 2025,
              "cardholder_name": "Sam Miller"
            },
            "paypal": null
          },
          "created_at": "2024-04-12T10:15:57.888183Z",
          "captured_at": null
        }
      ],
      "checkout": {
        "url": "https://aeroedit.com/pay?_ptxn=txn_01hv8wptq8987qeep44cyrewp9"
      }
    },
    {
      "id": "txn_01hv8wnvvtedwjrhfhpr9vkq9w",
      "status": "completed",
      "customer_id": "ctm_01hchnxgrh0wcyngy8q9d1hpkz",
      "address_id": "add_01hchnxgsa1v3791z2tvy0fc1t",
      "business_id": null,
      "custom_data": null,
      "origin": "subscription_recurring",
      "collection_mode": "automatic",
      "subscription_id": "sub_01hchny8h8r5w9xtb514qs6rdy",
      "invoice_id": "inv_01hv8wnzafnbv52m4zs73gghrq",
      "invoice_number": "325-10565",
      "billing_details": null,
      "billing_period": {
        "starts_at": "2024-04-12T10:11:57.907988Z",
        "ends_at": "2024-05-12T10:11:57.907988Z"
      },
      "currency_code": "USD",
      "discount_id": null,
      "created_at": "2024-04-12T10:12:01.643104Z",
      "updated_at": "2024-04-12T10:15:53.705103Z",
      "billed_at": "2024-04-12T10:12:01.530736Z",
      "revised_at": null,
      "items": [
        {
          "price": {
            "id": "pri_01h1vjfevh5etwq3rb416a23h2",
            "description": "Monthly (recurring addon)",
            "type": "standard",
            "name": null,
            "product_id": "pro_01h1vjes1y163xfj1rh1tkfb65",
            "billing_cycle": {
              "interval": "month",
              "frequency": 1
            },
            "trial_period": null,
            "tax_mode": "account_setting",
            "unit_price": {
              "amount": "10000",
              "currency_code": "USD"
            },
            "unit_price_overrides": [],
            "custom_data": null,
            "quantity": {
              "minimum": 1,
              "maximum": 100
            },
            "status": "active",
            "created_at": "2023-06-01T13:31:12.625056Z",
            "updated_at": "2023-08-30T10:34:33.862679Z",
            "import_meta": null
          },
          "quantity": 1,
          "proration": {
            "rate": "1",
            "billing_period": {
              "starts_at": "2024-04-12T10:11:57.907988Z",
              "ends_at": "2024-05-12T10:11:57.907988Z"
            }
          }
        },
        {
          "price": {
            "id": "pri_01gsz8x8sawmvhz1pv30nge1ke",
            "description": "Monthly (per seat)",
            "type": "standard",
            "name": null,
            "product_id": "pro_01gsz4t5hdjse780zja8vvr7jg",
            "billing_cycle": {
              "interval": "month",
              "frequency": 1
            },
            "trial_period": null,
            "tax_mode": "account_setting",
            "unit_price": {
              "amount": "3000",
              "currency_code": "USD"
            },
            "unit_price_overrides": [],
            "custom_data": null,
            "quantity": {
              "minimum": 10,
              "maximum": 999
            },
            "status": "active",
            "created_at": "2023-02-23T13:55:22.538367Z",
            "updated_at": "2023-08-16T12:37:28.60409Z",
            "import_meta": null
          },
          "quantity": 10,
          "proration": {
            "rate": "1",
            "billing_period": {
              "starts_at": "2024-04-12T10:11:57.907988Z",
              "ends_at": "2024-05-12T10:11:57.907988Z"
            }
          }
        }
      ],
      "details": {
        "tax_rates_used": [
          {
            "tax_rate": "0.19",
            "totals": {
              "subtotal": "40000",
              "discount": "0",
              "tax": "7600",
              "total": "47600"
            }
          }
        ],
        "totals": {
          "subtotal": "40000",
          "tax": "7600",
          "discount": "0",
          "total": "47600",
          "grand_total": "47600",
          "grand_total_tax": "7600",
          "fee": "2430",
          "credit": "0",
          "credit_to_balance": "0",
          "balance": "0",
          "earnings": "37570",
          "currency_code": "USD"
        },
        "adjusted_totals": {
          "subtotal": "40000",
          "tax": "7600",
          "total": "47600",
          "grand_total": "47600",
          "grand_total_tax": "7600",
          "fee": "2430",
          "earnings": "37570",
          "currency_code": "USD",
          "retained_fee": "0"
        },
        "payout_totals": {
          "subtotal": "40000",
          "discount": "0",
          "tax": "7600",
          "total": "47600",
          "credit": "0",
          "credit_to_balance": "0",
          "balance": "0",
          "grand_total": "47600",
          "grand_total_tax": "7600",
          "fee": "2430",
          "earnings": "37570",
          "currency_code": "USD",
          "exchange_rate": "1",
          "fee_rate": "0.05"
        },
        "adjusted_payout_totals": {
          "subtotal": "40000",
          "tax": "7600",
          "total": "47600",
          "fee": "2430",
          "retained_fee": "0",
          "chargeback_fee": {
            "amount": "0",
            "original": null
          },
          "earnings": "37570",
          "currency_code": "USD",
          "exchange_rate": "1"
        },
        "line_items": [
          {
            "id": "txnitm_01hv8wnvyfe1jtd0jczr9wed4s",
            "price_id": "pri_01h1vjfevh5etwq3rb416a23h2",
            "quantity": 1,
            "totals": {
              "subtotal": "10000",
              "tax": "1900",
              "discount": "0",
              "total": "11900"
            },
            "product": {
              "id": "pro_01h1vjes1y163xfj1rh1tkfb65",
              "name": "Analytics addon",
              "description": "Unlock advanced insights into your flight data with enhanced analytics and reporting features. Includes customizable reporting templates and trend analysis across flights.",
              "type": "standard",
              "tax_category": "standard",
              "image_url": "https://paddle.s3.amazonaws.com/user/165798/97dRpA6SXzcE6ekK9CAr_analytics.png",
              "custom_data": null,
              "status": "active",
              "created_at": "2023-06-01T13:30:50.302Z",
              "updated_at": "2024-04-05T15:47:17.163Z",
              "import_meta": null
            },
            "tax_rate": "0.19",
            "unit_totals": {
              "subtotal": "10000",
              "tax": "1900",
              "discount": "0",
              "total": "11900"
            },
            "proration": {
              "rate": "1",
              "billing_period": {
                "starts_at": "2024-04-12T10:11:57.907988Z",
                "ends_at": "2024-05-12T10:11:57.907988Z"
              }
            }
          },
          {
            "id": "txnitm_01hv8wnvyfe1jtd0jczy8s3mtk",
            "price_id": "pri_01gsz8x8sawmvhz1pv30nge1ke",
            "quantity": 10,
            "totals": {
              "subtotal": "30000",
              "tax": "5700",
              "discount": "0",
              "total": "35700"
            },
            "product": {
              "id": "pro_01gsz4t5hdjse780zja8vvr7jg",
              "name": "AeroEdit Pro",
              "description": "Designed for professional pilots, including all features plus in Basic plus compliance monitoring, route optimization, and third-party integrations.",
              "type": "standard",
              "tax_category": "standard",
              "image_url": "https://paddle.s3.amazonaws.com/user/165798/bT1XUOJAQhOUxGs83cbk_pro.png",
              "custom_data": {
                "features": {
                  "aircraft_performance": true,
                  "compliance_monitoring": true,
                  "flight_log_management": true,
                  "payment_by_invoice": false,
                  "route_planning": true,
                  "sso": false
                },
                "suggested_addons": [
                  "pro_01h1vjes1y163xfj1rh1tkfb65",
                  "pro_01gsz97mq9pa4fkyy0wqenepkz"
                ],
                "upgrade_description": "Move from Basic to Pro to take advantage of aircraft performance, advanced route planning, and compliance monitoring."
              },
              "status": "active",
              "created_at": "2023-02-23T12:43:46.605Z",
              "updated_at": "2024-04-05T15:53:44.687Z",
              "import_meta": null
            },
            "tax_rate": "0.19",
            "unit_totals": {
              "subtotal": "3000",
              "tax": "570",
              "discount": "0",
              "total": "3570"
            },
            "proration": {
              "rate": "1",
              "billing_period": {
                "starts_at": "2024-04-12T10:11:57.907988Z",
                "ends_at": "2024-05-12T10:11:57.907988Z"
              }
            }
          }
        ]
      },
      "payments": [
        {
          "payment_attempt_id": "37658fc8-5290-4384-a459-1e7a4e37174d",
          "stored_payment_method_id": "1fa1a6bb-d2cd-4af3-88ec-45b0d88a066a",
          "payment_method_id": "paymtd_01hchny0jr4h5b7adktfdacmgy",
          "amount": "47600",
          "status": "captured",
          "error_code": null,
          "method_details": {
            "type": "card",
            "underlying_details": null,
            "south_korea_local_card": null,
            "card": {
              "type": "visa",
              "last4": "5556",
              "expiry_month": 6,
              "expiry_year": 2026,
              "cardholder_name": "test"
            },
            "paypal": null
          },
          "created_at": "2024-04-12T10:12:01.729257Z",
          "captured_at": "2024-04-12T10:12:04.496216Z"
        }
      ],
      "checkout": {
        "url": "https://aeroedit.com/pay?_ptxn=txn_01hv8wnvvtedwjrhfhpr9vkq9w"
      }
    },
    {
      "id": "txn_01hv8m0mnx3sj85e7gxc6kga03",
      "status": "canceled",
      "customer_id": "ctm_01hv6y1jedq4p1n0yqn5ba3ky4",
      "address_id": "add_01hv8gq3318ktkfengj2r75gfx",
      "business_id": null,
      "custom_data": null,
      "origin": "api",
      "collection_mode": "manual",
      "subscription_id": "sub_01hv8xqmay5w5rfsnzkxzgy0yp",
      "invoice_id": "inv_01hv8m0nn5nbvdejcvv9cpg8jf",
      "invoice_number": "325-10567",
      "billing_details": {
        "enable_checkout": false,
        "payment_terms": {
          "interval": "day",
          "frequency": 14
        },
        "purchase_order_number": "PO-123",
        "additional_information": null
      },
      "billing_period": {
        "starts_at": "2024-04-12T00:00:00Z",
        "ends_at": "2025-04-11T23:59:00Z"
      },
      "currency_code": "USD",
      "discount_id": "dsc_01gtgztp8fpchantd5g1wrksa3",
      "created_at": "2024-04-12T07:40:38.00704Z",
      "updated_at": "2024-04-12T10:31:27.360716Z",
      "billed_at": "2024-04-12T10:30:27.198043Z",
      "revised_at": null,
      "items": [
        {
          "price": {
            "id": "pri_01gsz91wy9k1yn7kx82aafwvea",
            "description": "Annual",
            "type": "standard",
            "name": "Annual (per seat)",
            "product_id": "pro_01gsz4vmqbjk3x4vvtafffd540",
            "billing_cycle": {
              "interval": "year",
              "frequency": 1
            },
            "trial_period": null,
            "tax_mode": "account_setting",
            "unit_price": {
              "amount": "50000",
              "currency_code": "USD"
            },
            "unit_price_overrides": [],
            "custom_data": null,
            "quantity": {
              "minimum": 1,
              "maximum": 100
            },
            "status": "active",
            "created_at": "2023-02-23T13:57:54.249913Z",
            "updated_at": "2024-04-05T14:32:00.471447Z",
            "import_meta": null
          },
          "quantity": 50,
          "proration": null
        },
        {
          "price": {
            "id": "pri_01gsz96z29d88jrmsf2ztbfgjg",
            "description": "Annual (recurring addon)",
            "type": "standard",
            "name": "Annual (recurring addon)",
            "product_id": "pro_01gsz92krfzy3hcx5h5rtgnfwz",
            "billing_cycle": {
              "interval": "year",
              "frequency": 1
            },
            "trial_period": null,
            "tax_mode": "account_setting",
            "unit_price": {
              "amount": "300000",
              "currency_code": "USD"
            },
            "unit_price_overrides": [],
            "custom_data": null,
            "quantity": {
              "minimum": 1,
              "maximum": 1
            },
            "status": "active",
            "created_at": "2023-02-23T14:00:40.265185Z",
            "updated_at": "2024-03-25T14:31:18.587603Z",
            "import_meta": null
          },
          "quantity": 1,
          "proration": null
        },
        {
          "price": {
            "id": "pri_01gsz98e27ak2tyhexptwc58yk",
            "description": "One-time addon",
            "type": "standard",
            "name": "One-time addon",
            "product_id": "pro_01gsz97mq9pa4fkyy0wqenepkz",
            "billing_cycle": null,
            "trial_period": null,
            "tax_mode": "account_setting",
            "unit_price": {
              "amount": "19900",
              "currency_code": "USD"
            },
            "unit_price_overrides": [],
            "custom_data": null,
            "quantity": {
              "minimum": 1,
              "maximum": 1
            },
            "status": "active",
            "created_at": "2023-02-23T14:01:28.391712Z",
            "updated_at": "2024-04-09T07:23:10.921392Z",
            "import_meta": null
          },
          "quantity": 1,
          "proration": null
        }
      ],
      "details": {
        "tax_rates_used": [
          {
            "tax_rate": "0.08875",
            "totals": {
              "subtotal": "2819900",
              "discount": "281990",
              "tax": "225239",
              "total": "2763149"
            }
          }
        ],
        "totals": {
          "subtotal": "2819900",
          "tax": "225239",
          "discount": "281990",
          "total": "2763149",
          "grand_total": "2763149",
          "grand_total_tax": "225239",
          "fee": null,
          "credit": "0",
          "credit_to_balance": "0",
          "balance": "2763149",
          "earnings": null,
          "currency_code": "USD"
        },
        "adjusted_totals": {
          "subtotal": "2537910",
          "tax": "225239",
          "total": "2763149",
          "grand_total": "2763149",
          "grand_total_tax": "225239",
          "fee": "0",
          "earnings": "0",
          "currency_code": "USD",
          "retained_fee": "0"
        },
        "payout_totals": null,
        "adjusted_payout_totals": null,
        "line_items": [
          {
            "id": "txnitm_01hv8vzz0sjdj6grvpxyyjsmvf",
            "price_id": "pri_01gsz91wy9k1yn7kx82aafwvea",
            "quantity": 50,
            "totals": {
              "subtotal": "2500000",
              "tax": "199687",
              "discount": "250000",
              "total": "2449687"
            },
            "product": {
              "id": "pro_01gsz4vmqbjk3x4vvtafffd540",
              "name": "AeroEdit Enterprise",
              "description": "The ultimate solution for organizations, featuring all Pro capabilities plus multi-user support, advanced data storage capabilities, plus personalized onboarding, dedicated account management, and the ability to pay via invoice.",
              "type": "standard",
              "tax_category": "standard",
              "image_url": "https://paddle.s3.amazonaws.com/user/165798/Ws808ziTS76a6YbnMkiK_enterprise.png",
              "custom_data": {
                "features": {
                  "aircraft_performance": true,
                  "compliance_monitoring": true,
                  "flight_log_management": true,
                  "payment_by_invoice": true,
                  "route_planning": true,
                  "sso": true
                },
                "suggested_addons": [],
                "upgrade_description": "Ready to reach new heights? Upgrade to enterprise to unlock single sign-on, payment by invoice, and dedicated account management."
              },
              "status": "active",
              "created_at": "2023-02-23T12:44:34.923Z",
              "updated_at": "2024-04-05T15:58:28.309Z",
              "import_meta": null
            },
            "tax_rate": "0.08875",
            "unit_totals": {
              "subtotal": "50000",
              "tax": "3994",
              "discount": "5000",
              "total": "48994"
            },
            "proration": null
          },
          {
            "id": "txnitm_01hv8vzz0sjdj6grvpy1fzm46f",
            "price_id": "pri_01gsz96z29d88jrmsf2ztbfgjg",
            "quantity": 1,
            "totals": {
              "subtotal": "300000",
              "tax": "23962",
              "discount": "30000",
              "total": "293962"
            },
            "product": {
              "id": "pro_01gsz92krfzy3hcx5h5rtgnfwz",
              "name": "VIP support",
              "description": "Get exclusive access to our expert team of product specialists, available to help you make the most of your AeroEdit subscription.",
              "type": "standard",
              "tax_category": "standard",
              "image_url": "https://paddle.s3.amazonaws.com/user/165798/qgyipKJwRtq98YNboipo_vip-support.png",
              "custom_data": null,
              "status": "active",
              "created_at": "2023-02-23T13:58:17.615Z",
              "updated_at": "2024-04-05T15:44:02.893Z",
              "import_meta": null
            },
            "tax_rate": "0.08875",
            "unit_totals": {
              "subtotal": "300000",
              "tax": "23962",
              "discount": "30000",
              "total": "293962"
            },
            "proration": null
          },
          {
            "id": "txnitm_01hv8vzz0sjdj6grvpy6g84gyw",
            "price_id": "pri_01gsz98e27ak2tyhexptwc58yk",
            "quantity": 1,
            "totals": {
              "subtotal": "19900",
              "tax": "1590",
              "discount": "1990",
              "total": "19500"
            },
            "product": {
              "id": "pro_01gsz97mq9pa4fkyy0wqenepkz",
              "name": "Custom domains",
              "description": "Make AeroEdit truly your own with custom domains. Custom domains reinforce your brand identity and make it easy for your team to access your account.",
              "type": "standard",
              "tax_category": "standard",
              "image_url": "https://paddle.s3.amazonaws.com/user/165798/XIG7UXoJQHmlIAiKcnkA_custom-domains.png",
              "custom_data": null,
              "status": "active",
              "created_at": "2023-02-23T14:01:02.441Z",
              "updated_at": "2024-04-05T15:43:28.971Z",
              "import_meta": null
            },
            "tax_rate": "0.08875",
            "unit_totals": {
              "subtotal": "19900",
              "tax": "1590",
              "discount": "1990",
              "total": "19500"
            },
            "proration": null
          }
        ]
      },
      "payments": [],
      "checkout": {
        "url": null
      }
    },
    {
      "id": "txn_01hv8kxg3hxyxs9t471ms9kfsz",
      "status": "ready",
      "customer_id": "ctm_01hv6y1jedq4p1n0yqn5ba3ky4",
      "address_id": "add_01hv8gq3318ktkfengj2r75gfx",
      "business_id": null,
      "custom_data": null,
      "origin": "api",
      "collection_mode": "manual",
      "subscription_id": null,
      "invoice_id": "inv_01hv8kxgy9cx5mps83eqrm0v9c",
      "invoice_number": null,
      "billing_details": {
        "enable_checkout": false,
        "payment_terms": {
          "interval": "day",
          "frequency": 14
        },
        "purchase_order_number": "PO-123",
        "additional_information": null
      },
      "billing_period": {
        "starts_at": "2023-08-01T00:00:00Z",
        "ends_at": "2024-07-31T23:59:00Z"
      },
      "currency_code": "USD",
      "discount_id": null,
      "created_at": "2024-04-12T07:38:54.904246Z",
      "updated_at": "2024-04-12T07:38:57.079109Z",
      "billed_at": null,
      "revised_at": null,
      "items": [
        {
          "price": {
            "id": "pri_01gsz91wy9k1yn7kx82aafwvea",
            "description": "Annual",
            "type": "standard",
            "name": "Annual (per seat)",
            "product_id": "pro_01gsz4vmqbjk3x4vvtafffd540",
            "billing_cycle": {
              "interval": "year",
              "frequency": 1
            },
            "trial_period": null,
            "tax_mode": "account_setting",
            "unit_price": {
              "amount": "50000",
              "currency_code": "USD"
            },
            "unit_price_overrides": [],
            "custom_data": null,
            "quantity": {
              "minimum": 1,
              "maximum": 100
            },
            "status": "active",
            "created_at": "2023-02-23T13:57:54.249913Z",
            "updated_at": "2024-04-05T14:32:00.471447Z",
            "import_meta": null
          },
          "quantity": 20,
          "proration": null
        },
        {
          "price": {
            "id": "pri_01gsz96z29d88jrmsf2ztbfgjg",
            "description": "Annual (recurring addon)",
            "type": "standard",
            "name": "Annual (recurring addon)",
            "product_id": "pro_01gsz92krfzy3hcx5h5rtgnfwz",
            "billing_cycle": {
              "interval": "year",
              "frequency": 1
            },
            "trial_period": null,
            "tax_mode": "account_setting",
            "unit_price": {
              "amount": "300000",
              "currency_code": "USD"
            },
            "unit_price_overrides": [],
            "custom_data": null,
            "quantity": {
              "minimum": 1,
              "maximum": 1
            },
            "status": "active",
            "created_at": "2023-02-23T14:00:40.265185Z",
            "updated_at": "2024-03-25T14:31:18.587603Z",
            "import_meta": null
          },
          "quantity": 1,
          "proration": null
        },
        {
          "price": {
            "id": "pri_01gsz98e27ak2tyhexptwc58yk",
            "description": "One-time addon",
            "type": "standard",
            "name": "One-time addon",
            "product_id": "pro_01gsz97mq9pa4fkyy0wqenepkz",
            "billing_cycle": null,
            "trial_period": null,
            "tax_mode": "account_setting",
            "unit_price": {
              "amount": "19900",
              "currency_code": "USD"
            },
            "unit_price_overrides": [],
            "custom_data": null,
            "quantity": {
              "minimum": 1,
              "maximum": 1
            },
            "status": "active",
            "created_at": "2023-02-23T14:01:28.391712Z",
            "updated_at": "2024-04-09T07:23:10.921392Z",
            "import_meta": null
          },
          "quantity": 1,
          "proration": null
        }
      ],
      "details": {
        "tax_rates_used": [
          {
            "tax_rate": "0.08875",
            "totals": {
              "subtotal": "1319900",
              "discount": "0",
              "tax": "117141",
              "total": "1437041"
            }
          }
        ],
        "totals": {
          "subtotal": "1319900",
          "tax": "117141",
          "discount": "0",
          "total": "1437041",
          "grand_total": "1437041",
          "grand_total_tax": "117141",
          "fee": null,
          "credit": "0",
          "credit_to_balance": "0",
          "balance": "1437041",
          "earnings": null,
          "currency_code": "USD"
        },
        "adjusted_totals": {
          "subtotal": "1319900",
          "tax": "117141",
          "total": "1437041",
          "grand_total": "1437041",
          "grand_total_tax": "117141",
          "fee": "0",
          "earnings": "0",
          "currency_code": "USD",
          "retained_fee": "0"
        },
        "payout_totals": null,
        "adjusted_payout_totals": null,
        "line_items": [
          {
            "id": "txnitm_01hv8kxghfn69z43wr13hy15dy",
            "price_id": "pri_01gsz91wy9k1yn7kx82aafwvea",
            "quantity": 20,
            "totals": {
              "subtotal": "1000000",
              "tax": "88750",
              "discount": "0",
              "total": "1088750"
            },
            "product": {
              "id": "pro_01gsz4vmqbjk3x4vvtafffd540",
              "name": "AeroEdit Enterprise",
              "description": "The ultimate solution for organizations, featuring all Pro capabilities plus multi-user support, advanced data storage capabilities, plus personalized onboarding, dedicated account management, and the ability to pay via invoice.",
              "type": "standard",
              "tax_category": "standard",
              "image_url": "https://paddle.s3.amazonaws.com/user/165798/Ws808ziTS76a6YbnMkiK_enterprise.png",
              "custom_data": {
                "features": {
                  "aircraft_performance": true,
                  "compliance_monitoring": true,
                  "flight_log_management": true,
                  "payment_by_invoice": true,
                  "route_planning": true,
                  "sso": true
                },
                "suggested_addons": [],
                "upgrade_description": "Ready to reach new heights? Upgrade to enterprise to unlock single sign-on, payment by invoice, and dedicated account management."
              },
              "status": "active",
              "created_at": "2023-02-23T12:44:34.923Z",
              "updated_at": "2024-04-05T15:58:28.309Z",
              "import_meta": null
            },
            "tax_rate": "0.08875",
            "unit_totals": {
              "subtotal": "50000",
              "tax": "4437",
              "discount": "0",
              "total": "54437"
            },
            "proration": null
          },
          {
            "id": "txnitm_01hv8kxghfn69z43wr164x2bmd",
            "price_id": "pri_01gsz96z29d88jrmsf2ztbfgjg",
            "quantity": 1,
            "totals": {
              "subtotal": "300000",
              "tax": "26625",
              "discount": "0",
              "total": "326625"
            },
            "product": {
              "id": "pro_01gsz92krfzy3hcx5h5rtgnfwz",
              "name": "VIP support",
              "description": "Get exclusive access to our expert team of product specialists, available to help you make the most of your AeroEdit subscription.",
              "type": "standard",
              "tax_category": "standard",
              "image_url": "https://paddle.s3.amazonaws.com/user/165798/qgyipKJwRtq98YNboipo_vip-support.png",
              "custom_data": null,
              "status": "active",
              "created_at": "2023-02-23T13:58:17.615Z",
              "updated_at": "2024-04-05T15:44:02.893Z",
              "import_meta": null
            },
            "tax_rate": "0.08875",
            "unit_totals": {
              "subtotal": "300000",
              "tax": "26625",
              "discount": "0",
              "total": "326625"
            },
            "proration": null
          },
          {
            "id": "txnitm_01hv8kxghfn69z43wr16v81qhb",
            "price_id": "pri_01gsz98e27ak2tyhexptwc58yk",
            "quantity": 1,
            "totals": {
              "subtotal": "19900",
              "tax": "1766",
              "discount": "0",
              "total": "21666"
            },
            "product": {
              "id": "pro_01gsz97mq9pa4fkyy0wqenepkz",
              "name": "Custom domains",
              "description": "Make AeroEdit truly your own with custom domains. Custom domains reinforce your brand identity and make it easy for your team to access your account.",
              "type": "standard",
              "tax_category": "standard",
              "image_url": "https://paddle.s3.amazonaws.com/user/165798/XIG7UXoJQHmlIAiKcnkA_custom-domains.png",
              "custom_data": null,
              "status": "active",
              "created_at": "2023-02-23T14:01:02.441Z",
              "updated_at": "2024-04-05T15:43:28.971Z",
              "import_meta": null
            },
            "tax_rate": "0.08875",
            "unit_totals": {
              "subtotal": "19900",
              "tax": "1766",
              "discount": "0",
              "total": "21666"
            },
            "proration": null
          }
        ]
      },
      "payments": [],
      "checkout": {
        "url": null
      }
    }
  ],
  "meta": {
    "request_id": "b93d9c94-c28f-4e5d-af2e-044854d7afe8",
    "pagination": {
      "per_page": 30,
      "next": "https://api.paddle.com/transactions?after=txn_01hv8kxg3hxyxs9t471ms9kfsz",
      "has_more": false,
      "estimated_total": 6
    }
  }
}
```
