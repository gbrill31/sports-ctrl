import {
  GAMES
} from '../constants';
import Game from '../classes/Game';

const INTIAL_STATE = {
  activeGame: null,
  activeGamePending: true,
  activeGameError: null,
  active: {},
  played: [],
  getGamesPending: false,
  gamesError: null
}

const gamesReducer = (state = INTIAL_STATE, action = {}) => {
  switch (action.type) {
    case (GAMES.GAME_PENDING):
      return {
        ...state,
        activeGamePending: true
      }
    case (GAMES.ACTIVE_GAME_PENDING):
      return {
        ...state,
        activeGamePending: true
      }
    case GAMES.GAME_SUCCESS:
      return {
        ...state,
        activeGame: action.payload ? new Game(action.payload) : null,
        activeGameError: null,
        activeGamePending: false
      }
    case GAMES.GAME_FAILED:
      return {
        ...state,
        activeGameError: action.payload,
        activeGamePending: false
      }
    case GAMES.GAME_PENDING_STOP:
      return {
        ...state,
        activeGamePending: false
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
        active: action.payload.find(game => game.active),
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
