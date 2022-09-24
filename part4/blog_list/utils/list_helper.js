const logger = require('./logger')

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
     return blogs.reduce((acum, value) => acum + value.likes,0)
}

const favoriteBlog  = (blogs) => {
  let likes = blogs.map((value) => value.likes );
  return blogs[likes.indexOf(Math.max(...likes))]

}

const Authors = (blogs,est) => {

  let authors = blogs.reduce((acum, item) => {
    return !acum[item.author] 
    ? {...acum,[item.author]:{"blogs": 1, "likes": item.likes}} 
    : { ...acum,[item.author]:{"blogs": acum[item.author]["blogs"] + 1,"likes":acum[item.author]["likes"] + item.likes }}
    
    }, {})

    authors = Object.keys(authors).map((e,index) => ({
      "name":e,  "est": authors[e][est]
   }));
  
    return authors
}
  
const mostBlogs = (blogs) => {

  const authors = Authors(blogs,'blogs');
  let numblogs = authors.map((value) => value.est );
  let author = authors[numblogs.indexOf(Math.max(...numblogs))]

  return { author: author.name, blogs: author.est }
}

const mostLikes = (blogs) => {

  const authors = Authors(blogs,'likes');
  let numlikes = authors.map((value) => value.est );

  let author = authors[numlikes.indexOf(Math.max(...numlikes))]
  return { author: author.name, likes: author.est }

}
  
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }


