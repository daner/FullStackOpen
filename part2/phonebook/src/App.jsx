import { useState, useEffect } from 'react'
import './App.css'
import PersonForm from './PersonForm'
import PersonList from './PersonList'
import Filter from './Filter'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('');

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
            setPersons([...persons.filter(person => person.id != updatedPerson.id), updatedPerson])   
          })
        return -1
      }
      else {
        return -1
      }
    }
   
    const newObject = { name: newPerson.name, number: newPerson.number};

    personService
      .create(newObject)
      .then(createdObject => {
        setPersons([...persons, createdObject])   
      })
    
    return 0
  }

  const deletePerson = (person) => {
    console.log(person);

    if(window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id != deletedPerson.id)) 
        })
    }
  }

  const changeFilter = (newFilter) => {
    setFilter(newFilter)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} callback={changeFilter} />
      <PersonForm addPerson={addPerson} />
      <PersonList persons={persons} filter={filter} deleteCallback={deletePerson} />
    </div>
  )
}

export default App
