import React from "react";
import {render} from "react-dom";
import Graph from "./Graph";
import Drawer from "./Drawer";


class Main extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			x_array: new Array(),
			y_array: new Array()
		};
	}

	setCoords(coords){
		const new_x_array = this.state.x_array.concat(coords.x);
		const new_y_array = this.state.y_array.concat(coords.y);
		this.setState({
			x_array:new_x_array,
			y_array:new_y_array
		});
	}
		
	render(){
		return(
			<div className="container-fluid pt-4">
				<div className="row justify-content-center">
					<div className="col-12 col-sm-12 col-md-12 col-lg-4 d-flex justify-content-center">
						<Drawer setCoords={this.setCoords.bind(this)}/>
					</div>
					<div className="col-12 col-sm-12 col-md-12 col-lg-8">
						<Graph x={this.state.x_array} y={this.state.y_array} deg={1} width={800} color={"rgb(255,0,0)"}/>
						<Graph x={this.state.x_array} y={this.state.y_array} deg={2} width={800} color={"rgb(255,0,0)"}/>
					</div>
				</div>
			</div>
			
		);

	}
}

export default Main;
