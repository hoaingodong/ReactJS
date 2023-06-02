import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../../reducers/blogReducer'
import { createNotification } from '../../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'
const BlogForm = () => {
  const dispatch = useDispatch()

  const createNewBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    const blogToCreate = {
      title: title,
      author: author,
      url: url
    }

    dispatch(createBlog(blogToCreate))
    dispatch(
      createNotification(`Blog ${title} successfully created`, 'success', 5)
    )
  }

  return (
    <div>
      <h2>Create a new Blog</h2>
      <Form onSubmit={createNewBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            id="title"
          />
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            name="author"
            id="author"
          />
          <Form.Label>Url:</Form.Label>
          <Form.Control
            type="text"
            name="url"
            id="url"
          />
          <br/>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm