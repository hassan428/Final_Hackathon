import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  islogged: false,
  other_user_profile: null,
};

const auth_slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    islogged_action: (state, {payload}) => {
      return {...state, islogged: payload};
    },

    profile_action: (state, {payload}) => {
      return {...state, profile: payload};
    },
    other_user_profile_action: (state, {payload}) => {
      return {...state, other_user_profile: payload};
    },
  },
});

export const {islogged_action, profile_action, other_user_profile_action} =
  auth_slice.actions;
export default auth_slice.reducer;
