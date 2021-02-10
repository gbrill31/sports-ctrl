import { createSlice } from '@reduxjs/toolkit';

const routesSlice = createSlice({
  name: 'attackClock',
  initialState: {
    attackClockValue: null,
    startTime: null,
    isAttackClockRunning: false,
    timeLeft: null,
    isReset: false,
  },
  reducers: {
    startAttackClock(state, action) {
      state.isAttackClockRunning = true;
      state.isReset = false;
    },
    stopAttackClock(state, action) {
      // type: CLOCKS.STOP_ATTACK_CLOCK,
      state.isAttackClockRunning = false;
    },
    resetAttackClock(state, action) {
      // type: CLOCKS.RESET_ATTACK_CLOCK,
      state.attackClockValue = action.payload;
      state.isAttackClockRunning = false;
      state.isReset = true;
    },
    setAttackClock(state, action) {
      // type: CLOCKS.SET_ATTACK_CLOCK,
      state.attackClockValue = action.payload;
    },
    setAttackClockStart(state, action) {
      // type: CLOCKS.SET_ATTACK_CLOCK_START,
      state.startTime = action.payload;
    },
    setAttackClockTimeleft(state, action) {
      // type: CLOCKS.SET_ATTACK_CLOCK_TIMELEFT,
      state.timeLeft = action.payload;
    },
  },
});

export const {
  startAttackClock,
  stopAttackClock,
  resetAttackClock,
  setAttackClock,
  setAttackClockStart,
  setAttackClockTimeleft,
} = routesSlice.actions;

export default routesSlice.reducer;
