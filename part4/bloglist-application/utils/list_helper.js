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
    const likes = blogs.map(e => e.likes)
    const blog = blogs[likes.indexOf(Math.max(...likes))]
    console.log(likes);
    return blog
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}