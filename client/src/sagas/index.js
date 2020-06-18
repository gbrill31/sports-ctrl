import { all } from "redux-saga/effects";

import gamesSaga from "./gamesSaga";

export default function* rootSaga() {
  yield all([gamesSaga()]);
}
