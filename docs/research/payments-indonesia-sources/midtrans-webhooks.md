---
updatedAt: 2026-11-16T10:55:16.000Z
agentTools:
  projectIndex: https://docs.midtrans.com/llms.txt
---

# HTTP(S) Notification / Webhooks

HTTP(S) POST notifications or Webhooks are sent to your server when the customer completes the payment process or when transaction status changes. These notifications help you to update payment status or take suitable actions in real-time.

Midtrans HTTP(S) POST Notification can be configured by configuring the *Payment Notification URL* from SETTINGS on *Dashboard*.

<br />

<br />

***

<br />

# <b> Configuring HTTP Notifications On MAP</b>

<br />

To receive notifications of transactions, HTTP notifications are configured as explained in the steps given below.

1. Login to your MAP account.
2. On the Home page, go to **SETTINGS > CONFIGURATION**.
3. Enter Required fields.
4. Click **Update**.

<br />

![](https://files.readme.io/4d95266-Midtrans-HTTP-Notification.png)

<br />

> 📘 Note
>
> URL protocol prefix `https://` or `http://` are required. We highly recommended to use `https://` for security purposes.

<br />

### Definition Table

The table given below describes the fields that can be configured from the Merchant Administrative Portal (MAP).

| Field                      | Description                                                                                                             |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Payment Notification URL   | The URL to which notification is to be sent when a payment is made by a customer.                                       |
| Recurring Notification URL | The URL to which notification is to be sent when a payment recurs.                                                      |
| Finish Redirect URL        | The URL to which the customer is redirected when a transaction is finished.                                             |
| Unfinished Redirect URL    | The URL to which the notifications are sent when a transaction is unfinished or if the customer clicks *Back* to order. |
| Error Redirect URL         | The URL to which the notifications are sent when an error occurs during payment or if the payment is unsuccessful.      |

<br />

<Callout icon="❗️" theme="error">
  Make sure that the Notification URL **can be reached from Public Internet**. Midtrans **cannot send notifications to localhost**, URL protected with authorization or password, URL behind VPN, unusual destination port, and so on. You may also need to make sure the [following IP address](https://docs.midtrans.com/docs/ip-address) is not blocked from your infrastructure. If you just want to make sure the notification is authentic, you can implement [Verifying Notification Authenticity section](#b-verifying-notification-authenticity-b) below.
</Callout>

> 📘 Tips
>
> If you are still running/developing your notification handler on localhost, you can utilize the services (such as [Ngrok](https://ngrok.com/), [Tsocket](http://tsocket.org/), [Localhost.Run](http://localhost.run/), and so on) to expose your localhost server to public Internet. Once you have obtained the Internet accessible URL, you can add it to the *Notification URL* field on *Dashboard*.

<br />

***

<br />

# <b>Sample HTTP Notifications Sent From Midtrans</b>

<br />

| Key            | Type                             |
| -------------- | -------------------------------- |
| Kind           | HTTP Request                     |
| Request Method | `POST`                           |
| Request Header | `Content-Type: application/json` |
| Request Body   | `string` of JSON                 |

<br />

## Sample in CURL

<br />

Some example of how the HTTP notification will be sent from Midtrans side:

```curl
curl -X POST \
  https://tokoecommerc.com/payment-notification-handler/ \
  -H 'User-Agent: Veritrans' \
  -H 'Accept: application/json'\
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_time": "2020-01-09 18:27:19",
  "transaction_status": "capture",
  "transaction_id": "57d5293c-e65f-4a29-95e4-5959c3fa335b",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "16d6f84b2fb0468e2a9cf99a8ac4e5d803d42180347aaa70cb2a7abb13b5c6130458ca9c71956a962c0827637cd3bc7d40b21a8ae9fab12c7c3efe351b18d00a",
  "payment_type": "credit_card",
  "order_id": "Postman-1578568851",
  "merchant_id": "G141532850",
  "masked_card": "48111111-1114",
  "gross_amount": "10000.00",
  "fraud_status": "accept",
  "eci": "05",
  "currency": "IDR",
  "channel_response_message": "Approved",
  "channel_response_code": "00",
  "card_type": "credit",
  "bank": "bni",
  "approval_code": "1578569243927"
}'
```

<br />

## Sample for Various Payment Methods

<br />

Some sample HTTP notifications for a successful transaction on different payment methods are given below.

Tips: You can "scroll right" on the below tab's header to see more payment method's tabs.

```json Card
{
  "transaction_time": "2020-01-09 18:27:19",
  "transaction_status": "capture",
  "transaction_id": "57d5293c-e65f-4a29-95e4-5959c3fa335b",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "16d6f84b2fb0468e2a9cf99a8ac4e5d803d42180347aaa70cb2a7abb13b5c6130458ca9c71956a962c0827637cd3bc7d40b21a8ae9fab12c7c3efe351b18d00a",
  "payment_type": "credit_card",
  "order_id": "Postman-1578568851",
  "merchant_id": "G141532850",
  "masked_card": "48111111-1114",
  "gross_amount": "10000.00",
  "fraud_status": "accept",
  "eci": "05",
  "currency": "IDR",
  "channel_response_message": "Approved",
  "channel_response_code": "00",
  "card_type": "credit",
  "bank": "bni",
  "approval_code": "1578569243927"
}
```
```json GoPay
{
  "transaction_time": "2021-06-15 18:45:13",
  "transaction_status": "settlement",
  "transaction_id": "513f1f01-c9da-474c-9fc9-d5c64364b709",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "2496c78cac93a70ca08014bdaaff08eb7119ef79ef69c4833d4399cada077147febc1a231992eb8665a7e26d89b1dc323c13f721d21c7485f70bff06cca6eed3",
  "settlement_time": "2021-06-15 18:45:28",
  "payment_type": "gopay",
  "order_id": "Order-5100",
  "merchant_id": "G141532850",
  "gross_amount": "154600.00",
  "fraud_status": "accept",
  "currency": "IDR"
}
```
```json QRIS
{
  "transaction_type": "on-us",
  "transaction_time": "2021-06-23 14:02:42",
  "transaction_status": "settlement",
  "transaction_id": "513f1f01-c9da-474c-9fc9-d5c64364b709",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "2496c78cac93a70ca08014bdaaff08eb7119ef79ef69c4833d4399cada077147febc1a231992eb8665a7e26d89b1dc323c13f721d21c7485f70bff06cca6eed3",
  "settlement_time": "2021-06-23 14:06:48",
  "payment_type": "qris",
  "order_id": "qris-01",
  "merchant_id": "G141532850",
  "merchant_cross_reference_id": "0197f326-973a-743c-b0a9-77cfc3c95d53",
  "issuer": "gopay",
  "gross_amount": "5539.00",
  "fraud_status": "accept",
  "currency": "IDR",
  "acquirer": "gopay"
}
```
```json ShopeePay
{
  "transaction_time": "2021-06-23 13:28:05",
  "transaction_status": "settlement",
  "transaction_id": "513f1f01-c9da-474c-9fc9-d5c64364b709",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "2496c78cac93a70ca08014bdaaff08eb7119ef79ef69c4833d4399cada077147febc1a231992eb8665a7e26d89b1dc323c13f721d21c7485f70bff06cca6eed3",
  "settlement_time": "2021-06-23 13:28:21",
  "payment_type": "shopeepay",
  "order_id": "shopeepay-01",
  "merchant_id": "G141532850",
  "gross_amount": "16700.00",
  "fraud_status": "accept",
  "currency": "IDR"
}
```
```json Permata VA
{
  "transaction_time": "2021-06-23 11:18:59",
  "transaction_status": "settlement",
  "transaction_id": "6fd88567-62da-43ff-8fe6-5717e430ffc7",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "0c0df82489931602577d9e434966c0540249b7c0aeaae2b718305af89a11e2bf9b4008aba07d1b3b248b15b4fbecdd15e81dbb2648b974efc4e0656e8c976094",
  "settlement_time": "2021-06-23 11:20:06",
  "permata_va_number": "8562000087926752",
  "payment_type": "bank_transfer",
  "order_id": "permata-va-01",
  "merchant_id": "G141532850",
  "gross_amount": "185000.00",
  "fraud_status": "accept",
  "currency": "IDR"
}
```
```json BCA VA
{
  "va_numbers": [
    {
      "va_number": "333333333333333",
      "bank": "bca"
    }
  ],
  "transaction_time": "2021-06-23 11:27:20",
  "transaction_status": "settlement",
  "transaction_id": "9aed5972-5b6a-401e-894b-a32c91ed1a3a",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "fe5f725ea770c451017e9d6300af72b830a668d2f7d5da9b778ec2c4f9177efe5127d492d9ddfbcf6806ea5cd7dc1a7337c674d6139026b28f49ad0ea1ce5107",
  "settlement_time": "2021-06-23 11:27:50",
  "payment_type": "bank_transfer",
  "payment_amounts": [],
  "order_id": "bca-va-01",
  "merchant_id": "G141532850",
  "gross_amount": "100000.00",
  "fraud_status": "accept",
  "currency": "IDR"
}
```
```json BNI VA
{
  "va_numbers": [
    {
      "va_number": "3333000000111111",
      "bank": "bni"
    }
  ],
  "transaction_time": "2021-06-23 11:41:33",
  "transaction_status": "settlement",
  "transaction_id": "9aed5972-5b6a-401e-894b-a32c91ed1a3a",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "fe5f725ea770c451017e9d6300af72b830a668d2f7d5da9b778ec2c4f9177efe5127d492d9ddfbcf6806ea5cd7dc1a7337c674d6139026b28f49ad0ea1ce5107",
  "settlement_time": "2021-06-23 11:42:03",
  "payment_type": "bank_transfer",
  "payment_amounts": [
    {
      "paid_at": "2021-06-23 11:42:02",
      "amount": "150000.00"
    }
  ],
  "order_id": "bni-va-01",
  "merchant_id": "G141532850",
  "gross_amount": "150000.00",
  "fraud_status": "accept",
  "currency": "IDR"
}
```
```json BRI VA
{
  "va_numbers": [
    {
      "va_number": "123456789123456789",
      "bank": "bri"
    }
  ],
  "transaction_time": "2021-06-23 11:53:34",
  "transaction_status": "settlement",
  "transaction_id": "9aed5972-5b6a-401e-894b-a32c91ed1a3a",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "fe5f725ea770c451017e9d6300af72b830a668d2f7d5da9b778ec2c4f9177efe5127d492d9ddfbcf6806ea5cd7dc1a7337c674d6139026b28f49ad0ea1ce5107",
  "settlement_time": "2021-06-23 11:53:34",
  "payment_type": "bank_transfer",
  "payment_amounts": [],
  "order_id": "bri-va-01",
  "merchant_id": "G141532850",
  "gross_amount": "300000.00",
  "fraud_status": "accept",
  "currency": "IDR"
}
```
```json Mandiri Bill
{
  "transaction_time": "2021-06-23 11:57:49",
  "transaction_status": "settlement",
  "transaction_id": "883af6a4-c1b4-4d39-9bd8-b148fcebe853",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "bbceb3724b0b2446c59435795039fed2d249d3438f06bf90c999cc9d383b95170b7b58f9412fba25ce7756da8075ab1d78a48800156380a62dc84eb22b3f7de9",
  "settlement_time": "2021-06-23 11:58:44",
  "payment_type": "echannel",
  "order_id": "mandiri-bill-01",
  "merchant_id": "G141532850",
  "gross_amount": "30000.00",
  "fraud_status": "accept",
  "currency": "IDR",
  "biller_code": "70012",
  "bill_key": "990000000260"
}
```
```json Indomaret
{
  "transaction_time": "2021-06-23 13:13:21",
  "transaction_status": "settlement",
  "transaction_id": "991af93c-1049-4973-b38f-d6052c72e367",
  "store": "indomaret",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "a198f93ac43cf98171dcb4bd0323c7e3afbee77a162a09e2381f0a218c761a4ef0254d7650602971735c486fea2e8e9c6d41ee65d6a53d65a12fb1c824e86f9f",
  "settlement_time": "2021-06-23 13:13:56",
  "payment_type": "cstore",
  "payment_code": "300063000630006300",
  "order_id": "indomaret-01",
  "merchant_id": "G141532850",
  "gross_amount": "336000.00",
  "currency": "IDR",
  "approval_code": "ABC0101BCA02"
}
```
```json Alfamart
{
  "transaction_time": "2021-06-23 13:17:01",
  "transaction_status": "settlement",
  "transaction_id": "991af93c-1049-4973-b38f-d6052c72e367",
  "store": "alfamart",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "a198f93ac43cf98171dcb4bd0323c7e3afbee77a162a09e2381f0a218c761a4ef0254d7650602971735c486fea2e8e9c6d41ee65d6a53d65a12fb1c824e86f9f",
  "settlement_time": "2021-06-23 13:18:04",
  "payment_type": "cstore",
  "payment_code": "300063000630006300",
  "order_id": "alfamart-01",
  "merchant_id": "G141532850",
  "gross_amount": "662000.00",
  "fraud_status": "accept",
  "currency": "IDR"
}
```
```json Akulaku
{
  "transaction_time": "2021-06-23 10:55:24",
  "transaction_status": "settlement",
  "transaction_id": "b3a40398-d95d-4bb9-afe8-9a57bc0786ea",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "35c4111539e184b268b7c1cd62a9c254e5d27c992c8fd55084f930b69b09eaafcfe14b0d512c697648295fdb45de777e1316b401f4729846a91b3de88cde3f05",
  "settlement_time": "2021-06-23 10:56:55",
  "payment_type": "akulaku",
  "order_id": "akulaku-01",
  "merchant_id": "G141532850",
  "gross_amount": "130000.00",
  "fraud_status": "accept",
  "currency": "IDR"
}
```

<details>
  <summary>POST Body Definition Table - Card</summary>

  <article>
    | Element                    | Description                                                               | Type   | Notes                                                                                                                                                                                                      |
    | -------------------------- | ------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | transaction\_time          | Time at which the transaction initiated.                                  | String | It is in the format, YYYY-MM-DD HH:MM:SS.                                                                                                                                                                  |
    | transaction\_status        | The transaction status of the transaction.                                | String | For more details, refer to [Transaction Status](#b-status-definition-b).                                                                                                                                   |
    | transaction\_id            | The transaction id of the specific transaction.                           | String | –                                                                                                                                                                                                          |
    | status\_message            | The status message.                                                       | String | –                                                                                                                                                                                                          |
    | status\_code               | The transaction status code.                                              | String | –                                                                                                                                                                                                          |
    | signature\_key             | The Signature Key.                                                        | String | This is a very important data that informs you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#b-verifying-notification-authenticity-b). |
    | payment\_type              | The type of payment method used.                                          | String | –                                                                                                                                                                                                          |
    | order\_id                  | The order id of the transaction.                                          | String | –                                                                                                                                                                                                          |
    | merchant\_id               | Merchant ID which initiated the transaction.                              | String | –                                                                                                                                                                                                          |
    | masked\_card               | The first six-digit and last four-digit of customer's credit card number. | String | –                                                                                                                                                                                                          |
    | gross\_amount              | Total amount for which the transaction was done.                          | String | –                                                                                                                                                                                                          |
    | fraud\_status              | The fraud status of the transaction.                                      | String | For more details, refer to [Fraud Status](#b-status-definition-b).                                                                                                                                         |
    | eci                        | The 3D secure ECI code for a card transaction.                            | String | –                                                                                                                                                                                                          |
    | currency                   | The unit of currency used for the transaction.                            | String | –                                                                                                                                                                                                          |
    | channel\_response\_message | The response from payment channel.                                        | String | –                                                                                                                                                                                                          |
    | channel\_response\_code    | The response code from the payment channel.                               | String | –                                                                                                                                                                                                          |
    | card\_type                 | The type of card used for the transaction.                                | String | Possible values are Credit, Debit.                                                                                                                                                                         |
    | bank                       | Name of the bank through which the transaction was processed.             | String | –                                                                                                                                                                                                          |
    | approval\_code             | The approval code from the bank.                                          | String | This can be used to refund a transaction. *approval\_code* does not exist on transactions with transaction status: Denied                                                                                  |
  </article>
</details>

<details>
  <summary>POST Body Definition Table - GoPay</summary>

  <article>
    | Element             | Description                                                             | Type   | Notes                                                                                                                                                                                                    |
    | ------------------- | ----------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | transaction\_time   | Time at which the transaction initiated.                                | String | It is in the format, YYYY-MM-DD HH:MM:SS.                                                                                                                                                                |
    | transaction\_status | The transaction status of the transaction.                              | String | For more details, refer to [Transaction Status](#b-status-definition-b).                                                                                                                                 |
    | transaction\_id     | The transaction id of the specific transaction.                         | String | –                                                                                                                                                                                                        |
    | status\_message     | The status message.                                                     | String | –                                                                                                                                                                                                        |
    | status\_code        | The transaction status code.                                            | String | –                                                                                                                                                                                                        |
    | signature\_key      | The Signature Key.                                                      | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#b-verifying-notification-authenticity-b). |
    | settlement\_time    | Time at which the transaction status was confirmed became "settlement". | String | –                                                                                                                                                                                                        |
    | payment\_type       | The type of payment method used.                                        | String | –                                                                                                                                                                                                        |
    | order\_id           | The order id of the transaction.                                        | String | –                                                                                                                                                                                                        |
    | merchant\_id        | Merchant ID which initiated the transaction.                            | String | –                                                                                                                                                                                                        |
    | gross\_amount       | Total amount for which the transaction was done.                        | String | –                                                                                                                                                                                                        |
    | fraud\_status       | The fraud status of the transaction.                                    | String | For more details, refer to [Fraud Status](#b-status-definition-b).                                                                                                                                       |
    | currency            | The unit of currency used for the transaction.                          | String | –                                                                                                                                                                                                        |
  </article>
</details>

<details>
  <summary>POST Body Definition Table - QRIS</summary>

  <article>
    | Element                        | Description                                                             | Type   | Notes                                                                                                                                                                                                    |
    | ------------------------------ | ----------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | transaction\_type              | To determine how the transaction is being acquired.                     | String | Possible values are: on-us or off-us.                                                                                                                                                                    |
    | transaction\_time              | Time at which the transaction initiated.                                | String | It is in the format, YYYY-MM-DD HH:MM:SS.                                                                                                                                                                |
    | transaction\_status            | The transaction status of the transaction.                              | String | For more details, refer to [Transaction Status](#b-status-definition-b).                                                                                                                                 |
    | transaction\_id                | The transaction id of the specific transaction.                         | String | –                                                                                                                                                                                                        |
    | status\_message                | The status message.                                                     | String | –                                                                                                                                                                                                        |
    | status\_code                   | The transaction status code.                                            | String | –                                                                                                                                                                                                        |
    | signature\_key                 | The Signature Key.                                                      | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#b-verifying-notification-authenticity-b). |
    | settlement\_time               | Time at which the transaction status was confirmed became "settlement". | String | –                                                                                                                                                                                                        |
    | payment\_type                  | The type of payment method used.                                        | String | –                                                                                                                                                                                                        |
    | order\_id                      | The order id of the transaction.                                        | String | –                                                                                                                                                                                                        |
    | merchant\_id                   | Merchant ID which initiated the transaction.                            | String | –                                                                                                                                                                                                        |
    | merchant\_cross\_reference\_id | The identifier of QRIS code where the payment is being made.            | String | -                                                                                                                                                                                                        |
    | issuer                         | The provider that is making the payment over the QR.                    | String | –                                                                                                                                                                                                        |
    | gross\_amount                  | Total amount for which the transaction was done.                        | String | –                                                                                                                                                                                                        |
    | fraud\_status                  | The fraud status of the transaction.                                    | String | For more details, refer to [Fraud Status](#b-status-definition-b).                                                                                                                                       |
    | currency                       | The unit of currency used for the transaction.                          | String | –                                                                                                                                                                                                        |
    | acquirer                       | The provider creating the QR and accepting the payment.                 | String | Possible values: airpay shopee, gopay.                                                                                                                                                                   |
  </article>
</details>

<details>
  <summary>POST Body Definition Table - Shopeepayt</summary>

  <article>
    | Element             | Description                                                             | Type   | Notes                                                                                                                                                                                                    |
    | ------------------- | ----------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | transaction\_time   | Time at which the transaction initiated.                                | String | It is in the format, YYYY-MM-DD HH:MM:SS.                                                                                                                                                                |
    | transaction\_status | The transaction status of the transaction.                              | String | For more details, refer to [Transaction Status](#b-status-definition-b).                                                                                                                                 |
    | transaction\_id     | The transaction id of the specific transaction.                         | String | –                                                                                                                                                                                                        |
    | status\_message     | The status message.                                                     | String | –                                                                                                                                                                                                        |
    | status\_code        | The transaction status code.                                            | String | –                                                                                                                                                                                                        |
    | signature\_key      | The Signature Key.                                                      | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#b-verifying-notification-authenticity-b). |
    | settlement\_time    | Time at which the transaction status was confirmed became "settlement". | String | –                                                                                                                                                                                                        |
    | payment\_type       | The type of payment method used.                                        | String | –                                                                                                                                                                                                        |
    | order\_id           | The order id of the transaction.                                        | String | –                                                                                                                                                                                                        |
    | merchant\_id        | Merchant ID which initiated the transaction.                            | String | –                                                                                                                                                                                                        |
    | gross\_amount       | Total amount for which the transaction was done.                        | String | –                                                                                                                                                                                                        |
    | fraud\_status       | The fraud status of the transaction.                                    | String | For more details, refer to [Fraud Status](#b-status-definition-b).                                                                                                                                       |
    | currency            | The unit of currency used for the transaction.                          | String | –                                                                                                                                                                                                        |
  </article>
</details>

<details>
  <summary>POST Body Definition Table - Permata VA</summary>

  <article>
    | Element             | Description                                                             | Type   | Notes                                                                                                                                                                                                    |
    | ------------------- | ----------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | transaction\_time   | Time at which the transaction initiated.                                | String | It is in the format, YYYY-MM-DD HH:MM:SS.                                                                                                                                                                |
    | transaction\_status | The transaction status of the transaction.                              | String | For more details, refer to [Transaction Status](#b-status-definition-b).                                                                                                                                 |
    | transaction\_id     | The transaction id of the specific transaction.                         | String | –                                                                                                                                                                                                        |
    | status\_message     | The status message.                                                     | String | –                                                                                                                                                                                                        |
    | status\_code        | The transaction status code.                                            | String | –                                                                                                                                                                                                        |
    | signature\_key      | The Signature Key.                                                      | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#b-verifying-notification-authenticity-b). |
    | settlement\_time    | Time at which the transaction status was confirmed became "settlement". | String | –                                                                                                                                                                                                        |
    | permata\_va\_number | The Permata VA number.                                                  | String | –                                                                                                                                                                                                        |
    | payment\_type       | The type of payment method used.                                        | String | –                                                                                                                                                                                                        |
    | order\_id           | The order id of the transaction.                                        | String | –                                                                                                                                                                                                        |
    | merchant\_id        | Merchant ID which initiated the transaction.                            | String | –                                                                                                                                                                                                        |
    | gross\_amount       | Total amount for which the transaction was done.                        | String | –                                                                                                                                                                                                        |
    | fraud\_status       | The fraud status of the transaction.                                    | String | For more details, refer to [Fraud Status](#b-status-definition-b).                                                                                                                                       |
    | currency            | The unit of currency used for the transaction.                          | String | –                                                                                                                                                                                                        |
  </article>
</details>

<details>
  <summary>POST Body Definition Table - BCA VA</summary>

  <article>
    | Element             | Description                                                             | Type   | Notes                                                                                                                                                                                                    |
    | :------------------ | ----------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | va\_number          | The virtual account number.                                             | String | –                                                                                                                                                                                                        |
    | bank                | The name of the acquiring bank which process the transaction.           | String | –                                                                                                                                                                                                        |
    | transaction\_time   | Time at which the transaction initiated.                                | String | It is in the format, YYYY-MM-DD HH:MM:SS.                                                                                                                                                                |
    | transaction\_status | The transaction status of the transaction.                              | String | For more details, refer to [Transaction Status](#b-status-definition-b).                                                                                                                                 |
    | transaction\_id     | The transaction id of the specific transaction.                         | String | –                                                                                                                                                                                                        |
    | status\_message     | The status message.                                                     | String | –                                                                                                                                                                                                        |
    | status\_code        | The transaction status code.                                            | String | –                                                                                                                                                                                                        |
    | signature\_key      | The Signature Key.                                                      | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#b-verifying-notification-authenticity-b). |
    | settlement\_time    | Time at which the transaction status was confirmed became "settlement". | String | –                                                                                                                                                                                                        |
    | payment\_type       | The type of payment method used.                                        | String | –                                                                                                                                                                                                        |
    | payment\_amounts    | Payment details such as the amount paid and the time of payment.        | String | It is in the format, *YYYY-MM-DD* *HH:MM:SS.*                                                                                                                                                            |
    | order\_id           | The order id of the transaction.                                        | String | –                                                                                                                                                                                                        |
    | merchant\_id        | Merchant ID which initiated the transaction.                            | String | –                                                                                                                                                                                                        |
    | gross\_amount       | Total amount for which the transaction was done.                        | String | –                                                                                                                                                                                                        |
    | fraud\_status       | The fraud status of the transaction.                                    | String | For more details, refer to [Fraud Status](#b-status-definition-b).                                                                                                                                       |
    | currency            | The unit of currency used for the transaction.                          | String | –                                                                                                                                                                                                        |
  </article>
</details>

<details>
  <summary>POST Body Definition Table - BNI VA</summary>

  <article>
    | Element             | Description                                                             | Type   | Notes                                                                                                                                                                                                    |
    | :------------------ | ----------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | va\_number          | VA number.                                                              | String | –                                                                                                                                                                                                        |
    | bank                | Name of the bank.                                                       | String | –                                                                                                                                                                                                        |
    | transaction\_time   | Time at which the transaction initiated.                                | String | It is in the format, YYYY-MM-DD HH:MM:SS.                                                                                                                                                                |
    | transaction\_status | The transaction status of the transaction.                              | String | For more details, refer to [Transaction Status](#status-definition).                                                                                                                                     |
    | transaction\_id     | The transaction id of the specific transaction.                         | String | –                                                                                                                                                                                                        |
    | status\_message     | The status message.                                                     | String | –                                                                                                                                                                                                        |
    | status\_code        | The transaction status code.                                            | String | –                                                                                                                                                                                                        |
    | signature\_key      | The Signature Key.                                                      | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#b-verifying-notification-authenticity-b). |
    | settlement\_time    | Time at which the transaction status was confirmed became "settlement". | String | –                                                                                                                                                                                                        |
    | payment\_type       | The type of payment method used.                                        | String | –                                                                                                                                                                                                        |
    | payment\_amounts    | Payment details such as the amount paid and the time of payment.        | String | It is in the format, *YYYY-MM-DD* *HH:MM:SS.*                                                                                                                                                            |
    | paid\_at            | The time and date at which the payment was done.                        | String | –                                                                                                                                                                                                        |
    | amount              | The amount paid.                                                        | String | –                                                                                                                                                                                                        |
    | order\_id           | The order id of the transaction.                                        | String | –                                                                                                                                                                                                        |
    | merchant\_id        | Merchant ID which initiated the transaction.                            | String | –                                                                                                                                                                                                        |
    | gross\_amount       | Total amount for which the transaction was done.                        | String | –                                                                                                                                                                                                        |
    | fraud\_status       | The fraud status of the transaction.                                    | String | For more details, refer to [Fraud Status](#b-status-definition-b).                                                                                                                                       |
    | currency            | The unit of currency used for the transaction.                          | String | –                                                                                                                                                                                                        |
  </article>
</details>

<details>
  <summary>POST Body Definition Table - BRI VA</summary>

  <article>
    | Element             | Description                                                             | Type   | Notes                                                                                                                                                                                                    |
    | :------------------ | ----------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | va\_number          | VA number.                                                              | String | –                                                                                                                                                                                                        |
    | bank                | Name of the bank.                                                       | String | –                                                                                                                                                                                                        |
    | transaction\_time   | Time at which the transaction initiated.                                | String | It is in the format, YYYY-MM-DD HH:MM:SS.                                                                                                                                                                |
    | transaction\_status | The transaction status of the transaction.                              | String | For more details, refer to [Transaction Status](#b-status-definition-b).                                                                                                                                 |
    | transaction\_id     | The transaction id of the specific transaction.                         | String | –                                                                                                                                                                                                        |
    | status\_message     | The status message.                                                     | String | –                                                                                                                                                                                                        |
    | status\_code        | The transaction status code.                                            | String | –                                                                                                                                                                                                        |
    | signature\_key      | The Signature Key.                                                      | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#b-verifying-notification-authenticity-b). |
    | settlement\_time    | Time at which the transaction status was confirmed became "settlement". | String | –                                                                                                                                                                                                        |
    | payment\_type       | The type of payment method used.                                        | String | –                                                                                                                                                                                                        |
    | payment\_amounts    | Payment details such as the amount paid and the time of payment.        | String | It is in the format, *YYYY-MM-DD* *HH:MM:SS.*                                                                                                                                                            |
    | order\_id           | The order id of the transaction.                                        | String | –                                                                                                                                                                                                        |
    | merchant\_id        | Merchant ID which initiated the transaction.                            | String | –                                                                                                                                                                                                        |
    | gross\_amount       | Total amount for which the transaction was done.                        | String | –                                                                                                                                                                                                        |
    | fraud\_status       | The fraud status of the transaction.                                    | String | For more details, refer to [Fraud Status](#b-status-definition-b).                                                                                                                                       |
    | currency            | The unit of currency used for the transaction.                          | String | –                                                                                                                                                                                                        |
  </article>
</details>

<details>
  <summary>POST Body Definition Table - Mandiri Bill</summary>

  <article>
    | Element             | Description                                                             | Type   | Notes                                                                                                                                                                                                    |
    | ------------------- | ----------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | transaction\_time   | Time at which the transaction initiated.                                | String | It is in the format, YYYY-MM-DD HH:MM:SS.                                                                                                                                                                |
    | transaction\_status | The transaction status of the transaction.                              | String | For more details, refer to [Transaction Status](#b-status-definition-b).                                                                                                                                 |
    | transaction\_id     | The transaction id of the specific transaction.                         | String | –                                                                                                                                                                                                        |
    | status\_message     | The status message.                                                     | String | –                                                                                                                                                                                                        |
    | status\_code        | The transaction status code.                                            | String | –                                                                                                                                                                                                        |
    | signature\_key      | The Signature Key.                                                      | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#b-verifying-notification-authenticity-b). |
    | settlement\_time    | Time at which the transaction status was confirmed became "settlement". | String | –                                                                                                                                                                                                        |
    | payment\_type       | The type of payment method used.                                        | String | –                                                                                                                                                                                                        |
    | order\_id           | The order id of the transaction.                                        | String | –                                                                                                                                                                                                        |
    | merchant\_id        | Merchant ID which initiated the transaction.                            | String | –                                                                                                                                                                                                        |
    | gross\_amount       | Total amount for which the transaction was done.                        | String | –                                                                                                                                                                                                        |
    | fraud\_status       | The fraud status of the transaction.                                    | String | For more details, refer to [Fraud Status](#b-status-definition-b).                                                                                                                                       |
    | currency            | The unit of currency used for the transaction.                          | String | –                                                                                                                                                                                                        |
    | biller\_code        | The code for the biller.                                                | String | –                                                                                                                                                                                                        |
    | bill\_key           | The bill key number.                                                    | String | –                                                                                                                                                                                                        |
  </article>
</details>

<details>
  <summary>POST Body Definition Table - Indomaret</summary>

  <article>
    | Element             | Description                                                             | Type   | Notes                                                                                                                                                                                                    |
    | ------------------- | ----------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | transaction\_time   | Time at which the transaction initiated.                                | String | It is in the format, YYYY-MM-DD HH:MM:SS.                                                                                                                                                                |
    | transaction\_status | The transaction status of the transaction.                              | String | For more details, refer to [Transaction Status](#b-status-definition-b).                                                                                                                                 |
    | transaction\_id     | The transaction id of the specific transaction.                         | String | –                                                                                                                                                                                                        |
    | store               | Name of the store.                                                      | String | –                                                                                                                                                                                                        |
    | status\_message     | The status message.                                                     | String | –                                                                                                                                                                                                        |
    | status\_code        | The transaction status code.                                            | String | –                                                                                                                                                                                                        |
    | signature\_key      | The Signature Key.                                                      | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#b-verifying-notification-authenticity-b). |
    | settlement\_time    | Time at which the transaction status was confirmed became "settlement". | String | –                                                                                                                                                                                                        |
    | payment\_type       | The type of payment method used.                                        | String | –                                                                                                                                                                                                        |
    | payment\_code       | 14 digit payment code.                                                  | String | –                                                                                                                                                                                                        |
    | order\_id           | The order id of the transaction.                                        | String | –                                                                                                                                                                                                        |
    | merchant\_id        | Merchant ID which initiated the transaction.                            | String | –                                                                                                                                                                                                        |
    | gross\_amount       | Total amount for which the transaction was done.                        | String | –                                                                                                                                                                                                        |
    | currency            | The unit of currency used for the transaction.                          | String | –                                                                                                                                                                                                        |
    | approval\_code      | The approval code from the bank.                                        | String | This can be used to refund a transaction. *approval\_code* does not exist on transactions with transaction status: Denied.                                                                               |
  </article>
</details>

<details>
  <summary>POST Body Definition Table - Alfamart</summary>

  <article>
    | Element             | Description                                                             | Type   | Notes                                                                                                                                                                                                    |
    | ------------------- | ----------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | transaction\_time   | Time at which the transaction initiated.                                | String | It is in the format, YYYY-MM-DD HH:MM:SS.                                                                                                                                                                |
    | transaction\_status | The transaction status of the transaction.                              | String | For more details, refer to [Transaction Status](#b-status-definition-b).                                                                                                                                 |
    | transaction\_id     | The transaction id of the specific transaction.                         | String | –                                                                                                                                                                                                        |
    | store               | Name of the store.                                                      | String | –                                                                                                                                                                                                        |
    | status\_message     | The status message.                                                     | String | –                                                                                                                                                                                                        |
    | status\_code        | The transaction status code.                                            | String | –                                                                                                                                                                                                        |
    | signature\_key      | The Signature Key.                                                      | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#b-verifying-notification-authenticity-b). |
    | settlement\_time    | Time at which the transaction status was confirmed became "settlement". | String | –                                                                                                                                                                                                        |
    | payment\_type       | The type of payment method used.                                        | String | –                                                                                                                                                                                                        |
    | payment\_code       | 14 digit payment code.                                                  | String | –                                                                                                                                                                                                        |
    | order\_id           | The order id of the transaction.                                        | String | –                                                                                                                                                                                                        |
    | merchant\_id        | Merchant ID which initiated the transaction.                            | String | –                                                                                                                                                                                                        |
    | gross\_amount       | Total amount for which the transaction was done.                        | String | –                                                                                                                                                                                                        |
    | fraud\_status       | The fraud status of the transaction.                                    | String | For more details, refer to [Fraud Status](#b-status-definition-b).                                                                                                                                       |
    | currency            | The unit of currency used for the transaction.                          | String | –                                                                                                                                                                                                        |
  </article>
</details>

<details>
  <summary>POST Body Definition Table - Akulaku</summary>

  <article>
    | Element             | Description                                                             | Type   | Notes                                                                                                                                                                                                    |
    | ------------------- | ----------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | transaction\_time   | Time at which the transaction initiated.                                | String | It is in the format, YYYY-MM-DD HH:MM:SS.                                                                                                                                                                |
    | transaction\_status | The transaction status of the transaction.                              | String | For more details, refer to [Transaction Status](#b-status-definition-b).                                                                                                                                 |
    | transaction\_id     | The transaction id of the specific transaction.                         | String | –                                                                                                                                                                                                        |
    | status\_message     | The status message.                                                     | String | –                                                                                                                                                                                                        |
    | status\_code        | The transaction status code.                                            | String | –                                                                                                                                                                                                        |
    | signature\_key      | The Signature Key.                                                      | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#b-verifying-notification-authenticity-b). |
    | settlement\_time    | Time at which the transaction status was confirmed became "settlement". | String | –                                                                                                                                                                                                        |
    | payment\_type       | The type of payment method used.                                        | String | –                                                                                                                                                                                                        |
    | order\_id           | The order id of the transaction.                                        | String | –                                                                                                                                                                                                        |
    | merchant\_id        | Merchant ID which initiated the transaction.                            | String | –                                                                                                                                                                                                        |
    | gross\_amount       | Total amount for which the transaction was done.                        | String | –                                                                                                                                                                                                        |
    | fraud\_status       | The fraud status of the transaction.                                    | String | For more details, refer to [Fraud Status](#b-status-definition-b).                                                                                                                                       |
    | currency            | The unit of currency used for the transaction.                          | String | –                                                                                                                                                                                                        |
  </article>
</details>

<br />

<Callout icon="📘" theme="info">
  It's recommended to check the `transaction_status` as reference of the most accurate transaction status. Transaction can be considered **success** if `transaction_status` value is `settlement` (or `capture` in case of card transaction) **and if** `fraud_status` exists ensure the value is `accept`. Then you are safe to deliver good/service to customer.
</Callout>

<br />

Please note that not every payment methods may return `fraud_status` field. Some payment methods (like Indomaret, Alfamart, etc.) which considered have lower risk of fraud, may not be evaluated by *Fraud Detection System*, and may not return `fraud_status`. In this case, the transaction can be considered as relatively safe from fraud.

<br />

***

<br />

# <b> Status Definition </b>

<br />

## Transaction Status

<br />

| Transaction Status | Fund Received | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :----------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `capture`          | ✅             | Transaction is successful and card balance is captured successfully. <br />If no action is taken by you, the transaction will be successfully settled on the same day or the next day or within your agreed settlement time with your partner bank. Then the  transaction status changes to  *settlement*. <br />It is safe to assume a successful payment.                                                                                                                                        |
| `settlement`       | ✅             | The transaction is successfully settled. Funds have been credited to your account.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `pending`          | 🕒            | The transaction is created and is waiting to be paid by the customer at the payment providers like Bank Transfer, E-Wallet, and so on. For card payment method: waiting for customer to complete (and card issuer to validate) 3DS/OTP process.                                                                                                                                                                                                                                                    |
| `deny`             | ❌             | The credentials used for payment are rejected by the payment provider or Midtrans Fraud Detection System (FDS). <br />To know the reason and details for the denied transaction, see the `status_message` in the response.                                                                                                                                                                                                                                                                         |
| `cancel`           | ❌             | The transaction is canceled. It can be triggered by merchant.<br /> You can trigger *Cancel* status in the following cases:<br /> 1. If you cancel the transaction after *Capture* status.                                                                                                                                                                                                                                                                                                         |
| `expire`           | ❌             | Transaction is not available for processing, because the payment was delayed.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `failure`          | ❌             | Unexpected error occurred during transaction processing.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `refund`           | ↩️            | Transaction is marked to be refunded. Refund status can be triggered by merchant.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `partial_refund`   | ↩️            | Transaction is marked to be refunded partially (if you choose to refund in amount less than the paid amount). Refund status can be triggered by merchant.                                                                                                                                                                                                                                                                                                                                          |
| `authorize`        | 🕒            | Only available specifically only if you are using pre-authorize feature for card transactions (an advanced feature that you will not have by default, so in most cases are safe to ignore). Transaction is successful and card balance is reserved (authorized) successfully. You can later perform API “capture” to change it into `capture`, or if no action is taken will be auto released. Depending on your business use case, you may assume `authorize` status as a successful transaction. |

<br />

## Fraud Status

<br />

| Fraud Status | Fund Received | Description                                                                                                                                                                |
| ------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accept`     | ✅             | Transaction is safe to proceed. It is not considered as a fraud.                                                                                                           |
| `deny`       | ❌             | Transaction is considered as fraud. It is rejected by Midtrans FDS. FDS rejected transaction usually will not result in transaction\_status: pending, capture, settlement. |

<br />

<details>
  <summary><b>Notes When Using Snap API</b></summary>

  <article>
    When a transaction is created on Snap API, it does not immediately assign any payment status on*Core API* *GET Status* response.

Even if the payment page is activated on Snap API, you might encounter `404` or *Payment not found* response while calling *Core API GET Status*.

This is because the customer is yet to choose any payment method within the Snap payment page. Once the customer chooses and proceeds with a payment method, then the transaction status will be assigned and available on *Core API GET Status*.

  </article>
</details>

<br />

***

<br />

# <b> Verifying Notification Authenticity </b>

<br />

To ensure the integrity of the notifications and the content, it is recommended to verify the notification using one of the following mechanisms.

<br />

## Verifying Signature Key

<br />

In the notification response body, Midtrans provides `signature_key` which is generated by appending `order_id`, `status_code`, `gross_amount`, and `ServerKey` into a string. *ServerKey* is confidential information known only to Midtrans and you. Thus, you can verify the `signature_key` to ensure that the notification is signed by Midtrans.

The logic to generate or calculate signature\_key is explained below:

```
SHA512(order_id+status_code+gross_amount+ServerKey)
```

> It basically means append the value of `order_id`,`status_code`,`gross_amount`,`ServerKey` into one string, then use it as input to SHA512 hash function. Then the output should match with `signature_key` from notification.

<br />

Try out *signature\_key* calculation using the tool given below.

<br />

<details>
  <summary><b>Signature Key Calculator</b></summary>

  <article>
    <Anchor title=":include :type=iframe width=100% height=800px" href="https://jsfiddle.net/5amr8cov/6/embedded/result,html/dark">Signature Key Calculator</Anchor>
  </article>
</details>

<br />

## Verify Using GET Status API Call

<br />

You can verify authenticity using the [GET status API Request](https://docs.midtrans.com/docs/get-status-api-requests). This means the request is directly responded by Midtrans. The JSON response will be the same as the notification status. This process of verification is illustrated below.

<br />

![](https://files.readme.io/1ea43a1-after-payment-notif-diag.png "after-payment-notif-diag.png")

<br />

> 📘 Tips
>
> Official Midtrans language library will perform "Verify Directly to Midtrans API" mechanism automatically within the built in `notification` function. As well as official Midtrans CMS plugin.

<br />

Verifying notification/response data is recommended for any kind of data flow that is coming to you from an outside source. This also includes frontend callback data, as frontend data can be modified by the user, you should verify it by querying the Midtrans API. For example, javascript callback data of payment status triggered by Snap.js should be verified via API get-status to Midtrans.

For API requests that are performed synchronously (from your) backend-to-backend (to Midtrans API), the response should already be trustworthy. You don’t have to re-query the Midtrans API, unless you want to check for latest updates at some later time.

<br />

> 📘 Note
>
> Midtrans may not be able to help you with any **financial loss caused if merchants fail to[verify payment status authenticity](#b-verifying-notification-authenticity-b)**. Payment status has to be verified coming from Midtrans before you decide to take financial action on it (e.g. delivering good/service to customer when payment status is success). Failing to do so can be considered a security/financial liability on the merchant side.

> 📘 Note
>
> On top of that, you should also **use a valid SSL/HTTP(s)** on your notification URL endpoints for extra security.

<br />

***

<br />

# <b> Responding HTTP Notification from Midtrans </b>

<br />

To confirm that you received the notification, your notification URL or backend must respond to the HTTP notification with HTTP `status code: 200`. On most backend or web frameworks you can achieve that by printing a string similar to *OK*. This will automatically sends HTTP `status code: 200` to Midtrans.

<br />

<details>
  <summary><b>Status Codes and Errors</b></summary>

  <article>
    <br />

Your server can respond with the following status and error codes, which will trigger Midtrans' Notification engine to perform following actions.

| Code        | Midtrans Will Perform                                                                                         |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| 2XX         | No retries, it is considered successful.                                                                      |
| 500         | Retry only *once*.                                                                                            |
| 503         | Retry *four* times.                                                                                           |
| 400/404     | Retry *two* times.                                                                                            |
| 301/302/303 | No retries. Update notification endpoint in SETTINGS menu, instead of replying to these status codes.         |
| 307/308     | Follow the new URL with POST method and the same notification body. Maximum number of redirect is five times. |
| Other       | Retry five times.                                                                                             |

  </article>
</details>

<br />

## Best Practice to Handle Notification

<br />

<details>
  <summary><b>Expand</b></summary>

  <article>
    <br />

\* **Use HTTPS endpoint**. For better security & to avoid Man-in-the-Middle (MITM) attacks. We validate the certificates match with the hosts. Do not use self signed SSL certificates.

* Note: we don't currently have strict requirements, so any valid SSL/TLS/HTTPS used on your side should work.
* **Use standard port (80/443)** for notification URL.
* **Implement notification handling in an idempotent way.** In extremely rare cases, we may send multiple notifications for the same transaction event. Your endpoint should avoid processing it as duplicate entries, one way of achieving this is to use *order\_id* as the key to track the entries.
* **Verify the signature key hash of the notification**, This will confirm that the notification was actually sent by Midtrans and not any body else. *Server Key* is used to verify the signature, which only Midtrans and you should have the access to it.
* Check the following three fields when confirming success transactions:\
  &#x9;	\- `status_code`: Should be 200 for successful transactions.\
  &#x9;	\- `fraud_status`: If exists, the value should be ACCEPT. If not exists then you can ignore it.\
  &#x9;	\- `transaction_status` : *settlement* or *capture* for successful transactions.
* We strive to send the notification immediately after the transaction has occurred. However, in extremely rare cases, it may be delayed due to issues (e.g. high load, incidents, network latency, etc.). If you think you have not receive notification in time, you should use the [GET Status API](https://docs.midtrans.com/docs/get-status-api-requests) to check for current status of the transaction. In general, below is the SLA that you can expect:
  * Settlement notification : up to 20s
  * Expiry notification : up to 90s
* Midtrans will wait for up-to **15 seconds** when sending notification, before considering the request timeout/failed. Your endpoint should **respond as soon as possible, ideally within 5 seconds**, to reduce the load on Midtrans' & your own infrastructure.
* In extremely rare cases that the payment status notifications received out of order - `settlement` status comes before `pending` status. You should call [GET Status API](https://docs.midtrans.com/docs/get-status-api-requests) to get the latest/actual status of the transaction. Or you can ignore the `pending` notifications in such cases.
* HTTP Notification body is in **JSON format**. Which should allow additional JSON fields to be added in the future. Your implementation **should allow new fields to be later added** to the notification body, so parse the JSON fields in a non strict way (especially if you are using some JSON parser library that strictly does not allow new fields to be added). Avoid JSON parser behavior that will throw error/exceptions when encountering new fields, instead it should gracefully ignore the new fields. This allows us to improve our notification system for newer use cases without breaking compatibility.
* Always use the **right HTTP Status code for responding HTTP notifications** requests.
* Midtrans will retry when encountering HTTP error status codes, & differently based on it.\
  &#x9;	\- for `2xx`: No retries, it is considered successfully received.\
  &#x9;	\- for `500`: Retry only once.\
  &#x9;	\- for `503`: Retry 4 times.\
  &#x9;	\- for `400/404`: Retry 2 times.\
  &#x9;	\- for `301/302/303`: No retries, these redirect status codes is not supported. We suggest you to update the Notification endpoint URL. Do not intentionally reply with them.\
  &#x9;	\- for `307/308`: Follow the new URL with POST method and same notification body. Max redirect is 5 times.\
  &#x9;	\- for all other failures: Retry 5 times.
* Midtrans retry **at most 5 times** with following policy.
* Different retry intervals based on number of retry attempt:
  * First time - 2 minutes.
  * Second time - 10 minutes.
  * Third time - 30 minutes (0.5 hours).
  * Fourth time - 90 minutes (1.5 hours).
  * Fifth time - 210 minutes (3.5 hours).
* Midtrans put a random time shift for each attempt based on above interval. For example, the first retry time might be 33s (up to 2m) after previous attempt.

  </article>
</details>

<br />

## Example on Handling HTTP Notifications

<br />

Some sample codes to handle HTTP(S) POST and JSON object by utilizing **Midtrans Official Library** are given below. Assume that this code will be executed when the notification URL endpoint (<https://yourwebsite.com/notification>) is accessed.

```javascript NodeJS
const midtransClient = require('midtrans-client');
// Create Core API / Snap instance (both have shared `transactions` methods)
let apiClient = new midtransClient.Snap({
        isProduction : false,
        serverKey : 'YOUR_SERVER_KEY',
        clientKey : 'YOUR_CLIENT_KEY'
    });

apiClient.transaction.notification(notificationJson)
    .then((statusResponse)=>{
        let orderId = statusResponse.order_id;
        let transactionStatus = statusResponse.transaction_status;
        let fraudStatus = statusResponse.fraud_status;

        console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

        // Sample transactionStatus handling logic

        if (transactionStatus == 'capture'){
	    if (fraudStatus == 'accept'){
                // TODO set transaction status on your database to 'success'
                // and response with 200 OK
            }
        } else if (transactionStatus == 'settlement'){
            // TODO set transaction status on your database to 'success'
            // and response with 200 OK
        } else if (transactionStatus == 'cancel' ||
          transactionStatus == 'deny' ||
          transactionStatus == 'expire'){
          // TODO set transaction status on your database to 'failure'
          // and response with 200 OK
        } else if (transactionStatus == 'pending'){
          // TODO set transaction status on your database to 'pending' / waiting payment
          // and response with 200 OK
        }
    });
```
```php PHP
<?php

require_once(dirname(__FILE__) . '/Midtrans.php');
\Midtrans\Config::$isProduction = false;
\Midtrans\Config::$serverKey = '<your serverkey>';
$notif = new \Midtrans\Notification();

$transaction = $notif->transaction_status;
$type = $notif->payment_type;
$order_id = $notif->order_id;
$fraud = $notif->fraud_status;

if ($transaction == 'capture') {
  if ($type == 'credit_card'){
    if($fraud == 'accept'){
      // TODO set payment status in merchant's database to 'Success'
      echo "Transaction order_id: " . $order_id ." successfully captured using " . $type;
      }
    }
  }
else if ($transaction == 'settlement'){
  // TODO set payment status in merchant's database to 'Settlement'
  echo "Transaction order_id: " . $order_id ." successfully transfered using " . $type;
  }
  else if($transaction == 'pending'){
  // TODO set payment status in merchant's database to 'Pending'
  echo "Waiting customer to finish transaction order_id: " . $order_id . " using " . $type;
  }
  else if ($transaction == 'deny') {
  // TODO set payment status in merchant's database to 'Denied'
  echo "Payment using " . $type . " for transaction order_id: " . $order_id . " is denied.";
  }
  else if ($transaction == 'expire') {
  // TODO set payment status in merchant's database to 'expire'
  echo "Payment using " . $type . " for transaction order_id: " . $order_id . " is expired.";
  }
  else if ($transaction == 'cancel') {
  // TODO set payment status in merchant's database to 'Denied'
  echo "Payment using " . $type . " for transaction order_id: " . $order_id . " is canceled.";
}
?>
```

<br />

***

<br />

# <b> Advanced </b>

<br />

## Customizing Notification URL via API

<br />

Optionally, Merchant can opt-in to change or add custom notification URLs for each transaction, by adding additional HTTP(s) headers on the API request.

There are two kind of optional headers that you can choose:

* `X-Append-Notification` : to add new notification url(s) and use it alongside the settings on dashboard
* `X-Override-Notification` : to use new notification url(s) disregarding the settings on dashboard

Both header can support up to maximum of 3 URLs, separated by coma(`,`).

<br />

```curl Sample API request of Snap trx with override-notification url
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p3ZnMzVV8LZU87' \
  -H 'Content-Type: application/json' \
  -H 'X-Override-Notification: https://tokoecomm.com/notif-handler-1,https://myweb.com/notif-handler-2' \
  -d '{
    "transaction_details": {
        "order_id": "YOUR-ORDERID-123456",
        "gross_amount": 10000
    }
}'
```

<details>
  <summary> Sample Case </summary>

  <article>
    <br />

Assuming merchant has set `https://example.com/original` as notification url on the dashboard. If merchant set header `X-Append-Notification: https://example.com/additional1,https://example.com/additional2`. Then, every HTTP(s) notification for that specific transaction will be sent to:

* `https://example.com/original` ,
* `https://example.com/additional1` , and
* `https://example.com/additional2`

Else if merchant set header `X-Override-Notification: https://example.com/replacement1,https://example.com/replacement2`. Then, every HTTP(s) notification for that specific transaction will be sent to:

* `https://example.com/replacement1` and
* `https://example.com/replacement2`
* without sending to the original notification url set on the dashboard.

  </article>
</details>

<br />

## Viewing Notification History

<br />

In some cases you might want to know if HTTP notification is successfully sent to your notification url or backend server.

To audit if notification is sent, and if it sent successfuly or not you can login to your Midtrans Dashboard. Go to menu `Settings > Configuration > See History`. You will find HTTP Notification as well as email notification records for each Order ID, and you can see the status if it successfully sent or not. You can also search by Order ID.

* If notification fails to be sent,  your notification URL might be rejecting the HTTP notification delivery. Please check your notification URL implementation on your backend server. For more information, refer to [Best Practices](#best-practice-to-handle-notification).
* If you find that the notification has been sent (shown as `success`), but your server wasn't able to change the payment status on your backend, it might be because of an issue in the implementation on your backend server.
* If you face any delay or issue that Midtrans is unable to send the HTTP Notification, you can use [Get Status API](https://docs.midtrans.com/docs/get-status-api-requests) approach to sync payment status on Midtrans side to your system.
* You can further see the HTTP notification details, choose one of the table row entries that have `HTTP` value as **TYPE**, scroll right and click `Details`. You will be able to see a popup, and under `Request Body` section, you will see the details including the URL & HTTP request body JSON.

<br />

## Delayed or Missed Notification

<br />

Although Midtrans strives for its best to keep notification service reliable, there may be some exceptional cases that can cause failure in sending notification from Midtrans or failure in receiving from merchant side.

This can happen due to cases such as delay, network/infra issues, unexpected downtime, vendor/service disruption, and so on. In this exceptional case, use [Get Status API call](https://docs.midtrans.com/docs/get-status-api-requests) to reconcile payment status between your backend and Midtrans.

Due to the reason explained above, **if your system is time-sensitive and expects to always be updated with payment status** from Midtrans, then you are **recommended to integrate[GET Status API](https://docs.midtrans.com/docs/get-status-api-requests)** to your system’s workflow. It should be used as failover mechanism in case of a Midtrans Notification system unexpectedly having issue.

Your backend can perform [GET Status API call](https://docs.midtrans.com/docs/get-status-api-requests), for example in any of the following point in time:

* When notification is not received within the defined time (24 hours, 12 hours, and so on).
* Before a transaction is considered as failure/canceled on your side.
* When your operations team wants to trigger status reconciliation.
* When customer claims funds are deducted from them but the transaction status is not updated to *success*.

Please make sure to check if the notification issue is not from your end. For more information, please refer to the Best Practices to Handle Notification and View Notification History sections explained earlier.

<br />

## Suggestion on Troubleshooting HTTP Notification Failures

<br />

Please refer to this FAQ about [troubleshooting HTTP Notification failures](https://docs.midtrans.com/docs/technical-faq#how-to-troubleshoot-http-notification-failures).

<br />

## Note on TLS v1.3

<br />

Currently our notification engine supports sending notification to your notification url using TLS protocol up to v1.2. Please make sure your backend/notification url still allows connection of TLS v1.2 in order to be able to receive HTTP notification/webhook from Midtrans.

If your backend/notification url only supports TLS v1.3, you may not be able to receive HTTP notification/webhook from Midtrans.

You can check the TLS protocol version being supported by your backend by using tools such as: <https://www.digicert.com/help/> . Input your notification url there, and check the supported TLS protocol version.

Our notification engine team is working to bring future support of TLS v1.3. Until it happens, please follow the recommendation above.

<br />

## Note on custom HTTP(s) Notification Headers

<br />

Midtrans currently does not support custom HTTP(s) header to be added on our HTTP(s) Notification request. It means if your notification URL endpoint require extra HTTP(s) header to accept request (such as requiring Basic Auth or custom API key headers), it will not be supported. Your notification URL endpoint must allow regular HTTP(s) request without any custom headers.

<br />

## Security Aspect

If you have concern regarding the security aspect, please refer to [Verifying Authenticity section](#b-verifying-notification-authenticity-b). As long as you are using a valid HTTPs endpoint & verifying notification authenticity, it should be secure enough already (e.g. from any MiTM attack attempt, etc.).