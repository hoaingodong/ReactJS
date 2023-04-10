import { useState } from "react";

const Statistics = (props) => {
  console.log(props);
  if (props.neutral === 0 && props.good === 0 && props.bad === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine
        text="all"
        value={props.bad + props.neutral + props.good}
      />
      <StatisticLine
        text="average"
        value={
          (props.bad * -1 + props.good * 1) /
          (props.good + props.neutral + props.bad)
        }
      />
      <StatisticLine
        text="positive"
        value={(props.good / (props.good + props.neutral + props.bad)) * 100}
      />
    </div>
  );
};

const StatisticLine = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        {props.text} {props.value}
      </p>
    </div>
  );
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <h1>Statitics </h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
