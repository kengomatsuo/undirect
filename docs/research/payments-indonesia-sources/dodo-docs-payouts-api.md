SOURCE https://docs.dodopayments.com/api-reference/payouts/get-payouts.md
fetched 2026-11-23
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.dodopayments.com/llms.txt
> Use this file to discover all available pages before exploring further.

# List Payouts

> Get a list of all payouts associated with your account.



## OpenAPI

````yaml get /payouts
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
  /payouts:
    get:
      tags:
        - Payouts
      operationId: list_payouts
      parameters:
        - name: created_at_gte
          in: query
          description: Get payouts created after this time (inclusive)
          required: false
          schema:
            type: string
            format: date-time
          style: form
        - name: created_at_lte
          in: query
          description: Get payouts created before this time (inclusive)
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
          description: Page number default is 0
          required: false
          schema:
            type: integer
            format: int32
            minimum: 0
          style: form
      responses:
        '200':
          description: Payouts List
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetPayoutsResponseList'
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
            for await (const payoutListResponse of client.payouts.list()) {
              console.log(payoutListResponse.business_id);
            }
        - lang: Python
          source: |-
            import os
            from dodopayments import DodoPayments

            client = DodoPayments(
                bearer_token=os.environ.get("DODO_PAYMENTS_API_KEY"),  # This is the default and can be omitted
            )
            page = client.payouts.list()
            page = page.items[0]
            print(page.business_id)
        - lang: Go
          source: "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\n\t\"github.com/dodopayments/dodopayments-go\"\n\t\"github.com/dodopayments/dodopayments-go/option\"\n)\n\nfunc main() {\n\tclient := dodopayments.NewClient(\n\t\toption.WithBearerToken(\"My Bearer Token\"),\n\t)\n\tpage, err := client.Payouts.List(context.TODO(), dodopayments.PayoutListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf(\"%+v\\n\", page)\n}\n"
        - lang: Java
          source: |-
            package com.dodopayments.api.example;

            import com.dodopayments.api.client.DodoPaymentsClient;
            import com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient;
            import com.dodopayments.api.models.payouts.PayoutListPage;
            import com.dodopayments.api.models.payouts.PayoutListParams;

            public final class Main {
                private Main() {}

                public static void main(String[] args) {
                    DodoPaymentsClient client = DodoPaymentsOkHttpClient.fromEnv();

                    PayoutListPage page = client.payouts().list();
                }
            }
        - lang: Kotlin
          source: |-
            package com.dodopayments.api.example

            import com.dodopayments.api.client.DodoPaymentsClient
            import com.dodopayments.api.client.okhttp.DodoPaymentsOkHttpClient
            import com.dodopayments.api.models.payouts.PayoutListPage
            import com.dodopayments.api.models.payouts.PayoutListParams

            fun main() {
                val client: DodoPaymentsClient = DodoPaymentsOkHttpClient.fromEnv()

                val page: PayoutListPage = client.payouts().list()
            }
        - lang: Ruby
          source: |-
            require "dodopayments"

            dodo_payments = Dodopayments::Client.new(
              bearer_token: "My Bearer Token",
              environment: "test_mode" # defaults to "live_mode"
            )

            page = dodo_payments.payouts.list

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
              $page = $client->payouts->list(
                createdAtGte: new \DateTimeImmutable('2019-12-27T18:11:19.117Z'),
                createdAtLte: new \DateTimeImmutable('2019-12-27T18:11:19.117Z'),
                pageNumber: 0,
                pageSize: 0,
              );

              var_dump($page);
            } catch (APIException $e) {
              echo $e->getMessage();
            }
        - lang: C#
          source: |-
            using System;
            using DodoPayments.Client;
            using DodoPayments.Client.Models.Payouts;

            DodoPaymentsClient client = new();

            PayoutListParams parameters = new();

            var page = await client.Payouts.List(parameters);
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
                    .payouts()
                    .list()
                    .query(serde_json::json!({}))
                    .await?;
                println!("{result:?}");
                Ok(())
            }
components:
  schemas:
    GetPayoutsResponseList:
      type: object
      required:
        - items
      properties:
        items:
          type: array
          items:
            $ref: '#/components/schemas/PayoutsResponse'
    PayoutsResponse:
      type: object
      required:
        - payout_id
        - business_id
        - payment_method
        - status
        - fee
        - tax
        - amount
        - created_at
        - updated_at
        - currency
        - refunds
        - chargebacks
      properties:
        amount:
          type: integer
          format: int64
          description: The total amount of the payout.
        business_id:
          type: string
          description: The unique identifier of the business associated with the payout.
        chargebacks:
          type: integer
          format: int64
          description: The total value of chargebacks associated with the payout.
          deprecated: true
          x-stainless-deprecation-message: >-
            Use the v3 payout breakup endpoints instead. Will be removed in a
            future release.
        created_at:
          type: string
          format: date-time
          description: The timestamp when the payout was created, in UTC.
        currency:
          $ref: '#/components/schemas/Currency'
          description: >-
            The currency of the payout, represented as an ISO 4217 currency
            code.
        fee:
          type: integer
          format: int64
          description: The fee charged for processing the payout.
        name:
          type:
            - string
            - 'null'
          description: The name of the payout recipient or purpose.
        payment_method:
          type: string
          description: >-
            The payment method used for the payout (e.g., bank transfer, card,
            etc.).
        payout_document_url:
          type:
            - string
            - 'null'
          description: The URL of the document associated with the payout.
        payout_id:
          type: string
          description: The unique identifier of the payout.
        refunds:
          type: integer
          format: int64
          description: The total value of refunds associated with the payout.
          deprecated: true
          x-stainless-deprecation-message: >-
            Use the v3 payout breakup endpoints instead. Will be removed in a
            future release.
        remarks:
          type:
            - string
            - 'null'
          description: Any additional remarks or notes associated with the payout.
        status:
          $ref: '#/components/schemas/PayoutStatus'
          description: The current status of the payout.
        tax:
          type: integer
          format: int64
          description: The tax applied to the payout.
          deprecated: true
          x-stainless-deprecation-message: >-
            Use the v3 payout breakup endpoints instead. Will be removed in a
            future release.
        updated_at:
          type: string
          format: date-time
          description: The timestamp when the payout was last updated, in UTC.
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
    PayoutStatus:
      type: string
      enum:
        - not_initiated
        - in_progress
        - on_hold
        - failed
        - success
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
