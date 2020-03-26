import {
  TEAMS
} from '../constants';

const INTIAL_STATE = {
  items: [],
  getTeamsPending: false,
  getTeamsError: null,
  teamSavePending: false,
  teamSaveError: null,
  teamDeletePending: false,
  teamDeleteError: null
}

const teamsReducer = (state = INTIAL_STATE, action = {}) => {
  switch (action.type) {
    case TEAMS.GET_TEAMS_PENDING:
      return {
        ...state,
        getTeamsPending: true
      }
    case TEAMS.GET_TEAMS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        getTeamsError: null,
        getTeamsPending: false
      }
    case TEAMS.GET_TEAMS_FAILED:
      return {
        ...state,
        getTeamsError: action.payload,
        getTeamsPending: false
      }
    case TEAMS.SAVE_PENDING:
      return {
        ...state,
        teamSavePending: true
      }
    case TEAMS.SAVE_SUCCESS:
      return {
        ...state,
        teamSavePending: false,
        items: [...state.items.filter(item => item.id !== action.payload.id),
        action.payload
        ]
      }
    case TEAMS.SAVE_FAILED:
      return {
        ...state,
        teamSavePending: false,
        teamSaveError: action.payload
      }
    case TEAMS.DELETE_PENDING:
      return {
        ...state,
        teamDeletePending: true
      }
    case TEAMS.DELETE_SUCCESS:
      return {
        ...state,
        teamDeletePending: false,
        items: state.items.filter((item) => item.id !== action.payload)
      }
    case TEAMS.DELETE_FAILED:
      return {
        ...state,
        teamDeletePending: false,
        teamDeleteError: action.payload
      }
    default:
      return state;
  }
};

export default teamsReducer;
