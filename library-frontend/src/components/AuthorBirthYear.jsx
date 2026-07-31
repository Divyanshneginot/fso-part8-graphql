import { useMutation } from '@apollo/client/react'
import { useState } from 'react'
import { UPDATE_AUTHOR,ALL_AUTHORS } from '../queries'
const AuthorBirthYear = ({ authors,setError }) => {
    const [name,setName]=useState(authors[0].name)
    const [born,setBorn]=useState('')
    const [changeBirthYear]=useMutation(UPDATE_AUTHOR,{
      refetchQueries:[{query:ALL_AUTHORS}],
      onError:(error)=>setError(error.graphQLErrors[0].message)
    })
    const submit = async (event) => {
        event.preventDefault()
        changeBirthYear({ variables: { name, setBornTo: Number(born) } })
        setName(authors[0].name)
        setBorn('')
    }
    return (
      <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <select name="name" value={name} onChange={({target})=>setName(target.value)}>
            {authors.map((a) => (
              <option key={a.id}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input aria-label="born" type='year' value={born} onChange={({target})=>setBorn(target.value)}/>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
    )
}

export default AuthorBirthYear
