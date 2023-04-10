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
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const findMax = () => {
    let max = -1,
      maxKey = -1;

    for (let key in votes) {
      if (votes[key] > max) {
        maxKey = key;
        max = votes[key];
      }
    }
    console.log(maxKey)
    return maxKey;
  };

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(8).fill(0));

  return (
    <div>
      <h1>Anecdote of day</h1>

      {anecdotes[selected]}
      <br />
      <p>This anecdote has: {votes[selected]} votes</p>
      <Button handleClick={getRandomAnecdote} text="Random" />
      <Button handleClick={handleVotes} text="Vote" />
      <br />
      <h1>Anecdote with most Votes</h1>
      <p>{anecdotes[findMax()]}</p>
    </div>
  );
};

export default App;
