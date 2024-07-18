import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  // uid: '',
  profile: null,
  islogged: false,
};

const auth_slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    islogged_action: (state, {payload}) => {
      return {...state, islogged: payload};
    },

    profile_action: (state, {payload}) => {
      // console.log('action.payload.profile', payload);
      return {...state, profile: payload};
    },
  },
});

export const {islogged_action, profile_action} = auth_slice.actions;
export default auth_slice.reducer;
