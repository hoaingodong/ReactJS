import React from 'react'
import { useParams } from 'react-router-dom'
const UserDetail = ({ users }) => {
  const id = useParams().id
  const user = users.find(n => n.id === String(id))
  const Blog = ({ blog }) => (
    <div>
      <ul>
        <li> {blog.title} by {blog.author} </li>
      </ul>
    </div>
  )
  if (user)
    return  (
      <div>
        <h2>{user.username}</h2>
        <h3>added blogs</h3>
        {
          user.blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />)
        }
      </div>
    )
  return null
}

export default UserDetail