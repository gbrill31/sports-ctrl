import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useFormInput from '../../../hooks/useFormInput';
import { faFilter, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FlexContainer, Button, ButtonIcon, Input, ClearButton, ScrollableContainer,
  MainTitle
} from '../../../styledElements';

import PromptDialog from '../../PromptDialog/PromptDialog';
import NewTeamFormDialog from '../../../components/TeamsManagementControl/NewTeamFormDialog/NewTeamFormDialog';
import TeamListItem from '../TeamListItem/TeamListItem';
import ComponentLoader from '../../../components/ComponentLoader/ComponentLoader';

import {
  deleteTeam,
  setSelectedTeam,
  getAllTeams,
  openNewTeamDialog
} from '../../../actions';



// const DeletePrompt = ({ selectedTeam, isDeleteTeam, setIsDeleteTeam, isDeleting }) => {
//   const dispatch = useDispatch();



//   return (
//     <PromptDialog
//       isOpen={isDeleteTeam}
//       title="Delete Team"
//       content={`Are you sure you want to delete ${selectedTeam.getName()}?`}
//       confirmText="Delete"
//       handleClose={handleCancel}
//       handleConfirm={deleteSelectedTeam}
//       isPending={isDeleting}
//       pendingTitle="Deleting..."
//     />
//   )
// }


export default function TeamsList() {
  const dispatch = useDispatch();

  const isDBConnected = useSelector(state => state.db.isConnected);

  const {
    selected: selectedTeam,
    teamDeletePending: isDeleting,
    items: teams,
    getTeamsPending: isTeamsLoading
  } = useSelector(state => state.teams);

  const filterTeamsInput = useFormInput('');
  const [isFilterTeams, setIsFilterTeams] = useState(false);
  const [isDeleteTeamPrompt, setIsDeleteTeamPrompt] = useState(false);

  const setSelected = useCallback((team) => { dispatch(setSelectedTeam(team)) }, [dispatch]);
  const getTeams = useCallback(() => dispatch(getAllTeams()), [dispatch]);
  const openCreateTeam = useCallback(() => dispatch(openNewTeamDialog()), [dispatch]);
  const deleteSelectedTeam = useCallback(() => dispatch(deleteTeam(selectedTeam.getId())), [dispatch, selectedTeam]);

  const handleCancelPrompt = () => setIsDeleteTeamPrompt(false);

  const openFilterTeams = () => setIsFilterTeams(true);
  const closeFilterTeams = () => setIsFilterTeams(false);

  const clearFilterTeams = () => { filterTeamsInput.setValue('') };

  const getFilteredTeams = () => {
    const value = filterTeamsInput.value.toLowerCase();
    return isFilterTeams ? teams
      .filter(team => team.getName().includes(value) || team.getLeague().includes(value) || team.getCountry().includes(value)) : teams;
  }

  const deleteTeamPrompt = (team) => {
    setSelected(team);
    setIsDeleteTeamPrompt(true);
  };

  useEffect(() => {
    if (isDBConnected && !teams.length) {
      getTeams();
    }
  }, [getTeams, isDBConnected, teams]);

  useEffect(() => {
    if (teams.length && !selectedTeam) {
      setSelected(teams[0]);
    }
  }, [teams, selectedTeam, setSelected]);


  useEffect(() => {
    if (!isDeleting) {
      setIsDeleteTeamPrompt(false);
    }
  }, [isDeleting]);


  return (
    <Fragment>
      <FlexContainer borderRight minWidth="700">
        <ComponentLoader loading={isTeamsLoading} size={100}>
          <FlexContainer fullWidth align="center">
            <MainTitle margin="0">Teams</MainTitle>
            <Button
              color="generic"
              onClick={openCreateTeam}
            >
              New Team
              <ButtonIcon spaceLeft>
                <FontAwesomeIcon icon={faPlus} size="sm" />
              </ButtonIcon>
            </Button>
          </FlexContainer>
          <FlexContainer>
            {
              !isFilterTeams ? (
                <Button
                  color="secondary"
                  onClick={openFilterTeams}
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
                      onClick={closeFilterTeams}
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
                          placeholder="Name, League, Country"
                          value={filterTeamsInput.value}
                          onChange={filterTeamsInput.onChange}
                          color="#fff"
                          width="100%"
                        />
                        <ClearButton
                          color="#fff"
                          show={filterTeamsInput.value.length > 0}
                          onClick={clearFilterTeams}
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
                teams && getFilteredTeams()
                  .sort((teamA, teamB) => teamA.name.toLowerCase() > teamB.name.toLowerCase() ? 1 : -1)
                  .map(team => (
                    <TeamListItem
                      key={team.id}
                      team={team}
                      setSelectedTeam={setSelected}
                      selectedTeam={selectedTeam}
                      deleteTeamPrompt={deleteTeamPrompt}
                    />
                  ))
              }
            </FlexContainer>
          </ScrollableContainer>
        </ComponentLoader>
      </FlexContainer>
      {
        isDeleteTeamPrompt && (
          <PromptDialog
            isOpen={isDeleteTeamPrompt}
            title="Delete Team"
            content={`Are you sure you want to delete ${selectedTeam.getName()}?`}
            confirmText="Delete"
            handleClose={handleCancelPrompt}
            handleConfirm={deleteSelectedTeam}
            isPending={isDeleting}
            pendingTitle="Deleting..."
          />
        )
      }
      <NewTeamFormDialog />
    </Fragment>
  )
};