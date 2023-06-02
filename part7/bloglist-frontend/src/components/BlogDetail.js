import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import { comment } from '../reducers/blogReducer'

const BlogDetail = ({ blogs }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find(n => n.id === String(id))

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonLabel = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLikes = () => {
    dispatch(likeBlog(blog))
    dispatch(
      createNotification(`Blog ${blog.title} successfully updated`, 'success', 5)
    )
  }

  const addComment = async (event) => {
    event.preventDefault()
    const commentAdded = event.target.commentAdded.value
    event.target.commentAdded.value = ''
    dispatch(comment(blog, commentAdded))
  }

  const removeBlog = () => {
    dispatch(deleteBlog(blog.id))
    dispatch(
      createNotification(`Blog ${blog.title} successfully deleted`, 'success', 5)
    )
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if (blog)
    return (
      <div>
        <div style={blogStyle} className={'blog'}>
          <div>
            <p>{blog.title} - {blog.author}
              <button onClick={toggleVisibility}>{buttonLabel}</button>
            </p>
          </div>
          <div style={showWhenVisible}>
            <p>{blog.url}</p>
            <p>
              {blog.likes}
              <button id='like-button' onClick={increaseLikes}>
              like
              </button>
            </p>
            <p>{blog.author}</p>
            <button id='remove-button' onClick={removeBlog}>remove</button>
          </div>
        </div>
        <div>
          <h2>Add comments for blogs</h2>
          <form onSubmit={addComment}>
            <div>
              Comment: <input id="commentAdded" name="commentAdded" />
            </div>
            <div>
              <button type="submit">add comment</button>
            </div>
          </form>
          <ul>
            {blog.comments.map((comment) =>
              <li
                key={comment}> {comment}</li>
            )}
          </ul>
        </div>
      </div>
    )
  return null
}

export default BlogDetail