import { combineReducers } from "redux";

import activeGamesRedcuer from "./activeGameReducer";
import routesReucer from "./routesReducer";
import teamsReducer from "./teamsReducer";
import gameClockReducer from "./gameClockReducer";
import attackClockReducer from "./attackClockReducer";

const rootReducer = combineReducers({
  game: activeGamesRedcuer,
  routes: routesReucer,
  teams: teamsReducer,
  gameClock: gameClockReducer,
  attackClock: attackClockReducer,
});

export default rootReducer;
