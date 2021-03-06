import { connectDB } from './dbApi';

import {
  getAllGames,
  createNewGame,
  getActiveGame,
  updateGameScore,
  updateGameStatus,
  updateTeamFouls,
  updateEndGame,
} from './gamesApi';

import { getAllVenues, saveNewVenue, deleteVenue } from './venuesApi';

import { getAllTeams, saveNewTeam, deleteTeam, getTeamById } from './teamsApi';

import {
  getAllPlayers,
  getPlayersByTeamId,
  savePlayersToTeam,
  deletePlayer,
  updatePlayerStats,
} from './playersApi';

import {
  registerUser,
  loginUser,
  logoutUser,
  verifyLogin,
  updatePassword,
} from './authApi';

import { getUsersByAdmin, deleteUsers, updateUser } from './usersApi';

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
  getTeamById,
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
  registerUser,
  loginUser,
  logoutUser,
  verifyLogin,
  getUsersByAdmin,
  deleteUsers,
  updatePassword,
  updateUser,
};
