import { useState, useEffect } from 'react'
import { useApolloClient,  useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './query'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend';
import LoginForm from './components/LoginForm'
import Notify from './components/notify'
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      setMessage(`${addedBook.title} added`)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setToken(token)
    };
  }, []);

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  setTimeout(() => {
    setMessage(null)
  }, 5000)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          (token) ? <>
                      <button onClick={() => setPage('add')}>add book</button>
                      <button onClick={() => setPage('recommend')}>recommend</button>
                      <button onClick={logout}>logout</button>
                    </>
                  : <button onClick={() => setPage('login')}>Login</button>
        }
      </div>
      
      <Notify message={message}/>
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <LoginForm show={page === 'login'} setToken={setToken} setMessage={setMessage}/>
      <NewBook show={page === 'add'} setMessage={setMessage}/>
      <Recommend show={page === 'recommend'} />
    </div>
  )
}

export default App
