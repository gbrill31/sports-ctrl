import React from 'react';

import ComponentLoader from '../../components/ComponentLoader/ComponentLoader';
import GameItem from '../GameItem/GameItem';

import './GamesList.scss';

const GamesList = ({ games, isLoading }) => (
  <div className="games-wrapper">
    <ComponentLoader loading={isLoading}>
      {
        games ? (
          games.map(game => (
            <GameItem key={game.id} game={game} />
          ))
        ) : <div> Loading... </div>
      }
    </ComponentLoader>
  </div>
);

export default GamesList;