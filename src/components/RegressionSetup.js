import React from "react";
import {render} from "react-dom";

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
					<p>Order of first model: </p>
					<input name="order_graph_1" type="number" value={this.props.order_graph_1} onChange={this.setOrders.bind(this)} min="1" max="10"/>
				</div>
				<div className="col-6">
					<p>Order of second model: </p>
					<input name="order_graph_2" type="number" value={this.props.order_graph_2} onChange={this.setOrders.bind(this)} min="1" max="10"/>
				</div>
			</div>
		);
	}
}

export default RegressionSetup;
	
