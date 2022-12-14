const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Blog = require('../models/blog');
const User = require('../models/user')
const logger = require('../utils/logger')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post('/', async (request, response) => {
  
 const { title1, author1, url1, likes1 } = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  blog = new Blog({
    title: title1,
    author: author1,
    url: url1,
    likes:likes1,
    user: user._id
  })
  
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
  
});

blogsRouter.put('/:id', async (request, response) => {
  const { likes1 } = request.body;
  const opts = { runValidators: true };

 let result = await Blog.updateMany({ id: request.params.id }, { $set: { likes: likes1 } }, opts)
  response.status(201).json({ data: result })
});

blogsRouter.delete('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  if(blog.user.toString() === user._id.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end();
  }

});

module.exports = blogsRouter