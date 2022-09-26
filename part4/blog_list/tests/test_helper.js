const Blogs = require('../models/blog')
const User = require('../models/user')
const app = require('../app')

const initialBlogs = [
    { 
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user:"6331979186d6b1b18f9c74f2"
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      user:"6331979186d6b1b18f9c74f2"
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      user:"6331979186d6b1b18f9c74f2"
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      user:"6331979186d6b1b18f9c74f2"
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      user:"6331979186d6b1b18f9c74f2"
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      user:"6331979186d6b1b18f9c74f2"
    }  
  ]

const nonExistingId = async () => {
    const blog = new Blogs({
        title1: "Teoria de Cuerdas",
        author1: "Albert H. A.",
        url1: "https://www.npmjs.com/package/cors",
        likes1: 4
       })

    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
  }
  
  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

  const blogsInDb = async () => {
    const blogs = await Blogs.find({})
    return blogs.map(blog => blog.toJSON())
  }


  module.exports = { initialBlogs, nonExistingId, blogsInDb, usersInDb }