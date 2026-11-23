# Managed Payments

Sell digital products globally with the Stripe merchant of record solution for tax, fraud, disputes, and support.

Use Managed Payments to sell digital products such as SaaS, software, and digital content or downloads. The Stripe merchant of record solution handles sales tax, VAT, and GST compliance in more than 80 countries, along with fraud prevention, dispute management, and transaction-level customer support.

## Get started

[How Managed Payments works](https://docs.stripe.com/payments/managed-payments/how-it-works.md): Learn how Managed Payments works.

[Managed Payments eligibility](https://docs.stripe.com/payments/managed-payments/eligibility.md): Learn which products, countries, and integrations are supported.

[Tax compliance with Managed Payments](https://docs.stripe.com/payments/managed-payments/tax-compliance.md): Learn how Managed Payments handles sales tax, VAT, and GST compliance in more than 80 countries.

## Use cases

[Build a Checkout integration](https://docs.stripe.com/payments/managed-payments/set-up.md): Build a new Checkout integration with Managed Payments enabled.

[Update your Checkout integration](https://docs.stripe.com/payments/managed-payments/update-checkout.md): Update an existing Checkout integration to use Managed Payments.

[Create payment links](https://docs.stripe.com/payments/managed-payments/use-payment-links.md): Create payment links with Managed Payments enabled to start collecting payments for digital products.

[Accept mobile app payments](https://docs.stripe.com/payments/managed-payments/set-up-mobile.md): Use Managed Payments to accept payments from a mobile app.

## Compare Managed Payments with other Stripe products

|  | **Managed Payments** | **Other Stripe products** |
| --- | --- | --- |
| **Merchant of record** | Stripe | Your business |
| **Manage indirect tax compliance** | ✓ Supported 1 | Available with [Tax](https://docs.stripe.com/tax.md) |
| **Checkout page compatible with** | [Checkout](https://docs.stripe.com/payments/checkout.md), [Payment Links](https://docs.stripe.com/payment-links.md) | [Checkout](https://docs.stripe.com/payments/checkout.md), [Elements](https://docs.stripe.com/payments/elements.md), [hosted invoice page](https://docs.stripe.com/invoicing/hosted-invoice-page.md), [Payment Links](https://docs.stripe.com/payment-links.md) |
| **Support for subscriptions** | Available with [Billing](https://docs.stripe.com/billing.md) | Available with [Billing](https://docs.stripe.com/billing.md) |
| **Protect against fraud** | ✓ Supported | Available with [Radar](https://docs.stripe.com/radar.md) |
| **Respond to disputes** | ✓ Supported | Available with [Payments](https://docs.stripe.com/disputes/smart-disputes.md) |
| **Transaction-level customer support** | ✓ Supported | - Unsupported |
| **Support for platforms** | - Unsupported | Available with [Connect](https://docs.stripe.com/connect.md) |

1 Managed Payments handles [indirect tax compliance](https://docs.stripe.com/payments/managed-payments/tax-compliance.md) (sales tax, VAT, and GST) on transactions in more than 80 countries.

## Unsupported integrations

Managed Payments doesn’t support:

- Stripe [Connect](https://docs.stripe.com/connect.md) (platform or marketplace integrations)
- Payment flows that use [Elements with the Checkout Sessions API](https://docs.stripe.com/payments/quickstart.md) or [advanced integrations](https://docs.stripe.com/payments/advanced.md) with the Payment Intents API
- Attaching [invoice items](https://docs.stripe.com/billing/invoices/subscription.md#adding-upcoming-invoice-items) on a `Customer` object to a Managed Payments subscription
- Generating a [one-off invoice](https://docs.stripe.com/billing/invoices/subscription.md#generating-invoices) on a `Customer` object or for a subscription outside the billing period
- Creating a subscription outside of Checkout or Payment Links
- Third-party tax integrations
