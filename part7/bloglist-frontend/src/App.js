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
import UserList from './components/Users/UserList'
import Notification from './components/Notification'
import LoginForm from './components/Users/LoginForm'
import UserDetail from './components/Users/UserDetail'
import BlogDetail from './components/Blogs/BlogDetail'
import Menu from './components/Menu'
import { Button } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeUser()),
    dispatch(initializeUsers())
  }, [])

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
      <div className="container">
        <h2>Log in to application </h2>
        <Notification></Notification>
        <LoginForm/>
      </div>
    )
  }

  return (
    <div className="container">
      <Router>
        <div>
          <h2>blogs</h2>
          <Notification></Notification>
          <p>Welcome {user.username} </p>
          <Menu></Menu>
          <br/>
          <Button variant="danger" onClick={() => handleLogout()}>Logout</Button>
        </div>
        <Routes>
          <Route path="/users" element={<UserList/>} />
          <Route path="/users/:id"element={<UserDetail users={users}/>}> </Route>
          <Route path="/blogs/:id" element={<BlogDetail blogs={blogs}/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/blogs" element={<Home/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App