import { combineReducers } from "redux";

import gamesRedcuer from "./gamesReducer";
import activeGamesRedcuer from "./activeGameReducer";
import routesReucer from "./routesReducer";
import teamsReducer from "./teamsReducer";
import playersReducer from "./playersReducer";
import gameClockReducer from "./gameClockReducer";
import attackClockReducer from "./attackClockReducer";

const rootReducer = combineReducers({
  games: gamesRedcuer,
  game: activeGamesRedcuer,
  routes: routesReucer,
  teams: teamsReducer,
  players: playersReducer,
  gameClock: gameClockReducer,
  attackClock: attackClockReducer,
});

export default rootReducer;
