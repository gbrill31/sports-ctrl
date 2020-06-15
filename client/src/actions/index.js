import { dbError, connectToDB, dbConnected } from "./dbActions";

import {
  getAllGames,
  gamesError,
  setGames,
  createNewGame,
  setGame,
  setGameScore,
  updateGameScore,
  gameError,
  getActiveGame,
  stopLoading,
  setIsPlayerStatsDialog,
  updatePlayerStats,
  updatePlayerStatsError,
  setGameSelectedPlayer,
  setNewPlayerStats,
  setGameStatus,
  updateGameStatus,
  setTeamFouls,
  updateTeamFouls,
  resetTeamFouls,
  setEndGamePrompt,
  updateGameEnd,
  setGameEnd,
} from "./gamesControlActions";

import {
  setSelectedTeam,
  openNewTeamDialog,
  closeNewTeamDialog,
} from "./teamsActions";

import {
  getAllPlayers,
  getPlayersTeamId,
  setPlayers,
  playersError,
  savePlayers,
  setNewPlayers,
  newPlayersError,
  deletePlayer,
  clearDeletedPlayer,
  deletePlayerError,
  setSelectedPlayer,
  openNewPlayersDialog,
  closeNewPlayersDialog,
} from "./playersActions";

import {
  startGameClock,
  stopGameClock,
  resetGameClock,
  setGameClock,
  setGameClockStart,
  startAttackClock,
  stopAttackClock,
  resetAttackClock,
  setAttackClock,
  setAttackClockStart,
  setAttackClockTimeleft,
} from "./clocksActions";

import { setRouteName } from "./routeActions";

export {
  dbConnected,
  dbError,
  connectToDB,
  getAllGames,
  gamesError,
  getActiveGame,
  setGames,
  setRouteName,
  createNewGame,
  setGame,
  setGameScore,
  updateGameScore,
  gameError,
  stopLoading,
  setSelectedTeam,
  getAllPlayers,
  setPlayers,
  playersError,
  savePlayers,
  setNewPlayers,
  newPlayersError,
  deletePlayer,
  clearDeletedPlayer,
  deletePlayerError,
  getPlayersTeamId,
  setSelectedPlayer,
  openNewPlayersDialog,
  openNewTeamDialog,
  closeNewPlayersDialog,
  closeNewTeamDialog,
  startGameClock,
  stopGameClock,
  resetGameClock,
  setGameClock,
  setGameClockStart,
  startAttackClock,
  stopAttackClock,
  resetAttackClock,
  setAttackClock,
  setAttackClockStart,
  setAttackClockTimeleft,
  setIsPlayerStatsDialog,
  updatePlayerStats,
  updatePlayerStatsError,
  setGameSelectedPlayer,
  setNewPlayerStats,
  setGameStatus,
  updateGameStatus,
  setTeamFouls,
  updateTeamFouls,
  resetTeamFouls,
  setEndGamePrompt,
  updateGameEnd,
  setGameEnd,
};
