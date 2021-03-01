import React, { useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress } from '@material-ui/core';

import PromptDialog from '../../PromptDialog/PromptDialog';
import FilterListInput from '../../FilterListInput/FilterListInput';
import LeagueListItem from '../LeagueListItem/LeagueListItem';
import ComponentLoader from '../../ComponentLoader/ComponentLoader';
import NewLeagueForm from '../../LeaguesManagementControl/NewLeagueForm/NewLeagueForm';
import {
  FlexContainer,
  ScrollableContainer,
  Button,
  Icon,
} from '../../../styledElements';

import ModalDialog from '../../ModalDialog/ModalDialog';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { isFullControl } from '../../../services/userPermissions';
import useLeagues from '../../../hooks/reactQuery/useLeagues';
import useDeleteLeague from '../../../hooks/reactQuery/useDeleteLeague';

function LeaguesList() {
  const queryClient = useQueryClient();
  const [isDeleteLeaguePrompt, setIsDeleteLeaguePrompt] = useState(false);
  const [isNewLeagueDialog, setIsNewLeagueDialog] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  const { user } = useSelector((state) => state.auth);

  const [selectedLeague, setSelectedLeague] = useState(null);

  const openNewLeagueDialog = () => setIsNewLeagueDialog(true);
  const closeNewLeagueDialog = () => setIsNewLeagueDialog(false);

  const closeDeleteLeaguePrompt = () => setIsDeleteLeaguePrompt(false);

  const deleteSelectedLeague = useDeleteLeague(closeDeleteLeaguePrompt);

  const cancelNewLeague = () => {
    setSelectedLeague(null);
    closeNewLeagueDialog();
  };

  const deleteLeague = () => {
    deleteSelectedLeague(selectedLeague.id);
  };

  const { isLoading, data: leagues, isFetching } = useLeagues(
    queryClient.getQueryData('dbConnection') !== undefined
  );

  const openDeleteLeaguePrompt = () => {
    setIsDeleteLeaguePrompt(true);
  };

  const getFilteredLeagues = () => {
    const value = filterValue.toLowerCase();
    return value !== ''
      ? leagues.filter(
          (league) =>
            league.name.toLowerCase().includes(value) ||
            league.country.toLowerCase().includes(value)
        )
      : leagues;
  };

  return (
    <>
      <ComponentLoader loading={isLoading}>
        {isFullControl(user) ? (
          <FlexContainer fullWidth align="center">
            <FlexContainer>
              <Button color="success" onClick={openNewLeagueDialog}>
                New League
                <Icon spaceLeft>
                  <FontAwesomeIcon icon={faPlus} size="sm" />
                </Icon>
              </Button>
            </FlexContainer>
            {isFetching && (
              <CircularProgress size={25} style={{ color: '#fff' }} />
            )}
          </FlexContainer>
        ) : null}
        <FlexContainer fullWidth padding="0">
          {leagues?.length > 0 && (
            <FilterListInput
              onChange={setFilterValue}
              placeholder="League Name, Country"
              width="65%"
            />
          )}
        </FlexContainer>
        <ScrollableContainer padding="0" heightDiff={267}>
          <FlexContainer>
            {leagues &&
              getFilteredLeagues()
                .sort((leagueA, leagueB) =>
                  leagueA.name.toLowerCase() > leagueB.name.toLowerCase()
                    ? 1
                    : -1
                )
                .map((league) => (
                  <LeagueListItem
                    key={league.id}
                    league={league}
                    deleteLeaguePrompt={openDeleteLeaguePrompt}
                    isDeleteLeague={isDeleteLeaguePrompt}
                    selectedLeague={selectedLeague}
                    setSelectedLeague={setSelectedLeague}
                    openNewLeagueDialog={openNewLeagueDialog}
                    user={user}
                  />
                ))}
          </FlexContainer>
        </ScrollableContainer>
      </ComponentLoader>

      <PromptDialog
        isOpen={isDeleteLeaguePrompt}
        title="Delete League"
        content={`Are you sure you want to delete ${selectedLeague?.name}`}
        confirmText="Delete"
        handleClose={closeDeleteLeaguePrompt}
        handleConfirm={deleteLeague}
      />
      <ModalDialog
        component={NewLeagueForm}
        componentProps={{ cb: cancelNewLeague, league: selectedLeague }}
        isOpen={isNewLeagueDialog}
        title={`${selectedLeague ? 'Edit' : 'Create'} League`}
        label="create league"
        handleCancel={cancelNewLeague}
      />
    </>
  );
}

export default LeaguesList;
