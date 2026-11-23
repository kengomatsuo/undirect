<!--
{
  "documentType" : "article",
  "framework" : "Apple-Ads-Platform-API",
  "identifier" : "/documentation/Apple-Ads-Platform-API/reports",
  "metadataVersion" : "0.1.0",
  "role" : "article",
  "title" : "Managing Reports"
}
-->

# Managing Reports

Retrieve performance data for campaigns, ad groups, ads, keywords, and search terms.

## Overview

All report endpoints follow a shared `POST /query` pattern. You parameterize each request with `promotedObjectType`: either `apps` for App Store app campaigns or `business-brands` for Apple Maps campaigns. The request body, response objects, available groupBy dimensions, and supported options differ between the two promoted object types.

## Choose a Reporting Endpoint

Query one of the following endpoints based on your promoted object type and the entity level you want to report on:

|Method|Path                                           |Description                                                                                                                                                   |
|------|-----------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
|`POST`|`/v1/reports/apps/campaigns/query`             |<doc://com.apple.apple-ads-platform-api/documentation/Apple-Ads-Platform-API/Get-app-campaign-reports> retrieves App Store campaign performance data.         |
|`POST`|`/v1/reports/apps/adgroups/query`              |<doc://com.apple.apple-ads-platform-api/documentation/Apple-Ads-Platform-API/Get-app-ad-group-reports> retrieves App Store ad group performance data.         |
|`POST`|`/v1/reports/apps/ads/query`                   |<doc://com.apple.apple-ads-platform-api/documentation/Apple-Ads-Platform-API/Get-app-ad-reports> retrieves App Store ad performance data.                     |
|`POST`|`/v1/reports/apps/keywords/query`              |<doc://com.apple.apple-ads-platform-api/documentation/Apple-Ads-Platform-API/Get-app-keyword-reports> retrieves App Store keyword performance data.           |
|`POST`|`/v1/reports/apps/searchterms/query`           |<doc://com.apple.apple-ads-platform-api/documentation/Apple-Ads-Platform-API/Get-app-search-term-reports> retrieves App Store search term performance data.   |
|`POST`|`/v1/reports/business-brands/campaigns/query`  |<doc://com.apple.apple-ads-platform-api/documentation/Apple-Ads-Platform-API/Get-brand-campaign-reports> retrieves Apple Maps campaign performance data.      |
|`POST`|`/v1/reports/business-brands/adgroups/query`   |<doc://com.apple.apple-ads-platform-api/documentation/Apple-Ads-Platform-API/Get-brand-ad-group-reports> retrieves Apple Maps ad group performance data.      |
|`POST`|`/v1/reports/business-brands/ads/query`        |<doc://com.apple.apple-ads-platform-api/documentation/Apple-Ads-Platform-API/Get-brand-ad-reports> retrieves Apple Maps ad performance data.                  |
|`POST`|`/v1/reports/business-brands/keywords/query`   |<doc://com.apple.apple-ads-platform-api/documentation/Apple-Ads-Platform-API/Get-brand-keyword-reports> retrieves Apple Maps keyword performance data.        |
|`POST`|`/v1/reports/business-brands/searchterms/query`|<doc://com.apple.apple-ads-platform-api/documentation/Apple-Ads-Platform-API/Get-brand-search-term-reports> retrieves Apple Maps search term performance data.|

### Build the Request

Every report request uses either [`AppsReportingRequest`](/documentation/Apple-Ads-Platform-API/AppsReportingRequest) or [`BrandsReportingRequest`](/documentation/Apple-Ads-Platform-API/BrandsReportingRequest) as the request body. Both share the same top-level fields:

- The `timeRange` field defines the reporting window via [`TimeRange`](/documentation/Apple-Ads-Platform-API/TimeRange): `start` date, `end` date, `timeZone` (`UTC` or `ORTZ`), and optional `granularity` (`HOURLY`, `DAILY`, `WEEKLY`, `MONTHLY`).
- The `filters` field is an array of [`Filter`](/documentation/Apple-Ads-Platform-API/Filter) conditions that narrow results by field, operator, and value.
- The `sorting` field is an array of [`Sorting`](/documentation/Apple-Ads-Platform-API/Sorting) objects that order rows by field and direction.
- The `pagination` field uses [`RequestPagination`](/documentation/Apple-Ads-Platform-API/RequestPagination), with `offset` and `pageSize` (maximum 5000, default 100).
- The `fields` field is an optional list of field names to return. Omit it to receive all fields.
- The `groupBy` field is an optional dimensional breakdown. Supported values differ between Apps and Brands, and additional restrictions apply at the keyword and search term entity levels. When you omit `groupBy`, the response returns one aggregate row per entity with no dimensional breakdown. We recommend providing at least one `groupBy` value to get meaningful segmented data in most reporting use cases.
- The `options` field sets row inclusion flags via [`AppsOptions`](/documentation/Apple-Ads-Platform-API/AppsOptions) or [`BrandsOptions`](/documentation/Apple-Ads-Platform-API/BrandsOptions).

### Read the Response

All report responses share the same envelope: a `result` object containing a `rows` array of report rows and a `summary.grandTotal` object, plus a `pagination` object and an `error` field. Each row contains:

- The `totalMetrics` field holds aggregate metrics for the row over the full time range.
- The `granularMetrics` field breaks out metrics by the requested `granularity` period, and it appears only when you specify `granularity` in the request.
- The `metadata` field holds entity attributes (campaign name, status, targeting, and so on) plus any `groupBy` dimension values applied to the row.

When you include `GRAND_TOTAL` in `options.includeRows`, the response also includes a summary row with totals across all result rows.

### Apply Granularity Constraints

Granularity is an optional time-series breakdown that applies to `granularMetrics`. The following constraints apply to all entities and both promoted object types unless noted:

|Granularity|Constraint                                                                                                                                   |
|-----------|---------------------------------------------------------------------------------------------------------------------------------------------|
|`HOURLY`   |Date range must span 7 days or less, and `start` must fall within the last 365 days. Ad-level and search term-level reports don’t support it.|
|`DAILY`    |Date range must span 90 days or less.                                                                                                        |
|`WEEKLY`   |Date range must span at least 14 days.                                                                                                       |
|`MONTHLY`  |Date range must span at least 90 days.                                                                                                       |

To request a single day of data, omit `granularity` entirely. For a single-day request, the response returns results in `totalMetrics` only, since there’s no `granularMetrics` breakdown to compute.

### Compare Apps and Brands Reporting

Apps and Brands campaigns measure different coverage: app installs and engagement versus brand visibility and map interactions. Their reporting reflects this distinction. The two promoted object types use separate request and response objects and differ in the following ways:

|Feature                               |Apps (`apps`)                                                                                                                                 |Brands (`business-brands`)                                                                                                                                   |
|--------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
|Request object                        |<doc://com.apple.apple-ads-platform-api/documentation/Apple-Ads-Platform-API/AppsReportingRequest>                                            |<doc://com.apple.apple-ads-platform-api/documentation/Apple-Ads-Platform-API/BrandsReportingRequest>                                                         |
|Campaign/ad-group `groupBy` dimensions|`deviceClass`, `ageRange`, `gender`, `countryCode`, `adminArea`, `locality`, `countryOrRegion`                                                |`deviceClass`, `locationId`, `supplyPlacement`                                                                                                               |
|Keyword `groupBy` dimensions          |`deviceClass`, `countryOrRegion`                                                                                                              |`deviceClass`                                                                                                                                                |
|Search term `groupBy` dimensions      |`deviceClass`, `countryOrRegion`                                                                                                              |`deviceClass`                                                                                                                                                |
|Ad `groupBy` dimensions               |`countryOrRegion`                                                                                                                             |`deviceClass`, `locationId`, `supplyPlacement`                                                                                                               |
|`EMPTY_METRICS` option                |Supported                                                                                                                                     |Not supported                                                                                                                                                |
|Creative metadata                     |<doc://com.apple.apple-ads-platform-api/documentation/Apple-Ads-Platform-API/AppsReportingCreative>: includes `creativeSpec` and `destination`|<doc://com.apple.apple-ads-platform-api/documentation/Apple-Ads-Platform-API/BrandsReportingCreative>: includes `id`, `creativeType`, and `systemStatus` only|
|Location-level report                 |Not available                                                                                                                                 |Not available                                                                                                                                                |
|Search term timezone                  |`ORTZ` only                                                                                                                                   |`ORTZ` only                                                                                                                                                  |

### Include Additional Rows

The `options.includeRows` field controls which additional rows appear in the response:

- The `GRAND_TOTAL` value adds a summary row with aggregate totals across all result rows. Both Apps and Brands support it.
- The `EMPTY_METRICS` value includes rows for entities that have no metric activity during the requested period. Only Apps supports it, and you can’t combine it with `groupBy`.

## See Also

[Insights Endpoints](/documentation/Apple-Ads-Platform-API/insights-endpoints)

Query impression share and search term popularity data for your apps.

[Recommendations Endpoints](/documentation/Apple-Ads-Platform-API/recommendations-endpoints)

Query budget and Target CPA recommendations, then apply or dismiss them to adjust campaign spend and bids.

[Suggestions Endpoints](/documentation/Apple-Ads-Platform-API/suggestions-endpoints)

Discover keyword, phrase, category, and Target CPA suggestions to expand keywords and size bids.

[Change History Endpoints](/documentation/Apple-Ads-Platform-API/change-history-endpoints)

Query audit summaries and retrieve change detail records for entities in an ad account.



---

Copyright &copy; 2026 Apple Inc. All rights reserved. | [Terms of Use](https://www.apple.com/legal/internet-services/terms/site.html) | [Privacy Policy](https://www.apple.com/privacy/privacy-policy)