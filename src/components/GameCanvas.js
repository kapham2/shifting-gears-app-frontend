import React, { Component } from 'react';

export default class GameCanvas extends Component {
  componentDidMount() {
    this.width = 300
    this.height = 80
    
    this.offsetX = 25
    this.frame = 0

    const canvas = this.refs.elevationGraph
    canvas.width = 3000
    canvas.height = 800
    canvas.style.width = "300px"
    canvas.style.height = "80px"
    
    const context = canvas.getContext("2d")
    context.scale(10, 10)
    
    const img = new Image();

    this.timer = setInterval(() => this.drawElevationAndCyclist(context, img), 50)
  }

  drawElevationAndCyclist = (context, img) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)

    context.beginPath();
    context.lineTo(0, this.height);
    context.lineTo(0, this.height - this.props.elevation[0] * 10);
    this.props.elevation.forEach((elevation, index) => {
      return context.lineTo((index * this.props.distanceToIndexRatio * (this.width - 2 * this.offsetX) / 100) + this.offsetX, this.height - elevation * 10);
    })
    context.lineTo(((this.props.elevation.length - 1) * this.props.distanceToIndexRatio * (this.width - 2 * this.offsetX) / 100) + 2 * this.offsetX, this.height - this.props.elevation[this.props.elevation.length - 1] * 10);
    context.lineTo(((this.props.elevation.length - 1) * this.props.distanceToIndexRatio * (this.width - 2 * this.offsetX) / 100) + 2 * this.offsetX, this.height);
    context.fillStyle = "#566E7A"
    context.fill();

    img.src = `${process.env.PUBLIC_URL + "/cyclist-sprite-sheet.png"}`

    this.drawCyclist(context, img)
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
    //Drawing the image 
    
    context.translate(this.props.distance * (this.width - 2 * this.offsetX) / 100 + 25, 30 - this.props.elevationAndSlope.elevation * 10 + 50);
    context.rotate(-Math.atan(this.props.elevationAndSlope.slope * 10 / ((this.width - 2 * this.offsetX) / 100)))
    // context.drawImage(img,this.props.img === "/cyclist.png" ? 0 : this.updateFrame(),0,400,400,this.props.distance * (this.width - 2 * this.offsetX) / 100,30 - this.props.elevationAndSlope.elevation * 10,50,50);
    context.drawImage(img,this.props.img === "/cyclist.png" ? 0 : this.updateFrame(),0,400,400,-25,-50,50,50);

    context.rotate(Math.atan(this.props.elevationAndSlope.slope * 10 / ((this.width - 2 * this.offsetX) / 100)))
    context.translate(-(this.props.distance * (this.width - 2 * this.offsetX) / 100 + 25), -(30 - this.props.elevationAndSlope.elevation * 10 + 50));


  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render() {
    if (this.props.distance > 100) {
      clearInterval(this.timer)
    }

    return (
      <canvas ref="elevationGraph"/>
    )
  }
}