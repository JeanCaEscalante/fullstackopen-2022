const listHelper = require('../utils/list_helper')
const logger = require('../utils/logger')

const blogs = [
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

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  });
})

describe('favorite Blog', () => {
 
  test('favoriteBlog', () => {
    const result = listHelper.favoriteBlog(blogs)

    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    })
  });
})

describe('most Blogs', () => {
 
  test('most Blogs', () => {
    const result = listHelper.mostBlogs(blogs)

    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  });
})

describe('most Likes', () => {
 
  test('most Likes', () => {
    const result = listHelper.mostLikes(blogs)

    logger.info(result)

    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  });
})