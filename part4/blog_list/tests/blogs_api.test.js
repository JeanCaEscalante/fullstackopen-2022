const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blogs = require('../models/blog')
const logger = require('../utils/logger')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }  
]
let {update, remove} = 0;
beforeEach(async () => {
  await Blogs.deleteMany({})
  let blogObject = new Blogs(initialBlogs[0])
update = await blogObject.save()
  blogObject = new Blogs(initialBlogs[1])
remove =  await blogObject.save()
  blogObject = new Blogs(initialBlogs[2])
  await blogObject.save()
  blogObject = new Blogs(initialBlogs[3])
  await blogObject.save()
  blogObject = new Blogs(initialBlogs[4])
  await blogObject.save()
  blogObject = new Blogs(initialBlogs[5])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('num blogs are returned', async () => {
 let numBlogs = await api
    .get('/api/blogs/info')
    
    expect(numBlogs.body).toEqual({cantidad: initialBlogs.length})
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
    likes1: 4
   }
  

let result =  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length + 1)

  expect(response.body.slice(-1).pop()).toEqual({
    id:result.body.id,
    title: result.body.title,
    author:result.body.author,
    url: result.body.url,
    likes: result.body.likes
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
    
  let result =  await api
      .post('/api/blogs')
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
    
 let result = await api
      .post('/api/blogs')
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
    
  let result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      
     expect(result.body).toEqual({error: "Blog validation failed: url: Path `url` is required."})

});

});

describe('the malformatted id', () => {
  
test('delete', async () => {
    
  let result = await api
      .delete('/api/blogs/someInvalidId')
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
      
    await api
        .delete(`/api/blogs/${remove._id}`)
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