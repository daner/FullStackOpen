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

const Display = (props) => {
  return(
    <p>{props.name} {props.value}</p>
  )
}

const Statistics = (props) => {
  const {feedback} = props;

  const calculateSum = () => {
    return feedback.good + feedback.neutral + feedback.bad;
  }

  const calculateAverage = () => {

  }

  const calculatePositive = () => {

  }

  return(
    <>
      <Header heading="statistics" />
      <Display name="good" value={feedback.good} />
      <Display name="neutral" value={feedback.neutral} />
      <Display name="bad" value={feedback.bad} />
      <Display name="all" value={calculateSum()} />
    </>
  )
}

export default App
