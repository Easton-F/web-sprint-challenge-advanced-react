import React, { useState } from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/result'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialX = 2
const initialY = 2

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [index, setIndex] = useState(initialIndex);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    return `Coordinates (${x}, ${y})`;
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return getXY();
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setMessage(initialMessage);
    setIndex(initialIndex);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setX(initialX);
    setY(initialY);

    console.log('email value:', email)
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (direction === 'left') {
      if (x <= 1){
        return setMessage("You can't go left");
      }
     setX(x - 1);
     setSteps(steps + 1);
     setMessage(initialMessage);
     setIndex(index - 1);
    }
    if (direction === 'right') {
      if (x >= 3){
        return setMessage("You can't go right");
      }
     setX(x + 1);
     setSteps(steps + 1);
     setMessage(initialMessage);
     setIndex(index + 1);
    }
    if (direction === 'up') {
      if (y <= 1){
        return setMessage("You can't go up");
      }
     setY(y - 1);
     setSteps(steps + 1);
     setMessage(initialMessage);
     setIndex(index - 3);
    }
    if (direction === 'down') {
      if (y >= 3){
        return setMessage("You can't go down");
      }
     setY(y + 1);
     setSteps(steps + 1);
     setMessage(initialMessage);
     setIndex(index + 3);
    }
    console.log(direction)
    console.log(index)
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    getNextIndex(evt.target.id)
    console.log(evt.target)
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    const { value } = evt.target
    setEmail(value);
    console.log(email);
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.\
    evt.preventDefault();
    axios.post(URL, { "x": x, "y": y, "steps": steps, "email": email})
      .then(res => {
        setEmail(initialEmail);
        setMessage(res.data.message)
      })
      .catch(err => {
        setMessage(err.response.data.message)
      })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">{`You moved ${steps} ${steps === 1 ? 'time' : 'times'}`}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={move} id="left">LEFT</button>
        <button onClick={move} id="up">UP</button>
        <button onClick={move} id="right">RIGHT</button>
        <button onClick={move} id="down">DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} id="email" type="email" placeholder="type email" value={email}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
