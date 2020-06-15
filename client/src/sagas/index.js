import { all } from "redux-saga/effects";

import dbSaga from "./dbSaga";
import gamesSaga from "./gamesSaga";
import playersSaga from "./playersSaga";

export default function* rootSaga() {
  yield all([dbSaga(), gamesSaga(), playersSaga()]);
}
