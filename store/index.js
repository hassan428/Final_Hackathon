import {configureStore} from '@reduxjs/toolkit';
import auth_slice from './slices/auth_slice';
import theme_slice from './slices/theme_slice';

const store = configureStore({
  reducer: {
    auth: auth_slice,
    theme: theme_slice,
  },
});

export default store;
