import axios from "axios";

export const getAllVenues = async () => {
  const { data } = await axios.get("/venues/all");
  return data;
};

export const saveNewVenue = async (venue) => {
  const { data } = await axios.post("/venues/save", venue);
  return data;
};

export const deleteVenue = async (id) => {
  const { data } = await axios.post("/venues/delete", { id });
  return data;
};
