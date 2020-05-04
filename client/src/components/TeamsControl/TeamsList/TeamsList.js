import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PromptDialog from '../../PromptDialog/PromptDialog';
import TeamListItem from '../TeamListItem/TeamListItem';

import { deleteTeam } from '../../../actions';



const DeletePrompt = ({ selectedTeam, isDeleteTeam, setIsDeleteTeam, isDeleting }) => {
  const dispatch = useDispatch();
  const deleteSelectedTeam = useCallback(() => dispatch(deleteTeam(selectedTeam.getId())), [dispatch, selectedTeam]);

  const handleCancel = () => setIsDeleteTeam(false);

  return (
    <PromptDialog
      isOpen={isDeleteTeam}
      title="Delete Team"
      content={`Are you sure you want to delete ${selectedTeam.getName()}?`}
      confirmText="Delete"
      handleClose={handleCancel}
      handleConfirm={deleteSelectedTeam}
      isPending={isDeleting}
    />
  )
}


export default function TeamsList({
  teams, selectedTeam, setSelectedTeam
}) {
  const [isDeleteTeam, setIsDeleteTeam] = useState(false);

  const isDeleting = useSelector(state => state.teams.teamDeletePending);

  const deleteTeamPrompt = (team) => {
    setSelectedTeam(team);
    setIsDeleteTeam(true);
  };

  useEffect(() => {
    if (teams.length && !selectedTeam) {
      setSelectedTeam(teams[0]);
    }
  }, [teams, selectedTeam, setSelectedTeam]);


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
              setSelectedTeam={setSelectedTeam}
              selectedTeam={selectedTeam}
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