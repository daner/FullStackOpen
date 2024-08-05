const { test, describe, after, beforeEach, before } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const blogs = require('./data/blogs')
const fixure = require('./test_fixture')
const _ = require('lodash')

let api; 
let token;

before(async () => {
  api = await fixure.before()
})

describe("blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const user = { username: 'user', password: 'password' }
    const userResponse = await api.post('/api/users').send(user)
    const loginResponse = await api.post('/api/login').send(user)

    token = `Bearer ${loginResponse.body.token}`   

    for(const item of blogs.withMultipleBlogs) {
      const blog = new Blog(item)
      blog.user = userResponse.body.id
      await blog.save()
    }
  })

  test('are returned as json', async () => {
    await api
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
      .set({ Authorization: token })
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
      .set({ Authorization: token })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.likes, 0)  
  })

  test("missing title return bad request", async () => {
    const newBlog = {
      author: "Author",
      url: "http://example.com",
      likes: 5
    }

    await api.post('/api/blogs')
      .set({ Authorization: token })
      .send(newBlog)
      .expect(400)
  })

  test("missing url return bad request", async () => {
    const newBlog = {
      title: "Title",
      author: "Author",
      likes: 5
    }

    await api.post('/api/blogs')
      .set({ Authorization: token })
      .send(newBlog)
      .expect(400)
  })

  test("count decrease by one after delete", async () => {

    const beforeResult = await api
      .get('/api/blogs')
      .expect(200)


    const beforeCount = beforeResult.body.length
    const id = beforeResult.body[0].id  
    
    await api.delete(`/api/blogs/${id}`)
      .set({ Authorization: token })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const afterResult = await api
      .get('/api/blogs')
      .expect(200)

    const afterCount = afterResult.body.length

    assert.strictEqual(beforeCount - 1, afterCount)
  })
 
  test("can get added blog", async () => {
    const newBlog = {
      title: "Test title",
      author: "Test author",
      url: "http://example.com",
      likes: 4
    }

    const addedBlog = await api.post('/api/blogs')
      .set({ Authorization: token })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const id = addedBlog.body.id

    const getBlog = await api
      .get(`/api/blogs/${id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(getBlog.body.title, newBlog.title)  
    assert.strictEqual(getBlog.body.author, newBlog.author)  
    assert.strictEqual(getBlog.body.url, newBlog.url)  
    assert.strictEqual(getBlog.body.likes, newBlog.likes)  
  })

  test("can update likes and get new object from put", async () => {
    const allResult = await api
      .get('/api/blogs')
      .expect(200)

    const beforeBlog = allResult.body[0]

    const putResult = await api
      .put(`/api/blogs/${beforeBlog.id}`)
      .send({likes: beforeBlog.likes + 1})
      .expect(200)

    const getResult = await api
      .get(`/api/blogs/${beforeBlog.id}`)
      .expect(200)

      assert.strictEqual(putResult.body.likes, beforeBlog.likes + 1)  
      assert.strictEqual(getResult.body.likes, beforeBlog.likes + 1)  
  })

  test("missing authroization on create returns unauthorized", async () => {
    const newBlog = {
      author: "Author",
      url: "http://example.com",
      likes: 5
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

after(async () => {
  await fixure.after()
})