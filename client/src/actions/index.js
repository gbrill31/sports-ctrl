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
  deleteVenueError,
  openNewVenueDialog,
  closeNewVenueDialog
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
  deleteTeamError,
  openNewTeamDialog,
  closeNewTeamDialog
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
  setSelectedPlayer,
  openNewPlayersDialog,
  closeNewPlayersDialog
} from './playersActions';

import {
  startGameClock,
  stopGameClock,
  resetGameClock,
  setGameClock,
  startAttackClock,
  stopAttackClock,
  resetAttackClock,
  setAttackClock,
  setAttackClockTimeleft
} from './clocksActions';

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
  setSelectedPlayer,
  openNewPlayersDialog,
  openNewTeamDialog,
  closeNewPlayersDialog,
  closeNewTeamDialog,
  openNewVenueDialog,
  closeNewVenueDialog,
  startGameClock,
  stopGameClock,
  resetGameClock,
  setGameClock,
  startAttackClock,
  stopAttackClock,
  resetAttackClock,
  setAttackClock,
  setAttackClockTimeleft
}