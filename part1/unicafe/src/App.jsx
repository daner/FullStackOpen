import { useState } from 'react'
import './App.css'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <div>
        <Header heading="give feedback" />
        <button>good</button>
        <button>neutral</button>
        <button>bad</button>
        <h1>statistics</h1>
        <div>
          <p>good 6</p>
          <p>good 2</p>
          <p>good 1</p>
        </div>
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
  return <button onClick={props.handleClick}>{props.name}</button>
}

const Stats = (props) => {
  
}

export default App
