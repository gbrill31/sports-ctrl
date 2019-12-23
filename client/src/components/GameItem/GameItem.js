import React from 'react';

import './GameItem.scss';

const GameItem = ({ game }) => {
  return (
    <div className="game-wrapper">
      <span className="team home">Home: {game.home}</span>
      <span>VS</span>
      <span className="team away">Away: {game.away}</span>
      <span className="game-venue">{game.venue}</span>
    </div>
  )
};

export default GameItem;