import { GAMES } from "../constants";

import Team from "../classes/Team";

const INTIAL_STATE = {
  id: null,
  homeTeam: null,
  awayTeam: null,
  homePoints: null,
  awayPoints: null,
  homeFouls: null,
  awayFouls: null,
  active: null,
  selectedPlayer: null,
  isSetPlayerStatsDialog: false,
  setPlayerStatsPending: false,
  setPlayerStatsError: null,
  status: null,
  statusPending: false,
  statusError: null,
  isEndGamePrompt: false,
  isEndGamePending: false,
};

const activeGameReducer = (state = INTIAL_STATE, action = {}) => {
  switch (action.type) {
    case GAMES.SET_GAME:
      const {
        id: gameId,
        home,
        away,
        homePoints,
        homeFouls,
        awayPoints,
        awayFouls,
        status,
      } = action.payload;
      return {
        ...state,
        id: gameId,
        homeTeam: new Team(home),
        awayTeam: new Team(away),
        homePoints,
        awayPoints,
        homeFouls,
        awayFouls,
        status,
      };
    case GAMES.GAME_PENDING_STOP:
      return {
        ...state,
        activeGamePending: false,
      };
    case GAMES.GAME_SCORE_UPDATE:
      const { teamId: id, score } = action.payload;
      return {
        ...state,
        awayPoints: state.awayTeam.getId() === id ? score : state.awayPoints,
        homePoints: state.homeTeam.getId() === id ? score : state.homePoints,
      };
    case GAMES.SET_SELECTED_PLAYER:
      return {
        ...state,
        selectedPlayer: action.payload,
      };
    case GAMES.SET_PLAYER_STATS_PENDING:
      return {
        ...state,
        setPlayerStatsPending: true,
      };
    case GAMES.SET_PLAYER_STATS_SUCCESS:
      const { id: playerId, teamId, stats } = action.payload;
      return {
        ...state,
        setPlayerStatsPending: false,
        isSetPlayerStatsDialog: false,
        away:
          state.awayTeam.getId() === teamId
            ? state.awayTeam.updatePlayerStats(playerId, stats)
            : state.awayTeam,
        home:
          state.homeTeam.getId() === teamId
            ? state.homeTeam.updatePlayerStats(playerId, stats)
            : state.homeTeam,
      };
    case GAMES.SET_PLAYER_STATS_FAILED:
      return {
        ...state,
        setPlayerStatsPending: false,
        setPlayerStatsError: action.payload,
      };
    case GAMES.SET_PLAYER_STATS_DIALOG:
      return {
        ...state,
        isSetPlayerStatsDialog: action.payload,
      };
    case GAMES.SET_TEAM_FOULS:
      if (action.payload.teamId) {
        return {
          ...state,
          awayFouls:
            state.awayTeam.getId() === action.payload.teamId
              ? action.payload.fouls
              : state.awayFouls,
          homeFouls:
            state.homeTeam.getId() === action.payload.teamId
              ? action.payload.fouls
              : state.homeFouls,
        };
      }
      return {
        ...state,
        awayFouls: 0,
        homeFouls: 0,
      };
    case GAMES.UPDATE_GAME_STATUS:
      return {
        ...state,
        statusPending: true,
      };
    case GAMES.UPDATE_GAME_STATUS_FAILED:
      return {
        ...state,
        statusPending: false,
        statusError: action.payload,
      };
    case GAMES.SET_GAME_STATUS:
      return {
        ...state,
        statusPending: false,
        statusError: null,
        status: action.payload,
      };
    case GAMES.SET_GAME_END_PROMPT:
      return {
        ...state,
        isEndGamePrompt: action.payload,
      };
    case GAMES.UPDATE_GAME_END:
      return {
        ...state,
        isEndGamePending: true,
      };
    case GAMES.SET_GAME_END:
      return {
        ...state,
        isEndGamePrompt: false,
        isEndGamePending: false,
      };
    default:
      return state;
  }
};

export default activeGameReducer;
