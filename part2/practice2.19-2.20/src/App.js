import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div className='success' style={successStyle}>
      {message}
    </div>
  )
}

const ErrorNotification = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div className='success' style={errorStyle}>
      {errorMessage}
    </div>
  )
}

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
          <li key={person.name + person.number}>
            {person.name} {person.number}
            <button onClick={() => props.handleDelete(person)}>delete</button>
          </li>
        )}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchName, setSearchName] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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

    if (persons.findIndex(element => element.name === newObject.name) === -1) {
      personService.create(newObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${newObject.name}`)
        setTimeout(() => {setMessage(null)}, 5000)
      }).catch(error => {
        console.log(error.response.data)
        setErrorMessage(error.response.data.error)
        setTimeout(() => setErrorMessage(null), 5000)
      })
    } else {
      if (window.confirm(`${newObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        const toRenew = persons[persons.findIndex(element => element.name === newObject.name)]
        personService
          .renew(toRenew.id, newObject)
          .then(returnedPerson => {
            setPersons(persons.map(element =>
              element.id !== toRenew.id ? element : returnedPerson
            ))
          })
      }
    }
  }

  const handleDelete = (person) => {
    console.log(person)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(person.id).then(response => {
        personService.getAll().then(renewedPersons => setPersons(renewedPersons))
      }).catch(error => {
        setErrorMessage(`Information of ${person.name} has already been moved from server`)
        setTimeout(() => setErrorMessage(null), 5000)
      })
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
      <Notification message={message} />
      <ErrorNotification errorMessage={errorMessage} />
      <Filter value={searchName} onChange={handleSearchName} />

      <h3>Add a new</h3>
      <PersonForm onSubmit={handleSubmit}
        value1={newName} onChange1={handleNewName}
        value2={newNumber} onChange2={handleNewNumber}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App