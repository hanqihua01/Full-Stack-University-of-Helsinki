import { useState } from 'react'

const Filter = ({ handleNameFilterChange }) => {
  return (
    <div>filter shown with <input onChange={handleNameFilterChange} /></div>
  )
}

const PersonForm = ({ handlePersonSubmit, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={handlePersonSubmit}>
      <div>name: <input onChange={handleNameChange} /></div>
      <div>number: <input onChange={handleNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Persons = ({ filteredPersons }) => {
  return (
    <div>
      {filteredPersons.map(filteredPerson =>
        <div key={filteredPerson.name}>{filteredPerson.name} {filteredPerson.number}</div>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [nameFilter, setNameFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleNameFilterChange={handleNameFilterChange} />
      <h3>Add a new</h3>
      <PersonForm handlePersonSubmit={handlePersonSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App