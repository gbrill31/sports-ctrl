import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';

import { faHistory, faHandPaper, faStopwatch, faClock, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ComponentLoader from '../../components/ComponentLoader/ComponentLoader';
import CreateGameForm from '../../components/ActiveGameContol/CreateGameForm/CreateGameForm';
import TeamGameControl from '../../components/ActiveGameContol/TeamGameControl/TeamGameControl';
import GameClocksControl from '../../components/ActiveGameContol/GameClocksControl/GameClocksControl';

import {
  GridContainer, FlexContainer, Button, ButtonIcon
} from '../../styledElements';

import {
  convertSecToDuration,
  convertMinToSec,
} from '../../utils';

import {
  getActiveGame,
  startGameClock,
  stopGameClock,
  resetGameClock,
  startAttackClock,
  stopAttackClock,
  resetAttackClock
} from '../../actions';

const ClocksMenu = styled.div`
  max-height: 0;
  max-width: 0;
  transition: max-height 0.3s ease-in-out, max-width 0.3s ease-in-out;
  overflow: hidden;

  ${props => props.show && css`
    max-height: 500px;
    max-width: 500px;
  `}
`;

const Q_TIME_MINUTES = 1;
const ATTACK_TIME_SECONDS = 24;
const attackClockOptions = {
  showMin: false,
  showSec: true,
  showMil: false
}

export default function GameManagement() {
  const dispatch = useDispatch();

  const [isShowClocksMenu, setIsShowClocksMenu] = useState(false);
  const [gameClockStartTime, setGameClockStartTime] = useState(Q_TIME_MINUTES);
  const [attackClockStartTime, setAttackClockStartTime] = useState(ATTACK_TIME_SECONDS);

  const isDBConnected = useSelector(state => state.db.isConnected);
  const activeGame = useSelector(state => state.games.activeGame);
  const isGameLoading = useSelector(state => state.games.activeGamePending);

  const getGameClockInitTime = () => convertSecToDuration(convertMinToSec(gameClockStartTime));
  const getAttackClockInitTime = () => convertSecToDuration(attackClockStartTime, attackClockOptions);

  const getCurrentGame = useCallback(() => dispatch(getActiveGame()), [dispatch]);

  const startClockGame = useCallback(() => dispatch(startGameClock()), [dispatch]);
  const stopClockGame = useCallback(() => dispatch(stopGameClock()), [dispatch]);
  const startClockAttack = useCallback(() => dispatch(startAttackClock()), [dispatch]);
  const stopClockAttack = useCallback(() => dispatch(stopAttackClock()), [dispatch]);

  const resetClockGame = (value) => {
    localStorage.removeItem('gameClock');
    dispatch(resetGameClock(getGameClockInitTime()));
  };
  const resetClockAttack = () => {
    dispatch(resetAttackClock(getAttackClockInitTime()));
  };

  const startAllClocks = () => {
    startClockGame();
    startClockAttack();
  }
  const stopAllClocks = () => {
    stopClockGame();
    stopClockAttack();
  }
  const resetAllClocks = () => {
    resetClockGame();
    resetClockAttack();
  }

  // const openClocksMenu = () => setIsShowClocksMenu(true);
  // const closeClocksMenu = () => setIsShowClocksMenu(false);

  const toggleClocksMenu = () => setIsShowClocksMenu(!isShowClocksMenu);


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
                <FlexContainer padding="0" absolute>
                  <Button
                    noRaduis
                    margin="0"
                    color="menu"
                    onClick={toggleClocksMenu}
                  >
                    <ButtonIcon>
                      <FontAwesomeIcon icon={faClock} size="lg" />
                      <FontAwesomeIcon icon={faCog} size="sm" />
                    </ButtonIcon>
                  </Button>
                  <ClocksMenu show={isShowClocksMenu}>
                    <FlexContainer column align="center" padding="0">
                      <Button
                        noRaduis
                        margin="0"
                        fullWidth
                        color="success"
                        onClick={startAllClocks}
                      >
                        Start Clocks
                      <ButtonIcon spaceLeft>
                          <FontAwesomeIcon icon={faStopwatch} size="sm" />
                        </ButtonIcon>
                      </Button>
                      <Button
                        noRaduis
                        margin="0"
                        fullWidth
                        // spaceTop
                        color="error"
                        onClick={stopAllClocks}
                      >
                        Stop Clocks
                      <ButtonIcon spaceLeft>
                          <FontAwesomeIcon icon={faHandPaper} size="sm" />
                        </ButtonIcon>
                      </Button>
                      <Button
                        noRaduis
                        margin="0"
                        fullWidth
                        // spaceTop
                        color="secondary"
                        onClick={resetAllClocks}
                      >
                        Reset Clocks
                      <ButtonIcon spaceLeft>
                          <FontAwesomeIcon icon={faHistory} size="sm" />
                        </ButtonIcon>
                      </Button>
                    </FlexContainer>
                  </ClocksMenu>
                </FlexContainer>
                <GameClocksControl
                  gameClockStartTime={gameClockStartTime}
                  attackClockStartTime={attackClockStartTime}
                />
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
      </ComponentLoader>
    </>
  );
};
