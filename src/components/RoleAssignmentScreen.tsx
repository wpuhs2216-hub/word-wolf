import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Button } from './ui/Button';
import { Eye, User, X, ShieldAlert, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const RoleAssignmentScreen = () => {
    const { state, dispatch } = useGame();
    const [isRevealed, setIsRevealed] = useState(false);
    const [cheatCount, setCheatCount] = useState(0);
    const [showCheatModal, setShowCheatModal] = useState(false);

    const handleNext = () => {
        setIsRevealed(false);
        dispatch({ type: 'NEXT_PLAYER' });
    };

    const handleCheatTrigger = () => {
        const newCount = cheatCount + 1;
        setCheatCount(newCount);
        if (newCount >= 5) {
            setShowCheatModal(true);
            setCheatCount(0);
        };
    };

    const handleReturnToTitle = () => {
        dispatch({ type: 'RESET_GAME' });
    };

    // Guard: Don't render if players array is empty or not in correct phase
    if (state.players.length === 0 || state.phase !== 'role-assignment') {
        return null;
    }

    const currentPlayer = state.players[state.currentTurnIndex];
    const isLastPlayer = state.currentTurnIndex === state.players.length - 1;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full p-6 items-center justify-center text-center relative"
        >
            <div className="absolute top-4 left-4">
                <button
                    onClick={handleReturnToTitle}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <Home size={18} />
                    タイトルへ
                </button>
            </div>

            <div className="mb-8">
                <div
                    className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner active:scale-95 transition-transform"
                    onClick={handleCheatTrigger}
                >
                    <User size={48} className="text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {currentPlayer.name}
                </h2>
                <p className="text-gray-500 bg-white/50 py-1 px-3 rounded-full inline-block">
                    このプレイヤーに端末を渡してください
                </p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-xs">
                <AnimatePresence mode="wait">
                    {!isRevealed ? (
                        <motion.div
                            key="hidden"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="w-full"
                        >
                            <Button
                                size="lg"
                                className="w-full h-40 text-xl flex-col gap-4 shadow-xl shadow-blue-500/20"
                                onClick={() => setIsRevealed(true)}
                            >
                                <Eye size={32} />
                                お題を確認
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="revealed"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="w-full bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl"
                        >
                            <p className="text-sm text-gray-500 mb-2 font-medium uppercase tracking-wider">あなたのお題</p>
                            <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 break-words">
                                {currentPlayer.word}
                            </p>
                            <p className="text-xs text-red-500 mb-6 bg-red-50 py-2 px-4 rounded-lg">
                                このお題を覚えてください。<br />他の人に見られないように注意！
                            </p>
                            <Button
                                variant="secondary"
                                className="w-full"
                                onClick={handleNext}
                            >
                                {isLastPlayer ? '話し合いへ' : '次の人へ'}
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Cheat Modal */}
            <AnimatePresence>
                {showCheatModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl max-h-[80vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-4 border-b pb-2">
                                <h3 className="text-lg font-bold text-red-600 flex items-center gap-2">
                                    <ShieldAlert size={20} />
                                    チートモード
                                </h3>
                                <button onClick={() => setShowCheatModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Theme Info Section */}
                            <div className="mb-4 bg-gray-100 p-3 rounded-lg">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs text-gray-500 font-bold">選択テーマ</span>
                                    <span className="text-sm font-bold text-gray-800">
                                        {state.wordPair?.theme === 'food' ? '食べ物' :
                                            state.wordPair?.theme === 'lifestyle' ? '生活' :
                                                state.wordPair?.theme === 'entertainment' ? 'エンタメ' :
                                                    state.wordPair?.theme === 'love' ? '恋愛' :
                                                        state.wordPair?.theme === 'school' ? '学校' :
                                                            state.wordPair?.theme === 'other' ? 'その他' :
                                                                state.wordPair?.theme === 'adult' ? 'えぐしゅぎ' : 'すべて'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500 font-bold">裏テーマ</span>
                                    <span className="text-sm font-bold text-purple-600">
                                        {state.wordPair?.hiddenThemeLabel || '???'}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {state.players.map(player => (
                                    <div key={player.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                        <span className="font-bold text-gray-700">{player.name}</span>
                                        <div className="text-right">
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${player.isWolf ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                                {player.isWolf ? '人狼' : '市民'}
                                            </span>
                                            <p className="text-sm font-medium text-gray-800 mt-1">{player.word}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div >
    );
};
