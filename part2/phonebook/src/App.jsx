import { useState } from 'react'
import './App.css'
import PersonForm from './PersonForm'
import PersonList from './PersonList'
import Filter from './Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  
  const [filter, setFilter] = useState('');

  const addPerson = (newPerson) => {
    
    const result = persons.filter((person) => person.name === newPerson.name)

    if (result.length > 0) {
      alert(`${newPerson.name} is already added to phonebook`)
      return;
    }
   
    setPersons([...persons, { name: newPerson.name, number: newPerson.number, id: persons.length + 1 }])   
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
