import React, { Fragment, useState } from 'react';
import PlayersListItem from '../PlayersListItem/PlayersListItem';
import {
  MainTitle
} from '../../../styledElements';
import PromptDialog from '../../PromptDialog/PromptDialog';
import {
  deletePlayer,
} from '../../../api';

const DeletePrompt = ({
  selectedPlayer, isDeletePlayer, setIsDeletePlayer, setIsDeleting, isDeleting, deleteFromPlayer
}) => {

  const handleCancel = () => setIsDeletePlayer(false);

  const deleteSelectedPlayer = () => {
    setIsDeleting(true);
    deletePlayer(selectedPlayer.getId())
      .then((deletedPlayer) => {
        deleteFromPlayer(deletedPlayer);
        setIsDeleting(false);
        setIsDeletePlayer(false);
      })
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

export default function PlayersList({
  players, selectedPlayer, setSelectedPlayer, updatePlayers, deleteFromPlayer
}) {

  const [isDeletePlayer, setIsDeletePlayer] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deletePlayerPrompt = (player) => {
    setSelectedPlayer(player);
    setIsDeletePlayer(true);
  };

  return (
    <Fragment>
      {
        players && players.length > 0 ? (
          players
            .sort((playerA, playerB) => playerA.name.toLowerCase() > playerB.name.toLowerCase() ? 1 : -1)
            .map(player => (
              <PlayersListItem
                key={player.getId()}
                player={player}
                selectedPlayer={selectedPlayer}
                setSelectedPlayer={setSelectedPlayer}
                deletePlayerPrompt={deletePlayerPrompt}
                updatePlayers={updatePlayers}
              />
            ))
        ) : <MainTitle>No Players Assigned</MainTitle>
      }
      {
        isDeletePlayer && (
          <DeletePrompt
            selectedPlayer={selectedPlayer}
            isDeletePlayer={isDeletePlayer}
            setIsDeletePlayer={setIsDeletePlayer}
            setIsDeleting={setIsDeleting}
            isDeleting={isDeleting}
            deleteFromPlayer={deleteFromPlayer}
          />
        )
      }
    </Fragment>
  )
}
