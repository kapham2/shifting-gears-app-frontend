import React from 'react'

class Game extends React.Component {

  constructor() {
    super()

    this.cadence = 1 // s (60RPM)
    this.forcePedal = 125 // N
    this.lengthCrankArm = 165 //mm
    this.radiusTire = 700 / 2 //mm
    this.massBikeAndRider = 60 //kg
    this.Cr = 0.004 // (coefficient of rolling friction)
    this.Cd = 1 // (coefficient of drag)
    this.ARider = 0.4 //m2 (frontal area of rider)
    this.rho = 1.225 //kg/m3 (air density)

    this.state = {
      time: 0,
      start: Date.now(),
      distance: 0, //m
      velocity: 0.94, //m/s
      teethChainring: 32,
      teethCog: 32,
      grade: 1 //deg
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
      distance: this.state.distance + this.state.velocity * 1000 / 1000,
      velocity: this.updateVelocity()
    }), 1000)
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
    document.getElementById("start-btn").disabled = true
    this.startTimer()
  }

  componentWillUnmount () {
    this.stopTimer()
  }

  getVelocityMax = () => {
    return (this.state.teethChainring / this.state.teethCog) * 2 * 3.14 * this.radiusTire / 1000
  }
  
  getAcceleration = () => {
    const forceForward = this.forcePedal * (this.lengthCrankArm * this.state.teethCog) / (this.state.teethCog * this.radiusTire)
  
    const forceResistGravity = -(this.massBikeAndRider * 9.81 * Math.sin(this.state.grade * 3.14 / 180))
    const forceResistRolling = -(this.Cr * this.massBikeAndRider * 9.81 * Math.cos(this.state.grade * 3.14 / 180))
    const forceResistDrag = -(0.5 * this.Cd * this.ARider * this.rho * this.state.velocity ** 2)
    const forceResist = forceResistGravity + forceResistRolling + forceResistDrag
  
    const forceNet = forceForward + forceResist

    return forceNet / this.massBikeAndRider
  }

  updateVelocity = () => {
    // console.log("velocityMax:", this.getVelocityMax())
    // console.log("acceleration:", this.getAcceleration())
    // console.log("velocity:", this.state.velocity)
    
    const velocityMax = this.getVelocityMax()
    const acceleration = this.getAcceleration()

    if (this.state.grade >= 0) {
      if (this.state.velocity + acceleration <= 0) {
        console.log("change to a lower gear")
        return 0
      }
      else if (this.state.velocity + acceleration <= velocityMax) {
        console.log("OK")
        return this.state.velocity + acceleration
      }
      else {
        console.log("change to a higher gear")
        return velocityMax
      }
    }
    else {
      if (this.state.velocity + acceleration >= velocityMax){
        console.log("change to a higher gear")
        return this.state.velocity + acceleration
      }
      else {
        console.log("OK")
        return this.state.velocity + acceleration
      }
    }
  }

  render() {
    if (this.state.time >= 6000) {
        this.stopTimer()
        document.getElementById("start-btn").disabled = false
    }

    return (
      <div>
        <h3>Game</h3>
        <p><button id="start-btn" onClick={this.onClickStart}>Start</button></p>
        <p>Time: {Math.round(this.state.time / 1000 * 100) / 100} s</p>
        <p>Dist: {Math.round(this.state.distance * 100) / 100} m</p>
        <p>Velocity Max: {Math.round(this.getVelocityMax() * 100) / 100} m/s</p>
        <p>Acceleration: {Math.round(this.getAcceleration() * 100) / 100} m/s2</p>
        <p>Velocity: {Math.round(this.state.velocity * 100) / 100} m/s</p>
      </div>
    )
  }
}

export default Game