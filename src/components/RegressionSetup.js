import React from "react";
import {render} from "react-dom";

/*-----------------------------------------------------
 *
 *	This componnet it only changes 
 *	the state of the `order` for each <Graph/>
 *
 * ----------------------------------------------------
 */

class RegressionSetup extends React.Component{
	constructor(props){
		super(props);
		this.orders = {
			"order_graph_1":this.props.order_graph_1,
			"order_graph_2":this.props.order_graph_2
		}; 
	}
	
	setOrders(event){
		this.orders[event.target.name] = parseInt(event.target.value);
		this.props.setOrders(Object.values(this.orders));
	}

	render(){
		return(
			<div className="row">
				<div className="col-6">
					<p className="text-center">Order of first model: </p>
					<div className="w-100 d-flex justify-content-center">
						<input className="text-center" name="order_graph_1" type="number" value={this.props.order_graph_1} onChange={this.setOrders.bind(this)} min="1" max="10"/>
				</div>
				</div>
				<div className="col-6">
					<p className="text-center">Order of second model: </p>
					<div className="w-100 d-flex justify-content-center">
						<input className="text-center"name="order_graph_2" type="number" value={this.props.order_graph_2} onChange={this.setOrders.bind(this)} min="1" max="10"/>
					</div>
				</div>
			</div>
		);
	}
}

export default RegressionSetup;
	
