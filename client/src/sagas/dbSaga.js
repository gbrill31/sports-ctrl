import { takeEvery, call, put, delay } from 'redux-saga/effects';

import { DB } from '../constants';
import { dbConnected, dbError } from '../actions';
import { connectDB } from '../api';

function* handleDbConnection() {
  for (let i = 0; i < 5; i++) {
    try {
      yield call(connectDB);
      yield put(dbConnected());
      return;
    } catch (error) {
      if (i < 4) {
        yield delay(15000);
      } else {
        yield put(dbError(error));
      }
    }
  }

}

export default function* watchDbConnection() {
  yield takeEvery(DB.CONNECTING, handleDbConnection);
}