import { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

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

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          (token) ? <>
                      <button onClick={() => setPage('add')}>add book</button>
                      <button onClick={logout}>logout</button>
                    </>
                  : <button onClick={() => setPage('login')}>Login</button>
        }
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <LoginForm show={page === 'login'} setToken={setToken}/>
      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
