const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

blogsRouter.post('/', (request, response, next) => {
    const body = request.body

    if (body.title === undefined) {
        return response.status(400).json({ error: 'title missing' })
    }
    if (body.author === undefined) {
        return response.status(400).json({ error: 'author missing' })
    }
    if (body.url === undefined) {
        return response.status(400).json({ error: 'url missing' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blog.save().then(result => {
        response.status(201).json(result)
    })
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const blog = {
        likes: body.likes,
        author: body.author,
        title: body.title,
        url: body.url
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter