import {
  ON_GAMES_REQUEST_PENDING,
  ON_GAMES_REQUEST_SUCCESS,
  ON_GAMES_REQUEST_FAILED
} from '../constants/HomeConstants';

const INTIAL_STATE = {
  games: [],
  isPending: false,
  error: ''
}

export const gamesPlayed = (state = INTIAL_STATE, action = {}) => {
  switch (action.type) {
    case ON_GAMES_REQUEST_PENDING:
      return { ...state, isPending: true }
    case ON_GAMES_REQUEST_SUCCESS:
      return { ...state, games: action.payload, isPending: false }
    case ON_GAMES_REQUEST_FAILED:
      return { ...state, error: action.payload, isPending: false }

    default:
      return state;
  }
};
