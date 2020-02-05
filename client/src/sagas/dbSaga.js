import { takeEvery, call, put } from 'redux-saga/effects';

import { DB } from '../constants';
import { dbConnected, dbError } from '../actions';
import { connectDB } from '../api';

function* handleDbConnection() {
  try {
    yield call(connectDB);
    yield put(dbConnected());
  } catch (error) {
    yield put(dbError(error));
  }

}

export default function* watchDbConnection() {
  yield takeEvery(DB.CONNECTING, handleDbConnection);
}