
import { useQuery } from "@apollo/client"
import { USER_RECOMMEND } from "../query"
const Recommend = (props) => {
  const books = useQuery(USER_RECOMMEND)

 
  if (!props.show) {
    return null
  }


  const library = books.data.recommend

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
    </div>
  )
}

export default Recommend
