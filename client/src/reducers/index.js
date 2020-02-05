import { combineReducers } from 'redux';

import dbReducer from './dbReducer';
import gamesRedcuer from './gamesReducer';
import routesReucer from './routesReducer';

const rootReducer = combineReducers({
  db: dbReducer,
  games: gamesRedcuer,
  routes: routesReucer
});

export default rootReducer;
