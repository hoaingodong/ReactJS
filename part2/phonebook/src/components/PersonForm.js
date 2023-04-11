const PersonForm = ({addContact, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
      <div>
        <form onSubmit={addContact}>
        <div>
          <label>name: </label>
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <label>number: </label>
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <button type="submit">add</button>
      </form>
      </div>
    )
  }
  
  export default PersonForm;