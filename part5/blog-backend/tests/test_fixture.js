const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const db = require('../db.js')

let mongodbContainer

const before = async () => {
    mongodbContainer = await db.startTestContainerAndConnect()
    const api = supertest(app)
    return api;
}

const after = async () => {
    await mongoose.connection.close()
    await mongodbContainer.stop()
}

module.exports = { before, after }