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
	  animationEnabled: true,
	  title:{ 
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
	  axisY : {
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
		type: "area",
        fillOpacity: 1,
		dataPoints: [
          { x: 0, y: 1 },
          { x: 10, y: 1 },
          { x: 20, y: 2 },
          { x: 30, y: 2 },
          { x: 40, y: 1 },
          { x: 50, y: 1 },
          { x: 60, y: 2 },
          { x: 70, y: 2 },
          { x: 80, y: 2 },
          { x: 90, y: 1 },
          { x: 100, y: 1 },
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

    CanvasJS.addColorSet("colorSet",
      [
        "#566e7a",              
        "#D20155",
      ]);
		
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