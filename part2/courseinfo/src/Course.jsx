const Course = ({course}) => {
    return(
        <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total course={course} />
        </div>
    )
}
  
const Header = (props) => {
    return (
        <h2>{props.course}</h2>
    )
}
  
const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}
  
const Part = ({part}) => {
    return(
        <p>
            {part.name} {part.exercises}
        </p>
    )
}
  
const Total = (props) => {

    const total = props.course.parts.reduce((sum, part) => sum + part.exercises , 0)

    return(
        <p><b> total of {total} excersises </b></p>
    )
}

export default Course