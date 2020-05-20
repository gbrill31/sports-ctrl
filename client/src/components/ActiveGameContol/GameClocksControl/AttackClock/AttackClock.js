import React, { useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import {
  FlexContainer, Button, ButtonIcon
} from '../../../../styledElements';
import { faHistory, faHandPaper, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import clock from '../../../../workers/clock';
import {
  WebWorker,
  convertSecToDuration,
  convertSecToMilli,
  convertMilliToSec
} from '../../../../utils';

import {
  startAttackClock,
  stopAttackClock,
  setAttackClock,
  resetAttackClock,
  setAttackClockTimeleft
} from '../../../../actions';


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

let milliseconds;
const webWorker = new WebWorker();
const clockOptions = {
  showMin: false,
  showSec: true,
  showMil: false
}

export default function AttackClock({
  startTimeSeconds
}) {
  const dispatch = useDispatch();

  const {
    isAttackClockRunning: isClockRunning,
    attackClockValue: attackClock,
    isReset,
    timeLeft
  } = useSelector(state => state.attackClock);

  const setClockValue = useCallback((value) => dispatch(setAttackClock(value)), [dispatch]);
  const startClock = useCallback(() => dispatch(startAttackClock()), [dispatch]);
  const stopClock = useCallback(() => dispatch(stopAttackClock()), [dispatch]);
  const setTimeLeft = useCallback((value) => dispatch(setAttackClockTimeleft(value)), [dispatch]);

  const resetMilliseconds = useCallback(() => milliseconds = convertSecToMilli(startTimeSeconds), [startTimeSeconds]);
  const getClockInitTime = useCallback(() => convertSecToDuration(startTimeSeconds, clockOptions), [startTimeSeconds]);

  const resetClock = useCallback(() => {
    resetMilliseconds();
    setTimeLeft(milliseconds);
    dispatch(resetAttackClock(getClockInitTime()));
  }, [dispatch, resetMilliseconds, getClockInitTime, setTimeLeft]);

  const setClock = useCallback((e) => {
    setClockValue(convertSecToDuration(convertMilliToSec(e.data.timeLeft), clockOptions));
    milliseconds = e.data.timeLeft;
    setTimeLeft(e.data.timeLeft);
    if (e.data.timeLeft === 0) {
      stopClock();
    }
  }, [setTimeLeft, stopClock, setClockValue]);

  useEffect(() => {
    if (!attackClock) {
      resetMilliseconds();
      setTimeLeft(milliseconds);
      setClockValue(getClockInitTime());
    }
    if (isReset) resetMilliseconds();
  }, [attackClock, setClockValue, getClockInitTime, resetMilliseconds, setTimeLeft, isReset]);

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

  return (
    <FlexContainer column>
      <FlexContainer justify="space-evenly" fullWidth>
        {
          !isClockRunning ? (
            <Button onClick={startClock} color="success">
              Start Clock
              <ButtonIcon spaceLeft>
                <FontAwesomeIcon icon={faStopwatch} size="sm" />
              </ButtonIcon>
            </Button>
          ) : (
              <Button onClick={stopClock} color="error">
                Stop Clock
                <ButtonIcon spaceLeft>
                  <FontAwesomeIcon icon={faHandPaper} size="sm" />
                </ButtonIcon>
              </Button>
            )
        }
        <Button onClick={resetClock} color="generic">
          Reset Clock
          <ButtonIcon spaceLeft>
            <FontAwesomeIcon icon={faHistory} size="sm" />
          </ButtonIcon>
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
