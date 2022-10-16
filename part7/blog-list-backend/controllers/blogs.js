const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Blog = require('../models/blog');
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({});
   response.json(blogs); 
});

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
});
  
blogsRouter.post('/', async (request, response, next) => {

  const { title, author, url, likes } = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

 const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes:likes,
    user: user._id
  })
  
   try {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)
   } catch (err) {
      next(err)
   }
  
});
 
blogsRouter.put('/:id', async (request, response, next) => {
  const { likes } = request.body;
  const opts = { runValidators: true };

  try {
    let result = await Blog.updateMany({ id: request.params.id }, { $set: { likes: likes } }, opts)
    response.status(201).json({ data: result })
  } catch (error) {
    next(error)
  }
    
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