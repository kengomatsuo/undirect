SOURCE https://developer.paddle.com/concepts/payment-methods/samsung-pay.md
fetched 2026-11-23
> For the complete documentation index, see [llms.txt](https://developer.paddle.com/llms.txt).
>
> To search these docs, send a `GET` request to `https://paddle-docs-retrieval.kapa-paddle.workers.dev/?q=<question>` with a URL-encoded question. No authentication needed. It returns a JSON array of `{content, source_url}`, most relevant first.

# Samsung Pay

Let customers pay with Samsung Pay. No configuration required.

---

## Key attributes

| Attribute | Value |
| --- | --- |
| Countries | KR |
| Currencies | KRW |
| Platforms | All |
| One-time items | Supported |
| Subscriptions | Not supported |
| Capture | Instant |
| Chargebacks | Supported |
| Refunds | Supported |
| Installments | Supported |
| Can be presented when saved? | Not supported |
| Express checkout | Not supported |

Samsung Pay comes preinstalled on Samsung smartphones, the most popular brand of phone in South Korea. It's a popular way to pay in-store and increasingly used for online payments, too.

Customers authenticate and confirm payments using the Samsung Pay app, making it a quick and secure way to pay.

You don't need to set up a bank account in South Korea to add Samsung Pay as a payment option with Paddle.

{% card-group cols=3 %}
{% card title="primary market" stat="KR" statColor="blue" %}
Samsung Pay is a popular payment method for customers in South Korea.
{% /card %}

{% card title="people use to pay" stat="3 in 10" statColor="green" %}
Samsung Pay was used by three in 10 people for online payments in 2023.
{% /card %}

{% card title="phone market share" stat="84%" statColor="purple" %}
Samsung Pay comes preinstalled on over 80% of phones sold in South Korea.
{% /card %}
{% /card-group %}

## How it works

{% journey %}
{% journey-step title="Customer chooses Samsung Pay" %}

Turn on Samsung Pay in a couple of clicks in your Paddle dashboard. Paddle automatically presents the option to pay using Samsung Pay for customers paying in a supported country and currency.

{% /journey-step %}

{% journey-step title="Customer starts confirmation" %}

If the customer is checking out on a desktop, they're prompted to scan a QR code with their phone. If they're on mobile, they're prompted to open Samsung Pay.

{% /journey-step %}

{% journey-step title="Customer confirms purchase" %}

Customer confirms purchase on their phone using their Samsung Pay app.

{% /journey-step %}

{% journey-step title="Payment complete" %}

If successful, Paddle Checkout shows a success screen or enters your success workflow.

{% /journey-step %}
{% /journey %}
## Accept Samsung Pay

1. Go to **Paddle > Checkout > Checkout configuration**.
2. Expand **Payment methods**, then check **Samsung Pay**.
3. Click **Save** to apply.

## Test Samsung Pay

You can test Samsung Pay using your Paddle [sandbox account](https://developer.paddle.com/sdks/sandbox.md).

1. Turn on Samsung Pay for your Paddle account.
2. Open a checkout for a one-time item that's priced in `KRW` (South Korean Won).
3. Pick South Korea as the country on the first screen of checkout, then enter an email.
4. Select Samsung Pay as the payment method.
5. Click **Pay** and follow the prompts to complete purchase.

> Paddle Checkout only presents Samsung Pay as a payment method for one-time items priced in South Korean Won, where the customer address is in South Korea.


HTTP 200
