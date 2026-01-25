import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Button } from './ui/Button';
import { Plus, Minus, User } from 'lucide-react';
import { getRandomWordPair, THEMES } from '../utils/wordPairs';
import { motion } from 'framer-motion';
import type { Theme } from '../types/game';

import logo from '../assets/title_logo.png';

export const SetupScreen = () => {
    const { dispatch } = useGame();
    const [playerCount, setPlayerCount] = useState(3);
    const [names, setNames] = useState<string[]>(Array(3).fill(''));
    const [selectedTheme, setSelectedTheme] = useState<Theme | 'all'>('all');
    const [secretCount, setSecretCount] = useState(0);
    const [isSecretMode, setIsSecretMode] = useState(false);

    const handleLogoClick = () => {
        const newCount = secretCount + 1;
        setSecretCount(newCount);
        if (newCount >= 5) {
            setIsSecretMode(!isSecretMode);
            setSecretCount(0);
            if (!isSecretMode) {
                setSelectedTheme('adult');
            } else {
                setSelectedTheme('all');
            }
        }
    };

    const handleCountChange = (delta: number) => {
        const newCount = Math.max(3, Math.min(10, playerCount + delta));
        setPlayerCount(newCount);
        setNames(prev => {
            if (newCount > prev.length) {
                return [...prev, ''];
            } else {
                return prev.slice(0, newCount);
            }
        });
    };

    const handleNameChange = (index: number, value: string) => {
        const newNames = [...names];
        newNames[index] = value;
        setNames(newNames);
    };

    const handleStart = () => {
        const finalNames = names.map((name, i) => name.trim() || `プレイヤー ${i + 1}`);
        dispatch({ type: 'SET_PLAYERS', payload: finalNames });

        const wordPair = getRandomWordPair(selectedTheme);
        const wolfIndex = Math.floor(Math.random() * playerCount);

        dispatch({
            type: 'START_GAME',
            payload: { wordPair, wolfIndex }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex flex-col h-full p-6 transition-colors duration-500 ${isSecretMode ? 'bg-pink-50' : ''}`}
        >
            <div className="text-center mb-6 pt-2 flex flex-col items-center">
                <motion.img
                    src={logo}
                    alt="Word Wolf Logo"
                    className={`w-48 h-auto mb-2 object-contain drop-shadow-lg cursor-pointer transition-all duration-300 ${isSecretMode ? 'drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]' : ''}`}
                    onClick={handleLogoClick}
                    whileTap={{ scale: 0.95 }}
                />
                <p className={`text-xs transition-colors duration-300 ${isSecretMode ? 'text-pink-600 font-bold' : 'text-gray-500'}`}>
                    {isSecretMode ? '♥ えぐしゅぎモード中 ♥' : '友達と盛り上がろう！'}
                </p>
            </div>

            <div className={`bg-white/50 rounded-2xl p-4 mb-4 shadow-sm border transition-colors duration-300 ${isSecretMode ? 'border-pink-300 shadow-pink-100' : 'border-white/50'}`}>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 font-medium text-sm">参加人数</span>
                    <span className="text-xl font-bold text-gray-800">{playerCount}人</span>
                </div>
                <div className="flex items-center justify-center space-x-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCountChange(-1)}
                        disabled={playerCount <= 3}
                    >
                        <Minus size={16} />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCountChange(1)}
                        disabled={playerCount >= 10}
                    >
                        <Plus size={16} />
                    </Button>
                </div>
            </div>

            <div className={`bg-white/50 rounded-2xl p-4 mb-4 shadow-sm border transition-colors duration-300 ${isSecretMode ? 'border-pink-300 shadow-pink-100' : 'border-white/50'}`}>
                <div className="mb-2">
                    <span className="text-gray-600 font-medium text-sm">テーマ選択</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {isSecretMode ? (
                        <button
                            onClick={() => setSelectedTheme('adult')}
                            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 bg-pink-500 text-white shadow-md"
                        >
                            えぐしゅぎ
                        </button>
                    ) : (
                        THEMES.map((theme) => (
                            <button
                                key={theme.id}
                                onClick={() => setSelectedTheme(theme.id)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${selectedTheme === theme.id
                                    ? 'bg-blue-500 text-white shadow-md scale-105'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {theme.label}
                            </button>
                        ))
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-1 -mr-1">
                {Array.from({ length: playerCount }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`flex items-center space-x-3 bg-white p-2.5 rounded-xl shadow-sm border transition-colors duration-300 ${isSecretMode ? 'border-pink-100' : 'border-gray-100'}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isSecretMode ? 'bg-pink-100 text-pink-600' : 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600'}`}>
                            <User size={16} />
                        </div>
                        <input
                            type="text"
                            placeholder={`プレイヤー ${i + 1}`}
                            value={names[i] || ''}
                            onChange={(e) => handleNameChange(i, e.target.value)}
                            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 font-medium text-base"
                        />
                    </motion.div>
                ))}
            </div>

            <Button
                size="lg"
                className={`w-full shadow-lg transition-colors duration-300 ${isSecretMode ? 'bg-pink-500 hover:bg-pink-600 shadow-pink-500/20' : 'shadow-blue-500/20'}`}
                onClick={handleStart}
            >
                ゲーム開始
            </Button>
        </motion.div>
    );
};
