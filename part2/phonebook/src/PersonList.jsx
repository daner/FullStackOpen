const PersonList = ({persons, filter, deleteCallback}) => {
    return(
        <div>
            <h2>Numbers</h2>
            <table>
                <tbody>
                { persons
                    .filter( person => filter.length == 0 || person.name.toLowerCase().includes(filter.toLowerCase()))
                    .map(person => 
                        <tr key={person.id}>
                            <td>{person.name}</td> 
                            <td>{person.number}</td>
                            <td><button onClick={() => deleteCallback(person)}>Delete</button> </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}

export default PersonList