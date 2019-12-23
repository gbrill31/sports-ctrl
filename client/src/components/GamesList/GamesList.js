import React from 'react';
import GameItem from '../GameItem/GameItem';

import './GamesList.scss';

const GamesList = ({ games }) => (
  <div className="games-wrapper">
    {
      games && games.map(game => (
        <GameItem key={game.id} game={game} />
      ))
    }
  </div>
);

export default GamesList;