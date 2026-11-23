---
updatedAt: 2025-11-10T23:00:30.000Z
agentTools:
  projectIndex: https://docs.midtrans.com/llms.txt
---

# HTTP Notification

Prior to using, ensure that you've set your Subscription HTTP notification URL in [Midtrans's dashboard](https://dashboard.midtrans.com/settings/payment) in the `Recurring Notification URL` field.

Here are some examples of possible JSON responses as HTTP notification in recurring API for:

* successful subscription creation
* successful credit card payment
* successful GoPay payment
* failed credit card payment
* failed GoPay payment
* generic error payment

```json Successful card subs creation
{
  "token": "8447a56f-0e5e-498a-a948-eefa88265544",
  "status": "active",
  "schedule": {
    "start_time": "2022-10-26T04:20:00.000000Z",
    "next_execution_at": "2022-10-26T04:20:00.000000Z",
    "interval_unit": "month",
    "interval": 1,
    "current_interval": 0
    },
  "payment_type": "credit_card",
  "name": "SUBSCRIBE-1666753619",
  "metadata": {
    "meta": "data"
  },
  "merchant_id": "M099098",
  "id": "a05a8d85-8e22-4a9d-80bd-1e6199aea3f3",
  "customer_details": {
    "first_name": "John"
  },
  "currency": "IDR",
  "amount": "14000"
}
```
```json Successfull GoPay subs creation
{
  "token": "8447a56f-0e5e-498a-a948-eefa88265544",
  "status": "active",
  "schedule": {
    "start_time": "2022-10-26T04:20:00.000000Z",
    "next_execution_at": "2022-10-26T04:20:00.000000Z",
    "interval_unit": "month",
    "interval": 1,
    "current_interval": 0
    },
  "payment_type": "gopay",
  "name": "SUBSCRIBE-1666753619",
  "metadata": {
    "meta": "data"
  },
  "merchant_id": "M099098",
  "id": "a05a8d85-8e22-4a9d-80bd-1e6199aea3f3",
  "customer_details": {
    "first_name": "John"
  },
  "currency": "IDR",
  "amount": "14000",
  "gopay": {                                                    
    "account_id": "phy56f8f-2683-4248-8080-e59b36c6bbgf"
  }
}
```
```json Successful card payment
{
  "transaction": {
    "transaction_status": "capture",
    "transaction_id": "2dd96707-8969-4930-9afa-74343b9e2042",
    "status_code": "200",
    "channel_response_message": "Approved",
    "channel_response_code": "0"
  },
  "subscription": {
    "token": "48111111JMUIocDPQoVTfKUhpNKX1114",
    "status": "active",
    "schedule": {
      "start_time": "2022-10-26T09:59:00.000000Z",
      "next_execution_at": "2022-11-26T09:59:00.000000Z",
      "interval_unit": "month",
      "interval": 1,
      "current_interval": 1
    },
    "payment_type": "credit_card",
    "name": "SUBSCRIBE-1666778331",
    "metadata": {
      "meta": "data"
    },
    "merchant_id": "M099098",
    "id": "db516f5c-4acf-4f67-ac75-bb8428b58633",
    "customer_details": {
      "first_name": "John"
    },
    "currency": "IDR",
    "amount": "14000"
  },
  "event_name": "subscription.charge"
}
```
```json Successful GoPay payment
{
  "transaction": {
    "transaction_status": "settlement",
    "transaction_id": "48fd27f9-284d-48fc-87d0-a799e80682c4",
    "status_code": "200"
  },
  "subscription": {
    "token": "b54264bf-1391-4951-9f05-059ab1300d3f",
    "status": "active",
    "schedule": {
      "start_time": "2022-10-26T10:06:00.000000Z",
      "next_execution_at": "2022-11-07T10:06:00.000000Z",
      "interval_unit": "day",
      "interval": 12,
      "current_interval": 1
    },
    "payment_type": "gopay",
    "name": "SUBSCRIBE-1666778737",
    "metadata": {
      "meta": "data"
    },
    "merchant_id": "G575825106",
    "id": "7d9a7685-8437-4914-bcc1-47b11c0f3e58",
    "gopay": {                                                    
        "account_id": "phy56f8f-2683-4248-8080-e59b36c6bbgf"
    },
    "customer_details": {
      "first_name": "John"
    },
    "currency": "IDR",
    "amount": "14000"
  },
  "event_name": "subscription.charge"
}
```
```json Failed card payment
{
  "transaction": {
    "status_message": "Token id is missing, invalid, or timed out"
    "status_code": "411"
  },
  "subscription": {
    "token": "8447a56f-0e5e-498a-a948-eefa88265544",
    "status": "inactive",
    "schedule": {
      "start_time": "2022-10-26T04:50:00.000000Z",
      "next_execution_at": "2022-10-26T07:50:00.000000Z",
      "interval_unit": "month",
      "interval": 1,
      "current_interval": 0
    },
    "payment_type": "credit_card",
    "name": "SUBSCRIBE-1666759564",
    "metadata": {
      "meta": "data"
    },
    "merchant_id": "G575825106",
    "id": "6fbdf52b-a3b0-430c-bfb7-999fa1df1966",
    "customer_details": {
      "first_name": "John"
    },
    "currency": "IDR",
    "amount": "14000"
  },
  "event_name": "subscription.charge"
}

```
```json Failed GoPay payment
{
  "transaction": {
    "status_message": "Merchant doesn't have access for this payment type",
    "status_code": "402"
  },
  "subscription": {
    "token": "b54264bf-1391-4951-9f05-059ab1300d3f",
    "status": "inactive",
    "schedule": {
      "start_time": "2022-10-26T08:17:00.000000Z",
      "next_execution_at": "2022-10-26T11:17:00.000000Z",
      "interval_unit": "day",
      "interval": 12,
      "current_interval": 0
    },
    "payment_type": "gopay",
    "name": "SUBSCRIBE-1666772200",
    "metadata": {
      "meta": "data"
    },
    "merchant_id": "M099098",
    "id": "fd1d1cb3-9d13-425d-84f0-c59f9cabe847",
    "gopay": {                                                    
        "account_id": "phy56f8f-2683-4248-8080-e59b36c6bbgf"
    },
    "customer_details": {
      "first_name": "John"
    },
    "currency": "IDR",
    "amount": "14000"
  },
  "event_name": "subscription.charge"
}
```
```json Generic error payment
{
  "transaction": {
    "status_message": "Internal Server Error",
    "status_code": "500"
  },
  "subscription": {
    "token": "b54264bf-1391-4951-9f05-059ab1300d3f",
    "status": "inactive",
    "schedule": {
      "start_time": "2022-10-26T08:17:00.000000Z",
      "next_execution_at": "2022-10-26T11:17:00.000000Z",
      "interval_unit": "day",
      "interval": 12,
      "current_interval": 0
    },
    "payment_type": "gopay",
    "name": "SUBSCRIBE-1666772200",
    "metadata": {
      "meta": "data"
    },
    "merchant_id": "M099098",
    "id": "fd1d1cb3-9d13-425d-84f0-c59f9cabe847",
    "gopay": {                                                    
        "account_id": "phy56f8f-2683-4248-8080-e59b36c6bbgf"
    },
    "customer_details": {
      "first_name": "John"
    },
    "currency": "IDR",
    "amount": "14000"
  },
  "event_name": "subscription.charge"
}
```

<br />

When `transaction.status_code` in notification is `500`, you can expect that there is no transaction being created. If there is any retry left on the subscription, it will be retried according to the retry configuration. Status of the subscription can be seen on `subscription.status` to check whether the subscription is still active or not.