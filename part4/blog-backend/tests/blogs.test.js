const { test, describe, after, beforeEach } = require('node:test')
const _ = require('lodash')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blogs = require('./data/blogs')
const api = supertest(app)


describe("blogs", () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    for(const item of blogs.withMultipleBlogs) {
      const blog = new Blog(item)
      await blog.save()
    }
  })

  test('are returned as json', async () => {
    const result = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('are six blogs in database', async () => {
    const result = await api
      .get('/api/blogs')
      .expect(200)

    assert.strictEqual(result.body.length, blogs.withMultipleBlogs.length)
  })

  test("have the correct id property", async () => {
    const result = await api
      .get('/api/blogs')
      .expect(200)

    _.forEach(result.body, (blog) => {
      assert.notStrictEqual(blog.id, undefined)
      assert.notStrictEqual(blog.id, null)
      assert.strictEqual(blog.id.length > 0, true)
    })
  })

  test("count increase by one after add", async () => {

    const beforeResult = await api
      .get('/api/blogs')
      .expect(200)

    const beforeCount = beforeResult.body.length

    const newBlog = {
      title: "Test title",
      author: "Test author",
      url: "http://example.com",
      likes: 4
    }

    const addedBlog = await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    assert.strictEqual(addedBlog.body.title, newBlog.title)  
    assert.strictEqual(addedBlog.body.author, newBlog.author)  
    assert.strictEqual(addedBlog.body.url, newBlog.url)  
    assert.strictEqual(addedBlog.body.likes, newBlog.likes)  

    const afterResult = await api
      .get('/api/blogs')
      .expect(200)

    const afterCount = afterResult.body.length

    assert.strictEqual(beforeCount + 1, afterCount)
  }) 

  test("likes defaults to zero when missing", async () => {
    const newBlog = {
      title: "Missing likes",
      author: "Author",
      url: "http://example.com",
    }

    const result = await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.likes, 0)  
  })

})

after(async () => {
  await mongoose.connection.close()
})