import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
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

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value);
    };

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value);
    };

    const handleUrlChange = (event) => {
        setNewUrl(event.target.value);
    };

    const addBlog = async (event) => {
        event.preventDefault()
        const blogObject = {
            title: newTitle,
            author: newAuthor,
            url: newUrl
        }
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
            setNewTitle('')
            setNewAuthor('')
            setNewUrl('')
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
    const blogForm = () => (
        <form onSubmit={addBlog}>
            <div>Title:
                <input
                    value={newTitle}
                    onChange={handleTitleChange}
                /></div>
            <div>Author:
                <input
                    value={newAuthor}
                    onChange={handleAuthorChange}
                />
            </div>
            <div>Url:
                <input
                    value={newUrl}
                    onChange={handleUrlChange}
                />
            </div>
            <button type="submit">save</button>
        </form>
    )

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )

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
                {loginForm()}
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
                <h2>Create new blog</h2>
                {blogForm()}
            </div>
        </div>
    )
}

export default App