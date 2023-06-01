import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'
import authReducer from '../reducers/authReducer'
import userReducer from '../reducers/userReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: authReducer,
  users: userReducer
})
const store = createStore(reducer, applyMiddleware(thunk))

export default store