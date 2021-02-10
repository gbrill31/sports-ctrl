import { createSlice } from '@reduxjs/toolkit';

const routesSlice = createSlice({
  name: 'routes',
  initialState: {
    currentRoute: '',
  },
  reducers: {
    setRouteName(state, action) {
      state.currentRoute = action.payload;
    },
  },
});

export const { setRouteName } = routesSlice.actions;

export default routesSlice.reducer;
