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

export type GameSettings = {
    playerCount: number;
    wolfCount: number;
    theme: Theme | 'all';
    playerNames: string[];
};

export type GameState = {
    settings: GameSettings;
    players: Player[];
    phase: GamePhase;
    wordPair: WordPair | null;
    wolfIndex: number | null; // Deprecated, kept for compatibility if needed, but logic should use isWolf
    currentTurnIndex: number; // For role assignment phase
    timer: number;
    votes: Record<string, string>; // DEPRECATED: Removed in favor of executedPlayerIds
    executedPlayerIds: string[]; // IDs of players executed by the Game Master
    hintsRemaining: number; // Number of hints remaining (max 3)
    usedHints: string[]; // Track used hint questions to avoid duplicates
};

export type GameAction =
    | { type: 'UPDATE_SETTINGS'; payload: Partial<GameSettings> }
    | { type: 'SET_PLAYERS'; payload: string[] } // names - kept for compatibility, but should update settings
    | { type: 'START_GAME'; payload: { wordPair: WordPair; wolfIndices: number[] } }
    | { type: 'NEXT_PLAYER' } // Move to next player in role assignment
    | { type: 'START_DISCUSSION' }
    | { type: 'TICK_TIMER' }
    | { type: 'USE_HINT'; payload: string } // Decrement hints remaining and track used hint
    | { type: 'START_VOTING' }
    | { type: 'VOTE'; payload: { votedPlayerIds: string[] } }
    | { type: 'SHOW_RESULT' }
    | { type: 'RESET_GAME' };
