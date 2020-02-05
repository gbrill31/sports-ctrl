import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import NewGameDialog from '../../components/NewGameDialog/NewGameDialog';

import {
  createNewGame
} from '../../actions';

const mapStateToProps = state => ({
  game: state.games.game,
  isSaving: state.games.gameCreatePending,
  error: state.games.gameError
});

const mapDispatchToProps = dispatch => ({
  createGame: (teams) => dispatch(createNewGame(teams))
});


function GameControl({ game, isSaving, createGame }) {
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
        handleConfirm={createGame}
        isSaving={isSaving}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GameControl);