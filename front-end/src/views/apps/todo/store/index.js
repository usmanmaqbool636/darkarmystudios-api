// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// TODO api request with "try catch"
// ** axiosClient Imports
import axiosClient from '../../../../axios'

// task
// 1. add todo (working)
// 2. get all todos.
// 3. update todo.
// 4. complete todo.
// 5. delete Todo.
// 6. important todo.

export const getTasks = createAsyncThunk('appTodo/getTasks', async params => {
  const response = await axiosClient.get('/todo/all', { params })
  return {
    params,
    data: response.data.todos
  }
})

export const addTask = createAsyncThunk('appTodo/addTask', async (task, { dispatch, getState }) => {
  try {
    const response = await axiosClient.post('/todo/add-tasks', { ...task })
    await dispatch(getTasks(getState().todo.params))
    return response
  } catch (error) {
    return error
  }
})

export const updateTask = createAsyncThunk('appTodo/updateTask', async (task, { dispatch, getState }) => {
  // need to change if task._id is not defined
  const response = await axiosClient.post(`/todo/update-task/${task._id}`, { task })
  await dispatch(getTasks(getState().todo.params))
  return response
})

export const completeTask = createAsyncThunk('appTodo/updateProject', async (data, { dispatch, getState }) => {
  try {
    const response = await axiosClient.patch(`/todo/complete-task/${data.id}`, { isImportant:data.isImportant })
    // replace completed task with this task
    // await dispatch(getProjects(getState().todo.params))
    return response
  } catch (error) {
    console.log(error)
    return error
  }
})

export const deleteTask = createAsyncThunk('appTodo/deleteTask', async (taskId, { dispatch, getState }) => {
  const response = await axiosClient.delete('/apps/todo/delete-task', { taskId })
  await dispatch(getTasks(getState().todo.params))
  return response
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
    },
    isLoading:true
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
      state.isLoading = false
    })
    builder.addCase(getTasks.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getTasks.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})

export const { reOrderTasks, selectTask } = appTodoSlice.actions

export default appTodoSlice.reducer
