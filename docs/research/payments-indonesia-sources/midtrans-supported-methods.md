---
updatedAt: 2026-03-04T16:41:30.000Z
agentTools:
  projectIndex: https://docs.midtrans.com/llms.txt
---

# Supported Payment Methods

## Credit/Debit Card

<br />

Support for making payments via credit cards and or debit cards. We support `Visa`, `Mastercard`, `American Express` and `JCB`. We also support additional features like [two clicks](https://docs.midtrans.com/reference/features-1#two-clicks-payment), [one click](https://docs.midtrans.com/reference/features-1#one-click-payment), [installment](https://docs.midtrans.com/reference/features-1#installment), and [pre-authorization](https://docs.midtrans.com/reference/features-1#pre-authorization).

<br />

***

<br />

## Bank Transfer

<br />

Support payment using BCA Virtual Account, Permata Virtual Account, BNI Virtual Account, BRI Virtual Account and Mandiri Bill Payment.

<br />

### BCA Virtual Account

BCA Virtual Account is a virtual payment method offered by Bank BCA. Users can pay using their BCA Bank account. Payment can be made through all of Bank BCA’s channels (KlikBCA, m-BCA, and ATM).

<br />

### Permata Virtual Account

Permata Virtual Account is a virtual payment method facilitated by Bank Permata. Users can pay using any Indonesian Bank account. Payment can be made through ATM Bersama, Prima, or Alto ATM networks.

<br />

### BNI Virtual Account

BNI Virtual Account is a virtual payment method facilitated by Bank BNI. Users can pay using any Indonesian Bank account. Payment can be made through ATM Bersama, Prima, or Alto ATM networks.

<br />

### BRI Virtual Account

BRI Virtual Account is a virtual payment method facilitated by Bank BRI. Users can pay using any Indonesian Bank account. Payment can be made through all of Bank BRI's channels (Internet Banking, Mobile Banking, and ATM).

<br />

### Mandiri Bill Payment

Mandiri Bill is a virtual payment method offered by Bank Mandiri. Users can pay using their Mandiri bank account. Payment can be made through all of Bank Mandiri’s channels (Internet Banking, SMS Banking & ATM).

<br />

***

<br />

## GoPay

<br />

GoPay is an e-Wallet payment method by Gojek. Users will pay using the Gojek app.

The user flow varies when using a tablet compared to a smartphone.

<br />

### When users make a purchase using GoPay on a tablet

<br />

1. Users see a QR code on their tablet.

2. Users open the Gojek app on their phone.

3. Users tap the ***Scan QR*** function on the Gojek app.

<br />

<Image title="qr-instruction-1.png" alt={460} width="80%" src="https://files.readme.io/9718a28-qr-instruction-1.png" />

<br />

**Note** : The Scan QR button won’t appear if your GoPay balance is less than Rp10,000.

<br />

4. Users point their camera to the QR Code.

<br />

<Image title="qr-instruction-2.png" alt={440} width="80%" src="https://files.readme.io/0c398f7-qr-instruction-2.png" />

<br />

5. Users check their payment details on the Gojek app and then tap Pay.

<br />

<Image title="qr-instruction-3.png" alt={1501} width="80%" src="https://files.readme.io/c646635-qr-instruction-3.png" />

<br />

6. The transaction is complete and the users’ GoPay balance is deducted.

<br />

### When users make a purchase on their smartphone

1. Users are automatically redirected to the Gojek app when making purchases on their smartphone.
2. Users finish the payment on the Gojek app.
3. The transaction is complete and their GoPay balance is deducted.

<br />

To enable GoPay in Midtrans Mobile SDK, all you need to do is enable GoPay payment method on your Merchant Dashboard (MAP). If you want to use it explicitly by applying direct payment, please take a look at this [sample code](https://docs.midtrans.com/reference/features-1#direct-payment-screen).