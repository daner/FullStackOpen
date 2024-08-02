const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const db = require('../db.js')
const { MongoDBContainer } = require('@testcontainers/mongodb')

let api;
let mongodbContainer

const before = async () => {
    mongodbContainer = await new MongoDBContainer('mongo:7.0.12').start()
    const url = `mongodb://${mongodbContainer.getHost()}:${mongodbContainer.getMappedPort(27017)}/test-db?directConnection=true` 
    await db.connect(url)
    api = supertest(app)
    return api;
}

const after = async () => {
    await mongoose.connection.close()
    await mongodbContainer.stop()
}

module.exports = { before, after }