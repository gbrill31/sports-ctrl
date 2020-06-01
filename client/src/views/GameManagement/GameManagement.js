import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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


  const isDBConnected = useSelector(state => state.db.isConnected);
  const activeGame = useSelector(state => state.games.activeGame);
  const isGameLoading = useSelector(state => state.games.activeGamePending);
  const gameClockStartTime = useSelector(state => state.gameClock.startTime);
  const attackClockStartTime = useSelector(state => state.attackClock.startTime);

  const setActiveGame = useCallback((game) => dispatch(setGame(game)), [dispatch]);
  const getCurrentGame = useCallback(() => dispatch(getActiveGame()), [dispatch]);
  const setAttackStart = useCallback((value) => dispatch(setAttackClockStart(value)), [dispatch]);
  const setGameStart = useCallback((value) => dispatch(setGameClockStart(value)), [dispatch]);


  useEffect(() => {
    if (!gameClockStartTime) {
      setGameStart(convertMinToMilli(Q_TIME));
    }
    if (!attackClockStartTime) {
      setAttackStart(convertSecToMilli(ATTACK_TIME));
    }
  }, [gameClockStartTime, attackClockStartTime, setGameStart, setAttackStart]);

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
                    borderRight
                  />
                  <TeamGameControl
                    teamLocation="away"
                    team={activeGame.getAwayTeam()}
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
