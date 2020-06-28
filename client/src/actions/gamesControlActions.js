import { GAMES } from "../constants";

//Create and control active game
export const setGame = (game) => {
  return {
    type: GAMES.SET_GAME,
    payload: game,
  };
};

export const updateGameScore = (gameId, teamId, points) => {
  return {
    type: GAMES.SET_GAME_SCORE,
    gameId,
    teamId,
    points,
  };
};
export const setGameScore = (teamId, score) => {
  return {
    type: GAMES.GAME_SCORE_UPDATE,
    payload: { teamId, score },
  };
};

export const setIsPlayerStatsDialog = (isOpen) => ({
  type: GAMES.SET_PLAYER_STATS_DIALOG,
  payload: isOpen,
});

export const updatePlayerStats = (gameId, playerId, data) => {
  return {
    type: GAMES.SET_PLAYER_STATS_PENDING,
    gameId,
    playerId,
    data,
  };
};
export const setPlayerStats = (id, teamId, stats) => ({
  type: GAMES.SET_PLAYER_STATS_SUCCESS,
  payload: { id, teamId, stats },
});
export const updatePlayerStatsError = (error) => ({
  type: GAMES.SET_PLAYER_STATS_FAILED,
  payload: error,
});
export const setGameSelectedPlayer = (player) => ({
  type: GAMES.SET_SELECTED_PLAYER,
  payload: player,
});

export const updateGameStatus = (gameId, status) => ({
  type: GAMES.UPDATE_GAME_STATUS,
  gameId,
  status,
});
export const setGameStatus = (status) => ({
  type: GAMES.SET_GAME_STATUS,
  payload: status,
});

export const updateTeamFouls = (gameId, teamId, fouls) => ({
  type: GAMES.UPDATE_TEAM_FOULS,
  gameId,
  teamId,
  fouls,
});
export const setTeamFouls = (teamId, fouls) => ({
  type: GAMES.SET_TEAM_FOULS,
  payload: { teamId, fouls },
});

export const resetTeamFouls = (gameId) => ({
  type: GAMES.UPDATE_TEAM_FOULS,
  gameId,
});

export const updateGameEnd = (gameId) => ({
  type: GAMES.UPDATE_GAME_END,
  gameId,
});

export const setGameEnd = () => ({
  type: GAMES.SET_GAME_END,
});

export const setEndGamePrompt = (isOpen) => ({
  type: GAMES.SET_GAME_END_PROMPT,
  payload: isOpen,
});
