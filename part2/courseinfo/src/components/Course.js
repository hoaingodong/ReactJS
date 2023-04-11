import React from "react";

const Header = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  );
};

const Part = ({part}) => {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  );
};

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((item) => (
        <Part part={item} />
      ))}
    </div>
  );
};
const Total = ({parts}) => {
  console.log(parts);
  return (
    <div>
      <p><b>total of {parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)} exercises</b></p>
    </div>
  );
};

const Course = ({course}) => {

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;