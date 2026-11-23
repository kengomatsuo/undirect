---
title: "Transactions report"
slug: "transactions-report"
updated: 2026-10-22T00:42:06Z
published: 2026-10-22T00:42:06Z
canonical: "docs.xendit.co/transactions-report"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.xendit.co/llms.txt
> Use this file to discover all available pages before exploring further.

# Transactions report

The Transactions report provides detailed insights into all transaction activities within Xendit, facilitating effective monitoring and management of financial operations.

- **Monitor and Retrieve Data**: Track detailed information on the status of transactions, whether they are successful, failed, or refunded.
- **Comprehensive Reporting**: Each transaction is displayed with all key information such as fees and taxes on a single line, simplifying reconciliation and reporting.

## Download Transactions Reports

- **On-Demand export**: Download the Transactions Report directly from your dashboard [Transactions](https://dashboard.xendit.co/transactions) page on the **Transaction tab**.
- **Scheduled Delivery**: [Schedule automated report](/v1/docs/scheduling-reports) deliveries to your email or SFTP servers, ensuring you receive up-to-date information without manual effort.
- **Via API**: Automate report generation and export via the [report endpoint](https://developers.xendit.co/api-reference/#report-object).

The **Transactions** Report feature enhances transaction reporting with improved search capabilities and additional data fields.

> [!NOTE]
> Update notice
> 
> Starting July 9th 2026, all existing reports (Transaction and Detailed Transaction reports) will be replaced with the new format below.

### Default Columns

| Field | Description |
| --- | --- |
| **Status** | The status of the transaction. Available values: - **FAILED**: The transaction has failed. - **PENDING**: The transaction is still pending processing. This refers to money-out transactions when the amount is still on hold. - **SUCCESSFUL**: The transaction was successfully completed. - **VOIDED**: The transaction was voided by the merchant. |
| **Type** | The type of the transaction. Available types: - **BATCH_DISBURSEMENT**: disbursement transaction that involves sending multiple payments to different recipients at once. - **CHARGEBACK**: A chargeback transaction for disputed charges. - **CHARGEBACK_REVERSAL:** A reversal transaction for disputed charges. - **DISBURSEMENT**: The disbursement of a money-out transaction. - **IN_PERSON_PAYMENT**: Transactions that occur through direct interactions between the customer using a payment terminal (EDC). - **PAYMENT**: The payment that includes all variations of money-in transactions. - **PLATFORM_FEE**: Fees deducted from transactions for the use of XenPlatform services. - **REFUND**: A refund transaction created to refund an amount from a money-in transaction. - **REVERSAL**: A cancellation of a payment before the funds have fully settled - **REMITTANCE_PAYOUT**: The remittance payout transaction. - **TRANSFER**: The transfer transaction between Xendit accounts. This can be a transfer in or out. - **WITHDRAWAL**: Transactions from your Xendit account to your own bank account. - **OTHER**: This category is used for transactions that do not neatly fit into the other specified types, covering a variety of transactional scenarios that are less common. |
| **Channel Category** | The channel category of the transaction. Available categories: - **DISBURSEMENT and REMITTANCE_PAYOUT**: BANK and CASH - **PAYMENT**: CARDS, CARDLESS_CREDIT, DIRECT_DEBIT, EWALLET, PAYLATER, QR_CODE, RETAIL_OUTLET, VIRTUAL_ACCOUNT - **TRANSFER**: XENPLATFORM |
| **Channel** | The channel used to identify the source of the transaction. |
| **Account Number** | Account number field is only valid for the following products: - **Receiver's Bank Account Number**: Disbursement, Batch Disbursement, Remittance Payout, Remittance, Remittance Collection - **Sender's Bank Account Number**: Virtual Account Payment, Direct Bank Transfer - **Sender's E-Wallet Account Number**: eWallet Payment (only for tokenization) - **Receiver’s Xendit Business ID**: xenPlatform Transfer-out - **Sender’s Xendit Business ID**: xenPlatform Transfer-in |
| **Currency** | The currency of the transaction. |
| **Amount** | The nominal amount for the transaction. The number of decimal places varies for each currency according to ISO 4217 standards. |
| **Converted Currency** | The currency code for the currency conversion, if applicable |
| **Converted Amount** | The transaction amount after currency conversion, if applicable |
| **Settlement Currency** | The currency of the settlement amount. |
| **Transaction Fee Amount** | The amount of the channel fee for this transaction. |
| **Transaction VAT Amount** | The amount of Value Added Tax (VAT) for this transaction. |
| **Withholding Tax Amount** | The Xendit withholding tax amount that is applied for this transaction, in Settlement Currency. |
| **Net Amount Currency** | The currency of the net amount. |
| **Net Amount** | The net amount of the transaction after channel fees and VAT are deducted. |
| **Debit/Credit** | Either DEBIT or CREDIT, depending on this transaction’s impact on your balance. |
| **Reference** | The reference of the transaction. In some products, this is the same as `external_id`. This is the ID that you generate and can be used for reconciliation. |
| **Transaction ID** | The unique transaction ID in Xendit systems |
| **Product ID** | Xendit generated ID sent to you via API callback/response depending on the product: - **Credit Card**: id - **Virtual Account**: id - **eWallet**: data.id (remove ewc_ from callback value if present) - **QR Code**: data.id (remove qrpy_ from callback value if present) - **Direct Debit**: id - **Retail Outlets (OTC)**: payment_id - **PayLater**: data.id (remove plc_ from callback value if present) - **Disbursements**: data.id |
| **Payment Session ID** | The Payment Session ID, if applicable. |
| **Payment Link ID** | The Payment Link ID, if applicable. |
| **Created** | The timestamp when the transaction is created. Timestamps are in ISO 8601 format. |
| **Payment Date** | The timestamp when the end-user completed the payment. Timestamps are in ISO 8601 format. |
| **Timezone** | The timezone used in the timestamps. It will always be +0000 UTC when the report is generated via API. When exported from the dashboard, the report will use the user's configured timezone. Timestamps are in ISO 8601 format. |
| **Description** | The description of the transaction. |
| **Settlement Status** | Settlement status of a transaction: - **PENDING**: Transaction amount has not been settled to the merchant's balance. - **SETTLED**: Transaction has been settled to the merchant's balance. - **Empty**: (Failed Disbursements & Chargeback Deduction) |
| **Settlement Date** | The actual date and time when the settlement was completed. |
| **Estimated Settlement Date** | The estimated date and time for when the settlement is expected to be completed before the settlement occurs. |
| **Failure Reason** | The reason for failure, if applicable. |

### Additional Columns

When exporting a report, you can include additional columns for more information:

| Field | Description |
| --- | --- |
| **VA Number** | The Virtual Account Number, if applicable. |
| **VA Name** | The name associated with the Virtual Account, if applicable. |
| **Payment Code** | The payment code for over-the-counter (OTC) payments, if applicable. |
| **Payment Code Name** | The payment code name for over-the-counter (OTC) payments, if applicable. |
| **Payer Phone Number** | The payer's phone number for eWallet payments, if applicable. |
| **Partner Receipt ID** | The partner receipt ID for Direct Debit, eWallet, OTC, or QR Code transactions, if applicable. |
| **Connector Reference** | The connector reference for eWallet transactions, if applicable. |
| **User Receipt ID** | The user receipt ID for QR Code transactions, if applicable. |
| **QR ID** | The QR ID of the transaction, if applicable. |
| **QR Acquirer** | The QR acquirer of the transaction, if applicable. |
| **Channel Reference ID** | The channel reference ID for Direct Debit transactions, if applicable. |
| **Payment Metadata** | Additional metadata related to the payment. |
| **Payment ID** | The unique ID of the payment. |
| **Refund ID** | The reference ID of the payment refund. |
| **Capture ID** | The capture ID from payment transaction using v3 endpoints. |
| **Payment Request ID** | The payment request ID of the payment. |
| **Subscription Plan ID** | Xendit unique ID to identify a subscription plan. Returned on the create plan API response. This is only available for subscription payment. |
| **Subscription Cycle ID** | Xendit unique ID to identify a subscription cycle, which is one specific instance of subscription plan's action. Cycle object is generated from the subscription plan object where the subscription behavior is defined. This is only available for subscription payment. |
| **Parent Type** | The type of the parent-child transaction relationship |
| **Parent Transaction ID** | The `transaction_id` of the parent, applicable for Refunds and Reversals. |
| **Parent Payment ID** | The `payment_id` of the parent, applicable for Payment Refunds and Reversals. |
| **Account Identifier** | The account number for DISBURSEMENT, REMITTANCE_PAYOUT, and WITHDRAWAL transactions. |
| **Account Name** | The recipient's account holder name entered in the Disbursement or Payout request. |
| **Account Holder Name** | The account holder name for DISBURSEMENT, REMITTANCE_PAYOUT, and WITHDRAWAL transactions. |
| **Partner** | Indicates which partner processed the transaction. |
| **Payment Link Description** | The description defined in the payment link. |
| **Customer ID** | The unique identifier of the customer object, if referenced in the transaction. |
| **Customer Surname** | The surname of the customer from the customer object, if referenced in the transaction. |
| **Customer Given Names** | The given names of the customer from the customer object, if referenced in the transaction. |
| **Customer Email** | The email address of the customer from the customer object, if referenced in the transaction. |
| **Customer Reference ID** | The reference ID of the customer object, if referenced in the transaction. |
| **Customer Mobile Number** | The mobile number of the customer from the customer object, if referenced in the transaction. |
| **Payment Acceptance Model** | This field is only applicable for Virtual Account or Card transactions. |
| **Transaction Billing Label** | An additional identifier of a transaction for xendit fee computation purpose . Available values include:- Shopee: E-Wallet or QR |
| **Merchant PAN** | The merchant-specific digital token mapped to the customer's card |
| **Customer PAN** | The card number belonging to the consumer used to fund the transaction. |
| **Merchant Descriptor** | The business name displayed on the cardholder’s bank statement for this transaction. |
| **Bank Reconciliation** | Internal reconciliation data matching the transaction against corresponding bank statement records. |
| **RRN** | Retrieval Reference Number; a unique 12-character identifier assigned by the card network to track the transaction. |
| **Network Transaction** | The transaction identifier generated directly by the card scheme network (e.g., Visa, Mastercard). |
| **Approval Code** | The authorization code returned by the card issuing bank confirming the transaction was approved. |
| **CVN Result** | The verification result code for the Card Validation Number (CVV/CVC) checking if the security code matches. |
| **Token ID** | The unique token identifier utilized if the card data was tokenized for security or recurring billing. |
| **Charge Type** | Specifies the classification of the card charge model applied (e.g., Direct Charge, Capture, Pre-Auth). |
| **ECI Code** | Electronic Commerce Indicator; a security code indicating the authentication status of an online credit card transaction. |
| **3DS Version** | The specific version of 3D Secure authentication used for the transaction (e.g., 3DS 1.0 or 3DS 2.0). |
| **Card Fingerprint** | A unique, non-reversible hash generated from the card number to identify returning cards without storing raw data. |
| **Card Issuing Bank** | The name of the bank or financial institution that issued the consumer’s credit or debit card. |
| **Card Issuing Country** | The ISO country code representing the location where the consumer's card was issued. |
| **Card Exp Date** | The expiration date of the card used to complete the payment (Format: MM/YY). |
| **Card Type** | The classification of the card product used (e.g., CREDIT, DEBIT, PREPAID). |
| **Card Network** | The payment card network handling the routing of the transaction (e.g., VISA, MASTERCARD, AMEX). |
| **MCN** | Merchant Category Number or Merchant Checkout Node; specific network routing parameters used for card settlement. |
| **Batch Disbursement ID** | The ID of the batch disbursement. This is only available for disbursements created using the Batch Disbursement feature. |
| **Batch Disbursement Reference** | The reference of the batch disbursement. This is only available for disbursements created using the Batch Disbursement feature. |
| **Forex Rate** | The foreign exchange rate for the currency conversion that applies for this transaction. |
| **QR Source** | The QR payment source of funds, if applicable |
| **Sender name** | The sender name for remittance VA, if applicable |
| **Remittance ID** | The ID of Remittance. This is only applicable for remittance transactions. |
| **Remittance Collection VA ID** | The ID of Remittance Collection VA. This is only applicable for Remittance Collection transactions. |
| **Refund Status** | The status of the refund for this transaction: - FULL: This transaction has been fully refunded - PARTIAL: This transaction has been partially refunded - NONE: Not applicable |
| **Refunded Amount** | The total refunded amount for this transaction |
| **Successful Refund Count** | The count of successful refunds for this transaction |
| **Pending Refund Count** | The count of pending refunds for this transaction |
| **Reversal Status** | The status of the reversal for this transaction: - REVERSED: This transaction has been reversed - NONE: Not applicable |

## Legacy Reports

> [!WARNING]
> Deprecation notice
> 
> Starting July 9th 2026, the following report formats will be deprecated and replaced with the new format above.

### Available Columns (Report version 2)

The transaction report includes:

- **Payments, Incoming Transfers, Top-ups, Remittance payments**: Incoming transactions appear on the Transactions report once the money has been successfully paid to you, even if they have not yet settled.
- **Disbursements, Outgoing Transfers, Withdrawals, Remittance payouts**: Outgoing transactions are shown on the Transactions report once the transaction has been successfully created. When these transactions are successfully debited from your balance, they will also be displayed on the Balances page and report.

| Field name | Description |
| --- | --- |
| **Status** | The status of the transaction. Available statuses: - **PENDING**: The transaction is still pending to be processed. This refers to money-out transactions when the amount is still on hold. - **SUCCESS**: The transaction is successfully sent for money-out or has already arrived for money-in. - **FAILED**: The transaction failed to send or receive. - **VOIDED**: The money-in transaction is voided by the customer. - **REVERSED**: The transaction is reversed by Xendit. |
| **Type** | The type of the transaction. Available types: - **ADJUSTMENT_ADD**: An adjustment transaction that adds to the balance. - **ADJUSTMENT_DEDUCT**: An adjustment transaction that deducts from the balance. - **BNPL_PARTNER_SETTLEMENT_CREDIT**: Buy Now Pay Later partner settlement credit transaction. - **BNPL_PARTNER_SETTLEMENT_DEBIT**: Buy Now Pay Later partner settlement debit transaction. - **CASHBACK_FEE**: Cashback fee transaction. - **CASHBACK_VAT**: Cashback VAT transaction. - **CHARGEBACK**: A chargeback transaction for disputed charges. - **CHARGEBACK_REVERSAL:** A reversal transaction for disputed charges. - **CONVERSION**: Balance conversion transactions between different currencies. - **DISBURSEMENT**: The disbursement of money-out transaction. - **FOREX_DEDUCTION**: Foreign exchange deduction transaction. - **FOREX_DEPOSIT**: Foreign exchange deposit transaction. - **IN_PERSON_PAYMENT**: In-person payment transaction. - **LOAN_REPAYMENT**: Loan repayment transaction. - **OTHER**: Other transaction types not covered by specific categories. - **PAYMENT**: The payment that includes all variation of money-in transaction. - **REFUND**: A refund transaction created to refund amount from money-in transaction. - **REMITTANCE**: A remittance transaction. - **REMITTANCE_COLLECTION_PAYMENT**: Remittance collection payment transaction. - **REMITTANCE_PAYOUT**: The remittance pay-out transaction. - **RESERVES_HOLD**: Transaction for holding reserves. - **RESERVES_RELEASE**: Transaction for releasing held reserves. - **TOPUP**: A top-up transaction for adding money to account balance. - **TRANSFER_IN**: Transfer into the account from another Xendit account. - **TRANSFER_OUT**: Transfer out of the account to another Xendit account. - **WITHDRAWAL**: A withdrawal transaction for money-out operation |
| **Channel** | The channel category of the transaction to identify the source of the transaction. Available channels per type: - **DISBURSEMENT and REMITTANCE_PAYOUT**: BANK and CASH - **PAYMENT**: CARDS, CARDLESS_CREDIT, DIRECT_DEBIT, EWALLET, PAYLATER, QR_CODE, RETAIL_OUTLET, VIRTUAL_ACCOUNT - **TRANSFER**: XENPLATFORM |
| **Channel Name** | The channel used to identify the source of the transaction. |
| **Account Number** | Account number field is only valid for the following products: - **Receiver's Bank Account Number**: Disbursement, Batch Disbursement, Remittance Payout, Remittance, Remittance Collection - **Sender's Bank Account Number**: Virtual Account Payment, Direct Bank Transfer - **Sender's eWallet Account Number**: eWallet Payment (only for tokenization) |
| **Currency** | Transaction currency |
| **Amount** | Nominal amount for the transaction. |
| **Total Fee** | Amount of the Xendit fee for this transaction. |
| **Total VAT** | Amount of the Value Added Tax (VAT) for this transaction. |
| **Net Amount** | The net amount of the transaction after it is deducted by fees and VAT. |
| **Reference** | The reference of the transaction. On some products, the term reference is the same as external_id. This is the ID that you generate and can be used for reconciliation. |
| **Transaction ID** | Unique transaction identifier |
| **Invoice ID** | The invoice ID (if applicable) |
| **Batch ID** | The Batch ID for Batch Disbursements |
| **Product ID** | Xendit generated ID sent to you via API callback/response: - **Credit Card**: id - **Virtual Account**: id - **eWallet**: data.id (remove ewc_ from callback value if present) - **QR Code**: data.id (remove qrpy_ from callback value if present) - **Direct Debit**: id - **Retail Outlets (OTC)**: payment_id - **PayLater**: data.id (remove plc_ from callback value if present) - **Disbursements**: data.id For merchants using Payment API v3 endpoints, report **Product ID** corresponds to **API callback/response payment_id** |
| **Payment Date** | The date the end-user made the payment |
| **Timestamp - Created** | The timestamp when the transaction is created. |
| **Timestamp - Updated** | The timestamp when the transaction is updated. |
| **Estimated Settlement Time** | Estimated settlement time for a particular transaction before settlement is completed. |
| **Actual Settlement Time** | Estimated settlement time for a particular transaction before settlement is completed. |
| **Timezone** | The timezone will always be +0000 UTC when the report is generated via API. When exported from the dashboard, the report will use the user's configured timezone. |
| **Description** | The description of the transaction. |
| **Channel Reference** | The reference that is generated by our channel partner. This can be used to reconcile data between your side, Xendit, and our partner: payment_channel_transaction_id: Direct Debit - bank_reference: Disbursement, Batch Disbursement, Remittance Payout, Remittance, Remittance Collection |
| **Settlement Status** | Settlement status of a transaction: - **Pending**: Transaction amount has not been settled to the merchant's balance. - **Settled**: Transaction has been settled to the merchant's balance. - **Early settled**: Transaction has been settled to the merchant's balance via early settlement. - **Empty** (Failed Disbursements & Chargeback Deduction) |

### Additional columns

When exporting a report, you can include additional columns for more information:

| Field name | Description |
| --- | --- |
| **Is Switcher Payment** | This is only applicable for Virtual Account or Cards transactions. |
| **Remittance Collection VA ID** | The ID of Remittance Collection VA. This is only applicable for Remittance Collection transactions. |
| **Batch Disbursement ID** | The ID of Batch Disbursement. This is only available for disbursement that’s created using the Batch Disbursement feature. |
| **Batch Disbursement Reference** | The Reference of Batch Disbursement. This is only available for disbursement that’s created using the Batch Disbursement feature. |
| **Remittance ID** | The ID of Remittance. This is only applicable for remittance transactions. |
| **Plan ID** | Xendit unique ID to identify a subscriptions plan. Returned on the create plan API response. This is only available for subscriptions payment. |
| **Cycle ID** | Xendit unique ID to identify a cycle of subscriptions to refer one specific instance of subscriptions plan's action. Cycle object is generated from the subscriptions plan object where the subscriptions behavior is defined. This is only available for subscriptions payment. |
| **Transaction Fee Deduction Type** | An identifier whether the fee of this transaction is DIRECT or INDIRECT. |
| **Transaction Fee** | Amount of the payment fee for this transaction |
| **Transaction VAT** | Amount of payment VAT related to transaction fee. |
| **Xendit WHT** | Amount of withholding tax retained by Xendit for this transaction. |
| **Early Settlement Fee Deduction Type** | An identifier whether the early settlement fee of this transaction is DIRECT or INDIRECT. |
| **Early Settlement Fee** | Amount of the early settlement fee for this transaction. |
| **Early Settlement VAT** | Amount of the early settlement VAT for this transaction. |
| **Legacy Callback ID** | The ID of legacy callback. This is only applicable for VA transactions. |
| **Account Name** | Recipient Account holder name inputted in the Disbursement or Payout request. |
| **Transaction Label** | Additional identifier of a transaction. Available value: Shopee: E-Wallet or QR |
| **Transfer Remark** | A remark or a note that is inputted by the payer when they are about to make a payment. |
| **Net Amount Currency** | Currency used for the net amount after fees. This reflects to which balance currency the transaction is settled. |
| **Converted Currency** | Currency that the transaction amount is converted into when FX conversion happens. |
| **Converted Amount** | Amount after currency conversion, expressed in the converted currency. |
| **Settlement Currency** | Expected currency used to settle funds to or from your account for the transaction. Available for unsettled transactions. |
| **Failure reason** | Payout failure reason *Only available via on-demand report* |
| **Payment Request ID** | ID of the payment request you can find in the callback of your payment request (v2 and v3). |
| **Capture ID** | Capture ID from payment transaction using v3 endpoints. |
| **Reusable Payment Link ID** | ID of Reusable Payment Link |
| **Payment Session ID** | ID of Payment session |
| **Metadata** | Metadata from payment transaction using v3 endpoints. |
| **Forex Rate** | Forex rate applicable to the transaction *Only available via on-demand report* |
| **Destination Amount** | Destination amount for overseas withdrawals *Only available via on-demand report* |
| **Destination currency** | Destination currency for overseas withdrawals *Only available via on-demand report* |

### Transactions report versions

Below is a table detailing different versions of the Transactions report. While you have the option to select from three versions depending on your business needs, it is recommended to use the latest version to ensure you are accessing the most current features and data.

**View transaction report versions comparison**

| Column | Ver. 0 | Ver. 1 | Ver. 2 |
| --- | --- | --- | --- |
| Status | ✅ | ✅ | ✅ |
| Type | ✅ | ✅ | ✅ |
| Channel | ✅ | ✅ | ✅ |
| Channel Name | ✅ | ✅ | ✅ |
| Account Number | ✅ | ✅ | ✅ |
| Currency | ✅ | ✅ | ✅ |
| Amount | ✅ | ✅ | ✅ |
| Fee | ✅ | ✅ | ❌ |
| VAT | ✅ | ✅ | ❌ |
| 3rd Party WHT | ✅ | ✅ | ❌ |
| Xendit WHT | ✅ | ✅ | ❌ |
| Net Amount | ✅ | ✅ | ✅ |
| Reference | ✅ | ✅ | ✅ |
| Transaction ID | ✅ | ✅ | ✅ |
| Invoice ID | ✅ | ✅ | ✅ |
| Batch ID | ✅ | ✅ | ✅ |
| Payment ID | ✅ | ✅ | ❌ |
| Payment Date | ✅ | ✅ | ✅ |
| Timestamp - Created | ✅ | ✅ | ✅ |
| Timestamp - Updated | ✅ | ✅ | ✅ |
| Timestamp - Settled | ✅ | ✅ | ❌ |
| Timezone | ✅ | ✅ | ✅ |
| Description | ✅ | ✅ | ✅ |
| Channel Reference | ✅ | ✅ | ✅ |
| Settlement Status | ❌ | ✅ | ✅ |
| Actual Settlement Time | ❌ | ✅ | ✅ |
| Estimated Settlement Time | ❌ | ✅ | ✅ |
| Product ID | ❌ | ❌ | ✅ |
| Total Fee | ❌ | ❌ | ✅ |
| Total VAT | ❌ | ❌ | ✅ |
