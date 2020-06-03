import { takeEvery, call, put } from 'redux-saga/effects';

import { GAMES } from '../constants';
import {
  setGames, gamesError, setGame, gameError, setNewPlayerStats, updatePlayerStatsError, updateGameScore
} from '../actions';
import {
  getAllGames, createNewGame, requestActiveGame, updatePlayerStats, setGameScore
} from '../api';

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


function* handleUpdatePlayerStats({ gameId, playerId, data }) {
  try {
    const updatedPlayer = yield call(updatePlayerStats, gameId, playerId, data);
    yield put(setNewPlayerStats(updatedPlayer.id, updatedPlayer.teamId, updatedPlayer.stats));
  } catch (error) {
    yield put(updatePlayerStatsError(error));
  }
}

function* handleSetGameScore({ gameId, teamId, points }) {
  try {
    const updatedScore = yield call(setGameScore, gameId, teamId, points);
    yield put(updateGameScore(updatedScore.teamId, updatedScore.score));
  } catch (error) {
    yield put(updatePlayerStatsError(error));
  }
}

export default function* watchDbConnection() {
  yield takeEvery(GAMES.GET_ALL_PENDING, handleGamesRequest);
  yield takeEvery(GAMES.GAME_PENDING, handleNewGame);
  yield takeEvery(GAMES.ACTIVE_GAME_PENDING, handleActiveGameRequest);
  yield takeEvery(GAMES.SET_PLAYER_STATS_PENDING, handleUpdatePlayerStats);
  yield takeEvery(GAMES.SET_GAME_SCORE, handleSetGameScore);
}