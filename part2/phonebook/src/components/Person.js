import personsService from '../services/persons'
const Person = ({ person }) => {
  const handle = () => {
    const message = `Delete ${person.name}`;
    if (window.confirm(message)) {
      personsService.deletePerson(person.id);
    }
  };
  return (
    <div>
      <li>
        {person.name} - {person.number}
        <button onClick={handle}>Delete</button>
      </li>
    </div>
  );
};

export default Person;
