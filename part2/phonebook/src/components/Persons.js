import Person from "./Person";

const Persons = ({ persons, handleDelete}) => {
  return (
    <div>
      <ul>
        {persons.map((person) => {
          return (
            <Person
              key={person.name}
              person={person}
              handleDelete={handleDelete}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Persons;
