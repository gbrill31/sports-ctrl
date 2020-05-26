const DB = {
  CONNECTING: 'ON_CONNECT_DB_PENDING',
  CONNECTION_SUCCESS: 'ON_CONNECT_DB_SUCCESS',
  CONNECTION_FAILED: 'ON_CONNECT_DB_FAILED'
}

const ROUTE = {
  CHANGE: 'ON_ROUTE_CHANGE'
}

const GAMES = {
  GAME_PENDING: 'ON_NEW_GAME_PENDING',
  GAME_SUCCESS: 'ON_NEW_GAME_SUCCESS',
  GAME_FAILED: 'ON_NEW_GAME_FAILED',
  ACTIVE_GAME_PENDING: 'ACTIVE_GAME_PENDING',
  GAME_PENDING_STOP: 'GAME_PENDING_STOP',
  GET_ALL_PENDING: 'ON_GAMES_REQUEST_PENDING',
  GET_ALL_SUCCESS: 'ON_GAMES_REQUEST_SUCCESS',
  GET_ALL_FAILED: 'ON_GAMES_REQUEST_FAILED'
}

const VENUES = {
  SAVE_PENDING: 'VENUES_SAVE_PENDING',
  SAVE_FAILED: 'VENUES_SAVE_FAILED',
  SAVE_SUCCESS: 'VENUES_SAVE_SUCCESS',
  DELETE_PENDING: 'VENUES_DELETE_PENDING',
  DELETE_FAILED: 'VENUES_DELETE_FAILED',
  DELETE_SUCCESS: 'VENUES_DELETE_SUCCESS',
  GET_VENUES_PENDING: 'GET_VENUES_PENDING',
  GET_VENUES_SUCCESS: 'GET_VENUES_SUCCESS',
  GET_VENUES_FAILED: 'GET_VENUES_FAILED',
  OPEN_NEW_VENUE_DIALOG: 'OPEN_NEW_VENUE_DIALOG',
  CLOSE_NEW_VENUE_DIALOG: 'CLOSE_NEW_VENUE_DIALOG'
}

const TEAMS = {
  SAVE_PENDING: 'TEAMS_SAVE_PENDING',
  SAVE_FAILED: 'TEAMS_SAVE_FAILED',
  SAVE_SUCCESS: 'TEAMS_SAVE_SUCCESS',
  DELETE_PENDING: 'TEAMS_DELETE_PENDING',
  DELETE_FAILED: 'TEAMS_DELETE_FAILED',
  DELETE_SUCCESS: 'TEAMS_DELETE_SUCCESS',
  GET_TEAMS_PENDING: 'GET_TEAMS_PENDING',
  GET_TEAMS_SUCCESS: 'GET_TEAMS_SUCCESS',
  GET_TEAMS_FAILED: 'GET_TEAMS_FAILED',
  SET_SELECTED: 'TEAMS_SET_SELECTED',
  OPEN_NEW_TEAM_DIALOG: 'OPEN_NEW_TEAM_DIALOG',
  CLOSE_NEW_TEAM_DIALOG: 'CLOSE_NEW_TEAM_DIALOG'
}

const PLAYERS = {
  SAVE_PENDING: 'PLAYERS_SAVE_PENDING',
  SAVE_FAILED: 'PLAYERS_SAVE_FAILED',
  SAVE_SUCCESS: 'PLAYERS_SAVE_SUCCESS',
  DELETE_PENDING: 'PLAYERS_DELETE_PENDING',
  DELETE_FAILED: 'PLAYERS_DELETE_FAILED',
  DELETE_SUCCESS: 'PLAYERS_DELETE_SUCCESS',
  GET_PLAYERS_PENDING: 'GET_PLAYERS_PENDING',
  GET_PLAYERS_SUCCESS: 'GET_PLAYERS_SUCCESS',
  GET_PLAYERS_FAILED: 'GET_PLAYERS_FAILED',
  SET_SELECTED: 'PLAYERS_SET_SELECTED',
  OPEN_NEW_PLAYERS_DIALOG: 'OPEN_NEW_PLAYERS_DIALOG',
  CLOSE_NEW_PLAYERS_DIALOG: 'CLOSE_NEW_PLAYERS_DIALOG'
}

const CLOCKS = {
  START_GAME_CLOCK: 'START_GAME_CLOCK',
  STOP_GAME_CLOCK: 'STOP_GAME_CLOCK',
  RESET_GAME_CLOCK: 'RESET_GAME_CLOCK',
  SET_GAME_CLOCK: 'SET_GAME_CLOCK',
  SET_GAME_CLOCK_START: 'SET_GAME_CLOCK_START',
  START_ATTACK_CLOCK: 'START_ATTACK_CLOCK',
  STOP_ATTACK_CLOCK: 'STOP_ATTACK_CLOCK',
  RESET_ATTACK_CLOCK: 'RESET_ATTACK_CLOCK',
  SET_ATTACK_CLOCK: 'SET_ATTACK_CLOCK',
  SET_ATTACK_CLOCK_START: 'SET_ATTACK_CLOCK_START',
  SET_ATTACK_CLOCK_TIMELEFT: 'SET_ATTACK_CLOCK_TIMELEFT'
}

export {
  DB,
  ROUTE,
  GAMES,
  VENUES,
  TEAMS,
  PLAYERS,
  CLOCKS
}