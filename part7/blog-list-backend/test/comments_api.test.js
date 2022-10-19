const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blogs = require('../models/blog')
const Comments = require('../models/comment')

const user = {
  "username":"root",
  "password": "sekret"
}

const login = async () => {
 return await api
   .post('/api/login')
   .send(user)
   .expect(200)
   .expect('Content-Type', /application\/json/)
}

let blogs = {};
let result = {};
beforeEach(async () => {
  await Blogs.deleteMany({})

    let blogObject = new Blogs(helper.initialBlogs[0])
    blogs = await blogObject.save()

    helper.initialComments[0].blog = blogs._id;
    helper.initialComments[1].blog = blogs._id;


  await Comments.deleteMany({})

  let CommentsOnject = new Comments(helper.initialComments[0])
    result = await CommentsOnject.save();

    let putBlog = await Blogs.findById(blogs._id);
    putBlog.comments =  putBlog.comments.concat(result._id)
    
    await putBlog.save();

})

test('comments are returned as json', async () => {
    await api
      .get('/api/comments')
      .expect(200)
      .expect('Content-Type', /application\/json/)
});

test('a valid comments can be added ', async () =>{
    let blog = await api
                .get(`/api/blogs/${blogs._id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)

    const object = {
        content: 'new Comment add',
        idBlog: blog.body.id
    }
    let result = await api
                    .post('/api/comments')
                    .send(object)
                    .expect(201)
                    .expect('Content-Type', /application\/json/)
});
afterAll(() => {
  mongoose.connection.close()
})