const dotenv = require('dotenv')
dotenv.config({ path: `.env.local`, override: true });

const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const app = express()

const PORT = process.env.PORT

app.use(express.json())

morgan.token('body', function (req, res) { 
    return JSON.stringify(req.body) 
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('dist'))

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
            response.json(persons)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
  
    Person.findById(request.params.id).then(person => {
        if(person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    
    Person.findByIdAndDelete(id).then(person => {
        if(person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    
    const { number } = request.body
    const id = request.params.id
    
    Person
        .findByIdAndUpdate(id, { number: number } , { new: true, runValidators: true, context: 'query' } )
        .then(person => {
            if(person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
            
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    
    const body = request.body

    Person
        .find({ name: body.name})
        .then(result =>  {
            if(result && result.length > 0) {
                response.status(400).json({ 
                    error: 'name must be unique' 
                })    
            }
            else {
                const person = new Person({
                    name: body.name,
                    number: body.number
                })
            
                person
                    .save()
                    .then(addedPerson => {
                        response.json(addedPerson)
                    })
                    .catch(error => next(error))  
            }
        })
})


app.get('/info', (request, response) => {
    const now = Date.now()
    const today = new Date(now)

    Person
        .find({})
        .then(persons => {
            response.send(`<html><body><p>Phonebook has info for ${persons.length} people</p><p>${today}</p></body></html>`)
        })
        .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'Malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})