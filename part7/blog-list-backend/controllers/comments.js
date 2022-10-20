const commentsRouter = require('express').Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');

commentsRouter.get('/', async(request, response) => {
    const comments = await Comment.find({});
    response.json(comments); 
});

commentsRouter.post('/', async (request, response, next) => {
    const {content, idBlog} = request.body;

    const comment = new Comment({
        content: content,
        blog: idBlog
    });

    const blog = await Blog.findById(idBlog);

    try {
       const savedComment = await comment.save();
       blog.comments = blog.comments.concat(savedComment._id);
       await blog.save();
       response.status(201).json(savedComment);
    } catch (error) {
        next(error);
    }
});

module.exports = commentsRouter