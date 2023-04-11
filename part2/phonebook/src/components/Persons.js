import Person from "./Person";

const Persons = ({ persons, searchName }) => {
  console.log(persons, searchName);
  return (
    <div>
      <ul>
      {persons.map((person) => {
          if (
            searchName.length === 0 ||
            person.name.search(searchName) !== -1
          ) {
            return (
              <Person key={person.id} person={person} />
            );
          } else {
            return null;
          }
        })}
      </ul>
    </div>
  );
};

export default Persons;
