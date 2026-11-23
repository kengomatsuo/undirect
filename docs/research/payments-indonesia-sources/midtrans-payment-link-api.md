---
updatedAt: 2025-11-10T22:39:18.000Z
agentTools:
  projectIndex: https://docs.midtrans.com/llms.txt
---

# Payment Link via API

# <b>Overview</b>

<br />

This section will explain about **Payment Link API** <span class="badge badge-yellow">BETA</span>. Merchant can create & manage **Payment Link** using the API. **Payment Link** is a web-based link (URL) which can be shared to Customer to receive payments from them – like an **invoice**. The link will redirect them to Midtrans hosted payment web page.

<br />

***

# <b>Key Benefit</b>

* <b>Create with simple API call</b>\
  No need to login to Midtrans dashboard to manually create one-by-one. Easily create Payment Link via API integration.

<br />

* <b>Connect with Your Web/App</b>\
  Connect your web/app/system, receive real time notification, & manage your transaction in a two-way communication flow via API.

<br />

* <b>Accessible & Secure</b>\
  Manage who can access the feature from your system, without providing access to your whole Midtrans dashboard. Also a secure & simple payment flow for the Customer.

<br />

* <b>Customizable Limit</b>\
  Customize how long and how many usage(s) the link will be valid for.

<br />

* <b>Customizable URL</b>\
  Customize some part of the URL, to make it more accessible for Customer.

<br />

* <b>Email Notification</b>\
  Payment instructions can automatically be sent to Customer, after each successful creation.

<br />

> 🚧 Security Tips for Customizable URL
>
> It's mandatory to ensure the link is not guessable in order to protect you and your customer.\
> For example, having an enumerated number in the custom url can impose a risk that anyone can guess the next number: <b> /merchant-payment-order-001 </b>
>
> Each payment link is recommended to have the following properties:
>
> * Non-guessability: Links should be unpredictable to prevent unauthorized access or brute-force attacks.
> * Usability: Links should be reasonably short and manageable for sharing (e.g., via email, SMS, or QR code).
> * Uniqueness: Each payment link must be unique to prevent collisions.
> * Scalability: The algorithm should handle high volumes of link generation without performance issues.
>
> In order to do achieve these goals, here are some sample algorithm you can try.
>
> 1. UUID / UUIDv4: This has a negligible chance of collision (2^128 possibilities)
> 2. Cryptographically Secure Random Token: Enhance non-guessability by generating a random token using a cryptographically secure random number generator.
> 3. Hash order information: Use a cryptographic hash function like SHA-256 to create a fixed-length, non-reversible token. For usability, truncate the hash to a reasonable length (e.g., 16–20 bytes) to keep the link manageable

***

# <b> Business Usecase Example </b>

<br />

Here are some business use case ideas that Merchant can achieves with Payment Link:

* **Invoice based payment system** use case. As the payment link expiry can be set to weeks or months. Can also be set to be paid by 1 specific customer, or mass generic invoice for a big number of customers.
  * Whether for B2B business type where Merchant wants to create goods & services payment invoice to be paid by partner/vendor/customer.
  * Or even for regular B2C business type that sells various goods & services.
* **Ticketing payment** use case, due to the same reason as above. For example tickets for transportations, entertainment, courses, digital products, conferences, webinars, online/offline event, concert, shows, meet and greet, parking, hotel, traffic/other violation sanction, & hospitality, etc.

<br />

***

# <b> Customer Journey</b>

<br />

Example of how Customer journey can be:

1. Merchant **shares the Payment Link to Customer** via messaging app (Whatsapp, SMS, Email, etc. Midtrans can also automatically send via Email to Customer).

<br />

![](https://files.readme.io/edef5d7-paymentlink-api-showcase-1.png "paymentlink-api-showcase-1.png")

<br />

2. Customer click the Payment Link, open the **payment page in web browser, and then the payment** as instructed.

<br />

![](https://files.readme.io/8a08952-paymentlink-api-showcase-2.gif "paymentlink-api-showcase-2.gif")

<br />

***

# <b>Merchant Journey</b>

<br />

Example of how Merchant journey can be (check Business Usecases Example section above for more variations):

1. **Customer create an order/purchase** to Merchant (via web/app/system, or manual order).
2. Merchant's **sales person prepares/initates payment invoice via Merchant's system**.
3. Merchant's **system/backend[initiate API request to Create Payment Link](https://docs.midtrans.com/docs/payment-link-api-reference#create-payment-link-api)** to Midtrans API to retrieve payment URL. Display the result to the sales person (or via system).
4. Merchant's sales person (or system) **share the Payment Link to Customer** via messaging app (Whatsapp, SMS, Email, etc. Midtrans can also automatically send via Email to Customer). [Customer proceed to pay](#customer-journey).
5. Later after payment has been completed, [merchant system's will be notified](https://docs.midtrans.com/docs/payment-link-api-reference#handling-notifications). There are also other [alternatives actions for after-payment](#other-api-actions-amp-payment-handling).

<br />

***

# <b>Sequence Diagram</b>

<br />

<details>
<summary><b>Click to expand</b></summary>
<article>

<Image title="paymentlink-api-sequence-diagram.png" alt={1238} align="center" src="https://files.readme.io/b956cdf-paymentlink-api-sequence-diagram.png">
  Payment Link API Sequence Diagram
</Image>

</article>
</details>

<br />

***

# <b>API Reference</b>

<br />

Explore the API reference to learn further [here](https://docs.midtrans.com/docs/payment-link-api-reference).