// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'


// ref tutorial 
// simple https://redux-toolkit.js.org/tutorials/quick-start


export const getProjects = createAsyncThunk('appProject/getProjects', async params => {
  try {
    const response = await axios.get('/apps/projects', { params })
    console.log(response)
    return {
      params,
      data: response.data
    }
    
  } catch (error) {
    console.log(error)
  }
})

export const addProject = createAsyncThunk('appProject/addProject', async (project, { dispatch, getState }) => {
  try {
    const response = await axios.post('/apps/project/add', { project })
    await dispatch(getProjects(getState().todo.params))
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const updateProject = createAsyncThunk('appProject/updateProject', async (project, { dispatch, getState }) => {
  try {
    const response = await axios.post('/apps/todo/update', { project })
    await dispatch(getProjects(getState().todo.params))
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const deleteProject = createAsyncThunk('appProject/deleteProject', async (taskId, { dispatch, getState }) => {
  const response = await axios.delete('/apps/project/delete', { taskId })
  await dispatch(getProjects(getState().todo.params))
  return response.data
})

export const appTodoSlice = createSlice({
  name: 'appProject',
  initialState: {
    projects: [],
    selectedProject: {},
    params: {
      filter: '',
      q: '',
      sort: '',
      tag: ''
    }
  },
  reducers: {
    // not required
    // reOrderTasks: (state, action) => {
    //   state.tasks = action.payload
    // },
    selectProject: (state, action) => {
      state.selectedProject = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.projects = action.payload.data
      state.params = action.payload.params
    })
  }
})

export const { reOrderTasks, selectProject } = appTodoSlice.actions

export default appTodoSlice.reducer
