import { all } from "redux-saga/effects";

import dbSaga from "./dbSaga";
import gamesSaga from "./gamesSaga";

export default function* rootSaga() {
  yield all([dbSaga(), gamesSaga()]);
}
