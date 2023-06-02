import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../reducers/authReducer'
import { initializeBlogs } from '../../reducers/blogReducer'
import { Button, Form } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    dispatch(login(username, password))
    dispatch(initializeBlogs())
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          name="username"
          id="username"
        />
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          id="password"
        />
        <br/>
        <Button variant="secondary" type="submit">
              Add
        </Button>
      </Form.Group>
    </Form>
  )
}

export default LoginForm