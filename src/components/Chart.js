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
      height: 75,
      interactivityEnabled: false,
      animationEnabled: true,
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
        viewportMaximum: 3,
        title: "Elev.",
        titleFontColor: "#FFFFFF"
      },
      toolTip: { shared: true },
      data: [{
        markerType: "none",
        type: "area",
        fillOpacity: 1,
        dataPoints: [
          { x: 0 * this.props.distanceToIndexRatio, y: this.props.elevation[0] },
          { x: 1 * this.props.distanceToIndexRatio, y: this.props.elevation[1] },
          { x: 2 * this.props.distanceToIndexRatio, y: this.props.elevation[2] },
          { x: 3 * this.props.distanceToIndexRatio, y: this.props.elevation[3] },
          { x: 4 * this.props.distanceToIndexRatio, y: this.props.elevation[4] },
          { x: 5 * this.props.distanceToIndexRatio, y: this.props.elevation[5] },
          { x: 6 * this.props.distanceToIndexRatio, y: this.props.elevation[6] },
          { x: 7 * this.props.distanceToIndexRatio, y: this.props.elevation[7] },
          { x: 8 * this.props.distanceToIndexRatio, y: this.props.elevation[8] },
          { x: 9 * this.props.distanceToIndexRatio, y: this.props.elevation[9] },
          { x: 10 * this.props.distanceToIndexRatio, y: this.props.elevation[10] }
        ]
      },
      {
        markerType: "none",
        type: "line",
        name: "Current Position",
        dataPoints: [
          { x: this.props.distance, y: 0 },
          { x: this.props.distance, y: 3 }
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