import { combineReducers } from 'redux';

import dbConnectionReducer from './dbConnectionReducer';
import gamesRedcuer from './gamesReducer';
import routesReucer from './routesReducer';
import venuesReducer from './venuesReducer';
import teamsReducer from './teamsReducer';
import playersReducer from './playersReducer';

const rootReducer = combineReducers({
  db: dbConnectionReducer,
  games: gamesRedcuer,
  routes: routesReucer,
  venues: venuesReducer,
  teams: teamsReducer,
  players: playersReducer
});

export default rootReducer;
