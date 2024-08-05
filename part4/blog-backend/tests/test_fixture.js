const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const db = require('../db.js')
const { MongoDBContainer } = require('@testcontainers/mongodb')

let mongodbContainer

const before = async () => {
    mongodbContainer = await new MongoDBContainer('mongo:7.0.12').start()
    const url = `${mongodbContainer.getConnectionString()}/test-db?directConnection=true`    
    await db.connect(url)
    const api = supertest(app)
    return api;
}

const after = async () => {
    await mongoose.connection.close()
    await mongodbContainer.stop()
}

module.exports = { before, after }