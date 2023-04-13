import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

 const handleDelete = (id) => {
    const message = `Delete contact`;
    if (window.confirm(message)) {
      personsService.deletePerson(id).catch(error => {
        setErrorMessage(`Contact has already been removed from server`)
        setTimeout(() => { setErrorMessage(null) }, 5000)
      });
      setPersons(persons.filter(p => id !== p.id))
    }
  };

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addContact = (event) => {
    event.preventDefault();

    const userExists = persons.some(
      (person) => person.name === newName && person.number === newNumber
    );
    const nameExist = persons.some((person) => person.name === newName);

    if (userExists) {
      alert(newName + "Contact was existed")
    } else if (nameExist) {
      window.confirm(
        newName +
          " is already added to phonebook, replace the old number with a new one"
      );
      const person = persons.find((n) => n.name === newName);
      const id = person.id;
      const changedPerson = { ...person, number: newNumber };

      personsService.update(id, changedPerson).then((returnedPerson) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedPerson))
        )
      });
      setMessage(`Added ${newName}`)
      setTimeout(() => { setMessage(null) }, 5000)
    } else {
      const personObject = {
        name: newName,
        number: newNumber, 
        id: persons.length + 1,
      };

      personsService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      })
      setMessage(`Added ${newName}`)
      setTimeout(() => { setMessage(null) }, 5000);
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const filterPersons =
    searchName === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(searchName.toLowerCase())
        );

  return (
    <div>
      <h1>Phonebook</h1>
      {
        errorMessage &&
        <Notification message={errorMessage} error={true} />
      }
      {
        message &&
        <Notification message={message} />
      }
      {/* <Notification message={message} /> */}
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
      ></PersonForm>
      <h1>Name</h1>
      <Persons persons={filterPersons} handleDelete={handleDelete}/>
    </div>
  );
};

export default App
