import { PLAYERS } from "../constants";

const INTIAL_STATE = {
  selected: null,
  newPlayersDialog: false,
};

const playersReducer = (state = INTIAL_STATE, action = {}) => {
  switch (action.type) {
    case PLAYERS.OPEN_NEW_PLAYERS_DIALOG:
      return {
        ...state,
        newPlayersDialog: true,
      };
    case PLAYERS.CLOSE_NEW_PLAYERS_DIALOG:
      return {
        ...state,
        newPlayersDialog: false,
      };
    case PLAYERS.SET_SELECTED:
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
};

export default playersReducer;
