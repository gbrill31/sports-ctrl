import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import {
  FlexContainer, Button
} from '../../../../styledElements';

import clock from '../../../../workers/attackClock';
import { WebWorker, convertSecToDuration } from '../../../../utils';


const Clock = styled.div`
  font-family: Led2;
  font-size: 3.3rem;
  position: relative;
  width: 100px;
  height: 50px;
  padding: 15px;
  background-color: #000;
  color: ${props => props.theme.generic.color};
  border: 2px solid ${props => props.theme.secondary.color};
  transition: color 0.3s ease-in-out;

  ${props => props.stress && css`
      color: ${props => props.theme.error.color};
      border-color: ${props => props.theme.error.color};
  `};

  span{
    position: absolute;
    left: 38px;
    top: 20px;
    user-select: none;
  }
`;

let webWorker, milliseconds;
const clockOptions = {
  showMin: false,
  showSec: true,
  showMil: false
}

export default function AttackClock({
  startTimeSeconds, startTimeMilliseconds
}) {
  const [isClockRunning, setIsClockRunning] = useState(false);
  const [attackClock, setAttackClock] = useState(convertSecToDuration(startTimeSeconds, clockOptions));
  const [timeLeft, setTimeLeft] = useState(startTimeMilliseconds);

  const resetClockCount = () => {
    milliseconds = startTimeMilliseconds;
    setTimeLeft(startTimeMilliseconds);
    setAttackClock(convertSecToDuration(startTimeSeconds, clockOptions));
  }

  const stopClock = () => {
    if (webWorker) {
      webWorker.stopWorker();
      webWorker = null;
    }
    setIsClockRunning(false);
  };

  const setClock = (e) => {
    setAttackClock(convertSecToDuration(e.data.timeLeft / 1000, clockOptions));
    milliseconds = e.data.timeLeft;
    setTimeLeft(e.data.timeLeft);
    if (e.data.timeLeft === 0) {
      setIsClockRunning(false);
    }
  }

  const startClock = () => {
    if (!isClockRunning && (milliseconds === 0 || !milliseconds)) {
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

  const resetClock = () => {
    resetClockCount();
    stopClock();
    if (isClockRunning) startClock();
  }

  return (
    <FlexContainer column>
      <FlexContainer justify="center" fullWidth>
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
        <Button onClick={resetClock} color="generic">
          Reset Clock
        </Button>
      </FlexContainer>
      <FlexContainer justify="center" fullWidth>
        <Clock stress={timeLeft / 1000 <= 10}>
          <span>{attackClock}</span>
        </Clock>
      </FlexContainer>
    </FlexContainer>
  )
}
