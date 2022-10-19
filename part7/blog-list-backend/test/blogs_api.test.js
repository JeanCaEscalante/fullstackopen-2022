const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blogs = require('../models/blog')

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

    })
})

test('a valid blogs can be added', async () => {

  const newBlog =  {
    title: "Teoria de Cuerdas",
    author: "Albert H. A.",
    url: "https://www.npmjs.com/package/cors",
    likes: 4,
    user: '634e9d4f2b96a284b666bfff'
   }

   const user = await login();
    console.log(user.body);
let result =  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${user.body.token}`)
    .send(newBlog)
    .expect(201) 
    .expect('Content-Type', /application\/json/)

  const blogs = await api.get('/api/blogs')
  expect(blogs.body).toHaveLength(helper.initialBlogs.length + 1)

  const response = await api.get(`/api/blogs/${result.body.id}`)

  expect(response.body).toEqual({
    id:result.body.id,
    title: result.body.title,
    author:result.body.author,
    url: result.body.url,
    likes: result.body.likes,
    user: result.body.user
   }); 
})

describe('the validation schema mongoose', () => {
    
  test('is title is null or undifined', async () => {
    const newBlog =  {
      title: "",
      author: "Albert H. A.",
      url: "https://www.npmjs.com/package/cors",
      likes: 4,
      user: '634b0ebf37401f13e38ab34f'
     }

     const user = await login();
    
  let result =  await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${user.body.token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      expect(result.body.error).toEqual('Blog validation failed: title: The field `title` is required.')
  });

  test('is author is null or undifined', async () => {
    const newBlog =  {
      title: "Teoria de Cuerdas",
      author: "",
      url: "https://www.npmjs.com/package/cors",
      likes: 4,
      user: '634b0ebf37401f13e38ab34f'
     }
    
     const user = await login();

  let result =  await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${user.body.token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      expect(result.body.error).toEqual('Blog validation failed: author: The field `author` is required.')
  });

  test('is url is null or undifined', async () => {
    const newBlog =  {
      title: "Teoria de Cuerdas",
      author: "Albert H. A.",
      url: "",
      likes: 4,
      user: '634b0ebf37401f13e38ab34f'
     }
    
     const user = await login();

  let result =  await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${user.body.token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      expect(result.body.error).toEqual('Blog validation failed: url: The field `url` is required.')
  });

  test('is url', async () => {
    const newBlog =  {
      title: "Teoria de Cuerdas",
      author: "Albert H. A.",
      url: "Busqueda",
      likes: 4, 
     }
    
     const user = await login();

  let result =  await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${user.body.token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      expect(result.body.error).toEqual('Blog validation failed: url: Invalid URL.')
  });

  test('is likes undifined', async () => {
    const newBlog =  {
      title: "Teoria de Cuerdas",
      author: "Albert H. A.",
      url: "https://www.npmjs.com/package/cors",
      likes: undefined,
      user: '634b0ebf37401f13e38ab34f'
     }
    
    const user = await login();

  let result =  await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${user.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      expect(result.body.likes).toBe(0)
  });
});

  
describe('Delete and update', () => {
    
  test('is update', async () => {

  const response = await api
            .put(`/api/blogs/${update._id}`)
            .send({likes: 20})
            .expect(201)
            .expect('Content-Type', /application\/json/)

  expect(response.body.data).toMatchObject({ acknowledged: true })

  });

  test('is delete', async () => {

    const user = await login();

       await api
            .delete(`/api/blogs/${remove._id}`)
            .set('Authorization', `bearer ${user.body.token}`)
            .expect(204)
  });
})

afterAll(() => {
  mongoose.connection.close()
})