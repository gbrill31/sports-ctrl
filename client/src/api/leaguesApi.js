import axios from 'axios';

export const getAllLeagues = async () => {
  const { data } = await axios.get('/api/leagues/all');
  return data;
};

export const getLeagueById = async (id) => {
  const { data } = await axios.get(`/api/leagues/league?id=${id}`);
  return data;
};

export const saveNewLeague = async (league) => {
  const { data } = await axios.post('/api/leagues/save', league);
  return data;
};

export const deleteLeague = async (id) => {
  const { data } = await axios.post('/api/leagues/delete', { id });
  return data;
};
