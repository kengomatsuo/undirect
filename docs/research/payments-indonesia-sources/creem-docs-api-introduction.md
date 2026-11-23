SOURCE https://docs.creem.io/api-reference/introduction.md
fetched 2026-11-23
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.creem.io/llms.txt
> Use this file to discover all available pages before exploring further.

# Introduction

> Everything you need to start integrating with the Creem API: endpoints, authentication, test mode, webhooks, and SDKs.

The Creem API is built on REST principles and uses HTTPS for all requests. It returns JSON-encoded responses and uses standard HTTP status codes.

## Base URL

All API requests are made to the following base URLs:

> [tab] Production
>
> `https://api.creem.io/v1`

> [tab] Test Mode
>
> `https://test-api.creem.io/v1`

> [!WARNING]
>
> The test and production environments are completely isolated. Data created in test mode does not
> affect your production environment, and API keys are not interchangeable between environments.

## Authentication

All API requests must include your API key in the `x-api-key` header.

```bash theme={null}
curl -X GET https://api.creem.io/v1/products \
  -H "x-api-key: creem_YOUR_API_KEY"
```

You can find your API keys in the [Developers section](https://creem.io/dashboard/developers) of your dashboard.

> [!WARNING]
>
> Never expose your API keys in client-side code, public repositories, or logs. Keep them
> server-side only.

## Test Mode

Test mode gives you a full sandbox environment to build and test your integration without processing real payments.

| | Production | Test Mode |
| - | - | - |
| **Base URL** | `https://api.creem.io/v1` | `https://test-api.creem.io/v1` |
| **API Keys** | Found in dashboard (production mode) | Found in dashboard (test mode toggle) |
| **Payments** | Real charges | Simulated with test cards |
| **Data** | Live data | Isolated sandbox data |

To activate test mode, toggle **Test Mode** in the bottom of the left sidebar of your [dashboard](https://creem.io/dashboard).

### Test Cards

Use these card numbers to simulate different payment scenarios. All cards work with any future expiration date, any CVV, and any billing information. Click a card number to copy it.

| Card Number | Behavior |
| - | - |
| `4111 1111 1111 1111` | Successful payment |
| `4507 9900 0000 0028` | Card declined |
| `4507 9900 0000 0010` | Insufficient funds |
| `4507 9900 0000 0044` | Incorrect CVC |

### Using Test Mode in Code

```bash cURL theme={null}
curl -X POST https://test-api.creem.io/v1/checkouts \
  -H "x-api-key: YOUR_TEST_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": "prod_YOUR_PRODUCT_ID",
    "success_url": "https://yoursite.com/success"
  }'
```

```typescript TypeScript SDK theme={null}
import { Creem } from "creem";

const creem = new Creem({
  apiKey: process.env.CREEM_API_KEY!,
  server: process.env.NODE_ENV === "production" ? "prod" : "test",
});

const checkout = await creem.checkouts.create({
  productId: "prod_abc123",
  successUrl: "https://yoursite.com/success",
});
```

```typescript Next.js theme={null}
import { Checkout } from "@creem_io/nextjs";

export const GET = Checkout({
  apiKey: process.env.CREEM_API_KEY!,
  testMode: process.env.NODE_ENV !== "production",
  defaultSuccessUrl: "/success",
});
```

## Webhooks

Creem sends real-time event notifications to your server via webhooks. Webhook payloads are signed using HMAC-SHA256 so you can verify their authenticity.

**Signature verification:** Every webhook request includes a `creem-signature` header. Verify it using your webhook secret (found in [Developers > Webhook](https://creem.io/dashboard/developers)) before processing the payload:

```typescript theme={null}
import { verifyWebhookSignature } from "creem/webhooks";

await verifyWebhookSignature(rawBody, request.headers, {
  secret: process.env.CREEM_WEBHOOK_SECRET!,
});
```

**Supported events:**

| Event | Description |
| - | - |
| `checkout.completed` | A checkout session was completed |
| `subscription.active` | A new subscription was created |
| `subscription.paid` | A subscription payment was collected |
| `subscription.canceled` | A subscription was canceled |
| `subscription.scheduled_cancel` | A subscription is scheduled for cancellation at period end |
| `subscription.past_due` | A subscription payment failed |
| `subscription.unpaid` | A subscription is unpaid after failed payment collection |
| `subscription.expired` | A subscription period ended without payment |
| `subscription.trialing` | A subscription started a trial |
| `subscription.paused` | A subscription was paused |
| `subscription.update` | A subscription was updated |
| `refund.created` | A refund was issued |
| `dispute.created` | A dispute was opened by a customer |
| `credits.granted` | Credits were added to a customer's account |
| `credits.consumed` | Credits were debited from a customer's account |
| `customer_credits.exhausted` | A customer's credits ran out during usage settlement |
| `credits.auto_recharged` | A customer's credits were refilled automatically |

**Retry policy:** If your endpoint doesn't respond with HTTP 200, Creem retries at 30 seconds, 5 minutes, 30 minutes, and 6 hours — 5 attempts in total, and never after 24 hours. The same event can arrive more than once, so keep your handler idempotent. You can also resend events manually from the dashboard.

> [card] [Full Webhooks Guide](https://docs.creem.io/code/webhooks.md)
>
> Detailed setup instructions, signature verification, and event payload examples.

## Response Codes

| Status | Description |
| - | - |
| `200` | Successful request |
| `400` | Invalid parameters or validation error |
| `401` | Missing API key |
| `403` | Invalid API key or insufficient permissions |
| `404` | Resource not found |
| `429` | Rate limit exceeded |
| `500` | Internal server error |

Every error response includes a `trace_id` you can share with support for faster debugging. See [Error Handling](https://docs.creem.io/api-reference/error-codes.md) for details.

## SDKs & Libraries

> [card] [TypeScript SDK](https://docs.creem.io/code/sdks/typescript.md)
>
> Core SDK for Node.js and TypeScript projects

> [card] [Next.js Adapter](https://docs.creem.io/code/sdks/nextjs.md)
>
> Drop-in checkout and webhook helpers for Next.js

> [card] [Better Auth Plugin](https://docs.creem.io/code/sdks/better-auth.md)
>
> Integrate Creem billing with Better Auth

> [card] [Convex Component](https://docs.creem.io/code/sdks/convex/quickstart.md)
>
> Webhook-synced billing with React and Svelte widgets for Convex apps

> [card] [CLI](https://docs.creem.io/code/cli.md)
>
> Manage products and checkouts from the terminal


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.
HTTP 200
