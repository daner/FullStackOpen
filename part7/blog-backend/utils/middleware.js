const logger = require('./logger')
const morgan = require('morgan')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

morgan.token('body', function (req) {
    return JSON.stringify(req.body)
})

const requestLogger = process.env.NODE_ENV === 'test'
    ? (request, response, next) => { next() }
    : morgan(':method :url :status :res[content-length] - :response-time ms :body')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'token invalid' })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        })
    }

    next(error)
}

const tokenExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    }

    next()
}

const userExtractor = async (request, response, next) => {
    if (request.token) {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }
        request.user = await User.findById(decodedToken.id)
    }

    next()
}


module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}