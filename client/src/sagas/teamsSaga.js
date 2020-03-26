import { takeEvery, call, put } from 'redux-saga/effects';

import { TEAMS } from '../constants';
import {
  setTeams, teamsError, setNewTeam, newTeamError, clearDeletedTeam, deleteTeamError
} from '../actions';
import { getAllTeams, saveNewTeam, deleteTeam } from '../api';

function* handleTeamsRequest() {
  try {
    const teams = yield call(getAllTeams);
    yield put(setTeams(teams));
  } catch (error) {
    yield put(teamsError(error));
  }
}

function* handleNewTeam({ team }) {
  try {
    const newTeam = yield call(saveNewTeam, team);
    yield put(setNewTeam(newTeam));
  } catch (error) {
    yield put(newTeamError(error));
  }
}

function* handleDeleteTeam({ id }) {
  try {
    const deletedTeamId = yield call(deleteTeam, id);
    yield put(clearDeletedTeam(deletedTeamId));
  } catch (error) {
    yield put(deleteTeamError(error));
  }
}

export default function* watchTeams() {
  yield takeEvery(TEAMS.GET_TEAMS_PENDING, handleTeamsRequest);
  yield takeEvery(TEAMS.DELETE_PENDING, handleDeleteTeam);
  yield takeEvery(TEAMS.SAVE_PENDING, handleNewTeam);
}