const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blogs = require('../models/blog')
const logger = require('../utils/logger')


let {update, remove} = 0;
beforeEach(async () => {
  await Blogs.deleteMany({})
  let blogObject = new Blogs(helper.initialBlogs[0])
update = await blogObject.save()
  blogObject = new Blogs(helper.initialBlogs[1])
remove =  await blogObject.save()
  blogObject = new Blogs(helper.initialBlogs[2])
  await blogObject.save()
  blogObject = new Blogs(helper.initialBlogs[3])
  await blogObject.save()
  blogObject = new Blogs(helper.initialBlogs[4])
  await blogObject.save()
  blogObject = new Blogs(helper.initialBlogs[5])
  await blogObject.save()
})

const user = {
  "username":"root",
  "password": "sekret"
}

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
 let numBlogs = await api
    .get('/api/blogs')

    expect(numBlogs.body).toHaveLength(helper.initialBlogs.length)
})

  
describe('the unique identifier', () => {
    
    test('is named id', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body.id).toBeUndefined();

    },100000)
})

test('a valid blogs can be added', async () => {

  const newBlog =  {
    title1: "Teoria de Cuerdas",
    author1: "Albert H. A.",
    url1: "https://www.npmjs.com/package/cors",
    likes1: 4, 
    user:"6331979186d6b1b18f9c74f2"
   }
  
  const login =  await api
  .post('/api/login')
  .send(user)
  .expect(200)
  .expect('Content-Type', /application\/json/)


let result =  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${login.body.token}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    
 
  const blogs = await api.get('/api/blogs')
  const response = await api.get(`/api/blogs/${result.body.id}`)

  expect(blogs.body).toHaveLength(helper.initialBlogs.length + 1)

  expect(response.body).toEqual({
    id:result.body.id,
    title: result.body.title,
    author:result.body.author,
    url: result.body.url,
    likes: result.body.likes,
    user: result.body.user
   }); 
})


describe('the name, url, likes is empty or undefined', () => {

  
  test('Yes, likes is undefinied the value default is 0', async () => {

    const newBlog =  {
      title1: "Teoria de Relatividad",
      author1: "Albert Einstein",
      url1: "https://www.npmjs.com/package/cors",
      likes1: undefined
     }

     const login =  await api
     .post('/api/login')
     .send(user)
     .expect(200)
     .expect('Content-Type', /application\/json/)
   
    
  let result =  await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${login.body.token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
  
    expect(result.body.likes).toBe(0);
  
  })
  
  test('is name emty', async () => {
    const newBlog =  {
      title1: "",
      author1: "Albert H. A.",
      url1: "https://www.npmjs.com/package/cors",
      likes1: 4
     }

     const login =  await api
     .post('/api/login')
     .send(user)
     .expect(200)
     .expect('Content-Type', /application\/json/)
   
    
 let result = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${login.body.token}`)
      .send(newBlog)
      .expect(400)

      expect(result.body).toEqual({"error": "Blog validation failed: title: Path `title` is required."})

});

test('is url emty', async () => {

    const newBlog =  {
      title1: "Teoria de Relatividad",
      author1: "Albert Einstein",
      url1: "",
      likes1: "1"
     }

     const login =  await api
     .post('/api/login')
     .send(user)
     .expect(200)
     .expect('Content-Type', /application\/json/)
   
    
  let result = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${login.body.token}`)
      .send(newBlog)
      .expect(400)
      
     expect(result.body).toEqual({error: "Blog validation failed: url: Path `url` is required."})

});

});

describe('the malformatted id', () => {
  
test('delete', async () => {

  const login =  await api
  .post('/api/login')
  .send(user)
  .expect(200)
  .expect('Content-Type', /application\/json/)

    
  let result = await api
      .delete('/api/blogs/someInvalidId')
      .set('Authorization', `bearer ${login.body.token}`)
      .expect(400)

    expect(result.body).toEqual({ error: 'malformatted id' })

});

test('update', async () => {
    
  let result = await api
      .put('/api/blogs/someInvalidId')
      .expect(201)

    expect(result.body.data).toEqual({ acknowledged: false })

});

});

describe('update and delete', () => {
  
  test('delete', async () => {

    const login =  await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)
      
    await api
        .delete(`/api/blogs/${remove._id}`)
        .set('Authorization', `bearer ${login.body.token}`)
        .expect(204)
    
  });
  
  test('update', async () => {

    let result = await api
        .put(`/api/blogs/${update._id}`)
        .send({likes1: 30 })
        .expect(201)

      expect(result.body.data).toMatchObject({ acknowledged: true })
  
  });

});

afterAll(() => {
  mongoose.connection.close()
})