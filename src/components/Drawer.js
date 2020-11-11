import React from "react";
import {render} from "react-dom";
import grid from "../assets/grid.png";

class Drawer extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {x:NaN,y:NaN,hoverMode:false};
		this.width = this.height = 400;
	}

	onMouseMove(e){
	 	this.setState({ x: (e.nativeEvent.offsetX/this.width).toFixed(3),
				y: (1-e.nativeEvent.offsetY/this.height).toFixed(3)},
			()=>{if(this.state.hoverMode) this.addCoord()}
		);	
	}

	toggleHoverMode(){
		this.setState({hoverMode:!this.state.hoverMode});
	}
	
	addCoord(){
		const coord = {x:this.state.x,
		               y:this.state.y};
		this.props.addCoord(coord); 
	}

		

	render(){
		return(
			<div>
				<div className="row mb-4">
					<div className="col-6">
						<p>Hover Mode: [{this.state.hoverMode?"ON":"OFF"}]</p>
						<button type="button" className="btn btn-success" onClick={this.toggleHoverMode.bind(this)}>toggle</button>
					</div>
					<div className="col-6">
						<p>Reset Button:</p>
						<button type="button" className="btn btn-danger" onClick={this.props.resetCoords}>reset</button>
					</div>
				</div>

				<div onMouseMove={(e)=>this.onMouseMove(e)}  
			style={{width:this.width,height:this.height,backgroundColor:"rgba(100,100,100,0.1)",backgroundImage:`url(${grid})`}}
			onClick={this.addCoord.bind(this)}/>
				<div className="row mt-2">
					<div className="col-6">
						<p>X: {this.state.x}</p>
					</div>
					<div className="col-6">
						<p>Y: {this.state.y}</p>
					</div>
				</div>	
				
			</div>
		);
	}
}


export default Drawer;
