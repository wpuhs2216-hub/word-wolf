import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Button } from './ui/Button';
import { Trophy, Skull, RefreshCw, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ResultScreen = () => {
    const { state, dispatch } = useGame();
    const [isWordsRevealed, setIsWordsRevealed] = useState(false);

    // 1. Get executed players directly from state
    const executedPlayers = state.players.filter(p => state.executedPlayerIds.includes(p.id));

    // 2. Determine Win/Loss
    // Citizens win ONLY if:
    // a) The number of executed players matches the number of wolves (or more if ties, but strictly all executed must be wolves)
    // b) ALL executed players are wolves.
    // c) ALL wolves are executed.
    // Simplified: Set(executedPlayers) === Set(wolfPlayers)

    const wolfPlayers = state.players.filter(p => p.isWolf);
    const executedIds = new Set(executedPlayers.map(p => p.id));
    const wolfIds = new Set(wolfPlayers.map(p => p.id));

    // Check if sets are identical
    const isCitizenWin =
        executedIds.size === wolfIds.size &&
        [...executedIds].every(id => wolfIds.has(id));

    const isWolfWin = !isCitizenWin;

    const handleRevealWords = () => {
        setIsWordsRevealed(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col h-full p-6 text-center overflow-y-auto"
        >
            <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
                <AnimatePresence mode="wait">
                    {!isWordsRevealed ? (
                        <motion.div
                            key="result-main"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="w-full flex flex-col items-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                className={`w-32 h-32 rounded-full flex items-center justify-center mb-8 shadow-xl ${isWolfWin ? 'bg-red-100' : 'bg-green-100'
                                    }`}
                            >
                                {isWolfWin ? (
                                    <Skull size={64} className="text-red-600" />
                                ) : (
                                    <Trophy size={64} className="text-green-600" />
                                )}
                            </motion.div>

                            <h2 className={`text-4xl font-extrabold mb-4 ${isWolfWin ? 'text-red-600' : 'text-green-600'
                                }`}>
                                {isWolfWin ? '人狼の勝利！' : '市民の勝利！'}
                            </h2>

                            <div className="mb-8 text-gray-600">
                                <p className="mb-2 font-bold">処刑されたプレイヤー:</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {executedPlayers.length > 0 ? executedPlayers.map(p => (
                                        <span key={p.id} className="bg-gray-200 px-3 py-1 rounded-full text-sm font-medium">
                                            {p.name}
                                        </span>
                                    )) : <span className="text-sm">なし</span>}
                                </div>
                            </div>

                            <div className="w-full bg-white/60 backdrop-blur-sm rounded-3xl p-6 mb-8 text-left border border-white/50 shadow-lg">
                                <div className="mb-2">
                                    <p className="text-sm text-gray-500 mb-2 font-medium">人狼は...</p>
                                    <div className="flex flex-col gap-2">
                                        {wolfPlayers.map(wolf => (
                                            <div key={wolf.id} className="flex items-center p-3 bg-white rounded-xl border border-gray-100">
                                                <span className="w-3 h-3 rounded-full bg-red-500 mr-3 shadow-sm"></span>
                                                <span className="text-xl font-bold text-gray-900">{wolf.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Button
                                size="lg"
                                className="w-64 shadow-xl shadow-blue-500/20 text-lg py-4"
                                onClick={handleRevealWords}
                            >
                                <Eye size={20} className="mr-2" />
                                お題を見る
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result-words"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full flex flex-col items-center"
                        >
                            <h2 className={`text-3xl font-extrabold mb-6 ${isWolfWin ? 'text-red-600' : 'text-green-600'
                                }`}>
                                {isWolfWin ? '人狼の勝利！' : '市民の勝利！'}
                            </h2>

                            <div className="w-full bg-white/60 backdrop-blur-sm rounded-3xl p-6 mb-8 text-left border border-white/50 shadow-lg">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-2xl">
                                        <p className="text-xs text-blue-600 uppercase tracking-wider mb-2 font-bold">市民のお題</p>
                                        <p className="font-bold text-gray-800 text-lg">{state.wordPair?.citizen}</p>
                                    </div>
                                    <div className="bg-red-50 p-4 rounded-2xl">
                                        <p className="text-xs text-red-600 uppercase tracking-wider mb-2 font-bold">人狼のお題</p>
                                        <p className="font-bold text-gray-800 text-lg">{state.wordPair?.wolf}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full mb-8">
                                <p className="text-sm text-gray-500 mb-2 font-medium text-left">人狼プレイヤー</p>
                                <div className="flex flex-col gap-2">
                                    {wolfPlayers.map(wolf => (
                                        <div key={wolf.id} className="flex items-center p-3 bg-white rounded-xl border border-gray-100">
                                            <span className="w-3 h-3 rounded-full bg-red-500 mr-3 shadow-sm"></span>
                                            <span className="text-xl font-bold text-gray-900">{wolf.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {isWordsRevealed && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Button
                        size="lg"
                        className="w-full mt-auto shadow-lg shadow-blue-500/20"
                        onClick={() => dispatch({ type: 'RESET_GAME' })}
                    >
                        <RefreshCw size={20} className="mr-2" />
                        もう一度遊ぶ
                    </Button>
                </motion.div>
            )}
        </motion.div>
    );
};
