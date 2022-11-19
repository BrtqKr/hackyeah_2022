export enum TurnStatus {
    MAKING_DECISION,
    WAITING_FOR_OTHERS,
    GAME_NOT_YET_STARTED,
}

export type GameStats = {
    money: number;
    eco: number;
    employeeMorale: number;
    society: number;
}

export interface GameState {
    stats: unknown;
    turnStatus: unknown;
    currentDecision: unknown;
    dispatch(message: GameMessage, payload: Partial<GameState>): void;
}
  
export enum GameMessage {
    TURN_STARTED,
    TURN_ENDED,
    GAME_ENDED,
    GAME_LEFT,
}