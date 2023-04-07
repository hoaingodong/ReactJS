const Header = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  );
};
const Part = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  );
};
const Content = (props) => {
  console.log(props);
  return (
    <div>
      <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
      <Part part={props.part4} exercises={props.exercises4} />
    </div>
  );
};
const Total = (props) => {
  console.log(props.parts);
  return (
    <div>
      <p>total of {props.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)} exercises</p>
    </div>
  );
};
const Course = (props) => {
  console.log(props);
  console.log(props.course.parts);
  return (
    <div>
      <Header name={props.course.name} />
      <Content
        part1={props.course.parts[0].name}
        exercises1={props.course.parts[0].exercises}
        part2={props.course.parts[1].name}
        exercises2={props.course.parts[1].exercises}
        part3={props.course.parts[2].name}
        exercises3={props.course.parts[2].exercises}
        part4={props.course.parts[3].name}
        exercises4={props.course.parts[3].exercises}
      />
      <Total
        parts={props.course.parts}
      />
    </div>
  );
};
export default Course;
