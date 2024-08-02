const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const connect = async (connectionString) => {

    const url = connectionString === undefined
        ? config.MONGODB_CONNECTIONSTRING
        : connectionString

    mongoose.set('strictQuery', false)
    logger.info('connecting to', url)

    try {
        await mongoose.connect(url)
        logger.info('connected to MongoDB')
    } catch(error) {
        logger.error('error connecting ', error)
    }

}

module.exports = { connect }