const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {

    if(!blogs || !Array.isArray(blogs)) {
        return 0
    }

    return blogs.reduce((currentSum, blog) => { 
        return currentSum + blog.likes 
    } , 0)
}

const favoriteBlog = (blogs) => {
    
}

module.exports = {
    dummy,
    totalLikes
}