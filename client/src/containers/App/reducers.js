import {
  ON_CONNECT_DB_PENDING,
  ON_CONNECT_DB_SUCCESS,
  ON_CONNECT_DB_FAILED,
  ON_ROUTE_CHANGE
} from './constants';

const INITIAL_STATE = {
  dbConnection: {
    isConnected: false,
    isPending: false,
    error: ''
  },
  routes: {
    currentRoute: ''
  }
}

export const dbConnection = (state = INITIAL_STATE.dbConnection, action = {}) => {
  switch (action.type) {
    case ON_CONNECT_DB_PENDING:
      return { ...state, isPending: true }
    case ON_CONNECT_DB_SUCCESS:
      return { ...state, isConnected: true, isPending: false }
    case ON_CONNECT_DB_FAILED:
      return { ...state, error: action.payload, isConnected: false, isPending: false }
    default:
      return state;
  }
};

export const routes = (state = INITIAL_STATE.routes, action = {}) => {
  switch (action.type) {
    case ON_ROUTE_CHANGE:
      return { ...state, currentRoute: action.payload }
    default:
      return state;
  }
};
