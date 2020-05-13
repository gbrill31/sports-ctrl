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
  setPlayers
} from '../../../actions';

const DeletePrompt = ({
  isDeletePlayer, setIsDeletePlayer, selectedPlayer, isDeleting
}) => {
  const dispatch = useDispatch();

  const deleteSelected = useCallback((id) => dispatch(deletePlayer(id)), [dispatch]);
  const handleCancel = () => setIsDeletePlayer(false);


  const deleteSelectedPlayer = () => {
    deleteSelected(selectedPlayer.getId());
  }

  return (
    <PromptDialog
      isOpen={isDeletePlayer}
      title="Delete Team"
      content={`Are you sure you want to delete ${selectedPlayer.getName()}?`}
      confirmText="Delete"
      handleClose={handleCancel}
      handleConfirm={deleteSelectedPlayer}
      isPending={isDeleting}
    />
  )
}

export default function PlayersList() {
  const dispatch = useDispatch();

  const setSelected = useCallback((player) => dispatch(setSelectedPlayer(player)), [dispatch]);
  const savePlayersToTeam = useCallback((players) => dispatch(savePlayers(players)), [dispatch]);
  const updatePlayersItems = useCallback((players) => dispatch(setPlayers(players)), [dispatch]);
  const getPlayersByTeamId = useCallback((id) => dispatch(getPlayersTeamId(id)), [dispatch]);

  const selectedTeam = useSelector(state => state.teams.selected);

  const {
    selected: selectedPlayer,
    playerDeletePending: isDeleting,
    items: players,
    getPlayersPending: isPlayersLoading
  } = useSelector(state => state.players);


  const [isDeletePlayer, setIsDeletePlayer] = useState(false);
  const [isFilterPlayers, setIsFilterPlayers] = useState(false);
  const [isNewPlayerDialog, setIsNewPlayerDialog] = useState(false);
  const filterPlayersInput = useFormInput('');

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

  const openNewPlayer = () => setIsNewPlayerDialog(true);

  const updatePlayers = (addedPlayers) => {
    if (Array.isArray(addedPlayers)) {
      updatePlayersItems([...players, ...addedPlayers]);
    } else {
      updatePlayersItems([...players.filter(p => p.getId() !== addedPlayers.id), addedPlayers]);
    }
  }

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
      <FlexContainer>
        <ComponentLoader loading={isPlayersLoading} size={100}>
          <FlexContainer fullWidth align="center">
            <MainTitle margin="0" capitalize>{selectedTeam ? `${selectedTeam.getName()} Players` : ''}</MainTitle>
            {
              selectedTeam && (
                <Button
                  color="success"
                  onClick={openNewPlayer}
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
            <FlexContainer column align="center" fullWidth>
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
          <DeletePrompt
            selectedPlayer={selectedPlayer}
            isDeletePlayer={isDeletePlayer}
            setIsDeletePlayer={setIsDeletePlayer}
            isDeleting={isDeleting}
          />
        )
      }
      {
        isNewPlayerDialog && (
          <NewPlayerFormDialog
            isNewPlayer={isNewPlayerDialog}
            setIsNewPlayer={setIsNewPlayerDialog}
            selectedTeam={selectedTeam}
            updatePlayers={updatePlayers}
          />
        )
      }

    </Fragment>
  )
}
