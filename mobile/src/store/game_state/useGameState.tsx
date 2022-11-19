import create from 'zustand';
import { GameMessage, GameState } from './gameStateTypes';
import { INITIAL_GAME_STATE } from './utils';

export const gameStateReducer = (
  currentState: GameState,
  message: GameMessage,
  payload: Partial<GameState>
) => {
  switch (message) {
    case GameMessage.GAME_ENDED:
      return { ...INITIAL_GAME_STATE };
    case GameMessage.GAME_LEFT:
      console.warn('Someone left... :(');
      return { ...INITIAL_GAME_STATE };
    case GameMessage.TURN_STARTED:
      return { ...payload };
    case GameMessage.TURN_ENDED:
      return { ...payload };
    default:
      return currentState;
  }
};

const useGameState = create<GameState>((set) => ({
  ...INITIAL_GAME_STATE,
  dispatch: (message, payload) =>
    set((currentState) => gameStateReducer(currentState, message, payload)),
}));

export default useGameState;
