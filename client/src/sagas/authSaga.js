import { takeEvery, call, put } from 'redux-saga/effects';
import { AUTH } from '../constants';
import { setLoggedIn, setLoggedOut } from '../actions';
import { loginUser, logoutUser, verifyLogin } from '../api';

function* handleUserLogin({ email, password }) {
  try {
    const { user: loggedInUser, token, expires } = yield call(
      loginUser,
      email,
      password
    );
    yield localStorage.setItem('token', token);
    yield localStorage.setItem('expires', expires);
    yield put(setLoggedIn(loggedInUser));
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
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expires');
    yield put(setLoggedIn(null));
    // yield put(updatePlayerStatsError(error));
  }
}

export default function* watchAuth() {
  yield takeEvery(AUTH.ON_USER_LOGIN, handleUserLogin);
  yield takeEvery(AUTH.ON_USER_LOGOUT, handleUserLogout);
  yield takeEvery(AUTH.ON_USER_VERIFY_LOGIN, handleVerifyLogin);
}
