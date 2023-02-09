const Course = ({ course }) =>
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
  </>

const Header = ({ name }) =>
  <h2>{name}</h2>

const Content = ({ parts }) => {
  const sum = parts.reduce((acc, cur) => {
    return acc + cur.exercises
  }, 0)
  return (
    <>
      <ul>
        {parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </ul>
      <Sum sum={sum} />
    </>
  )
}

const Part = ({ name, exercises }) =>
  <li>{name} {exercises}</li>

const Sum = ({ sum }) =>
  <p>total of {sum} exercises</p>

export default Course