import { TEAMS } from "../constants";
// import Team from "../classes/Team";

const INTIAL_STATE = {
  selected: null,
};

const teamsReducer = (state = INTIAL_STATE, action = {}) => {
  switch (action.type) {
    case TEAMS.SET_SELECTED:
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
};

export default teamsReducer;
