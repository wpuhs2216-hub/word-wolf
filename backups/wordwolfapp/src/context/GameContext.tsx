import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { GameState, GameAction, Player } from '../types/game';

const initialState: GameState = {
    players: [],
    phase: 'setup',
    wordPair: null,
    wolfIndex: null,
    currentTurnIndex: 0,
    timer: 180, // 3 minutes default
    votes: {},
    hintsRemaining: 3,
    usedHints: [],
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case 'SET_PLAYERS':
            return {
                ...state,
                players: action.payload.map((name) => ({
                    id: crypto.randomUUID(),
                    name,
                    role: 'citizen', // Placeholder, set in START_GAME
                    word: '', // Placeholder
                    isWolf: false,
                })),
            };
        case 'START_GAME': {
            const { wordPair, wolfIndex } = action.payload;
            const players = state.players.map((player, index) => {
                const isWolf = index === wolfIndex;
                return {
                    ...player,
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
                wolfIndex,
                currentTurnIndex: 0,
                votes: {},
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
                votes: { ...state.votes, [action.payload.voterId]: action.payload.votedPlayerId },
            };
        case 'SHOW_RESULT':
            return { ...state, phase: 'result' };
        case 'RESET_GAME':
            return { ...initialState };
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
