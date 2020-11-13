import React from "react";
import {render} from "react-dom";
import PolynomialRegression from "../polynomial_regression/PolynomialRegression";
const Chart = require('chart.js');

class Graph extends React.Component{
	constructor(props){
		super(props);
		this.model = new PolynomialRegression();
		this.chartRef = React.createRef();
	}

	componentDidMount(){
		this.plot();
	}

	componentDidUpdate() {
		this.fit()
		this.plot_update();
		console.log(this.model.expression)
	}

	fit(){
		// if there is no data: reset the model; else: train the model
		if(this.props.x.length==0 && this.props.x.length==0)  
			this.model = new PolynomialRegression();
		else
			this.model.train(this.props.x,this.props.y,this.props.deg);
	}
	
	plot_update(){
		let data = new Array(),
			regression_points = new Array();
		for(let i=0;i<this.props.x.length;i++){
			data.push(
				{x:this.props.x[i],y:this.props.y[i]}
			);
		}
		for(let i=0;i<1;i+=0.05){
			regression_points.push({x:i,y:this.model.predict(i)});
		}
		this.chart.data.datasets[0].data = data;
		this.chart.data.datasets[0].label = `Polynomial Degree: ${String(this.props.deg)}`;
		this.chart.data.datasets[0].pointBackgroundColor.push("rgba(0,0,0,1)");
		this.chart.data.datasets[1] =  {
			type:'line',
			label: this.model.expression,
			function: function(x){return this.model.predict(x)},
			data: regression_points,
			borderColor: "rgba(0,0,255,1)",
			fill: false 
		}
		this.chart.update();
	}
	

	plot(){
		this.chart = new Chart(this.chartRef.current, {
			type:'scatter',
			data:{
				datasets:[{
					type:"line",
					label:`Polynomial Degree: ${String(this.props.deg)}`,
					data:new Array(),
					borderColor: this.props.color,
					fill: false, 
					pointBackgroundColor:new Array()
				}]
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
