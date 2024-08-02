import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  task: [],
};

const task_slice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    auth_check_task_action: (state, {payload}) => {
      state.task = payload;
    },
    add_task_action: (state, {payload}) => {
      state.task.unshift(payload);
    },
  },
});

export const {add_task_action, auth_check_task_action} = task_slice.actions;
export default task_slice.reducer;
