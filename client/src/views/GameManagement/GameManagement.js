import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ComponentLoader from '../../components/ComponentLoader/ComponentLoader';
import CreateGameForm from '../../components/ActiveGameContol/CreateGameForm/CreateGameForm';
import TeamGameControl from '../../components/ActiveGameContol/TeamGameControl/TeamGameControl';
import GameClockControl from '../../components/ActiveGameContol/GameClocksControl/GameClocksControl';

import { GridContainer } from '../../styledElements';

import {
  getActiveGame
} from '../../actions';



export default function GameManagement() {
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
              <>
                <GameClockControl />
                <GridContainer columnsSpread="auto auto">
                  <TeamGameControl
                    teamLocation="home"
                    team={activeGame.getHomeTeam()}
                    borderRight
                  />
                  <TeamGameControl teamLocation="away" team={activeGame.getAwayTeam()} />
                </GridContainer>
              </>
            )

        }
      </ComponentLoader >
    </>
  );
};
