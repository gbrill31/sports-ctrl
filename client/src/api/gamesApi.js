import axios from "axios";

export const getAllGames = async () => {
  const { data } = await axios.get("/games/all");
  return data;
};

export const createNewGame = async (game) => {
  const { data } = await axios.post("/games/create", game);
  return data;
};

export const requestActiveGame = async () => {
  const { data } = await axios.get("/games/active");
  return data;
};

export const updateGameScore = async (gameId, teamId, points) => {
  const { data } = await axios.post("/games/score", {
    gameId,
    teamId,
    points,
  });
  return data;
};

export const updateGameStatus = async (gameId, status) => {
  const { data } = await axios.post("/games/status", { gameId, status });
  return data;
};

export const updateTeamFouls = async (gameId, teamId, fouls) => {
  const { data } = await axios.post("/games/teamfouls", {
    gameId,
    teamId,
    fouls,
  });
  return data;
};

export const updateEndGame = async (gameId) => {
  const { data } = await axios.post("/games/endgame", {
    gameId,
  });
  return data;
};
