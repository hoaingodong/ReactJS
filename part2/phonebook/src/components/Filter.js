const Filter = ({searchName, handleSearchName}) => {
  return (
    <div>
      Filter shown with: <input value={searchName} onChange={handleSearchName}/>
    </div>
  )
}

export default Filter;