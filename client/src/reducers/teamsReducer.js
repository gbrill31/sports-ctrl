import { TEAMS } from "../constants";
// import Team from "../classes/Team";

const INTIAL_STATE = {
  selected: null,
  newTeamDialog: false,
};

const teamsReducer = (state = INTIAL_STATE, action = {}) => {
  switch (action.type) {
    case TEAMS.OPEN_NEW_TEAM_DIALOG:
      return {
        ...state,
        newTeamDialog: true,
      };
    case TEAMS.CLOSE_NEW_TEAM_DIALOG:
      return {
        ...state,
        newTeamDialog: false,
      };
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
