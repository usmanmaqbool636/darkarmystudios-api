// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// TODO api request with "try catch"

// ** Axios Imports
import axios from 'axios'
import axiosClient from '../../../../axios'

const route = "/projects"
// ref tutorial 
// simple https://redux-toolkit.js.org/tutorials/quick-start


export const getProjects = createAsyncThunk('appProject/getProjects', async params => {
  try {
    const response = await axiosClient.get(`${route}/all`, { params })
    return {
      params,
      data: response.data.projects
    }
    
  } catch (error) {
    console.log(error)
  }
})

// Hint for update delete create
// await for responce like this
// from this file return only 'response' not response.data  but not in "getProjects"
// responce = await dispatch(addProject(state))
// in responce => responce.payload have success,message
// success and message use for handling loading and msg display
// make sure wrape with try catch
// with realapi
export const addProject = createAsyncThunk('appProject/addProject', async (project, { dispatch, getState }) => {
  try {
    // const response = await axios.post(`${route}/add`, { project })
    const response = await axiosClient.post(`${route}/add`, { ...project })
    await dispatch(getProjects(getState().todo.params))
    return response
  } catch (error) {
    console.log(error)
    return error
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

// working with real api's
export const deleteProject = createAsyncThunk('appProject/deleteProject', async (taskId, { dispatch, getState }) => {
  try {
    const response = await axiosClient.delete(`${route}/${taskId}`)
    await dispatch(getProjects(getState().todo.params))
    return response
  } catch (error) {
    return error
  }
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
