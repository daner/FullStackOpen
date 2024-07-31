const PersonList = ({persons, filter}) => {
    return(
        <div>
            <h2>Numbers</h2>
            <ul>
                { persons
                    .filter( person => filter.length == 0 || person.name.toLowerCase().includes(filter.toLowerCase()))
                    .map(person => <li key={person.id}>{person.name} {person.number}</li>)
                }
            </ul>
        </div>
    )
}

export default PersonList