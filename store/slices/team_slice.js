import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  team: [],
};

const team_slice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    auth_check_team_action: (state, {payload}) => {
      state.team = payload;
    },
    create_team_action: (state, {payload}) => {
      state.team.unshift(payload);
    },
  },
});

export const {create_team_action, auth_check_team_action} = team_slice.actions;
export default team_slice.reducer;
