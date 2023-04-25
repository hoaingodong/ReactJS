const express = require('express')
const app = express()
const cors = require('cors')
var morgan = require('morgan')
app.use(express.static('build'))
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))

app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))

const Person = require('./models/person')

app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        res.json(result)
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    //check existed contact
    Person.find({}).then(persons => {
        console.log('persons: ', persons)

        if (persons.some(person => person.name === body.name)) {
            console.log("name must be unique")
            return response.status(400).json({
                error: 'name must be unique'
            })
        }

        let person = new Person(  {
            name: body.name,
            number: body.number,
        })

        // save into MongoDB
        person.save().then(savedPerson => {
            console.log('savedPerson', savedPerson)
            response.json(savedPerson)
        })
    })
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})