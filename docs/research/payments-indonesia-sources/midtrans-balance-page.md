---
updatedAt: 2026-04-28T11:29:20.000Z
agentTools:
  projectIndex: https://docs.midtrans.com/llms.txt
---

# Balance Page - Manage & Withdraw Your Funds

# Balance overview

***

<br />

The Balance page provides an overview of your funds in Midtrans. The layout and information displayed may vary slightly depending on the features you have activated in your Midtrans account. You can also change your Bank Account details here in this page via the 'Bank account info' tab. Here’s a breakdown of the common elements you’ll see:

<br />

## Balance Cards

<br />

* **Withdrawable Balance**: This section displays the total amount of successful settlements that you can withdraw to your bank account. The ***pending payable amount*** indicates the amount that's due to be credited to your Withdrawable balance from successful pay-in transactions that have not yet passed the withdrawal cut-off date and cannot be withdrawn yet. The cut-off date varies depending on the payment method used.
* **Opening & Closing Balance:** This section shows the opening and closing balance for a specific date range. You can filter the date range to view your balance history.\
  Transaction List

<br />

## View & export balance statement

<br />

The table displays a list of your recent transactions, which includes any transactions that adds or substracts to your Balance(s), such as successful payment or disbursement transactions, refund, withdrawals, balance transfers, or fees (such as from account verification)..

You can view the details of a specific transaction by clicking on any row. The columns displayed may include:

<br />

* **Date & Time:** The date and time the transaction occurred
* **Order ID:** The unique identifier for the transaction
* **Transaction Type:** The type of transaction (e.g., payment, disbursement, refund, top ups, etc)
* **Channel:** The payment channel used for the transaction (e.g., bank transfer, e-wallet, credit card)
* **Status:** The current status of the transaction (e.g., pending, success, expired, cancelled)
* **Amount:** The gross transaction amount
* **Fee:** The Midtrans fee associated with the transaction

<br />

You can export the statement list to a CSV report for further analysis in CSV or XLS format - which works identically to how Transactions' page export works.

<br />

# Withdrawing funds

***

> 📘 Note on withdrawal timeframe
>
> On demand withdrawal is not available between 00.00-01.00 GMT+7.

<br />

To withdraw your funds, simply click the Withdraw button within the Withdrawable balance card. You can also automate your fund withdrawal process by going to Settings > Billings > Billing Configuration, set up your auto withdrawal schedule, and click save. You can customize your withdrawable schedule even further

* To setup withdrawal every x days, set up schedule as Daily, then under `Repeat Every` section,  specify the interval (e.g. every 2 working days)
* If you setup your withdrawal to weekly, you can set on what day you want to receive your money on the `Repeat Every (day)` section (e.g. every Monday)
* If you setup your withdrawal to monthly, you can set on what date you want to receive your money on the `Repeat every (date)` section (e.g. every 1st day of the month)

<br />

Payouts are done on working days only. Payout requests that are requested either manually by clicking the `Withdraw` button before 11AM JKT time or automated will be processed on the same day.

<br />

## Withdrawal list

<br />

<Image align="center" alt="List of withdrawal requests" caption="List of withdrawal requests" src="https://files.readme.io/ceb1f91-image.png" />

<br />

<br />

The Withdrawal List section provides an overview of your withdrawal requests. You can see the following details for each withdrawal:

* Withdrawal ID: Unique identifier for the withdrawal request
* Requested Date: Date and time the withdrawal request was submitted
* Completion Date: Date and time the withdrawal request was completed (if applicable)
* Status: The current status of the withdrawal request (e.g., Success, Pending, Failed)
* Transaction Amount: The total amount withdrawn

<br />

You can click on a row in the Withdrawal list to view the details of a particular withdrawal, or export the entire Withdrawal list to a CSV report for further analysis by clicking `Export`.

<br />

## Withdrawal reports

<br />

The Withdrawal Details page provides a breakdown of a specific withdrawal request, including:

* Requested Date: Date and time the withdrawal request was submitted
* Completed Date: Date and time the withdrawal request was completed (if applicable)
* Status: The current status of the withdrawal request (e.g., Success, Pending, Failed)
* Transaction List: A table showing the individual transactions that are included in the withdrawal request. Each row may include details such as:
  * Order ID: Unique identifier for the transaction
  * Date & Time: Date and time the transaction occurred
  * Payment method or transaction type : payment method or the type of transaction (e.g., payment, refund etc)
  * Amount: The gross transaction amount
  * Fee: The Midtrans fee associated with the transaction\ <br />

You can also export the transaction list for this withdrawal to a CSV report for further analysis.

<br />

# Set & manage fund withdrawal bank account info

***

<br />

The Bank Account Information section of the Balance page displays the bank account details currently associated with your Midtrans payout. This is the bank account where you will receive your successful settlement funds. Here’s what you can see in this section:

<br />

* Bank Name: The name of the bank you are using for payouts
* Account Name: The name on the bank account
* Branch: The bank branch where the account is held (if applicable)
* Account Number: The bank account number associated with your payouts

<br />

To update your payout bank account information, follow these steps:

1. Click the Change Billing Information button.
2. Enter your new bank account details in the corresponding fields.
3. Carefully review the information for accuracy before saving.
4. Click Save to confirm the changes.

<br />

Note that payouts will be temporarily paused while Midtrans verifies your new bank information.

The verification process typically takes a few business days. Once your new bank account information is verified, payouts will resume as usual. Make sure to enter the correct bank account information to avoid delays or errors in receiving your payouts.

You can only have one payout bank account associated with your Midtrans account at a time.