import React, { useState } from 'react';
import styled from 'styled-components';

import {
  FlexContainer, Button
} from '../../../../styledElements';

import clock from '../../../../workers/gameClock';
import { WebWorker } from '../../../../utils';

const Q_TIME_MINUTES = 12;
const Q_TIME_MILLISECONDS = Q_TIME_MINUTES * 60 * 1000;
let milliseconds = Q_TIME_MILLISECONDS;


const Clock = styled.div`
  font-family: Led;
  font-size: 3rem;
  position: relative;
  width: 200px;
  height: 50px;
  padding: 15px;
  background-color: #000;
  color: ${props => props.theme.generic.color};

  span{
    position: absolute;
    left: 23px;
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
  var ms = Math.floor((sec % 1) * 10);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }

  return `${minutes}:${seconds}:${ms}`;
}

export default function GameClock() {
  const [isClockRunning, setIsClockRunning] = useState(false);
  const [gameClock, setGameClock] = useState(convertSecToDuration(Q_TIME_MINUTES * 60));

  const stopGameClock = () => {
    WebWorker.stopWorker();
    setIsClockRunning(false);
  };

  const setClock = (e) => {
    milliseconds = e.data.timeLeft;
    setGameClock(e.data.clock);
  }

  const startGameClock = () => {
    const worker = {
      file: clock,
      initialData: milliseconds
    }
    WebWorker.startWorker(worker, setClock);
    setIsClockRunning(true);
  };

  const resetGameClock = () => {
    stopGameClock();
    milliseconds = Q_TIME_MILLISECONDS;
    setGameClock(convertSecToDuration(Q_TIME_MINUTES * 60));
  }

  return (
    <>
      <FlexContainer>
        <Button onClick={startGameClock} color="success" disabled={isClockRunning}>
          Start Clock
        </Button>
        <Button onClick={stopGameClock} color="error" disabled={!isClockRunning}>
          Stop Clock
        </Button>
        <Button onClick={resetGameClock} color="generic">
          Reset Clock
        </Button>
      </FlexContainer>
      <FlexContainer>
        <Clock>
          <span>{gameClock}</span>
        </Clock>
      </FlexContainer>
    </>
  )
}
