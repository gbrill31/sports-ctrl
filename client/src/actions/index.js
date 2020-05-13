import {
  dbError,
  connectToDB,
  dbConnected
} from './dbActions';

import {
  getAllGames,
  gamesError,
  setGames,
  createNewGame,
  setGame,
  gameError,
  getActiveGame,
  stopLoading
} from './gamesControlActions'

import {
  getAllVenues,
  setVenues,
  venuesError,
  saveNewVenue,
  setNewVenue,
  newVenueError,
  deleteVenue,
  clearDeletedVenue,
  deleteVenueError
} from './venuesActions';

import {
  getAllTeams,
  setTeams,
  setSelectedTeam,
  teamsError,
  saveNewTeam,
  setNewTeam,
  newTeamError,
  deleteTeam,
  clearDeletedTeam,
  deleteTeamError
} from './teamsActions';

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
  setSelectedPlayer
} from './playersActions';

import {
  setRouteName
} from './routeActions';

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
  gameError,
  stopLoading,
  getAllVenues,
  setVenues,
  venuesError,
  saveNewVenue,
  setNewVenue,
  newVenueError,
  deleteVenue,
  clearDeletedVenue,
  deleteVenueError,
  getAllTeams,
  setSelectedTeam,
  setTeams,
  teamsError,
  saveNewTeam,
  setNewTeam,
  newTeamError,
  deleteTeam,
  clearDeletedTeam,
  deleteTeamError,
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
  setSelectedPlayer
}