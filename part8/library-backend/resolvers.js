const { UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const config = require('./utils/config')
const jwt = require('jsonwebtoken')
const Book = require('./models/Book');
const Author = require('./models/Author');
const User = require('./models/User');
const pubsub = new PubSub()

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
        
        return  await Author.find({}).populate('bookCount');
      },
      recommend: async (root, args, context) => {
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }
        const {favoriteGenre} = currentUser; 
        return await Book.find({genres:{ $in: [favoriteGenre] }}).populate("author",{name:1,born:1}).exec();
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
        
        const newBook = await book.populate("author",{name:1,born:1})
        pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
        return newBook
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
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      },
    },
  }

  module.exports = resolvers
