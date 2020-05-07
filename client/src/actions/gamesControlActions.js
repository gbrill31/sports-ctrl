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