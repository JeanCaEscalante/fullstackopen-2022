const logger = require('./logger')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response,next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next();
}

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
  
  }

  module.exports = { unknownEndpoint, tokenExtractor, errorHandler }
