import type { WordPair, Theme } from '../types/game';

const WORD_PAIRS: WordPair[] = [
    // Food
    { citizen: 'りんご', wolf: 'みかん', theme: 'food' },
    { citizen: 'コーヒー', wolf: '紅茶', theme: 'food' },
    { citizen: 'ピザ', wolf: 'ハンバーガー', theme: 'food' },
    { citizen: 'うどん', wolf: 'そば', theme: 'food' },
    { citizen: 'マクドナルド', wolf: 'モスバーガー', theme: 'food' },
    { citizen: 'きのこの山', wolf: 'たけのこの里', theme: 'food' },
    { citizen: '焼肉', wolf: 'しゃぶしゃぶ', theme: 'food' },
    { citizen: 'カレー', wolf: 'シチュー', theme: 'food' },

    // Lifestyle / Daily
    { citizen: '車', wolf: '自転車', theme: 'lifestyle' },
    { citizen: '夏', wolf: '冬', theme: 'lifestyle' },
    { citizen: '海', wolf: 'プール', theme: 'lifestyle' },
    { citizen: '犬', wolf: '猫', theme: 'lifestyle' },
    { citizen: 'お風呂', wolf: 'シャワー', theme: 'lifestyle' },
    { citizen: 'LINE', wolf: 'Instagram', theme: 'lifestyle' },

    // Entertainment
    { citizen: '映画', wolf: 'ドラマ', theme: 'entertainment' },
    { citizen: 'ギター', wolf: 'バイオリン', theme: 'entertainment' },
    { citizen: 'ドラえもん', wolf: 'クレヨンしんちゃん', theme: 'entertainment' },
    { citizen: 'YouTube', wolf: 'Netflix', theme: 'entertainment' },
    { citizen: 'ディズニーランド', wolf: 'USJ', theme: 'entertainment' },

    // Love
    { citizen: '初デートで映画', wolf: '初デートで遊園地', theme: 'love' },
    { citizen: '告白する', wolf: '告白される', theme: 'love' },
    { citizen: '遠距離恋愛', wolf: '同棲', theme: 'love' },
    { citizen: '恋人', wolf: '親友', theme: 'love' },

    // School
    { citizen: '数学', wolf: '英語', theme: 'school' },
    { citizen: '文化祭', wolf: '体育祭', theme: 'school' },
    { citizen: '給食', wolf: 'お弁当', theme: 'school' },
    { citizen: '部活', wolf: '勉強', theme: 'school' },
];

export const THEMES: { id: Theme | 'all'; label: string }[] = [
    { id: 'all', label: 'すべて' },
    { id: 'food', label: '食べ物' },
    { id: 'lifestyle', label: '生活' },
    { id: 'entertainment', label: 'エンタメ' },
    { id: 'love', label: '恋愛' },
    { id: 'school', label: '学校' },
];

export const getRandomWordPair = (theme: Theme | 'all' = 'all'): WordPair => {
    let candidates = WORD_PAIRS;
    if (theme !== 'all') {
        candidates = WORD_PAIRS.filter(pair => pair.theme === theme);
    }

    // Fallback if no pairs found for theme (shouldn't happen with current data)
    if (candidates.length === 0) {
        candidates = WORD_PAIRS;
    }

    const index = Math.floor(Math.random() * candidates.length);
    return candidates[index];
};
