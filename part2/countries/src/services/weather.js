import axios from "axios";

//Read key from .env.local
const api_key = import.meta.env.VITE_WEATHER_API_KEY


const getForCity = (city) => {
    return axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${api_key}&units=metric`)
            .then(response => response.data)

}

export default { getForCity }