import React, { Component } from 'react';

export default class GameCanvas extends Component {
  componentDidMount() {
    this.width = 300
    this.height = 100
    this.imgWidth = 50
    this.contextScale = 10
    this.elevationScale = 10
    this.frame = 0

    this.indexLast = this.props.elevation.length - 1
    this.distanceTotal = this.indexLast * this.props.distanceToIndexRatio
    this.distanceScale = (this.width - this.imgWidth) / this.distanceTotal

    const canvas = this.refs.gameCanvas
    canvas.width = this.width * this.contextScale
    canvas.height = (this.height + 100) * this.contextScale
    canvas.style.width = `${this.width}px`
    canvas.style.height = `${this.height + 100}px`
    
    const context = canvas.getContext("2d")
    context.scale(this.contextScale, this.contextScale)
    
    const img = new Image()
    img.src = `${process.env.PUBLIC_URL + "/cyclist-sprite-sheet.png"}`
    this.spriteWidth = 400

    this.timer = setInterval(() => this.drawGame(context, img), 50)
  }

  drawGame = (context, img) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    context.translate(0, this.height)

    this.drawElevation(context)
    
    this.drawCyclist(context, img)
    
    this.drawTick(context)

    this.drawVelocityScale(context)
    
    context.translate(0, -this.height)
  }
  
  drawElevation = (context) => {
    const yElevationFirst = -this.props.elevation[0] * this.elevationScale
    const yElevationLast = -this.props.elevation[this.indexLast] * this.elevationScale
    
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, yElevationFirst);

    this.props.elevation.forEach((elevation, index) => {
      const xDistance = index * this.props.distanceToIndexRatio * this.distanceScale + this.imgWidth / 2
      const yElevation = -elevation * this.elevationScale
      return context.lineTo(xDistance, yElevation);
    })

    context.lineTo(this.width, yElevationLast);
    context.lineTo(this.width, 0);
    context.fillStyle = "#566E7A"
    context.fill();
  }

  drawVelocityScale = (context) => {
    context.font = "bold 18px Helvetica Neue";
    context.textAlign = "left"
    context.fillStyle = "#FFFFFF"
    context.fillText(`Score: ${this.props.time === 0 ? 0 : Math.round(this.props.distance / (this.props.time / 1000) * 100) / 100}`, this.width / 2, -85)

    context.beginPath()
    context.moveTo(0, 60)
    context.lineTo(this.width, 60)
    context.strokeStyle = "#192D4BF2";
    context.lineWidth = 3;
    context.stroke()

    context.textAlign = "center"
    context.fillText("Max Velocity in Current Gear", this.width / 2, 40)

    for (let i = 0; i < this.props.velocityMax.length; i++) {
      context.beginPath()
      context.moveTo(this.props.velocityMax[i] * 25, 70)
      context.lineTo(this.props.velocityMax[i] * 25, 50)
      context.strokeStyle = i === this.props.idxTeethCog ? "#FFFFFF" : "#192D4BF2";
      context.lineWidth = 3;
      context.stroke()
    }

    context.beginPath()
    context.moveTo(this.props.velocity * 25, 70)
    context.lineTo(this.props.velocity * 25, 50)
    context.strokeStyle = "#D20155";
    context.lineWidth = 3;
    context.stroke()
    context.fillStyle = "#D20155"
    context.fillText(`Current Velocity: ${Math.round(this.props.velocity * 100) / 100}`, this.width / 2, 90)
  }

  drawTick = (context) => {
    context.beginPath()
    const xStart = this.props.distance * this.distanceScale + this.imgWidth / 2
    context.moveTo(xStart, 0)
    context.lineTo(xStart, -Math.max(...this.props.elevation) * this.elevationScale)
    context.strokeStyle = "#D20155";
    context.lineWidth = 2;
    context.stroke()

  }

  updateFrame = () =>{
    //Updating the frame index 
    if (this.frame + 1 > 19) {
      this.frame = 0
    }
    else {
      this.frame = (this.frame + 1); 
    }
    
    //Calculating the x coordinate for spritesheet 
    return this.frame * 400; 
  }

  drawCyclist = (context, img) => {
    // translate canvas origin to point of rotation
    const xTranslate = this.props.distance * this.distanceScale + this.imgWidth / 2
    const yTranslate = -(this.props.elevationAndSlope.elevation * this.elevationScale)
    context.translate(xTranslate, yTranslate);

    const angle = -Math.atan(this.props.elevationAndSlope.slope * this.elevationScale / this.distanceScale)
    context.rotate(angle)

    const xSrc = this.props.img === "/cyclist.png" ? 0 : this.updateFrame()

    // position top left point of image so that bottom middle of the image is at origin
    const x = -this.imgWidth / 2
    const y = -this.imgWidth
    context.drawImage(img, xSrc, 0, this.spriteWidth, this.spriteWidth, x, y, this.imgWidth, this.imgWidth);
    
    context.rotate(-angle)
    context.translate(-xTranslate, -yTranslate);
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render() {
    if (this.props.distance > 100) {
      clearInterval(this.timer)
    }

    return (
      <canvas ref="gameCanvas"/>
    )
  }
}