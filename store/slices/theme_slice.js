import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  dark_mode: true,
  primary: '#756EF3',
  backgroundColor: '#E9F1FF',
  color: '',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    set_dark_mode: (state, {payload}) => {
      return payload
        ? {
            ...state,
            dark_mode: payload,
            // primary: '#3580FF',
            backgroundColor: '#0a0d16', // black
            color: '#E9F1FF',
          }
        : {
            ...state,
            dark_mode: payload,
            backgroundColor: 'white',
            color: '#191D30',
          };
    },
  },
});

export const {set_dark_mode} = themeSlice.actions;
export default themeSlice.reducer;
