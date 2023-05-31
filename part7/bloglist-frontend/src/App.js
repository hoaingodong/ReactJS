import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { useDispatch } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'
import BlogList from './components/BlogList'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => (a.likes > b.likes) ? 1 : -1)
    setBlogs(blogs)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

      blogService.setToken(user.token)
    }
    getAllBlogs()
  }, [])

  const blogFormRef = useRef()
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(createNotification('Wrong credential', 'error', 10))
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
    blogService.setToken(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedNote = await blogService
        .create(blogObject)
      dispatch(createNotification(`Blog ${blogObject.title} was successfully added`, 'success', 10))
      setBlogs(blogs.concat(returnedNote))
      blogFormRef.current.toggleVisibility()

    } catch (exception) {
      dispatch(createNotification(`Cannot add blog ${blogObject.title}`, 'error', 10))
    }
  }

  const updateBlog = async (BlogToUpdate) => {
    try {
      const updatedBlog = await blogService
        .update(BlogToUpdate)
      console.log(updatedBlog)
      dispatch(createNotification(`Blog ${BlogToUpdate.title} was successfully updated`, 'success', 10))
    } catch (exception) {
      dispatch(createNotification(`Cannot update blog ${BlogToUpdate.title}`, 'error', 10))
    }
  }

  const deleteBlog = async (BlogToDelete) => {
    try {
      const message = `Remove blog ${BlogToDelete.title}`
      if (window.confirm(message)) {
        await blogService
          .remove(BlogToDelete.id)
        dispatch(createNotification(`Blog ${BlogToDelete.title} was successfully deleted`, 'success', 10))
      }
    } catch (exception) {
      dispatch(createNotification(`Cannot delete blog ${BlogToDelete.title}`, 'success', 10))
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application </h2>
        <Notification></Notification>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
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
        <BlogList blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog}></BlogList>
      </div>
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog}></BlogForm>
        </Togglable>

      </div>
    </div>
  )
}

export default App