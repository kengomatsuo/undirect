# Managed Payments eligibility

Learn about the business locations, customer countries, and product types that Managed Payments supports.

Managed Payments has additional compliance requirements and restrictions beyond those for [Stripe Payments](https://docs.stripe.com/payments.md). To use Managed Payments, your account, products, customers, and transactions must meet the eligibility requirements described below.

## Account eligibility for Managed Payments 

To use Managed Payments, your account must meet the following requirements:

- **Business eligibility**: Stripe determines access to Managed Payments based on an eligibility review that considers factors such as business type and geography.
- **Business type**: Managed Payments supports direct integrations only. It doesn’t support the following account configurations:
  - Connect platforms
  - Express accounts
  - Accounts controlled by a platform
- **Geographic eligibility**: Your business must be based in one of the supported business locations.

### Supported business locations 

### North America

- CA
- US

### Europe

- AT
- BE
- BG
- CH
- CY
- CZ
- DE
- DK
- EE
- ES
- FI
- FR
- GB
- GR
- HR
- HU
- IE
- IT
- LI
- LT
- LU
- LV
- MT
- NL
- NO
- PL
- PT
- RO
- SE
- SI
- SK

### Asia Pacific

- AU
- HK
- JP
- SG

## Product eligibility for Managed Payments 

To use Managed Payments on a Checkout Session or Payment Link, the products sold must be eligible for Managed Payments.

### Supported product categories 

Managed Payments supports the sale of digital products. Supported categories are determined by the eligible tax codes listed below and include:

- Software
- Video games
- Digital media, such as audiobooks, e-books, digital magazines and newspapers, audio and video content, and digital images or artwork
- Online courses and training
- Electronically supplied business and web services, such as website hosting

### Unsupported product categories 

Managed Payments doesn’t support non-digital product categories, including:

- Physical goods
- Professional services, such as consulting, marketing, design, development, or tech support
- Live in-person events

### Additional digital sales requirements 

All eligible products must also meet the following requirements:

- You sell the product directly to customers, not through a platform or marketplace.
- You hold all necessary rights and licenses to distribute the product.
- You sell a fully automated digital product. If your service involves human intervention (such as live 1-1 coaching), it doesn’t qualify as a digital product that Managed Payments supports. If Stripe determines that your product is ineligible for Managed Payments, we’ll notify you that you’re responsible for any indirect tax liability for the product and you must discontinue the use of Managed Payments for that product.

### Product tax code requirements 

You must assign an eligible tax code from the supported digital goods categories below for each product sold with Managed Payments. Set the tax code on the product in the Dashboard or using the API.

#### Eligible tax codes 

| Tax code | Category name | Use this tax code for |
| --- | --- | --- |
| `txcd_10000000` | General - Electronically Supplied Services | A digital service provided mainly through the internet with minimal human involvement, relying on information technology. Consider more specific categories like software, digital goods, cloud services, or website services for your product (especially if you sell in the US). If you stay with this category, taxes will be similar to those for a generic digital item like downloaded music. |
| `txcd_10010001` | Infrastructure as a service (IaaS) - personal use | Cloud service offering infrastructure resources (specifically server storage, RAM, and CPU usage) over the internet. This offering is intended for personal use, rather than for use by a commercial enterprise. Note: The distinction between business use and personal use for this product tax category is relevant only if you have sales in the US. |
| `txcd_10101000` | Infrastructure as a service (IaaS) - business use | Cloud service offering infrastructure resources (specifically server storage, RAM, and CPU usage) over the internet. This offering is intended for use by a commercial enterprise. Note: The distinction between business use and personal use for this product tax category is relevant only if you have sales in the US. |
| `txcd_10102000` | Platform as a service (PaaS) - business use | Cloud service providing a platform for users to develop, run, and manage applications. This offering is intended for use by a commercial enterprise. Note: The distinction between business use and personal use for this product tax category is relevant only if you have sales in the US. |
| `txcd_10102001` | Platform as a Service (PaaS) - personal use | Cloud service providing a platform for users to develop, run, and manage applications. This offering is intended for personal use, rather than for use by a commercial enterprise. Note: The distinction between business use and personal use for this product tax category is relevant only if you have sales in the US. |
| `txcd_10103000` | Software as a service (SaaS) - personal use | Cloud services software delivered over the internet. The software isn't customized for a specific buyer and they don't download anything. The software is intended for personal use, rather than for use by a commercial enterprise. Note: The distinction between business use and personal use for this product tax category is relevant only if you have sales in the US. |
| `txcd_10103001` | Software as a service (SaaS) - business use | Cloud services software delivered over the internet. The software isn't customized for a specific buyer and they don't download anything. The software is intended for use by a commercial enterprise. Note: The distinction between business use and personal use for this product tax category is relevant only if you have sales in the US. |
| `txcd_10103100` | Software as a service (SaaS) - electronic download - personal use | Cloud services software delivered over the internet. The software isn't customized for a specific buyer and this model assumes an electronic transfer to the buyer, such as an app download. The software is intended for personal use, rather than for use by a commercial enterprise. Note: The distinction between business use and personal use for this product tax category is relevant only if you have sales in the US. |
| `txcd_10103101` | Software as a service (SaaS) - electronic download - business use | Cloud services software delivered over the internet. The software isn't customized for a specific buyer and this model assumes an electronic transfer to the buyer, such as an app download. The software is intended for use by a commercial enterprise. Note: The distinction between business use and personal use for this product tax category is relevant only if you have sales in the US. |
| `txcd_10105001` | Artificial Intelligence as a Service (AIaaS) - Cloud Based - Personal Use | Access to artificial intelligence tools (such as LLMs, image generators, or chatbots) hosted entirely on the provider's servers and accessed via a web browser or mobile app. The intent is for personal use, rather than for use by a commercial enterprise. Note: The distinction between business use and personal use for this product tax category is relevant only if you have sales in the US. |
| `txcd_10105002` | Artificial Intelligence as a Service (AIaaS) - Cloud Based - Business Use | Access to cloud-hosted artificial intelligence platforms for commercial, professional, or organizational purposes. The intent is for use by a commercial enterprise.  Note: The distinction between business use and personal use for this product tax category is relevant only if you have sales in the US. |
| `txcd_10105003` | Artificial Intelligence as a Service (AIaaS) - Cloud Based & Downloaded - Personal Use | A hybrid AI service where a portion of the software (such as a local client, desktop application, or model weight files) is downloaded and installed on a personal device to work in conjunction with cloud services. The intent is for personal use, rather than for use by a commercial enterprise. Note: The distinction between business use and personal use for this product tax category is relevant only if you have sales in the US. |
| `txcd_10105004` | Artificial Intelligence as a Service (AIaaS) - Cloud Based & Downloaded - Business Use | A hybrid AI service that requires the installation of local components (e.g., an AI-powered IDE plugin, local inference engines, or enterprise desktop software) to work in conjunction with cloud services. The intent is for use by a commercial enterprise. Note: The distinction between business use and personal use for this product tax category is relevant only if you have sales in the US. |
| `txcd_10201000` | Video Games - downloaded - non subscription - with permanent rights | Video or electronic games in the common sense that are transferred electronically. These goods are downloaded to a device with permanent access granted. This does not include games that are considered betting, gambling, lottery, and so on. |
| `txcd_10201001` | Video Games - downloaded - non subscription - with limited rights | Video or electronic games in the common sense that are transferred electronically. These goods are downloaded to a device with access that expires after a stated period of time. This does not include games that are considered betting, gambling, lottery, and so on. |
| `txcd_10201002` | Video Games - downloaded - subscription - with conditional rights | Video or electronic games in the common sense that are transferred electronically. These goods are downloaded to a device with access that is conditioned upon continued subscription payment. This does not include games that are considered betting, gambling, lottery, and so on. |
| `txcd_10201003` | Video Games - streamed - non subscription - with limited rights | Video or electronic games in the common sense that are transferred electronically. These goods are streamed to a device with access that expires after a stated period of time. This does not include games that are considered betting, gambling, lottery, and so on. |
| `txcd_10201004` | Video Games - streamed - subscription - with conditional rights | Video or electronic games in the common sense that are transferred electronically. These goods are streamed to a device with access that is conditioned upon continued subscription payment. This does not include games that are considered betting, gambling, lottery, and so on. |
| `txcd_10202000` | Downloadable Software - personal use | Prewritten ("canned") software that the buyer downloads. The software is intended for personal use, rather than for use by a commercial enterprise. Note: The distinction between business use and personal use for this product tax category is relevant only if you have sales in the US. |
| `txcd_10202001` | Downloadable Software - non-recreational - personal use | Prewritten ("canned") software that the buyer downloads used for non-recreational purposes, such as antivirus, database, educational, financial, word processing, and so on. The software is intended for personal use, rather than for consumption in a commercial enterprise. Note: The distinction between business use and personal use for this tax code is relevant only if you are transacting business in the US. |
| `txcd_10202003` | Downloadable Software - business use | Prewritten ("canned") software that the buyer downloads. The software is intended for use by a commercial enterprise. Note: The distinction between business use and personal use for this product tax category is relevant only if you have sales in the US. |
| `txcd_10301000` | Audiobook | The recording of a book read aloud and sold with unlimited usage (for example, a downloaded audio copy of The High Growth Handbook). |
| `txcd_10302000` | Digital Books - downloaded - non subscription - with permanent rights | Works that are generally recognized in the ordinary and usual sense as books and are transferred electronically. These goods are downloaded to a device with permanent access granted. These goods include novels, autobiographies, encyclopedias, dictionaries, repair manuals, phone directories, business directories, zip code directories, cookbooks, and so on. |
| `txcd_10302001` | Digital Books - downloaded - non subscription - with limited rights | Works that are generally recognized in the ordinary and usual sense as books and are transferred electronically. These goods are downloaded to a device with access that expires after a stated period of time. These goods include novels, autobiographies, encyclopedias, dictionaries, repair manuals, phone directories, business directories, zip code directories, cookbooks, and so on. |
| `txcd_10302002` | Digital Books - downloaded - subscription - with conditional rights | Works that are generally recognized in the ordinary and usual sense as books and are transferred electronically. These goods are downloaded to a device with access that is conditioned upon continued subscription payment. These goods include novels, autobiographies, encyclopedias, dictionaries, repair manuals, phone directories, business directories, zip code directories, cookbooks, and so on. |
| `txcd_10302003` | Digital Books - viewable only - subscription - with conditional rights | Works that are generally recognized in the ordinary and usual sense as books and are transferred electronically. These goods are viewable (but not downloadable) on a device with access that is conditioned upon continued subscription payment. These goods include novels, autobiographies, encyclopedias, dictionaries, repair manuals, phone directories, business directories, zip code directories, cookbooks, and so on. |
| `txcd_10303000` | Digital Magazines/Periodicals - downloadable - subscription - with conditional rights | A digital version of a traditional periodical published at regular intervals with the entire publication or individual articles downloaded to a device with access that is conditioned upon continued subscription payment. |
| `txcd_10303002` | Digital Magazines/Periodicals - viewable only - subscription - with conditional rights | A digital version of a traditional periodical published at regular intervals with the entire publication or individual articles viewable (but not downloadable) on a device with access that is conditioned upon continued subscription payment. |
| `txcd_10303100` | Digital Magazines/Periodicals - downloadable - non subscription - with permanent rights | A digital version of a traditional periodical published at regular intervals with the entire publication or individual articles downloaded to a device with permanent access granted. The publication is accessed without a subscription. |
| `txcd_10303101` | Digital Magazines/Periodicals - viewable only - non subscription - with limited rights | A digital version of a traditional periodical published at regular intervals with the entire publication or individual articles viewable (but not downloadable) on a device with access that expires after a stated period of time. The publication is accessed without a subscription. |
| `txcd_10303102` | Digital Magazines/Periodicals - viewable only - non subscription - with permanent rights | A digital version of a traditional periodical published at regular intervals with the entire publication or individual articles viewable (but not downloadable) on a device with permanent access granted. The publication is accessed without a subscription. |
| `txcd_10303104` | Digital Magazines/Periodicals - downloadable - non subscription - with limited rights | A digital version of a traditional periodical published at regular intervals with the entire publication or individual articles downloaded to a device with access that expires after a stated period of time. The publication is accessed without a subscription. |
| `txcd_10304000` | Digital Newspapers - downloadable - non subscription - with permanent rights | A digital version of a traditional newspaper published at regular intervals with the entire publication or individual articles downloaded to a device with permanent access granted. The publication is accessed without a subscription. |
| `txcd_10304001` | Digital Newspapers - viewable only - non subscription - with limited rights | A digital version of a traditional newspaper published at regular intervals with the entire publication or individual articles viewable (but not downloadable) on a device with access that expires after a stated period of time. The publication is accessed without a subscription. |
| `txcd_10304002` | Digital Newspapers - viewable only - non subscription - with permanent rights | A digital version of a traditional newspaper published at regular intervals with the entire publication or individual articles viewable (but not downloadable) on a device with permanent access granted. The publication is accessed without a subscription. |
| `txcd_10304003` | Digital Newspapers - downloadable - non subscription - with limited rights | A digital version of a traditional newspaper published at regular intervals with the entire publication or individual articles downloaded to a device with access that expires after a stated period of time. The publication is accessed without a subscription. |
| `txcd_10304100` | Digital Newspapers - downloadable - subscription - with conditional rights | A digital version of a traditional newspaper published at regular intervals with the entire publication or individual articles downloaded to a device with access that is conditioned upon continued subscription payment. |
| `txcd_10304102` | Digital Newspapers - viewable only - subscription - with conditional rights | A digital version of a traditional newspaper published at regular intervals with the entire publication or individual articles viewable (but not downloadable) on a device with access that is conditioned upon continued subscription payment. |
| `txcd_10305000` | Digital School Textbooks - downloaded - non subscription - with limited rights | Works that are required as part of a formal academic education program and are transferred electronically. These goods are downloaded to a device with access that expires after a stated period of time. |
| `txcd_10305001` | Digital School Textbooks - downloaded - non subscription - with permanent rights | Works that are required as part of a formal academic education program and are transferred electronically. These goods are downloaded to a device with permanent access granted. |
| `txcd_10401000` | Digital Audio Works - streamed - non subscription - with limited rights | Works that result from the fixation of a series of musical, spoken, or other sounds that are transferred electronically. These goods are streamed to a device with access that expires after a stated period of time. These goods include prerecorded or live music, prerecorded or live readings of books or other written materials, prerecorded or live speeches, ringtones, or other sound recordings, but not including audio greeting cards. |
| `txcd_10401001` | Digital Audio Works - downloaded - non subscription - with limited rights | Works that result from the fixation of a series of musical, spoken, or other sounds that are transferred electronically. These goods are downloaded to a device with access that expires after a stated period of time. These goods include prerecorded or live music, prerecorded or live readings of books or other written materials, prerecorded or live speeches, ringtones, or other sound recordings, but not including audio greeting cards. Note the presence of PTC 10301000 (Audiobook), a more granular option for downloaded audiobooks. |
| `txcd_10401100` | Digital Audio Works - downloaded - non subscription - with permanent rights | Works that result from the fixation of a series of musical, spoken, or other sounds that are transferred electronically. These goods are downloaded to a device with permanent access granted. These goods include prerecorded or live music, prerecorded or live readings of books or other written materials, prerecorded or live speeches, ringtones, or other sound recordings, but not including audio greeting cards. Note the presence of PTC 10301000 (Audiobook), a more granular option for downloaded audiobooks. |
| `txcd_10401200` | Digital Audio Works - streamed - subscription - with conditional rights | Works that result from the fixation of a series of musical, spoken, or other sounds that are transferred electronically. These goods are streamed to a device with access that is conditioned upon continued subscription payment. These goods include prerecorded or live music, prerecorded or live readings of books or other written materials, prerecorded or live speeches, ringtones, or other sound recordings, but not including audio greeting cards. |
| `txcd_10402000` | Digital Audio Visual Works - streamed - non subscription - with limited rights | A series of related images which, when shown in succession, impart an impression of motion, together with accompanying sounds, if any. These goods are streamed to a device with access that expires after a stated period of time. These goods include motion pictures, music videos, animations, and news and entertainment programs, but do not include video greeting cards or video or electronic games. |
| `txcd_10402100` | Digital Audio Visual Works - downloaded - non subscription - with permanent rights | A series of related images which, when shown in succession, impart an impression of motion, together with accompanying sounds, if any. These goods are downloaded to a device with permanent access granted. These goods include motion pictures, music videos, animations, news and entertainment programs, and live events, but do not include video greeting cards or video or electronic games. |
| `txcd_10402110` | Digital Audio Visual Works - downloaded - non subscription - with limited rights | A series of related images which, when shown in succession, impart an impression of motion, together with accompanying sounds, if any. These goods are downloaded to a device with access that expires after a stated period of time. These goods include motion pictures, music videos, animations, news and entertainment programs, and live events, but do not include video greeting cards or video or electronic games. |
| `txcd_10402200` | Digital Audio Visual Works - streamed - subscription - with conditional rights | A series of related images which, when shown in succession, impart an impression of motion, together with accompanying sounds, if any. These goods are streamed to a device with access that is conditioned upon continued subscription payment. These goods include motion pictures, music videos, animations, news and entertainment programs, and live events, but do not include video greeting cards or video or electronic games. |
| `txcd_10501000` | Digital Photographs/Images - downloaded - non subscription - with permanent rights | Digital images that are downloaded to a device with permanent access granted. |
| `txcd_10503000` | Digital other news or documents - downloadable - non subscription - with permanent rights | Individual digital news articles, newsletters, and other stand-alone documents. These goods are downloaded to a device with permanent access granted. These publications are accessed without a subscription. |
| `txcd_10503001` | Digital other news or documents - downloadable - non subscription - with limited rights | Individual digital news articles, newsletters, and other stand-alone documents. These goods are downloaded to a device with access that expires after a stated period of time. |
| `txcd_10503002` | Digital other news or documents - downloadable - subscription - with conditional rights | Individual digital news articles, newsletters, and other stand-alone documents. These goods are downloaded to a device with access that is conditioned upon continued subscription payment. |
| `txcd_10503003` | Digital other news or documents - viewable only - non subscription - with limited rights | Individual digital news articles, newsletters, and other stand-alone documents. These goods are viewable (but not downloadable) on a device with access that expires after a stated period of time. |
| `txcd_10503004` | Digital other news or documents - viewable only - non subscription - with permanent rights | Individual digital news articles, newsletters, and other stand-alone documents. These goods are viewable (but not downloadable) on a device with permanent access granted. |
| `txcd_10503005` | Digital other news or documents - viewable only - subscription - with conditional rights | Individual digital news articles, newsletters, and other stand-alone documents. These goods are viewable (but not downloadable) on a device with access that is conditioned upon continued subscription payment. |
| `txcd_10504003` | Electronic software documentation or user manuals - Prewritten, electronic delivery | Electronic software documentation or user manuals - For prewritten software & delivered electronically. |
| `txcd_10505000` | Digital Finished Artwork - downloaded - non subscription - with limited rights | The final art used for actual reproduction by photomechanical or other processes or for display purposes, but does not include website or home page design, and that is transferred electronically. These goods are downloaded to a device with access that expires after a stated period of time. These goods include drawings, paintings, designs, photographs, lettering, paste-ups, mechanicals, assemblies, charts, graphs, illustrative materials, and so on. |
| `txcd_10505001` | Digital Finished Artwork - downloaded - non subscription - with permanent rights | The final art used for actual reproduction by photomechanical or other processes or for display purposes, but does not include website or home page design, and that is transferred electronically. These goods are downloaded to a device with permanent access granted. These goods include drawings, paintings, designs, photographs, lettering, paste-ups, mechanicals, assemblies, charts, graphs, illustrative materials, and so on. |
| `txcd_10505002` | Digital Finished Artwork - downloaded - subscription - with conditional rights | The final art used for actual reproduction by photomechanical or other processes or for display purposes, but does not include website or home page design, and that is transferred electronically. These goods are downloaded to a device with access that is conditioned upon continued subscription payment. These goods include drawings, paintings, designs, photographs, lettering, paste-ups, mechanicals, assemblies, charts, graphs, illustrative materials, and so on. |
| `txcd_10506000` | Digital Greeting Cards - Audio Only | An electronic greeting "card" typically sent via email that contains an audio only message. |
| `txcd_10506001` | Digital Greeting Cards - Audio Visual | An electronic greeting "card" typically sent via email that contains a series of related images which, when shown in succession, impart an impression of motion, together with accompanying sounds, if any. |
| `txcd_10506002` | Digital Greeting Cards - Static text and/or images only | An electronic greeting "card" typically sent via email that contains only static images or text, rather than an audio visual or audio only experience. |
| `txcd_10701100` | Website Hosting | A service to enable a customer's website to be accessible on the internet. |
| `txcd_10701400` | Website Information Services - Business Use | An online service furnishing information to customers, including online search and data comparison. It does not include data brokering. This PTC involves the customer utilizing a SaaS program to access the information content. This offering is intended for use by a commercial enterprise. Note: The distinction between business use and personal use for this product tax category is relevant only if you have sales in the US. |
| `txcd_10701401` | Website Information Services - Personal Use | An online service furnishing information to customers, including online search and data comparison. It does not include data brokering.This PTC involves the customer utilizing a SaaS program to access the information content. This offering is intended for personal use, rather than for use by a commercial enterprise. Note: The distinction between business use and personal use for this product tax category is relevant only if you have sales in the US. |
| `txcd_10701410` | Electronically Delivered Information Services - Business Use | The furnishing of information by electronic means. It does not include data brokering. This PTC does not involve the customer utilizing a SaaS program to access the information content. This offering is intended for use by a commercial enterprise. Note: The distinction between business use and personal use for this PTC is relevant only if you have sales in the US. |
| `txcd_10701411` | Electronically Delivered Information Services - Personal Use | The furnishing of information by electronic means. It does not include data brokering. This PTC does not involve the customer utilizing a SaaS program to access the information content. This offering is intended for personal use, rather than for use by a commercial enterprise. Note: The distinction between business use and personal use for this product tax category is relevant only if you have sales in the US. |
| `txcd_10804001` | Digital Audio Visual Works - bundle - downloaded with permanent rights and streamed - subscription - with conditional rights | A series of related images which, when shown in succession, impart an impression of motion, together with accompanying sounds, if any. These goods are streamed and/or downloaded to a device with access that is conditioned upon continued subscription payment. Any downloads received while under subscription remain the permanent property of the subscriber. These goods include motion pictures, music videos, animations, news and entertainment programs, and live events, but do not include video greeting cards or video or electronic games. These goods further include self-study web based training services that impart content via audio visual goods described here. |
| `txcd_10804002` | Digital Audio Visual Works - bundle - downloaded with limited rights and streamed - non subscription | A series of related images which, when shown in succession, impart an impression of motion, together with accompanying sounds, if any. These goods can be streamed and/or downloaded to a device with access that expires after a stated period of time. These goods include motion pictures, music videos, animations, news and entertainment programs, and live events, but do not include video greeting cards or video or electronic games. |
| `txcd_10804003` | Digital Audio Visual Works - bundle - downloaded with permanent rights and streamed - non subscription | A series of related images which, when shown in succession, impart an impression of motion, together with accompanying sounds, if any. These goods can be streamed and/or downloaded to a device with permanent access granted. These goods include motion pictures, music videos, animations, news and entertainment programs, and live events, but do not include video greeting cards or video or electronic games. |
| `txcd_10804010` | Digital Audio Works - bundle - downloaded with permanent rights and streamed - subscription - with conditional rights | Works that result from the fixation of a series of musical, spoken, or other sounds that are transferred electronically. These goods are streamed and/or downloaded to a device with access that is conditioned upon continued subscription payment. Any downloads received while under subscription remain the permanent property of the subscriber. These goods include prerecorded or live music, prerecorded or live readings of books or other written materials, prerecorded or live speeches, ringtones, or other sound recordings, but not including audio greeting cards. These goods further include self-study web based training services that impart content via audio goods described here. Note the presence of PTC 10301000 (Audiobook), a more granular option for downloaded audiobooks. |
| `txcd_20060058` | Training Services - Self-study Web-based | Self Study web based training, not instructor led. This does not include downloads or streaming of video replays. |
| `txcd_20060158` | On demand Online Courses - pre-recorded audio or audio visual content (streamed) | Instructional courses delivered through pre-recorded audio or video content. Content is accessed through a SaaS (Software as a Service) platform, streamed to internet connected devices, and is not available for download. |
| `txcd_20060258` | On demand Online Courses - pre-recorded audio or audio visual content (streamed and downloadable) | Instructional courses delivered through pre-recorded audio or video content. Content is accessed through a SaaS (Software as a Service) platform, and is available for both streaming and permanent download to internet connected devices. |
| `txcd_20060358` | On demand Online Courses - written material content (viewable or viewable and downloadable) | Instructional courses delivering static content such as text, documents, or images. Content is accessed through a SaaS (Software as a Service) platform, and is available for both temporary viewing and permanent download to internet connected devices. |
| `txcd_37071001` | Software Maintenance Agreement - Optional, Prewritten, Electronic Delivery, Updates Only | A charge, apart from the charge for the software, for an agreement that is not required to be purchased in order to obtain the software. The agreement entitles the software user to obtain periodic canned software updates, upgrades, and error corrections in electronic form. |

## Customer eligibility 

Customers can purchase from more than 195 countries and territories, except for the restricted countries below.

### Restricted countries

- Ascension Island
- China
- Cuba
- Iran
- Kosovo
- North Korea
- Russia
- Syria
- Tristan da Cunha

## Ongoing eligibility and performance requirements 

To continue using Managed Payments, your business must maintain acceptable payment performance.

- **Dispute rate monitoring**: For continued eligibility, Stripe requires a low historical [dispute rate](https://docs.stripe.com/payments/managed-payments/how-it-works.md#handle-disputes) and no prior risk issues.
- **Refund handling**: Stripe can issue refunds within 60 days of purchase in certain cases, including to help reduce chargebacks.
- **Consumer protection compliance**: Stripe applies applicable consumer protection requirements, such as regional cooling off periods where required.

If you don’t think your product is eligible for Managed Payments, you can use [Stripe Tax](https://docs.stripe.com/tax.md) to manage your compliance requirements.

## See also

- [How Managed Payments works](https://docs.stripe.com/payments/managed-payments/how-it-works.md)
- [Set up Managed Payments](https://docs.stripe.com/payments/managed-payments/set-up.md)
