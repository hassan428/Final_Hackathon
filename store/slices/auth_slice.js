import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  uid: '',
  profile: null,
  islogged: false,
  loading: true,
};

const auth_slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    auth_Check: (state, action) => {
      return {...action.payload};
    },

    profile_action: (state, {payload}) => {
      // console.log('action.payload.profile', payload);
      return {...state, profile: payload};
    },
  },
});

export const {auth_Check, profile_action} = auth_slice.actions;
export default auth_slice.reducer;
