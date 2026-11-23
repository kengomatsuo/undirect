---
title: "How subscriptions work"
slug: "how-subscriptions-work"
updated: 2026-07-09T10:00:12Z
published: 2026-07-09T10:00:12Z
canonical: "docs.xendit.co/how-subscriptions-work"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.xendit.co/llms.txt
> Use this file to discover all available pages before exploring further.

# How subscriptions work

Subscriptions allows you to manage recurring payments with flexibility and ease, be it weekly, monthly, or yearly. Beyond automated scheduling, Subscriptions is designed to enhance the end-user experience and improve payment success rates with advanced features, ensuring an efficient subscription management process with low-cost integration.

![](https://cdn.document360.io/217abc43-8677-41fb-a81d-fceeb1fa0358/Images/Documentation/Subscriptions-overview.drawio.png?sv=2026-02-06&spr=https&st=2026-11-23T08%3A56%3A47Z&se=2026-11-23T09%3A56%3A47Z&sr=b&sp=r&sig=8D%2BbYKOQfm7OI%2FXlAj1n7A%2FBkywvjczCa0r2Y6EKRo0%3D)

## Solutions

You can set up recurring payment plans for your end users with ease. Simply define the amount, schedule, and [recovery options for failed payments](/v1/docs/recover-failed-payments), and Xendit will handle the scheduling and automatic deductions. All you need to do is monitor webhook events to track payment confirmations for each billing cycle.

## Create subscriptions

### **Before you begin**

To create a subscription plan, you must have at least one active payment channel that supports Merchant-Initiated Transactions.

- **Check compatibility:** Go to the [Available Payment Channels table](/v1/docs/available-payment-channels) and apply the Merchant-Initiated Transaction filter to see which channels support this.
- For more information on how to activate payment channels, please [click here](/v1/docs/activate-payment-channels).

### Create subscriptions via dashboard

1. Go to the **Subscriptions** page
2. Click **Create New**
3. Enter the **subscription** **plan details**, such as the amount to charge and the list of items
4. Select **subscription cycle** (weekly, monthly, etc.).
5. Add the **customer information** by adding the Customer ID. If you don’t have the Customer ID, click **Add New Customer**
6. Configure optional failed payment handling for the subscriptions on:
  1. **Retry settings** for failed payments to maximize success rates
  2. **Payment Link options** to allow customer to pay on failure
  3. **Deactivate plan** if all payment attempts fail
7. Click **Create Plan**
8. Share the subscription link with your customer

![](https://cdn.document360.io/217abc43-8677-41fb-a81d-fceeb1fa0358/Images/Documentation/image(225).png?sv=2026-02-06&spr=https&st=2026-11-23T08%3A56%3A47Z&se=2026-11-23T09%3A56%3A47Z&sr=b&sp=r&sig=oo9RBGiFQz5V1mWtzeNi%2FCIBz9LbcJuTS7LF1I5hLZc%3D)

Once your customer links their auto-debit payment method, their subscription will start automatically.

### Create subscriptions via API integration

There are 2 entry points of creating subscriptions via our API:

1. **Xendit Checkout UI**

Use this entry point if you want to use Xendit’s hosted UI (via Payment Link or components) to collect and tokenize your user's payment method during the subscription setup.
2. **Existing Payment Token** Use this entry point if you already have an existing payment token ID for your customer and want to create a subscription plan immediately.

**Xendit Checkout UI**

- **Create Payment Session**: Create a Payment Session with the type `SUBSCRIPTION`. In this request, you will define all critical subscription parameters, including amount and currency, billing cycle, anchor date, payment schedule, customer information and retry configuration
- **Redirect User**: Redirect your user to the URL of payment link or via Component to proceed with the payment/linking process.
- **Webhooks**: Once the session is successfully completed, you will receive:
  - Payment Session completion, indicating the complete state of the current session
  - Payment Token Webhook for the new payment method.
  - Subscription Plan Webhook notification, indicating that the plan is active.
- **Management**: Xendit will automatically start managing the schedule and deduct the user's balance based on the defined plan. Listen to our webhook notification on the cycle of the subscription.

**Existing Payment Token**

- **Create Subscription Plan**: You will create the subscription plan by providing the `payment_token_id` you already have.
- **Webhooks**: Once the subscription request is completed, you will receive a Subscription Plan Webhook notification.
- **Management**: Xendit will automatically start managing the schedule and deduct the user's balance based on the defined plan. Listen to our webhook notification on the cycle of the subscription.

[You can find the detailed integration guide here.](/v1/docs/subscriptions-overview)
