export type Role = 'citizen' | 'wolf';

export type Player = {
    id: string;
    name: string;
    role: Role;
    word: string;
    isWolf: boolean;
};

export type GamePhase =
    | 'setup'
    | 'role-assignment'
    | 'discussion'
    | 'voting'
    | 'result';

export type Theme = 'food' | 'lifestyle' | 'entertainment' | 'love' | 'school' | 'other' | 'adult';

export type WordPair = {
    citizen: string;
    wolf: string;
    theme?: Theme;
    hiddenThemeLabel?: string;
};

export type HiddenThemeGroup = {
    id: string;
    mainCategory: Theme;
    hiddenThemeLabel: string;
    words: string[];
};

export type GameState = {
    players: Player[];
    phase: GamePhase;
    wordPair: WordPair | null;
    wolfIndex: number | null;
    currentTurnIndex: number; // For role assignment phase
    timer: number;
    votes: Record<string, string>; // voterId -> votedPlayerId
    hintsRemaining: number; // Number of hints remaining (max 3)
    usedHints: string[]; // Track used hint questions to avoid duplicates
};

export type GameAction =
    | { type: 'SET_PLAYERS'; payload: string[] } // names
    | { type: 'START_GAME'; payload: { wordPair: WordPair; wolfIndex: number } }
    | { type: 'NEXT_PLAYER' } // Move to next player in role assignment
    | { type: 'START_DISCUSSION' }
    | { type: 'TICK_TIMER' }
    | { type: 'USE_HINT'; payload: string } // Decrement hints remaining and track used hint
    | { type: 'START_VOTING' }
    | { type: 'VOTE'; payload: { voterId: string; votedPlayerId: string } }
    | { type: 'SHOW_RESULT' }
    | { type: 'RESET_GAME' };
