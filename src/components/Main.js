import React from "react";
import {render} from "react-dom";
import Graph from "./Graph";
import Drawer from "./Drawer";
import RegressionSetup from "./RegressionSetup";

/*-----------------------------------------------------
 *
 *	This component is in charge to update the state of the `x_array` and `y_array`
 *	receving the coordinates from the <Drawer/> component.
 *	Also it handles the `order` of each polynomial model that it is received from the <RegressionSetup/>
 *	component.
 *
 * ----------------------------------------------------
 */
 
class Main extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			x_array: new Array(),
			y_array: new Array(),
			order_graph_1:1,
			order_graph_2:2,
		};
		this.color_graph_1 = "rgb(255,0,0)";
		this.color_graph_2 = "rgb(0,255,0)";
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
						<Graph x={this.state.x_array} y={this.state.y_array} deg={this.state.order_graph_1} width={800} color={this.color_graph_1} />
						<Graph x={this.state.x_array} y={this.state.y_array} deg={this.state.order_graph_2} width={800} color={this.color_graph_2} />
					</div>
				</div>
			</div>
			
		);

	}
}

export default Main;
