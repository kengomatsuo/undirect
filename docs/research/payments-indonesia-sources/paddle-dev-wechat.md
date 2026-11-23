SOURCE https://developer.paddle.com/concepts/payment-methods/wechat.md
fetched 2026-11-23
> For the complete documentation index, see [llms.txt](https://developer.paddle.com/llms.txt).
>
> To search these docs, send a `GET` request to `https://paddle-docs-retrieval.kapa-paddle.workers.dev/?q=<question>` with a URL-encoded question. No authentication needed. It returns a JSON array of `{content, source_url}`, most relevant first.

# WeChat Pay

Let customers pay with WeChat Pay. No configuration required.

---

## Key attributes

| Attribute | Value |
| --- | --- |
| Countries | CN |
| Currencies | CNY, USD |
| Platforms | Desktop |
| One-time items | Supported |
| Subscriptions | Not supported |
| Capture | Deferred |
| Chargebacks | Not supported |
| Refunds | Supported |
| Installments | Not supported |
| Can be presented when saved? | Not supported |
| Express checkout | Not supported |

WeChat Pay is a leading digital wallet for the Chinese market, built into the WeChat super-app. WeChat is an essential part of daily life in China, used for messaging, social media, and accessing millions of services and online stores via Mini Programs.

Customers authenticate and confirm payments securely within the WeChat app using a password or biometrics, often by scanning a QR code. This makes it a fast, familiar, and trusted way to pay.

You don't need a WeChat Pay account or an entity in China to add WeChat Pay as a payment option with Paddle.

{% card-group cols=3 %}
{% card title="primary market" stat="CN" statColor="blue" %}
WeChat Pay is a vital payment method for businesses selling to customers in China.
{% /card %}

{% card title="active users" stat="935m" statColor="green" %}
WeChat Pay has 935 million users as of 2023, making it one of the world's largest payment platforms.
{% /card %}

{% card title="market share" stat="~37%" statColor="purple" %}
WeChat Pay holds a significant share of China's massive mobile payments market.
{% /card %}
{% /card-group %}

## How it works

{% journey %}
{% journey-step title="Customer chooses WeChat Pay" %}

Turn on WeChat Pay in a couple of clicks in your Paddle dashboard. Paddle automatically presents WeChat Pay as a payment method for customers paying in a supported country and currency.

{% /journey-step %}

{% journey-step title="Customer starts confirmation" %}

If the customer is checking out on a desktop, they're prompted to scan a QR code with their phone. If they're on mobile, they're prompted to open their banking app.

They can also copy the WeChat Pay key and paste it into their banking app manually.

{% /journey-step %}

{% journey-step title="Customer confirms purchase" %}

Customer confirms purchase on their phone using their banking app. The exact process varies depending on the banking app the customer uses, but typically they'll authenticate using on-device biometrics.

{% /journey-step %}

{% journey-step title="Payment authorized" %}

Payment is authorized, and Paddle Checkout shows a screen that confirms the checkout is completed, but the payment is pending capture.

{% /journey-step %}

{% journey-step title="Payment completed" %}

After authorization, payment is captured. This typically happens immediately after authorization, but can take up to ten minutes.

The transaction is marked as completed in Paddle, and the customer receives a copy of their invoice by email.

{% /journey-step %}
{% /journey %}
## Accept WeChat Pay

1. Go to **Paddle > Checkout > Checkout configuration**.
2. Expand **Payment methods**, then check **WeChat Pay**.
3. Click **Save** to apply.

## Test WeChat Pay

You can test WeChat Pay using your Paddle [sandbox account](https://developer.paddle.com/sdks/sandbox.md).

1. Turn on WeChat Pay for your Paddle account.
2. Open a checkout for a one-time item that's priced in `CNY` (Chinese Yuan) or `USD` (US Dollar).
3. Pick China as the country on the first screen of checkout, then enter an email.
4. Select WeChat Pay as the payment method and follow the prompts to complete purchase.

> Paddle Checkout only presents WeChat Pay as a payment method for one-time items priced in Chinese Yuan or US Dollar, where the customer address is in China.


HTTP 200
