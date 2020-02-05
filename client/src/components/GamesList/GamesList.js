import React from 'react';
import GameItem from '../GameItem/GameItem';

import './GamesList.scss';

const GamesList = ({ games, isLoading }) => (
  <div className="games-wrapper">
    {
      !isLoading && games ? (
        games.map(game => (
          <GameItem key={game.id} game={game} />
        ))
      ) : <div> Loading... </div>
    }
  </div>
);

export default GamesList;