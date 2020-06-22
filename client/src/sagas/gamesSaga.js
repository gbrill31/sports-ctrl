import { takeEvery, call, put } from "redux-saga/effects";

import { GAMES } from "../constants";
import {
  setNewPlayerStats,
  // updatePlayerStatsError,
  setGameScore,
  setGameStatus,
  setTeamFouls,
  setGameEnd,
} from "../actions";
import {
  updatePlayerStats,
  updateGameScore,
  updateGameStatus,
  updateTeamFouls,
  updateEndGame,
} from "../api";

function* handleUpdatePlayerStats({ gameId, playerId, data }) {
  try {
    const updatedPlayer = yield call(updatePlayerStats, gameId, playerId, data);
    yield put(
      setNewPlayerStats(
        updatedPlayer.id,
        updatedPlayer.teamId,
        updatedPlayer.stats
      )
    );
  } catch (error) {
    // yield put(updatePlayerStatsError(error));
  }
}

function* handleSetGameScore({ gameId, teamId, points }) {
  try {
    const updatedScore = yield call(updateGameScore, gameId, teamId, points);
    yield put(setGameScore(updatedScore.teamId, updatedScore.score));
  } catch (error) {
    // yield put(updatePlayerStatsError(error));
  }
}

function* handleSetGameStatus({ gameId, status }) {
  try {
    const newStatus = yield call(updateGameStatus, gameId, status);
    yield put(setGameStatus(newStatus));
  } catch (error) {
    // yield put(updatePlayerStatsError(error));
  }
}

function* handleSetTeamFouls({ gameId, teamId, fouls }) {
  try {
    const newFouls = yield call(updateTeamFouls, gameId, teamId, fouls);
    yield put(setTeamFouls(newFouls.teamId, newFouls.fouls));
  } catch (error) {
    // yield put(updatePlayerStatsError(error));
  }
}

function* handleEndGame({ gameId }) {
  try {
    yield call(updateEndGame, gameId);
    yield put(setGameEnd());
  } catch (error) {
    // yield put(updatePlayerStatsError(error));
  }
}

export default function* watchDbConnection() {
  yield takeEvery(GAMES.SET_PLAYER_STATS_PENDING, handleUpdatePlayerStats);
  yield takeEvery(GAMES.SET_GAME_SCORE, handleSetGameScore);
  yield takeEvery(GAMES.UPDATE_GAME_STATUS, handleSetGameStatus);
  yield takeEvery(GAMES.UPDATE_TEAM_FOULS, handleSetTeamFouls);
  yield takeEvery(GAMES.UPDATE_GAME_END, handleEndGame);
}
