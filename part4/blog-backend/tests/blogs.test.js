const { test, describe, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe("blogs", () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('are returned in the correct amount', async () => {
    var result = await api
      .get('/api/blogs')

    assert.strictEqual(result.body.length, 2)
  })
})
  
after(async () => {
  await mongoose.connection.close()
})