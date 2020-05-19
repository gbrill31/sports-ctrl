import React, { useState } from 'react';
import styled from 'styled-components';

import {
  FlexContainer, Button
} from '../../../../styledElements';
import PromptDialog from '../../../PromptDialog/PromptDialog';

import clock from '../../../../workers/clock';
import { WebWorker, convertSecToDuration } from '../../../../utils';

const Q_TIME_MINUTES = 12;
const Q_TIME_MILLISECONDS = Q_TIME_MINUTES * 60 * 1000;
let milliseconds = Q_TIME_MILLISECONDS;


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

let webWorker;

export default function GameClock() {
  const [isClockRunning, setIsClockRunning] = useState(false);
  const [isResetPrompt, setIsResetPrompt] = useState(false);
  const [gameClock, setGameClock] = useState(convertSecToDuration(Q_TIME_MINUTES * 60));

  const resetClockCount = () => {
    milliseconds = Q_TIME_MILLISECONDS;
    setGameClock(convertSecToDuration(Q_TIME_MINUTES * 60));
  }

  const stopClock = () => {
    if (webWorker) {
      webWorker.stopWorker();
      webWorker = null;
    }

    setIsClockRunning(false);
  };

  const setClock = (e) => {
    milliseconds = e.data.timeLeft;
    setGameClock(convertSecToDuration(e.data.timeLeft / 1000));
    if (milliseconds === 0) {
      setIsClockRunning(false);
    }
  }

  const startClock = () => {
    if (!isClockRunning && milliseconds === 0) {
      resetClockCount();
    }
    const worker = {
      file: clock,
      initialData: milliseconds
    }
    webWorker = new WebWorker();
    webWorker.startWorker(worker, setClock);
    setIsClockRunning(true);
  };

  const openResetPrompot = () => setIsResetPrompt(true);
  const handleCancelPrompt = () => setIsResetPrompt(false);

  const resetClock = () => {
    stopClock();
    resetClockCount();
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
            handleConfirm={resetClock}
          />
        )
      }
    </FlexContainer>
  )
}
