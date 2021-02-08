import { all } from 'redux-saga/effects';

import gamesSaga from './gamesSaga';
import authSaga from './authSaga';

export default function* rootSaga() {
  yield all([gamesSaga(), authSaga()]);
}
