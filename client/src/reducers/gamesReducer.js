import {
  GAMES
} from '../constants';

const INTIAL_STATE = {
  items: [],
  active: null,
  getAllGamesPending: false,
  getAllGamesError: null,
}

const gamesReducer = (state = INTIAL_STATE, action = {}) => {
  switch (action.type) {
    case GAMES.GET_ALL_PENDING:
      return {
        ...state,
        getAllGamesPending: true
      }
    case GAMES.GET_ALL_SUCCESS:
      return {
        ...state,
        items: action.payload,
        active: action.payload.find(game => game.active),
        getAllGamesPending: false
      }
    case GAMES.GET_ALL_FAILED:
      return {
        ...state,
        getAllGamesError: action.payload,
        getAllGamesPending: false
      }
    default:
      return state;
  }
};

export default gamesReducer;
