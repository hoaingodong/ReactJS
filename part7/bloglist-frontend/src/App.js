import {
  BrowserRouter as Router,
  Route, Routes
} from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser, logout } from './reducers/authReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import Home from './components/Home'
import UserList from './components/UserList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'



const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

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
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
      <Routes>
        <Route path="/users" element={<UserList/>} />
        {/*<Route path="/users/:id" element={<UserList/>} />*/}
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default App