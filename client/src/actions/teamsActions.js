import {
  TEAMS
} from '../constants';

export const getAllTeams = () => ({
  type: TEAMS.GET_TEAMS_PENDING
});

export const setTeams = teams => ({
  type: TEAMS.GET_TEAMS_SUCCESS,
  payload: teams
});

export const setSelectedTeam = team => {
  return {
    type: TEAMS.SET_SELECTED,
    payload: team
  }
}

export const teamsError = error => ({
  type: TEAMS.GET_TEAMS_FAILED,
  payload: error
})

export const saveNewTeam = team => ({
  type: TEAMS.SAVE_PENDING,
  team
});

export const deleteTeam = id => ({
  type: TEAMS.DELETE_PENDING,
  id
});

export const clearDeletedTeam = id => ({
  type: TEAMS.DELETE_SUCCESS,
  payload: id
});

export const deleteTeamError = error => ({
  type: TEAMS.DELETE_FAILED,
  payload: error
});

export const setNewTeam = team => ({
  type: TEAMS.SAVE_SUCCESS,
  payload: team
});

export const newTeamError = error => ({
  type: TEAMS.SAVE_FAILED,
  payload: error
});

export const openNewTeamDialog = () => ({
  type: TEAMS.OPEN_NEW_TEAM_DIALOG
});

export const closeNewTeamDialog = () => ({
  type: TEAMS.CLOSE_NEW_TEAM_DIALOG
});