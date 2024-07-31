import { useState } from 'react'

const PersonForm = ({addPerson}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleInputNameChange = (event) => {
        setNewName(event.target.value)
      }
    
      const handleInputNumberChange = (event) => {
        setNewNumber(event.target.value)
      }

      const onSubmit = (event) => {
        event.preventDefault()
        addPerson({name: newName, number: newNumber})
      }

    return(
        <div>
            <h2>Add a new</h2>
            <form onSubmit={onSubmit}>
                <div>
                    name: <input value={newName} onChange={handleInputNameChange}/> <br/>
                    number: <input value={newNumber} onChange={handleInputNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
    
}

export default PersonForm