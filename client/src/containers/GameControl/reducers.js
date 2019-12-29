import {
  ON_NEW_GAME_PENDING,
  ON_NEW_GAME_SUCCESS,
  ON_NEW_GAME_FAILED
} from './constants';

const INTIAL_STATE = {
  game: null,
  isPending: false,
  error: ''
}

export const gameControl = (state = INTIAL_STATE, action = {}) => {
  switch (action.type) {
    case ON_NEW_GAME_PENDING:
      return { ...state, isPending: true }
    case ON_NEW_GAME_SUCCESS:
      return { ...state, game: action.payload, isPending: false }
    case ON_NEW_GAME_FAILED:
      return { ...state, error: action.payload, isPending: false }

    default:
      return state;
  }
};
