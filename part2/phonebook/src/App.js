import { useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  const addContact = (event) => {
    event.preventDefault();

    const Person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    alert(
      newName + " with number " + newNumber + " is already added to phonebook"
    );

    setPersons(persons.concat(Person));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchName = (event) => {
    console.log(event.target.value);
    setSearchName(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchName={searchName} handleSearchName={handleSearchName}></Filter>
      <h1>Add a new</h1>
      <PersonForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}> </PersonForm>
      <h1>Name</h1>
      <Persons persons={persons} searchName={searchName}/>
    </div>
  );
};

export default App;
