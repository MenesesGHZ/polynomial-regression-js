import React from "react";
import {render} from "react-dom";
import Graph from "./Graph";
import Drawer from "./Drawer";
import RegressionSetup from "./RegressionSetup";
import * as math from "mathjs";

class Main extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			x_array: new Array(),
			y_array: new Array(),
			order_graph_1:1,
			order_graph_2:2,
		};
		const m1 = math.matrix([2,2,2]);
		const m2 = math.matrix([1,2,3]);
		console.log(math.multiply(m1,m2))
	}

	addCoord(coord){
		const new_x_array = this.state.x_array.concat(coord.x);
		const new_y_array = this.state.y_array.concat(coord.y);
		this.setState({
			x_array:new_x_array,
			y_array:new_y_array
		});
	}
	
	resetCoords(){
		this.setState({x_array:new Array(), y_array:new Array()});
	}

	setOrders(orders){
		this.setState({
			order_graph_1:orders[0],
			order_graph_2:orders[1]
		});
	}


	render(){
		return(
			<div className="container-fluid pt-4">
				<div className="row justify-content-center">
					<div className="col-12 col-sm-12 col-md-12 col-lg-4 ">
						<Drawer addCoord={this.addCoord.bind(this)} resetCoords={this.resetCoords.bind(this)}/>
						<RegressionSetup order_graph_1={this.state.order_graph_1} order_graph_2={this.state.order_graph_2} setOrders={this.setOrders.bind(this)} /> 	
					</div>
					<div className="col-12 col-sm-12 col-md-12 col-lg-8">
						<Graph x={this.state.x_array} y={this.state.y_array} deg={this.state.order_graph_1} width={800} color={"rgb(255,0,0)"} />
						<Graph x={this.state.x_array} y={this.state.y_array} deg={this.state.order_graph_2} width={800} color={"rgb(0,255,0)"} />
					</div>
				</div>
			</div>
			
		);

	}
}

export default Main;
