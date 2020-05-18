import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import {
  FlexContainer, Button
} from '../../../../styledElements';

import clock from '../../../../workers/attackClock';
import { WebWorker } from '../../../../utils';


const Clock = styled.div`
  font-family: Led;
  font-size: 3rem;
  position: relative;
  width: 100px;
  height: 50px;
  padding: 15px;
  background-color: #000;
  color: ${props => props.theme.generic.color};

  ${props => props.stress && css`
      color: ${props => props.theme.error.color};
  `};

  span{
    position: absolute;
    left: 35px;
    top: 7px;
    user-select: none;
    text-shadow: 0 0 2px #fff, 0 0 2px #fff,
    0 0 1px ${props => props.theme.generic.color}, 
    0 0 1px ${props => props.theme.generic.color}, 
    0 0 1px ${props => props.theme.generic.color}, 
    0 0 1px ${props => props.theme.generic.color}, 
    0 0 1px ${props => props.theme.generic.color};
  }
`;

const convertSecToDuration = (sec) => {

  var hours = Math.floor(sec / 3600);
  var minutes = Math.floor((sec - (hours * 3600)) / 60);
  var seconds = Math.floor(sec - (hours * 3600) - (minutes * 60));
  // var ms = Math.floor((sec % 1) * 10);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }

  return `${seconds}`;
}


let webWorker, milliseconds;

export default function AttackClock({
  startTimeSeconds, startTimeMilliseconds
}) {
  const [isClockRunning, setIsClockRunning] = useState(false);
  const [attackClock, setAttackClock] = useState(convertSecToDuration(startTimeSeconds));
  const [timeLeft, setTimeLeft] = useState(startTimeMilliseconds);

  const resetClockCount = () => {
    milliseconds = startTimeMilliseconds;
    setTimeLeft(startTimeMilliseconds);
    setAttackClock(convertSecToDuration(startTimeSeconds));
  }

  const stopClock = () => {
    if (webWorker) {
      webWorker.stopWorker();
      webWorker = null;
    }
    setIsClockRunning(false);
  };

  const setClock = (e) => {
    setAttackClock(e.data.clock);
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
        <Button onClick={startClock} color="success" disabled={isClockRunning}>
          Start Clock
        </Button>
        <Button onClick={stopClock} color="error" disabled={!isClockRunning}>
          Stop Clock
        </Button>
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
