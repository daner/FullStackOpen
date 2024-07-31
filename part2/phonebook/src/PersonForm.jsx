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
        let result = addPerson({name: newName, number: newNumber})
        if(result === 0) {
            setNewName('')
            setNewNumber('')
        }
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