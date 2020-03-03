import {
  GAMES
} from '../constants';

const INTIAL_STATE = {
  game: null,
  gameCreatePending: false,
  gameError: null,
  played: [],
  getGamesPending: false,
  gamesError: null
}

const gamesReducer = (state = INTIAL_STATE, action = {}) => {
  switch (action.type) {
    case GAMES.CREATE_PENDING:
      return {
        ...state,
        gameCreatePending: true
      }
    case GAMES.CREATE_SUCCESS:
      return {
        ...state,
        game: action.payload,
        gameError: null,
        gameCreatePending: false
      }
    case GAMES.CREATE_FAILED:
      return {
        ...state,
        gameError: action.payload,
        gameCreatePending: false
      }
    case GAMES.GET_ALL_PENDING:
      return {
        ...state,
        getGamesPending: true
      }
    case GAMES.GET_ALL_SUCCESS:
      return {
        ...state,
        played: action.payload,
        getGamesPending: false
      }
    case GAMES.GET_ALL_FAILED:
      return {
        ...state,
        gamesError: action.payload,
        getGamesPending: false
      }
    default:
      return state;
  }
};

export default gamesReducer;
