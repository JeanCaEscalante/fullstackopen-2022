import { useQuery } from "@apollo/client"
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BORN } from "../query"
import { useState } from 'react'
const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState(0)
  const authors = useQuery(ALL_AUTHORS)
  const [ editAuthor ] = useMutation(EDIT_BORN)
  if (!props.show) {
    return null
  }

  const updateBorn = (event) => {
    event.preventDefault()
    const setBornTo = parseInt(born)
    editAuthor({variables: {name,setBornTo} })

    setName('')
    setBorn(0)
  }

  if ( authors.loading ) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthor.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Set birthyear</h3>
        <form onSubmit={updateBorn}>
          <div>
            name
            <select  value={name} onChange={({target}) => setName(target.value)}>
              {
                authors.data.allAuthor.map((a) => <option key={a.name} value={a.name}>{a.name}</option>)
              }
            </select>
          </div>
          <div>
            
            born
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
