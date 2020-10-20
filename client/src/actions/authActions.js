import { AUTH } from '../constants';

export const userLogin = (email, password) => ({
  type: AUTH.ON_USER_LOGIN,
  email,
  password,
});

export const setLoggedIn = (user) => ({
  type: AUTH.ON_USER_LOGIN_SUCCESS,
  payload: user,
});

export const userLogout = () => ({
  type: AUTH.ON_USER_LOGOUT,
});

export const setLoggedOut = () => ({
  type: AUTH.ON_USER_LOGOUT_SUCCESS,
});

export const verifyLogin = () => ({
  type: AUTH.ON_USER_VERIFY_LOGIN,
});
