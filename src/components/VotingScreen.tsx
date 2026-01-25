import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Button } from './ui/Button';
import { User, AlertCircle, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const VotingScreen = () => {
    const { state, dispatch } = useGame();
    const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);
    const wolfCount = state.settings.wolfCount;

    const togglePlayerSelection = (id: string) => {
        if (selectedPlayerIds.includes(id)) {
            setSelectedPlayerIds(prev => prev.filter(pid => pid !== id));
        } else {
            if (selectedPlayerIds.length < wolfCount) {
                setSelectedPlayerIds(prev => [...prev, id]);
            } else {
                // Optional: Replace the oldest selection or just block?
                // Let's block for now, or maybe replace the first one?
                // User requirement: "Select exactly wolfCount players".
                // Let's just allow toggling. If max reached, ignore add? Or replace?
                // Let's ignore add if full, user must deselect first.
                // Or better UX: Replace the first one if only 1 allowed? No, for multi, maybe just block.
                // Actually, let's just do nothing if full.
            }
        }
    };

    const handleVote = () => {
        if (selectedPlayerIds.length === wolfCount) {
            dispatch({
                type: 'VOTE',
                payload: { votedPlayerIds: selectedPlayerIds }
            });
            dispatch({ type: 'SHOW_RESULT' });
        }
    };

    const handleReturnToTitle = () => {
        dispatch({ type: 'RESET_GAME' });
    };

    const isSelectionComplete = selectedPlayerIds.length === wolfCount;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full p-6"
        >
            <div className="mb-4">
                <button
                    onClick={handleReturnToTitle}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <Home size={18} />
                    タイトルへ
                </button>
            </div>

            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">投票タイム</h2>
                <p className="text-gray-500">
                    処刑する人を <strong>{wolfCount}人</strong> 選んでください
                </p>
                <p className="text-sm text-blue-500 font-medium mt-1">
                    選択中: {selectedPlayerIds.length} / {wolfCount}
                </p>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 mb-6 pr-1 -mr-1">
                {state.players.map((player, i) => {
                    const isSelected = selectedPlayerIds.includes(player.id);
                    return (
                        <motion.button
                            key={player.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => togglePlayerSelection(player.id)}
                            className={`w-full flex items-center p-4 rounded-2xl border-2 transition-all shadow-sm ${isSelected
                                ? 'border-blue-500 bg-blue-50 shadow-md scale-[1.02]'
                                : 'border-transparent bg-white hover:bg-gray-50'
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-colors ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'
                                }`}>
                                <User size={24} />
                            </div>
                            <span className={`text-lg font-bold ${isSelected ? 'text-blue-900' : 'text-gray-700'
                                }`}>
                                {player.name}
                            </span>
                        </motion.button>
                    );
                })}
            </div>

            <div className="mt-auto">
                {/* Fixed height container to prevent layout shift */}
                <div className="h-14 mb-2 flex items-center justify-center">
                    <AnimatePresence>
                        {isSelectionComplete && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="flex items-center justify-center text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-100 w-full"
                            >
                                <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                                <span className="text-sm font-medium">この決定は最終決定です！</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <Button
                    variant="danger"
                    size="lg"
                    className="w-full shadow-lg shadow-red-500/20"
                    disabled={!isSelectionComplete}
                    onClick={handleVote}
                >
                    処刑する ({selectedPlayerIds.length}/{wolfCount})
                </Button>
            </div>
        </motion.div>
    );
};
