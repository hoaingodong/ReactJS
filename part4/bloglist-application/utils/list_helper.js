const lodash = require('lodash')
const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => {
    const reducer = (sum, item) =>{
        return sum+item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(e => e. likes)
    const blog = blogs[likes.indexOf(Math.max(...likes))]
    console.log(likes);
    return blog
}

const mostBlogs = (blogs) => {
    const authorsBlog = lodash.countBy(blogs, 'author')
    const maxBlogs = Math.max(...Object.values(authorsBlog))
    const author = Object.keys(authorsBlog).find(key => authorsBlog[key] === maxBlogs)

    return {
        "author": author,
        "blogs": maxBlogs
    }
}

const mostLikes = (blogs) => {

    let authorsLike = {};
    blogs.forEach(blog => {
        if (blog.author in authorsLike) {
            authorsLike[blog.author] += blog.likes
        } else {
            authorsLike[blog.author] = blog.likes
        }
    })

    const maxLikes = Math.max(...Object.values(authorsLike))
    const author = Object.keys(authorsLike).find(key => authorsLike[key] === maxLikes)

    return {
        "author": author,
        "likes": maxLikes
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}