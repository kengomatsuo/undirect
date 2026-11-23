<!--
{
  "availability" : [
    "Apple Ads Platform API: 1.0.0 -"
  ],
  "documentType" : "symbol",
  "framework" : "Apple-Ads-Platform-API",
  "identifier" : "/documentation/Apple-Ads-Platform-API",
  "metadataVersion" : "0.1.0",
  "role" : "Web Service",
  "symbol" : {
    "kind" : "Web Service",
    "modules" : [
      "Apple Ads Platform API"
    ],
    "preciseIdentifier" : "Apple-Ads-Platform-API"
  },
  "title" : "Apple Ads Platform API"
}
-->

# Apple Ads Platform API

Programmatically manage App Store and Apple Maps advertising campaigns through a single RESTful API.

## Overview

Apple Ads helps people discover and engage with your app or business. With the Apple Ads Platform API, you can build campaigns with budgets, and create ad groups that include keywords, audience refinement criteria, and scheduling. Through a single RESTful interface, you can also create and manage ads and creative assets, configure targeting and bidding, and monitor performance through reports, insights, and recommendations.

New to the API? Start with the workflow guides. [Advertising Your App on the App Store](/documentation/Apple-Ads-Platform-API/journey-app-store-ads) and [Advertising Your Business on Apple Maps](/documentation/Apple-Ads-Platform-API/journey-apple-maps-brand-ads) walk you through launching your first campaign on each placement.

## Topics

### Essentials

[Implementing OAuth for the Apple Ads Platform API](/documentation/Apple-Ads-Platform-API/implementing-oauth-for-the-apple-ads-platform-api)

Generate a key pair and request an access token to authenticate with the Apple Ads Platform API.

[Calling the Apple Ads Platform API](/documentation/Apple-Ads-Platform-API/calling-apple-ads-platform-api)

Authenticate requests, structure endpoint calls, and interpret responses when using the Apple Ads Platform API.

[Using Client Libraries](/documentation/Apple-Ads-Platform-API/client-libraries)

Integrate the Apple Ads Platform API using an Apple-maintained client library instead of a custom HTTP client.

[Applying Rate Limits](/documentation/Apple-Ads-Platform-API/rate-limits)

Track your remaining quota and pace requests.

[Advertising Your App on the App Store](/documentation/Apple-Ads-Platform-API/journey-app-store-ads)

Set up and launch an App Store campaign, from account verification through keyword targeting to performance reporting.

[Advertising Your Business on Apple Maps](/documentation/Apple-Ads-Platform-API/journey-apple-maps-brand-ads)

Identify your brand, upload creative assets, build location groups, and create campaigns, ad groups, creatives, and ads to promote it on Apple Maps.

### Account Management

[Managing Ad Accounts and API Access](/documentation/Apple-Ads-Platform-API/access-overview)

Authenticate your requests, scope them to an ad account, and apply role-based access levels.

[Org & Me Endpoints](/documentation/Apple-Ads-Platform-API/org-me)

Retrieve the authenticated user’s identity, organization details, and ad account access list.

[Ad Account Endpoints](/documentation/Apple-Ads-Platform-API/ad-account-endpoints)

Create, retrieve, and update ad accounts, and discover delegable advertiser resources.

[Account Management Data Objects](/documentation/Apple-Ads-Platform-API/account-management-data-objects)

Reference the data objects for account management, access control, and organization resources.

[Account Management Data Types](/documentation/Apple-Ads-Platform-API/account-management-data-types)

Reference the enumerations and scalar types for account management, access control, and organization resources.

### Search Apps

[Search Apps Endpoints](/documentation/Apple-Ads-Platform-API/search-apps-endpoints)

Browse the endpoints for searching apps and retrieving app details.

[Search Apps Data Objects](/documentation/Apple-Ads-Platform-API/search-apps-data-objects)

Browse the response objects returned by the search apps and app details endpoints.

### App Eligibility

[App Eligibility Endpoints](/documentation/Apple-Ads-Platform-API/app-eligibility-endpoints)

Check whether apps qualify to run ads and look up rejection reasons for creatives.

[App Eligibility Data Objects](/documentation/Apple-Ads-Platform-API/app-eligibility-data-objects)

Reference the request and response objects used by the app eligibility and rejection reason endpoints.

### Ads on Apple Maps

[Ads on Apple Maps Endpoints](/documentation/Apple-Ads-Platform-API/brands-endpoints)

Query and retrieve brands, business categories, and creative rejection reasons.

[Managing Location Groups](/documentation/Apple-Ads-Platform-API/location-groups-overview)

Organize business locations into named groups that define which locations an ad group’s targeting applies to in Apple Maps campaigns.

[Understanding Locations](/documentation/Apple-Ads-Platform-API/locations-overview)

Query and inspect the business locations associated with your brand for use in Apple Maps campaigns.

[Brands Data Objects](/documentation/Apple-Ads-Platform-API/brands-data-objects)

Reference the request and response objects for brand, location, and location group endpoints.

[Brands Data Types](/documentation/Apple-Ads-Platform-API/brands-data-types)

Look up the enumerations and metric types used in Apple Maps campaigns.

### Campaigns

[Campaigns Endpoints](/documentation/Apple-Ads-Platform-API/campaigns-endpoints)

Create, retrieve, update, and delete campaigns using these endpoints.

[Campaigns Data Objects](/documentation/Apple-Ads-Platform-API/campaigns-data-objects)

Reference the request and response schemas for creating, retrieving, and updating campaigns.

[Campaigns Data Types](/documentation/Apple-Ads-Platform-API/campaign-data-types)

Look up the enumerated values and scalar types used across campaign fields.

### Ad Groups

[Ad Groups Endpoints](/documentation/Apple-Ads-Platform-API/adgroups-endpoints)

Create, retrieve, update, and delete ad groups.

[Ad Groups Data Objects](/documentation/Apple-Ads-Platform-API/adgroups-data-objects)

Reference the request and response objects for ad group endpoints.

[Ad Groups Data Types](/documentation/Apple-Ads-Platform-API/adgroups-data-types)

Reference the enumerations and scalar types for ad groups.

### Geo Targeting

[Geo Targeting Endpoints](/documentation/Apple-Ads-Platform-API/geo-targeting-endpoints)

Retrieve geographic location metadata used for geo targeting.

[Geo Targeting Data Objects](/documentation/Apple-Ads-Platform-API/geo-targeting-data-objects)

Reference the request and response objects for geo targeting.

[Geo Targeting Data Types](/documentation/Apple-Ads-Platform-API/geo-targeting-data-types)

Reference the enumerations and scalar types for geo targeting.

### Keywords

[Managing Keywords and Negative Keywords](/documentation/Apple-Ads-Platform-API/keywords-and-negative-keywords)

Create and manage keywords and negative keywords for ad groups and campaigns.

[Keywords Endpoints](/documentation/Apple-Ads-Platform-API/keywords-endpoints)

Create, retrieve, update, query, and delete the keywords that match your ad group’s ads to searches.

[Negative Keywords Endpoints](/documentation/Apple-Ads-Platform-API/negative-keywords-endpoints)

Create, retrieve, update, query, and delete negative keywords that block ads for unwanted searches.

[Keywords Data Objects](/documentation/Apple-Ads-Platform-API/keywords-data-objects)

Build keyword create and update requests, and read keyword responses and query results.

[Negative Keywords Data Objects](/documentation/Apple-Ads-Platform-API/negative-keywords-objects)

Build negative keyword create and update requests, and read responses and query results.

[Keywords Shared Data Types](/documentation/Apple-Ads-Platform-API/keywords-shared-data-types)

Set the status and match type of keywords and negative keywords, and interpret a keyword’s display status.

### Ads

[Ads Endpoints](/documentation/Apple-Ads-Platform-API/ads-endpoints)

Create, retrieve, update, and delete ads using these endpoints.

[Ads Data Objects](/documentation/Apple-Ads-Platform-API/ads-data-objects)

Reference the request and response objects used by ad endpoints.

[Ads Data Types](/documentation/Apple-Ads-Platform-API/ads-data-types)

Reference the enumerations and scalar types used by ad objects and endpoints.

### Creatives

[Creatives Endpoints](/documentation/Apple-Ads-Platform-API/creatives-endpoints)

Create, retrieve, update, and delete ad creatives through these endpoints.

[Ad Creatives Data Objects](/documentation/Apple-Ads-Platform-API/creatives-data-objects)

Reference the request and response payloads used by ad creative endpoints.

[Ad Creative Data Types](/documentation/Apple-Ads-Platform-API/creative-data-types)

Look up the allowed values for creative type, status, and destination type fields.

### Assets

[Assets Endpoints](/documentation/Apple-Ads-Platform-API/assets-endpoints)

Upload, query, retrieve, and delete Apple Maps creative assets.

[Assets Data Objects](/documentation/Apple-Ads-Platform-API/assets-data-objects)

Reference the request and response objects for asset endpoints.

[Assets Data Types](/documentation/Apple-Ads-Platform-API/assets-data-types)

Look up the enumerations and scalar types used for assets.

### Product Pages

[Product Pages Endpoints](/documentation/Apple-Ads-Platform-API/product-pages-endpoints)

Retrieve product pages and their localized details.

[Product Pages Data Objects](/documentation/Apple-Ads-Platform-API/product-pages-data-objects)

Reference the response objects returned by product page endpoints.

### Bulk Operations

[Bulk Operations Endpoints](/documentation/Apple-Ads-Platform-API/bulk-operations-endpoints)

Create, update, and delete keywords and negative keywords in bulk through these endpoints.

[Bulk Data Objects](/documentation/Apple-Ads-Platform-API/bulk-data-objects)

Build bulk keyword and negative keyword requests, and read per-item results.

### Budget Orders

[Budget Orders Endpoints](/documentation/Apple-Ads-Platform-API/budget-orders-endpoints)

Create, retrieve, update, and delete budget orders through these endpoints.

[Budget Order Data Objects](/documentation/Apple-Ads-Platform-API/budget-orders-data-objects)

Build budget order and campaign assignment requests, and read budget order and invoice detail responses.

[Budget Order Data Types](/documentation/Apple-Ads-Platform-API/budget-orders-data-types)

Track budget order status, status reasons, and payment model with these enumerated types.

### Reports

[Managing Reports](/documentation/Apple-Ads-Platform-API/reports)

Retrieve performance data for campaigns, ad groups, ads, keywords, and search terms.

[App Store Reports Endpoints](/documentation/Apple-Ads-Platform-API/apps-reports-endpoints)

Retrieve App Store performance metrics for campaigns, ad groups, ads, keywords, and search terms.

[Brands Reports Endpoints](/documentation/Apple-Ads-Platform-API/brands-reports-endpoints)

Retrieve performance data for Apple Maps campaigns, ad groups, ads, keywords, and search terms.

[Apps Data Objects](/documentation/Apple-Ads-Platform-API/apps-reports-objects)

Request, response, and metadata objects for Apps report endpoints.

[Brands Data Objects](/documentation/Apple-Ads-Platform-API/brands-reports-objects)

Explore the request, response, and metadata objects that Brands report endpoints use.

[Shared Objects](/documentation/Apple-Ads-Platform-API/reports-shared-objects)

Define time ranges, filters, sorting, and pagination for report requests, and read the shared metrics in responses.

### Insights

[Insights Endpoints](/documentation/Apple-Ads-Platform-API/insights-endpoints)

Query impression share and search term popularity data for your apps.

[Insights Data Objects](/documentation/Apple-Ads-Platform-API/insights-data-objects)

Build the request and response objects for impression share and search term popularity queries.

### Recommendations

[Recommendations Endpoints](/documentation/Apple-Ads-Platform-API/recommendations-endpoints)

Query budget and Target CPA recommendations, then apply or dismiss them to adjust campaign spend and bids.

[Recommendations Data Objects](/documentation/Apple-Ads-Platform-API/recommendations-data-objects)

Read budget and Target CPA recommendations and their history, and build the requests that apply them.

[Recommendations Query and Filter Objects](/documentation/Apple-Ads-Platform-API/recommendations-query-filter-objects)

Filter, sort, and paginate recommendation queries by status, state, and category.

### Suggestions

[Suggestions Endpoints](/documentation/Apple-Ads-Platform-API/suggestions-endpoints)

Discover keyword, phrase, category, and Target CPA suggestions to expand keywords and size bids.

[Suggestions Data Objects](/documentation/Apple-Ads-Platform-API/suggestions-data-objects)

Read the keyword, phrase, category, and Target CPA suggestions that the suggestions endpoints return.

### Change History

[Change History Endpoints](/documentation/Apple-Ads-Platform-API/change-history-endpoints)

Query audit summaries and retrieve change detail records for entities in an ad account.

[Change History Response Objects](/documentation/Apple-Ads-Platform-API/change-history-response-objects)

Parse the audit summary and change detail objects returned by change history endpoints.

[Change History Query Objects](/documentation/Apple-Ads-Platform-API/change-history-query-objects)

Build the filter, sort, and pagination inputs for change history query requests.

[Change History Enumerations](/documentation/Apple-Ads-Platform-API/change-history-enumerations)

Look up the enumerated values accepted in change history query and response fields.

### Changelog

[Apple Ads Platform API Changelog](/documentation/Apple-Ads-Platform-API/changelog-apple-ads-platform-api)

A log of changes to the Apple Ads Platform API.



---

Copyright &copy; 2026 Apple Inc. All rights reserved. | [Terms of Use](https://www.apple.com/legal/internet-services/terms/site.html) | [Privacy Policy](https://www.apple.com/privacy/privacy-policy)