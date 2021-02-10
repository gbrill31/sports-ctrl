import { createSlice } from '@reduxjs/toolkit';

const routesSlice = createSlice({
  name: 'gameClock',
  initialState: {
    gameClockValue: null,
    startTime: null,
    isGameClockRunning: false,
    isReset: false,
  },
  reducers: {
    startGameClock(state, action) {
      state.isGameClockRunning = true;
      state.isReset = false;
    },
    stopGameClock(state, action) {
      state.isGameClockRunning = false;
    },
    resetGameClock(state, action) {
      state.gameClockValue = action.payload;
      state.isGameClockRunning = false;
      state.isReset = true;
    },
    setGameClock(state, action) {
      state.gameClockValue = action.payload;
    },
    setGameClockStart(state, action) {
      state.startTime = action.payload;
    },
  },
});

export const {
  startGameClock,
  stopGameClock,
  resetGameClock,
  setGameClock,
  setGameClockStart,
} = routesSlice.actions;

export default routesSlice.reducer;
