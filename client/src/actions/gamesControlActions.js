import {
  GAMES
} from '../constants';

// Get all played games

export const getAllGames = () => ({
  type: GAMES.GET_ALL_PENDING
});

export const setGames = games => ({
  type: GAMES.GET_ALL_SUCCESS,
  payload: games
});

export const gamesError = error => ({
  type: GAMES.GET_ALL_FAILED,
  payload: error
});

//Create and control active game

export const createNewGame = game => ({
  type: GAMES.GAME_PENDING,
  game
});

export const setGame = game => {
  return {
    type: GAMES.GAME_SUCCESS,
    payload: game
  }
};

export const updateGameScore = (gameId, teamId, points) => {
  return {
    type: GAMES.SET_GAME_SCORE,
    gameId, teamId, points
  }
};
export const setGameScore = (teamId, score) => {
  return {
    type: GAMES.GAME_SCORE_UPDATE,
    payload: { teamId, score }
  }
};

export const gameError = error => {
  return {
    type: GAMES.GAME_FAILED,
    payload: error
  }
};

export const getActiveGame = () => ({
  type: GAMES.ACTIVE_GAME_PENDING
});

export const stopLoading = () => ({
  type: GAMES.GAME_PENDING_STOP
});

export const setIsPlayerStatsDialog = (isOpen) => ({
  type: GAMES.SET_PLAYER_STATS_DIALOG,
  payload: isOpen
});

export const updatePlayerStats = (gameId, playerId, data) => {
  return {
    type: GAMES.SET_PLAYER_STATS_PENDING,
    gameId, playerId, data
  }
};
export const setNewPlayerStats = (id, teamId, stats) => ({
  type: GAMES.SET_PLAYER_STATS_SUCCESS,
  payload: { id, teamId, stats }
});
export const updatePlayerStatsError = (error) => ({
  type: GAMES.SET_PLAYER_STATS_FAILED,
  payload: error
});
export const setGameSelectedPlayer = (player) => ({
  type: GAMES.SET_SELECTED_PLAYER,
  payload: player
});

export const updateGameStatus = (gameId, status) => ({
  type: GAMES.UPDATE_GAME_STATUS,
  gameId, status
});
export const setGameStatus = status => ({
  type: GAMES.SET_GAME_STATUS,
  payload: status
});

export const updateTeamFouls = (gameId, teamId, fouls) => ({
  type: GAMES.UPDATE_TEAM_FOULS,
  gameId, teamId, fouls
});
export const setTeamFouls = (teamId, fouls) => ({
  type: GAMES.SET_TEAM_FOULS,
  payload: { teamId, fouls }
});

export const resetTeamFouls = (gameId) => ({
  type: GAMES.UPDATE_TEAM_FOULS,
  gameId
});