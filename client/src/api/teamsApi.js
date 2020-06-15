import axios from "axios";

export const getAllTeams = async () => {
  try {
    const { data } = await axios.get("/teams/all");
    return data;
  } catch {
    throw new Error("No teams found");
  }
};

export const saveNewTeam = async (team) => {
  try {
    const { data } = await axios.post("/teams/save", team);
    return data;
  } catch {
    throw new Error("New team creation failed");
  }
};

export const deleteTeam = async (id) => {
  try {
    const { data } = await axios.post("/teams/delete", { id });
    return data;
  } catch {
    throw new Error("Team deletion failed");
  }
};
