import CountryDetails from "./CountryDetails"
import './CountryList.css'

const CountryList = ({countries, filterCallback}) => {
    if(countries.length > 1 && countries.length <= 10) {
        return(
            <div>
                { countries.map(country => 
                    <div key={country.name.common}><span>{country.name.common}</span><button onClick={() => filterCallback(country.name.official)}>Show</button></div>
                ) }
            </div>
        )
    }
    else if(countries.length > 10) {
        return(<div>To many mathces, specify another filter.</div>)
    }
    else if(countries.length == 1) {
        return(<CountryDetails country={countries[0]} />)
    }    
}

export default CountryList