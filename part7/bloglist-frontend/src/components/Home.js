
import BlogList from './BlogList'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useRef } from 'react'

const Home = () => {
  const blogFormRef = useRef()
  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm></BlogForm>
      </Togglable>
      <BlogList></BlogList>
    </div>
  )
}
export default Home