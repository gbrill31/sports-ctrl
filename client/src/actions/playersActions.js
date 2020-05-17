import {
  PLAYERS
} from '../constants';

export const getAllPlayers = () => ({
  type: PLAYERS.GET_PLAYERS_PENDING
});

export const getPlayersTeamId = id => ({
  type: PLAYERS.GET_PLAYERS_PENDING,
  id
});

export const setSelectedPlayer = player => ({
  type: PLAYERS.SET_SELECTED,
  payload: player
});

export const setPlayers = players => ({
  type: PLAYERS.GET_PLAYERS_SUCCESS,
  payload: players
});

export const playersError = error => ({
  type: PLAYERS.GET_PLAYERS_FAILED,
  payload: error
})


export const deletePlayer = id => ({
  type: PLAYERS.DELETE_PENDING,
  id
});

export const clearDeletedPlayer = id => ({
  type: PLAYERS.DELETE_SUCCESS,
  payload: id
});

export const deletePlayerError = error => ({
  type: PLAYERS.DELETE_FAILED,
  payload: error
});

export const savePlayers = players => ({
  type: PLAYERS.SAVE_PENDING,
  players
});

export const setNewPlayers = players => ({
  type: PLAYERS.SAVE_SUCCESS,
  payload: players
});

export const newPlayersError = error => ({
  type: PLAYERS.SAVE_FAILED,
  payload: error
});

export const openNewPlayersDialog = () => ({
  type: PLAYERS.OPEN_NEW_PLAYERS_DIALOG
});

export const closeNewPlayersDialog = () => ({
  type: PLAYERS.CLOSE_NEW_PLAYERS_DIALOG
});