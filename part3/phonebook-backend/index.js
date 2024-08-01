const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = 3001

app.use(express.json())

morgan.token('body', function (req, res) { 
    return JSON.stringify(req.body) 
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

var persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if(person) {
        response.json(person)
    } else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if(person) {
        persons = persons.filter(item => item.id != person.id)
        response.status(204).end()
    } else{
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    
    const body = request.body

    if (!body.number) {
        return response.status(400).json({ 
          error: 'number missing' 
        })
    }

    if (!body.name) {
        return response.status(400).json({ 
          error: 'name missing' 
        })
    }

    const duplicate = persons.find(person => person.name === body.name)

    if(duplicate) {
        return response.status(400).json({ 
            error: 'name must be unique' 
          })    
    }

    const id = Math.floor(Math.random() * 10000)

    const person = {
        id: String(id),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})


app.get('/info', (request, response) => {
    const now = Date.now()
    const today = new Date(now)

    response.send(`<html><body><p>Phonebook has info for ${persons.length} people</p><p>${today}</p></body></html>`)
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})