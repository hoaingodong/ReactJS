import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit'
import notificationReducer from '../reducers/notificationReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  notification: notificationReducer,
})
const store = createStore(reducer, applyMiddleware(thunk))

export default store