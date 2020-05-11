import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ComponentLoader from '../../components/ComponentLoader/ComponentLoader';
import CreateGameForm from '../../components/GameControl/CreateGameForm/CreateGameForm';

import { MainTitle } from '../../styledElements';

import {
  getActiveGame
} from '../../actions';



export default function GameControl() {
  const dispatch = useDispatch();

  const isDBConnected = useSelector(state => state.db.isConnected);
  const activeGame = useSelector(state => state.games.activeGame);
  const isGameLoading = useSelector(state => state.games.activeGamePending);

  const getCurrentGame = useCallback(() => dispatch(getActiveGame()), [dispatch]);


  useEffect(() => {
    if (isDBConnected && !activeGame) {
      getCurrentGame();
    }
  }, [getCurrentGame, activeGame, isDBConnected]);

  return (
    <>
      <ComponentLoader loading={isGameLoading}>
        {
          !activeGame ? (
            <CreateGameForm />
          ) : (
              <MainTitle>{JSON.stringify(activeGame)}</MainTitle>
            )

        }
      </ComponentLoader >
    </>
  );
};
