const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})    
  response.json(blogs)
})
 
blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  if(blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body) 
  const result = await blog.save();
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const deletedBlog = await Blog.findByIdAndDelete(id)
  if(deletedBlog) {
    response.json(deletedBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  const id = request.params.id

  const blog = await Blog.findByIdAndUpdate(id, { likes: likes } , { new: true, runValidators: true, context: 'query' } )

  if(blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter