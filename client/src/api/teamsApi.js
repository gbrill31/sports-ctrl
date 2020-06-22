import axios from "axios";

export const getAllTeams = async () => {
  const { data } = await axios.get("/teams/all");
  return data;
};

export const getTeamById = async (key, id) => {
  const { data } = await axios.get(`/teams/team?id=${id}`);
  return data;
};

export const saveNewTeam = async (team) => {
  const { data } = await axios.post("/teams/save", team);
  return data;
};

export const deleteTeam = async (id) => {
  const { data } = await axios.post("/teams/delete", { id });
  return data;
};
