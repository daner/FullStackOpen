const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
const db = require('./db')

if (process.env.NODE_ENV === 'test') {
    db.startTestContainerAndConnect()
}
else {
    db.connect()
}

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})