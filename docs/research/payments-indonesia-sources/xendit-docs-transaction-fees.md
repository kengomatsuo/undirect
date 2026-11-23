---
title: "Transaction fees"
slug: "transaction-fees"
description: "Find clear information on Xendit's fees, billing reports, and fee deductions to ensure financial transparency and effective auditing of your transactions."
tags: ["Invoice Settlement", "Billing Reports", "Fee Transparency"]
updated: 2026-11-06T07:24:04Z
published: 2026-11-06T07:24:04Z
canonical: "docs.xendit.co/transaction-fees"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.xendit.co/llms.txt
> Use this file to discover all available pages before exploring further.

# Transaction fees

We publish our standard fees for all operational regions on our website, ensuring you have clear and accessible information. You can find our [pricing details in our website](https://www.xendit.co/en/pricing/).

## Finding & auditing your fees

While our published schedules offer a general overview, your specific transaction rates might vary based on what is in your contract with Xendit. The details of which rate apply for each item will be shown in the invoice we issue in the beginning of the month, for the previous month’s billing period.

To help you with financial transparency and audits, you can download your **Billing Reports**. You can use these reports to review and verify past fees, giving you a detailed history of your transaction costs.

## How we apply fees and when

Fees and VAT charges are calculated and deducted depending on the type of fee. We apply fees under specific transaction conditions to ensure clarity and consistency. The following section explains the different fees we charge and when we deduct them from your balance.

| Fee Type | Charges Applied |
| --- | --- |
| **Payment Method Fee** | Charged when a payment transaction is settled. Fees are retained when the payment is refunded. |
| **Payout Fee** | Payout fees are charged once payouts are completed. They are retained when payouts are reversed. |
| **Xendit Processing Fee** | An additional Xendit Processing fee will apply on every payment acceptance, payout or refund attempt initiated via API or through Payment Links. - **Card payments**: On every payment attempt, when the card is authenticated or authorized. The fee applies whether the payment succeeds or fails. - **Local payment methods** (e.g. virtual accounts, e-wallets, QR codes, retail outlets, direct debit): Only on successful payments. Pending, failed or expired payments are not charged. - **Payouts**: On successful payouts. - **Refunds** (all payment methods): Each successful refund is charged its own processing fee. This is in addition to the fee charged on the original payment. Processing fees are accumulated and deducted daily, in a single lump sum. This lump sum deduction is visible in your Balance and Transactions history. Individual processing fee charges along with the relevant transaction or payment IDs will be available in your [Billing report](/v1/docs/billing-report) when we issue your invoice, if you wish to reconcile them individually. |
| **Chargeback Fee** | A non-refundable administrative charge applicable for each chargeback. It is payable regardless of the outcome or resolution of a chargeback dispute. |
| **Third-party Integration Fees** | An additional fee will be charged together with the Processing Fee and applicable Payment Method Fee if you use payments via Third-party integrations such as Shopify. |
| **Minimum Monthly Fee** | We impose a Monthly Minimum Fee of USD 50 (or a local currency equivalent) whenever we issue your invoice, except for your first month transacting with us. When your accrued fees for any billing period are less than the minimum, we will charge the difference and add it to the invoice total to reach $50. For example: - Your monthly total charge excluding VAT is $38 - A $12 adjustment will be added to the invoice to bring the total to $50 before VAT If you do not have any billable activities for an entire billing period, this minimum will not be charged so no invoices will be issued. |
| **Maintenance Fee** | A flat monthly fee added to the invoice for customers who continue to access the Services through Xendit’s legacy API. Refer to [this article](https://help.xendit.co/hc/en-us/articles/59516240127129-Xendit-Pricing-Policy) to learn more about which APIs qualify for this category. |

You can read more details about our pricing policy [here](https://help.xendit.co/hc/en-us/articles/59516240127129-Xendit-Pricing-Policy).

### Invoice settlement

After we issue your monthly invoice, any outstanding charges that haven't already been deducted will be deducted automatically from your Xendit balance. If your balance isn't enough to cover the full invoice amount, no deduction will occur, and the invoice will stay unpaid until it's settled. [Refer to this article](/v1/docs/how-to-pay-bills) to learn how to settle any outstanding amounts.

## Related

- [Transactions report](/transactions-report.md)
- [Billing report](/billing-report.md)
- [Detailed transactions report](/detailed-transactions-report.md)
