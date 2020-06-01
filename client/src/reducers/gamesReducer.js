import {
  GAMES
} from '../constants';
import Game from '../classes/Game';

const INTIAL_STATE = {
  activeGame: null,
  activeGamePending: true,
  activeGameError: null,
  active: {},
  items: [],
  getAllGamesPending: false,
  getAllGamesError: null,
  selectedPlayer: null,
  isSetPlayerStatsDialog: false,
  setPlayerStatsPending: false,
  setPlayerStatsError: null
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
        getAllGamesPending: true
      }
    case GAMES.GET_ALL_SUCCESS:
      return {
        ...state,
        items: action.payload,
        active: action.payload.find(game => game.active),
        getAllGamesPending: false
      }
    case GAMES.GET_ALL_FAILED:
      return {
        ...state,
        getAllGamesError: action.payload,
        getAllGamesPending: false
      }
    case GAMES.SET_SELECTED_PLAYER:
      return {
        ...state,
        selectedPlayer: action.payload
      }
    case GAMES.SET_PLAYER_STATS_PENDING:
      return {
        ...state,
        setPlayerStatsPending: true
      }
    case GAMES.SET_PLAYER_STATS_SUCCESS:
      return {
        ...state,
        setPlayerStatsPending: false,
        selectedPlayer: action.payload
      }
    case GAMES.SET_PLAYER_STATS_FAILED:
      return {
        ...state,
        setPlayerStatsPending: false,
        setPlayerStatsError: action.payload
      }
    case GAMES.SET_PLAYER_STATS_DIALOG:
      return {
        ...state,
        isSetPlayerStatsDialog: action.payload
      }
    default:
      return state;
  }
};

export default gamesReducer;
