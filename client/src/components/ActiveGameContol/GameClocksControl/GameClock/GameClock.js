import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import {
  FlexContainer, Button
} from '../../../../styledElements';
import PromptDialog from '../../../PromptDialog/PromptDialog';

import clock from '../../../../workers/clock';
import {
  WebWorker,
  convertSecToDuration,
  convertMinToMilli,
  convertMinToSec,
  convertMilliToSec
} from '../../../../utils';

import {
  startGameClock,
  stopGameClock,
  setGameClock,
  resetGameClock
} from '../../../../actions';

const Clock = styled.div`
  font-family: Led2;
  font-size: 3.3rem;
  position: relative;
  width: 200px;
  height: 50px;
  padding: 15px;
  background-color: #000;
  border: 2px solid ${props => props.theme.secondary.color};
  color: ${props => props.theme.generic.color};

  span{
    position: absolute;
    left: 28px;
    top: 20px;
    user-select: none;
  }
`;

let milliseconds;
const webWorker = new WebWorker();

export default function GameClock({ startTimeMinutes }) {
  const dispatch = useDispatch();

  const [isResetPrompt, setIsResetPrompt] = useState(false);
  const {
    isGameClockRunning: isClockRunning,
    gameClockValue: gameClock
  } = useSelector(state => state.gameClock);

  const setClockValue = useCallback((value) => dispatch(setGameClock(value)), [dispatch]);
  const startClock = useCallback(() => dispatch(startGameClock()), [dispatch]);
  const stopClock = useCallback(() => dispatch(stopGameClock()), [dispatch]);

  const resetMilliseconds = useCallback(() => milliseconds = convertMinToMilli(startTimeMinutes), [startTimeMinutes]);

  const resetClock = useCallback((value) => {
    resetMilliseconds();
    dispatch(resetGameClock(value));
  }, [dispatch, resetMilliseconds]);

  const getClockInitTime = useCallback(() => convertSecToDuration(convertMinToSec(startTimeMinutes)), [startTimeMinutes]);

  const setClock = useCallback((e) => {
    milliseconds = e.data.timeLeft;
    setClockValue(convertSecToDuration(convertMilliToSec(e.data.timeLeft)));
    if (milliseconds === 0) {
      stopClock();
    }
  }, [setClockValue, stopClock]);

  useEffect(() => {
    if (!gameClock) {
      resetMilliseconds();
      setClockValue(getClockInitTime());
    }
  }, [gameClock, setClockValue, getClockInitTime, startTimeMinutes, resetMilliseconds]);

  useEffect(() => {
    if (isClockRunning) {
      if (milliseconds === 0) resetMilliseconds();
      const worker = {
        file: clock,
        initialData: milliseconds
      }

      webWorker.start(worker, setClock);
    }
    return () => {
      webWorker.stop();
    }
  }, [isClockRunning, resetClock, setClock, resetMilliseconds]);

  const openResetPrompot = () => {
    if (milliseconds === 0 && !isClockRunning) {
      resetClock();
    } else {
      setIsResetPrompt(true);
    }
  }
  const handleCancelPrompt = () => setIsResetPrompt(false);

  const resetClockConfirm = () => {
    stopClock();
    resetClock(getClockInitTime());
    handleCancelPrompt();
  }


  return (
    <FlexContainer column>
      <FlexContainer justify="space-evenly" fullWidth>
        {
          !isClockRunning ? (
            <Button onClick={startClock} color="success">
              Start Clock
            </Button>
          ) : (
              <Button onClick={stopClock} color="error">
                Stop Clock
              </Button>
            )
        }
        <Button onClick={openResetPrompot} color="generic">
          Reset Clock
        </Button>
      </FlexContainer>
      <FlexContainer justify="center" fullWidth>
        <Clock>
          <span>{gameClock}</span>
        </Clock>
      </FlexContainer>
      {
        isResetPrompt && (
          <PromptDialog
            isOpen={isResetPrompt}
            title="Reset Game Clock"
            content="Are you sure you want to reset the game clock?"
            confirmText="Reset"
            handleClose={handleCancelPrompt}
            handleConfirm={resetClockConfirm}
          />
        )
      }
    </FlexContainer>
  )
}
