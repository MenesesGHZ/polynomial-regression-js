import React from "react";
import {render} from "react-dom";
const Chart = require('chart.js');

class Graph extends React.Component{
	constructor(props){
		super(props);	
		this.chartRef = React.createRef();
	}

	componentDidMount(){
		this.plot();
	}

	componentDidUpdate() {
		this.plot_update();	
	}

	plot_update(){
		let data = new Array();
		for(let i=0;i<this.props.x.length;i++){
			data.push(
				{x:this.props.x[i],y:this.props.y[i]}
			);
		}
		this.chart.data.datasets[0].data = data;
		this.chart.data.datasets[0].pointBackgroundColor.push(this.props.color);
		this.chart.update();
	}

	plot(){
		this.chart = new Chart(this.chartRef.current, {
			type:"scatter",
			data:{
				datasets:[{
					label:"Polynomial Degree: "+String(this.props.deg),
					data:new Array(),
					pointBackgroundColor:new Array()
				}]
			},
			options:{
				responsive:true
			}
		});
	}

	render(){
		return(
			<div className="w-100 d-flex justify-content-center">
				<div className="h-auto" style={{width:this.props.width}}>
					<canvas ref={this.chartRef}/>
				</div>
			</div>
		);
	}
}



export default Graph;
