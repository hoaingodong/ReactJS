const Search = ({searchName, setSearchName}) => {

  const handleChange = (event) => {
    let value = ''
    if (event.target.value.length > 0) {
      value = event.target.value
    }

    setSearchName(value)
  }

  return (
    <div>
      find countries  <input value={searchName} onChange={handleChange} />
    </div>
  )
}

export default Search 