import React from 'react'
import CanvasJSReact from './canvasjs.react'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class Chart extends React.Component {	
  render() {
    const options = {
      backgroundColor: "transparent",
      colorSet: "colorSet",
      width: 300,
      height: 100,
      interactivityEnabled: false,
      animationEnabled: true,
      title: { 
          text: "Elevation",
          fontColor: "#FFFFFF",
          fontFamily: "calibri",
          fontSize: 12
      },
      axisX: { 
        title: "Distance (m)",
        titleFontColor: "#FFFFFF",
        labelFontColor: "#FFFFFF",
        tickColor: "transparent"
      },
      axisY: {
        lineColor: "transparent",
        labelFontColor: "transparent",
        tickColor: "transparent",
        gridColor: "transparent",
        includeZero: true,
        viewportMaximum: 2
      },
      toolTip: { shared: true },
      data: [{
        markerType: "none",
        type: "splineArea",
        fillOpacity: 1,
        dataPoints: [
          { x: 0, y: this.props.elevation[0] },
          { x: 10, y: this.props.elevation[1] },
          { x: 20, y: this.props.elevation[2] },
          { x: 30, y: this.props.elevation[3] },
          { x: 40, y: this.props.elevation[4] },
          { x: 50, y: this.props.elevation[5] },
          { x: 60, y: this.props.elevation[6] },
          { x: 70, y: this.props.elevation[7] },
          { x: 80, y: this.props.elevation[8] },
          { x: 90, y: this.props.elevation[9] },
          { x: 100, y: this.props.elevation[10] }
        ]
      },
      {
        markerType: "none",
        type: "line",
        name: "Current Position",
        dataPoints: [
          { x: this.props.distance, y: 0 },
          { x: this.props.distance, y: 1 },
          { x: this.props.distance, y: 2 }
        ]
      }]
    }

    CanvasJS.addColorSet("colorSet", ["#566e7a", "#D20155"]);
		
    return (
      <div>
        <CanvasJSChart options = {options} 
            /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
 
export default Chart