import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';

import { faHistory, faHandPaper, faStopwatch, faClock, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ComponentLoader from '../../components/ComponentLoader/ComponentLoader';
import CreateGameForm from '../../components/ActiveGameContol/CreateGameForm/CreateGameForm';
import TeamGameControl from '../../components/ActiveGameContol/TeamGameControl/TeamGameControl';
import GameClocksControl from '../../components/ActiveGameContol/GameClocksControl/GameClocksControl';
import PromptDialog from '../../components/PromptDialog/PromptDialog';
import useFormInput from '../../hooks/useFormInput';
import useOutsideMouseDown from '../../hooks/useOutsideMouseDown'

import {
  GridContainer, FlexContainer, Button, ButtonIcon, Input
} from '../../styledElements';

import {
  convertSecToDuration,
  convertMinToMilli,
  convertMilliToMin,
  convertSecToMilli,
  convertMilliToSec
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
  color: #fff;
  z-index: 999;

  h4{
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    margin: 0;
    padding: 10px 0;
    background: #444;
  }

  ${props => props.show && css`
    max-height: 500px;
    max-width: 500px;
  `}
`;

const ClocksSetMenu = styled.div`
  max-height: 0;
  transition: max-height 0.3s ease-in-out;
  overflow: hidden;
  background: #272727;
  width: 150px;

  ${props => props.show && css`
    max-height: 500px;
  `}
`;

/**
 * Need to move clocks settings to DB
 */
const Q_TIME = 12; //Minutes
const ATTACK_TIME = 24; //Seconds
const attackClockOptions = {
  showMin: false,
  showSec: true,
  showMil: false
}

export default function GameManagement() {
  const dispatch = useDispatch();

  const [isResetPrompt, setIsResetPrompt] = useState(false);
  const [isShowClocksMenu, setIsShowClocksMenu] = useState(false);
  const [isShowSetGameClock, setIsShowSetGameClock] = useState(false);
  const [isShowSetAttackClock, setIsShowSetAttackClock] = useState(false);
  const [gameClockStartTime, setGameClockStartTime] = useState(convertMinToMilli(Q_TIME));
  const [attackClockStartTime, setAttackClockStartTime] = useState(convertSecToMilli(ATTACK_TIME));
  const gameClockMinutes = useFormInput('');
  const gameClockSeconds = useFormInput('');
  const attackClockSeconds = useFormInput('');

  const menuRef = useRef(null);
  useOutsideMouseDown(menuRef, isShowClocksMenu, () => {
    setIsShowClocksMenu(false);
    setIsShowSetAttackClock(false);
    setIsShowSetGameClock(false);
  });

  const isDBConnected = useSelector(state => state.db.isConnected);
  const activeGame = useSelector(state => state.games.activeGame);
  const isGameLoading = useSelector(state => state.games.activeGamePending);
  const {
    isGameClockRunning
  } = useSelector(state => state.gameClock);
  const {
    isAttackClockRunning
  } = useSelector(state => state.attackClock);

  const getGameClockInitTime = () => convertSecToDuration(convertMilliToSec(gameClockStartTime));
  const getAttackClockInitTime = () => convertSecToDuration(convertMilliToSec(attackClockStartTime), attackClockOptions);

  const getCurrentGame = useCallback(() => dispatch(getActiveGame()), [dispatch]);

  const startClockGame = useCallback(() => dispatch(startGameClock()), [dispatch]);
  const stopClockGame = useCallback(() => dispatch(stopGameClock()), [dispatch]);
  const startClockAttack = useCallback(() => dispatch(startAttackClock()), [dispatch]);
  const stopClockAttack = useCallback(() => dispatch(stopAttackClock()), [dispatch]);

  const resetClockGame = () => {
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
  const resetAllClocksPrompt = () => setIsResetPrompt(true);
  const handleCancelPrompt = () => setIsResetPrompt(false);
  const resetAllClocksConfirm = () => {
    resetClockGame();
    resetClockAttack();
    handleCancelPrompt();
  }

  const toggleClocksMenu = () => {
    setIsShowClocksMenu(!isShowClocksMenu);
  }

  const getFormattedSeconds = (value) => {
    const numValue = parseInt(value);
    return numValue < 10 ? `0${numValue}` : `${numValue}`;
  }

  const toggleSetGameClock = () => {
    if (!isShowSetGameClock) {
      const gameMinutes = convertMilliToMin(gameClockStartTime);
      const gameSeconds = Math.floor(convertMilliToSec(gameClockStartTime) - (gameMinutes * 60));
      gameClockMinutes.setValue(gameMinutes);
      gameClockSeconds.setValue(getFormattedSeconds(gameSeconds));
    }
    setIsShowSetGameClock(!isShowSetGameClock)
  };
  const toggleSetAttackClock = () => {
    if (!isShowSetAttackClock) {
      attackClockSeconds.setValue(getFormattedSeconds(convertMilliToSec(attackClockStartTime)));
    }
    setIsShowSetAttackClock(!isShowSetAttackClock);
  }

  const setGameClockStart = () => {
    const startTime = convertSecToMilli(parseInt(gameClockSeconds.value)) + convertMinToMilli(parseInt(gameClockMinutes.value));
    setGameClockStartTime(startTime);
    localStorage.removeItem('gameClock');
  }

  const handleGameClockSecondsChange = (e) => {
    const { value } = e.target;
    gameClockSeconds.setValue(getFormattedSeconds(value));
  }

  const handleAttackClockChange = (e) => {
    const { value } = e.target;
    attackClockSeconds.setValue(getFormattedSeconds(value));
  }

  const setAttackClockStart = () => {
    const startTime = convertSecToMilli(parseInt(attackClockSeconds.value));
    setAttackClockStartTime(startTime);
    localStorage.removeItem('attackClock');
  };

  useEffect(() => {
    if (isShowSetGameClock && isGameClockRunning) {
      setIsShowSetGameClock(false);
    }
  }, [isShowSetGameClock, isGameClockRunning, setIsShowSetGameClock]);

  useEffect(() => {
    if (isShowSetAttackClock && isAttackClockRunning) {
      setIsShowSetAttackClock(false);
    }
  }, [isShowSetAttackClock, isAttackClockRunning, setIsShowSetAttackClock]);

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
                <FlexContainer padding="0" absolute ref={menuRef}>
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
                      <h4>Control</h4>
                      <Button
                        noRaduis
                        margin="0"
                        fullWidth
                        color="success"
                        onClick={startAllClocks}
                      >
                        Start All Clocks
                      <ButtonIcon spaceLeft>
                          <FontAwesomeIcon icon={faStopwatch} size="sm" />
                        </ButtonIcon>
                      </Button>
                      <Button
                        noRaduis
                        margin="0"
                        fullWidth
                        color="error"
                        onClick={stopAllClocks}
                      >
                        Stop All Clocks
                      <ButtonIcon spaceLeft>
                          <FontAwesomeIcon icon={faHandPaper} size="sm" />
                        </ButtonIcon>
                      </Button>
                      <Button
                        noRaduis
                        margin="0"
                        fullWidth
                        color="secondary"
                        onClick={resetAllClocksPrompt}
                      >
                        Reset All Clocks
                      <ButtonIcon spaceLeft>
                          <FontAwesomeIcon icon={faHistory} size="sm" />
                        </ButtonIcon>
                      </Button>
                      <h4>Setup</h4>
                      <Button
                        noRaduis
                        margin="0"
                        fullWidth
                        color="menu"
                        active={isShowSetGameClock}
                        onClick={toggleSetGameClock}
                        disabled={isGameClockRunning}
                      >
                        Set Game Clock
                      </Button>
                      <ClocksSetMenu show={isShowSetGameClock}>
                        <FlexContainer justify="space-between" align="center">
                          <Input
                            id="gameClockMinutes"
                            spaceRight
                            color="#fff"
                            value={gameClockMinutes.value}
                            onChange={gameClockMinutes.onChange}
                            type="number"
                            min="0"
                            width="15%"
                            align="center"
                          />
                          <span>:</span>
                          <Input
                            id="gameClockSeconds"
                            spaceLeft
                            color="#fff"
                            value={gameClockSeconds.value}
                            onChange={handleGameClockSecondsChange}
                            type="number"
                            min="0"
                            max="59"
                            width="15%"
                            align="center"
                          />
                        </FlexContainer>
                        <FlexContainer align="center" justify="center">
                          <Button
                            noRaduis
                            margin="0"
                            fullWidth
                            color="success"
                            onClick={setGameClockStart}
                          >
                            Set
                          </Button>
                        </FlexContainer>
                      </ClocksSetMenu>
                    </FlexContainer>
                    <Button
                      noRaduis
                      margin="0"
                      fullWidth
                      color="menu"
                      active={isShowSetAttackClock}
                      onClick={toggleSetAttackClock}
                      disabled={isAttackClockRunning}
                    >
                      Set Attack Clock
                      </Button>
                    <ClocksSetMenu show={isShowSetAttackClock}>
                      <FlexContainer justify="center" align="center">
                        <Input
                          id="attackClockSeconds"
                          color="#fff"
                          value={attackClockSeconds.value}
                          onChange={handleAttackClockChange}
                          type="number"
                          min="1"
                          max="60"
                          width="15%"
                          align="center"
                        />
                      </FlexContainer>
                      <FlexContainer align="center" justify="center">
                        <Button
                          noRaduis
                          margin="0"
                          fullWidth
                          color="success"
                          onClick={setAttackClockStart}
                        >
                          Set
                          </Button>
                      </FlexContainer>
                    </ClocksSetMenu>
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
        {
          isResetPrompt && (
            <PromptDialog
              isOpen={isResetPrompt}
              title="Reset Game Clock"
              content="Are you sure you want to reset the game clock?"
              confirmText="Reset"
              handleClose={handleCancelPrompt}
              handleConfirm={resetAllClocksConfirm}
            />
          )
        }
      </ComponentLoader>
    </>
  );
};
