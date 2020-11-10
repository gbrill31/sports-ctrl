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

export const userLogin = (data) => ({
  type: AUTH.ON_USER_LOGIN,
  data,
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

export const openLogoutPrompt = () => ({
  type: AUTH.ON_USER_LOGOUT_PROMPT_OPEN,
});
export const closeLogoutPrompt = () => ({
  type: AUTH.ON_USER_LOGOUT_PROMPT_CLOSE,
});

export const updatePassword = (data) => ({
  type: AUTH.ON_UPDATE_PASSWORD,
  data,
});

export const setUpdatePassword = () => ({
  type: AUTH.ON_UPDATE_PASSWORD_SUCCESS,
});
