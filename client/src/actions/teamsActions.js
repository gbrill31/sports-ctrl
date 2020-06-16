import { TEAMS } from "../constants";

export const setSelectedTeam = (team) => ({
  type: TEAMS.SET_SELECTED,
  payload: team,
});

export const openNewTeamDialog = () => ({
  type: TEAMS.OPEN_NEW_TEAM_DIALOG,
});

export const closeNewTeamDialog = () => ({
  type: TEAMS.CLOSE_NEW_TEAM_DIALOG,
});
