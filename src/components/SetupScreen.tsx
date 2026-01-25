import { useGame } from '../context/GameContext';
import { Button } from './ui/Button';
import { Plus, Minus, User, PawPrint } from 'lucide-react';
import { getRandomWordPair, THEMES } from '../utils/wordPairs';
import { motion } from 'framer-motion';
import type { Theme } from '../types/game';
import { useState } from 'react';

import logo from '../assets/title_logo.png';

export const SetupScreen = () => {
    const { state, dispatch } = useGame();
    const { settings } = state;
    const [secretCount, setSecretCount] = useState(0);
    const [isSecretMode, setIsSecretMode] = useState(false);

    const handleLogoClick = () => {
        const newCount = secretCount + 1;
        setSecretCount(newCount);
        if (newCount >= 5) {
            setIsSecretMode(!isSecretMode);
            setSecretCount(0);
            if (!isSecretMode) {
                dispatch({ type: 'UPDATE_SETTINGS', payload: { theme: 'adult' } });
            } else {
                dispatch({ type: 'UPDATE_SETTINGS', payload: { theme: 'all' } });
            }
        }
    };

    const handleCountChange = (delta: number) => {
        const newCount = Math.max(3, Math.min(10, settings.playerCount + delta));

        // Adjust wolf count if it exceeds limit (playerCount - 2)
        const maxWolves = Math.max(1, newCount - 2);
        const newWolfCount = Math.min(settings.wolfCount, maxWolves);

        let newNames = [...settings.playerNames];
        if (newCount > newNames.length) {
            newNames = [...newNames, ''];
        } else {
            newNames = newNames.slice(0, newCount);
        }

        dispatch({
            type: 'UPDATE_SETTINGS',
            payload: {
                playerCount: newCount,
                playerNames: newNames,
                wolfCount: newWolfCount
            }
        });
    };

    const handleWolfCountChange = (delta: number) => {
        const maxWolves = Math.max(1, settings.playerCount - 2);
        const newCount = Math.max(1, Math.min(maxWolves, settings.wolfCount + delta));
        dispatch({ type: 'UPDATE_SETTINGS', payload: { wolfCount: newCount } });
    };

    const handleNameChange = (index: number, value: string) => {
        const newNames = [...settings.playerNames];
        newNames[index] = value;
        dispatch({ type: 'UPDATE_SETTINGS', payload: { playerNames: newNames } });
    };

    const handleThemeChange = (theme: Theme | 'all') => {
        dispatch({ type: 'UPDATE_SETTINGS', payload: { theme } });
    };

    const handleStart = () => {
        const wordPair = getRandomWordPair(settings.theme);

        // Generate unique random indices for wolves
        const wolfIndices: number[] = [];
        while (wolfIndices.length < settings.wolfCount) {
            const r = Math.floor(Math.random() * settings.playerCount);
            if (!wolfIndices.includes(r)) {
                wolfIndices.push(r);
            }
        }

        dispatch({
            type: 'START_GAME',
            payload: { wordPair, wolfIndices }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex flex-col h-full overflow-y-auto p-6 transition-colors duration-500 ${isSecretMode ? 'bg-pink-50' : ''}`}
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
                {/* Player Count */}
                <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 font-medium text-sm">参加人数</span>
                    <span className="text-xl font-bold text-gray-800">{settings.playerCount}人</span>
                </div>
                <div className="flex items-center justify-center space-x-4 mb-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCountChange(-1)}
                        disabled={settings.playerCount <= 3}
                    >
                        <Minus size={16} />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCountChange(1)}
                        disabled={settings.playerCount >= 10}
                    >
                        <Plus size={16} />
                    </Button>
                </div>

                {/* Wolf Count */}
                <div className="flex items-center justify-between mb-2 border-t border-gray-100 pt-2">
                    <span className="text-gray-600 font-medium text-sm flex items-center gap-1">
                        <PawPrint size={14} />
                        人狼の数
                    </span>
                    <span className="text-xl font-bold text-red-600">{settings.wolfCount}人</span>
                </div>
                <div className="flex items-center justify-center space-x-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleWolfCountChange(-1)}
                        disabled={settings.wolfCount <= 1}
                        className="border-red-100 hover:bg-red-50 text-red-600"
                    >
                        <Minus size={16} />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleWolfCountChange(1)}
                        disabled={settings.wolfCount >= settings.playerCount - 2}
                        className="border-red-100 hover:bg-red-50 text-red-600"
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
                            onClick={() => handleThemeChange('adult')}
                            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 bg-pink-500 text-white shadow-md"
                        >
                            えぐしゅぎ
                        </button>
                    ) : (
                        THEMES.map((theme) => (
                            <button
                                key={theme.id}
                                onClick={() => handleThemeChange(theme.id)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${settings.theme === theme.id
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

            <div className="space-y-2 mb-4 pr-1 -mr-1">
                {Array.from({ length: settings.playerCount }).map((_, i) => (
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
                            value={settings.playerNames[i] || ''}
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
