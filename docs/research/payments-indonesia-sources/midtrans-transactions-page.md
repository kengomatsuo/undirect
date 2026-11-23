---
updatedAt: 2025-12-02T16:50:00.000Z
agentTools:
  projectIndex: https://docs.midtrans.com/llms.txt
---

# Transactions Page - Reporting & Operations

# Transactions Page Overview

***

<br />

The Transaction List provides a detailed overview and details of all your past 6 months of transactions processed by Midtrans. This includes:

* **Payment Acceptance**: Transactions where your customers pay you
* **Disbursements:** Transactions where funds are disbursed to your account
* **Fund Withdrawals:** Transactions where you withdraw funds from Midtrans

<br />

# Search & Filter

***

<br />

You can filter the Transaction List to view specific transactions using a combination of filter options. Multiple criteria can be applied at once.
There are four types of filters:

<Image border={false} src="https://files.readme.io/edd5701-image.png" />

<br />

**Legend :**

1. Quick filter - Search using unique identifiers in the search bar, such as: Order ID, Transaction ID, Reference No, Customer email, or Notes (Disbursement only)
2. Filter - Use this section to filter by key transaction attributes, such as: Transaction Type, Status, and Channel. Only the options that are relevant to your transactions will appear here.
3. Filter using date range here - Filter transactions within a date range (up to 6 months). The date field depends on the transaction type:
   1. Payment → Transaction Date
   2. Disbursement → Disbursement Created Date
   3. Withdrawal → Withdrawal Request Date
4. More Filter - This section includes additional filter options:
   1. Settlement Date
   2. Disbursement Date
   3. Refund Date
   4. Transaction Amount
   5. Promotion Name
   6. Invoice ID
   7. Approval Code
   8. Source of Transaction
   9. Custom Field
   10. GoPay Payment Source
   11. QRIS Acquirer
   12. Bank Transfer Acquiring Bank
   13. Bank Transfer Virtual Account Number
   14. After selecting your criteria, click Apply to view the filtered results.

Then click Apply to make your search.

<br />

**Frequently Asked Questions Related to Filtering in Transaction Page :**

1. How do I filter using Settlement Status?
   1. Open the Transaction page.
   2. Click the Filter dropdown.
   3. Select the desired Transaction Type and Settlement Status.

      <Image border={false} src="https://files.readme.io/69648c489e496c5db21a9cc1c083cf3bf44249ac802edb92c76e3a5c9645ea99-Screenshot_2025-12-02_at_17.02.07.png" />
   4. Click Add Filter
2. How do I filter using Settlement Date?
   1. Open the Transaction page.
   2. Click More Filter.
   3. Select Settlement Date from the sidebar.

      <Image border={false} src="https://files.readme.io/b26a28c20fcedd94ffc43efae8802185d8873fb7395105cdd70f1b3a10eed8ae-Screenshot_2025-12-02_at_17.03.37.png" />
   4. Choose the desired date range.

# Checking Transaction Details

***

<br />

To view the details of a specific transaction, click on any row in the Transaction List. This will display a detailed breakdown of the transaction, including:

* Order ID: The unique identifier for the transaction
* Date and Time: The date and time the transaction occurred
* Transaction Type: The type of transaction (e.g., payment, disbursement, withdrawal)
* Status: The current status of the transaction (e.g., pending, success, expired, cancelled)
* Amount: The transaction amount

<br />

Some fields (e.g. `Account Number` for Withdrawal or `Order Details` for Payment) are only available for specific transaction types only.

You can also check the transaction's notification log within this detail drawer, or the status change's history within the 'View transaction history' menu (see below).

<br />

<Image align="center" alt="View transaction history" border={false} caption="View transaction history" src="https://files.readme.io/f982246-image.png" width="75% " />

<br />

<br />

Lastly, if your transactions are denied, you can also see the rejection reason within this drawer, see below for example.

<br />

<Image align="center" alt="Sample rejection status explanation for denied transaction" border={false} caption="Sample rejection status explanation for denied transaction" src="https://files.readme.io/8b17d1f-image.png" width="50% " />

<br />

# Exporting Reports

***

<br />

You can export the Transaction List to a CSV report for further analysis. To export the transactions, click the Export button and select the desired date range. The report will be sent to the email address associated with your Midtrans account in CSV or XLS format.

<br />

<Image align="center" alt="Export drawer" border={false} caption="Export drawer" src="https://files.readme.io/7fa4a37-image.png" width="50% " />

<br />

Please note that Midtrans can only export 1 month worth of report, so you'll need to filter first using Transaction Date Range and ensure that it's within 31 days at maximum.

You can also modify what fields will be contained in your report. In general a good practice is to only select what you need as more fields will mean larger file size, which will take longer to generate.

By default, not all fields are ticked when you export your report, so make sure to review this panel first and check what you need before exporting.

<br />

<Image align="center" alt="Edit table for export drawer" border={false} caption="Edit table for export drawer" src="https://files.readme.io/4514cf2-image.png" width="50% " />

<br />

> 🚧 Downloading large size reports
>
> If your organization's report size is very huge, consider to narrow down the time range (e.g. daily instead of monthly), add more filters to narrow down the criteria, and uncheck the fields that you don't need - otherwise it may take hours to generate your reports.
>
> If it's still not working as per your need, consider using our Transaction API or reach out to Midtrans's support.

<br />

# Performing Cancel & Refund

***

For payment transactions that are still eligible to be refunded (initial transaction status is Settlement and trx is not older than the supported time range - see Refund articles for more details) or cancelled (initial transaction status is Pending or Capture),  you can cancel or refund them via Transaction page on top of via API. To do so, click on the target transaction, and the button will appear in eligible transactions within the transaction detail drawer.

<br />

<Image align="center" alt="Refund button for eligible transaction" border={false} caption="Refund button for eligible transaction" src="https://files.readme.io/79fa0cb-image.png" width="50% " />

<br />

When refunding a transaction, you can also optionally input the refund reason, or the refund amount (input the exact same amount for full refund, or amount less than the transaction amount for partial refund). If the dashboard have shown a success notification, that means your refund request has been received by Midtrans.

<br />

<Image align="center" alt="Refund dialogue box" border={false} caption="Refund dialogue box" src="https://files.readme.io/f1c6ee8-image.png" width="50% " />

<br />

<br />

Afterwards, you'll be able to see the Refund details within the same Transaction Details' drawer.

<br />

<Image align="center" alt="Refund details" border={false} caption="Refund details" src="https://files.readme.io/e44f69b-image.png" width="50% " />