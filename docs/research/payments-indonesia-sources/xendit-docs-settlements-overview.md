---
title: "Settlement"
slug: "settlements-overview"
updated: 2026-07-09T02:38:12Z
published: 2026-07-09T02:38:12Z
canonical: "docs.xendit.co/settlements-overview"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.xendit.co/llms.txt
> Use this file to discover all available pages before exploring further.

# Settlement

After a payment is successfully made through Xendit, the settlement time varies depending on the payment channel used. Each payment channel has its own standard settlement timeline based on agreements with our banking and payment partners.

## Settlement time

Settlement times can range from instant to several business days. For detailed settlement times for specific payment methods, please refer to our [Available Payment Channels](/v1/docs/available-payment-channels).

Please note that for E-Wallets, QR Payments, Direct Debit, and PayLater, settlement times are calculated in calendar days unless otherwise specified. If a settlement date falls on a weekend, the funds will be reflected on the next weekday.

## Common settlement issues

One of the most common settlement issues is missing transactions due to delayed or failed callbacks from banks. This can happen when:

- There are temporary connectivity issues between the bank and Xendit.
- The bank's system experiences delays in sending payment confirmations.
- Network interruptions occur during the callback process.

If you notice any missing transactions, don't worry—we have systems in place to help:

1. **Automatic Reconciliation:** We run automated reconciliation processes regularly to identify and process any missing transactions. In exceptional situations like bank system downtimes, our reconciliation system may only be informed about missing transactions after one or several days. We recommend you to build flexibility in your reconciliation processes to handle these edge cases. For more details on best practices, see our guide on [Transaction reconciliation](/v1/docs/reconciliations).
2. **Customer Support:** You can always contact our customer support team to investigate and resolve missing settlement issues. Please provide relevant transaction details like the reference ID, payment amount and date to help expedite the resolution.
