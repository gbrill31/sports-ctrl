import axios from 'axios';

export const getAllTeams = async () => {
  const { data } = await axios.get('/api/teams/all');
  return data;
};

export const getTeamById = async (key, id) => {
  const { data } = await axios.get(`/api/teams/team?id=${id}`);
  return data;
};

export const saveNewTeam = async (team) => {
  const { data } = await axios.post('/api/teams/save', team);
  return data;
};

export const deleteTeam = async (id) => {
  const { data } = await axios.post('/api/teams/delete', { id });
  return data;
};
