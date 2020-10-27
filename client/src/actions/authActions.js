import { AUTH } from '../constants';

export const userSignup = (name, email, password) => ({
  type: AUTH.ON_USER_SIGNUP,
  name,
  email,
  password,
});

export const userSignupSuccess = () => ({
  type: AUTH.ON_USER_SIGNUP_SUCCESS,
});

export const userLogin = (email, password) => ({
  type: AUTH.ON_USER_LOGIN,
  email,
  password,
});

export const setLoggedIn = (user) => ({
  type: AUTH.ON_USER_LOGIN_SUCCESS,
  payload: user,
});

export const setLoggedInError = (error) => ({
  type: AUTH.ON_USER_LOGIN_FAILED,
  payload: error,
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