# Best practices for managing secret API keys

Learn how to manage secret API keys and handle an exposed or compromised key.

Secret API keys are a form of account credentials, like a username and password. Unlike publishable keys, which are safe to include in webpages and apps, secret keys must stay in your server environment. If an unauthorized party obtains your secret API key, they can make unauthorized charges, access customer data, or disrupt your integration.

This guide is about specific ways to protect keys in your server environment. For an overview of the different types of keys Stripe supports, see [API keys](https://docs.stripe.com/keys.md).

## Protect secret API keys 

You must handle and store your secret API keys safely at every phase of development to protect them from exposure or compromise.

- **Never put secret API keys in source code**: Bad actors continuously scan public repositories for Stripe API keys. Even private repositories can be exposed through development environments.
  - Use your platform’s secrets management tools (such as a [secrets vault](https://docs.stripe.com/keys-best-practices.md#use-a-secrets-vault)) to supply API keys to your integration code. If your platform doesn’t provide a secrets vault, use environment variables instead.
  - Periodically audit your source code, configuration files, and CI/CD pipelines for sensitive keys, including sandbox and organization API keys. Use a secret scanner with maintained [Stripe patterns](https://docs.github.com/en/code-security/reference/secret-security/supported-secret-scanning-patterns). If you find a sensitive key, assume it has been [exposed and compromised](https://docs.stripe.com/keys-best-practices.md#handling-compromised-keys).
  - Use a pre-commit hook in your version control system to reject commits that contain keys detected by your secret scanner.
  - Code snippets in Stripe documentation sometimes include keys for illustration purposes only. Don’t include real keys in your code.
- **Never embed secret API keys in applications**: Unauthorized parties can unpack applications to search for embedded keys. For client-side use cases such as client tools, SDKs, and mobile apps, embed [publishable keys](https://docs.stripe.com/keys.md#obtain-api-keys) instead.
- **Follow the principle of least privilege**: People and systems must have *only the privileges required to perform their jobs*.
  - Define a clear policy about which team members have permission to create, update, or read secret API keys. Limit access to those who need it and audit key permissions periodically.
  - Maintain up-to-date documentation about how to handle secret API keys within your organization. Host regular training sessions to reinforce best practices.
- **Handle secret API keys carefully**: When you create a secret API key in the Stripe Dashboard, you see it one time. Immediately store the key in your platform’s [secrets vault](https://docs.stripe.com/keys-best-practices.md#use-a-secrets-vault) and don’t store it anywhere else. If your platform doesn’t provide a secrets vault, you can store the key in an environment variable.
  - Share secret API keys through your platform’s secret-management tools—not in emails, chat messages, or customer support messages. **Stripe never asks you for your secret API key.**
  - Use [restricted API keys](https://docs.stripe.com/keys-best-practices.md#limit-access) with limited permissions instead of unrestricted secret API keys.
- **Rotate secret API keys periodically**: Define and practice a process for [rotating your Stripe API keys](https://docs.stripe.com/keys.md#rolling-keys). Periodic rotation confirms that you know where each key is used and that your team can replace a key on short notice. Write down a contingency plan so that if a key is exposed or compromised, your team can respond with minimum impact on your business.
- **Audit API request logs to monitor suspicious activities**: Regularly audit or monitor API [request logs](https://docs.stripe.com/development/dashboard/request-logs.md) to proactively identify misused API keys. Make sure your developers aren’t using live keys when a *Sandbox* (A sandbox is an isolated test environment that allows you to test Stripe functionality in your account without affecting your live integration. Use sandboxes to safely experiment with new features and changes) key is appropriate. See [Sandbox versus live mode](https://docs.stripe.com/keys.md#test-live-modes).

## Store API keys securely 

Don’t put restricted or secret API keys in your code, even code that stays on your servers. Fraudulent actors continuously scan public codebases to find accidentally exposed API keys. If your developers have code containing keys in their development environments, any compromise of a developer can lead to key exposure.

Some Stripe code examples include sandbox keys to make them easy to run immediately. If you copy example code, remove these keys and store them in a [secrets vault](https://docs.stripe.com/keys-best-practices.md#use-a-secrets-vault). If your platform doesn’t provide a secrets vault, you can store the keys in environment variables.

### Use a secrets vault 

A secrets vault stores credentials separately from your code and supplies them to your applications at runtime. Your code refers to a key only by its name or a reference—the value never appears in source files, CI configuration, or developer environments. Beyond hiding key values, a vault provides a full audit log of every access, support for automatic key rotation, and the ability to revoke access instantly without redeploying your application.

Most cloud platforms and infrastructure tools include a secrets vault. Use your platform’s permissions features to restrict vault access to only the services that need it:

- **[AWS Secrets Manager](https://aws.amazon.com/secrets-manager/)**: Integrates with IAM and supports automatic rotation.
- **[Google Cloud Secret Manager](https://cloud.google.com/secret-manager)**: Versioned secrets with fine-grained IAM permissions.
- **[Azure Key Vault](https://azure.microsoft.com/en-us/products/key-vault/)**: Manages secrets, keys, and certificates with role-based access control.
- **[HashiCorp Vault](https://developer.hashicorp.com/vault)**: Self-hosted or managed; supports dynamic secrets and audit logging.

[This blog post](https://stripe.dev/blog/securing-stripe-api-keys-aws-automatic-rotation) demonstrates storing and automatically rotating a Stripe API key using AWS Secrets Manager.

### Set an API key as an environment variable

If your hosting platform doesn’t provide a secrets vault, supply keys to your application in environment variables. Some platforms support marking environment variables as *sensitive* so that you can’t see them again after you set them. Your applications can still use the sensitive variables, but they can’t be stolen from your web browser.

When you run Stripe code examples, set a temporary variable for your current terminal session. The environment variable clears when you close the terminal.

#### Mac/Linux

```bash
export STRIPE_API_KEY=sk_test_...
```

### Use the API key in your code

Instead of embedding a hard-coded key, your code refers to API keys by the names of environment variables.

#### Ruby

```ruby
client = Stripe::StripeClient.new(ENV["STRIPE_API_KEY"])
```

If you put Stripe API keys in environment variables, be careful not to expose these variables to your users. For example, don’t show environment variables on error pages, and don’t make diagnostic modes available to a broad audience.

## Customize API access with restricted API keys 

Instead of using secret API keys with broad access, create [restricted API keys](https://docs.stripe.com/keys/restricted-api-keys.md) to assign specific privileges to the components of your applications. For example, you can give your invoicing system the ability to manage invoices and nothing else.

Restricted API keys help you limit the potential impact of a compromise. For example, if you need to give a Stripe API key to a third party that monitors disputes, you can create a restricted API key that grants read-only access to dispute-related resources in your Stripe account and blocks everything else. If the third party were compromised, an attacker who stole your restricted API key would be limited to those API calls.

## Limit the IP addresses that can send API requests 

If your service sends API requests from stable IP addresses, you can restrict your secret or restricted API keys to those addresses. For example, if your platform offers a dedicated NAT gateway or another way to reserve an IP address or range, you can configure Stripe to block API requests with your keys from anywhere else.

You can also block API requests based on the Autonomous System Number (ASN), country, or common threat categories. For detailed instructions, see [Access policies](https://docs.stripe.com/keys.md#access-policies).

## Handle compromised API keys 

If a restricted or secret API key is exposed or compromised, rotate it immediately even if you aren’t sure anyone saw it. Treat any exposure as a potential compromise.

- *Exposure* means the key became visible somewhere it shouldn’t have been, such as a public repository, a log file, or an email.
- *Compromise* means there’s evidence of unauthorized use of the key.

### Respond to a key exposure or compromise

If you discover that a restricted or secret API key has been exposed or compromised, follow the instructions on [this support page](https://support.stripe.com/questions/protecting-against-compromised-api-keys) to minimize the potential damage to your business.

### Proactive protection for Stripe keys

If Stripe detects an exposed secret or restricted API key, we notify you and request that you rotate the key. In some cases, Stripe deactivates the key proactively and notifies you about any actions we take.

Stripe doesn’t guarantee detection of all exposed or compromised keys. Following these best practices helps you prevent key exposure and keep your integration with Stripe secure.

## Managed API keys

Some server platforms or hosting providers can [manage Stripe API keys](https://docs.stripe.com/keys/managed-api-keys.md) on behalf of their customers, including provisioning and rotation steps. Managed API keys remain on the server platform, which supplies them to your server-side code. The [Stripe Dashboard](https://dashboard.stripe.com/apikeys) lists your managed API keys but doesn’t expose complete keys.

Because managed API keys are sensitive secrets in a server environment, follow the best practices&nbsp;in this guide to protect them. Never hard-code managed API keys in your server-side code, and never expose environment variables directly from your application.

If your server platform provides managed Stripe API keys to your application as environment variables and supports marking certain environment variables as *sensitive* to trigger extra protections, make sure to mark any Stripe keys as sensitive.

If you suspect that a managed API key has been exposed or compromised, [rotate it from the Stripe Dashboard](https://docs.stripe.com/keys.md#rolling-keys) or on the server platform. If you rotate a managed API key in the Stripe Dashboard, or if Stripe detects that your key has been compromised and expires it to protect your Stripe account, we synchronize with your server platform automatically on your behalf—you don’t need to change the key in two places.

When your managed API keys change, you generally need to redeploy the corresponding server-side applications unless your server platform redeploys them automatically.

## See also

- [API keys](https://docs.stripe.com/keys.md)
- [Protecting against compromised API keys](https://support.stripe.com/questions/protecting-against-compromised-api-keys)
