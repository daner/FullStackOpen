import { useState } from 'react'
import './App.css'

function App() {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0])

  const nextAnecdote = () => {
    const newIndex = (selected + 1) % anecdotes.length
    setSelected(newIndex)
  }

  const vote = () => {
    var copy = [...points];
    copy[selected] += 1;
    setPoints(copy)
  }

  const calculateMostVotes = (array) => {
    var max = 0;
    var index = 0;

    array.forEach((x, i) => {
      if (x > max) {
        max = x;
        index = i;
      }
    });

    return index;
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <DisplayAnecdote anecdotes={anecdotes} points={points} selected={selected} />
      <button onClick={vote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h1>Anecdote with the most votes</h1>
      <DisplayAnecdote anecdotes={anecdotes} points={points} selected={calculateMostVotes(points)} />
    </div>
  )
}

const DisplayAnecdote = (props) => {
  const {anecdotes, points, selected} = props

  return(
    <p>
      <span>{anecdotes[selected]} </span><br/>
      <span>has {points[selected]} votes</span>
    </p>
  )
}


export default App
