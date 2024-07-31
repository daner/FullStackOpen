const CountryFilter = ({filterText, filterCallback}) => {

    const handleInputChanged = (event) => {
        filterCallback(event.target.value)
    }

    return(
        <div>
            <span>find countries </span>
            <input value={filterText} onChange={handleInputChanged} />
        </div>
    )
}

export default CountryFilter