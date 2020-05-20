import {
  PLAYERS
} from '../constants';

import Player from '../classes/Player';


const INTIAL_STATE = {
  items: [],
  selected: null,
  getPlayersPending: false,
  getPlayersError: null,
  playerSavePending: false,
  playerSaveError: null,
  playerDeletePending: false,
  playerDeleteError: null,
  newPlayersDialog: false
}

const getMappedPlayers = players => players.map(player => new Player(player));

const playersReducer = (state = INTIAL_STATE, action = {}) => {
  switch (action.type) {
    case PLAYERS.OPEN_NEW_PLAYERS_DIALOG:
      return {
        ...state,
        newPlayersDialog: true
      }
    case PLAYERS.CLOSE_NEW_PLAYERS_DIALOG:
      return {
        ...state,
        newPlayersDialog: false
      }
    case PLAYERS.SET_SELECTED:
      return {
        ...state,
        selected: action.payload
      }
    case PLAYERS.GET_PLAYERS_PENDING:
      return {
        ...state,
        getPlayersPending: true
      }
    case PLAYERS.GET_PLAYERS_SUCCESS:
      return {
        ...state,
        items: getMappedPlayers(action.payload),
        selected: null,
        getPlayersError: null,
        getPlayersPending: false
      }
    case PLAYERS.GET_PLAYERS_FAILED:
      return {
        ...state,
        getPlayersError: action.payload,
        getPlayersPending: false
      }
    case PLAYERS.SAVE_PENDING:
      return {
        ...state,
        playerSavePending: true
      }
    case PLAYERS.SAVE_SUCCESS:
      return {
        ...state,
        playerSavePending: false,
        newPlayersDialog: false,
        items: [...state.items.filter(item => item.id !== action.payload.id),
        ...getMappedPlayers(Array.isArray(action.payload) ? action.payload : [action.payload])
        ]
      }
    case PLAYERS.SAVE_FAILED:
      return {
        ...state,
        playerSavePending: false,
        playerSaveError: action.payload
      }
    case PLAYERS.DELETE_PENDING:
      return {
        ...state,
        playerDeletePending: true
      }
    case PLAYERS.DELETE_SUCCESS:
      return {
        ...state,
        playerDeletePending: false,
        items: state.items.filter((item) => item.id !== action.payload)
      }
    case PLAYERS.DELETE_FAILED:
      return {
        ...state,
        playerDeletePending: false,
        playerDeleteError: action.payload
      }
    default:
      return state;
  }
};

export default playersReducer;
