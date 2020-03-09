import { DB } from '../constants';

const INITIAL_STATE = {
  dbConnection: {
    isConnected: false,
    isPending: false,
    error: ''
  }
}

const dbConnectionReducer = (state = INITIAL_STATE.dbConnection, action = {}) => {
  switch (action.type) {
    case DB.CONNECTING:
      return {
        ...state,
        isPending: true
      }
    case DB.CONNECTION_SUCCESS:
      return {
        ...state,
        isConnected: true,
        isPending: false
      }
    case DB.CONNECTION_FAILED:
      return {
        ...state,
        error: action.payload,
        isConnected: false,
        isPending: false
      }
    default:
      return state;
  }
};

export default dbConnectionReducer;