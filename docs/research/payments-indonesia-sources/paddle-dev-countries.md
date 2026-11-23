> For the complete documentation index, see [llms.txt](https://developer.paddle.com/llms.txt).
>
> To search these docs, send a `GET` request to `https://paddle-docs-retrieval.kapa-paddle.workers.dev/?q=<question>` with a URL-encoded question. No authentication needed. It returns a JSON array of `{content, source_url}`, most relevant first.

# Supported countries

Go global and sell in over 200 countries and territories, fully tax compliant, with no extra engineering effort.

---

With Paddle, you can unlock new revenue by selling in over 200 countries and territories across the world — no additional setup needed.

Paddle automatically calculates taxes and handles sales tax liability for all countries and currencies.

{% card-group cols=3 %}
{% card title="Sell in over 200 markets" %}

Expand into popular and emerging markets, while minimizing your risk.

{% /card %}
{% card title="Global tax compliance" %}

As a merchant of record, Paddle calculates, collects, and remits taxes for you.

{% /card %}
{% card title="No extra engineering effort" %}

All supported countries are ready-to-use as part of the Paddle API and Paddle.js.

{% /card %}
{% /card-group %}

## How it works

### Localize prices

One size doesn't fit all when it comes to currencies. Paddle lets you [set country-specific prices](https://developer.paddle.com/build/products/offer-localized-pricing.md), rather than pricing for currencies that might apply across markets.

You can also automatically convert prices into local currencies at checkout, making customers more likely to purchase.

### Optimized checkout

To keep checkout as short as possible, [Paddle Checkout](https://developer.paddle.com/concepts/sell/self-serve-checkout.md) doesn't require a full address, only asking customers for their country and (in some countries) their ZIP/postal code or region.

Region information and ZIP/postal codes are only required in some countries for tax calculation, fraud prevention, and banking compliance purposes. Checkout only asks for this in countries where required.

### Unsupported countries are blocked

Payments from some countries are blocked in compliance with international sanctions regulations, payments platforms policies, and anti-money laundering regulations.

Paddle automatically blocks transactions from unsupported countries. You don't need to do anything.

Supported countries work with no additional setup required.

## List of supported countries

You can also get this list programmatically. {% method-badge method="GET" /%} [`/countries`](https://developer.paddle.com/api-reference/countries/list-countries.md) returns every country that Paddle knows about, including the currency used for automatic price conversion and whether Paddle supports sales there.

### Supported countries

| ISO | Country | Currency | Tax preference | Postal code? |
| --- | --- | --- | --- | --- |
| AD | Andorra | EUR | Inclusive |  |
| AE | United Arab Emirates | USD | Inclusive |  |
| AG | Antigua and Barbuda | USD | Exclusive |  |
| AI | Anguilla | USD | Exclusive |  |
| AL | Albania | EUR | Inclusive |  |
| AM | Armenia | USD | Inclusive |  |
| AO | Angola | USD | Exclusive |  |
| AR | Argentina | ARS | Inclusive |  |
| AS | American Samoa | USD | Exclusive |  |
| AT | Austria | EUR | Inclusive |  |
| AU | Australia | AUD | Inclusive | Yes |
| AW | Aruba | USD | Inclusive |  |
| AX | Åland Islands | EUR | Exclusive |  |
| AZ | Azerbaijan | USD | Inclusive |  |
| BA | Bosnia and Herzegovina | EUR | Inclusive |  |
| BB | Barbados | USD | Inclusive |  |
| BD | Bangladesh | USD | Inclusive |  |
| BE | Belgium | EUR | Inclusive |  |
| BF | Burkina Faso | USD | Exclusive |  |
| BG | Bulgaria | EUR | Inclusive |  |
| BH | Bahrain | USD | Inclusive |  |
| BI | Burundi | USD | Exclusive |  |
| BJ | Benin | USD | Exclusive |  |
| BL | Saint Barthélemy | EUR | Inclusive |  |
| BM | Bermuda | USD | Inclusive |  |
| BN | Brunei | USD | Exclusive |  |
| BO | Bolivia | USD | Exclusive |  |
| BQ | Bonaire, Sint Eustatius and Saba | USD | Inclusive |  |
| BR | Brazil | BRL | Inclusive |  |
| BS | Bahamas | USD | Exclusive |  |
| BT | Bhutan | USD | Exclusive |  |
| BV | Bouvet Island | NOK | Exclusive |  |
| BW | Botswana | USD | Exclusive |  |
| BZ | Belize | USD | Exclusive |  |
| CA | Canada | CAD | Exclusive | Yes |
| CC | Cocos Islands | AUD | Inclusive |  |
| CG | Republic of Congo | USD | Exclusive |  |
| CH | Switzerland | CHF | Inclusive |  |
| CI | Côte d'Ivoire (Ivory Coast) | USD | Inclusive |  |
| CK | Cook Islands | NZD | Exclusive |  |
| CL | Chile | CLP | Inclusive |  |
| CM | Cameroon | USD | Inclusive |  |
| CN | China | CNY | Inclusive |  |
| CO | Colombia | COP | Inclusive |  |
| CR | Costa Rica | USD | Inclusive |  |
| CV | Cape Verde | USD | Exclusive |  |
| CW | Curaçao | USD | Inclusive |  |
| CX | Christmas Island | AUD | Inclusive |  |
| CY | Cyprus | EUR | Inclusive |  |
| CZ | Czechia (Czech Republic) | CZK | Inclusive |  |
| DE | Germany | EUR | Inclusive | Yes |
| DJ | Djibouti | USD | Exclusive |  |
| DK | Denmark | DKK | Inclusive |  |
| DM | Dominica | USD | Exclusive |  |
| DO | Dominican Republic | USD | Exclusive |  |
| DZ | Algeria | USD | Exclusive |  |
| EC | Ecuador | USD | Inclusive |  |
| EE | Estonia | EUR | Inclusive |  |
| EG | Egypt | USD | Inclusive |  |
| EH | Western Sahara | USD | Exclusive |  |
| ER | Eritrea | USD | Exclusive |  |
| ES | Spain | EUR | Inclusive | Yes |
| ET | Ethiopia | USD | Exclusive |  |
| FI | Finland | EUR | Inclusive |  |
| FJ | Fiji | USD | Exclusive |  |
| FK | Falkland Islands | GBP | Exclusive |  |
| FM | Micronesia | USD | Exclusive |  |
| FO | Faroe Islands | DKK | Inclusive |  |
| FR | France | EUR | Inclusive | Yes |
| GA | Gabon | USD | Exclusive |  |
| GB | United Kingdom | GBP | Inclusive | Yes |
| GD | Grenada | USD | Exclusive |  |
| GE | Georgia | USD | Inclusive |  |
| GF | French Guiana | EUR | Inclusive |  |
| GG | Guernsey | GBP | Exclusive |  |
| GH | Ghana | USD | Inclusive |  |
| GI | Gibraltar | GBP | Inclusive |  |
| GL | Greenland | EUR | Exclusive |  |
| GM | Gambia | USD | Exclusive |  |
| GN | Guinea | USD | Exclusive |  |
| GP | Guadeloupe | EUR | Inclusive |  |
| GQ | Equatorial Guinea | USD | Exclusive |  |
| GR | Greece | EUR | Inclusive |  |
| GS | South Georgia and the South Sandwich Islands | GBP | Exclusive |  |
| GT | Guatemala | USD | Exclusive |  |
| GU | Guam | USD | Exclusive |  |
| GW | Guinea-Bissau | USD | Exclusive |  |
| GY | Guyana | USD | Exclusive |  |
| HK | Hong Kong | HKD | Exclusive |  |
| HM | Heard Island and McDonald Islands | AUD | Inclusive |  |
| HN | Honduras | USD | Exclusive |  |
| HR | Croatia | EUR | Inclusive |  |
| HU | Hungary | HUF | Inclusive |  |
| ID | Indonesia | USD | Exclusive |  |
| IE | Ireland | EUR | Inclusive |  |
| IL | Israel | ILS | Inclusive |  |
| IM | Isle of Man | GBP | Inclusive |  |
| IN | India | INR | Inclusive | Yes |
| IO | British Indian Ocean Territory | GBP | Exclusive |  |
| IQ | Iraq | USD | Exclusive |  |
| IS | Iceland | EUR | Inclusive |  |
| IT | Italy | EUR | Inclusive | Yes |
| JE | Jersey | GBP | Exclusive |  |
| JM | Jamaica | USD | Exclusive |  |
| JO | Jordan | USD | Exclusive |  |
| JP | Japan | JPY | Inclusive |  |
| KE | Kenya | USD | Inclusive |  |
| KG | Kyrgyzstan | USD | Exclusive |  |
| KH | Cambodia | USD | Exclusive |  |
| KI | Kiribati | AUD | Exclusive |  |
| KM | Comoros | USD | Exclusive |  |
| KN | Saint Kitts and Nevis | USD | Exclusive |  |
| KR | South Korea | KRW | Inclusive |  |
| KW | Kuwait | USD | Exclusive |  |
| KY | Cayman Islands | USD | Exclusive |  |
| KZ | Kazakhstan | USD | Inclusive |  |
| LA | Lao People's Democratic Republic (Laos) | USD | Exclusive |  |
| LB | Lebanon | USD | Exclusive |  |
| LC | Saint Lucia | USD | Exclusive |  |
| LI | Liechtenstein | CHF | Inclusive |  |
| LK | Sri Lanka | USD | Inclusive |  |
| LR | Liberia | USD | Exclusive |  |
| LS | Lesotho | USD | Exclusive |  |
| LT | Lithuania | EUR | Inclusive |  |
| LU | Luxembourg | EUR | Inclusive |  |
| LV | Latvia | EUR | Inclusive |  |
| MA | Morocco | USD | Inclusive |  |
| MC | Monaco | EUR | Inclusive |  |
| MD | Moldova | EUR | Inclusive |  |
| ME | Montenegro | EUR | Inclusive |  |
| MF | Saint Martin | EUR | Inclusive |  |
| MG | Madagascar | USD | Exclusive |  |
| MH | Marshall Islands | USD | Exclusive |  |
| MK | North Macedonia | EUR | Inclusive |  |
| MN | Mongolia | USD | Exclusive |  |
| MO | Macao | HKD | Exclusive |  |
| MP | Northern Mariana Islands | USD | Exclusive |  |
| MQ | Martinique | EUR | Inclusive |  |
| MR | Mauritania | USD | Exclusive |  |
| MS | Montserrat | USD | Exclusive |  |
| MT | Malta | EUR | Inclusive |  |
| MU | Mauritius | USD | Inclusive |  |
| MV | Maldives | USD | Exclusive |  |
| MW | Malawi | USD | Exclusive |  |
| MX | Mexico | MXN | Inclusive |  |
| MY | Malaysia | USD | Inclusive |  |
| MZ | Mozambique | USD | Exclusive |  |
| NA | Namibia | USD | Exclusive |  |
| NC | New Caledonia | USD | Exclusive |  |
| NE | Niger | USD | Exclusive |  |
| NF | Norfolk Island | AUD | Inclusive |  |
| NG | Nigeria | USD | Inclusive |  |
| NL | Netherlands | EUR | Inclusive | Yes |
| NO | Norway | NOK | Inclusive |  |
| NP | Nepal | USD | Inclusive |  |
| NR | Nauru | AUD | Exclusive |  |
| NU | Niue | NZD | Exclusive |  |
| NZ | New Zealand | NZD | Inclusive |  |
| OM | Oman | USD | Inclusive |  |
| PA | Panama | USD | Exclusive |  |
| PE | Peru | PEN | Inclusive |  |
| PF | French Polynesia | EUR | Exclusive |  |
| PG | Papua New Guinea | USD | Exclusive |  |
| PH | Philippines | USD | Inclusive |  |
| PK | Pakistan | USD | Exclusive |  |
| PL | Poland | PLN | Inclusive |  |
| PM | Saint Pierre and Miquelon | EUR | Inclusive |  |
| PN | Pitcairn | NZD | Exclusive |  |
| PR | Puerto Rico | USD | Inclusive |  |
| PS | Palestinian territories | ILS | Exclusive |  |
| PT | Portugal | EUR | Inclusive |  |
| PW | Palau | USD | Exclusive |  |
| PY | Paraguay | USD | Exclusive |  |
| QA | Qatar | USD | Exclusive |  |
| RE | Reunion | EUR | Inclusive |  |
| RO | Romania | EUR | Inclusive |  |
| RS | Republic of Serbia | EUR | Inclusive |  |
| RW | Rwanda | USD | Exclusive |  |
| SA | Saudi Arabia | USD | Inclusive |  |
| SB | Solomon Islands | USD | Exclusive |  |
| SC | Seychelles | USD | Exclusive |  |
| SE | Sweden | SEK | Inclusive |  |
| SG | Singapore | SGD | Inclusive |  |
| SH | Saint Helena | GBP | Exclusive |  |
| SI | Slovenia | EUR | Inclusive |  |
| SJ | Svalbard and Jan Mayen | NOK | Exclusive |  |
| SK | Slovakia | EUR | Inclusive |  |
| SL | Sierra Leone | USD | Exclusive |  |
| SM | San Marino | EUR | Inclusive |  |
| SN | Senegal | USD | Inclusive |  |
| SR | Suriname | USD | Exclusive |  |
| ST | São Tomé and Príncipe | USD | Exclusive |  |
| SV | El Salvador | USD | Exclusive |  |
| SX | Sint Maarten | EUR | Exclusive |  |
| SZ | Eswatini (Swaziland) | USD | Exclusive |  |
| TC | Turks and Caicos Islands | USD | Exclusive |  |
| TD | Chad | USD | Exclusive |  |
| TF | French Southern and Antarctic Lands | EUR | Inclusive |  |
| TG | Togo | USD | Exclusive |  |
| TH | Thailand | THB | Exclusive |  |
| TJ | Tajikistan | USD | Inclusive |  |
| TK | Tokelau | NZD | Exclusive |  |
| TL | Timor-Leste | USD | Exclusive |  |
| TM | Turkmenistan | USD | Exclusive |  |
| TN | Tunisia | USD | Exclusive |  |
| TO | Tonga | USD | Exclusive |  |
| TR | Türkiye (Turkey) | TRY | Inclusive |  |
| TT | Trinidad and Tobago | USD | Exclusive |  |
| TV | Tuvalu | AUD | Exclusive |  |
| TW | Taiwan | TWD | Inclusive |  |
| TZ | Tanzania | USD | Inclusive |  |
| UA | Ukraine | UAH | Inclusive |  |
| UG | Uganda | USD | Inclusive |  |
| UM | United States Minor Outlying Islands | USD | Exclusive |  |
| US | United States | USD | Exclusive | Yes |
| UY | Uruguay | USD | Inclusive |  |
| UZ | Uzbekistan | USD | Inclusive |  |
| VA | Holy See (Vatican City) | EUR | Inclusive |  |
| VC | Saint Vincent and the Grenadines | USD | Exclusive |  |
| VG | British Virgin Islands | USD | Inclusive |  |
| VI | U.S. Virgin Islands | USD | Exclusive |  |
| VN | Vietnam | VND | Exclusive |  |
| VU | Vanuatu | USD | Exclusive |  |
| WF | Wallis and Futuna | USD | Inclusive |  |
| WS | Samoa | USD | Exclusive |  |
| XK | Kosovo | EUR | Exclusive |  |
| YT | Mayotte | EUR | Inclusive |  |
| ZA | South Africa | ZAR | Inclusive |  |
| ZM | Zambia | USD | Exclusive |  |

### Unsupported countries

| ISO | Country |
| --- | --- |
| AF | Afghanistan |
| AN | Netherlands Antilles |
| AQ | Antarctica |
| BY | Belarus |
| CD | Democratic Republic of Congo |
| CF | Central African Republic |
| CS | Serbia and Montenegro |
| CU | Cuba |
| HT | Haiti |
| IR | Iran |
| KP | North Korea |
| LY | Libyan Arab Jamahiriya |
| ML | Mali |
| MM | Myanmar |
| NI | Nicaragua |
| RU | Russia |
| SD | Sudan |
| SO | Somalia |
| SS | South Sudan |
| SY | Syrian Arab Republic |
| VE | Venezuela |
| YE | Yemen |
| ZW | Zimbabwe |