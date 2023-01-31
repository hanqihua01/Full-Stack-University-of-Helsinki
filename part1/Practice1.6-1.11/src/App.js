import { useState } from 'react'

const Header = ({ header }) => <h1>{header}</h1>

const Button = ({ text, handler }) => <button onClick={handler}>{text}</button>

const StatisticLine = ({ text, value, textAppend }) =>
  <tr>
    <td>{text}</td>
    <td>{value} {textAppend}</td>
  </tr>

const Statistics = ({ goodNum, neutralNum, badNum }) => {
  if (goodNum === 0 && neutralNum === 0 && badNum === 0) {
    return <p>No feedback given</p>
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={goodNum} />
        <StatisticLine text='neutral' value={neutralNum} />
        <StatisticLine text='bad' value={badNum} />
        <StatisticLine text='all' value={goodNum + neutralNum + badNum} />
        <StatisticLine text='average' value={(goodNum - badNum) / (goodNum + neutralNum + badNum)} />
        <StatisticLine text='positive' value={goodNum / (goodNum + neutralNum + badNum) * 100} textAppend='%' />
      </tbody>
    </table >
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleButton = (kind) => {
    if (kind === 'good') {
      setGood(good + 1)
    } else if (kind === 'neutral') {
      setNeutral(neutral + 1)
    } else if (kind === 'bad') {
      setBad(bad + 1)
    }
  }

  return (
    <div>
      <Header header={'give feedback'} />
      <Button text='good' handler={() => handleButton('good')} />
      <Button text='neutral' handler={() => handleButton('neutral')} />
      <Button text='bad' handler={() => handleButton('bad')} />
      <Header header={'statistics'} />
      <Statistics goodNum={good} neutralNum={neutral} badNum={bad} />
    </div>
  )
}

export default App