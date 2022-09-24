const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
});

blogsRouter.get('/info', async (request, response) => {
  const blogs = await Blog.find({})
  response.json({cantidad: blogs.length})
});

blogsRouter.get('/:id', async (request, response) => {
  const blogs = await  Blogs.findById(request.params.id);

  if (blogs) {
    response.json(blogs);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post('/', async (request, response) => {
  
 const { title1, author1, url1, likes1 } = request.body;

  blog = new Blog({
    title: title1,
    author: author1,
    url: url1,
    likes:likes1 
  })
  
  const savedBlog = await blog.save()
  response.json(savedBlog)
  
});

blogsRouter.put('/:id', async (request, response) => {
  const { likes1 } = request.body;
  const opts = { runValidators: true };

 let result = await Blog.updateMany({ id: request.params.id }, { $set: { likes: likes1 } }, opts)
  response.status(201).json({ data: result })
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end();
});

module.exports = blogsRouter