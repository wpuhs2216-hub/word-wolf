import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { Button } from './ui/Button';
import { Clock, Lightbulb, X, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTopicSuggestion } from '../utils/wordPairs';

export const DiscussionScreen = () => {
    const { state, dispatch } = useGame();
    const [showHint, setShowHint] = useState(false);
    const [currentHint, setCurrentHint] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            if (state.timer > 0) {
                dispatch({ type: 'TICK_TIMER' });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [state.timer, dispatch]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleEndDiscussion = () => {
        dispatch({ type: 'START_VOTING' });
    };

    const handleShowHint = () => {
        if (state.hintsRemaining > 0) {
            const topic = getTopicSuggestion(state.wordPair?.hiddenThemeLabel, state.usedHints);
            setCurrentHint(topic);
            setShowHint(true);
            dispatch({ type: 'USE_HINT', payload: topic });
        }
    };

    const handleReturnToTitle = () => {
        dispatch({ type: 'RESET_GAME' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
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

            <h2 className="text-3xl font-bold text-gray-800 mb-2">話し合いタイム</h2>
            <p className="text-gray-500 mb-8">人狼を探し出せ！</p>

            <div className="relative mb-12">
                <div className="w-56 h-56 rounded-full border-8 border-blue-100 flex items-center justify-center bg-white shadow-lg">
                    <div className="text-6xl font-mono font-bold text-blue-600 tracking-tighter">
                        {formatTime(state.timer)}
                    </div>
                </div>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-2 -right-2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-3 rounded-full shadow-lg"
                >
                    <Clock size={28} />
                </motion.div>
            </div>

            <div className="w-full max-w-xs space-y-4">
                <Button
                    variant="secondary"
                    className="w-full"
                    onClick={handleShowHint}
                    disabled={state.hintsRemaining === 0}
                >
                    <Lightbulb size={20} className="mr-2" />
                    話題に困ったら... (残り{state.hintsRemaining}回)
                </Button>

                <Button
                    variant="danger"
                    size="lg"
                    className="w-full shadow-lg shadow-red-500/20"
                    onClick={handleEndDiscussion}
                >
                    話し合いを終了して投票へ
                </Button>
            </div>

            <AnimatePresence>
                {showHint && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-24 left-6 right-6 bg-white rounded-2xl p-4 shadow-xl border border-yellow-200 z-10"
                    >
                        <button
                            onClick={() => setShowHint(false)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        >
                            <X size={16} />
                        </button>
                        <p className="text-xs text-yellow-600 font-bold mb-1 uppercase tracking-wider">Discussion Hint</p>
                        <p className="text-lg font-bold text-gray-800">{currentHint}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
