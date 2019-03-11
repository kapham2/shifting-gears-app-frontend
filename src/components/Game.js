import React from 'react'
// import Chart from './Chart'
import GameCanvas from './GameCanvas'

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

    this.gearRatio = []
    for (let i = 0; i < this.teethCog.length; i++) {
      this.gearRatio = this.gearRatio.concat([Math.round(32 / this.teethCog[i] * 10) / 10])
    }
    // console.log("Gear Ratio:", this.gearRatio)

    this.velocityMax = []
    for (let i = 0; i < this.gearRatio.length; i++) {
      this.velocityMax = this.velocityMax.concat([Math.round(this.gearRatio[i] * 2 * 3.14 * this.radiusTire / 1000 * 100) / 100])
    }
    // console.log("Max Velocity:", this.velocityMax)

    const elevations = [[1, 1], [2, 2], [3, 3]]
    let elevation = [1, 1, 1]
    for (let i = 0; i < 3; i++) {
      elevation = elevation.concat(elevations[Math.round(Math.random() * (2))])
    }
    this.elevation = elevation.concat([1, 1])

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

  startTimer = () => {
    // console.log("start")
    this.setState({
      start: Date.now(),
      distance: 0,
      velocity: 0,
      idxTeethCog: 0,
      grade: 0,
      img: "/cyclist.gif"
    })

    this.milliseconds = 1000 / 4
    this.timer = setInterval(() => this.setState({ 
      time: Date.now() - this.state.start,
      distance: this.getDistance(this.milliseconds),
      velocity: this.getVelocity(),
      grade: this.getElevationAndSlope().slope * 10
    }), this.milliseconds)
  }

  stopTimer = () => {
    // console.log("stop")

    this.createGame()

    clearInterval(this.timer)
    
    document.getElementById("shift-up-btn").disabled = true
    document.getElementById("shift-down-btn").disabled = true
  }
  
  createGame = () => {    
    let avgVelocity

    if (this.state.distance === 0 && this.state.time === 0) {
      avgVelocity = 0
    }
    else {
      avgVelocity = this.state.distance / (this.state.time / 1000)
    }
    // console.log("avgVelocity", avgVelocity)

    fetch('https://shifting-gears-app-backend.herokuapp.com/api/v1/games', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        game: {
          user_id: this.props.userId,
          distance: this.state.distance, //m
          time: this.state.time / 1000, //s
          avg_velocity: avgVelocity, //m/s
        }
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      else {
        throw response
      }
    })
    // .then(response => console.log(response))
    .catch(response => response.json().then(response => console.log(response)))
  }

  resetTimer = () => {
    // console.log("reset")
    this.setState({ time: 0 })
  }

  onClickStart = (e) => {
    if (this.state.time === 0) {
      document.getElementById("start-btn").disabled = true
      // document.getElementById("acceleration-p").classList.remove("hide-p")
      // document.getElementById("velocity-p").classList.remove("hide-p")
      this.startTimer()
    }
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  getVelocityMax = () => {
    return (this.state.teethChainring / this.teethCog[this.state.idxTeethCog]) * 2 * 3.14 * this.radiusTire / 1000
  }
  
  getAcceleration = () => {
    const forceForward = this.forcePedal * (this.lengthCrankArm * this.teethCog[this.state.idxTeethCog]) / (this.state.teethChainring * this.radiusTire)
  
    const forceResistGravity = -(this.massBikeAndRider * 9.81 * Math.sin(this.state.grade * 3.14 / 180))
    const forceResistRolling = -(this.Cr * this.massBikeAndRider * 9.81 * Math.cos(this.state.grade * 3.14 / 180))
    const forceResistDrag = -(0.5 * this.Cd * this.ARider * this.rho * this.state.velocity ** 2)
    const forceResist = forceResistGravity + forceResistRolling + forceResistDrag
  
    const forceNet = forceForward + forceResist

    return forceNet / this.massBikeAndRider
  }

  getVelocity = () => {
    const velocityMax = this.getVelocityMax()
    const acceleration = this.getAcceleration()

    if (this.state.grade >= 0) {
      if (this.state.velocity + acceleration <= 0 && acceleration < 0) {
        // console.log("end game; velocity < 0 && acceleration < 0")
        this.setState({ img: "/cyclist.png" })
        this.stopTimer()
        return 0
      }
      else if (this.state.velocity + acceleration <= 0) {
        // console.log("change to a lower gear")
        return 0        
      }
      else if (this.state.velocity + acceleration < this.state.velocity) {
        // console.log("change to a lower gear")
        return this.state.velocity + acceleration
      }
      else if (this.state.velocity + acceleration <= velocityMax) {
        // console.log("OK")
        return this.state.velocity + acceleration
      }
      else {
        // console.log("change to a higher gear")
        return velocityMax
      }
    }
    else {
      if (this.state.velocity + acceleration >= velocityMax){
        // console.log("change to a higher gear")
        return this.state.velocity + acceleration
      }
      else {
        // console.log("OK")
        return this.state.velocity + acceleration
      }
    }
  }

  getDistance = (milliseconds) => {
    const nextDistance = this.state.distance + this.state.velocity * milliseconds / 1000

    if (nextDistance >= 100) {
      // console.log("end game; distance > 100m")
      this.setState({ img: "/cyclist.png"})
      this.stopTimer()
    }

    return this.state.distance + this.state.velocity * milliseconds / 1000
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
    
    if (this.state.distance !== 0) {
      const distanceIntervals = this.elevation.length - 1
      
      const previousIndex = Math.floor(this.state.distance / distanceIntervals)
      const nextIndex = Math.ceil(this.state.distance / distanceIntervals)
      
      if (this.state.distance < 100) {
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
        const lastIndex = this.elevation.length - 1
        const nextLastIndex = lastIndex - 1

        const lastDistance = lastIndex * this.distanceToIndexRatio
        const nextLastDistance = nextLastIndex * this.distanceToIndexRatio

        const lastElevation = this.elevation[lastIndex]
        const nextLastElevation = this.elevation[nextLastIndex]

        const distDiff = lastDistance - nextLastDistance
        const elevDiff = lastElevation - nextLastElevation

        const lastSlope = elevDiff / distDiff

        return { elevation: lastElevation, slope: lastSlope }
      }
    }
    else {
      return { elevation: 1, slope: 0 }
    }
    
  }

  render() {
    // console.log("this.state", this.state)

    // const imgCyclistStyle = {
    //   left: -115 + this.state.distance * 2.35,
    //   top: 40 - this.getElevationAndSlope().elevation * 9.25,
    //   transform: `rotate(${-Math.atan(this.getElevationAndSlope().slope) * 9.25 / 2.35}rad)`,
    // }

    return (
      <div>
          {/* <img className="img-cyclist" src={process.env.PUBLIC_URL + this.state.img} style={imgCyclistStyle} alt="" /> */}
          {/* <Chart distance={this.state.distance} elevation={this.elevation} distanceToIndexRatio={this.distanceToIndexRatio} /> */}
          <GameCanvas elevationAndSlope={this.getElevationAndSlope()} distance={this.state.distance} elevation={this.elevation} distanceToIndexRatio={this.distanceToIndexRatio} img={this.state.img} velocityMax={this.velocityMax} velocity={this.state.velocity} idxTeethCog={this.state.idxTeethCog} />
          <p>
            <button className="btn shadow-sm btn-sm" id="start-btn" onClick={this.onClickStart}>Start</button>{" "}
            <button className="btn shadow-sm btn-sm shift-btn" id="shift-up-btn" onClick={this.onClickShiftUp}>Shift Up</button>{" "}
            <button className="btn shadow-sm btn-sm shift-btn" id="shift-down-btn" onClick={this.onClickShiftDown}>Shift Down</button>
          </p>
          {/* <p className="hide-p" id="acceleration-p">acc = {Math.round(this.getAcceleration() * 100) / 100} m/s<sup>2</sup></p> */}
          {/* <p className="hide-p" id="velocity-p">v<sub>i</sub> = {Math.round(this.state.velocity * 100) / 100} m/s (v<sub>max</sub> = {Math.round(this.getVelocityMax() * 100) / 100} m/s)</p> */}
      </div>
    )
  }
}

export default Game