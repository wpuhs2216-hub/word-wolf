import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { GameState, GameAction, Player } from '../types/game';

const initialState: GameState = {
    settings: {
        playerCount: 3,
        wolfCount: 1,
        theme: 'all',
        playerNames: Array(3).fill(''),
    },
    players: [],
    phase: 'setup',
    wordPair: null,
    wolfIndex: null,
    currentTurnIndex: 0,
    timer: 180, // 3 minutes default
    votes: {}, // DEPRECATED
    executedPlayerIds: [],
    hintsRemaining: 3,
    usedHints: [],
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case 'UPDATE_SETTINGS':
            return {
                ...state,
                settings: { ...state.settings, ...action.payload },
            };
        case 'SET_PLAYERS':
            // Deprecated but kept for compatibility, updates settings.playerNames
            return {
                ...state,
                settings: { ...state.settings, playerNames: action.payload },
                players: action.payload.map((name) => ({
                    id: crypto.randomUUID(),
                    name,
                    role: 'citizen', // Placeholder, set in START_GAME
                    word: '', // Placeholder
                    isWolf: false,
                })),
            };
        case 'START_GAME': {
            const { wordPair, wolfIndices } = action.payload;
            // Use names from settings if players array is empty (which shouldn't happen if flow is correct, but for safety)
            const currentNames = state.settings.playerNames.map(n => n.trim() || 'プレイヤー');

            const players = currentNames.map((name, index) => {
                const isWolf = wolfIndices.includes(index);
                return {
                    id: crypto.randomUUID(),
                    name: name || `プレイヤー ${index + 1}`,
                    role: isWolf ? 'wolf' : 'citizen',
                    word: isWolf ? wordPair.wolf : wordPair.citizen,
                    isWolf,
                } as Player;
            });

            return {
                ...state,
                phase: 'role-assignment',
                players,
                wordPair,
                wolfIndex: wolfIndices[0], // Keep for legacy, but use isWolf property
                currentTurnIndex: 0,
                votes: {},
                executedPlayerIds: [],
                hintsRemaining: 3,
                usedHints: [],
            };
        }
        case 'NEXT_PLAYER':
            if (state.currentTurnIndex < state.players.length - 1) {
                return { ...state, currentTurnIndex: state.currentTurnIndex + 1 };
            } else {
                return { ...state, phase: 'discussion' };
            }
        case 'START_DISCUSSION':
            return { ...state, phase: 'discussion' };
        case 'TICK_TIMER':
            return { ...state, timer: Math.max(0, state.timer - 1) };
        case 'USE_HINT':
            return {
                ...state,
                hintsRemaining: Math.max(0, state.hintsRemaining - 1),
                usedHints: [...state.usedHints, action.payload]
            };
        case 'START_VOTING':
            return { ...state, phase: 'voting' };
        case 'VOTE':
            return {
                ...state,
                executedPlayerIds: action.payload.votedPlayerIds,
            };
        case 'SHOW_RESULT':
            return { ...state, phase: 'result' };
        case 'RESET_GAME':
            return {
                ...initialState,
                settings: state.settings, // Persist settings
            };
        default:
            return state;
    }
};

const GameContext = createContext<{
    state: GameState;
    dispatch: React.Dispatch<GameAction>;
} | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
