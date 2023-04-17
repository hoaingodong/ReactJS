import React, { useState } from 'react'

import Result from './components/Result'
import Search from './components/Search'

const App = () => {
  const [searchName, setSearchName] = useState('')
  const [countries, setCountries] = useState([])

  const showCountry = (event) => {
    event.preventDefault()
    setSearchName(event.target.value)
  }
  
  return (
    <div>
      <Search searchName={searchName} setSearchName={setSearchName}/>
      <Result countries={countries} setCountries={setCountries} searchName={searchName} showCountry={showCountry}/>
    </div>
  )
}
export default App