import React, { useEffect, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { FlexContainer, Button, Icon } from '../../../../styledElements';
import {
  faHistory,
  faHandPaper,
  faStopwatch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import clock from '../../../../workers/clock';
import {
  WebWorker,
  convertSecToDuration,
  convertMilliToSec,
} from '../../../../utils';

import {
  startAttackClock,
  stopAttackClock,
  setAttackClock,
  resetAttackClock,
  setAttackClockTimeleft,
  setAttackClockStart,
} from '../../../../redux';

const Clock = styled.div`
  font-family: Led2;
  font-size: 3.3rem;
  position: relative;
  width: 100px;
  height: 50px;
  padding: 15px;
  background-color: #000;
  color: ${(props) => props.theme.generic.color};
  border: 2px solid ${(props) => props.theme.secondary.color};
  transition: color 0.3s ease-in-out;

  ${(props) =>
    props.stress &&
    css`
      color: ${(props) => props.theme.error.color};
      border-color: ${(props) => props.theme.error.color};
    `};

  span {
    position: absolute;
    left: 38px;
    top: 20px;
    user-select: none;
  }
`;

const ATTACK_CLOCK_OPTIONS = {
  showMin: false,
  showSec: true,
  showMil: false,
};

export default function AttackClock({ league }) {
  const dispatch = useDispatch();
  const milliseconds = useRef();
  const webWorker = useRef(new WebWorker());

  const {
    isAttackClockRunning: isClockRunning,
    attackClockValue: attackClock,
    startTime,
    isReset,
    timeLeft,
  } = useSelector((state) => state.attackClock);

  const setClockValue = useCallback(
    (value) => dispatch(setAttackClock(value)),
    [dispatch]
  );
  const startClock = useCallback(() => dispatch(startAttackClock()), [
    dispatch,
  ]);
  const stopClock = useCallback(() => dispatch(stopAttackClock()), [dispatch]);
  const setTimeLeft = useCallback(
    (value) => dispatch(setAttackClockTimeleft(value)),
    [dispatch]
  );
  const setAttackStartClock = useCallback(
    (value) => dispatch(setAttackClockStart(value)),
    [dispatch]
  );

  const resetMilliseconds = useCallback(
    () => (milliseconds.current = startTime),
    [startTime]
  );
  const getClockInitTime = useCallback(() => league.attackStartTime, [league]);

  const resetClock = useCallback(
    (value) => {
      resetMilliseconds();
      localStorage.removeItem('attackClock');
      setTimeLeft(milliseconds.current);
      setAttackStartClock(value);
      dispatch(resetAttackClock(value));
      setClockValue(
        convertSecToDuration(convertMilliToSec(value), ATTACK_CLOCK_OPTIONS)
      );
    },
    [
      dispatch,
      resetMilliseconds,
      setTimeLeft,
      setClockValue,
      setAttackStartClock,
    ]
  );

  const handleResetClock = () => resetClock(league.attackStartTime);

  const setClock = useCallback(
    (e) => {
      setClockValue(
        convertSecToDuration(
          convertMilliToSec(e.data.timeLeft),
          ATTACK_CLOCK_OPTIONS
        )
      );
      localStorage.setItem('attackClock', e.data.timeLeft);
      milliseconds.current = e.data.timeLeft;
      setTimeLeft(e.data.timeLeft);
      if (e.data.timeLeft === 0) {
        stopClock();
      }
    },
    [setTimeLeft, stopClock, setClockValue]
  );

  useEffect(() => {
    if (league && league.id) {
      setAttackStartClock(league.attackStartTime);
    }
  }, [league, setAttackStartClock]);

  useEffect(() => {
    if (!attackClock && startTime) {
      const savedStartTime = parseInt(localStorage.getItem('attackClock'));
      milliseconds.current = !savedStartTime
        ? resetMilliseconds()
        : savedStartTime;
      setTimeLeft(milliseconds.current);
      setClockValue(
        convertSecToDuration(
          convertMilliToSec(savedStartTime || getClockInitTime()),
          ATTACK_CLOCK_OPTIONS
        )
      );
    }
    if (isReset) {
      resetClock(startTime);
    }
  }, [
    attackClock,
    setClockValue,
    getClockInitTime,
    resetMilliseconds,
    setTimeLeft,
    resetClock,
    isReset,
    startTime,
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
  }, [isClockRunning, setClock, resetMilliseconds]);

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
        <Button onClick={handleResetClock} color="secondary">
          Reset Clock
          <Icon spaceLeft>
            <FontAwesomeIcon icon={faHistory} size="sm" />
          </Icon>
        </Button>
      </FlexContainer>
      <FlexContainer justify="center" fullWidth>
        <Clock
          stress={timeLeft && Math.floor(convertMilliToSec(timeLeft)) <= 10}
        >
          <span>{attackClock}</span>
        </Clock>
      </FlexContainer>
    </FlexContainer>
  );
}
