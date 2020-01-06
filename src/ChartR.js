import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;


var dataPoints =[];
var newDataPoints =[];
CanvasJS.addColorSet("Amarillito",
[//colorSet Array
"#FFDF00",              
]);

class ChartR extends Component {
	render() {
		const options = {
			theme: "light2",
			//animationEnabled: true,
			exportEnabled: true,
			zoomEnabled: true,
			colorSet: "Amarillito",
			title: {
				text: "Hora sol pico"
			},
			axisY: {
				title: "Radiación Solar (watts/m²)",
				includeZero: false,
			},
			axisX: {
				title: "Hora"
			},
				
			data: [{
				type: "line",
				 //xValueFormatString: "MMM YYYY",
				// yValueFormatString: "$#,##0.00",
				toolTipContent: "{x}: {y}",
				dataPoints: dataPoints
			}]
		}
		
		return (
			<div>
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
		
	}

	componentDidMount() {
		
		var chart = this.chart;
		var updateChart = function () {
		fetch('https://api.weather.com/v2/pws/observations/all/1day?stationId=IPUERTOC4&format=json&units=e&apiKey=f040e0b1ecb0410980e0b1ecb04109b0')
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			for (var i = 0; i < data.observations.length; i++) {
				dataPoints.push({
					x: new Date(data.observations[i].obsTimeLocal),  
					y: data.observations[i].solarRadiationHigh
				});
			}
			//console.log(dataPoints);
			chart.render();
			chart.options.data[0].dataPoints = dataPoints;
			dataPoints = [];
		});
		//dataPoints.shift();
	};
	setInterval(function(){updateChart()}, 1000);
		// .then(function(myJson) {
		// 	console.log(myJson);
		//   });

		//chart.options.data[0].dataPoints = newDataPoints;


		// var updateChart = function () {
		// fetch('https://api.weather.com/v2/pws/observations/all/1day?stationId=IPUERTOC4&format=json&units=e&apiKey=f040e0b1ecb0410980e0b1ecb04109b0')
		// .then(function(response) {
		// 	return response.json();
		// })
		// .then(function(data) {
		// 	for (var i = 0; i < data.observations.length; i++) {
		// 		newDataPoints.push({
		// 			x: new Date(data.observations[i].obsTimeLocal),  
		// 			y: data.observations[i].solarRadiationHigh
		// 		});
		// 	}
		// });
		// //console.log(dataPoints);
		// //chart.render();
		// chart.options.data[0].dataPoints = newDataPoints;
		// newDataPoints = [];
		// };
		
		// setInterval(function(){updateChart()}, 1000);
	}
}
export default ChartR;                           