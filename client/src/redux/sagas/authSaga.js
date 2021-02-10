import { takeEvery, call, put } from 'redux-saga/effects';

import {
  setLoggedIn,
  setLoggedInError,
  setLoggedOut,
  userSignupSuccess,
  setUpdatePasswordSuccess,
} from '../index';
import {
  loginUser,
  logoutUser,
  verifyLogin,
  registerUser,
  updatePassword,
} from '../../api';

function* handleUserSignup({ payload }) {
  try {
    const { name, email, password, type, admin } = payload;
    yield call(registerUser, name, email, password, type, admin);
    yield put(userSignupSuccess());
  } catch (error) {
    // yield put(updatePlayerStatsError(error));
  }
}

function* handleUserLogin({ payload: data }) {
  try {
    const { user: loggedInUser, token, expires } = yield call(loginUser, data);
    yield localStorage.setItem('token', token);
    yield localStorage.setItem('expires', expires);
    yield put(setLoggedIn(loggedInUser));
  } catch (error) {
    yield put(setLoggedInError(error));
  }
}

function* handleUpdatePassword({ payload: data }) {
  try {
    yield call(updatePassword, data);
    yield put(setUpdatePasswordSuccess());
  } catch (error) {
    // yield put(updatePlayerStatsError(error));
  }
}

function* handleUserLogout() {
  try {
    yield call(logoutUser);
    yield put(setLoggedOut());
  } catch (error) {
    // yield put(updatePlayerStatsError(error));
  }
}

function* handleVerifyLogin() {
  try {
    const user = yield call(verifyLogin);
    yield put(setLoggedIn(user));
  } catch (error) {
    if (error.response.status === 401) {
      yield localStorage.removeItem('token');
      yield localStorage.removeItem('expires');
      yield put(setLoggedIn(null));
    }

    // yield put(updatePlayerStatsError(error));
  }
}

export default function* watchAuth() {
  yield takeEvery('auth/userSignup', handleUserSignup);
  yield takeEvery('auth/userLogin', handleUserLogin);
  yield takeEvery('auth/userLogout', handleUserLogout);
  yield takeEvery('auth/verifyLogin', handleVerifyLogin);
  yield takeEvery('auth/updatePassword', handleUpdatePassword);
}
