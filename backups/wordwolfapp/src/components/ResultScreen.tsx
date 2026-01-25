import { useGame } from '../context/GameContext';
import { Button } from './ui/Button';
import { Trophy, Skull, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export const ResultScreen = () => {
    const { state, dispatch } = useGame();

    const votedOutId = state.votes['GAME_MASTER'];
    const votedPlayer = state.players.find(p => p.id === votedOutId);
    const wolfPlayer = state.players.find(p => p.isWolf);

    const isWolfCaught = votedPlayer?.isWolf;
    const isWolfWin = !isWolfCaught;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col h-full p-6 text-center overflow-y-auto"
        >
            <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
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

                <p className="text-gray-600 mb-10 text-lg font-medium">
                    {isWolfWin
                        ? `${votedPlayer?.name || '誰も'} 処刑されましたが、\n人狼は生き残りました。`
                        : `${votedPlayer?.name} は人狼でした。\n処刑成功！`}
                </p>

                <div className="w-full bg-white/60 backdrop-blur-sm rounded-3xl p-6 mb-8 text-left border border-white/50 shadow-lg">
                    <div className="mb-6">
                        <p className="text-sm text-gray-500 mb-2 font-medium">人狼は...</p>
                        <div className="flex items-center p-3 bg-white rounded-xl border border-gray-100">
                            <span className="w-3 h-3 rounded-full bg-red-500 mr-3 shadow-sm"></span>
                            <span className="text-xl font-bold text-gray-900">{wolfPlayer?.name}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200/50">
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
            </div>

            <Button
                size="lg"
                className="w-full mt-auto shadow-lg shadow-blue-500/20"
                onClick={() => dispatch({ type: 'RESET_GAME' })}
            >
                <RefreshCw size={20} className="mr-2" />
                もう一度遊ぶ
            </Button>
        </motion.div>
    );
};
