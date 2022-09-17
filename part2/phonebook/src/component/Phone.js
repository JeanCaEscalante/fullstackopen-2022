import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [filter,setFilter] = useState('')
  const [ newName, setNewName ] = useState('')
  const [newNumber,setNewNumber] =useState('')

  const AddPerson = (event) => {
      event.preventDefault();
      
      const newPerson = {
        name:newName,
        number:newNumber
      }

      if(persons.some((current) => current.name === newPerson.name)){

        alert(`${newPerson.name} is already added to phonebook`)
        
      }else{
        setPersons(persons.concat(newPerson))
        setNewName('');
        setNewNumber('');
      }
        
  
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const phoneToShow = filter.length === 0
    ? persons
    : persons.filter(person => person.name.match(filter))

  return (
    <div>
      <h2>Phonebook</h2>

        <div>
          Filter shows with: <input value={filter} onChange={handleFilterChange}/>
        </div>

      <form onSubmit={AddPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          Numbers: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          phoneToShow.map((person) => <li key={person.name}>{person.name} {person.number}</li>)
        }
      </ul>
    </div>
  )
}

export default App