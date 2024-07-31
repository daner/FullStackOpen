import { useEffect, useState } from "react"
import weatherService from "../services/weather"

const CountryDetails = ({country}) => {

    const [weather, setWeather] = useState(null)
    
    useEffect(() => {
        weatherService
            .getForCity(country.capital[0], country.cca2)
            .then(data => {
                setWeather(data)
            })
            .catch(error => console.log(error))
    }, [])

    return(
        <div>
            <h2>{country.name.official}</h2>
            <div>Capital {country.capital[0]}</div>
            <div>Area {country.area} km^2</div>
            <div>
                <h4>Languages</h4>
                <ul>
                    { Object.keys(country.languages).map((key) => <li key={key}>{country.languages[key]}</li>) }
                </ul>
            </div>
            <div>
                <img src={country.flags.png} />
            </div>
            <div>
                <h3>Weather in {country.capital[0]}</h3>
                {weather != null && (
                    <div>
                        <div>temperature {weather.main.temp} &deg;C</div>
                        <div><img src={ `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} /></div>
                        <div>wind {weather.wind.speed} m/s</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CountryDetails