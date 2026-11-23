SOURCE https://developer.paddle.com/concepts/payment-methods/alipay.md
fetched 2026-11-23
> For the complete documentation index, see [llms.txt](https://developer.paddle.com/llms.txt).
>
> To search these docs, send a `GET` request to `https://paddle-docs-retrieval.kapa-paddle.workers.dev/?q=<question>` with a URL-encoded question. No authentication needed. It returns a JSON array of `{content, source_url}`, most relevant first.

# Alipay

Let customers pay with Alipay. No configuration required.

---

## Key attributes

| Attribute | Value |
| --- | --- |
| Countries | CN |
| Currencies | CNY |
| Platforms | All |
| One-time items | Supported |
| Subscriptions | Supported |
| Capture | Instant |
| Chargebacks | Not supported |
| Refunds | Supported |
| Installments | Not supported |
| Can be presented when saved? | Not supported |
| Express checkout | Not supported |

Alipay is a digital wallet for the Chinese market, used by over a billion people. It's part of an app that lets users in China book taxis, order food, access healthcare, and plan vacations.

Customers authenticate and confirm payments using the Alipay app, which requires proof of identification and a bank account, making it a quick and secure way to pay.

You don't need an Alipay account or entity in China to add Alipay as a payment option with Paddle.

{% card-group cols=3 %}
{% card title="primary market" stat="CN" statColor="blue" %}
Alipay is a popular payment method for customers in China.
{% /card %}

{% card title="active users" stat="1.3bn" statColor="green" %}
Alipay has over 1.3bn users across 80m merchants as of June 2020.
{% /card %}

{% card title="market share" stat="54.5%" statColor="purple" %}
Alipay is the leading online payment provider in China as of December 2020.
{% /card %}
{% /card-group %}

{% callout type="info" %}
The maximum transaction total for subscription renewals and charges is 1600 `CNY`. If a temporary discount is applied, the prediscount total can't be more than this total. If the transaction total goes over 1600 `CNY`, payment fails and customers can update their payment details as part of dunning.
{% /callout %}

## How it works

{% journey %}
{% journey-step title="Customer chooses Alipay" %}

Turn on Alipay in a couple of clicks in your Paddle dashboard. Paddle automatically presents Alipay as a payment method for customers paying in a supported country and currency.

{% /journey-step %}

{% journey-step title="Customer starts confirmation process" %}

If the customer is checking out on a desktop, they're prompted to scan a QR code with their phone. If they're on mobile, they're prompted to open the Alipay app.

{% /journey-step %}

{% journey-step title="Customer confirms purchase" %}

Customer confirms purchase on their phone using the Alipay app.

{% /journey-step %}

{% journey-step title="Payment complete" %}

If successful, Paddle Checkout shows a success screen or enters your success workflow.

{% /journey-step %}
{% /journey %}

## Accept Alipay

To keep the Paddle platform safe for everyone, Alipay requires additional approval from Paddle. It's only available for some kinds of product.

### Request approval for Alipay

You can request approval for Alipay if:

- You offer products in `CNY` (Chinese Yuan).
- Subscription renewals for a customer don't typically total more than 1,600 `CNY`.
- You agree that products aren't on the Alipay [list of prohibited and restricted products](https://global.alipay.com/docs/ac/Platform/le18gg#FVEQ7).

To apply, go to [Request approval for Alipay](https://paddlecom.typeform.com/to/OViGqvW1).

### Turn on Alipay

Once approved, turn on Alipay.

1. Go to **Paddle > Checkout > Checkout configuration**.
2. Expand **Payment methods**, then check **Alipay**.
3. Click **Save** to apply.

## Test Alipay

You can test Alipay using your Paddle [sandbox account](https://developer.paddle.com/sdks/sandbox.md).

1. Turn on Alipay for your Paddle account.
2. Open a checkout for an item that's priced in `CNY` (Chinese Yuan).
3. Pick China as the country on the first screen of checkout, then enter an email.
4. Select Alipay as the payment method and follow the prompts to complete purchase.

{% callout type="info" %}
Paddle Checkout only presents Alipay as a payment method for items priced in Chinese Yuan, where the customer address is China.
{% /callout %}
HTTP 200
