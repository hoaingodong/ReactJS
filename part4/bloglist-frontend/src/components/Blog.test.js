import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render  } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component tests', () => {
  let blog = {
    'title': 'NoteBook',
    'author': 'My Hoai',
    'url': 'https://fullstackopen.com/en/part5/testing_react_apps',
    'likes': 10
  }

  // let mockUpdateBlog = jest.fn()
  // let mockDeleteBlog = jest.fn()

  test('renders just title and author', () => {
    const component = render(
      <Blog blog={blog} />
    )
    expect(component.container).toHaveTextContent(
      'NoteBook - My Hoai'
    )

  })

  test('clicking the view button displays url and number of likes', async() => {
    const component = render(
      <Blog blog={blog} />
    )

    const user = userEvent.setup()
    const button = component.getByText('view')
    await user.click(button)

    expect(component.container).toHaveTextContent(
      'https://fullstackopen.com/en/part5/testing_react_apps'
    )
    expect(component.container).toHaveTextContent(
      '10'
    )
  })

  test('click like button twice and likes will plus two', () => {
    const mockHandler = jest.fn()
    const user = userEvent.setup()

    const component = render(
      <Blog blog={blog} increaseLikes={mockHandler} />
    )

    const buttonView = component.getByText('view')
    user.click(buttonView)

    const blogAll = component.container.querySelector('.blog')
    expect(blogAll).toBeVisible()

    const buttonLike = component.getByText('like')

    user.click(buttonLike)
    user.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})