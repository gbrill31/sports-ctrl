import { TEAMS } from "../constants";

export const setSelectedTeam = (team) => ({
  type: TEAMS.SET_SELECTED,
  payload: team,
});
