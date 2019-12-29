import {
  ON_CONNECT_DB_PENDING,
  ON_CONNECT_DB_SUCCESS,
  ON_CONNECT_DB_FAILED,
  ON_ROUTE_CHANGE
} from './constants';

export const setRouteName = route => (dispatch) => {
  dispatch({
    type: ON_ROUTE_CHANGE,
    payload: route
  });
}

export const checkDbConnection = () => (dispatch) => {
  dispatch({ type: ON_CONNECT_DB_PENDING });
  fetch('/connect/validate')
    .then((res) => {
      if (!res.ok) {
        dispatch({
          type: ON_CONNECT_DB_FAILED,
          payload: 'database connection timeout'
        });
        // return null;
      }
      return res.json();
    })
    .then((data) => {
      if (!data.error) {
        dispatch({
          type: ON_CONNECT_DB_SUCCESS
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: ON_CONNECT_DB_FAILED,
        payload: err
      });
    });
}

export const connectToDB = () => (dispatch) => {
  dispatch({ type: ON_CONNECT_DB_PENDING });
  fetch('/connect')
    .then((res) => {
      if (!res.ok) {
        dispatch({
          type: ON_CONNECT_DB_FAILED,
          payload: 'database connection timeout'
        });
        return null;
      }
      return res.json();
    })
    .then((data) => {
      if (!data.error) {
        dispatch({
          type: ON_CONNECT_DB_SUCCESS
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: ON_CONNECT_DB_FAILED,
        payload: err
      });
    });
}