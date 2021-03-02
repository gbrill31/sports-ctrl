import { createSlice } from '@reduxjs/toolkit';

const attackClockSlice = createSlice({
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
      state.isAttackClockRunning = false;
    },
    resetAttackClock(state, action) {
      state.attackClockValue = action.payload;
      state.isAttackClockRunning = false;
      state.isReset = true;
    },
    setAttackClock(state, action) {
      state.attackClockValue = action.payload;
    },
    setAttackClockStart(state, action) {
      state.startTime = action.payload;
    },
    setAttackClockTimeleft(state, action) {
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
} = attackClockSlice.actions;

export default attackClockSlice.reducer;
