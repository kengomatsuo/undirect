---
title: "Overview"
slug: "subscriptions-overview"
updated: 2026-04-09T12:17:25Z
published: 2026-04-09T12:17:25Z
canonical: "docs.xendit.co/subscriptions-overview"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.xendit.co/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

Subscription is a solution for managing recurring payments using Xendit's scheduler. It offers an easy and flexible integration, allowing you to configure and automate recurring payment cycles based on your setup. By using the Subscriptions product, you eliminate the need to build your own scheduling system, including handling failed payment recovery. Xendit optimizes the success rate of payments through features designed specifically for subscription management.

## High level data objects

![](https://cdn.document360.io/217abc43-8677-41fb-a81d-fceeb1fa0358/Images/Documentation/Untitled diagram-2024-11-29-033229.png?sv=2026-02-06&spr=https&st=2026-11-23T09%3A08%3A52Z&se=2026-11-23T10%3A08%3A52Z&sr=b&sp=r&sig=kw3ItP2efqBewyJbQWM5Ha5WYwW47gww%2BYwNB3ZfK74%3D)

| **Data object name** | **Description** | **Created** by |
| --- | --- | --- |
| **Plan** | The primary data object for managing your subscription logic. It contains details such as the customer object, the amount to be deducted for each cycle, the schedule object, payment token(s) and the basic subscription plan configurations, including optional features. | You |
| **Schedule** | Defines when subscription actions should occur. It includes merchant-defined timing details, such as intervals (e.g., daily, monthly, yearly) and retry logic. The schedule object can be created simultaneously with the subscription plan to enable plan customization for each customer. | You |
| **Cycle** | Automatically generated based on the subscription plan object. Each subscription cycle represents an individual billing instance (e.g., a monthly plan for a year generates 12 cycles). Ad hoc changes can be made to specific cycles without affecting the base subscription plan. The subscription plan has a one-to-many relationship with its cycles. | Xendit |
| **Attempt** | Represents each action taken to complete a subscription cycle (e.g., payments). Multiple attempts may occur within a single cycle depending on the retry configuration (e.g., a cycle with two retries can have up to three attempts). All attempts are stored within the corresponding cycle object. Each subscription cycle has a one-to-many relationship with its attempts. A single attempt can involve multiple `payment_token_id` entries if multiple payment methods were configured in the subscription plan. Xendit will process each payment token sequentially, based on priority, until one succeeds or all fail. A subscription attempt has a one-to-many relationship with `payment_token_id`. | Xendit |

## Integration flow

Example of integration flow if you are about to set up Subscriptions payment for your end user

**Xendit Checkout UI**

![](https://cdn.document360.io/217abc43-8677-41fb-a81d-fceeb1fa0358/Images/Documentation/V3 Request Processing-2026-04-07-175902.png?sv=2026-02-06&spr=https&st=2026-11-23T09%3A08%3A52Z&se=2026-11-23T10%3A08%3A52Z&sr=b&sp=r&sig=DWsgrIQ7Pdne%2BLp4UZ%2BKtXMMqWbJ7%2FHHEohpeSyHbcY%3D)

Use this flow when you want Xendit to handle the payment method collection and initial authentication through a hosted page or component.

1. **Initiate subscription:** Once the end user selects a subscription plan on your system, create the corresponding payment session with type `SUBSCRIPTION` in Xendit with required information
2. **Return response:** Xendit returns a session object containing the `payment_link_url` or `component_sdk_key` .
  1. **Redirect user:** Redirect the end to xendit-hosted page via payment link or component
  2. **Authenticate & link:** The end user proceed the payment method
3. **Subscription plan activated:** Once the subscription plan has been created, you will receive these webhooks:
  1. `payment_token.activation`: Payment token has been created
  2. `payment_session.completed`: Payment session has been completed
  3. `recurring_plan.activated`: The subscription plan becomes active. See the [Plan lifecycle](/v1/docs/overview-12#plan-lifecycle) below.
  4. `recurring.cycle.created`: A new cycle created
  5. If you set `immediate_payment: true` you may receive additional webhooks `payment.capture` and `recurring_cycle.succeeded` to indicate the immediate payment after the subscription plan has been created
4. **Recurring schedule:** Xendit processes subscription cycles based on the `anchor_date` and `interval`. On each cycle, you will receive webhooks indicating status updates:
  1. `recurring.cycle.created`: A new cycle is created
  2. `recurring.cycle.retrying`: A payment attempt failed, but a retry is scheduled on `next_retry_timestamp` alongside the `payment.failure` webhook
  3. `recurring.cycle.failed`: All retry attempts have failed alongside the `payment.failure` webhook
  4. `recurring.cycle.succeeded`: Payment for the following cycle was successful alongside the `payment.succeeded` webhook

**Existing Payment Token**

![](https://cdn.document360.io/217abc43-8677-41fb-a81d-fceeb1fa0358/Images/Documentation/V3 Request Processing-2026-04-07-175916.png?sv=2026-02-06&spr=https&st=2026-11-23T09%3A08%3A52Z&se=2026-11-23T10%3A08%3A52Z&sr=b&sp=r&sig=CioI6DrgmXfeXQAUqCsmV34DffxrMZ5XUMSLn8a0%2FZ4%3D)

1. **Initiate subscription:** Once the end user selects a subscription plan on your system, create the corresponding subscription request in Xendit with required information, including the intended payment tokens
2. **Subscription plan activated:** Once the subscription plan has been created, you will receive these webhooks:
  1. `payment_token.activation`: Payment token has been created
  2. `payment_session.completed`: Payment session has been completed
  3. `recurring_plan.activated`: The subscription plan becomes active. See the [Plan lifecycle](/v1/docs/overview-12#plan-lifecycle) below.
  4. `recurring.cycle.created`: A new cycle created
  5. If you set `immediate_payment: true` you may receive additional webhooks `payment.capture` and `recurring_cycle.succeeded` to indicate the immediate payment after the subscription plan has been created
3. **Recurring schedule:** Xendit processes subscription cycles based on the `anchor_date` and `interval`. On each cycle, you will receive webhooks indicating status updates:
  1. `recurring.cycle.created`: A new cycle is created
  2. `recurring.cycle.retrying`: A payment attempt failed, but a retry is scheduled on `next_retry_timestamp` alongside the `payment.failure` webhook
  3. `recurring.cycle.failed`: All retry attempts have failed alongside the `payment.failure` webhook
  4. `recurring.cycle.succeeded`: Payment for the following cycle was successful alongside the `payment.succeeded` webhook

## Plan lifecycle

![](https://cdn.document360.io/217abc43-8677-41fb-a81d-fceeb1fa0358/Images/Documentation/V3 Request Processing-2026-04-09-044927.png?sv=2026-02-06&spr=https&st=2026-11-23T09%3A08%3A52Z&se=2026-11-23T10%3A08%3A52Z&sr=b&sp=r&sig=SrIwRHvk67DzLHIabmlEfgWkOJPdH4xEaYwbnjI5wiY%3D)

| **Status** | **Description** | Webhook event |
| --- | --- | --- |
| Pending | If `payment_tokens` are provided during plan creation, the plan status may on the `PENDING`. Wait for the `recurring.plan.activated` webhook to confirm activation. |  |
| **Active** | The plan is `ACTIVE` when the scheduler runs and processes payments according to the set schedule. Remains active until all cycles are executed or manually deactivated. | `recurring.plan.activated` |
| **Inactive** | The plan becomes `INACTIVE` after all cycles are completed or it is manually deactivated. Inactive plans cannot be reactivated. You will receive `recurring.plan.inactivated` for this transition. | `recurring.plan.inactivated` |

## Cycle lifecycle

![](https://cdn.document360.io/217abc43-8677-41fb-a81d-fceeb1fa0358/Images/Documentation/Untitled diagram-2024-12-08-125117.png?sv=2026-02-06&spr=https&st=2026-11-23T09%3A08%3A52Z&se=2026-11-23T10%3A08%3A52Z&sr=b&sp=r&sig=9loNhJTAJnxV79S8N0JmLQ8vJAGqAJFzPmZO7M5S7gk%3D)

| **Status** | **Description** | Webhook event |
| --- | --- | --- |
| **Created** | The cycle has been created and is ready to execute based on the `schedule_timestamp`. You will receive the `recurring.cycle.created` webhook when the next cycle is created. | `recurring.cycle.created` |
| **Retrying** | If the first attempt fails and the plan has a retry configuration, you will receive the `recurring.cycle.retrying` webhook. This indicates retries are ongoing until completed. | `recurring.cycle.retrying` |
| **Succeeded** | The cycle payment succeeded. You will receive the `recurring.cycle.succeeded` webhook. You will get the action_id inside the webhook as an identifier of the payment. You can use this for refund process if needed. | `recurring.cycle.succeeded` |
| **Failed** | The cycle payment failed. You will receive the `recurring.cycle.failed` webhook, indicating all retries have been executed without success. | `recurring.cycle.failed` |
