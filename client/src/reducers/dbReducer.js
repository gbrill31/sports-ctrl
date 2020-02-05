import { DB } from '../constants';

const INITIAL_STATE = {
  dbConnection: {
    isConnected: false,
    isPending: false,
    error: ''
  }
}

export const dbConnection = (state = INITIAL_STATE.dbConnection, action = {}) => {
  switch (action.type) {
    case DB.CONNECTION_PENDING:
      return { ...state, isPending: true }
    case DB.CONNECTION_SUCCESS:
      return { ...state, isConnected: true, isPending: false }
    case DB.CONNECTION_FAILED:
      return { ...state, error: action.payload, isConnected: false, isPending: false }
    default:
      return state;
  }
};