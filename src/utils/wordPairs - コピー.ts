import type { WordPair, Theme, HiddenThemeGroup } from '../types/game';

// 裏テーマ別の話題提示データ
const TOPIC_SUGGESTIONS: Record<string, string[]> = {
    // 汎用・抽象（どのお題でも使える質問）
    '汎用・抽象': [
        'イメージカラーは何色が思い浮かびますか？',
        '触った時の感触（テクスチャ）はどんな感じですか？',
        '重さはどれくらいですか？（片手サイズ、持てないくらい等）',
        '大きさはどれくらいですか？身近なもので例えると？',
        '形はどんな形状をしていますか？（丸い、四角い、不定形等）',
        '匂いはありますか？あるとしたらどんな匂いですか？',
        '音は出ますか？どんな音がしますか？',
        '普段、どこに置いてあることが多いですか？（場所）',
        'だいたい幾らくらいで手に入りますか？（価格帯）',
        'どんな人がよく使いますか？（子供、大人、特定の職業など）',
        'それを使う（見る）のにおすすめの季節や時間はありますか？',
        'もし無人島に持っていくとしたら、役に立ちますか？',
        'それを漢字で書くと、どんな文字が含まれますか？',
        'それがないと困るシチュエーションはどんな時ですか？',
        'コンビニ、スーパー、ネット、どこで買うのが一般的ですか？',
        'それを一言で表すなら、どんな形容詞が合いますか？',
        'それは「消耗品」ですか？それとも「一生モノ」ですか？',
        'それは「自然」にあるものですか？「人工的」なものですか？',
        'それを持っていると、周りからどう思われますか？（おしゃれ、真面目など）',
        'それをプレゼントとして贈ることはありますか？',
        'それは「一人」で楽しむものですか？「みんな」で楽しむものですか？',
        'もしそれを落としたら、どうなりますか？（割れる、弾む、怒られる等）',
        'それは日本ならではのものですか？海外にもありますか？',
        '100年前（昔）にもそれは存在していましたか？',
        '好きな人はすごく好きだけど、嫌いな人もいるものですか？',
        '自分の家（部屋）に、今現在それはありますか？',
        'テレビやYouTubeでよく見かけるものですか？',
        'それは歴史の教科書に出てきそうなものですか？'
    ],

    // 食べ物系
    'ハンバーガーチェーン': ['[ハンバーガーチェーン] 一番好きなメニューは？', '[ハンバーガーチェーン] 値段はいくらくらい？', '[ハンバーガーチェーン] よく行く？'],
    '牛丼屋': ['[牛丼屋] 値段は？', '[牛丼屋] トッピングは何がある？', '[牛丼屋] いつ行く？'],
    'カフェチェーン': ['[カフェチェーン] 飲み物の種類は？', '[カフェチェーン] 何時に行く？', '[カフェチェーン] 何を注文する？'],
    '回転寿司': ['[回転寿司] 一皿いくら？', '[回転寿司] 好きなネタは？', '[回転寿司] 何皿食べる？'],
    '炭酸飲料': ['[炭酸飲料] 甘い？', '[炭酸飲料] どこで買う？', '[炭酸飲料] 何色？'],
    '調味料': ['[調味料] 何にかける？', '[調味料] 色は？', '[調味料] 辛い？'],
    '焼肉の部位': ['[焼肉の部位] どこの部分？', '[焼肉の部位] 柔らかい？', '[焼肉の部位] タレは何？'],
    '麺類': ['[麺類] 温かい？冷たい？', '[麺類] スープの色は？', '[麺類] トッピングは？'],
    '和菓子': ['[和菓子] 甘い？', '[和菓子] 中身は何？', '[和菓子] いつ食べる？'],
    '洋菓子': ['[洋菓子] 甘い？', '[洋菓子] クリームある？', '[洋菓子] どこで買う？'],
    '果物': ['[果物] 色は？', '[果物] 甘い？酸っぱい？', '[果物] 種はある？'],
    'お酒': ['[お酒] 度数は？', '[お酒] 色は？', '[お酒] 何で割る？'],
    'パン': ['[パン] 甘い？しょっぱい？', '[パン] 中身は何？', '[パン] いつ食べる？'],
    '卵料理': ['[卵料理] 作り方は？', '[卵料理] いつ食べる？', '[卵料理] 味付けは？'],

    // 生活系
    'コンビニ': ['[コンビニ] 何色？', '[コンビニ] どこにある？', '[コンビニ] 何時まで開いてる？'],
    '携帯キャリア': ['[携帯キャリア] 料金は？', '[携帯キャリア] CMは誰？', '[携帯キャリア] 何色のイメージ？'],
    'SNS': ['[SNS] 何を投稿する？', '[SNS] 誰が使ってる？', '[SNS] アイコンの色は？'],
    '乗り物': ['[乗り物] 速い？', '[乗り物] 何人乗れる？', '[乗り物] いくら？'],
    '季節': ['[季節] 暑い？寒い？', '[季節] 何月？', '[季節] 何する？'],
    '天気': ['[天気] 好き？嫌い？', '[天気] 何する？', '[天気] どう感じる？'],
    'ペット': ['[ペット] 大きい？', '[ペット] 何を食べる？', '[ペット] どこにいる？'],
    'デジタル家電': ['[デジタル家電] 何に使う？', '[デジタル家電] 大きさは？', '[デジタル家電] いくら？'],
    '家具': ['[家具] どこに置く？', '[家具] 大きい？', '[家具] 何に使う？'],
    'ファストファッション': ['[ファストファッション] 何色？', '[ファストファッション] 値段は？', '[ファストファッション] どこにある？'],
    '職業': ['[職業] どこで働く？', '[職業] 何する？', '[職業] 大変？'],
    '支払い方法': ['[支払い方法] どこで使う？', '[支払い方法] 便利？', '[支払い方法] 使ったことある？'],

    // エンタメ系
    'ジブリ映画': ['[ジブリ映画] 主人公は誰？', '[ジブリ映画] いつの作品？', '[ジブリ映画] 見たことある？'],
    '国民的アニメ': ['[国民的アニメ] 主人公は？', '[国民的アニメ] 何時にやってる？', '[国民的アニメ] 好きなキャラは？'],
    'ゲーム機': ['[ゲーム機] どこの会社？', '[ゲーム機] 持ってる？', '[ゲーム機] いくら？'],
    '映画ジャンル': ['[映画ジャンル] 好き？', '[映画ジャンル] どんな気分の時に見る？', '[映画ジャンル] おすすめは？'],
    '音楽ジャンル': ['[音楽ジャンル] 誰が歌う？', '[音楽ジャンル] いつ聞く？', '[音楽ジャンル] 好き？'],
    'スポーツ': ['[スポーツ] 何人でやる？', '[スポーツ] どこでやる？', '[スポーツ] ボール使う？'],
    '楽器': ['[楽器] 大きい？', '[楽器] どうやって音を出す？', '[楽器] 弾ける？'],
    'RPGの職業': ['[RPGの職業] 強い？', '[RPGの職業] 何を使う？', '[RPGの職業] どんな役割？'],
    'ディズニーキャラ': ['[ディズニーキャラ] 何色？', '[ディズニーキャラ] 動物？人間？', '[ディズニーキャラ] 好き？'],

    // 学校系
    '学校行事': ['[学校行事] いつある？', '[学校行事] 何する？', '[学校行事] 楽しい？'],
    '教科': ['[教科] 好き？嫌い？', '[教科] 何を勉強する？', '[教科] 難しい？'],
    '文房具': ['[文房具] 何に使う？', '[文房具] 大きさは？', '[文房具] 毎日使う？'],
    '学校の場所': ['[学校の場所] 何する場所？', '[学校の場所] よく行く？', '[学校の場所] 何階にある？'],
    '学校での行動': ['[学校での行動] いつする？', '[学校での行動] したことある？', '[学校での行動] 先生に怒られる？'],

    // 恋愛系
    'デートスポット': ['[デートスポット] どこ？', '[デートスポット] 何する？', '[デートスポット] 行ったことある？'],
    '関係性': ['[関係性] 近い？遠い？', '[関係性] どう思う？', '[関係性] なりたい？'],
    'カップルの行動': ['[カップルの行動] どこでする？', '[カップルの行動] したことある？', '[カップルの行動] 恥ずかしい？'],
    '好きなタイプ': ['[好きなタイプ] 大事？', '[好きなタイプ] 自分は？', '[好きなタイプ] 好き？'],
    '胸キュン仕草': ['[胸キュン仕草] やられたい？', '[胸キュン仕草] キュンとする？', '[胸キュン仕草] されたことある？'],

    // その他系
    '日本の地方': ['[日本の地方] 行ったことある？', '[日本の地方] 何が有名？', '[日本の地方] 暖かい？寒い？'],
    '国': ['[国] 行ったことある？', '[国] 何語？', '[国] 何が有名？'],
    '色': ['[色] 好き？', '[色] 何に使われてる？', '[色] 明るい？暗い？'],
    '日常の動作': ['[日常の動作] よくする？', '[日常の動作] いつする？', '[日常の動作] 気持ちいい？'],
    '感情': ['[感情] いつなる？', '[感情] どう感じる？', '[感情] よくある？'],
    '形': ['[形] どこで見る？', '[形] 好き？', '[形] 描ける？'],
    'イベント': ['[イベント] いつ？', '[イベント] 何する？', '[イベント] 好き？'],

    // アダルト系
    'プレイ': ['[プレイ] したことある？', '[プレイ] どこでする？', '[プレイ] 好き？'],
    'おもちゃ': ['[おもちゃ] 持ってる？', '[おもちゃ] 何に使う？', '[おもちゃ] 大きさは？'],
    'フェチ(ハード)': ['[フェチ] 興味ある？', '[フェチ] どう思う？', '[フェチ] やったことある？'],
    'シチュエーション(ハード)': ['[シチュエーション] 興味ある？', '[シチュエーション] どこで？', '[シチュエーション] したい？'],
    '感触': ['[感触] どこ？', '[感触] 気持ちいい？', '[感触] 好き？'],
    '体液': ['[体液] 何色？', '[体液] どこから？', '[体液] どう思う？'],
    '行為': ['[行為] したことある？', '[行為] 好き？', '[行為] どう感じる？']
};

const HIDDEN_THEME_GROUPS: HiddenThemeGroup[] = [
    // Food
    {
        id: 'food_burger',
        mainCategory: 'food',
        hiddenThemeLabel: 'ハンバーガーチェーン',
        words: ['マクドナルド', 'モスバーガー', 'バーガーキング', 'ロッテリア', 'フレッシュネスバーガー']
    },
    {
        id: 'food_gyudon',
        mainCategory: 'food',
        hiddenThemeLabel: '牛丼屋',
        words: ['吉野家', 'すき家', '松屋', 'なか卯']
    },
    {
        id: 'food_cafe',
        mainCategory: 'food',
        hiddenThemeLabel: 'カフェチェーン',
        words: ['スターバックス', 'ドトール', 'タリーズ', 'コメダ珈琲', 'サンマルクカフェ']
    },
    {
        id: 'food_sushi',
        mainCategory: 'food',
        hiddenThemeLabel: '回転寿司',
        words: ['スシロー', 'くら寿司', 'はま寿司', 'かっぱ寿司']
    },
    {
        id: 'food_soda',
        mainCategory: 'food',
        hiddenThemeLabel: '炭酸飲料',
        words: ['コーラ', 'サイダー', 'ファンタ', 'ジンジャーエール', '三ツ矢サイダー']
    },
    {
        id: 'food_seasoning',
        mainCategory: 'food',
        hiddenThemeLabel: '調味料',
        words: ['醤油', 'ソース', 'マヨネーズ', 'ケチャップ', '塩胡椒', 'ポン酢']
    },
    {
        id: 'food_yakiniku',
        mainCategory: 'food',
        hiddenThemeLabel: '焼肉の部位',
        words: ['タン', 'カルビ', 'ロース', 'ハラミ', 'ホルモン']
    },
    {
        id: 'food_noodle',
        mainCategory: 'food',
        hiddenThemeLabel: '麺類',
        words: ['ラーメン', 'うどん', 'そば', 'パスタ', '焼きそば']
    },
    {
        id: 'food_jp_sweets',
        mainCategory: 'food',
        hiddenThemeLabel: '和菓子',
        words: ['どら焼き', 'たい焼き', '団子', '饅頭', '大福']
    },
    {
        id: 'food_western_sweets',
        mainCategory: 'food',
        hiddenThemeLabel: '洋菓子',
        words: ['ショートケーキ', 'チーズケーキ', 'プリン', 'シュークリーム', 'ドーナツ']
    },
    {
        id: 'food_fruit',
        mainCategory: 'food',
        hiddenThemeLabel: '果物',
        words: ['りんご', 'みかん', 'バナナ', 'ぶどう', 'いちご', '桃']
    },
    {
        id: 'food_alcohol',
        mainCategory: 'food',
        hiddenThemeLabel: 'お酒',
        words: ['ビール', 'ワイン', '日本酒', 'ハイボール', '焼酎', '梅酒']
    },
    {
        id: 'food_bread',
        mainCategory: 'food',
        hiddenThemeLabel: 'パン',
        words: ['食パン', 'フランスパン', 'クロワッサン', 'メロンパン', 'カレーパン']
    },
    {
        id: 'food_egg',
        mainCategory: 'food',
        hiddenThemeLabel: '卵料理',
        words: ['目玉焼き', '卵焼き', 'スクランブルエッグ', 'ゆで卵', 'オムレツ']
    },

    // Lifestyle
    {
        id: 'life_conbini',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: 'コンビニ',
        words: ['セブンイレブン', 'ローソン', 'ファミリーマート', 'ミニストップ']
    },
    {
        id: 'life_carrier',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: '携帯キャリア',
        words: ['docomo', 'au', 'SoftBank', '楽天モバイル']
    },
    {
        id: 'life_sns',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: 'SNS',
        words: ['Twitter(X)', 'Instagram', 'TikTok', 'Facebook', 'LINE']
    },
    {
        id: 'life_transport',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: '乗り物',
        words: ['電車', 'バス', 'タクシー', '自転車', '飛行機']
    },
    {
        id: 'life_season',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: '季節',
        words: ['春', '夏', '秋', '冬']
    },
    {
        id: 'life_weather',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: '天気',
        words: ['晴れ', '雨', '曇り', '雪', '雷']
    },
    {
        id: 'life_pet',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: 'ペット',
        words: ['犬', '猫', 'ハムスター', 'ウサギ', 'インコ']
    },
    {
        id: 'life_electronics',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: 'デジタル家電',
        words: ['テレビ', 'パソコン', 'スマートフォン', 'タブレット']
    },
    {
        id: 'life_furniture',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: '家具',
        words: ['ベッド', 'ソファー', 'テーブル', '椅子', 'タンス']
    },
    {
        id: 'life_clothing',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: 'ファストファッション',
        words: ['ユニクロ', 'GU', 'ZARA', 'H&M', 'しまむら']
    },
    {
        id: 'life_job',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: '職業',
        words: ['医者', '弁護士', '警察官', '消防士', 'パイロット', 'YouTuber']
    },
    {
        id: 'life_payment',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: '支払い方法',
        words: ['現金', 'クレジットカード', 'PayPay', 'Suica', 'iD']
    },

    // Entertainment
    {
        id: 'ent_ghibli',
        mainCategory: 'entertainment',
        hiddenThemeLabel: 'ジブリ映画',
        words: ['となりのトトロ', '千と千尋の神隠し', '天空の城ラピュタ', '魔女の宅急便', 'もののけ姫']
    },
    {
        id: 'ent_anime',
        mainCategory: 'entertainment',
        hiddenThemeLabel: '国民的アニメ',
        words: ['ドラえもん', 'サザエさん', 'ちびまる子ちゃん', 'クレヨンしんちゃん', '名探偵コナン']
    },
    {
        id: 'ent_console',
        mainCategory: 'entertainment',
        hiddenThemeLabel: 'ゲーム機',
        words: ['Nintendo Switch', 'PlayStation', 'Xbox', 'PC(Steam)']
    },
    {
        id: 'ent_movie_genre',
        mainCategory: 'entertainment',
        hiddenThemeLabel: '映画ジャンル',
        words: ['アクション', '恋愛', 'ホラー', 'コメディ', 'SF']
    },
    {
        id: 'ent_music_genre',
        mainCategory: 'entertainment',
        hiddenThemeLabel: '音楽ジャンル',
        words: ['J-POP', 'K-POP', 'ロック', 'ヒップホップ', 'アニソン']
    },
    {
        id: 'ent_sports',
        mainCategory: 'entertainment',
        hiddenThemeLabel: 'スポーツ',
        words: ['サッカー', '野球', 'バスケットボール', 'テニス', 'バレーボール']
    },
    {
        id: 'ent_instrument',
        mainCategory: 'entertainment',
        hiddenThemeLabel: '楽器',
        words: ['ピアノ', 'ギター', 'ドラム', 'バイオリン', 'トランペット']
    },
    {
        id: 'ent_rpg_job',
        mainCategory: 'entertainment',
        hiddenThemeLabel: 'RPGの職業',
        words: ['勇者', '戦士', '魔法使い', '僧侶', '盗賊']
    },
    {
        id: 'ent_disney',
        mainCategory: 'entertainment',
        hiddenThemeLabel: 'ディズニーキャラ',
        words: ['ミッキーマウス', 'ドナルドダック', 'くまのプーさん', 'スティッチ', 'アナ/エルサ']
    },

    // School
    {
        id: 'school_event',
        mainCategory: 'school',
        hiddenThemeLabel: '学校行事',
        words: ['運動会', '文化祭', '修学旅行', '合唱コンクール', '卒業式']
    },
    {
        id: 'school_subject',
        mainCategory: 'school',
        hiddenThemeLabel: '教科',
        words: ['数学', '英語', '国語', '理科', '社会', '体育']
    },
    {
        id: 'school_stationery',
        mainCategory: 'school',
        hiddenThemeLabel: '文房具',
        words: ['鉛筆', '消しゴム', 'ボールペン', '定規', 'ハサミ']
    },
    {
        id: 'school_place',
        mainCategory: 'school',
        hiddenThemeLabel: '学校の場所',
        words: ['教室', '図書室', '保健室', '体育館', '屋上']
    },
    {
        id: 'school_action',
        mainCategory: 'school',
        hiddenThemeLabel: '学校での行動',
        words: ['居眠り', '早弁', '手紙回し', '挙手', '黒板消し']
    },

    // Love
    {
        id: 'love_date',
        mainCategory: 'love',
        hiddenThemeLabel: 'デートスポット',
        words: ['映画館', '遊園地', '水族館', '動物園', 'レストラン']
    },
    {
        id: 'love_relation',
        mainCategory: 'love',
        hiddenThemeLabel: '関係性',
        words: ['恋人', '友達', '夫婦', '片思い', '元恋人']
    },
    {
        id: 'love_action',
        mainCategory: 'love',
        hiddenThemeLabel: 'カップルの行動',
        words: ['手をつなぐ', 'ハグする', 'キスする', 'ペアルック', 'プレゼント交換']
    },
    {
        id: 'love_type',
        mainCategory: 'love',
        hiddenThemeLabel: '好きなタイプ',
        words: ['優しい人', '面白い人', 'お金持ち', 'イケメン/美女', '誠実な人']
    },
    {
        id: 'love_gesture',
        mainCategory: 'love',
        hiddenThemeLabel: '胸キュン仕草',
        words: ['壁ドン', '頭ポンポン', 'あごクイ', '袖クル', '耳つぶ']
    },

    // Other
    {
        id: 'other_japan_region',
        mainCategory: 'other',
        hiddenThemeLabel: '日本の地方',
        words: ['北海道', '関東', '関西', '九州', '沖縄']
    },
    {
        id: 'other_country',
        mainCategory: 'other',
        hiddenThemeLabel: '国',
        words: ['日本', 'アメリカ', '中国', '韓国', 'フランス', 'イタリア']
    },
    {
        id: 'other_color',
        mainCategory: 'other',
        hiddenThemeLabel: '色',
        words: ['赤', '青', '黄色', '緑', '黒', '白']
    },
    {
        id: 'other_action',
        mainCategory: 'other',
        hiddenThemeLabel: '日常の動作',
        words: ['あくび', 'くしゃみ', '深呼吸', '伸び', '瞬き']
    },
    {
        id: 'other_emotion',
        mainCategory: 'other',
        hiddenThemeLabel: '感情',
        words: ['笑う', '泣く', '怒る', '驚く', '喜ぶ']
    },
    {
        id: 'other_shape',
        mainCategory: 'other',
        hiddenThemeLabel: '形',
        words: ['丸', '三角', '四角', '星型', 'ハート型']
    },
    {
        id: 'other_event',
        mainCategory: 'other',
        hiddenThemeLabel: 'イベント',
        words: ['誕生日', 'クリスマス', 'ハロウィン', 'バレンタイン', 'お正月']
    },

    // Adult
    {
        id: 'adult_play',
        mainCategory: 'adult',
        hiddenThemeLabel: 'プレイ',
        words: ['放置プレイ', '拘束プレイ', '野外プレイ', '言葉責め', '寸止め']
    },
    {
        id: 'adult_toy',
        mainCategory: 'adult',
        hiddenThemeLabel: 'おもちゃ',
        words: ['バイブ', 'ローター', '電マ', 'アナルビーズ', 'オナホール']
    },
    {
        id: 'adult_fetish_hard',
        mainCategory: 'adult',
        hiddenThemeLabel: 'フェチ(ハード)',
        words: ['スカトロ', '黄金', '食糞', '放尿', '飲尿']
    },
    {
        id: 'adult_situation_hard',
        mainCategory: 'adult',
        hiddenThemeLabel: 'シチュエーション(ハード)',
        words: ['乱交', '輪姦', '近親相姦', '寝取られ(NTR)', 'レイプ']
    },
    {
        id: 'adult_body_sensation',
        mainCategory: 'adult',
        hiddenThemeLabel: '感触',
        words: ['クリトリス', 'Gスポット', '前立腺', '乳首', '子宮口']
    },
    {
        id: 'adult_fluid',
        mainCategory: 'adult',
        hiddenThemeLabel: '体液',
        words: ['精液', '愛液', '潮吹き', '母乳', '生理血']
    },
    {
        id: 'adult_action_hard',
        mainCategory: 'adult',
        hiddenThemeLabel: '行為',
        words: ['フェラチオ', 'クンニリングス', 'パイズリ', 'イラマチオ', 'アナルセックス']
    }
];

export const THEMES: { id: Theme | 'all'; label: string }[] = [
    { id: 'all', label: 'すべて' },
    { id: 'food', label: '食べ物' },
    { id: 'lifestyle', label: '生活' },
    { id: 'entertainment', label: 'エンタメ' },
    { id: 'love', label: '恋愛' },
    { id: 'school', label: '学校' },
    { id: 'other', label: 'その他' },
];

export const getRandomWordPair = (theme: Theme | 'all' = 'all'): WordPair => {
    let candidates = HIDDEN_THEME_GROUPS;

    if (theme === 'all') {
        // 「すべて」選択時はアダルトカテゴリを除外
        candidates = HIDDEN_THEME_GROUPS.filter(group => group.mainCategory !== 'adult');
    } else {
        candidates = HIDDEN_THEME_GROUPS.filter(group => group.mainCategory === theme);
    }

    if (candidates.length === 0) {
        // フォールバック: アダルト以外のテーマ
        candidates = HIDDEN_THEME_GROUPS.filter(group => group.mainCategory !== 'adult');
    }

    const groupIndex = Math.floor(Math.random() * candidates.length);
    const selectedGroup = candidates[groupIndex];

    const shuffledWords = [...selectedGroup.words].sort(() => 0.5 - Math.random());
    const word1 = shuffledWords[0];
    const word2 = shuffledWords[1];

    return {
        citizen: word1,
        wolf: word2,
        theme: selectedGroup.mainCategory,
        hiddenThemeLabel: selectedGroup.hiddenThemeLabel
    };
};

export const getTopicSuggestion = (hiddenThemeLabel?: string, usedHints: string[] = []): string => {
    if (!hiddenThemeLabel) {
        return '[一般] お題についてどう思う？';
    }

    // 90%の確率で汎用質問、10%の確率でテーマ特化質問
    const useGeneric = Math.random() < 0.9;

    let topics: string[];

    if (useGeneric) {
        // 汎用・抽象カテゴリから選択
        topics = TOPIC_SUGGESTIONS['汎用・抽象'] || [];
    } else {
        // テーマ特化質問から選択
        topics = TOPIC_SUGGESTIONS[hiddenThemeLabel] || [];
    }

    // フォールバック: 選択したカテゴリに質問がない場合
    if (topics.length === 0) {
        // 汎用質問を試す
        topics = TOPIC_SUGGESTIONS['汎用・抽象'] || [];
        if (topics.length === 0) {
            return `[${hiddenThemeLabel}] お題についてどう思う？`;
        }
    }

    // 使用済み質問をフィルタリング
    const availableTopics = topics.filter(topic => !usedHints.includes(topic));
    const selectFrom = availableTopics.length > 0 ? availableTopics : topics;

    return selectFrom[Math.floor(Math.random() * selectFrom.length)];
};