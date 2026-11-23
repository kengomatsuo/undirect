<!--
{
  "documentType" : "article",
  "framework" : "apple_ads",
  "identifier" : "/documentation/Apple_Ads/apple-search-ads-campaign-management-api-5",
  "metadataVersion" : "0.1.0",
  "role" : "article",
  "title" : "Apple Ads Campaign Management API 5"
}
-->

# Apple Ads Campaign Management API 5

Learn about changes to Apple Ads Campaign Management API 5.

## Discussion> Deprecated: The Apple Ads Campaign Management API is deprecated and will be sunset on January 26, 2027. Use the [Apple Ads Platform API](https://developer.apple.com/documentation/apple-ads-platform-api) instead.

### 5.6

Released in June, 2026

Lifetime budgets have been deprecated and the `budgetAmount` field has been removed from the API and documentation. When calling the API, use `dailyBudgetAmount`.

### 5.5

Released in February, 2026

Introduces Maximize Conversions, a new automated bid strategy that optimizes for the highest conversion volume at your target cost-per-acquisition (CPA). The Maximize Conversions bid strategy in a campaign uses an automated ad group with Search Match to automatically discover and bid on relevant keywords.

- To create a Maximize Conversions bid strategy campaign, see the payload example in [`Create a Campaign`](/documentation/apple_ads/Create-a-Campaign).
- For details on automated ad groups, see [Ad Groups](/documentation/Apple_Ads/ad-groups). To create an automated ad group, see the payload example in [`Create an Ad Group`](/documentation/apple_ads/Create-an-Ad-Group).
- To switch between manual (default) and Maximize Conversions bid strategies, see the payload examples in  [`Update a Campaign`](/documentation/apple_ads/Update-a-Campaign).
- For reports with a Maximize Conversions bidding strategy, see [`Get Campaign-Level Reports`](/documentation/apple_ads/Get-Campaign-Level-Reports) and [`Get Ad Group-Level Reports`](/documentation/apple_ads/Get-Ad-Group-Level-Reports).

### 5.4

Released in December, 2025

- New reporting metrics have been added to support App Store preorders: `tapPreOrdersPlaced`, `viewPreOrdersPlaced` and `totalPreOrdersPlaced`. See [`SpendRow`](/documentation/apple_ads/SpendRow) and [`ExtendedSpendRow`](/documentation/apple_ads/ExtendedSpendRow) for descriptions.

### 5.3

Released in August, 2025.

- The [`Create a Budget Order`](/documentation/apple_ads/Create-a-Budget-Order) endpoint no longer supports a single placement type. All responses to API requests you make to create new budget orders contain all possible values for [`SupplySource`](/documentation/apple_ads/SupplySource).

### 5.2.1

Released in May, 2025.

- The [`Create a Campaign`](/documentation/apple_ads/Create-a-Campaign) endpoint supports an optional `budgetAmount` to manage the total budget of a campaign. You can only add a `budgetAmount` at the time of campaign creation. You can’t update a campaign to use `budgetAmount`. For more information, see [`Campaign`](/documentation/apple_ads/Campaign).

### 5.2

Released in March, 2025.

- Added endpoints to retrieve app details and localized app details. See [`Get App Details`](/documentation/apple_ads/Get-App-Details) and [`Get Localized App Details`](/documentation/apple_ads/Get-Localized-App-Details).
- `APPSTORE_SEARCH_TAB` campaigns require that you [`Create a Creative`](/documentation/apple_ads/Create-a-Creative) using either a default product page or a custom product page as the tap destination. As of API version 5.2, you need to create a default product page ad to use with `APPSTORE_SEARCH_TAB` campaigns. At the release of API version 5.2 Apple automatically creates a default product page ad for all existing, running `APPSTORE_SEARCH_TAB` campaigns. See also [`CreativeType`](/documentation/apple_ads/CreativeType).
- The [`Find App Assets`](/documentation/apple_ads/Find-App-Assets) endpoint now supports default product page ads. The [`Find Ad Creative Rejection Reasons`](/documentation/apple_ads/Find-Ad-Creative-Rejection-Reasons) endpoint now supports rejection reasons related to default product pages and product page optimization.
- Added support to use custom product pages as an ad’s tap destination. `APPSTORE_SEARCH_TAB` ad-level metrics are reported through [`Get Ad-Level Reports`](/documentation/apple_ads/Get-Ad-Level-Reports). Historical ad-level metrics (before API version 5.2 release) are reported against `adId=-1`. For ad-level metrics after API version 5.2 release, all default product page ads are reported against a new, real `adID` in reporting payloads.
- `APPSTORE_SEARCH_TAB` campaigns can optionally include a deep link. See [`ProductPageDetail`](/documentation/apple_ads/ProductPageDetail).

### 5.1

Released in October, 2024.

- A read-only `deepLink` field has been added to the [`ProductPageDetail`](/documentation/apple_ads/ProductPageDetail) response. Advertisers can add deep links to custom product pages through [App Store Connect](https://appstoreconnect.apple.com). Retrieve your product page metadata with [`Get Product Pages`](/documentation/apple_ads/Get-Product-Pages) and [`Get Product Pages by Identifier`](/documentation/apple_ads/Get-Product-Pages-by-Identifier) endpoints. Deep links are available on iOS 18 and later for Today tab and search results ads, and iPadOS 18 and later for search results ads.
- A correction has been made to the [`Find Ad Groups`](/documentation/apple_ads/Find-Ad-Groups) endpoint. The selector [`Condition`](/documentation/apple_ads/Condition) operator accepts only EQUALS in requests.

### 5.0

Released in May, 2024.

- View-through reporting metrics provide details on Apple Search Ads campaign performance. Installs, new downloads, and redownloads are available as a standalone total, tap-through, and view-through. All reports reflect the new metrics. See [SpendRow](https://developer.apple.com/documentation/apple_ads/spendrow) and [ExtendedSpendRow](https://developer.apple.com/documentation/apple_ads/extendedspendrow).
- Get Keyword-Level Reports and Get Keyword-Level within Ad Group Reports reflect a new suggestedBidAmount field, replacing deprecated `bidMin` and `bidMax` fields. See [KeywordBidRecommendation](https://developer.apple.com/documentation/apple_ads/keywordbidrecommendation).
- Get [Search Term-Level Reports](https://developer.apple.com/documentation/apple_ads/gets-reports-on-search-terms-within-a-campaign.-the-information-per-campaign-is-composed-of-the-metrics,-dimensions-requested-in-the-request-parameter) and [Get Search Term-Level within Ad Group Reports](https://developer.apple.com/documentation/apple_ads/gets-reports-on-targeting-searchterm-within-a-adgroup.-the-information-per-adgroup-is-composed-of-the-metrics,-dimensions-requested-in-the-request-parameter) require the timezone to be ORTZ.

Other new features include:

- Prior to API 5, new campaigns required a `dailyBudgetAmount` or a `budgetAmount`, or both. A `dailyBudgetAmount` is now a required field for all new campaigns. See [Create a campaign](https://developer.apple.com/documentation/apple_ads/creates-a-campaign).
- Multiple default languages are supported for [countries or regions](https://developer.apple.com/documentation/apple_ads/countryorregion).

Deprecations:

All [Creative Sets](/documentation/Apple_Ads/creative-sets) endpoints are deprecated and unavailable in API 5.

---

Copyright &copy; 2026 Apple Inc. All rights reserved. | [Terms of Use](https://www.apple.com/legal/internet-services/terms/site.html) | [Privacy Policy](https://www.apple.com/privacy/privacy-policy)