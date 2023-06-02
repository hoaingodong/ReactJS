import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../../reducers/blogReducer'
import { createNotification } from '../../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import { comment } from '../../reducers/blogReducer'
import { Button, Form } from 'react-bootstrap'

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
    paddingLeft: 10,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5
  }
  if (blog)
    return (
      <div>
        <div style={blogStyle} className={'blog'}>
          <div>
            <p>{blog.title} - {blog.author}
              <Button variant="secondary" onClick={toggleVisibility}>{buttonLabel}</Button>
            </p>
          </div>
          <div style={showWhenVisible}>
            <p>{blog.url}</p>
            <p>
              {blog.likes}
              <Button variant="success" id='like-button' onClick={increaseLikes}>
              like
              </Button>
            </p>
            <p>{blog.author}</p>
            <Button variant="danger" id='remove-button' onClick={removeBlog}>remove</Button>
          </div>
        </div>
        <div>
          <h2>Add comments for blogs</h2>
          <Form onSubmit={addComment}>
            <Form.Group>
              <Form.Label>Comment:</Form.Label>
              <Form.Control
                type="text"
                name="commentAdded"
                id="commentAdded"
              />
              <br/>
              <Button variant="primary" type="submit">
                Add Comment
              </Button>
            </Form.Group>
          </Form>
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