import { combineReducers } from 'redux';

import dbConnectionReducer from './dbConnectionReducer';
import gamesRedcuer from './gamesReducer';
import routesReucer from './routesReducer';
import venuesReducer from './venuesReducer';

const rootReducer = combineReducers({
  db: dbConnectionReducer,
  games: gamesRedcuer,
  routes: routesReucer,
  venues: venuesReducer
});

export default rootReducer;
