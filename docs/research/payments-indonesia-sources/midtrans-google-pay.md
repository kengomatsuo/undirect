---
updatedAt: 2026-07-27T09:19:10.000Z
agentTools:
  projectIndex: https://docs.midtrans.com/llms.txt
---

# Payment Method: Google Pay™

Google Pay™ offers a fast, secure way for customers to pay using their Google accounts (currently only payment using cards is available in Indonesia). Midtrans sends real-time notification when the customer completes the payment.

The payment flow would be as following sequence diagram:

<Image src="https://files.readme.io/fb794bf925879f84269acf962792389bcf294e0f1c6f87114fbfb97c3d63faf7-Google_Pay.png" align="center" />

The steps to integrate Google Pay™ with Midtrans are given as follow:

1. Generate JWT Token
2. Create Google Pay™ button
3. Send Charge Request using token acquired from Google Pay™ API

<Callout icon="📘" theme="info">
  ### Note

  Currently, JWT Token would not be required if you are testing on Midtrans Sandbox. So for Sandbox testing,  you are allowed to skip Step 1 and go directly to Step 2
</Callout>

***

## API Environments

Google Pay™ integration uses dedicated authentication domain (panapi.midtrans.com) which is separate from the Midtrans Core API domain you use for Non Google Pay / Non Full PAN request. Make sure you hit the matching environment on both - a JWT generated on one environment is not valid for the other, and each environment only accepts its own client key.

| Environment | JWT Token API                                     | Charge API                                      | Post-Charge APIs (Status, Cancel, Refund) |
| ----------- | ------------------------------------------------- | ----------------------------------------------- | ----------------------------------------- |
| Sandbox     | <https://panapi.sandbox.midtrans.com/google_auth> | <https://panapi.sandbox.midtrans.com/v2/charge> | <https://api.sandbox.midtrans.com>        |
| Production  | <https://panapi.midtrans.com/google_auth>         | <https://panapi.midtrans.com/v2/charge>         | <https://api.midtrans.com>                |

***

## 1. Generate JWT Token

You are required to create a JWT Token which will be used for Google Pay™ API requests to display the Google Pay™ button in your payment checkout page.

The Google Pay™ API JavaScript Web Token (JWT) solution enables authorized web platform partners to integrate the Google Pay™ API for Web without having individual merchants register each web domain in the Google Pay & Wallet Console.

### JWT Request

```json Sample JWT Request
curl 'https://panapi.midtrans.com/google_auth' \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic Y2xpZW50X2tleTo=' \
  --data-raw '{"merchantOrigin":"examplestore.com"}'// use your payment checkout page domain
```

| Key            | Description                  | Type   | Required |
| :------------- | ---------------------------- | ------ | -------- |
| merchantOrigin | The origin of sub-merchant   | String | Required |
| Authorization  | Contains merchant client key | String | Required |

> **Note:** To generate authorization from merchant client key, you can use below sample:
>
> ```json Sample Client Key Authorization
> $ echo -n "<MERCHANT_CLIENT_KEY>:" | base64
> ```

### JWT Response

```json Sample JWT Response
{
    "authJwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

| Key     | Description                                                                                       | Type   |
| ------- | ------------------------------------------------------------------------------------------------- | ------ |
| authJwt | The signature algorithm to use in the header is the ES256 signing algorithm and the type is `JWT` | String |

***

## 2. Create Google Pay™ Button

After acquiring the JWT Token, you can follow the steps in this Google Pay™ [Tutorial](https://developers.google.com/pay/api/web/guides/tutorial?authuser=5) to integrate your web application with the Google Pay™ API, and configure it to accept payment cards. This configuration would allow you to create a Google Pay™ button to be displayed and actionable for payment proceeding.

<Image src="https://files.readme.io/7a2308023bfd515cd7758317a14de9ebdf3ec4b3658b4c6b47c62c95d00b7b82-googlepay2.png" align="center" />

During payment tokenization method selection, choose **GATEWAY**. Specify **midtrans** as the `gateway` and  fill in **BCR2DN4T2PNOHCSD** in the `gatewayMerchantId parameter`.

Midtrans currently only supports `VISA`, `MASTERCARD`, `JCB` and `AMEX` networks. For `AMEX`, please contact us for further enablement process.

<Callout icon="📘" theme="info">
  ### Note

  On test environment, Google will only return card number of 4111111111111111
</Callout>

***

## 3. Send Charge Request

To process your card payment using Google Pay™, you are required to send a Charge Request for card as below sample:

### Charge Request

```json Sample Charge Request for Google Pay™
{
  "payment_type": "credit_card",
  "transaction_details": {
    "order_id": "C17550",
    "gross_amount": 145000
  },
  "credit_card": {
    "google_pay_token": { // instead of token_id, we will pass google_pay_token
      "protocolVersion":"ECv2",
      "signature":"MEQCIH6Q4OwQ0jAceFEkGF0JID6sJNXxOEi4r+mA7biRxqBQAiAondqoUpU/bdsrAOpZIsrHQS9nwiiNwOrr24RyPeHA0Q\u003d\u003d",
      "intermediateSigningKey":{
        "signedKey": "{\"keyExpiration\":\"1542323393147\",\"keyValue\":\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE/1+3HBVSbdv+j7NaArdgMyoSAM43yRydzqdg1TxodSzA96Dj4Mc1EiKroxxunavVIvdxGnJeFViTzFvzFRxyCw\\u003d\\u003d\"}",
        "signatures": ["MEYCIQCO2EIi48s8VTH+ilMEpoXLFfkxAwHjfPSCVED/QDSHmQIhALLJmrUlNAY8hDQRV/y1iKZGsWpeNmIP+z+tCQHQxP0v"]
      },
      "signedMessage":"{\"tag\":\"jpGz1F1Bcoi/fCNxI9n7Qrsw7i7KHrGtTf3NrRclt+U\\u003d\",\"ephemeralPublicKey\":\"BJatyFvFPPD21l8/uLP46Ta1hsKHndf8Z+tAgk+DEPQgYTkhHy19cF3h/bXs0tWTmZtnNm+vlVrKbRU9K8+7cZs\\u003d\",\"encryptedMessage\":\"mKOoXwi8OavZ\"}"
    },
    "authentication": true,// true if you'd like to enable 3DS for the transaction
  }
}
```

| JSON Attribute       | Description                                                                                                                                                                                                                                                                                                                                       | Type                                     | Required |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------- | :------- |
| payment\_type        | The payment method used by the customer. <br /> Value: `credit_card`. <br />**Note**: For any transactions using payment card (credit or debit), `payment_type` is `credit_card`.                                                                                                                                                                 | String (255)                             | Required |
| transaction\_details | The details of the specific transaction such as `order_id` and `gross_amount`.                                                                                                                                                                                                                                                                    | [Object](https://docs.midtrans.com/reference/transaction-details-object) | Required |
| credit\_card         | The details of the payment card used for the transaction. <br /> For Google Pay™, instead of `token_id`, you should pass `google_pay_token` which is the token you would receive from the Google API [PaymentData](https://developers.google.com/pay/api/web/guides/resources/payment-data-cryptography#payment-method-token-structure) response. | [Object](https://docs.midtrans.com/reference/credit-card-object)         | Required |
| item\_details        | Details of the item(s) purchased by the customer.                                                                                                                                                                                                                                                                                                 | [Object](https://docs.midtrans.com/reference/item-details-object)        | Optional |
| customer\_details    | Details of the customer.                                                                                                                                                                                                                                                                                                                          | [Object](https://docs.midtrans.com/reference/customer-details-object)    | Optional |
| authentication       | Flag to enable the 3D secure authentication. Default value is `false`.                                                                                                                                                                                                                                                                            | Boolean                                  | Optional |

### Charge Response

```json Sample Charge Response for Google Pay™
{
  "status_code": "201",
  "status_message": "Success, Credit Card transaction is successful",
  "transaction_id": "1a1a66f7-27a7-4844-ba1f-d86dcc16ab27",
  "order_id": "C17550",
  "redirect_url": "https://api.veritrans.co.id/v2/3ds/redirect/451249-2595-e14aac7f-cfb3-4ab2-98ab-5cc5e70f4b2c",
  "gross_amount": "145000.00",
  "currency": "IDR",
  "payment_type": "credit_card",
  "transaction_time": "2018-09-12 22:10:23",
  "transaction_status": "pending",
  "masked_card": "48111111-1114",
  "card_type": "credit",
  "three_ds_version": "2",
  "on_us": true
}
```

The 3DS response is identical with [Card Payment Charge Response](https://docs.midtrans.com/reference/charge-transactions-on-card#card-charge-response-and-notifications), with the additional attributes will be added if you enable the [3DS](https://docs.midtrans.com/reference/card-feature-3d-secure-3ds) feature

<Callout icon="📘" theme="info">
  ### Note

  When you are testing the payment using Google Pay™ in Midtrans sandbox, you need to set different transaction amounts to reflect different cases, such as:

  - The charge will be successful/accepted if the transaction amount is set as  IDR 10,002 or IDR 10,004.
  - If the transaction amount is set as IDR 10,001 or IDR 10,003, the charge will be denied.
  - Any other transaction amounts will result in the charge being denied with an unknown card error.
</Callout>

<br />