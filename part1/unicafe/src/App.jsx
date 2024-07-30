import { useState } from 'react'
import './App.css'

function App() {

  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 })

  const incrementGood = () => {
    setFeedback({...feedback, good: feedback.good + 1});
  }

  const incrementNeutral = () => {
    setFeedback({...feedback, neutral: feedback.neutral + 1});
  }

  const incrementBad = () => {
    setFeedback({...feedback, bad: feedback.bad + 1});
  }

  return (
    <>
      <div>
        <Header heading="give feedback" />
        <Button handleClick={incrementGood} name="good" />
        <Button handleClick={incrementNeutral} name="neutral" />
        <Button handleClick={incrementBad} name="bad" />
        <Header heading="statistics" />
        <Statistics feedback={feedback} />
      </div>
    </>
  )
}

const Header = (props) => {
  return(
    <h1>{props.heading}</h1>
  )
}

const Button = (props) => {
  return(
  <button onClick={props.handleClick}>{props.name}</button>
)
}

const StatisticLine  = (props) => {
  return(
    <tr>
      <td>{props.name}</td> 
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  
  const {feedback} = props;

  const calculateSum = () => {
    return feedback.good + feedback.neutral + feedback.bad;
  }

  const calculateAverage = () => {
    return (feedback.good * 1 + feedback.bad * -1) / calculateSum();
  }

  const calculatePositive = () => {
    return (feedback.good / calculateSum()) * 100;
  }

  if(calculateSum() > 0) {
    return(
      <div>
        <table>
          <tbody>
            <StatisticLine  name="good" value={feedback.good} />
            <StatisticLine  name="neutral" value={feedback.neutral} />
            <StatisticLine  name="bad" value={feedback.bad} />
            <StatisticLine  name="all" value={calculateSum()} />
            <StatisticLine  name="average" value={calculateAverage()} />
            <StatisticLine  name="positive" value={calculatePositive() + "%"} />
          </tbody>
        </table>
      </div>
    )
  }
  return(
    <div>No feedback given</div>
  )
}

export default App
