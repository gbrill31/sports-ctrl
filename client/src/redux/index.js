import { setRouteName } from './slices/routes';

import { setSelectedTeam } from './slices/teams';

import {
  userSignup,
  userSignupSuccess,
  userLogin,
  verifyLogin,
  setLoggedIn,
  setLoggedInError,
  closeLogoutPrompt,
  openLogoutPrompt,
  userLogout,
  setLoggedOut,
  updatePassword,
  setUpdatePasswordSuccess,
  setUpdatePasswordFailed,
} from './slices/auth';

export {
  userSignup,
  userSignupSuccess,
  userLogin,
  verifyLogin,
  setLoggedIn,
  setLoggedInError,
  userLogout,
  setLoggedOut,
  closeLogoutPrompt,
  openLogoutPrompt,
  updatePassword,
  setUpdatePasswordSuccess,
  setUpdatePasswordFailed,
  setRouteName,
  setSelectedTeam,
};
