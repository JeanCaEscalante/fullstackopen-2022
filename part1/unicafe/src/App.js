import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) =>{
  const {text, event} = props;

  return(<>
          <button onClick={event}>{text}</button>
         </>)
}

const Statistic = (props) => {
  return(<tr>
          <td><strong>{props.text}</strong></td> 
          <td>{props.cont}</td> 
        </tr>)
}

const Statistics = (props) => {
  
  const {good,neutral,bad} = props;

  
  if (good === 0 && neutral === 0 && bad===0) {
    return (
      <div>
        <h3>Statistics</h3>
        <p>no feedback given</p>
      </div>
    )
  }

  return(<>
          <h3>Statistics</h3>
          <table>
            <tbody>
              <Statistic text="good" cont={good} />
              <Statistic text="neutral" cont={neutral} />
              <Statistic text="bad" cont={bad} />
              <Statistic text="all" cont={good+neutral+bad} />
              <Statistic text="average" cont={(good-bad)/(good+neutral+bad)} />
              <Statistic text="positive" cont={good/(good+neutral+bad)*100 +"%"} /> 
            </tbody>
          </table>
        </>)
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

   const handleGood = () => {
        setGood(good + 1)
   }

    const handleNeutral = () => {
        setNeutral(neutral + 1)
    }

    const handleBad = () => {
      setBad(bad + 1)
    }
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" event={handleGood} />&nbsp;
      <Button text="neutral" event={handleNeutral} />&nbsp;
      <Button text="bad" event={handleBad} />
      
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

export default App;
