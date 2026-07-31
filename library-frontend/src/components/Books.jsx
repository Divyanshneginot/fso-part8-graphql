import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState(null)
  const booksByGenre = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre,
  })

  if (result.loading || (genre && booksByGenre.loading)) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const allBooks = result.data.allBooks
  const booksToDisplay = genre ? booksByGenre.data.allBooks : allBooks
  
  const allGenres = [...new Set(allBooks.flatMap((b) => b.genres))]

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <p>
          in genre <strong>{genre}</strong>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToDisplay.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {allGenres.map((g) => (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
