SOURCE https://developer.paddle.com/concepts/payment-methods/upi.md
fetched 2026-11-23
> For the complete documentation index, see [llms.txt](https://developer.paddle.com/llms.txt).
>
> To search these docs, send a `GET` request to `https://paddle-docs-retrieval.kapa-paddle.workers.dev/?q=<question>` with a URL-encoded question. No authentication needed. It returns a JSON array of `{content, source_url}`, most relevant first.

# UPI

Let customers pay with UPI. No configuration required.

---

## Key attributes

| Attribute | Value |
| --- | --- |
| Countries | IN |
| Currencies | INR |
| Platforms | All |
| One-time items | Supported |
| Subscriptions | Supported |
| Capture | Deferred |
| Chargebacks | Supported |
| Refunds | Supported |
| Installments | Not supported |
| Can be presented when saved? | Not supported |
| Express checkout | Not supported |

UPI (Unified Payments Interface) is a realtime payment system that lets customers in India link multiple bank accounts to a single app for instant digital payments.

It's the main way to pay online in India, processing the majority of transactions in the country. You can accept UPI for one-time purchases and subscriptions, with payments processed in Indian Rupee.

You don't need to set up a bank account in India or sign up for a UPI merchant account to add UPI as a payment option with Paddle.

{% card-group cols=3 %}
{% card title="primary market" stat="IN" statColor="blue" %}
More than 80% of digital payments in India go through UPI.
{% /card %}

{% card title="active users" stat="~350m" statColor="purple" %}
Supported by over 600 banks, UPI has over 350 million active users.
{% /card %}

{% card title="processed per year" stat="$3.3tn" statColor="green" %}
In FY 2025, UPI processed over 185 billion transactions worth ₹261 trillion.
{% /card %}
{% /card-group %}

{% collapsible title="Popular supported banks" %}

- AU small Finance Bank
- Axis Bank Ltd
- Bank of Baroda
- Bank of India
- Bank of Maharashtra
- Bharat Co-operative Bank
- Canara Bank
- Central Bank of India
- City Union Bank
- CSB Bank Ltd
- DBS Bank Ltd
- DCB Bank
- Dhanlaxmi Bank Ltd
- Equitas Small Finance Bank
- HDFC Bank Ltd
- ICICI Bank
- Indian Bank
- IndusInd Bank
- Janata Sahakari Bank Ltd. Pune
- Karur Vysya Bank
- Kotak Mahindra Bank
- NKGSB Bank
- Punjab and Sind Bank
- Punjab National Bank
- RBL Bank
- Saraswat Bank
- South Indian Bank
- State Bank of India
- Suryoday Small Finance Bank Ltd.
- Tamilnadu Mercantile Bank
- TJSB Sahakari Bank Ltd
- UCO Bank
- Union Bank of India
- Yes Bank Ltd

For a full list, see [UPI global acceptance](https://www.npci.org.in/what-we-do/upi-global/upi-global-acceptance/live-members).
{% /collapsible %}

{% collapsible title="Popular supported apps" %}

- BHIM
- Aditya Birla
- Canara Bank (ai1)
- DBS Bank Ltd (digi bank by DBS India)
- Dhanlaxmi Bank (BHIM DLB UPI)
- Federal Bank (FedMobile)
- Freecharge
- GPay
- Groww
- ICICI Bank (iMobile)
- Indian Bank (IndOASIS)
- Indian Overseas Bank (BHIM IOB UPI)
- IndusInd Bank (BHIM Indus Pay)
- Jio (Jio Finance App)
- Karnataka Bank (BHIM KBL UPI)
- Karur Vysya Bank (BHIM KVB Upay)
- Paytm
- Phonepe
- Punjab National Bank (BHIM PNB)
- South Indian Bank (SIB Mirror+)
- State Bank of India (BHIM SBIPay)
- TATA Neu
- UCO Bank (BHIM UCO)
- WhatsApp Pay

For a full list, see [UPI global acceptance](https://www.npci.org.in/what-we-do/upi-global/upi-global-acceptance/live-members).
{% /collapsible %}

{% callout type="info" %}
UPI has a maximum transaction total of 100,000 `INR`. For subscriptions, the maximum is 15,000 `INR` per renewal. If a checkout that includes a recurring item totals more than 15,000 `INR`, including any one-time prices in the same checkout, Paddle doesn't present UPI as a payment method.
{% /callout %}

## How it works

{% journey %}
{% journey-step title="Customer chooses UPI" %}

Turn on UPI in a couple of clicks in your Paddle dashboard. Paddle automatically presents UPI as a payment method for customers paying in India in `INR`, on desktop and mobile.

{% /journey-step %}

{% journey-step title="Customer starts confirmation" %}

On desktop, customers scan a QR code with their phone.

On mobile, customers choose their preferred UPI app to complete the payment.

{% /journey-step %}

{% journey-step title="Customer confirms purchase" %}

Customer confirms the purchase on their phone using their UPI app. The exact process varies, but typically they'll authenticate using their PIN or on-device biometrics.

If the customer is paying for a subscription, they'll also set up [a UPI Autopay e-mandate](https://www.bhimupi.org.in/upiautopay) where they consent to recurring payments.

{% /journey-step %}

{% journey-step title="Payment authorized" %}

Payment is authorized, and Paddle Checkout shows a screen that confirms the checkout is completed, but the payment is pending capture.

{% /journey-step %}

{% journey-step title="Payment completed" %}

After authorization, payment is captured. This typically happens immediately, but can take up to ten minutes.

The transaction is marked as completed in Paddle, and the customer receives a copy of their invoice by email.

{% callout type="info" %}
UPI e-mandate rules mean subscription renewals take at least 24 hours to complete.
{% /callout %}

{% /journey-step %}
{% /journey %}

## Things to know

Recurring payments using UPI are processed using [UPI Autopay](https://www.npci.org.in/product/autopay), a system run by the National Payments Corporation of India (NPCI) that lets customers set up an e-mandate to authorize recurring payments.

NPCI put restrictions on how UPI Autopay can be used, which means there are some limitations on how you can use UPI for subscriptions.

### Mid-cycle changes to a subscription

A UPI e-mandate authorizes a specific amount, which Paddle calculates from the non-discounted recurring amount. Once an e-mandate is in place, Paddle can't charge more than this amount, and it can't make immediate, unscheduled charges against the mandate. This impacts how mid-cycle changes to a subscription work, including:

- Plan upgrades and downgrades
- Quantity changes
- Adding or removing a product
- Adding or removing a discount

When you make one of these changes, you should use a next billing period [proration billing mode](https://developer.paddle.com/concepts/subscriptions/proration.md). For example, `prorated_next_billing_period` or `full_next_billing_period`. This applies the change at the next renewal instead of charging immediately.

{% callout type="warning" %}
Immediate proration modes attempt a charge that's considered outside of the mandate, so the payment fails.
{% /callout %}

What happens next depends on whether the change increases or decreases the recurring amount:

- **Decreasing the amount**, like a downgrade, works automatically. The new amount is lower than the existing mandate, so the next renewal collects the lower amount and the customer doesn't need to do anything.
- **Increasing the amount**, like an upgrade, needs a new mandate. The new amount is more than the existing mandate, so the next renewal fails and the subscription becomes `past_due`. The customer can [update their payment method](https://developer.paddle.com/build/subscriptions/update-payment-details.md) to authorize a new mandate for the new amount. If you use [Paddle Retain](https://developer.paddle.com/concepts/retain/payment-recovery-dunning.md), payment recovery prompts the customer and recovers the payment for you.

### One-off charges against a subscription aren't supported

UPI e-mandates don't support one-off charges. This means [billing a one-time charge against a subscription](https://developer.paddle.com/build/subscriptions/bill-add-one-time-charge.md) that's paid using UPI returns a `payment_declined` error.

For a one-off charge, [create a transaction](https://developer.paddle.com/build/transactions/create-transaction.md) for it and [pass it to a checkout](https://developer.paddle.com/build/transactions/pass-transaction-checkout.md). This isn't linked to the customer's existing subscription.

### Renewal payments can take at least 24 hours

The initial payment is made while the customer is present at checkout, so it's completed quickly. It's typically captured immediately, but within ten minutes.

Subscription renewals work differently because the customer isn't present. At renewal, the customer receives a pre-debit notification, then banks must wait at least 24 hours from this notification before they attempt to collect payment. This is a requirement of NPCI regulations.
## Accept UPI

1. Go to **Paddle > Checkout > Checkout configuration**.
2. Expand **Payment methods**, then check **UPI**.
3. Click **Save** to apply.

## Test UPI

You can test UPI using your Paddle [sandbox account](https://developer.paddle.com/sdks/sandbox.md).

1. Turn on UPI for your Paddle account.
2. Open a checkout for an item that's priced in `INR` (Indian Rupee).
3. Pick India as the country on the first screen of checkout, then enter an email.
4. Select UPI as the payment method, then enter a name, first line of address, and PIN.
5. Click **Pay with UPI** and follow the prompts to complete purchase.

> Paddle Checkout only presents UPI as a payment method for items priced in Indian Rupee, where the customer address is in India.


HTTP 200
