import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ComponentLoader from '../../components/ComponentLoader/ComponentLoader';
import CreateGameForm from '../../components/ActiveGameContol/CreateGameForm/CreateGameForm';
import TeamGameControl from '../../components/ActiveGameContol/TeamGameControl/TeamGameControl';
import GameClocksControl from '../../components/ActiveGameContol/GameClocksControl/GameClocksControl';
import GameClocksMenu from '../../components/ActiveGameContol/GameClocksControl/GameClocksMenu';
import SetPlayerStatsDialog from '../../components/ActiveGameContol/SetPlayerStatsDialog/SetPlayerStatsDialog';

import {
  GridContainer
} from '../../styledElements';

import {
  getActiveGame,
  setGame,
  setGameClockStart,
  setAttackClockStart
} from '../../actions';

import {
  convertMinToMilli,
  convertSecToMilli
} from '../../utils';

/**
 * Need to move clocks settings to DB
 */
const Q_TIME = 12; //Minutes
const ATTACK_TIME = 24; //Seconds

export default function GameManagement() {
  const dispatch = useDispatch();
  const history = useHistory();

  const isDBConnected = useSelector(state => state.db.isConnected);
  const activeGame = useSelector(state => state.games.activeGame);
  const isGameLoading = useSelector(state => state.games.activeGamePending);
  const gameClockStartTime = useSelector(state => state.gameClock.startTime);
  const attackClockStartTime = useSelector(state => state.attackClock.startTime);

  const setActiveGame = useCallback((game) => dispatch(setGame(game)), [dispatch]);
  const getCurrentGame = useCallback(() => dispatch(getActiveGame()), [dispatch]);
  const setAttackStartClock = useCallback((value) => dispatch(setAttackClockStart(value)), [dispatch]);
  const setGameStartClock = useCallback((value) => dispatch(setGameClockStart(value)), [dispatch]);

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
    if (!gameClockStartTime) {
      setGameStartClock(convertMinToMilli(Q_TIME));
    }
    if (!attackClockStartTime) {
      setAttackStartClock(convertSecToMilli(ATTACK_TIME));
    }
  }, [gameClockStartTime, attackClockStartTime, setGameStartClock, setAttackStartClock]);

  useEffect(() => {
    if (isDBConnected && !activeGame) {
      getCurrentGame();
    }
  }, [getCurrentGame, activeGame, isDBConnected, setActiveGame]);

  return (
    <>
      <ComponentLoader loading={isGameLoading}>
        {
          !activeGame ? (
            <CreateGameForm />
          ) : (
              <>
                <GameClocksMenu />
                <GameClocksControl />
                <GridContainer columnsSpread="auto auto">
                  <TeamGameControl
                    teamLocation="home"
                    team={activeGame.getHomeTeam()}
                    points={activeGame.getHomePoints()}
                    gameId={activeGame.id}
                    borderRight
                  />
                  <TeamGameControl
                    teamLocation="away"
                    team={activeGame.getAwayTeam()}
                    points={activeGame.getAwayPoints()}
                    gameId={activeGame.id}
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
