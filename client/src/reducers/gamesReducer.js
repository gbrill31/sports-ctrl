import {
  GAMES
} from '../constants';
import Game from '../classes/Game';

const INTIAL_STATE = {
  activeGame: null,
  activeGamePending: true,
  activeGameError: null,
  active: null,
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
    case GAMES.GAME_SCORE_UPDATE:
      const { teamId: id, score } = action.payload;
      return {
        ...state,
        activeGame: new Game({
          ...state.activeGame,
          awayPoints: state.activeGame.away.getId() === id ? score : state.activeGame.awayPoints,
          homePoints: state.activeGame.home.getId() === id ? score : state.activeGame.homePoints
        })
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
      const { id: playerId, teamId, stats } = action.payload;
      return {
        ...state,
        setPlayerStatsPending: false,
        isSetPlayerStatsDialog: false,
        activeGame: new Game({
          ...state.activeGame,
          away: state.activeGame.away.getId() === teamId ? state.activeGame.away.updatePlayerStats(playerId, stats) : state.activeGame.away,
          home: state.activeGame.home.getId() === teamId ? state.activeGame.home.updatePlayerStats(playerId, stats) : state.activeGame.home,
        })
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
