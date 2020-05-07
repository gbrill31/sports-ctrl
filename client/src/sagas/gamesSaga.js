import { takeEvery, call, put } from 'redux-saga/effects';

import { GAMES } from '../constants';
import {
  setGames, gamesError, setGame, gameError,
} from '../actions';
import { getAllGames, createNewGame, requestActiveGame } from '../api';

function* handleGamesRequest() {
  try {
    const games = yield call(getAllGames);
    yield put(setGames(games));
  } catch (error) {
    yield put(gamesError(error));
  }
}

function* handleNewGame({ game }) {
  try {
    const newGame = yield call(createNewGame, game);
    yield put(setGame(newGame));
  } catch (error) {
    yield put(gameError(error));
  }
}

function* handleActiveGameRequest() {
  try {
    const activeGame = yield call(requestActiveGame);
    yield put(setGame(activeGame));
  } catch (error) {
    yield put(gameError(error));
  }
}

export default function* watchDbConnection() {
  yield takeEvery(GAMES.GET_ALL_PENDING, handleGamesRequest);
  yield takeEvery(GAMES.GAME_PENDING, handleNewGame);
  yield takeEvery(GAMES.ACTIVE_GAME_PENDING, handleActiveGameRequest);
}