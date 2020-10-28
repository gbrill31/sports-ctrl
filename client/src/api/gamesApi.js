import axios from 'axios';

export const getAllGames = async (key, userId) => {
  const { data } = await axios.get('/api/games/all');
  return data;
};

export const createNewGame = async (game) => {
  const { data } = await axios.post('/api/games/create', game);
  return data;
};

export const getActiveGame = async () => {
  const { data } = await axios.get('/api/games/active');
  return data;
};

export const updateGameScore = async (gameId, teamId, points) => {
  const { data } = await axios.post('/api/games/score', {
    gameId,
    teamId,
    points,
  });
  return data;
};

export const updateGameStatus = async (gameId, status) => {
  const { data } = await axios.post('/api/games/status', { gameId, status });
  return data;
};

export const updateTeamFouls = async (gameId, teamId, fouls) => {
  const { data } = await axios.post('/api/games/teamfouls', {
    gameId,
    teamId,
    fouls,
  });
  return data;
};

export const updateEndGame = async (gameId) => {
  const { data } = await axios.post('/api/games/endgame', {
    gameId,
  });
  return data;
};
