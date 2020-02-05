import {
  DB
} from '../constants';

export const dbConnected = () => ({
  type: DB.CONNECTION_SUCCESS
});

export const dbError = error => ({
  type: DB.CONNECTION_FAILED,
  payload: error
});

export const connectToDB = () => ({
  type: DB.CONNECTING
});