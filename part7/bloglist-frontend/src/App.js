import {
  BrowserRouter as Router,
  Route, Routes
} from 'react-router-dom'
import {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser, logout } from './reducers/authReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import Home from './components/Home'
import UserList from './components/UserList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserDetail from './components/UserDetail'
import BlogDetail from './components/BlogDetail'
import Menu from './components/Menu'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeUser()),
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs())
    }
  }, [user])

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
    <Router>
      <div>
        <h2>blogs</h2>
        <Notification></Notification>
        <p>Welcome {user.username} </p>
        <Menu></Menu>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
      <Routes>
        <Route path="/users" element={<UserList/>} />
        <Route path="/users/:id"element={<UserDetail users={users}/>}> </Route>
        <Route path="/blogs/:id" element={<BlogDetail blogs={blogs}/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/blogs" element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default App