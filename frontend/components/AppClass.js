import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/result'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialX = 2
const initialY = 2


export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor() {
    super();
    this.state = {
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
      x: initialX,
      y: initialY,
    }
  }

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    return `Coordinates (${this.state.x}, ${this.state.y})`;
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return this.getXY();
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({ ...this.state, message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
      x: initialX,
      y: initialY });
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (direction === 'left') {
      if (this.state.x <= 1){
        this.setState({ message: "You can't go left" });
         return message;
      }
     this.setState({...this.state, x: this.state.x - 1, message: initialMessage, steps: this.state.steps + 1, index: this.state.index - 1});
    }
    if (direction === 'right') {
      if (this.state.x >= 3){
        this.setState({ message: "You can't go right" });
        return message;
      }
      this.setState({...this.state, x: this.state.x + 1, message: initialMessage, steps: this.state.steps + 1, index: this.state.index + 1});
    }
    if (direction === 'up') {
      if (this.state.y <= 1){
         this.setState({ message: "You can't go up" });
         return message;
      }
      this.setState({...this.state, y: this.state.y - 1, message: initialMessage, steps: this.state.steps + 1, index: this.state.index - 3});
    }
    if (direction === 'down') {
      if (this.state.y >= 3){
        this.setState({ message: "You can't go down" });
         return message;
      }
      this.setState({...this.state, y: this.state.y + 1, message: initialMessage, steps: this.state.steps + 1, index: this.state.index + 3});
    }
    console.log(direction)
    console.log(this.state.index)
  }
  

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    this.getNextIndex(evt.target.id)
    console.log(evt.target)
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    const { value } = evt.target;
    this.setState({ email: value })
    console.log(this.state.email);
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    axios.post(URL, { "x": this.state.x, "y": this.state.y, "steps": this.state.steps, "email": this.state.email})
      .then(res => {
        this.setState({ message: res.data.message, email: initialEmail })
      })
      .catch(err => {
        this.setState({ message: err.response.data.message })
      })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">{`You moved ${this.state.steps} ${this.state.steps === 1 ? 'time' : 'times'}`}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.move} id="left">LEFT</button>
          <button onClick={this.move} id="up">UP</button>
          <button onClick={this.move} id="right">RIGHT</button>
          <button onClick={this.move} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} id="email" type="email" placeholder="type email" value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
