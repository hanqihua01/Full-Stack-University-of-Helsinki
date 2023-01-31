import { useState } from 'react'

const Filter = (props) => {
  return (
    <div><input value={props.value} onChange={props.onChange} /></div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <div>name: <input value={props.value1} onChange={props.onChange1} /></div>
        <div>number: <input value={props.value2} onChange={props.onChange2} /></div>
        <div><button type="submit">add</button></div>
      </form>
    </div>
  )
}

const Persons = (props) => {
  return (
    <div>
      <ul>
        {props.personsToShow.map(person =>
          <li key={person.name + person.number}>{person.name} {person.number}</li>
        )}
      </ul>
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
  const [searchName, setSearchName] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newObject = {
      name: newName,
      number: newNumber
    }

    if (persons.findIndex(element => JSON.stringify(element) === JSON.stringify(newObject)) === -1) {
      setPersons(persons.concat(newObject))
      setNewName('')
      setNewNumber('')
    } else {
      window.alert('%{newName} %{newNumber} is already added to phonebook')
    }
  }

  const personsToShow = searchName === ''
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(searchName.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchName} onChange={handleSearchName} />
      
      <h3>Add a new</h3>
      <PersonForm onSubmit={handleSubmit}
        value1={newName} onChange1={handleNewName}
        value2={newNumber} onChange2={handleNewNumber}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App