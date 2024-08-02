import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  member_id: [],
  team_id: [],
};

const add_slice = createSlice({
  name: 'add',
  initialState,
  reducers: {
    add_member_action: (state, {payload}) => {
      state.member_id.unshift(payload);
    },
    cut_member_action: (state, {payload}) => {
      state.member_id = state.member_id.filter(
        member_id => member_id !== payload,
      );
    },
    add_team_action: (state, {payload}) => {
      state.team_id.unshift(payload);
    },
    cut_team_action: (state, {payload}) => {
      state.team_id = state.team_id.filter(team_id => team_id !== payload);
    },
  },
});

export const {
  add_member_action,
  cut_member_action,
  add_team_action,
  cut_team_action,
} = add_slice.actions;
export default add_slice.reducer;
