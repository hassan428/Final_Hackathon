import {configureStore} from '@reduxjs/toolkit';
import auth_slice from './slices/auth_slice';

const store = configureStore({
  reducer: {
    auth: auth_slice,
  },
});

export default store;
