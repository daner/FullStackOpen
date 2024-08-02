const _ = require('lodash')

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((currentSum, blog) => { 
        return currentSum + blog.likes 
    } , 0)
}

const favoriteBlog = (blogs) => {
    let topBlog = null

    _.forEach(blogs, blog => {
        const candidate = { title: blog.title, author: blog.author, likes: blog.likes }
        if(topBlog == null || blog.likes > topBlog.likes) {
            topBlog = candidate
        }
    })
    
    return topBlog
}

const mostBlogs = (blogs) => {
    const authors = _.groupBy(blogs, 'author')
    let topAuthor = null

    _.forEach(authors, (value, key) => {
        const author =  { author: key, blogs: value.length }
        if(topAuthor == null || author.blogs > topAuthor.blogs) {
            topAuthor = author
        }
    })

    return topAuthor
}

const mostLikes = (blogs) => {
    const authors = _.groupBy(blogs, 'author') 
    let topAuthor = null

    _.forEach(authors, (value, key) => {
        const author =  { author: key, likes: _.reduce(value, (sum, blog) => sum + blog.likes, 0) }
        if(topAuthor == null || author.likes > topAuthor.likes) {
            topAuthor = author
        }
    })

    return topAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}