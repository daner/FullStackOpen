require('dotenv').config({ path: '.env.local' })

const PORT = process.env.PORT
const MONGODB_CONNECTIONSTRING = process.env.MONGODB_CONNECTIONSTRING

module.exports = {
    MONGODB_CONNECTIONSTRING,
    PORT
}