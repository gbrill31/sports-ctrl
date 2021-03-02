import { takeEvery, call, put } from 'redux-saga/effects';

import {
  setPlayerStats,
  // updatePlayerStatsError,
  setGameScore,
  setGameStatus,
  setTeamFouls,
  setGameEnd,
  setEndGameError,
  setTeamTimeouts,
} from '../index';
import {
  updatePlayerStats,
  updateGameScore,
  updateGameStatus,
  updateTeamFouls,
  updateEndGame,
  updateTeamTimeouts,
} from '../../api';

function* handleUpdatePlayerStats({ payload }) {
  try {
    const { gameId, playerId, data } = payload;
    const updatedPlayer = yield call(updatePlayerStats, gameId, playerId, data);
    yield put(
      setPlayerStats({
        ...updatedPlayer,
      })
    );
  } catch (error) {
    // yield put(updatePlayerStatsError(error));
  }
}

function* handleSetGameScore({ payload }) {
  try {
    const { gameId, teamId, points } = payload;
    const updatedScore = yield call(updateGameScore, gameId, teamId, points);
    yield put(setGameScore({ ...updatedScore }));
  } catch (error) {
    // yield put(updatePlayerStatsError(error));
  }
}

function* handleSetGameStatus({ payload }) {
  try {
    const { gameId, status } = payload;
    const newStatus = yield call(updateGameStatus, gameId, status);
    yield put(setGameStatus(newStatus));
  } catch (error) {
    // yield put(updatePlayerStatsError(error));
  }
}

function* handleSetTeamFouls({ payload }) {
  try {
    const { gameId, teamId, fouls } = payload;
    const newFouls = yield call(updateTeamFouls, gameId, teamId, fouls);
    yield put(setTeamFouls({ ...newFouls }));
  } catch (error) {
    // yield put(updatePlayerStatsError(error));
  }
}

function* handleSetTeamTimeouts({ payload }) {
  try {
    const { gameId, teamId, timeouts } = payload;
    const newTimeouts = yield call(
      updateTeamTimeouts,
      gameId,
      teamId,
      timeouts
    );
    yield put(setTeamTimeouts({ ...newTimeouts }));
  } catch (error) {
    // yield put(updatePlayerStatsError(error));
  }
}

function* handleEndGame({ payload: gameId }) {
  try {
    console.log('saga', gameId);
    yield call(updateEndGame, gameId);
    yield put(setGameEnd());
  } catch (error) {
    yield put(setEndGameError(error));
  }
}

export default function* watchDbConnection() {
  yield takeEvery('game/updatePlayerStats', handleUpdatePlayerStats);
  yield takeEvery('game/updateGameScore', handleSetGameScore);
  yield takeEvery('game/updateGameStatus', handleSetGameStatus);
  yield takeEvery('game/updateTeamFouls', handleSetTeamFouls);
  yield takeEvery('game/updateTeamTimeouts', handleSetTeamTimeouts);
  yield takeEvery('game/resetTeamFouls', handleSetTeamFouls);
  yield takeEvery('game/updateGameEnd', handleEndGame);
}
