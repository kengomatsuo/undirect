SOURCE https://developer.paddle.com/concepts/payment-methods/paypal.md
fetched 2026-11-23
> For the complete documentation index, see [llms.txt](https://developer.paddle.com/llms.txt).
>
> To search these docs, send a `GET` request to `https://paddle-docs-retrieval.kapa-paddle.workers.dev/?q=<question>` with a URL-encoded question. No authentication needed. It returns a JSON array of `{content, source_url}`, most relevant first.

# PayPal

Let customers pay with PayPal. No configuration required.

---

## Key attributes

| Attribute | Value |
| --- | --- |
| Countries | All |
| Currencies | All except ARS, CNY, COP, INR, KRW, TRY, TWD, UAH, VND, ZAR |
| Platforms | All |
| One-time items | Supported |
| Subscriptions | Supported |
| Capture | Instant |
| Chargebacks | Supported |
| Refunds | Supported |
| Installments | Supported — Varies by region |
| Can be presented when saved? | Not supported |
| Express checkout | Not supported |

PayPal is a digital wallet that lets customers pay for things online without having to enter card or bank details every time.

More than 400 million people use PayPal. It's especially popular in the United States, Germany, and the United Kingdom.

You don't need to set up a PayPal account to add PayPal as a payment option with Paddle

## How it works

{% journey %}
{% journey-step title="Customer chooses PayPal" %}

Turn on PayPal in a couple of clicks in your Paddle dashboard. Paddle automatically presents PayPal as a payment method for customers paying in a supported country and currency.

{% /journey-step %}

{% journey-step title="Customer logs in to PayPal" id="customer-signs-in-to-paypal" %}

Paddle Checkout presents a PayPal login screen. Customers log in to their account, or they can create a new one.

{% /journey-step %}

{% journey-step title="Customer selects payment method" %}

Once logged in, customers choose a saved payment method that they'd like to use to pay. PayPal supports cards, bank accounts, and other payment methods.

Customers can choose to pay with their [PayPal balance](https://www.paypal.com/us/cshelp/article/how-can-i-use-a-balance-with-paypal-help335), but must also select a backup payment method.

{% /journey-step %}

{% journey-step title="Payment complete" %}

If successful, Paddle Checkout shows a success screen or enters your success workflow.

{% /journey-step %}
{% /journey %}

## Accept PayPal

1. Go to **Paddle > Checkout > Checkout configuration**.
2. Expand **Payment methods**, then check **PayPal**.
3. Click **Save** to apply.

## Save PayPal at checkout

You can let customers securely save their PayPal for future purchases.

1. Go to **Paddle > Checkout > Checkout configuration**.
2. Expand **Saved payment methods**, then turn on **Allow saved cards**.
3. Click **Save** to apply.

## Test PayPal

You can test PayPal using your Paddle [sandbox account](https://developer.paddle.com/sdks/sandbox.md).

1. Turn on PayPal for your Paddle account.
2. Sign up for [a PayPal sandbox account](https://developer.paypal.com/tools/sandbox/accounts/#link-createandmanagesandboxaccounts). This is separate from your Paddle sandbox account.
3. Open a checkout and choose PayPal as the payment method.
4. Log in to your PayPal sandbox account and complete purchase.
HTTP 200
