// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// TODO api request with "try catch"
// ** axiosClient Imports
import axiosClientClient from '../../../../axios'

export const getTasks = createAsyncThunk('appTodo/getTasks', async params => {
  const response = await axiosClient.get('/apps/todo/tasks', { params })

  return {
    params,
    data: response.data
  }
})

export const addTask = createAsyncThunk('appTodo/addTask', async (task, { dispatch, getState }) => {
  const response = await axiosClient.post('/apps/todo/add-tasks', { task })
  await dispatch(getTasks(getState().todo.params))
  return response.data
})

export const updateTask = createAsyncThunk('appTodo/updateTask', async (task, { dispatch, getState }) => {
  const response = await axiosClient.post('/apps/todo/update-task', { task })
  await dispatch(getTasks(getState().todo.params))
  return response.data
})

export const deleteTask = createAsyncThunk('appTodo/deleteTask', async (taskId, { dispatch, getState }) => {
  const response = await axiosClient.delete('/apps/todo/delete-task', { taskId })
  await dispatch(getTasks(getState().todo.params))
  return response.data
})

export const appTodoSlice = createSlice({
  name: 'appTodo',
  initialState: {
    tasks: [],
    selectedTask: {},
    params: {
      filter: '',
      q: '',
      sort: '',
      tag: ''
    }
  },
  reducers: {
    reOrderTasks: (state, action) => {
      state.tasks = action.payload
    },
    selectTask: (state, action) => {
      state.selectedTask = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload.data
      state.params = action.payload.params
    })
  }
})

export const { reOrderTasks, selectTask } = appTodoSlice.actions

export default appTodoSlice.reducer
