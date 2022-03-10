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
    },
    loading:false,
    error:""
  },
  reducers: {
    // not required
    // reOrderTasks: (state, action) => {
    //   state.tasks = action.payload
    // },
    selectProject: (state, action) => {
      state.selectedProject = action.payload
    },
    setError:(state, action) =>{
      state.loading = action.payload.loading
      state.error = action.payload.error || ""
    }

  },
  extraReducers: builder => {
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.projects = action.payload.data
      state.params = action.payload.params
    })
  }
})

export const { reOrderTasks, selectProject, setError } = appTodoSlice.actions

export default appTodoSlice.reducer

// with realapi
export const addProject = createAsyncThunk('appProject/addProject', async (project, { dispatch, getState }) => {
  try {
    // const response = await axios.post(`${route}/add`, { project })
    dispatch(setError({loading:true}))
    const response = await axiosClient.post(`${route}/add`, { ...project })
    await dispatch(getProjects(getState().todo.params))
    return response.data
  } catch (error) {
    dispatch(setError({loading:true, error: error.message}))
    console.log(error)
  }
})
