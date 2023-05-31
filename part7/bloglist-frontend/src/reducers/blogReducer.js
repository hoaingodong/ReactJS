import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'
const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'DELETE_BLOG':
    return state.filter((blog) => blog.id !== action.data)
  case 'LIKE': {
    const id = action.data.id
    const updatedBlog = state.find((blog) => blog.id === id)
    const BlogAfterUpdating  = {
      ...updatedBlog,
      likes: updatedBlog.likes + 1
    }
    return state.map((blog) => (blog.id !== id ? blog : BlogAfterUpdating))
  }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => (a.likes > b.likes) ? 1 : -1)
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
    } catch (exception) {
      dispatch(
        createNotification(`Cannot create blog ${content.title}`, 'error', 5)
      )
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'DELETE_BLOG',
        data: id
      })
    } catch (exception) {
      dispatch(createNotification('Cannot delete blog', 'error', 5))
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      console.log(blog)
      const updatedBlog = await blogService.update({
        ...blog,
        likes: blog.likes + 1
      })
      dispatch({
        type: 'LIKE',
        data: updatedBlog
      })
    } catch (exception) {
      dispatch(createNotification(`Cannot update blog ${blog.title}`, 'error', 5))
    }
  }
}

export default blogReducer