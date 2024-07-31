import { useState, useEffect } from 'react'
import './App.css'
import CountryList from './components/CountryList';
import CountryFilter from './components/CountryFilter';
import countriesService from './services/countries';

function App() {

  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
      countriesService
        .getAll()
        .then(data => setCountries(data))
  }, [])

  const changeFilter = (newFilter) => {
    setFilterText(newFilter)
    setFilteredCountries(countries.filter(country => {
      return country.name.common.toLowerCase().includes(newFilter.toLowerCase()) ||country.name.official.toLowerCase().includes(newFilter.toLowerCase())
    }))
  }

  return (
    <>
      <CountryFilter filterText={filterText} filterCallback={changeFilter} />
      <CountryList countries={filteredCountries} filterCallback={changeFilter} />
    </>
  )
}

export default App
