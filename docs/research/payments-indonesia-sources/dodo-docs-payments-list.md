SOURCE https://docs.dodopayments.com/api-reference/payments/get-payments.md
fetched 2026-11-23
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.dodopayments.com/llms.txt
> Use this file to discover all available pages before exploring further.

# List Payments

> Get a list of all payments associated with your account.



## OpenAPI

````yaml get /payments
openapi: 3.1.0
info:
  title: public
  description: ''
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0
  version: 1.124.0
servers:
  - url: https://test.dodopayments.com/
    description: Test Mode Server Host
  - url: https://live.dodopayments.com/
    description: Live Mode Server Host
security: []
tags:
  - name: Products
  - name: Payments
  - name: Subscriptions
  - name: Addons
  - name: Customers
  - name: Refunds
  - name: Disputes
  - name: Events
  - name: License Keys
  - name: Entitlements
  - name: Licenses
  - name: Discounts
  - name: Meters
  - name: Credit Entitlements
  - name: Credit Entitlement Balances
  - name: Outgoing Webhooks
  - name: Checkout
  - name: Webhook Events
  - name: Payment Connector Webhooks
  - name: Moderation
  - name: Invoices
  - name: Workload Identity
  - name: App Installation
paths:
  /payments:
    get:
      tags:
        - Payments
      operationId: list_payments_handler
      parameters:
        - name: created_at_gte
          in: query
          description: Get events after this created time
          required: false
          schema:
            type: string
            format: date-time
          style: form
        - name: created_at_lte
          in: query
          description: Get events created before this time
          required: false
          schema:
            type: string
            format: date-time
          style: form
        - name: page_size
          in: query
          description: Page size default is 10 max is 100
          required: false
          schema:
            type: integer
            format: int32
            minimum: 0
          style: form
        - name: page_number
          in: query
          description: >-
            Page number default is 0. Capped to bound OFFSET-based deep
            pagination,

            which forces Postgres to scan and discard every preceding row.
          required: false
          schema:
            type: integer
            format: int32
            minimum: 0
          style: form
        - name: customer_id
          in: query
          description: Filter by customer id
          required: false
          schema:
            type: string
          style: form
        - name: subscription_id
          in: query
          description: Filter by subscription id
          required: false
          schema:
            type: string
          style: form
        - name: status
          in: query
          description: Filter by status
          required: false
          schema:
            type: string
            enum:
              - succeeded
              - failed
              - cancelled
              - processing
              - requires_customer_action
              - requires_merchant_action
              - requires_payment_method
              - requires_confirmation
              - requires_capture
              - partially_captured
              - partially_captured_and_capturable
          style: form
        - name: brand_id
          in: query
          description: filter by Brand id
          required: false
          schema:
            type: string
          style: form
        - name: product_id
          in: query
          description: Filter by product id
          required: false
          schema:
            type: string
          style: form
        - name: currency
          in: query
          description: Filter by currency
          required: false
          schema:
            type: string
            enum:
              - AED
              - ALL
              - AMD
              - ANG
              - AOA
              - ARS
              - AUD
              - AWG
              - AZN
              - BAM
              - BBD
              - BDT
              - BGN
              - BHD
              - BIF
              - BMD
              - BND
              - BOB
              - BRL
              - BSD
              - BWP
              - BYN
              - BZD
              - CAD
              - CHF
              - CLP
              - CNY
              - COP
              - CRC
              - CUP
              - CVE
              - CZK
              - DJF
              - DKK
              - DOP
              - DZD
              - EGP
              - ETB
              - EUR
              - FJD
              - FKP
              - GBP
              - GEL
              - GHS
              - GIP
              - GMD
              - GNF
              - GTQ
              - GYD
              - HKD
              - HNL
              - HRK
              - HTG
              - HUF
              - IDR
              - ILS
              - INR
              - IQD
              - JMD
              - JOD
              - JPY
              - KES
              - KGS
              - KHR
              - KMF
              - KRW
              - KWD
              - KYD
              - KZT
              - LAK
              - LBP
              - LKR
              - LRD
              - LSL
              - LYD
              - MAD
              - MDL
              - MGA
              - MKD
              - MMK
              - MNT
              - MOP
              - MRU
              - MUR
              - MVR
              - MWK
              - MXN
              - MYR
              - MZN
              - NAD
              - NGN
              - NIO
              - NOK
              - NPR
              - NZD
              - OMR
              - PAB
              - PEN
              - PGK
              - PHP
              - PKR
              - PLN
              - PYG
              - QAR
              - RON
              - RSD
              - RUB
              - RWF
              - SAR
              - SBD
              - SCR
              - SEK
              - SGD
              - SHP
              - SLE
              - SLL
              - SOS
              - SRD
              - SSP
              - STN
              - SVC
              - SZL
              - THB
              - TND
              - TOP
              - TRY
              - TTD
              - TWD
              - TZS
              - UAH
              - UGX
              - USD
              - UYU
              - UZS
              - VES
              - VND
              - VUV
              - WST
              - XAF
              - XCD
              - XOF
              - XPF
              - YER
              - ZAR
              - ZMW
          style: form
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetPaymentsListResponse'
        '500':
          description: Something went wrong :(
      security:
        - API_KEY: []
      x-codeSamples:
        - lang: JavaScript
          source: |-
            import DodoPayments from 'dodopayments';

            const client = new DodoPayments({
              bearerToken: process.env['DODO_PAYMENTS_API_KEY'], // This is the default and can be omitted
            });

            // Automatically fetches more pages as needed.
            for await (const paymentListResponse of client.payments.list()) {
              console.log(paymentListResponse.brand_id);
            }
        - lang: Python
          source: |-
            import os
            from dodopayments import DodoPayments

            client = DodoPayments(
                bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted
            )
            page = client.payments.list()
            page = page.items[0]
            print(page.brand_id)
        - lang: Go
          source: "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\n\t\"github.com/dodopayments/dodopayments-go\"\n\t\"github.com/dodopayments/dodopayments-go/option\"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken(\"My Bearer Token\"),\n\t)\n\tpage, err := client.Payments.List(context.TODO(), dodopayments.PaymentListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf(\"%+v\\n\", page)\n}\n"
        - lang: Java
          source: |-
            package com.dodopayments.api.example;

            import com.dodopayments.api.client.DodoPaymentsClient;
            import com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;
            import com.dodopayments.api.models.payments.PaymentListPage;
            import com.dodopayments.api.models.payments.PaymentListParams;

            public final class Main {
                private Main() {}

                public static void main(String[] args) {
                    DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();

                    PaymentListPage page = client.payments().list();
                }
            }
        - lang: Kotlin
          source: |-
            package com.dodopayments.api.example

            import com.dodopayments.api.client.DodoPaymentsClient
            import com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient
            import com.dodopayments.api.models.payments.PaymentListPage
            import com.dodopayments.api.models.payments.PaymentListParams

            fun main() {
                val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()

                val page: PaymentListPage = client.payments().list()
            }
        - lang: Ruby
          source: |-
            require "dodopayments"

            dodo_payments = Dodopayments::Client.new(
              bearer_token: "My Bearer Token",
              environment: "test_mode" # defaults to "live_mode"
            )

            page = dodo_payments.payments.list

            puts(page)
        - lang: PHP
          source: |-
            <?php

            require_once dirname(__DIR__) . '/vendor/autoload.php';

            use Dodopayments\Client;
            use Dodopayments\Core\Exceptions\APIException;

            $client = new Client(
              bearerToken: getenv('DODO_PAYMENTS_API_KEY') ?: 'My Bearer Token',
              environment: 'test_mode',
            );

            try {
              $page = $client->payments->list(
                brandID: 'brand_id',
                createdAtGte: new \DateTimeImmutable('2019-12-27T18:11:19.117Z'),
                createdAtLte: new \DateTimeImmutable('2019-12-27T18:11:19.117Z'),
                currency: 'AED',
                customerID: 'customer_id',
                pageNumber: 0,
                pageSize: 0,
                productID: 'product_id',
                status: 'succeeded',
                subscriptionID: 'subscription_id',
              );

              var_dump($page);
            } catch (APIException $e) {
              echo $e->getMessage();
            }
        - lang: C#
          source: |-
            using System;
            using DodoPayments.Client;
            using DodoPayments.Client.Models.Payments;

            DodoPaymentsClient client = new();

            PaymentListParams parameters = new();

            var page = await client.Payments.List(parameters);
            await foreach (var item in page.Paginate())
            {
                Console.WriteLine(item);
            }
        - lang: Rust
          source: |-
            use dodopayments::Client;

            #[tokio::main]
            async fn main() -> dodopayments::Result<()> {
                let client = Client::from_env()?;
                let result = client
                    .payments()
                    .list()
                    .query(serde_json::json!({}))
                    .await?;
                println!("{result:?}");
                Ok(())
            }
components:
  schemas:
    GetPaymentsListResponse:
      type: object
      required:
        - items
      properties:
        items:
          type: array
          items:
            $ref: '#/components/schemas/GetPaymentsListResponseItem'
    GetPaymentsListResponseItem:
      type: object
      required:
        - payment_id
        - total_amount
        - currency
        - customer
        - created_at
        - is_multi_subscription
        - subscription_ids
        - includes_usage
        - service_periods
        - brand_id
        - digital_products_delivered
        - has_license_key
        - metadata
        - payment_provider
        - retry_attempt
      properties:
        brand_id:
          type: string
        card_exp_month:
          type:
            - string
            - 'null'
          description: >-
            Expiry month of the card, as two digits from `01` to `12`. For Apple
            Pay and

            Google Pay, this is the expiry of the wallet token, which can differ
            from the

            expiry of the physical card.
        card_exp_year:
          type:
            - string
            - 'null'
          description: >-
            Expiry year of the card, as four digits, for example `2029`. For
            Apple Pay and

            Google Pay, this is the expiry of the wallet token, which can differ
            from the

            expiry of the physical card.
        card_last_four:
          type:
            - string
            - 'null'
          description: The last four digits of the card
        card_network:
          type:
            - string
            - 'null'
          description: >-
            Card network, in lowercase, for example `visa`, `mastercard` or
            `amex`. Older payments can

            carry other casing.
        card_type:
          type:
            - string
            - 'null'
          description: >-
            The type of card, in lowercase: `credit`, `debit` or `prepaid`.
            Older payments can carry

            other casing.
        charge_type:
          oneOf:
            - type: 'null'
            - $ref: '#/components/schemas/ChargeType'
              description: >-
                The type of subscription charge that this payment is for. Refer
                to `ChargeType`.

                The value is set for each payment status, not only for
                `succeeded`.

                The value is null when this payment charges no subscription.
        checkout_session_id:
          type:
            - string
            - 'null'
          description: >-
            The ID of the checkout session for this payment. The value is null
            when

            the payment does not use a checkout session.
        created_at:
          type: string
          format: date-time
        currency:
          $ref: '#/components/schemas/Currency'
        customer:
          $ref: '#/components/schemas/CustomerLimitedDetailsResponse'
        digital_products_delivered:
          type: boolean
        dispute_status:
          oneOf:
            - type: 'null'
            - $ref: '#/components/schemas/DisputeStatus'
              description: >-
                The most recent dispute status for this payment. None if no
                disputes exist.
        has_license_key:
          type: boolean
        includes_usage:
          type: boolean
          description: >-
            True when this payment also bills metered usage or credit overage.
            The usage is

            for the billing cycle before the service period, not for the service
            period.

            The value is set for each payment status. It is false when
            `charge_type` is null.
        invoice_id:
          type:
            - string
            - 'null'
          description: >-
            Invoice ID for this payment. Uses India-specific invoice ID if
            available.
        invoice_url:
          type:
            - string
            - 'null'
          description: >-
            DEPRECATED: Use `GET /invoices/payments/{payment_id}` with an API
            key.

            URL to download the invoice PDF for this payment. The URL has no
            signed token. If the

            business asks for a credential on its invoice links, the URL needs
            an API key.
          deprecated: true
          x-stainless-deprecation-message: Use `GET /invoices/payments/{payment_id}` with an API key.
        is_multi_subscription:
          type: boolean
          description: >-
            True when one payment starts more than one subscription. Read this
            field

            to find the payment type. Do not read the length of
            `subscription_ids`.

            Do not read `subscription_id` for null.
        metadata:
          $ref: '#/components/schemas/Metadata'
        payment_id:
          type: string
        payment_method:
          type:
            - string
            - 'null'
        payment_method_type:
          type:
            - string
            - 'null'
        payment_provider:
          $ref: '#/components/schemas/PaymentProvider'
          description: >-
            Which processor handled this payment. `stripe` / `adyen` for BYOP
            routes

            (the merchant's own payment connector); `dodo` for everything Dodo

            processed itself.
        refund_status:
          oneOf:
            - type: 'null'
            - $ref: '#/components/schemas/PaymentRefundStatus'
              description: >-
                Summary of the refund status for this payment. None if no
                succeeded refunds exist.
        retry_attempt:
          type: integer
          format: int32
          description: >-
            The retry attempt number of this payment. The value is `0` for the
            original

            payment. Each retry after a failed subscription renewal adds `1`.
            The value

            is always `0` for a payment that is not for a subscription.
        service_periods:
          type: array
          items:
            $ref: '#/components/schemas/SubscriptionServicePeriod'
          description: >-
            The service period of each subscription that this payment pays for.

            The order is the same as `subscription_ids`. For a plan change
            charge, the

            period starts at the plan change and ends at the next billing date.
            The list

            is empty unless the payment status is `succeeded`. The list is also
            empty for

            a one-time payment, an on-demand charge, or a payment method update.

            The list is set for `new`, `renewal` and `plan_change` charges that
            succeeded.

            It can be empty for some zero-amount payments.

            A `renewal` with no entry for its subscription bills usage only.

            That payment does not extend the service period.
        status:
          oneOf:
            - type: 'null'
            - $ref: '#/components/schemas/IntentStatus'
        subscription_id:
          type:
            - string
            - 'null'
        subscription_ids:
          type: array
          items:
            type: string
          description: >-
            Every subscription that this payment starts or charges, in a stable
            order.

            It is empty for a one-time payment. It holds the value of
            `subscription_id`

            when the payment names one subscription.
        three_ds_flow:
          oneOf:
            - type: 'null'
            - $ref: '#/components/schemas/ThreeDsFlow'
              description: >-
                How the cardholder completed the 3DS authentication. The value
                is null when the processor

                does not report it.
        three_ds_status:
          oneOf:
            - type: 'null'
            - $ref: '#/components/schemas/ThreeDsStatus'
              description: >-
                The result of the 3DS authentication, as the processor reports
                it. The value is null when

                the processor reports no 3DS data, for example when the payment
                did not use 3DS.
        three_ds_version:
          type:
            - string
            - 'null'
          description: >-
            The 3DS protocol version, for example `2.2.0`. The value is null
            when the processor does

            not report it.
        total_amount:
          type: integer
          format: int32
    ChargeType:
      type: string
      description: >-
        The type of subscription charge that a payment is for.


        A payment has one invoice, and the invoice has one type. Thus each
        payment has

        one charge type. A payment that charges no subscription has no charge
        type.


        - `new`: the first payment of one or more subscriptions. A retry of that
        payment
          is also `new`. A cart with new subscriptions and one-time products is `new`.
          Read the one-time products from `product_cart`.
        - `renewal`: a charge at the billing date. A dunning retry and a manual
        retry of
          that charge are also `renewal`. A `renewal` does not always extend the service
          period. For example, the usage settlement of a paused subscription is a `renewal`
          with `includes_usage` true and no entry in `service_periods`. Examine
          `service_periods` before you extend access.
        - `plan_change`: a charge for a plan change. The change applies now or
        at the next billing date.

        - `on_demand`: an on-demand charge of an on-demand subscription.
      enum:
        - new
        - renewal
        - plan_change
        - on_demand
    Currency:
      type: string
      enum:
        - AED
        - ALL
        - AMD
        - ANG
        - AOA
        - ARS
        - AUD
        - AWG
        - AZN
        - BAM
        - BBD
        - BDT
        - BGN
        - BHD
        - BIF
        - BMD
        - BND
        - BOB
        - BRL
        - BSD
        - BWP
        - BYN
        - BZD
        - CAD
        - CHF
        - CLP
        - CNY
        - COP
        - CRC
        - CUP
        - CVE
        - CZK
        - DJF
        - DKK
        - DOP
        - DZD
        - EGP
        - ETB
        - EUR
        - FJD
        - FKP
        - GBP
        - GEL
        - GHS
        - GIP
        - GMD
        - GNF
        - GTQ
        - GYD
        - HKD
        - HNL
        - HRK
        - HTG
        - HUF
        - IDR
        - ILS
        - INR
        - IQD
        - JMD
        - JOD
        - JPY
        - KES
        - KGS
        - KHR
        - KMF
        - KRW
        - KWD
        - KYD
        - KZT
        - LAK
        - LBP
        - LKR
        - LRD
        - LSL
        - LYD
        - MAD
        - MDL
        - MGA
        - MKD
        - MMK
        - MNT
        - MOP
        - MRU
        - MUR
        - MVR
        - MWK
        - MXN
        - MYR
        - MZN
        - NAD
        - NGN
        - NIO
        - NOK
        - NPR
        - NZD
        - OMR
        - PAB
        - PEN
        - PGK
        - PHP
        - PKR
        - PLN
        - PYG
        - QAR
        - RON
        - RSD
        - RUB
        - RWF
        - SAR
        - SBD
        - SCR
        - SEK
        - SGD
        - SHP
        - SLE
        - SLL
        - SOS
        - SRD
        - SSP
        - STN
        - SVC
        - SZL
        - THB
        - TND
        - TOP
        - TRY
        - TTD
        - TWD
        - TZS
        - UAH
        - UGX
        - USD
        - UYU
        - UZS
        - VES
        - VND
        - VUV
        - WST
        - XAF
        - XCD
        - XOF
        - XPF
        - YER
        - ZAR
        - ZMW
    CustomerLimitedDetailsResponse:
      type: object
      required:
        - customer_id
        - name
        - email
      properties:
        customer_id:
          type: string
          description: Unique identifier for the customer
        email:
          type: string
          description: Email address of the customer
        metadata:
          $ref: '#/components/schemas/Metadata'
          description: Additional metadata associated with the customer
        name:
          type: string
          description: Full name of the customer
        phone_number:
          type:
            - string
            - 'null'
          description: Phone number of the customer
    DisputeStatus:
      type: string
      enum:
        - dispute_opened
        - dispute_expired
        - dispute_accepted
        - dispute_cancelled
        - dispute_challenged
        - dispute_won
        - dispute_lost
    Metadata:
      type: object
      title: Metadata
      description: >-
        Arbitrary key-value metadata. Values can be string, integer, number, or
        boolean.
      additionalProperties:
        oneOf:
          - type: string
            title: String
          - type: integer
            title: Integer
            format: int64
          - type: number
            title: Number
            format: double
          - type: boolean
            title: Boolean
        title: Metadata Value
        description: Metadata value can be a string, integer, number, or boolean
    PaymentProvider:
      type: string
      description: >-
        The processor that ultimately handles a payment, surfaced to the
        dashboard

        so the UI can badge each payment / dispute as "powered by ...".


        `Stripe` and `Adyen` are returned for BYOP routes (the merchant's own

        payment connector). `Dodo` covers every other route — both Dodo's own

        MoR processors (Stripe US/UK, Cashfree, Airwallex) and any payment that
        has

        no merchant connector attached.


        This type intentionally does NOT reuse the internal `Connector` enum:
        that

        one tracks Dodo's own processor pool and shouldn't leak its variants
        into

        dashboard responses.
      enum:
        - stripe
        - adyen
        - dodo
    PaymentRefundStatus:
      type: string
      enum:
        - partial
        - full
    SubscriptionServicePeriod:
      type: object
      description: The service period that a payment pays for, for one subscription.
      required:
        - subscription_id
        - starts_at
        - ends_at
        - proration_factor
      properties:
        ends_at:
          type: string
          format: date-time
          description: End of the service period.
        proration_factor:
          type: string
          description: >-
            The part of one full billing period that the plan charge pays for.
            The value

            `"1"` is a full period. A value less than 1 is a partial period, for
            example

            after a plan change that keeps the billing cycle.

            For a plan change, this is the value of the new plan. The credit for
            the old

            plan is not in this value.
          example: '1'
        starts_at:
          type: string
          format: date-time
          description: >-
            Start of the service period. For a renewal, this is the billing
            date. For a

            plan change that applies at the next billing date, this is the time
            when the

            change applied. This time can be some minutes after the billing
            date.
        subscription_id:
          type: string
          description: Identifier of the subscription.
    IntentStatus:
      type: string
      enum:
        - succeeded
        - failed
        - cancelled
        - processing
        - requires_customer_action
        - requires_merchant_action
        - requires_payment_method
        - requires_confirmation
        - requires_capture
        - partially_captured
        - partially_captured_and_capturable
    ThreeDsFlow:
      type: string
      description: How the cardholder completed the 3DS authentication.
      enum:
        - challenge
        - frictionless
    ThreeDsStatus:
      type: string
      description: >-
        The result of the 3DS authentication of a card payment, as the processor
        reports it.
      enum:
        - authenticated
        - attempt_acknowledged
        - exempted
        - failed
        - not_supported
        - processing_error
  securitySchemes:
    API_KEY:
      type: http
      scheme: bearer
      description: >-
        Send your API key as a bearer token: `Authorization: Bearer <api_key>`.
        A test mode key starts with `dodo_test_`, for example
        `dodo_test_AbCd1234EfGh5678.<secret>`. A live mode key starts with
        `dodo_live_`. Use a test mode key on `test.dodopayments.com` and a live
        mode key on `live.dodopayments.com`. Keys from before these tags have no
        tag and operate as before.

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.
HTTP 200
