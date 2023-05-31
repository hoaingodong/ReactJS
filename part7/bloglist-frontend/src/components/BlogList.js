import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, updateBlog, deleteBlog }) => {
  return blogs.map((blog) =>
    <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
  )
}

export default BlogList