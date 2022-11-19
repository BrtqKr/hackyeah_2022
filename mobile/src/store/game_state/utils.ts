import { TurnStatus } from './gameStateTypes'

export const STARTING_STATS = {
    money: 50,
    eco: 50,
    employeeMorale: 50,
    society: 50,
}

export const INITIAL_GAME_STATE = {
    stats: STARTING_STATS,
    turnStatus: TurnStatus.GAME_NOT_YET_STARTED,
    currentDecision: false,
}