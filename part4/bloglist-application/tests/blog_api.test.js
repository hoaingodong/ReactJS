const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

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

// test('a new blog post can be added ', async () => {
//     const newBlog = {
//         likes: 50,
//         title: "Gao xinh",
//         author: "Gao",
//         url: "https://fullstackopen.com/en/part4/testing_the_backend#test-environment"
//     }
//
//     await api
//         .post('/api/blogs')
//         .send(newBlog)
//         .expect(201)
//         .expect('Content-Type', /application\/json/)
//
//     const blogsAtEnd = await helper.blogsInDb()
//     expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
//
//     const contents = blogsAtEnd.map(n => n.content)
//     expect(title).toContain(
//         'Gao xinh'
//     )
// })

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
afterAll(async () => {
    await mongoose.connection.close()
})