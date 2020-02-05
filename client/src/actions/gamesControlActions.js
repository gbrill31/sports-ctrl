import {
  GAMES
} from '../constants';

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
})

export const createNewGame = teams => ({
  type: GAMES.CREATE_PENDING,
  teams
});

export const setNewGame = game => ({
  type: GAMES.CREATE_SUCCESS,
  payload: game
});

export const newGameError = error => ({
  type: GAMES.CREATE_FAILED,
  payload: error
});