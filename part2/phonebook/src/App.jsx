import { useEffect, useState } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">{message}</div>
  )
}

const ErrorNotification = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null
  }
  return (
    <div className="errorNotification">{errorMessage}</div>
  )
}

const Filter = ({ nameFilter, handleNameFilterChange }) => {
  return (
    <div>filter shown with <input value={nameFilter} onChange={handleNameFilterChange} /></div>
  )
}

const PersonForm = ({ handlePersonSubmit, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={handlePersonSubmit}>
      <div>name: <input value={newName} onChange={handleNameChange} /></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Persons = ({ filteredPersons, handlePersonDelete }) => {
  return (
    <div>
      {filteredPersons.map(filteredPerson =>
        <div key={filteredPerson.name}>
          {filteredPerson.name} {filteredPerson.number}
          <button onClick={() => handlePersonDelete(filteredPerson.id)}>delete</button>
        </div>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        const updatedPerson = { ...personToUpdate, number: newNumber }
        personService.update(updatedPerson.id, updatedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedPerson))
        })
        setMessage(`Updated ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      personService.create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlePersonDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.erase(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      }).catch(error => {
        setErrorMessage(`Information of ${personToDelete.name} has already been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorNotification errorMessage={errorMessage} />
      <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange} />
      <h3>Add a new</h3>
      <PersonForm handlePersonSubmit={handlePersonSubmit} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} handlePersonDelete={handlePersonDelete} />
    </div>
  )
}

export default App