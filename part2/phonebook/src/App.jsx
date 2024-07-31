import { useState, useEffect } from 'react'
import './App.css'
import PersonForm from './PersonForm'
import PersonList from './PersonList'
import Filter from './Filter'
import Notification from './Notification'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const addPerson = (newPerson) => {
    
    const result = persons.filter((person) => person.name === newPerson.name)

    if (result.length > 0) {
      if(window.confirm(`${newPerson.name} is already added to phonebook. Replace old number with a new one?`)) 
      {
        personService
          .update(result[0].id, newPerson)
          .then(updatedPerson => {
            setNotification(`Updated ${updatedPerson.name}`, false)
            setPersons([...persons.filter(person => person.id != updatedPerson.id), updatedPerson])   
          })
        return 0
      }
      else {
        return -1
      }
    }
   
    const newObject = { name: newPerson.name, number: newPerson.number};

    personService
      .create(newObject)
      .then(createdPerson => {
        setNotification(`Added ${createdPerson.name}.`, false)
        setPersons([...persons, createdPerson])   
      })
    
    return 0
  }

  const deletePerson = (personToDelete) => {
    if(window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .remove(personToDelete.id)
        .then(deletedPerson => {
          setNotification(`${deletedPerson.name} was removed.`, false)
          setPersons(persons.filter(person => person.id != deletedPerson.id)) 
        })
        .catch(error => {
          setNotification(`${personToDelete.name} was already removed from server.`, true)
          setPersons(persons.filter(person => person.id != personToDelete.id)) 
        })
    }
  }

  const changeFilter = (newFilter) => {
    setFilter(newFilter)
  }

  const setNotification = (message, isError) => {
    setMessage(message);
    setError(isError)
    setTimeout(() => {
      setMessage(null)
    },5000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} error={error} />
      <Filter filter={filter} callback={changeFilter} />
      <PersonForm addPerson={addPerson} />
      <PersonList persons={persons} filter={filter} deleteCallback={deletePerson} />
    </div>
  )
}

export default App
