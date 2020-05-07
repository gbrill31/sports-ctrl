import {
  GAMES
} from '../constants';

const INTIAL_STATE = {
  game: null,
  gamePending: true,
  gameError: null,
  played: [],
  getGamesPending: false,
  gamesError: null
}

const gamesReducer = (state = INTIAL_STATE, action = {}) => {
  switch (action.type) {
    case (GAMES.GAME_PENDING):
      return {
        ...state,
        gamePending: true
      }
    case (GAMES.ACTIVE_GAME_PENDING):
      return {
        ...state,
        gamePending: true
      }
    case GAMES.GAME_SUCCESS:
      return {
        ...state,
        game: action.payload,
        gameError: null,
        gamePending: false
      }
    case GAMES.GAME_FAILED:
      return {
        ...state,
        gameError: action.payload,
        gamePending: false
      }
    case GAMES.GAME_PENDING_STOP:
      return {
        ...state,
        gamePending: false
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
