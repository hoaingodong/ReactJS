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
    console.log(persons);

    const userExists = persons.some((person) => person.name === newName);

    if (userExists) {
      alert(newName + " is already added to phonebook");
    } else {
      const person = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(person));
    }
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

  const filterPersons = (searchName==="")
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
  console.log(filterPersons)

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        searchName={searchName}
        handleSearchName={handleSearchName}
      ></Filter>
      <h1>Add a new</h1>
      <PersonForm
        addContact={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      >
      </PersonForm>
      <h1>Name</h1>
      <Persons persons={filterPersons} />
    </div>
  );
};

export default App;
