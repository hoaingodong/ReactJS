const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).populate('user')
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', middleware.tokenValidator, middleware.userExtractor, async (request, response, next) => {
    const body = request.body

    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })
    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save().catch(error => next(error))

        response.json(savedBlog)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', middleware.tokenValidator, middleware.userExtractor, async (request, response, next) => {
    try {
        const user = request.user
        const blogToDelete = await Blog.findById(request.params.id)

        if (!blogToDelete) {
            return response.status(400).json({error: `Blog not found`})
        }
        if (blogToDelete.user._id.toString() === user._id.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            return response.status(401).json({error: `Unauthorized`})
        }
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', middleware.tokenValidator, middleware.userExtractor, (request, response, next) => {
    const body = request.body

    const blog = {
        likes: body.likes,
        author: body.author,
        title: body.title,
        url: body.url
    }

    Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter