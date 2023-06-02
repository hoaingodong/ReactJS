import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from '../Blogs/BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const input = component.container.querySelector('input')
  const sendButton  = component.container.querySelector('form')


  user.type(input,  'Test Form' )
  user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1   )
  expect(createBlog.mock.calls[0][0].title).toBe('Test Form' )
})