import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PromptDialog from '../../PromptDialog/PromptDialog';
import TeamListItem from '../TeamListItem/TeamListItem';

import { getAllTeams, deleteTeam } from '../../../actions';



const DeletePrompt = ({ selectedTeam, isDeleteTeam, setIsDeleteTeam, isDeleting }) => {
  const dispatch = useDispatch();
  const deleteSelectedTeam = useCallback(() => dispatch(deleteTeam(selectedTeam.id)), [dispatch, selectedTeam.id]);

  const handleCancel = () => setIsDeleteTeam(false);

  return (
    <PromptDialog
      isOpen={isDeleteTeam}
      title="Delete Team"
      content={`Are you sure you want to delete ${selectedTeam.name}`}
      confirmText="Delete"
      handleClose={handleCancel}
      handleConfirm={deleteSelectedTeam}
      isPending={isDeleting}
    />
  )
}


export default function TeamsList() {

  const dispatch = useDispatch();
  const [isDeleteTeam, setIsDeleteTeam] = useState(false);

  const [selectedTeam, setSelectedTeam] = useState(null);

  const isDBConnected = useSelector(state => state.db.isConnected);
  const teams = useSelector(state => state.teams.items);
  const isDeleting = useSelector(state => state.teams.teamDeletePending);

  const getTeams = useCallback(() => dispatch(getAllTeams()), [dispatch]);

  const deleteTeamPrompt = team => () => {
    setSelectedTeam(team);
    setIsDeleteTeam(true);
  };


  useEffect(() => {
    if (isDBConnected) {
      getTeams();
    }
  }, [getTeams, isDBConnected]);


  useEffect(() => {
    if (!isDeleting) {
      setIsDeleteTeam(false);
    }
  }, [isDeleting]);


  return (
    <Fragment>
      {
        teams && teams
          .sort((teamA, teamB) => teamA.name.toLowerCase() > teamB.name.toLowerCase() ? 1 : -1)
          .map(team => (
            <TeamListItem
              key={team.id}
              team={team}
              deleteTeamPrompt={deleteTeamPrompt}
            />
          ))
      }
      {
        isDeleteTeam && (
          <DeletePrompt
            selectedTeam={selectedTeam}
            isDeleteTeam={isDeleteTeam}
            setIsDeleteTeam={setIsDeleteTeam}
            isDeleting={isDeleting}
          />
        )
      }
    </Fragment>
  )
};