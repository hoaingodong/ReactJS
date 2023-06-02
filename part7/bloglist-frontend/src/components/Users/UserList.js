import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <div>
      <Link to={`/users/${user.id}`}>{user.name}</Link> created {user.blogs.length} blogs
    </div>
  )
}

const UserList = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <h2>Users</h2>
      {users.map((user) =>
        <User key={user.id} user={user}/>
      )
      }
    </div>
  )
}

export default UserList