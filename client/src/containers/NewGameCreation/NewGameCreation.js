import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CircularProgress, Button, TextField
} from '@material-ui/core';
// import NewGameDialog from '../../components/NewGameDialog/NewGameDialog';

import {
  createNewGame
} from '../../actions';


function NewGameCreation() {
  const dispatch = useDispatch();
  const game = useSelector(state => state.games.game);
  const isSaving = useSelector(state => state.games.gameCreatePending);
  const error = useSelector(state => state.games.gameError);

  const [homeName, setHomeName] = useState('');
  const [awayName, setAwayName] = useState('');
  // const [isNewGame, setIsNewGame] = useState(false);

  const createGame = useCallback((teams) => dispatch(createNewGame(teams)), [dispatch]);

  const onHomeInputChange = (e) => setHomeName(e.target.value);
  const onAwayInputChange = (e) => setAwayName(e.target.value);


  useEffect(() => {
    // openNewGame();
  }, []);

  return (
    <div>
      <h4>Select Teams</h4>
      <TextField
        autoFocus
        margin="dense"
        id="home"
        label="Home Team"
        type="text"
        placeholder="Home team"
        value={homeName}
        onChange={onHomeInputChange}
      />
      <TextField
        margin="dense"
        id="away"
        label="Away Team"
        type="text"
        placeholder="Away team"
        value={awayName}
        onChange={onAwayInputChange}
      />
      {/* {
        game && (
          <div>
            {`${game.home} VS ${game.away}`}
          </div>
        )
      } */}
      {/* <NewGameDialog
        isOpen={isNewGame}
        handleClose={handleClose}
        handleConfirm={createGame}
        isSaving={isSaving}
      /> */}
    </div>
  );
};

export default NewGameCreation;