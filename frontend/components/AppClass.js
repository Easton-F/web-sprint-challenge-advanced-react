import React from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialX = 2
const initialY = 2

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
  x: initialX,
  y: initialY,
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    return `Coordinates (${this.x}, ${this.y})`;
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return this.getXY();
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState(initialState);
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (direction === 'left') {
      if (this.x <= 1){
        return setMessage("You can't go left");
      }
     this.setState({...this.state, x: x - 1, message: initialMessage, steps: steps + 1, index: index - 1});
    }
    if (direction === 'right') {
      if (this.x >= 3){
        return setMessage("You can't go right");
      }
      this.setState({...this.state, x: x + 1, message: initialMessage, steps: steps + 1, index: index + 1});
    }
    if (direction === 'up') {
      if (this.y <= 1){
        return setMessage("You can't go up");
      }
      this.setState({...this.state, y: y - 3, message: initialMessage, steps: steps + 1, index: index - 3});
    }
    if (direction === 'down') {
      if (this.y >= 3){
        return setMessage("You can't go down");
      }
      this.setState({...this.state, y: y + 3, message: initialMessage, steps: steps + 1, index: index + 3});
    }
    console.log(direction)
    console.log(index)
  }
  

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    this.getNextIndex(evt.target.id)
    console.log(evt.target)
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {this.steps} times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.index ? ' active' : ''}`}>
                {idx === this.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button onClick={this.move} id="left">LEFT</button>
          <button onClick={this.move} id="up">UP</button>
          <button onClick={this.move} id="right">RIGHT</button>
          <button onClick={this.move} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
