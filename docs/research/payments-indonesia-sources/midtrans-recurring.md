---
updatedAt: 2025-11-11T00:12:45.000Z
agentTools:
  projectIndex: https://docs.midtrans.com/llms.txt
---

# One Click, Two Clicks, and Recurring Transaction

Card payment is easy and secure.\
However for customer of certain business model can be quite tedious having to re-input their Credit Card each time they want to make transaction (especially those with high frequency of transaction). Midtrans can improve payment experience by using following features:

# ONE CLICK

One Click allows merchant to securely save customer’s credit card details (including CVV) in a form of one-click-token in the initial transaction. Once the customer wants to do the next payment, merchant can easily retrieve the previously-saved credit card details using the token. Since card details are already stored, customer needs to do one simple step:

Trigger the payment (e.g click “**Pay Now**”)

<Image alt="Fig 1. One Click Payment Example" align="center" src="https://files.readme.io/a09b5e4-image.png">
  Fig 1. One Click Payment Example
</Image>

# TWO CLICKS

Two Clicks allows you to securely save customer’s credit card details (excluding CVV) in a form of two-click-token for the initial transaction. Once the customer wants to do the next payment, merchant can easily retrieve the previously-saved credit card details using the token. Since card details are already stored, customer needs to do two simple steps:

1. Enter their CVV,
2. Trigger the payment.

   <Image alt="Fig 2. Two Clicks Payment Example" align="center" src="https://files.readme.io/485906e-image.png">
     Fig 2. Two Clicks Payment Example
   </Image>

# RECURRING (SUBSCRIPTION)

Recurring allows you to securely save customer’s credit card details (including CVV) in a form of recurring-token. After initial payment, you can charge payment whenever your business want to charge the customer, such as for periodical subscription payment. The payment is triggered on merchant’s side, without any customer interaction.

Under the hood, recurring and one click is exactly same feature. The difference is what trigger the charge (logic in your server or customer action).

# HOW CAN IT HELPS YOUR BUSINESS GROW

Let’s get practical! These are some real life example on how your business can utilize this feature to improve customer experience, and more importantly increase conversion rate on your business (which means better revenue for your business). In the other hand, using One Click or Two Clicks is very convenient for repeated customers.

# Improve The Experience of Following Payment:

For ecommerce such as online shop, you should make sure payment experience for your customer is frictionless, use one click feature to save customer’s credit card payment details on the first time they do payment. Next time they want to make another payment, all they need to do is choose their saved card then click pay, without re-entering their card details anymore.

Two clicks is similar, but CVV need to be inputted for each transaction, this allow you to have additional layer of security for your customer before confirming payment. Choose one suit your needs.

Also suitable for:\
Online retail, online shop, online marketplace, digital product, topup, e-Money, in app purchase, and ecommerce in general.

# Automated Subscription / Recurring Payment:

For service that require periodical payment from your customer such as cloud service, you should make sure your customer pay their periodical subscription. Recurring payment feature come in handy, with this feature you can save card detail on customer’s first payment. Then you can conveniently charge your customer using their saved credit card details, scheduled automatically from your server whenever you want it to be charged (e.g weekly, monthly, annually, etc.). For the recurring charge, no customer interaction needed, your customer do not need to manually login to your web and pay.

Also suitable for:\
Insurance, tv/phone subscription, web/cloud hosting service, software as a service, and most of subscription based product/services (e.g SAAS, PAAS, IAAS, etc.).

# Auto Charge customer:

If your customer have to do frequent payment, such as taxi hailing app, you should make the payment flow painless. Recurring payment feature is a good fit, using this feature you can save card detail on customer’s first payment. Then you can conveniently charge your customer using their saved credit card details, automatically from your server with your defined trigger, such as when the taxi ride is complete. Your app payment experience would become much seamless.

Also suitable for:\
Convenient focused service, product/service with frequent transaction, hotel booking, ticket booking, ride hailing app, parking app, etc.

# Your Own Scenario:

You can always invent your own creative scenario that is suitable for your business model using those feature and the combination.

# GENERAL REQUIREMENT

* Two clicks is available if you already become active Midtrans’ merchant with activated credit card payment channel.
* One click / recurring / subscription needs additional bank’s approval and agreement, contact us to apply for this feature. Also charging is done via Core API.
* First transaction must be successful and in 3DS mode, in order to do following charge transaction.\
  Correctly follow our technical documentation on those features.

For further technical documentation on those features, please refer to:

* <https://snap-docs.midtrans.com/#other-features>
* <https://api-docs.midtrans.com/#card-features-one-click>

# SECURITY ASPECT

All these features use our tokenization process, you just need to store “token” in your side without storing real credit card data, it prevents credit card data breach. This token is valid only for your account.