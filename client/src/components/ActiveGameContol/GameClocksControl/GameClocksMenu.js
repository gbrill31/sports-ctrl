import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { faHistory, faHandPaper, faStopwatch, faClock, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PromptDialog from '../../PromptDialog/PromptDialog';
import useFormInput from '../../../hooks/useFormInput';
import useOutsideMouseDown from '../../../hooks/useOutsideMouseDown';

import {
  FlexContainer, Button, ButtonIcon, Input
} from '../../../styledElements';

import {
  startGameClock,
  stopGameClock,
  resetGameClock,
  startAttackClock,
  stopAttackClock,
  resetAttackClock,
  setGameClockStart,
  setAttackClockStart
} from '../../../actions';

import {
  convertSecToDuration,
  convertMinToMilli,
  convertMilliToMin,
  convertSecToMilli,
  convertMilliToSec
} from '../../../utils';

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

const attackClockOptions = {
  showMin: false,
  showSec: true,
  showMil: false
}

export default function GameClocksMenu() {
  const dispatch = useDispatch();

  const [isShowClocksMenu, setIsShowClocksMenu] = useState(false);
  const [isResetPrompt, setIsResetPrompt] = useState(false);
  const [isShowSetGameClock, setIsShowSetGameClock] = useState(false);
  const [isShowSetAttackClock, setIsShowSetAttackClock] = useState(false);

  const menuRef = useRef(null);
  useOutsideMouseDown(menuRef, isShowClocksMenu, () => {
    setIsShowClocksMenu(false);
    setIsShowSetAttackClock(false);
    setIsShowSetGameClock(false);
  });

  const {
    isGameClockRunning,
    startTime: gameClockStartTime
  } = useSelector(state => state.gameClock);
  const {
    isAttackClockRunning,
    startTime: attackClockStartTime
  } = useSelector(state => state.attackClock);


  const gameClockMinutes = useFormInput('');
  const gameClockSeconds = useFormInput('');
  const attackClockSeconds = useFormInput('');


  const startClockGame = useCallback(() => dispatch(startGameClock()), [dispatch]);
  const stopClockGame = useCallback(() => dispatch(stopGameClock()), [dispatch]);
  const startClockAttack = useCallback(() => dispatch(startAttackClock()), [dispatch]);
  const stopClockAttack = useCallback(() => dispatch(stopAttackClock()), [dispatch]);

  const setAttackClockStartTime = useCallback((value) => dispatch(setAttackClockStart(value)), [dispatch]);
  const setGameClockStartTime = useCallback((value) => dispatch(setGameClockStart(value)), [dispatch]);

  const getGameClockInitTime = () => convertSecToDuration(convertMilliToSec(gameClockStartTime));
  const getAttackClockInitTime = () => convertSecToDuration(convertMilliToSec(attackClockStartTime), attackClockOptions);

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
    if (isShowSetAttackClock) setIsShowSetAttackClock(false);
    setIsShowSetGameClock(!isShowSetGameClock)
  };
  const toggleSetAttackClock = () => {
    if (!isShowSetAttackClock) {
      attackClockSeconds.setValue(getFormattedSeconds(convertMilliToSec(attackClockStartTime)));
    }
    if (isShowSetGameClock) setIsShowSetGameClock(false);
    setIsShowSetAttackClock(!isShowSetAttackClock);
  }

  const setNewGameClockStart = () => {
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

  const setNewAttackClockStart = () => {
    const startTime = convertSecToMilli(parseInt(attackClockSeconds.value));
    setAttackClockStartTime(startTime);
    localStorage.removeItem('attackClock');
  };

  const handleInputKeyDown = (e) => {
    if (e.keyCode === 13 || e.key === 'Enter') {
      if (isShowSetGameClock) setNewGameClockStart();
      if (isShowSetAttackClock) setNewAttackClockStart();
    }
  }

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

  return (
    <>
      <FlexContainer
        padding="0"
        absolute
        top="90px"
        ref={menuRef}>
        <Button
          noRaduis
          margin="0"
          width="50px"
          color="menu"
          active={isShowClocksMenu}
          onClick={toggleClocksMenu}
        >
          <ButtonIcon>
            <FlexContainer padding="0" absolute left="58%" top="10%">
              <FontAwesomeIcon icon={faCog} size="sm" />
            </FlexContainer>
            <FontAwesomeIcon icon={faClock} size="lg" />
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
                  onKeyDown={handleInputKeyDown}
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
                  onKeyDown={handleInputKeyDown}
                />
              </FlexContainer>
              <FlexContainer align="center" justify="center">
                <Button
                  noRaduis
                  margin="0"
                  fullWidth
                  color="success"
                  onClick={setNewGameClockStart}
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
                onKeyDown={handleInputKeyDown}
              />
            </FlexContainer>
            <FlexContainer align="center" justify="center">
              <Button
                noRaduis
                margin="0"
                fullWidth
                color="success"
                onClick={setNewAttackClockStart}
              >
                Set
                          </Button>
            </FlexContainer>
          </ClocksSetMenu>
        </ClocksMenu>

      </FlexContainer>
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
    </>
  )
}
