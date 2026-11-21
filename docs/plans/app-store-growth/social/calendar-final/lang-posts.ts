// Native-language posts (Japanese, Indonesian, Arabic) and the new English help posts.
// Written in each language from the meaning, never translated from an English caption
// (human-prose references/language-surface-forms.md). Japanese holds です・ます throughout;
// Indonesian is casual `kamu` with nggak, as the Cutling Indonesian explainer speaks; Arabic is
// Gulf colloquial for the Saudi audience that bought Undirect from one Arabic X post.
// `help: true` = helps a stranger with no app pitch and no link.

export type Lang = "en" | "ja" | "id" | "ar" | "zh";
export type LangUnit = { id: string; lang: Lang; app: "Undirect" | "Cutling"; help?: boolean; film?: string; text: string; q?: string; yt?: string; sale?: boolean };

// Films that carry the language on screen; the rest are English-text pain films under a native caption.
export const LOCAL_FILMS: Record<string, string> = {
  "und-id-preview": "Repositories/undirect-promo/out/locales/id/iphone.mp4",
};

export const JA: LangUnit[] = [
  { id: "J01", lang: "ja", app: "Cutling", film: "cutling-address", text: "住所を聞かれるたび、メモアプリを開いてコピーして、トークに戻る。カットリングなら、保存した住所をキーボードからワンタップで入れられます。買い切りで、アカウント登録もいりません。", q: "住所を聞かれたとき、どこから探していますか？", yt: "住所をメモから探すのをやめる" },
  { id: "J02", lang: "ja", app: "Cutling", film: "cutling-email", text: "Wi-Fiのログイン、クーポン、チェックイン。どれもメールアドレスを聞いてきます。カットリングに一度保存すれば、メール欄ではキーボードの先頭に出てきます。", q: "今月、メールアドレスを何回打ちましたか？", yt: "メールアドレスを毎回打たなくていいキーボード" },
  { id: "J03", lang: "ja", app: "Cutling", help: true, text: "iPhoneのユーザ辞書は「設定」→「一般」→「キーボード」→「ユーザ辞書」にあります。よく打つ住所やあいさつの「よみ」を短くしておくと、変換候補からすぐに出せます。", q: "ユーザ辞書に何を登録していますか？" },
  { id: "J04", lang: "ja", app: "Undirect", film: "u1", text: "動画の再生ボタンを押すたびに、広告のタブが開く。押した場所の上に、見えない層が重ねてあるからです。Undirectはその層を外して、再生ボタンだけが反応するようにします。", q: "再生ボタンで、どんなページに飛ばされましたか？", yt: "再生ボタンを押すたびに広告タブが開く" },
  { id: "J05", lang: "ja", app: "Undirect", help: true, text: "「iPhoneがウイルスに感染しています」という画面が出ても、iPhoneは感染していません。表示しているのは見ていたサイトです。タブを閉じて、アプリのインストールや電話、支払いはしないでください。", q: "家族からこの画面のことで連絡が来たことはありますか？" },
  { id: "J06", lang: "ja", app: "Cutling", film: "cutling-mac-history", text: "Macでコピーし直したら、さっきコピーしたものが消えた。カットリングのMacアプリはコピー履歴を残します。パスワード管理アプリが隠す項目は残りません。", q: "コピーし直して消えたもの、最近ありましたか？", yt: "Macでコピーし直して消えたものを取り戻す" },
  { id: "J07", lang: "ja", app: "Undirect", film: "u2", text: "ダウンロードボタンを押したら、偽のダウンロード画面。次はカレンダー登録の確認。Undirectをそのサイトでオンにすれば、ページから離れずに済みます。", q: "偽のダウンロードボタン、押したことはありますか？", yt: "ダウンロードボタンで偽ページに飛ばされる" },
  { id: "J08", lang: "ja", app: "Cutling", help: true, text: "macOS TahoeのSpotlightにはクリップボード履歴があり、初期設定では8時間で消えます。26.1からは30分・8時間・7日から選べます。", q: "Spotlightのクリップボード履歴、使っていますか？" },
  { id: "J09", lang: "ja", app: "Cutling", film: "cutling-sync", text: "iPhoneで登録したユーザ辞書が、iPadでは変換されない。カットリングに保存した文章は自分のiCloudで同期されるので、iPadのキーボードにも同じものが出ます。", q: "ユーザ辞書が同期されなかったこと、ありますか？", yt: "ユーザ辞書がiPadに同期されないとき" },
  { id: "J10", lang: "ja", app: "Undirect", film: "u-mac", text: "MacのSafariで再生をクリックしたら、カジノのタブが開いた。Undirectのボタンをそのサイトで一度押せば、次からは再生で新しいタブが開きません。", q: "Macでもこのタブ、開きますか？", yt: "MacのSafariで勝手に開くカジノのタブ" },
  { id: "J11", lang: "ja", app: "Cutling", film: "cutling-share", text: "Safariで見つけた住所やURLは、共有ボタンからカットリングに保存できます。名前をつけておけば、次からはキーボードでワンタップです。", q: "共有ボタン、ふだん何に使っていますか？", yt: "共有ボタンからキーボードに保存する" },
  { id: "J12", lang: "ja", app: "Undirect", help: true, text: "Safariの「ポップアップブロック」をオンにしても広告のタブが開くのは、タップした直後に開くタブは通してしまうからです。ページの側は、どんなタップも「押されたから開いた」ように見せられます。", q: "ポップアップブロック、オンにしていますか？" },
  { id: "J13", lang: "ja", app: "Cutling", film: "cutling-android", text: "Androidから乗り換えて、Gboardのピン留めが恋しい人へ。カットリングなら、よく貼る文章をiPhoneのキーボードに並べておけます。コピーの内容を勝手に記録することはありません。", q: "Androidから来て、いちばん困ったことは何ですか？", yt: "Gboardのピン留めをiPhoneで" },
  { id: "J14", lang: "ja", app: "Undirect", film: "u-ipad", text: "iPadで動画を見ようとすると「iPhoneがハッキングされています」のタブが開く。UndirectはiPadのSafariでも使えて、購入は一度だけです。", q: "iPadで動画を見ることはありますか？", yt: "iPadで再生すると開く「ハッキング」タブ" },
  { id: "J15", lang: "ja", app: "Cutling", film: "cutling-address-field", text: "同じ住所を、今年何回打ちましたか。この動画では214回。カットリングに一度保存すれば、どのフォームでもワンタップです。", q: "いちばんよく打つ文章は何ですか？", yt: "同じ住所を214回打った人へ" },
  { id: "J16", lang: "ja", app: "Cutling", help: true, text: "iPhoneのクリップボードには1つしか残りません。新しくコピーすると、前のものは消えます。よく使う文章はユーザ辞書やメモに置いておくと、探さずに済みます。", q: "コピーした内容が消えて困ったこと、ありますか？" },
  { id: "J17", lang: "ja", app: "Undirect", film: "Quiz", text: "ダウンロードボタンが3つ。本物はひとつだけです。Undirectをオンにすると、偽物を押しても何も起きず、本物だけがダウンロードされます。", q: "どれが本物だと思いましたか？", yt: "本物のダウンロードボタンはどれ？" },
  { id: "J18", lang: "ja", app: "Cutling", film: "cutling-email-short", text: "フォームが7つあれば、メールアドレスを7回打つことになります。カットリングならメール欄でワンタップなので、7つでも7タップで終わります。", q: "メールアドレス、何で入力していますか？", yt: "7つのフォームを7タップで" },
  { id: "J19", lang: "ja", app: "Undirect", film: "AdPov", text: "無料動画サイトの広告の目線で見ると、こうなります。再生が押されるたびに新しいタブ。Undirectがオンになったら、何も届かなくなりました。", q: "いちばんしつこかった広告はどれですか？", yt: "広告の目線で見た無料動画サイト" },
  { id: "J20", lang: "ja", app: "Cutling", film: "cutling-address-short", text: "キーボードの追加は、設定で一回だけ。あとは地球儀キーでカットリングに切り替えて、保存した文章をタップするだけです。", q: "キーボードアプリ、いくつ入れていますか？", yt: "キーボードを追加するのは一回だけ" },
  { id: "J21", lang: "ja", app: "Undirect", help: true, text: "XやInstagramでリンクを開いたときのアプリ内ブラウザと、ホーム画面に追加したWebアプリでは、Safariの拡張機能は動きません。広告のタブが気になるサイトは、Safariで開いてください。", q: "リンクは、アプリ内とSafariのどちらで開いていますか？" },
  { id: "J22", lang: "ja", app: "Cutling", film: "cutling-mac-history-short", text: "Windowsから来て、Win+Vがなくて困っている人へ。カットリングのMacアプリなら、⇧⌘Vでコピー履歴を開けます。", q: "Windowsから来て、恋しい機能は何ですか？", yt: "MacでWin+Vの代わりに⇧⌘V" },
  { id: "J23", lang: "ja", app: "Undirect", film: "Dad", text: "「スマホにウイルスが12個あるって出た」と父からまた連絡。原因はいつもの無料動画サイトでした。父のiPhoneにUndirectを入れてそのサイトでオンにしたら、動画がそのまま再生されるようになりました。", q: "家族のスマホの面倒、誰が見ていますか？", yt: "父のiPhoneの「ウイルス」騒ぎ" },
  { id: "J24", lang: "ja", app: "Cutling", help: true, text: "MacとiPhoneでコピペが届かないときは、両方が同じApple IDでサインインしていて、Wi-FiとBluetoothとHandoffがオンになっているか確かめてみてください。", q: "MacとiPhoneのコピペ、使っていますか？" },
  { id: "J25", lang: "ja", app: "Undirect", film: "u1-short", text: "1話見るまでに閉じた広告タブ、何枚でしたか。この動画では、VPNの警告とウイルスの警告。同じタップをUndirectをオンにして押すと、そのまま再生されます。", q: "1話見るまでに何枚閉じましたか？", yt: "1話見るまでに閉じた広告タブ" },
  { id: "J26", lang: "ja", app: "Cutling", help: true, text: "メールアドレスや住所を毎回打つなら、Safariの自動入力も使えます。「設定」→「アプリ」→「Safari」→「自動入力」で、自分の連絡先カードを選んでおくとフォームに入ります。", q: "自動入力、使っていますか？" },
  { id: "J27", lang: "ja", app: "Undirect", help: true, text: "Safariで広告のタブが何十枚も開いたら、タブのボタンを長押しして「すべてのタブを閉じる」を選ぶと、まとめて消せます。", q: "今、Safariのタブは何枚開いていますか？" },
  { id: "J28", lang: "ja", app: "Cutling", film: "cutling-miss-android", text: "Androidで当たり前だったもの。「ペーストを許可」なしの貼り付け、クリップボード、ピン留め。iPhoneでは、カットリングでピン留めを取り戻せます。", q: "Androidで当たり前だったこと、何が恋しいですか？", yt: "Androidから来て恋しい3つのこと" },
  { id: "J29", lang: "ja", app: "Undirect", help: true, text: "広告の「×」を押したら、別の広告が開いた。その「×」は広告の一部として描かれた絵です。閉じたいときは、タブごと閉じるのが確実です。", q: "偽の「×」、押したことはありますか？" },
  { id: "J30", lang: "ja", app: "Undirect", help: true, text: "「戻る」を押しても広告のページに戻されるときは、戻るボタンを長押ししてみてください。さかのぼれるページの一覧が出て、広告を飛ばして戻れます。", q: "「戻る」で戻れなかったサイト、ありますか？" },
  { id: "J31", lang: "ja", app: "Cutling", help: true, text: "「ペーストを許可しますか？」が毎回出るアプリは、「設定」→「アプリ」→そのアプリ→「ほかのAppからペースト」で「許可」にできます。", q: "この確認、毎回出ていますか？" },
  { id: "J32", lang: "ja", app: "Cutling", help: true, text: "キーボードアプリに「フルアクセス」を許可すると、そのキーボードは通信ができるようになります。入れる前に、App Storeの「Appのプライバシー」を見ておくと安心です。", q: "キーボードアプリに、フルアクセスを許可していますか？" },
  { id: "J33", lang: "ja", app: "Cutling", help: true, text: "iPhoneのキーボードでスペースキーを長押しすると、トラックパッドのようにカーソルを動かせます。打ち間違いを直すときに便利です。", q: "スペースキーの長押し、知っていましたか？" },
];

export const ID: LangUnit[] = [
  { id: "I01", lang: "id", app: "Cutling", film: "cutling-address", text: "Tiap ada yang nanya alamat, kamu buka Notes, cari, salin, terus balik lagi ke chat. Simpan sekali di Cutling, nanti tinggal tap dari keyboard. Bayar sekali, nggak perlu bikin akun.", yt: "Berhenti bolak-balik ke Notes buat nyalin alamat" },
  { id: "I02", lang: "id", app: "Undirect", film: "und-id-preview", text: "Mau pencet play, malah ke situs nggak jelas. Ada lapisan tersembunyi yang ngambil klikmu. Undirect buang lapisan itu, jadi yang kepencet tombol yang kamu mau.", yt: "Pencet play malah ke situs nggak jelas" },
  { id: "I03", lang: "id", app: "Cutling", film: "cutling-address", text: "Ngetik alamat lagi di tiap form checkout. Di video ini, ngetik makan 14 detik, pakai Cutling cuma sedetik.", yt: "14 detik ngetik alamat vs 1 tap" },
  { id: "I04", lang: "id", app: "Undirect", film: "u2", text: "Pencet Download, yang muncul malah halaman download palsu, terus pop-up langganan kalender. Nyalain Undirect buat situs itu, kamu tetap di halaman.", yt: "Tombol download yang ternyata palsu" },
  { id: "I05", lang: "id", app: "Cutling", film: "cutling-email", text: "Wi-Fi gratis, kupon diskon, check-in. Semuanya minta email lagi. Simpan email kamu di Cutling, nanti di kolom email langsung muncul paling atas.", yt: "Nggak perlu ngetik email di tiap form" },
  { id: "I06", lang: "id", app: "Undirect", film: "u-ipad", text: "Nonton di iPad, tiap pencet play kebuka tab \"iPhone kamu diretas\". Undirect jalan juga di Safari iPad, belinya cukup sekali.", yt: "Tab \"iPhone kamu diretas\" di iPad" },
  { id: "I07", lang: "id", app: "Cutling", film: "cutling-android", text: "Pindah dari Android dan kangen clip yang bisa di-pin di Gboard? Di iPhone, Cutling naruh teks yang sering kamu tempel langsung di keyboard. Cutling nggak merekam apa yang kamu salin.", yt: "Kangen pin clip Gboard di iPhone?" },
  { id: "I08", lang: "id", app: "Undirect", film: "u1", text: "Pencet play, muncul peringatan VPN. Pencet lagi, \"iPhone kamu kena 12 virus\". Pencet lagi, kotak hadiah. Semua itu dari situsnya, bukan dari HP kamu, dan Undirect nahan semuanya.", yt: "Tiap pencet play kebuka iklan baru" },
  { id: "I09", lang: "id", app: "Cutling", film: "cutling-sync", text: "Text Replacement jalan di iPhone, tapi di iPad \"addr\" ya tetap \"addr\". Yang kamu simpan di Cutling nyambung lewat iCloud kamu sendiri, jadi muncul juga di keyboard iPad.", yt: "Text Replacement nggak nyambung ke iPad" },
  { id: "I10", lang: "id", app: "Undirect", film: "Dad", text: "Ayah chat: \"hp aku katanya ada 12 virus??\" Ternyata situs film gratis lagi. Aku pasangin Undirect di iPhone-nya, sekarang filmnya langsung jalan.", yt: "Tiap minggu jadi tukang servis HP ayah" },
  { id: "I11", lang: "id", app: "Cutling", film: "cutling-share", text: "Nemu alamat atau link di Safari? Bagikan ke Cutling, kasih nama, dan lain kali tinggal tap dari keyboard.", yt: "Simpan dari Safari ke keyboard" },
  { id: "I12", lang: "id", app: "Undirect", film: "Quiz", text: "Tiga tombol Download, cuma satu yang asli. Dengan Undirect nyala, yang palsu nggak ke mana-mana.", yt: "Mana tombol download yang asli?" },
  { id: "I13", lang: "id", app: "Cutling", film: "cutling-address-field", text: "Di video ini, alamat yang sama diketik 214 kali setahun. Simpan alamatmu sekali di Cutling, terus tinggal tap di form mana aja.", yt: "Alamat yang sama diketik 214 kali" },
  { id: "I14", lang: "id", app: "Undirect", film: "und-id-preview", text: "Link-nya diubah setelah kamu pencet? Undirect balikin ke yang benar, dan alamat yang dicoba tercatat di daftarnya.", yt: "Link diubah setelah dipencet" },
  { id: "I15", lang: "id", app: "Cutling", film: "cutling-address-short", text: "Keyboard-nya cukup ditambah sekali di Pengaturan. Habis itu pindah ke Cutling lewat tombol bola dunia, terus tap teks yang sudah kamu simpan.", yt: "Pasang keyboard Cutling sekali aja" },
  { id: "I16", lang: "id", app: "Undirect", film: "AdPov", text: "POV: kamu iklannya di situs film gratis. Tiap mereka pencet play, kamu buka tab baru. Begitu Undirect nyala, nggak ada yang nyampe.", yt: "POV: kamu iklan di situs film gratis" },
  { id: "I17", lang: "id", app: "Cutling", film: "cutling-mac-history", text: "Di Mac, salin hal kedua dan yang pertama hilang. Riwayat salinan Cutling untuk Mac masih nyimpen, dan password yang ditandai pengelola password nggak ikut tersimpan.", yt: "Salinan di Mac hilang? Ada riwayatnya" },
];

export const AR: LangUnit[] = [
  { id: "A01", lang: "ar", app: "Undirect", film: "u1", text: "كل ما ضغطت تشغيل، انفتح لك تبويب إعلان جديد؟ فيه طبقة مخفية فوق زر التشغيل تاخذ ضغطتك. Undirect يشيلها في سفاري على الآيفون والآيباد والماك، ويدعم العربية." },
  { id: "A02", lang: "ar", app: "Undirect", help: true, text: "إذا طلعت لك صفحة تقول \"جهازك مصاب بفيروس\"، جهازك سليم. الصفحة جاية من الموقع اللي كنت فيه. سكّر التبويب، ولا تثبّت شيء ولا تتصل بأي رقم." },
  { id: "A03", lang: "ar", app: "Undirect", sale: true, text: "عرض الجمعة البيضاء: Undirect بـ 0.99$ بدل 1.99$ لين 30 نوفمبر. يوقف التبويبات والتحويلات اللي تفتحها الصفحة من ضغطتك في سفاري." },
  { id: "A04", lang: "ar", app: "Undirect", sale: true, film: "u2", text: "تضغط زر التحميل وتطلع لك صفحة تحميل مزيفة؟ مع Undirect تبقى في نفس الصفحة. سعره الحين 0.99$ لفترة محدودة." },
  { id: "A05", lang: "ar", app: "Undirect", sale: true, film: "u-ipad", text: "حتى على الآيباد: كل ضغطة تشغيل تفتح تبويب \"تم اختراق جهازك\". Undirect يشتغل في سفاري على الآيباد بنفس الشراء، و0.99$ لين نهاية 30 نوفمبر." },
  { id: "A06", lang: "ar", app: "Undirect", sale: true, text: "آخر يوم لسعر 0.99$ على Undirect، وبعدها يرجع 1.99$. شراء واحد يكفي للآيفون والآيباد والماك." },
  { id: "A07", lang: "ar", app: "Undirect", film: "Quiz", text: "ثلاث أزرار تحميل، واحد بس حقيقي. مع Undirect، الأزرار المزيفة ما توديك لأي مكان." },
  { id: "A08", lang: "ar", app: "Undirect", help: true, text: "زر \"حظر النوافذ المنبثقة\" في إعدادات سفاري ما يوقف كل التبويبات، لأنه يسمح بالتبويب اللي ينفتح بعد ضغطتك مباشرة، والصفحة تقدر تخلّي أي ضغطة تبان كأنها منك." },
  { id: "A09", lang: "ar", app: "Undirect", film: "AdPov", text: "تخيّل إنك الإعلان في موقع أفلام مجاني: كل ضغطة تشغيل تفتح تبويب جديد. لما شغّلوا Undirect، ما وصل شيء." },
  { id: "A10", lang: "ar", app: "Undirect", film: "Dad", text: "أبوي يرسل: \"جوالي فيه 12 فيروس؟\" وكالعادة السبب موقع أفلام مجاني. ركّبت له Undirect وفعّلته لهذا الموقع، والحين الفيلم يشتغل على طول." },
  { id: "A11", lang: "ar", app: "Undirect", help: true, text: "إذا انفتحت عندك عشرات التبويبات في سفاري، اضغط مطوّلاً على زر التبويبات واختر إغلاق كل التبويبات." },
  { id: "A12", lang: "ar", app: "Undirect", help: true, text: "سكّرت تبويب بالغلط في سفاري على الماك؟ اضغط Shift-Command-T ويرجع لك." },
];

// New English posts that help a stranger with no pitch (text only, X and Threads).
export const EN_HELP: LangUnit[] = [
  { id: "H01", lang: "en", app: "Cutling", help: true, text: "Copy on your iPhone, paste on your Mac, and nothing arrives? Universal Clipboard needs both signed in to the same Apple ID, with Wi-Fi, Bluetooth and Handoff on, and the two close together.", q: "Does Universal Clipboard work for you?" },
  { id: "H02", lang: "en", app: "Cutling", help: true, text: "iPhone tip: Settings, General, Keyboard, Text Replacement. Give your address a short code like \"addr\" and it expands as you type. It holds plain text only.", q: "What's the one phrase you'd give a shortcut?" },
  { id: "H03", lang: "en", app: "Cutling", help: true, text: "Tired of \"Allow Paste?\" every time? Settings, Apps, pick the app, then Paste from Other Apps, and set it to Allow.", q: "Which app asks you this the most?" },
  { id: "H04", lang: "en", app: "Undirect", help: true, text: "A site added calendar events that say your iPhone is infected? Your phone is fine. In Settings, open Calendar, then its accounts, and remove the subscribed calendar you don't recognise.", q: "Has a site ever slipped events into your calendar?" },
  { id: "H05", lang: "en", app: "Undirect", help: true, text: "Forty tabs from one movie site? In Safari, press and hold the tabs button and choose Close All Tabs.", q: "How many tabs do you have open right now?" },
  { id: "H06", lang: "en", app: "Undirect", help: true, text: "Back keeps landing on the ad? Press and hold Safari's back arrow. It lists every page behind you, so you can jump straight past the ad.", q: "Which site has trapped your Back button?" },
  { id: "H07", lang: "en", app: "Undirect", help: true, text: "Closed a tab by mistake in Safari on your Mac? Shift-Command-T brings it back.", q: "What's your most-used Safari shortcut?" },
  { id: "H08", lang: "en", app: "Cutling", help: true, text: "Hold the space bar on your iPhone keyboard and it turns into a trackpad, so you can drag the cursor straight to the typo.", q: "Did you know this one?" },
  { id: "H09", lang: "en", app: "Undirect", help: true, text: "Safari on iPhone has a Fraudulent Website Warning: Settings, Apps, Safari. With it on, Safari warns you before a page Apple knows is a scam.", q: "Is yours switched on?" },
  { id: "H10", lang: "en", app: "Undirect", help: true, text: "Tapped Allow on a site's notification prompt by mistake? On a Mac: Safari, Settings, Websites, Notifications, then set that site to Deny.", q: "Which site talked you into notifications?" },
  { id: "H11", lang: "en", app: "Cutling", help: true, text: "Your iPhone clipboard holds one thing at a time. Need two? Paste the first into Notes before you copy the second.", q: "What did you last lose to the clipboard?" },
  { id: "H12", lang: "en", app: "Cutling", help: true, text: "Typing your email into every form? Safari can fill it: Settings, Apps, Safari, AutoFill, turn on Use Contact Info and choose your own card.", q: "Do you use AutoFill, or type it every time?" },
  { id: "H13", lang: "en", app: "Undirect", help: true, text: "Deep in a long page on your iPhone? Tap the very top edge of the screen and it jumps back to the top.", q: "Did you know this one?" },
  { id: "H14", lang: "en", app: "Cutling", help: true, text: "On a Mac, copy a file in Finder with Command-C, then press Option-Command-V. It moves the file instead of making a copy.", q: "What's your favourite Finder shortcut?" },
];

// Traditional Chinese (Taiwan), Threads only, a four-week trial. Taiwan wording: 分頁, 剪貼簿, 鍵盤.
export const ZH: LangUnit[] = [
  { id: "T01", lang: "zh", app: "Cutling", film: "cutling-address", text: "每次結帳都要重打一次地址？把地址存進 Cutling 一次，之後在任何 App 的鍵盤上點一下就填好。", q: "你一個月要打幾次地址？" },
  { id: "T02", lang: "zh", app: "Undirect", film: "u1", text: "按下播放，跳出來的卻是廣告分頁？那是網頁在播放鍵上蓋了一層看不見的圖層。Undirect 會拿掉這層，讓你按到真正的播放鍵。", q: "你最常被哪種網站亂開分頁？" },
  { id: "T03", lang: "zh", app: "Undirect", help: true, text: "看到「你的 iPhone 中毒了」的頁面先別慌，那是網站自己顯示的，手機沒事。關掉分頁，不要安裝、撥打電話或付款。", q: "你家人有被這種畫面嚇到過嗎？" },
  { id: "T05", lang: "zh", app: "Undirect", film: "u2", text: "按下載，跳出來的卻是假的下載頁面，接著還要你訂閱行事曆。在那個網站開啟 Undirect，就會留在原本的頁面。", q: "你遇過假的下載按鈕嗎？" },
  { id: "T04", lang: "zh", app: "Cutling", film: "cutling-mac-history", text: "在 Mac 上又複製了一次，剛才那段就不見了。Cutling 的 Mac 版會保留剪貼簿紀錄，密碼管理器標記為隱藏的內容不會留下。", q: "你最近有沒有不小心蓋掉剛複製的東西？" },
];
