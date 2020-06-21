import { PLAYERS } from "../constants";

const INTIAL_STATE = {
  selected: null,
};

const playersReducer = (state = INTIAL_STATE, action = {}) => {
  switch (action.type) {
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
