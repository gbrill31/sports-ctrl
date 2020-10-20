import { AUTH } from '../constants';

const INITIAL_STATE = {
  user: null,
  isLoggedIn: false,
  isLoggedInCheck: false,
  loginPending: false,
  logoutPending: false,
  loginError: null,
  logoutError: null,
};

const routesReucer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
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
        isLoggedIn: false,
        loginError: action.payload,
      };
    case AUTH.ON_USER_LOGOUT:
      return { ...state, logoutPending: true, isLoggedInCheck: false };
    case AUTH.ON_USER_LOGOUT_SUCCESS:
      return {
        ...state,
        logoutPending: false,
        user: null,
        isLoggedIn: false,
        isLoggedInCheck: false,
        logoutError: null,
      };
    case AUTH.ON_USER_LOGOUT_FAILED:
      return {
        ...state,
        logoutPending: false,
        isLoggedInCheck: false,
        logoutError: action.payload,
      };
    default:
      return state;
  }
};

export default routesReucer;
