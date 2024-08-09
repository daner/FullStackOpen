const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const { MongoDBContainer } = require('@testcontainers/mongodb')

const connect = async (connectionString) => {
    const url =
        connectionString === undefined
            ? config.MONGODB_CONNECTIONSTRING
            : connectionString

    mongoose.set('strictQuery', false)
    logger.info('Connecting to', url)

    try {
        await mongoose.connect(url)
        logger.info('Connected to MongoDB')
    } catch (error) {
        logger.error('Error connecting ', error)
    }
}

const startTestContainerAndConnect = async () => {
    const mongodbContainer = await new MongoDBContainer('mongo:7.0.12').start()
    const url = `${mongodbContainer.getConnectionString()}/test-db?directConnection=true`
    connect(url)
    return mongodbContainer
}

module.exports = { connect, startTestContainerAndConnect }
