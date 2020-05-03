import { connectDB } from './dbApi';

import { getAllGames, createNewGame } from './gamesApi';

import { getAllVenues, saveNewVenue, deleteVenue } from './venuesApi';

import { getAllTeams, saveNewTeam, deleteTeam } from './teamsApi';

import { getAllPlayers, getPlayersByTeam, addPlayersToTeam, deletePlayer } from './playersApi';

export {
  connectDB,
  getAllGames,
  createNewGame,
  getAllVenues,
  saveNewVenue,
  deleteVenue,
  getAllTeams,
  saveNewTeam,
  deleteTeam,
  getAllPlayers,
  getPlayersByTeam,
  addPlayersToTeam,
  deletePlayer
}