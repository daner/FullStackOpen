const CountryFilter = ({filterText, filterChangedCallback}) => {

    const handleInputChanged = (event) => {
        filterChangedCallback(event.target.value)
    }

    return(
        <div>
            <span>find countries </span>
            <input value={filterText} onChange={handleInputChanged} />
        </div>
    )
}

export default CountryFilter