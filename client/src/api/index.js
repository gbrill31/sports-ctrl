import { connectDB } from "./dbApi";

import {
  getAllGames,
  createNewGame,
  getActiveGame,
  updateGameScore,
  updateGameStatus,
  updateTeamFouls,
  updateEndGame,
} from "./gamesApi";

import { getAllVenues, saveNewVenue, deleteVenue } from "./venuesApi";

import { getAllTeams, saveNewTeam, deleteTeam } from "./teamsApi";

import {
  getAllPlayers,
  getPlayersByTeamId,
  savePlayersToTeam,
  deletePlayer,
  updatePlayerStats,
} from "./playersApi";

export {
  connectDB,
  getAllGames,
  createNewGame,
  getActiveGame,
  updateGameScore,
  getAllVenues,
  saveNewVenue,
  deleteVenue,
  getAllTeams,
  saveNewTeam,
  deleteTeam,
  getAllPlayers,
  getPlayersByTeamId,
  savePlayersToTeam,
  deletePlayer,
  updatePlayerStats,
  updateGameStatus,
  updateTeamFouls,
  updateEndGame,
};
