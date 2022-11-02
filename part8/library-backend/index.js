const { ApolloServer, UserInputError, gql } = require('apollo-server')
const config = require('./utils/config')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Book = require('./models/Book');
const Author = require('./models/Author');
const User = require('./models/User')
console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!,
    born: Int,
    bookCount: Int!
    id: ID! 
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: [String]!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!,
    allAuthor: [Author]!,
    me: User
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String],
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
      favoriteGenre: [String]!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () =>   Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {

      const {author, genre} = args
      const books = await Book.find({});

      if(author && genre) {
          return await Book.find({genres:{ $in: [genre] }, author: author}).populate("author",{name:1,born:1}).exec();
      }
      if(author){
        return books.filter((book) => book.author === author)
      }
      if(genre){
        return await Book.find({genres:{ $in: [genre] }}).exec();
      }
        
        return await Book.find({}).populate("author",{name:1,born:1}).exec();
    },
    allAuthor: async  () => {
      
      const authors = await Author.find({});
      const books = await Book.find({});

      return authors.map((author) => {
            return {
              name: author.name,
              bookCount: books.filter((book) => book.author.toString() === author.id).length,
              born: author.born,
              id: author.id,
            }  
      })
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const currentAuthor = await Author.find({name: args.author}).exec();
      let newAuthor = {};
  
      if (!currentAuthor.length) {
        const author = new Author({ name: args.author });
         newAuthor = await author.save();
      }
        
          const book = new Book({...args, author: (!currentAuthor.length) ? newAuthor._id : currentAuthor[0]._id})
        try {
          
          // await book.save().then(t => t.populate("author",{name:1,born:1}))
          await book.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
     
      return await book.populate("author",{name:1,born:1})
    },
    editAuthor: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const currentAuthor = await Author.find({name: args.name}).exec();
      const books = await Book.find({author: currentAuthor[0]._id}).exec();
      if (!currentAuthor.length) {
        return null;
      }
      const updatedAuthor = {
        name: currentAuthor[0].name,
        bookCount: books.length,
        born: args.setBornTo,
      };
      try {
       await Author.updateMany({ id: currentAuthor._id }, { $set: { born: args.setBornTo } })
      } catch (error) {
        throw new AuthorInputError(error.message, {
          invalidArgs: args,
        })
      }
      return updatedAuthor;
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), config.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})