import React from 'react'
import { useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'
const UserDetail = ({ users }) => {
  const id = useParams().id
  const user = users.find(n => n.id === String(id))

  if (user)
    return  (
      <div>
        <h3>added blogs of {user.username}</h3>
        <Table striped>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {
              user.blogs.map(blog =>
                <tr key={blog.id}>
                  <td>{blog.title}</td>
                  <td>{blog.author}</td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </div>
    )
  return null
}

export default UserDetail