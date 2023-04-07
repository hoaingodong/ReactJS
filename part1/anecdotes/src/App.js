// import { useState } from "react";

// const Statistics = (props) => {
//   console.log(props);
//   if (props.neutral === 0 && props.good === 0 && props.bad === 0) {
//     return <div>No feedback given</div>;
//   }
//   return (
//     <div>
//       <StatisticLine text="good" value={props.good} />
//       <StatisticLine text="neutral" value={props.neutral} />
//       <StatisticLine text="bad" value={props.bad} />
//       <StatisticLine
//         text="all"
//         value={props.bad + props.neutral + props.good}
//       />
//       <StatisticLine
//         text="average"
//         value={(props.bad * -1 + props.good * 1) / 3}
//       />
//       <StatisticLine text="positive" value={props.good / 3} />
//     </div>
//   );
// };

// const StatisticLine = (props) => {
//   console.log(props);
//   return (
//     <div>
//       <p>
//         {props.text} {props.value}
//       </p>
//     </div>
//   );
// };

// const Button = (props) => (
//   <button onClick={props.handleClick}>{props.text}</button>
// );

// const App = () => {
//   const [good, setGood] = useState(0);
//   const [neutral, setNeutral] = useState(0);
//   const [bad, setBad] = useState(0);

//   return (
//     <div>
//       <h1>Give feedback</h1>
//       <Button handleClick={() => setGood(good + 1)} text="Good" />
//       <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
//       <Button handleClick={() => setBad(bad + 1)} text="Bad" />
//       <h1>Statitics </h1>
//       <Statistics good={good} neutral={neutral} bad={bad} />
//     </div>
//   );
// };

// export default App;

// import { useState } from "react";
// const Button = (props) => (
//   <button onClick={props.handleClick}>{props.text}</button>
// );
// const App = () => {
//   const anecdotes = [
//     "If it hurts, do it more often.",
//     "Adding manpower to a late software project makes it later!",
//     "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//     "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//     "Premature optimization is the root of all evil.",
//     "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
//     "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
//     "The only way to go fast, is to go well.",
//   ];

//   const [selected, setSelected] = useState(0);
//   const [votes, setVotes] = useState(new Array(8).fill(0));
//   // console.log(votes);
//   return (
//     <div>
//       <p>{anecdotes[selected]}</p>
//       <p>has {votes[selected]} votes</p>
//       <Button
//         handleClick={() => setSelected(selected + 1)}
//         text="nextanecdote"
//       />
//       <Button
//         handleClick={() => {
//           console.log(votes[selected]);
//           setVotes(votes[selected] + 1);
//         }}
//         text="vote"
//       />
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const handleVotes = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  const getRandomAnecdote = () => {
    let randomVal = Math.floor(Math.random(selected) * anecdotes.length);
    setSelected(randomVal);
    console.log(randomVal);
  };

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(8).fill(0));

  return (
    <div>
      {anecdotes[selected]}
      <br />
      <p>This anecdote has: {votes[selected]} votes</p>
      <Button handleClick={getRandomAnecdote} text="Random" />
      <Button handleClick={handleVotes} text="Vote" />
    </div>
  );
};

export default App;
