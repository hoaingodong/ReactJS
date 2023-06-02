import blogService from '../services/blogs'
import loginService from '../services/login'
import { createNotification } from '../reducers/notificationReducer'

const authReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
  case 'INIT_USER':
    return action.payload
  case 'LOGIN':
    return action.payload
  case 'LOGOUT':
    return action.payload
  default:
    return state
  }
}

export const initializeUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return {
      type: 'INIT_USER',
      payload: user
    }
  }

  return {
    type: 'INIT_USER',
    payload: null
  }
}


export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        payload: user
      })
    } catch (exception) {
      dispatch(createNotification('Wrong credentials', 'error', 5))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
    blogService.setToken(null)
    dispatch({
      type: 'LOGOUT',
      payload: null
    })
  }
}

export default authReducer
