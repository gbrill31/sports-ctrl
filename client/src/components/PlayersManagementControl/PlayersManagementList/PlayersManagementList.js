import React, { useState } from "react";
import { useSelector } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@material-ui/core";
import {
  FlexContainer,
  Button,
  Icon,
  MainTitle,
  ScrollableContainer,
} from "../../../styledElements";

import PlayersListItem from "../PlayersListItem/PlayersListItem";
import PromptDialog from "../../PromptDialog/PromptDialog";
import NewPlayerFormDialog from "../NewPlayerFormDialog/NewPlayerFormDialog";
import ComponentLoader from "../../ComponentLoader/ComponentLoader";
import FilterListInput from "../../FilterListInput/FilterListInput";
import usePlayers from "../../../hooks/usePlayers";
import useDeletePlayer from "../../../hooks/useDeletePlayer";

export default function PlayersManagementList() {
  const selectedTeam = useSelector((state) => state.teams.selected);

  const { status, data: players, isFetching } = usePlayers(
    selectedTeam,
    selectedTeam?.getId()
  );

  const [isDeletePlayer, setIsDeletePlayer] = useState(false);
  const [isAddPlayersDialog, setIsAddPlayersDialog] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleCancelPrompt = () => setIsDeletePlayer(false);

  const setSelected = (player) => setSelectedPlayer(player);

  const openAddPlayersDialog = () => setIsAddPlayersDialog(true);
  const closeAddPlayersDialog = () => setIsAddPlayersDialog(false);

  const deleteSelected = useDeletePlayer(handleCancelPrompt);

  const deleteSelectedPlayer = () => deleteSelected(selectedPlayer);

  const getFilteredPlayers = () => {
    const value = filterValue.toLowerCase();
    return value !== ""
      ? players.filter(
          (player) =>
            player.getName().includes(value) ||
            player.getNumber().toString().includes(value)
        )
      : players;
  };

  const deletePlayerPrompt = () => {
    setIsDeletePlayer(true);
  };

  return (
    <>
      <FlexContainer
        minWidth={status === "loading" || !players ? "50vw" : false}
      >
        <ComponentLoader loading={status === "loading"} size={100}>
          <FlexContainer fullWidth align="center">
            <MainTitle margin="0" capitalize>
              {selectedTeam ? `${selectedTeam.getName()} Players` : ""}
            </MainTitle>
            {selectedTeam && (
              <Button color="success" onClick={openAddPlayersDialog}>
                Add Players
                <Icon spaceLeft>
                  <FontAwesomeIcon icon={faPlus} size="sm" />
                </Icon>
              </Button>
            )}
            {isFetching && (
              <CircularProgress size={25} style={{ color: "#fff" }} />
            )}
          </FlexContainer>
          <FlexContainer fullWidth padding="0">
            {players?.length > 0 && (
              <FilterListInput
                onChange={setFilterValue}
                placeholder="Player Name, Number"
              />
            )}
          </FlexContainer>
          <ScrollableContainer padding="5px" heightDiff={325} fullWidth>
            <FlexContainer column fullWidth>
              {players && players.length > 0 ? (
                getFilteredPlayers()
                  .sort((playerA, playerB) =>
                    playerA.name.toLowerCase() > playerB.name.toLowerCase()
                      ? 1
                      : -1
                  )
                  .map((player) => (
                    <PlayersListItem
                      key={player.getId()}
                      player={player}
                      selectedPlayer={selectedPlayer}
                      setSelectedPlayer={setSelected}
                      deletePlayerPrompt={deletePlayerPrompt}
                    />
                  ))
              ) : (
                <MainTitle>No Players Assigned</MainTitle>
              )}
            </FlexContainer>
          </ScrollableContainer>
        </ComponentLoader>
      </FlexContainer>
      <PromptDialog
        isOpen={isDeletePlayer}
        title="Delete Player"
        content={`Are you sure you want to delete "${selectedPlayer?.getName()}"?`}
        confirmText="Delete"
        handleClose={handleCancelPrompt}
        handleConfirm={deleteSelectedPlayer}
      />
      <NewPlayerFormDialog
        isOpenDialog={isAddPlayersDialog}
        closeDialog={closeAddPlayersDialog}
      />
    </>
  );
}
