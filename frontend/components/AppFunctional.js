import React, { useState } from 'react'

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

  //function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  //}

  function reset() {
    // Use this helper to reset all states to their initial values.
    setMessage(initialMessage);
    setIndex(initialIndex);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setX(initialX);
    setY(initialY);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (direction === 'left') {
      if (x <= 1){
        return setMessage("Can't go Left");
      }
     setX(x - 1);
     setSteps(steps + 1);
     setMessage(initialMessage);
    }
    if (direction === 'right') {
      if (x >= 3){
        return setMessage("Can't go Right");
      }
     setX(x + 1);
     setSteps(steps + 1);
     setMessage(initialMessage);
    }
    if (direction === 'up') {
      if (y <= 1){
        return setMessage("Can't go Up");
      }
     setY(y - 1);
     setSteps(steps + 1);
     setMessage(initialMessage);
    }
    if (direction === 'down') {
      if (y >= 3){
        return setMessage("Can't go Down");
      }
     setY(y + 1);
     setSteps(steps + 1);
     setMessage(initialMessage);
    }
    console.log(direction)
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    getNextIndex(evt.target.id)
      
    
  
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXY()}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
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
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
