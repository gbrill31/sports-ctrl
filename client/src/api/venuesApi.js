import axios from "axios";

export const getAllVenues = async () => {
  try {
    const { data } = await axios.get("/venues/all");
    return data;
  } catch {
    throw new Error("No venues found");
  }
};

export const saveNewVenue = async (venue) => {
  try {
    const { data } = await axios.post("/venues/save", venue);
    return data;
  } catch (err) {
    throw new Error("New venue creation failed", err);
  }
};

export const deleteVenue = async (id) => {
  try {
    const { data } = await axios.post("/venues/delete", { id });
    return data;
  } catch {
    throw new Error("New venue creation failed");
  }
};
