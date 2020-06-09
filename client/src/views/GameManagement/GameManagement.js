import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ComponentLoader from '../../components/ComponentLoader/ComponentLoader';
import CreateGameForm from '../../components/ActiveGameContol/CreateGameForm/CreateGameForm';
import TeamGameControl from '../../components/ActiveGameContol/TeamGameControl/TeamGameControl';

import GameControlMenu from '../../components/ActiveGameContol/GameControlMenu';
import GameStateControl from '../../components/ActiveGameContol/GameStateControl';
import SetPlayerStatsDialog from '../../components/ActiveGameContol/SetPlayerStatsDialog/SetPlayerStatsDialog';

import {
  GridContainer
} from '../../styledElements';

import {
  getActiveGame,
  setGame
} from '../../actions';

export default function GameManagement() {
  const dispatch = useDispatch();
  const history = useHistory();

  const isDBConnected = useSelector(state => state.db.isConnected);
  const {
    activeGamePending: isGameLoading,
    activeGameId,
    homeTeam,
    awayTeam,
    homePoints,
    awayPoints,
    homeFouls,
    awayFouls
  } = useSelector(state => state.game);

  const setActiveGame = useCallback((game) => dispatch(setGame(game)), [dispatch]);
  const loadActiveGame = useCallback(() => dispatch(getActiveGame()), [dispatch]);

  useEffect(() => {
    const unlisten = history.listen((location) => {
      if (location.pathName !== '/game') {
        setActiveGame(null);
      }
    });

    return () => {
      unlisten();
    }
  }, [setActiveGame, history]);

  useEffect(() => {
    if (isDBConnected && !activeGameId) {
      loadActiveGame();
    }
  }, [loadActiveGame, activeGameId, isDBConnected, setActiveGame]);

  return (
    <>
      <ComponentLoader loading={isGameLoading}>
        {
          !activeGameId ? (
            <CreateGameForm />
          ) : (
              <>
                <GameControlMenu />
                <GridContainer columnsSpread="auto auto auto" noPadding>
                  <GameStateControl />
                  <TeamGameControl
                    teamLocation="home"
                    team={homeTeam}
                    points={homePoints}
                    fouls={homeFouls}
                    gameId={activeGameId}
                    borderRight
                  />

                  <TeamGameControl
                    teamLocation="away"
                    team={awayTeam}
                    points={awayPoints}
                    fouls={awayFouls}
                    gameId={activeGameId}
                  />
                </GridContainer>
                <SetPlayerStatsDialog />
              </>
            )

        }
      </ComponentLoader>
    </>
  );
};
