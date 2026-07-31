import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient } from '@apollo/client/react'
const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setError] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const client =useApolloClient()
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    if (page === 'add' || page === 'recommend') setPage('authors')
  }
  const notify = (message) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }
  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} setError={notify} token={token} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} setError={notify} />
      <Recommend show={page === 'recommend'} />
      <LoginForm show={page === 'login'} setToken={setToken} setError={notify} setPage={setPage} />
    </div>
  )
}

export default App
