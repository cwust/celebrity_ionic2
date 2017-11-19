export interface Player {
    id?: number;
    name: string;
    celebrities: string[];
    nextPlayerId?: number;
}

export interface GuessedCelebrity {
    name: string;
    team: number;
}

export interface GameRound {
    order: number;
    availableCelebrities: string[];
    guessedCelebrities: GuessedCelebrity [];
    currentTurnPlayerId: number;
    currentTurnTeam: number;
    nextPlayerId?: number;
}

export interface RemoteGame {
    id: number;
    name: string;
}

export interface CelebrityGame {
    id?: number;
    name: string;
    allPlayers: Player [];
    team1Ids: number [];
    team2Ids: number [];
    gameOwnerId: number;
    localPlayerTeam: number;
    previousRounds: GameRound[];
    currentRound?: GameRound;    
    maxCelebritiesPerPlayer: number;
}