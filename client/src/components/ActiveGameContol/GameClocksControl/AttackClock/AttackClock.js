import React, { useEffect, useCallback, useRef } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { FlexContainer, Button, Icon } from "../../../../styledElements";
import {
  faHistory,
  faHandPaper,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import clock from "../../../../workers/clock";
import {
  WebWorker,
  convertSecToDuration,
  convertMilliToSec,
  convertSecToMilli,
} from "../../../../utils";

import {
  startAttackClock,
  stopAttackClock,
  setAttackClock,
  resetAttackClock,
  setAttackClockTimeleft,
  setAttackClockStart,
} from "../../../../actions";

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

const ATTACK_TIME = 24;
const ATTACK_CLOCK_OPTIONS = {
  showMin: false,
  showSec: true,
  showMil: false,
};

export default function AttackClock() {
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
  const getClockInitTime = useCallback(() => convertMilliToSec(startTime), [
    startTime,
  ]);

  const resetClock = useCallback(() => {
    resetMilliseconds();
    localStorage.removeItem("attackClock");
    setTimeLeft(milliseconds.current);
    dispatch(resetAttackClock(getClockInitTime()));
  }, [dispatch, resetMilliseconds, getClockInitTime, setTimeLeft]);

  const setClock = useCallback(
    (e) => {
      setClockValue(
        convertSecToDuration(
          convertMilliToSec(e.data.timeLeft),
          ATTACK_CLOCK_OPTIONS
        )
      );
      localStorage.setItem("attackClock", e.data.timeLeft);
      milliseconds.current = e.data.timeLeft;
      setTimeLeft(e.data.timeLeft);
      if (e.data.timeLeft === 0) {
        stopClock();
      }
    },
    [setTimeLeft, stopClock, setClockValue]
  );

  useEffect(() => {
    if (!startTime) {
      setAttackStartClock(convertSecToMilli(ATTACK_TIME));
    }
  }, [startTime, setAttackStartClock]);

  useEffect(() => {
    if (!attackClock && startTime) {
      const savedStartTime = parseInt(localStorage.getItem("attackClock"));
      milliseconds.current = !savedStartTime
        ? resetMilliseconds()
        : savedStartTime;
      setTimeLeft(milliseconds.current);
      setClockValue(
        convertSecToDuration(
          savedStartTime
            ? convertMilliToSec(savedStartTime)
            : getClockInitTime(),
          ATTACK_CLOCK_OPTIONS
        )
      );
    }
    if (isReset) {
      localStorage.removeItem("attackClock");
      resetMilliseconds();
      setTimeLeft(milliseconds.current);
      setClockValue(
        convertSecToDuration(convertMilliToSec(startTime), ATTACK_CLOCK_OPTIONS)
      );
    }
  }, [
    attackClock,
    setClockValue,
    getClockInitTime,
    resetMilliseconds,
    setTimeLeft,
    isReset,
    startTime,
  ]);

  useEffect(() => {
    const webWrokerInstance = webWorker.current;
    if (isClockRunning) {
      if (milliseconds.current === 0) resetMilliseconds();
      const worker = {
        file: clock,
        initialData: milliseconds.current,
      };
      webWrokerInstance.start(worker, setClock);
    }
    return () => {
      webWrokerInstance.stop();
    };
  }, [isClockRunning, resetClock, setClock, resetMilliseconds]);

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
        <Button onClick={resetClock} color="secondary">
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
