import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

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
            setErrorMessage('Wrong credentials')
            setMessage(null)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }
    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        window.location.reload();
        blogService.setToken(null)
    };


    const addBlog = async (blogObject) => {
        try {
            const returnedNote = await blogService
                .create(blogObject)
            setMessage(
                `Blog ${blogObject.title} was successfully added`
            )
            setErrorMessage(null)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
            setBlogs(blogs.concat(returnedNote))

        }
        catch(exception) {
            setErrorMessage(
                `Cannot add blog ${blogObject.title}`
            )
            setMessage(null)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }


    if (user === null) {
        return (
            <div>
                <h2>Log in to application </h2>
                {
                    errorMessage &&
                    <Notification message={errorMessage} error={true}/>
                }
                {
                    message &&
                    <Notification message={message}/>
                }
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
                {
                    errorMessage &&
                    <Notification message={errorMessage} error={true}/>
                }
                {
                    message &&
                    <Notification message={message}/>
                }
                <p>Welcome {user.username} </p>
                <button onClick={() => handleLogout()}>Logout</button>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog}/>
                )}
            </div>
            <div>
                <Togglable buttonLabel="new note" >
                    <BlogForm createBlog={addBlog}></BlogForm>
                </Togglable>

            </div>
        </div>
    )
}

export default App