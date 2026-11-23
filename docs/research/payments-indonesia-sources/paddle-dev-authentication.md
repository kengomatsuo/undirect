> For the complete documentation index, see [llms.txt](https://developer.paddle.com/llms.txt).
>
> To search these docs, send a `GET` request to `https://paddle-docs-retrieval.kapa-paddle.workers.dev/?q=<question>` with a URL-encoded question. No authentication needed. It returns a JSON array of `{content, source_url}`, most relevant first.

# Authentication

Use Bearer authentication when making requests to the Paddle API. Get a key from Paddle > My account > Settings > Authentication.

---

All requests to the Paddle API require authentication unless explicitly stated. The API uses Bearer authentication.

To authenticate, pass your Paddle API key using the `Authorization` header and the `Bearer` prefix. For example:

```bash
Authorization: Bearer pdl_live_apikey_<example key from Paddle docs, redacted>
```

{% callout type="note" %}
To test your authentication, follow the [Quickstart](https://developer.paddle.com/api-reference/about.md).
{% /callout %}

## Authentication methods

Paddle offers two kinds of authentication methods:

{% feature-comparison %}
{% feature-column title="API keys" %}
{% feature-item %}
Used to interact with the Paddle API in your backend. For example, building subscription upgrade and downgrade workflows.
{% /feature-item %}
{% feature-item %}
Intended only for server-side use.
{% /feature-item %}
{% feature-item %}
May have full access to your data, depending on the permissions assigned to the API key.
{% /feature-item %}
{% feature-item %}
Must be kept secure and secret and not published in your app code.
{% /feature-item %}
{% /feature-column %}
{% feature-column title="Client-side tokens" %}
{% feature-item %}
Used to work with Paddle.js in your frontend. For example, launching a checkout and previewing prices or transactions.
{% /feature-item %}
{% feature-item %}
Intended only for client-side use.
{% /feature-item %}
{% feature-item %}
Limited to opening checkouts, previewing prices, and previewing transactions.
{% /feature-item %}
{% feature-item %}
Safe to publish in your app code.
{% /feature-item %}
{% /feature-column %}
{% /feature-comparison %}

This guide is about API keys. For information on client-side tokens, see [Paddle.js](https://developer.paddle.com/paddle-js/about/include-paddlejs.md).

## Create an API key

{% callout type="warning" %}
Treat your API key like a password. Keep it safe and never share it with apps or people you don't trust.
{% /callout %}

{% instruction-steps %}

1. Go to **Paddle > My account > Settings > Authentication**.
2. Click the **API keys** tab.
3. Click {% mock-button icon="carbon:add" %}New API key
4. Enter a name for the API key. This should be a human-readable name that you can use to uniquely identify this key.
5. Enter a description for the API key.
6. Select the permissions for the API key. Choose only the permissions you need for your app or integration.
7. Set the expiry date for the API key.
8. Turn on **Rotatable** if you want to be able to rotate this key, for example automatically with [AWS Secrets Manager](https://developer.paddle.com/api-reference/about/rotate-api-keys.md#aws-secrets-manager) or [using the Paddle API](https://developer.paddle.com/api-reference/about/rotate-api-keys.md#rotate-with-api). You can't change this after you create the key. [Learn more](#rotatable).
9. Click Save when you're done.
10. Copy your API key and store it securely.

{% /instruction-steps %}

{% /dashboard-instructions %}

{% callout type="info" %}
For security reasons, the API key is only visible once. If you lose it, you'll need to revoke it and [create a new API key](#create-an-api-key).
{% /callout %}

You can [list API keys](https://developer.paddle.com/api-reference/api-keys/list-api-keys.md) and [get an API key](https://developer.paddle.com/api-reference/api-keys/get-api-key.md) using the Paddle API with the `api_key.read` [permission](https://developer.paddle.com/api-reference/about/permissions.md). Keys are returned with an obfuscated `key`, so you can audit the keys on your account without exposing them. You can't create, update, or revoke API keys using the API. See [API keys](https://developer.paddle.com/api-reference/api-keys.md).

## API key format

API keys look like this:

{% code-group sync="sandbox-live-quickstart" %}

```bash {% title="Sandbox" %}
pdl_sdbx_apikey_<example key from Paddle docs, redacted>
```

```bash {% title="Live" %}
pdl_live_apikey_<example key from Paddle docs, redacted>
```

{% /code-group %}

Every API key includes:

| Component | Used for |
|---|---|
| `pdl_` | Identifies this as a Paddle API key. |
| `live_` or `sdbx_` | Identifies whether a key is for a live account or a sandbox account. |
| `apikey_` | Differentiates the key from client-side tokens. |
| 26-char alphanumeric string | API key |

They're 69 characters in length and always contain five underscores. You can use a regular expression to match API keys:

```bash {% title="Regex pattern for API keys" %}
^pdl_(live|sdbx)_apikey_[a-z\d]{26}_[a-zA-Z\d]{22}_[a-zA-Z\d]{3}$
```

{% callout type="info" %}
API keys are case-sensitive.
{% /callout %}

{% collapsible title="Legacy API keys" %}

Keys created before **May 6, 2025** are considered legacy keys. They don't follow the same format as newer keys, and they don't support permissions or secret scanning.

Legacy keys are a random string of 50 characters. They contain only lowercase letters and numbers.

When you [list or get API keys](https://developer.paddle.com/api-reference/api-keys.md) using the Paddle API, legacy keys are returned with `permissions: null`, and their obfuscated `key` doesn't have the `pdl_` prefix.

```bash {% title="Example of a legacy format API key" %}
da3f01dbed7a549cf0d8eb454bf5fded90d021f9975eba5cae
```

You should revoke legacy API keys and replace with newer-style API keys as soon as you can.

{% /collapsible %}

## Secret scanning

Paddle automatically monitors public repositories on GitHub to detect when API keys are accidentally committed. This helps protect your account from unauthorized access and potential security breaches.

When an API key is detected in a repository, Paddle notifies the account owner by email and takes appropriate action depending on the risk level:

| Level | Meaning | API key status |
| --- | --- | --- |
| High | Exposed publicly, like in public GitHub repository. | Automatically revoked to protect your account. |
| Low | Already expired or revoked. | Already inactive. |

When an API key is exposed, you should:

1. **Replace the key**  
   [Create a new API key](#create-an-api-key) in the dashboard and update all applications or services that use the revoked key.
2. **Investigate the exposure**  
   Review the source of the leak to understand how it happened and prevent future exposures.
3. **Audit for malicious activity**  
   Review your logs for any unauthorized calls made by this key before its revocation.

{% callout type="info" %}
While low-risk exposure notifications are purely informational, you should investigate how an inactive key was exposed to prevent it from happening again.
{% /callout %}

You can optionally [subscribe to webhook notifications](https://developer.paddle.com/webhooks/about/notification-destinations.md) for API key exposure events.

| Webhook                                                                            | Description                                 |
| ---------------------------------------------------------------------------------- | ------------------------------------------- |
| [`api_key_exposure.created`](https://developer.paddle.com/webhooks/api-keys/api-key-exposure-created.md) | Occurs when an exposure is detected.        |
| [`api_key.revoked`](https://developer.paddle.com/webhooks/api-keys/api-key-revoked.md)                            | Occurs when a key is automatically revoked. |

All exposures are tracked and visible in the dashboard for transparency and security auditing.

## Expiration

{% callout type="danger" %}
You don't have to set an expiry date for your API keys, but we strongly recommend you do to protect your account from unauthorized access.
{% /callout %}

When you create an API key, you can set an expiry date for it. This is the date when the API key is no longer valid. Expiry dates are useful to limit the lifetime of a key and reduce the risk of exposure.

The default expiry date is 90 days from the date of creation and can't be more than one year from the date of creation.

Once a key has expired, it's no longer valid and can't be used to access the Paddle API. Expired keys can't be revalidated. [Create a new API key](#create-an-api-key) to rotate.

You can subscribe to webhook notifications for API key expiration events:

| Webhook                                                                 | Description                                 |
| ----------------------------------------------------------------------- | ------------------------------------------- |
| [`api_key.expiring`](https://developer.paddle.com/webhooks/api-keys/api-key-expiring.md)               | Occurs when an API key expires in seven days. |
| [`api_key.expired`](https://developer.paddle.com/webhooks/api-keys/api-key-expired.md)                 | Occurs when an API key has expired.           |

## Rotatable keys {% id="rotatable" %}

Turn on **Rotatable** when you create an API key to allow its secret to be rotated. Rotatable keys can be rotated automatically by [AWS Secrets Manager](https://developer.paddle.com/api-reference/about/rotate-api-keys.md#aws-secrets-manager), or from your own tooling [using the Paddle API](https://developer.paddle.com/api-reference/about/rotate-api-keys.md#rotate-with-api), so you can keep credentials fresh without manually creating and swapping keys. When AWS Secrets Manager rotates a key, its expiry is [extended automatically](https://developer.paddle.com/api-reference/about/rotate-api-keys.md#expiry-and-rotation). When you rotate using the Paddle API, you can set a new expiry with `new_key_expires_at`.

You can only set this when you [create a key](#create-an-api-key). You can't make an existing key rotatable later. If you need rotation for a key that isn't rotatable, [create a new rotatable key](#create-an-api-key) to replace it.

## Permissions

You can determine what a key can and can't do by assigning [permissions](https://developer.paddle.com/api-reference/about/permissions.md) to it.

We recommend creating a key with the minimum permissions required for your app or integration to function. This reduces the risk of accidental misuse or exposure. Create multiple keys with different permissions for different apps or integrations.

Requests made with API keys that don't have the required permissions return a [`forbidden`](https://developer.paddle.com/errors/shared/forbidden.md) error (403).

## Best practices

Your API key is a sensitive security credential. It grants access to your Paddle data and can be used to make changes to your account. If bad actors gain access to your API key, it can harm your business.

The Paddle API returns an `Access-Control-Allow-Origin` header that blocks direct access from browsers, so calls must be made from your backend.

You and your team are responsible for storing your API keys safely. Follow these best practices to help protect your API keys:

### Always

- Set an expiry date for your API keys.
- Rotate your API keys regularly.
- Use environment variables or credential management systems to store your API key.

### Never

- Share your API key in emails or chat.
- Hardcode your API key in your code.
- Include API keys in client-side code.
- Store your API key in a public or accessible location.