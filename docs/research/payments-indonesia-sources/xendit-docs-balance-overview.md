---
title: "Overview"
slug: "balance-overview"
tags: ["balance history", "pending outgoing", "available balance"]
updated: 2026-07-09T01:12:57Z
published: 2026-07-09T01:12:57Z
canonical: "docs.xendit.co/balance-overview"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.xendit.co/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

Your [Xendit balance](https://dashboard.xendit.co/balance) provides a complete overview of your account funds, encompassing available funds in different currencies. Within each currency balance, you can view all activities encompassing pending transactions, and your total balance. It's where you can manage your funds, with options to top up your account and withdraw as needed. You can also access your balance history to track your transactions.

## Balance Settlement

There are two scenarios for balance settlement after accepting payments with Xendit:

- Matching Currencies: If your payment currency and your default balance currency are the same, funds will settle into your account without any conversion.
- Differing Currencies: If your payment currency differs from your default balance currency, Xendit automatically converts all funds from payments into the default currency of your account.

Depending on your country of incorporation, you can [add balances in other currencies](/v1/docs/balance-overview#adding-balance-currencies) to reduce the need for currency conversions. When you open a specific currency balance, payments with a matching presentment currency will no longer be converted into your default currency; instead, they will settle directly into that specific currency balance.

For example, if you are a Xendit user in Singapore with only a USD balance open, all payments with a different presentment currency (e.g., IDR, PHP) will be automatically converted and settled into that USD balance. Once you add an IDR balance, any future IDR payments will automatically settle into that IDR balance without conversion.

## Adding Balances in Other Currencies

> [!NOTE]
> Multi-currency Balance Eligibility
> 
> If your business is based in Singapore and Hong Kong, you can add balances in other currencies

To add a balance, select **Open New Balance** button in your [balance page](https://dashboard.xendit.co/balance).

After a currency balance is added, all payments with a matching presentment currency will settle into that balance going forward.

For example, if you are a Xendit user in Singapore with only a USD balance open, all payments with a different presentment currency (eg IDR, PHP) will be automatically converted and settled into that USD balance. When you add a IDR balance, any future IDR payments will automatically settle into the IDR balance without conversion.

Upon adding a balance, you can also use it for the same purposes as your existing balances:

1. [Converting between currencies](/v1/docs/convert-balance)
2. [Initiating a payout](/v1/docs/send-payouts-overview)

| Country | Default Balance | Currencies available to add |
| --- | --- | --- |
| Singapore | SGD | USD |
| Hong Kong | HKD | USD |
| Philippines | PHP | USD |

## Your Balance

After selecting one of your balance currencies, you will see the following information:

**Available Balance:** The amount of funds available in a balance to be used for withdrawals or payouts. You can click “See Details” to view:

- **Pending Incoming:** The sum of incoming transactions that are still pending. These are typically payments which have not settled yet.
- **Pending Outgoing:** The sum of outgoing transactions that are still being processed. This includes e.g. payouts or withdrawals which were initiated but not yet completed
- **Total Balance:** The sum of funds you have which are available and which are pending outgoing.

**Balance History:** A table containing every balance movement.

- **Settled Transactions**: Transactions that have settled into your cash balance
- **Pending Transactions**: Transactions that are still being processed and have not settled into your cash balance

## Balance History

You can track fund movements to / from your balance using the Balance History section. You can check your history from up to **92 days ago**. If you’d like to view older transactions, you can do so by exporting your Balance Report (add link).

All **completed** transactions are recorded here, including:

1. Settled payments
2. Completed top-ups
3. Completed payouts
4. Completed withdrawals

Any transactions that are still pending (eg payments that have not settled, or pending payouts) are recorded in the Pending tab.

### **Fees and Taxes**

Transaction fees and any applicable taxes (eg Value-Added Tax) are also recorded in the Balance History after they have been applied.

They are distinguished from the transactions themselves, to facilitate reconciliation.

###
