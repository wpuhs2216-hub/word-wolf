import type { WordPair, Theme, HiddenThemeGroup } from '../types/game';

// 裏テーマ別の話題提示データ
const TOPIC_SUGGESTIONS: Record<string, string[]> = {
    // ---------------------------------------------------------
    // 汎用・抽象（どのお題でも使える質問）
    // ※議論のメインとなるため、大幅にバリエーションを強化
    // ---------------------------------------------------------
    '汎用・抽象': [
        // 五感・物理的特性
        'イメージカラーは何色が思い浮かびますか？',
        '触った時の感触（テクスチャ）はどんな感じですか？',
        '重さはどれくらいですか？（片手サイズ、持てないくらい等）',
        '大きさはどれくらいですか？身近なもので例えると？',
        '形はどんな形状をしていますか？（丸い、四角い、不定形等）',
        '匂いはありますか？あるとしたらどんな匂いですか？',
        '音は出ますか？どんな音がしますか？',
        'それは「液体」「固体」「気体」のどれに近いですか？',
        '温度はありますか？（温かい、冷たい、常温）',
        'もし落としたら割れたり壊れたりしますか？',

        // 入手・価値
        '普段、どこに置いてあることが多いですか？（場所）',
        'だいたい幾らくらいで手に入りますか？（価格帯）',
        'コンビニ、スーパー、ネット、どこで買うのが一般的ですか？',
        'それは「消耗品」ですか？それとも「一生モノ」ですか？',
        'それをプレゼントとして贈ることはありますか？',
        'もし売るとしたら、高く売れますか？',
        '持っていると「お金持ち」に見えますか？',
        '流行り廃り（トレンド）はありますか？',

        // 使用・行動
        'どんな人がよく使いますか？（子供、大人、特定の職業など）',
        'それを使う（見る）のにおすすめの季節や時間はありますか？',
        'それは「一人」で楽しむものですか？「みんな」で楽しむものですか？',
        '毎日使いますか？それとも特別な時だけですか？',
        'それを使うには、練習や知識が必要ですか？',
        'それがないと困るシチュエーションはどんな時ですか？',
        '自分の家（部屋）に、今現在それはありますか？',
        'それを使う時、充電や電池は必要ですか？',
        'それをしている時、周りの人から声をかけられやすいですか？',

        // 抽象・イメージ
        'もし無人島に持っていくとしたら、役に立ちますか？',
        'それを漢字で書くと、どんな文字が含まれますか？',
        'それを一言で表すなら、どんな形容詞が合いますか？',
        'それは「自然」にあるものですか？「人工的」なものですか？',
        'それを持っていると、周りからどう思われますか？（おしゃれ、真面目など）',
        'それは日本ならではのものですか？海外にもありますか？',
        '100年前（昔）にもそれは存在していましたか？',
        '好きな人はすごく好きだけど、嫌いな人もいるものですか？',
        'テレビやYouTubeでよく見かけるものですか？',
        'それは歴史の教科書に出てきそうなものですか？',
        'それを見ると、テンションが上がりますか？下がりますか？',
        'それは「平和」なイメージですか？「戦い」のイメージですか？'
    ],

    // ---------------------------------------------------------
    // カテゴリ特化質問（鋭い質問）
    // ※ウルフを追い詰めるための具体的・物理的な質問
    // ---------------------------------------------------------

    // --- 食べ物系 ---
    'ハンバーガーチェーン': ['メインの食材は「パン」に挟まれていますか？', 'セットでポテトを頼むのが一般的ですか？', '食べる時に手が汚れる可能性はありますか？'],
    '牛丼屋': ['紅生姜を乗せて食べることが多いですか？', '箸を使って食べますか？', '「つゆだく」という注文ができますか？'],
    'カレーチェーン': ['辛さを選ぶことができますか？', 'スプーンを使って食べますか？', '福神漬けは合いますか？'], // NEW
    'カフェチェーン': ['コーヒーの香りがする場所ですか？', 'PCを開いて作業している人を見かけますか？', 'トレイ（お盆）に乗せて席まで運びますか？'],
    '回転寿司': ['お皿の色や柄によって値段が変わりますか？', 'わさびと一緒に食べますか？', 'レーンに乗って流れてきますか？'],
    '中華料理チェーン': ['餃子が有名なメニューですか？', '床が少し滑りやすいイメージがありますか？', 'レンゲを使いますか？'], // NEW
    '炭酸飲料': ['振ってから開けると大変なことになりますか？', '色は透明ですか？それとも黒っぽいですか？', '喉越しはシュワシュワしますか？'],
    '調味料': ['料理に「かける」ものですか？', '色は「黒」または「茶色」ですか？', '冷蔵庫に入れて保存しますか？'],
    '焼肉の部位': ['網の上で焼いて食べますか？', 'レモン汁につけて食べますか？', '脂身（あぶらみ）は多い部分ですか？'],
    '麺類': ['食べる時に音を立てても許されますか？', 'お湯（スープ）に入っていますか？', '箸やフォークを使って食べますか？'],
    'アイスの味': ['色は「茶色」系ですか？', 'フルーツの味がしますか？', '少し苦味がありますか？'], // NEW
    '和菓子': ['あんこが入っていますか？', '緑茶と一緒に食べたいですか？', 'お餅を使っていますか？'],
    '洋菓子': ['生クリームが使われていますか？', 'フォークやスプーンで食べますか？', '誕生日やイベントで食べることが多いですか？'],
    '果物': ['皮をむいて食べますか？', '種はありますか？', '木になっているものですか？'],
    'お酒': ['炭酸で割って飲むことが多いですか？', '色は透明に近いですか？', '温めて飲むことはありますか？'],
    'パン': ['焼きたての匂いは香ばしいですか？', 'ジャムやバターを塗りますか？', '朝食として食べることが多いですか？'],
    '卵料理': ['殻を割る工程が必要ですか？', '黄色と白の色合いですか？', 'フライパンを使って調理しますか？'],

    // --- 生活系 ---
    'コンビニ': ['24時間営業していることが多いですか？', 'お弁当やおにぎりが売っていますか？', '看板の色に「青」は入っていますか？'],
    '携帯キャリア': ['毎月料金を支払うものですか？', 'CMで「犬」が出てきますか？', 'イメージカラーは「赤」ですか？'],
    '銀行': ['ATMでお金を引き出せますか？', 'イメージカラーは「赤」ですか？', '看板に植物の名前が入っていますか？'], // NEW
    'SNS': ['「いいね」ボタンがありますか？', '写真や動画がメインのアプリですか？', '文章（テキスト）がメインですか？'],
    '乗り物': ['タイヤはついていますか？', '空を飛びますか？', '切符やICカードが必要ですか？'],
    'キッチン用品': ['火を使うものですか？', '食材を切るためのものですか？', '洗剤で洗いますか？'], // NEW
    '季節': ['雪が降る時期ですか？', '半袖で過ごせますか？', '桜が咲く時期ですか？'],
    '天気': ['傘が必要ですか？', '洗濯物は外に干せますか？', '空は青いですか？'],
    'ペット': ['「散歩」が必要な動物ですか？', '「ワン」または「ニャー」と鳴きますか？', 'ケージや水槽の中で飼いますか？'],
    'デジタル家電': ['画面（ディスプレイ）はついていますか？', '充電が必要ですか？', 'インターネットに繋がりますか？'],
    '家具': ['その上で寝ることができますか？', '木でできていることが多いですか？', '引き出しはついていますか？'],
    'ファストファッション': ['セルフレジが導入されていますか？', '試着室はありますか？', 'ハンガーにかかっていますか？'],
    '職業': ['制服やユニフォームを着ますか？', '国家資格が必要ですか？', '夜勤はありますか？'],
    '支払い方法': ['スマホをかざして支払いますか？', '小銭やお札を使いますか？', 'ポイントは貯まりますか？'],
    'キャンプ用品': ['屋外で寝泊まりするために使いますか？', '火を扱うものですか？', '組み立てが必要ですか？'], // NEW

    // --- エンタメ系 ---
    'ジブリ映画': ['空を飛ぶシーンはありますか？', '主人公は女の子ですか？', '名前に「と」がつきますか？'],
    '国民的アニメ': ['日曜日の夕方に放送されていますか？', '主人公は小学生ですか？', '家族みんなで住んでいる設定ですか？'],
    'ゲーム機': ['テレビに繋いで遊びますか？', 'コントローラーを持って操作しますか？', '持ち運びはできますか？'],
    'カードゲーム': ['トランプを使いますか？', '手札を持って戦いますか？', 'お金を賭けるイメージがありますか？'], // NEW
    'YouTuberジャンル': ['何かを食べている動画ですか？', 'ゲーム画面が映っていますか？', 'ドッキリを仕掛けますか？'], // NEW
    '映画ジャンル': ['見ていてドキドキ・ハラハラしますか？', '笑えるシーンが多いですか？', 'お化けや怪物は出てきますか？'],
    '音楽ジャンル': ['歌詞（言葉）は入っていますか？', '激しいリズムですか？', '踊りたくなるような曲調ですか？'],
    'スポーツ': ['ボールを使う競技ですか？', 'チームで戦いますか？', '屋外で行うことが多いですか？'],
    '楽器': ['息を吹き込んで音を出しますか？', '弦（げん）はありますか？', '座って演奏しますか？'],
    'RPGの職業': ['剣や盾を装備できますか？', '魔法を使えますか？', '味方を回復する役割ですか？'],
    'ディズニーキャラ': ['耳は丸いですか？', 'アヒルやクマがモチーフですか？', 'プリンセスですか？'],

    // --- 学校系 ---
    '学校行事': ['クラス対抗で戦いますか？', '校外（学校の外）に行きますか？', 'お弁当が必要ですか？'],
    '教科': ['計算が必要ですか？', '実験室に移動しますか？', '漢字をたくさん書きますか？'],
    '文房具': ['間違えたら消すことができますか？', '芯（しん）やインクの補充が必要ですか？', '筆箱に入りますか？'],
    '学校の場所': ['本がたくさん置いてありますか？', '上履きのまま入れますか？', '運動するための場所ですか？'],
    '学校での行動': ['先生に見つかると怒られますか？', '授業中にこっそりやることですか？', 'お昼休みにすることですか？'],
    '遊具': ['高く漕いで遊びますか？', '上から滑り降りますか？', '砂場の中にありますか？'], // NEW

    // --- 恋愛系 ---
    'デートスポット': ['暗い場所ですか？', '入場料が必要ですか？', '静かにしなければならない場所ですか？'],
    '関係性': ['血が繋がっていますか？', '一緒に住んでいることが多いですか？', '別れる可能性がありますか？'],
    '別れの理由': ['相手の浮気が原因ですか？', 'お金の問題ですか？', '遠距離が原因ですか？'], // NEW
    'カップルの行動': ['身体が触れ合いますか？', '人前でやるのは恥ずかしいですか？', 'お揃いのものを身につけますか？'],
    '好きなタイプ': ['見た目（顔や身長）に関することですか？', '性格（優しさや面白さ）に関することですか？', 'お金に関することですか？'],
    '胸キュン仕草': ['壁際で行うものですか？', '頭に触れるものですか？', '後ろから抱きしめるものですか？'],

    // --- その他系 ---
    '日本の地方': ['雪がたくさん降る地域ですか？', '海に面していますか？', '新幹線は通っていますか？'],
    '国': ['アジアの国ですか？', '英語が通じますか？', 'ピザやパスタが有名ですか？'],
    '色': ['信号機に使われている色ですか？', '明るい色ですか？', '海や空の色に近いですか？'],
    '日常の動作': ['目は閉じて行いますか？', '音が出ますか？', '1日に何回もしますか？'],
    '感情': ['涙が出そうになりますか？', '声を出して笑いたくなりますか？', '顔が赤くなりますか？'],
    '形': ['角（かど）はありますか？', 'ボールのような形ですか？', '先が尖っていますか？'],
    'イベント': ['ケーキを食べる習慣がありますか？', 'プレゼントを交換しますか？', '冬に行われるイベントですか？'],

    // --- アダルト系 ---
    'プレイ': ['身体を縛ったりしますか？', '言葉で相手を攻めるものですか？', '屋外でするものですか？'],
    'おもちゃ': ['電池を使って動くものですか？', '振動しますか？', '挿入して使うものですか？'],
    'フェチ(ハード)': ['排泄物に関係することですか？', '匂いに関係することですか？', '一般的な性癖からは外れていますか？'],
    'シチュエーション(ハード)': ['3人以上で行うものですか？', '合意のない設定（無理やり）ですか？', 'パートナー以外の人としますか？'],
    '感触': ['濡れていますか？', '突起のようなものですか？', '奥の方にありますか？'],
    '体液': ['赤色ですか？', '白い色ですか？', '勢いよく出るものですか？'],
    '行為': ['口を使いますか？', 'お尻を使いますか？', '胸を使いますか？']
};

const HIDDEN_THEME_GROUPS: HiddenThemeGroup[] = [
    // ---------------------------------------------------------
    // Food (食べ物)
    // ---------------------------------------------------------
    {
        id: 'food_burger',
        mainCategory: 'food',
        hiddenThemeLabel: 'ハンバーガーチェーン',
        words: ['マクドナルド', 'モスバーガー', 'バーガーキング', 'ロッテリア', 'フレッシュネスバーガー', 'ドムドムハンバーガー', 'シェイクシャック']
    },
    {
        id: 'food_gyudon',
        mainCategory: 'food',
        hiddenThemeLabel: '牛丼屋',
        words: ['吉野家', 'すき家', '松屋', 'なか卯', '東京チカラめし']
    },
    {
        id: 'food_curry', // NEW
        mainCategory: 'food',
        hiddenThemeLabel: 'カレーチェーン',
        words: ['CoCo壱番屋', 'ゴーゴーカレー', 'C&C', '日乃屋カレー']
    },
    {
        id: 'food_cafe',
        mainCategory: 'food',
        hiddenThemeLabel: 'カフェチェーン',
        words: ['スターバックス', 'ドトール', 'タリーズ', 'コメダ珈琲', 'サンマルクカフェ', 'ベローチェ', '星乃珈琲店']
    },
    {
        id: 'food_sushi',
        mainCategory: 'food',
        hiddenThemeLabel: '回転寿司',
        words: ['スシロー', 'くら寿司', 'はま寿司', 'かっぱ寿司', '魚べい', '銚子丸']
    },
    {
        id: 'food_chinese', // NEW
        mainCategory: 'food',
        hiddenThemeLabel: '中華料理チェーン',
        words: ['餃子の王将', '日高屋', 'バーミヤン', '大阪王将', '幸楽苑']
    },
    {
        id: 'food_soda',
        mainCategory: 'food',
        hiddenThemeLabel: '炭酸飲料',
        words: ['コーラ', 'サイダー', 'ファンタ', 'ジンジャーエール', '三ツ矢サイダー', 'ドクターペッパー', 'CCレモン']
    },
    {
        id: 'food_seasoning',
        mainCategory: 'food',
        hiddenThemeLabel: '調味料',
        words: ['醤油', 'ソース', 'マヨネーズ', 'ケチャップ', '塩胡椒', 'ポン酢', 'わさび', 'ラー油']
    },
    {
        id: 'food_yakiniku',
        mainCategory: 'food',
        hiddenThemeLabel: '焼肉の部位',
        words: ['タン', 'カルビ', 'ロース', 'ハラミ', 'ホルモン', 'レバー', 'ミノ']
    },
    {
        id: 'food_noodle',
        mainCategory: 'food',
        hiddenThemeLabel: '麺類',
        words: ['ラーメン', 'うどん', 'そば', 'パスタ', '焼きそば', 'そうめん', '冷やし中華']
    },
    {
        id: 'food_ice_flavor', // NEW
        mainCategory: 'food',
        hiddenThemeLabel: 'アイスの味',
        words: ['バニラ', 'チョコレート', '抹茶', 'ストロベリー', 'チョコミント', 'ソーダ']
    },
    {
        id: 'food_jp_sweets',
        mainCategory: 'food',
        hiddenThemeLabel: '和菓子',
        words: ['どら焼き', 'たい焼き', '団子', '饅頭', '大福', '羊羹', 'カステラ']
    },
    {
        id: 'food_western_sweets',
        mainCategory: 'food',
        hiddenThemeLabel: '洋菓子',
        words: ['ショートケーキ', 'チーズケーキ', 'プリン', 'シュークリーム', 'ドーナツ', 'マカロン', 'エクレア']
    },
    {
        id: 'food_fruit',
        mainCategory: 'food',
        hiddenThemeLabel: '果物',
        words: ['りんご', 'みかん', 'バナナ', 'ぶどう', 'いちご', '桃', '梨', 'スイカ']
    },
    {
        id: 'food_alcohol',
        mainCategory: 'food',
        hiddenThemeLabel: 'お酒',
        words: ['ビール', 'ワイン', '日本酒', 'ハイボール', '焼酎', '梅酒', 'ウイスキー', 'レモンサワー']
    },
    {
        id: 'food_bread',
        mainCategory: 'food',
        hiddenThemeLabel: 'パン',
        words: ['食パン', 'フランスパン', 'クロワッサン', 'メロンパン', 'カレーパン', 'クリームパン', 'あんパン']
    },
    {
        id: 'food_egg',
        mainCategory: 'food',
        hiddenThemeLabel: '卵料理',
        words: ['目玉焼き', '卵焼き', 'スクランブルエッグ', 'ゆで卵', 'オムレツ', '親子丼']
    },

    // ---------------------------------------------------------
    // Lifestyle (生活)
    // ---------------------------------------------------------
    {
        id: 'life_conbini',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: 'コンビニ',
        words: ['セブンイレブン', 'ローソン', 'ファミリーマート', 'ミニストップ', 'デイリーヤマザキ', 'セイコーマート']
    },
    {
        id: 'life_carrier',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: '携帯キャリア',
        words: ['docomo', 'au', 'SoftBank', '楽天モバイル', 'Y!mobile', 'UQ mobile']
    },
    {
        id: 'life_bank', // NEW
        mainCategory: 'lifestyle',
        hiddenThemeLabel: '銀行',
        words: ['三菱UFJ銀行', '三井住友銀行', 'みずほ銀行', 'ゆうちょ銀行', 'りそな銀行']
    },
    {
        id: 'life_sns',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: 'SNS',
        words: ['Twitter(X)', 'Instagram', 'TikTok', 'Facebook', 'LINE', 'Threads']
    },
    {
        id: 'life_transport',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: '乗り物',
        words: ['電車', 'バス', 'タクシー', '自転車', '飛行機', '船', '新幹線']
    },
    {
        id: 'life_kitchen', // NEW
        mainCategory: 'lifestyle',
        hiddenThemeLabel: 'キッチン用品',
        words: ['包丁', 'まな板', 'フライパン', '鍋', 'お玉', '菜箸']
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
        words: ['晴れ', '雨', '曇り', '雪', '雷', '台風']
    },
    {
        id: 'life_pet',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: 'ペット',
        words: ['犬', '猫', 'ハムスター', 'ウサギ', 'インコ', '金魚', 'カメ']
    },
    {
        id: 'life_electronics',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: 'デジタル家電',
        words: ['テレビ', 'パソコン', 'スマートフォン', 'タブレット', 'スマートウォッチ', 'ワイヤレスイヤホン']
    },
    {
        id: 'life_furniture',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: '家具',
        words: ['ベッド', 'ソファー', 'テーブル', '椅子', 'タンス', '本棚']
    },
    {
        id: 'life_clothing',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: 'ファストファッション',
        words: ['ユニクロ', 'GU', 'ZARA', 'H&M', 'しまむら', 'GAP']
    },
    {
        id: 'life_camp', // NEW
        mainCategory: 'lifestyle',
        hiddenThemeLabel: 'キャンプ用品',
        words: ['テント', '寝袋', 'バーベキューコンロ', 'ランタン', '折りたたみ椅子']
    },
    {
        id: 'life_job',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: '職業',
        words: ['医者', '弁護士', '警察官', '消防士', 'パイロット', 'YouTuber', '教師', '看護師']
    },
    {
        id: 'life_payment',
        mainCategory: 'lifestyle',
        hiddenThemeLabel: '支払い方法',
        words: ['現金', 'クレジットカード', 'PayPay', 'Suica', 'iD', 'QUICPay']
    },

    // ---------------------------------------------------------
    // Entertainment (エンタメ)
    // ---------------------------------------------------------
    {
        id: 'ent_ghibli',
        mainCategory: 'entertainment',
        hiddenThemeLabel: 'ジブリ映画',
        words: ['となりのトトロ', '千と千尋の神隠し', '天空の城ラピュタ', '魔女の宅急便', 'もののけ姫', 'ハウルの動く城', '紅の豚']
    },
    {
        id: 'ent_anime',
        mainCategory: 'entertainment',
        hiddenThemeLabel: '国民的アニメ',
        words: ['ドラえもん', 'サザエさん', 'ちびまる子ちゃん', 'クレヨンしんちゃん', '名探偵コナン', 'ワンピース', 'アンパンマン']
    },
    {
        id: 'ent_console',
        mainCategory: 'entertainment',
        hiddenThemeLabel: 'ゲーム機',
        words: ['Nintendo Switch', 'PlayStation', 'Xbox', 'PC(Steam)', 'ニンテンドーDS', 'ゲームボーイ']
    },
    {
        id: 'ent_cardgame', // NEW
        mainCategory: 'entertainment',
        hiddenThemeLabel: 'カードゲーム',
        words: ['トランプ', 'UNO', 'ポーカー', '大富豪', 'ババ抜き']
    },
    {
        id: 'ent_youtuber', // NEW
        mainCategory: 'entertainment',
        hiddenThemeLabel: 'YouTuberジャンル',
        words: ['ゲーム実況', '大食い', 'やってみた系', 'ドッキリ', '商品紹介', 'メイク動画']
    },
    {
        id: 'ent_movie_genre',
        mainCategory: 'entertainment',
        hiddenThemeLabel: '映画ジャンル',
        words: ['アクション', '恋愛', 'ホラー', 'コメディ', 'SF', 'ドキュメンタリー', 'アニメ']
    },
    {
        id: 'ent_music_genre',
        mainCategory: 'entertainment',
        hiddenThemeLabel: '音楽ジャンル',
        words: ['J-POP', 'K-POP', 'ロック', 'ヒップホップ', 'アニソン', '演歌', 'クラシック']
    },
    {
        id: 'ent_sports',
        mainCategory: 'entertainment',
        hiddenThemeLabel: 'スポーツ',
        words: ['サッカー', '野球', 'バスケットボール', 'テニス', 'バレーボール', '卓球', '水泳']
    },
    {
        id: 'ent_instrument',
        mainCategory: 'entertainment',
        hiddenThemeLabel: '楽器',
        words: ['ピアノ', 'ギター', 'ドラム', 'バイオリン', 'トランペット', 'フルート', 'ベース']
    },
    {
        id: 'ent_rpg_job',
        mainCategory: 'entertainment',
        hiddenThemeLabel: 'RPGの職業',
        words: ['勇者', '戦士', '魔法使い', '僧侶', '盗賊', '武闘家', '遊び人']
    },
    {
        id: 'ent_disney',
        mainCategory: 'entertainment',
        hiddenThemeLabel: 'ディズニーキャラ',
        words: ['ミッキーマウス', 'ドナルドダック', 'くまのプーさん', 'スティッチ', 'アナ/エルサ', 'チップとデール']
    },

    // ---------------------------------------------------------
    // School (学校)
    // ---------------------------------------------------------
    {
        id: 'school_event',
        mainCategory: 'school',
        hiddenThemeLabel: '学校行事',
        words: ['運動会', '文化祭', '修学旅行', '合唱コンクール', '卒業式', '入学式', 'マラソン大会']
    },
    {
        id: 'school_subject',
        mainCategory: 'school',
        hiddenThemeLabel: '教科',
        words: ['数学', '英語', '国語', '理科', '社会', '体育', '音楽', '美術']
    },
    {
        id: 'school_stationery',
        mainCategory: 'school',
        hiddenThemeLabel: '文房具',
        words: ['鉛筆', '消しゴム', 'ボールペン', '定規', 'ハサミ', 'コンパス', '蛍光ペン']
    },
    {
        id: 'school_playground', // NEW
        mainCategory: 'school',
        hiddenThemeLabel: '遊具',
        words: ['ブランコ', '滑り台', 'ジャングルジム', '鉄棒', 'シーソー', '砂場']
    },
    {
        id: 'school_place',
        mainCategory: 'school',
        hiddenThemeLabel: '学校の場所',
        words: ['教室', '図書室', '保健室', '体育館', '屋上', '理科室', '音楽室']
    },
    {
        id: 'school_action',
        mainCategory: 'school',
        hiddenThemeLabel: '学校での行動',
        words: ['居眠り', '早弁', '手紙回し', '挙手', '黒板消し', '掃除', '日直']
    },

    // ---------------------------------------------------------
    // Love (恋愛)
    // ---------------------------------------------------------
    {
        id: 'love_date',
        mainCategory: 'love',
        hiddenThemeLabel: 'デートスポット',
        words: ['映画館', '遊園地', '水族館', '動物園', 'レストラン', '公園', '夜景スポット']
    },
    {
        id: 'love_relation',
        mainCategory: 'love',
        hiddenThemeLabel: '関係性',
        words: ['恋人', '友達', '夫婦', '片思い', '元恋人', '幼馴染', 'セフレ']
    },
    {
        id: 'love_breakup', // NEW
        mainCategory: 'love',
        hiddenThemeLabel: '別れの理由',
        words: ['浮気', '価値観の違い', '遠距離', '仕事が忙しい', '好きな人ができた', '束縛']
    },
    {
        id: 'love_action',
        mainCategory: 'love',
        hiddenThemeLabel: 'カップルの行動',
        words: ['手をつなぐ', 'ハグする', 'キスする', 'ペアルック', 'プレゼント交換', '同棲', 'プロポーズ']
    },
    {
        id: 'love_type',
        mainCategory: 'love',
        hiddenThemeLabel: '好きなタイプ',
        words: ['優しい人', '面白い人', 'お金持ち', 'イケメン/美女', '誠実な人', '家庭的な人']
    },
    {
        id: 'love_gesture',
        mainCategory: 'love',
        hiddenThemeLabel: '胸キュン仕草',
        words: ['壁ドン', '頭ポンポン', 'あごクイ', '袖クル', '耳つぶ', 'バックハグ']
    },

    // ---------------------------------------------------------
    // Other (その他)
    // ---------------------------------------------------------
    {
        id: 'other_japan_region',
        mainCategory: 'other',
        hiddenThemeLabel: '日本の地方',
        words: ['北海道', '関東', '関西', '九州', '沖縄', '東北', '四国']
    },
    {
        id: 'other_country',
        mainCategory: 'other',
        hiddenThemeLabel: '国',
        words: ['日本', 'アメリカ', '中国', '韓国', 'フランス', 'イタリア', 'イギリス', 'ブラジル']
    },
    {
        id: 'other_color',
        mainCategory: 'other',
        hiddenThemeLabel: '色',
        words: ['赤', '青', '黄色', '緑', '黒', '白', '紫', 'ピンク']
    },
    {
        id: 'other_action',
        mainCategory: 'other',
        hiddenThemeLabel: '日常の動作',
        words: ['あくび', 'くしゃみ', '深呼吸', '伸び', '瞬き', '貧乏ゆすり']
    },
    {
        id: 'other_emotion',
        mainCategory: 'other',
        hiddenThemeLabel: '感情',
        words: ['笑う', '泣く', '怒る', '驚く', '喜ぶ', '焦る', '照れる']
    },
    {
        id: 'other_shape',
        mainCategory: 'other',
        hiddenThemeLabel: '形',
        words: ['丸', '三角', '四角', '星型', 'ハート型', 'ひし形']
    },
    {
        id: 'other_event',
        mainCategory: 'other',
        hiddenThemeLabel: 'イベント',
        words: ['誕生日', 'クリスマス', 'ハロウィン', 'バレンタイン', 'お正月', 'お盆', 'ゴールデンウィーク']
    },

    // ---------------------------------------------------------
    // Adult (アダルト)
    // ---------------------------------------------------------
    {
        id: 'adult_play',
        mainCategory: 'adult',
        hiddenThemeLabel: 'プレイ',
        words: ['放置プレイ', '拘束プレイ', '野外プレイ', '言葉責め', '寸止め', 'スパンキング']
    },
    {
        id: 'adult_toy',
        mainCategory: 'adult',
        hiddenThemeLabel: 'おもちゃ',
        words: ['バイブ', 'ローター', '電マ', 'アナルビーズ', 'オナホール', 'ダッチワイフ']
    },
    {
        id: 'adult_fetish_hard',
        mainCategory: 'adult',
        hiddenThemeLabel: 'フェチ(ハード)',
        words: ['スカトロ', '黄金', '食糞', '放尿', '飲尿', 'おむつ']
    },
    {
        id: 'adult_situation_hard',
        mainCategory: 'adult',
        hiddenThemeLabel: 'シチュエーション(ハード)',
        words: ['乱交', '輪姦', '近親相姦', '寝取られ(NTR)', 'レイプ', '痴漢']
    },
    {
        id: 'adult_body_sensation',
        mainCategory: 'adult',
        hiddenThemeLabel: '感触',
        words: ['クリトリス', 'Gスポット', '前立腺', '乳首', '子宮口', '金玉']
    },
    {
        id: 'adult_fluid',
        mainCategory: 'adult',
        hiddenThemeLabel: '体液',
        words: ['精液', '愛液', '潮吹き', '母乳', '生理血', '唾液']
    },
    {
        id: 'adult_action_hard',
        mainCategory: 'adult',
        hiddenThemeLabel: '行為',
        words: ['フェラチオ', 'クンニリングス', 'パイズリ', 'イラマチオ', 'アナルセックス', 'シックスナイン', '顔射']
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
        return 'お題についてどう思う？';
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
            // [${hiddenThemeLabel}] 表記を削除
            return `${hiddenThemeLabel}についてどう思う？`;
        }
    }

    // 使用済み質問をフィルタリング
    const availableTopics = topics.filter(topic => !usedHints.includes(topic));
    const selectFrom = availableTopics.length > 0 ? availableTopics : topics;

    return selectFrom[Math.floor(Math.random() * selectFrom.length)];
};