const Course = (props) => {
    return (
      <div>
        <Header name={props.course.name} />
        <Content parts={props.course.parts} />
      </div>
    )
  }

const Header = (props) => {
return (
    <h1>{props.name}</h1>
)
}

const Content = (props) => {
return (
    <div>
    {props.parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
    )}
    <Total parts={props.parts} />
    </div>
)
}

const Part = (props) => {
return (
    <p>{props.name} {props.exercises}</p>
)
}

const Total = (props) => {
return (
    <p><b>total of {props.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b></p>
)
}

export default Course