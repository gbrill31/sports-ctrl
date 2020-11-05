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
import useDb from '../../../hooks/useDb';
import useTeams from '../../../hooks/useTeams';
import useDeleteTeam from '../../../hooks/useDeleteTeam';

import { setSelectedTeam } from '../../../actions';
import ModalDialog from '../../ModalDialog/ModalDialog';

export default function ManagementTeamsList() {
  const dispatch = useDispatch();

  const { status: dbStatus } = useDb();

  const { status, data: teams, isFetching } = useTeams(dbStatus === 'success');

  const { selected: selectedTeam } = useSelector((state) => state.teams);

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

  const deleteSelectedTeam = () => deleteTeam(selectedTeam.getId());

  const cancelCreateTeamDialog = () => {
    closeCreateTeamDialog();
  };

  const getFilteredTeams = () => {
    const value = filterValue.toLowerCase();
    return value !== ''
      ? teams.filter(
          (team) =>
            team.getName().includes(value) ||
            team.getLeague().includes(value) ||
            team.getCountry().includes(value)
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
            <Button color="success" onClick={openCreateTeamDialog}>
              New Team
              <Icon spaceLeft>
                <FontAwesomeIcon icon={faPlus} size="sm" />
              </Icon>
            </Button>
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
                      key={team.getId()}
                      team={team}
                      setSelectedTeam={setSelected}
                      selectedTeam={selectedTeam}
                      deleteTeamPrompt={deleteTeamPrompt}
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
          selectedTeam?.getName() || ''
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
