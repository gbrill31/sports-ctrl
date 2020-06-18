import axios from "axios";

export const getAllPlayers = async () => {
  const { data } = await axios.get("/players/all");
  return data;
};

export const getPlayersByTeamId = async (key, id) => {
  const { data } = await axios.get(`/players/team?id=${id}`);
  return data;
};

export const savePlayersToTeam = async (players) => {
  const { data } = await axios.post("/players/save", players);
  return data;
};

export const deletePlayer = async (id) => {
  const { data } = await axios.post("/players/delete", { id });
  return data;
};

export const updatePlayerStats = async (gameId, playerId, stats) => {
  const { data } = await axios.post("/players/statsupdate", {
    gameId,
    playerId,
    stats,
  });
  return data;
};
