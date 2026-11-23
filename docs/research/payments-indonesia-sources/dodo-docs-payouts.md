SOURCE https://docs.dodopayments.com/features/payouts.md
fetched 2026-11-23
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.dodopayments.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Payouts Process

> Learn how Dodo Payments schedules payouts, applies your minimum payout threshold, deducts fees, and sends your earnings to your linked bank account.

## Introduction

The **Payouts** page shows the earnings that go out in your next payout, net of fees, refunds, and taxes. It also holds your payout schedule, your minimum payout threshold, your linked bank accounts, and your payout history.

![Payouts page showing balance eligible for payout, schedule settings, linked bank accounts, and payout history](https://mintcdn.com/dodopayments/eH3qSTsrWihVdlv7/images/payouts/payout-page.png?fit=max\&auto=format\&n=eH3qSTsrWihVdlv7\&q=85\&s=c4011d2daa64e6e6730a37c806c159e0)

## Key Features

* The **Payout Balance** card shows the balance eligible for your next payout in your settlement currency, the currency that Dodo Payments pays your payout in. For example, if your payouts settle in EUR, the card shows EUR. The balance is split into **Available** and **Incoming**. When part of your balance is held in a reserve, the card also shows a **Reserved** row. See [Reserved Balance](#reserved-balance).
* Balances in other wallet currencies are converted to your settlement currency for display.
* The **Minimum Payout** stays in USD. When your balance is in another currency, the note that your balance is below the minimum payout labels the minimum "(USD)".
* The **Payout Schedule & Settings** card shows your **Minimum Payout**, **Payout Cycle** (the current billing period), **Payout Frequency**, and **Next Payout** date. Click **Manage** to change your payout frequency and minimum payout in **Settings → Payouts**.
* **Next Payout** comes from your payout schedule, which skips weekends and bank holidays. It shows `-` when no payout is due, for example when your balance is below your minimum payout. The date is never in the past: a payout that missed its date and is still due shows today's date and runs on the next payout run.

> [!NOTE]
>
> The displayed amount is **for reference only**. The final payout amount depends on the exchange rate at the time of transfer. Charges from your own bank or from intermediary banks can reduce the credited amount further. See [Payout Currency and Bank Conversion](#payout-currency-and-bank-conversion).

## Payout Cycles

Each payout cycle has fixed billing periods and payout dates:

**1. Bi-Monthly (Default)**

**Billing Period 1:** 1st to 15th of the month\
**Payout Date 1:** 18th of the same month

**Billing Period 2:** 16th to the end of the month\
**Payout Date 2:** 4th of the following month

**2. Weekly**

**Billing Period 1:** 1st to 7th\
**Payout Date 1:** 11th of the same month

**Billing Period 2:** 8th to 14th\
**Payout Date 2:** 18th of the same month

**Billing Period 3:** 15th to 21st\
**Payout Date 3:** 25th of the same month

**Billing Period 4:** 22nd to the end of the month\
**Payout Date 4:** 4th of the following month

**3. Monthly**

**Billing Period:** 1st to the end of the month\
**Payout Date:** 11th of the following month

**Note:**

* A payout is initiated only when all verifications are approved and your payable balance meets your payout threshold for the billing period.
* The default payout cycle for all businesses is **bi-monthly**. Your current cycle appears as **Payout Frequency** on the **Payouts** page.
* Businesses with higher transaction volumes can request **weekly** payouts by contacting [support@dodopayments.com](mailto:support@dodopayments.com).
* Certain high-risk businesses may be placed on a **monthly** payout cycle at our discretion.

### Change Your Payout Cycle

You can move your payout cycle to a **less frequent** cycle from the dashboard. The order is weekly, bi-monthly, and then monthly. You can't move back to your current cycle or to any more frequent cycle afterwards.

![Payout Settings page with the Customise Payouts card, the Linked Bank Accounts card, and the Settlement Currencies card](https://mintcdn.com/dodopayments/BxNFH14Y2X6lXkp3/images/payouts/payout-settings.png?fit=max\&auto=format\&n=BxNFH14Y2X6lXkp3\&q=85\&s=61f30056ea3f798117ba944eabf057d2)

**1. Open Payout Settings**

Go to **Settings → Payouts**, or click **Manage** on the **Payout Schedule & Settings** card of the **Payouts** page.

**2. Select a New Frequency**

Under **Customise Payouts**, open the **Payout Frequency** list. It shows only the cycles you can move to. Select one and click **Save**.

**3. Confirm the Change**

In the **Change payout frequency?** dialog, click **Change**.

> [!NOTE]
>
> Team members whose [role](https://docs.dodopayments.com/features/team.md#roles-and-permissions) has no **Write** access to any resource, such as Analyst or Finance, see payout settings as read-only. An API key cannot change the payout cycle.

After the change, Dodo Payments sends a **Payout schedule changed** in-app notification. It shows the old cycle, the new cycle, and the date of your next payout.

## Why Payouts Show as Inactive

If your dashboard shows **Payouts Inactive**, no payout is scheduled on your payout cycle while the account stays in that state. This differs from a payout that is scheduled but not yet sent. The **Payouts** page also shows a banner: "Payouts to your bank account are currently inactive. Review our Merchant Acceptance Policy to understand what might be affecting your account." The banner links to the [Merchant Acceptance Policy](https://docs.dodopayments.com/miscellaneous/merchant-acceptance.md) and does not name a specific reason.

Most often, payouts have not been enabled yet. Live payments and payouts are enabled separately, so your account can take live payments while payouts still show as inactive. Payouts also require an approved **Bank Verification**, an approved **Business Verification** for registered entities, and a completed **Monitoring Review**.

**1. Check Your Verification Forms**

Open the **Verification** section of your dashboard. A form that is still in draft, under review, or on hold is the usual reason. Complete it to move your account forward. See [Verification Process](https://docs.dodopayments.com/miscellaneous/verification-process.md) for what each state means and how to respond to a form placed on hold.

**2. Check the Threshold and the Cycle**

When payouts are active, a payout is initiated only when your eligible balance meets your [payout threshold](#minimum-payout-threshold) and your next payout date arrives. A balance below the threshold carries forward to the next cycle.

**3. Contact Support If Every Form Is Approved**

If all forms are approved and payouts remain inactive, email [support@dodopayments.com](mailto:support@dodopayments.com) from your registered email address.

> [!NOTE]
>
> Active payouts do not mean a payout was **sent**. An active account with a balance under the threshold, or one that has not reached its next payout date, shows no scheduled payout.

### If Payouts Were Previously Active

Payouts that have been running can return to inactive. The dashboard shows the same **Payouts Inactive** label, so check your verification status before you assume your account was never enabled. The usual reasons are:

* **An open information request.** As part of ongoing monitoring, our compliance team may ask for additional information. An unanswered request can pause payout processing until you respond. See [Additional Information Requests](https://docs.dodopayments.com/miscellaneous/verification-process.md#additional-information-requests).
* **A review in progress.** Payouts can be held while a compliance review of your account is completed, in line with our [Review and Monitoring Policy](https://docs.dodopayments.com/miscellaneous/review-monitoring-policy.md).

Open the **Verification** section of your dashboard and complete any outstanding form. If nothing is outstanding, email [support@dodopayments.com](mailto:support@dodopayments.com) from your registered email address.

## Payout Processing and Bank Timelines

1. The payout dates above are **initiation dates**. The payout is created at 00:00 UTC on that date.
2. After a payout is sent, the time it takes to reach your bank account depends on the receiving bank and the payout rail.
3. If a payout date falls on a weekend or a US Federal Reserve bank holiday, the payout moves to the next business day. The billing period does not change. The **Next Payout** date on the **Payouts** page already reflects the move.

### When Your Payout Date Moves

When the bank holiday calendar moves your next payout date, Dodo Payments sends a **Payout date moved** in-app notification that names both dates, for example "Payouts scheduled for 2026-10-05 now run on 2026-10-06."

* The notice covers only your **next** payout date, not later ones.
* It is sent only while your payouts are active.
* Every team member with in-app notifications receives it, subject to your payout notification settings in [Communication Preferences](https://docs.dodopayments.com/features/communication-preferences.md).
* When the new date is later than the old one, the **Payouts** page shows the move as a banner until you dismiss it, and the next payout card on **Home** shows a "Moved to" note under it.

### If a Payout Shows Success but Has Not Arrived

A payout with the status **Success** has been sent to your bank. A payout that shows **Initiated** or **In Progress** has not been sent yet. See [Payout Status](#payout-status). After a payout is sent, the receiving bank and the payout rail decide when the funds appear, and a cross-border transfer can pass through intermediary banks first.

To locate a payout that shows **Success** but is not in your account:

**1. Check Which Account Received It**

On the **Payouts** page, check your **Active Bank Account**. If you changed the active account recently, a payout processed before the change is credited to the previous account.

**2. Ask Your Bank to Trace the Transfer**

Give your bank the payout amount, the currency, and the payout date. Your bank can search for incoming and pending transfers that have not yet been credited to your account.

**3. Contact Support If Your Bank Can't Find It**

Email [support@dodopayments.com](mailto:support@dodopayments.com) from your registered email address. Include the payout amount, the payout date, and the payout ID if you have it. Payout IDs begin with `pyt_`.

## Payout Currency and Bank Conversion

Payout balances are held in your USD, GBP, and EUR wallets. After a transfer leaves Dodo Payments, two things outside our control can change the amount credited to your account:

* **Conversion by your bank.** If your account is credited in a different currency from the one the transfer is sent in, your bank converts the transfer on arrival at **its own exchange rate**. It may also apply its own receiving or conversion charges.
* **Intermediary bank charges.** Cross-border transfers can pass through correspondent banks, which may deduct their own charges.

Both happen at the banks, not at Dodo Payments. As a result, the amount credited to your account can be lower than the payout amount in your dashboard, and these charges do not appear on your payout invoice.

> [!NOTE]
>
> Payout routes and currencies vary by country. Contact [support@dodopayments.com](mailto:support@dodopayments.com) to confirm how your payouts are sent and credited before you link a bank account.

## Minimum Payout Threshold

| Currency | Default Threshold | Lowest Threshold You Can Set |
| - | - | - |
| USD | \$100 | \$50 |

> [!NOTE]
>
> If your payable balance does not meet the threshold, it carries forward to the next payout cycle.

> [!WARNING]
>
> **INR native wallet discontinued:** Support for the INR native wallet and INR-denominated payouts has been discontinued. Payouts are consolidated through the USD, GBP, and EUR wallets only. INR remains supported as a transaction currency for UPI, RuPay, and Indian-card subscriptions. Scheduled payouts do not include an INR balance, and an INR balance does not count toward your threshold. Dodo Payments can move an INR balance to your USD wallet, less a currency conversion fee. The moved amount is then included in your next payout. To request this, contact [support@dodopayments.com](mailto:support@dodopayments.com).

> [!WARNING]
>
> The threshold applies to your combined balance across the USD, GBP, and EUR wallets, converted to USD. A payout is initiated only when that combined balance is equal to or greater than your threshold. A single wallet reaching the amount on its own does not trigger a payout. The exception is a wallet linked through [Settlement Currencies](#settlement-currencies). A linked wallet is not part of the combined balance, and it must reach the threshold on its own.

## Flexible Minimum Payout Threshold

You can set the balance that must build up before Dodo Payments initiates a payout. The threshold is set in USD.

**Configuration:**

* **Allowed values:** \$50 or any higher amount
* **Effective from:** Your current payout cycle
* **Note:** A payout that is already scheduled for the cycle keeps its existing amount

### How to Edit Your Threshold

**1. Navigate to Payout Settings**

Go to **Settings → Payouts**, or click **Manage** on the **Payout Schedule & Settings** card of the **Payouts** page.

**2. Enter New Threshold**

Under **Customise Payouts**, enter a value of **50 or more** in **Minimum Payout** (for example, `250`).

**3. Save Changes**

Click **Save**. The dashboard confirms with **Minimum payout updated**.

> [!NOTE]
>
> The threshold is compared against your combined USD, EUR, and GBP wallet balances, converted to USD. A wallet linked through [Settlement Currencies](#settlement-currencies) is not part of the combined balance. It is compared on its own.

## Payout Accounts

The **Linked Bank Accounts** card on the **Payouts** page lists the bank accounts that receive your payouts. To add, activate, or delete an account, click **Manage Accounts**, which opens **Settings → Payouts**. You can link up to **six payout accounts**; deleted accounts don't count toward the limit. Each account is registered for a **currency** and a **transfer method**.

* **Add an account** with **Add Bank Account**, choosing the currency and transfer method you want to be paid in.
* **Save a draft** if you do not have every detail on hand, and finish the submission later. You can no longer edit an account after you submit it.
* **Resubmit** an account placed on hold. The hold or failure reason appears on the account so you know what to correct.
* The **first approved account is activated automatically**. Payouts are sent to your **Active Bank Account**, unless you use [Settlement Currencies](#settlement-currencies).
* **Enter your PAN for a bank account in India.** The form asks for your PAN, in the format `ABCDE1234F`. Dodo Payments needs it for the FIRA (Foreign Inward Remittance Advice) on your foreign payments. The dashboard never shows a saved PAN again. The form only says that a PAN is on file, and you can type a new one to replace it.
* **Choose Other for an unlisted bank.** If your bank is not in the list, select **Other** and type the bank name.
* **Confirm a bank code before you submit.** For some countries, including Nepal, the local transfer form lists bank codes instead of bank names. If you can't match your bank to a code, email [support@dodopayments.com](mailto:support@dodopayments.com) with your bank's name and country. Support confirms the code. Wait for the confirmation before you submit, because you can't edit an account after you submit it.

> [!NOTE]
>
> In **Settings → Payouts**, open the menu on an approved account and click **Set As Active** to make it your active account. By default, it replaces your current active account and becomes your primary account. If multi-currency payouts are enabled for your business, it replaces only the active account in the same currency. Payouts go to the new account from your next payout cycle, and a payout already processed is still credited to the previous account. You can **Delete** any account that is not active.

### Settlement Currencies

With settlement currencies, you can get paid in the currency that you earn, instead of one converted payout. You link a USD, EUR, or GBP wallet to an approved bank account. The balance of that wallet then goes to that account.

> [!NOTE]
>
> Settlement currencies are available only when Dodo Payments turns on multi-currency payouts for your business. To request this, contact [support@dodopayments.com](mailto:support@dodopayments.com). The **Settlement Currencies** card appears in **Settings → Payouts** only when the feature is on.

![Add a settlement currency dialog with the Currency and Bank Account fields](https://mintcdn.com/dodopayments/BxNFH14Y2X6lXkp3/images/payouts/add-settlement-currency.png?fit=max\&auto=format\&n=BxNFH14Y2X6lXkp3\&q=85\&s=0ac39e8bdf16340620f060299fd20a90)

**1. Open the Settlement Currencies Card**

Go to **Settings → Payouts**, then find the **Settlement Currencies** card.

**2. Add a Settlement Currency**

Click **Add settlement currency**. Select the **Currency** and an approved **Bank Account**, then click **Add Currency**.

**3. Set Your Primary Account**

To change the account that receives your other balances, open the menu on an active account and click **Make primary**.

* Each wallet links to one bank account, and each bank account takes one wallet.
* A linked wallet is paid out in its own currency. Dodo Payments does not convert it and charges no conversion fee. If the bank account is in a different currency, your bank converts the transfer on arrival. See [Payout Currency and Bank Conversion](#payout-currency-and-bank-conversion).
* **Other balances** are the wallets that you did not link. Dodo Payments converts them to the currency of your **Primary** account and sends them there. A currency conversion fee applies to this conversion.
* Each linked wallet must reach your minimum payout on its own. The threshold is not converted: a threshold of 300 means 300 USD, 300 EUR, or 300 GBP.
* Linked wallets are not part of the combined balance. Only the unlinked wallets and the primary account's wallet are converted to USD and compared against the threshold together. For example, if you link EUR, the EUR wallet is compared on its own, and the USD and GBP wallets are compared together.
* You can have up to three active accounts at a time, and only one active account for each account currency. Your primary account must be one of them.
* To stop a link, click the unlink icon on the wallet, then click **Unlink** to confirm. The wallet balance then goes to your primary account. To unlink the wallet of your primary account, first make a different account primary.
* If multi-currency payouts are turned off for your business, only your primary account receives payouts. Your other accounts become inactive but stay approved, and Dodo Payments removes their wallet links.

> [!NOTE]
>
> Bank verification during business onboarding uses the same payout accounts flow, so the account you submit while onboarding appears on the **Payouts** page as your first payout account. See [Account Verification](https://docs.dodopayments.com/miscellaneous/verification-process.md).

> [!WARNING]
>
> Bank account details must match your verified identity or registered entity name. Dodo Payments cannot process payouts to mismatched or third-party accounts. See [Account Verification](https://docs.dodopayments.com/miscellaneous/verification-process.md) for the full name-matching rules.

### Which Accounts You Can Use

The account must belong to you: the verified individual or the registered entity on your Dodo Payments account. Within that rule, you have more options than many merchants expect:

* **The account's country does not have to match your ID's country.** The country that issued your identity document decides whether you can onboard. Your payout account can be in a different country, provided it is held in your own name. See [How Your Eligible Country Is Determined](https://docs.dodopayments.com/miscellaneous/accepted-countries-and-territories.md#how-your-eligible-country-is-determined).
* **A joint personal account is eligible.** If you are one of the named account holders and your name matches your identity verification, a joint account can receive payouts. Compliance may ask for supporting documents before approving it, such as a bank confirmation letter or a recent statement showing the account holders and account identifiers.
* **A registered entity must use the entity's account.** If you onboarded as a registered entity, payouts go to an account in the company's legal name, not to a director's personal account.

### How Your Transfer Method Affects Currency and Cost

A payout account is registered for a specific **currency and transfer method**. That choice decides the currency your bank credits you in and whether a per-wire fee is deducted. A USD SWIFT account does not guarantee that you keep USD: if the receiving account cannot hold USD, your bank converts the transfer on arrival at its own rate.

| Transfer method | Typically credited in | Per-wire fee |
| - | - | - |
| International SWIFT wire | USD | USD SWIFT payout fee, deducted from the payout |
| Local bank transfer | Your local currency | None; processed as a domestic transfer |
| Payoneer receiving account | The account's currency | None where the account provides local routing and account numbers, since it is sent as a domestic transfer |

* **To be paid in your local currency,** register the account with your local bank details and the **Local** transfer method instead of **Swift**. This avoids the wire fee.
* **To hold USD,** register a USD account that can receive and hold USD, so your bank has no reason to convert the transfer on arrival.
* **Some bank countries offer only a USD SWIFT account.** When no local transfer option covers your bank's country, the bank form offers **USD** as the only currency and **SWIFT** as the only transfer method.
* **Payoneer is treated as a regular bank account.** Enter its details in the bank form as you would for any other account. There is no separate Payoneer integration.

> [!NOTE]
>
> See the [pricing page](https://dodopayments.com/pricing) for current payout and USD SWIFT wire fees. For **Swift** transfers, intermediary and beneficiary bank fees may also apply and are deducted from the payout amount. See [Payout Currency and Bank Conversion](#payout-currency-and-bank-conversion).

> [!NOTE]
>
> Available transfer methods vary by country, and not every method is offered for every account. Your dashboard shows the methods available to you when you add an account. If you are unsure which option suits your setup, contact [support@dodopayments.com](mailto:support@dodopayments.com) before you link an account.

## Reserved Balance

Dodo Payments can hold back a share of your settled payments as a reserve for a set period. When a reserve is held, the **Payout Balance** card on the **Payouts** page shows a **Reserved** row under **Incoming**.

* The reserved amount is still your money. It is not a fee.
* It is released back into your balance automatically.
* It is already excluded from your **Available** and **Incoming** amounts, so it is not deducted a second time from your payout.

If no reserve is held on your account, the **Reserved** row does not appear. In [Reports](https://docs.dodopayments.com/features/reports.md), reserve holds and releases appear under **Other movements**.

## Payout Deductions

The following amounts are deducted from your sales before payout:

**Taxes:**
The tax calculated on each payment is deducted from the sales amount. Dodo Payments remits it to the tax authority.

**Fees:**
Dodo Payments transaction fees are deducted from each payment. A payout fee is deducted from each payout. Under standard pricing, the payout fee is \$5 for payouts below \$1,000 (or the GBP or EUR equivalent).

**Refunds and Disputes:**
Refunded amounts, disputed amounts, and their fees are deducted from your balance when they occur. See [Balances](https://docs.dodopayments.com/features/account-summary-payout-wallet.md) for each ledger entry.

> [!NOTE]
>
> Charges from your own bank or from intermediary banks are not deducted here and do not appear on your payout invoice. See [Payout Currency and Bank Conversion](#payout-currency-and-bank-conversion).

> [!TIP]
>
> For detailed fee information, see our [Pricing Page](https://dodopayments.com/pricing).

## Payout Status

Your **Payout History** shows one of the following statuses for each payout:

| Dashboard status | API `status` | Description | Webhook event |
| - | - | - | - |
| Initiated | `not_initiated` | The payout is created and waits for processing | `payout.created` |
| In Progress | `in_progress` | The payout is being processed | `payout.in_progress` |
| On Hold | `on_hold` | The payout team has put the payout on hold | `payout.on_hold` |
| Success | `success` | The payout was sent to your bank account | `payout.success` |
| Failed | `failed` | The payout failed. The payout amount and payout fee are credited back to your balance as **Payout Reversal** and **Payout Fees Reversal** | `payout.failed` |

Every status change emits a webhook, so you can reconcile payouts in your own systems without polling. See [Payout Webhooks](https://docs.dodopayments.com/developer-resources/webhooks/intents/payout.md) for the payload and delivery details. To receive email or in-app notifications for the same changes, see [Communication Preferences](https://docs.dodopayments.com/features/communication-preferences.md).

## Payout Invoice

Each payout has a self-billed invoice that records the amount Dodo Payments pays to your business. Your business appears under **Billed From**, and the Dodo Payments payout entity appears under **Billed to**. The invoice shows **Paid** after the payout succeeds and **Unpaid** before that.

To download it, open **Payout History**, click the payout in the **Details** column, and in the **Payout Details** panel click **Download → Download Invoice**.

The **Payout Details** panel also breaks the payout down by ledger entry type, such as **Payments**, **Tax Deducted**, and **Payment Fees**. When the entries a payout settles do not add up to the payout amount, the difference appears as **Unattributed Balance**, listed last, directly above the total. A positive amount means the payout drew on balance left over from an earlier period. A negative amount means the entries came to more than the payout, and the remainder funds a later payout.

### Invoice Structure

![Payout invoice showing invoice ID, billed to and billed from details, payout line item, and total](https://mintcdn.com/dodopayments/5D2vY2CKcFOZLLyz/images/payouts/payout-process/Invoice%20-%20Payout.png?fit=max\&auto=format\&n=5D2vY2CKcFOZLLyz\&q=85\&s=03746005d9b9e88a63c83d1c392ebe78)

> [card] [Balances & Wallets](https://docs.dodopayments.com/features/account-summary-payout-wallet.md)
>
> View your USD, GBP, and EUR wallet balances, the transaction ledger, and payout-related activity.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.