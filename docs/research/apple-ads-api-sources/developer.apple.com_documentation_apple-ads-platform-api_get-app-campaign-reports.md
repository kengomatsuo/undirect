<!--
{
  "availability" : [
    "Apple Ads Platform API: 1.0.0 -"
  ],
  "documentType" : "symbol",
  "framework" : "Apple-Ads-Platform-API",
  "identifier" : "/documentation/Apple-Ads-Platform-API/Get-app-campaign-reports",
  "metadataVersion" : "0.1.0",
  "role" : "Web Service Endpoint",
  "symbol" : {
    "kind" : "Web Service Endpoint",
    "modules" : [
      "Apple Ads Platform API"
    ],
    "preciseIdentifier" : "rest:apple-ads-platform-api:post:reports-apps-campaigns-query"
  },
  "title" : "Campaigns Report"
}
-->

# Campaigns Report

Retrieve performance metrics for campaigns.

## Discussion

Campaign reports return one row per campaign. Each row contains a `metadata` object with campaign identifiers, `totalMetrics` aggregated over the full date range, and a `granularMetrics` array broken down by the selected `granularity`.

The `campaignId` filter is optional for campaign reports. Use `filters` to scope the report to specific campaigns, or omit it to return all campaigns. Use `groupBy` to split metrics along a dimension: each dimension value produces its own row within the campaign’s result.

See [`Filter`](/documentation/Apple-Ads-Platform-API/Filter) for the full set of supported comparison operators.

## Request Body

See [`AppsReportingRequest`](/documentation/Apple-Ads-Platform-API/AppsReportingRequest).

### groupBy Dimensions

`deviceClass`, `ageRange`, `gender`, `countryCode`, `adminArea`, `locality`, `countryOrRegion`

Date range requirements vary by granularity: `HOURLY` and `DAILY` are capped at 7-day and 90-day spans respectively, while `WEEKLY` and `MONTHLY` require spans of at least 14 and 90 days respectively.

|Granularity|Constraint                                                                               |
|-----------|-----------------------------------------------------------------------------------------|
|`DAILY`    |Date range must span 90 days or less.                                                    |
|`HOURLY`   |Date range must span 7 days or less, and the start date must be within the last 365 days.|
|`WEEKLY`   |Date range must span at least 14 days.                                                   |
|`MONTHLY`  |Date range must span at least 90 days.                                                   |

To request a single day of data, omit `granularity` entirely. For a single-day request, the response returns results in `totalMetrics` only, since there is no `granularMetrics` breakdown to compute.

Selecting a timezone of `ORTZ` or `UTC` and using the `fields` array to request specific metrics keeps campaign report responses focused.

|Constraint      |Detail                                                         |
|----------------|---------------------------------------------------------------|
|Timezone        |Use `ORTZ` (reporting timezone) or `UTC`.                      |
|Fields selection|Use the `fields` array to request only specific metric columns.|

## Payload Examples

**Daily by Country:**

Retrieve daily campaign metrics for a specific app campaign, grouped by country. The `granularMetrics` array returns one entry per day per country combination.

### Request

Filters by a single `campaignId` and groups results by `countryOrRegion`, using daily granularity over a 31-day window in the account’s reporting timezone.

```http
POST /v1/reports/apps/campaigns/query

{
 "pagination": {
   "offset": 0,
   "pageSize": 20
 },
 "filters": [
   {
     "field": "campaignId",
     "operator": "EQUALS",
     "value": "444555666"
   }
 ],
 "groupBy": [
   "countryOrRegion"
 ],
 "timeRange": {
   "start": "2025-01-01",
   "end": "2025-01-31",
   "timeZone": "ORTZ",
   "granularity": "DAILY"
 }
}
```

### Response

```json
{
 "result": {
   "rows": [
     {
       "metadata": {
         "id": 444555666,
         "name": "AwayFinder — US Launch",
         "adAccountId": 123456789,
         "promotedObjectType": "APPSTORE_APP",
         "promotedObjectId": "987654321",
         "promotedObject": {
           "name": "AwayFinder"
         },
         "bidStrategy": {
           "bidStrategyType": "MANUAL_CPT"
         },
         "status": "ENABLED",
         "deleted": false
       },
       "totalMetrics": {
         "localSpend": {
           "amount": "500.00",
           "currency": "USD"
         },
         "impressions": 50000,
         "taps": 2500,
         "ttr": 0.05,
         "cpt": {
           "amount": "0.20",
           "currency": "USD"
         },
         "tapInstalls": 600,
         "totalInstalls": 720,
         "tapNewDownloads": 540,
         "tapRedownloads": 60
       },
       "granularMetrics": [
         {
           "date": "2025-01-01",
           "countryOrRegion": "US",
           "localSpend": {
             "amount": "18.40",
             "currency": "USD"
           },
           "impressions": 1850,
           "taps": 92,
           "ttr": 0.05,
           "tapInstalls": 22
         }
       ]
     }
   ],
   "summary": {
     "grandTotal": {
       "localSpend": {
         "amount": "500.00",
         "currency": "USD"
       },
       "impressions": 50000,
       "taps": 2500,
       "tapInstalls": 600
     }
   }
 },
 "pagination": {
   "totalCount": 1,
   "offset": 0,
   "pageSize": 20
 }
}
```

---

Copyright &copy; 2026 Apple Inc. All rights reserved. | [Terms of Use](https://www.apple.com/legal/internet-services/terms/site.html) | [Privacy Policy](https://www.apple.com/privacy/privacy-policy)