import React, { useState } from 'react'

import Result from './components/Result'
import Search from './components/Search'

const App = () => {
  const [searchName, setSearchName] = useState('')
  const [countries, setCountries] = useState([])
  
  return (
    <div>
      <Search searchName={searchName} setSearchName={setSearchName}/>
      <Result countries={countries} setCountries={setCountries} searchName={searchName} />
    </div>
  )
}
export default App