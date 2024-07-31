import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import PersonForm from './PersonForm'
import PersonList from './PersonList'
import Filter from './Filter'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
      })
  }, [])

  const addPerson = (newPerson) => {
    
    const result = persons.filter((person) => person.name === newPerson.name)

    if (result.length > 0) {
      alert(`${newPerson.name} is already added to phonebook`)
      return -1
    }
   
    setPersons([...persons, { name: newPerson.name, number: newPerson.number, id: persons.length + 1 }])   
    return 0
  }

  const changeFilter = (newFilter) => {
    setFilter(newFilter)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} callback={changeFilter} />
      <PersonForm addPerson={addPerson} />
      <PersonList persons={persons} filter={filter} />
    </div>
  )
}

export default App
