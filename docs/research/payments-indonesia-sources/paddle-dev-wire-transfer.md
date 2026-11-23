SOURCE https://developer.paddle.com/concepts/payment-methods/wire-transfer.md
fetched 2026-11-23
> For the complete documentation index, see [llms.txt](https://developer.paddle.com/llms.txt).
>
> To search these docs, send a `GET` request to `https://paddle-docs-retrieval.kapa-paddle.workers.dev/?q=<question>` with a URL-encoded question. No authentication needed. It returns a JSON array of `{content, source_url}`, most relevant first.

# Bank transfer

Let customers pay by bank transfer. No configuration required.

---

## Key attributes

| Attribute | Value |
| --- | --- |
| Countries | All |
| Currencies | EUR, GBP, USD |
| Platforms | Invoice only |
| One-time items | Supported |
| Subscriptions | Supported |
| Capture | Customer-initiated |
| Chargebacks | Not supported |
| Refunds | Supported |
| Installments | Not supported |
| Can be presented when saved? | Not supported |
| Express checkout | Not supported |

Bank transfers, sometimes called wire transfers, are a safe way for customers to send money from their bank account to pay for things. It's common for businesses to pay invoices by bank transfer, especially for larger value deals that might be higher than credit or debit card limits.

You don't need to open local bank accounts or spend time reconciling payments. Customers pay Paddle, then Paddle handles invoice reconciliation and payout.

## How it works

{% journey %}
{% journey-step title="Invoice sent from Paddle" %}

When you issue an invoice using the Paddle dashboard or the API, Paddle sends it to the customer and any business contacts. It has an invoice number and is a legal document at this point.

{% /journey-step %}

{% journey-step title="Customer pays the invoice" %}

Paddle automatically generates unique bank transfer details for each customer and includes them on the invoice. Customers make a payment using these details by the due date on the invoice.

{% /journey-step %}

{% journey-step title="Paddle receives payment and reconciles" %}

When Paddle receives payment, we automatically mark the invoice as paid and reconcile for you.

{% /journey-step %}
{% /journey %}

## Accept bank transfers

Only invoices (manually-collected transactions) can be paid by bank transfer.

You don't need to do anything to enable bank transfers. They're always enabled for Paddle accounts.
HTTP 200
