---
updatedAt: 2025-11-11T00:29:26.000Z
agentTools:
  projectIndex: https://docs.midtrans.com/llms.txt
---

# Create Subscription

Create a subscription or recurring transaction by sending all the details required to create a transaction. The details such as `name`, `amount`, `currency`, `payment_type`, `token`, and `schedule` are sent in the request. Successful request returns `id` `status:active`, and other subscription details.

Subscription API currently supports idempotency when creating subscription. If you're using the same[ idempotency key](https://docs.midtrans.com/reference/api-headers), you will continue to receive the same response. Subscription will validate the request body first before performing the idempotency check - this idempotency applies for the next 3 minutes for the same key.

<br />

***

<br />

## Create Subscription Method

| HTTP Method | Endpoint                   | Description         |
| ----------- | -------------------------- | ------------------- |
| POST        | BASE\_URL/v1/subscriptions | Create subscription |

<br />

***

<br />

## Create Subscription Request

```json Sample Request - Credit Card
{
    "name": "MONTHLY_2019",
    "amount": "14000",
    "currency": "IDR",
    "payment_type": "credit_card",
    "token": "48111111sHfSakAvHvFQFEjTivUV1114",
    "schedule": {
      "interval": 1,
      "interval_unit": "month",
      "max_interval": 12,
      "start_time": "2020-07-22 07:25:01 +0700"
    },
    "retry_schedule": {
      "interval": 1,
      "interval_unit": "day",
      "max_interval": 3,
    },
    "metadata": {
      "description": "Recurring payment for A"
    },
    "customer_details": {
      "first_name": "John",
      "last_name": "Doe",
      "email": "johndoe@email.com",
      "phone": "+62812345678"
    }
}
```
```json Sample Request - Gopay Tokenization
{
    "name": "MONTHLY_2019",
    "amount": "14000",
    "currency": "IDR",
    "payment_type": "gopay",
    "token": "eyJ0eXBlIjogIkdPUEFZX1dBTExFVCIsICJpZCI6ICIifQ==",
    "schedule": {
      "interval": 1,
      "interval_unit": "month",
      "max_interval": 12,
      "start_time": "2020-07-22 07:25:01 +0700"
    },
    "metadata": {
      "description": "Recurring payment for A"
    },
    "customer_details": {
      "first_name": "John",
      "last_name": "Doe",
      "email": "johndoe@email.com",
      "phone": "+62812345678"
    },
    "gopay": {
      "account_id": "0dd2cd90-a9a9-4a09-b393-21162dfb713b"
    }
}
```

| JSON Attribute       | Description                                                                                                                                                                                                                                           | Type                                                           | Required    |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ----------- |
| name                 | Name of the subscription. It is used to generate order ID for the transaction. Generated order ID will contain subscription name and 32 digits of unique number.<br />**Note**: Allowed symbols are dash(-), underscore(\_), tilde (\~), and dot (.). | String(40)                                                     | Required    |
| amount               | The amount to be charged to the customer. <br />**Note**: Do not use decimal.                                                                                                                                                                         | String                                                         | Required    |
| currency             | ISO-4217 representation of three-letter alphabetic currency code. Value: `IDR`.<br />**Note**: Currently only `IDR` is supported.                                                                                                                     | String                                                         | Required    |
| payment\_type        | The payment method used by the customer. **Note**: Currently only `credit_card` and `gopay` are supported.                                                                                                                                            | String                                                         | Required    |
| token (Card Payment) | The `saved_token_id` for Card Payment. Credit Card token retrieved via [One Click Token Response](https://docs.midtrans.com/reference/card-feature-one-click#one-click-initial-charge-response-and-notifications)                                                              | String                                                         | Required    |
| token (GoPay)        | The `token` for Gopay Tokenization. GoPay token retrieved via [Get Pay Account API](https://docs.midtrans.com/reference/get-pay-account)                                                                                                                                       | String                                                         | Required    |
| schedule             | Details of the subscription schedule.                                                                                                                                                                                                                 | [Object](https://docs.midtrans.com/reference/create-subscription-schedule-object)       | Required    |
| retry\_schedule      | Details of the retry scheudle                                                                                                                                                                                                                         | [Object](https://docs.midtrans.com/reference/create-subscription-retry-schedule-object) | Optional    |
| metadata             | Metadata of subscription specified by you. <br />**Note**: Limit the size to less than 1KB.                                                                                                                                                           | Object                                                         | Optional    |
| customer\_details    | Details of the customer.                                                                                                                                                                                                                              | [Object](https://docs.midtrans.com/reference/subscription-customer-details-object)      | Optional    |
| gopay                | GoPay subscription information, required if payment type is `gopay`.                                                                                                                                                                                  | [Object](https://docs.midtrans.com/reference/subscription-gopay-object)                 | Conditional |

<br />

### Obtaining GoPay token

[Get Pay Account API](https://docs.midtrans.com/reference/get-pay-account) is called to retrieve GoPay Token, needed for GoPay subscriptions. Account ID can be retrieved from HTTP notification of first transaction charge that will be used to create subscription for the scheduled subsequent charges.

For the sandbox environment, refer to this \[[documentation](https://docs.midtrans.com/reference/testing-gopay-tokenization-on-sandbox-environment#testing-user-account)] to learn how to obtain the GoPay token. Note that you must use specific phone numbers provided in the documentation in order to create the GoPay token required for creating a subscription.

<br />

| HTTP Method | Endpoint                              | Definition                                         |
| ----------- | ------------------------------------- | -------------------------------------------------- |
| GET         | BASE\_URL/v2/pay/account/`account_id` | Get GoPay's account information and linked status. |

<br />

```json Sample Response - Enabled
{
  "status_code": "200",
  "payment_type": "gopay",
  "account_id": "00000269-7836-49e5-bc65-e592afafec14",
  "account_status": "ENABLED",
  "metadata": {
    "payment_options": [
      {
        "name": "GOPAY_WALLET",
        "active": true,
        "balance": {
          "value": "1000000.00",
          "currency": "IDR"
        },
        "metadata": {},
        "token": "eyJ0eXBlIjogIkdPUEFZX1dBTExFVCIsICJpZCI6ICIifQ==" // The token is used for Subscription 
      }
    ]
  }
}
```

<br />

### Obtaining card token & GoPay account ID via Get Transaction API

[Get Transaction API](https://docs.midtrans.com/reference/get-transaction-status) is used to get card `token` that has been saved in the first transaction charge facilitated in a One Click flow, or GoPay `account_id` mapped to the `user_id` passed during create Snap Token creation, that is needed to make the subsequent scheduled charges with Subscription API.

<br />

| HTTP Method | Endpoint                                           | Definition                                          |
| ----------- | -------------------------------------------------- | --------------------------------------------------- |
| GET         | BASE\_URL/v2/`{order_id OR transaction_id}`/status | Get the status of transaction and card information. |

<br />

```json Sample Response - Enabled
{
    "masked_card": "48111111-1114",
    "approval_code": "1689306913393",
    "bank": "cimb",
    "eci": "05",
    "saved_token_id": "48111111ktaqYoxJQAGvXBoxEPqO1114", // The token is used for Subscription 
    "saved_token_id_expired_at": "2024-11-30 07:00:00",
    "channel_response_code": "00",
    "channel_response_message": "Approved",
    "three_ds_version": "2",
    "transaction_time": "2023-07-14 10:55:09",
    "gross_amount": "20000.00",
    "currency": "IDR",
    "order_id": "sample-store-1689306888",
    "payment_type": "credit_card",
    "signature_key": "40df7114b015e899526f78f98ff7a0297fa8ba270e5a436687af9cfee2ec471444dd239834d8836f217b1bdf12e9677cb65643470dc666c578fb120b8135480b",
    "status_code": "200",
    "transaction_id": "a4e2f006-2cc1-4110-ac38-811e4c427199",
    "transaction_status": "capture",
    "fraud_status": "accept",
    "expiry_time": "2023-07-14 11:05:09",
    "status_message": "Success, Credit Card transaction is successful",
    "merchant_id": "M123",
    "card_type": "credit",
    "challenge_completion": true
}
```

<br />

<br />

### OPTIONAL : Authenticating first transaction for GoPay Subscription

<br />

All payment transactions beyond the linking step will not have an additional authentication challenge e.g. PIN challenge in GoPay app. As such all additional authentication - if deemed as needed- will need to be set up in merchant's web/app directly between merchant and customers, before initiating the payment charge to Subscription API.

Do note that during onboarding, you might be required to perform authentication on first transaction - this is referring to merchant's own authentication, as this is not part of Subscription API / GoPay Tokenization payment flow.

<br />

***

<br />

## Create Subscription Sample Response

```json Success - Card
{
  "id": "d98a63b8-97e4-4059-825f-0f62340407e9",
  "name": "MONTHLY_2019",
  "amount": "14000",
  "currency": "IDR",
  "created_at": "2019-05-29T09:11:01.810452",
  "schedule": {
    "interval": 1,
    "interval_unit": "month",
    "start_time": "2019-05-29T09:11:01.803677",
    "previous_execution_at": "2019-05-29T09:11:01.803677",
    "next_execution_at": "2019-06-29T09:11:01.803677"
  },
  "retry_schedule": {
  	"interval": 1,
  	"interval_unit": "day",
    "max_interval": 3,
  },
  "status": "active",
  "token": "48111111sHfSakAvHvFQFEjTivUV1114",
  "payment_type": "credit_card",
  "metadata": {
    "description": "Recurring payment for A"
  },
  "customer_details": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@email.com",
    "phone": "+62812345678"
  }
}
```
```json Success - GoPay
{
  "id": "d98a63b8-97e4-4059-825f-0f62340407e9",
  "name": "MONTHLY_2019",
  "amount": "14000",
  "currency": "IDR",
  "created_at": "2019-05-29T09:11:01.810452",
  "schedule": {
    "interval": 1,
    "interval_unit": "month",
    "start_time": "2019-05-29T09:11:01.803677",
    "previous_execution_at": "2019-05-29T09:11:01.803677",
    "next_execution_at": "2019-06-29T09:11:01.803677"
  },
  "status": "active",
  "token": "48111111sHfSakAvHvFQFEjTivUV1114",
  "payment_type": "credit_card",
  "metadata": {
    "description": "Recurring payment for A"
  },
  "customer_details": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@email.com",
    "phone": "+62812345678"
  },
  "gopay": {                                                    
    "account_id": "phy56f8f-2683-4248-8080-e59b36c6bbgf"
  }
}
```
```json Status Code: 400
{
  "status_message": "Invalid parameter.",
  "validation_messages": [
    "subscription.amount is required"
  ]
}
```
```json Status Code: 500
{
  "status_message": "Sorry, Our system is recovering from unexpected issues. Please retry."
}
```

| JSON Attribute       | Description                                                                                                                           | Type                                                           | Notes       |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------- | :---------- |
| id                   | Subscription ID given by Midtrans.                                                                                                    | String                                                         |             |
| name                 | Subscription name specified by you.                                                                                                   | String                                                         |             |
| amount               | Amount specified by you for recurring charge.                                                                                         | String                                                         |             |
| currency             | ISO-4217 representation of three-letter alphabetic currency code. Value: `IDR`.<br />**Note**: Currently only `IDR` is supported.     | String                                                         |             |
| created\_at          | Subscription schedule creation timestamp in ISO 8601 format. Time Zone: GMT + 7.                                                      | String                                                         |             |
| schedule             | Details of the subscription schedule.                                                                                                 | [Object](https://docs.midtrans.com/reference/subscription-schedule-object)              |             |
| retry\_schedule      | Details of the retry subscription schedule.                                                                                           | [Object](https://docs.midtrans.com/reference/create-subscription-retry-schedule-object) |             |
| status               | Current subscription status. <br /> Possible values are `active`, `inactive`.                                                         | String                                                         |             |
| token (Card Payment) | The `saved_token_id` for Card Payment. Credit Card token retrieved via [Get Pay Account API](https://docs.midtrans.com/reference/get-pay-account).             | String                                                         |             |
| token (GoPay)        | Token that is retrieved via [Get Pay Account API](https://docs.midtrans.com/reference/get-pay-account)                                                         | String                                                         |             |
| payment\_type        | The payment method used by the customer. Value: `credit_card`.<br />**Note**: Currently only `credit_card` and `gopay` are supported. | String                                                         |             |
| metadata             | Metadata of subscription specified by you. <br />**Note**: Limit the size to less than 1KB.                                           | Object                                                         | Conditional |
| customer\_details    | Details of the customer.                                                                                                              | [Object](reference/subscription-customer-details-object)       |             |
| status\_message      | Description of the error.                                                                                                             | String                                                         |             |
| validation\_message  | Detailed description of the error.                                                                                                    | Array(String)                                                  |             |
| account\_id (GoPay)  | GoPay account ID                                                                                                                      | String                                                         |             |

<br />

## Retry Mechanism if Subscription Fails

<br />

If for some reason deduction fails, Midtrans will perform automatic retries 3 times for every one hour by default (unless customized) before marking subscription as `inactive`. Retries for every charge will be attempted until exhausted regardless of subscription's status. To test for the automatic retries, you can try to simulate with cases that returns error such as incorrect card token, or GoPay account is in unlinked state prior to charge.

If you do not want to retry your failed subscription charge, simply specify the `max_interval` parameter in the `retry_schedule` object as `0`.

<br />

> 📘 Retry notification
>
> Note that Midtrans Payment API will send HTTP notification for every transactions' attempt; while Midtrans's Subscription API will send a [separate notification](https://docs.midtrans.com/reference/http-notification) at the end of retry attempt cycle of every transaction or once retry is successful. As such, use Subscription HTTP notification should be referred to when handling failed or success subscriptions.

<br />

**Example of retry schedules  :**\
There's a payment that's failed to be processed at 11 Oct 2022 15.48 GMT+7. Then, Midtrans will automatically retry at :

* 11 Oct 2022 16.48 GMT+7
* 11 Oct 2022 17.48 GMT+7
* 11 Oct 2022 18.48 GMT+7

<br />

## OPTIONAL - Accepting Subscription in Snap Checkout

<br />

Use [this object](https://docs.midtrans.com/reference/json-objects#recurringsubscription-object) to show a dedicated recurring flow UI in Snap - differences include card will be automatically saved without having user manually tick the checkbox and adjusted copy to better suit recurring payments. Snap will then return the information passed here back in HTTP notification, for you to utilize when creating a subscription via the Subscription API.

Use this object in conjunction with Subscription API - add this object to alter the Snap customer UI, then convert the transaction to recurring payments using Subscription API. Make sure to also have the prerequisites to accept Subscription (e.g. [One Click feature](https://docs.midtrans.com/reference/one-click)) - otherwise transactions might fail.

Note that if you do choose to pass the `start_time` and `interval_unit` within the object, make sure to use the same information when calling the Subscription API - otherwise, information presented to user and actual subscription charge schedule will be different, which might result in chargeback.

<br />

```json JSON Parameters
...
"recurring": {
    "required": true,
    "start_time": "2024-06-09 15:07:00 +0700",
    "interval_unit": "week"
}
...
```

| Parameter       | Description                                                                                                               | Type    | Required                                 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------- |
| `required`      | Specify the intent whether payment will be utilizing recurring payments or not.                                           | Integer | Required (if recurring object is passed) |
| `start_time`    | Start of the subscription schedule. Passed information will be shown in Snap Checkout UI & returned in HTTP Notification. | String  | Optional                                 |
| `interval_unit` | Subscription charge internal unit                                                                                         | String  | Optional                                 |

# OpenAPI definition

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "coreapi",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://api.sandbox.midtrans.com"
    }
  ],
  "components": {
    "securitySchemes": {
      "sec0": {
        "type": "http",
        "scheme": "basic"
      }
    }
  },
  "security": [
    {
      "sec0": []
    }
  ],
  "paths": {
    "/v1/subscriptions": {
      "post": {
        "summary": "Create Subscription",
        "description": "",
        "operationId": "create-subscription",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "name",
                  "amount",
                  "currency",
                  "payment_type",
                  "token",
                  "schedule"
                ],
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "amount": {
                    "type": "string"
                  },
                  "currency": {
                    "type": "string"
                  },
                  "payment_type": {
                    "type": "string"
                  },
                  "token": {
                    "type": "string"
                  },
                  "schedule": {
                    "type": "object",
                    "required": [
                      "interval",
                      "interval_unit",
                      "max_interval",
                      "start_time"
                    ],
                    "properties": {
                      "interval": {
                        "type": "integer",
                        "format": "int32"
                      },
                      "interval_unit": {
                        "type": "string"
                      },
                      "max_interval": {
                        "type": "integer",
                        "format": "int32"
                      },
                      "start_time": {
                        "type": "string",
                        "format": "date-time"
                      }
                    }
                  },
                  "customer_details": {
                    "type": "object",
                    "properties": {
                      "first_name": {
                        "type": "string",
                        "default": "Budi"
                      },
                      "last_name": {
                        "type": "string",
                        "default": "Utomo"
                      },
                      "email": {
                        "type": "string",
                        "default": "budi.utomo@midtrans.com"
                      },
                      "phone": {
                        "type": "string",
                        "default": "081223323423"
                      },
                      "customer_details_required_fields": {
                        "type": "array",
                        "default": [
                          "email",
                          "first_name",
                          "phone"
                        ],
                        "items": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "gopay": {
                    "type": "object",
                    "required": [
                      "account_id"
                    ],
                    "properties": {
                      "account_id": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"id\": \"d98a63b8-97e4-4059-825f-0f62340407e9\",\n  \"name\": \"MONTHLY_2019\",\n  \"amount\": \"14000\",\n  \"currency\": \"IDR\",\n  \"created_at\": \"2019-05-29T09:11:01.810452\",\n  \"schedule\": {\n    \"interval\": 1,\n    \"interval_unit\": \"month\",\n    \"start_time\": \"2019-05-29T09:11:01.803677\",\n    \"previous_execution_at\": \"2019-05-29T09:11:01.803677\",\n    \"next_execution_at\": \"2019-06-29T09:11:01.803677\"\n  },\n  \"status\": \"active\",\n  \"token\": \"48111111sHfSakAvHvFQFEjTivUV1114\",\n  \"payment_type\": \"credit_card\",\n  \"metadata\": {\n    \"description\": \"Recurring payment for A\"\n  },\n  \"customer_details\": {\n    \"first_name\": \"John\",\n    \"last_name\": \"Doe\",\n    \"email\": \"johndoe@email.com\",\n    \"phone\": \"+62812345678\"\n  }\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "d98a63b8-97e4-4059-825f-0f62340407e9"
                    },
                    "name": {
                      "type": "string",
                      "example": "MONTHLY_2019"
                    },
                    "amount": {
                      "type": "string",
                      "example": "14000"
                    },
                    "currency": {
                      "type": "string",
                      "example": "IDR"
                    },
                    "created_at": {
                      "type": "string",
                      "example": "2019-05-29T09:11:01.810452"
                    },
                    "schedule": {
                      "type": "object",
                      "properties": {
                        "interval": {
                          "type": "integer",
                          "example": 1,
                          "default": 0
                        },
                        "interval_unit": {
                          "type": "string",
                          "example": "month"
                        },
                        "start_time": {
                          "type": "string",
                          "example": "2019-05-29T09:11:01.803677"
                        },
                        "previous_execution_at": {
                          "type": "string",
                          "example": "2019-05-29T09:11:01.803677"
                        },
                        "next_execution_at": {
                          "type": "string",
                          "example": "2019-06-29T09:11:01.803677"
                        }
                      }
                    },
                    "status": {
                      "type": "string",
                      "example": "active"
                    },
                    "token": {
                      "type": "string",
                      "example": "48111111sHfSakAvHvFQFEjTivUV1114"
                    },
                    "payment_type": {
                      "type": "string",
                      "example": "credit_card"
                    },
                    "metadata": {
                      "type": "object",
                      "properties": {
                        "description": {
                          "type": "string",
                          "example": "Recurring payment for A"
                        }
                      }
                    },
                    "customer_details": {
                      "type": "object",
                      "properties": {
                        "first_name": {
                          "type": "string",
                          "example": "John"
                        },
                        "last_name": {
                          "type": "string",
                          "example": "Doe"
                        },
                        "email": {
                          "type": "string",
                          "example": "johndoe@email.com"
                        },
                        "phone": {
                          "type": "string",
                          "example": "+62812345678"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```