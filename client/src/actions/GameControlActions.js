import {
  ON_NEW_GAME_PENDING,
  ON_NEW_GAME_SUCCESS,
  ON_NEW_GAME_FAILED
} from '../constants/GameControlConstants';

export const createNewGame = (teams) => (dispatch) => {
  dispatch({ type: ON_NEW_GAME_PENDING })
  const body = JSON.stringify(teams);
  fetch('/games/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
    .then(res => {
      if (!res.ok) {
        return dispatch({
          type: ON_NEW_GAME_FAILED,
          payload: 'Failed to create a game'
        });
      }
      return res.json()
    })
    .then(data => {
      dispatch({
        type: ON_NEW_GAME_SUCCESS,
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: ON_NEW_GAME_FAILED,
        payload: 'Failed to create a game'
      });
    });
};
