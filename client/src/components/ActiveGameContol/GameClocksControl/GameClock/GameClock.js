import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { FlexContainer, Button, Icon } from '../../../../styledElements';
import {
  faHistory,
  faHandPaper,
  faStopwatch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PromptDialog from '../../../PromptDialog/PromptDialog';

import clock from '../../../../workers/clock';
import {
  WebWorker,
  convertSecToDuration,
  convertMilliToSec,
} from '../../../../utils';

import {
  startGameClock,
  stopGameClock,
  setGameClock,
  resetGameClock,
  setGameClockStart,
} from '../../../../redux';

const Clock = styled.div`
  font-family: Led2;
  font-size: 3.3rem;
  position: relative;
  width: 200px;
  height: 50px;
  padding: 15px;
  background-color: #000;
  border: 2px solid ${(props) => props.theme.secondary.color};
  color: ${(props) => props.theme.generic.color};

  span {
    position: absolute;
    left: 28px;
    top: 20px;
    user-select: none;
  }
`;

export default function GameClock({ league }) {
  const dispatch = useDispatch();
  const milliseconds = useRef();
  const webWorker = useRef(new WebWorker());

  const [isResetPrompt, setIsResetPrompt] = useState(false);
  const {
    isGameClockRunning: isClockRunning,
    gameClockValue: gameClock,
    startTime,
    isReset,
  } = useSelector((state) => state.gameClock);

  const setClockValue = useCallback((value) => dispatch(setGameClock(value)), [
    dispatch,
  ]);
  const startClock = useCallback(() => dispatch(startGameClock()), [dispatch]);
  const stopClock = useCallback(() => dispatch(stopGameClock()), [dispatch]);
  const setClockStartTime = useCallback(
    (value) => dispatch(setGameClockStart(value)),
    [dispatch]
  );

  const resetMilliseconds = useCallback(
    () => (milliseconds.current = startTime),
    [startTime]
  );

  const resetClock = useCallback(
    (value) => {
      resetMilliseconds();
      localStorage.removeItem('gameClock');
      setClockStartTime(value || league.quarterStartTime);
      dispatch(resetGameClock(value || league.quarterStartTime));
      setClockValue(
        convertSecToDuration(
          convertMilliToSec(value || league.quarterStartTime)
        )
      );
    },
    [dispatch, resetMilliseconds, setClockStartTime, setClockValue, league]
  );

  const getClockInitTime = useCallback(() => league.quarterStartTime, [league]);

  const setClock = useCallback(
    (e) => {
      milliseconds.current = e.data.timeLeft;
      setClockValue(convertSecToDuration(convertMilliToSec(e.data.timeLeft)));
      localStorage.setItem('gameClock', e.data.timeLeft);
      if (milliseconds.current === 0) {
        stopClock();
      }
    },
    [setClockValue, stopClock]
  );

  useEffect(() => {
    if (league && league.id) {
      setClockStartTime(league.quarterStartTime);
    }
  }, [setClockStartTime, league]);

  useEffect(() => {
    if (!gameClock && startTime) {
      const savedStartTime = parseInt(localStorage.getItem('gameClock'));
      milliseconds.current = !savedStartTime
        ? resetMilliseconds()
        : savedStartTime;
      setClockValue(
        convertSecToDuration(
          convertMilliToSec(savedStartTime || getClockInitTime())
        )
      );
    }
    if (isReset) {
      resetClock(startTime);
    }
  }, [
    gameClock,
    setClockValue,
    getClockInitTime,
    startTime,
    resetMilliseconds,
    isReset,
    resetClock,
  ]);

  useEffect(() => {
    const webWorkerInstance = webWorker.current;
    if (isClockRunning) {
      if (milliseconds.current === 0) resetMilliseconds();
      const worker = {
        file: clock,
        initialData: milliseconds.current,
      };

      webWorkerInstance.start(worker, setClock);
    }
    return () => {
      webWorkerInstance.stop();
    };
  }, [isClockRunning, resetClock, setClock, resetMilliseconds]);

  const openResetPrompt = () => {
    if (milliseconds.current === 0 && !isClockRunning) {
      resetClock();
    } else {
      setIsResetPrompt(true);
    }
  };
  const handleCancelPrompt = () => setIsResetPrompt(false);

  const resetClockConfirm = () => {
    stopClock();
    resetClock(getClockInitTime());
    handleCancelPrompt();
  };

  return (
    <FlexContainer column>
      <FlexContainer justify="space-evenly" fullWidth>
        {!isClockRunning ? (
          <Button onClick={startClock} color="success">
            Start Clock
            <Icon spaceLeft>
              <FontAwesomeIcon icon={faStopwatch} size="sm" />
            </Icon>
          </Button>
        ) : (
          <Button onClick={stopClock} color="error">
            Stop Clock
            <Icon spaceLeft>
              <FontAwesomeIcon icon={faHandPaper} size="sm" />
            </Icon>
          </Button>
        )}
        <Button onClick={openResetPrompt} color="secondary">
          Reset Clock
          <Icon spaceLeft>
            <FontAwesomeIcon icon={faHistory} size="sm" />
          </Icon>
        </Button>
      </FlexContainer>
      <FlexContainer justify="center" fullWidth>
        <Clock>
          <span>{gameClock}</span>
        </Clock>
      </FlexContainer>
      {isResetPrompt && (
        <PromptDialog
          isOpen={isResetPrompt}
          title="Reset Game Clock"
          content="Are you sure you want to reset the game clock?"
          confirmText="Reset"
          handleClose={handleCancelPrompt}
          handleConfirm={resetClockConfirm}
        />
      )}
    </FlexContainer>
  );
}
