// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// TODO api request with "try catch"
// ** axiosClient Imports
import axiosClient from '../../../../axios'

// task
// 1. add todo (done)
// 2. get all (done).
// 3. update todo (done).
// 4. complete todo (done).
// 5. delete Todo .
// 6. important todo (done).
// 7. get task by project.
// 8. get task by user but user portion is not completed.
// 9. search task
export const getTasks = createAsyncThunk('appTodo/getTasks', async params => {
  const response = await axiosClient.get('/todo/all', { params })
  return {
    params,
    data: response.data.todos
  }
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
    },
    updateTaskFieldComplete: (state, action) =>{
      state.tasks = state.tasks.map(tsk=>{
        if (tsk._id === action.payload._id) {
          return {
            ...tsk,
            isCompleted:action.payload.isCompleted,
            completedAt:action.payload.completedAt
          }
        }
        return tsk
      }) 
    },
    importantTaskField: (state, action) =>{
      state.tasks = state.tasks.map(tsk=>{
        if (tsk._id === action.payload._id) {
          return {
            ...tsk,
            isImportant:action.payload.isImportant
          }
        }
        return tsk
      }) 
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

export const { reOrderTasks, selectTask, updateTaskFieldComplete, importantTaskField } = appTodoSlice.actions

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
  try {
    const response = await axiosClient.put(`/todo/update-task/${task._id}`, { task })
    await dispatch(getTasks(getState().todo.params))
    return response
  } catch (error) {
    return error
  }
})

export const completeTask = createAsyncThunk('appTodo/updateProject', async (data, { dispatch, getState }) => {
  try {
    const response = await axiosClient.patch(`/todo/complete-task/${data._id}`, { isCompleted: data.isCompleted })
    dispatch(updateTaskFieldComplete({ ...data, completedAt:response.data.todo.completedAt}))
    return response
  } catch (error) {
    console.log(error)
    return error
  }
})

export const setTaskImportant = createAsyncThunk('appTodo/important', async (data, { dispatch, getState }) => {
  try {
    const response = await axiosClient.patch(`/todo/important-task/${data._id}`, { isImportant: data.isImportant })
    dispatch(importantTaskField({ ...data, isImportant:response.data.todo.isImportant}))
    return response
  } catch (error) {
    console.log(error)
    return error
  }
})

export const deleteTask = createAsyncThunk('appTodo/deleteTask', async (taskId, { dispatch, getState }) => {
  try {
    const response = await axiosClient.delete(`/todo/delete-task/${taskId}`)
    await dispatch(getTasks(getState().todo.params))
    return response
    
  } catch (error) {
    return error
  }
})

export default appTodoSlice.reducer
