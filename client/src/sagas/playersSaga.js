import { takeEvery, call, put } from 'redux-saga/effects';

import { PLAYERS } from '../constants';
import {
  setPlayers, playersError, newPlayersError, clearDeletedPlayer, deletePlayerError,
  setNewPlayers
} from '../actions';
import { getAllPlayers, getPlayersByTeamId, savePlayersToTeam, deletePlayer } from '../api';

function* handlePlayersRequest({ id }) {
  try {
    const getPlayers = yield (id ? getPlayersByTeamId : getAllPlayers);
    const players = yield call(getPlayers, id);
    yield put(setPlayers(players));
  } catch (error) {
    yield put(playersError(error));
  }
}

function* handleNewPlayers({ players }) {
  try {
    const newPlayers = yield call(savePlayersToTeam, players);
    yield put(setNewPlayers(newPlayers));
  } catch (error) {
    yield put(newPlayersError(error));
  }
}

function* handleDeletePlayer({ id }) {
  try {
    const deletedPlayerId = yield call(deletePlayer, id);
    yield put(clearDeletedPlayer(deletedPlayerId));
  } catch (error) {
    yield put(deletePlayerError(error));
  }
}

export default function* watchTeams() {
  yield takeEvery(PLAYERS.GET_PLAYERS_PENDING, handlePlayersRequest);
  yield takeEvery(PLAYERS.DELETE_PENDING, handleDeletePlayer);
  yield takeEvery(PLAYERS.SAVE_PENDING, handleNewPlayers);
}