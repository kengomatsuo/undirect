SOURCE https://developer.paddle.com/concepts/payment-methods/ideal.md
fetched 2026-11-23
> For the complete documentation index, see [llms.txt](https://developer.paddle.com/llms.txt).
>
> To search these docs, send a `GET` request to `https://paddle-docs-retrieval.kapa-paddle.workers.dev/?q=<question>` with a URL-encoded question. No authentication needed. It returns a JSON array of `{content, source_url}`, most relevant first.

# iDEAL | Wero

Let customers pay with iDEAL | Wero. No configuration required.

---

## Key attributes

| Attribute | Value |
| --- | --- |
| Countries | NL |
| Currencies | EUR |
| Platforms | All |
| One-time items | Supported |
| Subscriptions | Not supported |
| Capture | Instant |
| Chargebacks | Not supported |
| Refunds | Supported |
| Installments | Not supported |
| Can be presented when saved? | Not supported |
| Express checkout | Not supported |

iDEAL is an interbank system used in the Netherlands. All major banks in the Netherlands support iDEAL, and it's the most popular online payment method in the country.

iDEAL is becoming Wero, a new European payment method that's built on iDEAL. It's backed by major banks across the European Union. It's already live in France, Belgium, Germany, and Luxembourg.

Customers in the Netherlands see iDEAL | Wero as an option to pay. They authenticate and confirm payments using their banking app, making it quick and secure.

You don't need to set up a bank account in the European Union to add iDEAL | Wero as a payment option with Paddle.

## How it works

{% journey %}
{% journey-step title="Customer chooses iDEAL | Wero" %}

Turn on iDEAL | Wero in a couple of clicks in your Paddle dashboard. Paddle automatically presents iDEAL | Wero as a payment method for customers paying in a supported country and currency. Customers enter their name and choose their bank.

{% /journey-step %}

{% journey-step title="Customer starts confirmation" %}

If the customer is checking out on a desktop, they're prompted to scan a QR code with their phone. If they're on mobile, they're prompted to open their banking app.

{% /journey-step %}

{% journey-step title="Customer confirms purchase" %}

Customer confirms purchase on their phone using their banking app. The exact process varies depending on the banking app the customer uses, but typically they'll enter their card PIN or authenticate using on-device biometrics.

{% /journey-step %}

{% journey-step title="Payment complete" %}

If successful, Paddle Checkout shows a success screen or enters your success workflow.

{% /journey-step %}
{% /journey %}
## Accept iDEAL | Wero

1. Go to **Paddle > Checkout > Checkout configuration**.
2. Expand **Payment methods**, then check **iDEAL | Wero**.
3. Click **Save** to apply.

## Test iDEAL | Wero

You can test iDEAL | Wero using your Paddle [sandbox account](https://developer.paddle.com/sdks/sandbox.md).

1. Turn on iDEAL | Wero for your Paddle account.
2. Open a checkout for a one-time item that's priced in `EUR` (Euro).
3. Pick Netherlands as the country on the first screen of checkout, then enter an email and ZIP code.
4. Select iDEAL | Wero as the payment method, then enter a name and pick any bank in the list.
5. Click **Pay with iDEAL** and follow the prompts to complete purchase.

> Paddle Checkout only presents iDEAL | Wero as a payment method for one-time items priced in Euro, where the customer address is in Netherlands.


HTTP 200
