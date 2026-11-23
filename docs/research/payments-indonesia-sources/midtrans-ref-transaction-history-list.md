---
updatedAt: 2025-11-10T23:19:22.000Z
agentTools:
  projectIndex: https://docs.midtrans.com/llms.txt
---

# Transaction History List API

> 📘
>
> Please make sure to use BI SNAP Credentials to utilize any of the Reporting APIs. Refer to [here](https://docs.midtrans.com/reference/getting-started-1) to understand how to retrieve your credentials.

<br />

This API is used to get merchant's transaction history list.

<br />

| Path              | /\{version}/transaction-history-list |
| :---------------- | :----------------------------------- |
| HTTP Method       | POST                                 |
| Version           | v1.0                                 |
| SNAP Service Code | 12                                   |

## Request Header

| Field Name    | Field Type | Mandatory | Field Description                                                                                                                                        |
| :------------ | :--------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content-type  | String     | M         | Media type of the resource, i.e. application/json                                                                                                        |
| X-TIMESTAMP   | String     | M         | Client’s current local time in ISO-8601 format                                                                                                           |
| X-SIGNATURE   | String     | M         | Unique identifier for partner                                                                                                                            |
| Authorization | String     | M         | Represents access\_token of a request; string starts with keyword “Bearer ” followed by access\_token. Can get this token from Access Token B2B response |
| X-PARTNER-ID  | String     | M         | Unique identifier for partner                                                                                                                            |
| X-EXTERNAL-ID | String     | M         | Alphanumeric string. Preferably UUID. Reference number that should be unique in the same day or 1 day idempotency key                                    |
| CHANNEL-ID    | String     | M         | Device identification on which the API services are currently being accessed by the end user. Given by BI                                                |

```
Content-type: application/json
X-TIMESTAMP: 2020-12-18T15:34:40+07:00
X-SIGNATURE: 85be817c55b2c135157c7e89f52499bf0c25ad6eeebe04a986e8c862561b19a5
Authorization: Bearer gp9HjjEj813Y9JGoqwOeOPWbnt4CUpvIJbU1mMU4a11MNDZ7Sg5u9a
X-PARTNER-ID: 82150823919040624621823174737537
X-EXTERNAL-ID: 41807553358950093184162180797837
CHANNEL-ID: 95221
```

<br />

## Request Body

| Field Name                      | Field Type      | Mandatory | Field Description                                                                                                                                                                                  |
| :------------------------------ | :-------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| partnerReferenceNo              | String(64)      | O         | Transaction identifier on service consumer system. This will be used as search query.                                                                                                              |
| fromDateTime                    | String(25)      | O         | Starting time range in ISO-8601 format. Default: NOW - 3 months. Limited to the latest of 6 months, e.g: if NOW = 2024-02-23T23:59:59+07:00, fromDateTime can start from 2023-08-01T00:00:00+07:00 |
| toDateTime                      | String(25)      | O         | Ending time range in ISO-8601 format. Default: NOW                                                                                                                                                 |
| pageSize                        | int             | O         | Maximum number of transaction returned in one pagination. Default: 10. Max: 50                                                                                                                     |
| pageNumber                      | int             | O         | Current page number. Default: 0                                                                                                                                                                    |
| additionalInfo                  | Object          | O         | Additional information                                                                                                                                                                             |
| additionalInfo.types            | Array of String | O         | Transaction type, i.e: PAYMENT, TOP\_UP, WITHDRAWAL, DISBURSEMENT. List of types can be referred [here](https://docs.midtrans.com/reference/transaction-history-values)                            |
| additionalInfo.\{type}.statuses | Array of String | O         | Transaction status. \{type}: payment, topUp, withdrawal, disbursement. List of statuses can be referred [here](https://docs.midtrans.com/reference/transaction-history-values)                     |
| additionalInfo.sortOrder        | String          | O         | Sorting order based on transaction time, i.e: ASC, DESC                                                                                                                                            |

```
{
  "partnerReferenceNo": "2020102900000000000001",
  "fromDateTime":"2019-07-03T12:08:56+07:00",
  "toDateTime":"2020-07-03T12:08:56+07:00",
  "pageSize":"10",
  "pageNumber":"2",
  "additionalInfo": {
    "types": ["PAYMENT", "TOP_UP", "WITHDRAWAL", "DISBURSEMENT"],
    "payment": {
      "statuses": ["DENIED"]
    },        
    "topUp": {
      "statuses": ["SETTLEMENT"]
    },
    "withdrawal": {
      "statuses": ["CANCELLED"]
    },
    "disbursement": {
      "statuses": ["FAILED"]
    },
    "sortOrder": "DESC"
  }
}
```

<br />

## Response Header

| Field Name   | Field Type | Mandatory | Field Description                                 |
| :----------- | :--------- | :-------- | :------------------------------------------------ |
| Content-type | String     | M         | Media type of the resource, i.e. application/json |
| X-TIMESTAMP  | String     | M         | Client’s current local time in ISO-8601 format    |

```
Content-type: application/json
X-TIMESTAMP: 2020-12-18T15:34:40+07:00
```

<br />

## Response Body

| Field Name                        | Field Type   | Mandatory | Field Description                                                                                                                      |
| :-------------------------------- | :----------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| responseCode                      | String(7)    | M         | Response code (HTTP status code + service code + case code)                                                                            |
| responseMessage                   | String(150)  | M         | Response description                                                                                                                   |
| dateTime                          | String(25)   | M         | Transaction created time in ISO-8601 format                                                                                            |
| amount                            | Object       | M         | Amount information                                                                                                                     |
| amount.value                      | String(16,2) | M         | Net amount of the transaction                                                                                                          |
| amount.currency                   | String(3)    | M         | Currency                                                                                                                               |
| remark                            | String(256)  | O         | Transaction remark (only applicable for Midtrans transaction type DISBURSEMENT)                                                        |
| status                            | String(32)   | M         | Transaction status (BI-SNAP)                                                                                                           |
| type                              | String(32)   | M         | Transaction type (BI-SNAP)                                                                                                             |
| additionalInfo                    | Object       | O         | Additional information                                                                                                                 |
| additionalInfo.referenceNo        | String(64)   | M         | Transaction identifier on service provider system                                                                                      |
| additionalInfo.partnerReferenceNo | String(64)   | M         | Transaction identifier on service consumer system                                                                                      |
| additionalInfo.status             | String(32)   | M         | Transaction status (Midtrans). List of statuses can be referred [here](https://docs.midtrans.com/reference/transaction-history-values) |
| additionalInfo.type               | String(32)   | M         | Transaction type (Midtrans). List of types can be referred [here](https://docs.midtrans.com/reference/transaction-history-values)      |
| additionalInfo.channel            | String(100)  | M         | Transaction channel. List of channels can be referred [here](https://docs.midtrans.com/reference/transaction-history-values)           |
| additionalInfo.customerEmail      | String(100)  | O         | Customer email                                                                                                                         |
| additionalInfo.accountNo          | String(32)   | O         | Account number                                                                                                                         |
| additionalInfo.fee                | Object       | M         | Fee information                                                                                                                        |
| additionalInfo.fee.value          | String(16,2) | M         | Net amount of the fee                                                                                                                  |
| additionalInfo.fee.currency       | String(3)    | M         | Currency                                                                                                                               |

```Text 200 OK
{
  "responseCode": "2001200",
  "responseMessage": "Success",
  "detailData": [
    {
      "dateTime": "2019-07-03T12:08:56+07:00",
      "amount": {
        "value": "12345678.00",
        "currency": "IDR"
      },
      "status": "SUCCESS",
      "type": "PAYMENT",
      "additionalInfo": {
        "referenceNo": "2020102977770000000009",
        "partnerReferenceNo": "2020102900000000000001",
        "status": "SETTLEMENT",
        "type": "PAYMENT",
        "channel": "qris",
        "customerEmail": "john.doe@gmail.com",
        "accountNo": "123456",
        "fee": {
          "value": "1000.00",
          "currency": "IDR"
        }
      }
    },
    {
      "dateTime": "2019-08-03T12:08:56+07:00",
      "amount": {
        "value": "10000.00",
        "currency": "IDR"
      },
      "remark": "Payout to Warung Ikan Bakar",
      "status": "SUCCESS",
      "type": "SEND_MONEY",
      "additionalInfo": {
        "referenceNo": "fRTsJ610pLDtagjrAX",
        "partnerReferenceNo": "fRTsJ610pLDtagjrAX",
        "status": "COMPLETED",
        "type": "DISBURSEMENT",
        "channel": "PT. BANK CENTRAL ASIA TBK.",
        "customerEmail": "john.doe@gmail.com",
        "accountNo": "8917379123",
        "fee": {
          "value": "0.00",
          "currency": "IDR"
        }
      }
    },
    {
      "dateTime": "2019-09-03T12:08:56+07:00",
      "amount": {
        "value": "14990.00",
        "currency": "IDR"
      },
      "status": "SUCCESS",
      "type": "RECEIVE_MONEY",
      "additionalInfo": {
        "referenceNo": "P91637",
        "partnerReferenceNo": "P91637",
        "status": "PROCESSING",
        "type": "WITHDRAWAL",
        "channel": "PT. BANK MANDIRI (PERSERO) TBK.",
        "accountNo": "1111222233333",
        "fee": {
          "value": "0.00",
          "currency": "IDR"
        }
      }
    },
    {
      "dateTime": "2019-10-03T12:08:56+07:00",
      "amount": {
        "value": "1000.00",
        "currency": "IDR"
      },
      "status": "SUCCESS",
      "type": "TOP_UP",
      "additionalInfo": {
        "referenceNo": "36d39559b50e451da6d33994940ab054",
        "partnerReferenceNo": "e1bee3e8-7dc7-4341-829e-1f72dcbf03ca",
        "status": "SETTLEMENT",
        "type": "TOP_UP",
        "channel": "bri_virtual_account_number",
        "accountNo": "443317724057786957",
        "fee": {
          "value": "0.00",
          "currency": "IDR"
        }
      }
    }
  ]
}
```
```Text 401 Unauthorized
{
  "responseCode": "4011200", 
  "responseMessage": "Unauthorized. Client"
}
```

<br />

## List of Response Codes

| Response Code | HTTP Status | Description                                                     |
| :------------ | :---------- | :-------------------------------------------------------------- |
| 2001200       | 200         | Successful                                                      |
| 4001201       | 400         | Invalid field format \{........}                                |
| 4001202       | 400         | Missing mandatory field \{........}                             |
| 4011200       | 401         | Unauthorized signature                                          |
| 4011201       | 401         | Access token invalid                                            |
| 4091200       | 409         | Cannot use same X-EXTERNAL-ID in same day                       |
| 5001201       | 500         | Unknown internal server failure, please retry the process again |