import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Button } from './ui/Button';
import { User, AlertCircle, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export const VotingScreen = () => {
    const { state, dispatch } = useGame();
    const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

    const handleVote = () => {
        if (selectedPlayerId) {
            dispatch({
                type: 'VOTE',
                payload: { voterId: 'GAME_MASTER', votedPlayerId: selectedPlayerId }
            });
            dispatch({ type: 'SHOW_RESULT' });
        }
    };

    const handleReturnToTitle = () => {
        dispatch({ type: 'RESET_GAME' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full p-6"
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

            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">投票タイム</h2>
                <p className="text-gray-500">
                    誰が人狼だと思いますか？
                </p>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 mb-6 pr-1 -mr-1">
                {state.players.map((player, i) => (
                    <motion.button
                        key={player.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setSelectedPlayerId(player.id)}
                        className={`w-full flex items-center p-4 rounded-2xl border-2 transition-all shadow-sm ${selectedPlayerId === player.id
                            ? 'border-blue-500 bg-blue-50 shadow-md scale-[1.02]'
                            : 'border-transparent bg-white hover:bg-gray-50'
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-colors ${selectedPlayerId === player.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'
                            }`}>
                            <User size={24} />
                        </div>
                        <span className={`text-lg font-bold ${selectedPlayerId === player.id ? 'text-blue-900' : 'text-gray-700'
                            }`}>
                            {player.name}
                        </span>
                    </motion.button>
                ))}
            </div>

            <div className="mt-auto">
                {selectedPlayerId && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center mb-4 text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-100"
                    >
                        <AlertCircle size={20} className="mr-2" />
                        <span className="text-sm font-medium">この決定は最終決定です！</span>
                    </motion.div>
                )}
                <Button
                    variant="danger"
                    size="lg"
                    className="w-full shadow-lg shadow-red-500/20"
                    disabled={!selectedPlayerId}
                    onClick={handleVote}
                >
                    処刑する
                </Button>
            </div>
        </motion.div>
    );
};
