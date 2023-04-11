import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  if (neutral === 0 && good === 0 && bad === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={bad + neutral + good} />
      <StatisticLine
        text="average"
        value={(bad * -1 + good * 1) / (good + neutral + bad)}
      />
      <StatisticLine
        text="positive"
        value={(good / (good + neutral + bad)) * 100}
      />
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      <p>
        {text} {value}
      </p>
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
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
