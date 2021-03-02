import { createSlice } from '@reduxjs/toolkit';

const timeoutClockSlice = createSlice({
  name: 'timeoutHomeClock',
  initialState: {
    timeoutClockValue: null,
    startTime: null,
    isTimeoutClockRunning: false,
    isReset: false,
  },
  reducers: {
    startTimeoutClock(state, action) {
      state.isTimeoutClockRunning = true;
      state.isReset = false;
    },
    stopTimeoutClock(state, action) {
      state.isTimeoutClockRunning = false;
    },
    resetTimeoutClock(state, action) {
      state.timeoutClockValue = action.payload;
      state.isTimeoutClockRunning = false;
      state.isReset = true;
    },
    setTimeoutClock(state, action) {
      state.timeoutClockValue = action.payload;
    },
    setTimeoutClockStart(state, action) {
      state.startTime = action.payload;
    },
  },
});

export const {
  startTimeoutClock,
  stopTimeoutClock,
  resetTimeoutClock,
  setTimeoutClock,
  setTimeoutClockStart,
} = timeoutClockSlice.actions;

export default timeoutClockSlice.reducer;
