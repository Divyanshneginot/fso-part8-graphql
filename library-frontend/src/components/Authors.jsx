import { useQuery } from '@apollo/client/react'
import AuthorBirthYear from './AuthorBirthYear'
import { ALL_AUTHORS } from '../queries'
const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors
  if (!props.show) {
    return null
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
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorBirthYear authors={authors} setError={props.setError}/>
    </div>
  )
}

export default Authors
