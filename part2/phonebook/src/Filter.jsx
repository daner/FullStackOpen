const Filter = ({filter, callback}) => {
    
    const handleInputChange = (event) => {
        callback(event.target.value)
    }
    
    return(
        <div>
            <span>filter shown with </span> <input value={filter} onChange={handleInputChange} />   
        </div>
    )
}

export default Filter