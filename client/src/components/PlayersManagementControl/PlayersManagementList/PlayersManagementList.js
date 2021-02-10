import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress } from '@material-ui/core';
import {
  FlexContainer,
  Button,
  Icon,
  MainTitle,
  ScrollableContainer,
} from '../../../styledElements';

import PlayersManagementListItem from '../PlayersManagementListItem/PlayersManagementListItem';
import PromptDialog from '../../PromptDialog/PromptDialog';
import NewPlayerForm from '../NewPlayerForm/NewPlayerForm';
import ComponentLoader from '../../ComponentLoader/ComponentLoader';
import FilterListInput from '../../FilterListInput/FilterListInput';
import usePlayers from '../../../hooks/reactQuery/usePlayers';
import useDeletePlayer from '../../../hooks/reactQuery/useDeletePlayer';
import ModalDialog from '../../ModalDialog/ModalDialog';

export default function PlayersManagementList() {
  const selectedTeam = useSelector((state) => state.teams.selected);

  const { isLoading, isSuccess, data: players, isFetching } = usePlayers(
    selectedTeam !== null,
    selectedTeam?.id
  );

  const isPlayersLoading = () => isLoading || isFetching;

  const [isDeletePlayer, setIsDeletePlayer] = useState(false);
  const [isAddPlayersDialog, setIsAddPlayersDialog] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleCancelPrompt = () => setIsDeletePlayer(false);

  const setSelected = (player) => setSelectedPlayer(player);

  const openAddPlayersDialog = () => setIsAddPlayersDialog(true);
  const closeAddPlayersDialog = () => setIsAddPlayersDialog(false);

  const deleteSelected = useDeletePlayer(handleCancelPrompt);

  const deleteSelectedPlayer = () => deleteSelected(selectedPlayer);

  const getFilteredPlayers = () => {
    const value = filterValue.toLowerCase();
    return value !== ''
      ? players.filter(
          (player) =>
            player.name.includes(value) ||
            player.number.toString().includes(value)
        )
      : players;
  };

  const openDeletePlayerPrompt = () => {
    setIsDeletePlayer(true);
  };

  return (
    <>
      <FlexContainer minWidth={isPlayersLoading() || !players ? '50vw' : false}>
        <ComponentLoader loading={isPlayersLoading()} size={100}>
          <FlexContainer fullWidth align="center">
            <MainTitle margin="0" capitalize>
              {selectedTeam ? `${selectedTeam.name} Players` : ''}
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
              <CircularProgress size={25} style={{ color: '#fff' }} />
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
          <ScrollableContainer padding="5px" heightDiff={350} fullWidth>
            <FlexContainer column fullWidth>
              {isSuccess && players?.length > 0 ? (
                getFilteredPlayers()
                  .sort((playerA, playerB) =>
                    playerA.name.toLowerCase() > playerB.name.toLowerCase()
                      ? 1
                      : -1
                  )
                  .map((player) => (
                    <PlayersManagementListItem
                      key={player.id}
                      player={player}
                      selectedPlayer={selectedPlayer}
                      setSelectedPlayer={setSelected}
                      deletePlayerPrompt={openDeletePlayerPrompt}
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
        content={`Are you sure you want to delete "${selectedPlayer?.name}"?`}
        confirmText="Delete"
        handleClose={handleCancelPrompt}
        handleConfirm={deleteSelectedPlayer}
      />
      <ModalDialog
        component={NewPlayerForm}
        componentProps={{
          cb: closeAddPlayersDialog,
        }}
        isOpen={isAddPlayersDialog}
        title="Add players to team"
        handleCancel={closeAddPlayersDialog}
        label="add players"
      />
    </>
  );
}
