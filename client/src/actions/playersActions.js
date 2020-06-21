import { PLAYERS } from "../constants";

export const setSelectedPlayer = (player) => ({
  type: PLAYERS.SET_SELECTED,
  payload: player,
});
