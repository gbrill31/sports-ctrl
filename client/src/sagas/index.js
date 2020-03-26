import { all } from 'redux-saga/effects';

import dbSaga from './dbSaga';
import gamesSaga from './gamesSaga';
import venuesSaga from './venuesSaga';
import teamsSaga from './teamsSaga';

export default function* rootSaga() {
  yield all([dbSaga(), gamesSaga(), venuesSaga(), teamsSaga()]);
}
