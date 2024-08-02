import {configureStore} from '@reduxjs/toolkit';
import auth_slice from './slices/auth_slice';
import theme_slice from './slices/theme_slice';
import team_slice from './slices/team_slice';
import add_slice from './slices/add_slice';
import task_slice from './slices/task_slice';

const store = configureStore({
  reducer: {
    auth: auth_slice,
    theme: theme_slice,
    add: add_slice,
    team: team_slice,
    task: task_slice,
  },
});

export default store;
