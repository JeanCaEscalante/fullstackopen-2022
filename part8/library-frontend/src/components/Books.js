import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../query"
const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
  const [filter,setFilter] = useState('');
  if (!props.show) {
    return null
  }

  const genres = () => {
    const genres =  books.data.allBooks.reduce((acc, item) => {
        return [... new Set(acc.concat(item.genres))]
    },[]) 

    return genres.map((genre) => <button onClick={() => onButton(genre)} key={genre}>{genre}</button>)
  }

  const onButton = (value) => {
      setFilter(value);
  }

  const library = (filter === '') ? books.data.allBooks 
                  : books.data.allBooks.filter((book) => book.genres.includes(filter) )

  if ( books.loading ) {
    return <div>loading...</div>
  }

 
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {library.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      { 
        genres()
      }
      <button onClick={() => onButton('')} >All genres</button>
    </div>
  )
}

export default Books
