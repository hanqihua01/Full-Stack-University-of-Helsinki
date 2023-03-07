require('dotenv').config()
// const cors = require('cors')
const express = require('express')
const application = express()
// application.use(cors())
application.use(express.static('build'))
application.use(express.json())

const Note = require('./models/note')

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2022-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2022-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2022-05-30T19:20:14.298Z",
        important: true
    }
]

application.get('/', (request, response) => {
    response.send('<h1>Hello</n1>')
})

application.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

application.get('/api/notes/:id', (request, response, next) => {
    const id = Number(request.params.id)
    Note.findById(id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

application.delete('/api/notes/:id', (request, response, next) => {
    const id = Number(request.params.id)
    Note.findByIdAndDelete(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

application.put('/api/notes/:id', (request, response, next) => {
    const body = request.body
  
    const note = {
        content: body.content,
        important: body.important,
    }
  
    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            if (updatedNote) {
                response.json(updatedNote)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

application.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

// handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

application.use(unknownEndpoint)

// hander of requests with result to errors
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    // if the id is malformatted
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

application.use(errorHandler)

const PORT = process.env.PORT
application.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})