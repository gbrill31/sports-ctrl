import {
  ON_GAMES_REQUEST_PENDING,
  ON_GAMES_REQUEST_SUCCESS,
  ON_GAMES_REQUEST_FAILED
} from './constants';

export const getAllGames = () => (dispatch) => {
  dispatch({ type: ON_GAMES_REQUEST_PENDING });
  fetch('/games/all')
    .then((res) => {
      if (!res.ok) {
        return dispatch({
          type: ON_GAMES_REQUEST_FAILED,
          payload: 'No database connection'
        });
      }
      return res.json();
    })
    .then(games => {
      dispatch({
        type: ON_GAMES_REQUEST_SUCCESS,
        payload: games
      });
    })
    .catch(err => {
      dispatch({
        type: ON_GAMES_REQUEST_FAILED,
        payload: 'No database connection'
      });
    });
}