const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('verifies that the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(r => r.id)
    expect(ids[0]).toBeDefined()
})

test('a valid note can be added ', async () => {
    const newBlog = {
        "likes": 500,
        "title": "Gao",
        "author": "Gao xinh",
        "url": "hihi"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd= await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
        'Gao'
    )
})

test('a new blog post missed likes value can have the default value', async () => {
    const newBlog = {
        "title": "Bo xinh",
        "url": "hihi",
        "author": "Bo "
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd= await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const likes = blogsAtEnd.map(n => n.likes)
    expect(likes[likes.length+1]) === 0;
})

test('an invalid post can not be added', async () => {
    const newBlog = {
        "url": "kaka",
        "author": "Minh Quan"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd= await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('delete successfully with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
})

test('update post successfully with status code 204 if request is valid', async () => {
    const newBlog = {
        "likes": 20,
        "title": "Gao",
        "author": "Gao xinh",
        "url": "hihi"
    }

    const blogs = await helper.blogsInDb()
    const ids = blogs.map(r=> r.id)
    const id = ids[0]

    await api
        .put(`/api/blogs/${id}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd= await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
        'Gao'
    )
})
afterAll(async () => {
    await mongoose.connection.close()
})