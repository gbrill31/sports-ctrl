import { takeEvery, call, put } from "redux-saga/effects";

import { GAMES } from "../constants";
import {
  setGames,
  gamesError,
  setGame,
  gameError,
  setNewPlayerStats,
  updatePlayerStatsError,
  setGameScore,
  setGameStatus,
  setTeamFouls,
  setGameEnd,
} from "../actions";
import {
  getAllGames,
  createNewGame,
  getActiveGame,
  updatePlayerStats,
  updateGameScore,
  updateGameStatus,
  updateTeamFouls,
  updateEndGame,
} from "../api";

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
    const activeGame = yield call(getActiveGame);
    yield put(setGame(activeGame));
  } catch (error) {
    yield put(gameError(error));
  }
}

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
    yield put(updatePlayerStatsError(error));
  }
}

function* handleSetGameScore({ gameId, teamId, points }) {
  try {
    const updatedScore = yield call(updateGameScore, gameId, teamId, points);
    yield put(setGameScore(updatedScore.teamId, updatedScore.score));
  } catch (error) {
    yield put(updatePlayerStatsError(error));
  }
}

function* handleSetGameStatus({ gameId, status }) {
  try {
    const newStatus = yield call(updateGameStatus, gameId, status);
    yield put(setGameStatus(newStatus));
  } catch (error) {
    yield put(updatePlayerStatsError(error));
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
  yield takeEvery(GAMES.GET_ALL_PENDING, handleGamesRequest);
  yield takeEvery(GAMES.GAME_PENDING, handleNewGame);
  yield takeEvery(GAMES.ACTIVE_GAME_PENDING, handleActiveGameRequest);
  yield takeEvery(GAMES.SET_PLAYER_STATS_PENDING, handleUpdatePlayerStats);
  yield takeEvery(GAMES.SET_GAME_SCORE, handleSetGameScore);
  yield takeEvery(GAMES.UPDATE_GAME_STATUS, handleSetGameStatus);
  yield takeEvery(GAMES.UPDATE_TEAM_FOULS, handleSetTeamFouls);
  yield takeEvery(GAMES.UPDATE_GAME_END, handleEndGame);
}
