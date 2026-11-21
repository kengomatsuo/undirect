# Pain-film references: where a hijacked tap lands on a phone

Real, published screenshots of the pages an iPhone browser is thrown to when a
page takes a tap, for the Undirect social films. Every still in this folder was
published by someone else (security write-ups, forum posts, videos); none was
taken by visiting a live page. Proportions below are measured on the still
itself, at the phone's own resolution, not guessed.

Scale note for the films: in every real iPhone capture below, Safari's own chrome
stays on screen (status bar, the address bar with the scam's domain, and on
older iOS the bottom toolbar with back, share, bookmarks, tabs). The scam page
lives in the strip between them. On iOS 15+ with the bottom tab bar, the address
bar sits at the bottom. The scam content is page text at normal body size, not a
poster: headlines are one or two lines of ~22pt type.

Buyers' own words for each case are in `docs/research/undirect-voice-of-customer.md`
(55 sourced quotes); the ones that fit a case are repeated under it here with
their URL.

## Cases

### 1. "Hackers are watching you!" Apple-security card with a countdown
- File: `01-hackers-watching-you-apple-security.jpg` (iPhone X class, 1125x2436)
- Source: Malwarebytes Labs, "iPhone calendar spam attacks on the rise", 2021-05,
  https://www.malwarebytes.com/blog/news/2021/05/iphone-calendar-spam-attacks-on-the-rise
- On screen: Safari, address bar `security-protect.systems` (padlock), bottom
  toolbar visible. The page is a white rounded card on a grey page: a black
  header strip with the Apple logo and "Apple security" (~6% of the height), a
  20pt headline "Hackers are watching you!", a paragraph in body type, a blue
  countdown "1 seconds 34 seconds", "Recovery method:" with three steps
  ("You will be redirected to the App Store"), and a blue text link "Protect
  your connection" at the card's foot. The card takes about 70% of the height,
  inset ~12px each side; it reads like an iOS alert sheet, not a poster.
- Origin: malvertising redirect chain from ad-carrying sites; ends in the App Store
  at a VPN/"protection" app.

### 2. "WARNING! Your Apple iPhone is severely damaged by 13 viruses!"
- File: `02-iphone-damaged-13-viruses.jpg`
- Source: same Malwarebytes article.
- On screen: address bar `apstore.enterprises`. A full-width black header bar
  with Apple logo, "Apple Security" and the date right-aligned (~6% height). Then
  a red two-line headline (~22pt), a body paragraph with red inline phrases
  ("infecting sensitive data like your Facebook account, Whatsapp messages"),
  "Step 1: Tap REMOVE VIRUS to install VPN from the App Store", a red countdown
  "1 minutes and 19 seconds", and a plain blue "Remove Virus" text button in a
  grey band near the bottom. Text-heavy, white page; the scary part is the red
  headline, about 8% of the screen.
- Origin: malvertising redirect; ends in an App Store VPN listing.

### 3. Fake reCAPTCHA on a blank white page
- File: `03-fake-recaptcha-blank-page.jpg`
- Source: same Malwarebytes article.
- On screen: address bar `java.limitedtopoffers.com`. Nearly blank white page; in
  the upper middle, one line "Verify you are not a robot to continue to website"
  and a copy of the Google reCAPTCHA box ("I'm not a robot", the logo, "Privacy -
  Terms"), about 85% wide and 10% tall. The rest of the screen is empty white. The
  quiet, boring look is the trick.
- Origin: redirect from an ad on a content site; the checkbox triggers the
  calendar subscription (case 4).

### 4. The real iOS "Add Calendar Subscription" dialog over the captcha page
- File: `04-captcha-calendar-subscription-dialog.png`
- Source: same Malwarebytes article.
- On screen: same domain, page dimmed grey, a true iOS system alert in the middle
  (~72% wide, ~25% tall): "Add Calendar Subscription / Would you like to subscribe
  to " ... "Tap OK to Continue / Tap Cancel to Close Browser" with OK and Cancel.
  Status bar shows LTE. This is the one case where a genuine iOS dialog appears,
  because the page asked Safari for a real subscription.
- Origin: same as 3.

### 5. Calendar flooded with fake alerts (the after-effect)
- Files: `05-calendar-spam-events.jpg`, `06-calendar-spam-event-detail.jpg`
- Source: same Malwarebytes article.
- On screen: the iOS Calendar day view for Thursday May 13, hourly green events
  every hour from 5 PM: "Your text messages may have been shared", "A suspicious
  program may be using 90% of your...", "Alert Check your iPhone Now!...", "Remove
  Spam Notifications", "Repair your iPhone from Possible Malicious T...". Each
  event is a thin green bar, one line high, ~95% wide. The detail view is a
  long text event with a tracking link (`update.masstrk.com/aff_c?...`).
- Origin: the captcha tap above. Useful as a "the page is gone, the damage
  stayed" beat.

### 6. In-ad "Apple Security Alert: 8 viruses ... damaged by 72%" (iOS alert look)
- File: `07-ios-style-alert-8-viruses.png` (crop as published)
- Source: Malwarebytes, "Fake virus alerts are invading mobile games", 2026-06,
  https://www.malwarebytes.com/blog/mobile/2026/06/fake-virus-alerts-are-invading-mobile-games
- On screen: a dark grey translucent iOS-alert imitation, centred white text:
  "Apple Security Alert", "8 viruses have been detected on your iPhone. Now iOS
  is damaged by 72%. Further damage ... within two minutes", one blue "OK". In a
  phone frame it sits as a ~75% wide alert box, not a full screen.
- Origin: ad slots in free mobile games (and the same creatives in web ads).

### 7. "Your account has been restricted ... after visiting adult websites"
- File: `08-account-restricted-adult-sites-dialog.png`
- Source: same Malwarebytes 2026 article.
- On screen: a white rounded dialog with a grey warning triangle, bold "Your
  account has been restricted.", "detected that your device has been hacked after
  visiting adult websites", three numbered steps ending "You will be redirected
  to App Store", and CLOSE / OK in blue caps (Android-style buttons). A circled X
  sits at the corner. Background is a dark green game screen.
- Origin: ad in a free game; OK goes to the App Store for a "cleanup" app
  (fleeceware).

### 8. News article to fake "McAfee: Scanning your device" (a 15-second sequence)
- Files: `09a-ap-news-article-before.png`, `09b-ap-news-scrolling.png`,
  `09c-fake-mcafee-scan-5pct.png`, `09d-fake-mcafee-scan-threats.png` (frames
  from the screen recording Malwarebytes published, 450x1000)
- Source: Malwarebytes Labs, "Associated Press, ESPN, CBS among top sites serving
  fake virus alerts", 2023-11,
  https://www.malwarebytes.com/blog/threat-intel/2023/11/associated-press-espn-cbs-among-top-sites-serving-fake-virus-alerts
  (recording by a reader browsing apnews.com on his phone; ScamClub).
- On screen: an Android Chrome custom tab (not Safari: note the X, share and
  bookmark icons top right), but the page itself is what iPhone readers report
  too. Frame 1-2: a normal AP article "Why Americans feel gloomy about the
  economy..." with an "ADVERTISEMENT" slot and a small video ad bottom right.
  Frame 3: the title bar now says "Scanning your device / systemmeasures.life";
  a white page with a McAfee logo strip, "Scanning your device", a progress bar
  (5% green), "Scanned 15301 files", and a grey "Results Summary" table. Frames
  5-6: the bar turns red at 62-78%, the counters go red, and a red "Threat
  Detected! Trojan IRC/Backdor.Sd.FRV" banner card slides up over the bottom
  third. The scary element is a thin bar and small red numbers; nothing is
  poster-sized.
- Origin: big news sites (AP, ESPN, CBS) through a poisoned programmatic ad. The
  reader did not tap anything in this clip, so it is a no-tap redirect (Undirect
  lets those through by design; the films should not use this one as a "tap"
  beat, but the scan page itself matches the McAfee cases on Royal Road, below).
- Buyers' words: "getting redirected to a mcafee scam site while reading"
  https://www.reddit.com/r/royalroad/comments/1w62mfp/ ;
  "ads that redirect on mobile to pages informing me about viruses on my iPhone"
  (Reuters) https://news.ycombinator.com/item?id=17246677

### 9. "Amazon Membership Reward Program": three-question quiz with gold buttons
- File: `10-amazon-reward-program-quiz.png` (490x879, page crop, no browser chrome)
- Source: Confiant, "Malvertising Attack Hijacks 300 Million Sessions Over 48
  Hours", 2018-11,
  https://blog.confiant.com/malvertising-attack-hijacks-300-million-sessions-over-48-hours-9d0218fe02cd
- On screen: a dark navy header "You Are Lucky Today!" with a shopping-cart icon
  showing a "0" badge; an orange-underlined "Amazon Membership Reward Program!";
  a fake blog-post card "Congratulations Amazon.com User for have got a reward!"
  dated "19 November", body text offering "$1000 Amazon Reward Card, Apple iPhone
  X 256G or Samsung Galaxy S9+", "ACT NOW! 50 users have received this
  invitation", a grey "There have been 49 users that have won the prize" (49 in
  red), then "Question 1 of 3: Who founded Amazon? (97% answered correctly)" with
  gold Amazon-style answer buttons ("Bill Gates", "Mark Zuckerberg"). Small
  type throughout; the prize line is body text, not a headline.
- Origin: forced redirect from programmatic ads on ordinary sites (ScamClub,
  300 million iOS sessions in 48 hours per Confiant).

### 10. "Congratulations! You are randomly selected ... $1000 Gift Card for Amazon!"
- File: `11-amazon-1000-gift-card-survey-safari.png` (700x1244, full iPhone 8
  class screen with Safari chrome)
- Source: same Confiant article.
- On screen: status bar "Verizon LTE 4:56 PM 100%", the Safari address bar
  `congratulations.hipstarclub.com`, bottom toolbar (back, forward, share,
  bookmarks, tabs). Page: a navy band with the real Amazon wordmark (~10% of the
  height), an orange band with "7 September, 2018" right-aligned, then a white
  card: bold "Congratulations!", a 3-line 18pt "You are randomly selected to
  participate in this short survey to get a $1000 Gift Card for Amazon!", two
  body paragraphs, "Question 1 of 4: Do you consider yourself a frequent Amazon
  shopper?" and two full-width orange YES / NO buttons. Everything is inside the
  page area; the browser frame is untouched.
- Origin: same ScamClub forced redirect.
- Buyers' words: "keeps redirecting me to the scam tabs like you won a prize"
  https://www.reddit.com/r/applehelp/comments/zzr2us/ ; 1Blocker review "hijack
  my Safari with a new page ... 'You've won a prize!'"
  https://apps.apple.com/us/app/id1365531024?see-all=reviews

### 11. Dating funnel "QUESTION 1: CHOOSE ONE OF THESE WOMEN"
- File: `12-dating-wellhello-choose-women-safari.png` (700x1245, Safari chrome;
  the photos are blurred in the source)
- Source: same Confiant article (the "adult" half of the ScamClub traffic).
- On screen: status bar "Verizon 6:25 AM", address bar
  `congratulations.hipstarclub.com`. A black page: the "WellHello" logo in orange
  with a map-pin heart (~8% of height), then centred two-line uppercase
  "QUESTION 1: CHOOSE / ONE OF THESE WOMEN" in blue and orange, then three
  blurred circular portrait photos in a row (~20% of the height). The lower half
  is empty black. Bottom Safari toolbar visible.
- Origin: the same forced-redirect ad chain; Confiant says traffic went "mostly
  [to] adult sites and gift card scam sites".
- Buyers' words: "keeps redirecting me to some weird adult website" (manhwa site)
  https://www.reddit.com/r/Safari/comments/1eoz266/

### 12. Fake iOS Settings: "AppleCare Plus" with iCloud, Find My "Compromised"
- Files: `13a-fake-settings-hacked-initial-alert.jpg` (first alert on a blank
  grey page), `13b-fake-settings-hacked-dialog.jpg` (alert over the fake
  Settings), `13c-fake-settings-applecare-compromised.jpg` (the page itself),
  `13d-app-store-adblock-app-pushed.jpg` (where "Repair now" lands). PCrisk
  shows each inside a phone frame (790x774 crop, watermarked).
- Source: PCrisk, "Your Device Apple iPhone Has Been Hacked POP-UP Scam", 2022-10,
  https://www.pcrisk.com/removal-guides/25019-your-device-apple-iphone-has-been-hacked-pop-up-scam-mac
- On screen: a pixel copy of iOS dark-mode Settings: "< Settings" back link, a
  grey AppleCare+ tile, "AppleCare Plus / Protection System", the usual grouped
  rows (Name, Phone Numbers, Email; Password & Security; Payment & Shipping
  "Mastercard"; Subscriptions), then a group tinted dark red where iCloud, Media
  & Purchases and Find My each say "Compromised" in red, then an "iPhone / This
  iPhone" row and a full-width red "Repair now" button. First an iOS-style
  alert: "Your Apple iPhone has been hacked. All operations on your device are
  being tracked by the hacker. Immediate action is required!" with a "Close"
  link; then a second alert "Your device Apple iPhone has been hacked ...
  Otherwise your Facebook, WhatsApp, Instagram data will be compromised" with a
  red countdown "0:35" and Settings / OK buttons. The alerts are ~75% wide and
  ~20% tall, exactly an iOS alert. The scare is in three red words, not a
  headline.
- Lands on: the App Store page of "Neo Protect: AdBlock" (GINGA EUROPEAN LP,
  free with in-app purchases): the scareware sells an ad blocker.
- Origin: rogue ad networks on "dubious" sites (PCrisk: torrent, illegal
  streaming, pirate sites). Matches what Reddit posters described in October
  2026: "redirected me to a page, looking similar to the iPhone settings main
  page" (local news site) https://www.reddit.com/r/iphone/comments/1x0cpl2/ and
  "the page suddenly and violently redirected me to a completely different URL"
  https://www.reddit.com/r/iphone/comments/1x0aitu/
- Buyers' words on the blocker it sells: "kept redirecting me to download this
  app and wasnt able to go back" (1-star review of a blocker app that was itself
  advertised this way) https://apps.apple.com/us/app/id1585053145?see-all=reviews

### 13. Fake McAfee "Your iPhone is infected with 5 viruses!" with a discount
- File: `14-fake-mcafee-renew-subscription.jpg` (790x1568, inside a phone frame)
- Source: PCrisk, "McAfee - Your iPhone is infected with 5 viruses!", 2022-05,
  https://www.pcrisk.com/removal-guides/23923-mcafee-your-iphone-is-infected-with-5-viruses-pop-up-scam-mac
- On screen: white page; a black strip with the McAfee logo and "SiteAdvisor"; a
  red band "Your iPhone is infected with 5 viruses!" (~5% height); small
  bullets "Scan results: TROJAN Zeus2022, spyware", "Virus nature: unlicensed
  content/pirated content"; two red warning paragraphs; "Discount (23.05.2022)"
  with a yellow "UP TO 70% OFF" bar; a McAfee Total Security product block with
  a fake serial number in four boxed chunks; a red "Renew Sbscription" button
  (typo as shown). It is an affiliate sale for the real McAfee, dressed as an
  alarm: busy, small, red-and-yellow.
- Origin: the same pages as case 8 (ScamClub on news sites) and web-fiction
  readers: "got redirected(by an ad I assume) to a 'McAfee' page"
  https://www.reddit.com/r/royalroad/comments/1w580h6/

### 14. "Your iPhone has been locked!" with a Call Now / Cancel dialog
- File: `15-iphone-locked-call-now-dialog.jpg` (790x1556, iPhone 8 frame)
- Source: PCrisk, "iPhone Has Been Locked POP-UP Scam", variant of 2020-12-09,
  https://pcrisk.com/removal-guides/13001-iphone-has-been-locked-pop-up-scam-mac
- On screen: the page is plain grey; a white iOS-style alert ~70% wide: bold
  "Your iPhone has been locked!", a small paragraph ("Due to recent visiting
  insecure sites. Your passwords and credit card details on this iPad might be
  stolen ..."), a gear icon beside "Install the most trusted security
  application ... Call Apple Helpline for Instant Support +1(831)-498-2611 (Toll
  Free)", a red "0minute42seconds" countdown, and two blue buttons "Call Now" and
  "Cancel". "Call Now" opens the iPhone's own call sheet. A tech-support phone
  scam rather than an app sale.
- Origin: redirect from ad-carrying sites; it says "iPad" on an iPhone, which is
  typical of these kits.

### 15. Fake App Store / Google Play listing for a casino (FriendlyDealer)
- Files: `16c-fake-app-store-ice-fishing-iphone.jpg`,
  `16d-fake-app-store-euro-win-iphone.jpg` (iPhone versions, 1177x2132 crops of
  the page), `16a-fake-play-store-casino-ice-fishing.jpg`,
  `16b-fake-play-store-tower-rush.jpg` (Android versions)
- Source: Malwarebytes Labs, "FriendlyDealer mimics official app stores to push
  unvetted gambling apps", 2026-03,
  https://www.malwarebytes.com/blog/scams/2026/03/friendlydealer-mimics-official-app-stores-to-push-unvetted-gambling-apps
- On screen: on an iPhone the kit draws an App Store product page in San
  Francisco type: app icon top left (~22% wide), bold name "BEAST GAMES: ICE
  FISHING" / "Euro Win", developer in grey ("Mr. Beast", "Gambling LTD"), a
  blue pill "INSTALL"; a stats row (RATING 4.9 with stars, CONTENT RATING 18+,
  DOWNLOADS 120K+ / 7.2M+); a strip of screenshot cards (half the screen
  height) with casino art: "WELCOME BONUS $1000", "TOP WINNERS TODAY" with a
  list of fake winners and euro amounts; "About this app" "DON'T MISS A CHANCE -
  WIN $100,000,000". It looks exactly like a store page; the only tell is the
  URL. The Android skin copies Play: green full-width Install, "Editor's choice",
  localised for Germany (Revolut Slots), India (Tower Rush, Hindi bonus art),
  Mexico (Casino Mexico, a boxer).
- Origin: at least 1,500 domains; traffic arrives from ads and redirects, and
  Malwarebytes notes the kit can first show a casino mini-game. A believable
  beat for "a tap on a sports stream sends you to a casino 'app'".
- Buyers' words: "click on anything and ad pops up ... redirect me to App Store"
  (sports streams) https://www.reddit.com/r/mlb/comments/1o83e0d/i_miss_when_regular_people_could_watch_the/njsl5z2/

### 16. "Click 'Allow' to continue" over a quiz (push-notification permission)
- Files: `17a-click-allow-to-continue-quiz.png` (desktop capture: the browser's
  real "geniusfun.co.za wants to / Show notifications / Allow / Block" prompt
  top left, the page dimmed, a hand-drawn-style red curved arrow pointing up at
  it, white 22pt "Click 'Allow' to continue"), `17b-start-the-quiz-button.png`
  (the lure: "READY TO TEST YOUR KNOWLEDGE?" over a big red "START THE QUIZ"
  button)
- Source: Malwarebytes Labs, "Quiz sites trick users into enabling unwanted
  browser notifications", 2026-03,
  https://www.malwarebytes.com/blog/threat-intel/2026/03/quiz-sites-trick-users-into-enabling-unwanted-browser-notifications
- Phone scale: these captures are desktop Chrome. On iPhone Safari a normal
  web page cannot raise this prompt (Apple's web push works only for a site
  added to the Home Screen), so this case belongs to Android Chrome and the
  Mac. Use it in a film only as a Mac beat, or not at all for iPhone. (Source
  for the iOS limit: WebKit's "Web Push for Web Apps on iOS and iPadOS", 2023,
  https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/ )
- Origin: misleading ads ("Adguard update" ads that led to Poperblocker) and
  trivia sites.

### 17. "Apple VPN Protection required right now!" (VPN install pitch)
- File: `18-apple-vpn-protection-required-dialog.jpg` (790x774, phone frame)
- Source: PCrisk, "Apple VPN Protection Required POP-UP Scam", 2024-07,
  https://www.pcrisk.com/removal-guides/30463-apple-vpn-protection-required-pop-up-scam-mac
- On screen: a grey blank page and one iOS-style alert ~55% wide in the middle:
  bold "Apple VPN Protection required right now!", "Your Apple iPhone will run
  slower and your battery will drain quickly.", "A vulnerability was found in
  the internet connection. Safe your browsing and protect connection to fix this
  problem and speed up your Apple.", a settings-gear icon with a yellow warning
  badge beside "Install IOS VPN app for FREE to safe your Apple immediately!",
  and two blue buttons "Install" / "Cancel". It is small: the alert is about a
  third of the screen height; everything else is empty grey.
- Origin: PCrisk names torrent sites and illegal movie streaming pages as the
  usual ad networks' hosts. "Install" goes to an App Store VPN listing.

### 18. Elon Musk "Welcome bonus up to $2,500" crypto casino (reached from Soap2Day)
- Files: `19a-elon-musk-giveaway-desktop.jpg`,
  `19b-crypto-casino-reward-received-desktop.jpg` (desktop Chrome captures)
- Source: PCrisk, "Elon Musk Giveaway Scam", 2026-01,
  https://www.pcrisk.com/removal-guides/34832-elon-musk-giveaway-scam
- On screen: a dark page `elonsgift.com`: "LIMITED-TIME CAMPAIGN", a big white
  "Welcome bonus up to $2,500 from Elon Musk!", a fake pinned X post card from
  "@elonmusk" with view counts, three numbered steps (create an account, enter
  promo code ELON, receive $2,500), "Claim bonus" button, and a cut-out photo of
  Musk. Then a crypto casino ("gemibet") with a "Reward Received /
  CONGRATULATIONS! $2500 / YOUR REWARD HAS BEEN SUCCESSFULLY RECEIVED" modal.
- Origin, shown in the capture itself: the browser's other tabs read "Soap2Day -
  Watch Free H..." and "Captain America 2011 ..." and "404 Error": the researcher
  reached it from a free movie streaming site, and the tab strip already holds
  five tabs. On a phone this is a single-column version of the same page; no
  phone capture was published, so treat the phone layout as GUESS.

### 19. Link shortener: "VPN Update ... to continue watching" over a fake video player
- File: `20b-shortener-vpn-update-to-continue-watching.jpg` (crop of ESET's
  Figure 1, Android Chrome)
- Source: ESET WeLiveSecurity, Lukas Stefanko, "Some URL shortener services
  distribute Android malware", 2021-07-20,
  https://www.welivesecurity.com/2021/07/20/url-shortener-services-android-malware-banking-sms-trojans/
- On screen: a black video-player page with a spinner in the middle and a real
  looking control bar ("0:00 / 1:38", play, skip, volume, settings, fullscreen)
  near the bottom; a white card ~80% wide sits in the upper third: bold "VPN
  Update", "Please download the free VPN app from the Google Pay [sic] to
  continue watching", blue link "Install & Register Now". The address bar is at
  the bottom (`glbtraffic.com/dg73/index.html?...`) with a tab-count square reading 56 (low-res; 56 or 66): the
  tester already had dozens of tabs open, as these chains leave behind.
  The video is a lie; the card is the size of a system dialog.
- Origin: monetised link shorteners, used for links posted under social media
  posts and on download and streaming sites.

### 20. Link shortener: fake "WARNING! ... infected with virus" JavaScript alert
- File: `20a-shortener-android-device-infected-alert.jpg`
- Source: same ESET post.
- On screen: address bar `maxprivacydetectsystem.cyou/` with a two-digit tab count in the
  square badge (low-res; reads as 87, possibly 17), a dark page, and a browser
  JavaScript alert: "www.maxprivacydetectsystem.cyou says / WARNING! / Google
  Pixel is infected with virus and immediate action is required! / Continue
  with instructions to fix phone. Do not close this window! / **Exit at your own
  risk**". The alert names the phone model it read from the browser; the iPhone
  version says "iPhone" the same way.
- Origin: link shorteners.

### 21. Link shortener: "Start Download / Install App" step page (fake download)
- File: `20c-shortener-start-download-install-app.jpg`
- Source: same ESET post.
- On screen: address bar `offeranda.biz/?cid=...`; a grey page with three
  numbered blue circles and dark cards "1 Start Download", "2 Install App", "3
  Open File", each card holding a drawn copy of a system dialog; a big blue
  arrow points down at the real browser download prompt at the bottom: "This
  type of file can harm your device. Do you want to keep Your File Is Ready To
  Download.apk anyway?" Cancel / OK. This is the fake-download-button
  destination in its phone form: the button promised the file, the page sells
  an app. On iPhone the same pages end in an App Store listing or a profile
  download instead of an APK.
- Origin: link shorteners in front of file links (file hosts, mod and ROM
  sites). Buyer's words: "The download button redirects to dumb fake
  file-hosting site"
  https://www.reddit.com/r/Roms/comments/1twp56p/whats_the_verdict_on_romsfun_today/p8mstzs/

### 22. Link shortener on iPhone: "Click here to continue" then calendar subscribe, with dating ads below
- File: `21-shortener-ios-calendar-subscribe-with-dating-ads.jpg` (ESET Figure 3,
  four iPhone screens in a 2x2 grid, 669x1183)
- Source: same ESET post (Figure 3, "Scam website requests user to subscribe to
  calendar events on iOS platform").
- On screen, top row: Safari on an iPhone (status "No SIM", 10:06), address bar
  `exey.io` (a shortener), a grey page with a blue button "Click here to
  continue"; an iOS alert "Subscribe to the calendar "" Click OK To Continue"
  with Subscribe / Cancel, then "The Calendar "" Click OK To Continue " has been
  added" with View Events / Done. Below the alert, two native-looking ad rows
  with a woman's thumbnail: "Ad - You there?????? Stop ignoring me." and "Ad -
  Kati sent you (3) photos: click to view". The Safari bottom toolbar is
  visible. Bottom row: the Calendar day view full of green events ("Clean your
  Phone from potential threat", "Your iPhone is infected with a VIRUS") and an
  event "Viruses on your iPhone?! CLEAN THEM NOW" with a `forgottem.club` link.
- Origin: link shorteners (exey.io). A strong beat: the page is quiet, the
  scare arrives later.

### 23. Fake "iPhone Duo" preorder with a $500 voucher, and "Browser Restricted: open in Safari"
- Files: `22a-fake-iphone-duo-preorder-voucher-desktop.png` (desktop capture of
  the page), `22b-browser-restricted-open-in-safari.png` (the notice shown in
  in-app browsers)
- Source: Malwarebytes Labs, "Fake iPhone Duo preorder scam triggers DarkSword
  attack", 2026-09,
  https://www.malwarebytes.com/blog/threat-intel/2026/09/fake-iphone-duo-preorder-scam-triggers-darksword-attack
- On screen: an Apple-style product page: small caps "AUTHORIZED PARTNER
  EXCLUSIVE • $500 OFF VOUCHER", a black 40pt "iPhone Duo.", "Maximum screen
  space. Elegant foldable design.", a white rounded countdown box (days, hours,
  minutes, seconds: 03 13 44 48), a blue pill "Claim $500 Voucher", and phone
  renders below. The in-app-browser notice is a dark card with a teal glowing
  border, a shield icon, "Browser Restricted / For the best experience and
  compatibility, please open this page using Safari Browser", a teal "Launch
  Safari Now" button and "Copy Link & Open Safari".
- Origin: social posts and ads around the September 2026 launch. Opening the
  page alone runs the exploit, so it is not a tap-hijack case; useful only as
  the "prize page that looks exactly like Apple" look of 2026.

### 24. Fake file page "Download in Progress.." (adult sites and Facebook links, Android)
- File: `23-fake-file-download-in-progress.png` (desktop-width capture)
- Source: Malwarebytes, "Android users targeted on Facebook and porn sites,
  served adware", 2024-10,
  https://www.malwarebytes.com/blog/news/2024/10/android-users-targeted-on-facebook-and-porn-sites-served-adware
- On screen: "Games > File APK" breadcrumb, a green download-arrow icon, "File
  APK / Latest Version: 2.93.6", a blue "Download in Progress.." with a thin
  green progress bar and "If the download doesn't start, Click here", then "All
  Versions" and a big green "Download" button. Generic: the file has no real
  name.
- Origin: a redirect chain (lookebonyhill.com > apkretro.com > 3-dl-app.com) from
  adult sites and Facebook posts. Android only (APK); on iPhone the same chains
  end at an App Store listing (cases 12, 15, 17).

### 25. Novel-reader site: dark overlay whose "close" X is the redirect, landing on a fake App Store page
- Files: `24c-novel-reader-sites-origin.jpg` (four of the compromised novel
  sites at phone width: dense blue-link grids, "Recommended Reading", cover
  thumbnails, "Urban Fiction / Romance novels / Fantasy novels" boxes),
  `24a-novel-reader-chapter-page-injected-link-grid.png` (a chapter page,
  "Chapter 439 Midfield (Page 1/3)", with an injected 5x4 grid of adult
  "recommended" links and a yellow-on-blue "Video Zone" bar above the text),
  `24b-fake-app-store-adult-app-open-in-safari.png` (the landing page; brand is
  explicit, crop before any use)
- Source: c/side, "Chinese adult content scam targets mobile users through PWA
  injection", 2025-05,
  https://cside.com/blog/chinese-adult-content-scam-targets-mobile-users-through-pwa-injection
- Mechanism, from the write-up: a third-party script fires only on mobile user
  agents, lays "a dark semi-transparent overlay" over the page with an image as
  the main visual and "a close button image ... that triggers a redirect instead
  of dismissing the overlay"; "clicking either the main image or the fake close
  button opens the PWA scam site in a new tab". The novel site's own title
  promises "Pure reading, no pop-up ads".
- Landing on screen: a page copying the iOS App Store in Chinese: a square app
  icon (~25% wide), app name and size, a blue pill install button, "4.9" rating
  and "18+", review block; over it a blue rounded modal with the Safari compass
  icon: "This link only supports Safari, please open in Safari", the URL in a
  field and a "Copy" button. So the tap opened a new tab (tab count +1) on a
  store lookalike.
- Origin: free web-novel readers (the Asian equivalent of manga/manhwa and
  web-fiction sites). Buyer's words on the same site type: "the popups and page
  redirects make this almost unusable in safari"
  https://www.reddit.com/r/Askromance/comments/1pz7kq4/abandoned_luna_now_untouchable_novel_read_online/o2ycus5/ ;
  "comics ... will still open another tab when clicking to close them" (AdBlock
  Pro review) https://apps.apple.com/us/app/id1018301773?see-all=reviews

### 26. Fake "Adult or 18+" age gate covering a blog: the button is an ad click
- File: `25-fake-age-gate-show-babe-overlay.png` (429x332, desktop crop)
- Source: Malwarebytes, "Adult content malvertising scheme leads to
  clickjacking", 2023-04,
  https://www.malwarebytes.com/blog/news/2023/04/adult-content-malvertising-scheme-leads-to-clickjacking
- On screen: a dark rounded card over a blurred page: white 30pt "Adult or 18+",
  a blurred line of text, a full-width blue "Show Babe" button, "or", a grey
  "May Be Later" button. Malwarebytes: "Whichever one the visitor sees, clicking
  the button does nothing other than registering a click on an advertisement";
  under it sits a Google ad (in one capture, a bol.com preorder page with a
  Linkfire "Privacy Notice / Accept" box). Both buttons lead the same way.
- Origin: fake blogs ("blog.web-astral.net", self-help articles) promoted by
  ads. As a film beat it is the "both buttons are traps" idea, but keep it off
  any iPhone frame unless re-drawn: the capture is desktop.

### 27. Obituary search result: casino ad on the page, then nine kinds of alert, then the App Store (best iPhone set)
- Files (all real iPhone 15/16 Pro captures, Dynamic Island, iOS 18 Safari with
  the address bar at the bottom):
  - `26a-obituary-site-google-result-and-casino-ad.jpg`: three phones: the
    Google result "Death Of Chris Gamble: Beloved Resident Of Harbor Springs MI
    Has Passed Away" (memorialhour.cfd), the site (red logo, "Memorial Hour /
    Eulogies and Personal Tributes", a blue nav bar, a red "WATCH" button, the
    headline), and the article body with share buttons and an in-content ad
    "BC.GAME $50 FREE BET / DEPOSIT BONUS 1000% / PLAY NOW" with a woman, the ad
    about 25% of the screen height. Tab bar: `memorialhour.cfd`.
  - `26b-obituary-redirect-nine-alerts-grid.jpg` (nine phones) and crops:
    `26b1-totalsafeios-compromised-sheet.jpg`: page dimmed, an Apple-security
    page behind ("Important notice. Your device is currently infected with a
    Trojan virus!", "1 minutes and 58 seconds", a yellow "Remove Virus"), and
    in front an iOS-notification-style card with a Settings gear icon and red
    badge "1": "YOUR IPHONE HAS BEEN COMPROMISED / Immediate Action Is
    Required!" plus a separate white "OK" bar, styled like an action sheet at
    the bottom third. Address bar `totalsafeios.com`.
    `26b2-iosprotectionhub-12-viruses-card.jpg`: a white rounded card: "Your
    iPhone is severely damaged by (12) virus!" with the gear icon badge, red
    "1 minute and 24 seconds", "How to remove the virus", a blue "Protect
    iPhone" button. `iosprotectionhub.com`.
    `26b3-vpn-app-to-continue-watching-video.jpg`: a black fake video player
    ("0:00 / 1:52:46" scrubber, gear, PiP, fullscreen, volume) with an iOS
    alert "Attention! / Please Install the VPN App to continue watching in safe
    mode. / Install" over it, plus a close X and a blue thumbs-up badge.
    `network-universal.com`. The streaming-site version.
    `26b4-iphone-hacked-plain-alert.jpg`: grey page, a lone white alert "Your
    iPhone has been hacked / All your actions on the device are tracked by a
    hacker. / Immediate action is required! / Close". `alternvpnmobs.com`.
    `26b5-hacker-tracking-17-system-notification.jpg`: "Apple security / Hacker
    is tracking you!" card with "(17) System notification / Read important
    notifications regarding your iOS device. / OK" alert on top.
    `26b6-storage-bar-44-viruses.jpg`: "Warning! Your system is heavily
    damaged by (44) viruses!" with a copy of the iPhone Storage bar ("231 GB of
    256 GB used", coloured segments incl. "Viruses") and a red "Remove viruses"
    button.
    `26b8-prohibited-websites-cleaner.jpg`: "Apple Security Alert / You visited
    prohibited websites, and your information was stolen", countdown, "Protect
    iPhone".
    `26b9-speedy-clean-install-now.jpg`: a pre-lander for "Speedy Clean" with a
    blue wave and an "Install now" link. `lacmybk.com`.
    Cell 7 (not cropped) is a second "VPN App is recommended to continue
    watching in safe mode / Install / Details" alert over a video player.
    Two cells show a grey bar at the top with "Dismiss" and "Reduce
    Protections" buttons, part of Safari's own UI on that capture.
  - `26c-obituary-redirect-app-store-landings-grid.jpg` (six phones): the real
    App Store, each with the "< Safari" back link in the status bar (proof it
    was opened from Safari): InvisiGuard VPN, Purely Cleaner, VPN Lumos ("Watch
    Available Videos!" with movie posters), Total Security in Global Web,
    Speedy - Smart Phone Cleaner, Mobile Privacy & Leak Security. Each is a
    normal product page: icon, blue "Get", ratings row, screenshots.
- Source: TidBITS, Adam Engst, "Beware Obituary Scam Sites and Fake iPhone
  Security Warnings", 2024-12-06,
  https://tidbits.com/2024/12/06/beware-obituary-scam-sites-and-fake-iphone-security-warnings/
- Flow in the author's words: "When loaded, the sites quickly started
  displaying dire-sounding alerts ... and suggested a system cleaner app or VPN
  ... Tapping any of the links loaded a second page that immediately
  redirected to a system cleaner or VPN app in the App Store." The reader who
  started it "tapped a possible result in the Google search results" while
  looking up an obituary.
- Scale facts for the films: in every one of these the Safari bottom bar (tab
  overview button, address pill with the domain, back/forward/share/bookmarks/
  tabs) stays visible, and the alert is a ~75%-wide box or a card; nothing is
  poster-sized. Domains are plausible ("iosprotectionhub.com",
  "totalsafeios.com").
- Origin: AI-written obituary sites found through Google; the same ad networks
  run on news and recipe-style content farms.

### 28. Video-style ad: "(3) Viruses have been detected" with "Download and Install"
- File: `27-in-app-video-ad-apple-security-download-install.jpg` (1125x2436,
  posted by a reader in the TidBITS comment thread)
- Source: comment thread of the TidBITS article above,
  https://talk.tidbits.com/ (image
  https://talk.tidbits.com/uploads/default/original/2X/8/89f1736a31e965c2dfae52cfd1a747999e7ce852.jpeg )
- On screen: a full-screen ad unit, mute icon top left and "Skip Ad" top right
  (so it is a video ad, likely in an app, not a Safari page): a grey bar with
  the Apple logo and "Apple Security", red 18pt "(3) Viruses have been
  detected on your iPhone and battery has been infected and damaged.", grey
  body text, "Tap the button below & install the recommended virus protection
  tool for free from the AppStore.", and a white "Download and Install" button
  with a hand-drawn black arrow pointing at it.
- Origin: ad slots in free apps and games (as case 6/7).

### 29. ZoidWays (2026): fake Settings screen drawn inside the page, "wiretapping" alert, RUN A TEST
- File: `28-zoidways-fake-settings-wiretapping-ios26.png` (595x618: Android
  Chrome left, iPhone Safari right)
- Source: Confiant, "Field Intelligence #5: Scareware at scale", 2026-11,
  https://blog.confiant.com/p/field-intelligence-5-scareware-at-scale
  ("ZoidWays is a forced redirect campaign aimed at phones. Victims are
  presented with a clone of the phone's settings screen, topped by a fake
  'Platform Security for wiretapping' alert and a call to action to run a
  test. The test ends at an affiliate antivirus checkout, a paid support line,
  or a subscription trap." Peak ~1.5 million blocked impressions in one day,
  2026-09-12. Same operation reported by The Media Trust as DarkRelay,
  including a "next-click hijack".)
- On screen (iPhone half): the real status bar (9:59, battery 9) and, inside
  the page, a second fake status bar ("23:30", a drawn Dynamic Island), then a
  dimmed copy of iOS 26 Settings: large "Settings" title, an "Apple Account"
  row, then rows for Apple Intelligence & Siri, Camera, Home Screen & App
  Library, Search, StandBy. In the middle a white alert ~65% wide: Apple logo,
  bold "Apple Platform Security", "The security system has detected wiretapping
  on your Apple iPhone. Run a file check on your device.", red caps "RUN A
  TEST" bottom right. Safari's iOS 26 compact bottom bar: a round back button,
  the address pill `safenetgroup.site` with reload, and a round "..." button.
  The Android half shows a Chrome tab count of 14.
- Origin: programmatic ads on ordinary sites through at least six DSPs; the
  most current (2026) version of case 12. This is the most up-to-date look for
  an iPhone film beat.

### 30. Google "You've made the 5-billionth search." with three prize cups
- File: `29-google-5-billionth-search-three-cups.png` (852x778, page capture)
- Source: Confiant, "D-Shortiez: Inside the Criminal Network Behind Those Fake
  'You Won!' Pop-Ups", 2025-07-02,
  https://www.confiant.com/news/the-criminal-group-behind-those-fake-youve-won-messages-and-more
  ; also "Disrupting 59M Malicious Impressions",
  https://blog.confiant.com/p/disrupting-59m-malicious-impressions
  (59 million impressions in 2025, 95.4% in the US; "mobile users still
  received reward scams"; D-Shortiez uses a back-button hijack so "the
  neutralized back button keeps them from being able to back out of the site").
- On screen: white page with the Google logo and red "Online Reward Program",
  coloured confetti scattered over everything, a 28pt "You've made the
  5-billionth search.", short paragraphs ("Congratulations! You are today's
  lucky user", a fake past winner "Brad Jenkins from Chicago"), "Behind every
  blue cup is a prize", then three round blue trophy icons each over a green
  "CHOOSE" button, and "Testimonials" with dated fake comments below.
- Buyer's words (quoted by Confiant from r/notinteresting): "The 5-billionth
  search prize/reward is a scam ... I saw enough people saying that they
  actually would have fell for this".

### 31. Amazon "TRIAL PROGRAM": Le Creuset cookware survey with a countdown
- File: `30-amazon-trial-program-le-creuset-survey.jpg` (821x956, mobile-width
  page capture)
- Source: Confiant, "Disrupting 59M Malicious Impressions" (Figure 2),
  https://blog.confiant.com/p/disrupting-59m-malicious-impressions
- On screen: an Amazon-style dark header (hamburger, amazon logo, "Sign In", cart
  with "0"), a bar "TRIAL PROGRAM" and "Deliver to United States / Chicago" (the
  victim's city filled in), "Congratulations!", "Today 8.1.2026 You've been
  randomly selected to participate in this survey ... Le Creuset Cookware !", a
  product photo of blue pans (~20% of the height), "They have 00:40:40 time to
  close this survey" in red, "Questions 1/4: Are you a male or female?" with two
  yellow Amazon-style pills "Male" / "Female", then "Comments 7 of 589". Ends in a
  checkout asking $9.95 by card.
- Origin: D-Shortiez forced redirects in programmatic ads (US mobile traffic).

## What the captures say about scale and the tab count

- Every real iPhone capture (cases 1-4, 10, 11, 27, 29) keeps Safari's chrome:
  status bar, the address pill with the scam domain, and the toolbar. The scam
  is page content: an iOS-alert-sized box (55-75% wide, 15-30% tall), a card,
  or a full page of body-size text with one red headline. None is a full-bleed
  poster. The scariest element is usually a red line of text, a countdown, or
  the word "Compromised" in a Settings-style row.
- The iPhone Safari tabs button shows no number (checked on
  `26b1-totalsafeios-compromised-sheet.jpg`: two plain overlapping squares).
  Only Android Chrome shows a count in its button (14 in
  `28-zoidways-...png`, 56 in `20b-...jpg`). So on an iPhone a "tab count
  climbing" beat has to be shown in Safari's tab overview grid (or the Mac tab
  bar), not on the button. No published capture of an iPhone tab overview
  filled by ad tabs was found in this pass; the films would have to build that
  shot. Buyers describe it: "redirected me to safari, and then opened 50
  million tabs" https://www.reddit.com/r/malwares/comments/1wlemqf/ ; "The ad
  opens in a new tab ... repeat 7 times"
  https://www.reddit.com/r/ReelShorts/comments/1vxbwxm/anyone_else_having_issues_watching_anything_on/p5s6b2x/ ;
  "every click you make it opens up a separate tab with some ad"
  https://www.reddit.com/r/Safari/comments/1gqy27i/
- Several pages fake iOS itself: an alert box (cases 6, 12, 14, 17, 27), the
  Settings app (12, 29), the iPhone Storage bar (27, `26b6`), a notification
  card with the Settings gear and a red badge (27, `26b1`), and the App Store
  (15, 25). Some draw a second status bar inside the page (29).
- Many land on the real App Store with Safari's "< Safari" back link in the
  status bar (27, `26c`): the end of the chain is often a real, approved
  cleaner or VPN app.

## Gaps and sources that refused

- Reddit (www and old.reddit, JSON too) and Apple Community threads refused
  scripted fetches (403 / redirect to support.apple.com), so no screenshots
  from them; their words are quoted from `docs/research/undirect-voice-of-customer.md`.
- YouTube searches turned up only tutorials with drawn mock-ups, no real
  on-phone recordings of these pages; none were used.
- No phone capture found for: fake "Safari needs updating", a fake download
  button on an iPhone file host (Android only, cases 21 and 24), crypto
  giveaway on a phone (desktop only, case 18), push "Allow" on iPhone (not
  possible for ordinary pages, case 16), and a recipe or lyrics site as the
  origin (no write-up names them).

## Cases for the films

Twelve beats, each a different origin and a different landing. iPhone Safari
unless noted. "Tab" says whether the tap opened a new tab or took the current
one; on iPhone the count only shows in the tab overview.

1. Manga or web-novel chapter page (an injected "recommended" link grid above
   the text) | tap the X on the dark overlay that covers the chapter | a new tab
   opens on a fake App Store listing with a blue "This link only supports
   Safari, please open in Safari" modal and a Copy button | modal ~70% wide,
   store page behind it with icon, blue install pill, 4.9 rating, 18+ |
   tab: +1 new tab (the write-up says the close button "opens the PWA scam site
   in a new tab") | `24a-novel-reader-chapter-page-injected-link-grid.png` ->
   `24b-fake-app-store-adult-app-open-in-safari.png` (crop the brand).
2. Free movie streaming site | tap play on the film | the same tab becomes a
   black fake player (0:00 / 1:52:46 scrubber) with an iOS-style alert
   "Attention! Please Install the VPN App to continue watching in safe mode. /
   Install" | alert ~70% wide in the upper third, the fake player controls
   below, Safari bottom bar with `network-universal.com` | tab: same tab |
   `26b3-vpn-app-to-continue-watching-video.jpg`.
3. Google search for an obituary | tap the result | an AI-written obituary page
   with a "BC.GAME $50 FREE BET / DEPOSIT BONUS 1000%" ad a quarter of the
   screen tall, then the page dims and a notification-style card rises: gear
   icon with red "1", "YOUR IPHONE HAS BEEN COMPROMISED / Immediate Action Is
   Required!", a separate "OK" bar | card ~90% wide in the bottom third, red
   Trojan text and a yellow "Remove Virus" button blurred behind |
   tab: same tab | `26a-obituary-site-google-result-and-casino-ad.jpg` ->
   `26b1-totalsafeios-compromised-sheet.jpg`.
4. The same chain, one tap later | tap "Protect iPhone" on the "(12) virus!"
   card | Safari hands over to the real App Store: "Purely Cleaner" or
   "Speedy - Smart Phone Cleaner", blue Get, "< Safari" in the status bar |
   ordinary store page, nothing red at all, which is the point | tab: the app
   switches; the scam tab stays open behind |
   `26b2-iosprotectionhub-12-viruses-card.jpg` ->
   `26c-obituary-redirect-app-store-landings-grid.jpg`.
5. Local news article | tap in the article (an ad slot takes it) | a copy of
   iOS 26 Settings, dimmed, with a white "Apple Platform Security: The security
   system has detected wiretapping on your Apple iPhone. Run a file check on
   your device. RUN A TEST" alert; a second, fake status bar inside the page |
   alert ~65% wide mid-screen; Safari's compact bar with `safenetgroup.site` |
   tab: same tab (forced redirect) |
   `28-zoidways-fake-settings-wiretapping-ios26.png`. Buyer: "redirected me to
   a page, looking similar to the iPhone settings main page"
   https://www.reddit.com/r/iphone/comments/1x0cpl2/
6. Sports stream | tap play | a page that is a pixel copy of an App Store
   listing for a casino "app": "Euro Win", INSTALL pill, 4.8 stars, 18+,
   "TOP WINNERS TODAY" screenshot card | looks exactly like the App Store; only
   the domain in the address pill gives it away | tab: GUESS (the write-up
   does not say) | `16d-fake-app-store-euro-win-iphone.jpg` (or `16c`).
   Buyer: "click on anything and ad pops up ... redirect me to App Store"
   https://www.reddit.com/r/mlb/comments/1o83e0d/i_miss_when_regular_people_could_watch_the/njsl5z2/
7. Link posted under a social media post, through a link shortener (exey.io) |
   tap "Click here to continue" | a real iOS alert: "Subscribe to the calendar
   ... Click OK To Continue" with Subscribe / Cancel; below it two native-looking
   ad rows "You there?????? Stop ignoring me." and "Kati sent you (3) photos" |
   alert ~70% wide; grey page; Safari toolbar | tab: same tab |
   `21-shortener-ios-calendar-subscribe-with-dating-ads.jpg` (and the cleaner
   `04-captcha-calendar-subscription-dialog.png`).
8. The same subscription, hours later (no browser at all) | none: the damage
   stays | the Calendar day view with a green event every hour: "Your text
   messages may have been shared", "A suspicious program may be using 90% of
   your...", "Alert Check your iPhone Now!" | one-line green bars, full width |
   tab: none | `05-calendar-spam-events.jpg`, `06-calendar-spam-event-detail.jpg`.
9. A web-fiction reader (Royal Road), reading a chapter | tap (an ad) | the
   screen turns into "McAfee / Scanning your device": a progress bar creeping
   5% -> 78% and turning red, "Scanned 200814 files", a red "Threat Detected!
   Trojan IRC/Backdor.Sd.FRV" card sliding up, then "Your iPhone is infected
   with 5 viruses!" with "UP TO 70% OFF" and "Renew Sbscription" | progress
   bar thin, counters small; the alarm builds over ~15 seconds | tab: same
   tab | `09c-fake-mcafee-scan-5pct.png` -> `09d-fake-mcafee-scan-threats.png`
   -> `14-fake-mcafee-renew-subscription.jpg` (09 is an Android recording; draw
   the Safari frame from `26b1`). Buyer: "getting redirected to a mcafee scam
   site while reading" https://www.reddit.com/r/royalroad/comments/1w62mfp/
10. Manhwa reader | tap the next-page arrow | "WellHello / QUESTION 1: CHOOSE
    ONE OF THESE WOMEN" with three blurred round portraits on black, address
    `congratulations.hipstarclub.com` | logo and question in the top third,
    photos a fifth of the height, the rest black | tab: same tab (forced
    redirect) | `12-dating-wellhello-choose-women-safari.png`. Buyer: "keeps
    redirecting me to some weird adult website"
    https://www.reddit.com/r/Safari/comments/1eoz266/
11. Any ad-funded page on a US phone (Confiant: D-Shortiez programmatic ads;
    the exact site type is GUESS) | tap | Google-branded "You've made the
    5-billionth search." with confetti, three blue trophy cups and green CHOOSE
    buttons; the back button then fails (D-Shortiez back-button hijack) |
    headline one line, cups a fifth of the height | tab: same tab, Back does
    nothing | `29-google-5-billionth-search-three-cups.png`.
12. A news site, again through ad slots (ScamClub, 300 million iOS sessions) |
    tap | "Congratulations! You are randomly selected to participate in this
    short survey to get a $1000 Gift Card for Amazon!" with orange YES / NO,
    or the 2026 version "TRIAL PROGRAM ... Le Creuset Cookware" with the
    viewer's own city filled in and a 00:40:40 countdown | Amazon header band
    ~10%, the rest body text and two buttons | tab: same tab |
    `11-amazon-1000-gift-card-survey-safari.png`,
    `30-amazon-trial-program-le-creuset-survey.jpg`. Buyer: "keeps redirecting
    me to the scam tabs like you won a prize"
    https://www.reddit.com/r/applehelp/comments/zzr2us/
