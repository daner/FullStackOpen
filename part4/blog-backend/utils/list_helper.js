const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((currentSum, blog) => { 
        return currentSum + blog.likes 
    } , 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length == 0) {
        return null
    }
    else {
        var topBlog = blogs[0]
        blogs.forEach(blog => {
            if(blog.likes > topBlog.likes) {
                topBlog = blog
            }
        })
        return { title: topBlog.title, author: topBlog.author, likes: topBlog.likes }
    } 
}

const mostBlogs = (blogs) => {

}

const mostLikes = (blogs) => {

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}