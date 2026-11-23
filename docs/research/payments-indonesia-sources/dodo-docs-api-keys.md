SOURCE https://docs.dodopayments.com/api-reference/introduction.md
fetched 2026-11-23
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.dodopayments.com/llms.txt
> Use this file to discover all available pages before exploring further.

# API Reference

> REST API for payments, subscriptions, customers, and billing. Authenticate with API keys and handle webhooks for real-time events.

> [card] [SDKs & Libraries](https://docs.dodopayments.com/developer-resources/dodo-payments-sdks.md)
>
> Official backend SDKs for TypeScript, Python, Go, PHP, Java, Kotlin, C#, Ruby, and Rust. These libraries handle authentication, serialization, and error handling so you can focus on your integration.

> [card] [Mobile Checkout SDKs](https://docs.dodopayments.com/developer-resources/mobile-integration.md)
>
> Open Dodo's hosted checkout from Android, iOS, React Native, and Flutter apps and get a typed result back in one call. These SDKs hold no API key.

## Environment URLs

* **Test Mode**: `https://test.dodopayments.com`
* **Live Mode**: `https://live.dodopayments.com`

> [!NOTE]
>
> Learn more about [Test Mode vs Live Mode](https://docs.dodopayments.com/miscellaneous/test-mode-vs-live-mode.md).

## Authentication

API requests require an API key, except a few public endpoints such as [Activate License](https://docs.dodopayments.com/api-reference/licenses/activate-license.md), [Validate License](https://docs.dodopayments.com/api-reference/licenses/validate-license.md), and [Deactivate License](https://docs.dodopayments.com/api-reference/licenses/deactivate-license.md). Generate one in your dashboard and include it in the `Authorization` header of every request.

**1. Generate an API Key**

Go to **Developer → API Keys** in your dashboard and select **Create New Key**. Create the key in the mode you want to call: a test mode key works only with `https://test.dodopayments.com`, and a live mode key works only with `https://live.dodopayments.com`. Enter a **Key Name**, then set **None**, **Read**, or **Write** access for each resource, such as Payments, Refunds, Subscriptions, Products, Customers, Webhooks, or Moderation. **Write** includes **Read**, and Payouts and Balances are read-only. Use **Select all** to set every resource at once.

You can give a key only the access that you have yourself. If your role lacks access to a resource, the dashboard hides it or limits it to **Read**.

A request the key has no access for returns `403` with the `INSUFFICIENT_PERMISSION` [error code](https://docs.dodopayments.com/api-reference/error-codes.md). To change a key's access later, use **Edit Permissions** on the key.

To limit where the key can be used, enter IPv4 or IPv6 addresses or CIDR ranges in **IP Allowlist**, one on each line, up to 20 entries. Leave it empty to allow any IP address. A request from an address that is not on the list returns `403` with the `IP_ADDRESS_NOT_ALLOWED` error code. The **IP Access** column of the API keys table shows each key's allowlist.

> [!TIP]
>
> Grant each key only the access its integration needs. For example, give an analytics tool **Read** access, and a refunds bot **Write** access to Refunds and **Read** access to Payments.

> [!NOTE]
>
> Keys created before per-resource access keep their original reach: a key with write access can read and write every API resource, and a read-only key can read every API resource.

**2. Store Your Key Securely**

Copy the key immediately. You won't see it again. Store it in an environment variable such as `DODO_PAYMENTS_API_KEY`.

The prefix shows which mode a key belongs to: test mode keys start with `dodo_test_`, and live mode keys start with `dodo_live_`. The **Key** column of the API keys table shows the prefix of each key. A prefixed key sent to the other mode's environment returns `401` with a message that names its mode. Keys created before prefixes were added have no prefix and keep working.

**3. Authenticate Requests**

Include your API key in the `Authorization` header of every request:

```bash theme={null}
Authorization: Bearer dodo_test_...
```

> [!WARNING]
>
> Never expose your API key in client-side code, public repositories, or version control.

> [!TIP]
>
> CI/CD pipelines and cloud workloads can authenticate without a stored API key. Exchange a platform-issued token at `POST /workload-identity/token` and send the returned access token in the same `Authorization: Bearer` header. See [Workload Identity](https://docs.dodopayments.com/developer-resources/workload-identity/overview.md).

## Response Format

Successful requests return `200` or `201` with a JSON body, or `204` with no body. Errors return a `4xx` or `5xx` status with a JSON body that contains a `code` and a `message`.

```json Success theme={null}
{
  "payment_id": "pay_gr4RizvMOXFJ6xca3y2tU",
  "status": "succeeded",
  "total_amount": 2999,
  "currency": "USD",
  "created_at": "2024-01-15T10:30:00Z"
}
```

```json Error theme={null}
{
  "code": "INVALID_REQUEST_BODY",
  "message": "Your request body is invalid. Please check your request headers and object."
}
```

## Rate Limits

The API enforces two limits at once: a per-second burst limit and a per-minute sustained limit. Limits apply to your business as a whole, across all of its API keys, and depend on your business's rate limit tier.

### Default Tier

| Window | Limit |
| - | - |
| Per Second (Burst) | 40 requests |
| Per Minute (Sustained) | 240 requests |

### Higher Tiers

Businesses with increased API needs can upgrade to higher rate limits:

| Tier | Burst (per second) | Sustained (per minute) |
| - | - | - |
| Default | 40 | 240 |
| Tier 1 | 100 | 1,000 |
| Tier 2 | 500 | 5,000 |

> [!TIP]
>
> To upgrade your rate limit tier, email [support@dodopayments.com](mailto:support@dodopayments.com).

### Unauthenticated Requests

Requests without a valid API key are rate limited by IP address:

| Window | Limit |
| - | - |
| Per Second (Burst) | 20 requests |
| Per Minute (Sustained) | 100 requests |

### Invoice Downloads

The invoice PDF endpoints, such as [Get Payment Invoice](https://docs.dodopayments.com/api-reference/payments/get-invoice.md), `GET /invoices/refunds/{refund_id}`, and `GET /invoices/payouts/{payout_id}`, have their own limits:

| Scope | Limit |
| - | - |
| Per record (one payment, refund, or payout) | 5 requests per minute |
| Per client IP address | 20 requests per minute |

When either limit is exceeded, the endpoint returns `429 Too Many Requests`. To fetch many invoices, space out your requests.

### Rate Limit Headers

Responses include headers that show your current usage:

* `X-RateLimit-Limit` — Maximum requests allowed in the current window.
* `X-RateLimit-Remaining` — Requests remaining before you hit the limit.
* `X-RateLimit-Reset` — Seconds until the current window resets.

When you exceed the limit, the API returns `429 Too Many Requests`. Implement exponential backoff in your retry logic.

## Error Handling

To find what an error means and how to resolve it, see the error codes and transaction failures pages.

> [card] [Error Codes](https://docs.dodopayments.com/api-reference/error-codes.md)
>
> Complete list of error codes and their meanings.

> [card] [Transaction Failures](https://docs.dodopayments.com/api-reference/transaction-failures.md)
>
> Common transaction issues and how to handle them.

## Webhooks

Receive real-time notifications when payments, subscriptions, and other events occur. Set up webhooks in your dashboard and handle the events your integration needs.

> [card] [Webhook Guide](https://docs.dodopayments.com/developer-resources/webhooks.md)
>
> Set up webhooks, handle events, and verify signatures.

## Integration Guides

Start with one of these guides to build your first integration:

> [card] [One-time Payments](https://docs.dodopayments.com/developer-resources/integration-guide.md)
>
> Create checkout sessions, payment links, and handle payments.

> [card] [Subscriptions](https://docs.dodopayments.com/developer-resources/subscription-integration-guide.md)
>
> Set up recurring billing, manage plans, and handle lifecycle events.

> [card] [Usage-Based Billing](https://docs.dodopayments.com/developer-resources/usage-based-billing-guide.md)
>
> Meter usage and charge customers based on consumption.

> [card] [Checkout Sessions](https://docs.dodopayments.com/developer-resources/checkout-session.md)
>
> Create secure, hosted checkout experiences.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.
HTTP 200
