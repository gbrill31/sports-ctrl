import React, { Fragment } from 'react';
import PlayersListItem from '../PlayersListItem/PlayersListItem';

export default function PlayersList({
  players
}) {

  return (
    <Fragment>
      {
        players && players.map(player => (<PlayersListItem key={player.id} player={player} />))
      }
    </Fragment>
  )
}
