import { combineReducers } from 'redux'
import layout from './layout'
import navbar from './navbar'
import auth from './auth/authReducer'

export default combineReducers({ auth, layout, navbar})