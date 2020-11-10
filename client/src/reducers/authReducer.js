import { AUTH } from '../constants';

const INITIAL_STATE = {
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
  permissions: {
    admin: ['Users', 'Teams', 'Venues', 'Game Control'],
    operator: ['Game Control'],
  },
};

const routesReucer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case AUTH.ON_USER_SIGNUP:
      return { ...state, signupPending: true };
    case AUTH.ON_USER_SIGNUP_SUCCESS:
      return { ...state, signupPending: false };
    case AUTH.ON_USER_SIGNUP_FAILED:
      return { ...state, signupPending: false, signupError: action.payload };
    case AUTH.ON_USER_LOGIN:
      return { ...state, loginPending: true };
    case AUTH.ON_USER_LOGIN_SUCCESS:
      return {
        ...state,
        loginPending: false,
        user: action.payload,
        isLoggedIn: action.payload !== null,
        isLoggedInCheck: true,
        loginError: null,
      };
    case AUTH.ON_USER_LOGIN_FAILED:
      return {
        ...state,
        loginPending: false,
        user: null,
        isLoggedInCheck: true,
        isLoggedIn: false,
        loginError: action.payload,
      };
    case AUTH.ON_USER_LOGOUT:
      return { ...state, logoutPending: true };
    case AUTH.ON_USER_LOGOUT_SUCCESS:
      return {
        ...state,
        logoutPending: false,
        user: null,
        isLoggedIn: false,
        logoutError: null,
      };
    case AUTH.ON_USER_LOGOUT_FAILED:
      return {
        ...state,
        logoutPending: false,
        logoutError: action.payload,
      };
    case AUTH.ON_USER_LOGOUT_PROMPT_OPEN:
      return {
        ...state,
        isLogoutPrompt: true,
      };
    case AUTH.ON_USER_LOGOUT_PROMPT_CLOSE:
      return {
        ...state,
        isLogoutPrompt: false,
      };
    case AUTH.ON_UPDATE_PASSWORD:
      return {
        ...state,
        updatePasswordPending: true,
      };
    case AUTH.ON_UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        updatePasswordPending: false,
      };
    case AUTH.ON_UPDATE_PASSWORD_FAILED:
      return {
        ...state,
        updatePasswordPending: false,
        updatePasswordError: action.payload,
      };
    default:
      return state;
  }
};

export default routesReucer;
