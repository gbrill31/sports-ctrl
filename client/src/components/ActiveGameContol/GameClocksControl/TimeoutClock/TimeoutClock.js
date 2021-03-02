import React, { useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { FlexContainer } from '../../../../styledElements';

import clock from '../../../../workers/clock';
import {
  WebWorker,
  convertSecToDuration,
  convertMilliToSec,
} from '../../../../utils';

import {
  stopTimeoutClock,
  setTimeoutClock,
  resetTimeoutClock,
  setTimeoutClockStart,
  setIsTimeout,
  setIsTimeoutPrompt,
  updateTeamTimeouts,
} from '../../../../redux';
import PromptDialog from '../../../PromptDialog/PromptDialog';

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

export default function TimeoutClock({ league }) {
  const dispatch = useDispatch();
  const milliseconds = useRef();
  const webWorker = useRef(new WebWorker());

  const {
    isTimeoutClockRunning: isClockRunning,
    timeoutClockValue: timeoutClock,
    startTime,
    isReset,
  } = useSelector((state) => state.timeoutClock);
  const { id: gameId, homeTeam, awayTeam } = useSelector((state) => state.game);

  const {
    isHomeTimeout,
    isAwayTimeout,
    isTimeoutPrompt,
    homeTimeouts,
    awayTimeouts,
  } = useSelector((state) => state.game);

  const updateTimeouts = useCallback(
    () =>
      dispatch(
        updateTeamTimeouts({
          gameId,
          teamId: isHomeTimeout ? homeTeam.id : awayTeam.id,
          timeouts: isHomeTimeout ? homeTimeouts - 1 : awayTimeouts - 1,
        })
      ),
    [
      dispatch,
      isHomeTimeout,
      homeTeam,
      awayTeam,
      homeTimeouts,
      awayTimeouts,
      gameId,
    ]
  );

  const closeTimeoutPrompt = useCallback(
    () => dispatch(setIsTimeoutPrompt(false)),
    [dispatch]
  );

  const setClockValue = useCallback(
    (value) => dispatch(setTimeoutClock(value)),
    [dispatch]
  );
  // const startClock = useCallback(() => dispatch(startTimeoutClock()), [
  //   dispatch,
  // ]);
  const stopClock = useCallback(() => dispatch(stopTimeoutClock()), [dispatch]);
  const setClockStartTime = useCallback(
    (value) => dispatch(setTimeoutClockStart(value)),
    [dispatch]
  );

  const resetMilliseconds = useCallback(
    () => (milliseconds.current = startTime),
    [startTime]
  );

  const resetClock = useCallback(
    (value) => {
      resetMilliseconds();
      localStorage.removeItem('timeoutClock');
      setClockStartTime(value || league.timeoutStartTime);
      dispatch(resetTimeoutClock(value || league.timeoutStartTime));
      setClockValue(
        convertSecToDuration(
          convertMilliToSec(value || league.timeoutStartTime)
        )
      );
    },
    [dispatch, resetMilliseconds, setClockStartTime, setClockValue, league]
  );

  const getClockInitTime = useCallback(() => league.timeoutStartTime, [league]);

  const setClock = useCallback(
    (e) => {
      milliseconds.current = e.data.timeLeft;
      setClockValue(convertSecToDuration(convertMilliToSec(e.data.timeLeft)));
      localStorage.setItem('timeoutClock', e.data.timeLeft);
      if (milliseconds.current === 0) {
        stopClock();
      }
    },
    [setClockValue, stopClock]
  );

  const disableTimeout = useCallback(
    () => dispatch(setIsTimeout({ isTimeout: false })),
    [dispatch]
  );

  useEffect(() => {
    if (league && league.id) {
      setClockStartTime(league.timeoutStartTime);
    }
  }, [setClockStartTime, league]);

  useEffect(() => {
    if (!timeoutClock && startTime) {
      const savedStartTime = parseInt(localStorage.getItem('timeoutClock'));
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
    timeoutClock,
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

  const resetClockConfirm = (isChecked) => {
    stopClock();
    resetClock(getClockInitTime());
    disableTimeout();
    closeTimeoutPrompt();
    if (isChecked) updateTimeouts();
  };

  return (
    <>
      {isHomeTimeout || isAwayTimeout ? (
        <FlexContainer column>
          <FlexContainer justify="center" fullWidth>
            <Clock>
              <span>{timeoutClock}</span>
            </Clock>
          </FlexContainer>
        </FlexContainer>
      ) : null}

      {isTimeoutPrompt && (
        <PromptDialog
          isOpen={isTimeoutPrompt}
          title="Stop and Reset Timeout"
          content="Are you sure you want to stop and reset the timeout clock?"
          confirmText="Confirm"
          checkboxText="Revert Team Timeouts Count"
          isCheckbox
          handleClose={closeTimeoutPrompt}
          handleConfirm={resetClockConfirm}
        />
      )}
    </>
  );
}
