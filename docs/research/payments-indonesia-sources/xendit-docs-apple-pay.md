---
title: "Apple Pay"
slug: "apple-pay"
updated: 2026-08-04T04:55:06Z
published: 2026-08-04T04:55:06Z
canonical: "docs.xendit.co/apple-pay"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.xendit.co/llms.txt
> Use this file to discover all available pages before exploring further.

# Apple Pay

Apple Pay allows you to accept card payments through Apple's digital wallet on supported [Apple devices and browsers](https://support.apple.com/en-gb/102896). With Xendit, Apple Pay is processed through your existing Cards payment channel, enabling customers to complete payments using cards stored in Apple Wallet.

Apple Pay acts as a digital wallet that facilitates transactions using an underlying payment method, such as cards. The underlying funding source determines:

- Available payment capabilities and features
- The payment channel recorded for the transaction
- Applicable pricing and processing fees
- Settlement and reporting behaviour

## Supported Use Cases

Apple Pay availability depends on the countries and regions supported by Apple Pay. For the latest list of supported countries and regions, refer to Apple’s [Countries and regions that support Apple Pay](https://support.apple.com/en-sg/102775) documentation.

| Supported Channels *(the transaction will be processed and reported under the selected funding source.)* | Cards |
| --- | --- |
| Supported Payment Flows | - One time payment - Recurring |

## Supported Integration

Apple Pay is supported in [Payment Session](/v1/docs/payment-sessions-overview), including:

- [Xendit payment links (hosted page)](/v1/docs/creating-payment-links#how-to-create-a-payment-link)
- [Xendit Components (embedded mode)](/v1/docs/components-overview#high-level-flow)

Apple Pay will be available in Payment Session when:

- The Session country supports Apple Pay.
- At least one Apple Pay–compatible funding source (e.g., Cards) is available.
- A valid domain name has been provided in the Xendit Dashboard (required for Xendit Components integration).

**Payment Links**

Apple Pay is supported by default when using the Xendit-hosted page (payment Links mode). Apple Pay button will automatically be displayed on the Xendit-hosted page if:

- The customer's device and browser support Apple Pay.
- The customer's card issuer supports Apple Pay.
- The underlying card payment method is activated on your Xendit account.

## How it works

1. Create a Payment Session using the Payment Sessions API.
2. Redirect your customer to the Xendit-hosted payment page.
3. If the customer's device and browser support Apple Pay, the Apple Pay button is displayed automatically.
4. The customer selects Apple Pay and authenticates the payment using Face ID, Touch ID, or device passcode.
5. Xendit processes the transaction using the selected card funding source.
6. You receive the payment result through the standard Payment Sessions flow.

No additional frontend implementation is required.

To integrate Payment Links, see the documentation for our [Payment Session API](https://docs.xendit.co/docs/how-payment-sessions-work)

**Xendit Components**

Apple Pay is supported on Xendit Components. Unlike Payment Links, Components are rendered directly on your checkout page. Because Apple Pay is displayed on your domain, Apple Pay domain verification must be completed before Apple Pay can be enabled.

> Always check your domain in the Xendit Dashboard to ensure it is up to date.

## Prerequisites

Before using Apple Pay on Xendit Components, ensure that:

- Apple Pay is enabled for your Xendit account.
- Your checkout domain has been successfully verified for Apple Pay and registered in the Xendit Dashboard.
- At least one Apple Pay-compatible funding source (e.g., Cards) is enabled and available in the Payment Session.
- The Payment Session is created using a country supported by Apple Pay.

## How to integrate

1. Follow the Xendit Components implementation guidelines [here](https://docs.xendit.co/docs/components-overview).
2. Integrate the [Apple Pay JS API](https://developer.apple.com/documentation/applepayontheweb/apple-pay-js-api) on your checkout page.
3. Render Apple Pay using one of the following approaches:

a. Automatic rendering (Channel Picker): If Apple Pay is available for the Payment Session and the customer's device supports Apple Pay, the Apple Pay button will automatically appear at the top of the Channel Picker.

b. Manual rendering: You may manually render an Apple Pay button using the Xendit Digital Wallet Component:

```javascript
createDigitalWalletComponent("APPLE_PAY")
```

Once the customer authorizes the payment through Apple Pay:

- The payment submission flow is triggered automatically.
- The behavior is equivalent to calling `submit()`on the Component.

## Compliance Requirements

To use Apple Pay, merchants must comply with Apple's policies, guidelines, and terms of use. Merchants are responsible for ensuring that their business model, products, services, and implementation of Apple Pay comply with Apple's requirements, including but not limited to:

- [Acceptable Use Guidelines for Apple Pay on the Web](https://developer.apple.com/apple-pay/acceptable-use-guidelines-for-websites/)
- [Apple Pay Marketing Guidelines](https://developer.apple.com/apple-pay/marketing/)

Failure to comply with Apple's requirements may result in Apple Pay being restricted, suspended, or removed for the affected merchant.

> [!WARNING]
> Xendit reserves the right to disable or restrict Apple Pay for merchants whose business activities, products, services, MCCs, or implementation do not comply with Apple's requirements or applicable regulatory obligations.

## Card Transactions (DPAN vs MPAN)

There are two main Apple Pay card transaction scenarios:

1. Device Primary Account Number (DPAN)

When a customer adds a card to Apple Wallet on a supported Apple device, Apple Pay provisions a network token known as a Device Primary Account Number (DPAN).

DPANs are device-specific tokens that are commonly used for one-time payments. Transactions processed using a DPAN are generally considered strongly authenticated because the customer must authorize the payment using Face ID, Touch ID, or device passcode.
2. Merchant Primary Account Number (MPAN)

For recurring payments, subscriptions, and card-on-file use cases, Apple Pay may provide a Merchant Primary Account Number (MPAN).

Unlike a DPAN, which is tied to a specific device, an MPAN is associated with the merchant-customer relationship and is designed to support ongoing payment experiences.

## Refund

You can partially or fully refund any successful payment made through Apple Pay. Refunds follow the same process as the underlying payment channel (for example, Cards). Refer to our [Refunds](https://docs.xendit.co/docs/cards-refund-a-card-payment) documentation for more information.
