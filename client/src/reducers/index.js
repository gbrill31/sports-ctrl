import { combineReducers } from 'redux';

import activeGamesRedcuer from './activeGameReducer';
import gameClockReducer from './gameClockReducer';
import attackClockReducer from './attackClockReducer';

import authReducer from '../redux/slices/auth';
import routesReducer from '../redux/slices/routes';
import teamsReducer from '../redux/slices/teams';

const rootReducer = combineReducers({
  game: activeGamesRedcuer,
  routes: routesReducer,
  teams: teamsReducer,
  gameClock: gameClockReducer,
  attackClock: attackClockReducer,
  auth: authReducer,
});

export default rootReducer;
