import React from 'react'
import Chart from './Chart'

class Game extends React.Component {

  constructor() {
    super()

    this.cadence = 1 // s (60RPM)
    this.forcePedal = 125 // N
    this.lengthCrankArm = 165 //mm
    this.radiusTire = 700 / 2 //mm
    this.massBikeAndRider = 160 //kg
    this.Cr = 0.004 // (coefficient of rolling friction)
    this.Cd = 1 // (coefficient of drag)
    this.ARider = 0.4 //m2 (frontal area of rider)
    this.rho = 1.225 //kg/m3 (air density)
    this.teethCog = [32, 28, 25, 22, 20, 18, 16, 14, 13, 12, 11, 9.4, 8.6, 8, 7.3]

    const elevations = [[1, 1], [2, 2], [3, 3]]
    let elevation = [1, 1]
    for (let i = 0; i < 4; i++) {
      elevation = elevation.concat(elevations[Math.round(Math.random() * (2))])
    }
    this.elevation = elevation.concat([1])

    this.distanceToIndexRatio = 10


    this.state = {
      time: 0,
      start: Date.now(),
      distance: 0, //m
      velocity: 0, //m/s
      teethChainring: 32,
      idxTeethCog: 0,
      grade: 0, //deg
      img: "/cyclist.png"
    }
  }

  startTimer = (e) => {
    console.log("start")
    this.setState({
      start: Date.now(),
      img: "/cyclist.gif"
    })

    const milliseconds = 1000 / 4
    this.timer = setInterval(() => this.setState({ 
      time: Date.now() - this.state.start,
      distance: this.state.distance + this.state.velocity * milliseconds / 1000,
      velocity: this.getVelocity(),
      grade: this.getElevationAndSlope().slope * 20
    }), milliseconds)
  }

  stopTimer = () => {
    console.log("stop")

    console.log("", Math.round(this.state.distance * 100) / 100, "m @ " + Math.round((this.state.time / 1000) * 100) / 100, "s")
    console.log("", Math.round(this.state.distance / (this.state.time / 1000) * 100) / 100, "m/s")

    clearInterval(this.timer)

    this.props.updateActive("Stats")
    document.getElementsByClassName("nav-link active")[0].classList.remove("active")
    document.getElementsByClassName("nav-link")[1].classList.add("active")
  }

  resetTimer = () => {
    console.log("reset")
    this.setState({ time: 0 })
  }

  onClickStart = (e) => {
    if (this.state.time === 0) {
      document.getElementById("acceleration-p").classList.remove("hide-p")
      document.getElementById("velocity-p").classList.remove("hide-p")
      this.startTimer()
    }
  }

  componentWillUnmount () {
    this.stopTimer()
  }

  getVelocityMax = () => {
    return (this.state.teethChainring / this.teethCog[this.state.idxTeethCog]) * 2 * 3.14 * this.radiusTire / 1000
  }
  
  getAcceleration = () => {
    const forceForward = this.forcePedal * (this.lengthCrankArm * this.teethCog[this.state.idxTeethCog]) / (this.teethCog[this.state.idxTeethCog] * this.radiusTire)
  
    const forceResistGravity = -(this.massBikeAndRider * 9.81 * Math.sin(this.state.grade * 3.14 / 180))
    const forceResistRolling = -(this.Cr * this.massBikeAndRider * 9.81 * Math.cos(this.state.grade * 3.14 / 180))
    const forceResistDrag = -(0.5 * this.Cd * this.ARider * this.rho * this.state.velocity ** 2)
    const forceResist = forceResistGravity + forceResistRolling + forceResistDrag
  
    const forceNet = forceForward + forceResist

    return forceNet / this.massBikeAndRider
  }

  getVelocity = () => {
    // console.log("velocityMax:", this.getVelocityMax())
    // console.log("acceleration:", this.getAcceleration())
    // console.log("velocity:", this.state.velocity)

    const velocityMax = this.getVelocityMax()
    const acceleration = this.getAcceleration()

    if (this.state.grade >= 0) {
      if (this.state.velocity + acceleration <= 0 && acceleration < 0) {
        console.log("end game")
        this.stopTimer()
        return 0
      }
      else if (this.state.velocity + acceleration <= 0) {
        console.log("change to a lower gear")
        return 0        
      }
      else if (this.state.velocity + acceleration < this.state.velocity) {
        console.log("change to a lower gear")
        return this.state.velocity + acceleration
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

  onClickShiftUp = () => {
    if (this.state.time > 0) {
      
      if (this.state.idxTeethCog + 1 < this.teethCog.length) {
        // console.log("shift up")
        this.setState({
          idxTeethCog: this.state.idxTeethCog + 1
        })
      }

    }
  }

  onClickShiftDown = () => {
    if (this.state.time > 0) {
      
      if (this.state.idxTeethCog - 1 >= 0) {
        // console.log("shift down")
        this.setState({
          idxTeethCog: this.state.idxTeethCog - 1
        })
      }

    }
  }

  getElevationAndSlope = () => {
    
    if (this.state.distance !== 0 && this.state.distance < 100) {
      const distanceIntervals = this.elevation.length - 1
      
      const previousIndex = Math.floor(this.state.distance / distanceIntervals)
      const nextIndex = Math.ceil(this.state.distance / distanceIntervals)

      const previousDistance = previousIndex * this.distanceToIndexRatio
      const nextDistance = nextIndex * this.distanceToIndexRatio
      
      const previousElevation = this.elevation[previousIndex]
      const nextElevation = this.elevation[nextIndex]
  
      const distanceDiff = nextDistance - previousDistance
      const elevationDiff = nextElevation - previousElevation
      const slope = elevationDiff / distanceDiff
        
      const elevation = slope * (this.state.distance - previousDistance) + previousElevation

      return { elevation: elevation, slope: slope }
    }
    else {
      return { elevation: 1, slope: 0 }
    }
    
  }

  render() {
    if (this.state.distance >= 100) {
        this.stopTimer()
    }

    const imgCyclistStyle = {
      left: -115 + this.state.distance * 2.35,
      top: 40 - this.getElevationAndSlope().elevation * 9.25,
      transform: `rotate(${-Math.atan(this.getElevationAndSlope().slope) * 9.25 / 2.35}rad)`,
    }

    return (
      <div>
          <img className="img-cyclist" src={this.state.img} style={imgCyclistStyle} alt="" />
          <Chart distance={this.state.distance} elevation={this.elevation} distanceToIndexRatio={this.distanceToIndexRatio} />
          <p>
            <button className="btn shadow-sm btn-sm" id="start-btn" onClick={this.onClickStart}>Start</button>{" "}
            <button className="btn shadow-sm btn-sm" id="shift-up-btn" onClick={this.onClickShiftUp}>Shift Up</button>{" "}
            <button className="btn shadow-sm btn-sm" id="shift-down-btn" onClick={this.onClickShiftDown}>Shift Down</button>
          </p>
          <p className="hide-p" id="acceleration-p">acc = {Math.round(this.getAcceleration() * 100) / 100} m/s<sup>2</sup></p>
          <p className="hide-p" id="velocity-p">v<sub>i</sub> = {Math.round(this.state.velocity * 100) / 100} m/s (v<sub>max</sub> = {Math.round(this.getVelocityMax() * 100) / 100} m/s)</p>
      </div>
    )
  }
}

export default Game