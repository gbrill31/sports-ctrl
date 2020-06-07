import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useFormInput from '../../../hooks/useFormInput';
import { faPlus, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FlexContainer, Button, ButtonIcon, Input, ClearButton, MainTitle,
  ScrollableContainer
} from '../../../styledElements';

import PlayersListItem from '../PlayersListItem/PlayersListItem';
import PromptDialog from '../../PromptDialog/PromptDialog';
import NewPlayerFormDialog from '../../../components/PlayersManagementControl/NewPlayerFormDialog/NewPlayerFormDialog';
import ComponentLoader from '../../../components/ComponentLoader/ComponentLoader';

import {
  setSelectedPlayer,
  deletePlayer,
  savePlayers,
  getPlayersTeamId,
  openNewPlayersDialog
} from '../../../actions';

export default function PlayersList() {
  const dispatch = useDispatch();

  const handleCancelPrompt = () => setIsDeletePlayer(false);

  const selectedTeam = useSelector(state => state.teams.selected);

  const {
    selected: selectedPlayer,
    playerDeletePending: isDeleting,
    items: players,
    getPlayersPending: isPlayersLoading
  } = useSelector(state => state.players);


  const [isDeletePlayer, setIsDeletePlayer] = useState(false);
  const [isFilterPlayers, setIsFilterPlayers] = useState(false);
  const filterPlayersInput = useFormInput('');

  const setSelected = useCallback((player) => dispatch(setSelectedPlayer(player)), [dispatch]);
  const savePlayersToTeam = useCallback((players) => dispatch(savePlayers(players)), [dispatch]);
  const getPlayersByTeamId = useCallback((id) => dispatch(getPlayersTeamId(id)), [dispatch]);
  const openAddPlayers = useCallback(() => dispatch(openNewPlayersDialog()), [dispatch]);

  const deleteSelected = useCallback((id) => dispatch(deletePlayer(id)), [dispatch]);

  const deleteSelectedPlayer = () => {
    deleteSelected(selectedPlayer.getId());
  }


  useEffect(() => {
    if (selectedTeam) {
      getPlayersByTeamId(selectedTeam.getId());
    }
  }, [selectedTeam, getPlayersByTeamId]);


  useEffect(() => {
    if (!isDeleting) {
      setIsDeletePlayer(false);
    }
  }, [isDeleting]);


  const openFilterPlayers = () => setIsFilterPlayers(true);
  const closeFilterPlayers = () => setIsFilterPlayers(false);

  const clearFilterPlayers = () => { filterPlayersInput.setValue('') };

  const getFilteredPlayers = () => {
    const value = filterPlayersInput.value.toLowerCase();
    return isFilterPlayers ? players
      .filter(player => player.getName().includes(value) || player.getNumber().toString().includes(value)) : players;
  }

  const deletePlayerPrompt = (player) => {
    setSelected(player);
    setIsDeletePlayer(true);
  };

  return (
    <Fragment>
      <FlexContainer minWidth={isPlayersLoading ? '50vw' : false}>
        <ComponentLoader loading={isPlayersLoading} size={100}>
          <FlexContainer fullWidth align="center">
            <MainTitle margin="0" capitalize>{selectedTeam ? `${selectedTeam.getName()} Players` : ''}</MainTitle>
            {
              selectedTeam && (
                <Button
                  color="success"
                  onClick={openAddPlayers}
                >
                  Add Players
                  <ButtonIcon spaceLeft>
                    <FontAwesomeIcon icon={faPlus} size="sm" />
                  </ButtonIcon>
                </Button>
              )
            }
          </FlexContainer>
          <FlexContainer>
            {
              !isFilterPlayers ? (
                <Button
                  color="secondary"
                  onClick={openFilterPlayers}
                >
                  Filter
                  <ButtonIcon spaceLeft>
                    <FontAwesomeIcon icon={faFilter} size="sm" />
                  </ButtonIcon>
                </Button>
              ) : (
                  <>
                    <Button
                      color="error"
                      onClick={closeFilterPlayers}
                    >
                      Close Filter
                      <ButtonIcon spaceLeft>
                        <FontAwesomeIcon icon={faTimes} size="sm" />
                      </ButtonIcon>
                    </Button>
                    <FlexContainer align="center" fullWidth>
                      <FlexContainer padding="0" width="85%">
                        <Input
                          type="text"
                          placeholder="Player Name, Number"
                          value={filterPlayersInput.value}
                          onChange={filterPlayersInput.onChange}
                          color="#fff"
                          width="100%"
                        />
                        <ClearButton
                          color="#fff"
                          show={filterPlayersInput.value.length > 0}
                          onClick={clearFilterPlayers}
                        >
                          <ButtonIcon>
                            <FontAwesomeIcon icon={faTimes} size="sm" />
                          </ButtonIcon>
                        </ClearButton>
                      </FlexContainer>
                    </FlexContainer>
                  </>
                )
            }
          </FlexContainer>
          <ScrollableContainer padding="5px" heightDiff={400} fullWidth>
            <FlexContainer column fullWidth>
              {
                players && players.length > 0 ? (
                  getFilteredPlayers()
                    .sort((playerA, playerB) => playerA.name.toLowerCase() > playerB.name.toLowerCase() ? 1 : -1)
                    .map(player => (
                      <PlayersListItem
                        key={player.getId()}
                        player={player}
                        selectedPlayer={selectedPlayer}
                        setSelectedPlayer={setSelected}
                        deletePlayerPrompt={deletePlayerPrompt}
                        updatePlayers={savePlayersToTeam}
                      />
                    ))
                ) : <MainTitle>No Players Assigned</MainTitle>
              }
            </FlexContainer>
          </ScrollableContainer>
        </ComponentLoader>
      </FlexContainer>

      {
        isDeletePlayer && (
          <PromptDialog
            isOpen={isDeletePlayer}
            title="Delete Team"
            content={`Are you sure you want to delete ${selectedPlayer.getName()}?`}
            confirmText="Delete"
            handleClose={handleCancelPrompt}
            handleConfirm={deleteSelectedPlayer}
            isPending={isDeleting}
            pendingTitle="Deleting..."
          />
        )
      }
      <NewPlayerFormDialog />
    </Fragment>
  )
}
