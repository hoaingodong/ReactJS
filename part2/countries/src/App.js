import axios from "axios";
import React, { useState, useEffect } from 'react'

import Result from './components/Result'
import Search from './components/Search'

const App = () => {
  const [searchName, setSearchName] = useState('')
  const [countries, setCountries] = useState([])

  const url = `https://restcountries.com/v3.1/all`;

  useEffect(() => {
    axios.get(url).then(response => {
      setCountries(response.data)
    })
  }, [])
  
  const showCountry = (event) => {
    event.preventDefault()
    setSearchName(event.target.value)
  }
  
  return (
    <div>
      <Search searchName={searchName} setSearchName={setSearchName}/>
      <Result countries={countries}  searchName={searchName} showCountry={showCountry}/>
    </div>
  )
}
export default App