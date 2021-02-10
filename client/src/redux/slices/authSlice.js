import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    signupPending: false,
    isLoggedIn: false,
    isLoggedInCheck: false,
    loginPending: false,
    logoutPending: false,
    signupError: null,
    loginError: null,
    logoutError: null,
    isLogoutPrompt: false,
    updatePasswordPending: false,
    updatePasswordError: null,
  },
  reducers: {
    userSignup(state, action) {
      state.signupPending = true;
    },
    userSignupSuccess(state, action) {
      state.signupPending = false;
    },
    userLogin(state, action) {
      state.loginPending = true;
    },
    verifyLogin(state, action) {
      console.log('verify');
    },
    setLoggedIn(state, action) {
      state.loginPending = false;
      state.user = action.payload;
      state.isLoggedIn = action.payload !== null;
      state.isLoggedInCheck = true;
      state.loginError = null;
    },
    setLoggedInError(state, action) {
      state.loginPending = false;
      state.user = null;
      state.isLoggedInCheck = true;
      state.isLoggedIn = false;
      state.loginError = action.payload;
    },
    userLogout(state, action) {
      console.log('logout');
    },
    closeLogoutPrompt(state, action) {
      state.isLogoutPrompt = false;
    },
    openLogoutPrompt(state, action) {
      state.isLogoutPrompt = true;
    },
    setLoggedOut(state, action) {
      state.logoutPending = false;
      state.user = null;
      state.isLoggedIn = false;
      state.logoutError = null;
    },
    updatePassword(state, action) {
      state.updatePasswordPending = true;
    },
    setUpdatePasswordSuccess(state, action) {
      state.updatePasswordPending = false;
    },
    setUpdatePasswordFailed(state, action) {
      state.updatePasswordPending = false;
      state.updatePasswordError = action.payload;
    },
  },
});

export const {
  userSignup,
  userSignupSuccess,
  userLogin,
  verifyLogin,
  setLoggedIn,
  setLoggedInError,
  userLogout,
  closeLogoutPrompt,
  openLogoutPrompt,
  setLoggedOut,
  updatePassword,
  setUpdatePasswordSuccess,
  setUpdatePasswordFailed,
} = authSlice.actions;

export default authSlice.reducer;
