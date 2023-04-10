import React from 'react';

const Header = (props) => {
  console.log(props);
	return (
		<div>
			<h1>{props.course}</h1>
		</div>
	)
};

const Content = (props) => {
  console.log(props);
	const lists = props.parts.map(function(item) {
		return (
			<div>
				<p> {item.name} - {item.exercises}</p>
			</div>
		)
	})
	
	return lists
};

const Total = (props) => {
  console.log(props);
	var total = 0
	
	props.parts.map(function(item) {	
		total = total + item.exercises 
	})
	
  
	return (
		<div>
			<p>Number of exercises: {total} </p>
		</div>
	)
};

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10
			},
			{
				name: 'Using props to pass data',
				exercises: 7
			},
			{
				name: 'State of a component',
				exercises: 14
			}
		]
	}

	return (
		<div>
			<h1>{course.name}</h1>
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
};



export default App;
