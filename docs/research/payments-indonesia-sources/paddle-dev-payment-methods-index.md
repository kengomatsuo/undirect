SOURCE https://developer.paddle.com/concepts/payment-methods.md
fetched 2026-11-23
> For the complete documentation index, see [llms.txt](https://developer.paddle.com/llms.txt).
>
> To search these docs, send a `GET` request to `https://paddle-docs-retrieval.kapa-paddle.workers.dev/?q=<question>` with a URL-encoded question. No authentication needed. It returns a JSON array of `{content, source_url}`, most relevant first.

# Payment methods

Turn on new payment methods in a couple of clicks. No need to sign up for multiple merchant accounts, partner with different platforms, or write custom code.

---

As a merchant of record, payment methods like Apple Pay and Google Pay are already integrated with Paddle Checkout, ready to enable in a couple of clicks.

Plus, we handle payments at scale across thousands of businesses, meaning you benefit from conversion rates you couldn't negotiate alone.

{% card-group cols=3 %}
{% card title="Boost conversion rates" icon="carbon:analytics" %}
Offering digital wallets like PayPal and local payment methods can increase sales.
{% /card %}

{% card title="One single payments platform" icon="paddle" %}
Turn on new payment methods in seconds. No custom code, one centralized platform.
{% /card %}

{% card title="Intelligent routing for success" icon="carbon:ibm-dynamic-route-server" %}
Paddle routes every payment to the best acquirer for that sale to maximize the success rate.
{% /card %}
{% /card-group %}

## How payment methods work

You can turn payment methods on or off in **Paddle > Checkout > Checkout configuration**, and they're available to use at checkout automatically.

You can also check and change payment methods using the API. Send a `GET` request to the [`/settings/checkout-payment-methods`](https://developer.paddle.com/api-reference/settings/get-checkout-payment-method-settings.md) endpoint (Paddle CLI: `paddle settings checkout-payment-methods get`) to get every payment method, with whether you've turned it on and whether it's available on your account. Send a `PATCH` request to the [`/settings/checkout-payment-methods`](https://developer.paddle.com/api-reference/settings/update-checkout-payment-method-settings.md) endpoint (Paddle CLI: `paddle settings checkout-payment-methods update`) to turn payment methods on or off.

{% accordion %}
{% accordion-item title="Paddle determines which payment methods to show for you" %}

Paddle determines which payment methods to show to customers based on the transaction currency, location of the customer, and device used to purchase. For example:

- iDEAL is only presented to customers in the Netherlands for transactions in euro.
- Apple Pay is only presented when customers are using a compatible Apple device or browser.
- PayPal is only presented when making a purchase in a currency that PayPal supports.

Bank transfers are always turned on for invoices, though you can also include a Paddle Checkout link on invoices to let customers pay using another payment method.

{% /accordion-item %}
{% accordion-item title="Customers can save their payment methods for later" %}

Customers can check a box to save their payment method when making a purchase using Paddle Checkout.

When they come to purchase from you in the future, you can securely present them with their saved payment methods to speed up the checkout process.

{% /accordion-item %}
{% accordion-item title="Some payment method issuers offer credit installments" %}

Some payment method issuers may offer credit installments on eligible one-time purchases, letting customers pay for items over a period of time. This is sometimes called "buy now, pay later" or "pay in 3." For example, PayPal lets customers pay over three or four months.

Credit agreements for installment payment plans are between the customer making a purchase and the payment method issuer. They're not provided by Paddle, and Paddle doesn't determine which customers or purchases are eligible for installments.

When customers pay using installments, Paddle receives the full amount up front from the payment method issuer, and you receive this as part of your payouts as normal. Because the credit agreement is between the customer and payment method issuer, you're not responsible if a customer fails to make payments as part of their installment plan.

{% /accordion-item %}
{% /accordion %}

## Supported payment methods

- [Credit or debit cards](https://developer.paddle.com/concepts/payment-methods/card.md)
- [Alipay](https://developer.paddle.com/concepts/payment-methods/alipay.md)
- [Apple Pay](https://developer.paddle.com/concepts/payment-methods/apple-pay.md)
- [Bancontact](https://developer.paddle.com/concepts/payment-methods/bancontact.md)
- [Bank transfer](https://developer.paddle.com/concepts/payment-methods/wire-transfer.md)
- [BLIK](https://developer.paddle.com/concepts/payment-methods/blik.md)
- [Google Pay](https://developer.paddle.com/concepts/payment-methods/google-pay.md)
- [iDEAL | Wero](https://developer.paddle.com/concepts/payment-methods/ideal.md)
- [KakaoPay](https://developer.paddle.com/concepts/payment-methods/kakaopay.md)
- [Korean local cards](https://developer.paddle.com/concepts/payment-methods/korean-cards.md)
- [MB WAY](https://developer.paddle.com/concepts/payment-methods/mb-way.md)
- [Naver Pay](https://developer.paddle.com/concepts/payment-methods/naver-pay.md)
- [Payco](https://developer.paddle.com/concepts/payment-methods/payco.md)
- [PayPal](https://developer.paddle.com/concepts/payment-methods/paypal.md)
- [Pix](https://developer.paddle.com/concepts/payment-methods/pix.md)
- [Samsung Pay](https://developer.paddle.com/concepts/payment-methods/samsung-pay.md)
- [UPI](https://developer.paddle.com/concepts/payment-methods/upi.md)
- [WeChat Pay](https://developer.paddle.com/concepts/payment-methods/wechat.md)

## Compare payment methods

| Feature | Credit or debit cards | Apple Pay | Google Pay |
| --- | --- | --- | --- |
| Countries | All | All except IN, TR | All except IN, TR |
| Currencies | All | All | All |
| Platforms | All | iPhone, iPad, Safari on Mac | Android, Chromebook, Google Chrome |
| Capture | Instant | Instant | Instant |
| Available for | Checkout, Invoice | Checkout, Invoice | Checkout, Invoice |
| One-time items | Yes | Yes | Yes |
| Subscriptions | Yes | Yes | Yes |
| Refunds | Yes | Yes | Yes |
| Chargebacks | Yes | Yes | Yes |
| Can be saved | Yes | No | No |
| Express checkout | No | Yes | Yes |
| Installments | Yes | Yes | Yes |
HTTP 200
