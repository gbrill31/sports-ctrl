import { takeEvery, call, put, fork, take } from 'redux-saga/effects';

import { GAMES } from '../constants';
import { setGames, gamesError, setNewGame, newGameError } from '../actions';
import { getAllGames, createNewGame } from '../api';

function* handleGamesRequest() {
  try {
    const games = yield call(getAllGames);
    yield put(setGames(games));
  } catch (error) {
    yield put(gamesError(error));
  }
}

function* handleNewGame({ teams }) {
  try {
    const game = yield call(createNewGame, teams);
    yield put(setNewGame(game));
  } catch (error) {
    yield put(newGameError(error));
  }
}

export default function* watchDbConnection() {
  yield takeEvery(GAMES.GET_ALL_PENDING, handleGamesRequest);
  const teams = yield take(GAMES.CREATE_PENDING);
  yield fork(handleNewGame, teams);
}