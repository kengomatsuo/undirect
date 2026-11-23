---
title: "Google Pay"
slug: "google-pay"
updated: 2026-10-07T08:42:47Z
published: 2026-10-07T08:42:47Z
canonical: "docs.xendit.co/google-pay"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.xendit.co/llms.txt
> Use this file to discover all available pages before exploring further.

# Google Pay

Google Pay™ allows customers to pay using cards and other supported payment methods stored in their Google Wallet across Android devices and supported web browsers.

When integrating Google Pay with Xendit, you can accept securely tokenized payment credentials while reducing checkout friction and improve conversion

Google Pay is **not a payment channel**, rather it facilitates transactions using another underlying channel (e.g. cards). The underlying funding source (for example, `CARDS`, `TOUCHNGO`) determines:

- Capability and channel features
- The recorded payment channel in transactions
- Pricing and processing fees
- Settlement and reporting behavior

If a payment is initiated via Google Pay, Xendit will provide an identifier indicating that the transaction originated from Google Pay.

# Supported payment channels

|  | Google Pay Cards | Google Pay Wallet |
| --- | --- | --- |
| **Payment channel supported** | CARDS | TOUCHNGO |
| **Country** | Singapore, Phillipines, Malaysia, Thailand, Vietnam, Hongkong, Mexico | Malaysia |
| **Currencies** | SGD, PHP, MYR, THB, VND, HKD, MXN | MYR |
| **Supported use cases** | - One time payment - Recurring payment | One time payment |

## Supported integration

Google Pay is supported in [**Payment Session** integrations](/v1/docs/how-payment-sessions-work), including:

- [**Xendit-hosted page (Payment Link mode)**](/v1/docs/payment-1)
- [**Xendit Components (embedded mode)**](/v1/docs/components-overview) - coming soon for Google Pay with Components

Google Pay will be available in a Payment Session when:

- The Session country supports Google Pay.
- At least one Google Pay–compatible funding source (e.g., Cards) is available.
- A valid Google Merchant ID has been provided in the Xendit Dashboard (required for Xendit Components integration). - coming soon

**Payment Links**

Google Pay is supported by **default** in Payment Session when using the Xendit-hosted page (Payment Link mode). The Google Pay button will automatically appear when the customer’s device and browser support Google Pay and the underlying funding source is activated on your account.

> You do **not** need to provide your own Google Merchant ID when using the Xendit-hosted page integration.

## How to integrate

1. You create a Payment Session via API.
2. The customer opens the Xendit-hosted payment page.
3. If the customer’s environment supports Google Pay, the button appears automatically.
4. The customer selects Google Pay, confirms the payment, and completes authentication.
5. The payment is processed using the selected funding source.

No additional frontend implementation is required.

To integrate Payment Links, see the documentation for our [Payment Session API](/v1/docs/how-payment-sessions-work).

**Xendit Components**

> [!WARNING]
> Coming Soon

## Liability shifts

Liability shift behavior for Google Pay depends on the **underlying funding source** used in the transaction. Google Pay itself does not independently determine [liability shift](/v1/docs/cards-authentication-3ds2#liability-shift). The rules are governed by the underlying payment rail (e.g., Cards, Touch ‘n Go, ShopeePay).

### Card Transactions (DPAN vs FPAN)

There are three main Google Pay card scenarios:

**1. Device Token (DPAN)**

If a customer adds a card to the Google Pay app on their mobile device, the card is stored as a **Device Primary Account Number (DPAN)**. Transactions considered strongly authenticated which typically does not require additional 3D Secure and have the liability as default

**2. Browser-Saved Card (FPAN)**

If a customer adds a card to Chrome or another Google property, it may be stored as a **Funding Primary Account Number (FPAN)**. Transactions will be treated similarly to a standard card-not-present transaction where 3D Secure is recommended to qualify for liability shift. Without 3D Secure, liability shift is generally not guaranteed.

### Alternative Payment Methods (APMs)

When Google Pay is used with alternative payment methods such as Touch ‘n Go, ShopeePay, etc. The liability and dispute handling rules follow the respective provider’s policies.

In most cases, wallet-based rails operate under their own authorization and dispute models rather than traditional card chargeback rules.

## **Refunds**

You can partially or fully refund any successful Google Pay payment. The refund process is the same as that for underlying rails payments. See our refund documentation to perform a refund.
