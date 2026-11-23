---
title: "List Transactions"
slug: "list-transactions"
updated: 2025-11-26T06:31:12Z
published: 2025-11-26T06:31:12Z
canonical: "docs.xendit.co/list-transactions"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.xendit.co/llms.txt
> Use this file to discover all available pages before exploring further.

# List Transactions

Get/transactions

Request this endpoint to get all transactions or select specific filter and search parameters. You can filter by date, type, or status. And you can search by reference, product id, or account identifier. The returned result will be paginated and ordered by the created date.

Use API key permission `Transaction Read` to perform this request

Sample curl Request:

```
curl https://api.xendit.co/transactions?types=PAYMENT&statuses=SUCCESS&channel_categories=EWALLET&channel_categories=RETAIL_OUTLET&limit=2 -X GET \
-u xnd_development_O46JfOtygef9kMNsK+ZPGT+ZZ9b3ooF4w3Dn+R1k+2fT/7GlCAN3jg==:
```

SecurityHTTPType basic

API Key authentication using HTTPS Basic Auth. Use your API key as the username. The password field can be left empty. Note: In the API documentation "Try it" section, password is required, you may include any value.

Header parametersfor-user-idstring

The sub-account user-id that you want to make this transaction for.

This header is only used if you have access to xenPlatform. See xenPlatform for more information

Query parameterstypesstring

The type of the transaction

Valid values[
  "ADJUSTMENT_ADD",
  "ADJUSTMENT_DEDUCT",
  "BNPL_PARTNER_SETTLEMENT_CREDIT",
  "BNPL_PARTNER_SETTLEMENT_DEBIT",
  "CASHBACK_FEE",
  "CASHBACK_VAT",
  "CHARGEBACK",
  "CONVERSION",
  "DISBURSEMENT",
  "FOREX_DEDUCTION",
  "FOREX_DEPOSIT",
  "IN_PERSON_PAYMENT",
  "LOAN_REPAYMENT",
  "OTHER",
  "PAYMENT",
  "REFUND",
  "REMITTANCE",
  "REMITTANCE_COLLECTION_PAYMENT",
  "REMITTANCE_PAYOUT",
  "RESERVES_HOLD",
  "RESERVES_RELEASE",
  "TOPUP",
  "TRANSFER_IN",
  "TRANSFER_OUT",
  "WITHDRAWAL"
]
statusesstring

The status of the transaction

Valid values[
  "PENDING",
  "SUCCESS",
  "FAILED",
  "VOIDED",
  "REVERSED"
]
channel_categoriesstring

The channel of the transactions that will be filtered. If not specified, all transaction channel will be returned.

Valid values[
  "BANK",
  "CARDS",
  "CARDLESS_CREDIT",
  "CASH",
  "DIRECT_DEBIT",
  "EWALLET",
  "PAYLATER",
  "QR_CODE",
  "RETAIL_OUTLET",
  "VIRTUAL_ACCOUNT",
  "XENPLATFORM",
  "OTHER"
]
reference_idstring

Reference that will be searched. Search by reference is case sensitive and requires exact match. Contact support to enable partial match functionality for your account.

Min length1Max length255
product_idstring

Product_id that will be searched. Product_id search is an exact match and case sensitive.

account_identifierstring | null

Account identifier that will be searched. Account identifier search is exact match case sensitive.

currencystring

Currency filter for transaction-related endpoints and reports. The following currencies are commonly supported:

- IDR, PHP, USD, VND, THB, MYR, SGD, EUR, GBP, HKD, AUD
However, any applicable ISO 4217 currency code may be used depending on your account and transaction type. This parameter is optional; if omitted, all currencies will be included.

Valid values[
  "IDR",
  "PHP",
  "USD",
  "VND",
  "THB",
  "MYR",
  "SGD",
  "EUR",
  "GBP",
  "HKD",
  "AUD"
]
amountnumber

Transaction amount to search. This will be exact match.

Example9989.0
created[gte]string

Start time of transaction by created date. If not specified, will list all dates.

created[lte]string

End time of transaction by created date. If not specified, will list all dates.

updated[gte]string

Start time of transaction by updated date. If not specified, will list all dates.

updated[lte]string

End time of transaction by updated date. If not specified, will list all dates.

limitnumber

A limit on the number of transactions to be returned for each request.

Default10.0
after_idstring

Id of the immediately previous item. Use this with `links` on the response for pagination.

before_idstring

ID of the immediately following item.

Responses200

Successful operation

<select class='api-response-data' aria-label='Media type'><option value='72ee8655-429c-4641-b48f-c40d772d8a87'>application/json</option>
</select>

```json
{
  "has_more": false,
  "data": [
    {
      "id": "txn_3365895e-3cc1-490a-b48c-2757ce8ab0e5",
      "product_id": "cmanl0vtp000101u9lqbvn7im",
      "type": "CONVERSION",
      "status": "SUCCESS",
      "channel_category": "OTHER",
      "channel_code": "DEFAULT",
      "reference_id": "cmanl0vtp000101u9lqbvn7im",
      "account_identifier": null,
      "currency": "SGD",
      "amount": 6.55,
      "net_amount": 6.55,
      "net_amount_currency": "SGD",
      "cashflow": "MONEY_IN",
      "settlement_status": "SETTLED",
      "estimated_settlement_time": "2025-05-14T06:51:08.999Z",
      "business_id": "675bdaf542c2f448122e71d5",
      "created": "2025-05-14T06:51:08.998Z",
      "updated": "2025-05-14T06:52:34.196Z",
      "fee": {
        "xendit_fee": 0,
        "value_added_tax": 0,
        "xendit_withholding_tax": 0,
        "third_party_withholding_tax": 0,
        "status": "NOT_APPLICABLE"
      }
    },
    {
      "id": "txn_c3d31125-1a06-4563-b7aa-b574beb7e2f9",
      "product_id": "cm99a3by9000x01qu51tf1t85",
      "type": "CONVERSION",
      "status": "FAILED",
      "channel_category": "OTHER",
      "channel_code": "DEFAULT",
      "reference_id": "cm99a3by9000x01qu51tf1t85",
      "account_identifier": null,
      "currency": "SGD",
      "amount": 6.8,
      "net_amount": 5.1,
      "net_amount_currency": "USD",
      "cashflow": "MONEY_IN",
      "settlement_status": "PENDING",
      "estimated_settlement_time": "2025-04-09T01:56:38.519Z",
      "business_id": "675bdaf542c2f448122e71d5",
      "created": "2025-04-09T01:56:38.517Z",
      "updated": "2025-04-09T01:58:05.027Z",
      "fee": {
        "xendit_fee": 0,
        "value_added_tax": 0,
        "xendit_withholding_tax": 0,
        "third_party_withholding_tax": 0,
        "status": "NOT_APPLICABLE"
      }
    },
    {
      "id": "txn_8c36b107-a52e-478a-8dde-59bfa7212bc6",
      "product_id": "d2845324-50d1-41bc-8583-0b888456ebfe",
      "type": "PAYMENT",
      "status": "SUCCESS",
      "channel_category": "EWALLET",
      "channel_code": "MY_SHOPEEPAY",
      "reference_id": "mylitt-aa7650f9b1364433-a7e7c4809b379e4e-1742983783200",
      "account_identifier": null,
      "currency": "MYR",
      "amount": 2.22,
      "net_amount": 2.2,
      "net_amount_currency": "MYR",
      "cashflow": "MONEY_IN",
      "settlement_status": "SETTLED",
      "estimated_settlement_time": "2025-03-28T10:09:54.915Z",
      "business_id": "668643d45f3fffd3c0d3b1ef",
      "created": "2025-03-26T10:09:55.171Z",
      "updated": "2025-03-28T10:10:53.276Z",
      "fee": {
        "xendit_fee": 0.02,
        "value_added_tax": 0,
        "xendit_withholding_tax": 0,
        "third_party_withholding_tax": 0,
        "status": "NOT_APPLICABLE"
      }
    },
    {
      "id": "txn_pay_1234567890abcdef",
      "product_id": "py-123e4567-e89b-12d3-a456-426614174000",
      "type": "PAYMENT",
      "status": "SUCCESS",
      "channel_category": "EWALLET",
      "channel_code": "ID_SHOPEEPAY",
      "reference_id": "payref-123456",
      "account_identifier": null,
      "currency": "IDR",
      "amount": 100000,
      "net_amount": 99000,
      "net_amount_currency": "IDR",
      "cashflow": "MONEY_IN",
      "settlement_status": "SETTLED",
      "estimated_settlement_time": "2025-06-01T10:00:00Z",
      "business_id": "1234567890abcdef",
      "created": "2025-06-01T09:59:00Z",
      "updated": "2025-06-01T10:01:00Z",
      "fee": {
        "xendit_fee": 1000,
        "value_added_tax": 0,
        "xendit_withholding_tax": 0,
        "third_party_withholding_tax": 0,
        "status": "COMPLETED"
      },
      "product_data": {
        "capture_id": "cap-123e4567-e89b-12d3-a456-426614174002",
        "payment_request_id": "pr-123e4567-e89b-12d3-a456-426614174003"
      }
    }
  ],
  "links": []
}
```

Expand Allobject  has_moreboolean    

Indicates whether there are more items to be queried with after_id of the last item from the current result. When true, use the HATEOAS links for pagination.

data Array of object (TransactionObject)   object  idstring    

Unique ID generated by Xendit for the particular file

product_idstring    

The product_id of transaction. Product id will have different prefix for each different product. You can use this id to match the transaction from this API to each product API.

typestring    

The type of the transactions. Here are the descriptions:

- `ADJUSTMENT_ADD`: An adjustment transaction that adds to the balance.
- `ADJUSTMENT_DEDUCT`: An adjustment transaction that deducts from the balance.
- `BNPL_PARTNER_SETTLEMENT_CREDIT`: Buy Now Pay Later partner settlement credit transaction.
- `BNPL_PARTNER_SETTLEMENT_DEBIT`: Buy Now Pay Later partner settlement debit transaction.
- `CASHBACK_FEE`: Cashback fee transaction.
- `CASHBACK_VAT`: Cashback VAT transaction.
- `CHARGEBACK`: A chargeback transaction for disputed charges.
- `CONVERSION`: Balance conversion transactions between different currencies.
- `DISBURSEMENT`: The disbursement of money-out transaction.
- `FOREX_DEDUCTION`: Foreign exchange deduction transaction.
- `FOREX_DEPOSIT`: Foreign exchange deposit transaction.
- `IN_PERSON_PAYMENT`: In-person payment transaction.
- `LOAN_REPAYMENT`: Loan repayment transaction.
- `OTHER`: Other transaction types not covered by specific categories.
- `PAYMENT`: The payment that includes all variation of money-in transaction.
- `REFUND`: A refund transaction created to refund amount from money-in transaction.
- `REMITTANCE`: A remittance transaction.
- `REMITTANCE_COLLECTION_PAYMENT`: Remittance collection payment transaction.
- `REMITTANCE_PAYOUT`: The remittance pay-out transaction.
- `RESERVES_HOLD`: Transaction for holding reserves.
- `RESERVES_RELEASE`: Transaction for releasing held reserves.
- `TOPUP`: A top-up transaction for adding money to account balance.
- `TRANSFER_IN`: Transfer into the account from another Xendit account.
- `TRANSFER_OUT`: Transfer out of the account to another Xendit account.
- `WITHDRAWAL`: A withdrawal transaction for money-out operations.

Valid values[
  "ADJUSTMENT_ADD",
  "ADJUSTMENT_DEDUCT",
  "BNPL_PARTNER_SETTLEMENT_CREDIT",
  "BNPL_PARTNER_SETTLEMENT_DEBIT",
  "CASHBACK_FEE",
  "CASHBACK_VAT",
  "CHARGEBACK",
  "CONVERSION",
  "DISBURSEMENT",
  "FOREX_DEDUCTION",
  "FOREX_DEPOSIT",
  "IN_PERSON_PAYMENT",
  "LOAN_REPAYMENT",
  "OTHER",
  "PAYMENT",
  "REFUND",
  "REMITTANCE",
  "REMITTANCE_COLLECTION_PAYMENT",
  "REMITTANCE_PAYOUT",
  "RESERVES_HOLD",
  "RESERVES_RELEASE",
  "TOPUP",
  "TRANSFER_IN",
  "TRANSFER_OUT",
  "WITHDRAWAL"
]
channel_codestring    

The channel of the transaction that is used. See [channel codes](https://xendit-docs.document360.io/docs/available-payment-channels) for the list of available per channel categories.

reference_idstring    

A Reference ID from merchants to identify their request.

Min length1Max length255
account_identifierstring   | null  

Account identifier of transaction. The format will be different from each channel. For example, on `BANK` channel it will be account number and on `CARD` it will be masked card number.

currencystring    

The currency to filter.

Valid values[
  "IDR",
  "PHP",
  "USD",
  "VND",
  "THB",
  "MYR",
  "SGD",
  "EUR",
  "GBP",
  "HKD",
  "AUD"
]Default"IDR"
amountnumber    

The amount of transaction. The number of decimal place will be different for each currency according to ISO 4217.

Example9989.0
net_amountnumber    

The net amount of transaction after it deducted with fee/vat.

Example9989.0
net_amount_currencystring    

The currency of the net amount after fees and taxes are applied.

Valid values[
  "IDR",
  "PHP",
  "USD",
  "VND",
  "THB",
  "MYR",
  "SGD",
  "EUR",
  "GBP",
  "HKD",
  "AUD"
]
cashflowstring    

Representing whether the transaction is money in or money out For transfer, the transfer out side it will shows up as money out and on transfer in side in will shows up as money-in.

Available values are `MONEY_IN` for money in and `MONEY_OUT` for money out.

statusstring    

The status of the transaction. Here's the description:

- `PENDING`: The transaction is still pending to be processed. This refers to money out-transaction when the amount is still on hold.
- `SUCCESS`: The transaction is successfully sent for money-out or already arrives on money-in.
- `FAILED`: The transaction failed to send/receive.
- `VOIDED`: The money-in transaction is voided by customer.
- `REVERSED`:The transaction is reversed by Xendit.

Valid values[
  "PENDING",
  "SUCCESS",
  "FAILED",
  "VOIDED",
  "REVERSED"
]
channel_categorystring    

The channel category of the transaction to identify the source of the transaction. Here's the description:

- `DISBURSEMENT` and `REMITTANCE_PAYOUT`:  `BANK` and `CASH`
- `PAYMENT`: `CARDS`, `CARDLESS_CREDIT`, `DIRECT_DEBIT`, `EWALLET`, `PAYLATER`, `QR_CODE`, `RETAIL_OUTLET`, `VIRTUAL_ACCOUNT`
- `TRANSFER`: `XENPLATFORM`
- `CONVERSION`: `OTHER`

Valid values[
  "BANK",
  "CARDS",
  "CARDLESS_CREDIT",
  "CASH",
  "DIRECT_DEBIT",
  "EWALLET",
  "PAYLATER",
  "QR_CODE",
  "RETAIL_OUTLET",
  "VIRTUAL_ACCOUNT",
  "XENPLATFORM",
  "OTHER"
]
business_idstring    

Unique ID generated by Xendit for the particular file

createdstring    

Transaction created timestamp on UTC+0

updatedstring    

Transaction updated timestamp on UTC+0

feeobject (FeeObject)  xendit_feenumber    

Amount of the Xendit fee for this transaction.

value_added_taxnumber    

Amount of the VAT for this transaction.

xendit_withholding_taxnumber    

Amount of the Xendit Withholding Tax for this transaction if applicable. See Tax Documentation for more information.

third_party_withholding_taxnumber    

Amount of the 3rd Party Withholding Tax for this transaction if applicable.

statusstring    

Status of the fee processing. NOT_APPLICABLE means no fees are applicable for this transaction.

Valid values[
  "PENDING",
  "COMPLETED",
  "CANCELED",
  "REVERSED",
  "NOT_APPLICABLE"
]

settlement_statusstring   | null  

Status of the settlement.

- `null`: Settlement status is not applicable or not yet determined
- `PENDING`: Transaction amount has not been settled to merchant's balance
- `EARLY_SETTLED`: Transaction has been settled early to merchant's balance
- `SETTLED`: Transaction has been settled to merchant's balance

Valid values[
  "PENDING",
  "EARLY_SETTLED",
  "SETTLED"
]
estimated_settlement_timestring    

Estimated settlement time will only apply to money-in transactions. For money-out transaction, value will be `NULL` Estimated settlement time in which transaction amount will be settled to merchant's balance.

product_dataobject (ProductData) | null  

Additional metadata for payment V3 transactions. This object contains product-specific identifiers and is only included when at least one field has a value. All fields are nullable and conditionally populated based on the transaction type and payment flow.

capture_idstring   | null  

The capture ID for payment V3 transactions. Present for captured payments.

Examplecptr-123e4567-e89b-12d3-a456-426614174000
payment_request_idstring   | null  

The payment request ID for payment V3 transactions. Present for payments created via payment V3 payment requests.

Examplepr-123e4567-e89b-12d3-a456-426614174001
reusable_payment_link_idstring   | null  

The reusable payment link ID. Present for payments made through reusable payment links.

Examplerpl-123e4567-e89b-12d3-a456-426614174002
payment_link_idstring   | null  

The invoice/payment link ID. Present for payments associated with payment links.

Exampleinv-123e4567-e89b-12d3-a456-426614174003

links Array of object   

HATEOAS links for pagination. Contains navigation links when more results are available.

object  hrefstring    

URI for the next page of results.

relstring    

Link relationship type. Value will be 'next' for pagination.

methodstring    

HTTP method to use. Value will be 'GET'.

400

Inputs are failing validation. The errors field contains details about which fields are violating validation.

<select class='api-response-data' aria-label='Media type'><option value='de1fe557-ca1c-4c7c-b47e-dd2c696632b2'>application/json</option>
</select>object  error_codestring    Valid values[
  "API_VALIDATION_ERROR",
  "FEATURE_NOT_AVAILABLE"
]
messagestring    
errors Array  OneOfstringstring
objectobject
