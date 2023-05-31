import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { useDispatch } from 'react-redux'
import BlogList from './components/BlogList'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { useSelector } from 'react-redux'
import { logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application </h2>
        <Notification></Notification>
        <LoginForm/>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <Notification></Notification>
        <p>Welcome {user.username} </p>
        <button onClick={() => handleLogout()}>Logout</button>
        <BlogList ></BlogList>
      </div>
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm></BlogForm>
        </Togglable>

      </div>
    </div>
  )
}

export default App