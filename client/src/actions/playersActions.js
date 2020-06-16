import { PLAYERS } from "../constants";

export const setSelectedPlayer = (player) => ({
  type: PLAYERS.SET_SELECTED,
  payload: player,
});

export const openNewPlayersDialog = () => ({
  type: PLAYERS.OPEN_NEW_PLAYERS_DIALOG,
});

export const closeNewPlayersDialog = () => ({
  type: PLAYERS.CLOSE_NEW_PLAYERS_DIALOG,
});
