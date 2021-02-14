import React, { useState, useCallback, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress } from '@material-ui/core';
import {
  FlexContainer,
  Button,
  Icon,
  ScrollableContainer,
  MainTitle,
} from '../../../styledElements';

import PromptDialog from '../../PromptDialog/PromptDialog';
import NewTeamForm from '../NewTeamForm/NewTeamForm';
import TeamManagementListItem from '../TeamManagementListItem/TeamManagementListItem';
import ComponentLoader from '../../ComponentLoader/ComponentLoader';
import FilterListInput from '../../FilterListInput/FilterListInput';
import useTeams from '../../../hooks/reactQuery/useTeams';
import useDeleteTeam from '../../../hooks/reactQuery/useDeleteTeam';

import { setSelectedTeam } from '../../../redux';
import ModalDialog from '../../ModalDialog/ModalDialog';
import { useQueryClient } from 'react-query';
import { isFullControl } from '../../../services/userPermissions';

export default function ManagementTeamsList() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { status, data: teams, isFetching } = useTeams(
    queryClient.getQueryData('dbConnection') !== undefined
  );

  const { selected: selectedTeam } = useSelector((state) => state.teams);
  const { user } = useSelector((state) => state.auth);

  const [filterValue, setFilterValue] = useState('');
  const [isDeleteTeamPrompt, setIsDeleteTeamPrompt] = useState(false);
  const [isNewTeamDialog, setIsNewTeamDialog] = useState(false);

  const setSelected = useCallback(
    (team) => {
      dispatch(setSelectedTeam(team));
    },
    [dispatch]
  );

  const openCreateTeamDialog = () => setIsNewTeamDialog(true);
  const closeCreateTeamDialog = () => setIsNewTeamDialog(false);

  const closeDeletePrompt = () => setIsDeleteTeamPrompt(false);

  const deleteTeam = useDeleteTeam(closeDeletePrompt);

  const deleteSelectedTeam = () => deleteTeam(selectedTeam.id);

  const cancelCreateTeamDialog = () => {
    closeCreateTeamDialog();
  };

  const getFilteredTeams = () => {
    const value = filterValue.toLowerCase();
    return value !== ''
      ? teams.filter(
          (team) =>
            team.name.includes(value) ||
            team.league.includes(value) ||
            team.country.includes(value)
        )
      : teams;
  };

  const deleteTeamPrompt = () => {
    setIsDeleteTeamPrompt(true);
  };

  // Auto-Select first team in list
  // useEffect(() => {
  //   if (teams?.length && !selectedTeam) {
  //     setSelected(teams[0]);
  //   }
  // }, [teams, selectedTeam, setSelected]);

  return (
    <Fragment>
      <FlexContainer
        borderRight
        minWidth={status === 'loading' ? '50vw' : false}
      >
        <ComponentLoader loading={status === 'loading'} size={100}>
          <FlexContainer fullWidth align="center">
            <MainTitle margin="0">Teams</MainTitle>
            {isFullControl(user) ? (
              <Button color="success" onClick={openCreateTeamDialog}>
                New Team
                <Icon spaceLeft>
                  <FontAwesomeIcon icon={faPlus} size="sm" />
                </Icon>
              </Button>
            ) : null}
            {isFetching && (
              <CircularProgress size={25} style={{ color: '#fff' }} />
            )}
          </FlexContainer>
          <FlexContainer fullWidth padding="0">
            {status === 'success' && (
              <FilterListInput
                onChange={setFilterValue}
                placeholder="Name, League, Country"
              />
            )}
          </FlexContainer>
          <ScrollableContainer padding="5px" heightDiff={350} fullWidth>
            <FlexContainer column fullWidth>
              {teams &&
                getFilteredTeams()
                  .sort((teamA, teamB) =>
                    teamA.name.toLowerCase() > teamB.name.toLowerCase() ? 1 : -1
                  )
                  .map((team) => (
                    <TeamManagementListItem
                      key={team.id}
                      team={team}
                      setSelectedTeam={setSelected}
                      selectedTeam={selectedTeam}
                      deleteTeamPrompt={deleteTeamPrompt}
                      user={user}
                    />
                  ))}
            </FlexContainer>
          </ScrollableContainer>
        </ComponentLoader>
      </FlexContainer>
      <PromptDialog
        isOpen={isDeleteTeamPrompt}
        title="Delete Team"
        content={`Are you sure you want to delete "${
          selectedTeam?.name || ''
        }"?`}
        confirmText="Delete"
        handleClose={closeDeletePrompt}
        handleConfirm={deleteSelectedTeam}
      />
      <ModalDialog
        component={NewTeamForm}
        componentProps={{ cb: cancelCreateTeamDialog }}
        isOpen={isNewTeamDialog}
        title="Create a New Team"
        label="new team"
        handleCancel={cancelCreateTeamDialog}
      />
    </Fragment>
  );
}
