import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import NewGameDialog from '../../components/NewGameDialog/NewGameDialog';

import {
  createNewGame
} from '../../actions/GameControlActions';

const mapStateToProps = state => ({
  game: state.gameControl.game,
  isSaving: state.gameControl.isPending,
  error: state.gameControl.error
});

const mapDispatchToProps = dispatch => ({
  startGame: (teams) => dispatch(createNewGame(teams))
});


function GameControl({ game, isSaving, startGame }) {
  const [isNewGame, setIsNewGame] = useState(false);

  const openNewGame = () => {
    setIsNewGame(true);
  };

  const handleClose = () => {
    setIsNewGame(false);
  };

  useEffect(() => {
    openNewGame();
  }, []);

  return (
    <div>
      {
        game && (
          <div>
            {`${game.home} VS ${game.away}`}
          </div>
        )
      }
      <NewGameDialog
        isOpen={isNewGame}
        handleClose={handleClose}
        handleConfirm={startGame}
        isSaving={isSaving}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GameControl);