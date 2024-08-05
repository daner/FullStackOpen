const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })    
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

  const user = await request.user
  if(!user) {
    return response.status(401).json({ error: 'invalid user' })
  }

  blog.user = user.id  
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const user = await request.user

  if(!user) {
    return response.status(401).json({ error: 'invalid user' })
  }

  const blogToDelete = await Blog.findById(id)

  if(!blogToDelete) {
    return response.status(404).end()
  }

  if(blogToDelete.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'can\'t remove blog from another user' })
  }

  await Blog.deleteOne({_id: blogToDelete._id})

  response.json(blogToDelete)
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