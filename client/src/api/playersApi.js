import axios from "axios";

export const getAllPlayers = async () => {
  try {
    const { data } = await axios.get("/players/all");
    return data;
  } catch {
    throw new Error("No players found");
  }
};

export const getPlayersByTeamId = async (key, id) => {
  try {
    const { data } = await axios.get(`/players/team?id=${id}`);
    return data;
  } catch {
    throw new Error("No players found");
  }
};

export const savePlayersToTeam = async (players) => {
  try {
    const { data } = await axios.post("/players/save", players);
    return data;
  } catch {
    throw new Error("New players creation failed");
  }
};

export const deletePlayer = async (id) => {
  try {
    const { data } = await axios.post("/players/delete", { id });
    return data;
  } catch {
    throw new Error("Player deletion failed");
  }
};

export const updatePlayerStats = async (gameId, playerId, stats) => {
  try {
    const { data } = await axios.post("/players/statsupdate", {
      gameId,
      playerId,
      stats,
    });
    return data;
  } catch {
    throw new Error("Player stats update failed");
  }
};
