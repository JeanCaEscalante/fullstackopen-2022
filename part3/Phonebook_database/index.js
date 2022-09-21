require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const Phonebook = require('./models/persons');

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :response-time ms --> :body'));

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/info', (request, response) => {
  Phonebook.find({}).then((persons) => {
    response.send(`<h2>Phonebook has info for ${persons.length} people</h2>
                   <p>${new Date()}<p/>`);
  });
});

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Phonebook.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  }).catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const { name1, number1 } = request.body;

  const person = new Phonebook({
    name: name1,
    number: number1,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  }).catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { number1 } = request.body;
  const opts = { runValidators: true };

  Phonebook.updateMany({ _id: request.params.id }, { $set: { number: number1 } }, opts)
    .then((result) => response.status(201).json({ data: result }))
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Phonebook.findByIdAndRemove(request.params.id)
    .then(() => { response.status(204).end(); })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => { response.status(404).send({ error: 'unknown endpoint' }); };

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  let data;
  if (error.name === 'CastError') {
    data = { error: 'malformatted id' };
  }
  if (error.name === 'ValidationError') {
    data = { error: error.message };
  }
  next(error);
  return response.status(400).json(data);
};

app.use(errorHandler);

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
