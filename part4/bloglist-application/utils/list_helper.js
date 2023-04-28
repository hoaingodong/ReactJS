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

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}