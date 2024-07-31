import axios from "axios";

//Key stored in .env.local
const api_key = import.meta.env.VITE_WEATHER_API_KEY

const getForCity = (city, countryCode) => {
    return axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&APPID=${api_key}&units=metric`)
            .then(response => response.data)

}

export default { getForCity }