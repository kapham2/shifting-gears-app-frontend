import React from 'react'

class Game extends React.Component {

  constructor() {
    super()

    this.state = {
      time: 0,
      start: 0
    }
  }

  startTimer = (e) => {
    console.log("start")
    this.setState({
      time: 0,
      start: Date.now()
    })
    this.timer = setInterval(() => this.setState({ 
      time: Date.now() - this.state.start,
      distance: this.state.distance + this.state.velocity * 50 / 1000
    }), 50)
  }

  stopTimer = () => {
    console.log("stop")
    clearInterval(this.timer)
  }

  resetTimer = () => {
    console.log("reset")
    this.setState({ time: 0 })
  }

  onClickStart = (e) => {
    console.log(this.state.time)
    document.getElementById("start-btn").disabled = true
    this.startTimer()
  }

  componentWillUnmount () {
    this.stopTimer()
  }

  render() {
    if (this.state.time >= 3000) {
        this.stopTimer()
        document.getElementById("start-btn").disabled = false
    }

    return (
      <div>
        <h3>Game</h3>
        <p><button id="start-btn" onClick={this.onClickStart}>Start</button></p>
        <p>Time: {Math.round(this.state.time / 1000 * 100) / 100} s</p>
      </div>
    )
  }
}

export default Game