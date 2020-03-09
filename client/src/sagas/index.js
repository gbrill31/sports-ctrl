import { all } from 'redux-saga/effects';

import dbSaga from './dbSaga';
import gamesSaga from './gamesSaga';
import venuesSags from './venuesSaga';

export default function* rootSaga() {
  yield all([dbSaga(), gamesSaga(), venuesSags()]);
}
