const Blog = require('../models/blog')

const initialBlogs = [
    {
        likes: 30,
        title: "My Hoai",
        author: "Hoai",
        url: "https://fullstackopen.com/en/part4/testing_the_backend#test-environment"
    },
    {
        likes: 20,
        title: "Thanh Tu Khanh Linh",
        author: "Hoai",
        url: "https://fullstackopen.com/en/part4/testing_the_backend#test-environment"
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ likes: 20 })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}