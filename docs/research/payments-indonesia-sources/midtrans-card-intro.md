---
updatedAt: 2025-11-11T00:12:43.000Z
agentTools:
  projectIndex: https://docs.midtrans.com/llms.txt
---

# Introduction to Card Payment processing

# Card Payments Flow

Online payment using credit/debit cards is the one of the most convenient and commonly used payment methods; it works rather instantly - you will get the payment status almost immediately after you confirm the payment. Stay at your chair, take the card out from your wallet to fill in the card details - and you got the payment status right away. Imagine that you need to go for business travel today; you can simply sit and browse for the most convenient flight options for you, buy and pay right away, receive the ticket, then go to the airport. It is quite different with other asynchronous payment types such as bank transfers or convenience store payments, where you need to go to an ATM (or convenience store) after you confirm the payment on an eCommerce website.

Even though it feels instant, there are many steps and processes underneath a card payment; let’s understand it better by reading the explanations below.

# Customer fills card and customer details in

![](https://files.readme.io/f70bbfc-image.png)

Before the actual credit card processing, there are some actions that need to be taken by a customer once he/she decided to pay using credit cards: fill in card and customer details. Other than email address or phone number, customer will be asked to fill in the card numbers, expiration date, and CVV. Other than that, billing and shipping address information may also required for some eCommerce websites.

Once all the information is filled and customer has decided to pay by clicking the **pay** button, merchant shall send a payment request to payment gateway (If merchant uses Core API Midtrans, merchant should trigger [Get Token ↗](http://api-docs.midtrans.com/#get-token) and [Charge ↗](http://api-docs.midtrans.com/#charge-features)).

# Customer authenticates payment (3D Secure System)

<Image alt="Source: <http://bnicardcenter.co.id/Promo/Info-Promo/3D-Secure.aspx>" align="center" src="https://files.readme.io/c538c11-image.png">
  Source: [http://bnicardcenter.co.id/Promo/Info-Promo/3D-Secure.aspx](http://bnicardcenter.co.id/Promo/Info-Promo/3D-Secure.aspx)
</Image>

Most of the merchants are using the 3D Secure system, an additional layer of security where principal networks (VISA/MasterCard/JCB/Amex) will coordinate with customer’s Bank to authenticate its customers using OTP (One Time Password). Once customer clicked pay, customer will receive a code via SMS or USSD or email; while he/she is redirected to Issuing Bank’s authentication page. Customer then needs to enter the code to authenticate payment.

However, if the customer’s Bank or the merchant does not support 3DS system, customer will not need to do the authentication (the authentication page will be bypassed instead).

# Fraud Detection System filters transactions

If a merchant uses payment gateway, it is common that there is a Fraud Detection System (FDS) working in the back. Fraud Detection System works by noticing uncommon behavior or patterns of online payment and/or identifying Fraud databases and/or machine learning. FDS is exceptionally effective at preventing online frauds, however it is not a guarantee that fraud attempts can be completely isolated.

# Bank authorizes payment

While customer waiting for his/her transaction status, Bank is doing two processes in a row - Authorize and Capture. In Authorize, Bank reviews the customer's card and sees if there is enough funds to cover the value of the goods/services bought by the customer. Once it is good to go, the amount of money will be booked - it is called Capture. These processes work in the back without customer noticing; and work in milliseconds.

# Customer receives transaction status

Customer will have his/her status of transaction in seconds after the payment request. It can be Success or Deny. Please note that the rate of success for credit card payment is roughly around 70% - 80%, means that there might be 2-3 out of 10 credit card payments are declined for various reasons.

Here is the example of http notification on the Success transaction that received by merchant:

```
{  
  "status_code" : "200",  
  "status_message" : "Success, Credit Card capture transaction is successful",  
  "transaction_id" : "ca297170-be4c-45ed-9dc9-be5ba99d30ee",  
  "masked_card" : "451111-1117",  
  "order_id" : "testing-0.4555-1414741517",  
  "payment_type" : "credit_card",  
  "transaction_time" : "2014-10-31 14:46:44",  
  "transaction_status" : "capture",  
  "fraud_status" : "accept",  
  "bank" : "bni",  
  "gross_amount" : "30000.00"  
}
```

# Actions to take after payment

After the transaction status is changed to Success, merchant can send the goods/services right away. Please note that the Success transaction will remain success and will be changed to Settlement on the Settlement time.

However, merchant can also cancel the Success transaction in case of customer’s double order or other refund requests. Before the Settlement time, merchant can send a cancel request (it is commonly called Cancel/Void) then the limit will goes back to customer’s credit card (mostly immediate but can go as far as 1-2 days at the latest). However, if the cancel request sent after the Settlement time - commonly called Refund, the limit will goes back to customer’s credit card in 14 working days at the latest.

# System locks the transactions: Settlement

Settlement is when the system is locked and it triggers the fund transfer from Issuer to Acquirer; in this case from Bank’s credit card to merchant’s Bank. In offline store, settlement is usually done in the end of the sales - when the store closes.

You can do everything on the transaction (includes cancel a Success transaction) but not after the Settlement time.

Please [click here ↗](https://docs.midtrans.com/reference/credit-card-object) for the details.

Here is the example of http notification on the Settlement transaction:

```
{  
      "masked_card": "518828-5606",  
      "approval_code": "A12345",  
      "bank": "bni",  
      "eci": "02",  
      "transaction_time" : "2014-10-31 14:46:44",  
      "gross_amount": "59378.00",  
      "order_id" : "testing-0.4555-1414741517",  
      "payment_type": "credit_card",  
      "status_code": "200",  
      "transaction_id": "123456789abcdefghijklmnopqrstuvwxyz",  
      "transaction_status": "settlement",  
      "fraud_status": "accept",  
      "status_message": "Midtrans payment notification"  
}
```