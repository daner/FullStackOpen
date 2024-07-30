const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 }
    ],
    calculateTotal: function() {
      let sum = 0;
      this.parts.forEach(x => sum += x.exercises);
      return sum;
    }
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total course={course} />
    </div>
  )
}

const Header = (props) => {
  return (
      <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
        <Part part={props.parts[0]} />     
        <Part part={props.parts[1]} />
        <Part part={props.parts[2]} />
    </div>
  )
}

const Part = (props) => {
  return(
    <p>
        {props.part.name} {props.part.exercises}
    </p>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.course.calculateTotal()}</p>
  )
}

export default App