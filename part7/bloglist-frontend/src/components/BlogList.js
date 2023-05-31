import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  console.log(blogs)
  return blogs.map((blog) =>
    <Blog key={blog.id} blog={blog}/>
  )
}

export default BlogList