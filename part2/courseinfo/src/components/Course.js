const Header = (props) => {
  // console.log(props);
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};
const Part = (props) => {
  // console.log(props);
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  );
};
const Content = (props) => {
  // console.log(props);
  return (
    <div>
      <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
      <Part part={props.part4} exercises={props.exercises4} />
    </div>
  );
};
const Total = (parts) => {
  const total = parts.reduce((s, p) => 5);
  return (
    <div>
      <p>{total}</p>
    </div>
  );
};
const Course = (props) => {
  // console.log(props);
  console.log(props.course.parts);
  return (
    <div>
      <Header course={props.course.name} />
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
        // exercises1={props.course.parts[0].exercises}
        // exercises2={props.course.parts[1].exercises}
        // exercises3={props.course.parts[2].exercises}
        // exercises4={props.course.parts[3].exercises}
        parts={props.coures.parts}
      />
    </div>
  );
};
export default Course;
