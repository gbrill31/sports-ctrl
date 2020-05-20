import {
  CLOCKS
} from '../constants';

export const startGameClock = () => ({
  type: CLOCKS.START_GAME_CLOCK
});
export const stopGameClock = () => ({
  type: CLOCKS.STOP_GAME_CLOCK
});
export const resetGameClock = (value) => ({
  type: CLOCKS.RESET_GAME_CLOCK,
  payload: value
});
export const setGameClock = (value) => ({
  type: CLOCKS.SET_GAME_CLOCK,
  payload: value
});

export const startAttackClock = () => ({
  type: CLOCKS.START_ATTACK_CLOCK
});
export const stopAttackClock = () => ({
  type: CLOCKS.STOP_ATTACK_CLOCK
});
export const resetAttackClock = (value) => ({
  type: CLOCKS.RESET_ATTACK_CLOCK,
  payload: value
});
export const setAttackClock = (value) => ({
  type: CLOCKS.SET_ATTACK_CLOCK,
  payload: value
});
export const setAttackClockTimeleft = (value) => ({
  type: CLOCKS.SET_ATTACK_CLOCK_TIMELEFT,
  payload: value
});