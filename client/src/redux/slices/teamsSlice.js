import { createSlice } from '@reduxjs/toolkit';

const teamsSlice = createSlice({
  name: 'teams',
  initialState: {
    selected: null,
  },
  reducers: {
    setSelectedTeam(state, action) {
      state.selected = action.payload;
    },
  },
});

export const { setSelectedTeam } = teamsSlice.actions;

export default teamsSlice.reducer;
