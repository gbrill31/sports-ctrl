import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    id: null,
    homeTeam: null,
    awayTeam: null,
    homePoints: null,
    awayPoints: null,
    homeFouls: null,
    awayFouls: null,
    homeTimeouts: null,
    awayTimeouts: null,
    active: null,
    leagueId: null,
    selectedPlayer: null,
    isSetPlayerStatsDialog: false,
    setPlayerStatsPending: false,
    setPlayerStatsError: null,
    status: null,
    statusPending: false,
    statusError: null,
    isEndGamePrompt: false,
    isEndGamePending: false,
    endGameError: null,
    isHomeTimeout: false,
    isAwayTimeout: false,
    isTimeoutPrompt: false,
  },
  reducers: {
    setGame(state, action) {
      const {
        id: gameId,
        home,
        away,
        leagueId,
        homePoints,
        homeFouls,
        homeTimeouts,
        awayPoints,
        awayFouls,
        awayTimeouts,
        status,
      } = action.payload;
      Object.assign(state, {
        ...state,
        id: gameId,
        homeTeam: home,
        awayTeam: away,
        leagueId,
        homePoints,
        awayPoints,
        homeFouls,
        awayFouls,
        homeTimeouts,
        awayTimeouts,
        status,
      });
    },
    updateGameScore(state, action) {
      // console.log('update game score');
    },
    setGameScore(state, action) {
      const { teamId, score } = action.payload;
      Object.assign(state, {
        awayPoints: state.awayTeam.id === teamId ? score : state.awayPoints,
        homePoints: state.homeTeam.id === teamId ? score : state.homePoints,
      });
    },

    setIsPlayerStatsDialog(state, action) {
      state.isSetPlayerStatsDialog = action.payload;
    },

    updatePlayerStats(state, action) {
      state.setPlayerStatsPending = true;
    },
    setPlayerStats(state, action) {
      const { id: playerId, teamId, stats } = action.payload;
      let player;
      if (state.awayTeam.id === teamId) {
        player = state.awayTeam.players.find((p) => p.id === playerId);
      } else if (state.homeTeam.id === teamId) {
        player = state.homeTeam.players.find((p) => p.id === playerId);
      }
      if (player) player.stats = stats;
      state.setPlayerStatsPending = false;
      state.isSetPlayerStatsDialog = false;
    },
    updatePlayerStatsError(state, action) {
      state.setPlayerStatsPending = false;
      state.setPlayerStatsError = action.payload;
    },
    setGameSelectedPlayer(state, action) {
      state.selectedPlayer = action.payload;
    },

    updateGameStatus(state, action) {
      state.statusPending = true;
    },
    setGameStatus(state, action) {
      Object.assign(state, {
        statusPending: false,
        statusError: null,
        status: action.payload,
      });
    },

    updateTeamFouls(state, action) {
      // console.log('update team fouls');
    },
    updateTeamTimeouts(state, action) {
      // console.log('update team fouls');
    },
    setTeamFouls(state, action) {
      if (action.payload.teamId) {
        Object.assign(state, {
          awayFouls:
            state.awayTeam.id === action.payload.teamId
              ? action.payload.fouls
              : state.awayFouls,
          homeFouls:
            state.homeTeam.id === action.payload.teamId
              ? action.payload.fouls
              : state.homeFouls,
        });
      } else {
        Object.assign(state, {
          awayFouls: 0,
          homeFouls: 0,
        });
      }
    },
    setTeamTimeouts(state, action) {
      if (action.payload.teamId) {
        Object.assign(state, {
          awayTimeouts:
            state.awayTeam.id === action.payload.teamId
              ? action.payload.timeouts
              : state.awayTimeouts,
          homeTimeouts:
            state.homeTeam.id === action.payload.teamId
              ? action.payload.timeouts
              : state.homeTimeouts,
        });
      } else {
        Object.assign(state, {
          awayTimeouts: 0,
          homeTimeouts: 0,
        });
      }
    },

    resetTeamFouls(state, action) {
      // console.log('reset teams fouls');
    },
    resetTeamTimeouts(state, action) {
      // console.log('reset teams fouls');
    },

    updateGameEnd(state, action) {
      state.isEndGamePending = true;
    },

    setGameEnd(state, action) {
      state.isEndGamePrompt = false;
      state.isEndGamePending = false;
    },
    setEndGameError(state, action) {
      state.isEndGamePending = false;
      state.endGameError = action.payload.message;
    },

    setEndGamePrompt(state, action) {
      state.isEndGamePrompt = action.payload;
    },
    setIsTimeout(state, action) {
      const { isTimeout, teamLocation } = action.payload;
      if (teamLocation === 'home' && isTimeout) {
        state.isHomeTimeout = isTimeout;
      } else {
        state.isAwayTimeout = isTimeout;
      }
      if (!isTimeout) {
        state.isHomeTimeout = isTimeout;
        state.isAwayTimeout = isTimeout;
      }
    },
    setIsTimeoutPrompt(state, action) {
      state.isTimeoutPrompt = action.payload;
    },
  },
});

export const {
  setGame,
  setGameEnd,
  setEndGameError,
  setEndGamePrompt,
  setGameScore,
  setGameSelectedPlayer,
  setGameStatus,
  setIsPlayerStatsDialog,
  setPlayerStats,
  setTeamFouls,
  updateGameEnd,
  updateGameScore,
  updateGameStatus,
  updateTeamFouls,
  updatePlayerStats,
  updatePlayerStatsError,
  updateTeamTimeouts,
  setTeamTimeouts,
  resetTeamTimeouts,
  resetTeamFouls,
  setIsTimeout,
  setIsTimeoutPrompt,
} = gameSlice.actions;

export default gameSlice.reducer;
